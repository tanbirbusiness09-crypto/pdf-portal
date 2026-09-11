import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Trash2, 
  Eye, 
  Upload, 
  PlusCircle, 
  Calendar,
  Layers,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboard({ pdfs, loading, onDelete, onOpenQr, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredPdfs = pdfs.filter(pdf => 
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pdf.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = pdfs.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const uploadedCount = pdfs.filter(p => p.type === 'uploaded').length;
  const generatedCount = pdfs.filter(p => p.type === 'generated').length;

  const handleCopyLink = (pdf) => {
    navigator.clipboard.writeText(pdf.shareUrl);
    setCopiedId(pdf.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      {/* Header & Quick Action Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage uploaded PDF files, custom document builders, and verification QR links.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('upload')}>
            <Upload size={16} />
            <span>Upload PDF</span>
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('builder')}>
            <PlusCircle size={16} />
            <span>Create PDF</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <FileText />
          </div>
          <div>
            <div className="stat-value">{pdfs.length}</div>
            <div className="stat-label">Total PDF Documents</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <Upload />
          </div>
          <div>
            <div className="stat-value">{uploadedCount}</div>
            <div className="stat-label">Uploaded PDFs</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
            <Layers />
          </div>
          <div>
            <div className="stat-value">{generatedCount}</div>
            <div className="stat-label">Generated PDFs</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
            <TrendingUp />
          </div>
          <div>
            <div className="stat-value">{totalViews}</div>
            <div className="stat-label">Customer Views</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Search by Document Title or ID..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ background: 'transparent', border: 'none', padding: '0.3rem', fontSize: '0.95rem' }}
        />
      </div>

      {/* Document Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading PDF documents...
          </div>
        ) : filteredPdfs.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <FileText size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No PDF Documents Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {searchTerm ? 'No matching documents for your search.' : 'You haven’t uploaded or generated any PDFs yet.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setActiveTab('upload')}>
                Upload standard PDF
              </button>
              <button className="btn btn-primary" onClick={() => setActiveTab('builder')}>
                Build new PDF
              </button>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Created Date</th>
                  <th>Views</th>
                  <th>QR Code</th>
                  <th>Customer Link</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPdfs.map((pdf) => (
                  <tr key={pdf.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: pdf.type === 'uploaded' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                            color: pdf.type === 'uploaded' ? '#3b82f6' : '#c084fc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <FileText size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{pdf.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {pdf.id}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge ${pdf.type === 'uploaded' ? 'badge-blue' : 'badge-purple'}`}>
                        {pdf.type}
                      </span>
                    </td>

                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={14} />
                        <span>{new Date(pdf.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                        <Eye size={15} />
                        <span>{pdf.views || 0}</span>
                      </div>
                    </td>

                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => onOpenQr(pdf)}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                      >
                        <QrCode size={14} />
                        <span>View QR</span>
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleCopyLink(pdf)}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                      >
                        {copiedId === pdf.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedId === pdf.id ? 'Copied' : 'Copy Link'}</span>
                      </button>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <a
                          href={pdf.shareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ padding: '0.4rem 0.6rem' }}
                          title="Open Customer View"
                        >
                          <ExternalLink size={15} />
                        </a>

                        <a
                          href={pdf.fileUrl}
                          download
                          className="btn btn-secondary"
                          style={{ padding: '0.4rem 0.6rem' }}
                          title="Download Original PDF"
                        >
                          <Download size={15} />
                        </a>

                        <button
                          onClick={() => onDelete(pdf.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.4rem 0.6rem' }}
                          title="Delete PDF"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
