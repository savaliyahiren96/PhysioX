import React, { useState, useMemo } from 'react';
import { ALL_SPORT_PATHWAYS } from '../data/athleteSportsPerformanceData';
import { SportType, SportSpecificPathway } from '../types/clinical';
import {
  Trophy,
  Activity,
  Zap,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Check,
  Search,
  Scale,
  Gauge,
  ClipboardCheck,
  Timer,
  ChevronRight,
  Flame,
} from 'lucide-react';

export const AthletePerformanceModule: React.FC = () => {
  const [selectedSportId, setSelectedSportId] = useState<SportType>('cricket');
  const [activeTab, setActiveTab] = useState<'screening' | 'biomechanics' | 'physiological' | 'workload' | 'rts'>('rts');
  const [rtsChecklist, setRtsChecklist] = useState<Record<string, boolean>>({});
  const [clearedCertificate, setClearedCertificate] = useState(false);

  const currentPathway: SportSpecificPathway = useMemo(() => {
    return ALL_SPORT_PATHWAYS.find((p) => p.sportId === selectedSportId) || ALL_SPORT_PATHWAYS[0];
  }, [selectedSportId]);

  const toggleChecklistItem = (key: string) => {
    setRtsChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allStageGateways = useMemo(() => {
    return currentPathway.returnToSportContinuum.flatMap((stage, sIdx) =>
      stage.objectiveGateways.map((g, gIdx) => ({
        key: `s${sIdx}-g${gIdx}`,
        stageName: stage.stage,
        text: g,
        risk: stage.riskMitigation,
      }))
    );
  }, [currentPathway]);

  const checkedCount = useMemo(() => {
    return allStageGateways.filter((g) => rtsChecklist[g.key]).length;
  }, [allStageGateways, rtsChecklist]);

  const percentReady = Math.round((checkedCount / (allStageGateways.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Dedicated Sports Medicine & Athletic Performance Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Athlete Assessment, Sport-Specific Biomechanics & Return-to-Sport Engine
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Custom pathways for Indian sports (Cricket, Kabaddi, Badminton, Football, Field Hockey, Wrestling) aligned with BCCI, AKFI, BAI, AIFF, and SAI guidelines. Quantitative physical testing, movement screening, workload monitoring, and criteria-based Return-to-Sport continuum.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>SAI / BCCI / IOC Framework</span>
          </div>
        </div>
      </div>

      {/* Sport Selector Carousel */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Sport-Specific Assessment Pathway:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ALL_SPORT_PATHWAYS.map((sport) => {
            const isSelected = selectedSportId === sport.sportId;
            return (
              <button
                key={sport.sportId}
                onClick={() => {
                  setSelectedSportId(sport.sportId);
                  setRtsChecklist({});
                  setClearedCertificate(false);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-600 text-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold truncate">{sport.sportName.split('(')[0].trim()}</div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{sport.primaryIndianGoverningBody.split('/')[0].trim()}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sport Context Hero Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-semibold text-emerald-800">{currentPathway.primaryIndianGoverningBody}</span>
              <span>·</span>
              <span>{currentPathway.internationalFederation}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{currentPathway.sportName}</h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentPathway.positionalRoles.map((role, idx) => (
              <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Physical Demands & Common Injuries Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              Sport-Specific Physical Demands
            </span>
            <ul className="space-y-1 text-slate-700">
              {currentPathway.keyPhysicalDemands.map((demand, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{demand}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-200 space-y-1.5">
            <span className="font-bold text-rose-950 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Injury Epidemiology & Vulnerabilities
            </span>
            <ul className="space-y-1 text-slate-700">
              {currentPathway.commonInjuryEpidemiology.map((inj, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">•</span>
                  <span>{inj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 pt-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('rts')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rts'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5-Stage Return to Sport Continuum</span>
          </button>
          <button
            onClick={() => setActiveTab('screening')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'screening'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Pre-Participation Screening ({currentPathway.preParticipationScreening.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('biomechanics')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'biomechanics'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Movement & Biomechanics Testing</span>
          </button>
          <button
            onClick={() => setActiveTab('physiological')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'physiological'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Physical Performance Benchmarks</span>
          </button>
          <button
            onClick={() => setActiveTab('workload')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'workload'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Workload & ACWR Surveillance</span>
          </button>
        </div>

        {/* TAB 1: RETURN TO SPORT CONTINUUM */}
        {activeTab === 'rts' && (
          <div className="space-y-5 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Objective Criteria-Based Return to Sport Clearance Gateways</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Eliminates calendar-based discharge. Athletes progress only after achieving objective physiological and functional milestones.
                </p>
              </div>

              {/* Progress Percentage Badge */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-600">Clearance Readiness</div>
                  <div className="text-lg font-bold font-mono text-emerald-700">{percentReady}%</div>
                </div>
                <div className="w-24 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${percentReady}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Continuum Stages Accordion */}
            <div className="space-y-4">
              {currentPathway.returnToSportContinuum.map((stage, sIdx) => (
                <div key={sIdx} className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-sm text-slate-900">
                      {stage.stage}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Risk Control: {stage.riskMitigation}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {stage.objectiveGateways.map((gateway, gIdx) => {
                      const itemKey = `s${sIdx}-g${gIdx}`;
                      const isChecked = !!rtsChecklist[itemKey];
                      return (
                        <div
                          key={gIdx}
                          onClick={() => toggleChecklistItem(itemKey)}
                          className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // Controlled via parent div onClick
                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 mt-0.5 cursor-pointer"
                          />
                          <span className={isChecked ? 'font-medium' : ''}>{gateway}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Clearance Certificate Generator */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {checkedCount} of {allStageGateways.length} Gateways Passed
              </span>

              <button
                type="button"
                onClick={() => setClearedCertificate(true)}
                disabled={percentReady < 80}
                className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                  percentReady >= 80
                    ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Generate Official Return to Sport Clearance</span>
              </button>
            </div>

            {clearedCertificate && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 text-xs text-slate-800">
                <div className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Return to Sport Clearance Certificate (BCCI/SAI Standard)</span>
                </div>
                <p className="leading-relaxed">
                  Athlete has successfully fulfilled {percentReady}% of multi-stage objective gateways for <strong>{currentPathway.sportName}</strong>. Demonstrates physiological readiness, symmetrical neuromuscular reactive control (LSI &gt;= 90%), and normal psychological confidence without apprehension. Cleared for phased competitive practice integration.
                </p>
                <div className="text-[11px] text-slate-500 pt-1 font-mono">
                  Clearance Timestamp: {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })} · Sports Medicine & Physiotherapy Directorate
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRE-PARTICIPATION SCREENING */}
        {activeTab === 'screening' && (
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900">
              Pre-Participation Screening & Musculoskeletal Risk Identification
            </h3>
            <div className="space-y-3">
              {currentPathway.preParticipationScreening.map((screen, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-1.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-sm text-emerald-900">{screen.toolName}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Standard Screen
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{screen.description}</p>
                  <div className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-100 mt-2">
                    <strong>Actionable Cutoff / Criteria:</strong> {screen.cutoffOrCriteria}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MOVEMENT & BIOMECHANICS TESTING */}
        {activeTab === 'biomechanics' && (
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900">
              Movement Screening, Posture & High-Speed Biomechanical Analysis
            </h3>
            <div className="space-y-3">
              {currentPathway.movementAndBiomechanicsBattery.map((test, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-sm text-slate-900">{test.testName}</span>
                    <span className="text-xs font-mono font-semibold text-emerald-700">
                      Target: {test.targetBenchmark}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Protocol:</strong> {test.protocol}
                  </p>
                  <p className="text-xs text-slate-700 italic">
                    <strong>Clinical & Performance Relevance:</strong> {test.relevance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PHYSICAL PERFORMANCE BENCHMARKS */}
        {activeTab === 'physiological' && (
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900">
              Physiological Testing & Elite Indian National Squad Benchmarks
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Performance Test</th>
                    <th className="py-2.5 px-3">Metric</th>
                    <th className="py-2.5 px-3">Elite Men Benchmark</th>
                    <th className="py-2.5 px-3">Elite Women Benchmark</th>
                    <th className="py-2.5 px-3">Equipment Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentPathway.physiologicalTesting.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{item.testName}</td>
                      <td className="py-2.5 px-3 text-slate-600">{item.metric}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800 whitespace-nowrap">{item.eliteBenchmarkMale}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800 whitespace-nowrap">{item.eliteBenchmarkFemale}</td>
                      <td className="py-2.5 px-3 text-slate-500 text-[11px]">{item.equipmentRequired}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: WORKLOAD & SURVEILLANCE */}
        {activeTab === 'workload' && (
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900">
              Workload Progression, ACWR & Injury Surveillance Rules
            </h3>
            <div className="space-y-3">
              {currentPathway.workloadMonitoringRules.map((rule, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-2">
                  <span className="font-bold text-sm text-slate-900">{rule.metric}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded">
                      <strong className="text-emerald-900">Optimal Training Load Zone:</strong>
                      <p className="text-slate-700 mt-0.5 font-mono">{rule.optimalRange}</p>
                    </div>
                    <div className="p-2.5 bg-rose-50/60 border border-rose-200 rounded">
                      <strong className="text-rose-900">Danger / Spike Threshold:</strong>
                      <p className="text-slate-700 mt-0.5 font-mono">{rule.dangerThreshold}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 pt-1">
                    <strong>Clinical Significance:</strong> {rule.clinicalSignificance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
