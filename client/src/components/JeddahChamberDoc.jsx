import React from 'react';

export default function JeddahChamberDoc({ data, qrDataUrl, isPreview = false }) {
  const {
    companyNameAr = 'نقليات حسين مهدي ال صلاح',
    companyNameEn = 'Hussein Mahdi Al Salah Transport',
    applicantNameAr = 'حسين مهدي',
    applicantNameEn = 'حسين مهدي',
    subscriberId = '587989',
    unifiedNo = '7021367318',
    crNo = '4030192940',
    phoneNo = '0',
    docDate = '14/07/2025',
    requestNo = '10285397',
    employeeId = '1513',
    embassyName = 'Embassy of Portugal',
    embassyCity = 'Jeddah, Saudi Arabia',
    employeeName = 'MD SALAUDDIN',
    employeeNationality = 'Bangladeshi',
    passportNo = 'A07950686',
    iqamaNo = '2584923581',
    jobTitle = 'General Manager',
    joiningDate = 'January 2014',
    monthlySalary = '12,500 SR (twelve thousand five hundred saudi riyals only)',
    destinationCountry = 'Portugal',
    travelPurpose = 'tourism purpose',
    ceoTitle = 'Chief Executive Officer (CEO)'
  } = data || {};

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
        color: '#1a1a1a',
        padding: '35px 45px 40px 45px',
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
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="150" height="48" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 35 C 25 8, 60 5, 80 22 C 55 15, 30 25, 25 45 Z" fill="#005ca9" />
              <path d="M 22 22 C 35 10, 65 10, 85 28 C 60 18, 38 28, 32 48 Z" fill="#0096da" />
              <path d="M 5 45 C 18 32, 40 28, 65 38 C 42 32, 22 38, 10 50 Z" fill="#003566" />
              <text x="92" y="28" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="#003566">غرفة جدة</text>
              <text x="92" y="43" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="9" fill="#005ca9" letterSpacing="0.5">JEDDAH CHAMBER</text>
            </svg>
          </div>
        </div>

        {/* Header Metadata Container Card (Matching Gray Background Box in Original Image) */}
        <div
          style={{
            background: '#f6f8fa',
            border: '1px solid #eef0f3',
            borderRadius: '6px',
            padding: '14px 18px',
            display: 'grid',
            gridTemplateColumns: '1fr 95px 1fr',
            gap: '15px',
            alignItems: 'center',
            fontSize: '11px',
            lineHeight: '1.55',
            color: '#444444',
            marginBottom: '35px'
          }}
        >
          {/* Left Column: English Metadata */}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111111', marginBottom: '5px' }}>
              {companyNameAr}
            </div>
            <div><span style={{ color: '#555' }}>Applicant : </span><strong style={{ color: '#111' }}>{applicantNameEn}</strong></div>
            <div><span style={{ color: '#555' }}>Subscriber ID : </span><strong style={{ color: '#111' }}>{subscriberId}</strong></div>
            <div><span style={{ color: '#555' }}>Unified number : </span><strong style={{ color: '#111' }}>{unifiedNo}</strong></div>
            <div><span style={{ color: '#555' }}>C.R : </span><strong style={{ color: '#111' }}>{crNo}</strong></div>
            <div><span style={{ color: '#555' }}>Date : </span><strong style={{ color: '#111' }}>{docDate}</strong></div>
            <div><span style={{ color: '#555' }}>Phone Number : </span><strong style={{ color: '#111' }}>{phoneNo}</strong></div>
            <div><span style={{ color: '#555' }}>Request number : </span><strong style={{ color: '#111' }}>{requestNo}</strong></div>
            <div><span style={{ color: '#555' }}>Employee : </span><strong style={{ color: '#111' }}>{employeeId}</strong></div>
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
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111111', marginBottom: '5px' }}>
              {companyNameAr}
            </div>
            <div><span style={{ color: '#555' }}>مقدم الطلب : </span><strong style={{ color: '#111' }}>{applicantNameAr}</strong></div>
            <div>
              <span style={{ color: '#555' }}>رقم الإشتراك : </span><strong style={{ color: '#111' }}>{subscriberId}</strong>
              <span style={{ display: 'inline-block', width: '12px' }}></span>
              <span style={{ color: '#555' }}>الرقم الموحد : </span><strong style={{ color: '#111' }}>{unifiedNo}</strong>
            </div>
            <div>
              <span style={{ color: '#555' }}>السجل التجاري : </span><strong style={{ color: '#111' }}>{crNo}</strong>
              <span style={{ display: 'inline-block', width: '12px' }}></span>
              <span style={{ color: '#555' }}>رقم الهاتف : </span><strong style={{ color: '#111' }}>{phoneNo}</strong>
            </div>
            <div>
              <span style={{ color: '#555' }}>التاريخ : </span><strong style={{ color: '#111' }}>{docDate}</strong>
              <span style={{ display: 'inline-block', width: '12px' }}></span>
              <span style={{ color: '#555' }}>رقم الطلب : </span><strong style={{ color: '#111' }}>{requestNo}</strong>
            </div>
            <div><span style={{ color: '#555' }}>الموظف : </span><strong style={{ color: '#111' }}>{employeeId}</strong></div>
          </div>
        </div>

        {/* Letter Body Area */}
        <div style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#222222' }}>
          <div style={{ marginBottom: '22px' }}>
            <div>The Visa Officer</div>
            <div>{embassyName}</div>
            <div>{embassyCity}</div>
          </div>

          <div style={{ marginBottom: '16px', fontWeight: '500' }}>Dear Sir/Madam,</div>

          <div style={{ marginBottom: '16px', textAlign: 'justify' }}>
            This is certified that Mr. <strong>{employeeName}</strong>, <strong>{employeeNationality}</strong> nationality holding passport number <strong>{passportNo}</strong>, Saudi Arabia resident permit (IQAMA) number <strong>{iqamaNo}</strong>, is working as a <strong>{jobTitle}</strong> in <strong>{companyNameEn}</strong>. And he is a senior employee in our company from <strong>{joiningDate}</strong>. And he draws a net monthly salary gross <strong>{monthlySalary}</strong> with extra facilities from our company. His contract and iqama are renewable in every year by the company.
          </div>

          <div style={{ marginBottom: '40px', textAlign: 'justify' }}>
            Mr. <strong>{employeeName}</strong> wants to visit the most beautiful schengen country <strong>{destinationCountry}</strong> for <strong>{travelPurpose}</strong>. We further attested that we do not have any objections if he goes to <strong>{destinationCountry}</strong> to enjoy his vacation. Upon completion of his travel and duration of stay, he will return and resume his work with us. If you have any quarries, please feel free to contract with us.
          </div>

          <div style={{ marginTop: '25px' }}>
            <div>Best Regards</div>
            <div style={{ fontWeight: 'bold' }}>{ceoTitle}</div>
            <div style={{ fontWeight: 'bold' }}>{companyNameEn}</div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer Footer (Matching Soft Gray Card Box) */}
      <div style={{ marginTop: '40px' }}>
        <div
          style={{
            background: '#f6f8fa',
            border: '1px solid #eef0f3',
            borderRadius: '6px',
            padding: '10px 14px',
            marginBottom: '10px'
          }}
        >
          <div
            dir="rtl"
            style={{
              fontSize: '9.5px',
              color: '#444444',
              textAlign: 'center',
              lineHeight: '1.45'
            }}
          >
            هذه الوثيقة قدمت إصدارها دون أدنى مسؤولية على الغرفة من خلال بوابة أعمال غرفة جدة وأي إضافة أو كشط أو تعديل على الوثيقة تعتبر لاغية وللتحقق من محتواها يرجى زيارة الموقع الالكتروني <a href="https://es.jcci.org.sa/Home" target="_blank" rel="noreferrer" style={{ color: '#005ca9', textDecoration: 'none' }}>https://es.jcci.org.sa/Home</a>
          </div>
        </div>

        <div dir="rtl" style={{ fontSize: '9.5px', fontWeight: 'bold', color: '#333333', textAlign: 'left' }}>
          صفحة 1 من 1
        </div>
      </div>
    </div>
  );
}
