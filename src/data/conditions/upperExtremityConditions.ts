import { JointConditionMaster } from '../../types/clinical';

export const UPPER_EXTREMITY_CONDITIONS: JointConditionMaster[] = [
  // ==========================================
  // SHOULDER & SHOULDER GIRDLE (7 Conditions)
  // ==========================================
  {
    id: 'shoulder-rotator-cuff-tendinopathy',
    joint: 'Shoulder',
    name: 'Rotator Cuff Tendinopathy & Partial Tear',
    category: 'Rotator Cuff Overuse / Tendon Degeneration',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Bursa & Fascia'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Acute traumatic full-thickness massive rotator cuff tear in active individual with inability to elevate arm ("drop arm sign") requiring urgent surgical repair within 3 weeks.',
      'Unexplained progressive muscle wasting in supraspinatus/infraspinatus fossae (suprascapular nerve entrapment / spinoglenoid notch cyst).',
    ],
    when_to_refer: [
      'Acute traumatic full-thickness tear in young/active patient (urgent orthopaedic repair).',
      'Failure of 12 weeks structured progressive load therapy with profound weakness.',
    ],
    outcome_measures: [
      { name: 'SPADI (Shoulder Pain and Disability Index)', mcid: '13 points (or 10%)', target: '<= 15%' },
      { name: 'DASH (Disabilities of Arm, Shoulder & Hand)', mcid: '10.8 points', target: '<= 15' },
      { name: 'NRS Overhead Shoulder Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Jobe\'s (Empty Can) test has 89% sensitivity for supraspinatus pathology, but the Full Can test produces identical muscle recruitment with significantly less subacromial contact pressure and false positives. External Rotation Lag Sign indicates high-grade infraspinatus tear.',
      vivaQuestions: [
        {
          question: 'Why is the Full Can test preferred over the Empty Can (Jobe) test clinically?',
          answer: 'The Full Can test (45° external rotation) recruits the supraspinatus equally well as the Empty Can test but avoids internal rotation which compresses the supraspinatus tendon against the anteroinferior acromion, reducing pain and false-positive results.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Anterolateral shoulder pain radiating to the lateral deltoid insertion. Aggravated by overhead reaching, lifting away from the body, and lying on the affected side at night. Painful arc between 60° and 120° of active abduction.',
    bedsideAssessmentTests: [
      {
        testName: 'Full Can Test (Supraspinatus)',
        sensitivity: '84%',
        specificity: '78%',
        positiveLikelihoodRatio: '3.8',
        techniqueAndInterpretation: 'Arm elevated to 90° in scapular plane with thumbs up (45° external rotation); downward resistance applied. Positive if weakness or concordant pain reproduced.',
        evidenceCitation: 'Kelly et al. Am J Sports Med; Itoi et al. J Bone Joint Surg Am.',
      },
      {
        testName: 'External Rotation Lag Sign (Infraspinatus / Teres Minor)',
        sensitivity: '70%',
        specificity: '98%',
        positiveLikelihoodRatio: '35.0',
        techniqueAndInterpretation: 'Arm at side, elbow 90°, arm passively rotated externally to near end-range; patient instructed to hold. Positive if arm springs back forward into internal rotation (indicates severe tear).',
        evidenceCitation: 'Hertel et al. J Shoulder Elbow Surg.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'Dynamic High-Resolution Ultrasound of Rotator Cuff',
        indications: 'Evaluate supraspinatus/infraspinatus tendon thickness, partial articular vs bursal-sided tear, and dynamic subacromial impingement.',
        keyFindings: 'Hypoechoic focal defect, loss of fibrillar pattern, bursal/articular surface indentation; tendon retraction.',
        accuracyOrYield: 'Sensitivity 95%, Specificity 96% for full-thickness tears.',
      },
      {
        modality: 'MRI Scan',
        description: 'Shoulder MRI Coronal Oblique T2 Fat-Suppressed and Sagittal Oblique sequences',
        indications: 'Evaluate tear dimensions, retraction (Patte classification), and muscle fatty atrophy (Goutallier stage).',
        keyFindings: 'T2 hyperintense fluid signal traversing tendon substance; muscle fatty degeneration.',
        accuracyOrYield: 'Gold standard for surgical planning.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Phased Progressive Mechanical Rotator Cuff Loading Protocol (Lewis / Littlewood)',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Symptom Modification, Sleeping Position & Isometric Rotator Loading',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Identify symptom modification procedures (Lewis SSMP)', 'Restore night sleep with pillow support', 'Analgesic isometric external/internal rotation'],
          exercisePrescription: [
            { category: 'Symptom Modification', exerciseName: 'Scapular Repositioning / Humeral Head Depression Assisted Elevation', dosage: 'Used during daily arm lifting', clinicalRationale: 'Increases subacromial space dimensions dynamically during elevation.' },
            { category: 'Analgesic Isometrics', exerciseName: 'Isometric Shoulder External Rotation Against Wall (Arm at Side with Towel Roll)', dosage: '5 sets of 45s holds at 70% effort, 2x daily', clinicalRationale: 'Produces cortical inhibition and relieves rotator cuff tendon pain via mechanotransduction.' },
            { category: 'Postural', exerciseName: 'Thoracic Extension and Scapular Retractions', dosage: '3 sets of 10 reps', clinicalRationale: 'Counters thoracic kyphosis to optimize scapulohumeral upward rotation.' },
          ],
          progressionCriteria: ['Able to sleep without waking from lateral arm pain', 'Isometric ER holds pain-free <= 2/10', 'SPADI improved by >= 10 points'],
          precautionsAndContraindications: ['Avoid heavy overhead lifting; avoid painful repetitive impingement arc'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Isotonic Rotator Cuff & Scapular Strengthening (Low Arc)',
          timeline: 'Weeks 3–8',
          clinicalGoals: ['Progressive resistance for infraspinatus, teres minor, and subscapularis below 60° elevation', 'Strengthen serratus anterior and lower trapezius'],
          exercisePrescription: [
            { category: 'Rotator Cuff', exerciseName: 'Side-Lying External Rotation with Dumbbell (Towel Roll Between Arm and Torso)', dosage: '3 sets of 10–12 reps at RPE 7, 3s tempo', clinicalRationale: 'Littlewood et al. proved high-load slow resisted ER stimulates tendon remodeling.' },
            { category: 'Scapular Control', exerciseName: 'Serratus Punches in Supine and Wall Slides with Forearm Band', dosage: '3 sets of 10 reps', clinicalRationale: 'Facilitates scapular upward rotation and posterior tilt during arm elevation.' },
            { category: 'Cable Work', exerciseName: 'Standing Cable Face Pulls with External Rotation Cue', dosage: '3 sets of 12 reps', clinicalRationale: 'Co-activates posterior rotator cuff and scapular retractors.' },
          ],
          progressionCriteria: ['Pain-free active arm elevation to 120°', 'Full-Can test strength >= 80% of unaffected side', 'DASH improved by >= 10 points'],
          precautionsAndContraindications: ['Maintain acceptable pain monitoring (pain <= 3/10 settling within 24 hours)'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Overhead Strengthening & Kinetic Chain Integration',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Overhead pressing and pulling with good scapular mechanics', 'Eccentric rotator cuff capacity', 'Integrate lower extremity push with upper body pull'],
          exercisePrescription: [
            { category: 'Overhead Strength', exerciseName: 'Landmine Angled Press / Half-Kneeling Overhead Press', dosage: '3 sets of 8–10 reps', clinicalRationale: 'Loads shoulder in the safe scapular plane before moving to pure sagittal/frontal planes.' },
            { category: 'Eccentric Control', exerciseName: 'Eccentric External Rotation Deceleration with Elastic Band', dosage: '3 sets of 10 reps, 4s eccentric tempo', clinicalRationale: 'Prepares rotator cuff for throwing and dynamic deceleration.' },
          ],
          progressionCriteria: ['SPADI score < 15%', 'Full active range of motion without painful arc', 'Symmetric rotator strength >= 85% LSI'],
          precautionsAndContraindications: ['Pace overhead volume'],
        },
        {
          phaseNumber: 4,
          phaseName: 'High-Demand Sports & Occupational Reconditioning',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Return to sports (tennis, swimming, cricket, volleyball) or heavy overhead trades', 'Lifelong rotator cuff maintenance'],
          exercisePrescription: [
            { category: 'Athletic Conditioning', exerciseName: 'Plyometric Rebound Medicine Ball Chest Passes and Deceleration Catches', dosage: '3x weekly', clinicalRationale: 'Restores rapid neuromuscular stretch-shortening cycle in the shoulder girdle.' },
          ],
          progressionCriteria: ['Complete clearance in functional sports-specific testing battery'],
          precautionsAndContraindications: ['Continue weekly rotator cuff and scapular maintenance routine'],
        },
      ],
    },
    clinicalPearls: [
      'Littlewood et al. demonstrated that a single high-load, slow resisted external rotation exercise performed once daily is just as effective as complex multi-exercise protocols for rotator cuff tendinopathy.',
    ],
  },

  {
    id: 'shoulder-subacromial-pain-syndrome',
    joint: 'Shoulder',
    name: 'Subacromial Pain Syndrome (SAPS / Impingement)',
    category: 'Subacromial Bursa & Scapulothoracic Dyskinesis',
    tissue_group: 'soft',
    tissue_types: ['Bursa & Fascia', 'Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Subacromial septic bursitis with fever, spreading cellulitis, erythema, and exquisite local warmth.',
      'True neurological weakness in deltoid (axillary nerve palsy) following anterior shoulder dislocation.',
    ],
    when_to_refer: [
      'Refractory SAPS failing 3–6 months structured rehabilitation (consider subacromial diagnostic injection or subacromial decompression).',
    ],
    outcome_measures: [
      { name: 'SPADI (Shoulder Pain and Disability Index)', mcid: '13 points', target: '<= 12%' },
      { name: 'WORC (Western Ontario Rotator Cuff Index)', mcid: '12 points', target: '>= 85%' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Park\'s Diagnostic Cluster for Subacromial Impingement: 1. Positive Hawkins-Kennedy test; 2. Positive Painful Arc sign (60–120°); 3. Infraspinatus muscle test weakness. If all 3 are positive, positive likelihood ratio is 10.6.',
      vivaQuestions: [
        {
          question: 'What are the 3 tests in Park\'s diagnostic cluster for subacromial impingement?',
          answer: '1. Hawkins-Kennedy test; 2. Painful Arc sign (60–120°); 3. Resisted infraspinatus external rotation weakness. When all three are positive, the probability of subacromial impingement exceeds 95%.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Subacromial aching pain during reaching, overhead movements, and dressing. Painful arc between 60° and 120° of active arm elevation. Often associated with visible scapular dyskinesis (winging or anterior tilt).',
    bedsideAssessmentTests: [
      {
        testName: 'Hawkins-Kennedy Impingement Test',
        sensitivity: '80% (72–86%)',
        specificity: '56% (45–66%)',
        positiveLikelihoodRatio: '1.8',
        techniqueAndInterpretation: 'Arm flexed to 90°, elbow 90°; clinician forcefully internally rotates the shoulder. Positive if supraspinatus/bursa compressed against coracoacromial ligament reproducing pain.',
        evidenceCitation: 'Hawkins & Kennedy. Am J Sports Med; Hegedus et al. Br J Sports Med.',
      },
      {
        testName: 'Neer Impingement Test',
        sensitivity: '79%',
        specificity: '53%',
        techniqueAndInterpretation: 'Passive maximal forward flexion with shoulder in internal rotation while scapula is stabilized. Positive if concordant subacromial pain reproduced.',
        evidenceCitation: 'Neer CS 2nd. Clin Orthop Relat Res.',
      },
      {
        testName: 'Painful Arc Sign (60° to 120°)',
        sensitivity: '74%',
        specificity: '81%',
        positiveLikelihoodRatio: '3.9',
        techniqueAndInterpretation: 'Active arm abduction in frontal/scapular plane. Positive if pain occurs between 60° and 120° and subsides above 120°.',
        evidenceCitation: 'Kessel & Watson. J Bone Joint Surg Br.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'True AP (Grashey), Axillary, and Scapular Y / Supraspinatus Outlet views',
        indications: 'Evaluate acromial morphology (Bigliani Type I flat, Type II curved, Type III hooked) and subacromial spurs.',
        keyFindings: 'Type III hooked acromion or subacromial enthesophyte encroaching on outlet space.',
        accuracyOrYield: 'Standard initial structural assessment.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Scapulothoracic Realignment & Rotator Cuff Centering Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Space Expansion, Postural Reset & Subacromial Decompression',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Decompress subacromial space using active scapular retraction/upward rotation', 'Modulate bursal inflammation', 'Restore pain-free arm elevation below 60°'],
          exercisePrescription: [
            { category: 'Pectoral Release', exerciseName: 'Corner Pectoralis Minor Stretch & Lacrosse Ball Soft Tissue Release', dosage: '3 sets of 30s holds', clinicalRationale: 'Lengthens pectoralis minor to reverse anterior scapular tipping.' },
            { category: 'Posterior Capsule', exerciseName: 'Cross-Body Posterior Capsule Stretch & Sleeper Stretch', dosage: '3 sets of 30s', clinicalRationale: 'Relieves posterior capsular tightness that drives anterior-superior humeral head migration.' },
            { category: 'Rotator Isometrics', exerciseName: 'Submaximal Isometric External and Internal Rotation in Neutral', dosage: '5 sets of 30s holds', clinicalRationale: 'Activates humeral head depressors (infraspinatus, subscapularis) to open subacromial space.' },
          ],
          progressionCriteria: ['Hawkins-Kennedy test pain reduced by >= 50%', 'Pain-free active elevation to 90°', 'SPADI improved by >= 10 points'],
          precautionsAndContraindications: ['Avoid forced internal rotation at 90° flexion; avoid repetitive overhead fatigue'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Serratus Anterior & Scapulohumeral Motor Control',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen serratus anterior and lower trapezius to maintain upward rotation', 'Dynamic humeral head centering during elevation'],
          exercisePrescription: [
            { category: 'Serratus Anterior', exerciseName: 'Wall Slides with Resistance Band Around Forearms', dosage: '3 sets of 10 reps, hold 3s at top', clinicalRationale: 'Promotes scapular upward rotation and posterior tilt while maintaining external rotation.' },
            { category: 'Lower Trapezius', exerciseName: 'Prone Y-to-T Raises on Incline Bench with External Rotation', dosage: '3 sets of 10 reps', clinicalRationale: 'Strengthens lower trapezius to depress the scapular spine during abduction.' },
          ],
          progressionCriteria: ['Painful arc abolished or shifted above 140°', 'Sustains 10 repetitions of wall slides with perfect form'],
          precautionsAndContraindications: ['Ensure no upper trapezius shrugging compensation during arm lift'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Overhead Loading & Kinetic Chain Integration',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Overhead pressing and pulling with full scapular rhythm', 'Rotational core power integration'],
          exercisePrescription: [
            { category: 'Overhead Loading', exerciseName: 'Dumbbell Overhead Press in Scapular Plane (30° Forward of Frontal)', dosage: '3 sets of 10 reps', clinicalRationale: 'Builds overhead strength within the biomechanically optimal plane of the glenoid.' },
            { category: 'Pulling Mechanics', exerciseName: 'Single-Arm Cable Rows with Scapular Retraction and Reach', dosage: '3 sets of 12 reps per side', clinicalRationale: 'Retrains functional coordination between scapular and humeral motion.' },
          ],
          progressionCriteria: ['SPADI score < 12%', 'Full pain-free overhead elevation', 'Zero subacromial tenderness'],
          precautionsAndContraindications: ['Progress load gradually'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to High-Demand Overhead Work & Sports',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Return to overhead sports (volleyball, swimming, badminton) or overhead trades', 'Lifelong posture maintenance'],
          exercisePrescription: [
            { category: 'Sports Maintenance', exerciseName: 'Pre-Training Scapular Activation and Rotator Cuff Warm-Up Program', dosage: 'Prior to all overhead training', clinicalRationale: 'Maintains optimal rotator cuff centering and prevents recurrence.' },
          ],
          progressionCriteria: ['Complete resolution of symptoms and negative impingement tests'],
          precautionsAndContraindications: ['Maintain ongoing scapular stabilizer exercises'],
        },
      ],
    },
    clinicalPearls: [
      'Subacromial decompression surgery has been proven in multiple placebo-controlled sham trials (FIMPACT, CSAW) to provide NO benefit over structured exercise therapy for SAPS.',
    ],
  },

  {
    id: 'shoulder-adhesive-capsulitis',
    joint: 'Shoulder',
    name: 'Adhesive Capsulitis (Frozen Shoulder)',
    category: 'Glenohumeral Capsular Fibrosis & Synovial Contracture',
    tissue_group: 'soft',
    tissue_types: ['Bursa & Fascia', 'Articular Surface'],
    acuity: 'chronic',
    irritability: 'High',
    healing_stage: 'remodelling',
    red_flags: [
      'Posterior shoulder dislocation: Severe locked internal rotation following electric shock or grand mal seizure (Emergency reduction).',
      'Undiagnosed Pancoast lung apical tumor or breast malignancy presenting as frozen shoulder.',
      'Septic glenohumeral arthritis with severe pain, fever, and global rigidity.',
    ],
    when_to_refer: [
      'Severe intractable pain in Freezing phase failing medical therapy (intra-articular corticosteroid injection consultation).',
      'Persistent severe capsular contracture in Frozen phase after 6–9 months conservative care (hydrodilatation or manipulation under anesthesia).',
    ],
    outcome_measures: [
      { name: 'SPADI (Shoulder Pain and Disability Index)', mcid: '13 points', target: '<= 20%' },
      { name: 'Passive External Rotation at Side (degrees)', mcid: '10 degrees', target: '>= 45 degrees' },
      { name: 'Passive Abduction (degrees)', mcid: '15 degrees', target: '>= 150 degrees' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'Classic capsular pattern of restriction: External Rotation is most severely limited, followed by Abduction, then Internal Rotation (ER > ABD > IR). Equal restriction of BOTH active and passive motion with a firm capsular end-feel confirms adhesive capsulitis over rotator cuff tear.',
      vivaQuestions: [
        {
          question: 'What is the characteristic clinical capsular pattern of restriction in adhesive capsulitis?',
          answer: 'Passive External Rotation is restricted greatest of all, followed by Abduction, followed by Internal Rotation (ER > Abduction > IR), with equal loss of both active and passive range of motion.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Severe, unremitting nocturnal shoulder pain in the freezing phase, progressing to profound stiffness in the frozen phase. Inability to reach behind back, fasten bra, reach into back pocket, or wash hair. Equal loss of active and passive glenohumeral motion.',
    bedsideAssessmentTests: [
      {
        testName: 'Passive External Rotation at 0° Abduction (Comparison with Normal Side)',
        sensitivity: '92%',
        specificity: '90%',
        positiveLikelihoodRatio: '9.2',
        techniqueAndInterpretation: 'Passive external rotation tested with arm at side. Loss of >= 50% compared to contralateral side or < 30° absolute ROM with firm capsular end-feel confirms adhesive capsulitis.',
        evidenceCitation: 'Kelley et al. JOSPT (APTA CPG); Hanchard et al. Shoulder Elbow.',
      },
      {
        testName: 'Coracoid Process Tenderness Test',
        sensitivity: '96%',
        specificity: '87%',
        positiveLikelihoodRatio: '7.4',
        techniqueAndInterpretation: 'Direct palpation of the coracoid process. Exquisite tenderness correlates strongly with active coracohumeral ligament and rotator interval synovitis in early adhesive capsulitis.',
        evidenceCitation: 'Carbone et al. Int Orthop.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP and Axillary shoulder views',
        indications: 'MANDATORY rule-out of locked posterior dislocation, glenohumeral osteoarthritis, calcific tendinitis, and bone tumor.',
        keyFindings: 'Normal glenohumeral joint space and bone architecture; osteopenia of humeral head from disuse ("frozen shoulder osteopenia").',
        accuracyOrYield: 'Essential exclusion test.',
      },
      {
        modality: 'MRI Scan',
        description: 'Shoulder MRI / MR Arthrography Coronal Oblique T2 Fat-Suppressed sequences',
        indications: 'Reserved for diagnostic doubt or refractory cases.',
        keyFindings: 'Thickening of coracohumeral ligament (> 4 mm) and axillary recess capsule (> 4 mm), obliteration of subcoracoid fat triangle.',
        accuracyOrYield: 'High specificity for capsular contracture.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Irritability-Staged Capsular Mobilization & Evidence-Based Dosing Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Phase 1: Freezing (High Irritability) - Pain Relief, Injection & Low-Grade Motion',
          timeline: 'Months 0–3',
          clinicalGoals: ['Pain modulation (intra-articular corticosteroid injection provides dramatic early relief)', 'Respect high irritability (pain before end-range resistance)', 'Gentle pain-free pendular motion and sleeper stretch'],
          exercisePrescription: [
            { category: 'Pain-Free Motion', exerciseName: 'Codman Pendular Exercises with Relaxed Arm (No Added Weight)', dosage: '2 minutes, 3–4x daily', clinicalRationale: 'Stimulates synovial lubrication and mechanoreceptor pain gating without stretching inflamed capsule.' },
            { category: 'Painless AAROM', exerciseName: 'Supine Table-Assisted Elevation & Wand External Rotation within Pain-Free Arc', dosage: '2 sets of 10 gentle reps', clinicalRationale: 'Maintains neuromuscular motor representation without triggering capsular inflammatory flares.' },
            { category: 'Corticosteroid Support', exerciseName: 'Collaboration for Image-Guided Intra-Articular Corticosteroid Injection', dosage: 'Single injection in high irritability phase', clinicalRationale: 'Cochrane reviews prove early injection provides rapid, significant pain relief and accelerates recovery.' },
          ],
          progressionCriteria: ['Significant reduction in nocturnal resting pain', 'Pain occurs at or after end-range resistance (transition to moderate irritability)'],
          precautionsAndContraindications: ['STRICTLY CONTRAINDICATED: Aggressive high-velocity stretching or forceful end-range manipulation in freezing stage'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Phase 2: Frozen (Moderate Irritability) - Sustained Low-Load End-Range Stretching',
          timeline: 'Months 3–6',
          clinicalGoals: ['Overcome capsular contracture with Total End-Range Time (TERT) principle', 'Restore external rotation and abduction', 'Maitland Grade III–IV glenohumeral glides'],
          exercisePrescription: [
            { category: 'TERT Stretching', exerciseName: 'Low-Load Prolonged Wand External Rotation Stretch in Supine (Hold 30–60s)', dosage: '5 reps, 3–4x daily (accumulating > 15 minutes TERT daily)', clinicalRationale: 'TERT principle stimulates biological capsular plastic elongation and fibroblast remodeling.' },
            { category: 'Axillary Recess Glide', exerciseName: 'Inferior Glenohumeral Self-Mobilization with Strap / Bar', dosage: '3 sets of 10 oscillatory end-range glides', clinicalRationale: 'Mobilizes the contracted axillary pouch to restore active abduction.' },
            { category: 'Postural', exerciseName: 'Posterior Capsule Cross-Arm Stretch with Scapular Block', dosage: '3 sets of 30s', clinicalRationale: 'Stretches posterior capsule to restore internal rotation behind the back.' },
          ],
          progressionCriteria: ['External rotation increases by >= 15°', 'Abduction increases to >= 120°', 'SPADI improved by >= 20 points'],
          precautionsAndContraindications: ['Monitor post-exercise ache: must settle within 30 minutes'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Phase 3: Thawing (Low Irritability) - High-Load Remodeling & Strength Restoration',
          timeline: 'Months 6–9',
          clinicalGoals: ['End-range capsular stretching into external rotation and internal rotation behind back', 'Reactivate atrophied rotator cuff and scapular musculature'],
          exercisePrescription: [
            { category: 'Behind-the-Back', exerciseName: 'Internal Rotation Towel Pull Stretch Behind the Back', dosage: '3 sets of 30s holds', clinicalRationale: 'Lengthens contracted anterosuperior capsule and rotator interval.' },
            { category: 'Strengthening', exerciseName: 'Progressive Dumbbell External Rotation and Lat Pull-Downs', dosage: '3 sets of 10–12 reps at RPE 7', clinicalRationale: 'Restores strength lost during months of capsular disuse.' },
          ],
          progressionCriteria: ['External rotation >= 45°', 'Abduction >= 150°', 'SPADI < 25%'],
          precautionsAndContraindications: ['Maintain warm-up prior to deep end-range stretches'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Phase 4: Full Functional Recovery & Maintenance',
          timeline: 'Months 9–14+',
          clinicalGoals: ['Complete return to unrestricted occupational and athletic activities', 'Symmetrical bilateral range of motion'],
          exercisePrescription: [
            { category: 'Functional Fitness', exerciseName: 'Total Upper Body Strength, Swimming, and Overhead Mobility Maintenance', dosage: '3x weekly', clinicalRationale: 'Sustains optimal capsular elasticity and muscle balance.' },
          ],
          progressionCriteria: ['Near-symmetrical range of motion (within 10° of unaffected side)', 'Complete resolution of disability on SPADI (< 10%)'],
          precautionsAndContraindications: ['Reassure patient that natural history of adhesive capsulitis is benign with full resolution in > 90% of cases'],
        },
      ],
    },
    clinicalPearls: [
      'In high irritability (Freezing phase), aggressive stretching actually prolongs the freezing stage; respect irritability: inject early for pain, then apply Total End-Range Time (TERT) in the frozen stage.',
    ],
  },

  {
    id: 'shoulder-anterior-instability-bankart',
    joint: 'Shoulder',
    name: 'Anterior Glenohumeral Instability & Bankart Lesion',
    category: 'Traumatic Capsulolabral Avulsion / Anterior Dislocation',
    tissue_group: 'soft',
    tissue_types: ['Meniscus/Labrum/Cartilage', 'Ligament', 'Bone'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Axillary nerve palsy: Deltoid motor paralysis and anesthesia over the "regimental badge" area of lateral shoulder following dislocation.',
      'Significant glenoid bone loss (> 20–25% critical bone loss / "inverted pear" glenoid) requiring Latarjet coracoid transfer rather than soft tissue Bankart repair.',
      'Rotator cuff tear in patients > 40 years sustaining an anterior dislocation.',
    ],
    when_to_refer: [
      'Young competitive contact athlete (< 20 years old) with primary traumatic dislocation (recurrent dislocation rate > 70–90% without surgical repair).',
      'Glenoid bone loss > 15–20% on CT (Latarjet surgical consultation).',
    ],
    outcome_measures: [
      { name: 'WOSI (Western Ontario Shoulder Instability Index)', mcid: '10% (210 points)', target: '>= 80%' },
      { name: 'SANE (Single Assessment Numeric Evaluation)', mcid: '10 points', target: '>= 85%' },
      { name: 'NRS Instability Apprehension', mcid: '2 points', target: '0/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-18',
    teaching_notes: {
      clinicalReasoning: 'Apprehension-Relocation-Surprise (Release) test cluster has 96% sensitivity and 98% specificity. If apprehension is relieved by posterior pressure (Relocation) and sharply returns upon release (Surprise test), anterior labral detachment is confirmed.',
      vivaQuestions: [
        {
          question: 'What is a Bankart lesion and a Hill-Sachs lesion?',
          answer: 'A Bankart lesion is an avulsion of the anteroinferior glenoid labrum and inferior glenohumeral ligament (IGHL) from the glenoid rim. A Hill-Sachs lesion is a compression fracture of the posterosuperior humeral head created when it impacts the hard anterior glenoid rim during dislocation.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Acute anterior shoulder dislocation following forced abduction and external rotation (e.g., tackle, fall on outstretched hand). In chronic instability: recurrent episodes of subluxation or "dead arm syndrome" during throwing or overhead activities.',
    bedsideAssessmentTests: [
      {
        testName: 'Anterior Apprehension Test (90° Abduction, 90° External Rotation)',
        sensitivity: '72%',
        specificity: '96%',
        positiveLikelihoodRatio: '18.0',
        techniqueAndInterpretation: 'Patient supine; arm in 90° abduction and slowly externally rotated. Positive if patient displays sudden facial apprehension or resists further motion due to fear of dislocation.',
        evidenceCitation: 'Farber et al. Am J Sports Med; Hegedus et al. Br J Sports Med.',
      },
      {
        testName: 'Jobe Relocation Test',
        sensitivity: '81%',
        specificity: '92%',
        positiveLikelihoodRatio: '10.1',
        techniqueAndInterpretation: 'With apprehension present at 90/90, clinician applies posterior directed force to the anterior humeral head. Positive if apprehension and pain immediately disappear.',
        evidenceCitation: 'Jobe et al. Am J Sports Med.',
      },
      {
        testName: 'Surprise (Release) Test',
        sensitivity: '87%',
        specificity: '89%',
        positiveLikelihoodRatio: '7.9',
        techniqueAndInterpretation: 'Posterior pressure from relocation test is suddenly released. Positive if sudden sharp apprehension returns.',
        evidenceCitation: 'Gross et al. Arthroscopy.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Trauma Shoulder Series (True AP Grashey, Scapular Y, West Point Axillary, Stryker Notch)',
        indications: 'Confirm joint reduction, identify Hill-Sachs impaction, and assess bony Bankart fracture on West Point view.',
        keyFindings: 'Bony Bankart avulsion fracture at anteroinferior glenoid rim; Hill-Sachs posterosuperior humeral groove on Stryker Notch view.',
        accuracyOrYield: 'Standard initial trauma imaging.',
      },
      {
        modality: 'MRI Scan',
        description: 'MR Arthrography (MRA) with ABER (Abduction External Rotation) position',
        indications: 'Confirm soft tissue Bankart labral tear, ALPSA, Perthes lesion, and assess capsular volume.',
        keyFindings: 'Detachment of anteroinferior labrum with dye tracking beneath the labrum on ABER sequence.',
        accuracyOrYield: 'MRA sensitivity 93%, specificity 95% for Bankart tears.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Watson Anterior Instability & Dynamic Rotator Cuff Restraint Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Protection, Immobilization & Subscapularis Co-Contraction',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Sling immobilization for 1–2 weeks (longer does not decrease recurrence)', 'Protect anteroinferior labrum from abduction/external rotation', 'Submaximal isometric rotator cuff and deltoid activation'],
          exercisePrescription: [
            { category: 'Immobilization', exerciseName: 'Sling Wear during Daytime Ambulation & Sleeping', dosage: '1–2 weeks post-reduction', clinicalRationale: 'Allows acute hemarthrosis to settle and capsulolabral tissues to rest.' },
            { category: 'Subscapularis Activation', exerciseName: 'Submaximal Isometric Internal Rotation Against Towel Roll at Torso', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Subscapularis is the primary dynamic anterior barrier against humeral head translation.' },
            { category: 'Distal Conditioning', exerciseName: 'Elbow, Wrist, and Hand Active Range of Motion & Grip Strengthening', dosage: '3 sets of 15 reps, 3x daily', clinicalRationale: 'Prevents upper limb disuse stiffness and maintains forearm pump.' },
          ],
          progressionCriteria: ['Zero resting pain in sling', 'Able to perform submaximal isometric IR/ER without apprehension', 'Resolution of acute swelling'],
          precautionsAndContraindications: ['STRICTLY AVOID: Combined abduction and external rotation (90/90 position); avoid extension past torso plane'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Scapulothoracic Upward Rotation & Dynamic Centering (Below 60°)',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Restore active elevation to 90° in scapular plane', 'Strengthen serratus anterior to maintain glenoid face under humeral head', 'Subscapularis and posterior rotator cuff co-contraction'],
          exercisePrescription: [
            { category: 'Scapular Control', exerciseName: 'Prone Scapular Retractions and Serratus Punches in Supine', dosage: '3 sets of 12 reps', clinicalRationale: 'Watson et al. proved scapular repositioning directly reduces anterior glenohumeral shear.' },
            { category: 'Closed-Kinetic-Chain', exerciseName: 'Quadruped Weight Shifts & Table-Top Rocking', dosage: '3 sets of 30s', clinicalRationale: 'Axial compressive joint loading stimulates glenoid mechanoreceptors and co-contraction.' },
            { category: 'Rotator Cuff', exerciseName: 'Side-Lying External Rotation with Towel Roll (0° to 30° Arc Only)', dosage: '3 sets of 10 reps', clinicalRationale: 'Conditions posterior cuff to prevent anterior translation without stretching anterior capsule.' },
          ],
          progressionCriteria: ['Pain-free active elevation to 90° in scapular plane', 'Zero apprehension during daily ADLs', 'WOSI improved by >= 15%'],
          precautionsAndContraindications: ['Limit external rotation strictly to neutral (0°) during early weeks; no horizontal extension'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Perturbation Balance, Closed-Chain Stability & Dynamic Arc',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Introduce controlled external rotation past neutral in 45° abduction', 'Perturbation-based joint repositioning drills', 'Wall push-up progressions'],
          exercisePrescription: [
            { category: 'Perturbation', exerciseName: 'Rhythmic Stabilization Drills in 90° Supine Flexion (Rapid Manual Perturbations)', dosage: '3 sets of 30s holds', clinicalRationale: 'Retrains feed-forward subconscious rotator cuff reflexes to resist sudden joint displacement.' },
            { category: 'Closed Chain', exerciseName: 'Wall Push-Ups to Incline Bench Push-Ups with Scapular Protraction', dosage: '3 sets of 10–12 reps', clinicalRationale: 'Builds pectoral and serratus endurance in stable closed-chain postures.' },
          ],
          progressionCriteria: ['Apprehension test negative at 45° abduction', 'Symmetric rotator strength >= 85% LSI', 'WOSI score > 75%'],
          precautionsAndContraindications: ['Progress into 90/90 external rotation with extreme caution'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Sport-Specific Plyometrics, Deceleration & Return to Sport',
          timeline: 'Weeks 10–16+',
          clinicalGoals: ['Full return to contact sports or throwing', 'High-velocity plyometric deceleration and reactive catches'],
          exercisePrescription: [
            { category: 'Plyometrics', exerciseName: 'Two-Handed Overhead Medicine Ball Throws & Deceleration Catches', dosage: '3 sets of 10 reps', clinicalRationale: 'Retrains dynamic muscular restraint at end-range athletic velocity.' },
            { category: 'Sport-Specific', exerciseName: 'Graduated Throwing / Tackling Progression on Field', dosage: '2–3x weekly', clinicalRationale: 'Progressively re-loads the shoulder girdle under athletic fatigue.' },
          ],
          progressionCriteria: ['WOSI score > 85%', 'Apprehension-Relocation test completely negative', 'Passes sport-specific physical contact battery'],
          precautionsAndContraindications: ['Athletes under 20 with recurrent instability should be counseled on surgical stabilization'],
        },
      ],
    },
    clinicalPearls: [
      'In patients under 20 years old, recurrent dislocation after primary conservative management occurs in up to 90% of contact athletes; early orthopaedic consultation is vital for shared decision-making.',
    ],
  },

  {
    id: 'shoulder-slap-tear',
    joint: 'Shoulder',
    name: 'Superior Labrum Anterior to Posterior (SLAP) Tear',
    category: 'Superior Labrum / Long Head of Biceps Anchor Complex',
    tissue_group: 'soft',
    tissue_types: ['Meniscus/Labrum/Cartilage', 'Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Paralabral cyst in spinoglenoid notch causing suprascapular nerve compression: Marked painless infraspinatus atrophy and profound external rotation weakness.',
      'Associated rotator cuff full-thickness tear.',
    ],
    when_to_refer: [
      'Confirmed Type II SLAP tear in overhead throwing athlete with mechanical catching and loss of throwing velocity refractory to 3–6 months rehabilitation.',
      'Spinoglenoid paralabral cyst causing infraspinatus denervation (decompression candidate).',
    ],
    outcome_measures: [
      { name: 'WOSI (Western Ontario Shoulder Instability)', mcid: '10%', target: '>= 80%' },
      { name: 'Kerlan-Jobe Orthopaedic Clinic (KJOC) Score', mcid: '8 points', target: '>= 85/100' },
      { name: 'NRS Deep Shoulder Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'Biceps Load II test has 89% sensitivity and 96% specificity for Type II SLAP tears. Resisted elbow flexion at 120° abduction increases biceps anchor peel-back; pain indicates superior labral detachment.',
      vivaQuestions: [
        {
          question: 'What is the Snyder classification for SLAP lesions?',
          answer: 'Type I: Fraying of superior labrum with intact biceps anchor; Type II: Detachment of superior labrum and biceps anchor from glenoid (most common); Type III: Bucket-handle tear of superior labrum with intact biceps anchor; Type IV: Bucket-handle tear extending into the biceps tendon.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Deep superior shoulder pain, popping, clicking, and mechanical catching during overhead movements or throwing late cocking phase. "Dead arm" sensation on follow-through and loss of throwing velocity.',
    bedsideAssessmentTests: [
      {
        testName: 'Biceps Load II Test',
        sensitivity: '89%',
        specificity: '96%',
        positiveLikelihoodRatio: '22.0',
        techniqueAndInterpretation: 'Supine; shoulder 120° abduction, max external rotation, elbow 90° flexed and supinated; patient resists elbow flexion. Positive if deep superior shoulder pain reproduced.',
        evidenceCitation: 'Kim et al. Am J Sports Med; Hegedus et al. Br J Sports Med.',
      },
      {
        testName: 'O\'Brien\'s Active Compression Test',
        sensitivity: '67%',
        specificity: '73%',
        techniqueAndInterpretation: 'Arm flexed to 90°, 10° adduction; downward force resisted with thumb down (internal rotation), then repeated thumb up (external rotation). Positive if deep pain in thumb down is relieved in thumb up.',
        evidenceCitation: 'O\'Brien et al. Am J Sports Med.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'MR Arthrography (MRA) with intra-articular gadolinium and Coronal Oblique T2 sequences',
        indications: 'Confirm superior labral detachment, Snyder type, and detect paralabral cysts.',
        keyFindings: 'Gadolinium tracking under the superior labrum into the biceps anchor (> 2 mm gap) and orienting laterally.',
        accuracyOrYield: 'MRA sensitivity 84%, specificity 91% for SLAP tears.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'GIRD Resolution, Posterior Capsular Release & Scapular Dyskinesis SLAP Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Posterior Capsular Lengthening & GIRD Correction',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Correct Glenohumeral Internal Rotation Deficit (GIRD > 18–20°)', 'Lengthen posterior capsule and infraspinatus', 'Avoid biceps peel-back loading'],
          exercisePrescription: [
            { category: 'GIRD Resolution', exerciseName: 'Sleeper Stretch with Scapular Retraction Block', dosage: '3 sets of 30s holds, 2x daily', clinicalRationale: 'Burkhart et al. showed resolving posterior capsular contracture eliminates superior humeral head migration that drives peel-back.' },
            { category: 'Cross-Body Stretch', exerciseName: 'Cross-Body Adduction Stretch with Internal Rotation', dosage: '3 sets of 30s', clinicalRationale: 'Lengthens posterior deltoid and posterior capsule to restore total arc of motion.' },
            { category: 'Submaximal Isometrics', exerciseName: 'Isometric Rotator Cuff Strengthening at Side (0° Abduction)', dosage: '3 sets of 10 reps', clinicalRationale: 'Maintains rotator cuff tone without loading biceps labral anchor.' },
          ],
          progressionCriteria: ['GIRD reduced to < 15° compared to contralateral arm', 'Total rotational arc of motion symmetric within 5°', 'NRS pain <= 2/10'],
          precautionsAndContraindications: ['STRICTLY AVOID: Heavy biceps curls, pull-ups, aggressive overhead cocking (abduction + ER)'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Scapular Dynamic Control & Rotator Cuff Hypertrophy',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen serratus anterior and lower trapezius', 'Reactivate rotator cuff dynamically in mid-range elevation', 'Biceps Load II test negative'],
          exercisePrescription: [
            { category: 'Scapular Control', exerciseName: 'Prone Y-to-T Raises and Wall Slides with Forearm Band', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores scapular upward rotation and posterior tilt during arm elevation.' },
            { category: 'Rotator Cuff', exerciseName: 'Side-Lying External Rotation and Prone Row into External Rotation', dosage: '3 sets of 10 reps', clinicalRationale: 'Strengthens posterior cuff to dynamically de-center the humeral head away from the superior labrum.' },
          ],
          progressionCriteria: ['O\'Brien test negative', 'Biceps Load II test pain reduced by >= 50%', 'KJOC score improved by >= 10 points'],
          precautionsAndContraindications: ['Avoid heavy resisted elbow flexion at > 90° abduction'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Kinetic Chain Integration & Deceleration Power',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Posterior chain loading', 'Eccentric biceps deceleration training', 'Core rotational power transfers'],
          exercisePrescription: [
            { category: 'Eccentric Biceps', exerciseName: 'Controlled Eccentric Biceps Curls (Slow Lowering in Neutral Shoulder)', dosage: '3 sets of 10 reps, 4s eccentric tempo', clinicalRationale: 'Reconditions the long head of biceps tendon to absorb throwing follow-through forces.' },
            { category: 'Kinetic Chain', exerciseName: 'Cable Woodchops and Rotational Medicine Ball Throws from Hips', dosage: '3 sets of 10 reps', clinicalRationale: 'Transfers force generation to hips and core, sparing the shoulder girdle.' },
          ],
          progressionCriteria: ['Full painless active ROM in all planes', 'Negative Biceps Load II test', 'KJOC score > 80/100'],
          precautionsAndContraindications: ['Progress throwing drills strictly per interval criteria'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Interval Throwing Program & Competitive Return',
          timeline: 'Weeks 10–16+',
          clinicalGoals: ['Graduated Interval Throwing Program (ITP: 45ft -> 60ft -> 90ft -> 120ft)', 'Full return to competitive pitching or overhead sport'],
          exercisePrescription: [
            { category: 'Throwing Program', exerciseName: 'Axen et al. Interval Throwing Program (Step-by-Step Distance & Velocity Progression)', dosage: 'Every other day with recovery days', clinicalRationale: 'Gradually re-loads superior labrum under throwing kinematics.' },
          ],
          progressionCriteria: ['Pain-free completion of full ITP', 'Full clearance by sports orthopaedic specialist'],
          precautionsAndContraindications: ['Maintain daily sleeper stretches to prevent recurrence of posterior capsular tightness'],
        },
      ],
    },
    clinicalPearls: [
      'GIRD (Glenohumeral Internal Rotation Deficit) is the primary driver of SLAP tears in throwers; restoring posterior capsular flexibility cures up to 75% of Type II SLAP tears without surgery.',
    ],
  },

  {
    id: 'shoulder-ac-joint-separation',
    joint: 'Shoulder',
    name: 'Acromioclavicular (AC) Joint Sprain / Separation',
    category: 'Ligamentous Separation / Rockwood Classification',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Ligament', 'Bone'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'High-grade Rockwood Type IV, V, or VI AC separation: Posterior displacement of clavicle into trapezius (Type IV), > 100–300% superior displacement with severe skin tenting (Type V), or inferior subcoracoid displacement (Type VI) (MANDATORY surgical reconstruction).',
      'Distal clavicle fracture (Neer Type II) mimicking AC separation.',
      'Neurovascular compression of brachial plexus under displaced clavicle.',
    ],
    when_to_refer: [
      'Rockwood Type IV, V, or VI injury (urgent orthopaedic surgical reconstruction).',
      'Type III separation in overhead manual laborer or throwing athlete (surgical consideration).',
    ],
    outcome_measures: [
      { name: 'DASH (Disabilities of Arm, Shoulder & Hand)', mcid: '10.8 points', target: '<= 12' },
      { name: 'NRS AC Joint Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Cross-Body Adduction Pain Score', mcid: 'Resolution', target: 'Pain-free cross-body reach' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Cross-Body (Horizontal) Adduction Test compresses the acromion against the distal clavicle, reproducing focal AC joint pain. Paxinos test (dual-finger compression) has 79% sensitivity and 50% specificity. Rockwood grades I–II are treated non-operatively; IV–VI operatively; III individually.',
      vivaQuestions: [
        {
          question: 'What are the anatomical structures injured in Rockwood Type I vs Type II vs Type III AC joint separations?',
          answer: 'Type I: AC ligament sprain, CC (coracoclavicular) ligaments intact; Type II: Complete rupture of AC ligaments, CC ligaments sprained; Type III: Complete rupture of BOTH AC ligaments and CC ligaments (conoid and trapezoid) with 25–100% clavicular elevation.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Acute pain over the top of the shoulder following a direct blow or fall onto the lateral point of the shoulder. Visible "step deformity" at the distal clavicle, localized swelling, and exquisite tenderness directly over the AC joint. Painful horizontal adduction.',
    bedsideAssessmentTests: [
      {
        testName: 'Cross-Body (Horizontal) Adduction Test',
        sensitivity: '77%',
        specificity: '79%',
        positiveLikelihoodRatio: '3.7',
        techniqueAndInterpretation: 'Arm flexed to 90°; passively adducted fully across the chest. Positive if localized, sharp concordant pain elicited at the AC joint.',
        evidenceCitation: 'Chronopoulos et al. J Bone Joint Surg Am; Hegedus et al. Br J Sports Med.',
      },
      {
        testName: 'Paxinos Test (Dual-Finger AC Compression)',
        sensitivity: '79%',
        specificity: '50%',
        techniqueAndInterpretation: 'Clinician places thumb on posterolateral acromion and index/middle fingers on superior clavicle, applying anterosuperior pressure to acromion and inferior pressure to clavicle. Positive if AC joint pain reproduced.',
        evidenceCitation: 'Walton et al. J Shoulder Elbow Surg.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Bilateral Weight-Bearing and Non-Weight-Bearing AC Joint Views (Zanca View with 10–15° cephalic tilt)',
        indications: 'Confirm Rockwood grade and measure coracoclavicular (CC) distance compared to normal contralateral shoulder.',
        keyFindings: 'Widening of AC joint space (> 7 mm), increased CC distance (> 25–50% in Type III, > 100% in Type V).',
        accuracyOrYield: 'Zanca view optimizes AC joint visualization without thoracic overlap.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Rockwood Type I–III Non-Operative Progressive AC Rehabilitation Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Sling Protection, Pain Calming & AC Joint Unloading',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Support arm weight in sling to eliminate downward gravitational traction on the AC joint', 'Control acute hematoma and swelling', 'Gentle active hand/wrist/elbow motion'],
          exercisePrescription: [
            { category: 'Joint Support', exerciseName: 'Sling Support with Forearm Cradled to Elevate Scapula', dosage: 'Worn continuously for 1–2 weeks (Type I: 3–5 days; Type II/III: 2 weeks)', clinicalRationale: 'Relieves vertical traction of arm weight on healing coracoclavicular ligaments.' },
            { category: 'Distal Mobility', exerciseName: 'Elbow Flexion/Extension, Wrist Pumps, and Ball Squeezes', dosage: '3 sets of 15 reps, 3x daily', clinicalRationale: 'Prevents upper limb disuse stiffness.' },
            { category: 'Gentle Scapular', exerciseName: 'Active Scapular Retractions and Gentle Shoulder Shrugs in Sling', dosage: '2 sets of 10 gentle reps', clinicalRationale: 'Activates upper trapezius to assist clavicular elevation.' },
          ],
          progressionCriteria: ['Able to remove sling without severe pain', 'Resting VAS score <= 3/10', 'Incision/wound intact if post-surgical'],
          precautionsAndContraindications: ['STRICTLY AVOID: Cross-body horizontal adduction, heavy carrying with hanging arm, overhead reaching'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Sling Weaning, Scapular Elevation & Active ROM Below 90°',
          timeline: 'Weeks 2–4',
          clinicalGoals: ['Wean off sling', 'Restore active elevation to 90° in scapular plane', 'Strengthen upper trapezius and deltoid to support clavicle'],
          exercisePrescription: [
            { category: 'Active-Assisted ROM', exerciseName: 'Table Slides and Supine Wand Elevation up to 90°', dosage: '3 sets of 10 reps within comfortable limits', clinicalRationale: 'Restores glenohumeral excursion without stressing AC joint end-range.' },
            { category: 'Clavicular Support', exerciseName: 'Low-Load Scapular Shrugs and Prone Scapular Retractions', dosage: '3 sets of 12 reps, hold 3s at top', clinicalRationale: 'Hypertrophies upper trapezius to dynamically stabilize the elevated clavicle.' },
          ],
          progressionCriteria: ['Full active elevation to 90° in scapular plane', 'Paxinos test tenderness diminished by >= 50%'],
          precautionsAndContraindications: ['Avoid horizontal adduction past midline and heavy lifting > 2 kg'],
        },
        {
          phaseNumber: 3,
          phaseName: 'End-Range ROM, Functional Strength & Horizontal Loading',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Restore full overhead active elevation', 'Introduce controlled cross-body adduction', 'Progressive resistance training for shoulder girdle'],
          exercisePrescription: [
            { category: 'Overhead Elevation', exerciseName: 'Full Overhead Wand Elevation and Wall Climbs', dosage: '3 sets of 10 reps to full range', clinicalRationale: 'Restores terminal clavicular rotation at the sternoclavicular and AC joints.' },
            { category: 'Strengthening', exerciseName: 'Dumbbell Lateral Raises (to 90°), Rows, and Incline Chest Press', dosage: '3 sets of 10 reps at moderate load', clinicalRationale: 'Strengthens deltoid and pectoralis major to absorb future impacts.' },
          ],
          progressionCriteria: ['Full pain-free active ROM', 'DASH score < 15', 'Cross-body adduction test negative'],
          precautionsAndContraindications: ['Progress load gradually; monitor for AC joint aching'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Contact Sports Conditioning & Return to Sport',
          timeline: 'Weeks 8–12+',
          clinicalGoals: ['Return to contact sports (rugby, football, hockey, martial arts) or heavy manual labor', 'Impact padding protection'],
          exercisePrescription: [
            { category: 'Return to Contact', exerciseName: 'Controlled Push-Ups, Medicine Ball Chest Passes, and Shoulder Tackling Pads Drills', dosage: '2–3x weekly progression', clinicalRationale: 'Restores tolerance to direct axial and lateral compressive impacts.' },
            { category: 'Protective Padding', exerciseName: 'Custom Donut Doughnut Pad Application Over AC Joint during Contact Sports', dosage: 'Worn during games for first season', clinicalRationale: 'Disperses direct contact forces away from the recovering AC joint.' },
          ],
          progressionCriteria: ['Full clearance by sports physician', 'Pain-free direct impact tolerance'],
          precautionsAndContraindications: ['Wear protective shoulder padding during contact sports for 6 months'],
        },
      ],
    },
    clinicalPearls: [
      'Randomized trials (Canadian Orthopaedic Trauma Society) show that Rockwood Type III injuries treated non-operatively have equivalent long-term outcomes to surgery, with faster return to work and fewer complications.',
    ],
  },

  {
    id: 'shoulder-biceps-tendinopathy',
    joint: 'Shoulder',
    name: 'Biceps Tendinopathy / SLAP-Biceps Complex',
    category: 'Long Head of Biceps Brachii Overuse & Instability',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Acute rupture of long head of biceps ("Popeye" deformity): Sudden pop during heavy lifting with distal retraction of muscle belly into lower arm (Non-operative in elderly; surgical tenodesis evaluation in young active laborers).',
      'Dislocation of biceps tendon out of bicipital groove (indicates subscapularis tendon tear).',
    ],
    when_to_refer: [
      'Acute rupture in young manual worker/athlete seeking biceps tenodesis.',
      'Medial dislocation of biceps tendon with full-thickness subscapularis tear (surgical repair).',
    ],
    outcome_measures: [
      { name: 'DASH Score', mcid: '10.8 points', target: '<= 12' },
      { name: 'NRS Bicipital Groove Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Yergason / Speed Test Pain Resolution', mcid: 'Resolution', target: 'Negative testing' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Speed\'s test resists shoulder forward flexion with elbow extended and forearm supinated; Yergason\'s test resists forearm supination with elbow at 90° while palpating the bicipital groove. Tenderness directly in the bicipital groove 3–5 cm distal to acromion confirms long head biceps pathology.',
      vivaQuestions: [
        {
          question: 'What constitutes the biceps pulley system and what stabilizes the tendon in the groove?',
          answer: 'The biceps reflection pulley comprises the superior glenohumeral ligament (SGHL), coracohumeral ligament (CHL), and fibers of the subscapularis and supraspinatus tendons, preventing medial subluxation of the biceps tendon.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Anterior shoulder ache localized directly over the bicipital groove. Aggravated by shoulder flexion, overhead throwing follow-through, carrying objects with flexed elbows, and reaching into the back seat of a car.',
    bedsideAssessmentTests: [
      {
        testName: 'Speed\'s Test (Straight Arm Flexion)',
        sensitivity: '68%',
        specificity: '56%',
        positiveLikelihoodRatio: '1.5',
        techniqueAndInterpretation: 'Arm flexed 90°, elbow fully extended, forearm fully supinated; downward resistance applied. Positive if sharp localized pain reproduced in the bicipital groove.',
        evidenceCitation: 'Bennett. Orthopedics; Hegedus et al. Br J Sports Med.',
      },
      {
        testName: 'Yergason\'s Test (Resisted Supination)',
        sensitivity: '43%',
        specificity: '79%',
        positiveLikelihoodRatio: '2.0',
        techniqueAndInterpretation: 'Elbow flexed to 90°, forearm pronated; patient attempts active supination and external rotation against resistance while clinician palpates bicipital groove. Positive if pain or tendon pop felt.',
        evidenceCitation: 'Yergason. J Bone Joint Surg Am.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'Dynamic High-Resolution Ultrasound of Long Head Biceps Tendon in Bicipital Groove',
        indications: 'Assess tenosynovial fluid halo, longitudinal split tears, and dynamic medial dislocation during internal/external rotation.',
        keyFindings: 'Tenosynovial fluid cuff > 3 mm ("target sign"), hypoechoic tendon thickening, subluxation out of groove on internal rotation.',
        accuracyOrYield: 'Ultrasound sensitivity 86%, specificity 90% for biceps subluxation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Bicipital Groove De-Loading & Progressive Eccentric Tendon Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Tendon De-Loading, Transverse Ligament Protection & Pain Calming',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Avoid provocative loaded shoulder flexion and end-range external rotation', 'Modulate tenosynovial sheath inflammation', 'Isometric elbow and shoulder activation'],
          exercisePrescription: [
            { category: 'Activity Modification', exerciseName: 'Carrying Heavy Objects Close to Torso with Neutral Forearms (Avoid Full Extension)', dosage: 'Continuous', clinicalRationale: 'Reduces peak tensile and shear forces across the bicipital groove.' },
            { category: 'Isometric Loading', exerciseName: 'Isometric Elbow Flexion at 90° with Shoulder in Neutral Extension', dosage: '5 sets of 30s holds at 60% MVC, 2x daily', clinicalRationale: 'Provides analgesic mechanotransduction to the biceps tendon without groove friction.' },
            { category: 'Posterior Capsule', exerciseName: 'Cross-Body Posterior Shoulder Stretch', dosage: '3 sets of 30s', clinicalRationale: 'Reduces anterior humeral head shear that compresses the biceps tendon.' },
          ],
          progressionCriteria: ['Bicipital groove palpation tenderness reduced by >= 50%', 'Speed\'s test pain <= 2/10', 'DASH improved by >= 10 points'],
          precautionsAndContraindications: ['Avoid heavy straight-arm forward raises, overhead throwing, and repetitive chin-ups'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Heavy Slow Resistance (HSR) & Biceps Tendon Remodeling',
          timeline: 'Weeks 3–8',
          clinicalGoals: ['Progressive slow concentric-eccentric biceps curls', 'Strengthen subscapularis to maintain medial groove containment', 'Scapular stabilizing drills'],
          exercisePrescription: [
            { category: 'Heavy Slow Resistance', exerciseName: 'Incline Dumbbell Biceps Curls (Slow 3s Concentric / 3s Eccentric Tempo)', dosage: '3 sets of 10 reps at RPE 7', clinicalRationale: 'Loads the tendon under controlled tension to promote collagen alignment and stiffness.' },
            { category: 'Subscapularis Strength', exerciseName: 'Internal Rotation with Cable at Side (Towel Roll Between Arm and Torso)', dosage: '3 sets of 12 reps', clinicalRationale: 'Strengthens subscapularis tendon fibers which form the medial wall of the bicipital groove.' },
            { category: 'Scapular Upward Rotation', exerciseName: 'Serratus Wall Slides with Band', dosage: '3 sets of 10 reps', clinicalRationale: 'Clears the subacromial space to prevent secondary impingement on the biceps tendon.' },
          ],
          progressionCriteria: ['Speed\'s and Yergason\'s tests negative', 'Able to perform 10RM incline biceps curls pain-free', 'Full active pain-free shoulder flexion'],
          precautionsAndContraindications: ['Maintain controlled tempo; avoid dropping weights ballistically during eccentric phase'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Multi-Planar Strength & Overhead Kinetic Chain Loading',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Reintroduce overhead pulling and pressing', 'Eccentric deceleration training for throwing follow-through'],
          exercisePrescription: [
            { category: 'Overhead Pulling', exerciseName: 'Neutral-Grip Lat Pull-Downs and Cable Rows', dosage: '3 sets of 10 reps', clinicalRationale: 'Reconditions biceps long head and brachialis under multi-joint compound movement.' },
            { category: 'Deceleration Control', exerciseName: 'Eccentric Shoulder Flexion Deceleration with Resistance Band', dosage: '3 sets of 12 reps', clinicalRationale: 'Simulates the deceleration phase of throwing and overhead hitting.' },
          ],
          progressionCriteria: ['DASH score < 12', 'Painless overhead activities', 'Normal strength across upper extremity testing'],
          precautionsAndContraindications: ['Progress overhead load gradually'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Sport & Long-Term Shoulder Health',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Full return to sports (cricket bowling, baseball, tennis, weightlifting) or manual work', 'Lifelong maintenance of rotator cuff balance'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Weekly Incline Biceps Eccentric Routine and Rotator Cuff Maintenance', dosage: '2x weekly', clinicalRationale: 'Prevents recurrent tenosynovial inflammation.' },
          ],
          progressionCriteria: ['Full functional independence with zero anterior shoulder pain'],
          precautionsAndContraindications: ['Maintain warm-up prior to high-velocity throwing or heavy lifts'],
        },
      ],
    },
    clinicalPearls: [
      'Isolated biceps tendinopathy is rare (< 5%); in > 95% of cases, biceps tendinopathy is secondary to subacromial impingement, rotator cuff tears, or subscapularis insufficiency.',
    ],
  },

  // ==========================================
  // ELBOW (6 Conditions)
  // ==========================================
  {
    id: 'elbow-lateral-epicondylalgia',
    joint: 'Elbow',
    name: 'Lateral Epicondylalgia (Tennis Elbow / ECRB Tendinopathy)',
    category: 'Common Extensor Tendon Overuse / Angiofibroblastic Tendinosis',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Bone'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Radial tunnel syndrome: Posterior interosseous nerve (PIN) entrapment with motor weakness (finger/thumb drop) without sensory loss, tenderness 4 cm distal to epicondyle.',
      'Osteochondritis dissecans (OCD) of the capitellum in adolescent throwing athlete.',
      'Posterolateral rotatory instability (PLRI) with clicking and clunking.',
    ],
    when_to_refer: [
      'Refractory lateral epicondylalgia failing 6–12 months structured loading therapy (consider PRP or open/arthroscopic ECRB debridement).',
      'Suspected PIN motor paresis (finger drop).',
    ],
    outcome_measures: [
      { name: 'PRTEE (Patient-Rated Tennis Elbow Evaluation)', mcid: '11 points', target: '<= 15/100' },
      { name: 'Pain-Free Grip Strength (Dynamometer in kg)', mcid: '15% increase', target: '>= 90% of unaffected side' },
      { name: 'NRS Lateral Elbow Pain', mcid: '2 points', target: '<= 1/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Cozen\'s test resists active wrist extension/radial deviation with elbow extended; Mill\'s test passively stretches the common extensor origin into wrist flexion and pronation; Maudsley\'s test resists 3rd digit extension, isolating the extensor carpi radialis brevis (ECRB).',
      vivaQuestions: [
        {
          question: 'Which specific muscle tendon is most consistently involved in tennis elbow and why?',
          answer: 'The Extensor Carpi Radialis Brevis (ECRB). Its origin is vulnerable to both tensile strain during gripping and internal friction/abrasion as it passes directly over the lateral edge of the capitellum during elbow flexion/extension.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Pain and burning over the lateral epicondyle radiating down the posterior forearm. Weakened grip strength, pain when shaking hands, turning doorknobs, holding a coffee cup, or typing. Point tenderness 1–2 mm distal and anterior to the lateral epicondyle.',
    bedsideAssessmentTests: [
      {
        testName: 'Cozen\'s Test (Resisted Wrist Extension)',
        sensitivity: '84%',
        specificity: '78%',
        positiveLikelihoodRatio: '3.8',
        techniqueAndInterpretation: 'Elbow stabilized at 90°, forearm pronated; patient makes a fist and actively extends and radially deviates wrist against clinician\'s resistance. Positive if sharp lateral epicondyle pain reproduced.',
        evidenceCitation: 'Cozen. Clin Orthop Relat Res; Saroja et al. J Clin Diagn Res.',
      },
      {
        testName: 'Maudsley\'s Test (Resisted Middle Finger Extension)',
        sensitivity: '76%',
        specificity: '82%',
        techniqueAndInterpretation: 'Patient extends 3rd digit against resistance at the proximal interphalangeal joint. Positive if concordant pain reproduced at the lateral epicondyle (selectively tensions ECRB).',
        evidenceCitation: 'Maudsley et al. J Bone Joint Surg Br.',
      },
      {
        testName: 'Pain-Free Grip Strength Test (Dynamometer)',
        sensitivity: '89%',
        specificity: '85%',
        techniqueAndInterpretation: 'Measure grip force at the exact instant pain is first felt. A deficit > 20% compared to contralateral side is diagnostic and tracks treatment recovery.',
        evidenceCitation: 'Vicenzino et al. Phys Ther.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-Resolution Ultrasound of Common Extensor Tendon Origin',
        indications: 'Confirm ECRB tendinopathy, intrasubstance tears, cortical bone irregularity, and neovascularity.',
        keyFindings: 'Tendon thickening, focal hypoechogenicity, partial-thickness tear at deeper ECRB footprint, power Doppler neovascular flow.',
        accuracyOrYield: 'Ultrasound sensitivity 88%, specificity 90% for lateral epicondylalgia.',
      },
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP and Lateral Elbow Views',
        indications: 'Screen for lateral epicondyle calcification, capitellum OCD, or radiocapitellar arthrosis.',
        keyFindings: 'Usually normal; traction spur or periosteal calcification in chronic cases.',
        accuracyOrYield: 'Initial rule-out of intra-articular pathology.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Tyler / Peterson Eccentric & Isometric Common Extensor Loading Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Load Modification, Counterforce Bracing & Analgesic Isometrics',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Modify repetitive gripping habits (power grip in pronation)', 'Apply counterforce tennis elbow forearm strap', 'Analgesic isometric wrist extensor contractions'],
          exercisePrescription: [
            { category: 'External Support', exerciseName: 'Counterforce Forearm Splint / Epicondylitis Clasp', dosage: 'Worn during daytime manual activities', clinicalRationale: 'Dissipates peak tensile forces and shifts the mechanical origin point 2–3 cm distally away from the inflamed tenoperiosteal junction.' },
            { category: 'Analgesic Isometrics', exerciseName: 'Isometric Wrist Extension Against Flat Table (Elbow at 90°, Wrist in 30° Extension)', dosage: '5 sets of 45s holds at 70% effort, 2x daily', clinicalRationale: 'Produces immediate cortical inhibition and pain relief via mechanotransduction.' },
            { category: 'Radial Neurodynamics', exerciseName: 'Radial Nerve Sliders in Seated Position', dosage: '2 sets of 10 smooth reps', clinicalRationale: 'Relieves mechanical sensitivity of the radial nerve which is sensitized in up to 30% of tennis elbow cases.' },
          ],
          progressionCriteria: ['Pain-free grip strength increases by >= 15%', 'NRS resting pain reduced to <= 2/10', 'PRTEE score improves by >= 11 points'],
          precautionsAndContraindications: ['Avoid heavy forceful gripping in pronation; avoid high-velocity ballistic movements'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Tyler Twist & Eccentric-Concentric Hypertrophy',
          timeline: 'Weeks 3–8',
          clinicalGoals: ['Tyler Twist eccentric ECRB loading using rubber resistance bar (FlexBar)', 'Progress slow heavy resistance training with dumbbells', 'Achieve 80% grip strength symmetry'],
          exercisePrescription: [
            { category: 'Tyler Twist', exerciseName: 'Tyler Twist with TheraBand FlexBar (Eccentric Wrist Extension)', dosage: '3 sets of 15 reps daily (Tyler et al. JOSPT)', clinicalRationale: 'Produces isolated eccentric contraction of the wrist extensors, stimulating tenocyte collagen synthesis without tensile overload.' },
            { category: 'Heavy Slow Resistance', exerciseName: 'Dumbbell Wrist Extension (Slow 3s Concentric / 3s Eccentric Tempo)', dosage: '3 sets of 10–12 reps at RPE 7', clinicalRationale: 'Progressively loads common extensor tendon to increase tensile stiffness.' },
            { category: 'Forearm Supination', exerciseName: 'Resisted Supination with Asymmetric Dumbbell / Hammer', dosage: '3 sets of 12 reps', clinicalRationale: 'Strengthens supinator muscle, which shares the lateral epicondylar fascia.' },
          ],
          progressionCriteria: ['Cozen\'s and Maudsley\'s tests negative', 'Pain-free grip strength >= 85% of unaffected side', 'PRTEE score < 25/100'],
          precautionsAndContraindications: ['Monitor next-morning tendon stiffness; adjust resistance to keep pain <= 3/10'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Full Kinetic Chain & High-Demand Functional Strength',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Integrate shoulder and scapular stabilizers to offload the forearm', 'Power gripping and sports/work-specific tools'],
          exercisePrescription: [
            { category: 'Kinetic Chain', exerciseName: 'Standing Cable Rows into Shoulder External Rotation with Strong Grip', dosage: '3 sets of 12 reps', clinicalRationale: 'Ensures shoulder stabilizers take up ground reaction forces so the wrist extensors do not overwork.' },
            { category: 'Farmer Carries', exerciseName: 'Farmer Walks with Moderate Kettlebells (Focus on Neutral Wrist)', dosage: '3 sets of 30 meters', clinicalRationale: 'Builds sustained isometric forearm grip endurance under functional posture.' },
          ],
          progressionCriteria: ['PRTEE score < 15/100', 'Pain-free full-force grip on dynamometer', 'Normal tolerance to manual work/tennis'],
          precautionsAndContraindications: ['Maintain neutral wrist position during heavy lifts'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Sport/Work & Long-Term Prevention',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Return to competitive tennis, racket sports, or full manual trades', 'Racket grip size optimization', 'Lifelong maintenance'],
          exercisePrescription: [
            { category: 'Equipment Optimization', exerciseName: 'Tennis Racket Grip Size Adjustment & Lowering String Tension', dosage: 'Permanent', clinicalRationale: 'Decreases shock transmission to the lateral epicondyle on off-center ball impacts.' },
            { category: 'Maintenance', exerciseName: 'Tyler Twist Maintenance Session 2x Weekly', dosage: 'Indefinitely', clinicalRationale: 'Maintains tendon collagen alignment and prevents recurrence.' },
          ],
          progressionCriteria: ['100% painless sports match play and manual occupational endurance'],
          precautionsAndContraindications: ['Continue ongoing forearm stretching and warm-up routines'],
        },
      ],
    },
    clinicalPearls: [
      'Corticosteroid injections for tennis elbow provide short-term pain relief at 6 weeks, but produce disastrous long-term outcomes with a 72% recurrence rate at 1 year (Bisset et al. BMJ); progressive eccentric exercise is far superior.',
    ],
  },

  {
    id: 'elbow-medial-epicondylalgia',
    joint: 'Elbow',
    name: 'Medial Epicondylalgia (Golfer\'s Elbow / Pronator Teres)',
    category: 'Common Flexor Tendon Overuse / Enthesopathy',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Bone'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Ulnar Collateral Ligament (UCL) rupture in throwing athlete: Medial elbow "pop" during throw, positive Moving Valgus Stress test (Tommy John candidate).',
      'Ulnar neuropathy: Numbness and tingling radiating into 4th and 5th digits, positive Tinel at cubital tunnel.',
    ],
    when_to_refer: [
      'Complete UCL tear with medial instability in competitive throwing athlete.',
      'Refractory pain failing 6 months conservative management.',
    ],
    outcome_measures: [
      { name: 'PRTEE (Patient-Rated Tennis/Elbow Evaluation - Medial)', mcid: '11 points', target: '<= 15/100' },
      { name: 'NRS Medial Elbow Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Grip Strength Symmetry', mcid: '15%', target: '>= 90% LSI' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Resisted wrist flexion and pronation with elbow extended directly tensions the pronator teres and flexor carpi radialis (FCR). Always perform the Moving Valgus Stress test to differentiate medial epicondylalgia from UCL insufficiency.',
      vivaQuestions: [
        {
          question: 'Which two muscles of the common flexor tendon origin are most frequently involved in golfer\'s elbow?',
          answer: 'The Pronator Teres and the Flexor Carpi Radialis (FCR).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Pain and localized tenderness over the medial epicondyle radiating into the volar forearm. Exacerbated by wrist flexion, forearm pronation, carrying heavy bags, golfing swings, and tennis topspin forehands.',
    bedsideAssessmentTests: [
      {
        testName: 'Golfer\'s Elbow Test (Resisted Wrist Flexion & Pronation)',
        sensitivity: '82%',
        specificity: '85%',
        positiveLikelihoodRatio: '5.5',
        techniqueAndInterpretation: 'Elbow extended, forearm supinated; patient attempts active wrist flexion and pronation against clinician\'s resistance. Positive if sharp concordant pain reproduced at the medial epicondyle.',
        evidenceCitation: 'Gabel & Morrey. J Bone Joint Surg Am; Ciccotti et al. J Am Acad Orthop Surg.',
      },
      {
        testName: 'Reverse Mill\'s Test (Passive Flexor Stretch)',
        sensitivity: '74%',
        specificity: '78%',
        techniqueAndInterpretation: 'Clinician passively extends elbow while fully extending the wrist and fingers. Positive if sharp medial epicondyle stretch pain elicited.',
        evidenceCitation: 'Polkinghorn. J Manipulative Physiol Ther.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-Resolution Ultrasound of Common Flexor Tendon and Pronator Teres',
        indications: 'Confirm flexor origin tendinopathy, intrasubstance tears, and exclude ulnar collateral ligament disruption.',
        keyFindings: 'Hypoechoic thickening of common flexor tendon origin, loss of fibrillar architecture, intact UCL.',
        accuracyOrYield: 'High diagnostic yield for soft tissue differentiation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Reverse Tyler Twist & Eccentric Common Flexor Tendon Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Load Modification, Counterforce Bracing & Analgesic Isometrics',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Modify repetitive wrist flexion and pronation activities', 'Counterforce medial elbow strap application', 'Analgesic isometric wrist flexion contractions'],
          exercisePrescription: [
            { category: 'External Support', exerciseName: 'Medial Counterforce Forearm Strap', dosage: 'Worn during manual work and lifting', clinicalRationale: 'Reduces tensile strain at the tenoperiosteal junction of the medial epicondyle.' },
            { category: 'Analgesic Isometrics', exerciseName: 'Isometric Wrist Flexion Against Flat Table (Elbow 90°, Wrist in 20° Flexion)', dosage: '5 sets of 45s holds at 70% effort, 2x daily', clinicalRationale: 'Stimulates mechanotransduction and downregulates central nociceptive transmission.' },
            { category: 'Ulnar Nerve Gliding', exerciseName: 'Gentle Ulnar Nerve Sliders in Seated Position', dosage: '2 sets of 10 smooth reps', clinicalRationale: 'Prevents ulnar nerve adherence in the adjacent retrocondylar groove.' },
          ],
          progressionCriteria: ['Significant reduction in resting medial elbow ache', 'Golfer\'s elbow test pain reduced by >= 50%', 'PRTEE improved by >= 10 points'],
          precautionsAndContraindications: ['Avoid heavy loaded wrist flexion, golf driving range sessions, and tight repetitive gripping'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Reverse Tyler Twist & Progressive Eccentric Flexor Loading',
          timeline: 'Weeks 3–8',
          clinicalGoals: ['Reverse Tyler Twist with TheraBand FlexBar', 'Dumbbell eccentric wrist flexion and pronation loading', 'Restore grip strength'],
          exercisePrescription: [
            { category: 'Reverse Tyler Twist', exerciseName: 'Reverse Tyler Twist with Rubber FlexBar (Eccentric Wrist Flexion)', dosage: '3 sets of 15 reps daily', clinicalRationale: 'Directly isolates the wrist flexors in an eccentric loading cycle to stimulate collagen remodeling.' },
            { category: 'Eccentric Dumbbell', exerciseName: 'Dumbbell Wrist Flexion with Slow Lowering (3s Concentric / 3s Eccentric)', dosage: '3 sets of 10 reps at RPE 7', clinicalRationale: 'Builds flexor carpi radialis tensile capacity.' },
            { category: 'Pronator Loading', exerciseName: 'Asymmetric Dumbbell Resisted Pronation Drills', dosage: '3 sets of 12 reps', clinicalRationale: 'Reconditions pronator teres under controlled angular velocity.' },
          ],
          progressionCriteria: ['Golfer\'s elbow test completely negative', 'Pain-free grip strength >= 85% of contralateral side', 'PRTEE score < 25/100'],
          precautionsAndContraindications: ['Monitor next-morning tendon response; ensure pain settles within 24 hours'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Kinetic Chain & Pulling Strength',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Compound upper body pulling (rows, lat pull-downs)', 'Rotational core power for golf/tennis swing mechanics'],
          exercisePrescription: [
            { category: 'Compound Pulling', exerciseName: 'Cable Lat Pull-Downs with Neutral Grip', dosage: '3 sets of 10 reps', clinicalRationale: 'Integrates forearm flexor grip with latissimus dorsi and core stabilizers.' },
            { category: 'Core Rotation', exerciseName: 'Golf/Tennis Swing Cable Rotation Drills with Hip Drive Focus', dosage: '3 sets of 12 reps', clinicalRationale: 'Ensures swing power originates from pelvis and hips rather than over-relying on forearm snap.' },
          ],
          progressionCriteria: ['PRTEE score < 15/100', 'Full painless functional grip capacity', 'Normal tolerance to sports-specific drills'],
          precautionsAndContraindications: ['Progress swing volume gradually'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Golf/Tennis & Long-Term Prevention',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Return to full golf rounds, tennis matches, and occupational tasks', 'Biomechanical swing analysis'],
          exercisePrescription: [
            { category: 'Swing Mechanics', exerciseName: 'Graduated Return to Golf Program (Putting -> Chipping -> Short Irons -> Full Drivers)', dosage: 'Over 4 weeks', clinicalRationale: 'Re-exposes the medial epicondyle to impact shock progressively.' },
          ],
          progressionCriteria: ['Full painless 18 holes of golf or competitive match play'],
          precautionsAndContraindications: ['Maintain weekly forearm flexor eccentric loading routine indefinitely'],
        },
      ],
    },
    clinicalPearls: [
      'In golfers, medial epicondylalgia of the trailing arm (right arm in right-handed golfer) is caused by hitting "fat" shots and scooping the ball; fixing swing mechanics is mandatory to prevent relapse.',
    ],
  },

  {
    id: 'elbow-cubital-tunnel-syndrome',
    joint: 'Elbow',
    name: 'Cubital Tunnel Syndrome (Ulnar Nerve Neuropathy)',
    category: 'Ulnar Nerve Entrapment / Retroepicondylar Groove Compression',
    tissue_group: 'soft',
    tissue_types: ['Nerve / Neural', 'Bursa & Fascia'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Severe progressive intrinsic hand muscle wasting: First dorsal interosseous (FDI) and hypothenar atrophy, prominent claw hand (Duchenne sign) requiring urgent surgical decompression.',
      'Froment sign positive with profound adductor pollicis weakness.',
    ],
    when_to_refer: [
      'Continuous numbness, visible FDI/hypothenar atrophy, or Froment sign positive (urgent orthopaedic hand surgery referral for cubital tunnel release / anterior transposition).',
    ],
    outcome_measures: [
      { name: 'DASH Score', mcid: '10.8 points', target: '<= 15' },
      { name: 'Two-Point Discrimination (Small Finger in mm)', mcid: '2 mm', target: '<= 6 mm' },
      { name: 'NRS Medial Elbow / Finger Paresthesia', mcid: '2 points', target: '<= 1/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'Elbow Flexion Test held for 60 seconds increases intraneural pressure within the cubital tunnel by up to 20-fold and stretches the nerve around the medial epicondyle. Reproduction of numbness in the 4th/5th digits confirms entrapment.',
      vivaQuestions: [
        {
          question: 'What is Froment\'s sign and what muscle weakness does it demonstrate?',
          answer: 'The patient pinches a piece of paper between thumb and index finger while the examiner pulls it away. In ulnar nerve palsy, the paralyzed adductor pollicis cannot maintain key pinch, so the patient hyperflexes the thumb IP joint using the median-innervated flexor pollicis longus (FPL).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Numbness, tingling, and burning paresthesias in the little finger and ulnar half of the ring finger. Medial elbow aching worsened by prolonged elbow flexion (holding phone to ear, sleeping with elbows curled, leaning elbows on desk). Weakness of grip and pinch.',
    bedsideAssessmentTests: [
      {
        testName: 'Elbow Flexion Test (with Wrist Extension held 60s)',
        sensitivity: '75%',
        specificity: '99%',
        positiveLikelihoodRatio: '75.0',
        techniqueAndInterpretation: 'Full elbow flexion with wrist extension held for 60 seconds. Positive if typical paresthesias reproduced in the 4th and 5th digits within 60 seconds.',
        evidenceCitation: 'Buehler & Thayer. J Hand Surg Am; MacDermid & Wessel. J Hand Ther.',
      },
      {
        testName: 'Tinel Sign at Cubital Tunnel',
        sensitivity: '70%',
        specificity: '98%',
        positiveLikelihoodRatio: '35.0',
        techniqueAndInterpretation: 'Light percussion over ulnar nerve in retrocondylar groove. Positive if electric tingling shoots into the 4th and 5th digits.',
        evidenceCitation: 'Novak et al. J Hand Surg Am.',
      },
      {
        testName: 'Froment\'s Paper Grip Sign',
        sensitivity: '80%',
        specificity: '95%',
        techniqueAndInterpretation: 'Pinch paper between thumb and index finger. Involuntary thumb interphalangeal joint hyperflexion indicates adductor pollicis weakness.',
        evidenceCitation: 'Froment J. Presse Med.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Pathology & Lab Diagnostics',
        description: 'Electromyography (EMG) and Nerve Conduction Studies (NCS) across Elbow',
        indications: 'Confirm focal ulnar motor conduction velocity slowing (< 50 m/s across elbow) and assess axonal loss.',
        keyFindings: 'Motor conduction block or velocity drop > 10 m/s across the retrocondylar groove; fibrillations in FDI.',
        accuracyOrYield: 'Gold standard for grading cubital tunnel severity.',
      },
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-Resolution Ultrasound of Ulnar Nerve at Elbow',
        indications: 'Assess nerve cross-sectional area (CSA > 10 mm²), intraneural hypervascularity, and dynamic subluxation over epicondyle.',
        keyFindings: 'Ulnar nerve cross-sectional area > 10 mm² at medial epicondyle (normal 6–7 mm²); anterior snapping subluxation.',
        accuracyOrYield: 'Ultrasound sensitivity 88%, specificity 93% for cubital tunnel syndrome.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Nocturnal Extension Splinting & Ulnar Neurodynamic Gliding Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Nocturnal Splinting, De-Compression & Nerve Calming',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Prevent nocturnal elbow flexion past 45° with rigid/semi-rigid night splint', 'Eliminate daytime resting pressure on medial elbow', 'Initiate gentle ulnar nerve sliding'],
          exercisePrescription: [
            { category: 'Nocturnal Splinting', exerciseName: 'Rigid Night Extension Splint (Elbow Held at 30–45° Flexion)', dosage: 'Worn every night for 6–12 weeks', clinicalRationale: 'Svernlöv et al. proved nocturnal splinting decreases intraneural pressure and resolves mild/moderate symptoms in up to 88% of patients.' },
            { category: 'Daytime Ergonomics', exerciseName: 'Avoid Leaning on Elbows & Use Headset for Telephone Conversations', dosage: 'Continuous', clinicalRationale: 'Removes direct mechanical pressure on the retrocondylar groove and eliminates sustained stretch.' },
            { category: 'Neurodynamics', exerciseName: 'Ulnar Nerve Sliders (OK Sign to Mask Maneuver in Pain-Free Arc)', dosage: '2 sets of 10 smooth reps, 2x daily', clinicalRationale: 'Promotes longitudinal nerve gliding without creating endoneurial ischemic tension.' },
          ],
          progressionCriteria: ['Abolition of waking nighttime numbness in fingers', 'Elbow flexion test tolerance increases to > 45 seconds', 'DASH improved by >= 8 points'],
          precautionsAndContraindications: ['STRICTLY AVOID: Sustained end-range elbow flexion, aggressive tensioner stretching, direct pressure on inner elbow'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Intrinsic Hand Muscle Activation & Forearm Mobility',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen first dorsal interosseous and hypothenars', 'Maintain ulnar nerve excursion', 'Wean daytime splints if used'],
          exercisePrescription: [
            { category: 'Intrinsic Strength', exerciseName: 'Isometric First Dorsal Interosseous Abduction Against Resistance (Index Finger Abduction)', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Reactivates motor units before chronic denervation atrophy sets in.' },
            { category: 'Flexor Mobility', exerciseName: 'Gentle Forearm Flexor and Pronator Muscle Lengthening', dosage: '3 sets of 20s', clinicalRationale: 'Decreases Osborne\'s band fascial compression.' },
          ],
          progressionCriteria: ['Normal 2-point discrimination (< 6 mm)', 'Negative Froment sign', 'Zero paresthesias during daytime computer work'],
          precautionsAndContraindications: ['Ensure nerve gliding exercises remain completely sensation-free (no tingling produced)'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Grip, Dexterity & Occupational Ergonomics',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Hand dexterity and fine motor precision', 'Full functional grip endurance without sensory flare'],
          exercisePrescription: [
            { category: 'Dexterity', exerciseName: 'TheraPutty Finger Abduction/Adduction and Pinch Drills', dosage: '10 minutes daily', clinicalRationale: 'Builds intrinsic muscular endurance for delicate manipulation tasks.' },
            { category: 'Ergonomic Review', exerciseName: 'Workstation Keyboard and Armrest Setup Optimization', dosage: 'Continuous', clinicalRationale: 'Ensures elbows remain in comfortable 90–100° resting posture.' },
          ],
          progressionCriteria: ['DASH score < 15', 'Full strength on pinch dynamometry', 'Zero nocturnal waking'],
          precautionsAndContraindications: ['Pace repetitive manual work'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Surveillance & Lifestyle Maintenance',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Sustained resolution of symptoms', 'Patient education on recognizing early motor signs'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Periodic Ulnar Nerve Sliders and Night Splinting as Needed', dosage: 'As required', clinicalRationale: 'Prevents recurrence during periods of increased typing or driving.' },
          ],
          progressionCriteria: ['Complete resolution of paresthesias with normal motor and sensory testing'],
          precautionsAndContraindications: ['Seek immediate hand surgeon review if muscle wasting or persistent numbness returns'],
        },
      ],
    },
    clinicalPearls: [
      'A simple towel wrapped loosely around the elbow at night secured with tape prevents flexion past 45° and cures up to 80% of mild cubital tunnel syndrome without surgery.',
    ],
  },

  {
    id: 'elbow-distal-biceps-rupture',
    joint: 'Elbow',
    name: 'Distal Biceps Tendon Rupture / Tendinopathy',
    category: 'Insertional Tendon Rupture / Radial Tuberosity Avulsion',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Bone'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Acute Complete Distal Biceps Rupture: Sudden pop during eccentric load with palpable absence of distal tendon cord (positive Hook Test) requiring URGENT surgical reattachment to radial tuberosity within 2–3 weeks (delayed repair leads to irreversible tendon retraction and permanent 40–50% loss of supination torque).',
      'Compartment syndrome of anterior forearm following high-energy trauma.',
    ],
    when_to_refer: [
      'MANDATORY URGENT SURGICAL REFERRAL: Complete distal biceps rupture in an active individual mandates urgent orthopaedic repair within 14–21 days.',
    ],
    outcome_measures: [
      { name: 'DASH Score', mcid: '10.8 points', target: '<= 12' },
      { name: 'Isometric Supination Torque (% LSI)', mcid: '15%', target: '>= 90% LSI' },
      { name: 'Isometric Elbow Flexion Force (% LSI)', mcid: '15%', target: '>= 90% LSI' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-19',
    teaching_notes: {
      clinicalReasoning: 'O\'Driscoll\'s Hook Test has 100% sensitivity and 100% specificity for complete distal biceps tendon avulsion. The clinician hooks their index finger lateral-to-medial under the cord-like distal tendon in the antecubital fossa; absence of a cord confirms complete rupture.',
      vivaQuestions: [
        {
          question: 'What is the Hook Test for distal biceps rupture and what is its diagnostic accuracy?',
          answer: 'With the patient\'s elbow at 90° and forearm supinated, the clinician attempts to hook their index finger under the lateral margin of the distal biceps tendon cord. In an intact tendon, a distinct cord can be hooked; in complete avulsion, no cord can be engaged. Sensitivity is 100% and Specificity is 100%.',
        },
      ],
    },
    isRedFlag: true,
    redFlagSeverity: 'EMERGENCY_IMMEDIATE',
    clinicalPresentation: 'Sudden, painful pop in the anterior cubital fossa during forceful eccentric load on a flexed elbow (e.g., catching a falling heavy object, heavy deadlift). Followed by swelling, antecubital ecchymosis, proximal retraction of the biceps muscle belly, and profound weakness in supination.',
    bedsideAssessmentTests: [
      {
        testName: 'O\'Driscoll\'s Hook Test',
        sensitivity: '100%',
        specificity: '100%',
        positiveLikelihoodRatio: 'Infinity',
        techniqueAndInterpretation: 'Elbow flexed 90°, forearm fully supinated; clinician hooks index finger from lateral edge into antecubital fossa under tendon cord. Inability to hook a cord confirms complete distal biceps avulsion.',
        evidenceCitation: 'O\'Driscoll et al. Am J Sports Med.',
      },
      {
        testName: 'Biceps Squeeze Test',
        sensitivity: '96%',
        specificity: '93%',
        techniqueAndInterpretation: 'Patient seated; elbow flexed 60–80°, forearm resting in lap; clinician firmly squeezes biceps muscle belly. Normal response is passive forearm supination; absence of supination indicates complete tendon rupture.',
        evidenceCitation: 'Ruland et al. J Shoulder Elbow Surg.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Elbow MRI with specialized FABS view (Flexion, Abduction, Supination)',
        indications: 'Confirm complete vs partial tear, measure retraction in centimeters from radial tuberosity, and assess lacertus fibrosus integrity.',
        keyFindings: 'Complete discontinuity of distal biceps tendon with fluid-filled tendon sheath and retraction proximal to joint line.',
        accuracyOrYield: 'FABS MRI sensitivity 95%, specificity 98%.',
      },
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'Dynamic High-Resolution Ultrasound of Antecubital Fossa',
        indications: 'Rapid bedside confirmation of complete tendon avulsion.',
        keyFindings: 'Absence of distal tendon footprint on radial tuberosity with surrounding hematoma.',
        accuracyOrYield: 'Ultrasound sensitivity 91%, specificity 98%.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Phase-Specific Post-Operative Distal Biceps Reattachment Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Protected Hinged Splint, Passive Flexion & Non-Weight-Bearing',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Protect surgical endobutton/interference screw bone fixation', 'Hinged elbow brace locked at 90° (first 2 weeks), then progressive extension block', 'Strict non-weight-bearing'],
          exercisePrescription: [
            { category: 'Brace Protection', exerciseName: 'Hinged Elbow Brace Worn Continuous 24/7', dosage: 'Locked at 90° for week 1–2, then blocked at 45° extension', clinicalRationale: 'Prevents forceful extension that can pull the tendon anchor out of the radial tuberosity drill hole.' },
            { category: 'Passive Motion', exerciseName: 'Passive-Assisted Elbow Flexion and Gentle Forearm Rotation in Brace', dosage: '3 sets of 10 gentle reps, 3x daily', clinicalRationale: 'Prevents capsular adhesions without loading the healing tendon repair.' },
            { category: 'Distal Conditioning', exerciseName: 'Active Wrist Pumps, Ball Squeezes, and Shoulder Elevation', dosage: '3 sets of 15 reps', clinicalRationale: 'Maintains upper limb circulation and prevents edema.' },
          ],
          progressionCriteria: ['Incision site well-healed without infection', 'Passive elbow flexion to 120°', 'Surgeon clearance for Phase 2 brace extension'],
          precautionsAndContraindications: ['STRICTLY CONTRAINDICATED: Active elbow flexion, active supination, any lifting > 0 kg'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Brace Extension Weaning, Active-Assisted Motion & Light Isometrics',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Gradually open hinged brace by 10–15° per week to achieve full passive extension by 6 weeks', 'Initiate active unresisted elbow flexion and supination out of brace'],
          exercisePrescription: [
            { category: 'Extension Restoration', exerciseName: 'Gentle Low-Load Long-Duration Passive Elbow Extension on Table', dosage: '5 minutes, 3x daily', clinicalRationale: 'Prevents fixed flexion contracture while respecting tendon healing limits.' },
            { category: 'Active ROM', exerciseName: 'Active Unresisted Elbow Flexion and Pronation/Supination (Gravity-Eliminated in Side-Lying)', dosage: '3 sets of 10 reps', clinicalRationale: 'Re-trains motor cortex recruitment of the biceps without tensile overload.' },
          ],
          progressionCriteria: ['Full passive elbow extension to 0° by week 6', 'Active elbow flexion to 120° without pain', 'Complete weaning from hinged brace at 6 weeks'],
          precautionsAndContraindications: ['NO resisted strengthening; maximum carrying weight < 1 kg (cup of coffee)'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Progressive Resistance, Supination Hypertrophy & Eccentric Capacity',
          timeline: 'Weeks 6–12',
          clinicalGoals: ['Initiate progressive resistance training (biceps curls, hammer curls, cable supination)', 'Rebuild supination torque', 'Progress lifting up to 5–10 kg'],
          exercisePrescription: [
            { category: 'Resisted Flexion', exerciseName: 'Light Dumbbell Biceps Curls (Starting 1–2 kg, Slow 3s Tempo)', dosage: '3 sets of 10–12 reps', clinicalRationale: 'Stimulates tendon-bone junction remodeling under progressive tensile load.' },
            { category: 'Resisted Supination', exerciseName: 'Asymmetric Hammer / Resistance Band Forearm Supination Drills', dosage: '3 sets of 12 reps', clinicalRationale: 'Selectively reconditions the primary supination vector of the biceps.' },
          ],
          progressionCriteria: ['Elbow flexion strength >= 80% of contralateral side', 'Supination torque >= 75% LSI', 'DASH score < 20'],
          precautionsAndContraindications: ['Avoid heavy ballistic lifting or sudden eccentric drop catches until Phase 4'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Heavy Strength, Power & Return to Heavy Trades/Sports',
          timeline: 'Weeks 12–24+',
          clinicalGoals: ['Full return to heavy manual labor, bodybuilding, martial arts, or contact sports', 'Symmetric supination torque >= 90% LSI'],
          exercisePrescription: [
            { category: 'Heavy Strength', exerciseName: 'Barbell Deadlifts, Pull-Ups, and Heavy Dumbbell Rows', dosage: 'Progressive load per athletic goals', clinicalRationale: 'Restores maximum tensile tendon capacity and functional confidence.' },
          ],
          progressionCriteria: ['Full surgical clearance by operating surgeon at 6-month review', 'Isometric supination and flexion torque >= 90% LSI'],
          precautionsAndContraindications: ['Maintain thorough warm-up prior to maximum eccentric lifts'],
        },
      ],
    },
    clinicalPearls: [
      'Non-operative management of a complete distal biceps tear leads to a permanent 40–50% loss of supination torque and 30% loss of flexion power; active individuals must be referred immediately for surgical repair within 2–3 weeks.',
    ],
  },

  {
    id: 'elbow-olecranon-bursitis',
    joint: 'Elbow',
    name: 'Olecranon Bursitis (Septic vs Aseptic)',
    category: 'Posterior Elbow Bursa Inflammation / Traumatic vs Infectious',
    tissue_group: 'soft',
    tissue_types: ['Bursa & Fascia', 'Bone'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Septic Olecranon Bursitis: Severe spreading cellulitis, erythema, extreme warmth, skin breakdown, systemic fever (> 38°C), chills, elevated white blood cell count (MANDATES diagnostic needle aspiration and IV/oral antibiotics).',
      'Underlying olecranon fracture following blunt impact trauma.',
    ],
    when_to_refer: [
      'MANDATORY MEDICAL/SURGICAL REFERRAL: Any signs of septic bursitis (fever, warmth, spreading redness) requires urgent medical evaluation and aspiration.',
      'Chronic recalcitrant bursitis failing conservative management (bursectomy candidate).',
    ],
    outcome_measures: [
      { name: 'Bursa Swelling Circumference (cm)', mcid: '1.5 cm', target: 'Complete resolution (symmetric)' },
      { name: 'NRS Elbow Pressure Pain', mcid: '2 points', target: '0/10' },
      { name: 'Elbow Active Flexion Range (degrees)', mcid: '10 degrees', target: 'Full painless flexion (>= 140°)' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Critical bedside distinction: In septic bursitis, the elbow joint itself can usually be passively moved gently through range without severe pain (unlike septic arthritis), but direct bursa palpation is exquisitely tender and skin is warm/erythematous. Fluid aspiration with gram stain and crystal analysis is definitive.',
      vivaQuestions: [
        {
          question: 'How do you clinically differentiate olecranon bursitis from septic arthritis of the elbow?',
          answer: 'In olecranon bursitis, the inflammation is extra-articular; gentle passive elbow flexion/extension is preserved with minimal intra-articular pain. In septic arthritis, any movement of the elbow is agonizing, and joint effusion is felt in the lateral "soft spot" triangle, not just over the olecranon tip.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Prominent, dome-shaped fluid swelling over the posterior olecranon process ("goose egg" appearance). Aseptic: painless or mildly tender, fluctuating mass from repetitive leaning ("student\'s elbow") or direct fall. Septic: hot, red, throbbing, exquisitely tender with fever.',
    bedsideAssessmentTests: [
      {
        testName: 'Elbow Joint-Line "Soft Spot" Palpation (Excluding Septic Arthritis)',
        sensitivity: '92%',
        specificity: '89%',
        techniqueAndInterpretation: 'Palpate the lateral triangle between lateral epicondyle, radial head, and olecranon. Absence of fullness or severe pain here confirms pathology is isolated to the extra-articular olecranon bursa.',
        evidenceCitation: 'Stell. Postgrad Med J; Sayegh & Strauch. J Hand Surg Am.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Arthrocentesis / Synovial Fluid',
        description: 'Needle Aspiration of Olecranon Bursa Fluid with Gram Stain, Cell Count, and Polarized Microscopy',
        indications: 'MANDATORY if warmth, erythema, or fever present to rule out Staphylococcus aureus septic bursitis vs gouty crystals.',
        keyFindings: 'Septic: WBC > 50,000/µL (> 90% polymorphs), positive Gram stain/culture. Gout: Negatively birefringent needle-shaped urate crystals.',
        accuracyOrYield: 'Gold standard for infection rule-out.',
      },
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP and Lateral Elbow Views',
        indications: 'Screen for olecranon traction spur (present in up to 30% of chronic cases) or underlying fracture.',
        keyFindings: 'Prominent olecranon spur; excludes underlying cortical bone destruction or osteomyelitis.',
        accuracyOrYield: 'Essential for structural evaluation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Compression Bandaging, Pressure Offloading & Range Preservation Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Medical Clearance, Elastic Compression Bandaging & Pressure Offloading',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Confirm aseptic status / complete prescribed antibiotic course if septic', 'Firm compression bandaging to prevent fluid re-accumulation', 'Strict pressure offloading (zero resting on elbow)'],
          exercisePrescription: [
            { category: 'External Compression', exerciseName: 'Tubigrip / Elastic Figure-of-Eight Compression Bandage', dosage: 'Continuous daytime wear for 2–3 weeks', clinicalRationale: 'Applies continuous hydrostatic pressure to collapse the bursal dead space and promote fluid resorption.' },
            { category: 'Pressure Offloading', exerciseName: 'Donut Elbow Pad / Foam Protection Sleeve', dosage: 'Worn during desk work and driving', clinicalRationale: 'Directly transfers compressive loads to surrounding soft tissue, sparing the olecranon tip.' },
            { category: 'Gentle Motion', exerciseName: 'Active Elbow Flexion and Extension within Pain-Free Limits', dosage: '10 reps, 3x daily', clinicalRationale: 'Maintains full elbow mobility without stressing the inflamed posterior skin envelope.' },
          ],
          progressionCriteria: ['Complete resolution of local warmth and erythema', 'Bursa fluid collection reduced by >= 75%', 'Full active elbow extension and flexion'],
          precautionsAndContraindications: ['STRICTLY CONTRAINDICATED: Leaning on elbows, direct blunt pressure; monitor daily for infection signs'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Fluid Resorption, Triceps Tendon Loading & Joint Mobility',
          timeline: 'Weeks 2–4',
          clinicalGoals: ['Complete fluid resorption', 'Triceps tendon gentle progressive loading', 'Restore full end-range flexion without skin tightness'],
          exercisePrescription: [
            { category: 'Triceps Loading', exerciseName: 'Light Cable Triceps Pushdowns (Elbows at Side, No Direct Contact)', dosage: '3 sets of 12 reps at light resistance', clinicalRationale: 'Re-activates triceps muscle without compressing the olecranon bursa.' },
            { category: 'End-Range Flexion', exerciseName: 'Gentle Active-Assisted Terminal Elbow Flexion Stretch', dosage: '3 sets of 15s holds', clinicalRationale: 'Restores physiological skin elasticity over the posterior olecranon.' },
          ],
          progressionCriteria: ['Zero palpable fluid in olecranon bursa', 'Full active ROM symmetric with unaffected side', 'NRS pain 0/10'],
          precautionsAndContraindications: ['Continue wearing protective elbow pad during computer work'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Strength & Workstation Ergonomics',
          timeline: 'Weeks 4–6',
          clinicalGoals: ['Full upper body resistance training', 'Permanent ergonomic workstation adjustments'],
          exercisePrescription: [
            { category: 'Ergonomic Adaptation', exerciseName: 'Armrest Padding and Desk Keyboard Alignment', dosage: 'Permanent', clinicalRationale: 'Eliminates habitual focal leaning on the elbow tips during prolonged sitting.' },
            { category: 'Full Resistance', exerciseName: 'Push-Ups, Bench Press, and Overhead Dumbbell Press', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores complete upper extremity weight-bearing capacity.' },
          ],
          progressionCriteria: ['Zero fluid recurrence over 4 weeks', 'Full painless functional capacity'],
          precautionsAndContraindications: ['Avoid repetitive resting on hard desk surfaces'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Prevention & Sports Maintenance',
          timeline: 'Weeks 6–8+',
          clinicalGoals: ['Prevent chronic recurrence', 'Protective gear in collision sports'],
          exercisePrescription: [
            { category: 'Sports Protection', exerciseName: 'Padded Elbow Sleeves Worn during Volleyball, Basketball, and Martial Arts', dosage: 'During all practices and games', clinicalRationale: 'Absorbs floor impacts that trigger acute traumatic bursitis.' },
          ],
          progressionCriteria: ['Sustained asymptomatic status at 6 months follow-up'],
          precautionsAndContraindications: ['Seek immediate medical re-evaluation if warmth, redness, or rapid swelling recurs'],
        },
      ],
    },
    clinicalPearls: [
      'Firm compressive elastic bandaging combined with strict pressure offloading (donut pad) resolves > 85% of aseptic olecranon bursitis without needing needle aspiration.',
    ],
  },

  {
    id: 'elbow-post-op-radial-head-olecranon-fracture',
    joint: 'Elbow',
    name: 'Post-operative Radial Head / Olecranon Fracture Fixation',
    category: 'Post-Surgical Elbow Fracture ORIF / Arthroplasty',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface'],
    acuity: 'post-op',
    irritability: 'Mod',
    healing_stage: 'proliferative',
    red_flags: [
      'Post-traumatic stiffness / severe arthrofibrosis: Loss of flexion-extension arc (> 30° flexion contracture or flexion < 100°) requiring aggressive early mobilization or open arthrolysis.',
      'Heterotopic ossification (HO): Rapidly worsening stiff elbow with warmth, swelling, and localized alkaline phosphatase elevation.',
      'Hardware loosening / posterior interosseous nerve (PIN) palsy (finger drop).',
    ],
    when_to_refer: [
      'Suspected heterotopic ossification (indomethacin or radiation therapy evaluation).',
      'Loss of functional motion arc (< 30° to 130° flexion-extension, < 50° pronation/supination) after 8 weeks.',
    ],
    outcome_measures: [
      { name: 'MEPS (Mayo Elbow Performance Score)', mcid: '15 points', target: '>= 85/100' },
      { name: 'Elbow Active Motion Arc (degrees)', mcid: '10 degrees', target: '>= 30° to 130° (functional arc)' },
      { name: 'NRS Post-Op Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'The elbow is the most prone joint in the human body to post-traumatic arthrofibrosis and contracture. Stable rigid internal fixation (Mason Type II/III radial head ORIF or replacement, olecranon tension-band wiring/plating) permits early active-assisted motion within 48–72 hours.',
      vivaQuestions: [
        {
          question: 'What is the "functional arc" of elbow motion required for most daily activities per Morrey\'s classic study?',
          answer: 'A minimum of 30° to 130° of flexion-extension (100° arc) and 50° of pronation to 50° of supination (100° rotational arc).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Post-operative recovery following open reduction and internal fixation (ORIF) of olecranon fracture (tension band/plate) or radial head fracture (screws/radial head prosthesis). Incision site healing, swelling, guarding, and early joint stiffness.',
    bedsideAssessmentTests: [
      {
        testName: 'Elbow Active and Passive Range of Motion Arc (Goniometry)',
        sensitivity: '95%',
        specificity: '90%',
        techniqueAndInterpretation: 'Systematic measurement of active and passive flexion, extension, pronation, and supination. Compare against Morrey\'s functional 100° arc.',
        evidenceCitation: 'Morrey et al. J Bone Joint Surg Am; Doornberg et al. J Bone Joint Surg Am.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP and Lateral Elbow Views at 2, 6, and 12 weeks post-op',
        indications: 'Confirm hardware stability, anatomical reduction of articular surface (< 2 mm step-off), and monitor for heterotopic ossification.',
        keyFindings: 'Solid bony bridging across fracture line; well-seated radial head prosthesis; absence of ectopic periarticular bone.',
        accuracyOrYield: 'Gold standard for surveillance of union and fixation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Early Stable Mobilization & Contracture Prevention Elbow Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Edema Control, Incision Healing & Early Active-Assisted Motion',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Rigid splint removed for exercises starting day 3–5 (if fixation stable)', 'Edema control and incision care', 'Restore active-assisted flexion-extension arc without passive stretching'],
          exercisePrescription: [
            { category: 'Active-Assisted ROM', exerciseName: 'Active-Assisted Elbow Flexion and Extension (Gravity-Assisted in Supine)', dosage: '3 sets of 10 smooth reps, 4–5x daily', clinicalRationale: 'Promotes synovial fluid circulation and prevents capsular adhesions without stressing hardware.' },
            { category: 'Forearm Rotation', exerciseName: 'Active-Assisted Forearm Pronation and Supination with Elbow at 90°', dosage: '3 sets of 10 reps', clinicalRationale: 'Mobilizes proximal and distal radioulnar joints early.' },
            { category: 'Edema Control', exerciseName: 'Cryo-Compression and Arm Elevation', dosage: '20 minutes after exercises', clinicalRationale: 'Reduces joint capsular distension and pain.' },
          ],
          progressionCriteria: ['Clean dry surgical wound without infection', 'Active-assisted arc >= 45° to 100°', 'Mayo Elbow score improved by >= 15 points'],
          precautionsAndContraindications: ['STRICTLY CONTRAINDICATED: Aggressive passive stretching or forceful manipulation (triggers heterotopic ossification); no lifting > 0.5 kg'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Active Arc Expansion, Dynamic Splinting & Low-Load Prolonged Stretch',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Expand active motion arc towards 30° to 130°', 'Low-load prolonged stretch (LLPS) for extension contracture', 'Initiate light isometric strengthening'],
          exercisePrescription: [
            { category: 'LLPS Stretch', exerciseName: 'Low-Load Prolonged Extension Stretch in Supine (Forearm Resting with 0.5–1 kg Weight)', dosage: '10–15 minutes, 2x daily', clinicalRationale: 'TERT principle promotes capsular plastic elongation without eliciting inflammatory micro-trauma.' },
            { category: 'Active Motion', exerciseName: 'Wall Slides and Overhead Reaching Drills', dosage: '3 sets of 10 reps', clinicalRationale: 'Re-trains multi-joint upper limb coordination in functional planes.' },
            { category: 'Isometrics', exerciseName: 'Submaximal Multi-Angle Elbow Flexor and Extensor Isometrics', dosage: '3 sets of 8 reps, 5s hold', clinicalRationale: 'Builds stabilizing muscle tone without joint excursion.' },
          ],
          progressionCriteria: ['Active arc >= 30° to 120°', 'Pronation and supination >= 50° each', 'Radiographs confirm stable hardware at 6-week review'],
          precautionsAndContraindications: ['Never bounce or force terminal extension; discontinue LLPS if joint warmth increases'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Resistance Training & End-Range Mobilization',
          timeline: 'Weeks 6–12',
          clinicalGoals: ['Initiate progressive isotonic strengthening', 'Restore Morrey\'s functional arc (30–130°)', 'Progress lifting up to 5 kg'],
          exercisePrescription: [
            { category: 'Progressive Resistance', exerciseName: 'Light Dumbbell Biceps Curls, Triceps Extensions, and Wrist Curls', dosage: '3 sets of 10–12 reps at light resistance', clinicalRationale: 'Reconditions atrophied musculature across the elbow joint.' },
            { category: 'Functional Reaching', exerciseName: 'Simulated Daily Living Tasks (Reaching into Cupboards, Donning Jacket)', dosage: 'Daily practice', clinicalRationale: 'Translates joint motion into real-world independence.' },
          ],
          progressionCriteria: ['Mayo Elbow Performance Score > 80/100', 'Full functional motion arc achieved', 'Radiographs confirm progressive bony consolidation'],
          precautionsAndContraindications: ['Limit heavy pushing or pulling until solid union confirmed'],
        },
        {
          phaseNumber: 4,
          phaseName: 'High-Demand Resiliency & Unrestricted Occupational Return',
          timeline: 'Weeks 12–24+',
          clinicalGoals: ['Full return to sports, heavy manual trades, and unrestricted daily tasks', 'Lifelong joint health'],
          exercisePrescription: [
            { category: 'Reconditioning', exerciseName: 'Total Upper Body Resistance and Athletic Conditioning Program', dosage: '3x weekly', clinicalRationale: 'Restores maximum power, endurance, and physical confidence.' },
          ],
          progressionCriteria: ['Solid radiographic union and MEPS > 90/100', 'Full patient satisfaction'],
          precautionsAndContraindications: ['Maintain periodic stretching if residual mild extension deficit persists'],
        },
      ],
    },
    clinicalPearls: [
      'The #1 mistake in post-fracture elbow rehab is aggressive passive stretching; forceful stretching tears capsular microvasculature, producing devastating heterotopic ossification and permanent stiffness. Use gentle active motion and low-load prolonged stretch instead.',
    ],
  },

  // ==========================================
  // WRIST & HAND (7 Conditions)
  // ==========================================
  {
    id: 'wrist-carpal-tunnel-syndrome',
    joint: 'Wrist & Hand',
    name: 'Carpal Tunnel Syndrome (Median Nerve Entrapment)',
    category: 'Median Nerve Compression / Flexor Retinaculum Tunnel',
    tissue_group: 'soft',
    tissue_types: ['Nerve / Neural', 'Bursa & Fascia'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Severe thenar muscle atrophy (abductor pollicis brevis / opponens pollicis wasting) with constant sensory loss requiring urgent surgical carpal tunnel release to prevent irreversible denervation.',
      'Acute carpal tunnel syndrome following wrist trauma or fracture (distal radius fracture) requiring emergency release within 24 hours.',
    ],
    when_to_refer: [
      'Constant numbness, visible thenar atrophy, or failure of 6–8 weeks nocturnal splinting (urgent surgical carpal tunnel decompression).',
      'Acute post-traumatic carpal tunnel syndrome (emergency surgical release).',
    ],
    outcome_measures: [
      { name: 'BCTQ (Boston Carpal Tunnel Questionnaire - SSS & FSS)', mcid: '0.4 points', target: '<= 1.5' },
      { name: 'Two-Point Discrimination (Index Finger in mm)', mcid: '2 mm', target: '<= 5 mm' },
      { name: 'NRS Nocturnal Waking Paresthesia', mcid: '2 points', target: '0/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Phalen\'s test (wrist flexion for 60s) increases carpal tunnel pressure from 2–10 mmHg to > 30 mmHg. Carpal Compression Test (Durkan\'s test) has the highest sensitivity (87%) and specificity (90%). Neutral wrist nocturnal splinting keeps intracarpal pressure at its lowest baseline.',
      vivaQuestions: [
        {
          question: 'What are the 9 tendons and 1 nerve passing through the carpal tunnel?',
          answer: 'The Median Nerve, 4 tendons of Flexor Digitorum Superficialis (FDS), 4 tendons of Flexor Digitorum Profundus (FDP), and 1 tendon of Flexor Pollicis Longus (FPL) (total: 9 tendons and 1 nerve).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Nocturnal numbness, tingling, and burning pain in the thumb, index, middle, and radial half of ring finger, often waking the patient from sleep. Relieved by shaking the hands ("flick sign"). Clumsiness in dropping objects and difficulty buttoning clothes.',
    bedsideAssessmentTests: [
      {
        testName: 'Durkan\'s Carpal Compression Test',
        sensitivity: '87%',
        specificity: '90%',
        positiveLikelihoodRatio: '8.7',
        techniqueAndInterpretation: 'Clinician applies direct thumb pressure over the carpal tunnel for 30s. Positive if typical paresthesias reproduced in the median nerve distribution within 30 seconds.',
        evidenceCitation: 'Durkan. J Bone Joint Surg Am; MacDermid & Wessel. J Hand Ther.',
      },
      {
        testName: 'Phalen\'s Test (60 seconds)',
        sensitivity: '68% (60–75%)',
        specificity: '73% (65–80%)',
        positiveLikelihoodRatio: '2.5',
        techniqueAndInterpretation: 'Dorsal surfaces of hands pressed together with wrists in unforced 90° flexion for 60s. Positive if paresthesias reproduced in median nerve distribution.',
        evidenceCitation: 'Phalen. J Bone Joint Surg Am.',
      },
      {
        testName: 'Flick Sign (Patient shakes hands for relief)',
        sensitivity: '93%',
        specificity: '96%',
        positiveLikelihoodRatio: '23.0',
        techniqueAndInterpretation: 'Ask patient what they do when symptoms wake them. Positive if they demonstrate shaking/flicking their hand as if shaking down a thermometer.',
        evidenceCitation: 'Pryse-Phillips. Ann Neurol.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Pathology & Lab Diagnostics',
        description: 'Electromyography (EMG) and Nerve Conduction Studies (NCS)',
        indications: 'Confirm distal motor latency prolongation (> 4.2 ms) and sensory nerve conduction velocity slowing (< 40 m/s across carpal tunnel).',
        keyFindings: 'Delayed median sensory and motor latencies; fibrillations and positive sharp waves in APB in severe axonal loss.',
        accuracyOrYield: 'Gold standard for grading electrophysiological severity.',
      },
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-Resolution Ultrasound of Median Nerve at Carpal Tunnel Inlet',
        indications: 'Assess median nerve cross-sectional area (CSA > 10 mm² at pisiform level), palmar bowing of flexor retinaculum, and tenosynovitis.',
        keyFindings: 'Median nerve CSA > 10 mm² (normal <= 9 mm²), hypoechoic nerve edema, flexor retinaculum bowing > 4 mm.',
        accuracyOrYield: 'Ultrasound sensitivity 89%, specificity 90% for CTS.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Neutral Nocturnal Wrist Splinting & Median Neurodynamic Gliding Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Nocturnal Neutral Splinting, Ergonomics & Pain Calming',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Strict nocturnal neutral (0°) wrist splinting (Gelberman et al. proved 0° has lowest intracarpal pressure)', 'Eliminate waking nocturnal numbness', 'Modify repetitive wrist flexion during daytime'],
          exercisePrescription: [
            { category: 'Splinting', exerciseName: 'Prefabricated Neutral Wrist Cock-Up Splint (Molded to Exactly 0° Neutral)', dosage: 'Worn every night for 6–8 weeks', clinicalRationale: 'Intracarpal pressure is lowest at neutral (2 mmHg) compared to 30+ mmHg in flexion/extension.' },
            { category: 'Workstation Ergonomics', exerciseName: 'Ergonomic Vertical Mouse and Padded Keyboard Rest', dosage: 'Continuous during computer work', clinicalRationale: 'Maintains neutral forearm and wrist alignment, reducing sustained canal compression.' },
            { category: 'Tendon Gliding', exerciseName: 'Wehbé & Hunter Tendon Gliding Exercises (Straight, Hook, Fist, Tabletop, Straight Fist)', dosage: '3 sets of 5 reps, 3x daily', clinicalRationale: 'Maximizes differential excursion between FDS and FDP tendons to prevent tenosynovial adhesions.' },
          ],
          progressionCriteria: ['Zero nights awakened by hand numbness', 'Durkan\'s test tolerance increases to > 30 seconds', 'BCTQ symptom severity score improves by >= 0.4 points'],
          precautionsAndContraindications: ['Avoid wrist splints molded in hyperextension (increases canal pressure); avoid sustained heavy gripping'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Median Nerve Neurodynamic Gliding & Lumbrical Strengthening',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Restore longitudinal median nerve mobility without symptom provocation', 'Strengthen intrinsic lumbricals and thenar muscles'],
          exercisePrescription: [
            { category: 'Neurodynamics', exerciseName: 'Median Nerve Sliders (Contralateral Neck Bend with Wrist Extension)', dosage: '2 sets of 10 smooth reps, 2x daily', clinicalRationale: 'Promotes longitudinal nerve excursion through the carpal canal and relieves endoneurial edema.' },
            { category: 'Lumbrical Control', exerciseName: 'Tabletop Position Isometric Holds (MCP Flexion 90°, IP Full Extension)', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Retrains lumbricals to avoid entering the carpal tunnel during repetitive finger movements.' },
          ],
          progressionCriteria: ['Normal 2-point discrimination (< 5 mm)', 'Negative Phalen\'s test at 60 seconds', 'BCTQ functional status score < 1.5'],
          precautionsAndContraindications: ['Ensure nerve sliders do not elicit tingling or burning during or after exercise'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Grip, Fine Motor Dexterity & Weaning',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Wean night splints if completely asymptomatic', 'Restore full pinch and power grip capacity', 'Fine motor coordination'],
          exercisePrescription: [
            { category: 'Grip Strength', exerciseName: 'TheraPutty Pinch and Spread Drills', dosage: '10 minutes, 3x weekly', clinicalRationale: 'Builds thenar muscular endurance for daily occupational tasks.' },
            { category: 'Fine Motor', exerciseName: 'Pegboard and Coin Manipulation Dexterity Drills', dosage: '5 minutes daily', clinicalRationale: 'Enhances sensorimotor cortical integration in median nerve distribution.' },
          ],
          progressionCriteria: ['BCTQ score < 1.2 across both domains', 'Full normal pinch strength (dynamometry >= 90% LSI)'],
          precautionsAndContraindications: ['Pace prolonged repetitive tasks'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Occupational Prevention & Surveillance',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Lifelong avoidance of sustained static wrist postures', 'Early self-management with neutral splint if mild flare occurs'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Hourly Micro-Breaks and Tendon Gliding at Computer Workstation', dosage: '1 minute every hour', clinicalRationale: 'Maintains optimal tendon and nerve nutrition throughout the workday.' },
          ],
          progressionCriteria: ['Sustained complete symptom resolution at 6-month and 1-year follow-up'],
          precautionsAndContraindications: ['Seek immediate hand surgery consultation if persistent numbness or thenar flattening develops'],
        },
      ],
    },
    clinicalPearls: [
      'Over-the-counter wrist splints are often prefabricated with 20–30° of wrist extension, which actually INCREASES carpal tunnel pressure; always bend the metal stay flat to exactly 0° neutral for optimal relief.',
    ],
  },

  {
    id: 'wrist-de-quervain-tenosynovitis',
    joint: 'Wrist & Hand',
    name: 'De Quervain\'s Tenosynovitis (1st Dorsal Compartment)',
    category: 'Stenosing Tenosynovitis / Extensor Retinaculum Entrapment',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Bursa & Fascia'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Infection: Suppurative flexor tenosynovitis (Kanavel\'s 4 cardinal signs: flexed posture, uniform sausage swelling, exquisite tenderness along sheath, severe pain on passive extension - Surgical emergency).',
      'Scaphoid fracture or nonunion in anatomical snuffbox.',
      'Superficial radial nerve neuroma (Wartenberg\'s syndrome).',
    ],
    when_to_refer: [
      'Suppurative tenosynovitis (Kanavel signs - emergency surgical drainage).',
      'Refractory De Quervain\'s failing 6–8 weeks conservative care (corticosteroid injection or surgical 1st dorsal compartment release).',
    ],
    outcome_measures: [
      { name: 'PRWE (Patient-Rated Wrist Evaluation)', mcid: '11.5 points', target: '<= 15/100' },
      { name: 'NRS Radial Styloid Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Pinch Strength (Key & Tip in kg)', mcid: '15%', target: '>= 90% LSI' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Finkelstein\'s original test (traction with ulnar deviation) and Eichhoff\'s modification (fist over thumb with ulnar deviation) tension the Abductor Pollicis Longus (APL) and Extensor Pollicis Brevis (EPB) through the 1st extensor compartment. Tenderness localized directly over radial styloid 1 cm proximal to joint line.',
      vivaQuestions: [
        {
          question: 'What two tendons run in the 1st dorsal extensor compartment of the wrist?',
          answer: 'The Abductor Pollicis Longus (APL) and the Extensor Pollicis Brevis (EPB).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Severe, sharp pain over the radial styloid process radiating into the thumb and lateral forearm. Aggravated by thumb abduction, pinching, wringing wet clothes, and lifting babies ("new mother\'s thumb"). Visible thickening and palpable crepitus over the 1st extensor compartment.',
    bedsideAssessmentTests: [
      {
        testName: 'Finkelstein\'s Test (Active-Assisted Ulnar Deviation with Thumb Traction)',
        sensitivity: '89%',
        specificity: '84%',
        positiveLikelihoodRatio: '5.6',
        techniqueAndInterpretation: 'Forearm in neutral; clinician applies longitudinal traction to the thumb and gently deviates wrist ulnarward. Positive if sharp severe concordant pain elicited at the radial styloid.',
        evidenceCitation: 'Finkelstein H. J Bone Joint Surg Am; Dawson et al. J Hand Surg Eur Vol.',
      },
      {
        testName: 'WHAT Test (Wrist Hyperflexion and Abduction of Thumb)',
        sensitivity: '99%',
        specificity: '89%',
        positiveLikelihoodRatio: '9.0',
        techniqueAndInterpretation: 'Patient hyperflexes wrist and actively abducts thumb against resistance. Exquisite pain reproduction indicates De Quervain\'s.',
        evidenceCitation: 'Goubau et al. Musculoskelet Surg.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-Resolution Ultrasound of 1st Dorsal Extensor Compartment',
        indications: 'Confirm extensor retinaculum thickening (> 1 mm), tenosynovial fluid, and assess for subcompartment septum (present in 40% of refractory cases).',
        keyFindings: 'Thickened hypoechoic extensor retinaculum, tenosynovial fluid halo around APL/EPB, intracompartmental septum.',
        accuracyOrYield: 'Ultrasound sensitivity 93%, specificity 97%.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Thumb-Spica Protected Immobilization & Eccentric APL/EPB Remodeling Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Thumb-Spica Splinting, De-Loading & Pain Calming',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Strict immobilization of wrist and thumb CMC/MCP joints in custom/rigid thumb-spica splint', 'Eliminate thumb abduction pinching shear', 'Frequent cryotherapy and edema control'],
          exercisePrescription: [
            { category: 'Splinting', exerciseName: 'Rigid Thumb-Spica Splint (Wrist in 15° Extension, Thumb in 30° Palmar Abduction)', dosage: 'Continuous for 3–4 weeks (except hygiene)', clinicalRationale: 'Eliminates friction and shear of APL and EPB tendons against the osteofibrous 1st compartment roof.' },
            { category: 'Activity Modification', exerciseName: 'Two-Handed Baby Lifting (Scooping Underneath Rather than Pincer Lift)', dosage: 'Continuous for new mothers', clinicalRationale: 'Eliminates the repetitive radial styloid traction vector during infant care.' },
            { category: 'Uninvolved Motion', exerciseName: 'Active Finger Flexion/Extension and Shoulder/Elbow ROM Out of Splint', dosage: '3 sets of 10 reps, 3x daily', clinicalRationale: 'Prevents global upper limb stiffness.' },
          ],
          progressionCriteria: ['Radial styloid resting pain reduced to <= 2/10', 'WHAT test pain reduced by >= 50%', 'PRWE score improved by >= 11 points'],
          precautionsAndContraindications: ['STRICTLY AVOID: Pincer grip, wringing clothes, repetitive thumb texting, ulnar deviation stretches'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Splint Weaning, Isometric Contractions & Gentle Tendon Excursion',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Wean thumb-spica splint to night-only and high-risk daytime tasks', 'Analgesic isometric thumb abduction', 'Gentle active thumb range of motion'],
          exercisePrescription: [
            { category: 'Isometrics', exerciseName: 'Isometric Thumb Radial and Palmar Abduction Against Resistance', dosage: '3 sets of 10 reps, 5s hold at 50% effort', clinicalRationale: 'Stimulates mechanotransduction without tenosynovial friction gliding.' },
            { category: 'Active ROM', exerciseName: 'Active Thumb IP Joint Flexion/Extension with MCP Stabilized', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores EPB tendon glide through the compartment in a protected arc.' },
          ],
          progressionCriteria: ['Finkelstein\'s test negative or producing only mild stretch ache', 'Able to perform daily light tasks without splint'],
          precautionsAndContraindications: ['Avoid aggressive end-range ulnar deviation stretching'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Eccentric APL/EPB Strengthening & Grip Reconstruction',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Progressive eccentric thumb loading using elastic bands', 'Restore pinch and grip strength symmetry', 'Discontinue splint completely'],
          exercisePrescription: [
            { category: 'Eccentric Loading', exerciseName: 'Resisted Thumb Abduction with Slow Eccentric Adduction Return (Elastic Band)', dosage: '3 sets of 12 reps, 3s eccentric tempo', clinicalRationale: 'Promotes tenocyte remodeling and tendon tensile stiffness.' },
            { category: 'Pinch Strength', exerciseName: 'TheraPutty Pinch and Spread Drills (Key Pinch, Tip Pinch)', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores intrinsic and extrinsic thumb coordination for functional grasping.' },
          ],
          progressionCriteria: ['PRWE score < 15/100', 'Pinch strength >= 90% of unaffected side', 'Zero pain during normal lifting'],
          precautionsAndContraindications: ['Progress resistance gradually'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Full Activity, Sports & Work',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Full return to sports (tennis, golf, gymnastics), musical instruments, or childcare', 'Permanent ergonomic habits'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Thumb Mobility and Forearm Stretching Routine', dosage: '5 minutes daily', clinicalRationale: 'Prevents recurrence of tenosynovial thickening.' },
          ],
          progressionCriteria: ['Complete asymptomatic status with negative Finkelstein and WHAT tests'],
          precautionsAndContraindications: ['Maintain ergonomic awareness during smartphone texting and typing'],
        },
      ],
    },
    clinicalPearls: [
      'In up to 40% of individuals, the 1st dorsal compartment has an anatomical bony/fibrous septum dividing the APL and EPB into two separate tunnels; this is the #1 reason for failed blind steroid injections and stubborn symptoms.',
    ],
  },

  {
    id: 'wrist-tfcc-tear',
    joint: 'Wrist & Hand',
    name: 'Triangular Fibrocartilage Complex (TFCC) Tear / Perforation',
    category: 'Ulnocarpal Articular Disc & Ligamentous Stabilizer',
    tissue_group: 'soft',
    tissue_types: ['Meniscus/Labrum/Cartilage', 'Ligament', 'Articular Surface'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Distal Radioulnar Joint (DRUJ) gross dislocation / severe instability with dorsal prominence of ulnar head ("piano key sign") following fall on outstretched hand (MANDATES urgent orthopaedic reduction).',
      'Ulnar positive variance with ulnocarpal abutment syndrome causing cystic erosion of lunate and triquetrum.',
    ],
    when_to_refer: [
      'Gross DRUJ dislocation or mechanical locking/clicking failing 6–8 weeks conservative splinting (wrist arthroscopy or DRUJ reconstruction candidate).',
    ],
    outcome_measures: [
      { name: 'PRWE (Patient-Rated Wrist Evaluation)', mcid: '11.5 points', target: '<= 15/100' },
      { name: 'NRS Ulnar Wrist Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Weight-Bearing Tolerance on Flat Palm (kg)', mcid: '5 kg', target: 'Able to push up from chair pain-free' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'TFCC Compression / Grind test compresses the ulnocarpal disc with axial load, ulnar deviation, and pronation/supination rotation. The "Fovea Sign" (tenderness in the groove between ulnar styloid and flexor carpi ulnaris tendon) has 95% sensitivity and 87% specificity for foveal avulsion tears.',
      vivaQuestions: [
        {
          question: 'What is the Palmer classification for TFCC lesions and which type has healing potential?',
          answer: 'Class 1 is Traumatic (1A central tear, 1B peripheral foveal avulsion, 1C distal, 1D radial avulsion); Class 2 is Degenerative. Only Class 1B (peripheral tears in the vascularized outer 20%) has robust healing potential with immobilization or surgical repair; central 1A tears are avascular and do not heal.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Ulnar-sided wrist pain aggravated by pronation/supination under load (turning doorknobs, opening tight jars, swinging tennis racket or golf club). Inability to push up from a chair with an open palm. Painful clicking, popping, and feeling of weakness.',
    bedsideAssessmentTests: [
      {
        testName: 'Ulnar Fovea Sign',
        sensitivity: '95%',
        specificity: '87%',
        positiveLikelihoodRatio: '7.3',
        techniqueAndInterpretation: 'Clinician presses thumb into soft depression between ulnar styloid, FCU tendon, and pisiform. Exquisite focal tenderness indicates peripheral TFCC foveal avulsion.',
        evidenceCitation: 'Tay et al. J Hand Surg Am; Skalski et al. Radiographics.',
      },
      {
        testName: 'TFCC Compression / Grind Test',
        sensitivity: '72%',
        specificity: '83%',
        positiveLikelihoodRatio: '4.2',
        techniqueAndInterpretation: 'Wrist held in full ulnar deviation with axial load applied down the forearm while rotating forearm into pronation and supination. Positive if pain, clicking, or crepitus reproduced.',
        evidenceCitation: 'Hermansdorfer & Kleinman. J Hand Surg Am.',
      },
      {
        testName: 'Piano Key Test (DRUJ Instability)',
        sensitivity: '68%',
        specificity: '92%',
        techniqueAndInterpretation: 'Forearm pronated; clinician presses down on dorsal distal ulnar head. Positive if excessive laxity and springy rebound occurs like a piano key.',
        evidenceCitation: 'Kleinman. Hand Clin.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Dedicated Wrist 3T MRI or MR Arthrography (MRA) Coronal T2 Fat-Suppressed sequences',
        indications: 'Confirm TFCC Palmer classification (1A to 1D), foveal avulsion, DRUJ subluxation, and ulnocarpal abutment.',
        keyFindings: 'T2 hyperintense fluid traversing articular disc, disruption of foveal attachment, fluid in DRUJ.',
        accuracyOrYield: '3T MRA sensitivity 90%, specificity 92% for TFCC tears.',
      },
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Strict Neutral PA and Lateral Wrist Radiographs (Shoulder 90° abduction, elbow 90° flexion)',
        indications: 'Measure ulnar variance (positive variance > 2 mm predisposes to TFCC degeneration/abutment).',
        keyFindings: 'Ulnar positive variance, subchondral sclerosis of lunate/triquetrum; excludes ulnar styloid fracture.',
        accuracyOrYield: 'Essential for morphological variance measurement.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'WristWidget / Cast Protected Immobilization & DRUJ Stabilization Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'DRUJ Coaptation, WristWidget Support & Rotation Restriction',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Stabilize distal radioulnar joint with specialized circumferential wrist splint (WristWidget or Munster splint)', 'Restrict painful loaded pronation/supination', 'Control ulnar-sided synovitis'],
          exercisePrescription: [
            { category: 'External Support', exerciseName: 'WristWidget Targeted Compression Strap Application', dosage: 'Continuous during daytime activities', clinicalRationale: 'Approximates radius and ulna, taking tension off the peripheral TFCC ligaments and immediately restoring weight-bearing capacity.' },
            { category: 'Sagittal Mobility', exerciseName: 'Active Wrist Flexion and Extension (within Pain-Free Range in Neutral Rotation)', dosage: '3 sets of 10 gentle reps', clinicalRationale: 'Maintains radiocarpal mobility without twisting the ulnocarpal disc.' },
            { category: 'Dart-Thrower Motion', exerciseName: 'Dart-Thrower Motion Arc (Radial Extension to Ulnar Flexion)', dosage: '2 sets of 10 smooth reps', clinicalRationale: 'Moves through the functional midcarpal plane with minimal rotational shear on the TFCC.' },
          ],
          progressionCriteria: ['Pain-free weight-bearing on closed fist increases to > 15 kg', 'Fovea sign tenderness reduced by >= 50%', 'PRWE score improved by >= 11 points'],
          precautionsAndContraindications: ['STRICTLY AVOID: Pushing up from chair with flat palm; avoid loaded end-range pronation/supination (screwdrivers, tight door handles)'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Pronator Quadratus & Extensor Carpi Ulnaris (ECU) Dynamic Stability',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Strengthen pronator quadratus and ECU (the primary dynamic muscular stabilizers of the DRUJ)', 'Progressive rotational range of motion'],
          exercisePrescription: [
            { category: 'Dynamic DRUJ Stability', exerciseName: 'Isometric Pronator Quadratus Contractions (Forearm Mid-Pronation Against Squeeze)', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Pronator quadratus actively compresses the distal radius and ulna together, stabilizing the DRUJ.' },
            { category: 'ECU Strengthening', exerciseName: 'Resisted Wrist Extension with Slight Ulnar Deviation (ECU Focus)', dosage: '3 sets of 10 reps', clinicalRationale: 'ECU subsheath reinforces the dorsal-ulnar aspect of the TFCC complex.' },
          ],
          progressionCriteria: ['TFCC grind test negative', 'Able to carry 5 kg with WristWidget strap', 'Weight-bearing on flat palm tolerated with minimal discomfort'],
          precautionsAndContraindications: ['Continue wearing WristWidget during all loaded manual tasks'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Closed-Chain Weight-Bearing & Rotational Power',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Restore open-palm push-up capacity', 'Taper off WristWidget strap during low-load tasks', 'Power gripping'],
          exercisePrescription: [
            { category: 'Closed Chain', exerciseName: 'Quadruped Weight Shifts to Incline Push-Ups on Flat Palms', dosage: '3 sets of 10 reps', clinicalRationale: 'Progressively reconditions compressive ulnocarpal load tolerance.' },
            { category: 'Rotational Control', exerciseName: 'Dumbbell Hammer Rotation Drills (Controlled Pronation to Supination Arc)', dosage: '3 sets of 12 reps', clinicalRationale: 'Builds dynamic endurance across the full rotational plane.' },
          ],
          progressionCriteria: ['PRWE score < 15/100', 'Full painless weight-bearing on open palm', 'Symmetric grip strength >= 85% LSI'],
          precautionsAndContraindications: ['Maintain gradual progression into racket sports'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Racket Sports, Gymnastics & Trades',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Full return to high-demand sports (tennis, golf, gymnastics, martial arts) or manual construction trades', 'Long-term DRUJ stability'],
          exercisePrescription: [
            { category: 'Sports Return', exerciseName: 'Sport-Specific Drills (Impact Catching, Racket Swings) with Protective Wrist Strap', dosage: '2–3x weekly', clinicalRationale: 'Restores rapid deceleration and impact tolerance under competition conditions.' },
          ],
          progressionCriteria: ['Complete functional independence with zero residual ulnar wrist pain or clicking'],
          precautionsAndContraindications: ['Keep WristWidget strap in sports bag for high-demand tournament days'],
        },
      ],
    },
    clinicalPearls: [
      'The "Weight-Bearing Test": have the patient push up from a chair with both hands on a digital bathroom scale; in TFCC tears, the affected side bears < 50% of the force of the normal side. A simple WristWidget strap immediately increases weight-bearing by > 5 kg.',
    ],
  },

  {
    id: 'wrist-scaphoid-fracture-nonunion',
    joint: 'Wrist & Hand',
    name: 'Scaphoid Fracture & Nonunion Risk',
    category: 'High-Risk Carpal Bone Fracture / Retrograde Blood Supply',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'High-Risk Avascular Necrosis (AVN) & Nonunion: Scaphoid proximal pole fractures have a retrograde arterial blood supply (dorsal carpal branch of radial artery enters at waist and flows backward); proximal pole fractures have up to a 50–90% nonunion rate if unrecognized or untreated.',
      'Unrecognized scaphoid fracture with persistent anatomical snuffbox tenderness mandates strict thumb-spica cast and early MRI/CT (within 3–5 days).',
      'Scaphoid nonunion advanced collapse (SNAC wrist) with severe carpal osteoarthritis.',
    ],
    when_to_refer: [
      'MANDATORY URGENT ORTHOPAEDIC HAND SURGERY REFERRAL: Any confirmed scaphoid fracture (waist displacement > 1 mm, proximal pole, or comminuted) requires surgical headless compression screw (Herbert screw) fixation.',
      'Clinical snuffbox tenderness with negative X-rays requires thumb-spica cast immobilization and urgent MRI.',
    ],
    outcome_measures: [
      { name: 'Anatomical Snuffbox Tenderness', mcid: 'Resolution', target: 'Zero tenderness' },
      { name: 'Pinch and Grip Strength (% LSI)', mcid: '15%', target: '>= 85% LSI' },
      { name: 'Radiographic Fracture Line Consolidation (CT)', mcid: 'Complete union', target: 'Bridging trabeculae > 50% on CT' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-19',
    teaching_notes: {
      clinicalReasoning: 'Clinical Triad for Scaphoid Fracture: 1. Anatomical snuffbox tenderness (sensitivity 90%); 2. Scaphoid tubercle tenderness on volar wrist (sensitivity 87%); 3. Pain on longitudinal axial compression of the thumb (sensitivity 79%). When all 3 are positive, probability of scaphoid fracture is > 75%, even if initial radiographs are normal.',
      vivaQuestions: [
        {
          question: 'Why are scaphoid proximal pole fractures prone to avascular necrosis (AVN) and nonunion?',
          answer: 'The scaphoid receives 70–80% of its blood supply from the dorsal carpal branch of the radial artery, which enters at the waist/distal pole and flows retrograde (proximally). A fracture across the waist or proximal pole severs this retrograde arterial supply, leaving the proximal pole ischemic.',
        },
      ],
    },
    isRedFlag: true,
    redFlagSeverity: 'EMERGENCY_IMMEDIATE',
    clinicalPresentation: 'Fall on an outstretched hand (FOOSH) with impact on the thenar eminence. Deep radial-sided wrist pain, localized swelling in the anatomical snuffbox, inability to pinch firmly, and pain with thumb movement. Initial radiographs may appear falsely normal.',
    bedsideAssessmentTests: [
      {
        testName: 'Anatomical Snuffbox Tenderness Palpation',
        sensitivity: '90–96%',
        specificity: '40–58%',
        positiveLikelihoodRatio: '2.0',
        techniqueAndInterpretation: 'Palpate between extensor pollicis longus and extensor pollicis brevis with wrist in slight ulnar deviation. Positive if sharp focal bone pain elicited.',
        evidenceCitation: 'Brukner et al. Br J Sports Med; Carpenter et al. Acad Emerg Med.',
      },
      {
        testName: 'Scaphoid Tubercle Tenderness (Volar Palpation)',
        sensitivity: '87%',
        specificity: '57%',
        techniqueAndInterpretation: 'Firm palpation over prominent scaphoid tubercle on volar radial aspect of wrist at base of thenar eminence. Positive if sharp bony pain elicited.',
        evidenceCitation: 'Freeland. Orthopedics.',
      },
      {
        testName: 'Axial Thumb Compression Test',
        sensitivity: '79%',
        specificity: '80%',
        techniqueAndInterpretation: 'Longitudinal axial compression directed down the shaft of the 1st metacarpal into the scaphoid. Positive if deep sharp pain reproduced at scaphoid.',
        evidenceCitation: 'Chen. J Hand Surg Am.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Scaphoid Series (4-View: PA neutral, Lateral, PA with 30° ulnar deviation, 45° semipronated oblique)',
        indications: 'Mandatory initial imaging for all suspected scaphoid trauma.',
        keyFindings: 'Radiolucent fracture line across scaphoid waist, displacement > 1 mm, or cortical disruption; often falsely negative in first 7–10 days.',
        accuracyOrYield: 'Initial X-ray misses up to 15–20% of acute occult scaphoid fractures.',
      },
      {
        modality: 'MRI Scan',
        description: 'Dedicated Wrist MRI Coronal T1 and STIR sequences within 3–5 days',
        indications: 'Gold standard for early diagnosis when clinical exam is positive but plain X-rays are normal ("suspected occult scaphoid fracture").',
        keyFindings: 'Hypointense T1 fracture line with surrounding intense STIR bone marrow edema.',
        accuracyOrYield: 'Sensitivity 99–100%, Specificity 98–100%.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Strict Thumb-Spica Immobilization & Post-Union Mobilization Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Strict Thumb-Spica Cast / Surgical Post-Op Immobilization',
          timeline: 'Weeks 0–6',
          clinicalGoals: ['Strict immobilization in short/long arm thumb-spica cast or post-Herbert screw splint', 'Strict non-weight-bearing on wrist', 'Prevent fracture displacement and preserve retrograde blood supply'],
          exercisePrescription: [
            { category: 'Cast Immobilization', exerciseName: 'Strict Thumb-Spica Cast Wear (Thumb IP Joint Free for Light Motion)', dosage: 'Continuous 24/7 for 6–10 weeks (per fracture location)', clinicalRationale: 'Eliminates shear forces across the healing scaphoid waist.' },
            { category: 'Distal Conditioning', exerciseName: 'Active Finger Flexion/Extension (Composite Fist) & Shoulder/Elbow ROM', dosage: '3 sets of 15 reps, 4x daily', clinicalRationale: 'Prevents intrinsic hand contracture and stiffness.' },
            { category: 'Edema Control', exerciseName: 'Upper Limb Elevation and Ice Over Forearm', dosage: '20 minutes, 3x daily', clinicalRationale: 'Controls post-traumatic swelling.' },
          ],
          progressionCriteria: ['Completion of casting period', 'Resolution of anatomical snuffbox and scaphoid tubercle tenderness', 'CT scan confirming >= 50% bridging bony trabeculae'],
          precautionsAndContraindications: ['ABSOLUTELY NO WEIGHT-BEARING; do not remove cast; do not lift objects > 0.2 kg'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Cast Weaning, Removable Splint & Gentle Active Range of Motion',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Transition from rigid cast to removable thumb-spica splint', 'Initiate gentle active wrist flexion, extension, and thumb excursion', 'Wehbé tendon glides'],
          exercisePrescription: [
            { category: 'Active ROM', exerciseName: 'Active Unresisted Wrist Flexion, Extension, Pronation, and Supination', dosage: '3 sets of 10 gentle reps out of splint, 3x daily', clinicalRationale: 'Restores synovial circulation and articular cartilage nutrition.' },
            { category: 'Dart-Thrower Motion', exerciseName: 'Active Dart-Thrower Arc (Radial Extension to Ulnar Flexion)', dosage: '3 sets of 10 reps', clinicalRationale: 'Minimizes motion between scaphoid and lunate while restoring functional wrist motion.' },
            { category: 'Thumb Mobility', exerciseName: 'Opposition of Thumb to Each Fingertip', dosage: '3 sets of 10 cycles', clinicalRationale: 'Restores 1st carpometacarpal circumduction.' },
          ],
          progressionCriteria: ['Active wrist arc >= 40° flexion and 40° extension', 'Zero snuffbox tenderness', 'Solid union confirmed on follow-up imaging'],
          precautionsAndContraindications: ['No heavy lifting > 1 kg; no weight-bearing on open palm; wear splint during sleep'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Progressive Resistance, Grip Reconstruction & Closed-Chain Loading',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Taper off splint completely', 'Strengthen wrist flexors, extensors, and grip intrinsics', 'Initiate closed-chain weight-bearing progression'],
          exercisePrescription: [
            { category: 'Resistance Training', exerciseName: 'Light Dumbbell Wrist Curls and Reverse Curls (1–2 kg)', dosage: '3 sets of 10–12 reps', clinicalRationale: 'Reconditions atrophied forearm musculature.' },
            { category: 'Grip Strengthening', exerciseName: 'TheraPutty Squeeze and Pinch Drills', dosage: '10 minutes daily', clinicalRationale: 'Restores key pinch and power grip capacity.' },
            { category: 'Closed-Chain Progression', exerciseName: 'Wall Push-Ups to Incline Table Push-Ups', dosage: '3 sets of 10 reps', clinicalRationale: 'Gradually re-loads scaphoid axial compression under controlled conditions.' },
          ],
          progressionCriteria: ['Grip strength >= 80% of uninjured limb', 'Able to perform push-up from table without scaphoid pain', 'PRWE score < 20'],
          precautionsAndContraindications: ['Avoid heavy falls, impact sports, or heavy machinery until Phase 4'],
        },
        {
          phaseNumber: 4,
          phaseName: 'High-Demand Sports & Occupational Reconditioning',
          timeline: 'Weeks 14–20+',
          clinicalGoals: ['Return to collision sports, heavy manual trades, and gymnastics', 'Lifelong carpal integrity'],
          exercisePrescription: [
            { category: 'Sports Return', exerciseName: 'Full Push-Ups on Floor, Gymnastics Handstands, and Impact Catching Drills', dosage: 'Progressive per athletic requirements', clinicalRationale: 'Restores maximum functional load capacity.' },
          ],
          progressionCriteria: ['Full surgical clearance by hand surgeon', 'CT scan confirming 100% solid bony union'],
          precautionsAndContraindications: ['Wear protective wrist guard during skateboarding or snowboarding'],
        },
      ],
    },
    clinicalPearls: [
      'A normal X-ray does NOT rule out a scaphoid fracture; if the patient has anatomical snuffbox tenderness after a FOOSH, treat as a fracture in a thumb-spica cast and order an MRI within 3–5 days to prevent disastrous nonunion.',
    ],
  },

  {
    id: 'wrist-distal-radius-fracture',
    joint: 'Wrist & Hand',
    name: 'Distal Radius Fracture (Colles / Smith Fracture Post-Immobilization/ORIF)',
    category: 'Metaphyseal Bone Fracture / Extra vs Intra-Articular',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'proliferative',
    red_flags: [
      'Acute Carpal Tunnel Syndrome: Rapid onset of median nerve numbness and burning in fingers following fracture manipulation or ORIF (Requires emergency carpal tunnel decompression).',
      'Complex Regional Pain Syndrome (CRPS Type I): Disproportionate burning pain, allodynia, glossy skin, hyperhidrosis, temperature asymmetry, and extreme finger stiffness.',
      'Extensor Pollicis Longus (EPL) tendon rupture: Sudden loss of thumb IP joint extension 4–8 weeks post-fracture due to attrition over Lister\'s tubercle or screw protrusion.',
    ],
    when_to_refer: [
      'Immediate referral for acute carpal tunnel syndrome, progressive CRPS signs, or sudden loss of thumb extension (EPL rupture).',
      'Unacceptable radiographic alignment loss (> 5 mm radial shortening, > 2 mm intra-articular step-off, dorsal tilt > 10°).',
    ],
    outcome_measures: [
      { name: 'PRWE (Patient-Rated Wrist Evaluation)', mcid: '11.5 points', target: '<= 15/100' },
      { name: 'DASH Score', mcid: '10.8 points', target: '<= 15' },
      { name: 'Grip Strength (% LSI)', mcid: '15%', target: '>= 85% LSI' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'Colles fracture (dorsal displacement/"dinner fork" deformity) is the most common wrist fracture in adults. Volar locking plate ORIF allows early motion within 1–2 weeks, whereas cast immobilization requires 6 weeks of strict casting. Always monitor digital motion to prevent hand stiffness.',
      vivaQuestions: [
        {
          question: 'What is the "dinner fork deformity" and what radiographic parameters define an acceptable distal radius reduction?',
          answer: 'The dinner fork deformity is the dorsal displacement, dorsal tilt, and radial shift of the distal fragment in a Colles fracture. Acceptable radiographic parameters: radial height >= 10 mm, radial inclination 15–25°, volar tilt neutral to 10° volar (dorsal tilt < 10°), and articular step-off < 2 mm.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Severe wrist pain, swelling, and classic "dinner fork" (Colles) or "garden spade" (Smith) deformity following a fall on an outstretched hand. In post-cast or post-ORIF phase: marked wrist stiffness, digital stiffness, forearm weakness, and hypersensitivity.',
    bedsideAssessmentTests: [
      {
        testName: 'Wrist Active Goniometric Range of Motion & Finger Fist',
        sensitivity: '95%',
        specificity: '90%',
        techniqueAndInterpretation: 'Measure active flexion, extension, radial deviation, ulnar deviation, pronation, supination, and composite finger fist (distance from fingertips to distal palmar crease). Normal is 0 cm.',
        evidenceCitation: 'MacDermid et al. J Hand Ther; Handoll & Elliott. Cochrane Database Syst Rev.',
      },
      {
        testName: 'EPL Tendon Integrity Test (Thumb Retropulsion)',
        sensitivity: '98%',
        specificity: '99%',
        techniqueAndInterpretation: 'Hand flat on table; patient lifts thumb off table into hyperextension. Inability to lift thumb indicates EPL tendon rupture.',
        evidenceCitation: 'Roth et al. J Hand Surg Am.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'PA and Lateral Wrist Views at 2, 6, and 12 weeks',
        indications: 'Assess radial height (normal 11–12 mm), radial inclination (normal 22°), volar tilt (normal 11° volar), and monitor bony union.',
        keyFindings: 'Solid cortical and trabecular bridging across metaphyseal fracture line; stable volar locking plate/screws without intra-articular screw penetration.',
        accuracyOrYield: 'Gold standard for fracture surveillance.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Phase-Specific Post-Distal Radius Fracture Rehabilitation & CRPS Prevention Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Edema Control, Digital Mobility & Early Protected Arc',
          timeline: 'Weeks 0–6 (Post-Cast) or Weeks 1–3 (Post-ORIF)',
          clinicalGoals: ['Aggressive edema reduction (high elevation, retrograde massage)', 'Full composite finger fist (0 cm to palmar crease)', 'Gentle active wrist motion (day 10 post-ORIF; week 6 post-cast)', 'Prevent CRPS'],
          exercisePrescription: [
            { category: 'Digital Motion', exerciseName: 'Composite Fist, Hook Fist, and Tabletop Finger Drills', dosage: '10 reps every waking hour', clinicalRationale: 'Prevents intrinsic digital contracture and ensures flexor tendon gliding through carpal canal.' },
            { category: 'Edema Control', exerciseName: 'High Elevation Above Heart & Retrograde Finger-to-Axilla Massage', dosage: '15 minutes, 3x daily', clinicalRationale: 'Rapidly mobilizes post-fracture lymphatic fluid and prevents secondary tissue fibrosis.' },
            { category: 'Active Wrist ROM', exerciseName: 'Active Unresisted Wrist Flexion, Extension, Pronation, and Supination', dosage: '3 sets of 10 gentle reps, 4x daily', clinicalRationale: 'Restores early radiocarpal and radioulnar joint excursion.' },
          ],
          progressionCriteria: ['Fingertips touch distal palmar crease (0 cm)', 'Surgical wound completely healed', 'Pain <= 3/10 during active motion', 'No signs of CRPS'],
          precautionsAndContraindications: ['NO heavy lifting > 1 kg; no weight-bearing on palm; avoid aggressive painful passive stretching'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Tendon Gliding, Dart-Thrower Arc & Passive Mobilization',
          timeline: 'Weeks 6–9',
          clinicalGoals: ['Expand wrist extension to >= 50° and flexion to >= 45°', 'Full pronation/supination (>= 70° each)', 'Initiate light isometric strengthening and joint mobilization'],
          exercisePrescription: [
            { category: 'Dart-Thrower Motion', exerciseName: 'Dart-Thrower Arc Drills with Light Dowel', dosage: '3 sets of 15 reps', clinicalRationale: 'Mobilizes the midcarpal joint through its natural functional axis with minimal radiocarpal shear.' },
            { category: 'Joint Mobilization', exerciseName: 'Maitland Grade II–III Radiocarpal Palmar/Dorsal Glides', dosage: '3 sets of 30s oscillations', clinicalRationale: 'Restores accessory joint arthrokinematics to expand physiological range of motion.' },
            { category: 'Light Isometrics', exerciseName: 'Submaximal Wrist Flexor and Extensor Isometrics', dosage: '3 sets of 8 reps, 5s hold', clinicalRationale: 'Initiates motor unit recruitment without joint wear.' },
          ],
          progressionCriteria: ['Wrist extension >= 45°', 'Pronation and supination >= 60° each', 'PRWE score improved by >= 15 points'],
          precautionsAndContraindications: ['Discontinue any mobilization that produces lingering swelling or deep joint ache'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Progressive Resistance, Grip Reconstruction & Closed-Chain Loading',
          timeline: 'Weeks 9–12',
          clinicalGoals: ['Progressive resistance training with dumbbells (1 to 3 kg)', 'Grip strength recovery >= 75% LSI', 'Wall push-ups and carrying loads'],
          exercisePrescription: [
            { category: 'Dumbbell Strengthening', exerciseName: 'Resisted Wrist Curls, Reverse Wrist Curls, and Pronation/Supination', dosage: '3 sets of 10–12 reps at RPE 7', clinicalRationale: 'Rebuilds forearm muscular hypertrophy and bone mineral density.' },
            { category: 'Grip Strengthening', exerciseName: 'TheraPutty and Hand Gripper Training', dosage: '10 minutes daily', clinicalRationale: 'Restores power grip necessary for daily living independence.' },
            { category: 'Weight-Bearing', exerciseName: 'Incline Push-Ups on Flat Palms with Gentle Wrist Extension', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores axial compression tolerance through the consolidated radial metaphysis.' },
          ],
          progressionCriteria: ['Grip strength >= 75% of uninjured limb', 'Able to carry 5 kg comfortably', 'PRWE score < 20'],
          precautionsAndContraindications: ['Ensure fracture union is solid on X-ray before heavy impact'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Functional Independence, Heavy Trades & Sports Return',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Full return to sports (tennis, golf, cycling), driving, and heavy manual trades', 'Lifelong bone health optimization'],
          exercisePrescription: [
            { category: 'Functional Fitness', exerciseName: 'Full Floor Push-Ups, Pull-Ups, and Farmer Carries', dosage: '3x weekly', clinicalRationale: 'Restores complete functional resilience and bilateral symmetry.' },
          ],
          progressionCriteria: ['PRWE score < 10/100', 'Grip strength >= 85–90% LSI', 'Full patient satisfaction'],
          precautionsAndContraindications: ['Consider DEXA bone mineral density screening for osteoporosis management'],
        },
      ],
    },
    clinicalPearls: [
      'Early composite finger fist exercises (making sure fingertips touch the distal palmar crease) must start on Day 1; stiff fingers are far harder to rehabilitate than a stiff wrist.',
    ],
  },

  {
    id: 'wrist-first-cmc-osteoarthritis',
    joint: 'Wrist & Hand',
    name: 'First Carpometacarpal (CMC) Joint Osteoarthritis (Rhizarthrosis)',
    category: 'Saddle Joint Degeneration / Basal Thumb Arthrosis',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Bone', 'Ligament'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Severe subluxation / "squaring of the hand" with prominent dorsal subluxation of 1st metacarpal base and compensatory MCP hyperextension deformity (Eaton-Littler Stage IV).',
      'Acute septic thumb joint with spreading redness, fever, and severe pain.',
    ],
    when_to_refer: [
      'End-stage Eaton-Littler Stage III or IV with intractable pain and loss of grasp failing conservative care (trapeziectomy with ligament reconstruction and tendon interposition - LRTI candidate).',
    ],
    outcome_measures: [
      { name: 'AUSCAN (Australian/Canadian Osteoarthritis Hand Index)', mcid: '6 points', target: '<= 15/100' },
      { name: 'Pinch Grip Strength (Key Pinch in kg)', mcid: '15%', target: '>= 80% of normal norms' },
      { name: 'NRS Basal Thumb Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Grind Test (axial compression with rotation of the 1st metacarpal on the trapezium) reproduces sharp deep pain and crepitus. Strengthening the 1st dorsal interosseous (FDI) and abductor pollicis longus (APL) restores dynamic stability and widens the first web space.',
      vivaQuestions: [
        {
          question: 'What is the Eaton-Littler classification for 1st CMC osteoarthritis?',
          answer: 'Stage I: Normal joint contours, slight joint space widening (synovitis); Stage II: Joint space narrowing, small osteophytes < 2 mm; Stage III: Marked joint space loss, subchondral sclerosis, osteophytes > 2 mm; Stage IV: Advanced pantrapezial arthritis involving both CMC and scaphotrapeziotrapezoid (STT) joints.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Deep aching pain at the base of the thumb over the anatomical "snuffbox" margin. Aggravated by pinching, opening jars, turning keys, writing, and opening doorknobs. Palpable bony prominence ("squaring" deformity of the hand) and crepitus on movement.',
    bedsideAssessmentTests: [
      {
        testName: 'CMC Grind Test',
        sensitivity: '64%',
        specificity: '80%',
        positiveLikelihoodRatio: '3.2',
        techniqueAndInterpretation: 'Clinician grasps the 1st metacarpal and applies axial compression while rotating it across the trapezium. Positive if sharp concordant pain, audible crepitus, or grinding elicited.',
        evidenceCitation: 'Merritt et al. J Hand Ther; Model. J Am Acad Orthop Surg.',
      },
      {
        testName: 'Traction-Shift Test of the Basal Thumb',
        sensitivity: '76%',
        specificity: '85%',
        techniqueAndInterpretation: 'Longitudinal traction applied to thumb metacarpal followed by dorsal-volar translation. Pain and excessive subluxation indicate anterior oblique ligament incompetence.',
        evidenceCitation: 'Glickel. Hand Clin.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Bilateral Basal Thumb Views (Robert\'s View - True AP of 1st CMC with hyperpronated forearm)',
        indications: 'Confirm Eaton-Littler stage (Stage I to IV), measure joint space narrowing, subluxation, and scaphotrapeziotrapezoid (STT) involvement.',
        keyFindings: 'First CMC joint space obliteration, subchondral sclerosis, large radial/volar osteophytes, lateral subluxation of metacarpal base.',
        accuracyOrYield: 'Robert\'s view is gold standard for visualizing the 1st CMC saddle joint.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Dynamic Web-Space Stability & Functional CMC Splinting Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Joint Unloading, Soft Neoprene Splinting & Pain Calming',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Unload 1st CMC joint with low-profile soft neoprene thumb brace (Comfort Cool / Push MetaGrip)', 'Abolish pinching flare-ups', 'Joint protection education'],
          exercisePrescription: [
            { category: 'External Support', exerciseName: 'Low-Profile Neoprene Thumb CMC Support Splint (Push MetaGrip or Comfort Cool)', dosage: 'Worn during daytime pinching activities', clinicalRationale: 'Stabilizes the 1st metacarpal base in slight abduction, preventing dorsal subluxation during pinch grasp.' },
            { category: 'Joint Protection', exerciseName: 'Adaptive Equipment Usage (Electric Jar Opener, Built-Up Pen Grips, Lever Door Handles)', dosage: 'Continuous', clinicalRationale: 'Reduces joint contact stress by up to 60% through mechanical leverage.' },
            { category: 'Gentle Distraction', exerciseName: 'Self-Distraction of 1st Metacarpal Base in Warm Water', dosage: '3 sets of 30s gentle traction', clinicalRationale: 'Relieves capsular compressive spasm and increases synovial fluid circulation.' },
          ],
          progressionCriteria: ['Pain with daily activities reduced by >= 50%', 'AUSCAN score improves by >= 6 points', 'Tolerates functional splint comfortably'],
          precautionsAndContraindications: ['Avoid heavy pincer gripping without splint; avoid twisting tight jar lids manually'],
        },
        {
          phaseNumber: 2,
          phaseName: 'First Dorsal Interosseous (FDI) & Opponens Pollicis Neuromuscular Training',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen the 1st dorsal interosseous (FDI) to create dynamic abduction stability', 'Maintain round "O-pinch" web space'],
          exercisePrescription: [
            { category: 'FDI Strengthening', exerciseName: 'Resisted Index Finger Abduction Against Resistance Band (FDI Focus)', dosage: '3 sets of 12 reps, hold 3s', clinicalRationale: 'FDI contraction pulls the 1st metacarpal away from the trapezium, dynamically opening the joint space.' },
            { category: 'C-Shape Pinch', exerciseName: '"O-Pinch" / "C-Pinch" Postural Training with Tennis Ball / Small Cup', dosage: '3 sets of 10 gentle pinches, maintaining open round web space', clinicalRationale: 'Prevents thumb collapse into adduction and hyperextension during functional grasp.' },
          ],
          progressionCriteria: ['Grind test pain reduced by >= 50%', 'Key pinch force increases by >= 15%', 'Demonstrates round web space during pinching'],
          precautionsAndContraindications: ['Never allow the thumb MCP joint to collapse into hyperextension (zigzag deformity)'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Grip Integration & Dexterity Endurance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Translate dynamic stability into daily manual tasks', 'Wean from rigid splints to light support for high-demand tasks'],
          exercisePrescription: [
            { category: 'Functional Grasp', exerciseName: 'TheraPutty Pinch and Roll Drills Maintaining Round Web Space', dosage: '10 minutes daily', clinicalRationale: 'Builds intrinsic hand muscular endurance for writing, typing, and cooking.' },
            { category: 'Opposition Strength', exerciseName: 'Opponens Pollicis Touch and Hold to 5th Metacarpal Head', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Restores pronation of the 1st metacarpal for stable pad-to-pad pinch.' },
          ],
          progressionCriteria: ['AUSCAN score < 20/100', 'Painless performance of daily kitchen and dressing tasks', 'Normal pinch stability'],
          precautionsAndContraindications: ['Continue using adaptive tools for stubborn jars or tight keys'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Lifelong Self-Management & Joint Longevity',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Lifelong joint protection habits', 'Maintain thumb web space flexibility and muscle tone'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily FDI Strengthening and Web Space Stretch Routine', dosage: '5 minutes daily', clinicalRationale: 'Sustains dynamic muscular stabilization to delay or prevent joint surgery.' },
          ],
          progressionCriteria: ['Stable functional status and high patient satisfaction on long-term follow-up'],
          precautionsAndContraindications: ['Seek hand surgical consultation if resting nocturnal pain becomes refractory'],
        },
      ],
    },
    clinicalPearls: [
      'Strengthening the First Dorsal Interosseous (FDI) muscle creates a dynamic muscular sling that physically pulls the metacarpal base away from the arthritic trapezium; it is the single most powerful therapeutic exercise for thumb OA.',
    ],
  },

  {
    id: 'wrist-trigger-finger',
    joint: 'Wrist & Hand',
    name: 'Stenosing Tenosynovitis (Trigger Finger / A1 Pulley)',
    category: 'Flexor Tendon Sheath Entrapment / Annular Pulley Thickening',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Bursa & Fascia'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Fixed locked finger (inability to passively or actively extend the digit) requiring urgent surgical percutaneous or open A1 pulley release.',
      'Multiple trigger fingers associated with underlying diabetes mellitus, rheumatoid arthritis, or amyloidosis.',
      'Infection: Acute flexor tenosynovitis (Kanavel signs).',
    ],
    when_to_refer: [
      'Fixed locked digit that cannot be unlocked passively.',
      'Failure of conservative splinting and 1–2 corticosteroid injections (surgical A1 pulley release candidate).',
    ],
    outcome_measures: [
      { name: 'Quinnell Trigger Finger Severity Grade (Grade 0 to IV)', mcid: '1 grade', target: 'Grade 0 (normal motion)' },
      { name: 'Number of Triggering Events Per Day', mcid: '50% reduction', target: '0 triggers/day' },
      { name: 'NRS Palmar A1 Pulley Pain', mcid: '2 points', target: '0/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Trigger finger is a stenosis of the first annular (A1) pulley at the metacarpal head, causing mismatch between tendon volume (nodular thickening of FDS/FDP) and the fibro-osseous pulley. Night MCP flexion restriction splinting prevents the nodule from entering the pulley during sleep.',
      vivaQuestions: [
        {
          question: 'What are the Quinnell grades for trigger finger severity?',
          answer: 'Grade 0: Normal movement; Grade I: Uneven movement / clicking without locking; Grade II: Actively correctable locking (can straighten finger actively); Grade III: Passively correctable locking (requires other hand to unlock); Grade IV: Fixed deformity (locked in flexion).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Painful catching, popping, or snapping of the finger (most commonly ring, middle, or thumb) during flexion and extension. Finger may become locked in flexion in the morning, requiring the other hand to pop it straight. Palpable tender nodule over the A1 pulley at the distal palmar crease.',
    bedsideAssessmentTests: [
      {
        testName: 'Palpation of A1 Pulley with Active Finger Flexion/Extension',
        sensitivity: '92%',
        specificity: '96%',
        positiveLikelihoodRatio: '23.0',
        techniqueAndInterpretation: 'Palpate over A1 pulley at distal palmar crease while patient flexes and extends finger. Positive if localized tenderness, nodule movement, or palpable triggering snap reproduced.',
        evidenceCitation: 'Sampson et al. J Hand Surg Am; Quinnell. J Bone Joint Surg Br.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'High-Resolution Dynamic Ultrasound of A1 Pulley and Flexor Tendon',
        indications: 'Confirm A1 pulley thickening (> 1.0 mm), tendon nodule, and real-time impingement during active flexion.',
        keyFindings: 'A1 pulley thickness > 1.0 mm (normal 0.5 mm), hypoechoic tenosynovial halo, tendon bunching during glide.',
        accuracyOrYield: 'Ultrasound sensitivity 94%, specificity 98%.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'MCP Immobilization Splinting & Differential Tendon Gliding Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'MCP Neutral Splinting, Nodule De-Loading & Swelling Control',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Prevent triggering by immobilizing MCP joint at 0° (allows full IP joint motion while keeping nodule outside the A1 pulley)', 'Night and daytime splinting for 4–6 weeks (resolves > 65% of Grade I–II cases)', 'Eliminate painful snapping'],
          exercisePrescription: [
            { category: 'Splinting', exerciseName: 'Custom Thermoplastic or Prefabricated MCP Extension Splint (MCP at 0°, PIP/DIP Free)', dosage: 'Worn continuously (including sleep) for 4–6 weeks', clinicalRationale: 'Keeps the swollen tendon nodule positioned distal to the A1 pulley, eliminating mechanical friction.' },
            { category: 'IP Joint Mobility', exerciseName: 'Active PIP and DIP Joint Flexion/Extension in Splint (Hook Fist)', dosage: '3 sets of 10 reps, 3x daily', clinicalRationale: 'Maintains digital collateral ligament length and prevents PIP contracture.' },
            { category: 'Myofascial Release', exerciseName: 'Gentle Circular Massage Over A1 Pulley with Ice Cube', dosage: '3 minutes, 2x daily', clinicalRationale: 'Reduces local inflammatory edema in the palmar fascia.' },
          ],
          progressionCriteria: ['Zero triggering episodes while wearing splint', 'A1 pulley palpation tenderness reduced by >= 50%', 'Quinnell grade improves by at least 1 grade'],
          precautionsAndContraindications: ['STRICTLY CONTRAINDICATED: Aggressive repetitive gripping or forcing finger to trigger and pop repeatedly'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Splint Weaning, Hook Fist Differential Gliding & Tissue Remodeling',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Wean splint to night-only wear', 'Initiate differential tendon gliding (FDS vs FDP)', 'Restore full pain-free fist formation without triggering'],
          exercisePrescription: [
            { category: 'Differential Gliding', exerciseName: 'Hook Fist (FDP Glide) to Straight Fist (FDS Glide) Sequences', dosage: '3 sets of 10 smooth reps out of splint', clinicalRationale: 'Restores independent excursion between the two flexor tendons through the annular pulley system.' },
            { category: 'Extensor Conditioning', exerciseName: 'Resisted Finger Extension Against Elastic Band', dosage: '3 sets of 12 reps', clinicalRationale: 'Strengthens the extensor digitorum communis to overcome any residual flexor resistance.' },
          ],
          progressionCriteria: ['Able to make a full active fist and extend fully without triggering', 'Quinnell Grade 0 (normal motion)', 'PRWE score < 15'],
          precautionsAndContraindications: ['If triggering recurs, immediately return to full-time splinting for an additional 2 weeks'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Grip Reconditioning & Occupational Adaptation',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Discontinue splint completely', 'Full return to power gripping tools and sports equipment', 'Ergonomic handle padding'],
          exercisePrescription: [
            { category: 'Tool Ergonomics', exerciseName: 'Handle Diameter Enlargement and Cushioned Grips on Tools and Steering Wheels', dosage: 'Continuous', clinicalRationale: 'Wider grip diameter reduces required tendon excursion and peak pulley contact pressure.' },
            { category: 'Grip Strengthening', exerciseName: 'TheraPutty Progressive Squeeze and Pinch Drills', dosage: '10 minutes, 3x weekly', clinicalRationale: 'Restores functional hand strength without causing tenosynovial irritation.' },
          ],
          progressionCriteria: ['Zero triggering events for > 30 consecutive days', 'Normal grip strength and hand function'],
          precautionsAndContraindications: ['Pace heavy repetitive vibration tool usage'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Surveillance & Lifestyle Maintenance',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Sustained symptom-free hand function', 'Early intervention if mild stiffness returns'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Morning Warm Water Tendon Gliding Exercises', dosage: '3 minutes every morning', clinicalRationale: 'Stimulates synovial lubrication and prevents overnight tendon stiffening.' },
          ],
          progressionCriteria: ['Complete resolution of trigger finger at 6-month and 1-year follow-up'],
          precautionsAndContraindications: ['Seek medical evaluation for corticosteroid injection or percutaneous release if locking becomes fixed'],
        },
      ],
    },
    clinicalPearls: [
      'Colbourn et al. (J Hand Ther) demonstrated that custom MCP extension splinting alone resolves trigger finger in up to 77% of patients, eliminating the need for corticosteroid injections or surgery.',
    ],
  },

  // ==========================================
  // TEMPOROMANDIBULAR JOINT (TMJ) (4 Conditions)
  // ==========================================
  {
    id: 'tmj-disc-displacement-with-reduction',
    joint: 'Temporomandibular Joint (TMJ)',
    name: 'TMJ Disc Displacement with Reduction (Clicking / Reciprocal Pop)',
    category: 'Articular Disc Derangement / Reciprocal Reduction',
    tissue_group: 'soft',
    tissue_types: ['Meniscus/Labrum/Cartilage', 'Articular Surface'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Sudden progression to closed lock (inability to open mouth > 25 mm) indicating progression to disc displacement WITHOUT reduction.',
      'Severe intractable facial pain with sensory loss in CN V (trigeminal distribution) indicating intracranial / skull base neoplasm.',
      'Temporal arteritis: Severe temple headache, scalp tenderness, jaw claudication on chewing, vision loss in patient > 50 (Emergency corticosteroid therapy).',
    ],
    when_to_refer: [
      'Sudden closed lock with severe restricted mouth opening (< 25 mm).',
      'Suspicion of giant cell temporal arteritis or trigeminal neuralgia.',
    ],
    outcome_measures: [
      { name: 'Maximum Pain-Free Mouth Opening (mm)', mcid: '5 mm', target: '>= 40 mm' },
      { name: 'JFLS (Jaw Functional Limitation Scale)', mcid: '1.0 point', target: '<= 1.5' },
      { name: 'NRS TMJ Clicking Pain', mcid: '2 points', target: '<= 1/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Classic "Reciprocal Click": Opening click occurs as the anteriorly displaced disc reduces onto the condyle; closing click occurs just before full intercuspation as the condyle slips posterior to the disc. The closing click occurs closer to centric occlusion than the opening click.',
      vivaQuestions: [
        {
          question: 'What is the biomechanical explanation for the reciprocal click in TMJ disc displacement with reduction?',
          answer: 'The articular disc is displaced anteromedially at rest. During mouth opening, the mandibular condyle translates forward and snaps over the thickened posterior band of the disc onto the intermediate zone (opening click = reduction). On closing, the condyle slips back off the disc into the bilaminar retrodiscal tissue (closing click = dislocation).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Audible or palpable clicking, popping, or snapping during mouth opening and closing. Transient S-curve deviation of the jaw towards the affected side on opening that corrects upon reduction. Mild masticatory muscle aching, but maximum mouth opening is typically normal (>= 40 mm).',
    bedsideAssessmentTests: [
      {
        testName: 'Reciprocal Clicking Auscultation & Mandibular Deviation Assessment',
        sensitivity: '89%',
        specificity: '87%',
        positiveLikelihoodRatio: '6.8',
        techniqueAndInterpretation: 'Clinician palpates bilateral TMJ poles while patient slowly opens and closes mouth. Positive if an opening click occurs followed by a closing click at a different mandibular opening position, with temporary S-shaped deviation.',
        evidenceCitation: 'Schiffman et al. J Oral Facial Pain Headache (DC/TMD Criteria).',
      },
      {
        testName: 'Maximum Unassisted Mouth Opening (Inter-Incisal Distance in mm)',
        sensitivity: '85%',
        specificity: '80%',
        techniqueAndInterpretation: 'Measure distance between incisal edges of maxillary and mandibular central incisors. Normal is >= 40 mm; preserved in disc displacement with reduction.',
        evidenceCitation: 'Dworkin & LeResche. J Craniomandib Disord.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Dedicated TMJ MRI Sagittal and Coronal T1 and T2 sequences in Closed and Open Mouth Positions',
        indications: 'Confirm anterior disc displacement in closed-mouth view and complete anatomical reduction onto the condyle in open-mouth view.',
        keyFindings: 'Articular disc posterior band positioned anterior to 12 o\'clock condylar apex in closed mouth, which repositions between condyle and articular eminence in open mouth.',
        accuracyOrYield: 'Gold standard for TMJ disc imaging (Sensitivity 95%, Specificity 93%).',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Rocabado 6x6 Cranio-Mandibular Neuromuscular Re-education Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Masticatory De-Loading, Soft Diet & Tongue Rest Position',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Adopt non-chewy, soft-food diet to reduce joint contact stress', 'Educate on "lips together, teeth apart, tongue on palate" physiological resting posture', 'Eliminate clenching, nail biting, and chewing gum habits'],
          exercisePrescription: [
            { category: 'Resting Posture', exerciseName: 'Rocabado Tongue Rest Position (Tip of Tongue on Roof of Mouth Behind Front Teeth)', dosage: 'Continuous daytime habit', clinicalRationale: 'Automatically separates the teeth by 2–3 mm (freeway space), eliminating compressive clenching load on the TMJ disc.' },
            { category: 'Soft Food Diet', exerciseName: 'Soft Diet Compliance & Cutting Food into Small Bites', dosage: 'Continuous for 4 weeks', clinicalRationale: 'Decreases peak masticatory bite force and avoids wide mouth excursions that displace the disc.' },
            { category: 'Night Splint', exerciseName: 'Collaboration for Custom Occlusal Stabilization Splint (Night Guard)', dosage: 'Worn nightly during sleep', clinicalRationale: 'Protects the joint from nocturnal bruxism and unloads the bilaminar retrodiscal tissue.' },
          ],
          progressionCriteria: ['Abolition of daytime jaw clenching', 'Significant reduction in TMJ clicking intensity', 'JFLS score improved by >= 1.0 point'],
          precautionsAndContraindications: ['STRICTLY AVOID: Chewing gum, opening mouth wide to yawn without tongue on palate, eating hard nuts/carrots'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Rocabado Controlled Symmetrical Opening & Neuromuscular Tracking',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Train pure condylar rotation without early anterior translation', 'Eliminate lateral S-curve deviation during opening', 'Controlled opening in mirror'],
          exercisePrescription: [
            { category: 'Controlled Opening', exerciseName: 'Rocabado Controlled Opening with Tongue Maintained on Hard Palate', dosage: '6 repetitions, 6 times daily', clinicalRationale: 'Permits the initial 25 mm of pure condylar rotational opening while preventing early anterior shear translation.' },
            { category: 'Mirror Tracking', exerciseName: 'Symmetrical Mandibular Opening in Front of Mirror (Vertical Center Line)', dosage: '3 sets of 10 slow reps', clinicalRationale: 'Provides visual biofeedback to recruit lateral pterygoids and digastrics symmetrically.' },
          ],
          progressionCriteria: ['Pain-free opening to >= 35 mm without deviation or click', 'NRS clicking pain <= 1/10'],
          precautionsAndContraindications: ['Never force opening past the click; keep movement smooth and slow'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Isometric Stabilization & Cervico-Cranial Coordination',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Submaximal isometric stabilization in all mandibular directions', 'Cervical spine posture correction (forward head posture increases TMJ shear)'],
          exercisePrescription: [
            { category: 'Isometrics', exerciseName: 'Submaximal Isometric Opening, Lateral Deviation, and Retraction (Rocabado 6x6)', dosage: '6 reps of 6s holds per direction, 6x daily', clinicalRationale: 'Strengthens masticatory dynamic stabilizers without joint motion.' },
            { category: 'Cervical Posture', exerciseName: 'Cervical Chin Tucks and Scapular Retractions', dosage: '3 sets of 10 reps', clinicalRationale: 'Counters forward head posture, which mechanically tethers the hyoid musculature and forces the mandible into retraction.' },
          ],
          progressionCriteria: ['Maximum unassisted opening >= 40 mm', 'JFLS score < 1.5', 'Zero pain during normal chewing'],
          precautionsAndContraindications: ['Maintain gentle resistance; no heavy forceful jaw pushing'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Functional Maintenance & Relapse Prevention',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Full return to normal diet', 'Permanent stress management and parafunctional habit elimination'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Rocabado 6x6 Routine and Diaphragmatic Relaxation Breaks', dosage: '3 minutes daily', clinicalRationale: 'Prevents daytime stress-induced jaw clenching.' },
          ],
          progressionCriteria: ['Complete functional independence and stable painless jaw excursion'],
          precautionsAndContraindications: ['Seek immediate dental/physiotherapy review if jaw becomes stuck or locked in closed position'],
        },
      ],
    },
    clinicalPearls: [
      'Clicking alone in an asymptomatic TMJ does not require aggressive treatment; however, training controlled opening with the tongue on the roof of the mouth prevents progression to acute closed lock.',
    ],
  },

  {
    id: 'tmj-disc-displacement-without-reduction',
    joint: 'Temporomandibular Joint (TMJ)',
    name: 'TMJ Disc Displacement without Reduction (Closed Lock)',
    category: 'Acute / Chronic Disc Entrapment / Mechanical Opening Block',
    tissue_group: 'soft',
    tissue_types: ['Meniscus/Labrum/Cartilage', 'Articular Surface'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Acute complete closed lock with opening < 20 mm failing manual reduction: Requires urgent TMJ arthrocentesis / arthroscopy within 1–2 weeks before permanent capsular fibrosis occurs.',
      'Mandibular condyle fracture following chin trauma.',
      'Parotid gland tumor or masticatory space deep abscess (trismus with swelling, fever, and facial asymmetry).',
    ],
    when_to_refer: [
      'Acute closed lock within first 2 weeks failing physical therapy manual reduction (urgent oral and maxillofacial surgeon consultation for TMJ arthrocentesis / joint lavage).',
    ],
    outcome_measures: [
      { name: 'Maximum Assisted Mouth Opening (mm)', mcid: '5 mm', target: '>= 38 mm' },
      { name: 'JFLS (Jaw Functional Limitation Scale)', mcid: '1.0 point', target: '<= 2.0' },
      { name: 'NRS Jaw Pain (0–10)', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'In closed lock, the disc remains permanently trapped anterior to the condyle throughout the entire movement cycle; the condyle is physically blocked from translating forward along the articular eminence, limiting maximum opening to 20–30 mm with definitive deviation towards the affected side.',
      vivaQuestions: [
        {
          question: 'What happens to the TMJ clicking sound when a patient progresses from disc displacement with reduction to closed lock?',
          answer: 'The clicking sound completely disappears because the condyle is no longer able to reduce or snap over the disc; the disappearance of clicking accompanied by severe opening restriction (< 25 mm) confirms progression to closed lock.',
        },
      ],
    },
    isRedFlag: true,
    redFlagSeverity: 'URGENT_SAME_DAY',
    clinicalPresentation: 'Sudden onset of severe restricted mouth opening (typically <= 25–30 mm), preceded by a history of clicking that suddenly stopped. Jaw deflects sharply towards the affected side on opening. Inability to eat normal solid foods, severe pain on attempted forced opening.',
    bedsideAssessmentTests: [
      {
        testName: 'Maximum Assisted Mouth Opening with End-Feel Assessment',
        sensitivity: '92%',
        specificity: '89%',
        positiveLikelihoodRatio: '8.4',
        techniqueAndInterpretation: 'Measure maximum opening (incisal distance). In acute closed lock, opening is < 30 mm with an abrupt, hard, unyielding mechanical end-feel and deflection towards the affected side.',
        evidenceCitation: 'Schiffman et al. J Oral Facial Pain Headache (DC/TMD Criteria).',
      },
      {
        testName: 'Contralateral Lateral Excursion Measurement',
        sensitivity: '88%',
        specificity: '85%',
        techniqueAndInterpretation: 'Measure lateral jaw movement towards the unaffected side. Markedly restricted (< 7 mm) because the affected condyle cannot translate forward and medially.',
        evidenceCitation: 'Dworkin & LeResche. J Craniomandib Disord.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Dedicated TMJ MRI in Closed and Open Mouth Positions',
        indications: 'Confirm anterior disc displacement without reduction and evaluate retrodiscal tissue adaptation.',
        keyFindings: 'Articular disc remains trapped anterior to the condylar head in both closed-mouth and attempted maximum open-mouth views.',
        accuracyOrYield: 'Gold standard for closed lock diagnosis.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Acute Manual Mobilization, Joint Distraction & Functional Adaptation Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Emergency Manual Distraction Mobilization, Soft Diet & Pain Calming',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Attempt manual closed-lock reduction via caudal-ventral condylar distraction', 'Strict pureed / liquid diet', 'Abolish acute retrodiscal capsular inflammation'],
          exercisePrescription: [
            { category: 'Manual Reduction', exerciseName: 'Intra-Oral Inferior Distraction and Anterior Glide Mobilization', dosage: 'Maitland Grade III–IV distraction with gloved thumb on lower molars', clinicalRationale: 'Gaps the joint to allow the anteriorly trapped disc to slip back onto the condylar head (if acute within 1–2 weeks).' },
            { category: 'Diet Modification', exerciseName: 'Strict Pureed / Liquid Diet (Zero Chewing Force)', dosage: 'Continuous for 2 weeks', clinicalRationale: 'Removes all compressive joint contact stress from the hyperemic, inflamed retrodiscal pad.' },
            { category: 'Cryo-Thermal', exerciseName: 'Intermittent Moist Heat and Ice Application over Preauricular Region', dosage: '15 minutes, 3x daily', clinicalRationale: 'Relieves acute protective masseter and temporalis muscle spasm.' },
          ],
          progressionCriteria: ['Successful reduction (opening increases to > 35 mm) OR adaptation with opening >= 30 mm', 'NRS pain reduced by >= 50%'],
          precautionsAndContraindications: ['STRICTLY AVOID: Forcing mouth open aggressively against mechanical bone block; refer urgently for arthrocentesis if no progress in 10 days'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Capsular Mobility, Pseudo-Disc Adaptation & Controlled Opening',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['If disc remains unreduced, promote progressive remodeling of retrodiscal tissue into a functional "pseudo-disc"', 'Gradually expand opening to >= 35 mm', 'Symmetrical lateral excursion'],
          exercisePrescription: [
            { category: 'Gentle Distraction', exerciseName: 'Self-Distraction of Mandible with Downward Hand Traction on Chin', dosage: '3 sets of 10 gentle repetitions, hold 3s', clinicalRationale: 'Gently stretches the posterior joint capsule and stimulates collagen elongation.' },
            { category: 'Lateral Excursion', exerciseName: 'Gentle Active Lateral Excursion Towards Contralateral Side', dosage: '2 sets of 10 reps', clinicalRationale: 'Mobilizes the hypomobile condyle along the medial slope of the eminence.' },
          ],
          progressionCriteria: ['Pain-free mouth opening >= 35 mm', 'Able to eat soft solid foods without pain flare'],
          precautionsAndContraindications: ['Keep all stretches within mild comfort limits'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Neuromuscular Stability & Progressive Dietary Reintroduction',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Isometric strengthening to stabilize new pseudo-disc articulation', 'Gradual reintroduction of standard solid foods', 'Postural alignment'],
          exercisePrescription: [
            { category: 'Isometrics', exerciseName: 'Rocabado Submaximal Isometric Holds in Multi-Directions', dosage: '3 sets of 6 reps, 6s hold', clinicalRationale: 'Builds balanced masticatory muscle control.' },
            { category: 'Cervical Posture', exerciseName: 'Deep Neck Flexor Training and Thoracic Spine Mobility', dosage: '3 sets of 10 reps', clinicalRationale: 'Normalizes cranio-cervical posture to eliminate chronic mechanical jaw retrusion.' },
          ],
          progressionCriteria: ['Maximum unassisted opening >= 38 mm', 'JFLS score < 2.0', 'Normal chewing function on varied foods'],
          precautionsAndContraindications: ['Avoid extremely hard or chewy foods (bagels, tough meats) indefinitely'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Functional Maintenance & Parafunctional Control',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Long-term jaw function without disability', 'Permanent nighttime bruxism splint compliance'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Home Jaw Mobility Routine & Relaxation Drills', dosage: '5 minutes daily', clinicalRationale: 'Prevents recurrence of capsular contracture.' },
          ],
          progressionCriteria: ['Full functional capacity and satisfaction with jaw opening >= 38 mm'],
          precautionsAndContraindications: ['Seek immediate dental review if acute lock recurs'],
        },
      ],
    },
    clinicalPearls: [
      'In acute closed lock (< 2 weeks duration), intra-oral manual distraction manipulation has a 60–70% success rate in popping the disc back on; after 4–6 weeks, the disc becomes deformed and therapy must focus on pseudo-disc adaptation.',
    ],
  },

  {
    id: 'tmj-masticatory-myofascial-pain',
    joint: 'Temporomandibular Joint (TMJ)',
    name: 'Masticatory Myofascial Pain Syndrome (Masseter & Temporalis Trigger Points)',
    category: 'Muscular TMD / Myofascial Trigger Points & Bruxism',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Temporal arteritis: New onset severe headache, scalp sensitivity, tender non-pulsatile temporal artery, elevated ESR > 50 mm/hr, jaw claudication (Emergency).',
      'Masticatory space infection: Trismus with deep space neck swelling, fever, dysphagia, airway compromise.',
      'Trigeminal neuralgia (tic douloureux): Electric shock-like lancinating unilateral facial pain triggered by light touch.',
    ],
    when_to_refer: [
      'Suspected temporal arteritis (immediate emergency department).',
      'Refractory sleep bruxism causing severe dental attrition (dentist for custom stabilization splint).',
    ],
    outcome_measures: [
      { name: 'JFLS (Jaw Functional Limitation Scale)', mcid: '1.0 point', target: '<= 1.0' },
      { name: 'Palpation Pain Pressure Threshold (PPT)', mcid: 'Improvement', target: 'Zero tenderness at 1 kg pressure' },
      { name: 'NRS Facial Pain / Headache', mcid: '2 points', target: '<= 1/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'DC/TMD diagnostic criteria for Myofascial TMD: Palpation of masseter or temporalis muscles with 1 kg of pressure for 5 seconds reproduces familiar pain and refers pain beyond the boundary of the muscle (e.g., masseter refers to molar teeth and ear; temporalis refers to temple and forehead).',
      vivaQuestions: [
        {
          question: 'What is the characteristic referral pattern of masseter muscle trigger points?',
          answer: 'Superficial masseter refers pain to the upper and lower molar teeth, mandible, and eyebrow; deep masseter refers pain to the preauricular region and deep inside the ear (frequently misdiagnosed as ear infection).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Dull, aching facial pain, morning jaw stiffness, preauricular fullness, and tension-type headaches in the temples. Frequently associated with sleep bruxism (teeth grinding), daytime clenching, high stress, and cervical spine tension. Intra-articular joint itself is non-tender.',
    bedsideAssessmentTests: [
      {
        testName: 'Standardized 1 kg Palpation of Masseter and Temporalis Muscles',
        sensitivity: '89%',
        specificity: '92%',
        positiveLikelihoodRatio: '11.1',
        techniqueAndInterpretation: 'Apply 1.0 kg of pressure with fingertip for 5 seconds to body, origin, and insertion of masseter and anterior/middle/posterior temporalis. Positive if reproduces concordant familiar pain or referred pain to teeth/head.',
        evidenceCitation: 'Schiffman et al. J Oral Facial Pain Headache (DC/TMD Criteria).',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Panoramic Radiograph (OPG - Orthopantomogram)',
        indications: 'Screen for dental pathology (periapical abscess, impacted third molars, dental caries) mimicking facial myofascial pain.',
        keyFindings: 'Normal TMJ condylar anatomy; excludes dental root abscess or mandibular cysts.',
        accuracyOrYield: 'Essential exclusion test.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Intra-Oral Myofascial Release, Posture & Neuromuscular Clenching Control Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Intra-Oral Myofascial Release, Soft Diet & Parafunctional Education',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Deactivate active trigger points in masseter and medial pterygoid', 'Educate on "teeth apart" daytime posture', 'Moist heat and gentle stretching'],
          exercisePrescription: [
            { category: 'Intra-Oral Release', exerciseName: 'Intra-Oral Masseter and Medial Pterygoid Ischemic Compression', dosage: 'Gloved index finger inside cheek, thumb outside; pinch muscle belly 60s per side', clinicalRationale: 'Releases hypertonic contracture knots and restores intramuscular microcirculation.' },
            { category: 'Moist Heat', exerciseName: 'Bilateral Facial Moist Heat Application', dosage: '15 minutes before bedtime', clinicalRationale: 'Promotes muscle relaxation and reduces nocturnal clenching tonus.' },
            { category: 'Posture Awareness', exerciseName: 'Hourly "Lips Together, Teeth Apart" Check-In', dosage: 'Every hour during daytime work', clinicalRationale: 'Breaks the unconscious daytime clenching loop that exhausts masticatory muscles.' },
          ],
          progressionCriteria: ['Morning jaw stiffness reduced by >= 50%', 'Masseter palpation tenderness reduced by >= 2 points on NRS', 'JFLS improved by >= 1.0 point'],
          precautionsAndContraindications: ['Avoid heavy chewing, tough meats, chewing gum, and nail biting'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Active Mandibular Mobility & Cranio-Cervical Alignment',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Restore full smooth active mouth opening (>= 40 mm)', 'Correct forward head posture and cervical extensor tightness'],
          exercisePrescription: [
            { category: 'Active Mobility', exerciseName: 'Active Symmetrical Mouth Opening in Front of Mirror with Controlled Breathing', dosage: '3 sets of 10 slow reps', clinicalRationale: 'Retrains harmonious co-contraction of mandibular openers and closers.' },
            { category: 'Cervical Posture', exerciseName: 'Craniocervical Flexion Nodding and Suboccipital Release', dosage: '3 sets of 10 reps', clinicalRationale: 'Addresses trigeminocervical convergence; cervical tension directly amplifies facial pain.' },
          ],
          progressionCriteria: ['Palpation with 1 kg produces no referred pain', 'Maximum mouth opening >= 40 mm without pain', 'Fewer than 1 headache day per week'],
          precautionsAndContraindications: ['Keep jaw movements relaxed and within comfortable limits'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Stress Management, Biofeedback & Functional Chewing Tolerance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Diaphragmatic relaxation biofeedback', 'Reintroduce varied dietary textures', 'Eliminate morning tension headaches'],
          exercisePrescription: [
            { category: 'Biofeedback', exerciseName: 'Diaphragmatic Deep Breathing with Jaw Relaxation Cue', dosage: '10 minutes daily', clinicalRationale: 'Downregulates sympathetic nervous system drive, which is the primary cause of nocturnal bruxism.' },
            { category: 'Functional Chewing', exerciseName: 'Bilateral Symmetrical Chewing Retraining', dosage: 'During all meals', clinicalRationale: 'Eliminates habitual unilateral chewing that overloads one masseter muscle.' },
          ],
          progressionCriteria: ['JFLS score < 1.0', 'Zero facial pain or temple headaches', 'Able to eat all normal foods'],
          precautionsAndContraindications: ['Continue using occlusal night guard if prescribed by dentist'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Wellness & Self-Care',
          timeline: 'Weeks 10–14+',
          clinicalGoals: ['Lifelong maintenance of relaxed jaw habits', 'Patient independence with self-massage techniques'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Self-Massage of Temples and Masseter during Shower', dosage: '2 minutes daily', clinicalRationale: 'Maintains tissue compliance and prevents trigger point recurrence.' },
          ],
          progressionCriteria: ['Complete resolution of myofascial facial pain at 6-month follow-up'],
          precautionsAndContraindications: ['Resume daytime posture checks if entering high-stress life periods'],
        },
      ],
    },
    clinicalPearls: [
      'In > 70% of myofascial TMD patients, ear pain ("fullness, ringing, or deep earache") with normal ENT otoscopy is caused by deep masseter or lateral pterygoid trigger points referring directly into the ear.',
    ],
  },

  {
    id: 'tmj-capsulitis-synovitis',
    joint: 'Temporomandibular Joint (TMJ)',
    name: 'TMJ Capsulitis / Retrodiscitis & Synovitis',
    category: 'Intra-Articular Capsular & Synovial Inflammation',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Ligament'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Septic TMJ arthritis: Marked preauricular swelling, high fever, severe unyielding pain, spreading cellulitis, regional lymphadenopathy (Emergency needle aspiration and IV antibiotics).',
      'Systemic inflammatory arthritis (Rheumatoid arthritis, Juvenile idiopathic arthritis) with bilateral TMJ condylar resorption and open-bite deformity.',
    ],
    when_to_refer: [
      'Suspicion of septic TMJ arthritis (immediate emergency department).',
      'Progressive condylar resorption or inflammatory polyarthritis (rheumatology consultation).',
    ],
    outcome_measures: [
      { name: 'NRS Preauricular Joint Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Lateral Pole Palpation Pain Score', mcid: 'Resolution', target: 'Zero tenderness at 0.5 kg' },
      { name: 'JFLS (Jaw Functional Limitation Scale)', mcid: '1.0 point', target: '<= 1.5' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'In acute capsulitis, direct palpation of the lateral condylar pole (with 0.5 kg pressure) or posterior condylar pole (via external auditory meatus with pinky finger while patient closes teeth) is exquisitely tender. Pain is aggravated by clenching the posterior teeth together, which compresses the inflamed retrodiscal pad.',
      vivaQuestions: [
        {
          question: 'What is retrodiscitis and how is it elicited on physical examination?',
          answer: 'Retrodiscitis is acute inflammation of the highly vascular and richly innervated bilaminar retrodiscal tissue behind the condyle. It is elicited by having the patient bite firmly on their back teeth, which forces the condyle backward and upward into the inflamed tissue, reproducing severe preauricular pain.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Sharp, localized preauricular pain directly over the TMJ capsule, exacerbated by chewing, clenching the back teeth, and wide opening. Often follows an acute trauma (blow to jaw, prolonged wide dental procedure, or sudden hard biting). Sensation that the back teeth do not fit together properly due to joint effusion.',
    bedsideAssessmentTests: [
      {
        testName: 'Lateral Pole TMJ Palpation (0.5 kg Pressure)',
        sensitivity: '92%',
        specificity: '88%',
        positiveLikelihoodRatio: '7.7',
        techniqueAndInterpretation: 'Apply 0.5 kg of pressure directly over the lateral pole of the condyle at rest and during gentle opening. Exquisite point tenderness confirms capsulitis.',
        evidenceCitation: 'Schiffman et al. J Oral Facial Pain Headache (DC/TMD Criteria).',
      },
      {
        testName: 'Posterior Capsule Compression Test (Biting on Tongue Blade)',
        sensitivity: '84%',
        specificity: '82%',
        techniqueAndInterpretation: 'Patient bites firmly on a tongue blade placed between contralateral molars; this gaps the ipsilateral TMJ, relieving retrodiscal pain. When bitten on ipsilateral molars, pain is sharply aggravated, confirming retrodiscitis.',
        evidenceCitation: 'Okeson JP. Management of Temporomandibular Disorders and Occlusion.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Dedicated TMJ MRI with Sagittal and Coronal T2 Fat-Suppressed sequences',
        indications: 'Confirm joint effusion in superior and inferior joint spaces and retrodiscal tissue hyperemia.',
        keyFindings: 'T2 hyperintense fluid signal ("joint effusion") distending the upper and lower joint cavities; retrodiscal edema.',
        accuracyOrYield: 'Gold standard for detecting TMJ synovitis/effusion.',
      },
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Bilateral TMJ Panoramic Views (Open and Closed)',
        indications: 'Screen for condylar erosion, subchondral sclerosis, or fracture.',
        keyFindings: 'Usually normal in acute capsulitis; excludes condylar fracture or advanced osteoarthritic flattening.',
        accuracyOrYield: 'Essential exclusion test.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Joint Gapping, Anti-Inflammatory Modalities & Unloading Splint Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Acute Joint Decompression, Anti-Inflammatory Care & Soft Diet',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Decompress the inflamed retrodiscal pad and capsule', 'Strict soft/pureed diet', 'Collaborate for short-term NSAID or intra-articular steroid injection if severe'],
          exercisePrescription: [
            { category: 'Joint Gapping', exerciseName: 'Contralateral Molar Cotton Roll / Tongue Blade Resting (Daytime)', dosage: 'Hold cotton roll between back teeth for 15 minutes, 3x daily', clinicalRationale: 'Gaps the ipsilateral TMJ joint space, instantly relieving compressive contact on the inflamed retrodiscal pad.' },
            { category: 'Cryotherapy', exerciseName: 'Cold Pack to Preauricular Region', dosage: '15 minutes, 3–4x daily', clinicalRationale: 'Constricts local microvasculature to suppress acute synovial inflammatory effusion.' },
            { category: 'Soft Diet', exerciseName: 'Strict Soft-Food Diet (No Chewy Breads, Meats, or Nuts)', dosage: 'Continuous for 2–3 weeks', clinicalRationale: 'Eliminates repetitive compressive joint loading.' },
          ],
          progressionCriteria: ['Lateral pole palpation tenderness reduced by >= 50%', 'NRS resting pain <= 2/10', 'Able to close teeth without sharp preauricular shooting'],
          precautionsAndContraindications: ['STRICTLY AVOID: Wide opening, yawning without tongue on palate, hard chewing, dental impressions'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Gentle Distraction Mobilization & Rocabado Tongue-Rest Posture',
          timeline: 'Weeks 2–4',
          clinicalGoals: ['Gentle intra-oral long-axis distraction to mobilize capsular compliance', 'Restore pain-free opening to >= 35 mm', 'Rocabado tongue posture'],
          exercisePrescription: [
            { category: 'Gentle Distraction', exerciseName: 'Intra-Oral Inferior Distraction Mobilization (Grade I–II Gentle Oscillations)', dosage: '3 sets of 30s gentle glides', clinicalRationale: 'Stimulates synovial fluid circulation and prevents capsular adhesions without aggravating synovitis.' },
            { category: 'Resting Posture', exerciseName: 'Rocabado Tongue-on-Palate Resting Position', dosage: 'Continuous habit', clinicalRationale: 'Maintains freeway space to prevent clenching-induced joint compression.' },
          ],
          progressionCriteria: ['Lateral pole palpation completely non-tender', 'Maximum mouth opening >= 35 mm without pain', 'JFLS improved by >= 1.0 point'],
          precautionsAndContraindications: ['Avoid end-range forced stretch while acute inflammation is resolving'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Controlled Symmetrical Opening & Submaximal Isometrics',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Submaximal isometric stabilization in all planes', 'Gradual reintroduction of standard solid foods', 'Full pain-free opening (>= 40 mm)'],
          exercisePrescription: [
            { category: 'Symmetrical Opening', exerciseName: 'Mirror Symmetrical Opening without Lateral Deviation', dosage: '3 sets of 10 slow reps', clinicalRationale: 'Restores harmonious lateral pterygoid and digastric tracking.' },
            { category: 'Isometrics', exerciseName: 'Rocabado Submaximal Isometric Holds (6x6 Protocol)', dosage: '6 reps of 6s holds, 4x daily', clinicalRationale: 'Builds protective muscular stiffness around the healing capsular ligaments.' },
          ],
          progressionCriteria: ['Zero pain with posterior teeth biting', 'Maximum opening >= 40 mm', 'JFLS score < 1.0'],
          precautionsAndContraindications: ['Avoid heavy chewing on the affected side initially'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Normal Function & Long-Term Joint Health',
          timeline: 'Weeks 8–12+',
          clinicalGoals: ['Unrestricted diet and normal jaw function', 'Permanent night guard compliance if bruxism present'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Posture Check and Tongue-on-Palate Routine', dosage: 'Daily', clinicalRationale: 'Prevents daytime clenching and protects articular cartilage longevity.' },
          ],
          progressionCriteria: ['Complete resolution of capsulitis with zero symptoms on long-term follow-up'],
          precautionsAndContraindications: ['Inform dentist of TMJ history prior to any future lengthy dental procedures (request bite block and rest breaks)'],
        },
      ],
    },
    clinicalPearls: [
      'Biting on a tongue blade or cotton roll between the BACK teeth on the OPPOSITE side gaps the painful joint and provides immediate relief; biting on the SAME side compresses the inflamed retrodiscal pad and causes sharp pain.',
    ],
  },
];
