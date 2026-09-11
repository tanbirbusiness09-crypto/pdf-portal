import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import PdfUploader from './components/PdfUploader';
import PdfBuilder from './components/PdfBuilder';
import CustomerViewer from './components/CustomerViewer';
import QrCodeModal from './components/QrCodeModal';
import { API_BASE_URL } from './config';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQrPdf, setActiveQrPdf] = useState(null);

  const pathname = window.location.pathname;
  const isCustomerRoute = pathname.startsWith('/view/');
  const customerDocId = isCustomerRoute ? pathname.split('/view/')[1] : null;

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/pdfs`);
      const data = await response.json();
      if (data.success) {
        setPdfs(data.pdfs);
      }
    } catch (err) {
      console.error('Failed to fetch PDFs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isCustomerRoute) {
      fetchPdfs();
    }
  }, [isCustomerRoute]);

  const handleDeletePdf = async (id) => {
    if (!window.confirm('Are you sure you want to delete this PDF document?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/pdfs/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setPdfs(pdfs.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Error deleting PDF document');
    }
  };

  // If customer route, show dedicated Customer PDF Viewer page
  if (isCustomerRoute && customerDocId) {
    return <CustomerViewer docId={customerDocId} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container" style={{ flex: 1, padding: activeTab === 'builder' ? '0.5rem 1rem 0' : '2rem 1.5rem' }}>
        {activeTab === 'dashboard' && (
          <AdminDashboard
            pdfs={pdfs}
            loading={loading}
            onDelete={handleDeletePdf}
            onOpenQr={pdf => setActiveQrPdf(pdf)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'upload' && (
          <PdfUploader
            onUploadSuccess={(newPdf) => {
              setPdfs([newPdf, ...pdfs]);
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'builder' && (
          <PdfBuilder
            onGenerateSuccess={(newPdf) => {
              setPdfs([newPdf, ...pdfs]);
            }}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer (Hidden in Builder mode for edge-to-edge full height) */}
      {activeTab !== 'builder' && (
        <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1.5rem 0', marginTop: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div className="container">
            PDF Link & QR Code Generation System • Powered by Node.js & React
          </div>
        </footer>
      )}

      {/* QR Code Modal Popup */}
      <QrCodeModal pdf={activeQrPdf} onClose={() => setActiveQrPdf(null)} />
    </div>
  );
}
