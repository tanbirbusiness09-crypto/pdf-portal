import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Download, 
  Share2, 
  Check, 
  ShieldCheck, 
  Eye, 
  Calendar, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { API_BASE_URL } from '../config';
import JeddahChamberDoc from './JeddahChamberDoc';

export default function CustomerViewer({ docId }) {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(100);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!docId) return;

    fetch(`${API_BASE_URL}/api/pdfs/${docId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPdf(data.pdf);
        } else {
          setError(data.message || 'Document not found or has been removed');
        }
      })
      .catch(err => {
        setError('Server error connecting to document portal');
      })
      .finally(() => setLoading(false));
  }, [docId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!pdf) return;
    const a = document.createElement('a');
    a.href = pdf.fileUrl;
    a.download = pdf.originalName || `${pdf.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }}></div>
          <p style={{ color: 'var(--text-muted)' }}>Loading Document...</p>
        </div>
      </div>
    );
  }

  if (error || !pdf) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div className="glass-panel" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
          <AlertCircle size={48} color="var(--accent-rose)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Document Not Available</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {error || 'This PDF link may be expired, invalid, or deleted.'}
          </p>
          <a href="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Back to Portal</span>
          </a>
        </div>
      </div>
    );
  }

  const isChamberDoc = pdf.chamberData || pdf.type === 'generated';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Top Navigation Header for Public Viewer */}
      <header className="viewer-header no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={22} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0 }}>{pdf.title}</h2>
              <span className="badge badge-emerald">Verified PDF</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', marginTop: '2px' }}>
              <span>ID: {pdf.id}</span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Calendar size={12} /> {new Date(pdf.createdAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: 'var(--accent-cyan)' }}>
                <Eye size={12} /> {pdf.views} Views
              </span>
            </div>
          </div>
        </div>

        {/* Viewer Actions Toolbar */}
        <div className="viewer-actions">
          <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)', padding: '2px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setZoom(prev => Math.max(50, prev - 15))}
              style={{ padding: '0.4rem 0.5rem' }}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
              {zoom}%
            </span>
            <button
              className="btn btn-secondary"
              onClick={() => setZoom(prev => Math.min(175, prev + 15))}
              style={{ padding: '0.4rem 0.5rem' }}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setZoom(100)}
              style={{ padding: '0.4rem 0.5rem' }}
              title="Reset Zoom"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <button className="btn btn-secondary" onClick={handleCopyLink}>
            {copied ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button className="btn btn-emerald" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print PDF</span>
          </button>

          <button className="btn btn-primary" onClick={handleDownload}>
            <Download size={16} />
            <span>Save PDF</span>
          </button>
        </div>
      </header>

      {/* Instruction Notice */}
      <div className="no-print" style={{ background: 'rgba(59, 130, 246, 0.1)', borderBottom: '1px solid rgba(59, 130, 246, 0.2)', padding: '0.5rem 1.5rem', fontSize: '0.85rem', textAlign: 'center', color: '#93c5fd' }}>
        💡 You can view the verified document directly below. Click <strong>Save PDF</strong> to download or <strong>Print PDF</strong> to print immediately.
      </div>

      {/* Main Document Embed Container */}
      <main className="pdf-canvas-container" style={{ padding: '2rem 1rem' }}>
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease',
            width: '100%',
            maxWidth: '850px'
          }}
        >
          {isChamberDoc && pdf.chamberData ? (
            <div className="print-area">
              <JeddahChamberDoc data={pdf.chamberData} qrDataUrl={pdf.qrDataUrl} layoutMode={pdf.chamberData?.layoutMode || 'rtl'} />
            </div>
          ) : (
            <iframe
              src={`${pdf.fileUrl}#toolbar=1&navpanes=0`}
              title={pdf.title}
              className="pdf-frame"
            />
          )}
        </div>
      </main>
    </div>
  );
}
