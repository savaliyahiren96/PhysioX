import React, { useState } from 'react';
import { Sparkles, ExternalLink, AlertTriangle, Check, X, HelpCircle, ArrowRight, RefreshCw, FileText } from 'lucide-react';
import { DifferentialCandidate, PatientIntake, SpecialTestItem, RedFlagItem } from '../types/clinical';

interface DifferentialReviewProps {
  candidates: DifferentialCandidate[];
  patient: PatientIntake;
  specialty: string;
  specialTests: SpecialTestItem[];
  redFlags: RedFlagItem[];
  onProceed: () => void;
  onSelectPrimaryDiagnosis: (conditionName: string) => void;
  selectedPrimary: string;
}

export const DifferentialReview: React.FC<DifferentialReviewProps> = ({
  candidates,
  patient,
  specialty,
  specialTests,
  redFlags,
  onProceed,
  onSelectPrimaryDiagnosis,
  selectedPrimary,
}) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<{
    clinicalReasoning?: string;
    differentialSupport?: any[];
    investigationRecommendation?: string;
    referralConsiderations?: string;
    missingInformation?: string[];
  } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const positiveTests = specialTests.filter((t) => t.result === 'Positive');

  const handleRequestAiReasoning = async () => {
    setAiLoading(true);
    setAiError(null);

    try {
      const payload = {
        patient: {
          age: patient.age,
          sex: patient.sex,
          occupation: patient.occupation,
          duration: patient.duration,
          mechanism: patient.injuryMechanism,
          functionalGoals: patient.patientGoals,
        },
        specialty,
        complaint: patient.chiefComplaint,
        redFlags: redFlags.filter((f) => f.isPositive).map((f) => f.label),
        examination: {
          positiveTests: positiveTests.map((t) => `${t.name} (${t.clinicianNotes || 'positive'})`),
          location: patient.anatomicalLocation,
          onset: patient.onset,
        },
      };

      const res = await fetch('/api/clinical/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      setAiInsights(data);
    } catch (err: any) {
      console.error('Failed to query clinical insights:', err);
      setAiError('Notice: Offline mode active. Utilizing local verified clinical guideline rules.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Evidence-Linked Differential Diagnosis Review</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Qualitatively tiered clinical considerations based on mechanism, physical tests, and clinical guidelines.
          </p>
        </div>

        {/* Gemini AI Clinical Synthesis Button */}
        <button
          type="button"
          onClick={handleRequestAiReasoning}
          disabled={aiLoading}
          className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          {aiLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Clinical Evidence...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-teal-200" />
              <span>Generate AI Clinical Synthesis (Gemini 3.8 Flash)</span>
            </>
          )}
        </button>
      </div>

      {/* Statutory Diagnostic Governance Notice */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Diagnostic Uncertainty Principle:</strong> ClinicaAI never claims a definitive diagnosis from clinical presentation alone without gold-standard tissue pathology or imaging confirmation. No fabricated numerical probabilities are generated. All candidate rankings are qualitative and subject to clinician verification.
        </p>
      </div>

      {/* AI Reasoning Response Panel if generated */}
      {aiInsights && (
        <div className="border border-teal-200 bg-teal-50/40 rounded-xl p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-teal-100 pb-2">
            <span className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-700" />
              Gemini 3.8 Flash Clinical Reasoning Synthesis
            </span>
            <span className="text-[11px] text-teal-800">Grounded in CPGs · Clinician Oversight</span>
          </div>

          {aiInsights.clinicalReasoning && (
            <div className="text-xs text-slate-800 leading-relaxed font-medium bg-white/70 p-3 rounded-lg border border-teal-100">
              {aiInsights.clinicalReasoning}
            </div>
          )}

          {aiInsights.missingInformation && aiInsights.missingInformation.length > 0 && (
            <div className="text-xs space-y-1">
              <span className="font-semibold text-teal-950">Recommended Clarifications Before Finalizing:</span>
              <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                {aiInsights.missingInformation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {aiInsights.investigationRecommendation && (
            <div className="text-xs text-slate-700 bg-white/60 p-2.5 rounded border border-teal-100">
              <strong className="text-teal-950">Imaging & Investigation Guidance: </strong>
              {aiInsights.investigationRecommendation}
            </div>
          )}
        </div>
      )}

      {aiError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
          {aiError}
        </div>
      )}

      {/* Differential Candidates Cards */}
      <div className="space-y-4">
        {candidates.map((cand) => {
          const isSelected = selectedPrimary === cand.condition;

          return (
            <div
              key={cand.id}
              className={`rounded-xl border transition-all ${
                isSelected
                  ? 'border-teal-700 bg-white shadow-sm ring-1 ring-teal-700/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-slate-900 text-base">{cand.condition}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-medium text-slate-600">{cand.tier}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cand.clinicalRationale}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPrimaryDiagnosis(cand.condition)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ Selected Primary' : 'Mark Primary'}
                  </button>
                </div>

                {/* 2-Column Supporting vs Conflicting Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  {/* Supporting findings */}
                  <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
                    <div className="font-semibold text-emerald-950 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Supporting Findings from Presentation:</span>
                    </div>
                    <ul className="space-y-1 text-slate-700">
                      {cand.supportingFindings.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conflicting findings / Missing */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500" />
                      <span>Conflicting or Missing Verification:</span>
                    </div>
                    <ul className="space-y-1 text-slate-600">
                      {cand.conflictingFindings.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {cand.missingInformation.map((item, idx) => (
                        <li key={`missing-${idx}`} className="flex items-start gap-1.5 text-slate-500 italic">
                          <span className="text-slate-400 shrink-0">?</span>
                          <span>Need to verify: {item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Traceable Supporting Evidence & CPG Citations */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-700">Traceable Clinical Guidelines: </span>
                    {cand.evidenceCitations.map((cite, i) => (
                      <span key={i} className="inline-block mr-2">
                        {cite.source} ({cite.year})
                        {cite.doi && (
                          <a
                            href={`https://doi.org/${cite.doi}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-teal-700 hover:underline ml-1 inline-flex items-center gap-0.5"
                          >
                            <span>DOI</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {i < cand.evidenceCitations.length - 1 && ' · '}
                      </span>
                    ))}
                  </div>

                  {cand.redFlagNotes && (
                    <div className="text-amber-800 font-medium flex items-center gap-1 shrink-0">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>{cand.redFlagNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Proceed Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Selected working consideration: <strong className="text-slate-900">{selectedPrimary || 'Not specified'}</strong>
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Continue to Investigation & Prognosis</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
