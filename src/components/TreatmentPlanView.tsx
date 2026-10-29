import React from 'react';
import { Pill, Shield, AlertOctagon, CheckSquare, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { TreatmentRecommendation } from '../types/clinical';

interface TreatmentPlanViewProps {
  treatment: TreatmentRecommendation;
  onUpdateTreatment: (updated: TreatmentRecommendation) => void;
  onProceed: () => void;
}

export const TreatmentPlanView: React.FC<TreatmentPlanViewProps> = ({
  treatment,
  onUpdateTreatment,
  onProceed,
}) => {
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
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Generate Referral & Final Clinical Report</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
