import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, SkipForward, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdaptiveQuestion } from '../types/clinical';

interface AdaptiveHistoryProps {
  questions: AdaptiveQuestion[];
  onAnswerQuestion: (id: string, value: any) => void;
  onSkipQuestion: (id: string, reason: string) => void;
  onProceed: () => void;
}

export const AdaptiveHistory: React.FC<AdaptiveHistoryProps> = ({
  questions,
  onAnswerQuestion,
  onSkipQuestion,
  onProceed,
}) => {
  const [expandedRationale, setExpandedRationale] = useState<Record<string, boolean>>({});
  const [skipPromptId, setSkipPromptId] = useState<string | null>(null);
  const [skipReasonInput, setSkipReasonInput] = useState('');

  const toggleRationale = (id: string) => {
    setExpandedRationale((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirmSkip = (id: string) => {
    if (!skipReasonInput.trim()) return;
    onSkipQuestion(id, skipReasonInput.trim());
    setSkipPromptId(null);
    setSkipReasonInput('');
  };

  const answeredCount = questions.filter((q) => q.value !== '' && !q.isSkipped).length;
  const skippedCount = questions.filter((q) => q.isSkipped).length;

  return (
    <div className="space-y-6">
      {/* Header & Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Adaptive Clinical History</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Targeted clinical questions dynamically conditioned on specialty, complaint, and presentation.
          </p>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-3">
          <span>
            Completed: <strong className="font-mono text-slate-900">{answeredCount}</strong> of{' '}
            <strong className="font-mono text-slate-900">{questions.length}</strong>
          </span>
          {skippedCount > 0 && (
            <span className="text-slate-400">
              (Skipped with clinical reason: {skippedCount})
            </span>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((q, index) => {
          const isRationaleOpen = !!expandedRationale[q.id];

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all ${
                q.isSkipped
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : q.value
                  ? 'bg-white border-teal-200 shadow-xs ring-1 ring-teal-500/10'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono text-slate-400">0{index + 1}.</span>
                      <span className="font-medium text-slate-600">{q.specialty.toUpperCase()}</span>
                      <span>·</span>
                      <span>Target: {q.complaintCondition}</span>
                      {q.isSkipped && (
                        <span className="text-amber-700 font-semibold ml-2">
                          [Skipped: {q.skipReason}]
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  {/* Top-right actions: Rationale & Skip */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleRationale(q.id)}
                      className="px-2.5 py-1 text-[11px] font-medium text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/70 rounded-md transition-colors flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Why this is relevant</span>
                      {isRationaleOpen ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    {!q.isSkipped ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSkipPromptId(q.id);
                          setSkipReasonInput('');
                        }}
                        className="px-2.5 py-1 text-[11px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                      >
                        <SkipForward className="w-3 h-3" />
                        <span>Skip</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAnswerQuestion(q.id, '')}
                        className="px-2.5 py-1 text-[11px] text-teal-700 hover:underline"
                      >
                        Un-skip
                      </button>
                    )}
                  </div>
                </div>

                {/* Clinical Rationale Drawer */}
                {isRationaleOpen && (
                  <div className="mt-3 p-3 bg-teal-50/60 rounded-lg border border-teal-100 text-xs text-slate-700 leading-relaxed">
                    <div className="font-semibold text-teal-950 mb-1 flex items-center gap-1.5">
                      <span>Clinical Sensitivity & Evidence Rationale</span>
                    </div>
                    <p>{q.explanation}</p>
                  </div>
                )}

                {/* Skip Reason Prompt Modal/Inline form */}
                {skipPromptId === q.id && (
                  <div className="mt-3 p-3 bg-slate-100 rounded-lg border border-slate-300 space-y-2">
                    <div className="text-xs font-semibold text-slate-800">
                      Document Clinical Reason for Skipping Item:
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Non-traumatic onset, question assessed in prior clinic notes, non-contributory..."
                        value={skipReasonInput}
                        onChange={(e) => setSkipReasonInput(e.target.value)}
                        className="flex-1 text-xs p-2 rounded border border-slate-300 bg-white focus:outline-teal-700"
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmSkip(q.id)}
                        disabled={!skipReasonInput.trim()}
                        className="px-3 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 disabled:opacity-50"
                      >
                        Confirm Skip
                      </button>
                      <button
                        type="button"
                        onClick={() => setSkipPromptId(null)}
                        className="px-2.5 py-2 text-xs text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Question Input Controls */}
                {!q.isSkipped && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    {q.type === 'select' && q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isSelected = q.value === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => onAnswerQuestion(q.id, opt)}
                              className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                                isSelected
                                  ? 'border-teal-700 bg-teal-50/70 text-teal-950 shadow-xs ring-1 ring-teal-700/20'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'border-teal-700 bg-teal-700'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action to proceed */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          History questions inform test indications in the physical examination engine.
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Continue to Physical Assessment Checklist</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
