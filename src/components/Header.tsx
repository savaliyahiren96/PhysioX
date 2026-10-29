import React from 'react';
import { ShieldAlert, BookOpen, Search, UserCheck, Stethoscope, FileText } from 'lucide-react';

interface HeaderProps {
  activeView: 'dashboard' | 'wizard' | 'evidence' | 'watchlists' | 'governance';
  onNavigate: (view: 'dashboard' | 'wizard' | 'evidence' | 'watchlists' | 'governance') => void;
  onStartNewAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onStartNewAssessment }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400 font-bold text-lg">
              <Stethoscope className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">ClinicaAI</span>
              <span className="hidden sm:inline text-xs text-slate-500 ml-2 border-l border-slate-200 pl-2">
                Clinical Decision-Support
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-line, unboxed, text with hover states) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'dashboard' ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              Patient Registry
            </button>
            <button
              onClick={() => onNavigate('evidence')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeView === 'evidence' ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Evidence Library
            </button>
            <button
              onClick={() => onNavigate('watchlists')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeView === 'watchlists' ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              Research Monitor
            </button>
            <button
              onClick={() => onNavigate('governance')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeView === 'governance' ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              Clinical Governance
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onStartNewAssessment}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              New Clinical Assessment
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
