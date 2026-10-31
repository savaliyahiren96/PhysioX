import { JointConditionMaster } from '../../types/clinical';

export const KNEE_CONDITIONS: JointConditionMaster[] = [
  // 1. ACL Rupture
  {
    id: 'knee-acl-rupture',
    joint: 'Knee',
    name: 'Anterior Cruciate Ligament (ACL) Rupture',
    category: 'Ligamentous Instability',
    tissue_group: 'soft',
    tissue_types: ['Ligament'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Gross knee dislocation with absent distal pedal pulses (Popliteal artery injury emergency)',
      'Peroneal nerve palsy (Foot drop / numbness in 1st dorsal webspace)',
      'Inability to bear weight with acute tense hemarthrosis within 1 hour (rule out tibial plateau fracture)',
    ],
    when_to_refer: [
      'Immediate orthopaedic consultation for surgical reconstruction decision in young competitive athletes',
      'Presence of locked knee indicative of concomitant bucket-handle meniscal tear',
      'Multi-ligament knee injury (ACL + PCL + PLC) requiring emergency stabilization',
    ],
    outcome_measures: [
      { name: 'IKDC Subjective Knee Evaluation', mcid: '11.5 points', target: '>= 85/100' },
      { name: 'ACL-RSI (Return to Sport)', mcid: '10 points', target: '>= 75%' },
      { name: 'Single-Leg Hop Test Battery', mcid: 'LSI >= 90%', target: '>= 90% limb symmetry' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-15',
    teaching_notes: {
      clinicalReasoning: 'Lachman test is superior to Anterior Drawer because 30° flexion avoids meniscal wedging and posterior horn blocking. Hemarthrosis within 2 hours indicates intra-articular vascular disruption (ACL tear in 70% of cases).',
      vivaQuestions: [
        {
          question: 'Why is open-kinetic-chain knee extension contraindicated between 0° and 45° in early ACL rehab?',
          answer: 'Seated leg extensions from 45° to 0° create maximum anterior tibial shear strain and peak ACL graft stress, risking elongation or failure of the healing graft.',
        },
        {
          question: 'What constitutes the classic Segond fracture and why is it pathognomonic?',
          answer: 'An avulsion fracture of the lateral tibial plateau at the attachment of the anterolateral ligament (ALL), indicating severe rotational trauma associated with ACL rupture in > 90% of cases.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Acute knee injury following deceleration, jump landing, or pivoting mechanism. Audible/palpable "pop", acute hemarthrosis developing within 0–2 hours, inability to continue sport, and rotational instability episodes ("giving way").',
    bedsideAssessmentTests: [
      {
        testName: 'Lachman Test (30° flexion)',
        sensitivity: '85% (95% CI: 81–89%)',
        specificity: '94% (95% CI: 91–97%)',
        positiveLikelihoodRatio: '14.2',
        techniqueAndInterpretation: 'Tibia translated anteriorly with knee at 30° flexion while stabilizing femur. Positive if > 3mm anterior translation vs contralateral side and soft or absent end-feel.',
        evidenceCitation: 'AAOS Clinical Practice Guideline on ACL Injuries (2022); Benjaminse et al. JOSPT.',
        doi: '10.2519/jospt.2006.36.5.267',
      },
      {
        testName: 'Pivot-Shift Test',
        sensitivity: '24% (awake) / 75% (relaxed/anesthesia)',
        specificity: '98% (95% CI: 96–99%)',
        positiveLikelihoodRatio: '12.0',
        techniqueAndInterpretation: 'Valgus load and internal rotation applied from full extension to 40° flexion. Positive if sudden anterior subluxation and reduction of lateral tibial plateau occurs.',
        evidenceCitation: 'Solomon et al. JAMA Rational Clinical Examination.',
        doi: '10.1001/jama.286.13.1610',
      },
      {
        testName: 'Anterior Drawer Test (90° flexion)',
        sensitivity: '55%',
        specificity: '92%',
        techniqueAndInterpretation: 'Tibia drawn anteriorly with knee at 90° flexion and hamstrings relaxed. Less sensitive than Lachman due to meniscal wedge blocking.',
        evidenceCitation: 'van Eck et al. Arthroscopy.',
        doi: '10.1016/j.arthro.2013.07.269',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing 3-view + Rosenberg view',
        indications: 'Screening for Segond fracture (lateral capsular avulsion; pathognomonic), tibial spine avulsion, or osteochondral injury per Ottawa Knee Rules.',
        keyFindings: 'Segond fracture avulsion at lateral tibial margin, lateral femoral notch sign > 1.8mm.',
        accuracyOrYield: 'Rules out gross bony fracture before soft-tissue evaluation.',
      },
      {
        modality: 'Magnetic Resonance Imaging (MRI)',
        description: 'High-resolution 3.0T multiplanar MRI',
        indications: 'Gold-standard non-invasive diagnostic imaging for primary ACL discontinuity, associated meniscal tears (60–75%), and bone contusions.',
        keyFindings: 'Discontinuous fibers, hyperintense fluid signal replacing low-signal ligament, kiss contusions of lateral femoral condyle and lateral tibial plateau.',
        accuracyOrYield: 'Sensitivity 95%, Specificity 98%.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Standing Cone-Beam CT (CBCT) for Dynamic Rotational Instability',
        description: 'Weight-bearing 3D cone-beam computed tomography quantifies dynamic tibiofemoral rotational subluxation under axial physiologic loads, identifying anterolateral complex deficiency.',
        readinessLevel: 'Emerging Guideline Option',
        journalPaper: {
          title: 'Standing Weight-Bearing Cone-Beam CT in Athletes: Quantifying Dynamic Tibiofemoral Rotational Subluxation Following ACL Disruption',
          authors: 'Kvist J, Feller JA, Webster KE, et al.',
          journal: 'American Journal of Sports Medicine',
          year: 2025,
          doi: '10.1177/03635465241289012',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Phased criteria-driven rehabilitation prioritizing immediate extension restoration (0°), quadriceps reflex inhibition reversal via high-intensity NMES, progressive neuromuscular control, and rigorous return-to-sport testing.',
      guidelineBasis: 'AAOS Clinical Practice Guideline on ACL Injuries (2022); Delaware-Oslo ACL Cohort Protocols (2024)',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Acute Protection, Effusion Control & Extension Restoration',
          timeline: 'Weeks 0–2 post-injury / post-op',
          clinicalGoals: [
            'Attain full symmetric passive knee extension (0°) immediately',
            'Reduce knee effusion to trace or 0 on modified stroke test',
            'Overcome arthrogenic quadriceps inhibition; achieve straight leg raise without extensor lag',
          ],
          exercisePrescription: [
            { category: 'ROM', exerciseName: 'Prone Hang with 2kg Ankle Cuff', dosage: '3 x 10 mins daily', clinicalRationale: 'Low-load prolonged stretch to eradicate terminal extension deficit.' },
            { category: 'Neuromuscular', exerciseName: 'High-Intensity NMES on VMO (50Hz, 300µs, 1:3 duty)', dosage: '15 mins, 3x/week with isometric sets', clinicalRationale: 'Overcomes spinal reflex inhibition and restores motor unit recruitment.' },
            { category: 'Mobility', exerciseName: 'Patellar Glides (Superior, Inferior, Medial)', dosage: '30 reps, 3x daily', clinicalRationale: 'Prevents patella baja and infrapatellar fat pad contracture.' },
          ],
          progressionCriteria: [
            'Zero extensor lag during active Straight Leg Raise (SLR)',
            'Full passive extension matching contralateral side (0°)',
            'Effusion <= 1+ on modified stroke test',
          ],
          precautionsAndContraindications: [
            'No pillow under popliteal fossa in bed',
            'No resisted open-kinetic-chain knee extensions 0–45°',
          ],
        },
        {
          phaseNumber: 2,
          phaseName: 'Early Loading, Gait Normalization & Closed-Chain Strength',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Full knee flexion >= 120°', 'Normal symmetrical gait without crutches', 'Bilateral closed-chain leg press and mini-squats'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Closed-Kinetic-Chain Leg Press (0–60°)', dosage: '3 sets of 12 reps, 70% 1RM', clinicalRationale: 'Promotes co-contraction of hamstrings and quads minimizing anterior shear.' },
            { category: 'Gait', exerciseName: 'Retro-Walking (Backward Treadmill Walking at 1.5 km/h)', dosage: '10 mins daily', clinicalRationale: 'Facilitates active terminal extension and quadriceps firing in stance.' },
          ],
          progressionCriteria: ['Flexion >= 125°', 'Symmetrical heel-to-toe gait without walking aids', 'Single-leg balance > 20s'],
          precautionsAndContraindications: ['Monitor effusion closely; reduce volume if effusion spikes to 2+'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Neuromuscular Control, Hypertrophy & Straight-Line Running',
          timeline: 'Weeks 6–16',
          clinicalGoals: ['Quadriceps Limb Symmetry Index (LSI) >= 70%', 'Initiate graded outdoor straight-line running', 'Master single-leg landing mechanics'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Barbell Romanian Deadlifts & Bulgarian Split Squats', dosage: '4 sets of 8 reps, 75% 1RM', clinicalRationale: 'Posterior chain eccentric hypertrophy to protect ACL.' },
            { category: 'Plyometrics', exerciseName: 'Bilateral Box Drop Landings with Video Feedback', dosage: '3 sets of 8 landings', clinicalRationale: 'Eradicates dynamic knee valgus collapse.' },
          ],
          progressionCriteria: ['Quadriceps LSI >= 75% on handheld dynamometry', 'Pain-free 10-minute continuous jog', 'Y-Balance composite >= 90%'],
          precautionsAndContraindications: ['No uncontrolled cutting or pivoting on planted foot during Weeks 6–12 graft necrosis phase'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Sport (RTS) Decision Battery & Reactive Agility',
          timeline: 'Months 6–12',
          clinicalGoals: ['LSI >= 90% on all 4 hop tests', 'ACL-RSI psychological readiness score >= 75%', 'Full unrestricted return to competitive contact sport'],
          exercisePrescription: [
            { category: 'Agility', exerciseName: 'Reactive Y-Drill & T-Test with Unanticipated Stimulus', dosage: '5 reps each direction', clinicalRationale: 'Restores rapid visual-motor reaction time.' },
            { category: 'Sports', exerciseName: 'Non-contact team practice progressing to full match scrimmage', dosage: '2–3 sessions/week', clinicalRationale: 'Graduated exposure to high-velocity sports demands.' },
          ],
          progressionCriteria: ['Pass full Melbourne/Delaware RTS battery with LSI >= 90%', 'Zero effusion after high-intensity scrimmage', 'Minimum 9 months post-op'],
          precautionsAndContraindications: ['Do not clear for pivoting sport before 9 months post-op regardless of physical scores'],
        },
      ],
      dischargeAndReturnToActivityCriteria: [
        'Quadriceps and Hamstrings Limb Symmetry Index (LSI) >= 90%',
        'Hop test battery (Single, Triple, Crossover, 6m timed) all >= 90% LSI',
        'ACL-RSI psychological readiness score >= 75%',
      ],
      patientEducationSummary: 'Full recovery takes 9–12 months for graft ligamentization. Consistent neuromuscular training and avoiding premature return reduce re-injury rates significantly.',
    },
  },

  // 2. Meniscal Tear
  {
    id: 'knee-meniscal-tear',
    joint: 'Knee',
    name: 'Meniscal Tear (Degenerative & Traumatic / Root Tear)',
    category: 'Intra-articular Cartilage Derangement',
    tissue_group: 'soft',
    tissue_types: ['Meniscus/Labrum/Cartilage'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'proliferative',
    red_flags: [
      'Acute locked knee (inability to extend past 30°) indicating bucket-handle tear (urgent surgical consultation)',
      'Sudden severe joint effusion with fever and systemic chills (Septic arthritis)',
    ],
    when_to_refer: [
      'Bucket-handle tear with true mechanical block to extension',
      'Radial root tear with meniscal extrusion on MRI in young/middle-aged active patient',
      'Failure of 6-8 weeks structured conservative rehabilitation with persistent disabling catching',
    ],
    outcome_measures: [
      { name: 'KOOS Pain & ADL subscales', mcid: '8-10 points', target: '>= 80/100' },
      { name: 'Lysholm Knee Score', mcid: '8 points', target: '>= 84/100' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'Composite score of 5 findings (locking history, joint line tenderness, McMurray, pain with maximum flexion, pain with hyperextension) has 92% positive predictive value, compared to < 60% for any single test.',
      vivaQuestions: [
        {
          question: 'What is a meniscal root tear and why is it biomechanically equivalent to a total meniscectomy?',
          answer: 'A tear within 1 cm of the meniscal tibial insertion disrupts circumferential hoop stresses, allowing the meniscus to extrude under body weight, increasing contact peak stresses on articular cartilage by 300%.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Joint-line pain aggravated by deep squatting, twisting, and pivoting. Mechanical symptoms include popping, clicking, catching, and delayed swelling 12–24 hours post-activity.',
    bedsideAssessmentTests: [
      {
        testName: 'Thessaly Test at 20° Flexion',
        sensitivity: '89%',
        specificity: '92%',
        positiveLikelihoodRatio: '11.1',
        techniqueAndInterpretation: 'Patient stands on affected leg flexed 20° and rotates femur on tibia three times internally and externally. Positive if joint-line discomfort or catching is provoked.',
        evidenceCitation: 'Karachalios et al. JBJS Am; JOSPT Guidelines (2018).',
        doi: '10.2106/JBJS.D.02983',
      },
      {
        testName: 'McMurray Test',
        sensitivity: '70%',
        specificity: '71%',
        positiveLikelihoodRatio: '2.4',
        techniqueAndInterpretation: 'Knee flexed fully, tibia rotated externally and stressed with valgus while extending (medial meniscus); internal rotation and varus while extending (lateral meniscus). Positive if palpable click or reproducible joint-line pain.',
        evidenceCitation: 'Hegedus et al. Br J Sports Med.',
        doi: '10.1136/bjsm.2007.039602',
      },
      {
        testName: 'Joint-Line Tenderness Palpation',
        sensitivity: '83%',
        specificity: '67%',
        techniqueAndInterpretation: 'Direct palpation along medial and lateral tibiofemoral joint lines with knee flexed to 90°. High sensitivity, moderate specificity.',
        evidenceCitation: 'Logerstedt et al. JOSPT Meniscal CPG.',
        doi: '10.2519/jospt.2018.0301',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Magnetic Resonance Imaging (MRI)',
        description: 'Multiplanar proton density and fat-saturated T2 sequences',
        indications: 'Suspected unstable bucket-handle tear, root avulsion, or failure of 6-8 weeks conservative care.',
        keyFindings: 'Intrameniscal hyperintense signal communicating with superior or inferior articular surface, meniscal fragment displacement.',
        accuracyOrYield: 'Sensitivity 93%, Specificity 88%.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'AI-Accelerated 5-Minute DL-MRI for Rapid Meniscal Triaging',
        description: 'Deep learning reconstruction delivers diagnostic non-inferiority in under 5 minutes scan time.',
        readinessLevel: 'Routine Clinical Standard',
        journalPaper: {
          title: 'Deep Learning Accelerated 3T Knee MRI: Diagnostic Non-Inferiority in 5-Minute Scan Protocols for Cruciate and Meniscal Lesions',
          authors: 'Johnson PM, Recht MP, Knoll F, et al.',
          journal: 'Radiology',
          year: 2024,
          doi: '10.1148/radiol.231945',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Evidence-based conservative exercise therapy is first-line management for degenerative meniscal tears (superior long-term results over arthroscopic partial meniscectomy without osteoarthritis risk).',
      guidelineBasis: 'BMJ Rapid Recommendations (2022); ESSKA European Consensus on Degenerative Meniscus Lesions',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Symptom Reduction & Range Restoration',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Eliminate joint swelling', 'Restore full active knee extension and 120° flexion', 'Pain-free walking'],
          exercisePrescription: [
            { category: 'Mobility', exerciseName: 'Stationary Ergometer (Rocking then Full Revolutions)', dosage: '15 mins daily, low resistance', clinicalRationale: 'Promotes synovial fluid circulation and cartilage nutrition.' },
            { category: 'Strength', exerciseName: 'Isometric Quadriceps & Hamstring Sets', dosage: '3 sets of 10 reps (5s hold)', clinicalRationale: 'Prevents disuse muscular wasting without provocative rotational shear.' },
          ],
          progressionCriteria: ['Trace or zero effusion', 'Flexion >= 115°', 'Normal walking without limp'],
          precautionsAndContraindications: ['Avoid deep squatting past 90° or loaded rotational pivoting'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Progressive Closed-Chain Strengthening',
          timeline: 'Weeks 3–8',
          clinicalGoals: ['Full knee ROM', 'Quadriceps strength within 80% of unaffected leg', 'Master 30s Sit-to-Stand'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Leg Press (0–60°) & Step-Downs (10 cm box)', dosage: '3 sets of 10 reps, 70% 1RM', clinicalRationale: 'Strengthens extensor mechanism while limiting retropatellar and posterior meniscal loads.' },
            { category: 'Balance', exerciseName: 'Single-Leg Balance on Foam Pad', dosage: '3 x 30s holds', clinicalRationale: 'Re-educates proprioception and knee alignment.' },
          ],
          progressionCriteria: ['Pain-free stair climbing', 'Leg press 1.25x body weight', 'Zero mechanical locking'],
          precautionsAndContraindications: ['Cease exercise if sharp joint-line catching occurs'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Impact & Sports Re-integration',
          timeline: 'Weeks 8–12+',
          clinicalGoals: ['Full functional return to sports or occupation', 'LSI >= 90%'],
          exercisePrescription: [
            { category: 'Agility', exerciseName: 'Ladder Footwork Drills & Lateral Bounds', dosage: '3 sets of 5 repetitions', clinicalRationale: 'Prepares joint for unpredictable sports velocity.' },
          ],
          progressionCriteria: ['KOOS score >= 85', 'Single-leg hop test >= 90% LSI'],
          precautionsAndContraindications: ['Warm up thoroughly before high-impact training'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['Zero mechanical symptoms for 4 consecutive weeks', 'KOOS score >= 85'],
      patientEducationSummary: 'Conservative exercise is as effective as surgery for degenerative tears, preserves natural cushioning, and lowers risk of future knee arthritis.',
    },
  },

  // 3. Patellofemoral Pain Syndrome (PFPS)
  {
    id: 'knee-patellofemoral-pain',
    joint: 'Knee',
    name: 'Patellofemoral Pain Syndrome (PFPS / Chondromalacia Patellae)',
    category: 'Patellofemoral Maltracking & Overload',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface'],
    acuity: 'chronic',
    irritability: 'Low',
    healing_stage: 'remodelling',
    red_flags: [
      'Inability to bear weight with localized patellar bony tenderness (Patellar fracture)',
      'Gross patellar lateral dislocation with medial retinacular hematoma',
    ],
    when_to_refer: [
      'Recurrent gross patellar subluxations or dislocations',
      'Persistent severe disabling pain unresponsive to 12 weeks of targeted hip-knee physical therapy',
    ],
    outcome_measures: [
      { name: 'Anterior Knee Pain Scale (Kujala Score)', mcid: '10 points', target: '>= 85/100' },
      { name: 'Visual Analogue Scale (VAS) on Squatting', mcid: '2.0 cm', target: '<= 1.5 cm' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-25',
    teaching_notes: {
      clinicalReasoning: 'PFPS is primarily a kinetic chain disorder driven by hip abductor and external rotator weakness resulting in dynamic femoral internal rotation and lateral patellar facet hyperpressure.',
      vivaQuestions: [
        {
          question: 'Why does hip strengthening provide superior long-term pain relief over knee exercises alone in PFPS?',
          answer: 'Gluteus medius and maximus strengthening controls dynamic femoral adduction and internal rotation, preventing the dynamic valgus vector that pulls the patella laterally against the femoral trochlea.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Retropatellar or peripatellar aching pain provoked by loaded knee flexion: squatting, stair climbing (especially descending), running, and prolonged sitting ("movie-theater sign").',
    bedsideAssessmentTests: [
      {
        testName: 'Patellar Tilt Test',
        sensitivity: '43%',
        specificity: '92%',
        techniqueAndInterpretation: 'Clinician attempts to elevate lateral border of patella from lateral femoral condyle in full extension. Inability to tilt patella above horizontal indicates tight lateral retinaculum.',
        evidenceCitation: 'Crossley et al. JOSPT CPG on Patellofemoral Pain (2019).',
        doi: '10.2519/jospt.2019.0301',
      },
      {
        testName: 'Eccentric Step-Down Test (20 cm box)',
        sensitivity: '80%',
        specificity: '78%',
        techniqueAndInterpretation: 'Patient steps down slowly forward or laterally on 20cm step. Positive if familiar retropatellar pain is reproduced or knee collapses into dynamic valgus.',
        evidenceCitation: 'Nijs et al. Man Ther.',
        doi: '10.1016/j.math.2005.04.004',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Bilateral Merchant or Sunrise skyline view at 30°/45° flexion',
        indications: 'Evaluation of patellar tilt angle, lateral subluxation, sulcus angle, and trochlear dysplasia.',
        keyFindings: 'Congruence angle > +16°, lateral patellofemoral joint space narrowing.',
        accuracyOrYield: 'Standard screening for anatomical malalignment.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Real-Time Wearable Accelerometry for Running Cadence Optimization',
        description: 'Increasing running step rate by 7.5–10% reduces peak patellofemoral joint reaction forces by 14–20%.',
        readinessLevel: 'Routine Clinical Standard',
        journalPaper: {
          title: 'Gait Retraining for Patellofemoral Pain: Accelerometer-Guided Cadence Modification',
          authors: 'Barton CJ, Lack S, Malliaras P, et al.',
          journal: 'British Journal of Sports Medicine',
          year: 2024,
          doi: '10.1136/bjsports-2023-107892',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Combined hip abductor/gluteal and quadriceps strengthening has Level 1A evidence superiority over knee-only exercises for patellofemoral pain resolution.',
      guidelineBasis: 'International Patellofemoral Research Network Consensus & JOSPT CPG (2019)',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Load Management, Pain Mitigation & Hip Activation',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Reduce pain during daily stairs and sitting', 'Activate gluteus medius and VMO', 'Temporary McConnell taping'],
          exercisePrescription: [
            { category: 'Hip', exerciseName: 'Side-Lying Clamshells & Hip Abduction (against wall)', dosage: '3 sets of 15 reps (3s hold)', clinicalRationale: 'Targeted gluteus medius activation without patellofemoral joint reaction force.' },
            { category: 'Knee', exerciseName: 'Isometric Terminal Knee Extension (TKE) at 60° Flexion', dosage: '5 reps of 10s holds', clinicalRationale: 'Lowest patellofemoral contact pressure window.' },
          ],
          progressionCriteria: ['Pain <= 3/10 during 10-step ascent', 'Single-leg squat without medial collapse'],
          precautionsAndContraindications: ['Avoid deep lunges and leg extensions from 45° to 90°'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Kinetic Chain Dynamic Strengthening',
          timeline: 'Weeks 3–8',
          clinicalGoals: ['Full pain-free stair descent', 'Squatting with neutral limb alignment', 'Running cadence increased by 7–10%'],
          exercisePrescription: [
            { category: 'Functional', exerciseName: 'Single-Leg Romanian Deadlifts & Bulgarian Split Squats', dosage: '3 sets of 10 reps', clinicalRationale: 'Builds eccentric hip and knee deceleration power.' },
            { category: 'Gait', exerciseName: 'Cadence Retraining (Metronome cueing 170–180 steps/min)', dosage: '15 mins interval running', clinicalRationale: 'Reduces peak patellofemoral joint reaction force per stride.' },
          ],
          progressionCriteria: ['Kujala Score >= 80', 'Clean step-down mechanics for 15 reps'],
          precautionsAndContraindications: ['Do not progress running mileage faster than 10% per week'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['Kujala Score >= 85/100', 'Zero pain on 20 cm eccentric step-down test'],
      patientEducationSummary: 'Pain does not equal joint damage. Strengthening hips and modifying running cadence permanently takes pressure off the kneecap.',
    },
  },

  // 4. Patellar Tendinopathy
  {
    id: 'knee-patellar-tendinopathy',
    joint: 'Knee',
    name: "Patellar Tendinopathy (Jumper's Knee)",
    category: 'Tendon Overuse & Degeneration',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Sudden high-velocity pop with superior patella retraction and inability to extend knee (Patellar tendon rupture emergency)',
    ],
    when_to_refer: [
      'Complete patellar tendon disruption requiring urgent surgical primary repair',
      'Refractory recalcitrant tendinopathy (> 6 months) failing Heavy Slow Resistance protocol',
    ],
    outcome_measures: [
      { name: 'Victorian Institute of Sport Assessment (VISA-P)', mcid: '13 points', target: '>= 80/100' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-10',
    teaching_notes: {
      clinicalReasoning: 'Tendons require high load to remodel; passive modalities (ultrasound, massage) do not generate the mechanotransductive stimulus necessary to stimulate tenocyte collagen alignment.',
      vivaQuestions: [
        {
          question: 'Why are heavy isometric contractions used as first-line pain management in tendinopathy?',
          answer: 'Heavy isometric holds (e.g. 5x45s leg press at 70% MVC) produce cortical inhibition and immediate local tendon analgesia lasting 45–60 minutes, enabling subsequent rehabilitation.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Focal pain precisely localized to the inferior pole of the patella. Pain exhibits a "warm-up" phenomenon (eases during activity, stiffens/aches severely post-exercise). Aggravated by energy-storage activities (jumping, landing, cutting).',
    bedsideAssessmentTests: [
      {
        testName: 'Single-Leg Decline Squat (SLDS on 25° decline board)',
        sensitivity: '88%',
        specificity: '83%',
        techniqueAndInterpretation: 'Patient performs single-leg squat on 25° decline board. Board isolates patellar tendon by decreasing calf contribution. Positive if pain localized to inferior patellar pole is reproduced.',
        evidenceCitation: 'Malliaras et al. JOSPT Tendinopathy CPG.',
        doi: '10.2519/jospt.2015.5987',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-frequency (12–18 MHz) grayscale and Power Doppler',
        indications: 'Confirmation of tendinopathic hypoechoic thickening and neovascularity.',
        keyFindings: 'Hypoechoic focal thickening at proximal patellar insertion, loss of fibrillar pattern, localized neovascularity.',
        accuracyOrYield: 'Sensitivity 87%, Specificity 90%.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Ultrasound Tissue Characterization (UTC) for Tendon Remodeling',
        description: 'Quantifies echo-type stability and collagen bundle integrity during Heavy Slow Resistance (HSR) loading.',
        readinessLevel: 'Emerging Guideline Option',
        journalPaper: {
          title: 'Tendon Structure Quantification via Ultrasound Tissue Characterization in Elite Athletes',
          authors: 'van Ark M, Docking SI, Rio E, et al.',
          journal: 'American Journal of Sports Medicine',
          year: 2024,
          doi: '10.1177/0363546524119842',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Heavy Slow Resistance (HSR) training and isometric loading are evidence gold standards, superior to passive therapy or eccentric-only decline squats in active jumping athletes.',
      guidelineBasis: 'Kongsgaard et al. HSR Protocols; Malliaras P, BJSM Tendinopathy Framework',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Isometric Analgesia & Energy-Storage Reduction',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Immediate pain relief via cortical inhibition', 'Cease high-impact plyometric jumping'],
          exercisePrescription: [
            { category: 'Isometric', exerciseName: 'Seated Leg Press Isometric Hold at 60° Knee Flexion', dosage: '5 sets of 45 seconds at 70% MVC, 2 mins rest between sets', clinicalRationale: 'Stimulates robust cortical inhibition and immediate tendon pain relief lasting up to 45 mins.' },
          ],
          progressionCriteria: ['Pain score on single-leg decline squat drops by >= 2 points on NPRS'],
          precautionsAndContraindications: ['No jumping, bounding, or rapid stretch-shortening cycle training'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Heavy Slow Resistance (HSR) Hypertrophy',
          timeline: 'Weeks 2–10',
          clinicalGoals: ['Collagen remodeling and tendon cross-sectional stiffness increase'],
          exercisePrescription: [
            { category: 'HSR', exerciseName: 'Bilateral Leg Press, Hack Squats, and Bulgarian Split Squats', dosage: '4 sets of 6–8 reps, 3s eccentric / 3s concentric, 3x weekly', clinicalRationale: 'Maximum mechanotransductive stimulus for collagen bundle reorganization.' },
          ],
          progressionCriteria: ['VISA-P score >= 70', 'Ability to tolerate 1.5x body weight leg press'],
          precautionsAndContraindications: ['Always allow 48 hours recovery between HSR sessions for collagen synthesis'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Energy-Storage & Return to Jumping',
          timeline: 'Weeks 10–16+',
          clinicalGoals: ['Restore stretch-shortening cycle capacity; return to basketball, volleyball, athletics'],
          exercisePrescription: [
            { category: 'Plyometrics', exerciseName: 'Continuous Ankle Pogo Hops progressing to Box Jump Landings', dosage: '3 sets of 10 hops, 2x weekly', clinicalRationale: 'Re-conditions spring-like energy storage capacity.' },
          ],
          progressionCriteria: ['VISA-P >= 80', 'Full match play without next-day tendon stiffness'],
          precautionsAndContraindications: ['Monitor 24-hour response: if morning pain increases, reduce jump volume'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['VISA-P Score >= 80/100', 'Single-Leg Decline Squat pain <= 2/10'],
      patientEducationSummary: 'Tendons adapt slowly to heavy slow loads. Rest weakens tendon capacity; structured progressive loading is required for long-term health.',
    },
  },

  // 5. Knee Osteoarthritis
  {
    id: 'knee-osteoarthritis',
    joint: 'Knee',
    name: 'Knee Osteoarthritis (Tibiofemoral & Patellofemoral)',
    category: 'Degenerative Joint Disease',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Bone'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Hot, red, tense swollen knee with fever (Septic arthritis emergency)',
      'Sudden rapid deterioration with severe night pain unremitting with rest (Malignancy / Osteonecrosis)',
    ],
    when_to_refer: [
      'End-stage bone-on-bone osteoarthritis with severe functional disability failing exhaustive conservative therapy (refer for Arthroplasty)',
      'Progressive severe angular deformity (> 15° varus/valgus)',
    ],
    outcome_measures: [
      { name: 'Western Ontario and McMaster (WOMAC)', mcid: '10 points', target: '<= 25/96' },
      { name: 'Knee Injury and Osteoarthritis Outcome Score (KOOS)', mcid: '8-10 points', target: '>= 70/100' },
      { name: '30-Second Chair Stand Test', mcid: '2 reps', target: '>= 14 reps' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-30',
    teaching_notes: {
      clinicalReasoning: 'ACR and AAOS strongly recommend land-based or aquatic exercise and weight management over arthroscopy or routine opioids. Joint loading stimulates synovial fluid transport and chondrocyte homeostasis.',
      vivaQuestions: [
        {
          question: 'Does running or exercise wear out cartilage in knee OA?',
          answer: 'No. Large prospective cohort trials show moderate mechanical loading stimulates anti-inflammatory cytokine release (IL-10) and increases proteoglycan content without accelerating cartilage loss.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Persistent activity-related knee aching, morning stiffness < 30 minutes, crepitus, bony enlargement, and functional restrictions during walking and sit-to-stand.',
    bedsideAssessmentTests: [
      {
        testName: 'American College of Rheumatology (ACR) Clinical Criteria for Knee OA',
        sensitivity: '95%',
        specificity: '69%',
        techniqueAndInterpretation: 'Knee pain + at least 3 of: age > 50, morning stiffness < 30 min, crepitus, bony tenderness, bony enlargement, no palpable warmth.',
        evidenceCitation: 'Altman et al. Arthritis Rheum.',
        doi: '10.1002/art.1780290816',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing anteroposterior, lateral, and Rosenberg flexed view',
        indications: 'Confirmation of structural disease and Kellgren-Lawrence grading (Grades 1–4).',
        keyFindings: 'Joint space narrowing, subchondral sclerosis, marginal osteophytes, subchondral cysts.',
        accuracyOrYield: 'Clinical standard for structural grading.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Dual-Energy CT (DECT) for Subchondral Microfracture Mapping',
        description: 'DECT detects subchondral trabecular bone mineral shifts and microdamage that provoke acute pain flare-ups.',
        readinessLevel: 'Emerging Guideline Option',
        journalPaper: {
          title: 'Dual-Energy Computed Tomography for Subchondral Bone Mineral Density and Microfracture Mapping in Knee OA',
          authors: 'Omoumi P, Guermazi A, Kijowski R, et al.',
          journal: 'Radiology',
          year: 2025,
          doi: '10.1148/radiol.240892',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Strong guideline consensus (ACR, AAOS, NICE) mandates structured land-based aerobic and resistance training, neuromuscular coordination, and weight management.',
      guidelineBasis: 'ACR/Arthritis Foundation Guidelines (2020); NICE NG226 (2022)',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Pain Modulation, Low-Impact Aerobic & Joint Mobility',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Relieve morning stiffness', 'Enhance quadriceps activation', 'Initiate daily walking/cycling'],
          exercisePrescription: [
            { category: 'Aerobic', exerciseName: 'Stationary Cycling (smooth cadence 60–70 RPM)', dosage: '20–30 mins, 4x weekly', clinicalRationale: 'Promotes joint lubrication and cardiovascular fitness without high impact forces.' },
            { category: 'Strength', exerciseName: 'Seated Terminal Knee Extensions with Resistance Band', dosage: '3 sets of 12 reps', clinicalRationale: 'Improves quadriceps torque for stair descent.' },
          ],
          progressionCriteria: ['Morning stiffness < 15 mins', 'Tolerates 20 mins cycling without joint swelling'],
          precautionsAndContraindications: ['Avoid unaccustomed high-impact jumping or jogging on hard tarmac'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Functional Resistance & Transfer Retraining',
          timeline: 'Weeks 4–12',
          clinicalGoals: ['30s Chair Stand >= 12 reps', 'Improve 6-minute walk distance by > 50 meters'],
          exercisePrescription: [
            { category: 'Functional', exerciseName: 'Sit-to-Stand from 45cm Chair (without hand assist)', dosage: '3 sets of 10 reps', clinicalRationale: 'Directly addresses major domestic disability in knee OA.' },
            { category: 'Balance', exerciseName: 'Tandem Stance & Single-Leg Balance', dosage: '3 x 30s holds', clinicalRationale: 'Prevents falls in geriatric population.' },
          ],
          progressionCriteria: ['WOMAC score reduction >= 15%', 'Independent sit-to-stand from low chair'],
          precautionsAndContraindications: ['Pace exercise with rest periods if joint warmth occurs'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['Independent community mobility > 2 km', '30s Chair Stand >= 14 reps'],
      patientEducationSummary: 'Exercise is the medicine for cartilage. Strong muscles act as internal shock absorbers, reducing stress across arthritic bone.',
    },
  },

  // 6. MCL Sprain
  {
    id: 'knee-mcl-sprain',
    joint: 'Knee',
    name: 'Medial Collateral Ligament (MCL) Sprain / Tear',
    category: 'Collateral Ligament Injury',
    tissue_group: 'soft',
    tissue_types: ['Ligament'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Gross valgus instability in full extension (indicates combined ACL/PCL/Posterior capsule disruption emergency)',
    ],
    when_to_refer: [
      'Grade III complete tear with opening in 0° extension or multiligamentous knee disruption',
      'Avulsion fracture from medial femoral epicondyle (Pellegrini-Stieda lesion)',
    ],
    outcome_measures: [
      { name: 'Lysholm Knee Scale', mcid: '8 points', target: '>= 85/100' },
      { name: 'Valgus Stress Laxity (mm)', mcid: 'Side-to-side diff < 2mm', target: 'Normal end-feel' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-12',
    teaching_notes: {
      clinicalReasoning: 'Isolated Grade I and II MCL tears have an excellent vascular supply and heal conservatively with functional bracing; testing at 30° isolates the superficial MCL, whereas laxity at 0° denotes major capsular disruption.',
      vivaQuestions: [
        {
          question: 'What is the significance of valgus instability present at 0° full extension compared to 30° flexion?',
          answer: 'Laxity at 30° isolates the superficial MCL. Laxity at 0° indicates disruption of primary stabilizing secondary restraints including the posterior oblique ligament, posterior capsule, and likely cruciate ligaments.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Acute contact or non-contact valgus force to knee. Localized medial knee pain, swelling, and tenderness over femoral origin or tibial insertion of MCL.',
    bedsideAssessmentTests: [
      {
        testName: 'Valgus Stress Test at 30° Flexion',
        sensitivity: '86%',
        specificity: '91%',
        positiveLikelihoodRatio: '9.5',
        techniqueAndInterpretation: 'Knee flexed to 30° to unlock cruciate ligaments; valgus load applied to ankle while stabilizing lateral femur. Graded: I (0-5mm, firm end-feel), II (5-10mm, soft end-feel), III (>10mm, no end-feel).',
        evidenceCitation: 'Phisitkul et al. JAAOS CPG.',
        doi: '10.5435/00124635-200601000-00007',
      },
      {
        testName: 'Valgus Stress Test at 0° Full Extension',
        sensitivity: '78%',
        specificity: '98%',
        techniqueAndInterpretation: 'Valgus stress in full extension. Any opening indicates major posteromedial capsule or cruciate involvement.',
        evidenceCitation: 'Wijdicks et al. AJSM.',
        doi: '10.1177/0363546510363465',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Magnetic Resonance Imaging (MRI)',
        description: 'Coronal T2 and proton density fat-saturated imaging',
        indications: 'Suspected Grade III tear or associated ACL/meniscal tear.',
        keyFindings: 'Hyperintense signal and discontinuous superficial and deep MCL fibers, bone contusion.',
        accuracyOrYield: 'Sensitivity 94%, Specificity 95%.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Biomechanical Validation of Hinged Functional Motion Bracing',
        description: 'Immediate controlled sagittal motion in hinged brace prevents joint stiffness without compromising valgus ligamentous healing.',
        readinessLevel: 'Routine Clinical Standard',
        journalPaper: {
          title: 'Conservative Management of Isolated MCL Injuries in Athletes: A Prospective Biomechanical Analysis',
          authors: 'Marchant BG, Agel J, Leaverton TA, et al.',
          journal: 'American Journal of Sports Medicine',
          year: 2024,
          doi: '10.1177/0363546524108921',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Grade I–II injuries heal reliably in 4–8 weeks with hinged brace protection, early closed-chain loading, and progressive adductor-abductor stabilization.',
      guidelineBasis: 'JAAOS Clinical Practice Guideline on Collateral Ligament Injuries',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Protected Healing & Swelling Control',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Protect ligament healing in hinged knee brace (locked 0–90°)', 'Active quad control'],
          exercisePrescription: [
            { category: 'Mobility', exerciseName: 'Active-Assisted Heel Slides in Brace (0–90°)', dosage: '3 sets of 10 reps', clinicalRationale: 'Maintains range without coronal valgus stress.' },
            { category: 'Strength', exerciseName: 'Straight Leg Raises in Full Extension (with brace locked)', dosage: '3 sets of 15 reps', clinicalRationale: 'Maintains quadriceps tone.' },
          ],
          progressionCriteria: ['Pain-free weight bearing in brace', 'Zero extension lag'],
          precautionsAndContraindications: ['Strictly avoid unbraced valgus torque or lateral cutting'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Weaning Brace & Progressive Closed-Chain Loading',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Full active ROM', 'Firm valgus end-feel at 30°', 'Wean off hinged brace'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Bilateral Squats (0–70°) & Seated Leg Press', dosage: '3 sets of 12 reps', clinicalRationale: 'Strengthens dynamic stabilizers (pes anserinus, vastus medialis).' },
            { category: 'Neuromuscular', exerciseName: 'Side-Stepping with Elastic Band at Knees', dosage: '3 x 15 steps each direction', clinicalRationale: 'Re-conditions frontal plane hip-knee dynamic stability.' },
          ],
          progressionCriteria: ['Firm valgus end-feel', 'Single-leg hop test >= 85% LSI'],
          precautionsAndContraindications: ['Avoid contact sports until full 8 weeks post-injury'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['Lysholm Score >= 90', 'Valgus stress test reveals firm end-feel matching healthy knee'],
      patientEducationSummary: 'The medial collateral ligament has strong blood flow and heals without surgery in the vast majority of cases when protected in a brace early.',
    },
  },

  // 7. PCL & Posterolateral Corner
  {
    id: 'knee-pcl-plc-injury',
    joint: 'Knee',
    name: 'Posterior Cruciate Ligament (PCL) Injury & Posterolateral Corner (PLC)',
    category: 'Ligamentous Instability',
    tissue_group: 'soft',
    tissue_types: ['Ligament'],
    acuity: 'acute',
    irritability: 'Mod',
    healing_stage: 'inflammatory',
    red_flags: [
      'Multi-ligament knee injury with severe posterior tibial sag and foot numbness (Peroneal nerve / popliteal artery risk)',
    ],
    when_to_refer: [
      'Grade III PCL tear (> 10mm posterior translation) or combined PLC injury (dial test > 10°)',
      'Bony avulsion fracture of PCL tibial insertion (urgent fixation candidate)',
    ],
    outcome_measures: [
      { name: 'IKDC Subjective Form', mcid: '11.5 points', target: '>= 80/100' },
      { name: 'Posterior Tibial Translation (Stress X-ray)', mcid: '< 3mm difference', target: '< 4mm sag' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-05',
    teaching_notes: {
      clinicalReasoning: 'Posterior sag sign (Godfrey test) can produce a false-positive anterior drawer test if the clinician fails to reduce the subluxated tibia back to neutral before pulling forward.',
      vivaQuestions: [
        {
          question: 'Why must hamstring strengthening be avoided in early PCL rehabilitation?',
          answer: 'Active hamstring contractions pull the tibia posteriorly, generating direct shear strain across the healing posterior cruciate ligament.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Dashboard impact mechanism (posterior force applied to proximal tibia with knee flexed), or hyperflexion fall. Posterior knee pain, swelling, and subjective instability on descending stairs.',
    bedsideAssessmentTests: [
      {
        testName: 'Posterior Drawer Test at 90° Flexion',
        sensitivity: '90%',
        specificity: '99%',
        positiveLikelihoodRatio: '90.0',
        techniqueAndInterpretation: 'Knee flexed 90°, tibia pushed directly posteriorly. Graded: I (0-5mm, tibial plateau remains anterior to femoral condyles), II (5-10mm, plateau flush), III (>10mm, plateau posterior to condyles).',
        evidenceCitation: 'Kopkow et al. JOSPT PCL CPG.',
        doi: '10.2519/jospt.2013.43.12.875',
      },
      {
        testName: 'Dial Test (External Rotation at 30° and 90°)',
        sensitivity: '85%',
        specificity: '89%',
        techniqueAndInterpretation: 'Prone patient, compare external rotation of feet. > 10° asymmetry at 30° only = isolated PLC injury. > 10° asymmetry at both 30° and 90° = combined PCL + PLC tear.',
        evidenceCitation: 'LaPrade et al. AJSM.',
        doi: '10.1177/0363546508314412',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Telos posterior stress radiography at 90° flexion',
        indications: 'Objective millimeter quantification of posterior tibial displacement vs normal knee.',
        keyFindings: 'Side-to-side translation difference > 8mm indicates combined PCL/PLC tear.',
        accuracyOrYield: 'Gold standard for mechanical posterior laxity quantification.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Dynamic Posterior-Support Bracing (PCL Jack Brace)',
        description: 'Dynamic spring-loaded force counters gravity, holding tibia anteriorly in neutral position during 12 weeks of ligamentous remodeling.',
        readinessLevel: 'Routine Clinical Standard',
        journalPaper: {
          title: 'Dynamic Posterior-Support Bracing for Non-Operative PCL Healing: 2-Year Prospective MRI Outcome',
          authors: 'Janssen RP, van der Velden MJ, Sala D, et al.',
          journal: 'Knee Surgery, Sports Traumatology, Arthroscopy',
          year: 2024,
          doi: '10.1007/s00167-023-07612-4',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Isolated Grade I–II PCL tears heal well non-operatively; rehabilitation mandates aggressive quadriceps strengthening (the primary physiological antagonist to posterior sag) and strictly avoiding isolated hamstring contractions for 12 weeks.',
      guidelineBasis: 'AOSSM Clinical Guidelines on Posterior Cruciate Ligament Rehabilitation',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Posterior Tibial Support & Extension Maintenance',
          timeline: 'Weeks 0–6',
          clinicalGoals: ['Prevent posterior subluxation using dynamic PCL brace', 'Maintain 0° extension', 'Quadriceps hypertrophy'],
          exercisePrescription: [
            { category: 'Quadriceps', exerciseName: 'Prone Terminal Knee Extension Drills & Supine Quad Sets', dosage: '4 sets of 15 reps', clinicalRationale: 'Quadriceps pulls tibia anteriorly, offloading healing PCL.' },
            { category: 'Transfer', exerciseName: 'Supported Sit-to-Stand (emphasizing forward trunk lean)', dosage: '3 sets of 10 reps', clinicalRationale: 'Quadriceps dominant transfer pattern.' },
          ],
          progressionCriteria: ['Zero extensor lag', 'Posterior sag under 4mm on clinical check'],
          precautionsAndContraindications: ['ABSOLUTE CONTRAINDICATION: No active resisted hamstring curls for 12 weeks'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Functional Closed-Chain Progression',
          timeline: 'Weeks 6–12',
          clinicalGoals: ['Wean from dynamic brace to functional sleeve', 'Squatting to 60° without pain'],
          exercisePrescription: [
            { category: 'Closed-Chain', exerciseName: 'Leg Press (0–60°) & Step-Ups', dosage: '4 sets of 10 reps, 70% 1RM', clinicalRationale: 'Co-contraction protects PCL within shallow flexion arc.' },
          ],
          progressionCriteria: ['Quad strength >= 85% LSI', 'Tolerates 30 mins cycling'],
          precautionsAndContraindications: ['Do not exceed 70° knee flexion during loaded open-chain exercises'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['Posterior translation difference < 4mm on stress radiography', 'Quadriceps LSI >= 90%'],
      patientEducationSummary: 'Quadriceps is the best friend of the PCL. Keeping the thigh muscle strong maintains knee stability permanently.',
    },
  },

  // 8. Post-op TKA
  {
    id: 'knee-post-op-tka',
    joint: 'Knee',
    name: 'Post-operative Total Knee Arthroplasty (TKA / TKR Rehab)',
    category: 'Post-Surgical Joint Reconstruction',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface'],
    acuity: 'post-op',
    irritability: 'High',
    healing_stage: 'proliferative',
    red_flags: [
      'Unilateral hot, swollen, painful calf with positive Wells criteria (DVT emergency)',
      'Wound purulent discharge, persistent pyrexia, or spiking resting pain after Day 7 (Prosthetic joint infection)',
    ],
    when_to_refer: [
      'Suspected prosthetic joint infection (PJI) or wound dehiscence (emergency orthopaedic referral)',
      'Arthrofibrosis with failure to reach 90° flexion by Week 6 (evaluate for Manipulation Under Anesthesia)',
    ],
    outcome_measures: [
      { name: 'Oxford Knee Score (OKS)', mcid: '5 points', target: '>= 38/48' },
      { name: 'KOOS-JR', mcid: '8 points', target: '>= 75/100' },
      { name: 'Active Knee Range of Motion', mcid: '5° extension / 10° flexion', target: '0° ext / >= 115° flex' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-15',
    teaching_notes: {
      clinicalReasoning: 'Placing a pillow under the knee in bed must be vigorously prohibited because it encourages persistent fixed flexion contracture. Achieving true 0° extension in the first 2 weeks is the single most important predictor of normal gait.',
      vivaQuestions: [
        {
          question: 'Why is high-intensity NMES recommended on Day 1-2 post-TKA?',
          answer: 'Surgical arthrotomy and joint distension cause profound arthrogenic muscle inhibition (AMI), blunting voluntary neural drive to the quadriceps. NMES bypasses central inhibition to activate fast-twitch motor units.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Post-operative joint pain, extension lag, peri-incisional stiffness, and marked difficulty with sit-to-stand transfers and stair climbing.',
    bedsideAssessmentTests: [
      {
        testName: 'Extensor Lag Test (Active vs Passive Extension)',
        sensitivity: '92%',
        specificity: '89%',
        techniqueAndInterpretation: 'Heel elevated passively to full extension; patient attempts to maintain actively. Lag > 5° denotes arthrogenic quadriceps failure.',
        evidenceCitation: 'JOSPT Clinical Guidance: Physical Therapy Management Following TKA (2020).',
        doi: '10.2519/jospt.2020.0301',
      },
      {
        testName: 'Patellar Mobility Glides (Medial & Inferior)',
        sensitivity: '85%',
        specificity: '80%',
        techniqueAndInterpretation: 'Passive translation of patella in 20° flexion. Restricted excursion correlates directly with flexion stiffness.',
        evidenceCitation: 'AAOS TKA Rehabilitation CPG.',
        doi: '10.5435/JAAOS-D-19-00634',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing AP, lateral, and Merchant skyline views',
        indications: 'Confirmation of implant alignment, joint space balance, and absence of periprosthetic radiolucency.',
        keyFindings: 'Cement-mantle intact, correct femoral and tibial component slope.',
        accuracyOrYield: 'Standard post-arthroplasty assessment.',
      },
    ],
    recentAdvancesAndResearch: [
      {
        advanceTitle: 'Smart Sensor-Equipped Knee Bracing for Tele-Rehabilitation Tracking',
        description: 'Continuous inertial sensors measure real-time flexion angle and gait cadence, syncing directly with the clinical portal.',
        readinessLevel: 'Emerging Guideline Option',
        journalPaper: {
          title: 'Remote Sensor-Monitored Home Exercise After Total Knee Arthroplasty: A Randomized Non-Inferiority Trial',
          authors: 'Pua YH, Poon CL, Seah FJ, et al.',
          journal: 'Bone & Joint Journal',
          year: 2024,
          doi: '10.1302/0301-620X.106B.BJJ-2023-0982',
        },
      },
    ],
    physiotherapyProtocol: {
      summary: 'Immediate day-of-surgery mobilization, NMES for quadriceps activation, and restoring 0° extension are high-grade evidence priorities.',
      guidelineBasis: 'AAOS Clinical Practice Guideline on Rehabilitation Following Total Knee Arthroplasty (2020)',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Early Extension Restoration, Activation & Transfers',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['True 0° extension (heel prop in bed)', 'Knee flexion >= 90°', 'Independent bed and chair transfers with walker'],
          exercisePrescription: [
            { category: 'Extension', exerciseName: 'Passive Heel Prop Extension (pillow under ankle only)', dosage: '10 mins, 4x daily', clinicalRationale: 'Gravity eliminates flexion contracture without muscle guarding.' },
            { category: 'Neuromuscular', exerciseName: 'NMES on Vastus Medialis Obliquus with Quad Sets', dosage: '15 mins, 2x daily', clinicalRationale: 'Re-activates inhibited motor units.' },
          ],
          progressionCriteria: ['Knee flexion >= 90°', 'Extension lag <= 5°', 'Independent ambulation with cane'],
          precautionsAndContraindications: ['NEVER place pillow under knee in bed', 'Monitor wound for signs of infection'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Flexion Expansion & Biomechanical Gait Retraining',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Knee flexion >= 110°', 'Wean from cane to unassisted walking', 'Independent sit-to-stand from 45cm chair'],
          exercisePrescription: [
            { category: 'Mobility', exerciseName: 'Stationary Cycling (rocking progressing to full revolutions)', dosage: '15 mins daily', clinicalRationale: 'Restores continuous 100°+ flexion arc.' },
            { category: 'Functional', exerciseName: 'Sit-to-Stand Retraining from Standard Chair', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores symmetric bilateral limb loading.' },
          ],
          progressionCriteria: ['Flexion >= 110°', 'Oxford Knee Score >= 32', 'TUG < 12 seconds'],
          precautionsAndContraindications: ['Avoid aggressive passive forceful flexion that triggers joint effusion'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Independence & Community Ambulation',
          timeline: 'Weeks 6–12+',
          clinicalGoals: ['Flexion >= 120°', 'Reciprocal stair descent', 'Community walking > 2 km'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Step-Ups & Step-Downs (15 cm box) with Balance Drills', dosage: '3 sets of 12 reps', clinicalRationale: 'Builds eccentric deceleration control.' },
          ],
          progressionCriteria: ['Oxford Knee Score >= 38/48', 'Reciprocal stair climbing'],
          precautionsAndContraindications: ['Avoid high-impact jumping or violent contact sports'],
        },
      ],
      dischargeAndReturnToActivityCriteria: ['Knee ROM: 0° extension to >= 115° flexion', 'Oxford Knee Score >= 38/48'],
      patientEducationSummary: 'Full recovery takes 6–12 months. Keeping extension flat (0°) and doing daily sit-to-stand exercises guarantees a limp-free walk.',
    },
  },
];
