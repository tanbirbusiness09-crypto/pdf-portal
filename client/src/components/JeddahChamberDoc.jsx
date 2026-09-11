import React from 'react';

export default function JeddahChamberDoc({ data, qrDataUrl, isPreview = false, layoutMode = 'rtl' }) {
  const {
    companyNameAr = 'شركة أمازيغ العالمية المحدودة شخص واحد',
    companyNameEn = 'amazigh alalamiyya Company Ltd. shakhs wahid',
    applicantNameAr = 'محمد عرفان لياقت علي',
    applicantNameEn = 'Muhammad Irfan Liaquat Ali',
    subscriberId = '501815',
    unifiedNo = '7033135448',
    crNo = '4030518655',
    phoneNo = '0159436744',
    docDate = '10/09/2026',
    requestNo = '12169816',
    employeeId = '1355',
    embassyName = 'Embassy of the Czech Republic',
    embassyCity = 'Riyadh, Kingdom of Saudi Arabia',
    employeeName = 'Muhammad Irfan',
    employeeNationality = 'Pakistani',
    passportNo = 'DZ1980573',
    iqamaNo = '2348965084',
    jobTitle = 'Chief Executive',
    joiningDate = 'January 2018',
    monthlySalary = 'SAR 42,000 (Forty-Two Thousand Saudi Riyals)',
    destinationCountry = 'Czech Republic',
    travelPurpose = 'tourism purposes',
    ceoTitle = 'Chief Executive',
    paragraph1Html,
    paragraph2Html,
    layoutModeOverride
  } = data || {};

  const effectiveMode = layoutModeOverride || layoutMode;
  const isRtlMode = effectiveMode === 'rtl';

  // Sample SVG QR Code for instant crisp live preview if qrDataUrl is not yet passed
  const defaultQrSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23000" d="M10 10h30v30H10zM15 15v20h20V15zM20 20h10v10H20zM60 10h30v30H60zM65 15v20h20V15zM70 20h10v10H70zM10 60h30v30H10zM15 65v20h20V65zM20 70h10v10H20zM45 10h10v10H45zM45 25h10v10H45zM45 40h10v10H45zM10 45h10v10H10zM25 45h10v10H25zM60 45h10v10H60zM75 45h15v10H75zM45 60h10v30H45zM60 60h15v10H60zM80 60h10v10H80zM60 75h10v15H60zM75 75h15v15H75z"/></svg>`;

  const displayQr = qrDataUrl || defaultQrSvg;

  return (
    <div
      className="jeddah-chamber-document"
      style={{
        width: '100%',
        maxWidth: '794px',
        minHeight: '1123px',
        background: '#ffffff',
        color: '#111111',
        padding: '35px 45px 35px 45px',
        boxSizing: 'border-box',
        fontFamily: 'Arial, Helvetica, sans-serif',
        margin: '0 auto',
        boxShadow: isPreview ? '0 10px 30px rgba(0,0,0,0.25)' : 'none',
        borderRadius: isPreview ? '8px' : '0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Top Header Logo Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="155" height="52" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 35 C 25 8, 60 5, 80 22 C 55 15, 30 25, 25 45 Z" fill="#005ca9" />
              <path d="M 22 22 C 35 10, 65 10, 85 28 C 60 18, 38 28, 32 48 Z" fill="#0096da" />
              <path d="M 5 45 C 18 32, 40 28, 65 38 C 42 32, 22 38, 10 50 Z" fill="#003566" />
              <text x="92" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="#003566">غرفة جدة</text>
              <text x="92" y="42" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="9" fill="#005ca9" letterSpacing="0.5">JEDDAH CHAMBER</text>
              <text x="92" y="52" fontFamily="Arial, sans-serif" fontSize="8" fill="#666666" letterSpacing="1">— 1946 —</text>
            </svg>
          </div>
        </div>

        {/* Header Metadata Container Card */}
        <div
          style={{
            background: '#f5f7fa',
            border: '1px solid #e9ecef',
            borderRadius: '6px',
            padding: '14px 18px',
            display: 'grid',
            gridTemplateColumns: '1fr 95px 1fr',
            gap: '15px',
            alignItems: 'center',
            fontSize: '11px',
            lineHeight: '1.55',
            color: '#333333',
            marginBottom: '30px'
          }}
        >
          {/* Left Column: English Metadata */}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12.5px', color: '#000000', marginBottom: '4px' }}>
              {companyNameEn}
            </div>
            <div><span style={{ color: '#555' }}>Applicant : </span><strong style={{ color: '#000' }}>{applicantNameEn}</strong></div>
            <div><span style={{ color: '#555' }}>MembershipNumber: </span><strong style={{ color: '#000' }}>{subscriberId}</strong></div>
            <div><span style={{ color: '#555' }}>UnifiedNumber: </span><strong style={{ color: '#000' }}>{unifiedNo}</strong></div>
            <div><span style={{ color: '#555' }}>C.R : </span><strong style={{ color: '#000' }}>{crNo}</strong></div>
            <div><span style={{ color: '#555' }}>Phone Number : </span><strong style={{ color: '#000' }}>{phoneNo}</strong></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span><span style={{ color: '#555' }}>Date : </span><strong style={{ color: '#000' }}>{docDate}</strong></span>
              <span><span style={{ color: '#555' }}>Request number : </span><strong style={{ color: '#000' }}>{requestNo}</strong></span>
            </div>
            <div><span style={{ color: '#555' }}>Employee : </span><strong style={{ color: '#000' }}>{employeeId}</strong></div>
          </div>

          {/* Center Column: Sharp QR Code */}
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                background: '#ffffff',
                padding: '4px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                display: 'inline-block'
              }}
            >
              <img
                src={displayQr}
                alt="Verification QR Code"
                style={{ width: '85px', height: '85px', display: 'block' }}
              />
            </div>
          </div>

          {/* Right Column: Arabic Metadata (Right Aligned RTL) */}
          <div dir="rtl" style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 'bold', fontSize: '12.5px', color: '#000000', marginBottom: '4px' }}>
              {companyNameAr}
            </div>
            <div><span style={{ color: '#555' }}>مقدم الطلب : </span><strong style={{ color: '#000' }}>{applicantNameAr}</strong></div>
            <div><span style={{ color: '#555' }}>رقم الإشتراك : </span><strong style={{ color: '#000' }}>{subscriberId}</strong></div>
            <div><span style={{ color: '#555' }}>الرقم الموحد : </span><strong style={{ color: '#000' }}>{unifiedNo}</strong></div>
            <div><span style={{ color: '#555' }}>السجل التجاري : </span><strong style={{ color: '#000' }}>{crNo}</strong></div>
            <div><span style={{ color: '#555' }}>رقم الهاتف : </span><strong style={{ color: '#000' }}>{phoneNo}</strong></div>
            <div>
              <span style={{ color: '#555' }}>التاريخ: </span><strong style={{ color: '#000' }}>{docDate}</strong>
              <span style={{ display: 'inline-block', width: '12px' }}></span>
              <span style={{ color: '#555' }}>رقم الطلب : </span><strong style={{ color: '#000' }}>{requestNo}</strong>
            </div>
            <div><span style={{ color: '#555' }}>الموظف : </span><strong style={{ color: '#000' }}>{employeeId}</strong></div>
          </div>
        </div>

        {/* Letter Body Area */}
        <div style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#111111', textAlign: isRtlMode ? 'right' : 'left' }}>
          {/* Recipient Block */}
          <div style={{ marginBottom: '22px', textAlign: isRtlMode ? 'right' : 'left' }}>
            <div>:TO</div>
            <div style={{ fontWeight: '500' }}>{embassyName}</div>
            <div>{embassyCity}</div>
          </div>

          {/* Paragraph 1 */}
          {paragraph1Html ? (
            <div
              style={{ marginBottom: '16px', textAlign: isRtlMode ? 'right' : 'justify' }}
              dangerouslySetInnerHTML={{ __html: paragraph1Html }}
            />
          ) : (
            <div style={{ marginBottom: '16px', textAlign: isRtlMode ? 'right' : 'justify' }}>
              This is certified that Mr. <strong>{employeeName}</strong>, holder of Passport No. <strong>{passportNo}</strong> and Saudi Iqama No. <strong>{iqamaNo}</strong>, is working as <strong>{jobTitle}</strong> in <strong>{companyNameEn}</strong> under Commercial Registration (CR) No. <strong>{crNo}</strong>.
            </div>
          )}

          {/* Paragraph 2 */}
          {paragraph2Html && (
            <div
              style={{ marginBottom: '35px', textAlign: isRtlMode ? 'right' : 'justify' }}
              dangerouslySetInnerHTML={{ __html: paragraph2Html }}
            />
          )}

          {/* Sign-off Block */}
          <div style={{ marginTop: '25px', textAlign: isRtlMode ? 'right' : 'left' }}>
            <div>,Sincerely</div>
            <div style={{ fontWeight: 'bold' }}>Mr. {employeeName}</div>
            <div style={{ fontWeight: 'bold' }}>{ceoTitle}</div>
            <div style={{ fontWeight: 'bold' }}>{companyNameEn}</div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer Footer */}
      <div style={{ marginTop: '35px' }}>
        <div
          style={{
            background: '#f5f7fa',
            border: '1px solid #e9ecef',
            borderRadius: '6px',
            padding: '10px 14px',
            marginBottom: '8px'
          }}
        >
          <div
            dir="rtl"
            style={{
              fontSize: '9.5px',
              color: '#333333',
              textAlign: 'center',
              lineHeight: '1.45'
            }}
          >
            هذه الوثيقة قد تم إصدارها دون أدنى مسؤولية على الغرفة من خلال بوابة خدمات غرفة جدةو أي إضافة أو كشط أو تعديل على الوثيقة تعتبر لاغية وللتحقق من محتواها يرجى زيارة الموقع الالكتروني <a href="https://es.jcci.org.sa/Home" target="_blank" rel="noreferrer" style={{ color: '#005ca9', textDecoration: 'none' }}>https://es.jcci.org.sa/Home</a>
          </div>
        </div>

        <div dir="rtl" style={{ fontSize: '9.5px', fontWeight: 'bold', color: '#333333', textAlign: 'left' }}>
          صفحة 1 من 1
        </div>
      </div>
    </div>
  );
}

