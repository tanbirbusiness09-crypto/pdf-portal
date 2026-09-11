import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, QrCode, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function PdfUploader({ onUploadSuccess, setActiveTab }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
        setError('Please select a valid PDF file (.pdf)');
        setFile(null);
        return;
      }
      setError('');
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace('.pdf', ''));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file to upload');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      const response = await fetch(`${API_BASE_URL}/api/pdfs/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadedDoc(data.pdf);
        if (onUploadSuccess) onUploadSuccess(data.pdf);
      } else {
        setError(data.message || 'Failed to upload PDF document');
      }
    } catch (err) {
      setError('Server connection error. Is the backend server running?');
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (uploadedDoc) {
      navigator.clipboard.writeText(uploadedDoc.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>Upload Existing PDF</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Upload any PDF document to automatically embed verification QR codes and generate shareable links.
        </p>
      </div>

      {!uploadedDoc ? (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {error && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fda4af',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
                fontSize: '0.9rem'
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* File Drop Area */}
            <div
              style={{
                border: '2px dashed var(--border-glow)',
                borderRadius: 'var(--radius-md)',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                background: file ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                transition: 'all 0.2s ease'
              }}
              onClick={() => document.getElementById('pdf-file-input').click()}
            >
              <input
                id="pdf-file-input"
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: '#3b82f6',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <UploadCloud size={32} />
              </div>

              {file ? (
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#60a5fa', marginBottom: '0.25rem' }}>
                    {file.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to change file
                  </p>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                    Click or Drag & Drop PDF File Here
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Supports standard PDF files up to 50MB
                  </p>
                </div>
              )}
            </div>

            {/* Document Title */}
            <div className="form-group">
              <label className="form-label">Document Title (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Price Catalog 2026 / Product Specification"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading || !file}
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
            >
              {uploading ? (
                <span>Stamping QR Code & Processing PDF...</span>
              ) : (
                <>
                  <UploadCloud size={18} />
                  <span>Upload & Generate Link</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>PDF Uploaded & Stamped!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Your PDF document has been uploaded successfully with embedded QR verification.
          </p>

          {/* QR Code & Link Preview */}
          <div
            style={{
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              textAlign: 'left',
              flexWrap: 'wrap'
            }}
          >
            <div
              style={{
                background: '#fff',
                padding: '0.5rem',
                borderRadius: '8px',
                width: '120px',
                flexShrink: 0
              }}
            >
              <img src={uploadedDoc.qrDataUrl} alt="QR Code" style={{ width: '100%', display: 'block' }} />
            </div>

            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {uploadedDoc.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Document ID: {uploadedDoc.id}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  readOnly
                  value={uploadedDoc.shareUrl}
                  className="form-input"
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
                />
                <button className="btn btn-secondary" onClick={handleCopy} style={{ padding: '0.45rem 0.85rem' }}>
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={uploadedDoc.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-emerald"
            >
              <ExternalLink size={16} />
              <span>Open Customer Link</span>
            </a>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setUploadedDoc(null);
                setFile(null);
                setTitle('');
              }}
            >
              Upload Another PDF
            </button>

            <button className="btn btn-primary" onClick={() => setActiveTab('dashboard')}>
              <span>Go to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
