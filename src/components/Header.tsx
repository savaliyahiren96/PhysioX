import React, { useState } from 'react';
import {
  ShieldAlert,
  BookOpen,
  Search,
  Stethoscope,
  FileText,
  Activity,
  Trophy,
  Dumbbell,
  Apple,
  Microscope,
  Users,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import { AudienceScopeModal } from './AudienceScopeModal';

export type AppView =
  | 'dashboard'
  | 'wizard'
  | 'evidence'
  | 'watchlists'
  | 'governance'
  | 'protocols'
  | 'athlete'
  | 'sandc'
  | 'nutrition'
  | 'investigations'
  | 'mdt';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onStartNewAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onStartNewAssessment }) => {
  const [sportsMenuOpen, setSportsMenuOpen] = useState(false);
  const [scopeModalOpen, setScopeModalOpen] = useState(false);

  const isSportsActive =
    activeView === 'athlete' || activeView === 'sandc' || activeView === 'nutrition';

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400 font-bold text-lg">
              <Stethoscope className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">ClinicaAI</span>
              <span className="hidden xl:inline text-xs text-slate-500 ml-2 border-l border-slate-200 pl-2">
                Clinical Decision Support & Sports Science
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-line, unboxed, text with hover states) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'dashboard' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              Patient Registry
            </button>

            <button
              onClick={() => onNavigate('protocols')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeView === 'protocols' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>Protocols & Rehab</span>
            </button>

            {/* Sports & Athlete Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSportsMenuOpen(!sportsMenuOpen)}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer py-1 ${
                  isSportsActive ? 'text-emerald-800 font-bold' : ''
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sports & Athlete Hub</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {sportsMenuOpen && (
                <div
                  onMouseLeave={() => setSportsMenuOpen(false)}
                  className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 text-xs space-y-0.5"
                >
                  <button
                    onClick={() => {
                      onNavigate('athlete');
                      setSportsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'athlete' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-semibold">Athlete Testing & Return-to-Sport</div>
                      <div className="text-[10px] text-slate-400">Cricket, Kabaddi, Badminton, Football</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('sandc');
                      setSportsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'sandc' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Dumbbell className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-semibold">Strength & Conditioning (S&C)</div>
                      <div className="text-[10px] text-slate-400">Periodisation, 1RM, Indian gym adaptations</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('nutrition');
                      setSportsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'nutrition' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Apple className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-semibold">Sports Nutrition & Indian Diet</div>
                      <div className="text-[10px] text-slate-400">ICMR-NIN guidelines, budget staples</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('investigations')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeView === 'investigations' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <Microscope className="w-3.5 h-3.5 text-slate-400" />
              <span>Diagnostics Atlas</span>
            </button>

            <button
              onClick={() => onNavigate('mdt')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeView === 'mdt' ? 'text-indigo-700 font-bold' : ''
              }`}
            >
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>MDT Consensus</span>
            </button>

            <button
              onClick={() => onNavigate('evidence')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeView === 'evidence' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>CPGs</span>
            </button>

            <button
              onClick={() => onNavigate('governance')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeView === 'governance' ? 'text-teal-700 font-bold' : ''
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>Governance</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Guide */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setScopeModalOpen(true)}
              className="px-2.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="View Target Users & Clinical Scope Matrix"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Who Is This For?</span>
            </button>

            <button
              onClick={onStartNewAssessment}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>New Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Audience & Clinical Scope Matrix Modal */}
      <AudienceScopeModal
        isOpen={scopeModalOpen}
        onClose={() => setScopeModalOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
};
