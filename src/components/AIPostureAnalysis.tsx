import React, { useState } from 'react';
import {
  Camera,
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  FileText,
  Sliders,
  TrendingDown,
  TrendingUp,
  Download,
  Info,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type PostureViewType = 'anterior' | 'posterior' | 'rightLateral' | 'leftLateral';

export interface PostureSegmentDeviation {
  region: 'Cervical & Head' | 'Shoulder & Scapula' | 'Spine & Trunk' | 'Pelvis & Hip' | 'Knee & Lower Limb' | 'Foot & Ankle';
  name: string;
  nameHi: string;
  nameGu: string;
  detected: boolean;
  severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  measuredValue: string;
  normalBenchmark: string;
  biomechanicalMechanism: string;
  correctiveExercise: string;
}

export interface PosturePresetCase {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  patientDescription: string;
  craniovertebralAngle: number; // degrees (normal > 50°)
  shoulderHeightDiffMm: number; // mm (normal < 5mm)
  pelvicTiltDeg: number; // degrees (normal 7-10° anterior)
  genuAngleDeg: number; // degrees (normal 5-7° valgus)
  plumbLineDisplacementCm: number; // cm (normal < 2 cm)
  scapularAsymmetryIndex: number; // % (normal < 5%)
  deviations: PostureSegmentDeviation[];
}

const POSTURE_PRESETS: PosturePresetCase[] = [
  {
    id: 'post-tkr-asymmetry',
    name: 'Post-Op Knee Replacement Asymmetry & Valgus Thrust (Jayaben Patel / Dineshbhai Patel)',
    nameHi: 'टीकेआर पश्चात कायात्मक विषमता एवं पेलविक झुकाव',
    nameGu: 'ટીકેઆર પછીની મુદ્રા વિષમતા અને પેલ્વિક ઝૂકાવ',
    patientDescription: 'Antalgic stance posture with 18mm pelvic obliquity, compensatory lateral spinal curve, and reduced weight bearing on operated side.',
    craniovertebralAngle: 46,
    shoulderHeightDiffMm: 14,
    pelvicTiltDeg: 14,
    genuAngleDeg: 4,
    plumbLineDisplacementCm: 3.8,
    scapularAsymmetryIndex: 12,
    deviations: [
      {
        region: 'Pelvis & Hip',
        name: 'Pelvic Obliquity / Lateral Drop',
        nameHi: 'पेल्विस का पार्श्व झुकाव',
        nameGu: 'પેલ્વિસનું એક તરફ નમવું',
        detected: true,
        severity: 'Moderate',
        measuredValue: '18 mm right lateral depression',
        normalBenchmark: '< 5 mm bilateral symmetry',
        biomechanicalMechanism: 'Habituated avoidance of axial loading through operative knee creates lateral pelvic tilt.',
        correctiveExercise: 'Pelvic leveling drills on wedge cushion and bilateral weight-bearing scale balance training.',
      },
      {
        region: 'Knee & Lower Limb',
        name: 'Knee Flexion Stance Contracture / Extensor Lag',
        nameHi: 'घुटने में स्थायी आंशिक मोड़',
        nameGu: 'ઊભા રહેતી વખતે ઘૂંટણ પૂરું સીધું ન થવું',
        detected: true,
        severity: 'Moderate',
        measuredValue: '8° persistent knee flexion at quiet standing',
        normalBenchmark: '0° full extension in locked stance',
        biomechanicalMechanism: 'Arthrogenic quadriceps inhibition and posterior capsular tightness preventing screw-home lock.',
        correctiveExercise: 'Prone leg hangs with 2kg ankle weight and terminal knee extension with resistance band.',
      },
      {
        region: 'Spine & Trunk',
        name: 'Compensatory Functional Scoliotic List',
        nameHi: 'संतुलन बनाने के लिए रीढ़ का पार्श्व मोड़',
        nameGu: 'શરીરનું વજન સરભર કરવા કરોડરજ્જુનું નમવું',
        detected: true,
        severity: 'Mild',
        measuredValue: '6° trunk list toward uninjured side',
        normalBenchmark: '0° neutral vertical alignment',
        biomechanicalMechanism: 'Shifting trunk center of mass away from painful knee to lessen compressive joint reaction forces.',
        correctiveExercise: 'Lateral trunk active elongation and core stabilization exercises.',
      },
    ],
  },
  {
    id: 'femur-shortening-trendelenburg',
    name: 'Femur Fracture 3-Year Post-Trauma Posture (Dhariben Patel / Romaben Patel)',
    nameHi: 'फीमर फ्रैक्चर 3 वर्ष पश्चात कायात्मक विषमता',
    nameGu: 'ફેમુર ફ્રેક્ચર ૩ વર્ષ પછીની મુદ્રા વિષમતા',
    patientDescription: '1.3 cm limb length discrepancy producing prominent anterior and lateral pelvic tilt, excessive lumbar lordosis, and unlevel shoulders.',
    craniovertebralAngle: 48,
    shoulderHeightDiffMm: 16,
    pelvicTiltDeg: 16,
    genuAngleDeg: 8,
    plumbLineDisplacementCm: 4.5,
    scapularAsymmetryIndex: 15,
    deviations: [
      {
        region: 'Pelvis & Hip',
        name: 'True Limb Shortening Induced Pelvic Tilt',
        nameHi: 'पैर छोटा होने से पेल्विस का झुकाव',
        nameGu: 'પગ ટૂંકો હોવાથી પેલ્વિસ નીચે પડવું',
        detected: true,
        severity: 'Severe',
        measuredValue: '13 mm true leg length discrepancy',
        normalBenchmark: '< 5 mm discrepancy',
        biomechanicalMechanism: 'Diaphyseal femur fracture healed with mild shortening causing ASIS drop on left side.',
        correctiveExercise: 'Full-length custom shoe heel lift (8 mm compensatory raise) + abductor re-education.',
      },
      {
        region: 'Spine & Trunk',
        name: 'Hyperlordosis & Pelvic Anterior Rotation',
        nameHi: 'कमर का अत्यधिक आगे की ओर घुमाव',
        nameGu: 'કમરનો વધુ પડતો આગળનો ખાડો',
        detected: true,
        severity: 'Moderate',
        measuredValue: '16° anterior pelvic tilt angle',
        normalBenchmark: '7° - 10° physiologic anterior tilt',
        biomechanicalMechanism: 'Tight iliopsoas and weak abdominal wall tipping pelvic ring anteriorly.',
        correctiveExercise: 'Posterior pelvic tilts, Thomas test hip flexor stretching, and abdominal hollow-body holds.',
      },
      {
        region: 'Foot & Ankle',
        name: 'Compensatory Calcaneal Pronation',
        nameHi: 'पैर के पंजे का अंदर की ओर गिरना',
        nameGu: 'પંજાનું અંદર તરફ વધુ ઢળવું',
        detected: true,
        severity: 'Mild',
        measuredValue: '8° rearfoot eversion in stance',
        normalBenchmark: '2° - 4° neutral rearfoot',
        biomechanicalMechanism: 'Longer right limb pronates to functionally shorten its effective height.',
        correctiveExercise: 'Short-foot exercise (Janda) and posterior tibialis strengthening.',
      },
    ],
  },
  {
    id: 'cervical-upper-crossed',
    name: 'Upper Crossed & Forward Head Postural Syndrome (Sedentary / Desk Worker)',
    nameHi: 'अपर क्रॉस्ड सिंड्रोम एवं आगे की ओर झुकी गर्दन',
    nameGu: 'અપર ક્રોસ્ડ સિન્ડ્રોમ અને આગળ ઝૂકેલી ડોક',
    patientDescription: 'Prominent forward head posture (craniovertebral angle 36°), thoracic hyperkyphosis, and bilateral rounded shoulder protraction.',
    craniovertebralAngle: 36,
    shoulderHeightDiffMm: 6,
    pelvicTiltDeg: 9,
    genuAngleDeg: 6,
    plumbLineDisplacementCm: 5.2,
    scapularAsymmetryIndex: 18,
    deviations: [
      {
        region: 'Cervical & Head',
        name: 'Severe Forward Head Posture (FHP)',
        nameHi: 'गर्दन का भारी आगे की ओर झुकाव',
        nameGu: 'ડોકનું ખૂબ આગળની તરફ નમેલું હોવું',
        detected: true,
        severity: 'Severe',
        measuredValue: 'CVA 36° (External auditory meatus 4.8 cm anterior to acromion)',
        normalBenchmark: 'CVA >= 50°',
        biomechanicalMechanism: 'Weak deep cervical flexors (longus colli/capitis) and hypertonic suboccipitals and upper trapezius.',
        correctiveExercise: 'Seated axial chin tucks with 10-second hold (3 sets of 10) and suboccipital release.',
      },
      {
        region: 'Shoulder & Scapula',
        name: 'Bilateral Rounded Shoulder Protraction',
        nameHi: 'कंधों का आगे की ओर मुड़ाव',
        nameGu: 'ખભાનું આગળની તરફ ગોળાકાર વળવું',
        detected: true,
        severity: 'Moderate',
        measuredValue: 'Acromion 3.5 cm anterior to coronal plumb line',
        normalBenchmark: '< 1 cm anterior displacement',
        biomechanicalMechanism: 'Contracted pectoralis minor and major with reciprocal inhibition of middle/lower trapezius.',
        correctiveExercise: 'Doorway corner pectoral stretches and prone Blackburn Y-T-W scapular retractions.',
      },
      {
        region: 'Spine & Trunk',
        name: 'Thoracic Hyperkyphosis',
        nameHi: 'ऊपरी पीठ का अत्यधिक कूबड़',
        nameGu: 'પીઠનો વધુ પડતો ખૂંધ/વળાંક',
        detected: true,
        severity: 'Moderate',
        measuredValue: 'Thoracic Kyphosis Angle 48°',
        normalBenchmark: '20° - 40° physiologic kyphosis',
        biomechanicalMechanism: 'Prolonged slumped sitting posture stretching posterior spinal extensor musculature.',
        correctiveExercise: 'Foam roller thoracic extension mobilization and prone cobra holds.',
      },
    ],
  },
  {
    id: 'normal-posture-benchmark',
    name: 'Optimal Anatomical Plumb-Line Alignment Benchmark',
    nameHi: 'सर्वोत्तम शारीरिक साहुल रेखा संरेखण संदर्भ',
    nameGu: 'આદર્શ શારીરિક પ્લમ્બ લાઇન ગોઠવણી સંદર્ભ',
    patientDescription: 'Normal physiological posture with vertical ear-shoulder-trochanter-malleolus plumb line alignment and bilateral symmetry.',
    craniovertebralAngle: 54,
    shoulderHeightDiffMm: 3,
    pelvicTiltDeg: 8,
    genuAngleDeg: 6,
    plumbLineDisplacementCm: 1.1,
    scapularAsymmetryIndex: 3,
    deviations: [],
  },
];

export const AIPostureAnalysis: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<PosturePresetCase>(POSTURE_PRESETS[0]);
  const [activeView, setActiveView] = useState<PostureViewType>('anterior');
  const [showPlumbLine, setShowPlumbLine] = useState<boolean>(true);
  const [showLandmarkGrid, setShowLandmarkGrid] = useState<boolean>(true);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);

  const getCaseName = (c: PosturePresetCase) => {
    if (language === 'hi') return c.nameHi;
    if (language === 'gu') return c.nameGu;
    return c.name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'gu'
                ? 'એઆઈ સ્ટેટિક પોશ્ચર વિશ્લેષણ'
                : language === 'hi'
                ? 'एआई स्थिर काया (पोस्चर) विश्लेषण'
                : 'AI Static Posture & Alignment Analysis'}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {language === 'gu'
              ? '૪ દ્રશ્ય કોણ (આગળ, પાછળ, ડાબી/જમણી બાજુ), પ્લમ્બ લાઇન માપન અને સુધારાત્મક કસરતો'
              : language === 'hi'
              ? '4 दृश्य कोण (अग्र, पश्च, दाएं/बाएं पार्श्व), साहुल रेखा मापन एवं उपचारात्मक व्यायाम'
              : '4-View anatomical alignment (Anterior, Posterior, Right & Left Lateral), plumb line deviation & corrective exercise mapping.'}
          </p>
        </div>

        {/* Case selector */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="text-xs font-semibold text-slate-600">Case:</label>
          <select
            value={selectedCase.id}
            onChange={(e) => {
              const found = POSTURE_PRESETS.find((c) => c.id === e.target.value);
              if (found) setSelectedCase(found);
            }}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer max-w-xs truncate"
          >
            {POSTURE_PRESETS.map((c) => (
              <option key={c.id} value={c.id}>
                {getCaseName(c)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4-View Switcher Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold">
          {[
            { id: 'anterior', label: 'Anterior View', labelHi: 'अग्र दृश्य (आगे से)', labelGu: 'આગળનો દેખાવ' },
            { id: 'posterior', label: 'Posterior View', labelHi: 'पश्च दृश्य (पीछे से)', labelGu: 'પાછળનો દેખાવ' },
            { id: 'rightLateral', label: 'Right Lateral View', labelHi: 'दायां पार्श्व दृश्य', labelGu: 'જમણી બાજુનો દેખાવ' },
            { id: 'leftLateral', label: 'Left Lateral View', labelHi: 'बायां पार्श्व दृश्य', labelGu: 'ડાબી બાજુનો દેખાવ' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id as PostureViewType)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === v.id
                  ? 'bg-indigo-700 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {language === 'gu' ? v.labelGu : language === 'hi' ? v.labelHi : v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              checked={showPlumbLine}
              onChange={(e) => setShowPlumbLine(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>{language === 'gu' ? 'પ્લમ્બ લાઇન' : language === 'hi' ? 'साहुल रेखा (Plumb Line)' : 'Plumb Line'}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              checked={showLandmarkGrid}
              onChange={(e) => setShowLandmarkGrid(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>{language === 'gu' ? 'લેન્ડમાર્ક ગ્રીડ' : language === 'hi' ? 'ग्रिड' : 'Landmark Grid'}</span>
          </label>
        </div>
      </div>

      {/* Main Grid: Visualizer & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Posture Diagram (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[520px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <span className="font-mono text-slate-300 uppercase">
                {activeView.toUpperCase()} VIEW VISUALIZATION
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Sagittal/Coronal Alignment</span>
          </div>

          {/* SVG Vector Posture Simulation */}
          <div className="relative flex-1 flex items-center justify-center py-6">
            <svg viewBox="0 0 320 400" className="w-full max-w-xs h-96">
              {/* Optional Background Grid Lines */}
              {showLandmarkGrid && (
                <g stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4">
                  <line x1="20" y1="50" x2="300" y2="50" />
                  <line x1="20" y1="100" x2="300" y2="100" />
                  <line x1="20" y1="150" x2="300" y2="150" />
                  <line x1="20" y1="200" x2="300" y2="200" />
                  <line x1="20" y1="260" x2="300" y2="260" />
                  <line x1="20" y1="330" x2="300" y2="330" />
                </g>
              )}

              {/* Reference Plumb Line (Gold dashed) */}
              {showPlumbLine && (
                <g>
                  <line x1="160" y1="20" x2="160" y2="370" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" />
                  <circle cx="160" cy="370" r="4" fill="#f59e0b" />
                  <text x="165" y="30" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                    PLUMB LINE
                  </text>
                </g>
              )}

              {/* Patient Posture Skeleton Rendering according to active view */}
              {activeView === 'anterior' || activeView === 'posterior' ? (
                /* Front / Back Coronal View */
                <g>
                  {/* Head & Neck */}
                  <circle cx={160 + (selectedCase.shoulderHeightDiffMm > 10 ? 4 : 0)} cy="55" r="20" fill="#94a3b8" />
                  {/* Cervical Spine */}
                  <line x1="160" y1="75" x2="160" y2="95" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

                  {/* Shoulders (with unlevel asymmetry if present) */}
                  {(() => {
                    const tilt = selectedCase.shoulderHeightDiffMm * 0.8;
                    const leftY = 100 - tilt;
                    const rightY = 100 + tilt;
                    return (
                      <g>
                        <line x1="110" y1={leftY} x2="210" y2={rightY} stroke="#818cf8" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="110" cy={leftY} r="6" fill="#6366f1" />
                        <circle cx="210" cy={rightY} r="6" fill="#6366f1" />
                        {/* Arms hanging */}
                        <line x1="110" y1={leftY} x2="105" y2="200" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        <line x1="210" y1={rightY} x2="215" y2="200" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                      </g>
                    );
                  })()}

                  {/* Thoracic & Lumbar Spine */}
                  <line x1="160" y1="95" x2="160" y2="185" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

                  {/* Pelvic Line (with obliquity if present) */}
                  {(() => {
                    const pelvTilt = selectedCase.pelvicTiltDeg * 0.7;
                    const leftPelvY = 190 - pelvTilt;
                    const rightPelvY = 190 + pelvTilt;
                    return (
                      <g>
                        <line x1="125" y1={leftPelvY} x2="195" y2={rightPelvY} stroke="#2dd4bf" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="125" cy={leftPelvY} r="6" fill="#0d9488" />
                        <circle cx="195" cy={rightPelvY} r="6" fill="#0d9488" />

                        {/* Left Leg */}
                        <line x1="130" y1={leftPelvY} x2="135" y2="270" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                        <circle cx="135" cy="270" r="6" fill="#0284c7" />
                        <line x1="135" y1="270" x2="135" y2="345" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="135" cy="345" r="5" fill="#38bdf8" />
                        <line x1="135" y1="345" x2="120" y2="348" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

                        {/* Right Leg (operative/asymmetric) */}
                        <line x1="190" y1={rightPelvY} x2="185" y2="270" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                        <circle cx="185" cy="270" r="6" fill="#0284c7" />
                        <line x1="185" y1="270" x2="185" y2="345" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="185" cy="345" r="5" fill="#38bdf8" />
                        <line x1="185" y1="345" x2="200" y2="348" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                      </g>
                    );
                  })()}
                </g>
              ) : (
                /* Lateral Sagittal View (Forward Head, Thoracic Kyphosis, Lordosis) */
                <g>
                  {/* Lateral Head with forward translation based on CVA */}
                  {(() => {
                    const fhpOffset = Math.max(0, (50 - selectedCase.craniovertebralAngle) * 1.4);
                    const headX = 160 + fhpOffset;
                    return (
                      <g>
                        <circle cx={headX} cy="55" r="20" fill="#94a3b8" />
                        {/* Tragus / Ear point */}
                        <circle cx={headX} cy="55" r="3" fill="#f43f5e" />
                        <text x={headX + 6} y="58" fill="#f43f5e" fontSize="8" fontFamily="monospace">
                          Ear
                        </text>

                        {/* Cervical curve */}
                        <path
                          d={`M ${headX - 6} 75 Q 162 88, 160 100`}
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />

                        {/* Acromion / Shoulder point */}
                        <circle cx="160" cy="100" r="6" fill="#818cf8" />
                        <text x="168" y="104" fill="#818cf8" fontSize="8" fontFamily="monospace">
                          Acromion
                        </text>

                        {/* Thoracic Kyphosis (posterior curve) & Lumbar Lordosis (anterior curve) */}
                        <path
                          d="M 160 100 Q 148 135, 160 160 Q 170 180, 160 195"
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />

                        {/* Greater Trochanter / Hip point */}
                        <circle cx="160" cy="195" r="6" fill="#2dd4bf" />
                        <text x="168" y="198" fill="#2dd4bf" fontSize="8" fontFamily="monospace">
                          Trochanter
                        </text>

                        {/* Femur */}
                        <line x1="160" y1="195" x2="160" y2="270" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                        {/* Knee Joint Line */}
                        <circle cx="160" cy="270" r="6" fill="#0284c7" />
                        <text x="168" y="274" fill="#0284c7" fontSize="8" fontFamily="monospace">
                          Knee
                        </text>

                        {/* Tibia */}
                        <line x1="160" y1="270" x2="160" y2="345" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                        {/* Lateral Malleolus */}
                        <circle cx="160" cy="345" r="5" fill="#34d399" />
                        <text x="168" y="348" fill="#34d399" fontSize="8" fontFamily="monospace">
                          Malleolus
                        </text>

                        {/* Foot profile */}
                        <line x1="145" y1="350" x2="185" y2="350" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Sagittal Plumb Displacement: <strong className="text-white">{selectedCase.plumbLineDisplacementCm} cm</strong></span>
            <span>CVA: <strong className="text-white">{selectedCase.craniovertebralAngle}°</strong></span>
          </div>
        </div>

        {/* Right Quantitative Posture Deviation Analysis (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Key Metrics Dashboard */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {language === 'gu' ? 'મુદ્રાના મુખ્ય પરિમાણો' : language === 'hi' ? 'काया के मुख्य मापन' : 'Quantitative Posture Metrics'}
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Craniovertebral Angle (CVA)</span>
                <div className="text-xl font-bold text-slate-900">{selectedCase.craniovertebralAngle}°</div>
                <div className="text-[11px] text-indigo-700">Norm: &gt;50° (FHP if &lt;48°)</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Shoulder Height Discrepancy</span>
                <div className="text-xl font-bold text-slate-900">{selectedCase.shoulderHeightDiffMm} mm</div>
                <div className="text-[11px] text-indigo-700">Norm: &lt;5 mm bilateral diff</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Pelvic Tilt / Obliquity</span>
                <div className="text-xl font-bold text-slate-900">{selectedCase.pelvicTiltDeg}°</div>
                <div className="text-[11px] text-indigo-700">Norm: 7° - 10° anterior</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Coronal Plumb Deviation</span>
                <div className="text-xl font-bold text-slate-900">{selectedCase.plumbLineDisplacementCm} cm</div>
                <div className="text-[11px] text-indigo-700">Norm: &lt;1.5 cm deviation</div>
              </div>
            </div>
          </div>

          {/* Detected Deviations & Corrective Prescriptions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
              <span>{language === 'gu' ? 'શોધાયેલ મુદ્રા વિચલનો અને કસરતો' : language === 'hi' ? 'पहचाने गए काया विचलन एवं सुधारात्मक व्यायाम' : 'Segmental Deviations & Corrective Prescriptions'}</span>
              <span className="text-xs font-normal text-slate-500">{selectedCase.deviations.length} detected</span>
            </h3>

            {selectedCase.deviations.length === 0 ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center text-xs space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="font-bold">Postural Alignment Within Ideal Physiological Limits</span>
                <p className="text-[11px] text-emerald-700">No pathological cranial, pelvic or lower limb deviations detected.</p>
              </div>
            ) : (
              selectedCase.deviations.map((dev, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {language === 'gu' ? dev.nameGu : language === 'hi' ? dev.nameHi : dev.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        dev.severity === 'Severe'
                          ? 'bg-red-100 text-red-800'
                          : dev.severity === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {dev.severity}
                    </span>
                  </div>

                  <div className="text-slate-500 leading-relaxed">
                    Measured: <strong className="text-slate-700">{dev.measuredValue}</strong> (Norm: {dev.normalBenchmark})
                  </div>

                  <div className="text-slate-600 leading-relaxed">
                    Mechanism: {dev.biomechanicalMechanism}
                  </div>

                  <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 text-indigo-900">
                    <strong className="block text-[11px] font-semibold text-indigo-950 mb-0.5">Corrective Physical Therapy:</strong>
                    {dev.correctiveExercise}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Limitation Disclaimer */}
      <div className="p-4 bg-slate-100/90 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-500">
        <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          Static 2D photographic posture screening provides observational estimates of anatomical landmark coordinates and sagittal/coronal plumb deviations. It does not replace full-spine standing EOS radiographic imaging or biplanar Cobb angle measurement for structural scoliosis or fixed osseous deformities.
        </p>
      </div>
    </div>
  );
};
