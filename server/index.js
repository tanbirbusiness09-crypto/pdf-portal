import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Handle Vercel serverless environment vs standard server
const isVercel = Boolean(process.env.VERCEL);
const BASE_DIR = isVercel ? '/tmp' : __dirname;

const UPLOADS_DIR = path.join(BASE_DIR, 'uploads');
const DATA_DIR = path.join(BASE_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ pdfs: [] }, null, 2));

// Helper functions for JSON database
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { pdfs: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed writing DB:', err);
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Serve client static build in production if available
const CLIENT_DIST = path.join(__dirname, '../client/dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
}

// Configure Multer for PDF file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `pdf_${Date.now()}_${nanoid(6)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Utility to stamp QR code on PDF using pdf-lib
async function stampQRCodeOnPDF(pdfBuffer, publicShareUrl) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    
    const qrBuffer = await QRCode.toBuffer(publicShareUrl, {
      type: 'png',
      width: 150,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });

    const qrImage = await pdfDoc.embedPng(qrBuffer);
    const qrDims = qrImage.scale(0.65);

    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const padding = 15;
    const x = width - qrDims.width - padding;
    const y = padding;

    firstPage.drawRectangle({
      x: x - 5,
      y: y - 5,
      width: qrDims.width + 10,
      height: qrDims.height + 20,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.85, 0.85, 0.9),
      borderWidth: 1
    });

    firstPage.drawImage(qrImage, {
      x,
      y: y + 10,
      width: qrDims.width,
      height: qrDims.height
    });

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    firstPage.drawText('Scan to Verify', {
      x: x + 4,
      y: y + 2,
      size: 7,
      font,
      color: rgb(0.2, 0.2, 0.4)
    });

    const modifiedPdfBytes = await pdfDoc.save();
    return Buffer.from(modifiedPdfBytes);
  } catch (err) {
    console.error('Error stamping QR code on PDF:', err);
    return pdfBuffer;
  }
}

// Helper to determine base URLs dynamically
const getBaseUrls = (req) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.get('host');
  const defaultClient = process.env.CLIENT_BASE_URL || `${protocol}://${host}`;
  const defaultServer = process.env.SERVER_BASE_URL || `${protocol}://${host}`;
  return { clientUrl: defaultClient, serverUrl: defaultServer };
};

// API Routes

// 1. Get all PDFs
app.get('/api/pdfs', (req, res) => {
  const db = readDB();
  res.json({ success: true, pdfs: db.pdfs });
});

// 2. Get single PDF & increment view count
app.get('/api/pdfs/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const pdfIndex = db.pdfs.findIndex(p => p.id === id);

  if (pdfIndex === -1) {
    return res.status(404).json({ success: false, message: 'PDF document not found' });
  }

  db.pdfs[pdfIndex].views = (db.pdfs[pdfIndex].views || 0) + 1;
  writeDB(db);

  res.json({ success: true, pdf: db.pdfs[pdfIndex] });
});

// 3. Upload existing PDF
app.post('/api/pdfs/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
    }

    const docId = nanoid(10);
    const title = req.body.title || req.file.originalname.replace('.pdf', '');
    const { clientUrl, serverUrl } = getBaseUrls(req);
    const publicShareUrl = `${clientUrl}/view/${docId}`;

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    
    const stampedBuffer = await stampQRCodeOnPDF(fileBuffer, publicShareUrl);
    fs.writeFileSync(filePath, stampedBuffer);

    const qrDataUrl = await QRCode.toDataURL(publicShareUrl, { margin: 1, width: 250 });

    const newPdf = {
      id: docId,
      title,
      originalName: req.file.originalname,
      filename: req.file.filename,
      fileUrl: `${serverUrl}/uploads/${req.file.filename}`,
      shareUrl: publicShareUrl,
      qrDataUrl,
      createdAt: new Date().toISOString(),
      type: 'uploaded',
      sizeBytes: req.file.size,
      views: 0
    };

    const db = readDB();
    db.pdfs.unshift(newPdf);
    writeDB(db);

    res.status(201).json({ success: true, pdf: newPdf });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error uploading PDF' });
  }
});

// 4. Generate custom PDF from Builder
app.post('/api/pdfs/generate', async (req, res) => {
  try {
    const { title, recipientName, recipientEmail, docDate, notes, items, companyName } = req.body;
    
    const docId = nanoid(10);
    const { clientUrl, serverUrl } = getBaseUrls(req);
    const publicShareUrl = `${clientUrl}/view/${docId}`;
    const filename = `generated_${Date.now()}_${docId}.pdf`;
    const filePath = path.join(UPLOADS_DIR, filename);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const primaryColor = rgb(0.12, 0.16, 0.23);
    const accentColor = rgb(0.15, 0.4, 0.95);
    const textGray = rgb(0.4, 0.45, 0.55);

    page.drawRectangle({
      x: 0,
      y: height - 120,
      width: width,
      height: 120,
      color: rgb(0.96, 0.97, 0.99)
    });

    page.drawRectangle({
      x: 0,
      y: height - 6,
      width: width,
      height: 6,
      color: accentColor
    });

    page.drawText(companyName || 'DOC & PDF PORTAL', {
      x: 40,
      y: height - 45,
      size: 18,
      font: fontBold,
      color: primaryColor
    });

    page.drawText(title || 'OFFICIAL DOCUMENT', {
      x: 40,
      y: height - 75,
      size: 24,
      font: fontBold,
      color: accentColor
    });

    page.drawText(`Document ID: ${docId}`, {
      x: width - 200,
      y: height - 45,
      size: 10,
      font: fontRegular,
      color: textGray
    });

    page.drawText(`Date: ${docDate || new Date().toLocaleDateString()}`, {
      x: width - 200,
      y: height - 62,
      size: 10,
      font: fontRegular,
      color: textGray
    });

    let currentY = height - 150;
    if (recipientName) {
      page.drawText('PREPARED FOR:', {
        x: 40,
        y: currentY,
        size: 10,
        font: fontBold,
        color: textGray
      });
      currentY -= 18;
      page.drawText(recipientName, {
        x: 40,
        y: currentY,
        size: 14,
        font: fontBold,
        color: primaryColor
      });
      if (recipientEmail) {
        currentY -= 14;
        page.drawText(recipientEmail, {
          x: 40,
          y: currentY,
          size: 10,
          font: fontRegular,
          color: textGray
        });
      }
      currentY -= 30;
    } else {
      currentY -= 20;
    }

    if (items && Array.isArray(items) && items.length > 0) {
      page.drawRectangle({
        x: 40,
        y: currentY - 5,
        width: width - 80,
        height: 25,
        color: rgb(0.93, 0.95, 0.98)
      });

      page.drawText('DESCRIPTION', { x: 50, y: currentY + 3, size: 10, font: fontBold, color: primaryColor });
      page.drawText('QTY', { x: 330, y: currentY + 3, size: 10, font: fontBold, color: primaryColor });
      page.drawText('PRICE', { x: 410, y: currentY + 3, size: 10, font: fontBold, color: primaryColor });
      page.drawText('TOTAL', { x: 490, y: currentY + 3, size: 10, font: fontBold, color: primaryColor });

      currentY -= 30;

      let grandTotal = 0;
      items.forEach((item) => {
        const itemTotal = (Number(item.qty) || 0) * (Number(item.price) || 0);
        grandTotal += itemTotal;

        page.drawText(String(item.description || ''), { x: 50, y: currentY, size: 10, font: fontRegular, color: primaryColor });
        page.drawText(String(item.qty || 1), { x: 330, y: currentY, size: 10, font: fontRegular, color: primaryColor });
        page.drawText(`$${Number(item.price || 0).toFixed(2)}`, { x: 410, y: currentY, size: 10, font: fontRegular, color: primaryColor });
        page.drawText(`$${itemTotal.toFixed(2)}`, { x: 490, y: currentY, size: 10, font: fontBold, color: primaryColor });

        page.drawLine({
          start: { x: 40, y: currentY - 8 },
          end: { x: width - 40, y: currentY - 8 },
          thickness: 0.5,
          color: rgb(0.9, 0.9, 0.95)
        });

        currentY -= 25;
      });

      page.drawText('GRAND TOTAL:', { x: 380, y: currentY - 5, size: 12, font: fontBold, color: primaryColor });
      page.drawText(`$${grandTotal.toFixed(2)}`, { x: 490, y: currentY - 5, size: 14, font: fontBold, color: accentColor });

      currentY -= 40;
    }

    if (notes) {
      page.drawText('NOTES / INSTRUCTIONS:', {
        x: 40,
        y: currentY,
        size: 10,
        font: fontBold,
        color: textGray
      });
      currentY -= 16;

      const notesLines = notes.split('\n');
      notesLines.forEach(line => {
        page.drawText(line, {
          x: 40,
          y: currentY,
          size: 10,
          font: fontRegular,
          color: primaryColor
        });
        currentY -= 14;
      });
    }

    const qrBuffer = await QRCode.toBuffer(publicShareUrl, {
      type: 'png',
      width: 150,
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' }
    });
    const qrImage = await pdfDoc.embedPng(qrBuffer);
    const qrDims = qrImage.scale(0.7);

    const qrX = width - qrDims.width - 40;
    const qrY = 40;

    page.drawRectangle({
      x: qrX - 8,
      y: qrY - 8,
      width: qrDims.width + 16,
      height: qrDims.height + 28,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.85, 0.9),
      borderWidth: 1
    });

    page.drawImage(qrImage, {
      x: qrX,
      y: qrY + 12,
      width: qrDims.width,
      height: qrDims.height
    });

    page.drawText('SCAN TO VERIFY', {
      x: qrX + 8,
      y: qrY,
      size: 7,
      font: fontBold,
      color: accentColor
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, Buffer.from(pdfBytes));

    const qrDataUrl = await QRCode.toDataURL(publicShareUrl, { margin: 1, width: 250 });

    const newPdf = {
      id: docId,
      title: title || 'Custom Document',
      originalName: filename,
      filename,
      fileUrl: `${serverUrl}/uploads/${filename}`,
      shareUrl: publicShareUrl,
      qrDataUrl,
      createdAt: new Date().toISOString(),
      type: 'generated',
      sizeBytes: pdfBytes.length,
      views: 0,
      meta: { recipientName, recipientEmail, docDate, notes }
    };

    const db = readDB();
    db.pdfs.unshift(newPdf);
    writeDB(db);

    res.status(201).json({ success: true, pdf: newPdf });
  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Error generating PDF' });
  }
});

// 5. Delete PDF
app.delete('/api/pdfs/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const pdfIndex = db.pdfs.findIndex(p => p.id === id);

  if (pdfIndex === -1) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }

  const pdf = db.pdfs[pdfIndex];
  const filePath = path.join(UPLOADS_DIR, pdf.filename);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.error('Failed to delete file from disk:', e);
    }
  }

  db.pdfs.splice(pdfIndex, 1);
  writeDB(db);

  res.json({ success: true, message: 'Document deleted successfully' });
});

// Catch-all route for Single Page Application routing in production
if (fs.existsSync(CLIENT_DIST)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`🚀 PDF Server running on port ${PORT}`);
  });
}

export default app;
