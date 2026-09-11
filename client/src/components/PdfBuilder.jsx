import React, { useState, useRef } from 'react';
import { Sparkles, CheckCircle2, Copy, Check, ExternalLink, ArrowRight, FileText, Edit3, Building, User, FileCode, ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';
import { API_BASE_URL } from '../config';
import JeddahChamberDoc from './JeddahChamberDoc';
import VisualEditor from './VisualEditor';

export default function PdfBuilder({ onGenerateSuccess, setActiveTab }) {
  const [activeFormTab, setActiveFormTab] = useState('description');
  const [zoomLevel, setZoomLevel] = useState(100);

  const defaultDescriptionHtml = `<p style="margin-bottom: 16px; text-align: justify;">This is certified that Mr. <strong>MD SALAUDDIN</strong>, <strong>Bangladeshi</strong> nationality holding passport number <strong>A07950686</strong>, Saudi Arabia resident permit (IQAMA) number <strong>2584923581</strong>, is working as a <strong>General Manager</strong> in <strong>Hussein Mahdi Al Salah Transport</strong>. And he is a senior employee in our company from <strong>January 2014</strong>. And he draws a net monthly salary gross <strong>12,500 SR (twelve thousand five hundred saudi riyals only)</strong> with extra facilities from our company. His contract and iqama are renewable in every year by the company.</p><p style="margin-bottom: 16px; text-align: justify;">Mr. <strong>MD SALAUDDIN</strong> wants to visit the most beautiful schengen country <strong>Portugal</strong> for <strong>tourism purpose</strong>. We further attested that we do not have any objections if he goes to <strong>Portugal</strong> to enjoy his vacation. Upon completion of his travel and duration of stay, he will return and resume his work with us. If you have any quarries, please feel free to contract with us.</p>`;

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
    ceoTitle: 'Chief Executive Officer (CEO)',
    paragraph1Html: defaultDescriptionHtml
  });

  const [generating, setGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (newHtml) => {
    setFormData(prev => ({ ...prev, paragraph1Html: newHtml }));
  };

  const handleResetDescription = () => {
    setFormData(prev => ({ ...prev, paragraph1Html: defaultDescriptionHtml }));
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
          Official Jeddah Chamber of Commerce NOC & Salary Certificate Layout
        </p>
      </div>

      {!generatedDoc ? (
        <div className="builder-viewport">
          {/* Left Column: Form Controls (Fixed Viewport Scrollable) */}
          <div className="glass-panel builder-form-scroll" style={{ padding: '1.25rem' }}>
            <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Sparkles size={18} color="#3b82f6" />
                <span>Document Form Controls</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Edit document text and fields naturally using the MS Word style Visual Editor.
              </p>
            </div>

            {/* Form Navigation Tabs */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <button
                type="button"
                className={`builder-tab-btn ${activeFormTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('description')}
              >
                <Edit3 size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Visual Description Editor</span>
              </button>

              <button
                type="button"
                className={`builder-tab-btn ${activeFormTab === 'company' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('company')}
              >
                <Building size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Header & Company</span>
              </button>

              <button
                type="button"
                className={`builder-tab-btn ${activeFormTab === 'employee' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('employee')}
              >
                <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Employee & Salary</span>
              </button>

              <button
                type="button"
                className={`builder-tab-btn ${activeFormTab === 'embassy' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('embassy')}
              >
                <FileCode size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Embassy & Sign-off</span>
              </button>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fda4af',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* TAB 1: MS WORD STYLE VISUAL DESCRIPTION EDITOR */}
              {activeFormTab === 'description' && (
                <div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.88rem', color: 'var(--primary)', marginBottom: '0.35rem' }}>
                      Visual Description Editor (MS Word Style)
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Type naturally without raw HTML code. Highlight text to apply Bold, Italic, or Underline formatting.
                    </p>
                  </div>

                  <VisualEditor
                    value={formData.paragraph1Html}
                    onChange={handleDescriptionChange}
                    onReset={handleResetDescription}
                  />
                </div>
              )}

              {/* TAB 2: HEADER & COMPANY INFO */}
              {activeFormTab === 'company' && (
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>Header & Company Info</h4>
                  
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
              )}

              {/* TAB 3: EMPLOYEE & SALARY INFO */}
              {activeFormTab === 'employee' && (
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>Employee & Salary Info</h4>

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
              )}

              {/* TAB 4: EMBASSY & SIGN-OFF */}
              {activeFormTab === 'embassy' && (
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>Embassy & Destination Info</h4>

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
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={generating}
                style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}
              >
                {generating ? 'Generating PDF...' : 'Generate PDF & Embed QR Code'}
              </button>
            </form>
          </div>

          {/* Right Column: Realtime A4 Document Preview with Zoom / Auto-Scale Toolbar */}
          <div className="builder-preview-scroll">
            {/* Preview Toolbar */}
            <div
              style={{
                width: '100%',
                maxWidth: '794px',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} color="#3b82f6" />
                <span style={{ fontWeight: '600' }}>Realtime Live Document Preview</span>
              </div>

              {/* Zoom & Scaling Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '2px 6px' }}>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 4px' }}
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span style={{ fontSize: '0.78rem', fontWeight: '600', minWidth: '35px', textAlign: 'center' }}>
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 4px' }}
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: '2px 4px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                  title="Auto Fit 100%"
                >
                  <Maximize size={12} />
                  <span>Fit</span>
                </button>
              </div>
            </div>

            {/* Scaled A4 Document */}
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease',
                width: '100%',
                maxWidth: '794px'
              }}
            >
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
            Your PDF document has been generated in official layout with embedded verification QR code.
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
