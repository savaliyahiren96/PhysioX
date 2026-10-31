import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Upload,
  AlertCircle,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingUp,
  FileText,
  Eye,
  Camera,
  Layers,
  Info,
  ShieldAlert,
  ArrowRight,
  Download,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface GaitPhaseDetail {
  number: number;
  name: string;
  nameHi: string;
  nameGu: string;
  subdivision: 'Stance Phase (60%)' | 'Swing Phase (40%)';
  percentageOfCycle: string;
  criticalEvents: string;
  normalJointAngles: {
    hip: string;
    knee: string;
    ankle: string;
  };
  patientJointAngles: {
    hip: number;
    knee: number;
    ankle: number;
  };
  clinicalSignificance: string;
}

export interface GaitDeviation {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  detected: boolean;
  severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  observedInPhase: string;
  biomechanicalMechanism: string;
  clinicalImplication: string;
  rehabilitationPriority: string;
}

export interface SpatioTemporalMetrics {
  cadence: number; // steps/min (normal: 100-120)
  stepLengthLeft: number; // cm (normal: 60-75)
  stepLengthRight: number; // cm (normal: 60-75)
  strideLength: number; // cm (normal: 120-150)
  walkingSpeed: number; // m/s (normal: 1.2 - 1.4)
  stepWidth: number; // cm (normal: 7-10)
  stanceTimePercentLeft: number; // % (normal: ~60%)
  stanceTimePercentRight: number; // % (normal: ~60%)
  swingTimePercentLeft: number; // % (normal: ~40%)
  swingTimePercentRight: number; // % (normal: ~40%)
  symmetryIndex: number; // % (normal: > 92%)
  singleSupportPercent: number; // %
  doubleSupportPercent: number; // %
}

interface SamplePreset {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  description: string;
  metrics: SpatioTemporalMetrics;
  deviations: GaitDeviation[];
  phaseAngles: { [phaseNumber: number]: { hip: number; knee: number; ankle: number } };
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'post-tkr-antalgic',
    name: 'Post-Op TKR Antalgic & Stiff Knee Gait (Jayaben Patel / Dineshbhai Patel)',
    nameHi: 'टीकेआर पश्चात दर्दयुक्त एवं जकड़न चाल (जयबेन पटेल)',
    nameGu: 'ટીકેઆર પછીની લંગડાતી અને જકડાયેલી ચાલ (જયાબેન પટેલ)',
    description: 'Reduced swing phase knee flexion (stiff knee gait), shortened right stance duration, asymmetric step length, and compensatory trunk lean.',
    metrics: {
      cadence: 88,
      stepLengthLeft: 58,
      stepLengthRight: 42,
      strideLength: 100,
      walkingSpeed: 0.74,
      stepWidth: 12.5,
      stanceTimePercentLeft: 68,
      stanceTimePercentRight: 52,
      swingTimePercentLeft: 32,
      swingTimePercentRight: 48,
      symmetryIndex: 68,
      singleSupportPercent: 32,
      doubleSupportPercent: 36,
    },
    deviations: [
      {
        id: 'stiff-knee',
        name: 'Stiff Knee Swing Clearance Deficit',
        nameHi: 'घुटने की जकड़न से स्विंग में कमी',
        nameGu: 'ઘૂંટણની જકડનથી સ્વિંગ ક્લિયરન્સમાં ખામી',
        detected: true,
        severity: 'Moderate',
        observedInPhase: 'Initial Swing to Midswing',
        biomechanicalMechanism: 'Quadriceps cocontraction and extensor lag limiting swing knee flexion to only 38° (normal 60°).',
        clinicalImplication: 'Increased trip risk, circumduction or hip hiking compensation to clear toe.',
        rehabilitationPriority: 'VMO reactivation, patellar mobilizations, and seated/standing active knee flexion drills.',
      },
      {
        id: 'antalgic-short-stance',
        name: 'Antalgic Offloading of Operative Knee',
        nameHi: 'दर्द के कारण प्रभावित पैर पर कम वजन देना',
        nameGu: 'દુખાવાને કારણે અસરગ્રસ્ત પગ પર ઓછો ભાર મુકવો',
        detected: true,
        severity: 'Moderate',
        observedInPhase: 'Loading Response & Midstance',
        biomechanicalMechanism: 'Early heel-off and rapid transfer of weight to contralateral unaffected limb.',
        clinicalImplication: 'Overloading of contralateral knee joint and accelerated degenerative wear.',
        rehabilitationPriority: 'Auditory metronome cadence pacing and bilateral weight-scale biofeedback.',
      },
      {
        id: 'lateral-trunk-lean',
        name: 'Compensatory Lateral Trunk Sway',
        nameHi: 'चलते समय धड़ का एक तरफ झुकना',
        nameGu: 'ચાલતી વખતે ધડનું બાજુ તરફ નમવું',
        detected: true,
        severity: 'Mild',
        observedInPhase: 'Midstance',
        biomechanicalMechanism: 'Shifting center of mass over operative knee to reduce external adduction moment.',
        clinicalImplication: 'Secondary lower lumbar and sacroiliac fatigue pain.',
        rehabilitationPriority: 'Hip abductor progressive resistance strengthening and core postural re-education.',
      },
    ],
    phaseAngles: {
      1: { hip: 24, knee: 12, ankle: 2 },
      2: { hip: 18, knee: 14, ankle: -4 },
      3: { hip: -2, knee: 10, ankle: 4 },
      4: { hip: -10, knee: 12, ankle: 6 },
      5: { hip: -4, knee: 24, ankle: -12 },
      6: { hip: 12, knee: 38, ankle: -6 },
      7: { hip: 22, knee: 42, ankle: 0 },
      8: { hip: 26, knee: 16, ankle: 2 },
    },
  },
  {
    id: 'femur-trendelenburg',
    name: 'Femur Fracture Post-Nailing Trendelenburg Gait (Dhariben Patel / Romaben Patel)',
    nameHi: 'फीमर फ्रैक्चर ट्रेंडेलेनबर्ग चाल (ધારીબેન પટેલ)',
    nameGu: 'ફેમુર ફ્રેક્ચર પછીની ટ્રેન્ડેલેનબર્ગ ચાલ (ધારીબેન પટેલ)',
    description: 'Marked contralateral pelvic drop in single-leg stance, ipsilateral Duchenne trunk lurch, and prolonged swing phase.',
    metrics: {
      cadence: 92,
      stepLengthLeft: 46,
      stepLengthRight: 59,
      strideLength: 105,
      walkingSpeed: 0.81,
      stepWidth: 14.0,
      stanceTimePercentLeft: 54,
      stanceTimePercentRight: 66,
      swingTimePercentLeft: 46,
      swingTimePercentRight: 34,
      symmetryIndex: 72,
      singleSupportPercent: 34,
      doubleSupportPercent: 32,
    },
    deviations: [
      {
        id: 'trendelenburg-drop',
        name: 'Trendelenburg Pelvic Drop (Abductor Insufficiency)',
        nameHi: 'कूल्हे की कमजोरी से पेल्विस का झुकना',
        nameGu: 'હિપ એબ્ડક્ટર નબળાઈથી પેલ્વિસ નીચે પડવું',
        detected: true,
        severity: 'Severe',
        observedInPhase: 'Loading Response & Midstance',
        biomechanicalMechanism: 'Gluteus medius/minimus Grade 3/5 unable to maintain horizontal pelvic tilt in single support.',
        clinicalImplication: '1.3 cm limb length discrepancy combined with abductor lever-arm dysfunction.',
        rehabilitationPriority: 'Side-lying clamshells, standing hip abductor resistance bands, and pelvic drop biofeedback.',
      },
      {
        id: 'duchenne-lurch',
        name: 'Compensated Duchenne Lateral Trunk Lurch',
        nameHi: 'कमजोरी छुपाने के लिए धड़ का भारी झुकाव',
        nameGu: 'દુખાવો-નબળાઈ સરભર કરવા ધડનું ઝૂકવું',
        detected: true,
        severity: 'Moderate',
        observedInPhase: 'Midstance to Terminal Stance',
        biomechanicalMechanism: 'Trunk lean toward the stance limb reduces demand on the weak gluteus medius muscle.',
        clinicalImplication: 'Lumbar facet compression and asymmetric spinal disc loading.',
        rehabilitationPriority: 'Mirror gait retraining and shoe heel lift correction for limb discrepancy.',
      },
    ],
    phaseAngles: {
      1: { hip: 28, knee: 6, ankle: 1 },
      2: { hip: 20, knee: 18, ankle: -5 },
      3: { hip: 0, knee: 8, ankle: 6 },
      4: { hip: -8, knee: 8, ankle: 8 },
      5: { hip: -2, knee: 26, ankle: -14 },
      6: { hip: 16, knee: 52, ankle: -4 },
      7: { hip: 26, knee: 56, ankle: 2 },
      8: { hip: 30, knee: 10, ankle: 2 },
    },
  },
  {
    id: 'tibial-fracture-limp',
    name: 'Tibial Shaft Fracture Post-Union Antalgic Calf Gait (Pratikbhai Patel / Vijaybhai Patel)',
    nameHi: 'टिबिया फ्रैक्चर पिण्डली कमजोरी चाल (પ્રતિકભાઈ પટેલ)',
    nameGu: 'ટિબિયા ફ્રેક્ચર પછી પિંડીની નબળાઈવાળી ચાલ (પ્રતિકભાઈ પટેલ)',
    description: 'Reduced push-off at terminal stance due to gastrocnemius/soleus weakness and restricted ankle dorsiflexion.',
    metrics: {
      cadence: 96,
      stepLengthLeft: 64,
      stepLengthRight: 49,
      strideLength: 113,
      walkingSpeed: 0.90,
      stepWidth: 10.2,
      stanceTimePercentLeft: 63,
      stanceTimePercentRight: 57,
      swingTimePercentLeft: 37,
      swingTimePercentRight: 43,
      symmetryIndex: 79,
      singleSupportPercent: 37,
      doubleSupportPercent: 26,
    },
    deviations: [
      {
        id: 'reduced-push-off',
        name: 'Absent/Deficient Terminal Stance Push-Off',
        nameHi: 'अंतिम स्टांस में पुश-ऑफ की कमी',
        nameGu: 'છેલ્લા સ્ટેન્સમાં પંજાથી પુશ-ઓફનો અભાવ',
        detected: true,
        severity: 'Moderate',
        observedInPhase: 'Terminal Stance & Pre-swing',
        biomechanicalMechanism: 'Triceps surae Grade 3+/5 and restricted talocrural posterior glide limiting terminal ankle rocker.',
        clinicalImplication: 'Loss of forward propulsion energy; hip flexors forced to pull limb forward in swing.',
        rehabilitationPriority: 'Eccentric gastrocnemius-soleus heel drops and talocrural AP glide mobilization.',
      },
    ],
    phaseAngles: {
      1: { hip: 25, knee: 4, ankle: -2 },
      2: { hip: 19, knee: 16, ankle: -4 },
      3: { hip: -1, knee: 6, ankle: 3 },
      4: { hip: -12, knee: 4, ankle: 5 },
      5: { hip: -3, knee: 30, ankle: -8 },
      6: { hip: 15, knee: 56, ankle: -2 },
      7: { hip: 24, knee: 58, ankle: 0 },
      8: { hip: 28, knee: 8, ankle: 0 },
    },
  },
  {
    id: 'normal-reference',
    name: 'Symmetric Healthy Adult Gait Benchmark (Normative ICMR / Perry Data)',
    nameHi: 'सामान्य स्वस्थ वयस्क चाल संदर्भ',
    nameGu: 'સામાન્ય તંદુરસ્ત પુખ્ત ચાલ સંદર્ભ',
    description: 'Normal physiological gait cycle with smooth 8-phase transitions, 112 steps/min cadence, and > 95% bilateral symmetry.',
    metrics: {
      cadence: 112,
      stepLengthLeft: 68,
      stepLengthRight: 68,
      strideLength: 136,
      walkingSpeed: 1.28,
      stepWidth: 8.5,
      stanceTimePercentLeft: 60,
      stanceTimePercentRight: 60,
      swingTimePercentLeft: 40,
      swingTimePercentRight: 40,
      symmetryIndex: 96,
      singleSupportPercent: 40,
      doubleSupportPercent: 20,
    },
    deviations: [],
    phaseAngles: {
      1: { hip: 30, knee: 2, ankle: 0 },
      2: { hip: 25, knee: 18, ankle: -5 },
      3: { hip: 0, knee: 5, ankle: 5 },
      4: { hip: -15, knee: 2, ankle: 10 },
      5: { hip: -5, knee: 35, ankle: -20 },
      6: { hip: 15, knee: 60, ankle: -5 },
      7: { hip: 25, knee: 30, ankle: 0 },
      8: { hip: 30, knee: 2, ankle: 0 },
    },
  },
];

const GAIT_PHASES: GaitPhaseDetail[] = [
  {
    number: 1,
    name: 'Initial Contact (Heel Strike)',
    nameHi: 'प्रारंभिक संपर्क (एड़ी का स्पर्श)',
    nameGu: 'પ્રારંભિક સંપર્ક (એડી જમીન પર ટેકવવી)',
    subdivision: 'Stance Phase (60%)',
    percentageOfCycle: '0% - 2%',
    criticalEvents: 'Heel contacts ground; ankle dorsiflexors decelerate foot; knee extends with quadriceps co-contraction.',
    normalJointAngles: { hip: '25° - 30° flexion', knee: '0° - 5° flexion', ankle: '0° neutral' },
    patientJointAngles: { hip: 24, knee: 12, ankle: 2 },
    clinicalSignificance: 'Initiates forward progression and shock absorption. Lack of heel strike indicates equinus deformity or triceps contracture.',
  },
  {
    number: 2,
    name: 'Loading Response (Foot Flat)',
    nameHi: 'लोडिंग रिस्पॉन्स (पंजा सपाट पड़ना)',
    nameGu: 'લોડિંગ રિસ્પોન્સ (પૂરો પંજો સપાટ થવો)',
    subdivision: 'Stance Phase (60%)',
    percentageOfCycle: '2% - 12%',
    criticalEvents: 'Shock absorption via controlled knee flexion to 15°-20° and eccentric ankle dorsiflexion (first rocker).',
    normalJointAngles: { hip: '20° flexion', knee: '15° - 20° flexion', ankle: '5° plantarflexion' },
    patientJointAngles: { hip: 18, knee: 14, ankle: -4 },
    clinicalSignificance: 'Maximum weight acceptance. Quadriceps weakness produces extensor thrust; abductor weakness triggers Trendelenburg drop.',
  },
  {
    number: 3,
    name: 'Midstance',
    nameHi: 'मिडस्टांस (मध्यम टेक स्थिति)',
    nameGu: 'મિડસ્ટેન્સ (વચ્ચેની ટેક સ્થિતિ)',
    subdivision: 'Stance Phase (60%)',
    percentageOfCycle: '12% - 31%',
    criticalEvents: 'Single-leg support; body passes over stationary foot (ankle rocker); soleus controls forward tibial advancement.',
    normalJointAngles: { hip: '0° neutral', knee: '0° - 5° flexion', ankle: '5° dorsiflexion' },
    patientJointAngles: { hip: -2, knee: 10, ankle: 4 },
    clinicalSignificance: 'Demands peak gluteus medius stabilization. Genu recurvatum or excessive knee flexion during midstance denotes pathology.',
  },
  {
    number: 4,
    name: 'Terminal Stance (Heel Off)',
    nameHi: 'अंतिम स्टांस (एड़ी ऊपर उठना)',
    nameGu: 'ટર્મિનલ સ્ટેન્સ (એડી જમીનથી ઊંચી થવી)',
    subdivision: 'Stance Phase (60%)',
    percentageOfCycle: '31% - 50%',
    criticalEvents: 'Heel rises off ground (forefoot rocker); hip hyperextends to 10°-15°; gastrocnemius-soleus generates peak plantarflexion torque.',
    normalJointAngles: { hip: '10° - 15° extension', knee: '0° - 5° flexion', ankle: '10° dorsiflexion' },
    patientJointAngles: { hip: -10, knee: 12, ankle: 6 },
    clinicalSignificance: 'Determines step length of contralateral limb. Tight hip flexors or weak calf curtails terminal extension.',
  },
  {
    number: 5,
    name: 'Pre-Swing (Toe Off)',
    nameHi: 'प्री-स्विंग (अंगूठा छूटना)',
    nameGu: 'પ્રી-સ્વિંગ (અંગૂઠો જમીન છોડવો)',
    subdivision: 'Stance Phase (60%)',
    percentageOfCycle: '50% - 62%',
    criticalEvents: 'Rapid knee flexion to 35°-40° triggered by mechanical unloading; preparation for limb acceleration into swing.',
    normalJointAngles: { hip: '0° neutral', knee: '35° - 40° flexion', ankle: '20° plantarflexion' },
    patientJointAngles: { hip: -4, knee: 24, ankle: -12 },
    clinicalSignificance: 'Final double-support phase. Stiff knee or weak gastrocnemius reduces pre-swing knee flexion and propulsion.',
  },
  {
    number: 6,
    name: 'Initial Swing (Acceleration)',
    nameHi: 'प्रारंभिक स्विंग (त्वरण)',
    nameGu: 'ઇનિશિયલ સ્વિંગ (ગતિ પકડવી)',
    subdivision: 'Swing Phase (40%)',
    percentageOfCycle: '62% - 75%',
    criticalEvents: 'Limb pulled forward; knee achieves peak flexion of 60° for toe clearance; ankle begins dorsiflexion to neutral.',
    normalJointAngles: { hip: '15° flexion', knee: '60° flexion', ankle: '5° plantarflexion' },
    patientJointAngles: { hip: 12, knee: 38, ankle: -6 },
    clinicalSignificance: 'Crucial for clearing ground. Less than 55° flexion results in toe drag, circumduction, or vaulting.',
  },
  {
    number: 7,
    name: 'Midswing',
    nameHi: 'मिडस्विंग (मध्य हवा में)',
    nameGu: 'મિડસ્વિંગ (હવામાં વચ્ચે પહોંચવું)',
    subdivision: 'Swing Phase (40%)',
    percentageOfCycle: '75% - 87%',
    criticalEvents: 'Tibia reaches vertical position; ankle active dorsiflexion to 0° neutral clears floor by safe 1.5 cm margin.',
    normalJointAngles: { hip: '25° flexion', knee: '25° - 30° flexion', ankle: '0° neutral' },
    patientJointAngles: { hip: 22, knee: 42, ankle: 0 },
    clinicalSignificance: 'Maximum danger for trip and falls if tibialis anterior fails (peroneal nerve palsy / foot drop).',
  },
  {
    number: 8,
    name: 'Terminal Swing (Deceleration)',
    nameHi: 'अंतिम स्विंग (मंदन)',
    nameGu: 'ટર્મિનલ સ્વિંગ (ધીમા પડી સંપર્કની તૈયારી)',
    subdivision: 'Swing Phase (40%)',
    percentageOfCycle: '87% - 100%',
    criticalEvents: 'Knee extends smoothly to near 0°; hamstrings eccentrically decelerate forward thigh momentum before ground contact.',
    normalJointAngles: { hip: '30° flexion', knee: '0° - 5° flexion', ankle: '0° neutral' },
    patientJointAngles: { hip: 26, knee: 16, ankle: 2 },
    clinicalSignificance: 'Prepares foot for heel strike. Hamstring strain risk highest during eccentric deceleration in terminal swing.',
  },
];

export const AIMotionGaitAnalysis: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset>(SAMPLE_PRESETS[0]);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSkeletonOverlay, setShowSkeletonOverlay] = useState<boolean>(true);
  const [showJointAngleArcs, setShowJointAngleArcs] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'phases' | 'spatiotemporal' | 'deviations' | 'report'>('visualizer');
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Auto-play loop across 8 phases
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActivePhaseIndex((prev) => (prev + 1) % 8);
      }, 900 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const currentPhase = GAIT_PHASES[activePhaseIndex];
  const currentAngles = selectedPreset.phaseAngles[currentPhase.number] || { hip: 20, knee: 15, ankle: 0 };

  const getPhaseName = (phase: GaitPhaseDetail) => {
    if (language === 'hi') return phase.nameHi;
    if (language === 'gu') return phase.nameGu;
    return phase.name;
  };

  const getPresetName = (preset: SamplePreset) => {
    if (language === 'hi') return preset.nameHi;
    if (language === 'gu') return preset.nameGu;
    return preset.name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Module Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'gu'
                ? 'એઆઈ ગતિશીલતા અને ચાલ વિશ્લેષણ મોડ્યુલ'
                : language === 'hi'
                ? 'एआई मोशन एवं चाल (गेट) विश्लेषण मॉड्यूल'
                : 'AI Motion & Gait Biomechanical Analysis'}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {language === 'gu'
              ? '૮ ચાલ તબક્કા, સ્કેલેટલ એંગલ ટ્રેકિંગ, અવકાશી-સમય પરિમાણો અને ક્લિનિકલ વિચલન શોધ'
              : language === 'hi'
              ? '8 गेट चरण, स्केलेटल एंगल ट्रैकिंग, स्थानिक-कालिक पैरामीटर एवं क्लिनिकल विचलन पहचान'
              : '8-Phase gait breakdown, skeletal landmark angles, spatio-temporal metrics & pathological deviation detection.'}
          </p>
        </div>

        {/* Patient / Gait Sample Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            {language === 'gu' ? 'દર્દી ચાલ કેસ:' : language === 'hi' ? 'रोगी चाल केस:' : 'Clinical Case:'}
          </label>
          <select
            value={selectedPreset.id}
            onChange={(e) => {
              const found = SAMPLE_PRESETS.find((p) => p.id === e.target.value);
              if (found) setSelectedPreset(found);
            }}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 cursor-pointer max-w-xs truncate"
          >
            {SAMPLE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {getPresetName(p)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'visualizer'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? 'ઇન્ટરેક્ટિવ ગેટ વિઝ્યુલાઇઝર' : language === 'hi' ? 'इंटरैक्टिव गेट विज़ुअलाइज़र' : 'Interactive Gait Visualizer'}</span>
        </button>

        <button
          onClick={() => setActiveTab('phases')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'phases'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? '૮ ગેટ તબક્કાઓ' : language === 'hi' ? '8 गेट चरण' : '8 Gait Phases Breakdown'}</span>
        </button>

        <button
          onClick={() => setActiveTab('spatiotemporal')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'spatiotemporal'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? 'સ્પેસિયો-ટેમ્પોરલ મેટ્રિક્સ' : language === 'hi' ? 'स्थानिक-कालिक मेट्रिक्स' : 'Spatio-Temporal Metrics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('deviations')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'deviations'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>
            {language === 'gu' ? 'ચાલ વિકૃતિઓ / ખામીઓ' : language === 'hi' ? 'चाल विचलन एवं विकृति' : 'Movement Deviations'} ({selectedPreset.deviations.length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'report'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? 'ક્લિનિકલ ગેટ રિપોર્ટ' : language === 'hi' ? 'क्लिनिकल गेट रिपोर्ट' : 'Clinical Gait Report'}</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visualizer Canvas Panel (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[500px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  {currentPhase.subdivision} · {currentPhase.percentageOfCycle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSkeletonOverlay(!showSkeletonOverlay)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border cursor-pointer ${
                    showSkeletonOverlay ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' : 'text-slate-400 border-slate-700'
                  }`}
                >
                  {language === 'gu' ? 'સ્કેલેટન' : language === 'hi' ? 'कंकाल' : 'Skeleton'}: {showSkeletonOverlay ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setShowJointAngleArcs(!showJointAngleArcs)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border cursor-pointer ${
                    showJointAngleArcs ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'text-slate-400 border-slate-700'
                  }`}
                >
                  {language === 'gu' ? 'એંગલ ચાપ' : language === 'hi' ? 'कोण चाप' : 'Joint Arcs'}: {showJointAngleArcs ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Central Animated Biomechanical Gait Simulation Canvas */}
            <div className="relative flex-1 flex items-center justify-center py-6">
              {/* Floor / Ground Reaction Line */}
              <div className="absolute bottom-8 left-8 right-8 h-1 bg-gradient-to-r from-teal-500/20 via-teal-400 to-teal-500/20 rounded-full" />
              <div className="absolute bottom-4 text-[10px] text-slate-400 font-mono tracking-widest text-center w-full">
                ◄ GROUND CONTACT SURFACE & PRESSURE DISTRIBUTION ►
              </div>

              {/* Vector Biomechanical Skeleton Simulation */}
              <svg viewBox="0 0 400 320" className="w-full max-w-md h-72">
                {/* Definitions */}
                <defs>
                  <radialGradient id="pelvisGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.2" />
                  </radialGradient>
                </defs>

                {/* Torso & Head */}
                <circle cx="200" cy="50" r="16" fill="#94a3b8" />
                <line x1="200" y1="66" x2="200" y2="135" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                {/* Shoulders & Arms */}
                <line x1="160" y1="85" x2="240" y2="85" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

                {/* Pelvic Segment */}
                <ellipse cx="200" cy="135" rx="34" ry="10" fill="url(#pelvisGlow)" stroke="#2dd4bf" strokeWidth="2" />
                <circle cx="200" cy="135" r="4" fill="#5eead4" />

                {/* Unaffected Left Leg (Faint background outline) */}
                <line x1="185" y1="135" x2="175" y2="195" stroke="#475569" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 3" />
                <circle cx="175" cy="195" r="4" fill="#64748b" />
                <line x1="175" y1="195" x2="170" y2="255" stroke="#475569" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="170" y1="255" x2="155" y2="258" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

                {/* Patient Analyzed Right Leg (Highlighted Active Colored) */}
                {/* Hip Joint Marker */}
                <circle cx="215" cy="135" r="6" fill="#38bdf8" />

                {/* Thigh / Femur Segment calculated based on current angles */}
                {(() => {
                  const hipAngleRad = ((currentAngles.hip - 15) * Math.PI) / 180;
                  const kneeX = 215 + Math.sin(hipAngleRad) * 70;
                  const kneeY = 135 + Math.cos(hipAngleRad) * 70;

                  const kneeAngleRad = ((currentAngles.knee) * Math.PI) / 180;
                  const totalLowerLegAngle = hipAngleRad - kneeAngleRad;
                  const ankleX = kneeX - Math.sin(totalLowerLegAngle) * 65;
                  const ankleY = kneeY + Math.cos(totalLowerLegAngle) * 65;

                  const footX = ankleX + 22;
                  const footY = ankleY + (currentAngles.ankle < 0 ? 4 : -2);

                  return (
                    <g>
                      {/* Femur */}
                      <line x1="215" y1="135" x2={kneeX} y2={kneeY} stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
                      {/* Knee Joint */}
                      <circle cx={kneeX} cy={kneeY} r="7" fill="#818cf8" stroke="#ffffff" strokeWidth="2" />

                      {/* Tibia */}
                      <line x1={kneeX} y1={kneeY} x2={ankleX} y2={ankleY} stroke="#818cf8" strokeWidth="5" strokeLinecap="round" />
                      {/* Ankle Joint */}
                      <circle cx={ankleX} cy={ankleY} r="6" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />

                      {/* Foot / Calcaneus-Phalanges */}
                      <line x1={ankleX} y1={ankleY} x2={footX} y2={footY} stroke="#34d399" strokeWidth="4" strokeLinecap="round" />

                      {/* Joint Angle Readout Pills if enabled */}
                      {showJointAngleArcs && (
                        <g>
                          {/* Hip Angle Label */}
                          <rect x="228" y="140" width="60" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                          <text x="258" y="154" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                            Hip {currentAngles.hip}°
                          </text>

                          {/* Knee Angle Label */}
                          <rect x={kneeX + 10} y={kneeY - 10} width="66" height="20" rx="4" fill="#0f172a" stroke="#818cf8" strokeWidth="1" />
                          <text x={kneeX + 43} y={kneeY + 4} fill="#818cf8" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                            Knee {currentAngles.knee}°
                          </text>

                          {/* Ankle Angle Label */}
                          <rect x={ankleX - 70} y={ankleY - 8} width="64" height="20" rx="4" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                          <text x={ankleX - 38} y={ankleY + 6} fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                            Ankle {currentAngles.ankle > 0 ? `+${currentAngles.ankle}` : currentAngles.ankle}°
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Playback Controls & Phase Timeline */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2.5 rounded-full bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setActivePhaseIndex(0);
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Reset to Phase 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-semibold text-slate-200 ml-2">
                    {language === 'gu' ? 'તબક્કો' : language === 'hi' ? 'चरण' : 'Phase'} {currentPhase.number} / 8: {getPhaseName(currentPhase)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>Speed:</span>
                  {[0.5, 1, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        playbackSpeed === spd ? 'bg-teal-700 text-white font-bold' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* 8 Phase Stepper Buttons */}
              <div className="grid grid-cols-8 gap-1.5">
                {GAIT_PHASES.map((p, idx) => (
                  <button
                    key={p.number}
                    onClick={() => {
                      setIsPlaying(false);
                      setActivePhaseIndex(idx);
                    }}
                    className={`py-2 px-1 text-center rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      activePhaseIndex === idx
                        ? 'bg-teal-400 text-slate-950 shadow-md ring-2 ring-teal-300'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    P{p.number}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Clinical Phase Insights Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Phase Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {currentPhase.subdivision}
                </span>
                <span className="text-xs font-mono text-slate-500">{currentPhase.percentageOfCycle} of Cycle</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">{getPhaseName(currentPhase)}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{currentPhase.criticalEvents}</p>
              </div>

              {/* Joint Angles Comparison Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">{language === 'gu' ? 'સાંધો' : language === 'hi' ? 'जोड़' : 'Joint'}</th>
                      <th className="py-2 px-3">{language === 'gu' ? 'સામાન્ય' : language === 'hi' ? 'सामान्य' : 'Normal'}</th>
                      <th className="py-2 px-3 text-right">{language === 'gu' ? 'દર્દી માપ' : language === 'hi' ? 'रोगी माप' : 'Observed'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    <tr>
                      <td className="py-2 px-3 font-medium">Hip</td>
                      <td className="py-2 px-3 text-slate-500">{currentPhase.normalJointAngles.hip}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-teal-700">{currentAngles.hip}°</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Knee</td>
                      <td className="py-2 px-3 text-slate-500">{currentPhase.normalJointAngles.knee}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-indigo-700">{currentAngles.knee}°</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Ankle</td>
                      <td className="py-2 px-3 text-slate-500">{currentPhase.normalJointAngles.ankle}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                        {currentAngles.ankle > 0 ? `+${currentAngles.ankle}` : currentAngles.ankle}°
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Clinical Significance Note */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'gu' ? 'ક્લિનિકલ મહત્વ' : language === 'hi' ? 'क्लिनिकल महत्व' : 'Clinical Significance'}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">{currentPhase.clinicalSignificance}</p>
              </div>
            </div>

            {/* Quick Symmetry Meter */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {language === 'gu' ? 'ચાલ સપ્રમાણતા ઇન્ડેક્સ' : language === 'hi' ? 'चाल समरूपता सूचकांक' : 'Bilateral Gait Symmetry Index'}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    selectedPreset.metrics.symmetryIndex >= 90
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedPreset.metrics.symmetryIndex >= 75
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedPreset.metrics.symmetryIndex}% (Norm: &gt;92%)
                </span>
              </div>

              {/* Symmetry Progress Bar */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    selectedPreset.metrics.symmetryIndex >= 90
                      ? 'bg-emerald-500'
                      : selectedPreset.metrics.symmetryIndex >= 75
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${selectedPreset.metrics.symmetryIndex}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500">Left Stance Time</div>
                  <div className="text-base font-bold text-slate-800">{selectedPreset.metrics.stanceTimePercentLeft}%</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500">Right Stance Time</div>
                  <div className="text-base font-bold text-slate-800">{selectedPreset.metrics.stanceTimePercentRight}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 8 Phases Detailed Breakdown */}
      {activeTab === 'phases' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAIT_PHASES.map((phase) => (
              <div
                key={phase.number}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Phase {phase.number}
                    </span>
                    <span className="text-[11px] text-slate-400">{phase.percentageOfCycle}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{getPhaseName(phase)}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{phase.criticalEvents}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1">
                  <div className="text-slate-400 font-medium">Normal Kinematics:</div>
                  <div className="text-slate-700">Hip: {phase.normalJointAngles.hip}</div>
                  <div className="text-slate-700">Knee: {phase.normalJointAngles.knee}</div>
                  <div className="text-slate-700">Ankle: {phase.normalJointAngles.ankle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Spatio-Temporal Metrics */}
      {activeTab === 'spatiotemporal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">Cadence (कदम दर)</span>
              <div className="text-2xl font-bold text-slate-900">{selectedPreset.metrics.cadence} <span className="text-xs font-normal text-slate-500">steps/min</span></div>
              <div className="text-[11px] text-teal-700 font-medium">Normal reference: 100 - 120 steps/min</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">Walking Speed (चाल गति)</span>
              <div className="text-2xl font-bold text-slate-900">{selectedPreset.metrics.walkingSpeed} <span className="text-xs font-normal text-slate-500">m/s</span></div>
              <div className="text-[11px] text-teal-700 font-medium">Normal reference: 1.20 - 1.40 m/s</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">Stride Length (कदम लम्बाई)</span>
              <div className="text-2xl font-bold text-slate-900">{selectedPreset.metrics.strideLength} <span className="text-xs font-normal text-slate-500">cm</span></div>
              <div className="text-[11px] text-teal-700 font-medium">Normal reference: 120 - 150 cm</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">Step Width (बेस चौड़ाई)</span>
              <div className="text-2xl font-bold text-slate-900">{selectedPreset.metrics.stepWidth} <span className="text-xs font-normal text-slate-500">cm</span></div>
              <div className="text-[11px] text-teal-700 font-medium">Normal reference: 7 - 10 cm</div>
            </div>
          </div>

          {/* Bilateral Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 text-sm">
              {language === 'gu' ? 'દ્વિપક્ષીય સરખામણી મેટ્રિક્સ' : language === 'hi' ? 'द्विपक्षीय तुलनात्मक मेट्रिक्स' : 'Bilateral Lower Extremity Comparison'}
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Left Lower Limb</th>
                  <th className="py-3 px-4">Right Lower Limb</th>
                  <th className="py-3 px-4">Asymmetry Difference</th>
                  <th className="py-3 px-4">Clinical Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-3 px-4 font-medium">Step Length</td>
                  <td className="py-3 px-4">{selectedPreset.metrics.stepLengthLeft} cm</td>
                  <td className="py-3 px-4">{selectedPreset.metrics.stepLengthRight} cm</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-700">
                    {Math.abs(selectedPreset.metrics.stepLengthLeft - selectedPreset.metrics.stepLengthRight)} cm
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Shortened stance on symptomatic side curtails step length of contralateral advancing limb.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Stance Phase Duration</td>
                  <td className="py-3 px-4">{selectedPreset.metrics.stanceTimePercentLeft}%</td>
                  <td className="py-3 px-4">{selectedPreset.metrics.stanceTimePercentRight}%</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-700">
                    {Math.abs(selectedPreset.metrics.stanceTimePercentLeft - selectedPreset.metrics.stanceTimePercentRight)}%
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Significant antalgic offloading and reduced single support duration.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Swing Phase Duration</td>
                  <td className="py-3 px-4">{selectedPreset.metrics.swingTimePercentLeft}%</td>
                  <td className="py-3 px-4">{selectedPreset.metrics.swingTimePercentRight}%</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-700">
                    {Math.abs(selectedPreset.metrics.swingTimePercentLeft - selectedPreset.metrics.swingTimePercentRight)}%
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Compensatory adjustment to balance unequal double support phases.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Movement Deviations & Biomechanical Mechanisms */}
      {activeTab === 'deviations' && (
        <div className="space-y-4">
          {selectedPreset.deviations.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center text-emerald-800 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base">No Significant Pathological Gait Deviations Detected</h4>
              <p className="text-xs text-emerald-700">Spatio-temporal parameters and kinematic arcs fall within normative healthy adult benchmarks.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedPreset.deviations.map((dev) => (
                <div
                  key={dev.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <h4 className="font-bold text-slate-900 text-sm">
                          {language === 'gu' ? dev.nameGu : language === 'hi' ? dev.nameHi : dev.name}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400">Observed in: <strong className="text-slate-600">{dev.observedInPhase}</strong></span>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${
                        dev.severity === 'Severe'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : dev.severity === 'Moderate'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      Severity: {dev.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-700">Biomechanical Mechanism:</div>
                      <p className="text-slate-500 leading-relaxed">{dev.biomechanicalMechanism}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="font-semibold text-slate-700">Clinical Implication:</div>
                      <p className="text-slate-500 leading-relaxed">{dev.clinicalImplication}</p>
                    </div>

                    <div className="space-y-1 bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                      <div className="font-semibold text-teal-900">Rehabilitation Priority:</div>
                      <p className="text-teal-800 leading-relaxed">{dev.rehabilitationPriority}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Clinical Gait Report Generator */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'gu' ? 'સંપૂર્ણ ક્લિનિકલ ગેટ એનાલિસિસ રિપોર્ટ' : language === 'hi' ? 'सम्पूर्ण क्लिनिकल गेट विश्लेषण रिपोर्ट' : 'Comprehensive Clinical Gait Analysis Summary'}
              </h3>
              <p className="text-xs text-slate-500">
                ClinicaAI Motion Intelligence Engine · Evaluated on {new Date().toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`CLINICAL GAIT ANALYSIS REPORT
Case: ${selectedPreset.name}
Cadence: ${selectedPreset.metrics.cadence} steps/min
Walking Speed: ${selectedPreset.metrics.walkingSpeed} m/s
Symmetry Index: ${selectedPreset.metrics.symmetryIndex}%
Detected Deviations: ${selectedPreset.deviations.map((d) => d.name).join(', ')}
Recommendation: Physical therapy criteria-based gait retraining.`);
                setCopiedReport(true);
                setTimeout(() => setCopiedReport(false), 2000);
              }}
              className="px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl hover:bg-teal-800 transition-colors flex items-center gap-2 cursor-pointer self-start"
            >
              <Download className="w-4 h-4" />
              <span>{copiedReport ? 'Copied to Clipboard!' : 'Copy Clinical Note'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Assessment Case:</span>
              <p>{selectedPreset.name} — {selectedPreset.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900">Kinematic Findings Across Gait Cycle:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Initial Contact (P1): Hip {selectedPreset.phaseAngles[1]?.hip}°, Knee {selectedPreset.phaseAngles[1]?.knee}°, Ankle {selectedPreset.phaseAngles[1]?.ankle}°</li>
                  <li>Midstance (P3): Single-limb stability evaluated with {selectedPreset.metrics.stanceTimePercentRight}% right stance duration.</li>
                  <li>Terminal Stance (P4): Forefoot rocker and calf push-off propulsion observed.</li>
                  <li>Initial Swing (P6): Knee flexion peak reached {selectedPreset.phaseAngles[6]?.knee}° for ground clearance.</li>
                </ul>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900">Identified Pathological Deviations:</span>
                {selectedPreset.deviations.length === 0 ? (
                  <p className="text-emerald-700">None. Within physiologic normative limits.</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {selectedPreset.deviations.map((d) => (
                      <li key={d.id}>
                        <strong>{d.name}</strong> ({d.severity}): {d.biomechanicalMechanism}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Clinical Measurement Limitations Disclaimer */}
      <div className="p-4 bg-slate-100/90 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-500">
        <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-700">
            {language === 'gu'
              ? 'ક્લિનિકલ ગતિ વિશ્લેષણ માર્ગદર્શિકા અને મર્યાદા નોંધ'
              : language === 'hi'
              ? 'क्लिनिकल गति विश्लेषण दिशानिर्देश एवं सीमाएं'
              : 'Clinical Motion Analysis Guideline & Limitations Note:'}
          </span>
          <p className="text-[11px] leading-relaxed text-slate-500">
            2D video-based planar kinematic tracking provides clinical screening estimates of joint angles and spatio-temporal markers. It does not replace 3D optoelectronic multi-camera motion capture or direct multi-axis force-plate ground reaction force measurement. All metrics must be correlated with physical clinical examination, goniometry, and treating physician consultation.
          </p>
        </div>
      </div>
    </div>
  );
};
