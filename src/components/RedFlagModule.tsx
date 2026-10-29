import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, PhoneCall, Info, ArrowRight, ExternalLink } from 'lucide-react';
import { RedFlagItem, RedFlagUrgency } from '../types/clinical';

interface RedFlagModuleProps {
  redFlags: RedFlagItem[];
  onToggleRedFlag: (id: string, isPositive: boolean, notes?: string) => void;
  onProceedToAssessment: () => void;
}

export const RedFlagModule: React.FC<RedFlagModuleProps> = ({
  redFlags,
  onToggleRedFlag,
  onProceedToAssessment,
}) => {
  const [clinicianAcknowledgement, setClinicianAcknowledgement] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Record<string, string>>({});

  const positiveFlags = redFlags.filter((f) => f.isPositive);
  const hasEmergency = positiveFlags.some((f) => f.urgency === 'EMERGENCY_IMMEDIATE');
  const hasUrgent = positiveFlags.some((f) => f.urgency === 'URGENT_SAME_DAY');

  const getUrgencyBadge = (urgency: RedFlagUrgency) => {
    switch (urgency) {
      case 'EMERGENCY_IMMEDIATE':
        return <span className="text-rose-700 font-bold text-xs uppercase tracking-wide">Emergency (Immediate ED Transfer)</span>;
      case 'URGENT_SAME_DAY':
        return <span className="text-amber-700 font-bold text-xs uppercase tracking-wide">Urgent Same-Day (Within 24 Hours)</span>;
      case 'PRIORITY_ROUTINE':
        return <span className="text-blue-700 font-semibold text-xs uppercase tracking-wide">Priority Review (1-2 Weeks)</span>;
      default:
        return <span className="text-slate-500 text-xs">Negative / Clear</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Mandatory Clinical Governance Disclaimer Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 space-y-1">
          <div className="font-semibold text-slate-900">
            Mandatory Red-Flag Triage & Diagnostic Governance Standard
          </div>
          <p className="leading-relaxed">
            Every clinical presentation must be screened for life- or limb-threatening pathology prior to routine assessment.
            <strong className="text-slate-900 ml-1">Critical Clinical Rule:</strong> A negative screening questionnaire must never be interpreted as definitive proof that serious pathology is absent. Routine assessment completion must never delay indicated emergency escalation.
          </p>
        </div>
      </div>

      {/* Active Escalation Warning Banner if any flag is positive */}
      {positiveFlags.length > 0 && (
        <div
          className={`rounded-xl p-5 border shadow-sm ${
            hasEmergency
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-2.5 rounded-lg ${
                hasEmergency ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold">
                  {hasEmergency
                    ? 'CRITICAL RED-FLAG ALERT: IMMEDIATE ESCALATION REQUIRED'
                    : 'URGENT CLINICAL WARNING: SAME-DAY CONSULTATION REQUIRED'}
                </h4>
                <span className="text-xs font-mono font-semibold">
                  {positiveFlags.length} Positive Indicator(s) Identified
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                One or more screening triggers indicate potential serious spinal, infectious, or vascular pathology. Routine outpatient musculoskeletal evaluation must not supersede immediate emergency stabilization.
              </p>

              {/* Specific breakdown of triggered items */}
              <div className="mt-3 space-y-2 bg-white/80 rounded-lg p-3 border border-rose-200/60">
                {positiveFlags.map((flag) => (
                  <div key={flag.id} className="text-xs pb-2 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{flag.label}</span>
                      {getUrgencyBadge(flag.urgency)}
                    </div>
                    <div className="text-slate-700 mt-1">
                      <span className="font-medium text-rose-900">Escalation Protocol: </span>
                      {flag.escalationPath}
                    </div>
                    <div className="text-slate-500 mt-0.5 text-[11px]">
                      <span className="font-medium">Rationale: </span>
                      {flag.clinicalRationale}
                    </div>
                  </div>
                ))}
              </div>

              {/* Escalation Emergency Direct Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:999"
                  className="px-3.5 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Initiate Emergency Transfer (999 / 911 / ED)
                </a>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer ml-auto">
                  <input
                    type="checkbox"
                    checked={clinicianAcknowledgement}
                    onChange={(e) => setClinicianAcknowledgement(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-rose-700 focus:ring-rose-600"
                  />
                  <span>I acknowledge the red-flag finding and have initiated/documented escalation</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Red Flags Checklist */}
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Safety & Red-Flag Screening Checklist</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and record presence or absence of warning signs before physical tests.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Screened: <span className="font-mono font-semibold text-slate-900">{redFlags.length}</span> items
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {redFlags.map((item) => {
            const isPos = item.isPositive;

            return (
              <div
                key={item.id}
                className={`p-4 transition-colors ${
                  isPos ? 'bg-rose-50/40' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">{item.label}</span>
                      <span className="text-slate-300">·</span>
                      {getUrgencyBadge(item.urgency)}
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{item.findingPrompt}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">Clinical Evidence: </strong>
                      {item.clinicalRationale}
                    </p>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleRedFlag(item.id, false)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        !isPos
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      Screened Negative
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleRedFlag(item.id, true)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        isPos
                          ? 'bg-rose-700 border-rose-700 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-rose-700 hover:border-rose-300 hover:bg-rose-50'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Positive / Suspicious
                      </span>
                    </button>
                  </div>
                </div>

                {/* Clinician notes on this flag if positive */}
                {isPos && (
                  <div className="mt-3 pt-3 border-t border-rose-100">
                    <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                      Clinician Observation / Action Taken for {item.label}:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Referred to On-Call Spine registrar at St Jude Hospital, ref #982..."
                      value={selectedNotes[item.id] || item.notes || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedNotes((prev) => ({ ...prev, [item.id]: val }));
                        onToggleRedFlag(item.id, true, val);
                      }}
                      className="w-full text-xs p-2 rounded border border-rose-200 bg-white focus:outline-teal-700"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Proceed Controls */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-500">
          {positiveFlags.length === 0 ? (
            <span className="flex items-center gap-1.5 text-teal-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              All listed critical red-flag triggers screened negative. Continue to adaptive history.
            </span>
          ) : (
            <span className="text-amber-800 font-medium">
              {positiveFlags.length} positive trigger(s) noted. Clinician override required to advance.
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={positiveFlags.length > 0 && !clinicianAcknowledgement}
          onClick={onProceedToAssessment}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
            positiveFlags.length > 0 && !clinicianAcknowledgement
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <span>Continue to Adaptive History</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
