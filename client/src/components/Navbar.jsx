import React from 'react';
import { FileText, Upload, PlusCircle, LayoutDashboard, ExternalLink } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="/" className="nav-brand">
          <div className="brand-icon">
            <FileText size={22} />
          </div>
          <div>
            <span>PDF</span>
            <span style={{ color: '#3b82f6', marginLeft: '4px' }}>Portal</span>
          </div>
        </a>

        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={17} />
            <span>Upload PDF</span>
          </button>

          <button
            className={`nav-tab ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            <PlusCircle size={17} />
            <span>PDF Builder</span>
          </button>
        </div>
      </div>
    </header>
  );
}
