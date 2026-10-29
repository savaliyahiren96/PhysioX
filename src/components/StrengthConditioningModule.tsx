import React, { useState, useMemo } from 'react';
import {
  SC_PERIODIZATION_MODELS_INFO,
  SC_EXERCISE_LIBRARY,
  DEMO_MESOCYCLES,
} from '../data/strengthAndConditioningData';
import { PeriodizationModel, SCExperienceLevel } from '../types/clinical';
import {
  Dumbbell,
  Calculator,
  Calendar,
  Layers,
  Activity,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Zap,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';

export const StrengthConditioningModule: React.FC = () => {
  // 1RM Estimator State
  const [liftWeightKg, setLiftWeightKg] = useState<number>(100);
  const [repsPerformed, setRepsPerformed] = useState<number>(5);

  // Periodisation & Program State
  const [selectedModel, setSelectedModel] = useState<PeriodizationModel>('Block Periodisation');
  const [selectedLevel, setSelectedLevel] = useState<SCExperienceLevel>('Intermediate (1-3 yrs)');
  const [activeWeekIndex, setActiveWeekIndex] = useState<number>(0);

  // Epley & Brzycki 1RM Calculations
  const epley1RM = useMemo(() => {
    if (repsPerformed === 1) return liftWeightKg;
    return Math.round(liftWeightKg * (1 + repsPerformed / 30));
  }, [liftWeightKg, repsPerformed]);

  const brzycki1RM = useMemo(() => {
    if (repsPerformed === 1) return liftWeightKg;
    return Math.round(liftWeightKg / (1.0278 - 0.0278 * repsPerformed));
  }, [liftWeightKg, repsPerformed]);

  const avgEstimated1RM = Math.round((epley1RM + brzycki1RM) / 2);

  const zones = useMemo(() => {
    return [
      { percent: '95%', reps: '2 reps', load: Math.round(avgEstimated1RM * 0.95), focus: 'Near-Maximal Strength' },
      { percent: '90%', reps: '3–4 reps', load: Math.round(avgEstimated1RM * 0.90), focus: 'Maximal Strength / High Motor Unit' },
      { percent: '85%', reps: '5–6 reps', load: Math.round(avgEstimated1RM * 0.85), focus: 'Strength-Hypertrophy Sweetspot' },
      { percent: '80%', reps: '7–8 reps', load: Math.round(avgEstimated1RM * 0.80), focus: 'Functional Hypertrophy' },
      { percent: '75%', reps: '8–10 reps', load: Math.round(avgEstimated1RM * 0.75), focus: 'Hypertrophy / Muscular Volume' },
      { percent: '70%', reps: '10–12 reps', load: Math.round(avgEstimated1RM * 0.70), focus: 'Metabolic Conditioning' },
      { percent: '60%', reps: '15+ reps', load: Math.round(avgEstimated1RM * 0.60), focus: 'Explosive Speed-Power / Tissue Capacity' },
    ];
  }, [avgEstimated1RM]);

  const activeMesocycle = DEMO_MESOCYCLES.cricketFastBowlerPower;
  const currentWeek = activeMesocycle.microcycles[activeWeekIndex] || activeMesocycle.microcycles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            <Dumbbell className="w-4 h-4 text-teal-600" />
            <span>Strength & Conditioning Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Evidence-Based Strength & Conditioning Programming Engine
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Periodised athletic physical preparation (Block, DUP, Linear). Includes 1RM velocity/percentage estimators, Indian gym and ground facility adaptations, and structured multi-week training microcycles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-900 rounded-lg text-xs font-semibold">
            NSCA / UKSCA / ASCA Standards
          </span>
        </div>
      </div>

      {/* Grid: 1RM Estimator & Training Zones (5 cols) + Periodisation Models (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive 1RM Calculator */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-sm text-slate-900">1-Repetition Maximum (1RM) Estimator</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Epley & Brzycki</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-medium text-slate-700">Submaximal Load (kg):</label>
              <input
                type="number"
                min="10"
                max="400"
                value={liftWeightKg}
                onChange={(e) => setLiftWeightKg(Number(e.target.value) || 0)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="font-medium text-slate-700">Reps to Failure (1–12):</label>
              <input
                type="number"
                min="1"
                max="12"
                value={repsPerformed}
                onChange={(e) => setRepsPerformed(Number(e.target.value) || 1)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wide">
                Estimated True 1RM
              </span>
              <div className="text-2xl font-bold font-mono text-teal-950 mt-0.5">
                {avgEstimated1RM} kg
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500 font-mono space-y-0.5">
              <div>Epley: {epley1RM} kg</div>
              <div>Brzycki: {brzycki1RM} kg</div>
            </div>
          </div>

          {/* Dosed Training Zones Table */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Prescribed Percentage Dosing Zones:
            </span>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2 px-2.5">% 1RM</th>
                    <th className="py-2 px-2.5">Load</th>
                    <th className="py-2 px-2.5">Target Reps</th>
                    <th className="py-2 px-2.5">Adaptation Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {zones.map((z, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-1.5 px-2.5 font-bold font-mono text-teal-800">{z.percent}</td>
                      <td className="py-1.5 px-2.5 font-mono font-bold text-slate-900">{z.load} kg</td>
                      <td className="py-1.5 px-2.5 text-slate-600">{z.reps}</td>
                      <td className="py-1.5 px-2.5 text-slate-500 text-[11px]">{z.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Periodisation Models Explorer */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-sm text-slate-900">Periodisation Architecture & Planning Models</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">4 Models Available</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SC_PERIODIZATION_MODELS_INFO.map((item) => {
              const isSelected = selectedModel === item.model;
              return (
                <button
                  key={item.model}
                  type="button"
                  onClick={() => setSelectedModel(item.model)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50 ring-1 ring-teal-600 text-slate-900 font-semibold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{item.model}</div>
                </button>
              );
            })}
          </div>

          {/* Model Description Card */}
          {(() => {
            const m = SC_PERIODIZATION_MODELS_INFO.find((x) => x.model === selectedModel)!;
            return (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{m.model} Structure</span>
                  <span className="text-[10px] text-teal-700 font-semibold uppercase">Scientific Basis</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{m.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                  <div>
                    <strong className="text-slate-800">Best Suited For:</strong>
                    <p className="text-slate-600">{m.bestSuitedFor}</p>
                  </div>
                  <div>
                    <strong className="text-slate-800">Volume-Intensity Dynamic:</strong>
                    <p className="text-slate-600">{m.volumeIntensityDynamic}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Pre-Built Mesocycle Training Plan Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Structured 4-Week Competition Block</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{activeMesocycle.blockName}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{activeMesocycle.primaryAdaptation}</p>
          </div>

          {/* Microcycle Week Tabs */}
          <div className="flex items-center gap-1.5">
            {activeMesocycle.microcycles.map((mc, idx) => (
              <button
                key={mc.weekNumber}
                type="button"
                onClick={() => setActiveWeekIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeWeekIndex === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Week {mc.weekNumber} {mc.deloadWeek && '(Deload)'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Microcycle Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <span className="font-bold text-slate-900">Week {currentWeek.weekNumber} Focus:</span>{' '}
              <span className="text-slate-700">{currentWeek.focus}</span>
            </div>
            <span className="font-mono text-teal-700 font-semibold">
              Volume Load: {currentWeek.volumeLoadEstimateKg}
            </span>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {currentWeek.sessions.map((sess, sIdx) => (
              <div key={sIdx} className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <span className="font-bold text-sm text-slate-900">{sess.dayName}</span>
                </div>

                {/* Warm-Up RAMP */}
                <div className="text-xs bg-teal-50/50 p-2.5 rounded border border-teal-100 text-slate-700 flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-teal-900">RAMP Dynamic Warm-Up:</strong>{' '}
                    <span>{sess.warmUpRampProtocol.join(' · ')}</span>
                  </div>
                </div>

                {/* Exercise Dosing Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-2 px-3">Exercise</th>
                        <th className="py-2 px-3">Sets x Reps</th>
                        <th className="py-2 px-3">Intensity</th>
                        <th className="py-2 px-3">Tempo</th>
                        <th className="py-2 px-3">Rest</th>
                        <th className="py-2 px-3">Indian Equipment Adaptation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sess.exercises.map((ex, eIdx) => (
                        <tr key={eIdx} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-semibold text-slate-900">{ex.exerciseName}</td>
                          <td className="py-2 px-3 font-mono text-slate-700 whitespace-nowrap">{ex.sets} x {ex.repsOrDuration}</td>
                          <td className="py-2 px-3 font-mono text-teal-800 font-bold whitespace-nowrap">{ex.intensityRpeOrPercent1RM}</td>
                          <td className="py-2 px-3 font-mono text-slate-600">{ex.tempo}</td>
                          <td className="py-2 px-3 font-mono text-slate-600 whitespace-nowrap">{ex.restSeconds}s</td>
                          <td className="py-2 px-3 text-slate-500 text-[11px] leading-tight">{ex.equipmentAdaptation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cool Down */}
                <div className="text-[11px] text-slate-500 pt-1">
                  <strong>Cool-Down & Joint Decompression:</strong> {sess.coolDownMobility.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
