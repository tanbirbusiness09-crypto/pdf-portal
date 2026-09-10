import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Download, ExternalLink } from 'lucide-react';

export default function QrCodeModal({ pdf, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!pdf) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pdf.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = pdf.qrDataUrl;
    link.download = `QR_${pdf.title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#3b82f6',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}
          >
            <QrCode size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Document QR Code</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Scan with any phone camera to view and download this PDF
          </p>
        </div>

        {/* QR Display */}
        <div
          style={{
            background: '#ffffff',
            padding: '1.25rem',
            borderRadius: '16px',
            display: 'inline-block',
            margin: '0 auto 1.5rem auto',
            width: '100%',
            maxWidth: '220px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}
        >
          <img
            src={pdf.qrDataUrl}
            alt="QR Code"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Info Box */}
        <div
          style={{
            background: 'var(--bg-input)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {pdf.shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <button onClick={handleDownloadQr} className="btn btn-emerald">
            <Download size={16} />
            <span>Save QR Image</span>
          </button>

          <a
            href={pdf.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ExternalLink size={16} />
            <span>Open Link</span>
          </a>
        </div>
      </div>
    </div>
  );
}
