import React, { useState } from 'react';
import { Plus, Trash2, FileCheck, Layers, Sparkles, CheckCircle2, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function PdfBuilder({ onGenerateSuccess, setActiveTab }) {
  const [companyName, setCompanyName] = useState('ACME BUSINESS SOLUTIONS');
  const [title, setTitle] = useState('OFFICIAL INVOICE & PROPOSAL');
  const [recipientName, setRecipientName] = useState('Mr. Rahat Chowdhury');
  const [recipientEmail, setRecipientEmail] = useState('rahat@example.com');
  const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('Payment is due within 15 days of invoice date.\nThank you for choosing our services!');
  
  const [items, setItems] = useState([
    { id: 1, description: 'Web Design & Portal Development Services', qty: 1, price: 450 },
    { id: 2, description: 'PDF Link & QR Code Integration Module', qty: 1, price: 150 }
  ]);

  const [generating, setGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: '', qty: 1, price: 0 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const grandTotal = items.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('Please enter a Document Title');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/pdfs/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          title,
          recipientName,
          recipientEmail,
          docDate,
          notes,
          items
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedDoc(data.pdf);
        if (onGenerateSuccess) onGenerateSuccess(data.pdf);
      } else {
        setError(data.message || 'Failed to generate PDF document');
      }
    } catch (err) {
      setError('Server connection error. Is the backend server running?');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedDoc) {
      navigator.clipboard.writeText(generatedDoc.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>Visual PDF Builder</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          এডমিন প্যানেল থেকেই নতুন ইনভয়েস, রসিদ বা ডকুমেন্ট তৈরি করুন - সাথে সাথে QR Code যুক্ত হবে
        </p>
      </div>

      {!generatedDoc ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Builder Form */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#3b82f6" />
              <span>Document Details</span>
            </h2>

            {error && (
              <div
                style={{
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fda4af',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Company / Header Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Document Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Document Title"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Recipient Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    placeholder="Customer Name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Document Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={docDate}
                    onChange={e => setDocDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Recipient Email (Optional)</label>
                <input
                  type="email"
                  className="form-input"
                  value={recipientEmail}
                  onChange={e => setRecipientEmail(e.target.value)}
                  placeholder="customer@email.com"
                />
              </div>

              {/* Items Table */}
              <div style={{ margin: '1.5rem 0 1rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>Itemized Charges / Services</label>
                  <button type="button" className="btn btn-secondary" onClick={handleAddItem} style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}>
                    <Plus size={14} />
                    <span>Add Row</span>
                  </button>
                </div>

                {items.map((item, index) => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Item Description"
                      className="form-input"
                      style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                      value={item.description}
                      onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      className="form-input"
                      style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                      value={item.qty}
                      onChange={e => handleItemChange(item.id, 'qty', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className="form-input"
                      style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                      value={item.price}
                      onChange={e => handleItemChange(item.id, 'price', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Notes & Payment Instructions</label>
                <textarea
                  rows="3"
                  className="form-textarea"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Terms, payment methods, notes..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={generating}
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                {generating ? 'Building PDF Document...' : 'Generate PDF & Embed QR Code'}
              </button>
            </form>
          </div>

          {/* Live Document Preview Card */}
          <div className="glass-panel" style={{ padding: '1.75rem', background: '#ffffff', color: '#0f172a', borderRadius: 'var(--radius-md)' }}>
            <div style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>{companyName || 'COMPANY NAME'}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>{title || 'DOCUMENT TITLE'}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b' }}>
                <div>Date: {docDate}</div>
                <div style={{ fontWeight: '600', color: '#3b82f6' }}>PREVIEW</div>
              </div>
            </div>

            {recipientName && (
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>PREPARED FOR:</div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{recipientName}</div>
                {recipientEmail && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{recipientEmail}</div>}
              </div>
            )}

            {/* Table Preview */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Item</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.5rem' }}>{item.description || 'Sample Item'}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{item.qty}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>${Number(item.price).toFixed(2)}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: '600' }}>
                      ${(Number(item.qty) * Number(item.price)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: 'right', fontSize: '1.1rem', fontWeight: '800', color: '#2563eb', marginBottom: '1.5rem' }}>
              Total: ${grandTotal.toFixed(2)}
            </div>

            {notes && (
              <div style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'pre-line', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
                <strong>Notes:</strong> {notes}
              </div>
            )}

            {/* Simulated QR badge */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <div style={{ border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', background: '#fafafa' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>SCAN TO VERIFY</div>
                <div style={{ width: '70px', height: '70px', background: '#0f172a', borderRadius: '4px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem' }}>
                  QR CODE
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Success Screen */
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
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

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>PDF Generated Successfully!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            আপনার পিডিএফটি তৈরি হয়ে গেছে এবং এতে অটোমেটিক QR Code যোগ করা হয়েছে।
          </p>

          <div
            style={{
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              textAlign: 'left'
            }}
          >
            <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '8px', width: '120px', flexShrink: 0 }}>
              <img src={generatedDoc.qrDataUrl} alt="QR Code" style={{ width: '100%', display: 'block' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {generatedDoc.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                ID: {generatedDoc.id}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  readOnly
                  value={generatedDoc.shareUrl}
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
              href={generatedDoc.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-emerald"
            >
              <ExternalLink size={16} />
              <span>Open Customer Viewer</span>
            </a>

            <button className="btn btn-secondary" onClick={() => setGeneratedDoc(null)}>
              Build Another PDF
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
