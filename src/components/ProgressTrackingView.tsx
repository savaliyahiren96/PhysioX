import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  User,
  FileText,
  BarChart2,
  Download,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PATIENTS } from '../data/initialDoctorPatientData';

export interface VisitRecord {
  id: string;
  visitNumber: number;
  visitLabel: string;
  date: string;
  painNprs: number; // 0-10
  romFlexionDeg: number; // degrees
  romExtensionDeg: number; // degrees
  strengthMmt: number; // 1-5
  functionalScore: number; // 0-100%
  walkingSpeed: number; // m/s
  symmetryIndex: number; // %
  notes: string;
}

interface PatientProgressTimeline {
  patientId: string;
  patientName: string;
  diagnosis: string;
  dischargeTarget: {
    painNprs: number;
    romFlexionDeg: number;
    romExtensionDeg: number;
    strengthMmt: number;
    functionalScore: number;
    walkingSpeed: number;
    symmetryIndex: number;
  };
  visits: VisitRecord[];
}

const SAMPLE_TIMELINES: PatientProgressTimeline[] = [
  {
    patientId: 'PT-2026-002',
    patientName: 'Jayaben Patel (73F, Pipaliya)',
    diagnosis: 'Post-operative TKR (Right Knee)',
    dischargeTarget: {
      painNprs: 1,
      romFlexionDeg: 120,
      romExtensionDeg: 0,
      strengthMmt: 5,
      functionalScore: 85,
      walkingSpeed: 1.25,
      symmetryIndex: 95,
    },
    visits: [
      {
        id: 'v1',
        visitNumber: 1,
        visitLabel: 'Initial Baseline Assessment',
        date: '2026-09-05',
        painNprs: 6,
        romFlexionDeg: 85,
        romExtensionDeg: -8,
        strengthMmt: 3.5,
        functionalScore: 42,
        walkingSpeed: 0.65,
        symmetryIndex: 64,
        notes: 'Significant extensor lag, heavy reliance on hands for sit-to-stand, antalgic short-stance limp.',
      },
      {
        id: 'v2',
        visitNumber: 2,
        visitLabel: 'Week 3 Reassessment',
        date: '2026-09-26',
        painNprs: 4,
        romFlexionDeg: 96,
        romExtensionDeg: -4,
        strengthMmt: 4.0,
        functionalScore: 56,
        walkingSpeed: 0.82,
        symmetryIndex: 76,
        notes: 'Patellar mobilizations and NMES reduced extensor lag to 4°; tolerates 15 min stationary cycling.',
      },
      {
        id: 'v3',
        visitNumber: 3,
        visitLabel: 'Week 6 Reassessment',
        date: '2026-10-18',
        painNprs: 3,
        romFlexionDeg: 108,
        romExtensionDeg: -2,
        strengthMmt: 4.5,
        functionalScore: 70,
        walkingSpeed: 0.98,
        symmetryIndex: 86,
        notes: 'Independent sit-to-stand from 45 cm standard chair without armrests; climbing 1 flight of stairs.',
      },
      {
        id: 'v4',
        visitNumber: 4,
        visitLabel: 'Current Session (Week 8)',
        date: '2026-10-31',
        painNprs: 2,
        romFlexionDeg: 115,
        romExtensionDeg: 0,
        strengthMmt: 4.5,
        functionalScore: 78,
        walkingSpeed: 1.10,
        symmetryIndex: 90,
        notes: 'Extensor lag completely resolved (0° extension). Progressing to outdoor community walking.',
      },
    ],
  },
  {
    patientId: 'PT-2026-001',
    patientName: 'Pratikbhai Patel (23M, Pipaliya)',
    diagnosis: 'Tibial Shaft Fracture Post-IM Nailing',
    dischargeTarget: {
      painNprs: 0,
      romFlexionDeg: 135,
      romExtensionDeg: 0,
      strengthMmt: 5,
      functionalScore: 95,
      walkingSpeed: 1.35,
      symmetryIndex: 96,
    },
    visits: [
      {
        id: 'v1',
        visitNumber: 1,
        visitLabel: 'Initial Assessment',
        date: '2026-09-02',
        painNprs: 4,
        romFlexionDeg: 125,
        romExtensionDeg: 0,
        strengthMmt: 3.5,
        functionalScore: 52,
        walkingSpeed: 0.88,
        symmetryIndex: 74,
        notes: 'Ankle dorsiflexion 5° restricted, calf weakness (3+/5 MMT), reduced push-off.',
      },
      {
        id: 'v2',
        visitNumber: 2,
        visitLabel: 'Week 4 Reassessment',
        date: '2026-09-30',
        painNprs: 2,
        romFlexionDeg: 130,
        romExtensionDeg: 0,
        strengthMmt: 4.0,
        functionalScore: 68,
        walkingSpeed: 1.05,
        symmetryIndex: 84,
        notes: 'Posterior talar glides increased weight-bearing lunge dorsiflexion to 12 cm; completed 12 single-leg calf raises.',
      },
      {
        id: 'v3',
        visitNumber: 3,
        visitLabel: 'Current Session (Week 8)',
        date: '2026-10-31',
        painNprs: 1,
        romFlexionDeg: 135,
        romExtensionDeg: 0,
        strengthMmt: 4.5,
        functionalScore: 84,
        walkingSpeed: 1.24,
        symmetryIndex: 92,
        notes: 'Completed 22 consecutive single-leg calf raises; cleared for light agility and jogging drills.',
      },
    ],
  },
];

export const ProgressTrackingView: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPatientId, setSelectedPatientId] = useState<string>(SAMPLE_TIMELINES[0].patientId);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newVisitPain, setNewVisitPain] = useState<number>(2);
  const [newVisitRom, setNewVisitRom] = useState<number>(115);
  const [newVisitNotes, setNewVisitNotes] = useState<string>('');

  const currentTimeline =
    SAMPLE_TIMELINES.find((t) => t.patientId === selectedPatientId) || SAMPLE_TIMELINES[0];

  const firstVisit = currentTimeline.visits[0];
  const latestVisit = currentTimeline.visits[currentTimeline.visits.length - 1];

  // Calculate improvements
  const painReduction = firstVisit.painNprs - latestVisit.painNprs;
  const romFlexionGain = latestVisit.romFlexionDeg - firstVisit.romFlexionDeg;
  const functionalScoreGain = latestVisit.functionalScore - firstVisit.functionalScore;
  const symmetryGain = latestVisit.symmetryIndex - firstVisit.symmetryIndex;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'gu'
                ? 'લાંબા ગાળાની પ્રગતિ અને પુનઃમૂલ્યાંકન ટ્રેકિંગ'
                : language === 'hi'
                ? 'दीर्घकालिक प्रगति एवं पुनः मूल्यांकन ट्रैकिंग'
                : 'Longitudinal Progress & Reassessment Tracking'}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {language === 'gu'
              ? 'પ્રારંભિક, ફોલો-અપ અને વર્તમાન સત્રો વચ્ચે સરખામણી ચાર્ટ્સ અને રિકવરી માઇલસ્ટોન્સ'
              : language === 'hi'
              ? 'प्रारंभिक, फॉलो-अप एवं वर्तमान सत्रों के बीच तुलनात्मक चार्ट एवं रिकवरी मील के पत्थर'
              : 'Multi-visit longitudinal comparisons (Initial, Follow-ups, Current vs Discharge Target).'}
          </p>
        </div>

        {/* Patient Timeline Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="text-xs font-semibold text-slate-600">Patient:</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {SAMPLE_TIMELINES.map((t) => (
              <option key={t.patientId} value={t.patientId}>
                {t.patientName} — {t.diagnosis}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Pain Reduction (NPRS)</span>
            <span className="flex items-center text-emerald-600 font-bold">
              <ArrowDownRight className="w-4 h-4" /> -{painReduction} pts
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latestVisit.painNprs}</span>
            <span className="text-xs text-slate-400">/ 10 (Baseline was {firstVisit.painNprs})</span>
          </div>
          <div className="text-[11px] text-teal-700 font-medium">Target: {currentTimeline.dischargeTarget.painNprs}/10</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Flexion ROM Improvement</span>
            <span className="flex items-center text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" /> +{romFlexionGain}°
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latestVisit.romFlexionDeg}°</span>
            <span className="text-xs text-slate-400">active (Baseline was {firstVisit.romFlexionDeg}°)</span>
          </div>
          <div className="text-[11px] text-teal-700 font-medium">Target: {currentTimeline.dischargeTarget.romFlexionDeg}°</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Functional Score Gain</span>
            <span className="flex items-center text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" /> +{functionalScoreGain}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latestVisit.functionalScore}%</span>
            <span className="text-xs text-slate-400">(Baseline was {firstVisit.functionalScore}%)</span>
          </div>
          <div className="text-[11px] text-teal-700 font-medium">Target: &gt;={currentTimeline.dischargeTarget.functionalScore}%</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Gait Symmetry Index</span>
            <span className="flex items-center text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" /> +{symmetryGain}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latestVisit.symmetryIndex}%</span>
            <span className="text-xs text-slate-400">(Baseline was {firstVisit.symmetryIndex}%)</span>
          </div>
          <div className="text-[11px] text-teal-700 font-medium">Target: &gt;={currentTimeline.dischargeTarget.symmetryIndex}%</div>
        </div>
      </div>

      {/* Multi-Visit Timeline Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Longitudinal Multi-Visit Session History</h2>
            <p className="text-xs text-slate-500">Comparing objective physiological milestones from Day 0 through Current Visit</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2 cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Reassessment</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/60 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Visit Session</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Pain (NPRS)</th>
                <th className="py-3 px-4">Active Flexion</th>
                <th className="py-3 px-4">Extension Lag</th>
                <th className="py-3 px-4">MMT Strength</th>
                <th className="py-3 px-4">Functional %</th>
                <th className="py-3 px-4">Gait Speed</th>
                <th className="py-3 px-4">Symmetry %</th>
                <th className="py-3 px-4">Clinical Reassessment Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {currentTimeline.visits.map((v, idx) => {
                const isLatest = idx === currentTimeline.visits.length - 1;
                return (
                  <tr key={v.id} className={isLatest ? 'bg-teal-50/40 font-medium' : ''}>
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                      {isLatest && <span className="w-2 h-2 rounded-full bg-teal-500" />}
                      {v.visitLabel}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{v.date}</td>
                    <td className="py-3 px-4 font-mono font-bold text-red-600">{v.painNprs}/10</td>
                    <td className="py-3 px-4 font-mono text-indigo-700">{v.romFlexionDeg}°</td>
                    <td className="py-3 px-4 font-mono text-amber-700">{v.romExtensionDeg}°</td>
                    <td className="py-3 px-4 font-mono text-teal-800">Grade {v.strengthMmt}/5</td>
                    <td className="py-3 px-4 font-mono text-emerald-700">{v.functionalScore}%</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{v.walkingSpeed} m/s</td>
                    <td className="py-3 px-4 font-mono font-bold text-teal-700">{v.symmetryIndex}%</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={v.notes}>
                      {v.notes}
                    </td>
                  </tr>
                );
              })}

              {/* Discharge Benchmark Row */}
              <tr className="bg-slate-100/70 font-semibold text-slate-700 border-t-2 border-slate-300">
                <td className="py-3 px-4 font-bold text-teal-900">Discharge Criteria Target</td>
                <td className="py-3 px-4 text-slate-400 font-mono">—</td>
                <td className="py-3 px-4 font-mono text-emerald-700">&lt;= {currentTimeline.dischargeTarget.painNprs}/10</td>
                <td className="py-3 px-4 font-mono text-indigo-800">&gt;= {currentTimeline.dischargeTarget.romFlexionDeg}°</td>
                <td className="py-3 px-4 font-mono text-emerald-700">{currentTimeline.dischargeTarget.romExtensionDeg}°</td>
                <td className="py-3 px-4 font-mono text-teal-900">Grade {currentTimeline.dischargeTarget.strengthMmt}/5</td>
                <td className="py-3 px-4 font-mono text-emerald-800">&gt;= {currentTimeline.dischargeTarget.functionalScore}%</td>
                <td className="py-3 px-4 font-mono text-slate-800">&gt;= {currentTimeline.dischargeTarget.walkingSpeed} m/s</td>
                <td className="py-3 px-4 font-mono text-teal-900">&gt;= {currentTimeline.dischargeTarget.symmetryIndex}%</td>
                <td className="py-3 px-4 text-slate-500">Criteria for safe independent community release.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Reassessment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Record New Reassessment Session</h3>
            <p className="text-xs text-slate-500">Document progress for {currentTimeline.patientName}</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pain Level (NPRS 0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={newVisitPain}
                  onChange={(e) => setNewVisitPain(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Active Flexion ROM (°):</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={newVisitRom}
                  onChange={(e) => setNewVisitRom(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Clinical Reassessment Notes:</label>
                <textarea
                  rows={3}
                  value={newVisitNotes}
                  onChange={(e) => setNewVisitNotes(e.target.value)}
                  placeholder="Note functional mobility, transfer improvements, exercise compliance..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newVisit: VisitRecord = {
                    id: `v-${Date.now()}`,
                    visitNumber: currentTimeline.visits.length + 1,
                    visitLabel: `Session #${currentTimeline.visits.length + 1}`,
                    date: new Date().toISOString().split('T')[0],
                    painNprs: newVisitPain,
                    romFlexionDeg: newVisitRom,
                    romExtensionDeg: 0,
                    strengthMmt: 4.5,
                    functionalScore: Math.min(95, latestVisit.functionalScore + 5),
                    walkingSpeed: latestVisit.walkingSpeed + 0.05,
                    symmetryIndex: Math.min(98, latestVisit.symmetryIndex + 3),
                    notes: newVisitNotes || 'Routine follow-up progression recorded.',
                  };
                  currentTimeline.visits.push(newVisit);
                  setShowAddModal(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition-colors cursor-pointer"
              >
                Save Reassessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
