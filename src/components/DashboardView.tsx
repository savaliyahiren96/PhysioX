import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  FileText,
  Activity,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  Plus,
  Clock,
  Sparkles,
  Trophy,
  Dumbbell,
  Apple,
  Microscope,
  HelpCircle,
} from 'lucide-react';
import { PatientIntake } from '../types/clinical';
import { DEMO_PATIENTS, SPECIALTIES_CONFIG } from '../data/clinicalKnowledge';
import { AudienceScopeModal } from './AudienceScopeModal';

import { AppView } from './Header';

interface DashboardViewProps {
  onSelectPatient: (patient: PatientIntake) => void;
  onNewAssessment: () => void;
  onNavigate: (view: AppView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectPatient,
  onNewAssessment,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scopeModalOpen, setScopeModalOpen] = useState(false);

  const filteredPatients = DEMO_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome Ribbon */}
      <div className="border border-slate-200 rounded-2xl bg-white p-6 sm:p-8 space-y-4 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span>ClinicaAI Clinical Decision-Support System · v2.4.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              From Patient Presentation to Evidence-Informed Clinical Decisions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Adaptive clinical intake, mandatory red-flag safety screening, physical diagnostic accuracy criteria, evidence-linked differentials, and multidisciplinary referral summaries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => setScopeModalOpen(true)}
              className="px-3.5 py-3 bg-teal-50 border border-teal-200 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>Who Is This For?</span>
            </button>
            <button
              onClick={onNewAssessment}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Start New Patient Encounter</span>
            </button>
            <button
              onClick={() => onNavigate('protocols')}
              className="px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Joint Protocols</span>
            </button>
          </div>
        </div>

        {/* 4 Quantitative Clinical KPIs Strip (Tabular Figures) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <div className="text-slate-400 text-[11px]">Validated CPG Guidelines</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">18 Active</div>
            <div className="text-[10px] text-teal-700 mt-0.5">AAOS · NICE · JOSPT · ACR</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <div className="text-slate-400 text-[11px]">Safety Red-Flag Modules</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">100% Screened</div>
            <div className="text-[10px] text-rose-700 mt-0.5">Cauda Equina & Septic Arth.</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <div className="text-slate-400 text-[11px]">Bedside Diagnostic Tests</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">32 Indexed</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Sens/Spec & Likelihood Ratios</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <div className="text-slate-400 text-[11px]">Medical & Sports Disciplines</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">18 Active</div>
            <div className="text-[10px] text-teal-700 mt-0.5">India & Global Guidelines</div>
          </div>
        </div>
      </div>

      {/* Featured Indian Sports Science & Diagnostics Hub Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Sports Science, S&C, Nutrition & Indian Diagnostics</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive athletic preparation and hospital diagnostics aligned with SAI, BCCI, ICMR-NIN, and Ayushman Bharat.
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-mono font-semibold">5 Integrated Hubs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div
            onClick={() => onNavigate('athlete')}
            className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center mb-2">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-900">
              Sports Performance & RTS
            </div>
            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
              Cricket, Kabaddi, Badminton, Football, Hockey & Wrestling screening, testing & return to sport.
            </p>
            <div className="mt-3 text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
              <span>Open Sport Pathways</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('sandc')}
            className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-400 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center mb-2">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 group-hover:text-teal-900">
              Strength & Conditioning
            </div>
            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
              Periodisation (Block, DUP, Linear), 1RM estimators, volume loads, Indian gym adaptations.
            </p>
            <div className="mt-3 text-[10px] text-teal-800 font-semibold flex items-center gap-1">
              <span>Plan S&C Programs</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('nutrition')}
            className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-400 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-2">
              <Apple className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 group-hover:text-amber-900">
              Sports Nutrition (ICMR-NIN)
            </div>
            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
              Indian diet plans (Sattu, Paneer, Soya, Dahi), budget meal schedules, hydration & RED-S.
            </p>
            <div className="mt-3 text-[10px] text-amber-800 font-semibold flex items-center gap-1">
              <span>Build Diet Schedule</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('investigations')}
            className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/40 hover:bg-cyan-50 hover:border-cyan-400 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-700 text-white flex items-center justify-center mb-2">
              <Microscope className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 group-hover:text-cyan-900">
              Indian Diagnostics Atlas
            </div>
            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
              AIIMS vs District Hospital costs in INR, Ayushman Bharat PM-JAY packages, visual landmarks.
            </p>
            <div className="mt-3 text-[10px] text-cyan-800 font-semibold flex items-center gap-1">
              <span>Explore Imaging Atlas</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('mdt')}
            className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50 hover:border-indigo-400 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center mb-2">
              <Users className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-900">
              MDT Case Discussions
            </div>
            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
              Ortho, Physio, Sports Physician, S&C Coach, and Dietitian collaborative consensus.
            </p>
            <div className="mt-3 text-[10px] text-indigo-800 font-semibold flex items-center gap-1">
              <span>View Case Conferences</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Target Specialties Grid (Extensible Architecture) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Extensible Clinical Specialties Architecture</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Initial MVP deployed for Knee and Lumbar Spine; extensible architecture for additional medical specialties.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">10 Specialties Mapped</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SPECIALTIES_CONFIG.map((spec) => (
            <div
              key={spec.id}
              onClick={() => onNavigate('protocols')}
              className="p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between border-teal-700/40 bg-teal-50/20 hover:border-teal-700 hover:bg-teal-50/40 shadow-xs cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-teal-700 text-white">
                    Active Module
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mt-2 leading-snug">{spec.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{spec.scopeSummary}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-teal-800 font-mono">
                <span>{spec.supportedComplaints.length} Protocols</span>
                <span className="font-sans font-medium text-teal-700">View &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preloaded Clinical Demonstration Patients & Registry */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Patient Registry & Demonstration Cases</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any preloaded fictional case to examine adaptive history, red flags, physical tests, and differentials.
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients, MRN, complaint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-teal-700 shadow-xs"
            />
          </div>
        </div>

        {/* Patient Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => {
            const isRedFlagDemo = patient.chiefComplaint.toLowerCase().includes('numbness') || patient.notes.includes('SIMULATION');

            return (
              <div
                key={patient.id}
                className={`border rounded-2xl p-5 space-y-4 transition-all shadow-xs flex flex-col justify-between ${
                  isRedFlagDemo
                    ? 'border-rose-300 bg-rose-50/20 hover:border-rose-400'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{patient.name}</h3>
                        <span className="text-[11px] font-mono text-slate-400">MRN: {patient.mrn}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {patient.age} yrs · {patient.sex} · {patient.occupation}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isRedFlagDemo
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isRedFlagDemo ? 'Red-Flag Case' : patient.onset}
                    </span>
                  </div>

                  <div className="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 font-normal block text-[11px]">Chief Complaint:</span>
                    {patient.chiefComplaint}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Location:</span>
                      <span className="line-clamp-1">{patient.anatomicalLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">NPRS Pain Severity:</span>
                      <span className="font-mono font-bold text-slate-900">{patient.severityNprs}/10</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Goal: <span className="text-slate-600">{patient.patientGoals.slice(0, 45)}...</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectPatient(patient)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                  >
                    <span>Launch Clinical Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Audience & Scope Matrix Modal */}
      <AudienceScopeModal
        isOpen={scopeModalOpen}
        onClose={() => setScopeModalOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
