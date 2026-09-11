import React, { useState, useEffect } from 'react';
import { FileText, Upload, PlusCircle, LayoutDashboard, Maximize2, Minimize2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

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

        <div className="nav-controls">
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

          {/* Full Screen Toggle Button */}
          <button
            className="btn btn-secondary"
            onClick={toggleFullscreen}
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            title={isFullscreen ? 'Exit Full Screen' : 'Full Screen View'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span>{isFullscreen ? 'Exit Full' : 'Full Screen'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
