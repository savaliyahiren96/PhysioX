import React, { useState } from 'react';
import {
  Compass,
  Activity,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface JointBiomechanicsComplex {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  jointType: string;
  degreesOfFreedom: string;
  keyKinematics: {
    plane: 'Sagittal' | 'Frontal' | 'Transverse' | 'Multiplanar';
    motion: string;
    normalRom: string;
    arthrokinematics: string;
  }[];
  openVsClosedChain: {
    openChain: string;
    closedChain: string;
    clinicalPearl: string;
  };
  momentArmsAndForces: {
    externalTorque: string;
    internalStabilizers: string;
    jointReactionForcePeak: string;
  };
  clinicalPathomechanics: string[];
  rehabilitationConsiderations: string[];
}

const BIOMECHANICAL_COMPLEXES: JointBiomechanicsComplex[] = [
  {
    id: 'knee',
    name: 'Knee Joint Complex (Tibiofemoral & Patellofemoral)',
    nameHi: 'घुटना जोड़ बायोमैकेनिक्स (टिबियोफेमोरल एवं पेटेलोफेमोरल)',
    nameGu: 'ઘૂંટણ સાંધો બાયોમિકેનિક્સ (ટિબિયોફેમોરલ અને પતેલોફેમોરલ)',
    jointType: 'Modified Hinge / Condylar Synovial Joint',
    degreesOfFreedom: '2 (Flexion/Extension + Terminal Rotation)',
    keyKinematics: [
      {
        plane: 'Sagittal',
        motion: 'Flexion / Extension',
        normalRom: '0° extension to 135°-145° flexion',
        arthrokinematics: 'Femoral condyles roll and slide posteriorly during flexion; anterior roll during extension.',
      },
      {
        plane: 'Transverse',
        motion: 'Screw-Home Mechanism',
        normalRom: '5° - 10° external tibial rotation in final 20° extension',
        arthrokinematics: 'Larger medial femoral condyle forces external rotation of tibia (open chain) or internal rotation of femur (closed chain) to lock knee.',
      },
      {
        plane: 'Multiplanar',
        motion: 'Patellar Tracking & Contact Area',
        normalRom: '7 cm excursion along trochlear groove',
        arthrokinematics: 'Contact starts at 20° flexion (inferior pole) and migrates proximally to superior pole at 90° flexion.',
      },
    ],
    openVsClosedChain: {
      openChain: 'Seated knee extension generates peak patellofemoral stress between 0° and 30° flexion.',
      closedChain: 'Squats and lunges produce peak patellofemoral joint reaction force (PFJRF) between 60° and 90° flexion.',
      clinicalPearl: 'For PFPS and early TKR, prescribe open chain 90°-45° and closed chain mini-squats 0°-45° to protect articular cartilage.',
    },
    momentArmsAndForces: {
      externalTorque: 'Increases as knee flexes in closed chain squatting (longer external moment arm from gravity).',
      internalStabilizers: 'Quadriceps extensor mechanism (patella acts as anatomical pulley increasing quadriceps moment arm by 30%).',
      jointReactionForcePeak: 'Reaches 3-4x bodyweight during level walking and 7-8x bodyweight during deep stair descent.',
    },
    clinicalPathomechanics: [
      'Loss of screw-home mechanism post-TKR or ACL tear results in persistent extensor lag and quad inhibition.',
      'Genu valgum increases lateral patellar vector and dynamic Q-angle, exacerbating lateral facet cartilage wear.',
      'Weak vastus medialis obliquus (VMO) combined with tight lateral retinaculum drives lateral patellar subluxation.',
    ],
    rehabilitationConsiderations: [
      'Focus on terminal knee extension with resistance band to reactivate screw-home terminal lock.',
      'NMES applied in 60° flexion overcomes arthrogenic muscle inhibition efficiently.',
      'Patellar medial glide joint mobilization to lengthen shortened lateral retinacular fibers.',
    ],
  },
  {
    id: 'hip',
    name: 'Hip & Groin Complex (Coxofemoral Articulation)',
    nameHi: 'कूल्हा जोड़ बायोमैकेनिक्स (कॉक्सोफेमोरल जोड़)',
    nameGu: 'થાપાનો સાંધો બાયોમિકેનિક્સ (કોક્સોફેમોરલ સાંધો)',
    jointType: 'Triaxial Ball-and-Socket Synovial Joint',
    degreesOfFreedom: '3 (Flex/Ext, Abd/Add, Int/Ext Rotation)',
    keyKinematics: [
      {
        plane: 'Sagittal',
        motion: 'Flexion / Extension',
        normalRom: '120° flexion, 20° hyperextension',
        arthrokinematics: 'Convex femoral head spins and glides opposite to thigh motion in concave acetabulum.',
      },
      {
        plane: 'Frontal',
        motion: 'Abduction / Adduction',
        normalRom: '40°-45° abduction, 20°-30° adduction',
        arthrokinematics: 'Superior roll and inferior glide during abduction.',
      },
      {
        plane: 'Transverse',
        motion: 'Internal / External Rotation',
        normalRom: '45° external, 35° internal rotation',
        arthrokinematics: 'Posterior roll with anterior glide during external rotation.',
      },
    ],
    openVsClosedChain: {
      openChain: 'Femur moves on stationary pelvis (e.g. straight leg raise, clamshell).',
      closedChain: 'Pelvis rotates and tilts over stationary femoral head (e.g. single-leg stance, walking midstance).',
      clinicalPearl: 'In single-leg stance, hip abductors must exert 2.5x bodyweight to counteract contralateral pelvic gravity drop.',
    },
    momentArmsAndForces: {
      externalTorque: 'Bodyweight acting through center of mass creates adduction moment around supporting hip.',
      internalStabilizers: 'Gluteus medius and minimus generate internal abductor torque with a 5 cm moment arm.',
      jointReactionForcePeak: 'Peaks at 2.5 - 3.5x bodyweight in quiet single-leg stance; up to 5x bodyweight during brisk walking.',
    },
    clinicalPathomechanics: [
      'Weakness of gluteus medius causes positive Trendelenburg sign (pelvic drop) or Duchenne limp (trunk lean).',
      'Femoroacetabular Impingement (FAI): Cam or Pincer morphology causes premature labral abutment in flexion + internal rotation.',
      'Iliopsoas contracture locks pelvis in anterior tilt, shutting down gluteus maximus firing.',
    ],
    rehabilitationConsiderations: [
      'Progressive abductor overload from side-lying to closed chain functional weight-bearing stance drills.',
      'Prescribe ipsilateral cane/crutch to reduce joint reaction force across painful hip by up to 50%.',
      'Normalize iliopsoas length to restore terminal hip extension in late stance.',
    ],
  },
  {
    id: 'shoulder',
    name: 'Shoulder Complex (Glenohumeral & Scapulothoracic)',
    nameHi: 'कंधा बायोमैकेनिक्स (ग्लीनोह्यूमरल एवं स्केपुलोथोरेसिक)',
    nameGu: 'ખભાનો સાંધો બાયોમિકેનિક્સ (ગ્લેનોહ્યુમરલ અને સ્કેપ્યુલોથોરેસિક)',
    jointType: 'Multi-joint complex (GH, ST, AC, SC articulations)',
    degreesOfFreedom: '3 primary rotational + 3 translational',
    keyKinematics: [
      {
        plane: 'Multiplanar',
        motion: 'Scapulohumeral Rhythm',
        normalRom: '180° total elevation (120° GH + 60° ST)',
        arthrokinematics: '2:1 overall ratio of glenohumeral to scapulothoracic motion across full abduction arc.',
      },
      {
        plane: 'Frontal',
        motion: 'Glenohumeral Abduction & Humeral Head Depression',
        normalRom: '0° to 180° elevation',
        arthrokinematics: 'Superior roll of humeral head accompanied by crucial inferior glide mediated by rotator cuff force couple.',
      },
    ],
    openVsClosedChain: {
      openChain: 'Overhead throwing, dumbbell raises, reaching.',
      closedChain: 'Quadruped crawls, push-up plus, plank weight shifts.',
      clinicalPearl: 'Closed kinetic chain drills stimulate co-contraction of rotator cuff through axial compression and mechanoreceptor firing.',
    },
    momentArmsAndForces: {
      externalTorque: 'Maximal at 90° abduction where gravity lever arm is longest.',
      internalStabilizers: 'Supraspinatus, Infraspinatus, Teres Minor, Subscapularis force couple depresses humeral head into glenoid.',
      jointReactionForcePeak: 'Compressive force reaches 90% bodyweight during 90° arm abduction.',
    },
    clinicalPathomechanics: [
      'Failure of rotator cuff inferior glide leads to superior humeral head migration and subacromial impingement.',
      'Scapular dyskinesis (Type I inferior angle, Type II medial border, Type III superior) compromises glenoid alignment.',
      'GIRD (Glenohumeral Internal Rotation Deficit) > 18° increases peel-back torque on superior labrum (SLAP tear).',
    ],
    rehabilitationConsiderations: [
      'Restore posterior shoulder flexibility via sleeper stretch and cross-body horizontal adduction.',
      'Scapular stabilization targeting lower trapezius and serratus anterior (push-up plus, prone Y-T-W).',
      'Eccentric rotator cuff conditioning in the scapular plane (scaption 30° anterior to coronal).',
    ],
  },
  {
    id: 'ankle',
    name: 'Ankle & Foot Complex (Talocrural & Subtalar)',
    nameHi: 'टखना एवं पैर बायोमैकेनिक्स (टैलोक्रूरल एवं सबटैलर)',
    nameGu: 'ઘૂંટી અને પંજો બાયોમિકેનિક્સ (ટેલોક્રૂરલ અને સબટેલર)',
    jointType: 'Hinge Mortise & Modified Bicondylar Subtalar',
    degreesOfFreedom: 'Triplanar functional coupling',
    keyKinematics: [
      {
        plane: 'Sagittal',
        motion: 'Talocrural Dorsiflexion / Plantarflexion',
        normalRom: '20° dorsiflexion, 50° plantarflexion',
        arthrokinematics: 'During dorsiflexion, talus rolls anteriorly and slides posteriorly within the bimalleolar mortise.',
      },
      {
        plane: 'Multiplanar',
        motion: 'Subtalar Pronation & Supination',
        normalRom: 'Pronation (eversion, abduction, DF) / Supination (inversion, adduction, PF)',
        arthrokinematics: 'Acts as a torque transmitter converting transverse tibial rotation into frontal/sagittal foot movement.',
      },
      {
        plane: 'Sagittal',
        motion: 'Windlass Mechanism',
        normalRom: '60°-70° great toe extension',
        arthrokinematics: 'Dorsiflexion of first MTP winds plantar fascia around metatarsal head, elevating medial arch for rigid lever push-off.',
      },
    ],
    openVsClosedChain: {
      openChain: 'Talus remains stationary on leg while calcaneus pronates (eversion + abduction + dorsiflexion).',
      closedChain: 'Calcaneus everts, talus adducts and plantarflexes, causing internal rotation of the entire tibia.',
      clinicalPearl: 'Excessive closed-chain foot pronation drives internal tibial rotation and increases knee valgus strain.',
    },
    momentArmsAndForces: {
      externalTorque: 'Ground reaction force vector passes anterior to ankle in late stance, creating dorsiflexion moment.',
      internalStabilizers: 'Achilles tendon exerts 3.5 - 5.5x bodyweight tensile force during terminal stance push-off.',
      jointReactionForcePeak: 'Talocrural compressive forces reach 4.5 - 5.5x bodyweight in stance phase.',
    },
    clinicalPathomechanics: [
      'Restricted posterior talar glide halts second ankle rocker, forcing knee hyperextension or early heel rise.',
      'Incompetence of posterior tibialis tendon leads to adult acquired flatfoot deformity (pes planus).',
      'Hallux rigidus disables windlass mechanism, destroying terminal propulsion.',
    ],
    rehabilitationConsiderations: [
      'Grade III-IV posterior talocrural mobilizations and mobilization with movement (MWM) with strap.',
      'Eccentric triceps surae loading on slant board.',
      'Short-foot exercise (Janda) to reactivate intrinsic foot muscles and support the medial arch.',
    ],
  },
  {
    id: 'lumbar',
    name: 'Lumbar Spine & Pelvic Complex (L1-S1 & Sacroiliac)',
    nameHi: 'कमर एवं पेल्विक बायोमैकेनिक्स (लम्बर स्पाइन एवं एसआई जॉइंट)',
    nameGu: 'કમર અને પેલ્વિક બાયોમિકેનિક્સ (લમ્બર સ્પાઇન અને એસઆઈ સાંધો)',
    jointType: 'Intervertebral Amphiarthrosis + Diarthrodial Facets',
    degreesOfFreedom: '3 (Flex/Ext, Lateral Bend, Axial Rotation)',
    keyKinematics: [
      {
        plane: 'Sagittal',
        motion: 'Lumbar Flexion / Extension',
        normalRom: '40°-60° flexion, 20°-35° extension',
        arthrokinematics: 'Inferior articular facets slide superiorly during flexion, compressing anterior disc and widening neuroforamina.',
      },
      {
        plane: 'Sagittal',
        motion: 'Lumbopelvic Rhythm',
        normalRom: 'Coordinated 40° lumbar flexion + 70° forward pelvic hip rotation',
        arthrokinematics: 'Normal bending begins with lumbar flexion followed by anterior pelvic tilt. Return sequence: hip extension first, then lumbar erection.',
      },
    ],
    openVsClosedChain: {
      openChain: 'Supine double leg lowering or reverse crunches.',
      closedChain: 'Deadlifts, squats, standing stoop bending.',
      clinicalPearl: 'Flexing the spine under compressive load quadruples intradiscal pressure compared to quiet standing.',
    },
    momentArmsAndForces: {
      externalTorque: 'Forward bending extends external lever arm of trunk from spine to 30+ cm, creating massive flexion moment.',
      internalStabilizers: 'Erector spinae and multifidus exert counter-extension force with a short 5 cm moment arm.',
      jointReactionForcePeak: 'L4-L5 compressive force exceeds 7000 N during heavy lifting in spinal flexion.',
    },
    clinicalPathomechanics: [
      'Reversed lumbopelvic rhythm with early lumbar flexion and delayed hip rotation concentrates shear stress at L5-S1.',
      'Spondylolysis / Pars stress injury: Repetitive hyperextension and rotation (cricket fast bowling, gymnastics) shears pars interarticularis.',
      'Sacroiliac joint shear: Pelvic asymmetry or leg length discrepancy alters form and force closure of SI joint.',
    ],
    rehabilitationConsiderations: [
      'McGill Big 3 (Modified Curl-up, Side Bridge, Bird-Dog) to build core stiffness without high disc compression.',
      'Hip hinge biomechanical retraining to substitute hip rotation for excessive lumbar flexion.',
      'Directional preference loading (McKenzie extension exercises) for discogenic centralization.',
    ],
  },
  {
    id: 'cervical',
    name: 'Cervical Spine Complex (Occiput-C1, C1-C2, Lower Cervical C3-C7)',
    nameHi: 'गर्दन बायोमैकेनिक्स (सर्वाइकल स्पाइन)',
    nameGu: 'ડોક બાયોમિકેનિક્સ (સર્વાઇકલ સ્પાઇન)',
    jointType: 'Upper specialized (Atlanto-occipital, Atlanto-axial) + Lower Facets',
    degreesOfFreedom: 'High multi-planar mobility (Flex/Ext, Rotation, Side-bending)',
    keyKinematics: [
      {
        plane: 'Transverse',
        motion: 'Atlanto-Axial (C1-C2) Rotation',
        normalRom: '40° - 45° rotation to each side',
        arthrokinematics: 'Provides 50% of total cervical rotation. Odontoid peg acts as pivot within atlas ring.',
      },
      {
        plane: 'Sagittal',
        motion: 'Atlanto-Occipital (C0-C1) Nodding',
        normalRom: '15° - 20° flexion-extension nodding',
        arthrokinematics: 'Occipital condyles roll forward and slide backward during nodding flexion.',
      },
    ],
    openVsClosedChain: {
      openChain: 'Active head turning and nodding in space.',
      closedChain: 'Axial cervical retraction against wall or headrest.',
      clinicalPearl: 'Every 2.5 cm of forward head translation adds ~4.5 kg of effective gravity torque on cervical extensor muscles.',
    },
    momentArmsAndForces: {
      externalTorque: 'Head weighs 5 kg in neutral; forward head posture increases gravitational demand to 18-27 kg at 45°-60° tilt.',
      internalStabilizers: 'Deep neck flexors (longus capitis/colli) provide anterior axial cervical stability.',
      jointReactionForcePeak: 'Lower cervical facets (C5-C7) bear increased shear and compressive loading under sustained slouching.',
    },
    clinicalPathomechanics: [
      'Upper Crossed Syndrome: Weak deep neck flexors and tight suboccipital/upper trapezius produce chronic cervicogenic headaches.',
      'Cervical radiculopathy: Foraminal stenosis worsened by extension and ipsilateral lateral flexion (Spurling maneuver).',
      'Whiplash acceleration-deceleration forces sprain anterior longitudinal ligament and facet capsules.',
    ],
    rehabilitationConsiderations: [
      'Craniocervical flexion test (CCFT) with pressure biofeedback cuff (20 to 30 mmHg in 2 mmHg increments).',
      'Axial cervical retraction (chin tucks) to open intervertebral foramina and decompress facet joints.',
      'Ergonomic workstation monitor height positioning at eye level.',
    ],
  },
];

export const AdvancedBiomechanicsModule: React.FC = () => {
  const { language } = useLanguage();
  const [selectedComplexId, setSelectedComplexId] = useState<string>('knee');

  const selectedComplex = BIOMECHANICAL_COMPLEXES.find((c) => c.id === selectedComplexId) || BIOMECHANICAL_COMPLEXES[0];

  const getComplexName = (c: JointBiomechanicsComplex) => {
    if (language === 'hi') return c.nameHi;
    if (language === 'gu') return c.nameGu;
    return c.name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Module Title */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'gu'
                ? 'અદ્યતન બાયોમિકેનિક્સ અને કિનેમેટિક્સ વિશ્લેષણ'
                : language === 'hi'
                ? 'उन्नत बायोमैकेनिक्स एवं किनेमेटिक्स विश्लेषण'
                : 'Advanced Biomechanics & Joint Kinematics'}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {language === 'gu'
              ? '૧૦ મુખ્ય સાંધા પરિસરો, ઓપન/ક્લોઝ્ડ કાઇનેટિક ચેઈન, મોમેન્ટ આર્મ્સ અને સાંધા બળો'
              : language === 'hi'
              ? '10 मुख्य जोड़ परिसर, खुली/बंद गतिज श्रृंखला, मोमेंट आर्म एवं जोड़ प्रतिक्रिया बल'
              : 'Kinematic arcs, open vs. closed kinetic chains, moment arms, joint reaction forces & pathomechanics.'}
          </p>
        </div>

        {/* Joint selector pill pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {BIOMECHANICAL_COMPLEXES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedComplexId(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedComplexId === c.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Complex Breakdown View */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Title & Characteristics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              {selectedComplex.jointType}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{getComplexName(selectedComplex)}</h2>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-slate-500">Degrees of Freedom:</span>
            <span className="font-bold text-slate-800">{selectedComplex.degreesOfFreedom}</span>
          </div>
        </div>

        {/* Section 1: Arthrokinematics & Planes */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Arthrokinematics & Joint Motions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedComplex.keyKinematics.map((k, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{k.motion}</span>
                  <span className="font-mono text-[10px] text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {k.plane}
                  </span>
                </div>
                <div className="text-teal-800 font-semibold">Norm: {k.normalRom}</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{k.arthrokinematics}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Open vs Closed Kinetic Chain */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Open vs. Closed Kinetic Chain Biomechanics</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
              <span className="font-bold text-indigo-950 block text-sm">Open Kinetic Chain (OKC)</span>
              <p className="text-indigo-900/90 leading-relaxed">{selectedComplex.openVsClosedChain.openChain}</p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
              <span className="font-bold text-teal-950 block text-sm">Closed Kinetic Chain (CKC)</span>
              <p className="text-teal-900/90 leading-relaxed">{selectedComplex.openVsClosedChain.closedChain}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Clinical Biomechanics Pearl: </strong>
              <span>{selectedComplex.openVsClosedChain.clinicalPearl}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Moment Arms & Joint Reaction Forces */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Moment Arms, External Torques & Joint Reaction Forces</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">External Torque Dynamics</span>
              <p className="text-slate-700 leading-relaxed">{selectedComplex.momentArmsAndForces.externalTorque}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">Internal Muscular Stabilizers</span>
              <p className="text-slate-700 leading-relaxed">{selectedComplex.momentArmsAndForces.internalStabilizers}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">Peak Joint Reaction Forces</span>
              <p className="text-slate-700 leading-relaxed">{selectedComplex.momentArmsAndForces.jointReactionForcePeak}</p>
            </div>
          </div>
        </div>

        {/* Section 4: Pathomechanics & Rehabilitation Implications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 text-xs">
          <div className="space-y-2">
            <span className="font-bold text-red-950 block text-sm">Pathomechanical Deviations & Failure Modes:</span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              {selectedComplex.clinicalPathomechanics.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-teal-950 block text-sm">Evidence-Based Rehabilitation Interventions:</span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              {selectedComplex.rehabilitationConsiderations.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
