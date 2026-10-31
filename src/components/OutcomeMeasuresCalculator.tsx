import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  TrendingUp,
  Activity,
  Layers,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface OutcomeMeasureDef {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  category: 'Musculoskeletal' | 'Functional Mobility & Balance' | 'Sports & Return to Activity';
  acronym: string;
  mcid: string;
  maxScore: number;
  scoringRule: 'Higher is better' | 'Lower is better' | 'Percentage';
  clinicalDescription: string;
  targetClinicalBenchmark: string;
  questions: {
    prompt: string;
    options: { text: string; points: number }[];
  }[];
}

const OUTCOME_MEASURES: OutcomeMeasureDef[] = [
  {
    id: 'nprs-pain',
    name: 'Numeric Pain Rating Scale (NPRS 0-10)',
    nameHi: 'संख्यात्मक दर्द रेटिंग पैमाना (NPRS)',
    nameGu: 'સંખ્યાત્મક દુખાવો રેટિંગ સ્કેલ (NPRS)',
    category: 'Musculoskeletal',
    acronym: 'NPRS',
    mcid: '2.0 points (or 30% reduction)',
    maxScore: 10,
    scoringRule: 'Lower is better',
    clinicalDescription: 'Standardized 11-point unidimensional pain intensity measure evaluating current, worst, and best pain over past 24 hours.',
    targetClinicalBenchmark: '<= 2/10 (Mild / functionally acceptable pain)',
    questions: [
      {
        prompt: 'Current pain intensity right now during quiet rest or examination:',
        options: [
          { text: '0 - No pain at all', points: 0 },
          { text: '2 - Mild aching, easily tolerated', points: 2 },
          { text: '4 - Moderate pain, interferes with tasks', points: 4 },
          { text: '6 - Moderately severe pain, distracting', points: 6 },
          { text: '8 - Severe intense pain, disabling', points: 8 },
          { text: '10 - Worst possible unimaginable pain', points: 10 },
        ],
      },
      {
        prompt: 'Worst pain experienced during weight-bearing or joint movement in the last 24 hours:',
        options: [
          { text: '0 - No pain', points: 0 },
          { text: '3 - Mild discomfort on end-range movement', points: 3 },
          { text: '5 - Noticeable sharp pain on stairs / squat', points: 5 },
          { text: '7 - Severe pain forcing cessation of walking', points: 7 },
          { text: '9 - Excruciating pain requiring bed rest', points: 9 },
        ],
      },
    ],
  },
  {
    id: 'lefs-lower-limb',
    name: 'Lower Extremity Functional Scale (LEFS)',
    nameHi: 'निचले अंग की कार्यक्षमता पैमाना (LEFS)',
    nameGu: 'નીચલા અંગની કાર્યક્ષમતા સ્કેલ (LEFS)',
    category: 'Musculoskeletal',
    acronym: 'LEFS',
    mcid: '9.0 points',
    maxScore: 80,
    scoringRule: 'Higher is better',
    clinicalDescription: '20-item patient-reported outcome assessing musculoskeletal disability of the hip, knee, ankle, or foot in everyday activities.',
    targetClinicalBenchmark: '>= 65/80 (Minimal to no lower limb disability)',
    questions: [
      {
        prompt: '1. Any difficulty putting on shoes or socks?',
        options: [
          { text: '4 - Extreme difficulty or unable', points: 0 },
          { text: '3 - Quite a bit of difficulty', points: 1 },
          { text: '2 - Moderate difficulty', points: 2 },
          { text: '1 - A little bit of difficulty', points: 3 },
          { text: '0 - No difficulty at all', points: 4 },
        ],
      },
      {
        prompt: '2. Any difficulty getting in or out of a chair / sofa?',
        options: [
          { text: 'Unable or extreme difficulty', points: 0 },
          { text: 'Quite a bit of difficulty', points: 1 },
          { text: 'Moderate difficulty', points: 2 },
          { text: 'A little bit of difficulty', points: 3 },
          { text: 'No difficulty at all', points: 4 },
        ],
      },
      {
        prompt: '3. Any difficulty walking 1 kilometer (15 minutes)?',
        options: [
          { text: 'Unable or extreme difficulty', points: 0 },
          { text: 'Quite a bit of difficulty', points: 1 },
          { text: 'Moderate difficulty', points: 2 },
          { text: 'A little bit of difficulty', points: 3 },
          { text: 'No difficulty at all', points: 4 },
        ],
      },
      {
        prompt: '4. Any difficulty going up or down a flight of 10-15 stairs?',
        options: [
          { text: 'Unable or extreme difficulty', points: 0 },
          { text: 'Quite a bit of difficulty', points: 1 },
          { text: 'Moderate difficulty', points: 2 },
          { text: 'A little bit of difficulty', points: 3 },
          { text: 'No difficulty at all', points: 4 },
        ],
      },
      {
        prompt: '5. Any difficulty performing full squats or deep knee bending?',
        options: [
          { text: 'Unable or extreme difficulty', points: 0 },
          { text: 'Quite a bit of difficulty', points: 1 },
          { text: 'Moderate difficulty', points: 2 },
          { text: 'A little bit of difficulty', points: 3 },
          { text: 'No difficulty at all', points: 4 },
        ],
      },
    ],
  },
  {
    id: 'quickdash-upper-limb',
    name: 'QuickDASH (Disabilities of Arm, Shoulder & Hand)',
    nameHi: 'क्विकडैश - हाथ, कंधे एवं कोहनी कार्यक्षमता',
    nameGu: 'ક્વિકડેશ - હાથ, ખભા અને કોણી કાર્યક્ષમતા',
    category: 'Musculoskeletal',
    acronym: 'QuickDASH',
    mcid: '15.9 points',
    maxScore: 100,
    scoringRule: 'Lower is better',
    clinicalDescription: '11-item validated self-report tool quantifying upper limb musculoskeletal symptoms and physical functional limitation.',
    targetClinicalBenchmark: '<= 18/100 (Minimal functional upper extremity disability)',
    questions: [
      {
        prompt: '1. Open a tight or new jar:',
        options: [
          { text: '1 - No difficulty', points: 1 },
          { text: '2 - Mild difficulty', points: 2 },
          { text: '3 - Moderate difficulty', points: 3 },
          { text: '4 - Severe difficulty', points: 4 },
          { text: '5 - Unable to do', points: 5 },
        ],
      },
      {
        prompt: '2. Do heavy household chores (e.g. washing walls, floor scrubbing):',
        options: [
          { text: '1 - No difficulty', points: 1 },
          { text: '2 - Mild difficulty', points: 2 },
          { text: '3 - Moderate difficulty', points: 3 },
          { text: '4 - Severe difficulty', points: 4 },
          { text: '5 - Unable to do', points: 5 },
        ],
      },
      {
        prompt: '3. Carry a heavy shopping bag or briefcase (> 5 kg):',
        options: [
          { text: '1 - No difficulty', points: 1 },
          { text: '2 - Mild difficulty', points: 2 },
          { text: '3 - Moderate difficulty', points: 3 },
          { text: '4 - Severe difficulty', points: 4 },
          { text: '5 - Unable to do', points: 5 },
        ],
      },
      {
        prompt: '4. Wash or blow-dry your hair:',
        options: [
          { text: '1 - No difficulty', points: 1 },
          { text: '2 - Mild difficulty', points: 2 },
          { text: '3 - Moderate difficulty', points: 3 },
          { text: '4 - Severe difficulty', points: 4 },
          { text: '5 - Unable to do', points: 5 },
        ],
      },
    ],
  },
  {
    id: 'berg-balance',
    name: 'Berg Balance Scale (BBS)',
    nameHi: 'बर्ग बैलेंस स्केल - संतुलन एवं गिरने का जोखिम',
    nameGu: 'બર્ગ બેલેન્સ સ્કેલ - સંતુલન અને પડવાનું જોખમ',
    category: 'Functional Mobility & Balance',
    acronym: 'BBS',
    mcid: '4 to 6 points',
    maxScore: 56,
    scoringRule: 'Higher is better',
    clinicalDescription: 'Gold standard 14-item functional balance assessment battery measuring static and dynamic balance and predicting fall risk.',
    targetClinicalBenchmark: '>= 45/56 (Low fall risk; safe independent community ambulator)',
    questions: [
      {
        prompt: '1. Sitting to standing transfer (rising from armless chair):',
        options: [
          { text: '0 - Needs moderate or maximal assist to stand', points: 0 },
          { text: '1 - Needs minimal aid to stand', points: 1 },
          { text: '2 - Able to stand using hands after several tries', points: 2 },
          { text: '3 - Able to stand independently using hands', points: 3 },
          { text: '4 - Able to stand without using hands and stabilize', points: 4 },
        ],
      },
      {
        prompt: '2. Standing unsupported for 2 minutes without holding:',
        options: [
          { text: '0 - Unable to stand 30 seconds unassisted', points: 0 },
          { text: '1 - Needs several tries to stand 30 seconds', points: 1 },
          { text: '2 - Able to stand 30 seconds unsupported', points: 2 },
          { text: '3 - Able to stand 2 minutes with supervision', points: 3 },
          { text: '4 - Able to stand safely for 2 minutes', points: 4 },
        ],
      },
      {
        prompt: '3. Standing with eyes closed for 10 seconds:',
        options: [
          { text: '0 - Needs help to keep from falling', points: 0 },
          { text: '1 - Unable to keep eyes closed 3 seconds', points: 1 },
          { text: '2 - Able to stand 3 seconds', points: 2 },
          { text: '3 - Able to stand 10 seconds with supervision', points: 3 },
          { text: '4 - Able to stand 10 seconds safely', points: 4 },
        ],
      },
      {
        prompt: '4. Standing on one leg (Single-leg stance):',
        options: [
          { text: '0 - Unable to try or needs assist to prevent fall', points: 0 },
          { text: '1 - Tries to lift leg, unable to hold 3 seconds', points: 1 },
          { text: '2 - Able to lift leg independently and hold >= 3 seconds', points: 2 },
          { text: '3 - Able to lift leg independently and hold 5-9 seconds', points: 3 },
          { text: '4 - Able to lift leg independently and hold > 10 seconds', points: 4 },
        ],
      },
    ],
  },
  {
    id: 'tug-mobility',
    name: 'Timed Up and Go (TUG)',
    nameHi: 'टाइम्ड अप एंड गो (TUG) चाल परीक्षण',
    nameGu: 'ટાઇમ્ડ અપ એન્ડ ગો (TUG) ગતિશીલતા કસોટી',
    category: 'Functional Mobility & Balance',
    acronym: 'TUG',
    mcid: '2.5 to 3.4 seconds',
    maxScore: 30,
    scoringRule: 'Lower is better',
    clinicalDescription: 'Measures the time in seconds taken to rise from a standard chair, walk 3 meters, turn, walk back, and sit down.',
    targetClinicalBenchmark: '< 10 seconds (Normal independent mobility; >13.5s indicates fall risk)',
    questions: [
      {
        prompt: 'Observed patient TUG completion time:',
        options: [
          { text: '< 10 seconds (Normal healthy speed)', points: 8 },
          { text: '10 - 13.5 seconds (Good mobility, independent, no fall risk)', points: 12 },
          { text: '13.6 - 20 seconds (Impaired mobility, mild fall risk identified)', points: 16 },
          { text: '> 20 seconds (High fall risk, requires assistive gait aid)', points: 25 },
        ],
      },
    ],
  },
  {
    id: 'acl-rsi-sports',
    name: 'ACL Return to Sport after Injury (ACL-RSI)',
    nameHi: 'एसीएल खेल वापसी मनोवैज्ञानिक तत्परता पैमाना',
    nameGu: 'એસીએલ રમતગમતમાં વાપસી મનોવૈજ્ઞાનિક સ્કેલ',
    category: 'Sports & Return to Activity',
    acronym: 'ACL-RSI',
    mcid: '10.0 points',
    maxScore: 100,
    scoringRule: 'Higher is better',
    clinicalDescription: '12-item scale measuring psychological readiness, confidence, and kinesiophobia regarding return to pre-injury sports.',
    targetClinicalBenchmark: '>= 65/100 (Sufficient psychological readiness for full sports clearance)',
    questions: [
      {
        prompt: '1. Are you confident that your knee will not give way during sudden directional cuts?',
        options: [
          { text: '0 - Not at all confident', points: 0 },
          { text: '25 - Slightly confident', points: 25 },
          { text: '50 - Moderately confident', points: 50 },
          { text: '75 - Very confident', points: 75 },
          { text: '100 - Fully confident', points: 100 },
        ],
      },
      {
        prompt: '2. Do you think you can play your sport without thinking about your knee?',
        options: [
          { text: '0 - Constantly fearful and guarded', points: 0 },
          { text: '25 - Thinking about it most of the time', points: 25 },
          { text: '50 - Thinking about it occasionally', points: 50 },
          { text: '75 - Rarely thinking about it', points: 75 },
          { text: '100 - Completely uninhibited', points: 100 },
        ],
      },
    ],
  },
];

export const OutcomeMeasuresCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [selectedToolId, setSelectedToolId] = useState<string>(OUTCOME_MEASURES[0].id);
  const [answers, setAnswers] = useState<{ [questionIdx: number]: number }>({});
  const [copied, setCopied] = useState<boolean>(false);

  const currentTool = OUTCOME_MEASURES.find((t) => t.id === selectedToolId) || OUTCOME_MEASURES[0];

  // Calculate score
  const answeredCount = Object.keys(answers).length;
  const rawSum = Object.values(answers).reduce((acc, val) => acc + val, 0);

  let finalScore = rawSum;
  let scoreDisplay = `${finalScore} / ${currentTool.maxScore}`;

  // If QuickDASH, compute standard 100 formula: ((sum/n) - 1) * 25
  if (currentTool.id === 'quickdash-upper-limb' && answeredCount > 0) {
    const avg = rawSum / answeredCount;
    finalScore = Math.round(((avg - 1) * 25) * 10) / 10;
    scoreDisplay = `${finalScore} / 100%`;
  }

  // If ACL-RSI, compute average percentage
  if (currentTool.id === 'acl-rsi-sports' && answeredCount > 0) {
    finalScore = Math.round(rawSum / answeredCount);
    scoreDisplay = `${finalScore} / 100%`;
  }

  const handleSelectOption = (qIdx: number, points: number) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: points }));
  };

  const resetTool = () => {
    setAnswers({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'gu'
                ? 'ક્લિનિકલ પરિણામ માપન કેલ્ક્યુલેટર'
                : language === 'hi'
                ? 'क्लिनिकल परिणाम मापन (आउटकम मेजर्स) कैलकुलेटर'
                : 'Clinical Outcome Measures & Functional Calculators'}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {language === 'gu'
              ? 'માન્ય એમએસકે, ન્યુરોલોજીકલ અને સ્પોર્ટ્સ સ્કોરિંગ, એમસીઆઇડી બેન્ચમાર્ક્સ અને ક્લિનિકલ અર્થઘટન'
              : language === 'hi'
              ? 'मान्य एमएसके, न्यूरोलॉजिकल एवं खेल स्कोरिंग, एमसीआईडी संदर्भ एवं क्लिनिकल व्याख्या'
              : 'Validated MSK, neurological, balance & sports questionnaires with MCID thresholds.'}
          </p>
        </div>

        {/* Tool selector */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedToolId}
            onChange={(e) => {
              setSelectedToolId(e.target.value);
              setAnswers({});
            }}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {OUTCOME_MEASURES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.acronym} — {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Questionnaire & Live Score Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Questionnaire (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {currentTool.category}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{currentTool.name}</h2>
            </div>

            <button
              onClick={resetTool}
              className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Reset Answers
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">{currentTool.clinicalDescription}</p>

          {/* Question List */}
          <div className="space-y-6 pt-2">
            {currentTool.questions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-2.5">
                <span className="text-xs font-bold text-slate-900 block">{q.prompt}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[qIdx] === opt.points;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIdx, opt.points)}
                        className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-teal-50 border-teal-500 text-teal-950 font-semibold shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Live Score & Clinical Interpretation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Big Score Card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>CALCULATED SCORE</span>
              <span className="font-mono text-teal-400">{currentTool.acronym}</span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-teal-300 font-mono tracking-tight">
                {scoreDisplay}
              </div>
              <div className="text-xs text-slate-400">
                {answeredCount} of {currentTool.questions.length} items completed
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Minimal Clinically Important Difference (MCID):</span>
                <span className="font-bold text-amber-300">{currentTool.mcid}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Clinical Benchmark:</span>
                <span className="font-bold text-emerald-300">{currentTool.targetClinicalBenchmark}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`OUTCOME MEASURE RESULT
Tool: ${currentTool.name} (${currentTool.acronym})
Score: ${scoreDisplay}
MCID: ${currentTool.mcid}
Target Benchmark: ${currentTool.targetClinicalBenchmark}
Date: ${new Date().toLocaleDateString()}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Score to Patient Record'}</span>
            </button>
          </div>

          {/* Evidence Guidance Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Evidence-Based Interpretation Guideline</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Tracking outcome measures at initial baseline, Week 3, and Week 6 enables objective documentation of therapeutic efficacy. A change equal to or exceeding the MCID confirms genuine physiological improvement rather than measurement error or diurnal fluctuation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
