export type BodyRegion = 'Upper Limb' | 'Spine' | 'Lower Limb' | 'Specialized Clinical Disciplines';

export type MasterJoint =
  | 'Shoulder'
  | 'Elbow'
  | 'Wrist & Hand'
  | 'Cervical Spine'
  | 'Thoracic Spine'
  | 'Lumbar Spine & Pelvis'
  | 'Hip'
  | 'Knee'
  | 'Ankle & Foot'
  | 'Fractures & Trauma Rehabilitation'
  | 'Knee Arthroplasty & Joint Replacement'
  | 'Sports Injuries & High Performance'
  | 'Neurological Disorders'
  | 'Cardiopulmonary Disorders'
  | 'Paediatric Conditions'
  | 'Geriatric Conditions'
  | 'Women\'s Health & Pelvic Floor'
  | 'Amputation & Prosthetics'
  | 'Work-Related Musculoskeletal Disorders';

export interface StandardizedClinicalSection {
  // 1-4: Definition & Anatomy
  conditionName: string;
  definition: string;
  anatomicalStructuresInvolved: string[];
  relevantAnatomy: string;

  // 5-8: Etiology, Risk, Mechanism & Pathophysiology
  etiology: string;
  riskFactors: string[];
  mechanismOfInjury: string;
  pathophysiology: string;

  // 9-11: Biomechanics, Pathomechanics & Muscle Involvement
  biomechanics: string;
  pathomechanics: string;
  muscleInvolvement: {
    agonists: string[];
    antagonists: string[];
    synergists: string[];
    stabilizers: string[];
    dysfunctionPattern: string;
  };

  // 12-14: Clinical Presentation, Symptoms & Signs
  clinicalPresentation: string;
  symptoms: string[];
  signs: string[];

  // 15-17: Differential Diagnosis, Red & Yellow Flags
  differentialDiagnosis: string[];
  redFlags: string[];
  yellowFlags: string[];

  // 18-21: Physical Exam, Special Tests, Investigations & Imaging
  physicalExamination: {
    observationInspection: string;
    palpation: string;
    activePassiveRom: string;
    resistedIsometricsMmt: string;
  };
  specialTests: {
    testName: string;
    sensitivity: string;
    specificity: string;
    positiveCriteria: string;
    evidenceCitation: string;
  }[];
  diagnosticInvestigations: string;
  imagingFindings: {
    modality: 'Plain Radiographs (X-Ray)' | 'MRI Scan' | 'CT Scan' | 'Diagnostic Musculoskeletal Ultrasound' | 'Electrodiagnostic (EMG/NCS)' | 'Laboratory Pathology';
    keyFindings: string;
    radiologicalSigns: string;
  }[];

  // 22-23: Clinical Considerations & Severity
  clinicalDiagnosisConsiderations: string;
  severityClassification: string;

  // 24-27: Medical Management, PT Management, Protocol & Exercises
  medicalManagement: string;
  physiotherapyManagement: string;
  rehabilitationProtocolPhases: {
    phaseNumber: number;
    phaseName: string;
    timeline: string;
    milestoneCriteria: string;
    prescribedExercises: {
      exerciseName: string;
      targetMuscle: string;
      dosage: string;
      techniqueKey: string;
    }[];
  }[];
  exercisePrescriptionSummary: string;

  // 28-32: Contraindications, Outcomes, Prognosis, RTF & References
  contraindicationsAndPrecautions: string[];
  outcomeMeasures: {
    measureName: string;
    mcid: string;
    targetScore: string;
  }[];
  prognosis: string;
  returnToFunctionCriteria: string[];
  referencesAndEvidence: {
    citation: string;
    evidenceLevel: 'Level I (Systematic Review / RCT)' | 'Level II (Cohort)' | 'Clinical Practice Guideline';
    doi?: string;
  }[];
}

export interface MasterConditionRecord {
  id: string;
  region: BodyRegion;
  joint: MasterJoint;
  category: string;
  conditionName: string;
  subtypes: string[];
  clinicalContent: StandardizedClinicalSection;
}

// Complete Master Database Seed encompassing all joints and required conditions
export const MASTER_CONDITIONS_DATABASE: MasterConditionRecord[] = [
  // =========================================================================
  // 1. KNEE: ACL INJURY
  // =========================================================================
  {
    id: 'MC-KNEE-01',
    region: 'Lower Limb',
    joint: 'Knee',
    category: 'Ligamentous & Capsular Instability',
    conditionName: 'Anterior Cruciate Ligament (ACL) Injury & Tear',
    subtypes: ['Contact Deceleration Valgus', 'Non-Contact Dynamic Valgus Landing', 'Partial Interstitial Tear', 'Complete Mid-Substance Disruption'],
    clinicalContent: {
      conditionName: 'Anterior Cruciate Ligament (ACL) Injury',
      definition: 'Disruption of the primary intra-articular restraint against anterior tibial translation and secondary stabilizer of internal tibial rotation.',
      anatomicalStructuresInvolved: ['Anterior Cruciate Ligament (Anteromedial & Posterolateral Bundles)', 'Medial Meniscus (Posterior Horn)', 'Lateral Femoral Notch', 'Anterolateral Ligament (ALL)'],
      relevantAnatomy: 'The ACL originates from the posteromedial aspect of the lateral femoral condyle and inserts into the intercondylar area anterior to the tibial intercondylar eminence.',
      etiology: 'Acute multi-planar rotary deceleration trauma with knee near full extension (0°-20° flexion) and tibial internal rotation combined with hip adduction/internal rotation.',
      riskFactors: ['Female sex (increased Q-angle, wider intercondylar notch index, hormonal laxity)', 'Decreased hamstring-to-quadriceps strength ratio (< 0.60)', 'Prior contralateral ACL injury', 'High-friction artificial turf surface'],
      mechanismOfInjury: '70% non-contact mechanism: Sudden deceleration, sidestepping pivot, or single-leg landing with dynamic knee valgus collapse.',
      pathophysiology: 'Tensile loading exceeding ultimate failure threshold (~2160 N in young adults), causing interstitial fiber rupture, hemarthrosis from the middle genicular artery, and acute joint effusion.',
      biomechanics: 'Normal ACL prevents 85% of anterior tibial translation and restrains internal tibial rotation. In extension, posterolateral bundle is taut; in 90° flexion, anteromedial bundle is taut.',
      pathomechanics: 'Unchecked anterior tibial subluxation and rotary pivot-shift episodes produce shear stresses on the posterior horn of the medial meniscus and lateral chondral surfaces.',
      muscleInvolvement: {
        agonists: ['Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus) act as primary ACL protective synergists'],
        antagonists: ['Quadriceps (Rectus Femoris, Vastus Lateralis/Medialis) at 0°-30° flexion induce anterior shear strain'],
        synergists: ['Gastrocnemius', 'Soleus', 'Gluteus Medius / Maximus (prevent hip adduction-internal rotation collapse)'],
        stabilizers: ['Popliteus', 'Pes Anserinus Group'],
        dysfunctionPattern: 'Quadriceps dominance, hamstring latency, and gluteal amnesia during ground landing phase.',
      },
      clinicalPresentation: 'Acute knee injury with an audible or palpable "pop", rapid tense effusion/hemarthrosis within 2 hours, inability to continue sport, and perceived instability.',
      symptoms: ['Sharp knee joint pain at impact', 'Perception of the knee shifting or giving way', 'Tense swelling with restricted bending', 'Difficulty weight bearing'],
      signs: ['Immediate tense hemarthrosis', 'Joint line tenderness (concomitant meniscal tear in 50%)', 'Deficit in terminal extension', 'Positive Lachman test with absent end-feel'],
      differentialDiagnosis: ['Posterior Cruciate Ligament (PCL) Tear', 'Medial Collateral Ligament (MCL) Grade III Tear', 'Patellar Dislocation / Relocation with Medial Retinacular Tear', 'Tibial Plateau Fracture'],
      redFlags: ['Gross dislocation with absent distal pedal pulses (Popliteal artery tear emergency)', 'Peroneal nerve palsy (Foot drop / numbness in 1st dorsal webspace)', 'Tense compartment pressure'],
      yellowFlags: ['High kinesiophobia (Tampa Scale of Kinesiophobia > 40)', 'Depression and fear of reinjury impeding early weight-bearing'],
      physicalExamination: {
        observationInspection: 'Large tense effusion, limb held in 20°-30° protective flexion, antalgic gait.',
        palpation: 'Positive patellar tap test, joint line tenderness over lateral and medial meniscal corners.',
        activePassiveRom: 'Flexion restricted to 90° by effusion; extension restricted by 5°-10° (pseudolocking).',
        resistedIsometricsMmt: 'Quadriceps reflex inhibition; hamstring spasm protective guarding.',
      },
      specialTests: [
        {
          testName: 'Lachman Test (30° flexion)',
          sensitivity: '85% (95% CI: 81–89%)',
          specificity: '94% (95% CI: 91–97%)',
          positiveCriteria: '> 3mm anterior tibial translation vs unaffected limb with soft or mushy end-feel.',
          evidenceCitation: 'Benjaminse et al. JOSPT (2006); AAOS Clinical Practice Guideline on ACL Injuries (2022).',
        },
        {
          testName: 'Pivot-Shift Test',
          sensitivity: '24% (awake) / 75% (relaxed under anesthesia)',
          specificity: '98% (95% CI: 96–99%)',
          positiveCriteria: 'Visible reduction clunk of anterolaterally subluxated tibia as knee flexes beyond 30° with valgus-internal rotation torque.',
          evidenceCitation: 'van Eck CF et al. Arthroscopy (2013).',
        },
        {
          testName: 'Lever Sign (Lelli Test)',
          sensitivity: '94%',
          specificity: '98%',
          positiveCriteria: 'Heel fails to rise off examination table when downward pressure applied to distal quadriceps with examiner fist beneath proximal calf.',
          evidenceCitation: 'Lelli A et al. Musculoskelet Surg (2016).',
        },
      ],
      diagnosticInvestigations: 'Plain radiographs to rule out avulsion fractures (Segond fracture); 1.5T or 3.0T MRI as gold standard.',
      imagingFindings: [
        {
          modality: 'Plain Radiographs (X-Ray)',
          keyFindings: 'AP, Lateral, Merchant views rule out fractures; Segond fracture (lateral capsular avulsion) pathognomonic in > 90%.',
          radiologicalSigns: 'Deep sulcus terminalis sign (> 1.5 mm depression in lateral femoral condyle).',
        },
        {
          modality: 'MRI Scan',
          keyFindings: 'Direct discontinuity of ACL fibers, hyperintense edema on T2/PDFS sequences, kissing bone contusions on lateral femoral condyle and posterior lateral tibial plateau.',
          radiologicalSigns: 'Disrupted Blumensaat line alignment, empty notch sign.',
        },
      ],
      clinicalDiagnosisConsiderations: 'Correlate non-contact mechanism + audible pop + immediate hemarthrosis (< 2h) + positive Lachman test = > 95% post-test probability.',
      severityClassification: 'Grade I (microscopic stretch, no laxity), Grade II (partial tear with mild endpoint laxity), Grade III (complete mid-substance rupture with gross laxity).',
      medicalManagement: 'Analgesia (NSAIDs short course), aspiration of tense hemarthrosis under sterile conditions if excruciating, functional knee bracing, orthopaedic referral for reconstruction (BTB vs Semitendinosus-Gracilis autograft).',
      physiotherapyManagement: 'Prehabilitation or non-operative coping program: eliminate effusion, restore full extension (0°), activate quadriceps (overcome arthrogenic muscle inhibition), progress hamstring/gluteal hypertrophy, neuromuscular perturbation.',
      rehabilitationProtocolPhases: [
        {
          phaseNumber: 1,
          phaseName: 'Phase 1: Protection & Arthrogenic Muscle Inhibition Resolution',
          timeline: 'Weeks 0–2',
          milestoneCriteria: 'Full passive extension matching contralateral knee; minimal effusion (trace or zero on stroke test); voluntary quad contraction without lag.',
          prescribedExercises: [
            { exerciseName: 'Prone Hangs & Heel Props', targetMuscle: 'Posterior Capsule & Knee Extensors', dosage: '10 min x 3 sets/day', techniqueKey: 'Achieve absolute 0° symmetrical extension without forced bounce.' },
            { exerciseName: 'Quadriceps Isometrics with NMES (Russian Stim)', targetMuscle: 'Vastus Medialis Oblique & Rectus Femoris', dosage: '10 sec hold, 10 sec rest x 15 reps, 2x daily', techniqueKey: 'Overcome spinal reflex inhibition with simultaneous electrical stimulation.' },
            { exerciseName: 'Straight Leg Raise (SLR) without Extension Lag', targetMuscle: 'Rectus Femoris & Iliopsoas', dosage: '3 sets x 10 reps', techniqueKey: 'Lock knee firmly into 0° before elevating limb 45°.' },
          ],
        },
        {
          phaseNumber: 2,
          phaseName: 'Phase 2: Mobility, Early Loading & Closed-Chain Strength',
          timeline: 'Weeks 2–6',
          milestoneCriteria: 'Knee flexion >= 125°; normal symmetrical gait without crutches; quad index >= 65%.',
          prescribedExercises: [
            { exerciseName: 'Stationary Cycling (Low Resistance, High Cadence)', targetMuscle: 'Cardiorespiratory & Quad/Hamstring Reciprocal Activation', dosage: '15–20 minutes daily', techniqueKey: 'Smooth pedal strokes, seat height adjusted to allow 15° extension at bottom dead center.' },
            { exerciseName: 'Leg Press (Closed Kinetic Chain 0°–60°)', targetMuscle: 'Quadriceps, Gluteals, Hamstrings', dosage: '3 sets x 12 reps, RPE 6-7', techniqueKey: 'Avoid deep hyperflexion past 70° in early weeks; keep knees aligned over 2nd toe.' },
            { exerciseName: 'Single-Leg RDL & Glute Bridge', targetMuscle: 'Hamstrings & Gluteus Maximus', dosage: '3 sets x 10 reps each leg', techniqueKey: 'Hinge through hip with neutral lumbar spine.' },
          ],
        },
        {
          phaseNumber: 3,
          phaseName: 'Phase 3: Hypertrophy & Neuromuscular Perturbation',
          timeline: 'Weeks 6–12',
          milestoneCriteria: 'Full symmetrical ROM; Quad index >= 80%; Limb Symmetry Index on Y-Balance >= 90%.',
          prescribedExercises: [
            { exerciseName: 'Barbell Back Squat & Bulgarian Split Squat', targetMuscle: 'Quadriceps & Gluteal Complex', dosage: '4 sets x 8 reps, 75% 1RM', techniqueKey: 'Maintain vertical shin angle in early eccentric loading.' },
            { exerciseName: 'Nordic Hamstring Curls', targetMuscle: 'Eccentric Hamstrings (Biceps Femoris long head)', dosage: '3 sets x 6 reps, twice weekly', techniqueKey: 'Control eccentric descent as low as possible before catch.' },
            { exerciseName: 'Rocker Board Perturbation & Deceleration Landing', targetMuscle: 'Sensorimotor & Proprioceptive System', dosage: '3 sets x 30 sec balance drills', techniqueKey: 'Land softly with knee flexed >= 30°, zero knee valgus collapse.' },
          ],
        },
        {
          phaseNumber: 4,
          phaseName: 'Phase 4: Return to Running & Plyometric Power',
          timeline: 'Weeks 12–20',
          milestoneCriteria: 'Isokinetic quadriceps & hamstring limb symmetry index (LSI) >= 85%; painless linear jog-walk progression.',
          prescribedExercises: [
            { exerciseName: 'Linear Treadmill Interval Jogging', targetMuscle: 'Aerobic & Elastic Lower Limb Spring', dosage: '20 minutes (2 min walk / 1 min jog intervals)', techniqueKey: 'Cadence >= 170 spm, symmetrical stance time.' },
            { exerciseName: 'Double-to-Single Leg Box Drop Landings', targetMuscle: 'Eccentric Absorbers (Quads/Glutes)', dosage: '4 sets x 6 reps from 30cm box', techniqueKey: 'Cushioned landing, soundless contact, check lateral trunk lean.' },
          ],
        },
        {
          phaseNumber: 5,
          phaseName: 'Phase 5: Return to Sport & Sport-Specific Agility Gateways',
          timeline: 'Month 6–9+',
          milestoneCriteria: 'LSI >= 90% across full 4-test Hop Battery (Single, Triple, Crossover, 6m Timed Hop); ACL-RSI >= 75%; Passing Y-Balance & drop vertical jump video analysis.',
          prescribedExercises: [
            { exerciseName: 'Unplanned Reactive Agility & Cutting Drills', targetMuscle: 'Neuromuscular Reactive Agility', dosage: '4 sets x 5 reps with coach visual cue', techniqueKey: 'Decelerate in 3 steps, maintain trunk-pelvis alignment.' },
            { exerciseName: 'Sport-Specific Competitive Simulation', targetMuscle: 'Full High Performance Engine', dosage: 'Gradual progression into non-contact then full-contact team practice', techniqueKey: 'Track workload chronic:acute ratio (ACWR 0.8–1.3).' },
          ],
        },
      ],
      exercisePrescriptionSummary: 'Emphasize closed-chain quad and eccentric hamstring strengthening. Absolute contraindication to unweighted open-chain knee extension from 45° to 0° in early healing.',
      contraindicationsAndPrecautions: [
        'Do not perform heavy open kinetic chain knee extensions from 45° to 0° during early graft maturation (excessive anterior graft strain).',
        'Do not advance to running without >= 80% quad limb symmetry index and full extension.',
        'Do not clear for return to competitive sport before 9 months post-reconstruction due to biological ligamentization timelines.',
      ],
      outcomeMeasures: [
        { measureName: 'IKDC Subjective Knee Evaluation', mcid: '11.5 points', targetScore: '>= 85 / 100' },
        { measureName: 'ACL-RSI (Return to Sport Psychological Readiness)', mcid: '10 points', targetScore: '>= 75 / 100' },
        { measureName: 'Hop Test Battery Limb Symmetry Index (LSI)', mcid: 'LSI >= 90%', targetScore: '>= 90% all 4 hop tests' },
        { measureName: 'KOOS (Knee Injury and Osteoarthritis Outcome Score)', mcid: '8-10 points', targetScore: '>= 88% in all 5 subscales' },
      ],
      prognosis: 'Good to excellent functional recovery with structured criteria-based rehabilitation. Athletes delaying return to sport until 9 months with LSI >= 90% exhibit a 51% reduction in secondary ACL tear risk (Grindem et al. 2016).',
      returnToFunctionCriteria: [
        'Absence of knee joint effusion (< 1+ on stroke test) during high-intensity training.',
        'Full active symmetrical knee range of motion (including full hyperextension matching unaffected side).',
        'Quadriceps and hamstring isokinetic limb symmetry index >= 90% at 60°/s and 180°/s.',
        'Limb Symmetry Index >= 90% across all 4 validated hop tests (Single leg hop for distance, 6-meter timed hop, Triple hop for distance, Crossover triple hop).',
        'ACL-RSI score >= 75 demonstrating psychological readiness and low kinesiophobia.',
      ],
      referencesAndEvidence: [
        { citation: 'AAOS (2022) Clinical Practice Guideline on the Management of Anterior Cruciate Ligament Injuries. J Am Acad Orthop Surg.', evidenceLevel: 'Clinical Practice Guideline' },
        { citation: 'Grindem H, Snyder-Mackler L, Moksnes H, et al. (2016) Simple criteria can reduce the rate of secondary ACL injury by 51%. Br J Sports Med 50:804-808.', evidenceLevel: 'Level I (Systematic Review / RCT)', doi: '10.1136/bjsports-2016-096031' },
        { citation: 'van Melick N, van Cingel RE, Brooijmans F, et al. (2016) Evidence-based clinical practice update: practice guidelines for anterior cruciate ligament rehabilitation. Br J Sports Med 50:1506-1515.', evidenceLevel: 'Clinical Practice Guideline' },
      ],
    },
  },

  // =========================================================================
  // 2. SHOULDER: ROTATOR CUFF DISORDERS & TEARS
  // =========================================================================
  {
    id: 'MC-SHOULDER-01',
    region: 'Upper Limb',
    joint: 'Shoulder',
    category: 'Tendinopathy & Structural Cuff Tears',
    conditionName: 'Rotator Cuff Disorders & Tears (Supraspinatus Tendinopathy / Tear)',
    subtypes: ['Degenerative Tendinopathy', 'Partial-Thickness Articular/Bursal Tear', 'Full-Thickness Crescent Tear', 'Massive Retracted 2-Tendon Tear'],
    clinicalContent: {
      conditionName: 'Rotator Cuff Disorders & Tears',
      definition: 'Spectrum of pathology ranging from reactive tendon overload to degenerative structural disruption of the musculotendinous cuff (primarily supraspinatus and infraspinatus).',
      anatomicalStructuresInvolved: ['Supraspinatus Tendon (Footprint on Greater Tuberosity)', 'Infraspinatus Tendon', 'Subacromial Bursa', 'Long Head of Biceps Tendon', 'Coracoacromial Ligament'],
      relevantAnatomy: 'The rotator cuff compresses the humeral head into the glenoid cavity (concavity compression mechanism) while the deltoid elevates the arm, counteracting superior shear forces.',
      etiology: 'Multifactorial: intrinsic tendon degeneration (hypovascular critical zone 1cm medial to insertion, tenocyte apoptosis) combined with extrinsic subacromial abrasion and repetitive overhead mechanical shear.',
      riskFactors: ['Age > 50 years', 'Repetitive overhead work or athletic sport (swimming, cricket fast bowling, tennis)', 'Smoking and systemic vascular compromise', 'Type III hooked acromion (Bigliani classification)'],
      mechanismOfInjury: 'Insidious progressive microtrauma in older population; acute traction or eccentric loading on outstretched abducted arm in younger athletic population.',
      pathophysiology: 'Initial tenocyte activation and matrix ground substance disorganization progressing to collagen fascicle disruption, tendon thinning, fiber retraction, and fatty infiltration of muscle belly.',
      biomechanics: 'The rotator cuff provides a force couple: subscapularis anteriorly balances infraspinatus/teres minor posteriorly in transverse plane; deltoid-inferior cuff balances vertical plane force.',
      pathomechanics: 'Cuff failure leads to superior migration of the humeral head during active arm abduction, secondary subacromial bursal impingement, and decreased moment arm efficiency.',
      muscleInvolvement: {
        agonists: ['Supraspinatus (initial 0°-15° abduction & head seating)', 'Infraspinatus / Teres Minor (external rotation)'],
        antagonists: ['Subscapularis & Pectoralis Major (internal rotation)'],
        synergists: ['Deltoid (Anterior, Middle, Posterior)', 'Serratus Anterior (upward scapular rotation)'],
        stabilizers: ['Lower Trapezius', 'Rhomboids', 'Latissimus Dorsi'],
        dysfunctionPattern: 'Serratus anterior latency and upper trapezius dominance producing abnormal scapular anterior tilt and downward rotation during elevation.',
      },
      clinicalPresentation: 'Dull ache in the anterolateral deltoid region, nocturnal pain when lying on affected shoulder, pain during overhead activities (painful arc 60°-120°), and progressive weakness.',
      symptoms: ['Lateral shoulder pain referred down to deltoid insertion', 'Inability to sleep on the affected shoulder', 'Weakness lifting milk cartons or reaching overhead', 'Crepitus on elevation'],
      signs: ['Painful arc between 60° and 120° of abduction', 'Positive Hawkins-Kennedy and Neer impingement signs', 'Positive Empty Can (Jobe) test for supraspinatus', 'Lag signs indicating full-thickness tear'],
      differentialDiagnosis: ['Adhesive Capsulitis (Frozen Shoulder - marked passive ROM loss)', 'Cervical C5/C6 Radiculopathy (Spurling positive, dermatomal numbness)', 'Calcific Tendinopathy', 'Glenohumeral Osteoarthritis', 'Thoracic Outlet Syndrome'],
      redFlags: ['Acute massive tear following trauma with profound inability to raise arm (Drop arm positive - urgent orthopaedic evaluation)', 'Constitutional symptoms (unexplained weight loss, fever - rule out malignancy / septic arthritis)'],
      yellowFlags: ['Catastrophizing pain beliefs', 'Fear-avoidance behaviors leading to complete disuse and secondary stiff shoulder'],
      physicalExamination: {
        observationInspection: 'Mild supraspinatus/infraspinatus fossa muscle atrophy in chronic tears, shrug sign during active elevation.',
        palpation: 'Tenderness over greater tuberosity footprint (Codman point) and anterior acromial margin.',
        activePassiveRom: 'Active abduction restricted by pain; passive range preserved (differentiating from adhesive capsulitis).',
        resistedIsometricsMmt: 'Supraspinatus weakness on Jobe test; external rotation weakness at side on infraspinatus testing.',
      },
      specialTests: [
        {
          testName: 'Empty Can (Jobe) Test (90° scaption, internal rotation)',
          sensitivity: '89%',
          specificity: '68%',
          positiveCriteria: 'Pain and profound weakness during resisted elevation in scapular plane.',
          evidenceCitation: 'Jobe FW, Moynes PR. Am J Sports Med (1982); Hegedus EJ et al. Br J Sports Med (2012).',
        },
        {
          testName: 'External Rotation Lag Sign',
          sensitivity: '70%',
          specificity: '98%',
          positiveCriteria: 'Arm placed in 20° scaption and 90° external rotation drops forward into internal rotation when released (infraspinatus/supraspinatus tear).',
          evidenceCitation: 'Hertel R et al. J Shoulder Elbow Surg (1996).',
        },
        {
          testName: 'Drop Arm Test (Codman)',
          sensitivity: '35%',
          specificity: '97%',
          positiveCriteria: 'Patient cannot smoothly control eccentric descent from 90° abduction; arm suddenly drops to side with pain.',
          evidenceCitation: 'Park HB et al. J Bone Joint Surg Am (2005).',
        },
      ],
      diagnosticInvestigations: 'Diagnostic musculoskeletal ultrasound or 1.5T/3.0T MRI; plain radiographs to assess acromial morphology and rule out GH osteoarthritis.',
      imagingFindings: [
        {
          modality: 'Diagnostic Musculoskeletal Ultrasound',
          keyFindings: 'High diagnostic accuracy (sensitivity 95%, specificity 96% for full-thickness tears); focal hypo-echoic discontinuity in fibrillar architecture.',
          radiologicalSigns: 'Cartilage interface sign (naked tuberosity), cortical pitting of greater tuberosity.',
        },
        {
          modality: 'MRI Scan',
          keyFindings: 'Fluid-equivalent T2 signal extending through the full substance of the tendon footprint; assessment of tendon retraction (Patte classification) and muscle fatty infiltration (Goutallier grading).',
          radiologicalSigns: 'High signal intensity on T2/PD fat-saturated coronal oblique images.',
        },
      ],
      clinicalDiagnosisConsiderations: 'Combination of Age >= 60 + Positive Painful Arc + Positive Drop Arm + External Rotation Weakness = 98% probability of rotator cuff tear (Park et al. 2005).',
      severityClassification: 'Neer Impingement Stages I (edema/hemorrhage), II (fibrosis/tendinitis), III (bone spurs & tendon rupture); Snyder classification for partial tears.',
      medicalManagement: 'Judicious subacromial corticosteroid injection (max 1-2 to avoid tendon atrophy), oral NSAIDs for acute exacerbations, arthroscopic cuff repair for symptomatic full-thickness tears in active patients.',
      physiotherapyManagement: 'Phase-specific progressive rehabilitation: normalize scapular dyskinesis, restore rotator cuff concavity-compression force couples, load tendon progressively with isometric to heavy slow resistance (HSR), posterior capsule stretching.',
      rehabilitationProtocolPhases: [
        {
          phaseNumber: 1,
          phaseName: 'Phase 1: Pain Modulation, Postural Alignment & Rotator Cuff Isometrics',
          timeline: 'Weeks 0–3',
          milestoneCriteria: 'Pain on NPRS reduced by >= 2 points; resting pain <= 3/10; able to perform pain-free submaximal isometric contractions.',
          prescribedExercises: [
            { exerciseName: 'Pendulum (Codman) Exercises', targetMuscle: 'Gentle Glenohumeral Traction', dosage: '2 minutes, 3 times daily', techniqueKey: 'Relax arm completely; allow trunk swaying to mobilize shoulder passively.' },
            { exerciseName: 'Submaximal Isometric External/Internal Rotation at 0° Abduction', targetMuscle: 'Infraspinatus & Subscapularis', dosage: '5 sec hold x 10 reps, 2x daily', techniqueKey: 'Use rolled towel between elbow and trunk to prevent deltoid substitution.' },
            { exerciseName: 'Scapular Retraction & Setting (Prone / Seated)', targetMuscle: 'Middle/Lower Trapezius & Rhomboids', dosage: '3 sets x 10 reps', techniqueKey: 'Pinch shoulder blades down and back without shrugging cervical spine.' },
          ],
        },
        {
          phaseNumber: 2,
          phaseName: 'Phase 2: Scapular Force Couples & Concentric Cuff Activation',
          timeline: 'Weeks 3–8',
          milestoneCriteria: 'Active elevation without shoulder shrug >= 135°; NPRS with overhead reach <= 2/10.',
          prescribedExercises: [
            { exerciseName: 'Side-Lying External Rotation with Light Dumbbell (1-2 kg)', targetMuscle: 'Infraspinatus & Teres Minor', dosage: '3 sets x 12 reps, 3x/week', techniqueKey: 'Slow 3-second eccentric descent; keep elbow pegged to side.' },
            { exerciseName: 'Serratus Anterior Wall Slides with TheraBand', targetMuscle: 'Serratus Anterior (Upward Scapular Rotation)', dosage: '3 sets x 10 reps', techniqueKey: 'Push forearms into wall and slide upward while actively protracting scapula.' },
            { exerciseName: 'Prone Y, T, W Scapular Strength Drills', targetMuscle: 'Lower Trapezius & Posterior Deltoid', dosage: '3 sets x 8 reps', techniqueKey: 'Thumbs pointed toward ceiling; focus on inferior scapular pull.' },
          ],
        },
        {
          phaseNumber: 3,
          phaseName: 'Phase 3: Heavy Slow Resistance (HSR) & Overhead Kinetic Chain Loading',
          timeline: 'Weeks 8–16',
          milestoneCriteria: 'QuickDASH score <= 20; rotator cuff strength >= 85% of contralateral side.',
          prescribedExercises: [
            { exerciseName: 'Kettlebell Bottoms-Up Carries & Overhead Presses', targetMuscle: 'Dynamic Rotator Cuff Stabilizers & Core', dosage: '3 sets x 20 meters carry', techniqueKey: 'High proprioceptive challenge to force continuous concavity-compression.' },
            { exerciseName: 'Cable Scaption with Graduated Resistance (30° anterior to frontal plane)', targetMuscle: 'Supraspinatus & Deltoid', dosage: '3 sets x 10 reps, RPE 7', techniqueKey: 'Maintain neutral spine; avoid cervical hiking.' },
            { exerciseName: 'Plyometric Chest Passes & Rebounder Throws (Light Plyo Ball)', targetMuscle: 'Stretch-Shortening Cycle & Deceleration', dosage: '3 sets x 10 throws', techniqueKey: 'Decelerate ball smoothly without anterior capsule translation.' },
          ],
        },
      ],
      exercisePrescriptionSummary: 'Evidence supports conservative exercise therapy equivalent to arthroscopic subacromial decompression in subacromial pain syndrome (Ketola et al. 2013). Focus on heavy slow resistance for cuff tendons.',
      contraindicationsAndPrecautions: [
        'Avoid forced aggressive overhead lifting through a painful arc in early phases.',
        'Do not perform behind-the-neck pulldowns or presses (excessive 90/90 external rotation strain on anterior capsule).',
        'In post-operative cuff repair patients, strictly respect passive-only guidelines for the first 6 weeks to protect suture anchor integrity.',
      ],
      outcomeMeasures: [
        { measureName: 'QuickDASH (Disabilities of Arm, Shoulder & Hand)', mcid: '15.9 points', targetScore: '<= 18 / 100' },
        { measureName: 'SPADI (Shoulder Pain and Disability Index)', mcid: '18 points', targetScore: '<= 20 / 100' },
        { measureName: 'Penn Shoulder Score', mcid: '11.4 points', targetScore: '>= 85 / 100' },
        { measureName: 'ASES (American Shoulder and Elbow Surgeons Score)', mcid: '12-17 points', targetScore: '>= 86 / 100' },
      ],
      prognosis: '75-80% of patients with non-traumatic partial-thickness or degenerative rotator cuff tears achieve successful long-term symptom relief and functional independence through structured physiotherapy alone without surgery.',
      returnToFunctionCriteria: [
        'Painless active elevation in scapular plane through 160° without scapular dyskinesis.',
        'External rotation strength >= 90% of contralateral limb on hand-held dynamometry.',
        'QuickDASH score <= 15 points.',
        'Patient report of pain-free sleep and full independence in activities of daily living.',
      ],
      referencesAndEvidence: [
        { citation: 'Kukkonen J, Joukainen A, Lehtinen J, et al. (2014) Treatment of non-traumatic rotator cuff tears: a randomised controlled trial with one-year clinical results. Bone Joint J 96-B:75-81.', evidenceLevel: 'Level I (Systematic Review / RCT)', doi: '10.1302/0301-620X.96B1.32168' },
        { citation: 'Diercks R, Bron C, Dorrestijn O, et al. (2014) Guideline for diagnosis and treatment of subacromial pain syndrome: a multidisciplinary review by the Dutch Orthopaedic Association. Acta Orthop 85:314-322.', evidenceLevel: 'Clinical Practice Guideline' },
      ],
    },
  },

  // =========================================================================
  // 3. LUMBAR SPINE: LUMBAR DISC HERNIATION & RADICULOPATHY
  // =========================================================================
  {
    id: 'MC-LUMBAR-01',
    region: 'Spine',
    joint: 'Lumbar Spine & Pelvis',
    category: 'Intervertebral Disc & Neural Compression',
    conditionName: 'Lumbar Disc Herniation with L5/S1 Radiculopathy',
    subtypes: ['Disc Protrusion (Contained)', 'Disc Extrusion (Non-Contained)', 'Free Disc Sequestration', 'Central Canal vs Foraminal Herniation'],
    clinicalContent: {
      conditionName: 'Lumbar Disc Herniation with Radiculopathy',
      definition: 'Displacement of nucleus pulposus material beyond the limits of the intervertebral disc annulus fibrosus, resulting in mechanical compression and chemical inflammatory irritation of exiting or traversing lumbosacral nerve roots.',
      anatomicalStructuresInvolved: ['Intervertebral Disc (L4-L5 / L5-S1)', 'Posterior Longitudinal Ligament (PLL)', 'L5 and S1 Traversing Nerve Roots', 'Ligamentum Flavum', 'Thecal Sac'],
      relevantAnatomy: 'Posterolateral aspect of the disc is the thinnest anatomical region, reinforced only partially by the narrow midline PLL; disc herniation at L4-L5 classically compresses the traversing L5 nerve root.',
      etiology: 'Repetitive spinal flexion-loading combined with axial rotation; degenerative breakdown of annular lamellae and loss of nucleus proteoglycan hydration.',
      riskFactors: ['Sedentary occupational sitting with sustained flexion', 'Heavy manual lifting with twisted spine', 'Vibration exposure (truck driving)', 'Elevated BMI and family genetic predisposition'],
      mechanismOfInjury: 'Sudden lifting of a heavy object in stooped position, or gradual cumulative lumbar flexion strain leading to posterior annular delamination.',
      pathophysiology: 'Protrusion of nuclear matrix exposes nervous tissue to pro-inflammatory cytokines (TNF-alpha, IL-1beta, Phospholipase A2), inducing intraneural edema, axonal ischemia, and ectopic nerve firing.',
      biomechanics: 'Intervertebral disc acts as a hydrostatic shock absorber. In standing, intradiscal pressure is 100%; in slumped sitting it rises to 140%; in bent-over lifting it skyrockets to 220%+. Extension tends to bias nuclear material anteriorly in intact annular rings.',
      pathomechanics: 'Mechanical nerve root tethering causes conduction block (numbness, motor deficit, hyporeflexia) and sensitization to straight-leg neural excursion.',
      muscleInvolvement: {
        agonists: ['Deep Core Stabilizers (Transversus Abdominis, Multifidus, Pelvic Floor)'],
        antagonists: ['Superficial Flexors (Rectus Abdominis) exerting uncontrolled flexion moment'],
        synergists: ['Quadratus Lumborum', 'Erector Spinae (Longissimus, Iliocostalis)'],
        stabilizers: ['Gluteus Medius / Maximus', 'Thoracolumbar Fascia Tensioners'],
        dysfunctionPattern: 'Profound reflex inhibition and rapid fatty atrophy of lumbar multifidus at the affected segment.',
      },
      clinicalPresentation: 'Sharp, burning, lancinating pain radiating below the knee in an L5 or S1 dermatomal distribution, accompanied by paresthesias, numbness, and aggravation with coughing/sneezing (Valsalva).',
      symptoms: ['Radiating leg pain typically exceeding lower back pain intensity', 'Shooting electric sensation down lateral thigh into foot/toes', 'Paresthesias ("pins and needles") in 1st webspace (L5) or lateral foot (S1)', 'Pain aggravated by sitting, forward bending, and coughing'],
      signs: ['Positive Straight Leg Raise (SLR / Lasegue) between 30° and 70°', 'Positive Crossed SLR (high specificity ~90% for disc extrusion)', 'Dermatomal sensory hypoesthesia', 'Diminished Achilles reflex (S1) or motor weakness (L5 extensor hallucis longus, S1 plantarflexion)'],
      differentialDiagnosis: ['Piriformis Syndrome (Deep Gluteal Syndrome)', 'Sacroiliac Joint Dysfunction', 'Lumbar Spinal Stenosis (neurogenic claudication relieved by flexion)', 'Facet Joint Arthropathy', 'Vascular Claudication (Peripheral Artery Disease)'],
      redFlags: ['Cauda Equina Syndrome (Bowel/bladder dysfunction, urinary retention, saddle anesthesia, progressive bilateral weakness - EMERGENCY SURGICAL DECOMPRESSION < 24-48h)', 'Spinal infection / epidural abscess (Fever, IV drug use, immunosuppression)', 'Spinal metastatic malignancy (Unexplained weight loss, night pain, history of cancer)'],
      yellowFlags: ['STarT Back High Risk category', 'Severe catastrophic beliefs regarding spine fragility', 'Workers compensation litigation litigation stressors'],
      physicalExamination: {
        observationInspection: 'Lateral sciatic list (trunk shifted away from painful side to decompress root), flattened lumbar lordosis.',
        palpation: 'Paraspinal muscle spasm, tender Valleix points along sciatic nerve path.',
        activePassiveRom: 'Lumbar flexion markedly restricted by leg pain; extension may centralize symptoms (Directional preference).',
        resistedIsometricsMmt: 'Weakness in Great Toe Extension (Extensor Hallucis Longus - L5) or Ankle Plantarflexion single leg raise (S1).',
      },
      specialTests: [
        {
          testName: 'Straight Leg Raise (SLR / Lasegue Test)',
          sensitivity: '91%',
          specificity: '26%',
          positiveCriteria: 'Reproduction of concordant radicular pain radiating below knee between 30° and 70° hip flexion, aggravated by ankle dorsiflexion (Bragard sign).',
          evidenceCitation: 'van der Windt DA et al. Cochrane Database Syst Rev (2010); NICE Guideline NG59 (2020).',
        },
        {
          testName: 'Crossed Straight Leg Raise (Well Leg Raise)',
          sensitivity: '29%',
          specificity: '88%',
          positiveCriteria: 'Elevation of asymptomatic leg reproduces severe radicular pain in contralateral symptomatic leg (pathognomonic for large disc extrusion/sequestration).',
          evidenceCitation: 'Deville WL et al. Spine (2000).',
        },
        {
          testName: 'Slump Test',
          sensitivity: '84%',
          specificity: '83%',
          positiveCriteria: 'Reproduction of radiating leg pain during cervical/thoracic/lumbar flexion with knee extension and ankle dorsiflexion, relieved by cervical extension release.',
          evidenceCitation: 'Urban LM. Phys Ther (1981); Stankovic R et al. Spine (1999).',
        },
      ],
      diagnosticInvestigations: 'MRI Lumbar Spine is gold standard when progressive motor deficit, intractable pain > 6 weeks, or red flags are present. Plain radiographs rule out spondylolisthesis and fracture.',
      imagingFindings: [
        {
          modality: 'MRI Scan',
          keyFindings: 'T2 axial and sagittal sequences depict disc herniation morphology (protrusion vs extrusion vs sequestration), caliber of spinal canal, neural foramen narrowing, and exact nerve root compression.',
          radiologicalSigns: 'High-intensity zone (HIZ) in posterior annulus indicative of acute annular tear.',
        },
        {
          modality: 'Plain Radiographs (X-Ray)',
          keyFindings: 'Rule out gross alignment abnormalities, structural spondylolisthesis, and destructive bone lesions.',
          radiologicalSigns: 'Segmental disc space narrowing at L4-L5 or L5-S1.',
        },
      ],
      clinicalDiagnosisConsiderations: 'Presence of dermatomal leg pain below knee + positive SLR + concordant neurological deficit (sensory, motor, or reflex) establishes clinical radiculopathy with > 90% diagnostic accuracy.',
      severityClassification: 'Graded by neurological status: Grade I (Radicular pain without deficit), Grade II (Pain with mild sensory/reflex deficit), Grade III (Definite motor weakness MMT <= 3/5), Grade IV (Cauda Equina Emergency).',
      medicalManagement: 'Short course oral NSAIDs, neuropathic analgesics (Pregabalin / Gabapentin PRN), transforaminal epidural steroid injection (TFESI) for refractory inflammation, surgical microdiscectomy if motor deficit progresses or conservative trial fails after 6-8 weeks.',
      physiotherapyManagement: 'McKenzie Mechanical Diagnosis & Therapy (assess for directional preference / centralization), neural dynamic mobilization (sliders/tensioners), gentle spinal traction, progressive core stabilization (McGill Big 3), gradual hip mobility.',
      rehabilitationProtocolPhases: [
        {
          phaseNumber: 1,
          phaseName: 'Phase 1: Symptom Centralization, Anti-Inflammatory Offloading & Education',
          timeline: 'Weeks 0–2',
          milestoneCriteria: 'Centralization of leg symptoms into buttock/low back; resolution of acute nerve irritability; tolerance of 15 min walking.',
          prescribedExercises: [
            { exerciseName: 'Prone Lying on Stomach & Prone on Elbows (McKenzie Extension)', targetMuscle: 'Posterior Disc Bias & Anterior Hydrostatic Nuclear Push', dosage: '10 reps every 2 hours while awake', techniqueKey: 'Relax glutes and lumbar paraspinals completely; stop if leg pain peripheralizes.' },
            { exerciseName: 'Sciatic Nerve Flossing / Sliding Technique (Seated Slump Floss)', targetMuscle: 'Sciatic Neural Interface Excursion', dosage: '2 sets x 10 gentle oscillations, 2x daily', techniqueKey: 'Extend knee while extending neck; flex knee while flexing neck (non-aggressive slider).' },
            { exerciseName: 'Frequent Short Interval Walking Breaks', targetMuscle: 'Spinal Hydration & Aerobic Conditioning', dosage: '10–15 minutes, 3–4 times daily', techniqueKey: 'Upright posture; avoid prolonged uninterrupted sitting.' },
          ],
        },
        {
          phaseNumber: 2,
          phaseName: 'Phase 2: Motor Control, Lumbar Stability & McGill Big 3',
          timeline: 'Weeks 2–6',
          milestoneCriteria: 'Oswestry Disability Index (ODI) reduction >= 15%; leg pain NPRS <= 2/10; able to maintain neutral spine during sit-to-stand.',
          prescribedExercises: [
            { exerciseName: 'McGill Modified Curl-Up', targetMuscle: 'Rectus Abdominis & Transversus without Flexion Shear', dosage: 'Descending pyramid (6, 4, 2 reps with 8-sec hold)', techniqueKey: 'Hands under lumbar spine to preserve neutral lordosis; lift only head/shoulders.' },
            { exerciseName: 'McGill Side Bridge (Knees to Feet Progression)', targetMuscle: 'Quadratus Lumborum & Lateral Abdominal Wall', dosage: 'Descending pyramid (6, 4, 2 reps with 8-sec hold each side)', techniqueKey: 'Straight line from shoulder to knee/foot; engage gluteus medius.' },
            { exerciseName: 'McGill Bird-Dog (Quadruped Opposing Arm/Leg Reach)', targetMuscle: 'Multifidus, Erector Spinae, Gluteus Maximus', dosage: 'Descending pyramid (6, 4, 2 reps with 8-sec hold)', techniqueKey: 'Zero lumbar rotation; clench fist and push back through heel.' },
          ],
        },
        {
          phaseNumber: 3,
          phaseName: 'Phase 3: Functional Lifting, Hip-Hinge Mechanics & Work Conditioning',
          timeline: 'Weeks 6–12',
          milestoneCriteria: 'ODI <= 18%; zero radicular symptoms; full uninhibited return to work/activities.',
          prescribedExercises: [
            { exerciseName: 'Hip Hinge with Dowel & Kettlebell Deadlift (Elevated Blocks)', targetMuscle: 'Gluteus Maximus, Hamstrings, Erector Spinae', dosage: '3 sets x 8 reps, RPE 6-7', techniqueKey: 'Movement originates 100% from hips; spine locked in neutral cylinder.' },
            { exerciseName: 'Farmer\'s Walk (Heavy Unilateral / Bilateral Carries)', targetMuscle: 'Total Core Anti-Lateral Flexion & Grip', dosage: '3 sets x 30 meters', techniqueKey: 'Walk tall with normal heel-to-toe stride; zero pelvic tilting.' },
            { exerciseName: 'Rotational Cable Woodchops (Chop & Lift in Split Stance)', targetMuscle: 'Internal/External Obliques & Hip Rotators', dosage: '3 sets x 10 reps each side', techniqueKey: 'Rotate through thoracic spine and hips while lumbar spine remains quiet.' },
          ],
        },
      ],
      exercisePrescriptionSummary: 'NICE NG59 guidelines recommend promoting self-management, active exercise, and avoiding routine bed rest. Re-absorption of disc herniations occurs in 66% of extrusions via macrophage phagocytosis.',
      contraindicationsAndPrecautions: [
        'Immediate surgical emergency if progressive bilateral weakness or cauda equina red flags occur.',
        'Avoid prolonged end-range lumbar flexion exercises (sit-ups, toe touches) during early healing.',
        'Avoid aggressive ballistic straight-leg stretching in the presence of acute neural inflammation.',
      ],
      outcomeMeasures: [
        { measureName: 'Oswestry Disability Index (ODI)', mcid: '12.8 points (30% change)', targetScore: '<= 16 / 100' },
        { measureName: 'NPRS Leg Pain & Back Pain (0-10)', mcid: '2.0 points', targetScore: '<= 2 / 10' },
        { measureName: 'Patient-Specific Functional Scale (PSFS)', mcid: '2.3 points', targetScore: '>= 8.5 / 10' },
        { measureName: 'Roland-Morris Disability Questionnaire (RMDQ)', mcid: '3.5 points', targetScore: '<= 4 / 24' },
      ],
      prognosis: 'Favorable: 75% to 90% of patients with acute lumbar radiculopathy improve substantially within 6 to 12 weeks with conservative evidence-based physiotherapy. Larger extrusions have the highest spontaneous resorption rate.',
      returnToFunctionCriteria: [
        'Complete centralization of pain with resolution of radicular leg symptoms.',
        'Normal symmetrical lower extremity reflexes and muscle strength (5/5 MMT across L4, L5, S1).',
        'Negative straight-leg raise and slump tests.',
        'Demonstration of hip-hinge movement mechanics during lifting tasks.',
        'Oswestry Disability Index score <= 16%.',
      ],
      referencesAndEvidence: [
        { citation: 'NICE (2020) Low back pain and sciatica in over 16s: assessment and management. National Institute for Health and Care Excellence Guideline NG59.', evidenceLevel: 'Clinical Practice Guideline' },
        { citation: 'Zhong M, Liu C, Ji H, et al. (2017) Incidence of Spontaneous Resorption of Lumbar Disc Herniation: A Meta-Analysis. Pain Physician 20:E45-E52.', evidenceLevel: 'Level I (Systematic Review / RCT)' },
        { citation: 'Peul WC, van den Hout WB, Brand R, et al. (2008) Prolonged conservative care versus early surgery in patients with sciatica. BMJ 336:1355-1358.', evidenceLevel: 'Level I (Systematic Review / RCT)', doi: '10.1136/bmj.a143' },
      ],
    },
  },
];
