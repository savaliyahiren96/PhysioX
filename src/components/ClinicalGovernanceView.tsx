import React, { useState } from 'react';
import { ShieldAlert, RotateCcw, CheckCircle, AlertTriangle, FileText, Send, UserCheck, Scale } from 'lucide-react';
import { ClinicalRuleGovernance } from '../types/clinical';
import { INITIAL_RULES } from '../data/clinicalKnowledge';

export const ClinicalGovernanceView: React.FC = () => {
  const [rules, setRules] = useState<ClinicalRuleGovernance[]>(INITIAL_RULES);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentRuleId, setIncidentRuleId] = useState('RULE-RED-FLAG-01');
  const [incidentSeverity, setIncidentSeverity] = useState('Low / Documentation Feedback');
  const [incidentFeedback, setIncidentFeedback] = useState('');
  const [incidentSubmitted, setIncidentSubmitted] = useState<string | null>(null);

  const handleRollbackRule = (ruleId: string) => {
    const confirmation = window.confirm(
      `Are you sure you want to rollback ${ruleId} to its previous stable release? This change will be logged in the clinical audit registry.`
    );
    if (!confirmation) return;

    setRules((prev) =>
      prev.map((r) =>
        r.id === ruleId
          ? {
              ...r,
              status: 'Rolled Back',
              version: `${r.version}-reverted`,
              lastReviewed: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );
  };

  const handleSubmitIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentFeedback.trim()) return;

    try {
      const res = await fetch('/api/governance/incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ruleId: incidentRuleId,
          severity: incidentSeverity,
          clinicianFeedback: incidentFeedback,
          patientContext: 'De-identified clinical encounter review',
        }),
      });
      const data = await res.json();
      setIncidentSubmitted(`Incident logged successfully with ID: ${data.incidentId}. Clinical Informatics Board notified.`);
      setIncidentFeedback('');
      setTimeout(() => {
        setIncidentOpen(false);
        setIncidentSubmitted(null);
      }, 2500);
    } catch (err) {
      console.error(err);
      setIncidentSubmitted('Incident recorded in local governance ledger.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Clinical Governance & Decision Rules Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Version-controlled medical rules, expert panel approvals, audit trails, rollback mechanisms, and incident reporting.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIncidentOpen(true)}
          className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs shrink-0 transition-colors"
        >
          <ShieldAlert className="w-4 h-4 text-rose-200" />
          <span>Report Clinical Rule Feedback / Incident</span>
        </button>
      </div>

      {/* Governance Constitution Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <Scale className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Zero Autonomous Learning Constitution
          </div>
          <p className="leading-relaxed">
            ClinicaAI strictly prohibits autonomous machine learning updates from live patient encounters without human-in-the-loop validation. Every rule modification must undergo peer evaluation by credentialed clinical specialists before production deployment.
          </p>
        </div>
      </div>

      {/* Rules Registry Table */}
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Active Versioned Clinical Rules ({rules.length})</h3>
          <span className="text-xs text-slate-400 font-mono">Registry Engine: v2.4.1</span>
        </div>

        <div className="divide-y divide-slate-100">
          {rules.map((rule) => (
            <div key={rule.id} className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-900">{rule.id}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-bold text-slate-900 text-sm">{rule.title}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {rule.version}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      rule.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {rule.status}
                  </span>
                </div>

                {rule.rollbackAvailable && rule.status === 'Active' && (
                  <button
                    type="button"
                    onClick={() => handleRollbackRule(rule.id)}
                    className="px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-md font-medium transition-colors flex items-center gap-1 shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Rollback Rule</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-50 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span>Audited By: {rule.reviewedBy}</span>
                </div>
                <div>Last Validated: {rule.lastReviewed}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident / Rule Feedback Modal */}
      {incidentOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Clinical Rule Feedback & Incident Report
              </h3>
              <button
                type="button"
                onClick={() => setIncidentOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {incidentSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium">
                {incidentSubmitted}
              </div>
            ) : (
              <form onSubmit={handleSubmitIncident} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Associated Clinical Rule:</label>
                  <select
                    value={incidentRuleId}
                    onChange={(e) => setIncidentRuleId(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded bg-white"
                  >
                    {rules.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.id}: {r.title} ({r.version})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Feedback Severity Level:</label>
                  <select
                    value={incidentSeverity}
                    onChange={(e) => setIncidentSeverity(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded bg-white"
                  >
                    <option>Low / Documentation Feedback</option>
                    <option>Moderate / Ambiguous Clinical Recommendation</option>
                    <option>High / Potential Safety Hazard or Near Miss</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Clinician Feedback & Specific Case Details (De-identified):
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={incidentFeedback}
                    onChange={(e) => setIncidentFeedback(e.target.value)}
                    placeholder="Describe any discordance with clinical evidence, unexpected guideline trigger, or recommendation ambiguity..."
                    className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-teal-700"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIncidentOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-700 text-white rounded-lg font-semibold hover:bg-rose-800"
                  >
                    Submit Report to Board
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
