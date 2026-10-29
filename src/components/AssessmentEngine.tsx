import React, { useState } from 'react';
import { Stethoscope, CheckCircle, AlertCircle, HelpCircle, ArrowRight, ExternalLink, Activity } from 'lucide-react';
import { SpecialTestItem } from '../types/clinical';

interface AssessmentEngineProps {
  specialTests: SpecialTestItem[];
  onUpdateTestResult: (id: string, result: SpecialTestItem['result'], notes?: string, score?: string) => void;
  onProceed: () => void;
  romFindings: {
    activeRom: string;
    passiveRom: string;
    mmtStrength: string;
    gaitObservation: string;
    palpationFindings: string;
  };
  onUpdateRomFindings: (key: string, val: string) => void;
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  specialTests,
  onUpdateTestResult,
  onProceed,
  romFindings,
  onUpdateRomFindings,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Special Diagnostic Test',
    'Neurological',
    'Validated Outcome Measure',
  ];

  const filteredTests = specialTests.filter((t) => {
    if (activeCategoryFilter === 'All') return true;
    return t.category === activeCategoryFilter;
  });

  const toggleDetails = (id: string) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = specialTests.filter((t) => t.result !== 'Not Tested').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Physical Examination & Special Tests Engine</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Evidence-based bedside diagnostic accuracy, sensitivity, specificity, and interpretation criteria.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          Recorded: <strong className="font-mono text-slate-900">{completedCount}</strong> of{' '}
          <strong className="font-mono text-slate-900">{specialTests.length}</strong> tests
        </div>
      </div>

      {/* Observation, Palpation & Biomechanics Quick Form */}
      <div className="border border-slate-200 rounded-xl bg-slate-50/50 p-4 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <Activity className="w-4 h-4 text-teal-700" />
          <span>Biomechanical Baseline: Observation, Palpation & Active ROM</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Gait & Structural Observation:
            </label>
            <input
              type="text"
              placeholder="e.g. Antalgic gait, reduced stance phase, mild lateral trunk lean, no pelvic drop..."
              value={romFindings.gaitObservation}
              onChange={(e) => onUpdateRomFindings('gaitObservation', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-teal-700"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Palpation & Effusion Staging:
            </label>
            <input
              type="text"
              placeholder="e.g. Mild warmth, joint line tenderness medial side, grade 1 trace wave effusion..."
              value={romFindings.palpationFindings}
              onChange={(e) => onUpdateRomFindings('palpationFindings', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-teal-700"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Active / Passive Range of Motion (ROM):
            </label>
            <input
              type="text"
              placeholder="e.g. Knee: Flexion 125° (pain at end-range), Extension 0° (equal to left) / Lumbar: Flex 50%, Ext 20°..."
              value={romFindings.activeRom}
              onChange={(e) => onUpdateRomFindings('activeRom', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-teal-700"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              MMT Muscle Strength & Neuro Reflexes:
            </label>
            <input
              type="text"
              placeholder="e.g. Quadriceps 5/5 bilateral, EHL 5/5, Patellar reflex 2+ symmetrical, Achilles 2+..."
              value={romFindings.mmtStrength}
              onChange={(e) => onUpdateRomFindings('mmtStrength', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-teal-700"
            />
          </div>
        </div>
      </div>

      {/* Segmented Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeCategoryFilter === cat
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Special Tests Cards */}
      <div className="space-y-3">
        {filteredTests.map((test) => {
          const isOpen = !!expandedDetails[test.id];
          const isPos = test.result === 'Positive';
          const isEquiv = test.result === 'Equivocal';

          return (
            <div
              key={test.id}
              className={`rounded-xl border transition-all ${
                isPos
                  ? 'bg-amber-50/40 border-amber-300 shadow-xs ring-1 ring-amber-500/10'
                  : test.result === 'Negative'
                  ? 'bg-white border-slate-200'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-slate-900 text-sm">{test.name}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 font-medium">{test.category}</span>
                      {test.sensitivity && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-slate-600 text-[11px]">
                            Sens: {test.sensitivity}
                          </span>
                        </>
                      )}
                      {test.specificity && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-slate-600 text-[11px]">
                            Spec: {test.specificity}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-700">Indication: </strong>
                      {test.indication}
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>Source: {test.evidenceSource}</span>
                      {test.doi && (
                        <>
                          <span>·</span>
                          <a
                            href={`https://doi.org/${test.doi}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-teal-700 hover:underline flex items-center gap-0.5"
                          >
                            <span>DOI: {test.doi}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Result Button Strip */}
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                    {(['Positive', 'Negative', 'Equivocal', 'Not Tested', 'Contraindicated'] as const).map(
                      (opt) => {
                        const isSelected = test.result === opt;
                        let btnColor = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                        if (isSelected) {
                          if (opt === 'Positive') btnColor = 'bg-amber-600 text-white border-amber-600 shadow-xs font-bold';
                          else if (opt === 'Negative') btnColor = 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold';
                          else if (opt === 'Equivocal') btnColor = 'bg-teal-700 text-white border-teal-700 font-semibold';
                          else if (opt === 'Contraindicated') btnColor = 'bg-rose-700 text-white border-rose-700 font-semibold';
                          else btnColor = 'bg-slate-200 text-slate-800 border-slate-300 font-medium';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => onUpdateTestResult(test.id, opt)}
                            className={`px-2.5 py-1.5 text-xs rounded-lg border transition-all ${btnColor}`}
                          >
                            {opt}
                          </button>
                        );
                      }
                    )}

                    <button
                      type="button"
                      onClick={() => toggleDetails(test.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg ml-1"
                      title="Show interpretation rules"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Interpretation Rules Drawer */}
                {isOpen && (
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-900">Interpretation Rules & Clinical Validity:</div>
                    <p className="leading-relaxed">{test.interpretationRules}</p>
                  </div>
                )}

                {/* Additional Clinician Notes on this test if positive or equivocal */}
                {(isPos || isEquiv) && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-700 shrink-0">Findings / Grade:</span>
                    <input
                      type="text"
                      placeholder="e.g. 5mm anterior translation with soft end-feel, pain reproduced at 45° hip flexion..."
                      value={test.clinicianNotes || ''}
                      onChange={(e) => onUpdateTestResult(test.id, test.result, e.target.value, test.scoreValue)}
                      className="flex-1 text-xs p-1.5 border border-slate-200 rounded bg-white focus:outline-teal-700"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Proceed Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Physical findings automatically synthesize into evidence-linked differential considerations.
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Continue to Evidence-Linked Differential</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
