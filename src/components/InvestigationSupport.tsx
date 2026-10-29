import React, { useState } from 'react';
import {
  FileSearch,
  AlertCircle,
  CheckCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  TestTube,
  Microscope,
  Check,
  Plus,
  BookOpen,
} from 'lucide-react';
import {
  InvestigationGuidance,
  PatientIntake,
  InvestigationModality,
  ConditionInvestigationProfile,
} from '../types/clinical';
import { WORLDWIDE_INVESTIGATION_PROFILES } from '../data/worldwideInvestigations';

interface InvestigationSupportProps {
  investigations: InvestigationGuidance[];
  patient: PatientIntake;
  onProceed: () => void;
  clinicianInvestigationDecision: string;
  onChangeInvestigationDecision: (val: string) => void;
}

export const InvestigationSupport: React.FC<InvestigationSupportProps> = ({
  investigations: initialInvestigations,
  patient,
  onProceed,
  clinicianInvestigationDecision,
  onChangeInvestigationDecision,
}) => {
  // Determine best matching condition profile
  const isKnee = patient.chiefComplaint.toLowerCase().includes('knee');
  const defaultCondition = isKnee
    ? 'Acute Anterior Cruciate Ligament (ACL) Rupture'
    : 'Lumbar Radiculopathy / Disc Herniation with Nerve Root Compromise';

  const [activeConditionKey, setActiveConditionKey] = useState<string>(defaultCondition);
  const [selectedModalityFilter, setSelectedModalityFilter] = useState<string>('All');
  const [selectedInvestigations, setSelectedInvestigations] = useState<string[]>([]);

  const activeProfile: ConditionInvestigationProfile =
    WORLDWIDE_INVESTIGATION_PROFILES[activeConditionKey] ||
    WORLDWIDE_INVESTIGATION_PROFILES['Acute Anterior Cruciate Ligament (ACL) Rupture'];

  const allAvailableConditions = Object.keys(WORLDWIDE_INVESTIGATION_PROFILES);

  const modalityFilterOptions = [
    'All',
    'Plain Radiograph (X-ray)',
    'MRI Scan',
    'CT Scan',
    'Diagnostic Ultrasound (MSK US)',
    'Pathology & Lab Diagnostics',
    'Arthrocentesis / Synovial Fluid',
    'Recent Technological Advances',
  ];

  const filteredInvestigations = activeProfile.investigations.filter((inv) => {
    if (selectedModalityFilter === 'All') return true;
    return inv.modality === selectedModalityFilter;
  });

  const handleToggleSelectInvestigation = (invTitle: string) => {
    const isSelected = selectedInvestigations.includes(invTitle);
    const updated = isSelected
      ? selectedInvestigations.filter((i) => i !== invTitle)
      : [...selectedInvestigations, invTitle];

    setSelectedInvestigations(updated);

    // Update parent clinical decision text
    if (updated.length > 0) {
      const summaryText = `Clinician Documented Orders: ${updated.join('; ')}. Evaluated against CPG imaging stewardship guidelines.`;
      onChangeInvestigationDecision(summaryText);
    } else {
      onChangeInvestigationDecision('No diagnostic imaging or invasive tests ordered at this encounter; proceeding with conservative rehabilitation trial.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Worldwide Diagnostic Investigations & Recent Advances Engine
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-modality protocols (X-ray, 3T MRI, DECT, MSK US, Path Lab) with peer-reviewed journal citations and diagnostic accuracy.
          </p>
        </div>

        {/* Condition Profile Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-medium">Condition Diagnostic Protocol:</span>
          <select
            value={activeConditionKey}
            onChange={(e) => {
              setActiveConditionKey(e.target.value);
              setSelectedModalityFilter('All');
            }}
            className="text-xs p-2 border border-slate-300 rounded-lg bg-white font-semibold text-slate-900 focus:outline-teal-700 shadow-xs max-w-xs"
          >
            {allAvailableConditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Governance Banner: No Autonomous Ordering */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Worldwide Imaging Stewardship & Diagnostic Governance Standard
          </div>
          <p className="leading-relaxed">
            ClinicaAI synthesizes global clinical consensus guidelines (ACR Appropriateness Criteria, NICE NG59, ESSKA, EULAR, IDSA) for every investigation modality. ClinicaAI never autonomously places orders. Tests must be validated against clinical indications to prevent unnecessary radiation and incidentaloma cascades.
          </p>
        </div>
      </div>

      {/* Condition Summary Badge */}
      <div className="bg-teal-50/50 border border-teal-200/80 rounded-xl p-4 text-xs space-y-1">
        <div className="font-bold text-teal-950 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-teal-700" />
          <span>Clinical Consensus Overview for {activeProfile.conditionName}:</span>
        </div>
        <p className="text-slate-700 leading-relaxed">{activeProfile.summaryGuideline}</p>
      </div>

      {/* Modality Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
        {modalityFilterOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelectedModalityFilter(opt)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              selectedModalityFilter === opt
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {opt === 'Recent Technological Advances' ? (
              <span className="flex items-center gap-1 text-teal-800">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Recent Advances ({activeProfile.recentAdvances.length})
              </span>
            ) : (
              opt
            )}
          </button>
        ))}
      </div>

      {/* SECTION 1: Modality Specific Investigation Cards */}
      {selectedModalityFilter !== 'Recent Technological Advances' && (
        <div className="space-y-4">
          {filteredInvestigations.map((item) => {
            const isAddedToPlan = selectedInvestigations.includes(
              `${item.modality} (${item.modalitySubtype || item.modality})`
            );

            return (
              <div
                key={item.id}
                className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs hover:border-slate-300 transition-all"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-slate-900 text-sm">{item.modality}</span>
                      {item.modalitySubtype && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="font-semibold text-teal-800">{item.modalitySubtype}</span>
                        </>
                      )}
                      <span className="text-slate-300">·</span>
                      <span
                        className={`font-semibold ${
                          item.isIndicated ? 'text-teal-700' : 'text-slate-500'
                        }`}
                      >
                        {item.isIndicated ? 'Indicated Under Guideline Criteria' : 'Not Routinely Indicated First-Line'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                        item.urgencyLevel === 'Emergency'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.urgencyLevel === 'Urgent (< 2 weeks)'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Urgency: {item.urgencyLevel}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleToggleSelectInvestigation(
                          `${item.modality} (${item.modalitySubtype || item.modality})`
                        )
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1 ${
                        isAddedToPlan
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {isAddedToPlan ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                          <span>Added to Plan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Diagnostic Accuracy Strip (if available) */}
                {item.diagnosticAccuracy && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono">
                    {item.diagnosticAccuracy.sensitivity && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Sensitivity:</span>
                        <span className="font-bold text-slate-900">{item.diagnosticAccuracy.sensitivity}</span>
                      </div>
                    )}
                    {item.diagnosticAccuracy.specificity && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Specificity:</span>
                        <span className="font-bold text-slate-900">{item.diagnosticAccuracy.specificity}</span>
                      </div>
                    )}
                    {item.diagnosticAccuracy.positiveLikelihoodRatio && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">+Likelihood Ratio (+LR):</span>
                        <span className="font-bold text-teal-700">
                          {item.diagnosticAccuracy.positiveLikelihoodRatio}
                        </span>
                      </div>
                    )}
                    {item.diagnosticAccuracy.negativeLikelihoodRatio && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">-Likelihood Ratio (-LR):</span>
                        <span className="font-bold text-slate-600">
                          {item.diagnosticAccuracy.negativeLikelihoodRatio}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Text Sections */}
                <div className="text-xs space-y-2 text-slate-700 leading-relaxed">
                  <p>
                    <strong className="text-slate-900">Specific Clinical Indication Rules: </strong>
                    {item.clinicalIndicationRules}
                  </p>
                  <p>
                    <strong className="text-slate-900">Diagnostic Limitations & Risks: </strong>
                    {item.limitationsAndRisks}
                  </p>
                  {item.sampleFindings && (
                    <p className="bg-slate-50 p-2 rounded border border-slate-100">
                      <strong className="text-slate-900">Typical Pathological Findings: </strong>
                      <span className="text-slate-700">{item.sampleFindings}</span>
                    </p>
                  )}
                </div>

                {/* Choosing Wisely Warning Box */}
                {item.choosingWiselyStatement && (
                  <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Choosing Wisely Clinical Principle: </span>
                      <span>{item.choosingWiselyStatement}</span>
                    </div>
                  </div>
                )}

                {/* Recent Peer-Reviewed Research Article with Journal & DOI */}
                {item.recentResearchPaper && (
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1 text-teal-900">
                        <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                        Key Peer-Reviewed Investigation Study ({item.recentResearchPaper.year})
                      </span>
                      <a
                        href={`https://doi.org/${item.recentResearchPaper.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>DOI: {item.recentResearchPaper.doi}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>

                    <div className="font-bold text-slate-900 leading-snug">
                      "{item.recentResearchPaper.title}"
                    </div>

                    <div className="text-slate-500 text-[11px]">
                      {item.recentResearchPaper.authors} · <em className="font-semibold text-slate-700">{item.recentResearchPaper.journal}</em> ({item.recentResearchPaper.year})
                      {item.recentResearchPaper.sampleSize && ` · ${item.recentResearchPaper.sampleSize}`}
                    </div>

                    <div className="text-slate-700 text-[11px] leading-relaxed pt-1">
                      <strong className="text-slate-900">Diagnostic Takeaway: </strong>
                      {item.recentResearchPaper.keyTakeaway}
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  Guideline Reference: {item.guidelineReference}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: Recent Technological Advances for This Condition */}
      {(selectedModalityFilter === 'All' || selectedModalityFilter === 'Recent Technological Advances') && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Recent Advances & Breakthrough Diagnostic Research ({activeProfile.conditionName})</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">Literature Indexed: 2024–2026</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeProfile.recentAdvances.map((adv, idx) => (
              <div
                key={idx}
                className="border border-teal-200 bg-teal-50/20 rounded-xl p-5 space-y-3 shadow-xs hover:border-teal-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                      {adv.readinessLevel}
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm mt-1">{adv.technologyName}</h5>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong className="text-slate-900">Clinical Impact: </strong>
                  {adv.clinicalImpact}
                </p>

                {/* Published Journal Article */}
                <div className="p-3 bg-white rounded-lg border border-teal-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600">
                      Published Evidence in <strong className="text-teal-900">{adv.keyJournalArticle.journal}</strong>
                    </span>
                    <a
                      href={`https://doi.org/${adv.keyJournalArticle.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>DOI: {adv.keyJournalArticle.doi}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div className="font-bold text-slate-900 leading-snug">
                    "{adv.keyJournalArticle.title}"
                  </div>

                  <div className="text-slate-500 text-[11px]">
                    {adv.keyJournalArticle.authors} ({adv.keyJournalArticle.year}) · {adv.keyJournalArticle.studyType}
                  </div>

                  <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">
                    {adv.keyJournalArticle.clinicalSummary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Pathology & Clinical Laboratory Reference Ranges */}
      {activeProfile.pathLabProfile && activeProfile.pathLabProfile.length > 0 && (
        <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            <TestTube className="w-4 h-4 text-teal-700" />
            <span>Pathology & Laboratory Diagnostic Thresholds</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-mono text-[11px]">
                  <th className="py-2 pr-4 font-semibold">Laboratory Test</th>
                  <th className="py-2 pr-4 font-semibold">Normal Reference</th>
                  <th className="py-2 pr-4 font-semibold text-rose-800">Pathological Cutoff</th>
                  <th className="py-2 pr-4 font-semibold">Diagnostic Significance</th>
                  <th className="py-2 font-semibold">Journal Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {activeProfile.pathLabProfile.map((lab, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-2.5 pr-4 font-bold text-slate-900">{lab.testName}</td>
                    <td className="py-2.5 pr-4 font-mono text-[11px]">{lab.normalReference}</td>
                    <td className="py-2.5 pr-4 font-mono text-[11px] font-semibold text-rose-800">
                      {lab.pathologicalThreshold}
                    </td>
                    <td className="py-2.5 pr-4">{lab.clinicalSignificance}</td>
                    <td className="py-2.5">
                      <a
                        href={`https://doi.org/${lab.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>{lab.evidenceJournal}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: Latest Benchmark Research Papers for Condition */}
      {activeProfile.newResearchPapers && activeProfile.newResearchPapers.length > 0 && (
        <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>High-Impact Multicenter Clinical Trials & Guidelines (2024–2026)</span>
          </h4>

          <div className="space-y-3">
            {activeProfile.newResearchPapers.map((paper) => (
              <div key={paper.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-bold text-slate-900 text-sm">"{paper.title}"</div>
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 hover:underline flex items-center gap-1 font-mono text-[11px] shrink-0"
                  >
                    <span>DOI: {paper.doi}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="text-slate-500 text-[11px]">
                  {paper.authors} · <strong className="text-slate-800 font-semibold">{paper.journal}</strong> ({paper.year})
                  {paper.sampleSize && ` · Sample: ${paper.sampleSize}`}
                </div>

                <p className="text-slate-700 leading-relaxed">{paper.clinicalSummary}</p>

                <div className="text-teal-900 font-semibold bg-teal-50 p-2 rounded border border-teal-100 text-[11px]">
                  Takeaway: {paper.keyTakeaway}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clinician Investigation Decision & Order Builder */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
        <label className="block text-xs font-bold text-slate-900">
          Clinician's Documented Investigation Plan & Orders:
        </label>
        <textarea
          rows={3}
          value={clinicianInvestigationDecision}
          onChange={(e) => onChangeInvestigationDecision(e.target.value)}
          placeholder="e.g. Order standing 3-view knee radiographs per Ottawa Knee Rules; schedule non-contrast 3T MRI knee if mechanical instability persists beyond 2 weeks..."
          className="w-full text-xs p-3 border border-slate-300 rounded-lg bg-white focus:outline-teal-700 font-medium"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Selected Investigations in Plan: {selectedInvestigations.length}</span>
          <span>Explicitly distinguishes clinician-ordered tests from AI recommendations.</span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Proceed to evidence-informed conservative management and rehabilitation.
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Continue to Treatment & Management</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
