import { ProbableConditionDetail } from '../types/doctorPatient';

export const PROBABLE_CONDITIONS_LIBRARY: ProbableConditionDetail[] = [
  // =========================================================================
  // 1. TIBIAL SHAFT FRACTURE
  // =========================================================================
  {
    id: 'cond-tibial-shaft-fracture',
    conditionName: 'Tibial Shaft Fracture',
    synonyms: ['Fracture Shaft of Tibia', 'Diaphyseal Tibial Fracture', 'Post-IM Nailing Tibia', 'Post-Casting Tibia'],
    anatomicalRegion: 'Lower Leg / Leg Complex (Tibia & Fibula)',
    relevantSpecialty: 'Orthopaedics & Musculoskeletal Physiotherapy',
    clinicalPresentation:
      'Presents with persistent limping during walking, reduced weight-bearing tolerance, ankle and knee stiffness post-immobilisation or post-intramedullary nailing/plating. Pain with prolonged ambulation, calf muscle atrophy (gastrocnemius/soleus), and residual anterior compartment tightness.',
    subjectiveAssessment: [
      'Mechanism of injury (high-energy RTA, direct impact, twist fall) and date of fracture/fixation',
      'Type of management: Closed casting, Intramedullary (IM) interlocking nail, or Open Reduction Internal Fixation (ORIF) with plate',
      'Current weight-bearing status advised by treating orthopaedic surgeon (Non-WB, Touchdown-WB, Partial-WB 50%, Full-WB)',
      'Site and nature of pain (anterior shin throbbing, anterior knee pain at nail entry site, distal syndesmotic tenderness)',
      'Symptom behavior: Morning stiffness, pain aggravation after 100-200 meters walking, night aching',
      'Sensation changes over dorsum of foot (superficial peroneal nerve) or first webspace (deep peroneal nerve)',
    ],
    objectiveAssessment: [
      'Surgical scar inspection (suprapatellar/infrapatellar IM nail scars, anterolateral plating scar, cast dermatitis)',
      'Circumferential girth measurement: Mid-calf atrophy compared to contralateral limb (often 1.5 - 3.0 cm loss)',
      'Swelling/edema assessment: Figure-of-eight ankle measurement and mid-shaft pitting edema',
      'Local palpation: Tenderness along fracture callus line, syndesmosis, fibular head, and patellar tendon insertion',
      'Active & passive range of motion of knee joint, ankle talocrural joint, and subtalar joint',
      'Deep vein thrombosis (DVT) clinical screening (Wells Score, calf tenderness, warmth, unilateral pitting edema)',
      'Compartment syndrome surveillance: Pain out of proportion on passive toe extension, tightness, paresthesia',
    ],
    romExpectations: [
      {
        movement: 'Ankle Dorsiflexion (Knee Extended)',
        normal: '0° to 20°',
        expectedRestriction: 'Often limited to -5° to +5° due to gastrocnemius/soleus shortening & capsular tightness',
        rehabGoal: 'Achieve >= 15° weight-bearing lunge dorsiflexion (Knee-to-Wall Test >= 10 cm)',
      },
      {
        movement: 'Ankle Plantarflexion',
        normal: '0° to 50°',
        expectedRestriction: 'Restricted to 25° - 35° post-cast/boot immobilisation',
        rehabGoal: 'Restore full symmetric 45° - 50° for normal toe-off push phase',
      },
      {
        movement: 'Knee Flexion',
        normal: '0° to 135° - 140°',
        expectedRestriction: 'May be restricted to 100° - 110° if infrapatellar IM nailing approach caused anterior scarring',
        rehabGoal: 'Full symmetric knee flexion >= 135° without patellofemoral catching',
      },
      {
        movement: 'Subtalar Eversion / Inversion',
        normal: 'Eversion 15°, Inversion 30°',
        expectedRestriction: 'Loss of 30-50% excursion after prolonged non-weightbearing',
        rehabGoal: 'Restore multi-axial foot adaptation for uneven Indian rural ground surfaces',
      },
    ],
    mmtStrengthAssessment: [
      {
        muscleGroup: 'Triceps Surae (Gastrocnemius & Soleus)',
        nerveRoot: 'Tibial Nerve (S1-S2)',
        typicalImpairment: 'Grade 3/5 or 3+/5 (unable to complete single-leg heel raise to full height)',
        targetMilestone: 'Grade 5/5: >= 25 consecutive single-leg heel raises with symmetric height',
      },
      {
        muscleGroup: 'Tibialis Anterior',
        nerveRoot: 'Deep Peroneal Nerve (L4-L5)',
        typicalImpairment: 'Grade 4-/5 (reduced eccentric control during heel strike, foot slap tendency)',
        targetMilestone: 'Grade 5/5: Resisted dorsiflexion against maximal manual resistance',
      },
      {
        muscleGroup: 'Quadriceps Femoris',
        nerveRoot: 'Femoral Nerve (L2-L4)',
        typicalImpairment: 'Grade 4/5 (disuse atrophy and arthrogenic knee inhibition post-nailing)',
        targetMilestone: 'Grade 5/5: Full isometric and dynamic quadriceps control without extensor lag',
      },
      {
        muscleGroup: 'Peroneus Longus & Brevis',
        nerveRoot: 'Superficial Peroneal Nerve (L5-S1)',
        typicalImpairment: 'Grade 3+/5 (compromised lateral ankle stabilization during stance)',
        targetMilestone: 'Grade 5/5: Resisted eversion with stable medial longitudinal arch',
      },
    ],
    flexibilityAndMobility: [
      'Gastrocnemius and soleus myofascial restriction (tendon Achilles tightness)',
      'Hamstrings and posterior chain tightness due to prolonged antalgic guarding',
      'Distal tibiofibular syndesmotic joint hypomobility',
      'Talocrural posterior glide restriction preventing forward tibia advancement in stance',
    ],
    functionalMobilityTransfers: [
      {
        testName: '30-Second Chair Stand Test',
        clinicalNorm: '14 - 19 repetitions (age 20-59)',
        expectedPatientPerformance: '8 - 12 repetitions with asymmetric weight shift to uninjured limb',
        progressionBenchmark: '>= 15 repetitions with 50-50 symmetric bilateral foot force distribution',
      },
      {
        testName: 'Timed Up and Go (TUG)',
        clinicalNorm: '< 10 seconds for independent healthy adults',
        expectedPatientPerformance: '12 - 16 seconds with antalgic hesitation during turn phase',
        progressionBenchmark: '< 9 seconds with smooth deceleration and turning',
      },
      {
        testName: 'Stair Ascent & Descent',
        clinicalNorm: 'Reciprocal step-over-step ascent and descent without handrail support',
        expectedPatientPerformance: 'Step-to pattern going down stairs (leading with affected leg cautiously)',
        progressionBenchmark: 'Reciprocal step-over-step descent with stable eccentric quadriceps and calf control',
      },
    ],
    gaitAnalysis: {
      typicalPattern:
        'Antalgic gait with shortened stance phase on injured side, reduced push-off at terminal stance (absent heel rise), stiff-knee contact to avoid shock absorption, and compensatory pelvic elevation/trunk lean.',
      compensatoryMechanisms: [
        'Lack of ankle push-off compensated by increased hip pull-off using hip flexors (iliopsoas)',
        'External rotation of foot (out-toeing) to bypass stiff talocrural joint during mid-to-terminal stance',
        'Reduced knee flexion during early stance shock absorption, transmitting force to hip and lumbar spine',
      ],
      gaitTrainingFocus:
        'Auditory-cued metronome gait training, parallel bar heel-to-toe rolling drills, mirror biofeedback for symmetric stance time, and gradual weaning of assistive cane/crutch once radiographic union and pain allow.',
    },
    balanceTesting: [
      {
        testName: 'Single-Leg Stance Test (Eyes Open)',
        cutOffRisk: '< 20 seconds indicates significant fall/re-injury risk',
        balanceProtocol: 'Progress from parallel bar double-leg tandem stance to eyes-open single-leg hold > 30s',
      },
      {
        testName: 'Y-Balance / Star Excursion Balance Test (SEBT)',
        cutOffRisk: 'Anterior reach difference > 4 cm indicates ankle dorsiflexion deficiency',
        balanceProtocol: 'Restore anterior, posteromedial, and posterolateral reach within 95% of contralateral limb',
      },
    ],
    specialTests: [
      {
        testName: 'Radiographic Union / Clinical Union Stress Test',
        targetStructure: 'Tibia fracture site',
        diagnosticAccuracy: 'High clinical correlation when combined with orthogonal X-rays',
        procedure: 'Gentle anteroposterior and mediolateral manual stress across fracture site; absence of tenderness and gross motion confirms stable union.',
      },
      {
        testName: 'Weight-Bearing Lunge Test (Knee-to-Wall)',
        targetStructure: 'Talocrural joint posterior glide & gastrocnemius length',
        diagnosticAccuracy: 'Inter-rater reliability ICC = 0.98',
        procedure: 'Patient lunges forward with foot perpendicular to wall; measure maximum toe-to-wall distance maintaining heel contact.',
      },
      {
        testName: 'Tinel Sign over Peroneal Nerves',
        targetStructure: 'Common, Deep, and Superficial Peroneal Nerves',
        diagnosticAccuracy: 'Sensitivity 60%, Specificity 85%',
        procedure: 'Percussion over fibular neck and anterior ankle joint line; radiating tingling indicates nerve entrapment or irritation.',
      },
    ],
    outcomeMeasures: [
      {
        toolName: 'Lower Extremity Functional Scale (LEFS)',
        mcid: '9 points',
        targetScore: '>= 68/80 (High functional recovery)',
        description: '20-item patient-reported instrument assessing everyday mobility, running, and work activities.',
      },
      {
        toolName: 'Numerical Pain Rating Scale (NPRS) on Ambulation',
        mcid: '2.0 points',
        targetScore: '<= 2/10 during 15-minute continuous walk',
        description: 'Measures pain severity during functional weight-bearing.',
      },
    ],
    physiotherapyGoals: {
      acutePhase: [
        'Protect fracture fixation / alignment according to surgeon instructions',
        'Eliminate distal dependent edema with elevation, retrograde massage, and active toe curls',
        'Maintain knee extension and full passive ankle plantar/dorsiflexion within pain limits',
        'Isometric quadriceps, hamstrings, and gluteal contractions to prevent reflex arthrogenic inhibition',
      ],
      subacutePhase: [
        'Progress weight-bearing per radiographic bridging callus verification (from partial to full weight-bearing)',
        'Restore talocrural dorsiflexion to >= 10° with posterior talar mobilization and gastrocs-soleus stretching',
        'Initiate closed-kinetic chain leg press, mini-squats (0-45°), and seated bilateral heel raises',
        'Normalize heel-to-toe gait mechanics in parallel bars without antalgic trunk lean',
      ],
      functionalPhase: [
        'Full unassisted community ambulation without limp or walking aid',
        'Achieve >= 20 repetitions single-leg heel raises on injured extremity',
        'Single-leg balance >= 30 seconds on firm surface, progressing to foam pad and wobble board',
        'Progressive resistance training: full squats, Romanian deadlifts, step-ups, and step-downs',
      ],
      returnToActivityPhase: [
        'Impact loading: bilateral hopping progressing to single-leg hop tests (Limb Symmetry Index >= 90%)',
        'Return to heavy occupational labor or sport-specific drills (cricket running between wickets, farming terrains)',
      ],
    },
    rehabilitationConsiderations: {
      weightBearingProtocol:
        'Strictly governed by orthopaedic surgeon and X-ray bridging callus. IM nailing allows earlier progressive weight-bearing (typically partial WB at 2-4 weeks, full WB at 6-8 weeks if callus visible). Plating requires protected partial WB until solid bridging.',
      romMilestones:
        'Knee 0-120° by Week 4; Ankle dorsiflexion neutral (0°) by Week 3, >= 15° by Week 8-10.',
      quadricepsActivationProtocol:
        'Straight Leg Raise without extensor lag by Day 7-10 post-op; progressive eccentric quadriceps control on 15 cm step-down by Week 8.',
      precautionFlags: [
        'Monitor for signs of deep infection (draining sinuses, fever, localized erythema)',
        'Screen for delayed union / non-union if persistent tenderness and motion at 16 weeks post-injury',
        'Watch for stress reaction or hardware irritation over anterior proximal tibial nail entry site',
      ],
      contraindications: [
        'No aggressive rotational or high-impact torque exercises prior to verified radiographic 3-cortex bridging callus',
        'Do not force passive forced end-range dorsiflexion if syndesmotic screw is in place (wait until syndesmotic status resolved)',
      ],
    },
    evidenceRating: {
      level: 'Strong Evidence',
      sources: [
        'OTA (Orthopaedic Trauma Association) Evidence-Based Guideline on Tibial Shaft Fractures (2022)',
        'Cochrane Database Syst Rev: Interventions for treating tibial shaft fractures in adults',
        'JOSPT Clinical Guidelines for Rehabilitation Following Lower Extremity Trauma',
      ],
    },
  },

  // =========================================================================
  // 2. FEMUR FRACTURE
  // =========================================================================
  {
    id: 'cond-femur-fracture',
    conditionName: 'Femur Fracture',
    synonyms: ['Fracture Shaft of Femur', 'Subtrochanteric Femur Fracture', 'Distal Femur Fracture', 'Post-IM Nailing Femur', 'Femur Nonunion/Malunion Limp'],
    anatomicalRegion: 'Thigh / Hip / Knee Axis',
    relevantSpecialty: 'Orthopaedics & Musculoskeletal Physiotherapy',
    clinicalPresentation:
      'Long-standing or subacute post-fracture presentation with persistent limping (even years after trauma), abductor weakness (Trendelenburg gait), limb length discrepancy (true or apparent), quadriceps wasting, knee extension lag, and difficulty negotiating stairs or rising from low surfaces.',
    subjectiveAssessment: [
      'Original date of injury, mechanism (high-speed vehicular trauma, fall from height), and primary surgical intervention',
      'Presence of remaining orthopaedic hardware (intramedullary nail, dynamic condylar screw, locking plate)',
      'History of union: solid bony union vs delayed union vs malunion with angulation / shortening',
      'Location of daily discomfort: Greater trochanteric pain (hardware bursitis), anterior thigh aching, or knee stiffness',
      'Functional complaints: Severe fatigue after 15 minutes of walking, inability to carry loads, uneven shoe wear',
      'History of revision surgeries, bone grafting, or past surgical site infection',
    ],
    objectiveAssessment: [
      'True and apparent limb length measurement (ASIS to medial malleolus; Umbilicus to medial malleolus)',
      'Gait observation: Positive Trendelenburg sign (pelvic drop on contralateral side), lurching gait, hip circumduction',
      'Thigh circumference: 10 cm and 15 cm superior to superior patellar pole (frequently > 3 cm quadriceps atrophy)',
      'Hip and knee passive/active range of motion: Hip abduction, extension, internal/external rotation; Knee flexion/extension',
      'Manual muscle testing: Gluteus medius, Gluteus maximus, Quadriceps, Hamstrings, Hip Adductors',
      'Palpation: Greater trochanter tenderness, distal ITB friction, distal hardware prominence over lateral femoral condyle',
    ],
    romExpectations: [
      {
        movement: 'Hip Abduction',
        normal: '0° to 45°',
        expectedRestriction: 'Often restricted to 20° - 25° due to abductor contracture and trochanteric scarring',
        rehabGoal: 'Restore >= 35° active abduction without pelvic hiking compensation',
      },
      {
        movement: 'Hip Extension',
        normal: '0° to 15° - 20°',
        expectedRestriction: 'Loss of terminal extension (fixed flexion deformity 5° - 10°)',
        rehabGoal: 'Full neutral (0°) to 10° extension for symmetric terminal stance trailing limb posture',
      },
      {
        movement: 'Knee Flexion',
        normal: '0° to 135°',
        expectedRestriction: 'Post-distal femoral plating often causes quadriceps adhesion restricting flexion to 90° - 100°',
        rehabGoal: 'Achieve >= 120° functional knee flexion for squatting and cycling',
      },
    ],
    mmtStrengthAssessment: [
      {
        muscleGroup: 'Gluteus Medius (Hip Abductors)',
        nerveRoot: 'Superior Gluteal Nerve (L4-S1)',
        typicalImpairment: 'Grade 3/5 or 3+/5 (primary driver of persistent Trendelenburg limp)',
        targetMilestone: 'Grade 5/5: Stable pelvis during 30-second single-leg stance without trunk lean',
      },
      {
        muscleGroup: 'Quadriceps Femoris (Vastus Medialis & Lateralis)',
        nerveRoot: 'Femoral Nerve (L2-L4)',
        typicalImpairment: 'Grade 3+/5 to 4-/5 with measurable extensor lag on seated knee extension',
        targetMilestone: 'Grade 5/5: Zero extensor lag, symmetric closed-kinetic-chain leg press power',
      },
      {
        muscleGroup: 'Gluteus Maximus (Hip Extensors)',
        nerveRoot: 'Inferior Gluteal Nerve (L5-S2)',
        typicalImpairment: 'Grade 3+/5 (impaired propulsion during sit-to-stand and stair climbing)',
        targetMilestone: 'Grade 5/5: Resisted prone hip extension with flexed knee',
      },
    ],
    flexibilityAndMobility: [
      'Iliotibial band (ITB) and Tensor Fasciae Latae (TFL) contracture (positive Ober test)',
      'Rectus femoris and iliopsoas tightness (positive Thomas test)',
      'Suprapatellar pouch scarring limiting patellar inferior glide during knee flexion',
    ],
    functionalMobilityTransfers: [
      {
        testName: '30-Second Sit-to-Stand Test',
        clinicalNorm: '12 - 17 repetitions (adult population)',
        expectedPatientPerformance: '6 - 9 repetitions with heavy reliance on arm push-off and contralateral limb loading',
        progressionBenchmark: '>= 14 repetitions without arm support and symmetric weight distribution',
      },
      {
        testName: 'Timed Up and Go (TUG)',
        clinicalNorm: '< 10 seconds',
        expectedPatientPerformance: '14 - 18 seconds with prominent lurching gait during turns',
        progressionBenchmark: '< 10 seconds with fluid pelvic stability',
      },
      {
        testName: 'Stair Negotiation (Up & Down 10 Steps)',
        clinicalNorm: 'Reciprocal descent without handrail in < 6 seconds',
        expectedPatientPerformance: 'Unilateral step-by-step gait holding rail with both hands',
        progressionBenchmark: 'Reciprocal stair ascent and descent with minimal single-hand rail touch',
      },
    ],
    gaitAnalysis: {
      typicalPattern:
        'Compensated Trendelenburg gait (Duchenne limp) where patient lateral bends trunk toward the affected side during stance phase to center center-of-mass over the hip and reduce demand on weak gluteus medius. Associated with external rotation and stiff knee.',
      compensatoryMechanisms: [
        'Lateral trunk lean over ipsilateral hip during stance to reduce abductor muscle torque requirements',
        'Pelvic hiking and circumduction during swing phase to clear limb in cases of mild limb length discrepancy',
        'Decreased stance time and absent terminal hip extension on affected side',
      ],
      gaitTrainingFocus:
        'Pelvic stability biofeedback in front of full-length mirror, progressive resisted side-stepping with elastic mini-bands, heel-lift trial if true discrepancy > 1.5 cm, and canes used in contralateral hand to offload hip abductors.',
    },
    balanceTesting: [
      {
        testName: 'Trendelenburg Single-Leg Stance Test',
        cutOffRisk: 'Pelvic drop on contralateral side within 30 seconds indicates abductor incompetence',
        balanceProtocol: 'Progress from supported standing hip abduction to unsupported single-leg balance > 30s',
      },
      {
        testName: 'Berg Balance Scale (BBS)',
        cutOffRisk: '< 45/56 indicates high fall risk',
        balanceProtocol: 'Target BBS score >= 52/56 with confident transfers',
      },
    ],
    specialTests: [
      {
        testName: 'Trendelenburg Test',
        targetStructure: 'Gluteus Medius / Superior Gluteal Nerve function',
        diagnosticAccuracy: 'High diagnostic utility for abductor deficiency',
        procedure: 'Patient stands on affected leg for 30 seconds; clinician observes iliac crest level. A contralateral drop denotes positive test.',
      },
      {
        testName: 'Thomas Test for Hip Flexion Contracture',
        targetStructure: 'Iliopsoas & Rectus Femoris muscle length',
        diagnosticAccuracy: 'Standardized clinical flexibility assessment',
        procedure: 'Supine patient flexes contralateral hip to chest; observe whether tested thigh remains flat on table (0°).',
      },
      {
        testName: 'Ober Test',
        targetStructure: 'Iliotibial Band & TFL tightness',
        diagnosticAccuracy: 'Clinical standard for lateral thigh tightness',
        procedure: 'Side-lying, stabilize pelvis, abduct and extend hip, then lower thigh toward table; inability to adduct past horizontal indicates tightness.',
      },
    ],
    outcomeMeasures: [
      {
        toolName: 'Harris Hip Score (HHS)',
        mcid: '8 points',
        targetScore: '>= 85/100 (Good to Excellent)',
        description: 'Comprehensive clinician-administered measure of hip pain, function, absence of deformity, and range of motion.',
      },
      {
        toolName: 'Lower Extremity Functional Scale (LEFS)',
        mcid: '9 points',
        targetScore: '>= 65/80',
        description: 'Assesses self-reported functional capacity across daily life, work, and recreational activities.',
      },
    ],
    physiotherapyGoals: {
      acutePhase: [
        'Post-fixation protection, active-assisted knee and hip motion, deep breathing, and DVT prophylaxis',
        'Quadriceps setting and isometric gluteal contractions to counteract disuse atrophy',
      ],
      subacutePhase: [
        'Progress weight-bearing according to radiographic consolidation',
        'Intensive gluteus medius rehabilitation: side-lying clamshells, side-lying abduction, bridging',
        'Quadriceps strengthening through terminal knee extensions (0-30°) and closed-kinetic chain squats',
      ],
      functionalPhase: [
        'Elimination of Trendelenburg limp through progressive lateral band walks and single-leg Romanian deadlifts',
        'Normalize 30s Sit-to-Stand and TUG performance; reciprocal stair descent',
        'Community ambulation without walking aids or compensatory trunk lurch',
      ],
      returnToActivityPhase: [
        'Endurance walking (> 2-3 km continuous), loaded carries, and occupational lifting capacity',
      ],
    },
    rehabilitationConsiderations: {
      weightBearingProtocol:
        'If chronic/persistent limp years after fracture, full weight-bearing is allowed unless hardware failure or nonunion is suspected. If acute post-op, follow surgeon protocol based on nail/plate stability.',
      romMilestones:
        'Hip abduction >= 35°, Hip extension >= 10°, Knee flexion >= 120°.',
      quadricepsActivationProtocol:
        'Eccentric quadriceps training to restore stair descent deceleration and avoid patellofemoral overload.',
      precautionFlags: [
        'Rule out non-union or implant fatigue failure if patient has persistent groin or mid-thigh sharp pain with weight-bearing',
        'Evaluate true vs apparent leg length discrepancy with pelvic radiograph or block test before ordering shoe lifts',
      ],
      contraindications: [
        'Avoid high-impact plyometrics if angular malunion or marked joint incongruity exists',
      ],
    },
    evidenceRating: {
      level: 'Strong Evidence',
      sources: [
        'AAOS Clinical Practice Guideline on Femoral Shaft Fractures in Adults',
        'JOSPT Guidelines on Hip Muscle Weakness and Gait Alterations in Orthopaedic Trauma',
        'Cochrane Database Syst Rev: Interventions for treating femoral shaft fractures',
      ],
    },
  },

  // =========================================================================
  // 3. POST-OPERATIVE TOTAL KNEE REPLACEMENT (TKR)
  // =========================================================================
  {
    id: 'cond-post-op-tkr',
    conditionName: 'Post-operative Total Knee Replacement (TKR)',
    synonyms: ['Total Knee Arthroplasty (TKA)', 'Post-TKR Rehabilitation', 'Bilateral / Unilateral TKR', 'Knee Arthroplasty Stiff Knee'],
    anatomicalRegion: 'Knee Joint Complex',
    relevantSpecialty: 'Orthopaedics, Geriatrics & Musculoskeletal Physiotherapy',
    clinicalPresentation:
      'Classic post-operative presentation characterized by pain during knee bending, extension lag, persistent antalgic limping gait associated with habitual pre-operative osteoarthritis patterns, and marked difficulty in sit-to-stand transfers from low chairs or toilet seats. Joint warmth, residual peri-incisional numbness, and hamstring tightness are frequent.',
    subjectiveAssessment: [
      'Post-operative timeline (Days 1-14 acute, Weeks 2-6 subacute, Weeks 6-12 functional, > 3 months late)',
      'Implant details: Cruciate-retaining (CR) vs Posterior-stabilized (PS), cemented vs uncemented, patellar resurfacing performed or unresurfaced',
      'Nature of pain: Anterior tightness during terminal flexion, retropatellar pressure, or nocturnal aching',
      'Pre-operative deformity: Longstanding severe varus or valgus deformity that contributed to muscle imbalance',
      'Functional transfer complaints: Struggle to rise from low Indian beds, sofa, or toilet; needing arm leverage; fear of bending knee',
      'Medication use: Analgesics, anticoagulation (apixaban/enoxaparin), anti-inflammatory usage',
    ],
    objectiveAssessment: [
      'Surgical wound healing: Anterior midline scar inspection, suture/staple status, warmth, signs of superficial infection',
      'Knee joint effusion: Stroke test or suprapatellar ballottement test (Grade 0 to 3+)',
      'Active and passive knee range of motion measured with long-arm goniometer in supine and seated positions',
      'Extensor lag measurement: Inability to actively maintain full passive extension during straight leg raise',
      'Patellar mobility: Superior, inferior, medial, and lateral glide mobility (crucial to prevent arthrofibrosis)',
      'Quadriceps activation: Voluntary isometric contraction force, vastus medialis obliquus (VMO) firing latency',
      'Gait analysis: Stiff-knee gait (reduced swing-phase knee flexion < 60°), foot external rotation, trunk sway',
      'Functional tests: 30-Second Chair Stand, Timed Up and Go (TUG), Stair climbing ability',
    ],
    romExpectations: [
      {
        movement: 'Knee Extension',
        normal: '0° to +5° hyperextension',
        expectedRestriction: 'Fixed flexion deformity of 5° - 15° common in early post-op; major risk factor for gait limp',
        rehabGoal: 'Achieve true 0° full passive and active extension by Week 2-4 (Non-negotiable priority)',
      },
      {
        movement: 'Knee Flexion',
        normal: '135° - 140°',
        expectedRestriction: 'Often restricted to 70° - 85° in first 2 weeks due to capsular edema and quadriceps tightness',
        rehabGoal: '>= 90° by Week 2; >= 105°-110° by Week 6; >= 115°-120° by Week 12 for easy sit-to-stand and stair descent',
      },
      {
        movement: 'Patellar Mobility',
        normal: '50% patellar width excursion medially and laterally',
        expectedRestriction: 'Hypomobile inferior and medial glides secondary to parapatellar arthrotomy scar',
        rehabGoal: 'Restore full pain-free multi-directional patellar excursion',
      },
    ],
    mmtStrengthAssessment: [
      {
        muscleGroup: 'Quadriceps Femoris (Extensor Mechanism)',
        nerveRoot: 'Femoral Nerve (L2-L4)',
        typicalImpairment: 'Grade 3/5 with prominent extensor lag due to arthrogenic muscle inhibition (AMI)',
        targetMilestone: 'Grade 5/5: Active straight leg raise with 0° lag, strong closed-chain knee extension',
      },
      {
        muscleGroup: 'Hamstrings (Biceps Femoris / Semitendinosus / Semimembranosus)',
        nerveRoot: 'Sciatic Nerve (L5-S2)',
        typicalImpairment: 'Grade 3+/5, often hypertonic with active protective spasm limiting full extension',
        targetMilestone: 'Grade 5/5: Symmetric resisted prone knee flexion through full range',
      },
      {
        muscleGroup: 'Hip Abductors (Gluteus Medius)',
        nerveRoot: 'Superior Gluteal Nerve (L4-S1)',
        typicalImpairment: 'Grade 3+/5 due to long-term pre-arthritic disuse, causing persistent pelvic instability in stance',
        targetMilestone: 'Grade 5/5: Symmetric standing abductor control without lateral trunk compensation',
      },
      {
        muscleGroup: 'Triceps Surae (Gastrocnemius/Soleus)',
        nerveRoot: 'Tibial Nerve (S1-S2)',
        typicalImpairment: 'Grade 4-/5 with shortened achilles complex',
        targetMilestone: 'Grade 5/5: Bilateral and single-leg heel raises without pain',
      },
    ],
    flexibilityAndMobility: [
      'Hamstring tightness limiting terminal extension (popliteal angle < 70°)',
      'Gastrocnemius restriction pulling knee into flexion in weight-bearing',
      'Anterior capsule and quadriceps tendon tension during knee flexion past 90°',
      'Iliotibial band tension over lateral retinaculum',
    ],
    functionalMobilityTransfers: [
      {
        testName: '30-Second Sit-to-Stand (STS) Test',
        clinicalNorm: '10 - 15 repetitions (older adults 65-79 years)',
        expectedPatientPerformance: '4 - 7 repetitions; excessive forward trunk lean, pushing with hands on armrests, knee valgus collapse',
        progressionBenchmark: '>= 12 repetitions from 45 cm standard seat without arm support and symmetric knee alignment',
      },
      {
        testName: 'Timed Up and Go (TUG)',
        clinicalNorm: '< 10 seconds (normal mobility)',
        expectedPatientPerformance: '15 - 22 seconds in early post-op; hesitant turning and slow sit-to-stand transition',
        progressionBenchmark: '< 11 seconds with steady gait and balanced turns',
      },
      {
        testName: 'Stair Ascent & Descent Test',
        clinicalNorm: 'Reciprocal step-over-step ascent and descent',
        expectedPatientPerformance: 'Step-to pattern holding rail with both hands; difficulty leading with operated leg going down',
        progressionBenchmark: 'Reciprocal ascent and descent with light handrail touch',
      },
    ],
    gaitAnalysis: {
      typicalPattern:
        'Stiff-knee gait (quadriceps-avoidance pattern): reduced knee flexion during swing phase causing hip hiking or circumduction; lack of heel strike with flat-foot contact; residual antalgic limp carrying over pre-operative arthritic gait habits.',
      compensatoryMechanisms: [
        'Vaulting on contralateral foot or hip hiking on operated side to clear toes during swing phase due to stiff knee flexion (< 60°)',
        'Extensor thrust / hyperextension snap in midstance to lock knee without utilizing quadriceps',
        'Persistent trunk lurch toward unaffected side to unload surgical knee during stance phase',
      ],
      gaitTrainingFocus:
        'Auditory rhythm cues, mirror biofeedback for equal stance phase time, high-knee stepping drills over obstacles, backward walking on treadmill (improves knee extension and quadriceps firing), and weaning from walker to cane to unassisted.',
    },
    balanceTesting: [
      {
        testName: 'Berg Balance Scale (BBS)',
        cutOffRisk: '< 45/56 indicates significant fall risk',
        balanceProtocol: 'Target BBS score >= 50/56 by Week 6-8',
      },
      {
        testName: 'Single-Leg Stance Test',
        cutOffRisk: '< 10 seconds indicates impaired static balance in geriatric population',
        balanceProtocol: 'Progress from double-leg weight shifting to 15-20s single-leg stance on operated knee',
      },
    ],
    specialTests: [
      {
        testName: 'Extension Lag Test (Active vs Passive Extension)',
        targetStructure: 'Quadriceps extensor mechanism & arthrogenic inhibition',
        diagnosticAccuracy: 'Standard post-arthroplasty clinical metric',
        procedure: 'Clinician elevates heel with knee fully extended passively (0°). Patient is asked to hold knee straight as clinician releases support; angle dropped represents extensor lag.',
      },
      {
        testName: 'Patellar Mobility Gliding Test',
        targetStructure: 'Medial and Lateral Retinacula & Patellofemoral Joint',
        diagnosticAccuracy: 'Essential to detect arthrofibrosis risk early',
        procedure: 'Knee in 20-30° flexion on small roll; gently displace patella superiorly, inferiorly, medially, and laterally. Firm restriction requires immediate mobilization.',
      },
      {
        testName: 'Stroke Test / Bulge Sign for Joint Effusion',
        targetStructure: 'Intra-articular effusion',
        diagnosticAccuracy: 'Sensitivity 80%, Specificity 90%',
        procedure: 'Stroke medial knee upward 2-3 times, then sweep lateral knee downward; fluid wave on medial side indicates effusion.',
      },
    ],
    outcomeMeasures: [
      {
        toolName: 'Knee Injury and Osteoarthritis Outcome Score (KOOS / KOOS-JR)',
        mcid: '8 - 10 points',
        targetScore: '>= 75/100 by Month 3; >= 85/100 by Month 6',
        description: 'Assesses pain, symptoms, activities of daily living (ADL), sport/recreation, and knee-related quality of life.',
      },
      {
        toolName: 'Oxford Knee Score (OKS)',
        mcid: '5 points',
        targetScore: '>= 38/48 (Satisfactory / Good joint function)',
        description: '12-item validated questionnaire specifically designed for total knee replacement outcomes.',
      },
      {
        toolName: 'Western Ontario and McMaster Universities Osteoarthritis Index (WOMAC)',
        mcid: '10 points / 12%',
        targetScore: '<= 15/96 (Low disability)',
        description: 'Standard metric for pain, stiffness, and physical disability post-arthroplasty.',
      },
    ],
    physiotherapyGoals: {
      acutePhase: [
        'Achieve full passive knee extension (0°) — place pillow under ankle, NEVER under knee in bed',
        'Restore active knee flexion to >= 90° by post-op Day 10-14',
        'Independent bed transfers and ambulation with standard walker or elbow crutches',
        'Eliminate extensor lag on Straight Leg Raise (SLR)',
        'Cryotherapy and elevation for swelling and hematoma control',
      ],
      subacutePhase: [
        'Knee flexion >= 110° by Week 6; maintain 0° extension',
        'Progress from walker to single-point cane in contralateral hand, then to unassisted walking',
        'Master sit-to-stand from standard 45 cm chair without armrest push-off',
        'Stationary cycling with full 360° revolutions without pelvic rocking (requires ~100° flexion)',
        'Close kinetic chain strengthening: bilateral leg press, mini-squats (0-60°), step-ups (10 cm)',
      ],
      functionalPhase: [
        'Knee flexion >= 120° for floor-level or low-chair seating common in Indian households',
        'Reciprocal stair descent without hesitation',
        'Full community ambulation for > 1.5 - 2 km without post-activity joint effusion',
        'Proprioception and dual-task balance training to prevent falls',
      ],
      returnToActivityPhase: [
        'Low-impact recreational activities (brisk walking, swimming, cycling, yoga modified without extreme kneeling)',
      ],
    },
    rehabilitationConsiderations: {
      weightBearingProtocol:
        'Full weight-bearing as tolerated (FWBAT) from post-op Day 1 with assistive device (walker/crutches) for modern cemented TKR. Wean assistive device as quadriceps control and gait symmetry improve.',
      romMilestones:
        'Day 1-3: 0-70°; Day 7: 0-90°; Week 4: 0-105°; Week 6: 0-115°; Month 3: 0-120°+.',
      quadricepsActivationProtocol:
        'Neuromuscular Electrical Stimulation (NMES) high-intensity protocol (50 Hz, 250-400 µs pulse width, 1:3 duty cycle) combined with volitional isometric contractions has Level 1A evidence to overcome arthrogenic muscle inhibition and restore quadriceps strength 2x faster.',
      patellarMobilityProtocol:
        'Superior, inferior, and medial patellar glides performed daily in 20-30° flexion from post-op Day 2 to prevent patellar tendon adherence and anterior knee pain during flexion.',
      precautionFlags: [
        'Watch for deep vein thrombosis (DVT): sudden unilateral calf swelling, severe pain, Wells criteria score >= 2',
        'Screen for prosthetic joint infection (PJI): persistent localized erythema, wound drainage after Day 7, fever, sudden spike in resting pain',
        'Identify arthrofibrosis early: failure to reach 90° flexion by Week 4-6 warrants urgent orthopaedic review for possible Manipulation Under Anesthesia (MUA)',
      ],
      contraindications: [
        'Never place a pillow or roll directly under the popliteal fossa during bed rest (causes persistent fixed flexion contracture)',
        'Avoid high-impact running, jumping, or violent twisting sports that increase prosthetic wear or loosening risk',
      ],
    },
    evidenceRating: {
      level: 'Strong Evidence',
      sources: [
        'AAOS Clinical Practice Guideline on Rehabilitation Following Total Knee Arthroplasty (2020)',
        'JOSPT Clinical Guidance: Physical Therapy Management Following Total Knee Arthroplasty (2020)',
        'Indian Orthopaedic Association (IOA) Consensus Protocol for Post-TKR Physical Therapy',
      ],
    },
  },

  // =========================================================================
  // 4. POST ACL RECONSTRUCTION
  // =========================================================================
  {
    id: 'cond-post-acl-reconstruction',
    conditionName: 'Post ACL Reconstruction',
    synonyms: ['Anterior Cruciate Ligament Reconstruction (ACLR)', 'Post-ACLR Rehab', 'Hamstring Autograft ACL', 'Bone-Patellar Tendon-Bone (BTPB) ACL', 'Quad Tendon ACLR'],
    anatomicalRegion: 'Knee Joint Complex',
    relevantSpecialty: 'Sports Medicine, Orthopaedics & Sports Physiotherapy',
    clinicalPresentation:
      'Presents with post-surgical stiffness, difficulty walking and bending knee, impaired sit-to-stand after prolonged immobilisation or bracing, severe quadriceps arthrogenic inhibition, donor site morbidity (anterior knee pain with BPTB or hamstring weakness with semitendinosus graft), graft healing phase vulnerability, and fear of re-injury (kinesiophobia).',
    subjectiveAssessment: [
      'Graft type used: Hamstring autograft (ST/G), Bone-Patellar Tendon-Bone (BPTB), Quadriceps tendon, or Allograft',
      'Concomitant procedures: Meniscal repair (dictates restricted flexion <= 90° and protected WB for 4-6 weeks) vs meniscectomy vs ALL reconstruction',
      'Time elapsed since surgery: Graft ligamentization timeline (Weeks 6-12 is highest mechanical vulnerability / necrosis phase)',
      'Specific functional complaints: Inability to bear full weight, difficulty sitting down to toilet, knee stiffness when walking, swelling after minor exertion',
      'Psychological readiness: Tampa Scale of Kinesiophobia (TSK-11) and ACL-Return to Sport after Injury (ACL-RSI) scores',
    ],
    objectiveAssessment: [
      'Joint effusion grading: Modified stroke test (0, trace, 1+, 2+, 3+); effusion > 1+ requires load reduction',
      'Passive extension: Prone hang test and heel height difference (must achieve equal hyperextension to contralateral knee)',
      'Active flexion range of motion: Supine heel slides and wall slides',
      'Quadriceps lag test during active Straight Leg Raise (SLR)',
      'Donor site palpation: Patellar tendon tenderness (BPTB) or medial hamstring muscle-tendon junction (HT)',
      'Lachman test and Pivot Shift test (graft integrity verification)',
      'Functional tests: Y-Balance Test, Single-Leg Squat mechanics, Limb Symmetry Index (LSI) testing',
    ],
    romExpectations: [
      {
        movement: 'Knee Extension',
        normal: '0° to contralateral hyperextension (often -2° to -5°)',
        expectedRestriction: 'Often lacks 5° - 10° of terminal extension post-immobilisation',
        rehabGoal: 'Restore full symmetric extension equal to uninjured side within Day 7-14 (Critical to prevent cyclops lesion)',
      },
      {
        movement: 'Knee Flexion',
        normal: '135° - 145°',
        expectedRestriction: 'Restricted to 80° - 90° in weeks 1-3 (intentionally capped if meniscal repair was performed)',
        rehabGoal: '>= 90° by Week 2; >= 120° by Week 4-6; full symmetric flexion by Week 10-12',
      },
    ],
    mmtStrengthAssessment: [
      {
        muscleGroup: 'Quadriceps (Vastus Medialis, Intermedius, Lateralis, Rectus Femoris)',
        nerveRoot: 'Femoral Nerve (L2-L4)',
        typicalImpairment: 'Severe arthrogenic inhibition; quad index often < 50% in early weeks',
        targetMilestone: 'Limb Symmetry Index (LSI) >= 90% on isokinetic or handheld dynamometry before return to run/sport',
      },
      {
        muscleGroup: 'Hamstrings (Semitendinosus & Biceps Femoris)',
        nerveRoot: 'Sciatic Nerve (L5-S2)',
        typicalImpairment: 'Marked deficit if hamstring graft harvested (flexion weakness at deep flexion > 90°)',
        targetMilestone: 'Hamstring-to-Quadriceps (H:Q) ratio >= 65-70%; LSI >= 90%',
      },
      {
        muscleGroup: 'Hip Abductors and External Rotators (Gluteus Medius & Maximus)',
        nerveRoot: 'Superior & Inferior Gluteal Nerves (L4-S2)',
        typicalImpairment: 'Dynamic knee valgus collapse during single-leg loading',
        targetMilestone: 'Zero dynamic valgus on 20 cm single-leg step-down and drop vertical jump',
      },
      {
        muscleGroup: 'Calf Complex (Gastrocnemius & Soleus)',
        nerveRoot: 'Tibial Nerve (S1-S2)',
        typicalImpairment: 'Deficit in push-off propulsion and deceleration shock absorption',
        targetMilestone: '>= 25 single-leg heel raises symmetric to healthy side',
      },
    ],
    flexibilityAndMobility: [
      'Patellar tendon and infrapatellar fat pad mobility to avoid anterior knee pain',
      'Hamstring flexibility (prevent protective flexion contracture)',
      'Gastrocnemius length (Weight-Bearing Lunge Test >= 10 cm)',
    ],
    functionalMobilityTransfers: [
      {
        testName: '30-Second Sit-to-Stand Test',
        clinicalNorm: '14 - 19 repetitions in young adults',
        expectedPatientPerformance: '7 - 10 repetitions with marked offloading of surgical knee onto good leg',
        progressionBenchmark: '>= 16 repetitions with equal force plate / scale weight distribution',
      },
      {
        testName: 'Timed Up and Go (TUG)',
        clinicalNorm: '< 9 seconds',
        expectedPatientPerformance: '12 - 15 seconds with guarded deceleration before turning',
        progressionBenchmark: '< 8 seconds with dynamic agility',
      },
      {
        testName: 'Single-Leg Squat to 60° Flexion',
        clinicalNorm: 'Clean alignment (hip, knee, 2nd toe in line without trunk lean or pelvic drop)',
        expectedPatientPerformance: 'Dynamic knee valgus collapse, medial knee deviation, and trunk flexion',
        progressionBenchmark: 'Stable alignment for 5 consecutive repetitions on 20 cm box',
      },
    ],
    gaitAnalysis: {
      typicalPattern:
        'Stiff-knee gait with reduced peak knee flexion during stance (quadriceps avoidance), lack of active knee extension at terminal swing, and prolonged double-support time. Antalgic limp aggravated after periods of sitting.',
      compensatoryMechanisms: [
        'Trunk lean over operative side to decrease external knee adduction/flexion moment',
        'Contralateral hip hike and vaulting to assist limb clearance in swing phase',
        'Reduced heel strike velocity and flat-foot landing to soften impact',
      ],
      gaitTrainingFocus:
        'Immediate emphasis on terminal extension at heel strike, retro-walking (backward treadmill walking) at 1.5 - 2.0 km/h, and high-step marching to re-educate quadriceps timing.',
    },
    balanceTesting: [
      {
        testName: 'Y-Balance Test (Lower Quarter)',
        cutOffRisk: 'Composite score < 94% or anterior reach difference > 4 cm correlates with 2.5x ACL re-injury risk',
        balanceProtocol: 'Weekly tracking of anterior, posteromedial, and posterolateral reach symmetry',
      },
      {
        testName: 'Single-Leg Stance on Foam Pad with Eyes Closed',
        cutOffRisk: '< 15 seconds',
        balanceProtocol: 'Progressive neuromuscular perturbation training on unstable surfaces and Bosu ball',
      },
    ],
    specialTests: [
      {
        testName: 'Lachman Test',
        targetStructure: 'ACL graft integrity (anterior tibial translation at 20-30° flexion)',
        diagnosticAccuracy: 'Sensitivity 85-95%, Specificity 94-98%',
        procedure: 'Knee at 25° flexion; translate tibia anteriorly while stabilizing femur. Check for firm end-feel.',
      },
      {
        testName: 'Pivot Shift Test',
        targetStructure: 'Rotational instability (Anterior Cruciate + Anterolateral Complex)',
        diagnosticAccuracy: 'Specificity 98%',
        procedure: 'Valgus stress and internal rotation applied to extended knee while slowly flexing to 30-40°; reduction clunk indicates rotatory instability.',
      },
      {
        testName: 'Prone Hang Test (Heel Height Difference)',
        targetStructure: 'Terminal extension symmetry (Capsular & hamstring restriction)',
        diagnosticAccuracy: 'High precision for detecting subtle extension deficit (1 cm height diff ~ 1°)',
        procedure: 'Patient prone with lower legs hanging off table edge; measure vertical distance from table to heels.',
      },
    ],
    outcomeMeasures: [
      {
        toolName: 'International Knee Documentation Committee (IKDC) Subjective Form',
        mcid: '11.5 points',
        targetScore: '>= 85/100',
        description: 'Validated knee-specific outcome measuring symptoms, daily function, and sports activities.',
      },
      {
        toolName: 'ACL-Return to Sport after Injury (ACL-RSI) Scale',
        mcid: '10 points',
        targetScore: '>= 75% for psychological readiness to return to competitive sport',
        description: 'Measures psychological impact of returning to sport (confidence, fear of re-injury).',
      },
      {
        toolName: 'Hop Test Battery (Single Hop, Triple Hop, Crossover Hop, 6m Timed Hop)',
        mcid: 'LSI >= 90% (>= 95% for pivoting sports)',
        targetScore: 'Limb Symmetry Index >= 90% on all 4 tests',
        description: 'Criterion-based functional performance testing required before sports clearance.',
      },
    ],
    physiotherapyGoals: {
      acutePhase: [
        'Restore full symmetric passive hyperextension (0° / equal to other knee) immediately',
        'Flexion to 90° by Week 2, 120° by Week 4 (unless restricted by meniscus repair)',
        'Eradicate quadriceps lag with NMES, biofeedback, and supine SLR drills',
        'Control joint swelling to <= 1+ on stroke test; full weight-bearing gait without crutches by Week 3-4',
      ],
      subacutePhase: [
        'Full symmetric knee flexion (135°+) by Week 8-10',
        'Progressive closed-chain resistance training: Leg press, split squats, Romanian deadlifts, barbell hip thrusts',
        'Begin straight-line jogging program once Quad LSI >= 70%, zero effusion, and full extension achieved (typically Month 3-4)',
      ],
      functionalPhase: [
        'Plyometric progression: double-leg jump landings -> single-leg hop landings with good dynamic valgus control',
        'Agility and change-of-direction (COD) drills with deceleration focus (Y-drills, T-test, Shuttle runs)',
        'Reactive agility drills with unanticipated stimulus (light or ball bounce)',
      ],
      returnToActivityPhase: [
        'Passing strict criteria: Quad & Hamstring LSI >= 90%, Hop Test LSI >= 90%, Y-Balance >= 95%, ACL-RSI >= 75%',
        'Gradual return to practice (non-contact -> full-contact -> competitive match play at 9-12 months minimum)',
      ],
    },
    rehabilitationConsiderations: {
      weightBearingProtocol:
        'Isolated ACLR: Full weight-bearing as tolerated immediately with crutches; wean off crutches when quad lag is 0° and gait is normal (usually Day 10-21). If Meniscal Repair (radial/root): Touchdown/partial weight-bearing for 4-6 weeks with flexion limited to 90° in brace.',
      romMilestones:
        'Terminal extension 0° by Day 7-10; Flexion 90° by Day 14; 120° by Week 6; Full by Week 10-12.',
      quadricepsActivationProtocol:
        'High-intensity NMES applied at 60° knee flexion combined with voluntary isometric max contractions for 15 minutes, 3-5 days/week during Weeks 1-6.',
      patellarMobilityProtocol:
        'Superior patellar glide mobilization essential to prevent patella baja and restore full quadriceps excursion.',
      precautionFlags: [
        'Weeks 6-12 Ligamentization Vulnerability: Graft is biochemically weakest due to cellular remodeling; avoid premature cutting, pivoting, or uncontrolled jumping',
        'Persistent Joint Effusion: If effusion increases from 0 to 2+ after a session, reduce loading immediately',
      ],
      contraindications: [
        'No open-kinetic-chain (seated leg extension machine) with heavy resistance from 0° to 45° in the first 12 weeks (causes high anterior shear strain on healing graft)',
        'No return to pivoting or contact sports prior to 9 months post-op regardless of functional performance (re-tear rates are 7x higher before 9 months)',
      ],
    },
    evidenceRating: {
      level: 'Strong Evidence',
      sources: [
        'MOON ACL Consortium & Delaware-Oslo ACL Cohort Guidelines (2020-2024)',
        'Aspetar Clinical Practice Guideline on Rehabilitation after Anterior Cruciate Ligament Reconstruction',
        'International Olympic Committee (IOC) Consensus Statement on Prevention and Return to Sport after ACL Injury',
      ],
    },
  },

  // =========================================================================
  // 5. UNICONDYLAR KNEE REPLACEMENT (UKR)
  // =========================================================================
  {
    id: 'cond-unicondylar-knee-replacement',
    conditionName: 'Unicondylar Knee Replacement (UKR)',
    synonyms: ['Partial Knee Arthroplasty (PKA)', 'Unicompartmental Knee Arthroplasty (UKA)', 'Medial UKR', 'Lateral UKR', 'Oxford Partial Knee'],
    anatomicalRegion: 'Knee Joint (Medial or Lateral Compartment)',
    relevantSpecialty: 'Orthopaedics & Musculoskeletal Physiotherapy',
    clinicalPresentation:
      'Presents with post-surgical stiffness, difficulty bending knee, difficulty with sit-to-stand transfers, and abnormal gait. Compared to Total Knee Replacement, UKR preserves both ACL and PCL and normal knee kinematics; however, early quadriceps inhibition, medial soft-tissue tightness, and habituated antalgic limping from long-standing isolated medial compartment osteoarthritis require targeted rehabilitation.',
    subjectiveAssessment: [
      'Operated compartment: Medial (90% of cases) vs Lateral unicompartmental arthroplasty',
      'Fixation method: Cemented vs Cementless (hydroxyapatite-coated Oxford mobile bearing)',
      'Bearing design: Mobile bearing vs Fixed bearing (mobile bearings require careful avoidance of forceful hyperextension or twisting that could cause bearing spin-out)',
      'Patient complaints: Anterior medial joint tenderness, tightness when bending to sit down, fear of full weight-bearing on operated leg',
      'Pain comparison with pre-operative state: Expected rapid relief of arthritic bone-on-bone pain',
    ],
    objectiveAssessment: [
      'Surgical scar: Shorter anteromedial incision (~8-10 cm) compared to TKR midline scar',
      'Effusion: Typically mild (trace to 1+) compared to total arthroplasty',
      'Range of motion: Knee flexion and extension angles measured in supine and sitting',
      'Quadriceps lag and vastus medialis obliquus (VMO) tone',
      'Gait analysis: Early restoration of knee flexion during stance; check for persistent residual varus thrust or limp',
      'Ligamentous stability: Intact ACL, PCL, and collateral ligaments verified clinically',
    ],
    romExpectations: [
      {
        movement: 'Knee Extension',
        normal: '0°',
        expectedRestriction: 'Minor restriction (-3° to -5°) in first 1-2 weeks',
        rehabGoal: 'Achieve true 0° passive and active extension by Day 7-10',
      },
      {
        movement: 'Knee Flexion',
        normal: '135° - 145°',
        expectedRestriction: 'Typically reaches 100° - 110° by Week 2-3 (much faster than TKR)',
        rehabGoal: '>= 120° - 130° by Week 6-8, allowing comfortable squatting and kneeling',
      },
    ],
    mmtStrengthAssessment: [
      {
        muscleGroup: 'Quadriceps Femoris',
        nerveRoot: 'Femoral Nerve (L2-L4)',
        typicalImpairment: 'Grade 3+/5 to 4-/5 (less severe inhibition than TKR due to preserved ACL proprioception)',
        targetMilestone: 'Grade 5/5: Full dynamic quadriceps strength by Week 6-8',
      },
      {
        muscleGroup: 'Hamstrings',
        nerveRoot: 'Sciatic Nerve (L5-S2)',
        typicalImpairment: 'Grade 4/5; medial hamstrings (semitendinosus) may guard medial compartment',
        targetMilestone: 'Grade 5/5: Symmetric bilateral knee flexion strength',
      },
      {
        muscleGroup: 'Hip Abductors (Gluteus Medius)',
        nerveRoot: 'Superior Gluteal Nerve (L4-S1)',
        typicalImpairment: 'Grade 4-/5; pre-operative varus compensation',
        targetMilestone: 'Grade 5/5: Pelvic stability during single-leg loading',
      },
    ],
    flexibilityAndMobility: [
      'Medial collateral ligament (MCL) tension and pes anserine tenderness',
      'Gastrocnemius flexibility for normal terminal stance heel-off',
      'Retropatellar soft-tissue mobility',
    ],
    functionalMobilityTransfers: [
      {
        testName: '30-Second Chair Stand Test',
        clinicalNorm: '12 - 17 repetitions',
        expectedPatientPerformance: '7 - 10 repetitions in first 2 weeks, rapidly improving to 12-14 by Week 4',
        progressionBenchmark: '>= 14 repetitions without arm support',
      },
      {
        testName: 'Timed Up and Go (TUG)',
        clinicalNorm: '< 10 seconds',
        expectedPatientPerformance: '11 - 14 seconds in early post-op',
        progressionBenchmark: '< 9 seconds by Week 4-6',
      },
      {
        testName: 'Stair Ascent & Descent Test',
        clinicalNorm: 'Reciprocal stair climbing',
        expectedPatientPerformance: 'Step-to pattern during first 10 days, progressing quickly to reciprocal',
        progressionBenchmark: 'Reciprocal descent without rail assistance by Week 4-6',
      },
    ],
    gaitAnalysis: {
      typicalPattern:
        'More natural knee kinematics than TKR due to retained cruciate ligaments. Temporary antalgic limp related to medial wound tenderness; tends to resolve rapidly within 3 to 4 weeks with proper gait re-education.',
      compensatoryMechanisms: [
        'Out-toeing during stance to offload the medial compartment',
        'Slight trunk tilt toward unoperated side if quadriceps confidence is low',
      ],
      gaitTrainingFocus:
        'Encouraging early normal heel strike and push-off, symmetric stride length, and rapid weaning of walking aids (often cane-free by Day 14-21).',
    },
    balanceTesting: [
      {
        testName: 'Single-Leg Stance Test',
        cutOffRisk: '< 15 seconds',
        balanceProtocol: 'Proprioception is significantly better preserved in UKR than TKR; early single-leg balance drills',
      },
    ],
    specialTests: [
      {
        testName: 'Anterior Drawer / Lachman Test',
        targetStructure: 'ACL integrity (mandatory prerequisite for successful UKR)',
        diagnosticAccuracy: 'High diagnostic utility',
        procedure: 'Verify stable anterior drawer with firm end-feel, confirming intact native cruciate ligament.',
      },
      {
        testName: 'Valgus / Varus Stress at 0° and 30° Flexion',
        targetStructure: 'Collateral ligament stability and prosthetic gap balance',
        diagnosticAccuracy: 'Standard post-arthroplasty ligament test',
        procedure: 'Gentle varus/valgus stress; should demonstrate normal ligamentous constraint without pathologic opening.',
      },
    ],
    outcomeMeasures: [
      {
        toolName: 'Oxford Knee Score (OKS)',
        mcid: '5 points',
        targetScore: '>= 42/48 (Excellent functional score by Month 3)',
        description: 'Joint-specific patient reported questionnaire measuring pain and functional capacity.',
      },
      {
        toolName: 'Forgotten Joint Score (FJS-12)',
        mcid: '10.8 points',
        targetScore: '>= 75/100 (UKR achieves significantly higher "forgotten joint" scores than TKR)',
        description: 'Assesses patient joint awareness during daily activities.',
      },
    ],
    physiotherapyGoals: {
      acutePhase: [
        'Full active extension (0°) and flexion >= 90° by Day 5-7',
        'Active Straight Leg Raise without extensor lag by Day 3',
        'Independent walking with cane or single crutch by Day 7',
        'Swelling management with cryotherapy and elevation',
      ],
      subacutePhase: [
        'Knee flexion >= 120° by Week 3-4',
        'Complete weaning of walking aids; normal symmetric gait pattern',
        'Full sit-to-stand from normal and low chairs without arm support',
        'Stationary cycling and progressive resistance leg press',
      ],
      functionalPhase: [
        'Full return to recreational walking, hiking, low-impact doubles tennis or badminton',
        'Deep squatting and floor transfers common in Indian domestic and religious activities',
      ],
      returnToActivityPhase: [
        'Full active lifestyle with preserved joint longevity',
      ],
    },
    rehabilitationConsiderations: {
      weightBearingProtocol:
        'Immediate full weight-bearing as tolerated (FWBAT) from Day 1. Faster progression off crutches than TKR due to less bone resection and intact cruciates.',
      romMilestones:
        'Day 3: 0-90°; Week 2: 0-110°; Week 4: 0-120°+.',
      quadricepsActivationProtocol:
        'Closed-chain kinetic exercises (mini-squats, step-ups) initiated early from Day 3-5.',
      precautionFlags: [
        'If mobile-bearing implant is used: Avoid sudden forceful hyperextension with internal rotation in early weeks to prevent bearing dislocation (spin-out)',
        'Monitor for persistent lateral compartment pain (sign of overstuffing medial gap or progression of lateral OA)',
      ],
      contraindications: [
        'High-impact running or contact athletics not recommended to preserve polyethylene bearing longevity',
      ],
    },
    evidenceRating: {
      level: 'Strong Evidence',
      sources: [
        'Oxford Knee Arthroplasty Clinical Guidelines and Physiotherapy Protocols (2022)',
        'Bone & Joint Journal: Systematic review of rehabilitation after unicompartmental knee arthroplasty',
        'JOSPT Consensus on Partial vs Total Knee Arthroplasty Outcomes',
      ],
    },
  },

  // =========================================================================
  // 6. FRACTURE AROUND ELBOW REGION
  // =========================================================================
  {
    id: 'cond-elbow-region-fracture',
    conditionName: 'Fracture Around Elbow Region',
    synonyms: ['Distal Humerus Fracture', 'Radial Head Fracture', 'Olecranon Fracture', 'Coronoid Fracture', 'Terrible Triad of Elbow', 'Post-Elbow ORIF / Casting'],
    anatomicalRegion: 'Elbow Joint Complex (Humero-ulnar, Humero-radial, Superior Radio-ulnar)',
    relevantSpecialty: 'Orthopaedics, Upper Extremity & Musculoskeletal Physiotherapy',
    clinicalPresentation:
      'Presents with severe joint stiffness, limited flexion/extension and pronation/supination, profound grip strength weakness, difficulty holding objects, impaired upper extremity coordination, and severe limitations in essential activities of daily living (ADLs) such as eating, bathing, drinking, and dressing/undressing. Prone to heterotopic ossification and persistent flexion contracture.',
    subjectiveAssessment: [
      'Specific fracture anatomy: Distal humerus (intercondylar/supracondylar), Radial head/neck (Mason type I-IV), Olecranon, Coronoid process, or Monteggia fracture-dislocation',
      'Management type: Conservative casting/splinting vs ORIF (anatomical locking plates, tension-band wiring) vs Radial head arthroplasty',
      'Duration of post-injury immobilisation (elbow becomes stiff exceptionally fast; immobilisation > 3 weeks results in severe contracture)',
      'Specific ADL functional limitations: Inability to bring hand to mouth for eating/drinking, unable to wash face/hair during bathing, difficulty buttoning shirts or reaching back to dress/undress',
      'Neurological symptoms: Ulnar nerve symptoms (numbness/tingling in 4th and 5th digits, intrinsic muscle weakness, Wartenberg sign), Median or Radial nerve symptoms',
      'Pain character: Deep joint ache with end-range stretch pain; monitor for burning neuropathic pain (CRPS risk)',
    ],
    objectiveAssessment: [
      'Surgical scar inspection: Posterior midline incision with ulnar nerve transposition, lateral Kocher approach, or medial approach',
      'Active and passive range of motion measured with standard goniometer: Flexion, Extension, Forearm Pronation, Forearm Supination',
      'Hand grip strength: Jamar Hand Dynamometer (measured in kilograms/pounds) compared to uninjured hand; pinch grip strength (tip pinch, lateral key pinch, palmar pinch)',
      'Neurological exam: Ulnar nerve motor (first dorsal interosseous, abductor digiti minimi), sensation over volar/dorsal little finger; Median nerve (APB, thumb opposition); Radial nerve (wrist/finger extensors)',
      'Upper limb functional reach and coordination tests (Nine-Hole Peg Test, QuickDASH)',
      'Carrying angle measurement (cubitus valgus vs cubitus varus / gunstock deformity)',
      'Signs of heterotopic ossification (HO): Rapidly declining ROM, localized woody hard swelling, progressive warmth and throbbing pain',
    ],
    romExpectations: [
      {
        movement: 'Elbow Flexion',
        normal: '0° to 140° - 145°',
        expectedRestriction: 'Often restricted to 70° - 90° post-immobilisation; patient cannot reach mouth (requires >= 120°)',
        rehabGoal: 'Functional Arc of Morrey: Flexion >= 130° (minimum 120° for eating, drinking, and shaving)',
      },
      {
        movement: 'Elbow Extension',
        normal: '0° to +5° hyperextension',
        expectedRestriction: 'Marked fixed flexion deformity (often lacking 20° - 40° of full extension)',
        rehabGoal: 'Functional Arc of Morrey: Extension to <= -30° (ideally -10° to 0° for reaching and pushing)',
      },
      {
        movement: 'Forearm Pronation',
        normal: '0° to 80° - 85°',
        expectedRestriction: 'Restricted to 30° - 40° (limits using computer mouse, turning handles)',
        rehabGoal: '>= 50° for functional daily independence (writing, typing, keyboard use)',
      },
      {
        movement: 'Forearm Supination',
        normal: '0° to 80° - 85°',
        expectedRestriction: 'Restricted to 20° - 35° (limits receiving coins, washing face, holding bowl/cup)',
        rehabGoal: '>= 50° for eating Indian meals, drinking from cups, and personal hygiene',
      },
    ],
    mmtStrengthAssessment: [
      {
        muscleGroup: 'Hand Grip Complex (Flexor Digitorum Profundus/Superficialis & Interossei)',
        nerveRoot: 'Median & Ulnar Nerves (C7-T1)',
        typicalImpairment: 'Severe weakness (often < 10-15 kg on dynamometer; > 60% deficit vs contralateral side)',
        targetMilestone: 'Grip strength within 85-90% of contralateral hand; stable power grip without dropping glasses/plates',
      },
      {
        muscleGroup: 'Biceps Brachii & Brachialis (Elbow Flexors)',
        nerveRoot: 'Musculocutaneous Nerve (C5-C6)',
        typicalImpairment: 'Grade 3+/5 with significant fatigue holding objects aloft',
        targetMilestone: 'Grade 5/5: Resisted flexion in supination, pronation, and neutral',
      },
      {
        muscleGroup: 'Triceps Brachii (Elbow Extensors)',
        nerveRoot: 'Radial Nerve (C6-C8)',
        typicalImpairment: 'Grade 3/5 (especially compromised post-olecranon osteotomy or triceps-split approach)',
        targetMilestone: 'Grade 5/5: Powerful pushing and overhead reaching strength',
      },
      {
        muscleGroup: 'Wrist & Finger Extensors',
        nerveRoot: 'Radial / Posterior Interosseous Nerve (C6-C8)',
        typicalImpairment: 'Grade 4-/5 with wrist drop tendency or extensor weakness following radial head trauma',
        targetMilestone: 'Grade 5/5: Stable wrist cock-up during forceful hand grasping',
      },
    ],
    flexibilityAndMobility: [
      'Anterior capsule contracture limiting terminal extension',
      'Posterior capsule and triceps tendinous tightness limiting deep flexion',
      'Interosseous membrane (IOM) tightness between radius and ulna limiting rotation',
      'Brachialis myofascial trigger points and shortening',
    ],
    functionalMobilityTransfers: [
      {
        testName: 'Functional ADL Simulation Battery',
        clinicalNorm: '100% independent without adaptive devices',
        expectedPatientPerformance:
          'Inability to bring spoon/glass to lips without excessive neck flexion; unable to scrub back with affected hand; struggles with shirt buttons and zippers',
        progressionBenchmark: 'Smooth hand-to-mouth, hand-to-head, hand-to-back, and waist-level bilateral tasks',
      },
      {
        testName: 'Jamar Hand Dynamometer Grip Strength Test',
        clinicalNorm: '35 - 50 kg for adult males; 20 - 32 kg for adult females (dominant hand)',
        expectedPatientPerformance: '8 - 14 kg; unable to hold glass of water securely without spilling',
        progressionBenchmark: 'Within 10% of contralateral hand grip force',
      },
      {
        testName: 'Pinch Grip Strength (Key & Tip Pinch)',
        clinicalNorm: 'Key pinch: 8 - 12 kg; Tip pinch: 5 - 8 kg',
        expectedPatientPerformance: 'Key pinch 2 - 4 kg; dropping keys, pens, eating utensils',
        progressionBenchmark: '>= 7 kg key pinch, smooth fine-motor manipulation',
      },
    ],
    gaitAnalysis: {
      typicalPattern:
        'Guarded arm swing on affected side with elbow held in 90° flexion across abdomen; elevated shoulder and restricted thoracic counter-rotation during ambulation to protect the painful arm.',
      compensatoryMechanisms: [
        'Elevation of scapula (shoulder hiking) when attempting to reach high or feed oneself',
        'Forward head poke and cervical spine flexion to meet the hand halfway for eating and drinking',
        'Trunk rotation and lateral flexion to compensate for lacking forearm supination/pronation',
      ],
      gaitTrainingFocus:
        'Relaxed reciprocal upper limb arm swing during walking, bilateral pendulum exercises, and scapular depression biofeedback to break habitual protective posturing.',
    },
    balanceTesting: [
      {
        testName: 'Functional Reach Test & Upper Limb Y-Balance (UQYBT)',
        cutOffRisk: 'UQYBT composite score < 80% indicates persistent upper quadrant asymmetry',
        balanceProtocol: 'Progress from table-supported reach to dynamic closed-chain push-up plus position',
      },
    ],
    specialTests: [
      {
        testName: 'Tinel Sign at the Cubital Tunnel',
        targetStructure: 'Ulnar Nerve irritation / compression at medial epicondyle',
        diagnosticAccuracy: 'Sensitivity 70%, Specificity 98%',
        procedure: 'Gently percuss ulnar nerve behind medial epicondyle; shooting tingling into 4th/5th digits indicates cubital tunnel syndrome or subluxating nerve.',
      },
      {
        testName: 'Elbow Extension Overpressure / Passive End-Feel Test',
        targetStructure: 'Humero-ulnar anterior capsule vs bony block (olecranon abutment)',
        diagnosticAccuracy: 'Crucial to differentiate capsular contracture (firm) from bony heterotopic block (hard)',
        procedure: 'Slowly apply terminal extension overpressure. Springy/firm end feel responds well to mobilization and static progressive splinting; abrupt hard stop indicates bony impingement or heterotopic bone.',
      },
      {
        testName: 'Radio-Capitellar Glide and Shear Test',
        targetStructure: 'Radial head mobility and congruency',
        diagnosticAccuracy: 'High diagnostic utility post-radial head trauma',
        procedure: 'Palpate radial head while passively pronating and supinating forearm; check for smooth tracking and crepitus.',
      },
    ],
    outcomeMeasures: [
      {
        toolName: 'Disabilities of the Arm, Shoulder and Hand (QuickDASH)',
        mcid: '15.9 points',
        targetScore: '<= 18/100 (Minimal disability in daily life)',
        description: 'Validated 11-item self-report questionnaire assessing upper extremity symptoms and daily tasks.',
      },
      {
        toolName: 'Mayo Elbow Performance Score (MEPS)',
        mcid: '10 points',
        targetScore: '>= 90/100 (Excellent clinical outcome)',
        description: 'Clinician-rated scale combining pain (45 pts), range of motion (20 pts), stability (10 pts), and daily function (25 pts).',
      },
      {
        toolName: 'Patient-Rated Elbow Evaluation (PREE)',
        mcid: '11 points',
        targetScore: '<= 20/100',
        description: 'Reliable patient-reported metric of pain and disability specific to elbow disorders.',
      },
    ],
    physiotherapyGoals: {
      acutePhase: [
        'Gentle active and active-assisted range of motion within stable arc permitted by surgeon (strictly avoiding passive aggressive overpressure)',
        'Control dependent hand and forearm edema using high-elevation, retrograde massage, and active finger pumping',
        'Maintain full shoulder and cervical spine range of motion to prevent secondary adhesive capsulitis',
        'Neurodynamic gliding of ulnar, median, and radial nerves to prevent perilesional scar tethering',
      ],
      subacutePhase: [
        'Restore the Morrey Functional Arc of Elbow Motion: 30° to 130° flexion-extension, 50° pronation, 50° supination',
        'Low-load prolonged stretch (LLPS) using static progressive night splints or dynamic splinting for extension contracture',
        'Progressive grip strengthening with therapeutic putty, hand gripper, and dowel rolling',
        'ADL retraining: practicing spoon holding, glass drinking, hair grooming with gradual reduction of cervical compensation',
      ],
      functionalPhase: [
        'Grip strength recovery >= 80% of contralateral hand',
        'Closed-kinetic-chain weight-bearing progression (wall push-offs -> quadruped loading -> modified push-ups)',
        'Full independence in bilateral self-care, cooking, laundry, and occupational tools',
      ],
      returnToActivityPhase: [
        'Full return to manual labor, agricultural work, or racquet/throwing sports',
      ],
    },
    rehabilitationConsiderations: {
      weightBearingProtocol:
        'Non-weight bearing through upper limb for first 6-8 weeks until solid radiographic healing of fracture is confirmed. Closed kinetic chain loading only introduced after 8-12 weeks.',
      romMilestones:
        'Week 2: 45° to 90°; Week 6: 30° to 120°, 45° pronation/supination; Week 12: 15° to 135°, full rotation.',
      quadricepsActivationProtocol:
        'N/A (Upper limb) — Focus on Hand Grip & Forearm Kinetic Chain re-education with graduated therapeutic putty (yellow -> red -> green -> blue) and wrist extensor co-contraction drills.',
      precautionFlags: [
        'NEVER aggressively pump or forcefully manipulate a stiff elbow joint! The elbow is uniquely reactive; aggressive passive stretching induces severe inflammatory cascade leading to Heterotopic Ossification (HO) and worsening arthrofibrosis.',
        'Low-Load Prolonged Stretch (LLPS) of 20-30 minutes with light heat/gravity is the evidence-based standard for elbow contractures.',
        'Screen closely for ulnar neuropathy: if clawing of digits or persistent sensory loss occurs, refer immediately for surgical neurolysis.',
      ],
      contraindications: [
        'No heavy passive manipulation under force',
        'No heavy lifting (> 1 kg) during first 6 weeks',
      ],
    },
    evidenceRating: {
      level: 'Strong Evidence',
      sources: [
        'American Academy of Orthopaedic Surgeons (AAOS) Guidelines on Complex Elbow Trauma (2022)',
        'Journal of Hand Therapy: Clinical Practice Recommendations for Rehabilitation After Elbow Trauma',
        'Morrey BF: The Post-Traumatic Stiff Elbow — Evaluation and Management (JBJS)',
      ],
    },
  },
];
