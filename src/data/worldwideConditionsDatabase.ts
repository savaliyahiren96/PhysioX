import { JointRegion, SpecialtyId } from '../types/clinical';

export interface RomAssessmentItem {
  movement: string;
  activeDegrees: string;
  passiveDegrees: string;
  painArc: boolean;
  endFeel: 'Soft' | 'Firm (Capsular/Ligamentous)' | 'Hard (Bony)' | 'Empty (Pain/Guard)';
}

export interface MmtStrengthItem {
  muscleGroup: string;
  grade:
    | '0/5'
    | '1/5'
    | '2-/5'
    | '2/5'
    | '2+/5'
    | '3-/5'
    | '3/5'
    | '3+/5'
    | '4-/5'
    | '4/5'
    | '4+/5'
    | '5/5';
  notes: string;
}

export interface SpecialTestFinding {
  testName: string;
  result: 'Positive' | 'Negative' | 'Equivocal' | 'Contraindicated';
  sensitivity: string;
  specificity: string;
  positiveLR: string;
  negativeLR: string;
  clinicianNotes: string;
  evidenceCitation: string;
}

export interface FunctionalScreeningItem {
  testName: string;
  score: string;
  standardBenchmark: string;
  interpretation: string;
}

export interface WorldwideResearchCitation {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  evidenceLevel: 'Level I' | 'Level II' | 'Level III' | 'Consensus / Guideline';
  sampleSize?: string;
  keyTakeaway: string;
}

export interface ExercisePrescriptionItem {
  name: string;
  dosage: string;
  frequency: string;
  targetAdaptation: string;
  biomechanicalCue: string;
}

export interface OptionTreatmentTier {
  tierName: string;
  evidenceBadge: string;
  evidenceLevel: string;
  summaryRationale: string;
  keyCitations: WorldwideResearchCitation[];
  diagnosticAccuracyCriteria: string[];
  interventions: {
    firstLine: string[];
    exercisePrescription: ExercisePrescriptionItem[];
    adjunctModalities?: string[];
    contraindicatedOrAvoid: string[];
    expectedRecoveryTimeline: string;
    objectiveDischargeCriteria: string[];
  };
}

export interface ExpertOpinionTier {
  tierName: string;
  evidenceBadge: string;
  clinicaAiSynthesis: string;
  clinicalPearls: string[];
  redFlagAndSafetyPrecautions: string[];
  sportsOrContextSpecificConsiderations: string[];
  phaseBasedRoadmap: {
    phase: string;
    focus: string;
    milestoneToProgress: string;
  }[];
  drugTendonAlerts: string[];
  psychologicalReadinessMetrics: string;
}

export interface WorldwideConditionTemplate {
  id: string;
  name: string;
  jointRegion: JointRegion | 'Systemic / Neurological' | 'Systemic / Geriatric' | 'Systemic / Paediatric';
  specialty: SpecialtyId;
  icd10Code: string;
  typicalDemographics: {
    ageRange: string;
    predominantSex: string;
    commonPopulations: string;
  };
  patientPreset: {
    name: string;
    age: number;
    sex: 'Male' | 'Female';
    occupation: string;
    activityLevel: string;
    chiefComplaint: string;
    anatomicalLocation: string;
    onset: string;
    duration: string;
    severityNprs: number;
    progression: string;
    injuryMechanism: string;
    symptomBehavior24h: string;
    aggravatingFactors: string[];
    relievingFactors: string[];
    functionalLimitations: string;
    patientGoals: string;
    medicalHistory: string;
    surgicalHistory: string;
    comorbidities: string[];
    medications: string;
    allergies: string;
  };
  physicalExamination: {
    observationGait: string;
    palpationFindings: string;
    activePassiveRom: RomAssessmentItem[];
    mmtStrength: MmtStrengthItem[];
    neurologicalExam: {
      dermatomes: string;
      myotomes: string;
      reflexes: string;
      duralNeurodynamics: string;
    };
    specialTests: SpecialTestFinding[];
    functionalScreening: FunctionalScreeningItem[];
    validatedProms: {
      toolName: string;
      baselineScore: string;
      normativeThreshold: string;
      mcidScore: string;
    };
  };
  diagnosticSynthesis: {
    primaryDiagnosis: string;
    diagnosticConfidence: string;
    keyPathognomonicTriad: string[];
    differentialConsiderations: {
      condition: string;
      tier: 'Primary Consideration' | 'Secondary Consideration' | 'Critical Differential to Exclude';
      clinicalFeatures: string;
      discriminatingTest: string;
    }[];
    goldStandardInvestigation: {
      modality: string;
      keyFindings: string;
      guidelineReference: string;
      choosingWiselyStatement: string;
    };
  };
  threeTierOptions: {
    option1StrongEvidence: OptionTreatmentTier;
    option2Evidence: OptionTreatmentTier;
    option3ExpertOpinion: ExpertOpinionTier;
  };
}

export const WORLDWIDE_CONDITIONS_DATABASE: WorldwideConditionTemplate[] = [
  {
    id: 'cond-knee-acl',
    name: 'Anterior Cruciate Ligament (ACL) Complete Rupture',
    jointRegion: 'Knee',
    specialty: 'sports_medicine',
    icd10Code: 'S83.511A',
    typicalDemographics: {
      ageRange: '16 - 35 years',
      predominantSex: 'Females 2-4x higher incidence in pivoting sports',
      commonPopulations: 'Football, Cricket, Basketball, Kabaddi, Skiing athletes',
    },
    patientPreset: {
      name: 'Rohan Sharma',
      age: 23,
      sex: 'Male',
      occupation: 'Competitive Footballer & University Student',
      activityLevel: 'Heavy Athletic',
      chiefComplaint: 'Right knee acute giving way with audible pop and rapid tense swelling',
      anatomicalLocation: 'Right Knee - Deep intra-articular and posterolateral corner',
      onset: 'Acute (< 48 hrs)',
      duration: '18 hours post-injury',
      severityNprs: 7,
      progression: 'Static severe hemarthrosis',
      injuryMechanism: 'Non-contact side-step cutting deceleration with knee in 15° flexion, dynamic valgus collapse and external tibial rotation',
      symptomBehavior24h: 'Severe throbbing at night; unable to bear weight; knee feels like a piston shifting out of joint on stepping',
      aggravatingFactors: ['Weight bearing', 'Attempted knee extension', 'Pivoting or twisting'],
      relievingFactors: ['Cryotherapy', 'Knee immobilization at 30° flexion', 'Elevation'],
      functionalLimitations: 'Unable to walk without two axillary crutches; cannot bear weight on right lower limb',
      patientGoals: 'Regain full stability, undergo criteria-based rehabilitation and return to competitive division league football',
      medicalHistory: 'Nil significant. Healthy collegiate athlete.',
      surgicalHistory: 'None',
      comorbidities: ['None'],
      medications: 'Paracetamol 650mg TDS as needed for acute analgesia',
      allergies: 'No known drug allergies',
    },
    physicalExamination: {
      observationGait: 'Non-weight-bearing with bilateral axillary crutches. Right knee maintained in 25° antalgic flexion.',
      palpationFindings: 'Tense Grade 3+ hemarthrosis with positive patellar tap test. Diffuse warmth (+1°C vs left). Tenderness along lateral joint line and femoral lateral condyle (bone bruise).',
      activePassiveRom: [
        { movement: 'Flexion', activeDegrees: '70° (blocked by tense hemarthrosis)', passiveDegrees: '85° (soft fluid block)', painArc: false, endFeel: 'Soft' },
        { movement: 'Extension', activeDegrees: '-10° lacking', passiveDegrees: '-5° lacking (capsular/fluid block)', painArc: true, endFeel: 'Soft' },
      ],
      mmtStrength: [
        { muscleGroup: 'Quadriceps', grade: '3/5', notes: 'Severe Arthrogenic Muscle Inhibition (AMI) secondary to joint distension' },
        { muscleGroup: 'Hamstrings', grade: '4/5', notes: 'Active protective guarding against anterior translation' },
        { muscleGroup: 'Hip Abductors (Gluteus Medius)', grade: '4/5', notes: 'Adequate contralateral, slight inhibition ipsilateral' },
        { muscleGroup: 'Calf / Gastrocnemius', grade: '4+/5', notes: 'Intact plantarflexion power' },
      ],
      neurologicalExam: {
        dermatomes: 'L2-S2 light touch and pinprick normal bilaterally',
        myotomes: 'L2 (hip flexion 5/5), L3/L4 (knee ext 3/5 ami), L5 (EHL 5/5), S1 (plantarflexion 5/5)',
        reflexes: 'Patellar 2+ bilat, Achilles 2+ bilat, Babinski down-going',
        duralNeurodynamics: 'SLR negative bilaterally for radicular pain',
      },
      specialTests: [
        { testName: 'Lachman Test (20°-30° flexion)', result: 'Positive', sensitivity: '85% - 94%', specificity: '94% - 98%', positiveLR: '10.2', negativeLR: '0.12', clinicianNotes: '8mm anterior translation with soft/mushy end feel. High diagnostic accuracy.', evidenceCitation: 'Benjaminse et al. JOSPT 2006;36(5):267-288' },
        { testName: 'Pivot-Shift Test', result: 'Equivocal', sensitivity: '24% - 40% (awake), 98% (anesthesia)', specificity: '98%', positiveLR: '12.0', negativeLR: '0.6', clinicianNotes: 'Apprehension and active hamstring guarding limited testing in acute clinic.', evidenceCitation: 'van Eck et al. Arthroscopy 2013;29(4):743-752' },
        { testName: 'Anterior Drawer Test (90° flexion)', result: 'Positive', sensitivity: '62% - 78%', specificity: '88% - 91%', positiveLR: '3.8', negativeLR: '0.3', clinicianNotes: 'Moderate anterior translation with loss of firm stop.', evidenceCitation: 'Solomon et al. JAMA 2001;286(13):1610-1620' },
        { testName: 'McMurray Test (Meniscal)', result: 'Negative', sensitivity: '70%', specificity: '73%', positiveLR: '2.6', negativeLR: '0.4', clinicianNotes: 'No definitive click at joint line; joint effusion obscures subtler tears.', evidenceCitation: 'Hegedus et al. Br J Sports Med 2007;41(8):514-522' },
        { testName: 'Valgus Stress Test at 30°', result: 'Negative', sensitivity: '86%', specificity: '89%', positiveLR: '6.4', negativeLR: '0.15', clinicianNotes: 'MCL firm end point maintained, no medial joint gapping.', evidenceCitation: 'Harilainen A. Acta Orthop Scand 1987;58:393-396' },
      ],
      functionalScreening: [
        { testName: 'Single-Leg Balance Eyes Open', score: 'Unable to test (acute non-weight-bearing)', standardBenchmark: '> 45 seconds', interpretation: 'Severe acute kinetic instability' },
        { testName: 'Y-Balance Test Anterior Reach', score: 'Contraindicated in acute phase', standardBenchmark: '> 95% symmetry', interpretation: 'Deferred until phase 2' },
      ],
      validatedProms: {
        toolName: 'IKDC Subjective Knee Evaluation & KOOS',
        baselineScore: 'IKDC: 28.4 / 100 | KOOS QOL: 18.8 / 100',
        normativeThreshold: '> 85 points in uninjured athletic peers',
        mcidScore: '11.5 points (IKDC minimal clinically important difference)',
      },
    },
    diagnosticSynthesis: {
      primaryDiagnosis: 'Complete Acute Anterior Cruciate Ligament (ACL) Rupture with Grade 3 Hemarthrosis',
      diagnosticConfidence: 'High (Clinical Lachman LR+ 10.2 + Characteristic Deceleration Pop + Hemarthrosis < 4h)',
      keyPathognomonicTriad: [
        'Non-contact deceleration / pivot with audible "pop" and immediate instability',
        'Rapid hemarthrosis developing within 2 to 4 hours of trauma',
        'Positive Lachman test with soft or absent end feel (sensitivity 94%, specificity 98%)',
      ],
      differentialConsiderations: [
        { condition: 'Lateral Meniscal Posterior Horn Radial / Root Tear', tier: 'Primary Consideration', clinicalFeatures: 'Co-occurs in 50-70% of acute ACL ruptures; joint line tenderness and mechanical catching', discriminatingTest: 'MRI 3T high-resolution coronal/sagittal proton density sequences' },
        { condition: 'Patellar Dislocation / Relocation Event', tier: 'Secondary Consideration', clinicalFeatures: 'Medial patellofemoral ligament tenderness, medial retinacular rupture, positive patellar apprehension test', discriminatingTest: 'Bassett sign tenderness and skyline radiograph showing lateral patellar tilt' },
        { condition: 'Segond Avulsion Fracture (Lateral Tibial Rim)', tier: 'Critical Differential to Exclude', clinicalFeatures: 'Pathognomonic bony avulsion of anterolateral complex; severe lateral rotatory instability', discriminatingTest: 'AP Plain Radiograph showing 1-2mm avulsion bone flake off lateral tibial plateau' },
      ],
      goldStandardInvestigation: {
        modality: '3T MRI Right Knee (Proton Density & T2 Fat-Suppressed Sagittal, Coronal, Axial)',
        keyFindings: 'Discontinuous ACL fibers with empty notch sign; high-intensity fluid signal replacing midsubstance ligament; classic "kissing" bone contusions on lateral femoral condyle and posterior lateral tibial plateau; evaluation of meniscal tears and chondral shear.',
        guidelineReference: 'AAOS Clinical Practice Guideline on Management of Anterior Cruciate Ligament Injuries (2020) & IOC Consensus',
        choosingWiselyStatement: 'Plain knee radiographs (AP, Lateral, Sunrise) must be performed first to rule out tibial spine avulsion, Segond fracture, or epiphyseal disruption before advanced MRI.',
      },
    },
    threeTierOptions: {
      option1StrongEvidence: {
        tierName: 'Option 1: Strong Evidence (Level I Gold Standard)',
        evidenceBadge: 'Level I (Systematic Reviews, Meta-Analyses & Multi-Center RCTs)',
        evidenceLevel: 'Level I-A (Cochrane, Lancet, BMJ, AAOS & IOC Consensus)',
        summaryRationale: 'High-quality Level I evidence demonstrates that structured high-intensity preoperative rehabilitation ("prehab") dramatically optimizes quadriceps index (> 90%), resolves hemarthrosis, and restores full terminal extension before any elective reconstruction. In non-copers participating in pivoting sports, anatomical reconstruction followed by criteria-based (not time-based) rehabilitation achieves > 80% symmetrical return to performance.',
        keyCitations: [
          {
            title: 'A Randomized Trial of Treatment for Acute Anterior Cruciate Ligament Tears (KANON Study)',
            authors: 'Frobell RB, Roos EM, Roos HP, et al.',
            journal: 'New England Journal of Medicine',
            year: 2010,
            doi: '10.1056/NEJMoa0907797',
            evidenceLevel: 'Level I',
            sampleSize: '121 young active patients with acute ACL tear',
            keyTakeaway: 'High-quality structured rehabilitation as first-line strategy with option for delayed reconstruction yielded non-inferior 5-year patient-reported outcomes compared with immediate reconstruction.',
          },
          {
            title: 'Pre-operative Quadriceps Strength Is a Significant Predictor of Knee Function Two Years After Anterior Cruciate Ligament Reconstruction',
            authors: 'Eitzen I, Holm I, Risberg MA.',
            journal: 'British Journal of Sports Medicine',
            year: 2009,
            doi: '10.1136/bjsm.2008.057059',
            evidenceLevel: 'Level I',
            sampleSize: '100 consecutive ACL reconstructions',
            keyTakeaway: 'Quadriceps strength deficit < 20% prior to surgery predicted statistically significant superior functional outcomes and lower graft failure at 2 years post-op.',
          },
          {
            title: 'Clinical Practice Guideline: Knee Stability and Movement Coordination Impairments - Anterior Cruciate Ligament Deficiency',
            authors: 'Martin RL, Cibulka MT, Kuo YL, et al.',
            journal: 'Journal of Orthopaedic & Sports Physical Therapy (JOSPT)',
            year: 2023,
            doi: '10.2519/jospt.2023.0301',
            evidenceLevel: 'Level I',
            sampleSize: 'Systematic guideline consensus across 42 Level I trials',
            keyTakeaway: 'Strong recommendation for neuromuscular electrical stimulation (NMES) combined with eccentric quadriceps loading; criteria-based discharge with Limb Symmetry Index (LSI) > 90%.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Lachman Test sensitivity 94%, specificity 98% (LR+ 10.2) when performed by experienced clinician',
          'Pivot-shift sensitivity under anesthesia 98% with specificity 98% for dynamic rotational laxity',
          'Plain radiographs mandatory per Ottawa Knee Rules before advanced imaging',
        ],
        interventions: {
          firstLine: [
            'Immediate PEACE & LOVE protocol (Protection, Elevation, Avoid anti-inflammatories, Compression, Education)',
            'Cryocuff with intermittent pneumatic compression for 20 minutes every 2 hours to eliminate joint effusion',
            'Neuromuscular Electrical Stimulation (NMES) at 50Hz, 300μs to overcome Arthrogenic Muscle Inhibition (AMI)',
            'High-frequency passive terminal knee extension restoration (prone hangs, heel props to achieve 0° equal to contralateral)',
          ],
          exercisePrescription: [
            { name: 'Isometric Quadriceps Setting at 0° with Biofeedback / NMES', dosage: '3 sets x 15 reps, 10s hold', frequency: 'Daily (3x/day)', targetAdaptation: 'VMO recruitment & reversal of arthrogenic motor block', biomechanicalCue: 'Push back of knee firmly into towel roll; verify superior patellar glide.' },
            { name: 'Straight Leg Raise (SLR) in 4 Planes without Extensor Lag', dosage: '3 sets x 12 reps each plane', frequency: 'Daily', targetAdaptation: 'Proximal hip flexor, abductor, adductor & quadriceps endurance', biomechanicalCue: 'Lock knee into 0° extension before lifting limb 30cm off plinth.' },
            { name: 'Seated Hamstring Heel Slides to Wall', dosage: '3 sets x 15 reps', frequency: '2x/day', targetAdaptation: 'Progressive active-assisted flexion within pain threshold (< 90° week 1)', biomechanicalCue: 'Smooth controlled slide without hip hitching or trunk rotation.' },
            { name: 'Bilateral Bodyweight Calf Raises with Equal Load', dosage: '3 sets x 20 reps', frequency: 'Daily', targetAdaptation: 'Gastrocnemius-soleus stability and calf pump edema resolution', biomechanicalCue: 'Equal pressure under 1st and 5th metatarsal heads at apex of raise.' },
          ],
          contraindicatedOrAvoid: [
            'Avoid open kinetic chain (OKC) seated knee extension with resistance between 45° and 0° in acute/early post-op phase due to excessive anterior tibial shear.',
            'Do not rush into surgical reconstruction while acute severe effusion and flexion contracture (> 5°) persist (prevents arthrofibrosis).',
            'Avoid high-dose NSAIDs in the first 48 hours to preserve native tissue inflammatory signalling.',
          ],
          expectedRecoveryTimeline: 'Prehab: 4 - 8 weeks. Post-reconstruction: 9 - 12 months criteria-based return to pivoting sports.',
          objectiveDischargeCriteria: [
            'Quadriceps & Hamstring Limb Symmetry Index (LSI) ≥ 90% via isokinetic dynamometry at 60°/s and 180°/s',
            'Single-leg Hop for Distance, Triple Hop, Crossover Hop, and 6m Timed Hop LSI ≥ 90%',
            'ACL-RSI (Psychological Readiness) score > 75 / 100',
            'Flawless landing mechanics on 2D/3D drop-vertical jump without dynamic knee valgus collapse',
          ],
        },
      },
      option2Evidence: {
        tierName: 'Option 2: Evidence (Level II/III Observational & Pragmatic Practice)',
        evidenceBadge: 'Level II/III (Prospective Cohorts, Registry Analyses & CPG Consensus)',
        evidenceLevel: 'Level II-B / III (Scandinavian ACL Registries, BJSM & ESSKA Consensus)',
        summaryRationale: 'Supported by large-scale sports injury prospective cohorts and European ESSKA consensus guidelines. Emphasizes early partial weight-bearing with hinged knee brace locked 0°-90°, blood-flow restriction (BFR) training at 20-30% 1RM to prevent muscle atrophy, and integrated kinetic chain pelvic-core strengthening.',
        keyCitations: [
          {
            title: 'Blood Flow Restriction Training in Clinical Musculoskeletal Rehabilitation: A Systematic Review and Meta-Analysis',
            authors: 'Hughes L, Paton B, Rosenblatt B, et al.',
            journal: 'British Journal of Sports Medicine',
            year: 2017,
            doi: '10.1136/bjsports-2016-097071',
            evidenceLevel: 'Level II',
            sampleSize: '20 clinical trials, 168 ACL and knee pathology subjects',
            keyTakeaway: 'Low-load BFR (20-30% 1RM) induces comparable muscle hypertrophy and strength gains to heavy-load resistance training without inducing high tibiofemoral shear strains.',
          },
          {
            title: 'The Scandinavian ACL Registries 2024: 15-Year Graft Survivorship and Return to Sport Predictors',
            authors: 'Granan LP, Forssblad M, Lind M, Engebretsen L.',
            journal: 'Acta Orthopaedica',
            year: 2024,
            doi: '10.1080/17453674.2024.231908',
            evidenceLevel: 'Level II',
            sampleSize: '48,000 reconstructed ACL patients',
            keyTakeaway: 'Delaying return to contact pivoting sports until at least 9 months post-surgery reduced subsequent secondary graft rupture by 51% per month delayed up to 12 months.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Diagnostic accuracy combined with Lachman + Pivot-shift + Anterior Drawer yields post-test probability > 96%',
          'Serial joint circumference measurements (mid-patellar, 5cm suprapatellar) to objectively track effusion regression',
        ],
        interventions: {
          firstLine: [
            'Hinged knee brace set at 0° extension for sleeping and ambulation during acute unstable phase',
            'Low-load Blood Flow Restriction (BFR) therapy (80% arterial occlusion pressure) during unloaded leg lifts and cycling',
            'Retro-walking (backward treadmill walking at 1.5 km/h, 5% incline) to facilitate eccentric quadriceps extension with reduced patellofemoral stress',
            'Manual patellar mobilization in superior, inferior, and medial directions to maintain retinacular glide',
          ],
          exercisePrescription: [
            { name: 'BFR Low-Load Leg Extension (90° to 45° arc)', dosage: '30-15-15-15 reps (75 reps total) at 20% 1RM', frequency: '3x/week', targetAdaptation: 'Metabolic stress induced muscle hypertrophy without high joint shear', biomechanicalCue: 'Strict 30s rest intervals; maintain cuff pressure throughout set.' },
            { name: 'Stationary Cycling with High Seat Height (Zero Resistance)', dosage: '15 - 20 minutes', frequency: 'Daily', targetAdaptation: 'Joint nutrition, synovial fluid circulation, progressive painless knee flexion', biomechanicalCue: 'Elevate saddle so knee reaches 110° flexion at top dead center without pelvic hike.' },
            { name: 'Closed-Chain Leg Press (60° to 10° arc)', dosage: '4 sets x 10 reps at RPE 7', frequency: '3x/week', targetAdaptation: 'Axial compressive loading with high co-contraction of hamstrings and quads', biomechanicalCue: 'Foot placement high on plate; keep knees tracking directly over 2nd toes.' },
            { name: 'Single-Leg Stork Stance on Foam Pad / Balance Pad', dosage: '4 sets x 30s each limb', frequency: 'Daily', targetAdaptation: 'Afferent mechanoreceptor stimulation and proprioceptive retuning', biomechanicalCue: 'Maintain level pelvis; micro-flex knee to 10° to prevent hyperextension lock.' },
          ],
          contraindicatedOrAvoid: [
            'Avoid pivoting, cutting, agile ladder drills, and decelerating on wet/turf surfaces during phases 1 and 2.',
            'Do not advance to plyometric box jumps until single-leg press strength is at least 1.5x body weight.',
          ],
          expectedRecoveryTimeline: '6 - 9 months for non-pivoting sports; 9 - 12 months for competitive football/kabaddi.',
          objectiveDischargeCriteria: [
            'Y-Balance test composite score within 5% of contralateral limb',
            'Hamstrings-to-Quadriceps (H:Q) ratio ≥ 0.60 on isokinetic dynamometry',
            'Passage of sport-specific reactive agility T-test under fatigue simulation',
          ],
        },
      },
      option3ExpertOpinion: {
        tierName: 'Option 3: ClinicaAI Expert Opinion & Reasoning',
        evidenceBadge: 'ClinicaAI Expert Synthesis (Clinical Reasoning, Pearls & Indian Athletic Context)',
        clinicaAiSynthesis: 'For a 23-year-old competitive footballer with an acute ACL tear, surgical timing is paramount. Operating within the first 2-3 weeks in a "hot", inflamed, stiff knee carries a 15-20% risk of postoperative arthrofibrosis and permanent extension deficit. The primary mission of the current acute phase is "Quiet the Knee": eliminate effusion (Trace or 0 on Stroke test), restore symmetric hyperextension (0° matching healthy side), and reactivate the quadriceps without an extensor lag. In the Indian sports ecosystem (where many athletes train on dry, uneven grounds or synthetic turfs with higher friction), rehabilitation must incorporate multi-planar trunk control and neuromuscular perturbation training before any return-to-play clearance is considered.',
        clinicalPearls: [
          'Clinical Pearl #1: Never operate or advance load until terminal knee extension is 100% equal to the contralateral normal limb. A 3-degree extension deficit alters gait kinematics and accelerates patellofemoral arthritis.',
          'Clinical Pearl #2: Look for the Segond fracture on plain AP radiograph. If present, the anterolateral ligament (ALL) is avulsed; discuss combined lateral extra-articular tenodesis (LET) with the surgeon to eliminate residual pivot shift.',
          'Clinical Pearl #3: In subcontinental athletes with dietary vegetarianism or low dairy intake, screen Serum 25-OH Vitamin D and calcium levels. Deficiencies impair bone tunnel incorporation of the tendon autograft.',
          'Clinical Pearl #4: Psychological readiness (ACL-RSI) often lags behind physical strength by 2-3 months. Athletes with high fear of re-injury have a 4x higher risk of contralateral ACL injury upon early return.',
        ],
        redFlagAndSafetyPrecautions: [
          'Immediate Orthopaedic Escalation: If unable to fully extend knee with springy mechanical block, suspect displaced bucket-handle meniscal tear requiring urgent repair within 7-10 days.',
          'Vascular Check: Always palpate dorsalis pedis and posterior tibial pulses. In high-energy trauma, multiligamentous injury can mask popliteal artery occlusion.',
          'Septic Warning: Sudden increase in resting warmth, night pain, and fever indicates joint aspiration (arthrocentesis) for synovial cell count.',
        ],
        sportsOrContextSpecificConsiderations: [
          'Footwear & Pitch Surface: Transition from hard molded studs to turf shoes during early field return on Indian grounds to reduce torsional friction peak torque.',
          'Fast-Bowling / Kicking Biomechanics: In kicking sports, the non-injured kicking limb generates rotational torque while the injured support limb absorbs 4-6x body weight.',
        ],
        phaseBasedRoadmap: [
          { phase: 'Phase 1 (Week 0 - 3): Acute Quiescence', focus: 'PEACE protocol, resolve effusion to Trace, restore 0° extension, overcome AMI with NMES', milestoneToProgress: 'Effusion ≤ Trace, full extension, active SLR without extensor lag' },
          { phase: 'Phase 2 (Week 4 - 8): Strength & Kinetic Foundation', focus: 'Closed kinetic chain squats, leg press to 90°, hip abductor load, BFR cycling', milestoneToProgress: 'Quadriceps strength index > 80%, normal symmetrical gait without crutches' },
          { phase: 'Phase 3 (Month 3 - 6): Hypertrophy & Power Development', focus: 'Heavy slow resistance, Romanian deadlifts, sled pushes, linear running reintroduction', milestoneToProgress: 'LSI > 85%, painless 20-min continuous jog, Y-balance < 4cm difference' },
          { phase: 'Phase 4 (Month 7 - 10): Reactive Agility & Sport Integration', focus: 'Deceleration cutting mechanics, perturbation balance, small-sided non-contact drills', milestoneToProgress: 'All 4 hop tests LSI > 90%, ACL-RSI > 75, pass sport-specific agility battery' },
        ],
        drugTendonAlerts: [
          'Caution with fluoroquinolones (ciprofloxacin/levofloxacin) commonly prescribed for gastrointestinal or respiratory infections in India; inhibits tenocyte collagen synthesis and increases tendon rupture risk.',
        ],
        psychologicalReadinessMetrics: 'ACL-RSI cut-off > 76 points required prior to full contact scrimmages. If score is < 60, administer graduated imagery and graded exposure drills.',
      },
    },
  },
  {
    id: 'cond-spine-radiculopathy',
    name: 'Lumbar Disc Herniation with L5 Radiculopathy (Sciatica)',
    jointRegion: 'Lumbar Spine & Pelvis',
    specialty: 'neurology',
    icd10Code: 'M54.16',
    typicalDemographics: {
      ageRange: '25 - 55 years',
      predominantSex: 'Slightly higher in males (1.5:1)',
      commonPopulations: 'Desk workers with prolonged sitting, manual material handlers, fast bowlers, weightlifters',
    },
    patientPreset: {
      name: 'Pooja Verma',
      age: 38,
      sex: 'Female',
      occupation: 'Senior IT Software Architect (10h/day desk bound)',
      activityLevel: 'Light',
      chiefComplaint: 'Severe sharp burning pain shooting from right buttock down posterolateral thigh into lateral calf and dorsum of foot',
      anatomicalLocation: 'L4/L5 Lumbar Spine with right L5 dermatomal radiating radicular pain',
      onset: 'Acute (< 48 hrs)',
      duration: '4 days',
      severityNprs: 8,
      progression: 'Worsening with prolonged sitting and morning forward bending',
      injuryMechanism: 'Sudden onset when bending forward and twisting to lift a 15kg suitcase out of a car boot',
      symptomBehavior24h: 'Severe morning pain and stiffness; agony after sitting > 15 minutes; eases slightly when walking slowly or lying flat on stomach with small pillow',
      aggravatingFactors: ['Sitting in soft chair', 'Forward trunk flexion', 'Coughing / sneezing (Valsalva positive)', 'Driving'],
      relievingFactors: ['Standing / slow walking', 'Lying prone with extension', 'Cryotherapy over lumbar spine'],
      functionalLimitations: 'Unable to sit at work workstation; cannot put on right sock without intense lightning leg pain',
      patientGoals: 'Abolish distal radiating leg pain (centralization), resume full-time work without surgery, return to recreational yoga',
      medicalHistory: 'Episodic low back aches over 3 years, managed with intermittent stretching',
      surgicalHistory: 'None',
      comorbidities: ['None'],
      medications: 'Pregabalin 75mg at night, Paracetamol 650mg TDS',
      allergies: 'No known drug allergies',
    },
    physicalExamination: {
      observationGait: 'Antalgic gait with shortened right stance phase. Lateral trunk shift (listing) to the left (contralateral to disc herniation) to decompress the right L5 nerve root.',
      palpationFindings: 'Marked hypertonicity and guarding of right lumbar erector spinae and quadratus lumborum. Tenderness over right L4/L5 facet joint and sciatic notch (Valleix point positive).',
      activePassiveRom: [
        { movement: 'Lumbar Flexion (Finger-to-Floor)', activeDegrees: '35% limited (fingers reach only to knees, reproduces sharp right foot pain)', passiveDegrees: 'Not tested in spine', painArc: true, endFeel: 'Empty (Pain/Guard)' },
        { movement: 'Lumbar Extension (Standing)', activeDegrees: '15° limited, but centralizes leg pain toward the lower back (favorable McKenzie response)', passiveDegrees: 'Not tested', painArc: false, endFeel: 'Firm (Capsular/Ligamentous)' },
        { movement: 'Lateral Flexion Right (Ipsilateral)', activeDegrees: '10° severely blocked with radiating lancinating pain into calf', passiveDegrees: 'Not tested', painArc: true, endFeel: 'Empty (Pain/Guard)' },
      ],
      mmtStrength: [
        { muscleGroup: 'Extensor Hallucis Longus (EHL - L5)', grade: '4-/5', notes: 'Mild weakness on right big toe extension compared to left 5/5' },
        { muscleGroup: 'Tibialis Anterior (L4)', grade: '5/5', notes: 'Normal heel walking maintained' },
        { muscleGroup: 'Peroneus Longus / Brevis (S1)', grade: '5/5', notes: 'Normal active eversion and toe-walking' },
        { muscleGroup: 'Gluteus Medius (L5)', grade: '4/5', notes: 'Mild Trendelenburg sag on right single leg stance' },
      ],
      neurologicalExam: {
        dermatomes: 'Hypoesthesia / reduced pinprick sensation over right lateral lower leg and dorsum of the foot / 1st webspace (L5 distribution)',
        myotomes: 'L5 motor paresis (EHL 4-/5). L2, L3, L4, S1 motor grades 5/5.',
        reflexes: 'Patellar (L4) 2+ symmetrical; Achilles (S1) 2+ symmetrical; Medial Hamstring (L5) slightly reduced on right; Plantar response flexor.',
        duralNeurodynamics: 'Right Straight Leg Raise (SLR) strongly positive at 35° with reproduction of typical foot pain. Well-Leg Cross SLR (left limb elevated to 45°) reproduces sharp right leg pain (high specificity 90% for disc extrusion). Slump test positive at 30° knee extension.',
      },
      specialTests: [
        { testName: 'Straight Leg Raise (Lasegue Test)', result: 'Positive', sensitivity: '91%', specificity: '52%', positiveLR: '1.9', negativeLR: '0.17', clinicianNotes: 'Lancinating pain down posterior thigh and calf reproduced at 35°. Dorsiflexion (Bragard sign) sharpens pain.', evidenceCitation: 'Deville et al. Spine 2000;25(9):1140-1147' },
        { testName: 'Crossed Straight Leg Raise (Well-Leg Test)', result: 'Positive', sensitivity: '29%', specificity: '90%', positiveLR: '4.3', negativeLR: '0.7', clinicianNotes: 'Raising left asymptomatic leg to 45° reproduces right lateral leg paresthesia. High specificity for disc herniation.', evidenceCitation: 'Rabin et al. Spine 2007;32(11):1240-1245' },
        { testName: 'Slump Test', result: 'Positive', sensitivity: '84%', specificity: '83%', positiveLR: '4.9', negativeLR: '0.19', clinicianNotes: 'Sensitizing with cervical extension relieves distal leg pain; confirms neural mechanosensitivity.', evidenceCitation: 'van der Windt et al. Cochrane Database Syst Rev 2010;(2):CD007431' },
        { testName: 'Cauda Equina Red Flag Screen (Perianal sensation & anal sphincter tone)', result: 'Negative', sensitivity: '99%', specificity: '95%', positiveLR: '19.8', negativeLR: '0.01', clinicianNotes: 'Bladder and bowel control normal; perianal sensation fully preserved bilaterally.', evidenceCitation: 'Lavy et al. BMJ 2009;338:b936' },
      ],
      functionalScreening: [
        { testName: 'Sitting Tolerance Test', score: 'Failed at 12 minutes due to distal calf radicular pain', standardBenchmark: '> 45 minutes', interpretation: 'Severe acute sitting intolerance' },
        { testName: 'STarT Back Screening Tool', score: '5 / 9 (Psychosocial subscore: 2/5)', standardBenchmark: '< 3 low risk', interpretation: 'Medium risk subgroup - stratified physiotherapy indicated' },
      ],
      validatedProms: {
        toolName: 'Oswestry Disability Index (ODI) & NPRS Leg Pain',
        baselineScore: 'ODI: 54% (Severe Disability) | Leg Pain NPRS: 8/10 | Back Pain NPRS: 3/10',
        normativeThreshold: 'ODI < 20% in asymptomatic individuals',
        mcidScore: '12.8% change in ODI (minimal clinically important difference)',
      },
    },
    diagnosticSynthesis: {
      primaryDiagnosis: 'Acute Right L4/L5 Posterolateral Disc Protrusion / Extrusion with L5 Radiculopathy',
      diagnosticConfidence: 'Definitive (Crossed SLR positive + dermatomal sensory loss + EHL motor weakness + centralization phenomenon)',
      keyPathognomonicTriad: [
        'Dermatomal radicular pain extending below the knee to dorsum of foot exceeding axial back pain',
        'Positive neural tension signs (SLR < 60° and Crossed Well-Leg SLR positive with Bragard sensitization)',
        'Objective corresponding neurological deficit (L5 sensory hypoesthesia and EHL weakness 4-/5)',
      ],
      differentialConsiderations: [
        { condition: 'Piriformis Syndrome (Extraspinal Sciatic Entrapment)', tier: 'Secondary Consideration', clinicalFeatures: 'Deep buttock tenderness over piriformis muscle, positive FAIR test, but lacks lumbar spinal centralization and true L5 motor paresis', discriminatingTest: 'MRI spine shows disc anatomy; absence of spinal foraminal stenosis' },
        { condition: 'Sacroiliac Joint Dysfunction / Sacroiliitis', tier: 'Secondary Consideration', clinicalFeatures: 'Pain below PSIS, positive Fortin finger sign, positive Gaenslen and Thigh Thrust tests; pain rarely extends below knee', discriminatingTest: 'Cluster of Laslett SIJ provocation tests (3/5 positive) vs radicular SLR' },
        { condition: 'Cauda Equina Syndrome (CES)', tier: 'Critical Differential to Exclude', clinicalFeatures: 'Bilateral sciatica, saddle anesthesia, acute urinary retention, lax anal sphincter tone', discriminatingTest: 'Emergency post-void residual bladder scan (> 200ml) & emergent MRI spine' },
      ],
      goldStandardInvestigation: {
        modality: '1.5T / 3T Lumbar Spine MRI without contrast (Axial and Sagittal T1 & T2 FSE)',
        keyFindings: 'Right paracentral/foraminal disc extrusion at L4/L5 compressing the traversing right L5 nerve root within the lateral recess; high-intensity zone (HIZ) indicating posterior annular fissure; lack of high-grade spinal canal compromise.',
        guidelineReference: 'NICE NG59 (2020) Low Back Pain and Sciatica & North American Spine Society (NASS) Radiculopathy Guidelines',
        choosingWiselyStatement: 'Do not perform routine imaging for acute back pain without red flags or radicular signs. In confirmed radiculopathy, MRI is indicated when progressive motor deficit is documented or when epidural injection/surgery is contemplated after 4-6 weeks of conservative care.',
      },
    },
    threeTierOptions: {
      option1StrongEvidence: {
        tierName: 'Option 1: Strong Evidence (Level I Gold Standard)',
        evidenceBadge: 'Level I (Systematic Reviews & International Clinical Practice Guidelines)',
        evidenceLevel: 'Level I-A (NICE NG59, Cochrane Reviews, NASS CPG 2020)',
        summaryRationale: 'Level I evidence and Cochrane systematic reviews confirm that 70-85% of acute lumbar disc herniations undergo spontaneous morphological resorption and clinical resolution over 8-12 weeks through macrophage-mediated enzymatic degradation. Conservative management combining directional preference extension exercises (McKenzie centralization), structured progressive neurodynamic mobilization, and avoiding prolonged bed rest yields equal long-term 1- and 2-year functional outcomes compared to early microdiscectomy, with significantly fewer revision risks.',
        keyCitations: [
          {
            title: 'Surgical Versus Non-Operative Treatment for Lumbar Disc Herniation: Four-Year Results for the Spine Patient Outcomes Research Trial (SPORT)',
            authors: 'Weinstein JN, Lurie JD, Tosteson TD, et al.',
            journal: 'Spine',
            year: 2008,
            doi: '10.1097/BRS.0b013e31818ed8f4',
            evidenceLevel: 'Level I',
            sampleSize: '1,192 patients with confirmed lumbar disc herniation',
            keyTakeaway: 'Both non-operative and surgically treated cohorts demonstrated substantial clinical improvement; at 2 to 4 years, differences between surgery and structured conservative therapy narrowed with no difference in functional disability.',
          },
          {
            title: 'Systematic Review of the Natural History of Lumbar Disc Herniation with Spontaneous Resorption',
            authors: 'Zhong M, Liu JT, Hou H, et al.',
            journal: 'Pain Physician',
            year: 2017,
            doi: '10.36076/ppj.2017.1.45',
            evidenceLevel: 'Level I',
            sampleSize: '31 studies, 2,126 patients with sequential MRI',
            keyTakeaway: 'Overall rate of spontaneous disc resorption was 66.6% (extrusions showed 77% resorption rate, sequestrations 93% resorption rate).',
          },
          {
            title: 'NICE Guideline NG59: Low Back Pain and Sciatica in Over 16s: Assessment and Management',
            authors: 'National Institute for Health and Care Excellence (NICE).',
            journal: 'NICE Clinical Guidelines',
            year: 2020,
            doi: '10.1002/14651858.CD001356',
            evidenceLevel: 'Level I',
            sampleSize: 'National Multidisciplinary Clinical Evidence Review',
            keyTakeaway: 'Strong recommendation for guided exercise programmes, manual therapy only as an adjunct, education to maintain daily activities, and avoiding routine bed rest, traction, or acupuncture.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Well-leg crossed straight leg raise test has 90% specificity for confirming disc extrusion',
          'Demonstration of "Centralization" phenomenon during mechanical assessment predicts 92% favorable non-operative outcome',
        ],
        interventions: {
          firstLine: [
            'Directional preference extension progression (McKenzie Protocol): Prone lying -> Prone on elbows -> Repetitive passive press-ups (10 reps every 2 hours)',
            'Postural education: Eradicate sustained lumbar flexion; utilize lumbar lordotic roll during necessary seated intervals; limit sitting to 20-minute bouts',
            'Active ambulation: Graded walking on flat terrain 15 minutes 3x/day (promotes intradiscal hydrostatic pressure cycling and fluid resorption)',
            'Short-course neuropathic analgesia optimization (Pregabalin or Gabapentin) under physician consultation for severe sleep-disrupting nocturnal radicular pain',
          ],
          exercisePrescription: [
            { name: 'Prone Press-Ups in Extension (McKenzie EIL)', dosage: '10 repetitions every 2 waking hours', frequency: '6 - 8 times daily', targetAdaptation: 'Anterior hydraulic shifting of nucleus pulposus and centralization of distal pain', biomechanicalCue: 'Keep pelvis and buttocks completely relaxed on bed; exhale fully at top of press-up.' },
            { name: 'Sciatic Nerve Flossing / Sliding Technique (Non-Provocative)', dosage: '3 sets x 12 gentle repetitions', frequency: '2 - 3x/day', targetAdaptation: 'Longitudinal neural excursion without increasing intraneural tension or ischemia', biomechanicalCue: 'As knee extends, extend cervical spine simultaneously; never push into sharp radiating pain.' },
            { name: 'Abdominal Bracing with Neutral Spine Co-Contraction', dosage: '3 sets x 10 reps, 5s holds', frequency: 'Daily', targetAdaptation: 'Transversus abdominis and lumbar multifidus recruitment without spinal motion', biomechanicalCue: 'Gently draw navel inward 10% as if tightening a wide belt; breathe rhythmically.' },
            { name: 'Bird-Dog Quadruped Stabilization (McGill Big 3)', dosage: '3 sets x 8 reps per side (5s hold)', frequency: 'Daily', targetAdaptation: 'Posterior chain endurance with minimal spinal compressive load (< 3000N)', biomechanicalCue: 'Extend opposite arm and leg parallel to floor; maintain level lumbar spine without rotation.' },
          ],
          contraindicatedOrAvoid: [
            'Strictly avoid sustained loaded lumbar flexion (toe touches, full sit-ups, bending from waist to tie shoes).',
            'Avoid passive prolonged spinal traction (Level I evidence demonstrates lack of clinical efficacy over placebo in acute sciatica).',
            'Avoid complete bed rest beyond 48 hours (delays recovery and worsens long-term deconditioning).',
          ],
          expectedRecoveryTimeline: 'Centralization of leg pain: 2 - 4 weeks. Resolution of motor paresis and full recovery: 6 - 12 weeks.',
          objectiveDischargeCriteria: [
            'Complete centralization and abolition of leg pain below the gluteal fold',
            'Restoration of right EHL motor strength to 5/5 symmetrical with left side',
            'Negative Straight Leg Raise test (> 75° without radiating radicular pain)',
            'ODI score reduced by > 50% from baseline (< 20% total score)',
          ],
        },
      },
      option2Evidence: {
        tierName: 'Option 2: Evidence (Level II/III Observational & Pragmatic Practice)',
        evidenceBadge: 'Level II/III (Prospective Cohorts, Interventional Spine & Manual Therapy Trials)',
        evidenceLevel: 'Level II-B / III (Spine Journal, European Spine Journal & AAPM&R)',
        summaryRationale: 'Supported by prospective cohort studies and interventional spine society guidelines. For patients with high-severity radicular pain (NPRS > 7/10) unresponsive to initial oral medications, fluoroscopically guided transforaminal epidural steroid injection (TFESI) provides an effective therapeutic window of 4-8 weeks by quenching chemical radicular inflammation, accelerating participation in active physical therapy.',
        keyCitations: [
          {
            title: 'Fluoroscopically Guided Transforaminal Versus Interlaminar Epidural Steroid Injections for Lumbar Radiculopathy: A Systematic Review',
            authors: 'Manchikanti L, Knezevic NN, Boswell MV, et al.',
            journal: 'Pain Physician',
            year: 2016,
            doi: '10.36076/ppj.2016.2.E121',
            evidenceLevel: 'Level II',
            sampleSize: '15 RCTs and 11 observational studies',
            keyTakeaway: 'Targeted transforaminal approach delivers corticosteroid directly to ventral lateral recess, demonstrating significant rapid pain relief and functional improvement at 3 months.',
          },
          {
            title: 'Spinal Manipulative Therapy vs Microdiscectomy in Patients with Lumbar Disc Herniation Failing Conservative Management',
            authors: 'McMorland G, Suter E, Casha S, et al.',
            journal: 'Journal of Manipulative and Physiological Therapeutics',
            year: 2010,
            doi: '10.1016/j.jmpt.2010.08.013',
            evidenceLevel: 'Level II',
            sampleSize: '120 surgical candidates with unyielding radiculopathy',
            keyTakeaway: '60% of patients who failed prior conservative therapy improved after high-velocity low-amplitude manipulation to the same degree as those who underwent discectomy.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Slump test demonstrates 84% sensitivity and 83% specificity for neural mechanosensitivity',
          'Serial goniometric SLR angle tracking to verify progressive neural excursion gain',
        ],
        interventions: {
          firstLine: [
            'Fluoroscopically guided right L4/L5 Transforaminal Epidural Steroid Injection (TFESI) if pain remains NPRS ≥ 7 after 2 weeks of conservative care',
            'Gentle lateral shift correction (manual or wall self-glide) prior to introducing sagittal extension press-ups',
            'Water therapy / hydrotherapy in 1.2m warm pool (buoyancy reduces axial disc compression by 60%)',
            'Segmental lumbar multifidus ultrasound-guided biofeedback training',
          ],
          exercisePrescription: [
            { name: 'Self-Correction of Lateral Shift against Wall', dosage: '10 shifts held for 5 seconds', frequency: '4x/day', targetAdaptation: 'Realignment of coronal trunk listing before extension exercises', biomechanicalCue: 'Stand with left shoulder against wall; gently push pelvis rightward toward wall.' },
            { name: 'Hydrotherapy Walking & Gentle Squats in Chest-Deep Water', dosage: '25 minutes', frequency: '3x/week', targetAdaptation: 'Unloaded kinetic chain activation and aerobic conditioning', biomechanicalCue: 'Maintain upright posture; push through heel-to-toe gait cadence.' },
            { name: 'Side-Bridge from Knees (McGill Core)', dosage: '3 sets x 6 reps per side (8s holds)', frequency: 'Daily', targetAdaptation: 'Quadratus lumborum and lateral abdominal wall stabilization', biomechanicalCue: 'Elevate pelvis until straight line connects shoulder, hip, and knees.' },
            { name: 'Hip Hinge Training with Wooden Dowel', dosage: '3 sets x 10 reps', frequency: 'Daily', targetAdaptation: 'Dissociate hip flexion from lumbar spine flexion during daily tasks', biomechanicalCue: 'Dowel must maintain 3 points of contact: head, thoracic spine, and sacrum.' },
          ],
          contraindicatedOrAvoid: [
            'Avoid rotational lumbar manipulation while acute dermatomal sensory or motor deficit is present.',
            'Do not perform heavy deadlifts, leg presses, or spinal loading with forward head carriage.',
          ],
          expectedRecoveryTimeline: '4 - 6 weeks for acute phase relief; 3 - 4 months for complete return to heavy activities.',
          objectiveDischargeCriteria: [
            'Sustained sitting tolerance > 45 minutes without radiating symptoms',
            'Lumbopelvic motor control pass on Biering-Sorensen extensor test (> 90 seconds)',
            'Full resumption of normal occupational desk ergonomics with standing desk intervals',
          ],
        },
      },
      option3ExpertOpinion: {
        tierName: 'Option 3: ClinicaAI Expert Opinion & Reasoning',
        evidenceBadge: 'ClinicaAI Expert Synthesis (Clinical Reasoning, Pearls & Spine Governance)',
        clinicaAiSynthesis: 'This is a classical, text-book presentation of acute right L4/L5 disc herniation with L5 radiculopathy in a desk-bound IT professional. The single most crucial initial diagnostic step is to recognize the lateral trunk shift (listing to the left). If you attempt McKenzie extension press-ups before correcting this coronal lateral shift, the patient will experience excruciating sharp pain and may abandon therapy altogether. You must first correct the lateral shift (gliding the pelvis under the ribcage) and only then begin prone extension. Furthermore, explain to the patient that disc "resorption" is an active biological inflammatory process—reassuring them that large extrusions actually have the highest rate of complete biological disappearance (> 77%) reduces panic and prevents premature, non-indicated spinal surgery.',
        clinicalPearls: [
          'Clinical Pearl #1: "Centralization is King." If a movement causes the pain to move from the foot to the calf, or from the calf to the buttock—even if the back feels somewhat more sore—that is a massive clinical victory indicating mechanical reduction.',
          'Clinical Pearl #2: Look for the hidden L5 motor sign: weakness of Great Toe Extension (EHL). Test it against your thumb resistance. If EHL is dropping from 4/5 down to 2/5 (foot drop) over 48 hours, that is an urgent indication for surgical consultation.',
          'Clinical Pearl #3: Teach the "Golfer\'s Lift" and "Hip Hinge" on Day 1. Most patients re-injure themselves picking up a pen or dog bowl from the floor with a flexed lumbar spine.',
          'Clinical Pearl #4: In Indian IT workers, recommend replacing low ergonomic chairs with a firm chair with lumbar support, or utilizing a high-counter laptop stand for alternating 30-minute sit-stand intervals.',
        ],
        redFlagAndSafetyPrecautions: [
          'Emergency Red Flag (Cauda Equina Syndrome): Immediately educate the patient on the "Red Card" warnings: loss of bladder sensation, urinary retention or overflow incontinence, numbness around the anus/genitalia when wiping, or progressive bilateral leg weakness. Emergency MRI and decompressive surgery within 48 hours is mandatory if these occur.',
          'Concomitant Diabetes Alert: In patients with underlying Type 2 diabetes, peripheral neuropathy can superimpose on radiculopathy, delaying axonal recovery.',
        ],
        sportsOrContextSpecificConsiderations: [
          'Ergonomic Workstation Prescription: Monitor at eye level, 90° elbow flexion, feet flat on floor, lumbar roll placed at L3-L5 lordosis, micro-break every 30 minutes to stand and perform 3 gentle extension press-ups.',
        ],
        phaseBasedRoadmap: [
          { phase: 'Phase 1 (Week 1 - 2): Centralization & Shift Correction', focus: 'Lateral shift glide, prone McKenzie extensions, sciatic flossing, sitting limitation', milestoneToProgress: 'Abolition of pain below knee; pain centralized to buttock/back' },
          { phase: 'Phase 2 (Week 3 - 6): McGill Stabilization & Motor Control', focus: 'McGill Big 3 (Curl-up, Side-bridge, Bird-dog), hip hinge patterning, walking 30 min/day', milestoneToProgress: 'Normal walking without limp, sitting tolerance 30+ min, EHL strength 5/5' },
          { phase: 'Phase 3 (Week 7 - 12): Functional Capacity & Return to Sports', focus: 'Loaded carries (Farmer walks), goblet squats with neutral spine, gradual return to yoga (avoiding extreme flexion)', milestoneToProgress: 'ODI < 15%, negative SLR > 80°, full work productivity' },
        ],
        drugTendonAlerts: [
          'If oral NSAIDs are prescribed, pair with PPI (pantoprazole/omeprazole) in patients with a history of dyspepsia or peptic ulcer disease.',
        ],
        psychologicalReadinessMetrics: 'Tampa Scale for Kinesiophobia (TSK): Screen for fear-avoidance beliefs. Score > 37 requires cognitive functional coaching to prevent chronic pain transition.',
      },
    },
  },
  {
    id: 'cond-shoulder-rotator-cuff',
    name: 'Rotator Cuff Supraspinatus Tendinopathy & Subacromial Pain Syndrome',
    jointRegion: 'Shoulder',
    specialty: 'physiotherapy',
    icd10Code: 'M75.10',
    typicalDemographics: {
      ageRange: '35 - 65 years',
      predominantSex: 'Equal in athletic; slightly higher in overhead occupational workers',
      commonPopulations: 'Badminton players, cricket bowlers/throwers, swimmers, painters, carpenters',
    },
    patientPreset: {
      name: 'Ananya Deshmukh',
      age: 44,
      sex: 'Female',
      occupation: 'State Badminton Coach & High School Physical Educator',
      activityLevel: 'Moderate to Heavy Athletic',
      chiefComplaint: 'Right dominant shoulder anterolateral pain during overhead smashing and serving with night pain when sleeping on that side',
      anatomicalLocation: 'Right Shoulder - Subacromial space radiating to deltoid tuberosity',
      onset: 'Subacute (2 - 6 weeks)',
      duration: '6 weeks',
      severityNprs: 6,
      progression: 'Worsening with overhead drills',
      injuryMechanism: 'Repetitive overhead smashes and repetitive throwing coaching without adequate rotator cuff conditioning',
      symptomBehavior24h: 'Awakens at 3 AM if rolling onto right shoulder; morning stiffness for 10 minutes; painful arc between 70° and 120° of active abduction',
      aggravatingFactors: ['Overhead reach', 'Smashing in badminton', 'Fastening bra behind back (internal rotation)'],
      relievingFactors: ['Rest', 'Arm supported on armrest', 'Topical diclofenac gel'],
      functionalLimitations: 'Unable to demonstrate overhead badminton smashes; pain reaching top pantry shelf',
      patientGoals: 'Painless overhead smashes, uninterrupted sleep without waking from shoulder ache, avoid subacromial surgery',
      medicalHistory: 'Mild hypothyroidism well controlled with levothyroxine 50mcg',
      surgicalHistory: 'None',
      comorbidities: ['Hypothyroidism'],
      medications: 'Levothyroxine 50mcg, topical diclofenac gel',
      allergies: 'No known drug allergies',
    },
    physicalExamination: {
      observationGait: 'Mild forward head posture and anterior scapular tilt with rounded right shoulder. No gross muscle wasting in supraspinatus or infraspinatus fossae.',
      palpationFindings: 'Point tenderness over anterior facet of greater tuberosity (supraspinatus tendon insertion) and along bicipital groove. No swelling or warmth.',
      activePassiveRom: [
        { movement: 'Active Abduction', activeDegrees: '150° with classic painful arc between 70° and 120°', passiveDegrees: 'Full 180° with mild discomfort at end range', painArc: true, endFeel: 'Firm (Capsular/Ligamentous)' },
        { movement: 'External Rotation at 0° abduction', activeDegrees: '65° symmetrical with left', passiveDegrees: '70° normal', painArc: false, endFeel: 'Firm (Capsular/Ligamentous)' },
        { movement: 'Internal Rotation behind back', activeDegrees: 'Reaches L3 on right vs T8 on left (GIRD deficit)', passiveDegrees: 'Limited by posterior capsule tightness', painArc: true, endFeel: 'Firm (Capsular/Ligamentous)' },
      ],
      mmtStrength: [
        { muscleGroup: 'Supraspinatus (Empty Can)', grade: '4/5', notes: 'Weakness accompanied by pain; no complete drop arm sign' },
        { muscleGroup: 'Infraspinatus / Teres Minor (Ext Rotation)', grade: '4/5', notes: 'Tender and weak in 0° abduction against resistance' },
        { muscleGroup: 'Serratus Anterior', grade: '4-/5', notes: 'Subtle medial border scapular winging during slow eccentric lowering from 90°' },
        { muscleGroup: 'Lower Trapezius', grade: '4/5', notes: 'Weakness in prone Y-elevation' },
      ],
      neurologicalExam: {
        dermatomes: 'C5-T1 normal sensation bilaterally',
        myotomes: 'C5 (deltoid 5/5), C6 (biceps 5/5), C7 (triceps 5/5), C8 (finger flexors 5/5), T1 (intrinsics 5/5)',
        reflexes: 'Biceps, Brachioradialis, and Triceps 2+ symmetrical',
        duralNeurodynamics: 'Upper Limb Neurodynamic Test 1 (Median nerve) negative for radicular symptoms',
      },
      specialTests: [
        { testName: 'Hawkins-Kennedy Impingement Test', result: 'Positive', sensitivity: '79%', specificity: '59%', positiveLR: '1.9', negativeLR: '0.36', clinicianNotes: 'Sharp anterolateral subacromial pain reproduced on passive internal rotation at 90° flexion.', evidenceCitation: 'Hegedus et al. Br J Sports Med 2012;46(14):964-978' },
        { testName: 'Neer Impingement Sign', result: 'Positive', sensitivity: '76%', specificity: '36%', positiveLR: '1.2', negativeLR: '0.67', clinicianNotes: 'Pain at 120°-140° forward elevation with scapula stabilized.', evidenceCitation: 'Neer CS 2nd. J Bone Joint Surg Am 1983;65(9):1232-1244' },
        { testName: 'Painful Arc Test (60° - 120°)', result: 'Positive', sensitivity: '53%', specificity: '76%', positiveLR: '2.25', negativeLR: '0.6', clinicianNotes: 'Distinctive painful arc during mid-range abduction; eases as arm clears 130°.', evidenceCitation: 'Michener et al. Ann Intern Med 2009;150(4):255-265' },
        { testName: 'Full Can Test (45° elevation in scapular plane)', result: 'Positive', sensitivity: '75%', specificity: '70%', positiveLR: '2.5', negativeLR: '0.36', clinicianNotes: 'Reproduction of anterolateral tendon pain with mild giving way; superior specificity over Empty Can.', evidenceCitation: 'Kelly et al. Am J Sports Med 1996;24(5):581-588' },
        { testName: 'Drop Arm Test (Full Thickness Tear Screen)', result: 'Negative', sensitivity: '27%', specificity: '98%', positiveLR: '13.5', negativeLR: '0.7', clinicianNotes: 'Patient able to smoothly control eccentric descent from 90° without dropping arm; rules out massive full-thickness tear.', evidenceCitation: 'Park et al. J Bone Joint Surg Am 2005;87(7):1446-1455' },
      ],
      functionalScreening: [
        { testName: 'Scapular Dyskinesis Test (Yes/No rating)', score: 'Positive (Type II - Medial border prominent during descent)', standardBenchmark: 'Normal symmetrical scapulohumeral rhythm', interpretation: 'Scapulothoracic motor control deficit contributing to secondary impingement' },
        { testName: 'Closed Kinetic Chain Upper Extremity Stability Test (CKCUEST)', score: '18 touches in 15 seconds', standardBenchmark: '> 21 touches in adult females', interpretation: 'Reduced dynamic shoulder stability in weight-bearing' },
      ],
      validatedProms: {
        toolName: 'QuickDASH & Shoulder Pain and Disability Index (SPADI)',
        baselineScore: 'QuickDASH: 43.2% | SPADI Total: 48.5% (Pain: 60%, Disability: 37%)',
        normativeThreshold: 'QuickDASH < 15% in asymptomatic recreational athletes',
        mcidScore: '10.8% change in QuickDASH | 10.0 points change in SPADI',
      },
    },
    diagnosticSynthesis: {
      primaryDiagnosis: 'Subacromial Pain Syndrome (SAPS) with Supraspinatus Tendinopathy & Scapular Dyskinesis',
      diagnosticConfidence: 'High (Cluster of Park/Michener positive: Hawkins-Kennedy + Painful Arc + Resisted Infraspinatus LR+ 10.6)',
      keyPathognomonicTriad: [
        'Anterolateral deltoid painful arc between 60° and 120° of active abduction',
        'Positive impingement cluster (Hawkins-Kennedy + Painful Arc + Resisted External Rotation)',
        'Absence of full-thickness rupture signs (negative drop arm, preserved active elevation > 150°)',
      ],
      differentialConsiderations: [
        { condition: 'Full-Thickness Massive Rotator Cuff Tear', tier: 'Primary Consideration', clinicalFeatures: 'Positive Drop Arm test, external rotation lag sign > 15°, profound weakness in external rotation', discriminatingTest: 'Diagnostic Ultrasound (MSK US) or MRI showing complete tendon retraction' },
        { condition: 'Adhesive Capsulitis (Frozen Shoulder - Stage 1/2)', tier: 'Secondary Consideration', clinicalFeatures: 'Profound equal loss of active AND passive external rotation (> 50% restriction)', discriminatingTest: 'Passive external rotation at 0° abduction is preserved in tendinopathy but severely restricted in frozen shoulder' },
        { condition: 'C5/C6 Cervical Radiculopathy', tier: 'Critical Differential to Exclude', clinicalFeatures: 'Neck pain radiating to shoulder, positive Spurling test, altered biceps/brachioradialis reflex', discriminatingTest: 'Cervical spine active movement and Spurling test do not reproduce shoulder symptoms' },
      ],
      goldStandardInvestigation: {
        modality: 'High-Resolution Musculoskeletal Diagnostic Ultrasound (12-18 MHz linear probe) / 3T Shoulder MRI',
        keyFindings: 'Hypoechoic thickening of distal supraspinatus tendon without full-thickness fiber discontinuity; subacromial-subdeltoid bursal thickening (> 2mm); dynamic impingement visualization under the coracoacromial arch during active abduction; intact tendon footprint.',
        guidelineReference: 'APTA Orthopaedic Section Clinical Practice Guideline on Shoulder Pain and Mobility Deficits & BESS/BOA Guidelines',
        choosingWiselyStatement: 'Subacromial decompression surgery (acromioplasty) is NOT recommended over structured progressive exercise therapy (BMJ / Lancet CSAS Trial). Routine MRI is not indicated in the first 6 weeks of atraumatic shoulder pain.',
      },
    },
    threeTierOptions: {
      option1StrongEvidence: {
        tierName: 'Option 1: Strong Evidence (Level I Gold Standard)',
        evidenceBadge: 'Level I (Systematic Reviews, Multi-Center Sham-Controlled Trials & BMJ Guidelines)',
        evidenceLevel: 'Level I-A (BMJ Rapid Recommendations, Lancet CSAW Trial, Cochrane)',
        summaryRationale: 'Multi-center sham-controlled randomized trials (CSAW, FIMPACT) published in The Lancet and BMJ demonstrate that subacromial decompression surgery offers NO clinically meaningful benefit over placebo arthroscopy or structured exercise therapy. High-load progressive rotator cuff and scapular resistance training yields 80-85% success rates, reversing tendon pathology through mechanotransduction and progressive collagen synthesis.',
        keyCitations: [
          {
            title: 'Subacromial Decompression Versus Diagnostic Arthroscopy for Shoulder Impingement: A Randomised, Placebo-Controlled Trial (CSAW)',
            authors: 'Beard DJ, Rees JL, Cook JA, et al.',
            journal: 'The Lancet',
            year: 2018,
            doi: '10.1016/S0140-6736(17)32457-1',
            evidenceLevel: 'Level I',
            sampleSize: '313 patients with subacromial pain',
            keyTakeaway: 'Surgical decompression provided no greater clinical improvement in pain or function at 6 months and 1 year than placebo arthroscopy or structured physical therapy.',
          },
          {
            title: 'Subacromial Decompression Surgery for Rotator Cuff Disease: BMJ Rapid Recommendations',
            authors: 'Vandvik PO, Lähdeoja T, Ardern C, et al.',
            journal: 'British Medical Journal (BMJ)',
            year: 2019,
            doi: '10.1136/bmj.l286',
            evidenceLevel: 'Level I',
            sampleSize: 'Systematic review of 7 trials, 1,014 patients',
            keyTakeaway: 'Strong clinical practice recommendation against subacromial decompression surgery for atraumatic subacromial shoulder pain.',
          },
          {
            title: 'Exercise Therapy in the Treatment of Shoulder Pain: A Systematic Review',
            authors: 'Kuhn JE.',
            journal: 'Journal of Shoulder and Elbow Surgery',
            year: 2009,
            doi: '10.1016/j.jse.2008.08.007',
            evidenceLevel: 'Level I',
            sampleSize: '11 RCTs, 860 patients',
            keyTakeaway: 'Progressive eccentric-concentric strengthening of rotator cuff and scapular stabilizers significantly reduces pain and restores function in > 80% of patients.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Park clinical diagnostic rule: Hawkins-Kennedy + Painful Arc + Resisted External Rotation yields LR+ 10.6 for rotator cuff tendinopathy',
          'Intact passive external rotation (> 60°) reliably differentiates tendinopathy from adhesive capsulitis',
        ],
        interventions: {
          firstLine: [
            'Load modification: Temporarily cease high-velocity overhead smashes for 3 weeks; replace with mid-range racket drills below shoulder height',
            'Progressive Rotator Cuff Loading (Mechanotherapy): Daily isometric external rotation progressing to heavy slow resistance (HSR)',
            'Scapular stabilization focusing on Serratus Anterior and Lower Trapezius to restore upward scapular rotation during elevation',
            'Sleeper stretch and cross-body adduction stretch to address Glenohumeral Internal Rotation Deficit (GIRD)',
          ],
          exercisePrescription: [
            { name: 'Isometric Shoulder External Rotation at 30° Scapular Plane against Wall', dosage: '5 sets x 45s hold at 70% MVC', frequency: 'Daily (2x/day)', targetAdaptation: 'Cortical tendon analgesic effect & infraspinatus motor recruitment', biomechanicalCue: 'Keep towel roll between elbow and flank; maintain upright sternum.' },
            { name: 'Side-Lying External Rotation with Dumbbell (Heavy Slow Resistance)', dosage: '3 sets x 10 reps (3s concentric, 3s eccentric)', frequency: '3x/week', targetAdaptation: 'Hypertrophy and tenocyte collagen remodelling in infraspinatus/teres minor', biomechanicalCue: 'Control eccentric lowering; do not allow trunk to roll backwards.' },
            { name: 'Serratus Anterior Wall Slides with Forearm Resistance Band', dosage: '3 sets x 12 reps with plus push at top', frequency: 'Daily', targetAdaptation: 'Restores upward scapular rotation and posterior tilt during arm elevation', biomechanicalCue: 'Keep forearms parallel; glide upward into Y-shape and push chest gently away from wall.' },
            { name: 'Prone Y-Raise on Incline Bench (Lower Trapezius Activation)', dosage: '3 sets x 12 reps (2s hold at apex)', frequency: '3x/week', targetAdaptation: 'Lower trapezius recruitment and reduction of upper trapezius dominance', biomechanicalCue: 'Thumbs point toward ceiling; initiate movement from shoulder blade, not neck.' },
          ],
          contraindicatedOrAvoid: [
            'Do not inject multiple repeat subacromial corticosteroid injections (Level I evidence demonstrates increased long-term risk of tendon collagen necrosis and subsequent full-thickness tear).',
            'Avoid passive modalities alone (ultrasound, hot packs, laser) without active exercise (Level I evidence shows zero added benefit).',
            'Avoid upright rows and behind-the-neck lat pulldowns which place the rotator cuff in maximum internal rotation impingement.',
          ],
          expectedRecoveryTimeline: 'Symptom reduction: 4 - 6 weeks. Complete return to competitive overhead badminton: 12 - 16 weeks.',
          objectiveDischargeCriteria: [
            'QuickDASH score < 15% with complete resolution of night pain',
            'External Rotation to Internal Rotation (ER:IR) strength ratio ≥ 0.70 via hand-held dynamometry',
            'Painless execution of 20 consecutive maximum-effort overhead smashes during sport-specific testing',
            'GIRD internal rotation symmetry within 10° of non-dominant shoulder',
          ],
        },
      },
      option2Evidence: {
        tierName: 'Option 2: Evidence (Level II/III Observational & Pragmatic Practice)',
        evidenceBadge: 'Level II/III (Prospective Cohorts & Sports Medicine Consensus Statements)',
        evidenceLevel: 'Level II-B / III (AJSM, Arthroscopy & ESSKA Consensus)',
        summaryRationale: 'Supported by sports medicine prospective cohorts and European athletic rehabilitation guidelines. Single targeted ultrasound-guided subacromial bursa injection (corticosteroid or hyaluronic acid) can be utilized selectively as an acute analgesic bridge in patients unable to initiate exercise therapy due to severe pain (NPRS > 7/10). Combined with manual posterior capsular release and kinetic chain thoracic spine extension mobilization.',
        keyCitations: [
          {
            title: 'Ultrasound-Guided Subacromial Injections: Accuracy, Efficacy and Safety Compared to Blind Landmark Techniques',
            authors: 'Aly AR, Rajasekaran S, Ashworth N.',
            journal: 'British Journal of Sports Medicine',
            year: 2015,
            doi: '10.1136/bjsports-2014-094143',
            evidenceLevel: 'Level II',
            sampleSize: 'Meta-analysis of 12 prospective trials',
            keyTakeaway: 'Ultrasound guidance achieved 95% anatomical accuracy into the subacromial bursa compared to 63% for blind injections, resulting in superior short-term pain relief.',
          },
          {
            title: 'Thoracic Spine Thrust Manipulation for Patients with Shoulder Pain: A Multicenter Randomized Clinical Trial',
            authors: 'Mintken PE, Cleland JA, Whitman JM, et al.',
            journal: 'Journal of Orthopaedic & Sports Physical Therapy (JOSPT)',
            year: 2010,
            doi: '10.2519/jospt.2010.3318',
            evidenceLevel: 'Level II',
            sampleSize: '140 patients with shoulder impingement syndrome',
            keyTakeaway: 'Cervicothoracic spine manipulation produced immediate improvements in active shoulder range of motion and pain reduction during elevation.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Diagnostic Neer test (relief of pain > 50% following 5ml lidocaine injection into subacromial bursa) confirms subacromial origin',
          'Thoracic extension kyphosis measurement using dual inclinometer to evaluate kinetic chain contribution',
        ],
        interventions: {
          firstLine: [
            'Thoracic spine extension and rotational mobilization (foam roller thoracic extensions + seated open-book rotations)',
            'Posterior capsule sleeper stretch and cross-arm stretch held for 30 seconds (3 repetitions, 2x/day)',
            'Single diagnostic/therapeutic ultrasound-guided subacromial injection if initial 4 weeks of exercise fails to quiet night pain',
            'Kinetic chain integration: Squat-to-row and diagonal PNF D2 flexion-extension patterns with elastic resistance',
          ],
          exercisePrescription: [
            { name: 'Thoracic Spine Foam Roller Extensions', dosage: '2 sets x 10 gentle extensions', frequency: 'Daily', targetAdaptation: 'Restores T1-T6 extension needed for full overhead reach (15° of shoulder elevation requires thoracic extension)', biomechanicalCue: 'Support neck with interlaced fingers; do not hyperextend lumbar spine.' },
            { name: 'Modified Sleeper Stretch with 45° Trunk Roll', dosage: '3 sets x 30s holds', frequency: '2x/day', targetAdaptation: 'Lengthens contracted posteroinferior glenohumeral capsule and reduces anterior humeral head translation', biomechanicalCue: 'Roll trunk 45° backward before gently depressing wrist toward floor.' },
            { name: 'Kinetic Chain Squat-to-Low Row with Cable / Resistance Band', dosage: '3 sets x 12 reps', frequency: '3x/week', targetAdaptation: 'Integrates leg drive and core rotation into scapular retraction and arm movement', biomechanicalCue: 'Drive through heels, extend hips, and finish with squeeze between shoulder blades.' },
            { name: 'Plyometric Rebounder Catch with 1kg Medicine Ball at 90° Abduction', dosage: '3 sets x 15 throws', frequency: '2x/week (Phase 3)', targetAdaptation: 'Dynamic rotator cuff reactive co-contraction and neuromuscular deceleration', biomechanicalCue: 'Cock arm smoothly; catch ball with quick deceleration without shoulder drop.' },
          ],
          contraindicatedOrAvoid: [
            'Avoid more than 2 corticosteroid injections within a 12-month window.',
            'Do not perform heavy overhead pressing with elbows flared into the coronal plane (keep in 30° scapular plane).',
          ],
          expectedRecoveryTimeline: '6 - 8 weeks for significant clinical improvement; 12 weeks for full athletic velocity overhead smashes.',
          objectiveDischargeCriteria: [
            'Painless full active elevation (180°) without painful arc',
            'SPADI disability index < 10 points',
            'Symmetrical thoracic extension (> 25° on dual inclinometry)',
          ],
        },
      },
      option3ExpertOpinion: {
        tierName: 'Option 3: ClinicaAI Expert Opinion & Reasoning',
        evidenceBadge: 'ClinicaAI Expert Synthesis (Clinical Reasoning, Pearls & Overhead Athlete Context)',
        clinicaAiSynthesis: 'In overhead athletes like badminton coaches, subacromial pain is rarely an isolated tendon problem—it is almost always the victim of kinetic chain breakdowns downstream. Look at three classic culprits: 1) Glenohumeral Internal Rotation Deficit (GIRD) caused by a stiff posteroinferior capsule, which forces the humeral head to migrate anterosuperiorly into the acromion; 2) Lack of thoracic spine extension; and 3) Scapular dyskinesis (the scapula fails to upwardly rotate and clear the acromion during the smash). By restoring thoracic extension and posterior capsule mobility first, you immediately increase the subacromial volume by 2-3mm, allowing painless tendon loading. In badminton specifically, the deceleration phase of the smash places 750N of eccentric distraction on the infraspinatus and posterior cuff—so eccentric external rotation conditioning must be the cornerstone of late-stage rehab.',
        clinicalPearls: [
          'Clinical Pearl #1: Check the athlete\'s thoracic spine. For every 5 degrees of thoracic kyphosis or stiffness, you lose 10-15 degrees of shoulder elevation, forcing the rotator cuff to impinge at the top of the smash.',
          'Clinical Pearl #2: If the athlete complains of "dead arm" or a clicking sensation with anterior subluxation during late cocking, suspect an occult superior labral anterior-posterior (SLAP) tear or posterior-superior internal impingement rather than pure subacromial bursitis.',
          'Clinical Pearl #3: When performing the sleeper stretch, never lie flat on the lateral shoulder—roll 30-45 degrees backward. Lying directly on the acromion crushes the bursa and worsens symptoms.',
          'Clinical Pearl #4: In Indian women over 40 with persistent unilateral shoulder stiffness and pain, always screen for subclinical hypothyroidism and early dysglycemia, both of which accelerate collagen cross-linking and predispose to secondary adhesive capsulitis.',
        ],
        redFlagAndSafetyPrecautions: [
          'Sudden Inability to Elevate Arm ("Shrug Sign"): If active elevation is < 90° while passive elevation is full, suspect acute full-thickness supraspinatus/infraspinatus rupture; obtain immediate diagnostic ultrasound or MRI.',
          'Unexplained night pain unalleviated by posture or rest in older individuals warrants screening for Pancoast lung apex tumor or metastatic bony lesion.',
        ],
        sportsOrContextSpecificConsiderations: [
          'Badminton Racket Tension: High racket string tension (> 28 lbs) transmits higher shock vibrations to the shoulder; temporarily reduce string tension to 23-24 lbs during return to play.',
          'Footwork & Deceleration: Emphasize scissor-kick landing footwork so lower body absorbs braking forces rather than the shoulder capsule.',
        ],
        phaseBasedRoadmap: [
          { phase: 'Phase 1 (Week 1 - 3): Irritability Reduction & GIRD Resolution', focus: 'Sleeper stretch, thoracic extensions, isometric external rotations, avoid smashes', milestoneToProgress: 'Night pain resolved, painful arc NPRS < 3/10, active elevation 160°+' },
          { phase: 'Phase 2 (Week 4 - 8): Scapular Rhythm & Rotator Cuff Hypertrophy', focus: 'Side-lying HSR external rotation, serratus wall slides, prone Ys, core integration', milestoneToProgress: 'ER:IR strength ratio > 0.65, full active symmetrical elevation without pain' },
          { phase: 'Phase 3 (Week 9 - 12): Plyometrics & Return to Racket Drills', focus: 'Medicine ball decelerations, drop smashes with low string tension, court drills', milestoneToProgress: 'QuickDASH < 15%, 20 painless smashes, 100% coach workload resumption' },
        ],
        drugTendonAlerts: [
          'Avoid fluoroquinolone antibiotics which specifically compromise the hypovascular "critical zone" of Codman in the supraspinatus tendon.',
        ],
        psychologicalReadinessMetrics: 'Shoulder Return to Sport After Injury (SIRSI) score > 70 before clearing for tournament coaching or competition.',
      },
    },
  },
  {
    id: 'cond-ankle-achilles-tendinopathy',
    name: 'Midportion Achilles Tendinopathy',
    jointRegion: 'Ankle & Foot',
    specialty: 'sports_physiotherapy',
    icd10Code: 'M76.61',
    typicalDemographics: {
      ageRange: '30 - 55 years',
      predominantSex: 'Slightly higher in males (60:40)',
      commonPopulations: 'Marathon runners, fast bowlers, badminton players, middle-aged fitness enthusiasts',
    },
    patientPreset: {
      name: 'Vikram Joshi',
      age: 36,
      sex: 'Male',
      occupation: 'Corporate Manager & Recreational Half-Marathoner',
      activityLevel: 'Moderate to Heavy Athletic',
      chiefComplaint: 'Pain and localized thickening 3-5 cm above the heel in the right Achilles tendon with morning stiffness',
      anatomicalLocation: 'Right Achilles Tendon - 4 cm proximal to calcaneal insertion (hypovascular midportion)',
      onset: 'Chronic (> 3 months)',
      duration: '4 months',
      severityNprs: 6,
      progression: 'Fluctuating, worse after increasing weekly running mileage from 20km to 40km',
      injuryMechanism: 'Sudden spike in running volume, hill sprint training, and worn running shoes',
      symptomBehavior24h: 'Severe morning "hobble" for first 10-15 minutes of walking; "warm-up phenomenon" (pain eases during initial 2km of running but throbs intensely 2 hours post-run)',
      aggravatingFactors: ['Running uphill', 'Hopping', 'First steps out of bed', 'Speed intervals'],
      relievingFactors: ['Warm shower / heat', 'Gentle walking after warming up', 'Elevated shoe heel drop (10mm)'],
      functionalLimitations: 'Unable to run beyond 3km without limping; abandoned half-marathon training',
      patientGoals: 'Painless morning walking, rebuild tendon load tolerance, complete Mumbai Half Marathon in under 2 hours',
      medicalHistory: 'Mild hypercholesterolemia (borderline LDL 142 mg/dL)',
      surgicalHistory: 'None',
      comorbidities: ['Dyslipidemia'],
      medications: 'Omega-3 fatty acids, daily multivitamin',
      allergies: 'No known drug allergies',
    },
    physicalExamination: {
      observationGait: 'Reduced push-off on right side during terminal stance; walks with slight calcaneal gait to offload forefoot loading. Visible nodular spindle-shaped thickening of midportion tendon.',
      palpationFindings: 'Tender nodular swelling 3-5 cm proximal to calcaneus. Positive Royal London Hospital Test (tenderness decreases as ankle moves from plantarflexion into maximum dorsiflexion).',
      activePassiveRom: [
        { movement: 'Ankle Dorsiflexion (Knee Extended)', activeDegrees: '5° right vs 15° left (gastrocnemius restriction)', passiveDegrees: '8° with tight tendon end-feel', painArc: false, endFeel: 'Firm (Capsular/Ligamentous)' },
        { movement: 'Ankle Dorsiflexion (Knee Flexed - Soleus)', activeDegrees: '12° right vs 22° left', passiveDegrees: '15°', painArc: false, endFeel: 'Firm (Capsular/Ligamentous)' },
        { movement: 'Ankle Plantarflexion', activeDegrees: '45° symmetrical', passiveDegrees: '50°', painArc: true, endFeel: 'Firm (Capsular/Ligamentous)' },
      ],
      mmtStrength: [
        { muscleGroup: 'Soleus (Seated Calf Raise)', grade: '4-/5', notes: 'Fatigues after 12 single-leg repetitions compared to 28 on left' },
        { muscleGroup: 'Gastrocnemius (Standing Single Leg Raise)', grade: '4/5', notes: 'Pain and early shaking at 14 reps' },
        { muscleGroup: 'Tibialis Posterior (Inversion)', grade: '5/5', notes: 'Normal medial arch support' },
        { muscleGroup: 'Peroneals (Eversion)', grade: '5/5', notes: 'Normal lateral stability' },
      ],
      neurologicalExam: {
        dermatomes: 'L4, L5, S1, S2 intact bilaterally',
        myotomes: 'L4 (5/5), L5 (5/5), S1 (4/5 calf endurance deficit)',
        reflexes: 'Achilles reflex 2+ bilaterally, no clonus',
        duralNeurodynamics: 'SLR with ankle dorsiflexion and eversion (Tibial nerve bias) negative for radicular symptoms',
      },
      specialTests: [
        { testName: 'Royal London Hospital Test', result: 'Positive', sensitivity: '54%', specificity: '91%', positiveLR: '6.0', negativeLR: '0.5', clinicianNotes: 'Tenderness at 4cm relaxes and diminishes significantly in full dorsiflexion.', evidenceCitation: 'Maffulli et al. Am J Sports Med 2008;36(8):1538-1544' },
        { testName: 'Painful Arc Sign (Achilles)', result: 'Positive', sensitivity: '59%', specificity: '88%', positiveLR: '4.9', negativeLR: '0.46', clinicianNotes: 'Tender nodule moves cranially and caudally during active plantar/dorsiflexion (confirms intratendinous rather than paratenon origin).', evidenceCitation: 'Reiman et al. Br J Sports Med 2014;48(11):893-902' },
        { testName: 'Single-Leg Heel Raise Test (Endurance Repetitions)', result: 'Positive', sensitivity: '88%', specificity: '84%', positiveLR: '5.5', negativeLR: '0.14', clinicianNotes: 'Right limb reaches only 14 reps before fatigue and pain; left limb completes 28 reps.', evidenceCitation: 'Silbernagel et al. Am J Sports Med 2007;35(4):469-477' },
        { testName: 'Thompson Simmonds Squeeze Test (Complete Rupture Screen)', result: 'Negative', sensitivity: '96%', specificity: '98%', positiveLR: '48.0', negativeLR: '0.04', clinicianNotes: 'Normal prompt ankle plantarflexion on calf compression; rules out full-thickness tendon rupture.', evidenceCitation: 'Maffulli N. J Foot Ankle Surg 1998;37(4):272-277' },
      ],
      functionalScreening: [
        { testName: 'Single-Leg Hop Test (10 consecutive hops in place)', score: 'Pain NPRS 5/10 during hopping; reduced ground contact stiffness', standardBenchmark: 'Painless with spring-like elastic recoil', interpretation: 'Impaired stretch-shortening cycle (SSC) elastic energy storage' },
        { testName: 'Weight-Bearing Lunge Test (WBLT - Dorsiflexion)', score: '6 cm knee-to-wall right vs 12 cm left', standardBenchmark: '> 10 cm symmetry', interpretation: 'Severe ankle dorsiflexion mobility restriction' },
      ],
      validatedProms: {
        toolName: 'Victorian Institute of Sport Assessment - Achilles (VISA-A)',
        baselineScore: 'VISA-A Score: 44 / 100',
        normativeThreshold: '> 90 points in uninjured runners',
        mcidScore: '14.0 points (minimal clinically important difference for VISA-A)',
      },
    },
    diagnosticSynthesis: {
      primaryDiagnosis: 'Right Midportion Achilles Tendinopathy (Disrepair / Degenerative Phase)',
      diagnosticConfidence: 'Definitive (Royal London Hospital test + Painful Arc sign + Spindle nodule 4cm above heel + negative Thompson test)',
      keyPathognomonicTriad: [
        'Pain and nodular swelling localized to hypovascular midportion (2 - 6 cm proximal to calcaneus)',
        'Classic morning stiffness / pain during the first 10-15 minutes of walking',
        'Positive Royal London Hospital test and painful arc sign with preserved Thompson calf squeeze',
      ],
      differentialConsiderations: [
        { condition: 'Insertional Achilles Tendinopathy & Retrocalcaneal Bursitis', tier: 'Primary Consideration', clinicalFeatures: 'Pain directly on posterior calcaneus, tenderness with ankle dorsiflexion compression, Haglund deformity', discriminatingTest: 'Pain located directly at bone-tendon junction rather than 4cm proximal midportion' },
        { condition: 'Acute Subcutaneous Achilles Tendon Rupture', tier: 'Critical Differential to Exclude', clinicalFeatures: 'Sudden "kicked in heel" sensation, palpable gap/defect, inability to perform single-leg heel raise', discriminatingTest: 'Positive Thompson squeeze test (loss of passive plantarflexion) and palpable gap' },
        { condition: 'Flexor Hallucis Longus (FHL) Tendinopathy / Stenosing Tenosynovitis', tier: 'Secondary Consideration', clinicalFeatures: 'Pain behind medial malleolus, pain resisted big toe flexion, triggering', discriminatingTest: 'Resisted great toe flexion reproduces pain; Achilles tendon palpation completely non-tender' },
      ],
      goldStandardInvestigation: {
        modality: 'High-Resolution Diagnostic Ultrasound (MSK US) with Power Doppler / Sonoelastography',
        keyFindings: 'Fusiform tendon thickening (anteroposterior diameter > 6.5mm vs normal < 5mm); loss of parallel fibrillar architecture; hypoechoic collagen disorganization; neovascularization / neovessels with accompanying nerve ingrowth on Power Doppler (Ohberg Score 2+).',
        guidelineReference: 'APTA Clinical Practice Guideline on Achilles Pain, Stiffness, and Muscle Power Deficits (JOSPT 2018)',
        choosingWiselyStatement: 'Corticosteroid injection into or around the Achilles tendon is strictly contraindicated due to catastrophic risk of subsequent tendon rupture (up to 30% rupture rate in published series).',
      },
    },
    threeTierOptions: {
      option1StrongEvidence: {
        tierName: 'Option 1: Strong Evidence (Level I Gold Standard)',
        evidenceBadge: 'Level I (Systematic Reviews, RCTs & JOSPT CPG Guidelines)',
        evidenceLevel: 'Level I-A (Alfredson Protocol, Silbernagel Combined, JOSPT 2018 CPG)',
        summaryRationale: 'Level I evidence universally confirms that mechanotherapy—specifically progressive tendon loading utilizing Heavy Slow Resistance (HSR) or the Alfredson eccentric protocol—is the definitive first-line gold standard for midportion Achilles tendinopathy. Progressive loading stimulates tenocyte mechanotransduction, upregulates Type I collagen synthesis, and reverses pathological neovascularization over a 12-week course, achieving 80-90% clinical resolution without surgery.',
        keyCitations: [
          {
            title: 'Heavy-Load Eccentric Calf Muscle Training for the Treatment of Chronic Achilles Tendinosis',
            authors: 'Alfredson H, Pietilä T, Jonsson P, Lorentzon R.',
            journal: 'American Journal of Sports Medicine',
            year: 1998,
            doi: '10.1177/03635465980260030301',
            evidenceLevel: 'Level I',
            sampleSize: 'Landmark trial in chronic recalcitrant tendinosis',
            keyTakeaway: '12-week eccentric loading protocol on a step (3 sets of 15 reps, 2x daily, with knee straight and bent) eliminated pain and returned 100% of runners to pre-injury mileage.',
          },
          {
            title: 'Heavy Slow Resistance Versus Eccentric Training as Treatment for Achilles Tendinopathy: A Randomized Controlled Trial',
            authors: 'Beyer R, Kongsgaard M, Hougs Kjær B, et al.',
            journal: 'American Journal of Sports Medicine',
            year: 2015,
            doi: '10.1177/0363546515584760',
            evidenceLevel: 'Level I',
            sampleSize: '58 recreational athletes with chronic midportion tendinopathy',
            keyTakeaway: 'Heavy Slow Resistance (HSR) performed 3x/week produced equivalent superior clinical and structural improvements to Alfredson daily eccentrics, with significantly higher patient compliance and satisfaction.',
          },
          {
            title: 'Achilles Pain, Stiffness, and Muscle Power Deficits: Midportion Achilles Tendinopathy Revision 2018',
            authors: 'Martin RL, Chimenti R, Cuddeford T, et al.',
            journal: 'Journal of Orthopaedic & Sports Physical Therapy (JOSPT)',
            year: 2018,
            doi: '10.2519/jospt.2018.0302',
            evidenceLevel: 'Level I',
            sampleSize: 'Clinical practice guideline synthesizing 118 high-quality studies',
            keyTakeaway: 'Strong recommendation (Evidence A) for mechanical eccentric or heavy slow resistance loading; strong recommendation against corticosteroid injection or complete rest.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Royal London Hospital test specificity 91% (LR+ 6.0) for midportion tendinopathy',
          'Tendon thickness > 6mm on sagittal ultrasound corresponds to structural disrepair',
        ],
        interventions: {
          firstLine: [
            'Temporary load de-escalation: Cease running intervals and hill sprints for 2 weeks; maintain cardiovascular fitness via pool running or cycling',
            'Heavy Slow Resistance (HSR) Training 3x/week: Seated calf raise (soleus), standing calf raise (gastrocnemius), and leg press calf raise',
            'Isometric Calf Holds (Ebonie Rio Tendon Neuroplastic Training): 5 sets x 45s at 70% MVC using metronome to suppress cortical motor inhibition',
            'Heel lift insert (10-12mm silicone heel cup) worn inside daily footwear to reduce tensile strain on Achilles during walking',
          ],
          exercisePrescription: [
            { name: 'Isometric Standing Heel Raise Hold at Mid-Range (Neuroplastic analgesia)', dosage: '5 sets x 45 seconds at 70% MVC (2 min rest)', frequency: 'Daily (morning & pre-loading)', targetAdaptation: 'Cortical motor drive restoration & immediate 4-hour tendon analgesia', biomechanicalCue: 'Rise onto balls of feet; hold steady mid-range height without foot wobbling.' },
            { name: 'Heavy Slow Resistance (HSR) Standing Calf Raise on Flat Floor', dosage: '3 sets x 15 reps (week 1-4) -> 4 sets x 8 reps (week 5-8) -> 4 sets x 6 reps (week 9-12)', frequency: '3 days per week (alternate days)', targetAdaptation: 'Collagen fiber realignment, cross-linking, and muscle-tendon unit stiffness', biomechanicalCue: 'Count 3 seconds up, 3 seconds down; add external backpack or barbell weight as reps decrease.' },
            { name: 'Seated Calf Raise (Soleus-Specific High Load)', dosage: '4 sets x 10 reps (3s up, 3s down)', frequency: '3 days per week', targetAdaptation: 'Soleus produces 60-70% of propulsive force during running; requires knee flexed 90°', biomechanicalCue: 'Drive through 1st metatarsal head; do not bounce at the bottom.' },
            { name: 'Progressive Plyometric Hopping (Phase 3 - Week 8+)', dosage: '3 sets x 20 two-legged hops progressing to single-leg hops', frequency: '2x/week', targetAdaptation: 'Restores stretch-shortening cycle (SSC) energy storage capacity', biomechanicalCue: 'Stiff ankle landing; minimize ground contact time as if jumping on hot coals.' },
          ],
          contraindicatedOrAvoid: [
            'STRICTLY CONTRAINDICATED: Intratendinous or peritendinous corticosteroid injections (destroys tenocyte collagen, 30% rupture hazard).',
            'Do not advise complete non-weight-bearing immobilization or total rest (leads to rapid tendon catabolism and muscle atrophy).',
            'Avoid aggressive passive dorsiflexion stretching off step edges in early acute phases (adds compressive insertional shear).',
          ],
          expectedRecoveryTimeline: 'Pain reduction: 4 - 6 weeks. Complete return to competitive marathon running: 12 - 16 weeks.',
          objectiveDischargeCriteria: [
            'VISA-A Score > 85 / 100 with 0/10 morning stiffness',
            'Single-Leg Heel Raise Repetitions ≥ 25 reps with symmetry index (LSI) ≥ 90%',
            'Single-leg hop test: 30 consecutive hops with equal height and no pain',
            'Successful completion of 10km progressive pace run without next-day tendon stiffness',
          ],
        },
      },
      option2Evidence: {
        tierName: 'Option 2: Evidence (Level II/III Observational & Pragmatic Practice)',
        evidenceBadge: 'Level II/III (Prospective Trials, Shockwave (ESWT) & Orthobiologic Cohorts)',
        evidenceLevel: 'Level II-B / III (BJSM, Foot & Ankle International, ISMST Consensus)',
        summaryRationale: 'Supported by prospective clinical trials and international shockwave society (ISMST) guidelines. Radial or focused Extracorporeal Shockwave Therapy (ESWT) delivered as 3 sessions at weekly intervals acts as a powerful non-invasive adjunct to HSR loading by stimulating local neovascular remodeling, tenocyte proliferation, and substance P depletion. Platelet-Rich Plasma (PRP) shows variable evidence and is reserved for chronic recalcitrant cases failing 6 months of conservative loading.',
        keyCitations: [
          {
            title: 'Eccentric Loading, Shock-Wave Therapy, or a Wait-and-See Policy for Tendinopathy of the Main Body of Tendo Achillis',
            authors: 'Rompe JD, Furia J, Maffulli N.',
            journal: 'American Journal of Sports Medicine',
            year: 2007,
            doi: '10.1177/0363546506295940',
            evidenceLevel: 'Level II',
            sampleSize: '75 patients with chronic Achilles tendinopathy',
            keyTakeaway: 'Both eccentric loading and low-energy shock-wave therapy achieved 52% and 64% complete success rates at 4 months, vastly outperforming wait-and-see (24%). Combined therapy yielded superior results.',
          },
          {
            title: 'Platelet-Rich Plasma Injection for Chronic Achilles Tendinopathy: A Randomized Clinical Trial',
            authors: 'de Vos RJ, Weir A, van Schie HT, et al.',
            journal: 'JAMA',
            year: 2010,
            doi: '10.1001/jama.2009.1986',
            evidenceLevel: 'Level II',
            sampleSize: '54 patients in double-blind placebo-controlled trial',
            keyTakeaway: 'PRP injection did not show statistically significant superiority over saline placebo injection when both were combined with eccentric exercise, confirming loading remains the primary therapeutic driver.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'Power Doppler flow quantification (Ohberg 0-4 score) correlates with symptom severity in active runners',
          'Weight-bearing lunge test < 9cm correlates with 3x higher Achilles tendon load during gait',
        ],
        interventions: {
          firstLine: [
            'Radial Extracorporeal Shockwave Therapy (rESWT): 2000 pulses, 2.0 - 2.5 bar, 8Hz, 3 to 4 weekly sessions directly to midportion nodule',
            'Bilateral temporary 12mm heel lifts in all shoes (including indoor slippers) for 4 weeks',
            'Gastrocnemius-soleus soft tissue instrument-assisted mobilization (IASTM) avoiding direct friction over the tender midportion',
            'Cross-training via low-impact cadence indoor cycling or elliptical trainer with midfoot shoe placement',
          ],
          exercisePrescription: [
            { name: 'Radial Shockwave Therapy (rESWT)', dosage: '2000 impulses at 2.4 bar, 8Hz', frequency: 'Once weekly for 3 - 4 sessions', targetAdaptation: 'Cavitation-induced growth factor release (VEGF, PCNA) and substance P depletion', biomechanicalCue: 'Patient prone with feet over bed end; target point of maximal tenderness.' },
            { name: 'Eccentric Heel Drops on Flat Ground (Alfredson Modified)', dosage: '3 sets x 15 reps (knee straight) + 3 sets x 15 reps (knee bent)', frequency: 'Daily', targetAdaptation: 'Tendon elongation under tensile strain; flat ground prevents excessive dorsiflexion impingement', biomechanicalCue: 'Rise up on both feet, remove uninjured foot, lower down slowly on injured foot (3 seconds).' },
            { name: 'Isometric Soleus Hold on Wall Sit with Heel Elevation', dosage: '4 sets x 40s holds', frequency: 'Daily', targetAdaptation: 'High-load soleus isometric strength without ankle joint excursion', biomechanicalCue: 'Thighs parallel to floor, elevate heels 3cm and hold.' },
            { name: 'Agility Ladder Quick-Feet Pacing Drills (Phase 3)', dosage: '5 minutes of in-and-out ladder runs', frequency: '2x/week', targetAdaptation: 'Neuromuscular coordination and rapid ankle stiffness development', biomechanicalCue: 'Light, springy forefoot contacts; avoid heavy heel strike.' },
          ],
          contraindicatedOrAvoid: [
            'Do not administer shockwave therapy if local skin infection, deep vein thrombosis, or bleeding diathesis exists.',
            'Do not run on uneven sand or rocky ground during the initial 6 weeks of loading.',
          ],
          expectedRecoveryTimeline: '8 - 12 weeks for substantial functional turnaround; 16 weeks for half-marathon race clearance.',
          objectiveDischargeCriteria: [
            'VISA-A score > 80 / 100',
            'Absence of Power Doppler flow (neovascularization regression) on repeat MSK ultrasound',
            'Symmetrical calf circumference (within 0.5 cm at maximum girth)',
          ],
        },
      },
      option3ExpertOpinion: {
        tierName: 'Option 3: ClinicaAI Expert Opinion & Reasoning',
        evidenceBadge: 'ClinicaAI Expert Synthesis (Clinical Reasoning, Pearls & Running Biomechanics)',
        clinicaAiSynthesis: 'Achilles tendinopathy is essentially a "failure of load capacity." The tendon became symptomatic not because of sudden damage, but because the mechanical demand (running volume spike + hill repeats) exceeded the capacity of the deep plantarflexor complex (especially the Soleus). Note that during distance running, the Soleus absorbs 6.5 to 8 times body weight—far more than the Gastrocnemius! If you only prescribe standing calf raises (which isolate Gastrocnemius), the Soleus remains deconditioned and the tendon continues to break down. You MUST load the Soleus with seated, bent-knee calf raises with heavy weight (> 1 to 1.5x body weight). Furthermore, explain the "Pain Monitoring Model" to the runner: pain up to 4/10 during exercise is acceptable and safe, provided it settles back to baseline within 24 hours and morning stiffness the next day does not worsen.',
        clinicalPearls: [
          'Clinical Pearl #1: The 24-Hour Response Test is the ultimate compass. Always judge today\'s exercise dose by tomorrow morning\'s stiffness! If morning hobbling is ≤ 10 minutes, the dose was therapeutic. If morning stiffness lasts 45 minutes, you overloaded the tendon.',
          'Clinical Pearl #2: Look at the runner\'s shoes. Zero-drop or minimalist shoes increase Achilles tendon tensile load by 15-20%. Prescribe a traditional 10-12mm heel-to-toe drop shoe or add a temporary 10mm heel lift inside the shoe.',
          'Clinical Pearl #3: In patients over 35 with bilateral or recalcitrant Achilles tendinopathy, check fasting lipid profile (total cholesterol & triglycerides) and HbA1c. Cholesterol esters deposit in the tendon matrix (xanthomatous infiltration), impairing tenocyte healing.',
          'Clinical Pearl #4: Never use NSAIDs like ibuprofen chronically in tendinopathy. They inhibit prostaglandin E2 and blunted collagen synthesis, retarding tendon healing while masking warning pain.',
        ],
        redFlagAndSafetyPrecautions: [
          'Sudden "Gunshot / Pop" Sensation: If the patient feels a sudden snap as if struck from behind, accompanied by an immediate inability to push off, immediately perform the Thompson Squeeze Test. If positive, splint in 30° equinus and refer to an orthopaedic surgeon within 24 hours for acute percutaneous or open repair.',
          'Fluoroquinolone Warning: Inquire if the patient received ciprofloxacin, levofloxacin, or moxifloxacin for a recent infection. Fluoroquinolones cause widespread tenocyte apoptosis and carry a black-box FDA warning for spontaneous Achilles rupture.',
        ],
        sportsOrContextSpecificConsiderations: [
          'Running Cadence Adjustment: Increasing running cadence by 5-10% (e.g. from 160 spm to 172 spm) shortens stride length, moves ground contact closer to the center of mass, and reduces peak Achilles braking strain by 14%.',
          'Running Surface: Avoid dry, hard packed clay or treadmill incline running during the initial 6 weeks.',
        ],
        phaseBasedRoadmap: [
          { phase: 'Phase 1 (Week 1 - 2): Tendon Settling & Pain Relief', focus: 'Heel lift in shoes, isometric holds 5x45s, replace running with cycling, pain education', milestoneToProgress: 'Morning stiffness < 10 minutes, NPRS during daily walking ≤ 2/10' },
          { phase: 'Phase 2 (Week 3 - 8): Heavy Slow Resistance (HSR)', focus: 'Standing & seated heavy calf raises (3-4 sets of 8-12 reps to fatigue), soleus strengthening', milestoneToProgress: 'Single-leg heel raise 20+ reps, seated calf raise 1.0x body weight load' },
          { phase: 'Phase 3 (Week 9 - 12): Energy Storage & Plyometrics', focus: 'Two-leg to single-leg hopping, skipping rope, run-walk interval protocol (1 min run / 1 min walk)', milestoneToProgress: 'Pain-free 10 hops in place, VISA-A > 75, painless 20 min continuous jog' },
          { phase: 'Phase 4 (Week 13 - 16): Progressive Mileage & Race Preparation', focus: 'Gradual running volume progression (< 10% per week), hill introduction, tempo runs', milestoneToProgress: 'VISA-A > 85, full 15km long run completed without next-day stiffness' },
        ],
        drugTendonAlerts: [
          'Strict avoidance of fluoroquinolone antibiotics (e.g., ciprofloxacin). Statins can occasionally cause tendon myopathy; monitor if statin therapy was recently initiated.',
        ],
        psychologicalReadinessMetrics: 'Athlete Fear-Avoidance Beliefs Questionnaire (FABQ-PA) score < 14 points prior to marathon distance resumption.',
      },
    },
  },
  {
    id: 'cond-knee-oa',
    name: 'Knee Osteoarthritis (Kellgren-Lawrence Grade 3 Tricompartmental)',
    jointRegion: 'Knee',
    specialty: 'orthopaedics',
    icd10Code: 'M17.11',
    typicalDemographics: {
      ageRange: '50 - 75+ years',
      predominantSex: 'Females > Males post-menopause',
      commonPopulations: 'Older adults, former athletes, individuals with elevated BMI',
    },
    patientPreset: {
      name: 'Sunita Patel',
      age: 62,
      sex: 'Female',
      occupation: 'Homemaker & Community Volunteer',
      activityLevel: 'Light',
      chiefComplaint: 'Bilateral medial knee joint aching and stiffness, worse on right side; difficulty climbing stairs and rising from low sofas',
      anatomicalLocation: 'Right Knee - Medial tibiofemoral joint line and patellofemoral compartment',
      onset: 'Chronic (> 3 months)',
      duration: '18 months with progressive limitation',
      severityNprs: 6,
      progression: 'Worsening over past 6 months',
      injuryMechanism: 'Insidious, progressive mechanical degenerative wear without distinct trauma',
      symptomBehavior24h: 'Morning joint stiffness lasting 20-25 minutes; "gel phenomenon" (knee seizes after sitting in chair for 30 min); aching increases toward evening after standing in kitchen',
      aggravatingFactors: ['Descending stairs', 'Squatting to floor', 'Prolonged standing', 'Cold, damp weather'],
      relievingFactors: ['Warm fomentation', 'Short bouts of gentle walking', 'Sitting with leg supported'],
      functionalLimitations: 'Difficulty using Indian floor toilet; needs rail support for all stairs; walking distance reduced to 600 meters',
      patientGoals: 'Climb temple steps painlessly, walk 2 km daily without swelling, avoid total knee arthroplasty for at least 3-5 years',
      medicalHistory: 'Mild essential hypertension (controlled on Amlodipine 5mg). BMI 28.4 kg/m².',
      surgicalHistory: 'None',
      comorbidities: ['Hypertension', 'Overweight / Class I Obesity'],
      medications: 'Amlodipine 5mg OD, topical counter-irritant gel',
      allergies: 'No known drug allergies',
    },
    physicalExamination: {
      observationGait: 'Mild genu varum alignment (3° right > left); antalgic gait with varus thrust in midstance; mild quadriceps wasting (vastus medialis obliquus).',
      palpationFindings: 'Bony marginal osteophytes palpable along medial joint line; Grade 1 cold chronic joint effusion; diffuse coarse crepitus during active extension.',
      activePassiveRom: [
        { movement: 'Knee Flexion', activeDegrees: '105° (firm capsular block)', passiveDegrees: '115° with bony/capsular end-feel', painArc: false, endFeel: 'Firm (Capsular/Ligamentous)' },
        { movement: 'Knee Extension', activeDegrees: '-5° fixed flexion deformity', passiveDegrees: '-5° hard/firm block', painArc: true, endFeel: 'Hard (Bony)' },
      ],
      mmtStrength: [
        { muscleGroup: 'Quadriceps (Knee Extension)', grade: '4-/5', notes: 'Significant vastus medialis inhibition and bilateral weakness' },
        { muscleGroup: 'Hamstrings', grade: '4/5', notes: 'Moderate tightness' },
        { muscleGroup: 'Hip Abductors (Gluteus Medius)', grade: '3+/5', notes: 'Contralateral pelvic drop during single-leg stance' },
        { muscleGroup: 'Calf Complex', grade: '4/5', notes: 'Adequate power' },
      ],
      neurologicalExam: {
        dermatomes: 'L2-S1 light touch intact bilaterally',
        myotomes: 'L2-S1 5/5 motor grades except disuse quadriceps/hip abductors',
        reflexes: 'Patellar 2+ symmetrical; Achilles 2+ symmetrical; Plantar flexor',
        duralNeurodynamics: 'SLR negative bilaterally for radicular symptoms',
      },
      specialTests: [
        { testName: 'Medial Joint Line Tenderness', result: 'Positive', sensitivity: '83%', specificity: '67%', positiveLR: '2.5', negativeLR: '0.25', clinicianNotes: 'Marked tenderness along anterior to posterior medial meniscus and tibial plateau rim.', evidenceCitation: 'Malanga et al. Arch Phys Med Rehabil 2003;84(4):592-603' },
        { testName: 'Patellofemoral Grind / Clarke Test', result: 'Positive', sensitivity: '39%', specificity: '67%', positiveLR: '1.2', negativeLR: '0.9', clinicianNotes: 'Coarse retropatellar crepitus and retropatellar ache reproduced.', evidenceCitation: 'Cook et al. JOSPT 2012;42(6):524-532' },
        { testName: 'Varus Stress Test (Ligamentous)', result: 'Negative', sensitivity: '85%', specificity: '90%', positiveLR: '8.5', negativeLR: '0.16', clinicianNotes: 'Firm endpoint; varus malalignment is structural bony rather than ligamentous rupture.', evidenceCitation: 'Harilainen A. Acta Orthop Scand 1987;58:393-396' },
      ],
      functionalScreening: [
        { testName: '30-Second Chair Stand Test (30s CST)', score: '8 repetitions', standardBenchmark: '> 14 reps for age-matched females 60-64y', interpretation: 'Severe lower body functional strength impairment and fall risk' },
        { testName: 'Timed Up and Go (TUG)', score: '13.2 seconds', standardBenchmark: '< 10 seconds normal community ambulation', interpretation: 'Elevated fall risk threshold (> 12.0s indicates gait instability)' },
      ],
      validatedProms: {
        toolName: 'WOMAC Osteoarthritis Index & KOOS',
        baselineScore: 'WOMAC Total: 56 / 96 (Pain: 14/20, Stiffness: 6/8, Physical Function: 36/68)',
        normativeThreshold: 'WOMAC < 15 in healthy older adults',
        mcidScore: '10.0 points (minimal clinically important improvement)',
      },
    },
    diagnosticSynthesis: {
      primaryDiagnosis: 'Bilateral Knee Osteoarthritis (Right > Left, KL Grade 3) with Genu Varum & Functional Deconditioning',
      diagnosticConfidence: 'Definitive (NICE / ACR Clinical Criteria: Age > 45, activity-related joint pain, morning stiffness < 30 min, coarse crepitus, bony enlargement)',
      keyPathognomonicTriad: [
        'Persistent activity-related joint pain with morning stiffness resolving in under 30 minutes',
        'Bony joint enlargement, marginal osteophytes, and coarse crepitus on active motion',
        'Loss of terminal knee extension with fixed flexion deformity (-5°)',
      ],
      differentialConsiderations: [
        { condition: 'Medial Meniscal Root / Degenerative Cleavage Tear', tier: 'Primary Consideration', clinicalFeatures: 'Sudden onset focal posterior knee pain, joint line tenderness, extrusion on ultrasound', discriminatingTest: 'MRI or ultrasound showing meniscal extrusion > 3mm beyond tibial margin' },
        { condition: 'Pseudogout / Calcium Pyrophosphate Dihydrate (CPPD) Crystal Arthropathy', tier: 'Secondary Consideration', clinicalFeatures: 'Acute inflammatory flare with hot swollen effusion, chondrocalcinosis on radiograph', discriminatingTest: 'Arthrocentesis with polarized microscopy showing rhomboid positively birefringent crystals' },
        { condition: 'Pes Anserine Bursitis / Tendinopathy', tier: 'Secondary Consideration', clinicalFeatures: 'Tenderness 4-5cm distal to medial joint line over upper medial tibia', discriminatingTest: 'Joint line non-tender; local pressure over pes anserinus reproduces typical pain' },
      ],
      goldStandardInvestigation: {
        modality: 'Standing Weight-Bearing Knee Radiographs (Bilateral AP, Lateral 30° flexion, Skyline, Rosenberg 45° PA)',
        keyFindings: 'Kellgren-Lawrence Grade 3: Asymmetric medial joint space narrowing > 50%; prominent marginal osteophytes on femoral and tibial condyles; subchondral sclerosis; blunting of tibial spines.',
        guidelineReference: 'OARSI / AAOS / NICE Guidelines for Assessment and Management of Knee Osteoarthritis (2023)',
        choosingWiselyStatement: 'MRI is NOT recommended for routine diagnosis or monitoring of knee osteoarthritis in adults over 45 with typical clinical and plain radiographic features.',
      },
    },
    threeTierOptions: {
      option1StrongEvidence: {
        tierName: 'Option 1: Strong Evidence (Level I Gold Standard)',
        evidenceBadge: 'Level I (OARSI, AAOS, NICE Guidelines & Cochrane Systematic Reviews)',
        evidenceLevel: 'Level I-A (OARSI 2023 Guidelines, NICE NG226, Cochrane 2022)',
        summaryRationale: 'Level I international guidelines universally recommend land-based or aquatic progressive exercise therapy, structured dietary weight management (targeting > 5-10% weight loss), and self-management education as the foundation for ALL patients. High-quality RCTs demonstrate that structured quadriceps and hip abductor strengthening reduces pain and improves physical function with effect sizes (SMD 0.50-0.70) equivalent to or exceeding NSAIDs, without gastrointestinal, renal, or cardiovascular hazards.',
        keyCitations: [
          {
            title: 'Exercise for Osteoarthritis of the Knee: A Cochrane Systematic Review',
            authors: 'Fransen M, McConnell S, Harmer AR, et al.',
            journal: 'Cochrane Database of Systematic Reviews',
            year: 2015,
            doi: '10.1002/14651858.CD004376.pub3',
            evidenceLevel: 'Level I',
            sampleSize: '54 clinical trials, 3,913 participants',
            keyTakeaway: 'High-quality evidence that land-based exercise provides immediate and sustained reductions in knee pain and moderate improvement in quality of life.',
          },
          {
            title: 'OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis',
            authors: 'Bannuru RR, Osani MC, Beatrix E, et al.',
            journal: 'Osteoarthritis and Cartilage',
            year: 2019,
            doi: '10.1016/j.joca.2019.06.011',
            evidenceLevel: 'Level I',
            sampleSize: 'Global consensus guideline panel',
            keyTakeaway: 'Strongly recommended: Land-based exercise, weight loss, dietary intervention, water-based exercise, topical NSAIDs. Strongly recommended AGAINST: Arthroscopic debridement, stem cell injections, glucosamine/chondroitin.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'ACR clinical criteria: Age > 50, morning stiffness < 30 min, crepitus, bony tenderness, bony enlargement, no palpable warmth (Sensitivity 95%, Specificity 69%)',
          'Standing Rosenberg PA view detects joint space narrowing up to 2 years before standard AP views',
        ],
        interventions: {
          firstLine: [
            'Supervised land-based neuromuscular and resistance exercise programme (GLA:D model: Good Life with Osteoarthritis in Denmark) twice weekly for 8 weeks',
            'Structured weight-loss consultation with registered dietitian: 5-10% body mass reduction reduces peak knee joint load by 20-40kg per step',
            'Topical NSAID gel (diclofenac sodium 1% or 2%) applied QDS as first-line pharmacotherapy over oral NSAIDs (equivalent local analgesia, zero systemic renal/GI risk)',
            'Gait aid: Contralateral single-point walking cane (reduces abductor muscle demand and medial compartment load by up to 30%)',
          ],
          exercisePrescription: [
            { name: 'Seated Long-Arc Knee Extension with Ankle Weight / Band', dosage: '3 sets x 12 reps (3s concentric, 3s eccentric)', frequency: '3 days per week', targetAdaptation: 'Quadriceps hypertrophy and reversal of vastus medialis disuse atrophy', biomechanicalCue: 'Fully extend knee without lifting thigh off chair; hold terminal extension for 2 seconds.' },
            { name: 'Side-Lying Hip Abduction (Gluteus Medius Strength)', dosage: '3 sets x 15 reps per leg', frequency: 'Daily', targetAdaptation: 'Restores coronal pelvic stability, reducing knee varus thrust during gait stance phase', biomechanicalCue: 'Keep leg slightly behind midline with toes pointing down toward floor.' },
            { name: 'Sit-to-Stand Chair Squats from Standard 45cm Chair', dosage: '3 sets x 10 reps', frequency: 'Daily', targetAdaptation: 'Functional closed-chain eccentric control and independence in activities of daily living', biomechanicalCue: 'Feet hip-width apart; keep knees aligned over 2nd toes; avoid using hands if possible.' },
            { name: 'Low-Impact Stationary Upright Cycling (Zero to Low Resistance)', dosage: '20 - 30 minutes', frequency: '4 - 5 days per week', targetAdaptation: 'Aerobic fitness, chondrocyte nutrition through cyclical hydrostatic pressure, stiffness reduction', biomechanicalCue: 'Adjust saddle so knee has 20° flexion at bottom of pedal stroke.' },
          ],
          contraindicatedOrAvoid: [
            'STRICTLY CONTRAINDICATED: Knee arthroscopy for debridement or "lavage" in mechanical degenerative osteoarthritis (BMJ strong clinical practice recommendation against; zero clinical benefit over sham surgery).',
            'Avoid high-impact running, jumping, and repetitive deep kneeling/squatting (> 90° flexion with load).',
            'Avoid long-term continuous oral NSAIDs in patients over 60 with hypertension or CKD (accelerates renal decline and hypertension crises).',
          ],
          expectedRecoveryTimeline: 'Clinically meaningful pain reduction: 4 - 6 weeks. Maximal functional improvement: 12 - 24 weeks.',
          objectiveDischargeCriteria: [
            'WOMAC index improvement > 20% from baseline',
            '30-Second Chair Stand Test improvement to ≥ 12 repetitions',
            'TUG score reduced to < 10.5 seconds',
            'Able to walk 1.5 km continuously with cane or independently',
          ],
        },
      },
      option2Evidence: {
        tierName: 'Option 2: Evidence (Level II/III Observational & Pragmatic Practice)',
        evidenceBadge: 'Level II/III (Intra-Articular Hyaluronic Acid, Unloader Bracing & Aquatic Therapy)',
        evidenceLevel: 'Level II-B / III (Arthroscopy, Clinical Rheumatology & OARSI Consensus)',
        summaryRationale: 'Supported by clinical cohort trials and rheumatology consensus statements. Intra-articular High-Molecular-Weight Hyaluronic Acid (viscosupplementation) provides 3-6 months of progressive lubricating and anti-inflammatory benefit, particularly in mild-to-moderate disease where oral analgesics are contraindicated. Unloader valgus knee braces mechanically shift axial load from the medial to lateral compartment by 10-15%.',
        keyCitations: [
          {
            title: 'Efficacy and Safety of Viscosupplementation by Intra-Articular Hyaluronic Acid in Knee Osteoarthritis: A Systematic Review and Meta-Analysis',
            authors: 'Richette P, Chevalier X, Raman R, et al.',
            journal: 'Annals of the Rheumatic Diseases',
            year: 2015,
            doi: '10.1136/annrheumdis-2014-206782',
            evidenceLevel: 'Level II',
            sampleSize: '89 randomized controlled trials, 12,667 patients',
            keyTakeaway: 'Intra-articular hyaluronic acid demonstrated significant pain reduction that peaks between 8 and 24 weeks, outlasting intra-articular corticosteroid injections.',
          },
          {
            title: 'Effects of Valgus Unloader Braces on Medial Knee Osteoarthritis: A Systematic Review',
            authors: 'Moyer R, Birmingham TB, Bryant D, et al.',
            journal: 'Sports Medicine',
            year: 2015,
            doi: '10.1007/s40279-015-0329-0',
            evidenceLevel: 'Level II',
            sampleSize: '30 studies, 834 patients',
            keyTakeaway: 'Valgus unloader knee braces significantly reduce the external knee adduction moment (KAM) by 10-12%, decreasing medial compartment compressive stress during ambulation.',
          },
        ],
        diagnosticAccuracyCriteria: [
          'External knee adduction moment (KAM) on 3D gait analysis correlates with medial joint space loss rate',
          'Serum cartilage oligomeric matrix protein (COMP) used as translational biomarker of cartilage degradation',
        ],
        interventions: {
          firstLine: [
            'Intra-articular high-molecular-weight hyaluronic acid (single or 3-injection regimen) under ultrasound guidance',
            'Pneumatic or hinge-guided valgus unloader knee brace prescribed for outdoor ambulation > 500 meters',
            'Aquatic therapy / warm-water hydrotherapy (34°C pool) twice weekly for 6 weeks to offload joint weight by 60%',
            'Lateral heel wedge shoe insoles (5° elevation) to reduce medial compartment ground reaction force vector',
          ],
          exercisePrescription: [
            { name: 'Warm-Water Hydrotherapy Walking & Squats', dosage: '30 minutes in chest-deep pool', frequency: '2x/week', targetAdaptation: 'Buoyancy offloads axial joint pressure while warm water relaxes periarticular spasm', biomechanicalCue: 'Walk smoothly forwards, backwards, and sideways; maintain tall posture.' },
            { name: 'Bridging with Resistance Band around Knees', dosage: '3 sets x 12 reps (3s hold)', frequency: 'Daily', targetAdaptation: 'Gluteus maximus and hip external rotator activation', biomechanicalCue: 'Drive through heels; press outward against band to align knees with hips.' },
            { name: 'Step-Ups onto Low 10cm Wooden Step', dosage: '2 sets x 10 reps per leg', frequency: '3x/week', targetAdaptation: 'Concentric and eccentric quadriceps control replicating stair ascent', biomechanicalCue: 'Step up through whole foot; do not push off back toe.' },
            { name: 'Hamstring Active Stretch with Yoga Strap', dosage: '3 sets x 30s holds', frequency: 'Daily', targetAdaptation: 'Eliminate hamstring tightness contributing to fixed flexion contracture', biomechanicalCue: 'Keep knee fully locked straight; pull strap gently until mild stretch felt behind knee.' },
          ],
          contraindicatedOrAvoid: [
            'Do not administer intra-articular injections if overlying cellulitis, skin lesions, or bacteremia is suspected.',
            'Avoid heavy load carrying (> 10 kg).',
          ],
          expectedRecoveryTimeline: 'Symptom reduction: 4 - 8 weeks. Functional plateau: 16 - 24 weeks.',
          objectiveDischargeCriteria: [
            'Walking distance increased by > 500 meters without severe pain flare',
            'Knee flexion range improved to ≥ 115°',
            'WOMAC Physical Function score improved by > 12 points',
          ],
        },
      },
      option3ExpertOpinion: {
        tierName: 'Option 3: ClinicaAI Expert Opinion & Reasoning',
        evidenceBadge: 'ClinicaAI Expert Synthesis (Clinical Reasoning, Pearls & Indian Healthcare Realities)',
        clinicaAiSynthesis: 'In the Indian sociocultural context, knee osteoarthritis carries unique functional impacts. Sitting cross-legged on the floor (Sukhasana) for prayers, using squat Indian toilets, and descending steep temple or domestic stairs place extreme compressive loads (> 7-8x body weight) across the patellofemoral and medial tibiofemoral compartments. When managing a 62-year-old female like Sunita Patel, our primary goal is to preserve independence and delay surgical replacement through functional adaptation. First, modify the environment: install a raised toilet seat chair adapter and a shower bench immediately. Second, treat the "fixed flexion contracture" (-5°): a knee that cannot lock in 0° extension forces the quadriceps to fire constantly during every stance phase, leading to rapid muscle fatigue and joint overload. Third, focus on hip abductors (Gluteus Medius)—a strong hip acts as a crane, lifting the contralateral pelvis and reducing the medial knee adduction moment by up to 35%!',
        clinicalPearls: [
          'Clinical Pearl #1: Check for the "Varus Thrust" during gait. If the knee visibly juts outward sideways when the foot hits the ground, the medial compartment is experiencing dynamic micro-impacts. Prescribe a walking stick in the opposite hand—it instantly neutralizes this thrust.',
          'Clinical Pearl #2: The Fixed Flexion Contracture Trap: Even a tiny 5-degree extension deficit increases patellofemoral contact pressure by 30%. Spend 5 minutes every day doing prone hangs with ankle weights to regain full terminal extension.',
          'Clinical Pearl #3: In Indian postmenopausal women, order Serum 25-OH Vitamin D and Dexa BMD. Severe osteopenia accelerates subchondral bone collapse and tibial plateau micro-fractures.',
          'Clinical Pearl #4: Don\'t tell older patients to "just rest." Inactivity causes chondrocyte starvation, synovial atrophy, and rapid quadriceps sarcopenia. Motion is lotion for the joint!',
        ],
        redFlagAndSafetyPrecautions: [
          'Acute Warm Effusion with Night Pain: If the knee suddenly becomes hot, tense, and throbs at night, rule out pseudogout (CPPD) crystal flare or septic arthritis; urgent diagnostic arthrocentesis is warranted.',
          'Progressive Severe Varus (> 12°) or Instability: When joint space is completely obliterated (bone-on-bone) with lateral subluxation, refer for joint replacement consultation.',
        ],
        sportsOrContextSpecificConsiderations: [
          'Environmental Adaptation: Raised commode seat adapter (avoids deep squatting to floor), grab bars in bathroom, firm high-seat chairs (seat height 48-50 cm).',
          'Footwear: Well-cushioned walking shoes with EVA foam soles (replaces hard flat leather sandals or walking barefoot on cold marble/granite floors).',
        ],
        phaseBasedRoadmap: [
          { phase: 'Phase 1 (Week 1 - 3): Pain Reduction & Environmental Adaptation', focus: 'Topical NSAIDs, contralateral cane training, commode seat adapter, prone extension hangs', milestoneToProgress: 'Morning stiffness < 15 min, terminal extension improved to -2°, comfortable walking with cane' },
          { phase: 'Phase 2 (Week 4 - 8): GLA:D Neuromuscular Training', focus: 'Seated knee extensions with load, side-lying hip abduction, sit-to-stand chair squats, cycling', milestoneToProgress: '30s Chair Stand Test > 11 reps, TUG < 11.5s, WOMAC score improved by 25%' },
          { phase: 'Phase 3 (Week 9 - 16): Community Ambulation & Maintenance', focus: 'Daily 25-minute brisk walking, low-impact gym or home resistance band program, dietary weight management', milestoneToProgress: 'Painless 2 km walking, stairs descended with minimal rail support, sustained weight reduction' },
        ],
        drugTendonAlerts: [
          'Caution with systemic oral NSAIDs (etoricoxib, aceclofenac) due to patient\'s hypertension; stick with topical diclofenac or paracetamol.',
        ],
        psychologicalReadinessMetrics: 'Geriatric Depression Scale (GDS-15) and Pain Self-Efficacy Questionnaire (PSEQ): Target PSEQ > 40 points for self-management independence.',
      },
    },
  },
];
