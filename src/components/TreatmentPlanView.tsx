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
  GitCompare,
  BookOpen,
  Search,
  X,
  ExternalLink,
  FileCheck,
  CheckCircle,
  Sliders,
  ChevronRight,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  TreatmentRecommendation,
  PatientIntake,
  JointConditionMaster,
  SpecialtyConditionMaster,
  NamedProtocolMaster,
  ProtocolComparison,
} from '../types/clinical';
import { ALL_JOINT_CONDITIONS } from '../data/jointProtocolsData';
import { ALL_SPECIALTY_CONDITIONS } from '../data/specialtyProtocolsData';
import {
  MASTER_NAMED_PROTOCOLS,
  DEFAULT_PROTOCOL_COMPARISONS,
} from '../data/namedProtocolsLibrary';
import { NamedProtocolsLibrary } from './NamedProtocolsLibrary';

const COMBINED_ALL_CONDITIONS: (JointConditionMaster | SpecialtyConditionMaster)[] = [
  ...ALL_JOINT_CONDITIONS,
  ...ALL_SPECIALTY_CONDITIONS,
];

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
  // Find matching condition from library or default to first
  const defaultCondition = useMemo(() => {
    if (primaryDiagnosis) {
      const match = COMBINED_ALL_CONDITIONS.find(
        (c) =>
          c.name.toLowerCase().includes(primaryDiagnosis.toLowerCase()) ||
          primaryDiagnosis.toLowerCase().includes(c.name.toLowerCase())
      );
      if (match) return match;
    }
    if (patient?.chiefComplaint) {
      const complaintLower = patient.chiefComplaint.toLowerCase();
      const match = COMBINED_ALL_CONDITIONS.find(
        (c) =>
          complaintLower.includes(c.name.toLowerCase()) ||
          ('joint' in c && c.joint && complaintLower.includes(c.joint.toLowerCase())) ||
          ('specialty' in c && c.specialty && complaintLower.includes(c.specialty.toLowerCase()))
      );
      if (match) return match;
    }
    return COMBINED_ALL_CONDITIONS[0]; // Default
  }, [primaryDiagnosis, patient]);

  const [selectedConditionId, setSelectedConditionId] = useState<string>(defaultCondition.id);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [adoptedSuccessMessage, setAdoptedSuccessMessage] = useState<string | null>(null);

  // Modals & Drawers
  const [showFullLibraryModal, setShowFullLibraryModal] = useState<boolean>(false);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [activeComparisonIndex, setActiveComparisonIndex] = useState<number>(0);
  const [activeDetailProtocol, setActiveDetailProtocol] = useState<NamedProtocolMaster | null>(null);

  const activeCondition = useMemo(() => {
    return (
      COMBINED_ALL_CONDITIONS.find((c) => c.id === selectedConditionId) ||
      defaultCondition
    );
  }, [selectedConditionId, defaultCondition]);

  // Find matching named protocols for current patient context
  const matchingNamedProtocols = useMemo(() => {
    const terms: string[] = [];
    if (primaryDiagnosis) terms.push(primaryDiagnosis.toLowerCase());
    if (patient?.chiefComplaint) terms.push(patient.chiefComplaint.toLowerCase());
    if (patient?.anatomicalLocation) terms.push(patient.anatomicalLocation.toLowerCase());
    if (patient?.injuryMechanism) terms.push(patient.injuryMechanism.toLowerCase());

    const matches = MASTER_NAMED_PROTOCOLS.filter((p) => {
      const pText = `${p.protocolName} ${p.associatedMedicalCondition} ${p.relevantSpeciality} ${p.anatomicalRegion} ${p.clinicalIndication}`.toLowerCase();
      return terms.some((t) => {
        const words = t.split(/[\s,/-]+/).filter((w) => w.length > 3);
        return words.some((w) => pText.includes(w));
      });
    });

    if (matches.length > 0) return matches;
    // Fallback: return top 4 representative protocols
    return MASTER_NAMED_PROTOCOLS.slice(0, 4);
  }, [primaryDiagnosis, patient]);

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
    setAdoptedSuccessMessage(`Imported Phase ${phase.phaseNumber} into Active Plan`);
    setTimeout(() => setAdoptedSuccessMessage(null), 3000);
  };

  // Adopt a specific Named Protocol into patient's active treatment plan
  const handleAdoptNamedProtocol = (protocol: NamedProtocolMaster) => {
    const newItems: string[] = [];
    protocol.exerciseInterventions.forEach((ex) => {
      newItems.push(
        `[${protocol.protocolName}] ${ex.exerciseName}: ${ex.dosageSetsReps} (${ex.frequency}, ${ex.duration}) - Pos: ${ex.patientPositioning}`
      );
    });
    newItems.push(
      `[${protocol.protocolName} Progression Threshold] ${protocol.progressionCriteria.slice(0, 2).join('; ')}`
    );

    const updatedPrecautions = Array.from(
      new Set([...treatment.precautions, ...protocol.precautions.slice(0, 2)])
    );
    const updatedContraindications = Array.from(
      new Set([...treatment.contraindications, ...protocol.contraindications.slice(0, 2)])
    );

    onUpdateTreatment({
      ...treatment,
      conservativeRehab: Array.from(new Set([...newItems, ...treatment.conservativeRehab])),
      precautions: updatedPrecautions,
      contraindications: updatedContraindications,
    });

    setAdoptedSuccessMessage(`Adopted "${protocol.protocolName}" into active rehabilitation plan`);
    setTimeout(() => setAdoptedSuccessMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Treatment & Clinical Management Plan</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured, clinician-reviewable rehabilitation options, evidence-based named protocols, education, and specialist thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowComparisonModal(true)}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5 text-indigo-600" />
            <span>Compare Protocols</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFullLibraryModal(true)}
            className="px-3 py-1.5 bg-teal-50 border border-teal-200 hover:bg-teal-100 text-teal-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            <span>Browse All 35+ Protocols</span>
          </button>
        </div>
      </div>

      {/* Success Banner if protocol adopted */}
      {adoptedSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{adoptedSuccessMessage}</span>
          </div>
          <button
            onClick={() => setAdoptedSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mandatory Non-Prescribing Governance Shield */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Professional Scope & Prescribing Governance Shield
          </div>
          <p className="leading-relaxed">
            ClinicaAI never autonomously prescribes pharmaceuticals or authorizes surgical interventions. All medication details presented are contextual educational references sourced from authoritative CPGs (e.g. NICE NG59, ACR 2020, AAOS). Prescriptions and therapeutic procedures remain under the exclusive professional judgment of licensed clinicians.
          </p>
        </div>
      </div>

      {/* =========================================================================
          MODULE 20E & 20H: MATCHING EVIDENCE-BASED NAMED PROTOCOLS RIBBON
          ========================================================================= */}
      <div className="border border-indigo-200 bg-gradient-to-r from-indigo-50/50 via-white to-teal-50/40 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Matching Named Evidence-Based Protocols (Master Library)
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200">
                  {matchingNamedProtocols.length} Available
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Word Document Knowledge Extraction: 19 clinical parameters, exact dosages, and Oxford evidence grading.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComparisonModal(true)}
              className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Side-by-Side Comparison</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setShowFullLibraryModal(true)}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All 35+ Protocols &rarr;</span>
            </button>
          </div>
        </div>

        {/* Matching Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {matchingNamedProtocols.slice(0, 3).map((prot) => (
            <div
              key={prot.id}
              className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between hover:border-indigo-300 transition-all shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-slate-900 text-xs leading-snug">
                    {prot.protocolName}
                  </h5>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                    {prot.evidenceLevel.split('(')[0].trim()}
                  </span>
                </div>

                <div className="text-[10px] text-teal-800 font-medium">
                  {prot.associatedMedicalCondition}
                </div>

                <div className="p-2 bg-slate-50 rounded text-[11px] font-mono text-slate-700 border border-slate-100 line-clamp-2">
                  {prot.exerciseInterventions[0]?.dosageSetsReps || 'Phased dosage structured'}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {prot.clinicalIndication}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveDetailProtocol(prot)}
                  className="px-2 py-1 text-[11px] text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  19 Parameters
                </button>

                <button
                  type="button"
                  onClick={() => handleAdoptNamedProtocol(prot)}
                  className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3 h-3 text-teal-700" />
                  <span>Adopt Protocol</span>
                </button>
              </div>
            </div>
          ))}
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
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 max-w-[280px]"
            >
              <optgroup label="Musculoskeletal Joints">
                {ALL_JOINT_CONDITIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.joint}: {c.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Specialized Medical Protocols">
                {ALL_SPECIALTY_CONDITIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.specialty.toUpperCase()}: {c.name}
                  </option>
                ))}
              </optgroup>
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
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-teal-700" />
              Active Rehabilitation & Physical Therapy
            </h4>
            <span className="text-[10px] font-mono text-slate-400 font-semibold">
              {treatment.conservativeRehab.length} Prescribed
            </span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 max-h-80 overflow-y-auto pr-1">
            {treatment.conservativeRehab.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 p-1.5 rounded hover:bg-slate-50">
                <span className="text-teal-700 font-bold shrink-0 mt-0.5">•</span>
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

      {/* =========================================================================
          MODAL 1: SIDE-BY-SIDE PROTOCOL COMPARISON MODAL (MODULE 20E)
          ========================================================================= */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-sm">Protocol Comparison Matrix (Side-by-Side)</h3>
                  <p className="text-[11px] text-slate-400">
                    Compare paradigms (e.g. Shelbourne vs MOON, Alfredson vs Beyer HSR, GLA:D vs Kongsgaard HSR)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Selector */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
              <span className="font-semibold text-slate-600 whitespace-nowrap">Preset Comparisons:</span>
              {DEFAULT_PROTOCOL_COMPARISONS.map((comp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveComparisonIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeComparisonIndex === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {comp.protocolA.protocolName} vs {comp.protocolB.protocolName}
                </button>
              ))}
            </div>

            {/* Comparison Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {(() => {
                const comp = DEFAULT_PROTOCOL_COMPARISONS[activeComparisonIndex];
                if (!comp) return null;
                return (
                  <div className="space-y-4">
                    {/* Header comparison cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                          Option A
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {comp.protocolA.protocolName}
                        </h4>
                        <div className="text-[11px] text-slate-600 font-mono">
                          {comp.protocolA.evidenceLevel}
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {comp.protocolA.clinicalIndication}
                        </p>
                        <button
                          onClick={() => {
                            handleAdoptNamedProtocol(comp.protocolA);
                            setShowComparisonModal(false);
                          }}
                          className="w-full py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Adopt {comp.protocolA.protocolName}</span>
                        </button>
                      </div>

                      <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">
                          Option B
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {comp.protocolB.protocolName}
                        </h4>
                        <div className="text-[11px] text-slate-600 font-mono">
                          {comp.protocolB.evidenceLevel}
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {comp.protocolB.clinicalIndication}
                        </p>
                        <button
                          onClick={() => {
                            handleAdoptNamedProtocol(comp.protocolB);
                            setShowComparisonModal(false);
                          }}
                          className="w-full py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Adopt {comp.protocolB.protocolName}</span>
                        </button>
                      </div>
                    </div>

                    {/* Comparison Dimensions */}
                    <div className="space-y-3 pt-2">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                        Detailed Feature Analysis
                      </span>
                      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                        {comp.comparisonPoints.map((point, idx) => (
                          <div key={idx} className="p-3.5 hover:bg-slate-50/70 transition-colors space-y-2">
                            <div className="font-bold text-slate-900 text-xs">
                              {point.feature}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
                              <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[11px]">
                                <span className="font-semibold text-teal-900 block mb-0.5">
                                  {comp.protocolA.protocolName}:
                                </span>
                                {point.protocolAValue}
                              </div>
                              <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[11px]">
                                <span className="font-semibold text-indigo-900 block mb-0.5">
                                  {comp.protocolB.protocolName}:
                                </span>
                                {point.protocolBValue}
                              </div>
                            </div>
                            <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-950 text-[11px]">
                              <strong>Clinical Takeaway:</strong> {point.clinicalTakeaway}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Decision Guidance Summary */}
                    <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1.5 text-xs">
                      <div className="font-bold text-teal-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                        <span>Clinical Decision Guidance</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {comp.clinicalDecisionGuidance}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-end shrink-0">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: 19-PARAMETER DETAIL SHEET MODAL
          ========================================================================= */}
      {activeDetailProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-700/50">
                    {activeDetailProtocol.protocolType}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {activeDetailProtocol.evidenceLevel}
                  </span>
                </div>
                <h3 className="text-lg font-bold mt-1 text-white flex items-center gap-2">
                  {activeDetailProtocol.protocolName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Associated Condition: {activeDetailProtocol.associatedMedicalCondition} · {activeDetailProtocol.anatomicalRegion}
                </p>
              </div>
              <button
                onClick={() => setActiveDetailProtocol(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 19 parameters */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Surgeon Priority Notice for Post-Op */}
              {activeDetailProtocol.surgicalVsNonsurgical === 'Postoperative / Surgical' && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold uppercase tracking-wider">
                      Surgeon Specific Instruction Priority Rule
                    </strong>
                    <span className="text-[11px] leading-relaxed">
                      Postoperative rehabilitation must strictly adhere to the operating surgeon's intraoperative findings and specific tissue repair tension instructions. Never force range beyond reported limits.
                    </span>
                  </div>
                </div>
              )}

              {/* Clinical Indication & Objectives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <strong className="text-slate-900 block text-[11px] uppercase tracking-wider font-bold">
                    Clinical Indication
                  </strong>
                  <p className="text-slate-700 leading-relaxed">{activeDetailProtocol.clinicalIndication}</p>
                </div>
                <div className="p-3 bg-teal-50/50 border border-teal-200 rounded-lg space-y-1">
                  <strong className="text-teal-950 block text-[11px] uppercase tracking-wider font-bold">
                    Treatment Objectives
                  </strong>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {activeDetailProtocol.treatmentObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-teal-700 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Patient Selection Criteria */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <strong className="text-slate-800 block text-[11px] font-bold">Patient Selection Criteria</strong>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {activeDetailProtocol.patientSelectionCriteria.map((crit, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exercise Interventions Table */}
              <div className="space-y-1.5">
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wider font-bold">
                  Exercise Interventions & Precision Dosing
                </strong>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <th className="py-2 px-3 font-semibold">Exercise</th>
                        <th className="py-2 px-3 font-semibold">Positioning</th>
                        <th className="py-2 px-3 font-semibold">Sets & Reps</th>
                        <th className="py-2 px-3 font-semibold">Frequency & Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeDetailProtocol.exerciseInterventions.map((ex, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-semibold text-slate-900 align-top">
                            {ex.exerciseName}
                            <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                              {ex.techniqueDescription}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-600 align-top">{ex.patientPositioning}</td>
                          <td className="py-2 px-3 font-mono font-semibold text-teal-800 align-top">
                            {ex.dosageSetsReps}
                          </td>
                          <td className="py-2 px-3 text-slate-600 align-top">
                            <div>{ex.frequency}</div>
                            <div className="text-[10px] text-slate-400">{ex.duration}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Progression & Precautions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
                  <strong className="text-emerald-950 block text-[11px] font-bold">Progression Criteria</strong>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {activeDetailProtocol.progressionCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-lg space-y-1">
                  <strong className="text-rose-950 block text-[11px] font-bold">Contraindications</strong>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {activeDetailProtocol.contraindications.map((c, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* References & Evidence */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <strong className="text-slate-800 block text-[11px] font-bold">Supporting References & Journal Citations</strong>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  {activeDetailProtocol.supportingReferences.map((ref, i) => (
                    <li key={i} className="border-b border-slate-100 pb-1 last:border-0 last:pb-0">
                      <span className="font-semibold text-slate-800">{ref.title}</span>
                      <span className="text-slate-500 block text-[10px] font-mono">
                        {ref.authorsYear} · {ref.journal} {ref.doi && `· DOI: ${ref.doi}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 font-mono">
                Version: {activeDetailProtocol.version} · Updated: {activeDetailProtocol.lastUpdatedDate}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleAdoptNamedProtocol(activeDetailProtocol);
                    setActiveDetailProtocol(null);
                  }}
                  className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-200" />
                  <span>Adopt into Active Treatment Plan</span>
                </button>
                <button
                  onClick={() => setActiveDetailProtocol(null)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Close Detail Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: FULL 35+ PROTOCOL LIBRARY MODAL
          ========================================================================= */}
      {showFullLibraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-bold text-sm">Master Named Physiotherapy Protocol Library</h3>
                  <p className="text-[11px] text-slate-400">
                    Extracted from Joint-wise Protocols Knowledge Base with 1-click clinical plan adoption
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFullLibraryModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <NamedProtocolsLibrary
                onSelectProtocolForPatient={(prot) => {
                  handleAdoptNamedProtocol(prot);
                  setShowFullLibraryModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
