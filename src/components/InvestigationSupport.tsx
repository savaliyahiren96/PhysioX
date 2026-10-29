import React, { useState } from 'react';
import { FileSearch, AlertCircle, CheckCircle, Clock, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { InvestigationGuidance, PatientIntake } from '../types/clinical';

interface InvestigationSupportProps {
  investigations: InvestigationGuidance[];
  patient: PatientIntake;
  onProceed: () => void;
  clinicianInvestigationDecision: string;
  onChangeInvestigationDecision: (val: string) => void;
}

export const InvestigationSupport: React.FC<InvestigationSupportProps> = ({
  investigations,
  patient,
  onProceed,
  clinicianInvestigationDecision,
  onChangeInvestigationDecision,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Diagnostic Investigation & Prognosis Support</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Evidence-based imaging stewardship, choosing wisely recommendations, and prognostic factor analysis.
          </p>
        </div>
      </div>

      {/* Governance Banner: No Autonomous Ordering */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Imaging Stewardship & Governance Standard
          </div>
          <p className="leading-relaxed">
            ClinicaAI does not automatically order or authorize diagnostic tests. Plain radiographs and advanced imaging must adhere to validated clinical decision rules (e.g. Ottawa Knee Rules, NICE NG59 stewardship). Unnecessary imaging exposes patients to ionizing radiation, incidentalomas, and unnecessary fear-avoidance behavior.
          </p>
        </div>
      </div>

      {/* Modality Considerations Cards */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Modality-Specific Evidence Considerations
        </h4>

        {investigations.map((item) => (
          <div
            key={item.id}
            className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-teal-700" />
                <span className="font-bold text-slate-900 text-sm">{item.modality}</span>
                <span className="text-slate-300">·</span>
                <span
                  className={`text-xs font-semibold ${
                    item.isIndicated ? 'text-teal-700' : 'text-slate-500'
                  }`}
                >
                  {item.isIndicated ? 'Indicated Under Guideline Criteria' : 'Not Routinely Indicated First-Line'}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Urgency: {item.urgencyLevel}
              </span>
            </div>

            <div className="text-xs space-y-2 text-slate-700">
              <p>
                <strong className="text-slate-900">Specific Clinical Indications: </strong>
                {item.clinicalIndicationRules}
              </p>
              <p>
                <strong className="text-slate-900">Diagnostic Limitations & Risks: </strong>
                {item.limitationsAndRisks}
              </p>
            </div>

            {/* Choosing Wisely Warning Box */}
            <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs text-amber-950 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Choosing Wisely Clinical Principle: </span>
                <span>{item.choosingWiselyStatement}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              Guideline Reference: {item.guidelineReference}
            </div>
          </div>
        ))}
      </div>

      {/* Prognostic Stratification & Natural History Box */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-teal-700" />
          Prognostic Factors & Recovery Trajectory
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Favorable Prognostic Indicators:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>High baseline physical function and low fear-avoidance beliefs</li>
              <li>Absence of unremitting nocturnal pain or systemic symptoms</li>
              <li>Symptom centralization with repeated movements (McKenzie)</li>
              <li>Strong active coping strategies and supportive work ergonomics</li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Adverse Prognostic Indicators (Yellow Flags):</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>High psychosocial distress or belief that pain equals structural harm</li>
              <li>Prolonged symptom duration (&gt; 3-6 months without progressive loading)</li>
              <li>Multi-site widespread musculoskeletal pain or severe sleep disturbance</li>
              <li>Presence of secondary gain or contentious workers' compensation claim</li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-slate-100/70 rounded-lg text-xs text-slate-600">
          <strong className="text-slate-800">Prognostic Uncertainty Disclaimer:</strong> Natural biological healing rates exhibit wide individual variance. Recovery milestones (e.g. 6-12 weeks for acute disc resorption; 6-9 months for ligamentous remodeling) are population estimates from prospective cohorts and must never be interpreted as guarantees of recovery.
        </div>
      </div>

      {/* Clinician's Final Investigation Decision */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
        <label className="block text-xs font-bold text-slate-900">
          Clinician's Documented Investigation Plan:
        </label>
        <textarea
          rows={3}
          value={clinicianInvestigationDecision}
          onChange={(e) => onChangeInvestigationDecision(e.target.value)}
          placeholder="e.g. Defer MRI spine for 4-6 weeks pending trial of structured physiotherapy; advise patient on red flags. If progressive motor weakness develops, arrange urgent non-contrast MRI spine..."
          className="w-full text-xs p-3 border border-slate-300 rounded-lg bg-white focus:outline-teal-700"
        />
        <div className="text-[11px] text-slate-400">
          Distinguishes clinician-ordered procedures from AI decision-support guidance.
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
