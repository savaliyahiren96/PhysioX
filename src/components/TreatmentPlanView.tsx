import React, { useState, useMemo } from 'react';
import {
  Pill,
  Shield,
  AlertOctagon,
  CheckSquare,
  Calendar,
  ArrowRight,
  UserCheck,
  Activity,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { TreatmentRecommendation, PatientIntake } from '../types/clinical';
import { ALL_JOINT_CONDITIONS } from '../data/jointProtocolsData';

interface TreatmentPlanViewProps {
  treatment: TreatmentRecommendation;
  patient?: PatientIntake;
  primaryDiagnosis?: string;
  onUpdateTreatment: (updated: TreatmentRecommendation) => void;
  onProceed: () => void;
}

export const TreatmentPlanView: React.FC<TreatmentPlanViewProps> = ({
  treatment,
  patient,
  primaryDiagnosis,
  onUpdateTreatment,
  onProceed,
}) => {
  // Find matching joint condition from library or default to first
  const defaultCondition = useMemo(() => {
    if (primaryDiagnosis) {
      const match = ALL_JOINT_CONDITIONS.find(
        (c) =>
          c.name.toLowerCase().includes(primaryDiagnosis.toLowerCase()) ||
          primaryDiagnosis.toLowerCase().includes(c.name.toLowerCase())
      );
      if (match) return match;
    }
    if (patient?.chiefComplaint) {
      const complaintLower = patient.chiefComplaint.toLowerCase();
      const match = ALL_JOINT_CONDITIONS.find((c) =>
        complaintLower.includes(c.name.toLowerCase()) ||
        complaintLower.includes(c.joint.toLowerCase())
      );
      if (match) return match;
    }
    return ALL_JOINT_CONDITIONS[0]; // ACL Rupture
  }, [primaryDiagnosis, patient]);

  const [selectedConditionId, setSelectedConditionId] = useState<string>(defaultCondition.id);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showFullProtocol, setShowFullProtocol] = useState<boolean>(true);

  const activeCondition = useMemo(() => {
    return (
      ALL_JOINT_CONDITIONS.find((c) => c.id === selectedConditionId) ||
      defaultCondition
    );
  }, [selectedConditionId, defaultCondition]);

  const handleCopyRegimen = () => {
    const phase = activeCondition.physiotherapyProtocol.phases[activePhaseIndex];
    const text = `
CLINICAAI PHYSIOTHERAPY PRESCRIPTION
Condition: ${activeCondition.name} (${activeCondition.joint})
Phase ${phase.phaseNumber}: ${phase.phaseName} (${phase.timeline})
Goals: ${phase.clinicalGoals.join(', ')}

EXERCISE DOSING:
${phase.exercisePrescription
  .map(
    (e) =>
      `• [${e.category}] ${e.exerciseName} - ${e.dosage}\n  Rationale: ${e.clinicalRationale}`
  )
  .join('\n')}

PROGRESSION CRITERIA:
${phase.progressionCriteria.join(', ')}

PRECAUTIONS:
${phase.precautionsAndContraindications.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAdoptIntoRehab = () => {
    const phase = activeCondition.physiotherapyProtocol.phases[activePhaseIndex];
    const newItems = phase.exercisePrescription.map(
      (e) => `[Phase ${phase.phaseNumber} - ${e.category}] ${e.exerciseName}: ${e.dosage}`
    );
    onUpdateTreatment({
      ...treatment,
      conservativeRehab: Array.from(new Set([...treatment.conservativeRehab, ...newItems])),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Treatment & Clinical Management Plan</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured, clinician-reviewable rehabilitation options, education, precautions, and specialist thresholds.
          </p>
        </div>
      </div>

      {/* Mandatory Non-Prescribing Governance Shield */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Professional Scope & Prescribing Governance Shield
          </div>
          <p className="leading-relaxed">
            ClinicaAI never autonomously prescribes pharmaceuticals or authorizes interventions. All medication details presented are contextual educational references sourced from authoritative CPGs (e.g. NICE NG59, ACR 2020). Prescriptions and therapeutic procedures remain under the exclusive professional judgment of licensed clinicians.
          </p>
        </div>
      </div>

      {/* FEATURED: Evidence-Based Phased Physiotherapy Protocol Visualizer */}
      <div className="border-2 border-teal-600/30 rounded-2xl bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-lg text-teal-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Evidence-Based 4-Phase Physiotherapy Protocol
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-teal-50 text-teal-800 rounded-full border border-teal-200">
                  Dosed Rehabilitation
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Objective criteria-based progressions from acute protection to return-to-sport/work.
              </p>
            </div>
          </div>

          {/* Condition Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Condition:
            </label>
            <select
              value={selectedConditionId}
              onChange={(e) => {
                setSelectedConditionId(e.target.value);
                setActivePhaseIndex(0);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 max-w-[220px]"
            >
              {ALL_JOINT_CONDITIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.joint}: {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Protocol Summary & Guideline Basis */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-semibold text-slate-900">{activeCondition.name}</span>
            <span className="text-slate-400 mx-2">·</span>
            <span className="text-teal-700 font-medium">Basis: {activeCondition.physiotherapyProtocol.guidelineBasis}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyRegimen}
              className="px-2.5 py-1 text-xs text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{isCopied ? 'Copied' : 'Copy Phase'}</span>
            </button>
            <button
              type="button"
              onClick={handleAdoptIntoRehab}
              className="px-2.5 py-1 text-xs text-teal-800 bg-teal-50 border border-teal-200 rounded hover:bg-teal-100 flex items-center gap-1 font-semibold shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Import to Active Plan</span>
            </button>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {activeCondition.physiotherapyProtocol.phases.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={phase.phaseNumber}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-teal-700 bg-teal-50/80 ring-1 ring-teal-600 text-slate-900 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-teal-700">
                  PHASE {phase.phaseNumber}
                </div>
                <div className="text-xs font-semibold mt-0.5 line-clamp-1">
                  {phase.phaseName}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {phase.timeline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Details */}
        {activeCondition.physiotherapyProtocol.phases[activePhaseIndex] && (
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-4 text-xs">
            {/* Phase Goals */}
            <div>
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Phase {activeCondition.physiotherapyProtocol.phases[activePhaseIndex].phaseNumber} Clinical Goals:
              </span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {activeCondition.physiotherapyProtocol.phases[activePhaseIndex].clinicalGoals.map((g, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700 text-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                    <span>{g}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Exercise Prescription Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Category</th>
                    <th className="py-2 px-3 font-semibold">Exercise Name</th>
                    <th className="py-2 px-3 font-semibold">Dosage / Dosing</th>
                    <th className="py-2 px-3 font-semibold">Biomechanical Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeCondition.physiotherapyProtocol.phases[activePhaseIndex].exercisePrescription.map(
                    (ex, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-medium text-teal-800 whitespace-nowrap align-top">
                          {ex.category}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900 align-top">
                          {ex.exerciseName}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700 whitespace-nowrap align-top">
                          {ex.dosage}
                        </td>
                        <td className="py-2 px-3 text-slate-600 align-top">
                          {ex.clinicalRationale}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Progression & Precautions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Progression Gateways to Next Phase</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {activeCondition.physiotherapyProtocol.phases[activePhaseIndex].progressionCriteria.map(
                    (p, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Phase Precautions & Limits</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {activeCondition.physiotherapyProtocol.phases[activePhaseIndex].precautionsAndContraindications.map(
                    (p, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2-Column Core Interventions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Conservative Rehab */}
        <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-teal-700" />
            Active Rehabilitation & Physical Therapy
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {treatment.conservativeRehab.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal-700 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Education & Self-Management */}
        <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-slate-700" />
            Patient Education & Pain Science Framing
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {treatment.patientEducation.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Precautions and Contraindications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Precautions */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
          <div className="font-bold text-amber-950 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-700" />
            Clinical Precautions & Monitoring Triggers
          </div>
          <ul className="space-y-1.5 text-amber-900">
            {treatment.precautions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-amber-700">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contraindications */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
          <div className="font-bold text-rose-950 flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-rose-700" />
            Strict Clinical Contraindications
          </div>
          <ul className="space-y-1.5 text-rose-900">
            {treatment.contraindications.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-rose-700">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pharmacological Reference Context */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-2 shadow-xs text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Pill className="w-4 h-4 text-teal-700" />
          <span>Evidence-Based Pharmacological Context (Guideline Appraisal):</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          {treatment.pharmacologyContext}
        </p>
      </div>

      {/* Specialist Consultation Criteria & Reassessment Schedule */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs text-xs">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-teal-700" />
          Specialist Referral Thresholds & Reassessment Schedule
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="font-semibold text-slate-700">Triggers for Specialist Escalation:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {treatment.specialistConsultThresholds.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <span className="font-semibold text-slate-700">Planned Follow-Up Milestones:</span>
            <p className="text-slate-600 leading-relaxed">{treatment.reassessmentTimeline}</p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Finalize assessment and generate multidisciplinary referral and clinical report.
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <span>Generate Referral & Final Clinical Report</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
