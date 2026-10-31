import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  Activity,
  CheckCircle,
  AlertTriangle,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PROBABLE_CONDITIONS_LIBRARY } from '../data/probableConditionsData';
import { ProbableConditionDetail } from '../types/doctorPatient';

interface ProbableConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConditionForIntake?: (condition: ProbableConditionDetail) => void;
}

export const ProbableConditionsModal: React.FC<ProbableConditionsModalProps> = ({
  isOpen,
  onClose,
  onSelectConditionForIntake,
}) => {
  const [selectedCondition, setSelectedCondition] = useState<ProbableConditionDetail>(
    PROBABLE_CONDITIONS_LIBRARY[0]
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'rehab' | 'evidence'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredConditions = PROBABLE_CONDITIONS_LIBRARY.filter(
    (c) =>
      c.conditionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.anatomicalRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.synonyms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full border border-slate-200 overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">Probable Conditions Clinical Library</h2>
                <span className="bg-teal-500/30 text-teal-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-teal-400/30">
                  Module 4 · 6 Target Cohorts
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Evidence-Based Objective Protocols, Functional Transfers, Gait & Outcome Measures
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Condition List */}
          <div className="w-72 sm:w-80 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
            {/* Search */}
            <div className="p-3 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-200/80">
              {filteredConditions.map((cond, idx) => {
                const isSelected = selectedCondition.id === cond.id;
                return (
                  <button
                    key={cond.id}
                    onClick={() => {
                      setSelectedCondition(cond);
                      setActiveTab('overview');
                    }}
                    className={`w-full text-left p-3.5 transition-colors flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-teal-50/80 border-l-4 border-teal-700 text-teal-950 font-semibold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        {cond.conditionName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{cond.anatomicalRegion}</div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold bg-white border border-teal-200 text-teal-800 px-1.5 py-0.2 rounded">
                          {cond.evidenceRating.level}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 mt-1 shrink-0 ${isSelected ? 'text-teal-700' : 'text-slate-300'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Pane: Condition Detail */}
          <div className="flex-1 overflow-y-auto bg-white flex flex-col">
            {/* Condition Header Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                  {selectedCondition.relevantSpecialty} · {selectedCondition.anatomicalRegion}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedCondition.conditionName}</h3>
                <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-2">
                  <span>Synonyms:</span>
                  {selectedCondition.synonyms.map((s, i) => (
                    <span key={i} className="text-slate-700 bg-white border border-slate-200 px-1.5 py-0.2 rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {onSelectConditionForIntake && (
                <button
                  onClick={() => onSelectConditionForIntake(selectedCondition)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg text-xs shadow-sm transition-colors shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Use as Patient Template
                </button>
              )}
            </div>

            {/* Sub-Tabs */}
            <div className="border-b border-slate-200 px-6 flex gap-6 text-xs font-semibold bg-white">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'overview'
                    ? 'border-teal-700 text-teal-800 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Clinical Presentation & Gait
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`py-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'assessment'
                    ? 'border-teal-700 text-teal-800 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. ROM, MMT & Functional Transfers
              </button>
              <button
                onClick={() => setActiveTab('rehab')}
                className={`py-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'rehab'
                    ? 'border-teal-700 text-teal-800 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                3. PT Goals, Protocol & Precautions
              </button>
              <button
                onClick={() => setActiveTab('evidence')}
                className={`py-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'evidence'
                    ? 'border-teal-700 text-teal-800 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                4. Special Tests & Evidence Base
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 space-y-6 text-xs">
              {/* TAB 1: OVERVIEW & GAIT */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Presentation */}
                  <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-4">
                    <h4 className="font-bold text-teal-900 text-sm mb-1.5">Clinical Presentation</h4>
                    <p className="text-slate-700 leading-relaxed text-xs">
                      {selectedCondition.clinicalPresentation}
                    </p>
                  </div>

                  {/* Subjective & Objective Checklists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                      <h5 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                        Key Subjective Assessment Points
                      </h5>
                      <ul className="space-y-1.5 text-slate-600 text-[11px]">
                        {selectedCondition.subjectiveAssessment.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                      <h5 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-teal-600" />
                        Key Objective Examination Points
                      </h5>
                      <ul className="space-y-1.5 text-slate-600 text-[11px]">
                        {selectedCondition.objectiveAssessment.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Gait Analysis & Compensations */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-teal-700" />
                      Gait Analysis & Biomechanical Abnormalities
                    </h4>

                    <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-lg text-amber-950 font-medium">
                      <strong>Typical Pattern: </strong>
                      {selectedCondition.gaitAnalysis.typicalPattern}
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700">Compensatory Mechanisms:</span>
                      <ul className="mt-1 space-y-1 text-slate-600">
                        {selectedCondition.gaitAnalysis.compensatoryMechanisms.map((comp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">⚠</span>
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="font-semibold text-teal-800">Gait Re-education Focus: </span>
                      <span className="text-slate-700">{selectedCondition.gaitAnalysis.gaitTrainingFocus}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ROM, MMT & FUNCTIONAL TRANSFERS */}
              {activeTab === 'assessment' && (
                <div className="space-y-6">
                  {/* ROM Table */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2.5">
                      Range of Motion (ROM) Expectations & Targets
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="p-2.5">Movement</th>
                            <th className="p-2.5">Normal Range</th>
                            <th className="p-2.5">Expected Restriction</th>
                            <th className="p-2.5 text-teal-800">Rehabilitation Goal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedCondition.romExpectations.map((rom, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="p-2.5 font-bold text-slate-900">{rom.movement}</td>
                              <td className="p-2.5 text-slate-600">{rom.normal}</td>
                              <td className="p-2.5 text-amber-800">{rom.expectedRestriction}</td>
                              <td className="p-2.5 font-semibold text-teal-800">{rom.rehabGoal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* MMT Muscle Strength Table */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2.5">
                      Manual Muscle Testing (MMT) Key Muscle Groups
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="p-2.5">Muscle Group</th>
                            <th className="p-2.5">Innervation</th>
                            <th className="p-2.5">Typical Impairment</th>
                            <th className="p-2.5 text-teal-800">Target Milestone</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedCondition.mmtStrengthAssessment.map((mmt, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="p-2.5 font-bold text-slate-900">{mmt.muscleGroup}</td>
                              <td className="p-2.5 text-slate-500">{mmt.nerveRoot}</td>
                              <td className="p-2.5 text-slate-700">{mmt.typicalImpairment}</td>
                              <td className="p-2.5 font-semibold text-teal-800">{mmt.targetMilestone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Functional Mobility & Transfer Tests */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2.5">
                      Functional Mobility & Transfer Testing (Sit-to-Stand, TUG, Stairs)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCondition.functionalMobilityTransfers.map((fmt, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 space-y-2">
                          <div className="font-bold text-slate-900 text-xs">{fmt.testName}</div>
                          <div className="text-[11px] text-slate-600">
                            <span className="font-semibold text-slate-700">Norm: </span>
                            {fmt.clinicalNorm}
                          </div>
                          <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                            <span className="font-semibold">Patient Baseline: </span>
                            {fmt.expectedPatientPerformance}
                          </div>
                          <div className="text-[11px] text-teal-900 bg-teal-50 p-2 rounded border border-teal-200">
                            <span className="font-semibold">Goal Benchmark: </span>
                            {fmt.progressionBenchmark}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PT GOALS & REHAB PROTOCOL */}
              {activeTab === 'rehab' && (
                <div className="space-y-6">
                  {/* Phase-wise goals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-teal-200 bg-teal-50/30 rounded-xl p-4">
                      <h5 className="font-bold text-teal-900 text-xs mb-2">Phase 1: Acute Protection & Early Mobility</h5>
                      <ul className="space-y-1.5 text-slate-700 text-[11px]">
                        {selectedCondition.physiotherapyGoals.acutePhase.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4">
                      <h5 className="font-bold text-blue-900 text-xs mb-2">Phase 2: Subacute Strengthening & Transfers</h5>
                      <ul className="space-y-1.5 text-slate-700 text-[11px]">
                        {selectedCondition.physiotherapyGoals.subacutePhase.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4">
                      <h5 className="font-bold text-emerald-900 text-xs mb-2">Phase 3: Functional Reconditioning & Balance</h5>
                      <ul className="space-y-1.5 text-slate-700 text-[11px]">
                        {selectedCondition.physiotherapyGoals.functionalPhase.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-indigo-200 bg-indigo-50/30 rounded-xl p-4">
                      <h5 className="font-bold text-indigo-900 text-xs mb-2">Phase 4: Return to Full Community / Sports</h5>
                      <ul className="space-y-1.5 text-slate-700 text-[11px]">
                        {selectedCondition.physiotherapyGoals.returnToActivityPhase.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Weight Bearing & Quadriceps Protocol */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm">Key Clinical Protocols & Considerations</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="font-semibold text-slate-800 text-xs mb-1">Weight-Bearing Protocol</div>
                        <div className="text-slate-600 text-[11px]">
                          {selectedCondition.rehabilitationConsiderations.weightBearingProtocol}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="font-semibold text-slate-800 text-xs mb-1">ROM Milestones</div>
                        <div className="text-slate-600 text-[11px]">
                          {selectedCondition.rehabilitationConsiderations.romMilestones}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 md:col-span-2">
                        <div className="font-semibold text-slate-800 text-xs mb-1">
                          Quadriceps & Kinetic Chain Protocol
                        </div>
                        <div className="text-slate-600 text-[11px]">
                          {selectedCondition.rehabilitationConsiderations.quadricepsActivationProtocol}
                        </div>
                      </div>
                    </div>

                    {/* Precaution Flags & Contraindications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-lg">
                        <div className="font-bold text-amber-900 text-xs mb-1 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Precaution Flags
                        </div>
                        <ul className="space-y-1 text-amber-950 text-[11px]">
                          {selectedCondition.rehabilitationConsiderations.precautionFlags.map((p, i) => (
                            <li key={i}>• {p}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg">
                        <div className="font-bold text-red-900 text-xs mb-1 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          Contraindications
                        </div>
                        <ul className="space-y-1 text-red-950 text-[11px]">
                          {selectedCondition.rehabilitationConsiderations.contraindications.map((c, i) => (
                            <li key={i}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SPECIAL TESTS & EVIDENCE */}
              {activeTab === 'evidence' && (
                <div className="space-y-6">
                  {/* Special Diagnostic Tests */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2.5">
                      Diagnostic Special Tests & Bedside Maneuvers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCondition.specialTests.map((test, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 space-y-2">
                          <div className="font-bold text-slate-900 text-xs">{test.testName}</div>
                          <div className="text-[11px] text-teal-800 font-semibold">{test.targetStructure}</div>
                          <div className="text-[10px] text-slate-500 bg-white p-1.5 rounded border border-slate-200">
                            Accuracy: {test.diagnosticAccuracy}
                          </div>
                          <div className="text-[11px] text-slate-600 leading-relaxed">{test.procedure}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome Measures */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2.5">Validated Clinical Outcome Measures</h4>
                    <div className="space-y-3">
                      {selectedCondition.outcomeMeasures.map((om, i) => (
                        <div key={i} className="border border-slate-200 p-3 rounded-xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{om.toolName}</div>
                            <div className="text-slate-600 text-[11px] mt-0.5">{om.description}</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium">
                              MCID: {om.mcid}
                            </span>
                            <span className="text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded font-bold">
                              Goal: {om.targetScore}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Rating */}
                  <div className="bg-gradient-to-r from-teal-50 to-indigo-50/50 border border-teal-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                      <span className="font-bold text-teal-900 text-xs">
                        Evidence Level: {selectedCondition.evidenceRating.level}
                      </span>
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {selectedCondition.evidenceRating.sources.map((src, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Award className="w-3 h-3 text-teal-600 mt-0.5 shrink-0" />
                          <span>{src}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div>
            Showing clinical protocol for: <strong className="text-slate-800">{selectedCondition.conditionName}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors"
          >
            Close Library
          </button>
        </div>
      </div>
    </div>
  );
};
