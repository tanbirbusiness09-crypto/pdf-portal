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

  return (
    <div
      className="jeddah-chamber-document"
      style={{
        width: '100%',
        maxWidth: '794px', // Standard A4 width pixel scale
        minHeight: '1123px', // Standard A4 height pixel scale
        background: '#ffffff',
        color: '#1a1a1a',
        padding: '30px 40px 40px 40px',
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
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="150" height="50" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 35 C 25 8, 60 5, 80 22 C 55 15, 30 25, 25 45 Z" fill="#005ca9" />
              <path d="M 22 22 C 35 10, 65 10, 85 28 C 60 18, 38 28, 32 48 Z" fill="#0096da" />
              <path d="M 5 45 C 18 32, 40 28, 65 38 C 42 32, 22 38, 10 50 Z" fill="#003566" />
              <text x="92" y="28" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="#003566">غرفة جدة</text>
              <text x="92" y="43" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="9" fill="#005ca9" letterSpacing="0.5">JEDDAH CHAMBER</text>
            </svg>
          </div>
        </div>

        {/* Header Metadata 3-Column Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 1fr',
            gap: '15px',
            alignItems: 'flex-start',
            fontSize: '11px',
            lineHeight: '1.55',
            color: '#333333',
            marginBottom: '40px'
          }}
        >
          {/* Left Column: English info */}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111111', marginBottom: '4px' }}>
              {companyNameAr}
            </div>
            <div><span>Applicant : </span><strong>{applicantNameEn}</strong></div>
            <div><span>Subscriber ID : </span><strong>{subscriberId}</strong></div>
            <div><span>Unified number : </span><strong>{unifiedNo}</strong></div>
            <div><span>C.R : </span><strong>{crNo}</strong></div>
            <div><span>Date : </span><strong>{docDate}</strong></div>
            <div><span>Phone Number : </span><strong>{phoneNo}</strong></div>
            <div><span>Request number : </span><strong>{requestNo}</strong></div>
            <div><span>Employee : </span><strong>{employeeId}</strong></div>
          </div>

          {/* Center Column: QR Code */}
          <div style={{ textAlign: 'center', paddingTop: '5px' }}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Verification QR Code"
                style={{ width: '90px', height: '90px', display: 'block', margin: '0 auto' }}
              />
            ) : (
              <div
                style={{
                  width: '85px',
                  height: '85px',
                  border: '1px solid #ccc',
                  background: '#f9f9f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: '#666',
                  margin: '0 auto'
                }}
              >
                QR CODE
              </div>
            )}
          </div>

          {/* Right Column: Arabic info (Right Aligned RTL) */}
          <div dir="rtl" style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111111', marginBottom: '4px' }}>
              {companyNameAr}
            </div>
            <div><span>مقدم الطلب : </span><strong>{applicantNameAr}</strong></div>
            <div>
              <span>رقم الإشتراك : </span><strong>{subscriberId}</strong>
              <span style={{ display: 'inline-block', width: '15px' }}></span>
              <span>الرقم الموحد : </span><strong>{unifiedNo}</strong>
            </div>
            <div>
              <span>السجل التجاري : </span><strong>{crNo}</strong>
              <span style={{ display: 'inline-block', width: '15px' }}></span>
              <span>رقم الهاتف : </span><strong>{phoneNo}</strong>
            </div>
            <div>
              <span>التاريخ : </span><strong>{docDate}</strong>
              <span style={{ display: 'inline-block', width: '15px' }}></span>
              <span>رقم الطلب : </span><strong>{requestNo}</strong>
            </div>
            <div><span>الموظف : </span><strong>{employeeId}</strong></div>
          </div>
        </div>

        {/* Letter Body Area */}
        <div style={{ marginTop: '20px', fontSize: '12.5px', lineHeight: '1.6', color: '#222222' }}>
          <div style={{ marginBottom: '20px' }}>
            <div>The Visa Officer</div>
            <div>{embassyName}</div>
            <div>{embassyCity}</div>
          </div>

          <div style={{ marginBottom: '16px', fontWeight: '500' }}>Dear Sir/Madam,</div>

          <div style={{ marginBottom: '16px', textAlign: 'justify' }}>
            This is certified that Mr. <strong>{employeeName}</strong>, <strong>{employeeNationality}</strong> nationality holding passport number <strong>{passportNo}</strong>, Saudi Arabia resident permit (IQAMA) number <strong>{iqamaNo}</strong>, is working as a <strong>{jobTitle}</strong> in <strong>{companyNameEn}</strong>. And he is a senior employee in our company from <strong>{joiningDate}</strong>. And he draws a net monthly salary gross <strong>{monthlySalary}</strong> with extra facilities from our company. His contract and iqama are renewable in every year by the company.
          </div>

          <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
            Mr. <strong>{employeeName}</strong> wants to visit the most beautiful schengen country <strong>{destinationCountry}</strong> for <strong>{travelPurpose}</strong>. We further attested that we do not have any objections if he goes to <strong>{destinationCountry}</strong> to enjoy his vacation. Upon completion of his travel and duration of stay, he will return and resume his work with us. If you have any quarries, please feel free to contract with us.
          </div>

          <div style={{ marginTop: '20px' }}>
            <div>Best Regards</div>
            <div style={{ fontWeight: 'bold' }}>{ceoTitle}</div>
            <div style={{ fontWeight: 'bold' }}>{companyNameEn}</div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer Footer */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginTop: '40px' }}>
        <div
          dir="rtl"
          style={{
            fontSize: '9.5px',
            color: '#444444',
            textAlign: 'center',
            lineHeight: '1.4',
            marginBottom: '8px'
          }}
        >
          هذه الوثيقة قدمت إصدارها دون أدنى مسؤولية على الغرفة من خلال بوابة أعمال غرفة جدة وأي إضافة أو كشط أو تعديل على الوثيقة تعتبر لاغية وللتحقق من محتواها يرجى زيارة الموقع الالكتروني <a href="https://es.jcci.org.sa/Home" target="_blank" rel="noreferrer" style={{ color: '#005ca9', textDecoration: 'none' }}>https://es.jcci.org.sa/Home</a>
        </div>

        <div dir="rtl" style={{ fontSize: '9px', fontWeight: 'bold', color: '#333333', textAlign: 'left' }}>
          صفحة 1 من 1
        </div>
      </div>
    </div>
  );
}
