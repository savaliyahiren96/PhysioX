import { JointConditionMaster } from '../../types/clinical';

export const SPINE_CONDITIONS: JointConditionMaster[] = [
  // ==========================================
  // LUMBAR SPINE & PELVIS (8 Conditions)
  // ==========================================
  {
    id: 'lumbar-disc-radiculopathy',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Lumbar Disc Herniation with Radiculopathy (Sciatica)',
    category: 'Intervertebral Disc / Neural Compression',
    tissue_group: 'soft',
    tissue_types: ['Disc', 'Nerve / Neural'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Cauda Equina Syndrome: Bilateral sciatica, saddle anesthesia (perianal numbness), sudden bowel/bladder dysfunction (urinary retention or overflow incontinence), loss of anal sphincter tone.',
      'Progressive major motor deficit (e.g., rapid foot drop MRC <= 2/5, progressive quadriceps weakness).',
      'Fever, unexplained weight loss, night sweats, or intravenous drug use history indicating spinal epidural abscess or discitis.',
    ],
    when_to_refer: [
      'Immediate emergency spine surgeon referral if ANY signs of Cauda Equina Syndrome (decompression within 24–48 hours).',
      'Progressive neurological motor deficit despite conservative management.',
      'Intractable radicular pain unresponsive to 6–8 weeks of structured physiotherapy and medical therapy.',
    ],
    outcome_measures: [
      { name: 'Oswestry Disability Index (ODI)', mcid: '12.8 points', target: '<= 20%' },
      { name: 'NRS Leg Pain (0–10)', mcid: '2.0 points', target: '<= 2/10' },
      { name: 'Roland-Morris Disability Questionnaire (RMDQ)', mcid: '3.5 points', target: '<= 4/24' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-18',
    teaching_notes: {
      clinicalReasoning: 'Straight Leg Raise (SLR) is highly sensitive (91%) to rule out disc herniation, whereas Well-Leg / Crossed SLR is highly specific (88%) to rule in a space-occupying disc protrusion. Directional preference (McKenzie centralization) indicates favourable disc nuclear migration.',
      vivaQuestions: [
        {
          question: 'What is the anatomical basis of Crossed Straight Leg Raise test positivity?',
          answer: 'Lifting the asymptomatic leg tensions the contralateral nerve root and pull the dura down, pulling the ipsilateral involved nerve root directly against the medial aspect of the herniated disc protrusion.',
        },
        {
          question: 'Which nerve roots correspond to L4-L5 and L5-S1 posterolateral disc herniations?',
          answer: 'Posterolateral herniation compresses the traversing nerve root: L4-L5 disc compresses the L5 nerve root (extensor hallucis longus, dorsal foot numbness); L5-S1 disc compresses the S1 nerve root (gastroc-soleus weakness, Achilles reflex diminution, lateral foot numbness).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Dermatomal sharp, lancinating leg pain radiating below the knee (sciatica), often worse than low back pain. Exacerbated by coughing, sneezing, Valsalva, and sitting flexion.',
    bedsideAssessmentTests: [
      {
        testName: 'Straight Leg Raise (Lasègue) Test',
        sensitivity: '91% (95% CI: 82–94%)',
        specificity: '41% (95% CI: 32–51%)',
        positiveLikelihoodRatio: '1.5',
        techniqueAndInterpretation: 'Passive hip flexion with knee in full extension and ankle dorsiflexion. Positive if typical electric radicular leg pain radiates below knee between 35° and 70°.',
        evidenceCitation: 'NICE Guidelines NG59 (2020); van der Windt et al. Cochrane Database Syst Rev.',
      },
      {
        testName: 'Crossed Straight Leg Raise (Well-Leg SLR)',
        sensitivity: '29% (95% CI: 23–35%)',
        specificity: '88% (95% CI: 84–92%)',
        positiveLikelihoodRatio: '2.4',
        techniqueAndInterpretation: 'Passive elevation of the unaffected contralateral leg. Positive if reproduction of radicular pain in the symptomatic leg.',
        evidenceCitation: 'Devillé et al. Spine (Phila Pa 1976).',
      },
      {
        testName: 'Slump Test',
        sensitivity: '84% (95% CI: 77–90%)',
        specificity: '83% (95% CI: 75–89%)',
        positiveLikelihoodRatio: '4.9',
        techniqueAndInterpretation: 'Thoracic/lumbar slump + neck flexion + passive knee extension and ankle dorsiflexion. Positive if radicular leg symptoms reproduced and relieved by cervical extension.',
        evidenceCitation: 'Urban & MacDermid. JOSPT.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Lumbar Spine 1.5T/3T Sagittal + Axial T1, T2 & T2 Fat-Suppressed sequences',
        indications: 'Severe radicular deficit, suspected Cauda Equina Syndrome, progressive motor weakness, or refractory radiculopathy failing 6 weeks conservative therapy.',
        keyFindings: 'Posterolateral/foraminal disc extrusion/protrusion with mechanical displacement and edema of traversing nerve root.',
        accuracyOrYield: 'Sensitivity 93%, Specificity 87% for nerve root impingement.',
      },
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing AP, Lateral and dynamic flexion-extension views',
        indications: 'Assess disc space narrowing, osteophytes, spondylolisthesis, or mechanical segmental instability.',
        keyFindings: 'Reduced L4-S1 disc height, facet sclerosis; excludes gross spondylolisthesis.',
        accuracyOrYield: 'Cannot visualize soft disc tissue; useful for mechanical alignment.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Evidence-Based Phased Directional & Neurodynamic Lumbar Radiculopathy Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Acute Offloading, Centralization & Nerve Calming',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Abolish distal radiating leg pain through directional preference', 'Reduce neurogenic mechanical inflammation', 'Maintain pain-free walking'],
          exercisePrescription: [
            { category: 'Directional Preference', exerciseName: 'Prone Lying & Prone on Elbows Extension / Sphinx', dosage: '10 reps every 2 hours, hold 5–10s', clinicalRationale: 'Promotes centralization of nuclear material and reduces anterior disc pressure.' },
            { category: 'Neurodynamics', exerciseName: 'Gentle Sciatic Nerve Sliders (Non-Provocative)', dosage: '2 sets of 10 reps, 2x daily', clinicalRationale: 'Facilitates longitudinal neural excursion and minimizes endoneurial intraneural venous congestion.' },
            { category: 'De-loading', exerciseName: 'Psoas-Rest 90/90 Supine Hook-Lying Position', dosage: '15–20 minutes as needed for acute relief', clinicalRationale: 'Minimizes lumbar lordotic shear stress and reduces intradiscal pressure to baseline.' },
          ],
          progressionCriteria: ['Centralization of peripheral symptoms (pain recedes towards buttock/back)', 'Able to sit upright for 20 minutes without distal radicular tingling', 'SLR increases by > 15° without distal sharp pain'],
          precautionsAndContraindications: ['Strictly avoid loaded lumbar flexion (toe touches, sit-ups, prolonged slumped sitting)', 'Halt exercise immediately if peripheralization occurs (pain extends further down into calf/foot)'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Restoration of Motion & Segmental Motor Control',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Restore pain-free hip and spinal mobility', 'Activate transverse abdominis, multifidus, and gluteal complexes', 'Progress neurodynamic tensioners'],
          exercisePrescription: [
            { category: 'Motor Control', exerciseName: 'Quadruped Bird-Dog with Neutral Spine', dosage: '3 sets of 8–10 reps per side, 3s hold', clinicalRationale: 'Co-activates lumbar multifidus and core stabilisers with minimal compressive joint shear.' },
            { category: 'Core Stability', exerciseName: 'Supine Dead Bug (Contralateral Limb Reach)', dosage: '3 sets of 10 reps', clinicalRationale: 'Builds anterior core stability while holding an isometric neutral spine.' },
            { category: 'Hip Mobility', exerciseName: 'Half-Kneeling Hip Flexor Stretch with Glute Squeeze', dosage: '3 sets of 30s per side', clinicalRationale: 'Lengthens psoas to decrease anterior pelvic tilt and facet shearing.' },
          ],
          progressionCriteria: ['NRS leg pain <= 2/10', 'Full painless knee extension in sitting slump position', 'Demonstrates 30-second McGill side-bridge hold'],
          precautionsAndContraindications: ['Avoid heavy ballistic lifting and twisting under spinal compressive loads'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Strength, Posterior Chain Loading & Trunk Stiffness',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Build hip hinge mechanics and gluteal hypertrophy', 'Develop multi-planar trunk anti-rotational stiffness', 'Recondition spinal extensor endurance'],
          exercisePrescription: [
            { category: 'Posterior Chain', exerciseName: 'Romanian Deadlift (RDL) with Dumbbells / Trap Bar', dosage: '3 sets of 8–10 reps at RPE 7', clinicalRationale: 'Loads hamstring and gluteal complexes through safe hip-dominant hinge kinematics.' },
            { category: 'Trunk Stiffness', exerciseName: 'Pallof Press and Cable Anti-Rotation Holds', dosage: '3 sets of 12 reps per side', clinicalRationale: 'Strengthens internal/external obliques against rotational shear forces.' },
            { category: 'Spinal Endurance', exerciseName: 'Prone Roman Chair Back Extension (Hold to Horizontal)', dosage: '3 sets of 12–15 reps', clinicalRationale: 'Restores erector spinae and multifidus muscular endurance to prevent reinjury.' },
          ],
          progressionCriteria: ['ODI score < 20%', 'Symmetric lower limb strength >= 90% LSI', 'Able to perform 1.0x bodyweight hip hinge pain-free'],
          precautionsAndContraindications: ['Avoid spinal flexion during loaded deadlift phase'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Full Activity, Sports & Functional Resiliency',
          timeline: 'Weeks 10–16',
          clinicalGoals: ['Full return to high-demand occupational or athletic tasks', 'Progressive impact loading and agility', 'Lifelong spine hygiene and self-management'],
          exercisePrescription: [
            { category: 'Dynamic Power', exerciseName: 'Kettlebell Swings (Hip Hinge Power)', dosage: '4 sets of 15 reps, fast tempo', clinicalRationale: 'Develops explosive gluteal power while maintaining an isometric rigid spine.' },
            { category: 'Multi-Directional', exerciseName: 'Multi-Directional Lunges and Farmer Carries', dosage: '3 sets of 40m walks with 25% BW per hand', clinicalRationale: 'Demands robust lateral trunk stability and pelvic girdle integrity.' },
          ],
          progressionCriteria: ['Full pain-free active lumbar range of motion in all planes', 'Negative Slump and SLR tests', '100% return to pre-injury sport or work'],
          precautionsAndContraindications: ['Maintain warm-up routines prior to heavy spine loading'],
        },
      ],
    },
    clinicalPearls: [
      'Centralization of pain during initial directional assessment predicts > 90% positive outcome with conservative therapy alone.',
      'Herniated disc resorptions occur most rapidly in large extrusions and sequestrations compared to small contained protrusions.',
    ],
  },

  {
    id: 'lumbar-spinal-stenosis',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Lumbar Spinal Stenosis (Neurogenic Claudication)',
    category: 'Degenerative Central / Foraminal Canal Stenosis',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface', 'Nerve / Neural'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Cauda Equina Syndrome with acute bladder retention or fecal incontinence.',
      'Vascular claudication red flags: Absent distal dorsalis pedis/posterior tibial pulses, cold pale lower extremity, dependent rubor, hair loss, resting foot ischemic pain.',
    ],
    when_to_refer: [
      'Severe progressive neurogenic claudication limiting walking tolerance to < 50 meters despite 3 months structured therapy.',
      'Progressive bilateral motor weakness or drop foot.',
    ],
    outcome_measures: [
      { name: 'Zurich Claudication Questionnaire (ZCQ)', mcid: '0.5 points', target: '<= 1.5' },
      { name: 'Shuttle Walk Test / Walking Distance', mcid: '50 meters', target: '>= 500 meters' },
      { name: 'Oswestry Disability Index (ODI)', mcid: '12 points', target: '<= 25%' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'Bicycle Ergometer Test differentiates neurogenic from vascular claudication: patient leans forward on cycle, which opens the central canal and resolves neurogenic symptoms, whereas vascular claudication produces calf ischemia regardless of spine flexion.',
      vivaQuestions: [
        {
          question: 'What is the "shopping cart sign" and what is its biomechanical explanation?',
          answer: 'Patients with lumbar canal stenosis lean forward on a shopping cart because lumbar flexion increases canal cross-sectional area by up to 16% and neural foramen area by 24%, relieving microvascular ischemia of the cauda equina.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Bilateral diffuse aching, heaviness, and numbness in the buttocks, thighs, and calves induced by standing and walking; promptly relieved by sitting down or forward bending.',
    bedsideAssessmentTests: [
      {
        testName: 'Two-Stage Treadmill Test / Bicycle Ergometer Test',
        sensitivity: '88%',
        specificity: '82%',
        techniqueAndInterpretation: 'Walking flat induces symptoms early; walking on an incline or cycling in flexed posture delays symptoms significantly in lumbar stenosis.',
        evidenceCitation: 'Suri et al. Spine J; Tomkins-Lane et al. Spine.',
      },
      {
        testName: 'Lumbar Extension-Rotation (Kemp) Test',
        sensitivity: '70%',
        specificity: '68%',
        techniqueAndInterpretation: 'Passive lumbar extension combined with ipsilateral rotation. Positive if reproduction of radiating buttock/leg ache due to foraminal narrowing.',
        evidenceCitation: 'Stuber et al. J Can Chiropr Assoc.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Lumbar MRI T1/T2 axial views at L3-4, L4-5, L5-S1',
        indications: 'Evaluate dural sac cross-sectional area and ligamentum flavum hypertrophy.',
        keyFindings: 'Central canal cross-sectional area < 75 mm² (severe) or 75–100 mm² (moderate), facet arthrosis, ligamentum flavum thickening > 4mm.',
        accuracyOrYield: 'High diagnostic sensitivity for canal diameter.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Flexion-Biased Conditioning & Walking Capacity Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Canal Opening, Flexion Mobilization & Pacing',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Open central canal space through flexion postures', 'Implement interval walking with rest breaks', 'Reduce neural ischemia'],
          exercisePrescription: [
            { category: 'Canal Opening', exerciseName: 'Double Knee-to-Chest (William\'s Flexion)', dosage: '3 sets of 30s holds, 3x daily', clinicalRationale: 'Maximizes neural foraminal and spinal canal dimensions to relieve ischemic nerve root compression.' },
            { category: 'Aerobic Conditioning', exerciseName: 'Stationary Recumbent Cycling', dosage: '15–20 minutes at moderate cadence', clinicalRationale: 'Maintains cardiovascular fitness and lower extremity perfusion in a protected flexed spine position.' },
            { category: 'Pelvic Mobility', exerciseName: 'Posterior Pelvic Tilts in Supine', dosage: '20 reps, hold 5s', clinicalRationale: 'Trains flattening of lumbar lordosis to expand the canal during functional standing.' },
          ],
          progressionCriteria: ['Able to cycle 20 mins without leg numbness', 'Demonstrates posterior tilt during standing transfers'],
          precautionsAndContraindications: ['Avoid prolonged lumbar extension and backward bending postures'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Core Stabilization & Hip Mobility',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen deep abdominals to avoid excessive lordosis', 'Restore hip extension without lumbar hyperextension', 'Increase walking interval distance'],
          exercisePrescription: [
            { category: 'Trunk Stabilization', exerciseName: 'Flexion-Biased Planks on Incline Bench', dosage: '3 sets of 20–30s holds', clinicalRationale: 'Strengthens anterior abdominal wall while avoiding extension collapse.' },
            { category: 'Hip Flexibility', exerciseName: 'Hip Flexor Stretching in Posterior Tilt Position', dosage: '3 sets of 30s per side', clinicalRationale: 'Decreases anterior pelvic tilt to prevent functional canal narrowing during ambulation.' },
          ],
          progressionCriteria: ['Continuous walking distance increases by > 100 meters', 'ZCQ symptom severity score improves by 0.5 points'],
          precautionsAndContraindications: ['Do not walk through severe leg numbness or foot drop symptoms'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Strengthening & Endurance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Lower limb strengthening for sit-to-stand and stair climbing', 'Interval treadmill walking with incline'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Sit-to-Stand Squats from High Box with Neutral Spine', dosage: '3 sets of 10–12 reps', clinicalRationale: 'Strengthens quadriceps and gluteals for stair and transfer independence.' },
            { category: 'Gait Training', exerciseName: 'Incline Treadmill Walking (5–8% grade)', dosage: '15–25 minutes at comfortable pace', clinicalRationale: 'Uphill walking encourages natural trunk flexion, allowing greater distances before symptoms.' },
          ],
          progressionCriteria: ['Able to walk > 300 meters without needing to sit', 'Independence in community ADLs'],
          precautionsAndContraindications: ['Avoid downhill treadmill walking as it forces lumbar hyperextension'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Community Maintenance & Lifestyle',
          timeline: 'Weeks 10–16+',
          clinicalGoals: ['Sustain independent walking distance > 500m', 'Lifelong home exercise compliance'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Home Flexion & Cycling Program', dosage: '30 minutes 4–5x per week', clinicalRationale: 'Prevents deconditioning and maintains lumbar canal patency.' },
          ],
          progressionCriteria: ['Maintenance of symptom control at 6 months follow-up'],
          precautionsAndContraindications: ['Avoid heavy backward extension sports or heavy overhead lifts'],
        },
      ],
    },
    clinicalPearls: [
      'Incline treadmill walking is significantly better tolerated than flat walking because the forward lean naturally decompresses the canal.',
    ],
  },

  {
    id: 'lumbar-spondylolisthesis',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Lumbar Spondylolysis & Spondylolisthesis',
    category: 'Pars Interarticularis Defect / Segmental Instability',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'High-grade slip (Meyerding Grade III/IV > 50%) with progressive sacral slump or cauda equina signs.',
      'Rapid neurological motor loss in L5 distribution (foot drop).',
    ],
    when_to_refer: [
      'Acute pars stress fracture in young adolescent athlete requiring orthopaedic bracing (Boston overlap brace).',
      'High-grade spondylolisthesis (Grade III or IV) or failed conservative therapy with progressive slippage.',
    ],
    outcome_measures: [
      { name: 'ODI (Oswestry Disability Index)', mcid: '12 points', target: '<= 15%' },
      { name: 'NRS Back Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-15',
    teaching_notes: {
      clinicalReasoning: 'Single-Leg Hyperextension (Stork) test concentrates compressive and shear stress on the pars interarticularis. Meyerding classification grades slippage from Grade I (<25%) to Grade IV (75–100%) and Grade V (spondyloptosis).',
      vivaQuestions: [
        {
          question: 'What is the "Scotty Dog" sign on oblique lumbar radiograph?',
          answer: 'The anatomical outline formed by the pedicle (eye), transverse process (snout), superior articular process (ear), pars interarticularis (neck), and inferior articular process (front leg). A break across the neck represents a pars interarticularis defect (spondylolysis).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Deep focal lower back pain aggravated by lumbar hyperextension, rotation, and standing; commonly seen in gymnasts, fast bowlers, dancers, and football linemen. May have step-off deformity on palpation.',
    bedsideAssessmentTests: [
      {
        testName: 'Stork (Single-Leg Hyperextension) Test',
        sensitivity: '73%',
        specificity: '68%',
        techniqueAndInterpretation: 'Patient stands on one leg and hyperextends spine. Positive if focal pain provoked on the standing leg side (indicates ipsilateral pars stress).',
        evidenceCitation: 'Masci et al. Br J Sports Med.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing AP, Lateral and Oblique lumbar views with dynamic flexion/extension',
        indications: 'Screen for pars fracture defect and measure Meyerding slip percentage.',
        keyFindings: 'Pars defect ("collar on Scotty dog"), anterior slippage of L5 on S1, anterior translation instability on dynamic films.',
        accuracyOrYield: 'Standard initial modality.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Trunk Stabilization & Flexion-Control Spondylolisthesis Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Protection, Bone Calming & Anti-Extension Control',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Eliminate painful hyperextension stresses', 'Neutral spine motor control education', 'Hamstring flexibility'],
          exercisePrescription: [
            { category: 'Anti-Extension', exerciseName: 'Posterior Pelvic Tilt with Abdominal Hollowing', dosage: '3 sets of 15 reps, hold 5s', clinicalRationale: 'Stabilizes the lumbosacral junction in slight flexion, reducing anterior shear of L5 on S1.' },
            { category: 'Mobility', exerciseName: 'Passive Hamstring 90/90 Active Knee Extension Stretch', dosage: '3 sets of 30s per leg', clinicalRationale: 'Reduces tight hamstring posterior pelvic pull that stresses lumbosacral junction.' },
          ],
          progressionCriteria: ['Pain-free during normal walking and transfers', 'Able to hold neutral pelvic position for 60 seconds'],
          precautionsAndContraindications: ['Strictly contraindicated: Back hyperextension, cobra stretch, heavy overhead lifts'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Segmental Core Co-Contraction & Pelvic Control',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Strengthen transverse abdominis, obliques, and multifidus in neutral zone', 'Gluteal strengthening'],
          exercisePrescription: [
            { category: 'Trunk Stiffness', exerciseName: 'Dead Bug with Spinal Neutral Feedback', dosage: '3 sets of 10 reps per side', clinicalRationale: 'Challenges anterior core stability without allowing lumbar lordotic breakaway.' },
            { category: 'Gluteal Strength', exerciseName: 'Bilateral Glute Bridge with Posterior Tilt Focus', dosage: '3 sets of 12 reps, hold 3s at top', clinicalRationale: 'Builds hip extensor capacity while guarding against lumbar hyperlordosis.' },
          ],
          progressionCriteria: ['Zero extension flare-ups during daily routines', 'Sustains 45-second front plank with neutral spine'],
          precautionsAndContraindications: ['Avoid spinal hyperextension under load'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Dynamic Functional Strength & Hip Loading',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Hip hinge and squat progression without spinal shear', 'Trunk anti-rotation endurance'],
          exercisePrescription: [
            { category: 'Functional Loading', exerciseName: 'Goblet Squat to Parallel Box', dosage: '3 sets of 10 reps', clinicalRationale: 'Anterior weight placement facilitates upright torso and limits lumbar shear.' },
            { category: 'Anti-Rotation', exerciseName: 'Standing Cable Pallof Press', dosage: '3 sets of 12 reps per side', clinicalRationale: 'Develops resistance against rotational shearing across the pars defect.' },
          ],
          progressionCriteria: ['Pain-free sports-specific drills', 'ODI < 15%'],
          precautionsAndContraindications: ['Progress gradually into extension only if asymptomatic'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Sport & Maintenance',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Return to competitive sports / occupational activity', 'Lifelong core maintenance'],
          exercisePrescription: [
            { category: 'Athletic Conditioning', exerciseName: 'Controlled Medicine Ball Slams & Multi-Planar Lunges', dosage: '4 sets of 10 reps', clinicalRationale: 'Builds functional deceleration power without hyperextending lumbar segments.' },
          ],
          progressionCriteria: ['Full clearance by sports physiotherapist / orthopaedic specialist'],
          precautionsAndContraindications: ['Continue ongoing core hygiene routine'],
        },
      ],
    },
    clinicalPearls: [
      'Adolescent athletes presenting with hyperextension back pain must be treated as acute pars stress fractures until proven otherwise with MRI or CT.',
    ],
  },

  {
    id: 'lumbar-mechanical-facet-syndrome',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Mechanical Low Back Pain & Facet Joint Arthropathy',
    category: 'Posterior Column / Facet Articulation Arthrosis',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Bone'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Unexplained weight loss, night pain unremitting with rest (malignancy rule out).',
      'History of inflammatory spondyloarthropathy (ankylosing spondylitis with morning stiffness > 60 mins improving with exercise).',
    ],
    when_to_refer: [
      'Failure to respond to 8 weeks active rehabilitation, consider diagnostic medial branch block.',
    ],
    outcome_measures: [
      { name: 'Oswestry Disability Index (ODI)', mcid: '10 points', target: '<= 15%' },
      { name: 'NRS Back Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Kemp/Quadrant test compresses the ipsilateral facet joint. Absence of radicular symptoms below the knee and relief with flexion strongly distinguishes facet syndrome from discogenic radiculopathy.',
      vivaQuestions: [
        {
          question: 'Which nerve innervates the lumbar facet joints?',
          answer: 'The medial branch of the posterior primary ramus of the spinal nerve. Each facet joint receives dual innervation from the medial branch at the same level and the level above.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Unilateral or bilateral localized low back pain radiating into the buttock or posterior thigh (rarely below knee). Pain is exacerbated by prolonged standing, lumbar extension and ipsilateral rotation; eased by sitting or walking with a slight forward lean.',
    bedsideAssessmentTests: [
      {
        testName: 'Kemp\'s Quadrant Test (Extension-Rotation)',
        sensitivity: '70%',
        specificity: '67%',
        techniqueAndInterpretation: 'Passive lumbar extension, lateral flexion, and rotation towards the affected side. Positive if local facet joint pain reproduced.',
        evidenceCitation: 'Schneider et al. Spine.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP and Lateral lumbar spine views',
        indications: 'Screen for facet joint hypertrophy, joint space narrowing, and osteophytosis.',
        keyFindings: 'Facet sclerosis and subchondral bony changes.',
        accuracyOrYield: 'Modest correlation with clinical symptoms.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Facet Decompression, Core Stabilization & Hip Dissociation Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Acute Facet Decompression & Pain Modulating',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Decompress loaded zygapophyseal joints', 'Normalize hypertonic erector spinae', 'Restore painless pelvic tilting'],
          exercisePrescription: [
            { category: 'Decompression', exerciseName: 'Single and Double Knee to Chest Flexion', dosage: '3 sets of 30s holds', clinicalRationale: 'Gaps the posterior facet joints and reduces intra-articular capsular tension.' },
            { category: 'Mobility', exerciseName: 'Cat-Camel Gentle Lumbar Mobilization', dosage: '2 sets of 10 slow cycles', clinicalRationale: 'Restores gentle segmental sagittal excursion and stimulates synovial fluid flow.' },
          ],
          progressionCriteria: ['Pain-free standing for > 20 minutes', 'Reduction in morning stiffness to < 15 mins'],
          precautionsAndContraindications: ['Avoid forced hyperextension and combined rotation loading'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Pelvic Dissociation & Segmental Stabilizer Conditioning',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Dissociate hip movement from lumbar spine', 'Condition transverse abdominis and deep multifidus'],
          exercisePrescription: [
            { category: 'Stability', exerciseName: 'McGill Curl-Up (One Knee Bent, Hands Under Spine)', dosage: '3 sets of 8 reps, hold 8s', clinicalRationale: 'Activates rectus and obliques without creating high lumbar compressive loads.' },
            { category: 'Hip Dissociation', exerciseName: 'Side-Lying Clamshells with Neutral Spine', dosage: '3 sets of 15 reps with band', clinicalRationale: 'Strengthens gluteus medius to eliminate lateral pelvic tilt and facet shear during gait.' },
          ],
          progressionCriteria: ['Pain on Kemp test reduced by >= 50%', 'Good segmental control during hip hinge'],
          precautionsAndContraindications: ['Avoid uncontrolled end-range extension postures'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Strength & Multi-Planar Endurance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Progressive load tolerance in deadlifts and squats with neutral spine', 'Improve rotational control'],
          exercisePrescription: [
            { category: 'Strength', exerciseName: 'Trap Bar Deadlift (High Handles)', dosage: '3 sets of 8–10 reps', clinicalRationale: 'Encourages upright torso angle and hip dominance, minimizing facet shear.' },
            { category: 'Endurance', exerciseName: 'Side Planks with Hip Abduction', dosage: '3 sets of 20–30s holds per side', clinicalRationale: 'Strengthens quadratus lumborum and abdominal obliques for lateral spinal stabilization.' },
          ],
          progressionCriteria: ['ODI < 15%', 'Able to perform sustained standing work without pain'],
          precautionsAndContraindications: ['Maintain neutral spine during heavy loading'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Ergonomics & Spine Health',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Ergonomic workplace adjustments', 'Lifelong activity integration'],
          exercisePrescription: [
            { category: 'Ergonomics', exerciseName: 'Active Workstation Pacing & Posture Variation Routine', dosage: 'Every 45 minutes', clinicalRationale: 'Prevents static creep of posterior capsular structures.' },
          ],
          progressionCriteria: ['Patient self-manages minor symptoms independently'],
          precautionsAndContraindications: ['Continue regular exercise routine'],
        },
      ],
    },
    clinicalPearls: [
      'True facet syndrome pain is almost always alleviated by sitting and forward flexion, unlike discogenic back pain which worsens in flexion.',
    ],
  },

  {
    id: 'lumbar-sij-dysfunction',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Sacroiliac Joint (SIJ) Dysfunction / Sacroiliitis',
    category: 'Pelvic Ring / Ligamentous SIJ Arthropathy',
    tissue_group: 'soft',
    tissue_types: ['Ligament', 'Articular Surface'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Bilateral severe sacroiliitis in young male with HLA-B27 positivity (Ankylosing Spondylitis / Spondyloarthritis).',
      'Pelvic fracture after trauma or insufficiency fracture in elderly osteoporotic patient.',
    ],
    when_to_refer: [
      'High suspicion of axial spondyloarthritis (rheumatology referral).',
      'Persistent severe pelvic ring pain failing conservative care.',
    ],
    outcome_measures: [
      { name: 'Pelvic Girdle Questionnaire (PGQ)', mcid: '10 points', target: '<= 15%' },
      { name: 'NRS Buttock Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'No single SIJ test is reliable alone; Laslett\'s cluster requires at least 3 out of 5 positive pain provocation tests (Distraction, Thigh Thrust, Compression, Sacral Thrust, Gaenslen\'s) for high diagnostic accuracy.',
      vivaQuestions: [
        {
          question: 'What is the diagnostic accuracy of Laslett\'s SIJ pain provocation cluster?',
          answer: 'When at least 3 of the 5 tests are positive, sensitivity is 91% and specificity is 78–87% for diagnosing SIJ pain, provided centralization (disc pathology) has been ruled out.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Unilateral buttock and posterior thigh pain centered over the posterior superior iliac spine (PSIS / Fortin\'s finger test area). Aggravated by single-leg standing, stair climbing, lunging, and rolling over in bed.',
    bedsideAssessmentTests: [
      {
        testName: 'Laslett SIJ Provocation Cluster (Thigh Thrust, Distraction, Compression, Sacral Thrust)',
        sensitivity: '91%',
        specificity: '87%',
        positiveLikelihoodRatio: '4.3',
        techniqueAndInterpretation: 'Cluster of 5 tests. 3 or more positive tests reproduces the patient\'s concordant buttock pain over the Fortin area.',
        evidenceCitation: 'Laslett et al. Eur Spine J.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'MRI Pelvis / SIJ with coronal STIR sequence',
        indications: 'Assess subchondral bone marrow edema indicative of active sacroiliitis.',
        keyFindings: 'Subchondral bone marrow edema on STIR sequences indicates active sacroiliitis; rules out insufficiency fracture.',
        accuracyOrYield: 'Gold standard for inflammatory sacroiliitis.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Pelvic Force Closure & Form Closure Stabilization Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Pelvic Ring Stabilization & Pain Calming',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Reduce shearing stress across the SIJ', 'Provide temporary pelvic belt support if needed', 'Normalize asymmetric pelvic muscle tone'],
          exercisePrescription: [
            { category: 'Force Closure', exerciseName: 'Isometric Supine Adductor Squeeze with Pillow', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Recruits adductors and pelvic floor to stabilize pubic symphysis and SI joint anteriorly.' },
            { category: 'External Support', exerciseName: 'Sacroiliac Joint Trochanteric Belt Application', dosage: 'Worn during weight-bearing activities for 2–3 weeks', clinicalRationale: 'Increases articular force closure and dampens micro-shear during ambulation.' },
          ],
          progressionCriteria: ['Decreased pain on rolling in bed and sit-to-stand', 'Able to stand on single leg for 10s without sharp groin/buttock pain'],
          precautionsAndContraindications: ['Avoid wide-base lunges and unilateral impact hopping'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Active Force Closure & Myofascial Sling Recruitment',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen posterior oblique sling (gluteus maximus + contralateral latissimus dorsi)', 'Strengthen anterior oblique sling'],
          exercisePrescription: [
            { category: 'Posterior Sling', exerciseName: 'Single-Leg Glute Bridge with Contralateral Cable Pull', dosage: '3 sets of 10 reps per side', clinicalRationale: 'Co-contracts gluteus maximus and contralateral latissimus dorsi across the thoracolumbar fascia.' },
            { category: 'Pelvic Stability', exerciseName: 'Side-Lying Hip Abduction with Neutral Pelvis', dosage: '3 sets of 15 reps', clinicalRationale: 'Enhances gluteus medius dynamic restraint against vertical pelvic drop.' },
          ],
          progressionCriteria: ['3 or fewer provocation tests positive', 'Walking tolerance > 45 minutes'],
          precautionsAndContraindications: ['Avoid asymmetric twisting under heavy loads'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Weight-Bearing & Dynamic Balance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Taper off SIJ belt', 'Integrate bilateral and split-stance loading', 'Stair climbing without pain'],
          exercisePrescription: [
            { category: 'Split-Stance', exerciseName: 'Split Squats with Neutral Pelvic Alignment', dosage: '3 sets of 8–10 reps per leg', clinicalRationale: 'Progressively loads sagittal pelvic mechanics under controlled tension.' },
            { category: 'Frontal Stability', exerciseName: 'Step-Ups with Controlled Eccentric Lowering', dosage: '3 sets of 12 reps per leg', clinicalRationale: 'Reconditions pelvic girdle dynamic stability on stair ascents.' },
          ],
          progressionCriteria: ['Full independence without pelvic belt', 'PGQ score < 15%'],
          precautionsAndContraindications: ['Maintain symmetrical pelvic alignment during exercises'],
        },
        {
          phaseNumber: 4,
          phaseName: 'High-Demand Resiliency & Sports Return',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Return to sport or unrestricted physical tasks', 'Maintenance pelvic sling strength'],
          exercisePrescription: [
            { category: 'Sports Integration', exerciseName: 'Multi-Directional Lateral Bounds and Farmer Walks', dosage: '3 sets of 30m', clinicalRationale: 'Restores rapid neuromuscular stabilization of the pelvic ring during impact.' },
          ],
          progressionCriteria: ['Pain-free return to all pre-injury sporting and daily activities'],
          precautionsAndContraindications: ['Continue ongoing gluteal and core maintenance'],
        },
      ],
    },
    clinicalPearls: [
      'The "Fortin Finger Test": patient points with one finger directly to the PSIS within 1 cm—highly indicative of SIJ etiology rather than lumbar disc.',
    ],
  },

  {
    id: 'lumbar-piriformis-syndrome',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Piriformis Syndrome / Deep Gluteal Space Syndrome',
    category: 'Extraspinal Sciatic Nerve Entrapment',
    tissue_group: 'soft',
    tissue_types: ['Muscle & Tendon', 'Nerve / Neural'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Pelvic malignancy or mass in greater sciatic notch compressing nerve.',
      'Progressive motor drop foot indicating severe axonal sciatic compression.',
    ],
    when_to_refer: [
      'Severe intractable sciatica unresponsive to conservative care; consider diagnostic ultrasound-guided piriformis block or surgical decompression.',
    ],
    outcome_measures: [
      { name: 'NRS Buttock and Sciatic Pain', mcid: '2 points', target: '<= 2/10' },
      { name: 'Lower Extremity Functional Scale (LEFS)', mcid: '9 points', target: '>= 70/80' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-18',
    teaching_notes: {
      clinicalReasoning: 'FAIR test (Flexion, Adduction, Internal Rotation) stretches the piriformis across the sciatic nerve, reproducing buttock and radiating pain. Absence of low back pain and negative lumbar tests differentiate from spinal radiculopathy.',
      vivaQuestions: [
        {
          question: 'What is the FAIR test and why does it elicit sciatic symptoms in piriformis syndrome?',
          answer: 'The hip is placed in 90° Flexion, Adduction, and Internal Rotation. In this position, the piriformis acts as an internal rotator and abductor; placing it on maximum stretch compresses the sciatic nerve against the greater sciatic notch.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Deep buttock ache and sciatica-like leg symptoms worsened by prolonged sitting on hard surfaces ("wallet sign"), driving, or walking up stairs. Lower back itself is typically non-tender and pain-free.',
    bedsideAssessmentTests: [
      {
        testName: 'FAIR Test (Flexion, Adduction, Internal Rotation)',
        sensitivity: '88%',
        specificity: '83%',
        techniqueAndInterpretation: 'Patient in side-lying; hip flexed to 90°, maximally adducted and internally rotated while clinician stabilizes pelvis. Positive if reproduces buttock and radiating leg pain.',
        evidenceCitation: 'Fishman et al. Arch Phys Med Rehabil.',
      },
      {
        testName: 'Pace Test (Resisted Hip Abduction in Sitting)',
        sensitivity: '72%',
        specificity: '76%',
        techniqueAndInterpretation: 'Patient sits with knees flexed; resists bilateral hip abduction and external rotation. Positive if deep gluteal pain elicited.',
        evidenceCitation: 'Pace & Nagle. West J Med.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'MRI Pelvis with neurography sequences focused on deep gluteal space',
        indications: 'Evaluate piriformis hypertrophy, anatomical sciatic nerve bifurcations, and exclude pelvic masses.',
        keyFindings: 'Piriformis muscle asymmetry/hypertrophy and sciatic nerve T2 hyperintensity at greater sciatic notch.',
        accuracyOrYield: 'Useful to rule out intrapelvic lesions.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Deep Gluteal Decompression & Sciatic Neurodynamic Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Nerve Calming, Tissue Release & Sitting Ergonomics',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Remove compressive sitting pressure', 'Release hypertonic piriformis and deep rotators', 'Gentle sciatic sliders'],
          exercisePrescription: [
            { category: 'Ergonomics', exerciseName: 'Gel Cushion / Pressure Relief & Removal of Back-Pocket Wallet', dosage: 'Continuous during sitting', clinicalRationale: 'Directly removes mechanical focal compression of the sciatic nerve in the subgluteal space.' },
            { category: 'Soft Tissue', exerciseName: 'Gentle Myofascial Foam Roller / Tennis Ball to Deep Gluteal Space', dosage: '2 minutes per side, gentle pressure', clinicalRationale: 'Modulates hypertonicity of lateral hip rotators without creating neural ischemia.' },
            { category: 'Neurodynamics', exerciseName: 'Sciatic Sliders in Seated Slump Position', dosage: '2 sets of 10 reps, 2x daily', clinicalRationale: 'Promotes non-provocative longitudinal nerve gliding through the piriformis tunnel.' },
          ],
          progressionCriteria: ['Able to sit for 30 minutes without numbness', 'Negative FAIR test reproduction of distal pain'],
          precautionsAndContraindications: ['Avoid aggressive, painful overstretching of the piriformis as it flares neural inflammation'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Hip Rotator Dissociation & Gluteal Muscle Activation',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen primary gluteus maximus and medius to offload piriformis over-recruitment', 'Restore full hip internal rotation'],
          exercisePrescription: [
            { category: 'Gluteal Activation', exerciseName: 'Side-Lying Clamshells with Neutral Hip Extension', dosage: '3 sets of 12–15 reps', clinicalRationale: 'Activates posterior fibers of gluteus medius, reducing compensatory reliance on piriformis.' },
            { category: 'Mobility', exerciseName: 'Prone Hip Internal Rotation Mobilization', dosage: '3 sets of 10 slow reps per leg', clinicalRationale: 'Restores capsular hip IR mobility to reduce passive tension during gait stance.' },
          ],
          progressionCriteria: ['Normal gait without buttock guarding', 'Pace test negative'],
          precautionsAndContraindications: ['Ensure gluteus maximus fires before hamstrings during hip extension'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Strength & Pelvic Dynamic Loading',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Progress to closed-chain single-leg loading', 'Increase tolerance to prolonged sitting and running'],
          exercisePrescription: [
            { category: 'Closed Chain', exerciseName: 'Step-Downs with Lateral Pelvic Alignment', dosage: '3 sets of 10 reps per side', clinicalRationale: 'Controls femoral internal rotation and valgus, eliminating dynamic impingement of sciatic nerve.' },
            { category: 'Strength', exerciseName: 'Romanian Deadlifts with Dumbbells', dosage: '3 sets of 10 reps', clinicalRationale: 'Strengthens posterior kinetic chain through eccentric loading.' },
          ],
          progressionCriteria: ['LEFS score > 72/80', 'Complete resolution of radiating paresthesia'],
          precautionsAndContraindications: ['Gradually reintroduce running on soft surfaces'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Return to Running & Maintenance',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Full return to sport / long-distance driving', 'Sustained symptom freedom'],
          exercisePrescription: [
            { category: 'Return to Sport', exerciseName: 'Interval Running Progression & Hip Mobility Maintenance', dosage: '3x weekly', clinicalRationale: 'Restores endurance capacity of deep hip rotators under repetitive athletic loading.' },
          ],
          progressionCriteria: ['Able to drive > 2 hours without buttock ache or leg symptoms'],
          precautionsAndContraindications: ['Maintain periodic stretching and active sitting breaks'],
        },
      ],
    },
    clinicalPearls: [
      'Piriformis is often acting as a secondary stabilizer when gluteus maximus and medius are inhibited; treating only the piriformis without strengthening the gluteals leads to rapid recurrence.',
    ],
  },

  {
    id: 'lumbar-post-op-discectomy',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Post-operative Lumbar Microdiscectomy / Laminectomy',
    category: 'Post-Surgical Lumbar Spine Rehabilitation',
    tissue_group: 'soft',
    tissue_types: ['Disc', 'Nerve / Neural'],
    acuity: 'post-op',
    irritability: 'Mod',
    healing_stage: 'proliferative',
    red_flags: [
      'Surgical site infection: Erythema, wound purulent drainage, high fever, severe unremitting wound pain.',
      'Dural tear headache: Severe postural headache markedly worse sitting/standing, relieved lying flat; clear fluid leakage from surgical wound.',
      'Sudden recurrence of severe radiculopathy or cauda equina syndrome (re-herniation or epidural hematoma).',
    ],
    when_to_refer: [
      'Immediate spine surgeon evaluation for wound breakdown, CSF leak, or acute severe motor deficit.',
    ],
    outcome_measures: [
      { name: 'Oswestry Disability Index (ODI)', mcid: '12.8 points', target: '<= 15%' },
      { name: 'NRS Back and Leg Pain', mcid: '2 points', target: '<= 2/10' },
      { name: 'Timed Up and Go (TUG)', mcid: '3.4 seconds', target: '< 10 seconds' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'Early active rehabilitation commencing at 4–6 weeks post-discectomy improves functional recovery without increasing re-herniation rates, provided loaded lumbar flexion, heavy lifting, and rotation are restricted in the initial 6 weeks.',
      vivaQuestions: [
        {
          question: 'What is the BLT rule following lumbar spine surgery?',
          answer: 'No Bending, no Lifting (> 5 kg), and no Twisting of the lumbar spine for the first 6 weeks post-operatively to protect the annular repair and surgical wound healing.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Post-operative recovery following single or multi-level lumbar microdiscectomy/laminectomy for radiculopathy. Surgical incision healing, residual mild nerve irritation or numbness, and lumbar paraspinal weakness.',
    bedsideAssessmentTests: [
      {
        testName: 'Post-operative Neurological Exam (Sensory, Motor, Reflexes)',
        sensitivity: '90%',
        specificity: '85%',
        techniqueAndInterpretation: 'Systematic testing of L4, L5, and S1 dermatomes, myotomes (tibialis anterior, EHL, peroneals, gastroc-soleus), and patellar/Achilles reflexes to confirm nerve root decompression.',
        evidenceCitation: 'van der Windt et al. Cochrane Database Syst Rev.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Post-operative lumbar MRI with and without gadolinium contrast',
        indications: 'Reserved for suspected early re-herniation vs epidural scar fibrosis or epidural hematoma.',
        keyFindings: 'Gadolinium enhances epidural fibrosis/scar tissue, whereas recurrent disc herniation remains non-enhancing in early post-contrast phase.',
        accuracyOrYield: 'Distinguishes recurrent disc from scar.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Structured 4-Phase Post-Lumbar Microdiscectomy Rehabilitation Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Wound Protection, Walking & Neural Mobilization',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Incision site healing', 'Strict adherence to No Bending, Lifting (>5kg), Twisting (BLT)', 'Frequent progressive walking'],
          exercisePrescription: [
            { category: 'Walking Program', exerciseName: 'Daily Short-Interval Walking on Flat Surface', dosage: '10–15 minutes, 3–4x daily', clinicalRationale: 'Prevents epidural venous stasis and promotes gentle neural excursion without mechanical shear.' },
            { category: 'Neural Mobilization', exerciseName: 'Gentle Seated Sciatic Sliders', dosage: '2 sets of 10 reps', clinicalRationale: 'Prevents fibrous periradicular tethering of the decompressed nerve root in the surgical canal.' },
            { category: 'Bed Mobility', exerciseName: 'Log-Roll Technique for All Bed Transfers', dosage: 'Every transfer', clinicalRationale: 'Eliminates torsional stress across healing surgical annular defect.' },
          ],
          progressionCriteria: ['Clean dry surgical wound without infection', 'Walking 30 minutes daily without fatigue', 'Independent pain-free log-roll'],
          precautionsAndContraindications: ['Strictly no lumbar flexion, twisting, or lifting > 5 kg; no prolonged sitting > 30 minutes'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Gentle Motor Control & Core Activation',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Reactivate transverse abdominis and multifidus', 'Restore hip hinge mechanics', 'Progress sitting tolerance to 45 mins'],
          exercisePrescription: [
            { category: 'Core Stability', exerciseName: 'Supine Abdominal Drawing-In with Neutral Spine', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Restores neuromuscular recruitment of deep stabilizer feed-forward mechanisms.' },
            { category: 'Posterior Chain', exerciseName: 'Quadruped Bird-Dog (Leg Only Initial Progression)', dosage: '3 sets of 8 reps per leg', clinicalRationale: 'Strengthens multifidus and erector spinae with negligible intradiscal pressure.' },
            { category: 'Hip Hinge', exerciseName: 'Dowel-Assisted Neutral Spine Hip Hinge', dosage: '3 sets of 10 reps', clinicalRationale: 'Teaches hip-pelvis dissociation so bend occurs at the hips, not lumbar spine.' },
          ],
          progressionCriteria: ['Able to sit for 45 minutes comfortably', 'No radicular recurrence during exercises', 'ODI improved by > 15 points'],
          precautionsAndContraindications: ['Avoid heavy lifting > 10 kg; maintain neutral lumbar spine during all movements'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Strengthening & Endurance',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Progressive load tolerance', 'Safe lifting training', 'Return to light occupational duties'],
          exercisePrescription: [
            { category: 'Lifting Mechanics', exerciseName: 'Box Lift with Neutral Spine (5 to 12 kg)', dosage: '3 sets of 8 reps', clinicalRationale: 'Re-trains safe ergonomics for lifting loads close to the center of gravity.' },
            { category: 'Core Endurance', exerciseName: 'Side Bridge and Front Plank from Knees to Toes', dosage: '3 sets of 20–30s holds', clinicalRationale: 'Builds isometric endurance of abdominal wall to stabilize lumbar segments.' },
          ],
          progressionCriteria: ['Able to lift 10 kg from floor with perfect hip-hinge mechanics', 'ODI < 20%'],
          precautionsAndContraindications: ['Avoid ballistic or loaded twisting'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Full Functional & Athletic Reconditioning',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Return to unrestricted work and recreational sports', 'Long-term spinal self-management'],
          exercisePrescription: [
            { category: 'Reconditioning', exerciseName: 'Multi-Directional Agility and Cardiovascular Fitness Program', dosage: '30–40 minutes, 3–4x weekly', clinicalRationale: 'Restores high-level physical capacity and confidence for daily life.' },
          ],
          progressionCriteria: ['Full surgical clearance by operating spine surgeon', 'Normal motor power and gait'],
          precautionsAndContraindications: ['Maintain lifelong spine hygiene and warm-up routines'],
        },
      ],
    },
    clinicalPearls: [
      'Early structured walking and log-rolling education reduces post-operative complications and hospital length of stay.',
    ],
  },

  {
    id: 'lumbar-osteoporotic-compression-fracture',
    joint: 'Lumbar Spine & Pelvis',
    name: 'Osteoporotic Vertebral Compression Fracture (L1–L5)',
    category: 'Metabolic Bone / Traumatic or Insufficiency Fracture',
    tissue_group: 'hard',
    tissue_types: ['Bone'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Acute severe neurological compression: Bilateral lower extremity weakness, sensory level, or bowel/bladder disturbance indicating canal compromise.',
      'Multiple myeloma or osteolytic metastasis red flags: Night pain, multiple vertebral levels, unexplained hypercalcemia, weight loss.',
    ],
    when_to_refer: [
      'Severe intractable pain failing conservative management; consult spine surgeon / interventional radiologist for vertebroplasty / kyphoplasty consideration.',
      'Progressive kyphotic collapse > 30° or posterior wall retroversion into spinal canal.',
    ],
    outcome_measures: [
      { name: 'NRS Back Pain', mcid: '2 points', target: '<= 3/10' },
      { name: 'QUALEFFO-41 (Quality of Life in Osteoporosis)', mcid: '5 points', target: '<= 30' },
      { name: 'Timed Up and Go (TUG)', mcid: '3.4 seconds', target: '< 12 seconds' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-19',
    teaching_notes: {
      clinicalReasoning: 'Vertebral percussion test has high specificity (90%) for acute fracture. MRI STIR hyperintensity confirms whether a vertebral deformity is acute/subacute (marrow edema) versus chronic healed collapse.',
      vivaQuestions: [
        {
          question: 'Why are flexion exercises and flexion mobilizations contraindicated in osteoporotic compression fractures?',
          answer: 'Flexion creates high compressive forces on the anterior vertebral body column, which is already weakened and wedged, risking further anterior collapse and loss of vertebral height.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Sudden onset of severe, localized midline thoracic or lumbar back pain after minimal trauma (e.g., coughing, bending forward, stepping off a curb). Pain is aggravated by standing, walking, and turning in bed; relieved by recumbent resting.',
    bedsideAssessmentTests: [
      {
        testName: 'Closed-Fist Vertebral Percussion Test',
        sensitivity: '87%',
        specificity: '90%',
        positiveLikelihoodRatio: '8.7',
        techniqueAndInterpretation: 'Firm percussion with a closed fist along the spinous processes of the entire spine. Positive if sharp, focal bony tenderness elicited over the fractured level.',
        evidenceCitation: 'Langdon et al. Emerg Med J.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing AP and Lateral thoracic and lumbar spine views',
        indications: 'Screen for anterior wedging, loss of vertebral height (> 20%), and kyphosis.',
        keyFindings: 'Anterior wedging deformity, endplate fracture; Genant semi-quantitative grading.',
        accuracyOrYield: 'First-line screening modality.',
      },
      {
        modality: 'MRI Scan',
        description: 'Sagittal T1, T2, and STIR sequences of lumbar spine',
        indications: 'Differentiate acute/subacute fracture with bone marrow edema from chronic healed fracture.',
        keyFindings: 'T1 hypointensity and prominent STIR hyperintensity in acute compression fracture.',
        accuracyOrYield: 'Gold standard for fracture chronicity and retropulsion.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Extension-Biased Osteoporotic Vertebral Rehabilitation & Fall Prevention Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Pain Calming, Safe Bed Transfers & Extension Postural Support',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Pain control with minimal bed rest', 'Safe log-roll transfers and posture education', 'Thoracic hyperextension support'],
          exercisePrescription: [
            { category: 'Postural Alignment', exerciseName: 'Prone Lying with Pillows or Supine Head/Back Support', dosage: '15–20 minutes, 2–3x daily', clinicalRationale: 'Relieves anterior column axial load and prevents progressive wedge collapse.' },
            { category: 'Deep Breathing', exerciseName: 'Diaphragmatic Deep Breathing and Thoracic Expansion', dosage: '10 deep breaths every hour', clinicalRationale: 'Maintains pulmonary vital capacity and avoids basilar atelectasis.' },
            { category: 'Extensor Tone', exerciseName: 'Gentle Scapular Retractions in Upright Seated Position', dosage: '2 sets of 10 reps, hold 5s', clinicalRationale: 'Activates rhomboids and middle trapezius to counteract thoracic kyphosis.' },
          ],
          progressionCriteria: ['Able to transfer out of bed with log-roll pain-free', 'Able to walk 10 minutes with rolling walker or stick'],
          precautionsAndContraindications: ['STRICTLY CONTRAINDICATED: Lumbar or thoracic flexion exercises (curl-ups, crunches, toe-touches, slouch sitting)'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Spinal Extensor Strengthening & Hip Mobility',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen posterior spinal extensors (erector spinae, multifidus)', 'Improve hip mobility to offload spine', 'Progress unassisted ambulation'],
          exercisePrescription: [
            { category: 'Spinal Extension', exerciseName: 'Prone Scapular Retraction and Head Lift (Prone Cobra)', dosage: '3 sets of 8 reps, hold 3–5s', clinicalRationale: 'Strengthens thoracic and lumbar erector spinae without anterior compressive shear.' },
            { category: 'Hip Extension', exerciseName: 'Standing Hip Abduction and Extension with Chair Support', dosage: '3 sets of 10 reps per leg', clinicalRationale: 'Strengthens gluteals for stable pelvic control during gait.' },
          ],
          progressionCriteria: ['Significant reduction in VAS score by >= 3 points', 'Independent walking without assistive device in home'],
          precautionsAndContraindications: ['Avoid heavy lifting > 3 kg and twisting movements'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Balance, Proprioception & Fall Prevention',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Fall prevention training', 'Postural stability and endurance', 'Bone loading via weight-bearing impact'],
          exercisePrescription: [
            { category: 'Balance', exerciseName: 'Tandem Stance and Single-Leg Balance Drills Near Wall', dosage: '3 sets of 20s holds per stance', clinicalRationale: 'Reduces future fall risk, which is the primary cause of recurrent fractures.' },
            { category: 'Axial Loading', exerciseName: 'Brisk Walking Program with Proper Shock-Absorbing Footwear', dosage: '20–30 minutes daily', clinicalRationale: 'Provides osteogenic mechanical stimulation to promote bone mineral density.' },
          ],
          progressionCriteria: ['TUG score < 12 seconds', 'Zero falls in 60 days'],
          precautionsAndContraindications: ['Ensure safety support nearby during all balance exercises'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Lifelong Osteoporosis Management & Bone Health',
          timeline: 'Weeks 10–16+',
          clinicalGoals: ['Lifelong progressive resistance and balance regimen', 'Liaison with endocrinology for bone anti-resorptive therapy'],
          exercisePrescription: [
            { category: 'Resistance Training', exerciseName: 'Progressive Resistance Training with Light Dumbbells (Extension-Biased)', dosage: '2–3x weekly', clinicalRationale: 'Stimulates bone remodeling and maintains skeletal muscle mass.' },
          ],
          progressionCriteria: ['Patient adheres to safe movement guidelines in all daily activities'],
          precautionsAndContraindications: ['Lifelong avoidance of loaded spinal flexion and rotational impact'],
        },
      ],
    },
    clinicalPearls: [
      'Sinaki\'s classic study proved that back-extension exercises reduce recurrent vertebral fractures, whereas flexion exercises dramatically increase recurrence by up to 89%.',
    ],
  },

  // ==========================================
  // CERVICAL SPINE (6 Conditions)
  // ==========================================
  {
    id: 'cervical-radiculopathy',
    joint: 'Cervical Spine',
    name: 'Cervical Radiculopathy (C5–C7 Nerve Root Compression)',
    category: 'Cervical Disc / Foraminal Neurovascular Compression',
    tissue_group: 'soft',
    tissue_types: ['Disc', 'Nerve / Neural'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Cervical Myelopathy: Upper motor neuron signs (Hoffmann sign, Babinski sign, clonus, wide-based ataxic gait, inverted supinator reflex).',
      'Progressive motor deficit in upper limb (e.g., wrist drop C7, deltoid paralysis C5).',
    ],
    when_to_refer: [
      'Signs of cervical myelopathy (urgent spine surgical evaluation).',
      'Rapidly progressing motor paresis or failure to improve after 6–8 weeks of conservative management.',
    ],
    outcome_measures: [
      { name: 'Neck Disability Index (NDI)', mcid: '7 points (14%)', target: '<= 10%' },
      { name: 'NRS Arm Pain (0–10)', mcid: '2 points', target: '<= 2/10' },
      { name: 'Patient-Specific Functional Scale (PSFS)', mcid: '2 points', target: '>= 8/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Wainner\'s 4-variable clinical prediction rule (Spurling A, Distraction, ULTT1 median, Cervical rotation < 60°) has a specificity of 99% when all 4 are positive, confirming cervical radiculopathy.',
      vivaQuestions: [
        {
          question: 'What are the 4 tests in Wainner\'s CPR for cervical radiculopathy?',
          answer: '1. Positive Spurling\'s test A; 2. Positive Cervical Distraction test; 3. Positive Upper Limb Tension Test 1 (Median nerve); 4. Ipsilateral cervical rotation less than 60 degrees.',
        },
        {
          question: 'What neurological findings correspond to C6 vs C7 radiculopathy?',
          answer: 'C6: Biceps and brachioradialis weakness, diminished brachioradialis reflex, thumb/index finger numbness. C7: Triceps and wrist flexor weakness, diminished triceps reflex, middle finger numbness.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Unilateral neck pain radiating into the shoulder, scapular border, arm, forearm, and fingers in a dermatomal distribution. Associated with paresthesias, sensory loss, and motor weakness. Arm abduction above head (Bakody sign) often relieves pain.',
    bedsideAssessmentTests: [
      {
        testName: 'Wainner Cervical Radiculopathy CPR (Spurling, Distraction, ULTT1, Rotation <60°)',
        sensitivity: '24% (all 4 positive) / 94% (3 positive)',
        specificity: '99% (all 4 positive) / 94% (3 positive)',
        positiveLikelihoodRatio: '30.3 (when 4/4 positive)',
        techniqueAndInterpretation: 'Cluster of 4 tests. If all 4 are positive, post-test probability of cervical radiculopathy exceeds 90%.',
        evidenceCitation: 'Wainner et al. Spine (Phila Pa 1976).',
      },
      {
        testName: 'Spurling\'s Test A (Foraminal Compression)',
        sensitivity: '50% (30–60%)',
        specificity: '93% (88–100%)',
        positiveLikelihoodRatio: '7.1',
        techniqueAndInterpretation: 'Cervical extension, lateral flexion towards affected side with gentle axial load. Positive if dermatomal radiating arm pain reproduced.',
        evidenceCitation: 'Tong et al. Spine.',
      },
      {
        testName: 'Cervical Distraction Test',
        sensitivity: '44%',
        specificity: '90%',
        positiveLikelihoodRatio: '4.4',
        techniqueAndInterpretation: 'Upward axial traction applied to occiput in supine. Positive if radicular arm pain is reduced or abolished.',
        evidenceCitation: 'Rubinstein et al. Spine.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Cervical Spine 1.5T/3T Sagittal and Axial T1, T2 sequences',
        indications: 'Severe radiculopathy, progressive motor loss, or failure of conservative care.',
        keyFindings: 'Posterolateral disc herniation or uncovertebral osteophyte compressing the exiting cervical nerve root in the neural foramen.',
        accuracyOrYield: 'High diagnostic sensitivity for neural compression.',
      },
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP, Lateral, and Oblique views of cervical spine',
        indications: 'Assess disc height loss, cervical lordosis, and uncovertebral / facet osteophytes encroaching on neuroforamina.',
        keyFindings: 'Uncovertebral spurring narrowing neural foramen on oblique view.',
        accuracyOrYield: 'Good for bony anatomy, cannot visualize soft disc herniation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Directional Preference, Neurodynamics & Deep Neck Flexor Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Acute Foraminal Opening, Neurodynamics & Pain Calming',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Decompress exiting nerve root using cervical distraction and retraction', 'Centralize arm symptoms into neck', 'Gentle median nerve sliders'],
          exercisePrescription: [
            { category: 'Directional Preference', exerciseName: 'Cervical Retraction (Chin Tucks) in Supine / Sitting', dosage: '10 reps every 2 hours, hold 3–5s', clinicalRationale: 'Restores lower cervical extension and centralizes discogenic radicular symptoms.' },
            { category: 'Neurodynamics', exerciseName: 'Median Nerve Slider (Contralateral Neck Bend with Wrist Flexion)', dosage: '2 sets of 10 reps, smooth cadence', clinicalRationale: 'Promotes non-irritating longitudinal nerve excursion to relieve intraneural edema.' },
            { category: 'Postural', exerciseName: 'Thoracic Extension Mobilization over Foam Roller', dosage: '2 sets of 10 cycles', clinicalRationale: 'Reduces thoracic hyperkyphosis, which mechanically induces compensatory cervical hyperextension.' },
          ],
          progressionCriteria: ['Centralization of symptoms (pain recedes from fingers/arm back into neck)', 'NDI improves by >= 5 points', 'Able to sleep through the night without waking from arm pain'],
          precautionsAndContraindications: ['Avoid combined extension and ipsilateral rotation (Spurling position); avoid aggressive stretching'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Deep Neck Flexor Neuromuscular Re-education',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Activate longus colli and longus capitis using craniocervical flexion test biofeedback', 'Strengthen middle/lower trapezius', 'Restore full pain-free cervical rotation'],
          exercisePrescription: [
            { category: 'Deep Neck Flexors', exerciseName: 'Craniocervical Flexion with Pressure Biofeedback (22 to 28 mmHg)', dosage: '3 sets of 10 reps, 10s hold at each 2 mmHg increment', clinicalRationale: 'Re-trains deep cervical flexors without superficial sternocleidomastoid substitution.' },
            { category: 'Scapular Control', exerciseName: 'Prone Scapular Retraction and Depression (Prone Y-to-W)', dosage: '3 sets of 10 reps', clinicalRationale: 'Strengthens lower trapezius and serratus anterior to stabilize the cervical-thoracic junction.' },
          ],
          progressionCriteria: ['Able to hold 26 mmHg on biofeedback for 10 seconds x 5 reps', 'NRS arm pain <= 2/10', 'Full bilateral cervical rotation > 60°'],
          precautionsAndContraindications: ['Halt exercise if distal arm pain or paresthesias return'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Dynamic Cervico-Thoracic Strengthening & Postural Loading',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Isometric cervical multidirectional strengthening', 'Upper body closed-kinetic-chain loading', 'Desk ergonomics endurance'],
          exercisePrescription: [
            { category: 'Isometric Strengthening', exerciseName: 'Multi-Directional Isometric Cervical Holds with Elastic Band', dosage: '3 sets of 8 reps per direction, 6s hold', clinicalRationale: 'Builds balanced neck muscular endurance with minimal facet joint shear.' },
            { category: 'Posterior Shoulder', exerciseName: 'Face Pulls with External Rotation Focus', dosage: '3 sets of 12 reps', clinicalRationale: 'Reconditions posterior rotator cuff and scapular retractors for upright posture.' },
          ],
          progressionCriteria: ['NDI < 10%', 'Normal strength across all upper extremity myotomes (5/5)'],
          precautionsAndContraindications: ['Avoid heavy overhead jerking lifts'],
        },
        {
          phaseNumber: 4,
          phaseName: 'High-Demand Resiliency & Workplace Ergonomics',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Full return to sports and unrestricted occupational activities', 'Ergonomic workstation maintenance'],
          exercisePrescription: [
            { category: 'Ergonomics', exerciseName: 'Computer Workstation Optimization & Micro-Break Routine', dosage: 'Every 30–45 minutes during work', clinicalRationale: 'Prevents sustained forward head posture creep and recurrence.' },
          ],
          progressionCriteria: ['Complete functional recovery with negative Spurling and ULTT tests'],
          precautionsAndContraindications: ['Continue regular postural self-stretching and neck exercises'],
        },
      ],
    },
    clinicalPearls: [
      'The Bakody sign (patient rests hand on head to relieve arm pain) reduces tension on the C5-C6 roots and is highly suggestive of cervical radiculopathy over shoulder pathology.',
    ],
  },

  {
    id: 'cervical-spondylotic-myelopathy',
    joint: 'Cervical Spine',
    name: 'Cervical Spondylotic Myelopathy (CSM)',
    category: 'Spinal Cord Compression / Degenerative Canal Stenosis',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface', 'Nerve / Neural'],
    acuity: 'chronic',
    irritability: 'High',
    healing_stage: 'remodelling',
    red_flags: [
      'Upper Motor Neuron Signs: Hoffmann sign, Babinski response, sustained ankle clonus (> 3 beats), inverted supinator reflex.',
      'Gait ataxia: Clumsy, uncoordinated, wide-based "drunk" gait; positive Romberg test.',
      'Loss of hand dexterity: Inability to button shirts, write, or drop coins/keys from hands.',
      'Urinary urgency, hesitancy, or bowel incontinence due to corticospinal/autonomic tract compromise.',
    ],
    when_to_refer: [
      'MANDATORY URGENT SPINE SURGERY REFERRAL: Moderate-to-severe or rapidly progressive myelopathy is a surgical condition to prevent irreversible spinal cord paralysis.',
    ],
    outcome_measures: [
      { name: 'mJOA (Modified Japanese Orthopaedic Association)', mcid: '1.5 points', target: '>= 15/17' },
      { name: 'Nurick Scale', mcid: '1 grade', target: 'Grade 0–1' },
      { name: '10-Second Grip and Release Test', mcid: '5 cycles', target: '>= 20 cycles in 10s' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'Cook\'s clinical prediction rule for Cervical Myelopathy: 1. Gait deviation; 2. Positive Hoffmann test; 3. Inverted supinator sign; 4. Positive Babinski test; 5. Age > 45 years. If 3 or more of 5 are present, positive LR is 30.9.',
      vivaQuestions: [
        {
          question: 'What is the inverted supinator reflex and what does it indicate?',
          answer: 'Tapping the brachioradialis tendon (C5-C6) produces finger flexion with diminished or absent elbow flexion. It indicates a lower motor neuron lesion at C5-C6 combined with an upper motor neuron corticospinal tract lesion below that level.',
        },
      ],
    },
    isRedFlag: true,
    redFlagSeverity: 'URGENT_SAME_DAY',
    clinicalPresentation: 'Insidious onset of hand numbness, loss of fine motor dexterity (difficulty buttoning shirt, holding utensils), and stiff, clumsy, unsteady walking with a tendency to stumble or fall.',
    bedsideAssessmentTests: [
      {
        testName: 'Hoffmann Sign',
        sensitivity: '58–75%',
        specificity: '78–94%',
        positiveLikelihoodRatio: '4.8',
        techniqueAndInterpretation: 'Clinician flicks terminal phalanx of patient\'s middle finger into flexion. Positive if involuntary adduction and flexion of thumb and index finger occurs (hyperreflexia).',
        evidenceCitation: 'Cook et al. Spine; Grijalva et al. J Neurosurg.',
      },
      {
        testName: 'Inverted Supinator Sign',
        sensitivity: '61%',
        specificity: '85%',
        techniqueAndInterpretation: 'Tap styloid process of radius over brachioradialis tendon. Positive if spontaneous finger flexion and minimal elbow flexion occur.',
        evidenceCitation: 'Cook et al. Phys Ther.',
      },
      {
        testName: '10-Second Grip and Release Test',
        sensitivity: '80%',
        specificity: '75%',
        techniqueAndInterpretation: 'Patient rapidly makes a fist and opens fully for 10 seconds. Normal is >= 20 repetitions; < 20 indicates myelopathic hand impairment.',
        evidenceCitation: 'Ono et al. Spine.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Cervical Spine MRI Sagittal and Axial T1 and T2 sequences',
        indications: 'Confirm cord compression, sagittal canal diameter, and intrinsic cord signal change.',
        keyFindings: 'Canal diameter < 10 mm, obliteration of anterior/posterior CSF space, and focal T2 hyperintensity within spinal cord ("myelomalacia").',
        accuracyOrYield: 'Gold standard for cervical myelopathy diagnosis and surgical planning.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Conservative Monitoring, Gait Safety & Post-Decompression Rehab Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Safety, Fall Prevention & Specialist Surgical Evaluation',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Ensure urgent spine surgical consultation', 'Immediate fall risk mitigation and assistive device prescription', 'Avoid manipulative or hyperextension forces'],
          exercisePrescription: [
            { category: 'Safety & Gait', exerciseName: 'Prescription of Four-Point Cane or Rolling Walker for Safe Ambulation', dosage: 'Continuous when walking', clinicalRationale: 'Compensates for impaired lower extremity proprioception and prevents catastrophic falls.' },
            { category: 'Fine Motor', exerciseName: 'Gentle Hand Dexterity Exercises (TheraPutty Pinch, Pegboard)', dosage: '10 minutes daily', clinicalRationale: 'Maintains cortical representation and fine motor coordination of extrinsic/intrinsic hand muscles.' },
          ],
          progressionCriteria: ['Surgical evaluation completed and management pathway established', 'Zero falls'],
          precautionsAndContraindications: ['ABSOLUTELY CONTRAINDICATED: Cervical spinal manipulation, aggressive traction, or forced neck extension'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Proprioception, Balance & Isometric Posture',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Improve static and dynamic balance', 'Strengthen lower extremity anti-gravity musculature', 'Maintain neutral cervical posture'],
          exercisePrescription: [
            { category: 'Balance', exerciseName: 'Static Stance with Multi-Sensory Perturbations (Eyes Open/Closed with Wall Support)', dosage: '3 sets of 30s', clinicalRationale: 'Challenges vestibular and visual systems to compensate for impaired dorsal column proprioception.' },
            { category: 'Strength', exerciseName: 'Seated Leg Press and Sit-to-Stand Training', dosage: '3 sets of 10 reps', clinicalRationale: 'Strengthens quadriceps and gluteals for transfer independence.' },
          ],
          progressionCriteria: ['Demonstrates safe independent transfers', 'Maintains stable mJOA score without deterioration'],
          precautionsAndContraindications: ['Monitor weekly for any motor or sensory neurological deterioration'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Mobility & Post-Surgical Decompression Reconditioning',
          timeline: 'Weeks 6–12',
          clinicalGoals: ['Post-operative rehabilitation following decompression (ACDF/laminoplasty)', 'Aerobic walking reconditioning'],
          exercisePrescription: [
            { category: 'Gait Training', exerciseName: 'Overground Gait Training with Obstacle Negotiation', dosage: '20 minutes, 3x weekly', clinicalRationale: 'Retrains foot clearance and step length consistency to normalize ataxic gait.' },
          ],
          progressionCriteria: ['Independent community ambulation with or without walking aid', 'mJOA score improvement by >= 2 points'],
          precautionsAndContraindications: ['Follow surgeon-specific cervical collar and movement restrictions'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Functional Maintenance & Safety',
          timeline: 'Weeks 12–24+',
          clinicalGoals: ['Long-term community mobility', 'Ongoing balance maintenance'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Lifelong Home Balance and Dexterity Program', dosage: '15 minutes daily', clinicalRationale: 'Sustains functional independence and monitors for late neurological relapse.' },
          ],
          progressionCriteria: ['Stable neurological status at 1-year follow-up'],
          precautionsAndContraindications: ['Immediate re-assessment if walking ability or dexterity deteriorates'],
        },
      ],
    },
    clinicalPearls: [
      'CSM is the most common cause of spinal cord dysfunction in adults over 55; it is frequently misdiagnosed as "normal aging" or peripheral neuropathy.',
    ],
  },

  {
    id: 'cervical-cervicogenic-headache',
    joint: 'Cervical Spine',
    name: 'Cervicogenic Headache (CGH)',
    category: 'Upper Cervical Arthropathy / Trigemino-Cervical Convergence',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Nerve / Neural', 'Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Sudden severe "thunderclap" headache reaching peak within 1 minute (Subarachnoid hemorrhage emergency).',
      'Headache with fever, neck stiffness, and photophobia (Meningitis).',
      'New onset headache with visual changes, jaw claudication, tender temporal artery in patient > 50 (Giant Cell Arteritis).',
      'Cervical artery dissection: Acute unilateral occipital/neck pain following trauma/manipulation with Horner syndrome (ptosis, miosis).',
    ],
    when_to_refer: [
      'Any red flag thunderclap headache or progressive neurological deficit (immediate emergency department).',
      'Refractory headache unresponsive to physiotherapy; consult neurologist to rule out secondary intracranial causes.',
    ],
    outcome_measures: [
      { name: 'Headache Disability Inventory (HDI)', mcid: '16 points', target: '<= 20' },
      { name: 'Headache Frequency (days/month)', mcid: '50% reduction', target: '< 4 days/month' },
      { name: 'Neck Disability Index (NDI)', mcid: '7 points', target: '<= 10%' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'Flexion-Rotation Test (FRT) specifically isolates C1-C2 (atlanto-axial) rotation, which accounts for 50% of cervical rotation. A restriction > 10° compared to normal or contralateral side has 90% sensitivity and 90% specificity for CGH.',
      vivaQuestions: [
        {
          question: 'What is the anatomical mechanism of referred pain to the head in cervicogenic headache?',
          answer: 'The trigeminocervical nucleus receives afferent convergence from upper cervical sensory nerves (C1, C2, C3) and the ophthalmic division of the trigeminal nerve (CN V1). Afferent nociception from upper cervical joints/muscles is referred to the fronto-orbital region.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Unilateral, non-throbbing headache commencing in the neck or suboccipital region and spreading to the oculo-fronto-temporal area. Aggravated by sustained neck postures or specific cervical movements; accompanied by restricted neck mobility and ipsilateral suboccipital tenderness.',
    bedsideAssessmentTests: [
      {
        testName: 'Cervical Flexion-Rotation Test (FRT)',
        sensitivity: '90% (82–95%)',
        specificity: '90% (83–96%)',
        positiveLikelihoodRatio: '9.0',
        techniqueAndInterpretation: 'Full passive cervical flexion to block C2–C7, followed by passive rotation to each side. Positive if rotation is restricted by > 10° compared to 45° norm, or pain is reproduced.',
        evidenceCitation: 'Hall et al. Cephalalgia; Ogince et al. Cephalalgia.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP open-mouth (dens view) and lateral cervical views',
        indications: 'Screen for atlanto-axial asymmetry, odontoid abnormalities, or degenerative C1-C3 arthrosis.',
        keyFindings: 'C1-C2 joint space narrowing, subchondral sclerosis; excludes dens fracture.',
        accuracyOrYield: 'Modest; primarily used to rule out bony pathology.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Upper Cervical Manual Therapy & Deep Flexor Re-education Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'C1–C2 Mobilization, Suboccipital Release & Postural Reset',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Restore C1-C2 rotational excursion on Flexion-Rotation Test', 'Release hypertonic suboccipital musculature', 'Reduce headache frequency by >= 50%'],
          exercisePrescription: [
            { category: 'Self-Mobilization', exerciseName: 'C1–C2 Self-Sustained Natural Apophyseal Glide (SNAG) with Strap', dosage: '2 sets of 6 reps, hold 2s at end-range', clinicalRationale: 'Selectively mobilizes the atlanto-axial articulation to reduce nociceptive afferent barrage into trigeminocervical nucleus.' },
            { category: 'Suboccipital Release', exerciseName: 'Suboccipital Muscle Release over Double Lacrosse Ball', dosage: '2–3 minutes, gentle sustained pressure', clinicalRationale: 'Relieves myofascial trigger points in rectus capitis posterior and obliquus capitis muscles.' },
            { category: 'Deep Flexors', exerciseName: 'Gentle Craniocervical Nodding in Supine (Head on Bed)', dosage: '3 sets of 10 nods, hold 5s', clinicalRationale: 'Selectively recruits longus capitis to restore upper cervical sagittal control.' },
          ],
          progressionCriteria: ['FRT angle increases by >= 10° towards normal (45°)', 'Headache frequency reduced by at least 50%', 'HDI score improves by >= 16 points'],
          precautionsAndContraindications: ['Screen for vertebrobasilar insufficiency and cervical arterial dysfunction prior to end-range rotation'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Deep Neck Flexor Endurance & Scapular Posture',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Build endurance of deep cervical flexors and scapular retractors', 'Correct forward head posture'],
          exercisePrescription: [
            { category: 'Endurance', exerciseName: 'Craniocervical Flexion Endurance Hold with Pressure Biofeedback', dosage: 'Hold 26–28 mmHg for 10s x 8 reps', clinicalRationale: 'Overcomes fatiguability of longus colli during prolonged computer desk work.' },
            { category: 'Scapular Control', exerciseName: 'Prone Cobra Scapular Retractions with Chin Tucked', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Counters thoracic kyphosis and forward head migration.' },
          ],
          progressionCriteria: ['Fewer than 2 headache episodes per week', 'Pain-free active cervical rotation > 70°'],
          precautionsAndContraindications: ['Avoid jaw clenching or breath-holding during neck flexor exercises'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Dynamic Cervico-Thoracic Strengthening & Functional Loading',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Multi-directional cervical isometric strengthening', 'Eliminate postural fatigue headaches'],
          exercisePrescription: [
            { category: 'Strengthening', exerciseName: 'Seated Resisted Cervical Retraction and Isometric Holds with Elastic Band', dosage: '3 sets of 10 reps, 6s hold', clinicalRationale: 'Strengthens posterior cervical and thoracic stabilizers.' },
            { category: 'Workstation Pacing', exerciseName: 'Active Workstation Micro-Break Mobility Drills', dosage: '1 minute every 45 minutes', clinicalRationale: 'Interrupts sustained static loading of upper cervical facet joints.' },
          ],
          progressionCriteria: ['Headache frequency < 1 episode per month', 'HDI score < 15'],
          precautionsAndContraindications: ['Maintain neutral spine during strength progressions'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Lifelong Self-Management & Maintenance',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Long-term headache prevention', 'Patient independence with self-SNAG technique'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Home Posture Routine and Self-SNAG as Needed', dosage: '5 minutes daily', clinicalRationale: 'Prevents recurrence of atlanto-axial hypomobility.' },
          ],
          progressionCriteria: ['Complete functional independence and self-management'],
          precautionsAndContraindications: ['Re-evaluate if headache changes in character, becomes bilateral, or exhibits migraine aura features'],
        },
      ],
    },
    clinicalPearls: [
      'Cervicogenic headache is strictly unilateral without side-shift; if headache alternates sides, suspect migraine or tension-type headache.',
    ],
  },

  {
    id: 'cervical-whiplash-associated-disorder',
    joint: 'Cervical Spine',
    name: 'Whiplash-Associated Disorders (WAD Grade I–III)',
    category: 'Acceleration-Deceleration Cervical Soft Tissue Sprain',
    tissue_group: 'soft',
    tissue_types: ['Ligament', 'Muscle & Tendon', 'Articular Surface'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Canadian C-Spine Rule High-Risk Factors: Age >= 65, dangerous mechanism (fall >= 1m, ejection, rollover, high-speed MVA), paresthesias in extremities.',
      'Upper cervical ligamentous instability: Alar ligament rupture or transverse ligament tear (clunk sensation on neck flexion, lip/tongue paresthesia, bilateral limb numbness).',
    ],
    when_to_refer: [
      'Positive Canadian C-Spine Rule requiring emergency plain radiography or CT imaging.',
      'Signs of upper cervical ligamentous instability (sharp-purser, alar ligament laxity).',
    ],
    outcome_measures: [
      { name: 'Neck Disability Index (NDI)', mcid: '7 points (14%)', target: '<= 12%' },
      { name: 'Post-Traumatic Stress (IES-R)', mcid: '10 points', target: '<= 20' },
      { name: 'NRS Neck Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-18',
    teaching_notes: {
      clinicalReasoning: 'Canadian C-Spine Rule has 99–100% sensitivity for detecting clinically important cervical spine injury after trauma. Grade I = neck complaint without physical signs; Grade II = musculoskeletal signs (decreased ROM, point tenderness); Grade III = neurological signs; Grade IV = fracture/dislocation.',
      vivaQuestions: [
        {
          question: 'What are the 3 high-risk criteria in the Canadian C-Spine Rule that mandate radiography?',
          answer: '1. Age 65 years or older; 2. Dangerous mechanism of injury (fall from > 1 meter/5 stairs, axial load to head, high-speed motor vehicle collision > 100 km/h, rollover, or ejection); 3. Paresthesias in the extremities.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Neck pain and stiffness developing within hours to 48 hours following a motor vehicle collision, sports impact, or slip-and-fall. May have associated dizziness, headache, sleep disturbance, and cognitive fatigue.',
    bedsideAssessmentTests: [
      {
        testName: 'Canadian C-Spine Rule Algorithm',
        sensitivity: '99–100%',
        specificity: '43–45%',
        positiveLikelihoodRatio: '1.8',
        techniqueAndInterpretation: 'Assess high-risk criteria, low-risk factors allowing safe ROM assessment, and ability to rotate neck 45° left and right. Determines necessity of imaging.',
        evidenceCitation: 'Stiell et al. JAMA.',
      },
      {
        testName: 'Sharp-Purser Test (Upper Cervical Instability)',
        sensitivity: '69%',
        specificity: '96%',
        techniqueAndInterpretation: 'Palm on forehead, thumb on C2 spinous process; slight flexion followed by posterior translation of head. Positive if posterior sliding motion or clunk felt with symptom relief.',
        evidenceCitation: 'Cattrysse et al. Man Ther.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: '3-View Cervical Spine (AP, Lateral, Open-mouth dens view)',
        indications: 'Indicated if Canadian C-Spine Rule criteria are met.',
        keyFindings: 'Loss of normal cervical lordosis (paraspinal spasm); excludes fracture, dislocation, or dens avulsion.',
        accuracyOrYield: 'Standard initial trauma clearance.',
      },
      {
        modality: 'CT Scan',
        description: 'Cervical Spine Thin-Slice CT with 3D reconstructions',
        indications: 'High-energy trauma or inconclusive radiographs.',
        keyFindings: 'High-resolution visualization of occult facet, lamina, or pedicle fractures.',
        accuracyOrYield: 'Gold standard for cervical fracture detection.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Active Early Mobilization & Sensorimotor Whiplash Recovery Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Reassurance, Early Gentle Movement & Collar Avoidance',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Provide evidence-based reassurance of favorable recovery', 'Avoid soft cervical collar use (prolongs disability)', 'Gentle active pain-free cervical range of motion'],
          exercisePrescription: [
            { category: 'Active ROM', exerciseName: 'Gentle Active Cervical Rotation within Pain-Free Arc', dosage: '5 reps each direction every 2 hours', clinicalRationale: 'Prevents tissue contracture and reduces central sensitization through safe proprioceptive input.' },
            { category: 'Postural Control', exerciseName: 'Scapular Clocks & Shoulder Shrugs', dosage: '2 sets of 10 reps', clinicalRationale: 'Relieves hypertonic spasm in trapezius and levator scapulae muscles.' },
            { category: 'Education', exerciseName: 'Reassurance and Normal Activity Encouragement Handout', dosage: 'Daily review', clinicalRationale: 'Reduces fear avoidance and catastrophic cognitions that predict chronicity.' },
          ],
          progressionCriteria: ['Able to rotate neck >= 45° bilaterally', 'Reduction in acute anxiety regarding movement', 'No collar dependence'],
          precautionsAndContraindications: ['Do not use prolonged cervical collar; strictly avoid high-velocity manipulation in acute WAD'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Deep Neck Flexor Training & Sensorimotor Control',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Reactivate longus colli and longus capitis', 'Sensorimotor neck retraining (joint position error)', 'Restore normal thoracic mobility'],
          exercisePrescription: [
            { category: 'Motor Control', exerciseName: 'Supine Low-Load Craniocervical Flexion Training', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Restores coordinated deep neck stabilizer control.' },
            { category: 'Sensorimotor', exerciseName: 'Laser Head Lamp Joint Position Sense (Target Relocation)', dosage: '10 trials each direction', clinicalRationale: 'Retrains impaired cervical proprioceptive mechanoreceptors.' },
          ],
          progressionCriteria: ['Cervical joint position error < 4.5 degrees', 'NDI improved by >= 7 points', 'VAS pain <= 3/10'],
          precautionsAndContraindications: ['Pace exercises to avoid dizziness or symptom flares'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Strengthening, Vestibulo-Ocular Integration & Endurance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Isometric cervical strengthening in all planes', 'Vestibulo-ocular reflex (VOR) gaze stability drills', 'Return to driving and work'],
          exercisePrescription: [
            { category: 'Vestibulo-Ocular', exerciseName: 'Gaze Stabilization VOR x1 (Head Rotation with Fixed Target)', dosage: '2 sets of 30s', clinicalRationale: 'Resolves cervicogenic dizziness and visual disturbances.' },
            { category: 'Strengthening', exerciseName: 'Multi-Directional Isometric Neck Holds with Manual Resistance', dosage: '3 sets of 6 reps, 6s hold', clinicalRationale: 'Builds protective cervical muscular stiffness against future perturbations.' },
          ],
          progressionCriteria: ['Full active cervical ROM', 'Negative Sharp-Purser and stability tests', 'NDI < 12%'],
          precautionsAndContraindications: ['Progress load gradually'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Full Functional Recovery & High-Demand Resilience',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Complete return to sports, heavy physical work, and highway driving', 'Resilience conditioning'],
          exercisePrescription: [
            { category: 'Conditioning', exerciseName: 'Full Kinetic Chain Upper Body Strength & Agility Drills', dosage: '3x weekly', clinicalRationale: 'Restores global physical confidence and endurance.' },
          ],
          progressionCriteria: ['Zero disability on NDI (< 8%) and normal quality of life'],
          precautionsAndContraindications: ['Continue periodic neck stretches and postural breaks'],
        },
      ],
    },
    clinicalPearls: [
      'Early active motion is vastly superior to cervical collars and rest; collars actually increase long-term disability and sick leave.',
    ],
  },

  {
    id: 'cervical-facet-syndrome',
    joint: 'Cervical Spine',
    name: 'Cervical Facet Joint Dysfunction / Arthrosis',
    category: 'Zygapophyseal Joint Arthropathy',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Bone'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Vertebral basilar insufficiency signs (5 Ds: Dizziness, Diplopia, Dysarthria, Dysphagia, Drop attacks; 3 Ns: Nausea, Numbness, Nystagmus).',
      'Unexplained lymphadenopathy or night sweats.',
    ],
    when_to_refer: [
      'Refractory neck pain failing conservative care; consider diagnostic cervical medial branch block.',
    ],
    outcome_measures: [
      { name: 'Neck Disability Index (NDI)', mcid: '7 points', target: '<= 10%' },
      { name: 'NRS Neck Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Cervical facet referral maps (Dwyer and Bogduk) show characteristic patterns: C2-C3 refers to occiput/head; C3-C4 refers to posterolateral neck; C4-C5 refers to base of neck; C5-C6 refers to suprascapular region; C6-C7 refers to mid-scapular border.',
      vivaQuestions: [
        {
          question: 'What is the characteristic referral pattern of the C5-C6 facet joint?',
          answer: 'Pain refers to the suprascapular fossa, upper trapezius border, and lateral shoulder, frequently mimicking subacromial shoulder pathology.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Unilateral or bilateral focal neck pain and stiffness aggravated by cervical extension, ipsilateral lateral flexion, and rotation. Absence of radicular arm pain or neurological deficits.',
    bedsideAssessmentTests: [
      {
        testName: 'Cervical Quadrant / Kemp Test',
        sensitivity: '72%',
        specificity: '70%',
        techniqueAndInterpretation: 'Passive cervical extension, lateral flexion, and rotation towards the affected side. Positive if local facet joint pain reproduced without radicular arm shooting.',
        evidenceCitation: 'Manchikanti et al. Pain Physician.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP, Lateral and Pillar views of cervical spine',
        indications: 'Screen for facet joint arthrosis, osteophytosis, and pillar sclerosis.',
        keyFindings: 'Pillar sclerosis and zygapophyseal joint narrowing.',
        accuracyOrYield: 'Modest correlation with clinical pain.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Facet Decompression, Mobilization & Deep Muscle Reconditioning Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Facet Gapping, Gentle Mobilization & Pain Modulating',
          timeline: 'Weeks 0–2',
          clinicalGoals: ['Decompress loaded zygapophyseal joint capsules', 'Gentle Maitland Grade I–II unilateral posterior-anterior (UPA) glides', 'Normalize resting muscle tone'],
          exercisePrescription: [
            { category: 'Gapping', exerciseName: 'Contralateral Cervical Lateral Flexion Stretch with Axial Lengthening', dosage: '3 sets of 20s holds', clinicalRationale: 'Gaps the ipsilateral facet joint and relieves capsular impingement.' },
            { category: 'Mobility', exerciseName: 'Gentle Active Rotation in Neutral Cervical Alignment', dosage: '10 reps each direction, 3x daily', clinicalRationale: 'Maintains synovial fluid circulation without end-range facet compression.' },
          ],
          progressionCriteria: ['Pain-free active rotation > 60°', 'Reduction in morning stiffness to < 10 mins'],
          precautionsAndContraindications: ['Avoid combined extension-rotation (quadrant) end-range loading'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Deep Neck Stabilizer Conditioning & Thoracic Mobility',
          timeline: 'Weeks 2–6',
          clinicalGoals: ['Activate deep cervical flexors and extensors', 'Improve thoracic spine extension to offload cervical facets'],
          exercisePrescription: [
            { category: 'Deep Flexors', exerciseName: 'Craniocervical Flexion Biofeedback Training', dosage: '3 sets of 10 reps, 10s holds at 24–26 mmHg', clinicalRationale: 'Stabilizes cervical segments and prevents facet shearing.' },
            { category: 'Thoracic Mobility', exerciseName: 'Seated Thoracic Rotation with Dowel Across Shoulders', dosage: '2 sets of 10 reps per side', clinicalRationale: 'Restores thoracic rotation, eliminating compensatory hypermobility of cervical facets.' },
          ],
          progressionCriteria: ['Negative Cervical Quadrant test', 'NDI improved by >= 7 points'],
          precautionsAndContraindications: ['Ensure pain remains local and mild during mobility drills'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Functional Strength & Isometric Endurance',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Isometric multi-directional neck endurance', 'Scapulothoracic strengthening'],
          exercisePrescription: [
            { category: 'Isometric', exerciseName: 'Isometric Cervical Extension and Lateral Flexion against Ball on Wall', dosage: '3 sets of 8 reps, 6s hold', clinicalRationale: 'Strengthens splenius capitis and semispinalis cervicis to support posterior column.' },
            { category: 'Scapulothoracic', exerciseName: 'Cable Rows with Retraction Focus', dosage: '3 sets of 12 reps', clinicalRationale: 'Strengthens rhomboids and middle trapezius.' },
          ],
          progressionCriteria: ['NDI < 10%', 'Pain-free full range of motion in all planes'],
          precautionsAndContraindications: ['Maintain neutral spine during strength exercises'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Postural Ergonomics & Long-Term Maintenance',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Ergonomic workspace adaptation', 'Sustained symptom relief'],
          exercisePrescription: [
            { category: 'Ergonomics', exerciseName: 'Workstation Monitor Height Adjustment & Hourly Movement Routine', dosage: 'Daily', clinicalRationale: 'Eliminates sustained static forward head tilt.' },
          ],
          progressionCriteria: ['Complete functional independence'],
          precautionsAndContraindications: ['Continue regular home mobility exercises'],
        },
      ],
    },
    clinicalPearls: [
      'Referred facet pain never exhibits true dermatomal sensory deficit or motor weakness; if neurological signs exist, evaluate for radiculopathy.',
    ],
  },

  {
    id: 'cervical-post-op-acdf',
    joint: 'Cervical Spine',
    name: 'Post-operative Anterior Cervical Discectomy & Fusion (ACDF)',
    category: 'Post-Surgical Cervical Spine Arthrodesis',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface', 'Disc'],
    acuity: 'post-op',
    irritability: 'Mod',
    healing_stage: 'proliferative',
    red_flags: [
      'Airway compromise or expanding neck hematoma: Rapidly progressive breathing difficulty, stridor, expanding tense neck swelling (Immediate surgical emergency).',
      'Severe dysphagia: Inability to swallow saliva or liquids, persistent choking.',
      'Surgical site infection or hardware failure (plate/screw pullout with sudden neck deformity or neurological deficit).',
    ],
    when_to_refer: [
      'Immediate emergency referral for breathing difficulty, expanding neck mass, or severe dysphagia.',
      'Suspected hardware displacement on imaging or sudden neurological deterioration.',
    ],
    outcome_measures: [
      { name: 'Neck Disability Index (NDI)', mcid: '7 points', target: '<= 15%' },
      { name: 'NRS Neck and Arm Pain', mcid: '2 points', target: '<= 2/10' },
      { name: 'Dysphagia Short Questionnaire', mcid: 'Resolution', target: 'Normal swallowing' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-20',
    teaching_notes: {
      clinicalReasoning: 'ACDF fuses the treated motion segment; rehabilitation must protect bony fusion incorporation while preventing adjacent segment disease through optimal thoracic mobility and scapulothoracic mechanics.',
      vivaQuestions: [
        {
          question: 'What is adjacent segment disease (ASD) following ACDF?',
          answer: 'The development of new radiculopathy or myelopathy at the mobile motion segments immediately above or below the fused cervical level, occurring at an annual rate of ~2.9% due to increased biomechanical stress.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Post-operative recovery following single or multi-level ACDF with anterior plate and interbody cage. Mild transient sore throat or difficulty swallowing (dysphagia), surgical incision healing, and cervical muscle guarding.',
    bedsideAssessmentTests: [
      {
        testName: 'Cervical Post-Op Neurological Exam & Upper Extremity Reflexes',
        sensitivity: '92%',
        specificity: '88%',
        techniqueAndInterpretation: 'Comprehensive testing of C5–T1 sensory dermatomes, motor myotomes, and deep tendon reflexes to verify successful decompression.',
        evidenceCitation: 'Hilibrand et al. J Bone Joint Surg Am.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'AP and Lateral cervical views at 6 weeks and 3 months',
        indications: 'Confirm interbody graft positioning, anterior cervical plate/screw fixation, and progressive bony trabecular bridging across the fusion cage.',
        keyFindings: 'Solid interbody trabecular bridging without hardware loosening, screw backout, or radiolucency.',
        accuracyOrYield: 'Gold standard for surveillance of fusion incorporation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Phase-Specific Post-ACDF Arthrodesis Protection & Rehabilitation Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Graft Protection, Walking & Soft Collar Compliance',
          timeline: 'Weeks 0–6',
          clinicalGoals: ['Protect interbody bone graft fusion and anterior instrumentation', 'Strict adherence to surgeon\'s collar protocol', 'Frequent walking and deep breathing'],
          exercisePrescription: [
            { category: 'Walking Program', exerciseName: 'Daily Progressive Flat-Ground Walking', dosage: '15–30 minutes daily', clinicalRationale: 'Enhances systemic circulation and prevents post-surgical venous thromboembolism.' },
            { category: 'Upper Limb Mobility', exerciseName: 'Active Scapular Retractions and Elbow/Wrist ROM below Shoulder Height', dosage: '2 sets of 10 reps', clinicalRationale: 'Prevents upper limb stiffness without placing rotational strain on cervical fusion.' },
            { category: 'Transfer Safety', exerciseName: 'Log-Roll Transfer Technique for All Bed Mobility', dosage: 'Every transfer', clinicalRationale: 'Prevents cervical torsional shear during getting in and out of bed.' },
          ],
          progressionCriteria: ['Incision well-healed without infection', 'Swallowing function normalized', 'Surgeon clearance at 6-week follow-up'],
          precautionsAndContraindications: ['NO cervical active range of motion; no lifting > 3 kg; no overhead reaching; wear collar as prescribed'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Collar Weaning, Gentle Active ROM & Scapular Re-education',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Gradually wean cervical collar per surgeon instructions', 'Initiate gentle active cervical ROM in cardinal planes', 'Re-train scapular stabilizers'],
          exercisePrescription: [
            { category: 'Active ROM', exerciseName: 'Gentle Active Cervical Range of Motion (Flexion, Extension, Rotation)', dosage: '5 reps each direction within comfortable limits', clinicalRationale: 'Gradually restores motion at non-fused segments without stressing hardware.' },
            { category: 'Deep Flexors', exerciseName: 'Low-Load Craniocervical Flexion Nodding in Supine', dosage: '2 sets of 8 reps, 5s hold', clinicalRationale: 'Re-educates longus colli to support cervical lordosis.' },
            { category: 'Scapular Control', exerciseName: 'Prone Scapular Retraction (Prone I\'s and W\'s)', dosage: '3 sets of 10 reps', clinicalRationale: 'Strengthens middle/lower trapezius to offload cervical segments.' },
          ],
          progressionCriteria: ['Successfully weaned from collar without pain flare', 'Active cervical rotation >= 45° bilaterally', 'NDI improved by >= 10 points'],
          precautionsAndContraindications: ['No passive cervical stretching; no high-velocity manipulation; limit lifting to < 5 kg'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Submaximal Isometric Strengthening & Thoracic Mobility',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Submaximal isometric cervical strengthening', 'Restore full thoracic spine extension and rotation to protect adjacent segments', 'Progress lifting capacity'],
          exercisePrescription: [
            { category: 'Isometrics', exerciseName: 'Submaximal Multi-Directional Cervical Isometrics with Self-Resistance', dosage: '3 sets of 5 reps, 5s hold at 30% effort', clinicalRationale: 'Builds stabilizing muscular endurance without motion across the fusion site.' },
            { category: 'Thoracic Mobility', exerciseName: 'Thoracic Foam Roller Extension Mobilization', dosage: '2 sets of 10 slow passes', clinicalRationale: 'Optimizes thoracic mobility, directly shielding adjacent cervical motion segments from excessive stress.' },
          ],
          progressionCriteria: ['Solid fusion confirmed on 3-month radiographs', 'NDI < 15%', 'Normal upper extremity strength (5/5)'],
          precautionsAndContraindications: ['Avoid heavy overhead loading and contact sports'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Functional Reconditioning & Lifelong Spine Care',
          timeline: 'Weeks 14–24+',
          clinicalGoals: ['Full return to work and recreational activities', 'Long-term prevention of adjacent segment disease'],
          exercisePrescription: [
            { category: 'Reconditioning', exerciseName: 'Total Body Resistance and Cardiovascular Conditioning Program', dosage: '3x weekly', clinicalRationale: 'Maintains optimal musculoskeletal health and bone density.' },
          ],
          progressionCriteria: ['Full functional independence with zero residual neurological symptoms'],
          precautionsAndContraindications: ['Maintain lifelong postural hygiene and ergonomics'],
        },
      ],
    },
    clinicalPearls: [
      'Adjacent segment disease can be significantly reduced by prioritizing thoracic mobility and scapulothoracic strength to prevent hypermobility at segments bordering the fusion.',
    ],
  },

  // ==========================================
  // THORACIC SPINE & RIBS (4 Conditions)
  // ==========================================
  {
    id: 'thoracic-outlet-syndrome',
    joint: 'Thoracic Spine & Ribs',
    name: 'Thoracic Outlet Syndrome (Neurogenic TOS / Scalene Triangle)',
    category: 'Neurovascular Compression / Cervicothoracic Aperture',
    tissue_group: 'soft',
    tissue_types: ['Nerve / Neural', 'Muscle & Tendon'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Vascular TOS - Arterial: Sudden cold, pale, pulseless upper extremity; severe resting hand ischemia (Arterial thrombosis emergency).',
      'Vascular TOS - Venous (Paget-Schroetter syndrome): Acute unilateral whole-arm swelling, cyanosis, distended superficial collateral chest veins (Subclavian vein DVT).',
      'Pancoast tumor: Apical lung mass producing TOS symptoms plus Horner syndrome (ptosis, miosis, anhidrosis).',
    ],
    when_to_refer: [
      'Immediate vascular surgery consultation for acute arterial ischemia or venous thrombosis (Paget-Schroetter).',
      'Suspected Pancoast apical lung tumor or severe progressive hand intrinsic muscle atrophy (Gilliatt-Sumner hand).',
    ],
    outcome_measures: [
      { name: 'Disabilities of the Arm, Shoulder and Hand (DASH)', mcid: '10.8 points', target: '<= 15' },
      { name: 'Cervicothoracic Pain NRS', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-17',
    teaching_notes: {
      clinicalReasoning: 'Roos test (Elevated Arm Stress Test - EAST) stresses all 3 anatomical spaces: interscalene triangle, costoclavicular space, and subcoracoid space. Reproduction of ischemic heaviness, paresthesia, and inability to maintain 3 minutes is highly positive.',
      vivaQuestions: [
        {
          question: 'What are the 3 anatomical spaces where neurovascular bundle entrapment occurs in TOS?',
          answer: '1. Interscalene triangle (between anterior scalene, middle scalene, and first rib); 2. Costoclavicular space (between clavicle and first rib); 3. Subcoracoid/pectoralis minor space (under pectoralis minor tendon).',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Diffuse aching pain, numbness, paresthesias, and heaviness in the shoulder, medial arm, and 4th–5th digits (lower trunk C8-T1 distribution). Aggravated by overhead activities, carrying heavy loads, or prolonged computer work.',
    bedsideAssessmentTests: [
      {
        testName: 'Roos Test / Elevated Arm Stress Test (EAST)',
        sensitivity: '84%',
        specificity: '83%',
        techniqueAndInterpretation: 'Shoulders abducted 90°, external rotation, elbows 90°; patient slowly opens and closes fists for 3 minutes. Positive if unable to maintain 3 minutes due to pain, ischemic fatigue, or numbness.',
        evidenceCitation: 'Roos DB. Ann Surg; Povlsen et al. Cochrane Database Syst Rev.',
      },
      {
        testName: 'Adson\'s Test',
        sensitivity: '79%',
        specificity: '76%',
        techniqueAndInterpretation: 'Palpate radial pulse; patient extends neck and rotates head towards symptomatic side while taking a deep breath and holding. Positive if obliteration of pulse and reproduction of paresthesias.',
        evidenceCitation: 'Plewa & Delinger. Ann Emerg Med.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Cervical Spine AP and Lateral + Dedicated Thoracic Inlet views',
        indications: 'Screen for congenital cervical rib, elongated C7 transverse process, or first rib exostosis.',
        keyFindings: 'Cervical rib articulating with first rib or elongated C7 transverse process encroaching on scalene triangle.',
        accuracyOrYield: 'Defines anatomical osseous variants.',
      },
      {
        modality: 'Diagnostic Ultrasound (MSK US)',
        description: 'Duplex Ultrasound of Subclavian Artery and Vein with dynamic provocative maneuvers',
        indications: 'Assess arterial flow velocity acceleration and venous compression during arm abduction.',
        keyFindings: 'Subclavian artery velocity ratio > 2.0 or complete vein occlusion in provocative abduction.',
        accuracyOrYield: 'First-line non-invasive vascular evaluation.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'First Rib Mobilization, Scalene Lengthening & Scapular Suspension Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Space Expansion, First Rib Decompression & Pacing',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Expand thoracic inlet aperture dimensions', 'Decompress the 1st rib using caudal mobilization', 'Lengthen hypertonic anterior/middle scalenes and pectoralis minor'],
          exercisePrescription: [
            { category: 'First Rib Mobilization', exerciseName: 'Self-First Rib Caudal Mobilization with Strap / Towel', dosage: '3 sets of 8 deep breaths with downward strap pull', clinicalRationale: 'Depresses the 1st rib to open the interscalene and costoclavicular spaces.' },
            { category: 'Scalene Release', exerciseName: 'Gentle Scalene Lengthening with Axial Retraction', dosage: '3 sets of 20s per side', clinicalRationale: 'Decreases anterior/middle scalene spasm compressing the lower trunk of the brachial plexus.' },
            { category: 'Diaphragmatic Breathing', exerciseName: 'Diaphragmatic Breathing Education (De-emphasizing Accessory Scalene Breathing)', dosage: '5 minutes, 3x daily', clinicalRationale: 'Shifts ventilation away from scalenes and sternocleidomastoid, reducing accessory rib elevation.' },
          ],
          progressionCriteria: ['Able to hold Roos position for > 90 seconds without ischemic pain', 'Reduction in nocturnal arm waking numbness'],
          precautionsAndContraindications: ['Avoid aggressive overhead carrying, heavy backpack straps, or forceful neurodynamic stretching'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Scapular Suspension & Postural Re-alignment',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen upper trapezius and serratus anterior to elevate depressed clavicle', 'Lengthen pectoralis minor'],
          exercisePrescription: [
            { category: 'Clavicular Elevation', exerciseName: 'Scapular Shrugs with Slight Upward Rotation (Upper Trapezius)', dosage: '3 sets of 12 reps, 3s hold at top', clinicalRationale: 'Elevates the clavicle to increase costoclavicular space height.' },
            { category: 'Pectoralis Minor', exerciseName: 'Corner Pectoralis Minor Stretch with Arms at 120°', dosage: '3 sets of 30s', clinicalRationale: 'Opens subcoracoid tunnel and corrects protracted scapular slump.' },
          ],
          progressionCriteria: ['Roos test maintained for full 3 minutes', 'DASH score improved by >= 11 points'],
          precautionsAndContraindications: ['Ensure shrugging does not trigger scalene muscle co-activation'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Neurodynamics & Functional Upper Limb Strength',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Brachial plexus sliders without symptom provocation', 'Strengthen serratus anterior and lower trapezius for overhead clearance'],
          exercisePrescription: [
            { category: 'Neurodynamics', exerciseName: 'Brachial Plexus Median/Ulnar Nerve Gliders', dosage: '2 sets of 10 smooth reps', clinicalRationale: 'Restores longitudinal neural mobility through the cervicothoracic junction.' },
            { category: 'Serratus Strength', exerciseName: 'Serratus Wall Slides with Foam Roller and Band', dosage: '3 sets of 10 reps', clinicalRationale: 'Promotes upward rotation of scapula during overhead reaching.' },
          ],
          progressionCriteria: ['Tolerates sustained overhead work for > 15 minutes without numbness', 'DASH < 15'],
          precautionsAndContraindications: ['Pace overhead loading to avoid sensory recurrence'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Workplace Ergonomics & Athletic Conditioning',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Full return to high-demand activities, carrying, and sports', 'Workstation ergonomic maintenance'],
          exercisePrescription: [
            { category: 'Ergonomics', exerciseName: 'Forearm Support and Armrest Optimization at Desk Workstation', dosage: 'Daily continuous', clinicalRationale: 'Supports arm weight to eliminate traction forces on the brachial plexus.' },
          ],
          progressionCriteria: ['Zero symptoms during normal daily and athletic tasks'],
          precautionsAndContraindications: ['Continue periodic first-rib stretching and diaphragmatic breathing'],
        },
      ],
    },
    clinicalPearls: [
      'In "droopy shoulder syndrome" (depressed clavicle), strengthening the upper trapezius elevates the clavicle away from the first rib, whereas traditional stretching of upper trap makes TOS worse.',
    ],
  },

  {
    id: 'thoracic-disc-intercostal-neuralgia',
    joint: 'Thoracic Spine & Ribs',
    name: 'Thoracic Intervertebral Disc Herniation & Intercostal Neuralgia',
    category: 'Thoracic Motion Segment / Band-Like Radicular Neuralgia',
    tissue_group: 'soft',
    tissue_types: ['Disc', 'Nerve / Neural'],
    acuity: 'acute',
    irritability: 'High',
    healing_stage: 'inflammatory',
    red_flags: [
      'Thoracic spinal cord myelopathy: Bilateral lower extremity spasticity, sensory level around torso (e.g., T4 nipple, T10 umbilicus), Babinski sign, gait ataxia.',
      'Visceral red flags: Dissecting thoracic aortic aneurysm (tearing chest pain radiating to back), myocardial infarction, pulmonary embolism, pleurisy.',
      'Spinal infection: Spondylodiscitis with fever, elevated ESR/CRP, unremitting night ache.',
    ],
    when_to_refer: [
      'Emergency referral for any signs of thoracic myelopathy (cord compression in narrow thoracic canal can lead to paraplegia).',
      'Unexplained acute severe chest/back pain requiring emergency medical rule-out of aortic or cardiac pathology.',
    ],
    outcome_measures: [
      { name: 'NRS Chest/Back Pain (0–10)', mcid: '2 points', target: '<= 2/10' },
      { name: 'Oswestry Disability Index (ODI)', mcid: '10 points', target: '<= 15%' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-18',
    teaching_notes: {
      clinicalReasoning: 'Thoracic disc herniation accounts for < 1% of all disc herniations, but can compress the spinal cord easily due to small canal diameter and watershed vascular supply (T4-T9). Pain follows a hemi-girdle or dermatomal band around the rib cage.',
      vivaQuestions: [
        {
          question: 'Why is the thoracic spinal cord particularly vulnerable to compression from a herniated disc?',
          answer: 'The thoracic spinal canal has the narrowest spinal cord-to-canal ratio in the entire spine, and the thoracic cord has a tenuous watershed vascular supply from T4 to T9, making small central herniations prone to producing rapid myelopathy.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Sharp, stabbing or burning pain wrapping around the chest wall in a dermatomal hemi-girdle distribution. Aggravated by coughing, deep inspiration, trunk rotation, and forward flexion.',
    bedsideAssessmentTests: [
      {
        testName: 'Slump Test (Thoracic Focus with Rib Depression)',
        sensitivity: '78%',
        specificity: '80%',
        techniqueAndInterpretation: 'Seated slump posture with combined thoracic rotation; positive if reproduces dermatomal band-like intercostal shooting pain and relieved by cervical extension.',
        evidenceCitation: 'Stuber et al. J Can Chiropr Assoc.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'MRI Scan',
        description: 'Thoracic Spine Sagittal and Axial T1, T2 sequences',
        indications: 'Confirm thoracic disc herniation, evaluate cord compression, and exclude epidural abscess or neoplasm.',
        keyFindings: 'Focal disc protrusion/extrusion with cord indentation or neural foramen compromise.',
        accuracyOrYield: 'Gold standard for thoracic disc pathology.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Thoracic Extension, Segmental De-Loading & Neurodynamic Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Spinal De-Loading, Breathing & Pain Calming',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Decompress thoracic disc segment', 'Centralize radicular band symptoms', 'Normalize shallow guarded breathing'],
          exercisePrescription: [
            { category: 'De-loading', exerciseName: 'Prone Thoracic Extension over Pillow / Small Towel Roll', dosage: '10 minutes, 2x daily', clinicalRationale: 'Relieves anterior column disc pressure and facilitates centralization.' },
            { category: 'Breathing', exerciseName: 'Lateral Rib Cage Diaphragmatic Expansion Drills', dosage: '10 slow breaths every 2 hours', clinicalRationale: 'Mobilizes costovertebral joints gently without high torsional shear.' },
            { category: 'Protection', exerciseName: 'Avoidance of Loaded Flexion and End-Range Rotational Lifting', dosage: 'Continuous', clinicalRationale: 'Protects annular integrity during acute inflammation.' },
          ],
          progressionCriteria: ['Abolition of anterior chest wall radiating pain (centralized to midline thoracic spine)', 'NRS pain reduced by >= 3 points'],
          precautionsAndContraindications: ['Strictly contraindicated: Thoracic rotational high-velocity thrust manipulation in acute disc herniation'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Segmental Postural Control & Extensor Strengthening',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen thoracic erector spinae and rhomboids', 'Gentle intercostal neurodynamic sliders'],
          exercisePrescription: [
            { category: 'Extensor Strength', exerciseName: 'Prone Scapular Retraction and Thoracic Extension Lift', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Strengthens middle/lower thoracic stabilizers to maintain neutral spine.' },
            { category: 'Neurodynamics', exerciseName: 'Gentle Seated Thoracic-Intercostal Nerve Gliders', dosage: '2 sets of 8 reps', clinicalRationale: 'Restores intercostal nerve excursion along the subcostal groove.' },
          ],
          progressionCriteria: ['Pain-free deep inspiration and coughing', 'Negative slump test for intercostal shooting'],
          precautionsAndContraindications: ['Avoid heavy ballistic torso twisting'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Multi-Planar Strength & Trunk Stiffness',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Build rotational anti-shear trunk stiffness', 'Return to normal functional carrying'],
          exercisePrescription: [
            { category: 'Anti-Rotation', exerciseName: 'Standing Cable Pallof Press with Narrow Stance', dosage: '3 sets of 12 reps per side', clinicalRationale: 'Develops robust abdominal oblique strength to resist rotational shear across the disc.' },
            { category: 'Functional Loading', exerciseName: 'Trap Bar Deadlifts with Strict Neutral Thoracic Spine', dosage: '3 sets of 8–10 reps', clinicalRationale: 'Builds whole-body posterior chain loading capacity.' },
          ],
          progressionCriteria: ['ODI < 15%', 'Normal tolerance to 8 hours seated work'],
          precautionsAndContraindications: ['Maintain neutral spine during loaded lifts'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Full Functional & Athletic Return',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Unrestricted sports and heavy occupational activities', 'Long-term postural conditioning'],
          exercisePrescription: [
            { category: 'Functional Return', exerciseName: 'Rotational Medicine Ball Throws (Controlled Hip-Driven)', dosage: '3 sets of 10 reps', clinicalRationale: 'Integrates safe hip-driven rotation rather than excessive thoracic spine twisting.' },
          ],
          progressionCriteria: ['Full pain-free functional capacity and negative neurological testing'],
          precautionsAndContraindications: ['Maintain ongoing spinal extension hygiene'],
        },
      ],
    },
    clinicalPearls: [
      'Thoracic disc pain is frequently mistaken for cardiac angina, cholecystitis, or nephrolithiasis before MRI establishes spinal origin.',
    ],
  },

  {
    id: 'thoracic-costochondritis',
    joint: 'Thoracic Spine & Ribs',
    name: 'Costochondritis & Tietze Syndrome',
    category: 'Anterior Chest Wall / Costochondral Cartilage Inflammation',
    tissue_group: 'hard',
    tissue_types: ['Articular Surface', 'Bone'],
    acuity: 'chronic',
    irritability: 'Mod',
    healing_stage: 'remodelling',
    red_flags: [
      'Acute Coronary Syndrome (ACS): Substernal pressure radiating to jaw/left arm, diaphoresis, shortness of breath (Emergency medical rule-out).',
      'Pulmonary embolism: Sudden pleuritic chest pain, hemoptysis, tachycardia, tachypnea, DVT history.',
      'Pneumothorax: Sudden unilateral pleuritic pain with absent breath sounds on auscultation.',
    ],
    when_to_refer: [
      'Immediate emergency department evaluation for any unexplained acute chest pain until cardiac/pulmonary causes are fully ruled out.',
    ],
    outcome_measures: [
      { name: 'NRS Anterior Chest Pain', mcid: '2 points', target: '<= 1/10' },
      { name: 'Chest Wall Palpation Pain Scale', mcid: 'Resolution', target: 'No tenderness on palpation' },
    ],
    evidence_strength: 'Systematic review',
    last_reviewed: '2026-08-15',
    teaching_notes: {
      clinicalReasoning: 'Tietze syndrome is characterized by palpable, visible non-suppurative swelling of the costochondral junctions (most commonly 2nd or 3rd rib), whereas costochondritis produces localized point tenderness without swelling.',
      vivaQuestions: [
        {
          question: 'What is the key clinical difference between Costochondritis and Tietze Syndrome?',
          answer: 'Costochondritis presents with tenderness of multiple costochondral junctions without visible swelling, typically in adults > 40. Tietze syndrome involves localized, visible inflammatory swelling of a single costochondral junction (usually 2nd or 3rd rib), commonly in young adults < 40.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Localized anterior chest wall pain and tenderness at the costochondral or chondrosternal junctions (typically 2nd to 5th ribs). Aggravated by deep breathing, coughing, sneezing, and trunk twisting; exquisitely tender to direct fingertip palpation.',
    bedsideAssessmentTests: [
      {
        testName: 'Direct Costochondral Junction Palpation & Crowing Rooster Maneuver',
        sensitivity: '92%',
        specificity: '88%',
        positiveLikelihoodRatio: '7.7',
        techniqueAndInterpretation: 'Firm fingertip palpation over 2nd–5th costochondral junctions reproduces concordant chest pain; Crowing Rooster maneuver (passive neck/shoulder hyperextension with traction) reproduces anterior chest stretch pain.',
        evidenceCitation: 'Proulx & Zryd. Am Fam Physician; Gregory et al. J Emerg Med.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'CXR (Chest X-ray PA and Lateral)',
        indications: 'Mandatory rule-out of pneumonia, pneumothorax, rib fractures, and mediastinal pathology.',
        keyFindings: 'Normal lung parenchyma and ribs; excludes intrathoracic pathology.',
        accuracyOrYield: 'Essential exclusion test.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Posterior Rib Mobilization, Pectoral Release & Thoracic Decompression Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Posterior Rib Gapping, Pain Modulating & Medical Clearance',
          timeline: 'Weeks 0–3',
          clinicalGoals: ['Confirm full medical clearance for cardiac/pulmonary causes', 'Mobilize hypomobile posterior costovertebral joints to offload anterior costochondral junction', 'Reduce resting chest wall tension'],
          exercisePrescription: [
            { category: 'Posterior Mobilization', exerciseName: 'Thoracic Peanut / Foam Roller Mobilization over Costovertebral Joints', dosage: '2–3 minutes gentle extension passes', clinicalRationale: 'Restores posterior rib excursion; anterior costochondral hypermobility is often secondary to posterior rib joint stiffness.' },
            { category: 'Pectoral Release', exerciseName: 'Gentle Doorway Pectoralis Major/Minor Stretch', dosage: '3 sets of 20s holds at 90°', clinicalRationale: 'Reduces anterior traction forces exerted on inflamed costochondral junctions.' },
            { category: 'Breathing', exerciseName: 'Slow Diaphragmatic Lateral Costal Breathing', dosage: '10 deep breaths, 3x daily', clinicalRationale: 'Promotes symmetric expansion without high anterior sternal shear.' },
          ],
          progressionCriteria: ['Direct palpation tenderness reduced by >= 50%', 'Pain-free deep breathing and coughing'],
          precautionsAndContraindications: ['Avoid heavy push-ups, dips, or ballistic bench pressing'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Postural Alignment & Scapulothoracic Strengthening',
          timeline: 'Weeks 3–6',
          clinicalGoals: ['Strengthen scapular retractors to reduce anterior slouching', 'Improve thoracic spine rotational mobility'],
          exercisePrescription: [
            { category: 'Scapular Retraction', exerciseName: 'Seated Band Pull-Aparts with Scapular Pinch', dosage: '3 sets of 12 reps', clinicalRationale: 'Opens the anterior chest wall and eliminates hunched posture compressing the costochondral junctions.' },
            { category: 'Thoracic Mobility', exerciseName: 'Open-Book Thoracic Rotations in Side-Lying', dosage: '2 sets of 8 reps per side', clinicalRationale: 'Restores harmonious rotational excursion between ribs and thoracic vertebrae.' },
          ],
          progressionCriteria: ['Pain-free Crowing Rooster test', 'NRS chest pain <= 2/10'],
          precautionsAndContraindications: ['Avoid heavy direct chest compressive exercises'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Progressive Anterior Chest Loading & Push Mechanics',
          timeline: 'Weeks 6–10',
          clinicalGoals: ['Gradually reintroduce controlled pushing exercises', 'Build dynamic upper body resilience'],
          exercisePrescription: [
            { category: 'Push Mechanics', exerciseName: 'Incline Dumbbell Chest Press with Moderate Load', dosage: '3 sets of 10 reps', clinicalRationale: 'Restores anterior chest wall muscular strength with controlled scapular excursion.' },
            { category: 'Core Endurance', exerciseName: 'Front Plank from Knees to Forearms with Rib Control', dosage: '3 sets of 30s holds', clinicalRationale: 'Strengthens abdominal attachments to the lower ribs without anterior joint irritation.' },
          ],
          progressionCriteria: ['Able to perform full standard push-ups without chest pain', 'Zero palpation tenderness'],
          precautionsAndContraindications: ['Gradually progress loads'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Full Functional & Athletic Conditioning',
          timeline: 'Weeks 10–14',
          clinicalGoals: ['Return to unrestricted sports (swimming, rowing, tennis) and daily activities', 'Maintenance posture hygiene'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Thoracic Extension and Scapular Retraction Routine', dosage: '5 minutes daily', clinicalRationale: 'Prevents recurrence of posterior joint stiffness.' },
          ],
          progressionCriteria: ['Complete resolution of chest wall symptoms at 6-month follow-up'],
          precautionsAndContraindications: ['Continue regular postural self-mobilization'],
        },
      ],
    },
    clinicalPearls: [
      'In > 80% of costochondritis cases, anterior pain is secondary to stiff, locked posterior costovertebral joints; mobilizing the back of the ribs instantly reduces anterior strain.',
    ],
  },

  {
    id: 'thoracic-hyperkyphosis-scheuermann',
    joint: 'Thoracic Spine & Ribs',
    name: 'Postural Thoracic Hyperkyphosis & Scheuermann\'s Disease',
    category: 'Structural vs Postural Sagittal Plane Deformity',
    tissue_group: 'hard',
    tissue_types: ['Bone', 'Articular Surface'],
    acuity: 'chronic',
    irritability: 'Low',
    healing_stage: 'remodelling',
    red_flags: [
      'Rapidly progressive curve > 70° in growing adolescent with thoracic pain.',
      'Neurological deficits: Lower extremity hyperreflexia, clonus, or weakness (rare spinal cord compression at apex of severe kyphosis).',
    ],
    when_to_refer: [
      'Adolescent Scheuermann kyphosis > 60° (orthopaedic spine surgeon referral for Milwaukee/TLSO brace evaluation).',
      'Curve > 75° or progressive neurological symptoms (surgical fusion consideration).',
    ],
    outcome_measures: [
      { name: 'Cobb Angle of Kyphosis', mcid: '5 degrees', target: '<= 45 degrees' },
      { name: 'SRS-22 (Scoliosis Research Society Outcome Questionnaire)', mcid: '0.5 points', target: '>= 4.0/5.0' },
      { name: 'NRS Back Pain', mcid: '2 points', target: '<= 2/10' },
    ],
    evidence_strength: 'Guideline',
    last_reviewed: '2026-08-16',
    teaching_notes: {
      clinicalReasoning: 'Sorensen diagnostic criteria for structural Scheuermann\'s disease on lateral radiograph: anterior wedging >= 5 degrees at three consecutive vertebral bodies, Schmorl\'s nodes, endplate irregularity, and rigid kyphosis > 45° that does not fully correct on hyperextension.',
      vivaQuestions: [
        {
          question: 'How do you differentiate structural Scheuermann kyphosis from postural hyperkyphosis clinically?',
          answer: 'On prone extension or standing hyperextension, postural kyphosis corrects smoothly to normal lordosis/alignment; Scheuermann\'s disease exhibits a rigid, sharp, angular deformity at the apex that does not passively flatten.',
        },
      ],
    },
    isRedFlag: false,
    clinicalPresentation: 'Rigid or flexible rounding of the upper back ("hunchback"), compensatory cervical hyperlordosis, anterior shoulder posture, and thoracic aching aggravated by prolonged sitting, standing, and physical activity.',
    bedsideAssessmentTests: [
      {
        testName: 'Adam\'s Forward Bend Test (Sagittal Evaluation)',
        sensitivity: '86%',
        specificity: '82%',
        techniqueAndInterpretation: 'Patient bends forward at hips with knees straight. Evaluated from the side: rigid angular kyphotic apex indicates structural Scheuermann deformity versus smooth gentle curve in postural kyphosis.',
        evidenceCitation: 'Weiss & Goodall. Scoliosis; Tomé-Bermejo et al. EFORT Open Rev.',
      },
    ],
    investigationsProfile: [
      {
        modality: 'Plain Radiograph (X-ray)',
        description: 'Standing Full-Spine Lateral Radiograph (36-inch cassette)',
        indications: 'Measure Cobb angle of thoracic kyphosis and assess Scheuermann wedging criteria.',
        keyFindings: 'Cobb angle > 45°, >= 5° anterior wedging at >= 3 consecutive vertebrae, Schmorl\'s nodes, narrowed disc spaces.',
        accuracyOrYield: 'Gold standard for diagnosis and Cobb angle measurement.',
      },
    ],
    physiotherapyProtocol: {
      protocolName: 'Schroth-Based Sagittal Extension, Thoracic Mobilization & Pectoral Lengthening Protocol',
      phases: [
        {
          phaseNumber: 1,
          phaseName: 'Thoracic Extension Mobilization, Pectoral Release & Hamstring Lengthening',
          timeline: 'Weeks 0–4',
          clinicalGoals: ['Mobilize rigid thoracic kyphotic segment', 'Lengthen tight pectoralis major/minor and hamstrings', 'Educate on active sagittal self-correction'],
          exercisePrescription: [
            { category: 'Mobilization', exerciseName: 'Thoracic Extension over Foam Roller at Kyphotic Apex', dosage: '3 sets of 10 passes, hold 5s in extension', clinicalRationale: 'Gently mobilizes the hypomobile apical thoracic motion segments into extension.' },
            { category: 'Myofascial Lengthening', exerciseName: 'Corner Pectoral Stretch & Supine Foam Roller Chest Opener', dosage: '3 sets of 30s holds', clinicalRationale: 'Lengthens anterior chest structures to allow the shoulder girdle to retract.' },
            { category: 'Hamstring Flexibility', exerciseName: 'Active Isolated Hamstring Stretching with Strap', dosage: '3 sets of 30s per leg', clinicalRationale: 'Hamstring contracture increases posterior pelvic tilt, worsening thoracic compensatory kyphosis.' },
          ],
          progressionCriteria: ['Able to demonstrate active sagittal self-correction for 2 minutes', 'Reduction in mid-thoracic ache'],
          precautionsAndContraindications: ['Avoid loaded forward flexion exercises and heavy crunches'],
        },
        {
          phaseNumber: 2,
          phaseName: 'Posterior Extensor Strengthening & Schroth Rotational Breathing',
          timeline: 'Weeks 4–8',
          clinicalGoals: ['Strengthen thoracic erector spinae and rhomboids', 'Improve vital capacity via corrective deep breathing'],
          exercisePrescription: [
            { category: 'Extensor Strength', exerciseName: 'Prone Cobra with Scapular Depression and Retraction', dosage: '3 sets of 10 reps, 5s hold', clinicalRationale: 'Strengthens middle/lower trapezius and thoracic longissimus.' },
            { category: 'Corrective Breathing', exerciseName: 'Schroth Sagittal Expansion Breathing in Sitting with Wall Contact', dosage: '5 deep cycles, 3x daily', clinicalRationale: 'Expands collapsed anterior ribs while flattening the posterior rib hump.' },
          ],
          progressionCriteria: ['Demonstrates sustained upright posture during 30 minutes of computer work', 'SRS-22 score improves by >= 0.5 points'],
          precautionsAndContraindications: ['Ensure lumbar hyperextension is not substituted for thoracic extension'],
        },
        {
          phaseNumber: 3,
          phaseName: 'Full Kinetic Chain Strength & Posterior Chain Loading',
          timeline: 'Weeks 8–12',
          clinicalGoals: ['Posterior chain loading with deadlifts and face pulls', 'Dynamic posture endurance'],
          exercisePrescription: [
            { category: 'Posterior Loading', exerciseName: 'Trap Bar Deadlift with Strict Thoracic Extension', dosage: '3 sets of 8 reps', clinicalRationale: 'Loads entire extensor chain under axial gravity alignment.' },
            { category: 'Scapulothoracic', exerciseName: 'Cable Face Pulls with External Rotation', dosage: '3 sets of 12 reps', clinicalRationale: 'Strengthens external rotators and lower trapezius.' },
          ],
          progressionCriteria: ['Cobb angle stable or improved on follow-up', 'Zero back pain during sports activities'],
          precautionsAndContraindications: ['Maintain neutral spine during all resistance training'],
        },
        {
          phaseNumber: 4,
          phaseName: 'Long-Term Postural Maintenance & Athletic Participation',
          timeline: 'Weeks 12–16+',
          clinicalGoals: ['Lifelong posture hygiene and exercise compliance', 'Brace adherence if prescribed'],
          exercisePrescription: [
            { category: 'Maintenance', exerciseName: 'Daily Schroth Self-Correction and Extension Maintenance Program', dosage: '10 minutes daily', clinicalRationale: 'Prevents progression during remaining skeletal growth spurts.' },
          ],
          progressionCriteria: ['Skeletal maturity reached with stable curve without functional impairment'],
          precautionsAndContraindications: ['Continue regular follow-up with orthopaedic specialist until Risser grade 5'],
        },
      ],
    },
    clinicalPearls: [
      'In growing adolescents with Scheuermann\'s disease, combining structured physiotherapy with rigid bracing achieves curve correction, whereas untreated curves > 60° almost always progress.',
    ],
  },
];
