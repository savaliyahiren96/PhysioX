import React, { useState } from 'react';
import {
  Home,
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
  Globe,
  UserCheck,
  User,
  Camera,
  Compass,
  TrendingUp,
  Calculator,
  RotateCcw,
  Lock,
  GraduationCap,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { AudienceScopeModal } from './AudienceScopeModal';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';
import { useUserRole } from '../context/UserRoleContext';

export type AppView =
  | 'home'
  | 'doctor-dashboard'
  | 'patient-profile'
  | 'private-registry'
  | 'student-hub'
  | 'admin-governance'
  | 'dashboard'
  | 'assessment-format'
  | 'wizard'
  | 'evidence'
  | 'watchlists'
  | 'governance'
  | 'protocols'
  | 'motion'
  | 'posture'
  | 'biomechanics'
  | 'outcomes'
  | 'progress'
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
  const { language, setLanguage, t } = useLanguage();
  const { currentRole, setRole } = useUserRole();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [sportsMenuOpen, setSportsMenuOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [scopeModalOpen, setScopeModalOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSportsActive =
    activeView === 'athlete' || activeView === 'sandc' || activeView === 'nutrition';

  const isAiActive =
    activeView === 'motion' ||
    activeView === 'posture' ||
    activeView === 'biomechanics' ||
    activeView === 'outcomes' ||
    activeView === 'progress';

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onNavigate('home')}
            title="Go to ClinicaAI Home & Physio Encyclopedia"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 font-bold text-lg shadow-sm">
              <Stethoscope className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">ClinicaAI</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-100 text-teal-800 tracking-wide">
                  PRO
                </span>
              </div>
              <span className="hidden xl:inline text-[11px] text-slate-500 font-medium">
                {t('app.tagline')}
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-line, unboxed, text with hover states) */}
          <nav className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600">
            {/* 1. Home Link */}
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                activeView === 'home'
                  ? 'bg-slate-900 text-teal-300 font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t('nav.home', 'Home')}</span>
            </button>

            {/* 2. Physio Encyclopedia Link */}
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                activeView === 'home' || activeView === 'protocols'
                  ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              title="Open-access Comprehensive Clinical Physiotherapy Encyclopedia"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('nav.encyclopedia', 'Physio Encyclopedia')}</span>
            </button>

            {/* 3. Doctor Profile Link */}
            <button
              onClick={() => onNavigate('doctor-dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                activeView === 'doctor-dashboard'
                  ? 'bg-teal-900 text-teal-200 font-bold shadow-xs'
                  : 'bg-teal-50 text-teal-800 hover:bg-teal-100 font-semibold border border-teal-200'
              }`}
              title="Dr. Darpan Vanavi Workspace & Patient Roster"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('nav.doctorDashboard')}</span>
            </button>

            {/* 4. Private Patient Registry (Doctor's Confidential Records) */}
            <button
              onClick={() => onNavigate('private-registry')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                activeView === 'private-registry'
                  ? 'bg-amber-900 text-amber-200 font-bold shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 font-semibold border border-amber-300'
              }`}
              title="Encrypted Confidential Patient Vault"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('nav.privateRegistry')}</span>
            </button>

            {/* 5. Student Academic Hub */}
            <button
              onClick={() => onNavigate('student-hub')}
              className={`hover:text-purple-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                activeView === 'student-hub'
                  ? 'bg-purple-900 text-purple-200 font-bold shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 font-semibold border border-purple-200'
              }`}
              title="BPT & MPT Academic Case Hub, Viva Quizzes & Special Tests"
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span>{t('nav.studentHub')}</span>
            </button>

            {/* 6. Clinical Assessment 3-Tier */}
            <button
              onClick={() => onNavigate('assessment-format')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                activeView === 'assessment-format'
                  ? 'bg-indigo-900 text-indigo-200 font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t('nav.assessment3Tier')}</span>
            </button>

            {/* 7. AI Motion & Biomechanics Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAiMenuOpen(!aiMenuOpen)}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                  isAiActive ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                <span>{t('nav.aiBiomechanics')}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {aiMenuOpen && (
                <div
                  onMouseLeave={() => setAiMenuOpen(false)}
                  className="absolute left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 text-xs space-y-0.5"
                >
                  <button
                    onClick={() => {
                      onNavigate('motion');
                      setAiMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'motion' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Activity className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-semibold">{t('nav.motion')}</div>
                      <div className="text-[10px] text-slate-400">8 Gait phases, cadence, symmetry index</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('posture');
                      setAiMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'posture' ? 'bg-indigo-50 text-indigo-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Camera className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-semibold">{t('nav.posture')}</div>
                      <div className="text-[10px] text-slate-400">4 Views (Anterior/Lateral), plumb line</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('biomechanics');
                      setAiMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'biomechanics' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-semibold">{t('nav.biomechanics')}</div>
                      <div className="text-[10px] text-slate-400">14 Joint complexes, open/closed chain</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('outcomes');
                      setAiMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'outcomes' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-semibold">{t('nav.outcomes')}</div>
                      <div className="text-[10px] text-slate-400">LEFS, QuickDASH, Berg Balance, TUG</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('progress');
                      setAiMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${
                      activeView === 'progress' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-semibold">{t('nav.progress')}</div>
                      <div className="text-[10px] text-slate-400">Multi-visit session progression & targets</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Sports & Athlete Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSportsMenuOpen(!sportsMenuOpen)}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer px-2.5 py-1.5 rounded-lg ${
                  isSportsActive ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('nav.sportsHub')}</span>
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
                      <div className="font-semibold">{t('nav.athleteTesting')}</div>
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
                      <div className="font-semibold">{t('nav.sandc')}</div>
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
                      <div className="font-semibold">{t('nav.nutrition')}</div>
                      <div className="text-[10px] text-slate-400">ICMR-NIN guidelines, budget staples</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Diagnostics Atlas */}
            <button
              onClick={() => onNavigate('investigations')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer px-2 py-1.5 rounded-lg ${
                activeView === 'investigations' ? 'bg-slate-100 text-teal-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Microscope className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('nav.diagnostics')}</span>
            </button>

            {/* About ClinicaAI */}
            <button
              onClick={() => setScopeModalOpen(true)}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              title="About ClinicaAI & Scope Matrix"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>About</span>
            </button>
          </nav>

          {/* Zone 3: Language Selector & Primary Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Active Clinical Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 cursor-pointer shadow-2xs"
                title="Switch Active Clinical Role"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="capitalize">{currentRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div
                  onMouseLeave={() => setRoleMenuOpen(false)}
                  className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 text-xs space-y-1"
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Active Role
                  </div>

                  <button
                    onClick={() => {
                      setRole('doctor');
                      onNavigate('doctor-dashboard');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                      currentRole === 'doctor' ? 'bg-teal-50 text-teal-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-semibold">Doctor (Dr. Darpan)</div>
                      <div className="text-[10px] text-slate-400">Profile, Assessments, Private Vault</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setRole('physiotherapist');
                      onNavigate('assessment-format');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                      currentRole === 'physiotherapist' ? 'bg-indigo-50 text-indigo-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-semibold">Physiotherapist Specialist</div>
                      <div className="text-[10px] text-slate-400">Assessments, ROM/MMT, Protocols</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setRole('student');
                      onNavigate('student-hub');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                      currentRole === 'student' ? 'bg-purple-50 text-purple-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-semibold">BPT & MPT Student Hub</div>
                      <div className="text-[10px] text-slate-400">Educational Cases, Tests, Quizzes</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setRole('admin');
                      onNavigate('admin-governance');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                      currentRole === 'admin' ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-700" />
                    <div>
                      <div className="font-semibold">Administrator</div>
                      <div className="text-[10px] text-slate-400">Tenant Isolation, DPDP, Audit Logs</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher Pill: English | हिंदी | ગુજરાતી */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
              <div className="px-1.5 text-slate-400 hidden sm:block">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-teal-800 shadow-xs font-bold border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                <span className="sm:hidden">EN</span>
                <span className="hidden sm:inline">English</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-white text-teal-800 shadow-xs font-bold border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी में बदलें (Switch to Hindi)"
              >
                <span>हिंदी</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('gu')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'gu'
                    ? 'bg-white text-teal-800 shadow-xs font-bold border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ગુજરાતીમાં બદલો (Switch to Gujarati)"
              >
                <span>ગુજરાતી</span>
              </button>
            </div>

            <button
              onClick={() => setScopeModalOpen(true)}
              className="px-2.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="View Target Users & Clinical Scope Matrix"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden md:inline">{t('app.whoFor')}</span>
            </button>

            <button
              onClick={onStartNewAssessment}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">{t('app.newAssessment')}</span>
              <span className="sm:hidden">+ New</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 py-3 px-2 bg-slate-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-slate-200">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-bold ${
                  activeView === 'home'
                    ? 'bg-slate-900 text-teal-300'
                    : 'bg-white text-slate-800 border border-slate-200'
                }`}
              >
                <Home className="w-4 h-4 text-teal-500" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg flex items-center gap-2 text-xs font-bold bg-teal-50 text-teal-900 border border-teal-200"
              >
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Encyclopedia</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('doctor-dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-bold ${
                  activeView === 'doctor-dashboard'
                    ? 'bg-teal-900 text-teal-200'
                    : 'bg-white text-teal-900 border border-teal-200'
                }`}
              >
                <UserCheck className="w-4 h-4 text-teal-600" />
                <span>Doctor Workspace</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('private-registry');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-bold ${
                  activeView === 'private-registry'
                    ? 'bg-amber-900 text-amber-200'
                    : 'bg-white text-amber-900 border border-amber-300'
                }`}
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Private Vault 🔒</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('student-hub');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-bold ${
                  activeView === 'student-hub'
                    ? 'bg-purple-900 text-purple-200'
                    : 'bg-white text-purple-900 border border-purple-200'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Student Hub 🎓</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('assessment-format');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-bold ${
                  activeView === 'assessment-format'
                    ? 'bg-indigo-900 text-indigo-200'
                    : 'bg-white text-indigo-900 border border-indigo-200'
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>3-Tier Assess</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              AI Motion & Performance
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <button
                onClick={() => {
                  onNavigate('motion');
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded bg-white border border-slate-200 text-left flex items-center gap-2 text-slate-700"
              >
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                <span>Gait & Motion</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('posture');
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded bg-white border border-slate-200 text-left flex items-center gap-2 text-slate-700"
              >
                <Camera className="w-3.5 h-3.5 text-indigo-600" />
                <span>Posture Analysis</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('biomechanics');
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded bg-white border border-slate-200 text-left flex items-center gap-2 text-slate-700"
              >
                <Compass className="w-3.5 h-3.5 text-teal-600" />
                <span>Biomechanics</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('outcomes');
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded bg-white border border-slate-200 text-left flex items-center gap-2 text-slate-700"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>Outcome Measures</span>
              </button>
            </div>
          </div>
        )}
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
