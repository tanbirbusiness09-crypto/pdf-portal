import React, { useState, useRef } from 'react';
import { Sparkles, CheckCircle2, Copy, Check, ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { API_BASE_URL } from '../config';
import JeddahChamberDoc from './JeddahChamberDoc';

export default function PdfBuilder({ onGenerateSuccess, setActiveTab }) {
  const [formData, setFormData] = useState({
    companyNameAr: 'نقليات حسين مهدي ال صلاح',
    companyNameEn: 'Hussein Mahdi Al Salah Transport',
    applicantNameAr: 'حسين مهدي',
    applicantNameEn: 'حسين مهدي',
    subscriberId: '587989',
    unifiedNo: '7021367318',
    crNo: '4030192940',
    phoneNo: '0',
    docDate: '14/07/2025',
    requestNo: '10285397',
    employeeId: '1513',
    embassyName: 'Embassy of Portugal',
    embassyCity: 'Jeddah, Saudi Arabia',
    employeeName: 'MD SALAUDDIN',
    employeeNationality: 'Bangladeshi',
    passportNo: 'A07950686',
    iqamaNo: '2584923581',
    jobTitle: 'General Manager',
    joiningDate: 'January 2014',
    monthlySalary: '12,500 SR (twelve thousand five hundred saudi riyals only)',
    destinationCountry: 'Portugal',
    travelPurpose: 'tourism purpose',
    ceoTitle: 'Chief Executive Officer (CEO)'
  });

  const [generating, setGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const printRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/pdfs/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Jeddah Chamber Certificate - ${formData.employeeName}`,
          chamberData: formData
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
      setError('Server connection error. Is the backend running?');
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
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>
          Jeddah Chamber Certificate Builder (غرفة جدة)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          হুবহু অরিজিনাল সৌদি জেদ্দা চেম্বার অফ কমার্স সার্টিফেকেট ও সেলারি পেপারের ফরম্যাট
        </p>
      </div>

      {!generatedDoc ? (
        <div className="builder-grid">
          {/* Builder Form Inputs Column */}
          <div className="glass-panel" style={{ padding: '1.5rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#3b82f6" />
              <span>Certificate Form Inputs</span>
            </h2>

            {error && (
              <div
                style={{
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fda4af',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Header Info */}
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Header & Company Info</h4>
                
                <div className="form-group">
                  <label className="form-label">Company Name (Arabic)</label>
                  <input type="text" className="form-input" name="companyNameAr" value={formData.companyNameAr} onChange={handleChange} dir="rtl" />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Name (English)</label>
                  <input type="text" className="form-input" name="companyNameEn" value={formData.companyNameEn} onChange={handleChange} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Applicant (Arabic)</label>
                    <input type="text" className="form-input" name="applicantNameAr" value={formData.applicantNameAr} onChange={handleChange} dir="rtl" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Applicant (English)</label>
                    <input type="text" className="form-input" name="applicantNameEn" value={formData.applicantNameEn} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Subscriber ID</label>
                    <input type="text" className="form-input" name="subscriberId" value={formData.subscriberId} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unified Number</label>
                    <input type="text" className="form-input" name="unifiedNo" value={formData.unifiedNo} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">C.R Number</label>
                    <input type="text" className="form-input" name="crNo" value={formData.crNo} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-input" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Issue Date</label>
                    <input type="text" className="form-input" name="docDate" value={formData.docDate} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Request Number</label>
                    <input type="text" className="form-input" name="requestNo" value={formData.requestNo} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Employee ID</label>
                  <input type="text" className="form-input" name="employeeId" value={formData.employeeId} onChange={handleChange} />
                </div>
              </div>

              {/* Employee & Visa Info */}
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Employee & Salary Info</h4>

                <div className="form-group">
                  <label className="form-label">Employee Full Name</label>
                  <input type="text" className="form-input" name="employeeName" value={formData.employeeName} onChange={handleChange} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nationality</label>
                    <input type="text" className="form-input" name="employeeNationality" value={formData.employeeNationality} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Designation</label>
                    <input type="text" className="form-input" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Passport Number</label>
                    <input type="text" className="form-input" name="passportNo" value={formData.passportNo} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">IQAMA Number</label>
                    <input type="text" className="form-input" name="iqamaNo" value={formData.iqamaNo} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Joining Date</label>
                  <input type="text" className="form-input" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Net Monthly Salary & Words</label>
                  <input type="text" className="form-input" name="monthlySalary" value={formData.monthlySalary} onChange={handleChange} />
                </div>
              </div>

              {/* Embassy & Destination Info */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>Embassy & Destination Info</h4>

                <div className="form-group">
                  <label className="form-label">Embassy Name</label>
                  <input type="text" className="form-input" name="embassyName" value={formData.embassyName} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Embassy City & Country</label>
                  <input type="text" className="form-input" name="embassyCity" value={formData.embassyCity} onChange={handleChange} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Destination Country</label>
                    <input type="text" className="form-input" name="destinationCountry" value={formData.destinationCountry} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Travel Purpose</label>
                    <input type="text" className="form-input" name="travelPurpose" value={formData.travelPurpose} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Signatory CEO Title</label>
                  <input type="text" className="form-input" name="ceoTitle" value={formData.ceoTitle} onChange={handleChange} />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={generating}
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {generating ? 'Generating PDF...' : 'Generate PDF & Embed QR Code'}
              </button>
            </form>
          </div>

          {/* 100% Exact Live Document Preview Column */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} color="#3b82f6" />
              <span>Live Exact Preview (Full Layout Responsive Scaling)</span>
            </div>

            <div ref={printRef} style={{ background: '#525659', padding: '20px', borderRadius: 'var(--radius-md)', minWidth: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
              <JeddahChamberDoc data={formData} isPreview={true} />
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

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Jeddah Chamber Certificate Created!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            আপনার পিডিএফটি হুবহু অরিজিনাল ডিজাইনে তৈরি হয়ে গেছে এবং এতে অটোমেটিক QR Code যোগ করা হয়েছে।
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
              Build Another Certificate
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
