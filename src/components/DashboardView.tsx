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
} from 'lucide-react';
import { PatientIntake } from '../types/clinical';
import { DEMO_PATIENTS, SPECIALTIES_CONFIG } from '../data/clinicalKnowledge';

interface DashboardViewProps {
  onSelectPatient: (patient: PatientIntake) => void;
  onNewAssessment: () => void;
  onNavigate: (view: 'dashboard' | 'wizard' | 'evidence' | 'watchlists' | 'governance') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectPatient,
  onNewAssessment,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onNewAssessment}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Start New Patient Encounter</span>
            </button>
            <button
              onClick={() => onNavigate('evidence')}
              className="px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Evidence CPGs</span>
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
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">12 Indexed</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Sens/Spec & Likelihood Ratios</div>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <div className="text-slate-400 text-[11px]">Target Specialties</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">10 Modules</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Musculoskeletal MVP Ready</div>
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
              className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                spec.mvpReady
                  ? 'border-teal-700/40 bg-teal-50/20 hover:border-teal-700 shadow-xs'
                  : 'border-slate-200 bg-white opacity-85 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      spec.mvpReady
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {spec.mvpReady ? 'Active MVP' : 'Extensible'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mt-2 leading-snug">{spec.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{spec.scopeSummary}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                {spec.supportedComplaints.length} Conditions
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
    </div>
  );
};
