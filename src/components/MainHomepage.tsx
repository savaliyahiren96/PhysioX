import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  UserCheck,
  Stethoscope,
  Search,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  User,
  Users,
  FileText,
  Camera,
  Compass,
  Calculator,
  TrendingUp,
  Trophy,
  Brain,
  GraduationCap,
  HeartPulse,
  Microscope,
  Info,
  X,
  ExternalLink,
  MapPin,
  Building,
  Eye,
  Check,
  AlertTriangle,
  FileCheck,
  Sliders,
  HelpCircle,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { AppView } from './Header';
import { useLanguage } from '../context/LanguageContext';
import { useUserRole } from '../context/UserRoleContext';
import { INITIAL_DOCTOR } from '../data/initialDoctorPatientData';
import { ALL_JOINT_CONDITIONS } from '../data/jointProtocolsData';
import { MASTER_CONDITIONS_DATABASE, MasterConditionRecord } from '../data/masterAnatomicalDatabase';
import { MASTER_SPECIAL_TESTS_LIBRARY } from '../data/specialTestLibraryData';
import { JointConditionMaster } from '../types/clinical';

interface MainHomepageProps {
  onNavigate: (view: AppView) => void;
  onOpenConditionModal?: (conditionId: string) => void;
  onStartAssessment?: () => void;
}

// 14 Detailed Anatomical Joint Complexes required by the user brief
export interface JointComplexMeta {
  id: string;
  name: string;
  subtitle: string;
  conditionCount: number;
  iconName: string;
  categories: {
    name: string;
    conditions: {
      id: string;
      name: string;
      acuity: 'acute' | 'chronic' | 'post-op';
      subtypes?: string[];
      brief: string;
    }[];
  }[];
}

export const MAIN_14_JOINTS_DATA: JointComplexMeta[] = [
  {
    id: 'knee',
    name: 'Knee Joint',
    subtitle: 'Tibiofemoral & Patellofemoral complex, cruciates & menisci',
    conditionCount: 16,
    iconName: 'Activity',
    categories: [
      {
        name: 'Ligament Injuries',
        conditions: [
          { id: 'knee-acl-rupture', name: 'ACL Injury & Rupture', acuity: 'acute', brief: 'Anterior cruciate ligament disruption with rotary pivot-shift instability' },
          { id: 'knee-pcl-tear', name: 'PCL Injury & Posterior Sag', acuity: 'acute', brief: 'Posterior cruciate ligament tear with posterior tibial subluxation' },
          { id: 'knee-mcl-sprain', name: 'MCL Sprain / Rupture', acuity: 'acute', brief: 'Medial collateral ligament injury following valgus knee trauma' },
          { id: 'knee-lcl-injury', name: 'LCL & Posterolateral Corner', acuity: 'acute', brief: 'Lateral collateral ligament tear with varus & hyperextension instability' },
        ],
      },
      {
        name: 'Meniscal Injuries',
        conditions: [
          { id: 'knee-meniscal-tear', name: 'Meniscal Tear (Medial / Lateral)', acuity: 'chronic', brief: 'Horizontal, bucket-handle, or degenerative fibrocartilage tears' },
          { id: 'knee-meniscal-root-tear', name: 'Meniscal Root Tear', acuity: 'acute', brief: 'Extrusion of meniscal root leading to loss of hoop stresses' },
        ],
      },
      {
        name: 'Tendinopathies',
        conditions: [
          { id: 'knee-patellar-tendinopathy', name: 'Patellar Tendinopathy (Jumper\'s Knee)', acuity: 'chronic', brief: 'Inferior pole patellar tendon overload in jumping athletes' },
          { id: 'knee-quadriceps-tendinopathy', name: 'Quadriceps Tendinopathy', acuity: 'chronic', brief: 'Superior pole quadriceps tendon insertion tendinopathy' },
        ],
      },
      {
        name: 'Patellofemoral Disorders',
        conditions: [
          { id: 'knee-pfps', name: 'Patellofemoral Pain Syndrome (PFPS)', acuity: 'chronic', brief: 'Retropatellar anterior knee ache with prolonged sitting & stairs' },
          { id: 'knee-patellar-instability', name: 'Patellar Instability & Subluxation', acuity: 'acute', brief: 'Lateral patellar dislocation with MPFL tear & J-sign tracking' },
        ],
      },
      {
        name: 'Degenerative & Inflammatory',
        conditions: [
          { id: 'knee-oa-tibiofemoral', name: 'Knee Osteoarthritis (Grade 1-4)', acuity: 'chronic', brief: 'Progressive cartilage loss, subchondral sclerosis & joint narrowing' },
          { id: 'knee-inflammatory-arthritis', name: 'Inflammatory Knee Arthritis & Bursitis', acuity: 'acute', brief: 'Prepatellar / pes anserine bursitis & inflammatory flares' },
        ],
      },
      {
        name: 'Fractures & Trauma',
        conditions: [
          { id: 'knee-tibial-plateau-fx', name: 'Tibial Plateau Fracture', acuity: 'acute', brief: 'Schatzker type I-VI articular plateau compression fracture' },
          { id: 'knee-patellar-fracture', name: 'Patellar Fracture', acuity: 'acute', brief: 'Transverse or comminuted disruption of knee extensor mechanism' },
        ],
      },
      {
        name: 'Joint Replacement & Post-Op',
        conditions: [
          { id: 'knee-tkr-rehab', name: 'Total Knee Replacement (TKR) Rehab', acuity: 'post-op', brief: 'Phased post-arthroplasty protocol: 0-120° ROM & quad recovery' },
          { id: 'knee-ukr-rehab', name: 'Unicompartmental Knee Replacement (UKR)', acuity: 'post-op', brief: 'Accelerated rehab for isolated medial compartment replacement' },
        ],
      },
    ],
  },
  {
    id: 'shoulder',
    name: 'Shoulder Complex',
    subtitle: 'Glenohumeral, subacromial space, rotator cuff & labrum',
    conditionCount: 14,
    iconName: 'Compass',
    categories: [
      {
        name: 'Rotator Cuff Disorders',
        conditions: [
          { id: 'shoulder-supraspinatus-tear', name: 'Rotator Cuff Disorders & Tears', acuity: 'chronic', brief: 'Supraspinatus/Infraspinatus tendinopathy, partial & full thickness tears' },
          { id: 'shoulder-subacromial-impingement', name: 'Subacromial Pain Syndrome (SAPS)', acuity: 'chronic', brief: 'Bursal & cuff impingement under coracoacromial arch with painful arc' },
          { id: 'shoulder-biceps-tendinopathy', name: 'Biceps Tendinopathy & LHBT Instability', acuity: 'chronic', brief: 'Long head of biceps groove tenderness & Speed / Yergason signs' },
        ],
      },
      {
        name: 'Capsular & Labral Disorders',
        conditions: [
          { id: 'shoulder-adhesive-capsulitis', name: 'Adhesive Capsulitis (Frozen Shoulder)', acuity: 'chronic', brief: 'Fibrosing capsular contracture with external rotation restriction' },
          { id: 'shoulder-slap-lesion', name: 'SLAP Lesions (Type I-IV)', acuity: 'acute', brief: 'Superior labral anterior-to-posterior tear with overhead clicking' },
          { id: 'shoulder-instability-bankart', name: 'Shoulder Instability & Bankart Lesion', acuity: 'acute', brief: 'Anterior-inferior labral tear following traumatic shoulder dislocation' },
        ],
      },
      {
        name: 'AC & SC Joints, Fractures & Arthroplasty',
        conditions: [
          { id: 'shoulder-ac-joint-injury', name: 'Acromioclavicular (AC) Joint Separation', acuity: 'acute', brief: 'Rockwood classification type I-VI sprain following direct fall' },
          { id: 'shoulder-proximal-humerus-fx', name: 'Proximal Humerus Fracture Rehab', acuity: 'acute', brief: 'Neer 2-to-4 part fracture rehabilitation with rotator cuff protection' },
          { id: 'shoulder-tsa-rehab', name: 'Total Shoulder & Reverse Arthroplasty', acuity: 'post-op', brief: 'Deltoid-dominant rehabilitation following Reverse Total Shoulder' },
        ],
      },
    ],
  },
  {
    id: 'lumbar',
    name: 'Lumbar Spine',
    subtitle: 'L1–S1 motion segments, intervertebral discs & facets',
    conditionCount: 10,
    iconName: 'Layers',
    categories: [
      {
        name: 'Disc & Radicular Syndromes',
        conditions: [
          { id: 'lumbar-disc-herniation', name: 'Lumbar Disc Herniation with Radiculopathy', acuity: 'acute', brief: 'L4-L5 / L5-S1 extrusion with sciatica, positive SLR & neurological signs' },
          { id: 'lumbar-mechanical-lbp', name: 'Mechanical Non-Specific Low Back Pain', acuity: 'chronic', brief: 'Flexion/extension movement control impairment without radiculopathy' },
          { id: 'lumbar-spinal-stenosis', name: 'Lumbar Spinal Stenosis', acuity: 'chronic', brief: 'Neurogenic claudication relieved by lumbar flexion (shopping cart sign)' },
        ],
      },
      {
        name: 'Bony, Facet & Spondylolytic Disorders',
        conditions: [
          { id: 'lumbar-spondylolysis-pars', name: 'Spondylolysis (Pars Stress Reaction)', acuity: 'acute', brief: 'Fatigue fracture of pars interarticularis common in young fast bowlers' },
          { id: 'lumbar-spondylolisthesis', name: 'Spondylolisthesis (Isthmic & Degenerative)', acuity: 'chronic', brief: 'Meyerding grade 1-4 vertebral slippage with step-off deformity' },
          { id: 'lumbar-facet-arthropathy', name: 'Lumbar Facet Joint Arthropathy', acuity: 'chronic', brief: 'Extension-rotation quadrant aggravation (Kemp test positive)' },
        ],
      },
    ],
  },
  {
    id: 'cervical',
    name: 'Cervical Spine',
    subtitle: 'C1–C7 vertebrae, uncovertebral joints & nerve roots',
    conditionCount: 7,
    iconName: 'Activity',
    categories: [
      {
        name: 'Cervical Conditions',
        conditions: [
          { id: 'cervical-radiculopathy', name: 'Cervical Radiculopathy (C5-C7)', acuity: 'acute', brief: 'Nerve root compression with positive Spurling test and dermatomal numbness' },
          { id: 'cervical-spondylosis', name: 'Cervical Spondylosis & Disc Degeneration', acuity: 'chronic', brief: 'Age-related degenerative changes with neck stiffness & headache' },
          { id: 'cervicogenic-headache', name: 'Cervicogenic Headache', acuity: 'chronic', brief: 'Unilateral headache originating from C1-C3 joints (Flexion-Rotation test)' },
          { id: 'whiplash-wad', name: 'Whiplash-Associated Disorders (WAD I-III)', acuity: 'acute', brief: 'Acceleration-deceleration traumatic neck injury with deep flexor latency' },
          { id: 'cervical-myelopathy', name: 'Cervical Spondylotic Myelopathy', acuity: 'chronic', brief: 'Spinal cord compression with Hoffmann sign, hyperreflexia & gait ataxia' },
        ],
      },
    ],
  },
  {
    id: 'hip',
    name: 'Hip Joint',
    subtitle: 'Acetabulofemoral articulation, labrum & gluteal complex',
    conditionCount: 10,
    iconName: 'Compass',
    categories: [
      {
        name: 'Hip & Groin Pathologies',
        conditions: [
          { id: 'hip-fai-labral-tear', name: 'Femoroacetabular Impingement (FAI) & Labral Tear', acuity: 'chronic', brief: 'Cam/Pincer bony overgrowth pinching labrum with deep groin C-sign' },
          { id: 'hip-osteoarthritis', name: 'Hip Osteoarthritis (Coxarthrosis)', acuity: 'chronic', brief: 'Progressive internal rotation loss and anterior groin stiffness' },
          { id: 'hip-gtps-gluteal-tendinopathy', name: 'Greater Trochanteric Pain Syndrome (GTPS)', acuity: 'chronic', brief: 'Gluteus medius/minimus insertional tendinopathy & trochanteric bursitis' },
          { id: 'hip-piriformis-deep-gluteal', name: 'Deep Gluteal Syndrome (Piriformis Syndrome)', acuity: 'chronic', brief: 'Sciatic nerve entrapment in the subgluteal space without lumbar origin' },
          { id: 'hip-thr-rehab', name: 'Total Hip Arthroplasty (THA / THR) Rehab', acuity: 'post-op', brief: 'Posterior vs anterior approach precautions, gait retraining & abductor strength' },
        ],
      },
    ],
  },
  {
    id: 'ankle',
    name: 'Ankle Joint',
    subtitle: 'Talocrural, subtalar & syndesmotic complexes',
    conditionCount: 8,
    iconName: 'Activity',
    categories: [
      {
        name: 'Ligament & Tendon Disorders',
        conditions: [
          { id: 'ankle-inversion-sprain', name: 'Lateral Ankle Sprain (ATFL / CFL)', acuity: 'acute', brief: 'Inversion-plantarflexion trauma with anterior talofibular ligament tear' },
          { id: 'ankle-syndesmosis-high-sprain', name: 'High Ankle Sprain (Syndesmosis Injury)', acuity: 'acute', brief: 'AITFL tear from external rotation dorsiflexion (Squeeze test positive)' },
          { id: 'ankle-achilles-tendinopathy', name: 'Achilles Tendinopathy (Midportion / Insertional)', acuity: 'chronic', brief: 'Collagen disorganization 2-6 cm above calcaneal insertion' },
          { id: 'ankle-achilles-rupture', name: 'Achilles Tendon Complete Rupture', acuity: 'acute', brief: 'Mid-substance rupture with positive Thompson squeeze test & palpable gap' },
        ],
      },
    ],
  },
  {
    id: 'foot',
    name: 'Foot',
    subtitle: 'Plantar fascia, metatarsals, tarsals & arches',
    conditionCount: 7,
    iconName: 'Compass',
    categories: [
      {
        name: 'Foot Pathologies',
        conditions: [
          { id: 'foot-plantar-fasciitis', name: 'Plantar Fasciitis / Fasciopathy', acuity: 'chronic', brief: 'First-step morning heel pain at medial calcaneal tubercle (Windlass test)' },
          { id: 'foot-pttd-flatfoot', name: 'Posterior Tibial Tendon Dysfunction (PTTD)', acuity: 'chronic', brief: 'Loss of medial longitudinal arch and "too many toes" sign' },
          { id: 'foot-metatarsalgia-morton', name: 'Morton\'s Neuroma & Metatarsalgia', acuity: 'chronic', brief: '3rd-4th webspace interdigital perineural fibrosis (Mulder click)' },
          { id: 'foot-hallux-valgus', name: 'Hallux Valgus (Bunions) & Turf Toe', acuity: 'chronic', brief: 'First MTP joint lateral deviation with 1st ray hypomobility' },
        ],
      },
    ],
  },
  {
    id: 'elbow',
    name: 'Elbow Joint',
    subtitle: 'Humeroulnar, humeroradial & radioulnar joints',
    conditionCount: 6,
    iconName: 'Activity',
    categories: [
      {
        name: 'Elbow Conditions',
        conditions: [
          { id: 'elbow-lateral-epicondylalgia', name: 'Tennis Elbow (Lateral Epicondylalgia)', acuity: 'chronic', brief: 'Extensor carpi radialis brevis (ECRB) tendinopathy (Cozen / Mill tests)' },
          { id: 'elbow-medial-epicondylalgia', name: 'Golfer\'s Elbow (Medial Epicondylalgia)', acuity: 'chronic', brief: 'Common flexor-pronator origin tendinopathy with resisted wrist flexion pain' },
          { id: 'elbow-cubital-tunnel', name: 'Cubital Tunnel Syndrome (Ulnar Nerve)', acuity: 'chronic', brief: 'Ulnar nerve compression behind medial epicondyle with ring/small finger numbness' },
          { id: 'elbow-ucl-sprain', name: 'Ulnar Collateral Ligament (UCL) Sprain', acuity: 'acute', brief: 'Medial elbow valgus instability in overhead throwing athletes' },
        ],
      },
    ],
  },
  {
    id: 'wrist',
    name: 'Wrist Joint',
    subtitle: 'Radiocarpal joint, TFCC & carpal tunnel',
    conditionCount: 6,
    iconName: 'Compass',
    categories: [
      {
        name: 'Wrist Conditions',
        conditions: [
          { id: 'wrist-carpal-tunnel', name: 'Carpal Tunnel Syndrome (Median Nerve)', acuity: 'chronic', brief: 'Median nerve entrapment under transverse carpal ligament (Phalen / Tinel)' },
          { id: 'wrist-de-quervain', name: 'De Quervain\'s Tenosynovitis (1st Dorsal Compartment)', acuity: 'chronic', brief: 'Abductor pollicis longus and extensor pollicis brevis friction (Finkelstein test)' },
          { id: 'wrist-tfcc-tear', name: 'TFCC Tear & Ulnocarpal Impingement', acuity: 'acute', brief: 'Triangular fibrocartilage complex tear with ulnar-sided wrist clicking' },
          { id: 'wrist-colles-fracture', name: 'Distal Radius Fracture (Colles / Smith)', acuity: 'acute', brief: 'FOOSH trauma with dinner-fork deformity and phased immobilization rehab' },
        ],
      },
    ],
  },
  {
    id: 'hand',
    name: 'Hand & Fingers',
    subtitle: 'Metacarpophalangeal, IP joints & flexor pulleys',
    conditionCount: 5,
    iconName: 'Layers',
    categories: [
      {
        name: 'Hand Pathologies',
        conditions: [
          { id: 'hand-trigger-finger', name: 'Trigger Finger (Stenosing Tenosynovitis)', acuity: 'chronic', brief: 'A1 pulley thickening with mechanical digit locking and nodule palpation' },
          { id: 'hand-scaphoid-fracture', name: 'Scaphoid Fracture & Non-Union', acuity: 'acute', brief: 'Anatomical snuffbox tenderness with high risk of avascular necrosis' },
          { id: 'hand-dupuytren-contracture', name: 'Dupuytren\'s Contracture', acuity: 'chronic', brief: 'Palmar fascial cord thickening leading to progressive flexion contracture' },
        ],
      },
    ],
  },
  {
    id: 'thoracic',
    name: 'Thoracic Spine',
    subtitle: 'T1–T12 motion segments, costovertebral & rib cage',
    conditionCount: 5,
    iconName: 'Layers',
    categories: [
      {
        name: 'Thoracic Conditions',
        conditions: [
          { id: 'thoracic-pain-posture', name: 'Thoracic Kyphosis & Postural Dysfunction', acuity: 'chronic', brief: 'Excessive sagittal curvature with rhomboid weakness & pectoral tightness' },
          { id: 'thoracic-costovertebral-joint', name: 'Costovertebral Joint Dysfunction', acuity: 'acute', brief: 'Sharp interscapular pain exacerbated by deep inspiration and coughing' },
          { id: 'thoracic-outlet-syndrome', name: 'Thoracic Outlet Syndrome (TOS)', acuity: 'chronic', brief: 'Neurovascular bundle compression at scalene triangle (Adson & Roos tests)' },
        ],
      },
    ],
  },
  {
    id: 'sacroiliac',
    name: 'Sacroiliac Joint',
    subtitle: 'SIJ articulation, form & force closure, sacrotuberous',
    conditionCount: 4,
    iconName: 'Compass',
    categories: [
      {
        name: 'SIJ Conditions',
        conditions: [
          { id: 'sij-dysfunction-pain', name: 'Sacroiliac Joint Dysfunction & Pain', acuity: 'chronic', brief: 'Pain over Fortin finger area confirmed by Laslett 3-of-5 provocative test cluster' },
          { id: 'sij-ankylosing-spondylitis', name: 'Sacroiliitis & Axial Spondyloarthritis (HLA-B27)', acuity: 'chronic', brief: 'Inflammatory morning stiffness > 30 min improving with exercise' },
        ],
      },
    ],
  },
  {
    id: 'tmj',
    name: 'Temporomandibular Joint (TMJ)',
    subtitle: 'Mandibular condyle, articular disc & pterygoids',
    conditionCount: 4,
    iconName: 'Activity',
    categories: [
      {
        name: 'TMJ Disorders',
        conditions: [
          { id: 'tmj-disc-displacement-reduction', name: 'TMJ Disc Displacement with Reduction', acuity: 'chronic', brief: 'Reciprocal opening and closing clicks with anterior articular disc displacement' },
          { id: 'tmj-masticatory-myofascial', name: 'Masticatory Myofascial Pain & Bruxism', acuity: 'chronic', brief: 'Masseter and temporalis muscle trigger points with jaw fatigue' },
        ],
      },
    ],
  },
  {
    id: 'pelvis',
    name: 'Pelvis & Groin Complex',
    subtitle: 'Pubic symphysis, adductors, rectus abdominis & pelvic floor',
    conditionCount: 5,
    iconName: 'Compass',
    categories: [
      {
        name: 'Pelvic & Groin Disorders',
        conditions: [
          { id: 'pelvis-athletic-pubalgia', name: 'Athletic Pubalgia (Sports Hernia)', acuity: 'chronic', brief: 'Rectus abdominis-adductor longus aponeurosis disruption with squeeze test pain' },
          { id: 'pelvis-osteitis-pubis', name: 'Osteitis Pubis', acuity: 'chronic', brief: 'Non-infectious pubic symphysis inflammation with bone marrow edema on MRI' },
          { id: 'pelvis-adductor-longus-strain', name: 'Adductor Longus Tendon Strain / Tear', acuity: 'acute', brief: 'Sharp groin pull during kicking with resisted adduction weakness' },
        ],
      },
    ],
  },
];

// 18 Other Encyclopedia Navigation Categories
export const OTHER_ENCYCLOPEDIA_CATEGORIES = [
  { id: 'anatomy', title: 'Anatomy and Kinesiology', subtitle: 'Bones, ligaments, muscle origins, insertions & neural paths', icon: 'Brain' },
  { id: 'biomechanics', title: 'Biomechanics', subtitle: 'Kinematics, kinetics, moment arms, ground reaction forces', icon: 'Compass' },
  { id: 'pathomechanics', title: 'Pathomechanics', subtitle: 'Abnormal joint loading, shear stresses & compensation patterns', icon: 'Activity' },
  { id: 'muscle_function', title: 'Muscle Function & Activation', subtitle: 'Agonists, antagonists, stabilizers, EMG firing latency', icon: 'HeartPulse' },
  { id: 'clinical_exam', title: 'Clinical Examination', subtitle: 'Subjective triage, observation, palpation, ROM & MMT', icon: 'Stethoscope' },
  { id: 'special_tests', title: 'Special Tests Library', subtitle: 'Validated tests with Sensitivity, Specificity, +LR & -LR', icon: 'FileCheck' },
  { id: 'functional_assess', title: 'Functional Assessment', subtitle: 'FMS, Y-Balance, single-leg squat, hop battery, gait', icon: 'TrendingUp' },
  { id: 'outcomes', title: 'Outcome Measures', subtitle: 'Validated patient questionnaires (LEFS, QuickDASH, KOOS, ODI)', icon: 'Calculator' },
  { id: 'imaging', title: 'Imaging & Investigations', subtitle: 'X-Ray, MRI, CT, Musculoskeletal US & lab biomarker criteria', icon: 'Microscope' },
  { id: 'exercise_therapy', title: 'Exercise Therapy', subtitle: 'Progressive overload, isometric, eccentric & HSR dosing', icon: 'Activity' },
  { id: 'manual_therapy', title: 'Manual Therapy', subtitle: 'Maitland, Mulligan mobilization with movement, Kaltenborn', icon: 'Sparkles' },
  { id: 'orthopaedic_rehab', title: 'Orthopaedic Rehabilitation', subtitle: 'Conservative & prehab care for fractures, tears & arthritis', icon: 'Layers' },
  { id: 'neurological_rehab', title: 'Neurological Rehabilitation', subtitle: 'Stroke, Parkinson\'s, spinal cord, PNF, Bobath concepts', icon: 'Brain' },
  { id: 'cardiopulmonary', title: 'Cardiopulmonary Rehabilitation', subtitle: 'Chest physiotherapy, post-CABG, COPD & METs conditioning', icon: 'HeartPulse' },
  { id: 'sports_rehab', title: 'Sports Rehabilitation', subtitle: 'Criteria-based return-to-sport, agility & workload ACWR', icon: 'Trophy' },
  { id: 'paediatric', title: 'Paediatric Physiotherapy', subtitle: 'Cerebral palsy, CTEV clubfoot, torticollis, developmental', icon: 'GraduationCap' },
  { id: 'geriatric', title: 'Geriatric Rehabilitation', subtitle: 'Sarcopenia, fall prevention, balance, osteoporosis, TUG', icon: 'Users' },
  { id: 'postoperative', title: 'Postoperative Rehabilitation', subtitle: 'Arthroplasty, ligament reconstructions, tendon repairs', icon: 'FileText' },
  { id: 'evidence_practice', title: 'Evidence-Based Practice', subtitle: 'Cochrane reviews, Level I RCTs, CPGs & clinical audits', icon: 'ShieldCheck' },
];

export const MainHomepage: React.FC<MainHomepageProps> = ({
  onNavigate,
  onOpenConditionModal,
  onStartAssessment,
}) => {
  const { t } = useLanguage();
  const { currentRole, setRole } = useUserRole();

  // Search & Knowledge Hierarchy state
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedJointId, setSelectedJointId] = useState<string>('knee');
  const [selectedKnowledgePillar, setSelectedKnowledgePillar] = useState<string>('all');

  // Condition Modal state (30 standardized sections)
  const [activeConditionModal, setActiveConditionModal] = useState<any | null>(null);

  // Voluntary Doctor / PT Login & Profile Modal state
  const [showDoctorLoginModal, setShowDoctorLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [loginRoleSelected, setLoginRoleSelected] = useState<'doctor' | 'physiotherapist' | 'student'>('doctor');

  // Selected joint object
  const selectedJoint = useMemo(() => {
    return MAIN_14_JOINTS_DATA.find((j) => j.id === selectedJointId) || MAIN_14_JOINTS_DATA[0];
  }, [selectedJointId]);

  // Global search results across conditions, joints, and symptoms
  const searchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return null;
    const q = globalSearchQuery.toLowerCase().trim();

    // Check conditions
    const matchedConditions = ALL_JOINT_CONDITIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.joint.toLowerCase().includes(q) ||
        (c.clinicalPresentation && c.clinicalPresentation.toLowerCase().includes(q))
    ).slice(0, 8);

    // Check special tests
    const matchedTests = MASTER_SPECIAL_TESTS_LIBRARY.filter(
      (t) =>
        t.testName.toLowerCase().includes(q) ||
        t.joint.toLowerCase().includes(q) ||
        t.clinicalPurpose.toLowerCase().includes(q)
    ).slice(0, 4);

    // Differential diagnosis logic for symptom queries like "knee pain"
    const isSymptomQuery = q.includes('pain') || q.includes('stiff') || q.includes('swelling') || q.includes('instab');
    const differentialHints: string[] = [];
    if (q.includes('knee')) {
      differentialHints.push('ACL Injury', 'Meniscal Tear', 'Patellofemoral Pain (PFPS)', 'Knee Osteoarthritis', 'Patellar Tendinopathy');
    } else if (q.includes('shoulder')) {
      differentialHints.push('Rotator Cuff Tear', 'Subacromial Impingement', 'Adhesive Capsulitis', 'SLAP Lesion', 'AC Joint Sprain');
    } else if (q.includes('back') || q.includes('lumbar')) {
      differentialHints.push('L4-L5 Disc Herniation', 'Mechanical Low Back Pain', 'Lumbar Spinal Stenosis', 'Spondylolisthesis');
    }

    return {
      conditions: matchedConditions,
      tests: matchedTests,
      differentialHints,
      totalCount: matchedConditions.length + matchedTests.length,
    };
  }, [globalSearchQuery]);

  const handleOpenCondition = (conditionId: string) => {
    // Find in master database first or fallback to ALL_JOINT_CONDITIONS
    const foundMaster = MASTER_CONDITIONS_DATABASE.find((c) => c.id === conditionId || c.conditionName.toLowerCase().includes(conditionId.toLowerCase()));
    if (foundMaster) {
      setActiveConditionModal(foundMaster.clinicalContent);
      return;
    }
    const foundJointCondition = ALL_JOINT_CONDITIONS.find((c) => c.id === conditionId || c.name.toLowerCase().includes(conditionId.toLowerCase()));
    if (foundJointCondition) {
      setActiveConditionModal(foundJointCondition);
      return;
    }
    // Default open from first master condition
    setActiveConditionModal(MASTER_CONDITIONS_DATABASE[0].clinicalContent);
  };

  const scrollToEncyclopedia = () => {
    const el = document.getElementById('physio-encyclopedia-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('protocols');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* =========================================================================
          PART 1: HERO SECTION
          "Explore. Understand. Assess. Rehabilitate."
      ========================================================================= */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Clinical Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>Universal Clinical Physiotherapy Platform · Free Open Access</span>
            </div>

            {/* Main Required Heading */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Explore. Understand.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200">
                Assess. Rehabilitate.
              </span>
            </h1>

            {/* Required Subheading */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
              An integrated AI-powered clinical knowledge and physiotherapy platform designed for doctors, physiotherapists and healthcare students.
            </p>

            {/* Primary & Secondary Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToEncyclopedia}
                className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-5 h-5 text-slate-950" />
                <span>Explore Physio Encyclopedia</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowDoctorLoginModal(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base rounded-xl transition-all backdrop-blur-xs flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <UserCheck className="w-5 h-5 text-teal-400" />
                <span>Doctor / Physiotherapist Login</span>
              </button>
            </div>

            {/* Free Access Notice */}
            <p className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>The Encyclopedia is 100% open access. No registration or account required to browse.</span>
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-teal-300">14</div>
              <div className="text-xs text-slate-400 font-semibold mt-0.5">Anatomical Joint Complexes</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-teal-300">150+</div>
              <div className="text-xs text-slate-400 font-semibold mt-0.5">Clinical Conditions Cataloged</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-teal-300">30</div>
              <div className="text-xs text-slate-400 font-semibold mt-0.5">Standardized Dimensions / Page</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-teal-300">100%</div>
              <div className="text-xs text-slate-400 font-semibold mt-0.5">Evidence & CPG Traceable</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 2 – SECTION A: PHYSIO ENCYCLOPEDIA (PRIMARY PLATFORM)
          This must be the largest and most prominent section on the homepage.
      ========================================================================= */}
      <section id="physio-encyclopedia-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Primary Platform · Complete Clinical Knowledge Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Physio Encyclopedia
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A comprehensive, peer-reviewed clinical reference library for physiotherapy, orthopaedics, sports rehabilitation and medical specialties. Explore through multiple pathways.
          </p>
        </div>

        {/* Global Search Bar & Differential Finder */}
        <div className="max-w-3xl mx-auto relative">
          <div className="relative shadow-md rounded-2xl bg-white border-2 border-slate-200 focus-within:border-teal-600 transition-all">
            <div className="flex items-center px-4 py-3.5 gap-3">
              <Search className="w-5 h-5 text-teal-600 shrink-0" />
              <input
                type="text"
                placeholder="Search educational library: joints, conditions ('ACL', 'Frozen Shoulder'), anatomy, muscles, special tests, biomechanics, protocols..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              {globalSearchQuery && (
                <button
                  onClick={() => setGlobalSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick chips below input */}
            <div className="px-4 pb-3 flex flex-wrap items-center gap-1.5 text-xs border-t border-slate-100 pt-2.5">
              <span className="text-[11px] font-bold text-slate-400">Popular Reference Topics:</span>
              {[
                'ACL Rupture',
                'Rotator Cuff Tear',
                'Lumbar Disc L4-L5',
                'Adhesive Capsulitis',
                'Lachman Test',
                'TKR Rehab Protocol',
                'Achilles Tendinopathy',
                'PFPS Biomechanics',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setGlobalSearchQuery(chip)}
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Live Search Results Dropdown */}
          {searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
                <span>Search Results for &quot;{globalSearchQuery}&quot;</span>
                <span>{searchResults.totalCount} matches</span>
              </div>

              {/* Differential Hints */}
              {searchResults.differentialHints.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Differential Diagnostic Pathway for &quot;{globalSearchQuery}&quot;:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {searchResults.differentialHints.map((dh) => (
                      <button
                        key={dh}
                        onClick={() => handleOpenCondition(dh)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-950 font-bold text-xs hover:bg-amber-100 cursor-pointer"
                      >
                        {dh}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Conditions */}
              {searchResults.conditions.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Clinical Conditions ({searchResults.conditions.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.conditions.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleOpenCondition(c.id)}
                        className="p-3 rounded-xl hover:bg-teal-50/70 border border-transparent hover:border-teal-200 transition-all cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.joint} · {c.category}</div>
                        </div>
                        <span className="text-xs font-bold text-teal-700 flex items-center gap-1 shrink-0">
                          <span>30 Sections</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Special Tests */}
              {searchResults.tests.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Special Tests ({searchResults.tests.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.tests.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => onNavigate('student-hub')}
                        className="p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{st.testName}</div>
                          <div className="text-[11px] text-slate-500">{st.joint} · SN: {st.diagnosticAccuracy.sensitivity} · SP: {st.diagnosticAccuracy.specificity}</div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">View in Test Library →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6-LEVEL ACADEMIC HIERARCHY NAVIGATOR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[11px] font-black uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-teal-700" />
                  <span>Universal 6-Level Hierarchy</span>
                </span>
                <span className="text-xs font-semibold text-slate-400">Pure Educational Reference Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Specialty → Region → Joint → Category → Condition → Clinical Dossier
              </h3>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              Zero Pre-filled Patient Data · 100% Peer-Reviewed Evidence
            </div>
          </div>

          {/* Level 1: Medical & Physiotherapy Specialty Filter */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Level 1: Clinical Specialty
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Medical Specialties' },
                { id: 'msk_sports', label: 'Musculoskeletal & Sports PT' },
                { id: 'orthopaedic', label: 'Orthopaedics & Joint Arthroplasty' },
                { id: 'neuro', label: 'Neurology & Neuro-Rehabilitation' },
                { id: 'cardiopulmonary', label: 'Cardiopulmonary Physiotherapy' },
                { id: 'paediatric', label: 'Paediatrics & Adolescents' },
                { id: 'geriatric', label: 'Geriatrics & Frailty Care' },
              ].map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSpecialty === spec.id
                      ? 'bg-slate-900 text-teal-300 shadow-xs ring-2 ring-teal-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level 2: Anatomical Region Filter */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Level 2: Anatomical Region
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Regions' },
                { id: 'lower_limb', label: 'Lower Extremity Complex' },
                { id: 'upper_limb', label: 'Upper Extremity Complex' },
                { id: 'spine', label: 'Spine & Pelvis Complex' },
                { id: 'cranio_cervical', label: 'Cranio-Cervical & TMJ' },
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRegion === reg.id
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>

          {/* 12 Clinical Knowledge Pillars Toolbar */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Core Clinical Knowledge Exploration Pillars (12 Pathways):
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Pillars' },
                { id: 'joint', label: '1. Joint-Wise' },
                { id: 'condition', label: '2. Condition-Wise' },
                { id: 'anatomy', label: '3. Anatomy' },
                { id: 'biomechanics', label: '4. Biomechanics' },
                { id: 'pathomechanics', label: '5. Pathomechanics' },
                { id: 'muscle_function', label: '6. Muscle Function' },
                { id: 'clinical_exam', label: '7. Clinical Examination' },
                { id: 'special_tests', label: '8. Special Tests Library' },
                { id: 'functional', label: '9. Functional Assessment' },
                { id: 'investigations', label: '10. Investigations' },
                { id: 'management', label: '11. 3-Tier Management' },
                { id: 'protocols', label: '12. Phased Protocols' },
              ].map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedKnowledgePillar(pillar.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedKnowledgePillar === pillar.id
                      ? 'bg-teal-600 text-white font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {pillar.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Level 3: JOINT-WISE CLASSIFICATION (14 Anatomical Regions) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Level 3: Joint-Wise Classification</h3>
              <p className="text-xs text-slate-500">Select any joint complex to reveal categorized clinical conditions and pathology</p>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              14 Joint Complexes Available
            </span>
          </div>

          {/* Joint Pills / Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {MAIN_14_JOINTS_DATA.map((j) => {
              const isSelected = selectedJointId === j.id;
              return (
                <button
                  key={j.id}
                  onClick={() => setSelectedJointId(j.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {j.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-teal-200' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {j.conditionCount}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-snug">{j.name}</h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. CONDITION-WISE CLASSIFICATION (Under Selected Joint) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-900">
                  {selectedJoint.name}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">{selectedJoint.subtitle}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Level 4 & 5: Condition Category & Conditions
              </h3>
            </div>

            <button
              onClick={() => onNavigate('protocols')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3.5 py-2 rounded-xl border border-teal-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Explore 3-Level Drill-Down</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Condition Categories */}
          <div className="space-y-6">
            {selectedJoint.categories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span>{cat.name} ({cat.conditions.length})</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.conditions.map((cond) => (
                    <div
                      key={cond.id}
                      onClick={() => handleOpenCondition(cond.id)}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-sm transition-all bg-slate-50/60 hover:bg-white cursor-pointer flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-sm text-slate-900">{cond.name}</h5>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              cond.acuity === 'acute'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : cond.acuity === 'chronic'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-teal-50 text-teal-800 border border-teal-200'
                            }`}
                          >
                            {cond.acuity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{cond.brief}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span className="text-teal-800 font-bold">30 Clinical Sections</span>
                        <span className="flex items-center gap-1 text-teal-700 font-bold">
                          <span>Open Full Page</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. OTHER ENCYCLOPEDIA NAVIGATION CATEGORIES (18 Dimensions) */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900">4. Additional Clinical Encyclopedia Modules</h3>
              <p className="text-xs text-slate-500">Direct navigation pathways across biomechanics, investigations, special tests & specialties</p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              18 Specialised Domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {OTHER_ENCYCLOPEDIA_CATEGORIES.map((mod) => (
              <div
                key={mod.id}
                onClick={() => {
                  if (mod.id === 'special_tests') onNavigate('student-hub');
                  else if (mod.id === 'outcomes') onNavigate('outcomes');
                  else if (mod.id === 'biomechanics') onNavigate('biomechanics');
                  else if (mod.id === 'sports_rehab') onNavigate('athlete');
                  else if (mod.id === 'imaging') onNavigate('investigations');
                  else onNavigate('protocols');
                }}
                className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-sm transition-all bg-white hover:bg-slate-50 cursor-pointer flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-slate-900 leading-snug">{mod.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{mod.subtitle}</p>
                </div>
                <div className="flex items-center justify-end text-teal-700 text-xs font-bold pt-1">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 2 – SECTION B: DOCTOR / PHYSIOTHERAPIST PROFILE (OPTIONAL WORKSPACE)
          Profile creation is OPTIONAL. Personalized workspace for clinicians.
      ========================================================================= */}
      <section className="bg-slate-100/80 border-t border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-extrabold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Optional Personalized Clinical Workspace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Doctor & Physiotherapist Profile Management
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Voluntary professional workspace for registered medical doctors, orthopaedic surgeons, and physiotherapists to manage authorized patient records, conduct clinical assessments, and securely store private clinical notes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('doctor-dashboard')}
                className="w-full sm:w-auto px-5 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-teal-300" />
                <span>Open Doctor Workspace (Dr. Darpan)</span>
              </button>

              <button
                onClick={() => onNavigate('private-registry')}
                className="w-full sm:w-auto px-5 py-3 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-700" />
                <span>Private Patient Registry 🔒</span>
              </button>
            </div>
          </div>

          {/* Active Profile Card & Personalized Gateway Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dr. Darpan Vanavi Profile Summary Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-teal-400 font-extrabold text-2xl flex items-center justify-center shrink-0 border border-slate-800 shadow-sm">
                  DV
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Active Clinical Practitioner
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{INITIAL_DOCTOR.fullName}</h3>
                  <p className="text-xs font-semibold text-teal-800">{INITIAL_DOCTOR.designation}</p>
                  <p className="text-[11px] text-slate-500">{INITIAL_DOCTOR.qualification}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{INITIAL_DOCTOR.workingLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{INITIAL_DOCTOR.hospitalClinicName || 'Vanavi Physiotherapy Clinic'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Practice Status: <strong className="text-slate-700">Active Practitioner</strong></span>
                <button
                  onClick={() => onNavigate('doctor-dashboard')}
                  className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Personalized Dashboard Feature Gateways */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: 'Authorized Records', desc: 'Personalized patient management workspace', view: 'doctor-dashboard', icon: 'Users' },
                { title: 'Patient Assessment', desc: 'Full 3-Tier diagnostic format & guided wizard', view: 'assessment-format', icon: 'FileText' },
                { title: 'Private Vault 🔒', desc: 'Personal PIN-protected confidential patient records', view: 'private-registry', icon: 'Lock' },
                { title: 'AI Motion & Gait', desc: '8-phase gait analysis, cadence & asymmetry index', view: 'motion', icon: 'Camera' },
                { title: 'Postural Analysis', desc: '4-view plumb line postural assessment', view: 'posture', icon: 'Activity' },
                { title: 'Joint Biomechanics', desc: 'Kinematics, kinetics & muscle moment arms', view: 'biomechanics', icon: 'Compass' },
                { title: 'Outcome Measures', desc: 'LEFS, QuickDASH, Berg Balance, TUG calculators', view: 'outcomes', icon: 'Calculator' },
                { title: 'Patient Progress', desc: 'Longitudinal charts from initial visit to discharge', view: 'progress', icon: 'TrendingUp' },
                { title: 'Sports & Athlete Hub', desc: 'Testing battery for Cricket, Kabaddi & Football', view: 'athlete', icon: 'Trophy' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate(item.view as AppView)}
                  className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-teal-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-2"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-end text-teal-700 text-xs font-bold pt-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 3: STANDARDIZED 30-SECTION CONDITION MODAL (FULL CLINICAL DEPTH)
      ========================================================================= */}
      {activeConditionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900">
                    Comprehensive 30-Section Clinical Dossier
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Peer-Reviewed CPG
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeConditionModal.conditionName || activeConditionModal.name}
                </h2>
                <p className="text-xs text-slate-600">
                  {activeConditionModal.definition || activeConditionModal.clinicalPresentation}
                </p>
              </div>

              <button
                onClick={() => setActiveConditionModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 30 Sections Display in Organized Tabbed Layout */}
            <div className="space-y-6 text-xs text-slate-700">
              {/* Sections 1-4: Definition & Anatomy */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>1–4. Anatomy, Definition & Involved Structures</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="font-bold text-slate-700 block">Anatomical Structures Involved:</span>
                    <span>{(activeConditionModal.anatomicalStructuresInvolved || ['Ligamentous, capsular & muscular complex']).join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Relevant Functional Anatomy:</span>
                    <span>{activeConditionModal.relevantAnatomy || 'Detailed joint kinematics & articular stability'}</span>
                  </div>
                </div>
              </div>

              {/* Sections 5-11: Biomechanics, Pathomechanics & Muscle Function */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span>5–11. Etiology, Biomechanics, Pathomechanics & Muscle Groups</span>
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-slate-700 block">Mechanism of Injury:</span>
                    <p className="text-slate-600">{activeConditionModal.mechanismOfInjury || activeConditionModal.clinicalPresentation}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="font-bold text-slate-700 block">Normal Biomechanics:</span>
                      <p className="text-slate-600">{activeConditionModal.biomechanics || 'Articular gliding, rolling & rotational constraints'}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">Pathomechanics:</span>
                      <p className="text-slate-600">{activeConditionModal.pathomechanics || 'Abnormal shear translation & joint overload'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections 12-20: Clinical Exam, Special Tests & Investigations */}
              <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-2xl space-y-3">
                <h4 className="font-bold text-teal-950 text-sm flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  <span>12–20. Clinical Presentation, Special Tests & Diagnostic Imaging</span>
                </h4>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Validated Bedside Special Tests:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(activeConditionModal.specialTests || activeConditionModal.bedsideAssessmentTests || [
                      { testName: 'Anterior Drawer / Lachman', sensitivity: '85%', specificity: '94%', positiveCriteria: 'Laxity without firm end-feel' },
                    ]).map((t: any, idx: number) => (
                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-teal-200/70 text-[11px] space-y-0.5">
                        <div className="font-bold text-slate-900">{t.testName}</div>
                        <div className="text-slate-500">SN: {t.sensitivity} · SP: {t.specificity}</div>
                        <div className="text-teal-900 font-medium">{t.positiveCriteria || t.techniqueAndInterpretation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections 24-28: Phased Physiotherapy & Exercise Prescription */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
                <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span>24–28. Evidence-Based Physiotherapy Protocol & Dosing</span>
                </h4>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Criteria-Based Rehabilitation Phases:</span>
                  <div className="space-y-2">
                    {(activeConditionModal.rehabilitationProtocolPhases || activeConditionModal.physiotherapyProtocol?.phases || [
                      { phaseNumber: 1, phaseName: 'Protection & Effusion Control', timeline: 'Weeks 0–2', milestoneCriteria: '0° extension, minimal swelling' },
                      { phaseNumber: 2, phaseName: 'Strength & Neuromuscular Training', timeline: 'Weeks 2–8', milestoneCriteria: 'Quad LSI > 80%' },
                      { phaseNumber: 3, phaseName: 'Return to Running & Sport', timeline: 'Month 3–9', milestoneCriteria: 'Hop test LSI >= 90%' },
                    ]).map((ph: any, idx: number) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-emerald-200/80 space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{ph.phaseName}</span>
                          <span className="text-[11px] text-emerald-800 font-mono">{ph.timeline}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Milestone Criteria:</strong> {ph.milestoneCriteria || ph.clinicalGoals?.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections 29-30: Outcome Measures & Research References */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-[11px]">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  29–30. Validated Outcome Measures & Research Citations
                </h4>
                <p className="text-slate-600">
                  MCID-validated instruments: IKDC, KOOS, QuickDASH, LEFS, NPRS. Aligned with JOSPT, AAOS, and Cochrane Clinical Practice Guidelines.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveConditionModal(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveConditionModal(null);
                  onNavigate('protocols');
                }}
                className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>View Interactive Protocol Library</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VOLUNTARY DOCTOR / PT LOGIN & REGISTRATION MODAL
          Free optional workspace access - not forced
      ========================================================================= */}
      {showDoctorLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Optional Clinician Access
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Doctor / Physiotherapist Login</h3>
              </div>
              <button
                onClick={() => setShowDoctorLoginModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Sign in to access your authorized patient dashboard, private records vault, clinical assessments and custom treatment reports.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setRole('doctor');
                  setShowDoctorLoginModal(false);
                  onNavigate('doctor-dashboard');
                }}
                className="w-full p-3.5 rounded-xl border border-teal-300 bg-teal-50/60 hover:bg-teal-100/70 transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-800 text-teal-200 font-extrabold text-sm flex items-center justify-center">
                    DV
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Sign In as Dr. Darpan Vanavi</div>
                    <div className="text-[11px] text-teal-800 font-medium">BPT, MPT · Vadodara, Gujarat (Active)</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-800" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('physiotherapist');
                  setShowDoctorLoginModal(false);
                  onNavigate('assessment-format');
                }}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900 text-indigo-200 font-extrabold text-sm flex items-center justify-center">
                    PT
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Consultant Physiotherapist Workspace</div>
                    <div className="text-[11px] text-slate-500">Objective Exam, ROM/MMT & Protocols</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>Strict Patient Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800/90">
                Personal patient records are encrypted and isolated in the Private Patient Registry. No patient data is ever displayed on the public encyclopedia.
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => {
                  setShowDoctorLoginModal(false);
                  scrollToEncyclopedia();
                }}
                className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Continue as Guest / Student →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
