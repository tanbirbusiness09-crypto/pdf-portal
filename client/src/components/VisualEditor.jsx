import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, RotateCcw, UserCheck, CreditCard, Shield, DollarSign } from 'lucide-react';

export default function VisualEditor({ value, onChange, onReset }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertToken = (token) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertHTML', false, `<strong>${token}</strong>`);
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="visual-editor-container" style={{ borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      {/* MS Word Style Formatting Toolbar */}
      <div
        className="editor-toolbar"
        style={{
          background: 'var(--bg-card-hover)',
          padding: '0.5rem 0.75rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
            onClick={() => execCmd('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={14} />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
            onClick={() => execCmd('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={14} />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
            onClick={() => execCmd('underline')}
            title="Underline (Ctrl+U)"
          >
            <Underline size={14} />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
            onClick={() => execCmd('insertUnorderedList')}
            title="Bullet List"
          >
            <List size={14} />
          </button>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="btn btn-secondary"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
            title="Reset to Original Jeddah Chamber Text"
          >
            <RotateCcw size={12} />
            <span>Reset Default</span>
          </button>
        )}
      </div>

      {/* Quick Field Insertion Badges */}
      <div
        style={{
          background: 'var(--bg-input)',
          padding: '0.4rem 0.75rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          overflowX: 'auto'
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', flexShrink: 0 }}>
          Insert Field:
        </span>
        <button
          type="button"
          onClick={() => insertToken('[Employee Name]')}
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', cursor: 'pointer' }}
        >
          + Employee Name
        </button>
        <button
          type="button"
          onClick={() => insertToken('[Passport No]')}
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', cursor: 'pointer' }}
        >
          + Passport No
        </button>
        <button
          type="button"
          onClick={() => insertToken('[IQAMA No]')}
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.3)', cursor: 'pointer' }}
        >
          + IQAMA No
        </button>
        <button
          type="button"
          onClick={() => insertToken('[Monthly Salary]')}
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid rgba(6, 182, 212, 0.3)', cursor: 'pointer' }}
        >
          + Salary
        </button>
      </div>

      {/* Visual ContentEditable Box (No HTML code visible) */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          minHeight: '220px',
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '1rem',
          background: 'var(--bg-input)',
          color: 'var(--text-main)',
          fontSize: '0.92rem',
          lineHeight: '1.65',
          outline: 'none'
        }}
      />
    </div>
  );
}
