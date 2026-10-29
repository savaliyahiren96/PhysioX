import React, { useState, useMemo } from 'react';
import {
  ALL_JOINT_CONDITIONS,
  JOINT_REGIONS_LIST,
} from '../data/jointProtocolsData';
import {
  JointConditionMaster,
  JointRegion,
  PhysiotherapyProtocolPhase,
  InvestigationModality,
} from '../types/clinical';
import {
  Search,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Copy,
  Check,
  Microscope,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface JointProtocolsEncyclopediaProps {
  initialConditionId?: string;
  onApplyToPatient?: (condition: JointConditionMaster) => void;
}

export const JointProtocolsEncyclopedia: React.FC<JointProtocolsEncyclopediaProps> = ({
  initialConditionId,
  onApplyToPatient,
}) => {
  const [selectedJoint, setSelectedJoint] = useState<JointRegion>('Knee');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'presentation' | 'tests' | 'investigations' | 'advances' | 'physiotherapy'
  >('physiotherapy');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  // Filter conditions by selected joint and search query
  const jointConditions = useMemo(() => {
    return ALL_JOINT_CONDITIONS.filter((c) => c.joint === selectedJoint);
  }, [selectedJoint]);

  const filteredConditions = useMemo(() => {
    if (!searchQuery.trim()) return jointConditions;
    const query = searchQuery.toLowerCase();
    return ALL_JOINT_CONDITIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.joint.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.clinicalPresentation.toLowerCase().includes(query) ||
        c.bedsideAssessmentTests.some((t) => t.testName.toLowerCase().includes(query)) ||
        c.physiotherapyProtocol.phases.some((p) =>
          p.exercisePrescription.some((e) => e.exerciseName.toLowerCase().includes(query))
        )
    );
  }, [searchQuery, jointConditions]);

  const [selectedConditionId, setSelectedConditionId] = useState<string>(
    initialConditionId || jointConditions[0]?.id || ALL_JOINT_CONDITIONS[0].id
  );

  const selectedCondition: JointConditionMaster = useMemo(() => {
    return (
      ALL_JOINT_CONDITIONS.find((c) => c.id === selectedConditionId) ||
      jointConditions[0] ||
      ALL_JOINT_CONDITIONS[0]
    );
  }, [selectedConditionId, jointConditions]);

  const handleSelectCondition = (condition: JointConditionMaster) => {
    setSelectedConditionId(condition.id);
    setSelectedJoint(condition.joint);
    setActivePhaseIndex(0);
  };

  const handleCopyProtocol = () => {
    const p = selectedCondition.physiotherapyProtocol;
    const text = `
CLINICAAI EVIDENCE-BASED PHYSIOTHERAPY PROTOCOL
Condition: ${selectedCondition.name} (${selectedCondition.joint})
Guideline Basis: ${p.guidelineBasis}
Summary: ${p.summary}

${p.phases
  .map(
    (phase) => `
PHASE ${phase.phaseNumber}: ${phase.phaseName.toUpperCase()} (${phase.timeline})
Goals: ${phase.clinicalGoals.join(', ')}
Exercises:
${phase.exercisePrescription.map((e) => ` - [${e.category}] ${e.exerciseName}: ${e.dosage} (Rationale: ${e.clinicalRationale})`).join('\n')}
Progression Criteria: ${phase.progressionCriteria.join(', ')}
Precautions: ${phase.precautionsAndContraindications.join(', ')}
`
  )
  .join('\n')}

DISCHARGE / RETURN TO SPORT CRITERIA:
${p.dischargeAndReturnToActivityCriteria.join('\n - ')}

PATIENT EDUCATION:
${p.patientEducationSummary}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Context */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Comprehensive Joint Protocol Catalog & Evidence Synthesis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Joint-by-Joint Clinical Assessment & Phased Physiotherapy Protocols
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Clinically validated protocols across Knee, Spine, Shoulder, Hip, and Ankle. Each condition includes bedside diagnostic accuracy metrics, multi-modality worldwide investigations (X-ray, MRI, CT, Ultrasound, Path Lab), recent peer-reviewed advances, and progressive 4-phase exercise dosing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyProtocol}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-xs transition-colors"
            title="Copy complete structured protocol to clipboard"
          >
            {copiedProtocol ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Protocol Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Full Protocol</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Joint Region Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {JOINT_REGIONS_LIST.map((joint) => {
          const isSelected = selectedJoint === joint.id && !searchQuery.trim();
          return (
            <button
              key={joint.id}
              onClick={() => {
                setSelectedJoint(joint.id);
                setSearchQuery('');
                const first = ALL_JOINT_CONDITIONS.find((c) => c.joint === joint.id);
                if (first) {
                  setSelectedConditionId(first.id);
                  setActivePhaseIndex(0);
                }
              }}
              className={`text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'border-teal-700 bg-teal-50/70 shadow-xs ring-1 ring-teal-600/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {joint.id}
                </span>
                <span className="text-[10px] font-mono tabular-nums font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {joint.conditionCount}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {joint.keyAnatomy}
              </p>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search all joint conditions, special tests (Lachman, Spurling), exercises, modalities, or journals/DOIs..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Main Grid: Conditions Sidebar + Condition Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Condition List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>
              {searchQuery ? `Search Results (${filteredConditions.length})` : `${selectedJoint} Conditions (${filteredConditions.length})`}
            </span>
            <span className="text-[11px] text-slate-400">Select to inspect</span>
          </div>

          <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredConditions.map((cond) => {
              const isSelected = cond.id === selectedCondition.id;
              return (
                <div
                  key={cond.id}
                  onClick={() => handleSelectCondition(cond)}
                  className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-sm leading-snug">
                      {cond.name}
                    </div>
                    {cond.isRedFlag && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                          isSelected
                            ? 'bg-rose-500 text-white'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        Red Flag
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span
                      className={`text-[11px] ${
                        isSelected ? 'text-teal-300' : 'text-teal-700 font-medium'
                      }`}
                    >
                      {cond.category}
                    </span>
                    <span className={isSelected ? 'text-slate-400' : 'text-slate-300'}>
                      ·
                    </span>
                    <span
                      className={`text-[11px] ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {cond.bedsideAssessmentTests.length} tests
                    </span>
                    <span className={isSelected ? 'text-slate-400' : 'text-slate-300'}>
                      ·
                    </span>
                    <span
                      className={`text-[11px] ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      4-Phase Rehab
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dive & Tabs (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Card for Selected Condition */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                  <span>{selectedCondition.joint}</span>
                  <span>·</span>
                  <span className="text-teal-700 font-semibold">{selectedCondition.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {selectedCondition.name}
                </h2>
              </div>

              {selectedCondition.isRedFlag ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-xs font-semibold shrink-0">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>
                    {selectedCondition.redFlagSeverity === 'EMERGENCY_IMMEDIATE'
                      ? 'Immediate Emergency Escalation'
                      : 'Urgent Same-Day Specialty Escalation'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Non-Emergency MSK Protocol</span>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200 pt-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('physiotherapy')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'physiotherapy'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>4-Phase Physiotherapy Protocol</span>
              </button>
              <button
                onClick={() => setActiveTab('presentation')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'presentation'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Presentation & Red Flags</span>
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'tests'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Bedside Tests ({selectedCondition.bedsideAssessmentTests.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('investigations')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'investigations'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                <span>Investigations Profile ({selectedCondition.investigationsProfile.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('advances')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'advances'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recent Advances & Research ({selectedCondition.recentAdvancesAndResearch.length})</span>
              </button>
            </div>

            {/* TAB CONTENT: PHYSIOTHERAPY PROTOCOL */}
            {activeTab === 'physiotherapy' && (
              <div className="space-y-6 pt-2">
                {/* Summary & Guideline Basis */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Clinical Protocol Synthesis
                    </span>
                    <span className="text-xs font-mono text-teal-700 font-semibold">
                      {selectedCondition.physiotherapyProtocol.guidelineBasis}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedCondition.physiotherapyProtocol.summary}
                  </p>
                </div>

                {/* Phased Tabs */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-teal-600" />
                      <span>Rehabilitation Phases & Progressive Dosing</span>
                    </h3>
                    <span className="text-xs text-slate-500">
                      Phase {activePhaseIndex + 1} of {selectedCondition.physiotherapyProtocol.phases.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {selectedCondition.physiotherapyProtocol.phases.map((phase, idx) => {
                      const isCurrent = activePhaseIndex === idx;
                      return (
                        <button
                          key={phase.phaseNumber}
                          onClick={() => setActivePhaseIndex(idx)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            isCurrent
                              ? 'border-teal-700 bg-teal-50 ring-1 ring-teal-600 text-slate-900'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="text-[11px] font-mono font-bold text-teal-700">
                            PHASE {phase.phaseNumber}
                          </div>
                          <div className="text-xs font-semibold mt-0.5 line-clamp-1">
                            {phase.phaseName}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 font-mono">
                            {phase.timeline}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Phase Deep Dive */}
                  {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex] && (
                    <div className="space-y-4 border border-slate-200 rounded-lg p-5 bg-white">
                      {/* Phase Header */}
                      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-mono font-bold text-teal-700">
                            PHASE {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].phaseNumber} · {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].timeline}
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mt-0.5">
                            {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].phaseName}
                          </h4>
                        </div>
                      </div>

                      {/* Clinical Goals */}
                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Clinical Goals for this Phase
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].clinicalGoals.map((goal, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                              <span>{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exercise Prescription Table */}
                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Exercise Dosing & Biomechanical Prescription
                        </div>
                        <div className="overflow-x-auto border border-slate-200 rounded-lg">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                              <tr>
                                <th className="py-2.5 px-3 font-semibold">Category</th>
                                <th className="py-2.5 px-3 font-semibold">Exercise Name</th>
                                <th className="py-2.5 px-3 font-semibold">Dosage / Tempo</th>
                                <th className="py-2.5 px-3 font-semibold">Clinical Rationale</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].exercisePrescription.map((ex, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                  <td className="py-2.5 px-3 font-medium text-teal-800 whitespace-nowrap align-top">
                                    {ex.category}
                                  </td>
                                  <td className="py-2.5 px-3 font-semibold text-slate-900 align-top">
                                    {ex.exerciseName}
                                  </td>
                                  <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap align-top">
                                    {ex.dosage}
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed align-top">
                                    {ex.clinicalRationale}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Progression Criteria & Precautions Side-by-Side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="border border-emerald-200 bg-emerald-50/50 rounded-lg p-3.5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Progression Criteria to Next Phase</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].progressionCriteria.map((c, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-700 font-bold">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border border-amber-200 bg-amber-50/50 rounded-lg p-3.5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Precautions & Contraindications</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].precautionsAndContraindications.map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-amber-700 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Discharge / Return-to-Sport Milestones */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Discharge & Return-to-Sport / Work Milestones</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedCondition.physiotherapyProtocol.dischargeAndReturnToActivityCriteria.map((crit, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Patient Education Summary
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{selectedCondition.physiotherapyProtocol.patientEducationSummary}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRESENTATION & RED FLAGS */}
            {activeTab === 'presentation' && (
              <div className="space-y-5 pt-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Clinical Presentation & Natural History
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 leading-relaxed">
                    {selectedCondition.clinicalPresentation}
                  </div>
                </div>

                {selectedCondition.isRedFlag && (
                  <div className="border-l-4 border-rose-600 bg-rose-50/70 p-4 rounded-r-lg space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Red Flag Escalation Required</span>
                    </div>
                    <p className="text-xs text-rose-800 leading-relaxed">
                      This presentation represents high clinical acuity ({selectedCondition.redFlagSeverity}). Do not delay emergency surgical or medical referral for routine conservative assessment.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: BEDSIDE PHYSICAL TESTS */}
            {activeTab === 'tests' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Bedside Physical Examination & Diagnostic Accuracy
                  </h3>
                  <span className="text-xs text-slate-500">
                    Evidence-linked sensitivity, specificity & likelihood ratios
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedCondition.bedsideAssessmentTests.map((test, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white hover:border-slate-300 transition-colors space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-sm text-slate-900">
                          {test.testName}
                        </span>
                        <div className="flex items-center gap-3 text-xs font-mono">
                          <span className="text-teal-700 font-semibold">
                            Sn: {test.sensitivity}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-teal-700 font-semibold">
                            Sp: {test.specificity}
                          </span>
                          {test.positiveLikelihoodRatio && (
                            <>
                              <span className="text-slate-400">·</span>
                              <span className="text-slate-800 font-semibold">
                                LR+: {test.positiveLikelihoodRatio}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-700">Technique & Interpretation:</strong> {test.techniqueAndInterpretation}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Source: {test.evidenceCitation}</span>
                        {test.doi && (
                          <span className="font-mono text-teal-700">DOI: {test.doi}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: INVESTIGATIONS PROFILE */}
            {activeTab === 'investigations' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Multi-Modality Diagnostic Investigation Profile
                  </h3>
                  <span className="text-xs text-slate-500">
                    X-ray, MRI, CT, Ultrasound, Path Lab & Arthrocentesis
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedCondition.investigationsProfile.map((inv, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-sm text-teal-900">
                          {inv.modality}
                        </span>
                        <span className="text-xs font-mono text-slate-600">
                          {inv.accuracyOrYield}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                        <div>
                          <strong className="text-slate-800">Clinical Indications:</strong>
                          <p className="text-slate-600 mt-0.5">{inv.indications}</p>
                        </div>
                        <div>
                          <strong className="text-slate-800">Characteristic Pathological Findings:</strong>
                          <p className="text-slate-600 mt-0.5">{inv.keyFindings}</p>
                        </div>
                      </div>

                      {inv.recentAdvanceNote && (
                        <div className="text-xs bg-slate-50 p-2 rounded border border-slate-100 text-slate-700 flex items-start gap-1.5 mt-2">
                          <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Technological Advance:</strong> {inv.recentAdvanceNote}
                          </span>
                        </div>
                      )}

                      {inv.evidencePaper && (
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>
                            {inv.evidencePaper.authors} ({inv.evidencePaper.year}).{' '}
                            <em>{inv.evidencePaper.journal}</em>
                          </span>
                          <span className="font-mono text-teal-700">DOI: {inv.evidencePaper.doi}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: RECENT ADVANCES & RESEARCH */}
            {activeTab === 'advances' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent Technological Advances & Peer-Reviewed Research
                  </h3>
                  <span className="text-xs text-slate-500">
                    Curated latest literature with journals & DOIs
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedCondition.recentAdvancesAndResearch.map((adv, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-sm text-slate-900">
                          {adv.advanceTitle}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                          {adv.readinessLevel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {adv.description}
                      </p>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
                        <div className="font-semibold text-slate-900">
                          {adv.journalPaper.title}
                        </div>
                        <div className="text-slate-600">
                          {adv.journalPaper.authors} · <em>{adv.journalPaper.journal}</em> ({adv.journalPaper.year})
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <span className="font-mono text-teal-700">DOI: {adv.journalPaper.doi}</span>
                          <a
                            href={`https://doi.org/${adv.journalPaper.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
                          >
                            <span>Open Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
