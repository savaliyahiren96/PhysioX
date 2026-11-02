export interface AnonymizedCaseStudy {
  id: string;
  caseTitle: string;
  targetJoint: string;
  academicLevel: 'BPT 3rd/4th Year' | 'MPT Musculoskeletal' | 'MPT Sports' | 'MPT Neuro';
  patientProfileSummary: {
    demographics: string;
    chiefComplaint: string;
    onsetTimeCourse: string;
    mechanism: string;
  };
  clinicalFindings: {
    observation: string;
    activeRom: string;
    specialTests: string[];
    imagingResults: string;
  };
  studentQuestions: {
    questionText: string;
    options: string[];
    correctIndex: number;
    clinicalExplanation: string;
    referenceGuideline: string;
  }[];
  masterClinicianDiscussion: string;
}

export interface ClinicalTerminologyCard {
  term: string;
  phoneticPronunciation: string;
  clinicalDefinition: string;
  anatomicalContext: string;
  clinicalSignificance: string;
  commonPitfallOrMisconception: string;
}

export interface AcademicVivaQuizItem {
  id: string;
  topic: string;
  joint: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  detailedRationale: string;
  evidenceSource: string;
}

export const ANONYMIZED_CASE_STUDIES: AnonymizedCaseStudy[] = [
  {
    id: 'CASE-BPT-001',
    caseTitle: 'Educational Case 1: Acute Non-Contact Knee Injury in a 21-Year-Old Collegiate Basketball Athlete',
    targetJoint: 'Knee',
    academicLevel: 'BPT 3rd/4th Year',
    patientProfileSummary: {
      demographics: '21-year-old female collegiate basketball player (Anonymized Educational Case).',
      chiefComplaint: 'Acute right knee swelling, pain, and instability after single-leg landing.',
      onsetTimeCourse: 'Acute (< 6 hours post-injury on court).',
      mechanism: 'Non-contact deceleration landing with trunk lateral lean and knee dynamic valgus.',
    },
    clinicalFindings: {
      observation: 'Tense knee effusion developing within 90 minutes; held in 25° antalgic flexion.',
      activeRom: 'Active flexion 0°-80° limited by joint fullness; extension lag 10° due to effusion.',
      specialTests: [
        'Lachman Test: Positive (> 4mm anterior tibial translation with soft end-feel)',
        'Pivot Shift Test: Guarded awake / positive subtle subluxation',
        'McMurray Test: Negative for audible click',
        'Valgus Stress at 30°: Grade 1 laxity with firm endpoint',
      ],
      imagingResults: 'Radiographs normal (no Segond fracture); 3.0T MRI reveals complete mid-substance ACL tear with lateral femoral notch kissing contusion.',
    },
    studentQuestions: [
      {
        questionText: 'What is the primary anatomical explanation for why rapid hemarthrosis within 2 hours is strongly predictive of an ACL tear?',
        options: [
          'Synovial lining rupture creates clear transudate fluid',
          'Middle genicular artery branches traversing within the ACL sheath are torn upon disruption',
          'Popliteal vein rupture occurs in isolated ACL tears',
          'Femoral artery branches are compressed by the patella',
        ],
        correctIndex: 1,
        clinicalExplanation: 'The ACL receives vascular supply primarily via the middle genicular artery; acute disruption ruptures these endoligamentous vessels, causing rapid, tense hemarthrosis in > 70% of traumatic knee hemarthroses.',
        referenceGuideline: 'AAOS Clinical Practice Guideline on ACL Injuries (2022)',
      },
      {
        questionText: 'Which exercise should be strictly avoided in early post-injury or early post-operative ACL rehabilitation?',
        options: [
          'Seated open kinetic chain knee extensions from 45° to 0° with ankle weights',
          'Prone heel hangs for extension restoration',
          'Isometric quadriceps co-contraction with hamstrings at 60° flexion',
          'Stationary cycling with high seat height',
        ],
        correctIndex: 0,
        clinicalExplanation: 'Open-chain knee extension from 45° to 0° produces maximum anterior tibial shear forces and peak ACL graft strain, risking mechanical stretching or anchor failure in early healing.',
        referenceGuideline: 'van Melick et al. (2016) Evidence-based clinical practice update on ACL rehabilitation.',
      },
    ],
    masterClinicianDiscussion: 'Key learning point: Always restore symmetric 0° passive extension first. Extension deficit > 3° leads to persistent quadriceps inhibition, abnormal gait kinetics, and patellofemoral arthrofibrosis.',
  },
  {
    id: 'CASE-MPT-002',
    caseTitle: 'Educational Case 2: 48-Year-Old Desk Worker with Unilateral S1 Radiculopathy and Foot Paresthesia',
    targetJoint: 'Lumbar Spine & Pelvis',
    academicLevel: 'MPT Musculoskeletal',
    patientProfileSummary: {
      demographics: '48-year-old male IT software architect (Anonymized Educational Case).',
      chiefComplaint: 'Right gluteal and posterior calf pain radiating to lateral foot and 5th toe.',
      onsetTimeCourse: 'Subacute (4 weeks duration, worsening with prolonged sitting).',
      mechanism: 'Insidious onset following 12-hour coding marathon with slumped sitting posture.',
    },
    clinicalFindings: {
      observation: 'Loss of lumbar lordosis, subtle sciatic trunk list to the left (contralateral list).',
      activeRom: 'Lumbar flexion limited to 35° (reproduces sharp calf pain); extension centralizes pain to buttock.',
      specialTests: [
        'Straight Leg Raise (Right): Positive at 35° with reproduction of lateral foot tingling',
        'Bragard Sign: Positive (ankle dorsiflexion intensifies radicular pain)',
        'Crossed Straight Leg Raise: Positive at 50° on asymptomatic left leg',
        'Achilles Reflex (Right): Diminished (1+ vs 2+ on left)',
        'Extensor Hallucis Longus (L5): 5/5 MMT; Gastrocnemius/Soleus (S1): 4/5 MMT',
      ],
      imagingResults: 'Lumbar MRI STIR/T2 demonstrates 7mm right paracentral/subarticular disc extrusion at L5-S1 compressing the traversing S1 nerve root.',
    },
    studentQuestions: [
      {
        questionText: 'Why is the Crossed Straight Leg Raise (Well Leg Raise) considered clinically significant?',
        options: [
          'It has high sensitivity (90%) for disc bulge',
          'It has high specificity (~88-90%) strongly pointing to a disc extrusion or large sequestration',
          'It tests the femoral nerve rather than the sciatic nerve',
          'It indicates hamstring tightness on the asymptomatic side',
        ],
        correctIndex: 1,
        clinicalExplanation: 'A positive Crossed SLR has modest sensitivity (~29%) but high specificity (88-90%), serving as a pathognomonic clinical sign for large extruded disc herniation pulling the thecal sac.',
        referenceGuideline: 'NICE Guideline NG59 (2020) Low back pain and sciatica',
      },
    ],
    masterClinicianDiscussion: 'Directional preference must be assessed early. When prone extensions centralize radiating leg symptoms back toward the lumbar midline, it indicates an intact outer annular constraint and favorable conservative prognosis.',
  },
];

export const CLINICAL_TERMINOLOGY_GLOSSARY: ClinicalTerminologyCard[] = [
  {
    term: 'Arthrogenic Muscle Inhibition (AMI)',
    phoneticPronunciation: '/ɑːrθroʊˈdʒɛnɪk ˈmʌsəl ɪnhɪˈbɪʃən/',
    clinicalDefinition: 'An ongoing reflex inhibition of uninjured musculature surrounding a joint following joint injury, distension, effusion, or inflammation, mediated by spinal reflex arcs.',
    anatomicalContext: 'Most prominent in the vastus medialis oblique (VMO) and quadriceps complex following knee effusion (as little as 20-30 mL of fluid triggers inhibition).',
    clinicalSignificance: 'Cannot be overcome by voluntary effort alone; requires neuromuscular electrical stimulation (NMES), cryotherapy, or joint effusion aspiration to restore neural drive.',
    commonPitfallOrMisconception: 'Mistaking AMI for structural muscle atrophy or lack of patient effort.',
  },
  {
    term: 'Directional Preference & Centralization',
    phoneticPronunciation: '/dɪˈrɛkʃənəl ˈprɛfərəns/',
    clinicalDefinition: 'The phenomenon where repeated end-range spinal movements or sustained postures cause radiating distal pain to retreat sequentially toward the spinal midline (centralization).',
    anatomicalContext: 'Intervertebral disc displacement (McKenzie Mechanical Diagnosis & Therapy system).',
    clinicalSignificance: 'Centralization during initial evaluation is one of the strongest favorable prognostic indicators for non-operative recovery in lumbar and cervical radiculopathy.',
    commonPitfallOrMisconception: 'Stopping extension exercises because lumbar pain increases, even when radiating leg pain is abolishing (centralizing).',
  },
  {
    term: 'Force Couple (Glenohumeral & Scapular)',
    phoneticPronunciation: '/fɔːrs ˈkʌpəl/',
    clinicalDefinition: 'Two equal and opposite parallel forces whose lines of action do not coincide, acting together to produce joint rotation around an axis.',
    anatomicalContext: 'Shoulder: Deltoid pulling superiorly balanced by Subscapularis and Infraspinatus pulling inferiorly/medially into the glenoid.',
    clinicalSignificance: 'Loss of the rotator cuff force couple allows unchecked deltoid superior shear, producing subacromial impingement and superior humeral migration.',
    commonPitfallOrMisconception: 'Strengthening the deltoid in rotator cuff tears without first restoring the depressor rotator cuff force couple.',
  },
  {
    term: 'Pathognomonic Sign',
    phoneticPronunciation: '/ˌpæθəɡnəˈmɒnɪk saɪn/',
    clinicalDefinition: 'A specific sign whose presence means that a particular disease or injury is present beyond any clinical doubt (specificity approaching 100%).',
    anatomicalContext: 'e.g., Segond fracture for ACL rupture; Thompson calf squeeze absence for complete Achilles rupture; Sulcus sign for multidirectional shoulder instability.',
    clinicalSignificance: 'Instantly narrows differential diagnosis to confirmed diagnostic reality.',
    commonPitfallOrMisconception: 'Assuming that absence of a pathognomonic sign rules out the condition (high specificity does not guarantee high sensitivity).',
  },
];

export const ACADEMIC_VIVA_QUIZ: AcademicVivaQuizItem[] = [
  {
    id: 'QUIZ-01',
    topic: 'Knee Biomechanics & Special Tests',
    joint: 'Knee',
    question: 'Why is the Lachman test performed at 20°-30° of knee flexion rather than 90° flexion like the anterior drawer test?',
    options: [
      'The quadriceps muscle is on maximal stretch at 30° flexion',
      'At 90° flexion, the posterior horn of the medial meniscus wedges against the femoral condyle, creating a false-negative firm end-feel',
      'The popliteus tendon tears if tested at 90° flexion',
      'The patella blocks anterior tibial translation at 30° flexion',
    ],
    correctOptionIndex: 1,
    detailedRationale: 'In 90° knee flexion, the posterior horn of the medial meniscus can wedge against the medial femoral condyle (meniscal wedge effect), resisting anterior translation even in complete ACL tears. At 20°-30° flexion, the meniscal block is disengaged and secondary restraints are relaxed, yielding high sensitivity (85%) and specificity (94%).',
    evidenceSource: 'AAOS Clinical Practice Guideline on ACL Injuries (2022); Benjaminse et al. JOSPT (2006)',
  },
  {
    id: 'QUIZ-02',
    topic: 'Shoulder Biomechanics & Scapular Rhythm',
    joint: 'Shoulder',
    question: 'What is the normal scapulohumeral rhythm during full active arm abduction from 0° to 180°?',
    options: [
      '1:1 ratio throughout the entire range',
      'Overall 2:1 ratio (120° glenohumeral movement to 60° scapulothoracic upward rotation)',
      '3:1 ratio with scapula moving only after 120°',
      '4:1 ratio with no clavicular rotation',
    ],
    correctOptionIndex: 1,
    detailedRationale: 'In normal kinematics (Codman & Inman studies), full 180° elevation consists of approximately 120° of glenohumeral motion and 60° of scapulothoracic upward rotation (overall 2:1 ratio). In the initial 0°-30° "setting phase", motion is primarily glenohumeral.',
    evidenceSource: 'Neer CS. Shoulder Reconstruction; Kibler WB. Scapular Dyskinesis Guidelines JAAOS.',
  },
  {
    id: 'QUIZ-03',
    topic: 'Spine Neurological Examination',
    joint: 'Lumbar Spine & Pelvis',
    question: 'A patient presents with numbness along the lateral aspect of the foot, decreased ankle jerk reflex, and weakness on single-leg heel raise. Which spinal nerve root is compromised?',
    options: [
      'L3 Nerve Root',
      'L4 Nerve Root',
      'L5 Nerve Root',
      'S1 Nerve Root',
    ],
    correctOptionIndex: 3,
    detailedRationale: 'The S1 nerve root supplies sensation to the lateral border of the foot and plantar aspect of the heel, motor innervation to Gastrocnemius/Soleus (ankle plantarflexion), and mediates the Achilles deep tendon reflex. L5 compression causes 1st webspace numbness, normal Achilles reflex, and Extensor Hallucis Longus weakness.',
    evidenceSource: 'Hoppenfeld S. Physical Examination of the Spine and Extremities; NICE NG59.',
  },
];
