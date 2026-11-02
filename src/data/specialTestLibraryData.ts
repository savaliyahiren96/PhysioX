export interface MasterSpecialTest {
  id: string;
  testName: string;
  joint: string;
  anatomicalStructuresAssessed: string[];
  clinicalPurpose: string;
  patientPosition: string;
  therapistPosition: string;
  procedureStepByStep: string[];
  positiveTestCriteria: string;
  negativeTestCriteria: string;
  clinicalInterpretation: string;
  diagnosticAccuracy: {
    sensitivity: string;
    specificity: string;
    positiveLR?: string;
    negativeLR?: string;
    reliabilityKappa?: string;
  };
  limitations: string;
  evidenceReference: string;
  educationalDemonstrationCue: string;
}

export const MASTER_SPECIAL_TESTS_LIBRARY: MasterSpecialTest[] = [
  // 1. KNEE - LACHMAN TEST
  {
    id: 'ST-KNEE-01',
    testName: 'Lachman Test',
    joint: 'Knee',
    anatomicalStructuresAssessed: ['Anterior Cruciate Ligament (ACL)', 'Posteromedial Bundle', 'Posterolateral Bundle'],
    clinicalPurpose: 'Gold standard clinical bedside test to detect rupture or high-grade insufficiency of the Anterior Cruciate Ligament.',
    patientPosition: 'Supine on examination plinth, knee placed in 20° to 30° of passive flexion, hamstring musculature completely relaxed.',
    therapistPosition: 'Standing on the side of the affected knee, facing the patient. One hand grasps the distal anterolateral femur; the opposite hand grasps the proximal posteromedial tibia.',
    procedureStepByStep: [
      'Position patient in supine and place knee in precisely 20° to 30° flexion (utilize examiner knee or thigh as bolster underneath patient popliteal fossa).',
      'Palpate the hamstring tendons to verify complete muscular relaxation (guarding causes false negative results).',
      'Stabilize the distal femur firmly with the superior hand.',
      'Apply a brisk, firm anterior translational pull on the proximal tibia with the inferior hand while keeping the thumb on the tibial tuberosity.',
      'Assess the degree of anterior translation and the quality of the ligamentous end-feel.',
    ],
    positiveTestCriteria: 'Anterior excursion of the tibia > 3 mm compared with the contralateral normal knee, or the absence of a distinct, firm ligamentous end-feel (mushy or soft end-point).',
    negativeTestCriteria: 'Firm, crisp, abrupt end-feel with anterior tibial displacement < 3 mm symmetrical with contralateral knee.',
    clinicalInterpretation: 'Indicates high-grade or complete disruption of the ACL. Superior to anterior drawer test because at 30° flexion the posterior horn of the medial meniscus does not wedge against the femoral condyle.',
    diagnosticAccuracy: {
      sensitivity: '85% (95% CI: 81–89%)',
      specificity: '94% (95% CI: 91–97%)',
      positiveLR: '14.2',
      negativeLR: '0.16',
      reliabilityKappa: '0.82 (High inter-tester agreement)',
    },
    limitations: 'Clinician hands must be large enough to secure large thighs; hamstring spasm or apprehension in acute trauma may mask translation.',
    evidenceReference: 'Benjaminse A et al. (2006) Clinical diagnosis of an ACL rupture: a meta-analysis. JOSPT 36(5):267-288.',
    educationalDemonstrationCue: 'Always palpate the biceps femoris and semitendinosus before translation to rule out protective guarding.',
  },

  // 2. KNEE - MCMURRAY TEST
  {
    id: 'ST-KNEE-02',
    testName: 'McMurray Test',
    joint: 'Knee',
    anatomicalStructuresAssessed: ['Medial Meniscus (Posterior Horn)', 'Lateral Meniscus', 'Meniscofemoral Ligaments'],
    clinicalPurpose: 'Provocation test to detect posterior horn or body tears of the medial and lateral menisci.',
    patientPosition: 'Supine with affected limb completely relaxed and knee flexed to end range.',
    therapistPosition: 'Standing on ipsilateral side. One hand cups the heel to control rotation; the other hand palps the medial and lateral joint lines.',
    procedureStepByStep: [
      'Flex the patient’s knee to end-range (maximal flexion).',
      'For Medial Meniscus: Apply external tibial rotation and valgus stress while slowly extending the knee from 120° to 90°.',
      'For Lateral Meniscus: Apply internal tibial rotation and varus stress while extending the knee.',
      'Palpate for a palpable or audible click or sharp joint line pain along the respective joint margins.',
    ],
    positiveTestCriteria: 'Palpable or audible click, snap, or reproduction of concordant sharp joint line pain over the meniscus.',
    negativeTestCriteria: 'Smooth, painless extension without clicks, snaps, or localized joint line discomfort.',
    clinicalInterpretation: 'Indicates a torn meniscal fragment trapped between the femoral condyle and tibial plateau during compressive rotation.',
    diagnosticAccuracy: {
      sensitivity: '61% (Low sensitivity - cannot rule out tear)',
      specificity: '84% (Moderate specificity)',
      positiveLR: '3.8',
      negativeLR: '0.46',
      reliabilityKappa: '0.67',
    },
    limitations: 'Cannot detect anterior horn tears. Must be combined with joint line tenderness and Thessaly test (Composite Meniscal Score).',
    evidenceReference: 'Hegedus EJ et al. (2007) Physical examination tests of the knee: a systematic review and meta-analysis. Br J Sports Med 41(8):505-515.',
    educationalDemonstrationCue: 'Use the Thessaly test at 20° flexion alongside McMurray for comprehensive meniscal triad evaluation.',
  },

  // 3. SHOULDER - HAWKINS-KENNEDY TEST
  {
    id: 'ST-SHOULDER-01',
    testName: 'Hawkins-Kennedy Impingement Test',
    joint: 'Shoulder',
    anatomicalStructuresAssessed: ['Supraspinatus Tendon', 'Subacromial Bursa', 'Long Head of Biceps', 'Coracoacromial Ligament'],
    clinicalPurpose: 'Screening test for subacromial pain syndrome (SAPS) and external rotator cuff impingement.',
    patientPosition: 'Seated or standing upright with arms relaxed at side.',
    therapistPosition: 'Standing in front of or slightly to the side of the patient.',
    procedureStepByStep: [
      'Elevate patient\'s arm passively to 90° of forward flexion in the sagittal plane.',
      'Flex the patient\'s elbow to 90°.',
      'Support the patient\'s elbow with one hand while forcibly internally rotating the humerus with the other hand holding the wrist.',
      'Observe for reproduction of familiar pain.',
    ],
    positiveTestCriteria: 'Reproduction of the patient\'s concordant anterolateral shoulder pain as the greater tuberosity rotates under the coracoacromial ligament.',
    negativeTestCriteria: 'Full passive internal rotation without local shoulder pain.',
    clinicalInterpretation: 'Drives the greater tuberosity and supraspinatus tendon underneath the coracoacromial arch, compressing subacromial structures.',
    diagnosticAccuracy: {
      sensitivity: '80% (Excellent screening sensitivity)',
      specificity: '56% (Moderate specificity - false positives common in bursitis/capsulitis)',
      positiveLR: '1.8',
      negativeLR: '0.35',
      reliabilityKappa: '0.69',
    },
    limitations: 'High false-positive rate when isolated; must be combined with Neer test and painful arc test.',
    evidenceReference: 'Hegedus EJ et al. (2012) Which physical examination tests provide clinicians with the most value investigating shoulder pain? Br J Sports Med 46(14):964-978.',
    educationalDemonstrationCue: 'Combine with the Painful Arc and Infraspinatus MMT (Park test battery) for > 95% diagnostic certainty.',
  },

  // 4. LUMBAR SPINE - STRAIGHT LEG RAISE (LASEGUE)
  {
    id: 'ST-SPINE-01',
    testName: 'Straight Leg Raise (Lasegue Test) & Bragard Sign',
    joint: 'Lumbar Spine & Pelvis',
    anatomicalStructuresAssessed: ['L4, L5, S1 Nerve Roots', 'Sciatic Nerve Complex', 'Dura Mater & Neural Foramina'],
    clinicalPurpose: 'Detects lumbosacral nerve root compression or mechanical sensitization (radiculopathy) secondary to disc herniation.',
    patientPosition: 'Supine on plinth, head flat without high pillow, legs extended relaxed.',
    therapistPosition: 'Standing at the side of the patient facing the head.',
    procedureStepByStep: [
      'Grasp the patient’s heel and raise the extended leg passively with the knee locked in 0° extension.',
      'Monitor for onset and angle of radiating pain below the knee.',
      'If positive between 30° and 70°, lower leg slightly until pain subsides and perform passive ankle dorsiflexion (Bragard sign).',
      'Assess if Bragard dorsiflexion reproduces concordant sharp shooting leg symptoms.',
    ],
    positiveTestCriteria: 'Reproduction of concordant lancinating, electric radicular pain radiating below the knee between 30° and 70° of hip flexion, reinforced by ankle dorsiflexion.',
    negativeTestCriteria: 'Hip flexion beyond 70° with only posterior thigh hamstring tension/stretching sensation.',
    clinicalInterpretation: 'The sciatic nerve moves 2 to 6 mm at the lumbosacral foramen between 30° and 70° flexion. Reproduction below 30° may indicate acute disc extrusion; above 70° is hamstring tightness.',
    diagnosticAccuracy: {
      sensitivity: '91% (High sensitivity for lumbar disc herniation)',
      specificity: '26% (Low specificity)',
      positiveLR: '1.2',
      negativeLR: '0.3',
      reliabilityKappa: '0.88',
    },
    limitations: 'High false positives if examiner mistake tight hamstrings for true neurological radicular symptoms.',
    evidenceReference: 'van der Windt DA et al. (2010) Physical examination for lumbar radiculopathy due to disc herniation. Cochrane Database Syst Rev (2):CD007431.',
    educationalDemonstrationCue: 'Always ask the patient: "Does this pain travel past your knee into your foot or is it just tight behind your thigh?"',
  },

  // 5. CERVICAL SPINE - SPURLING TEST
  {
    id: 'ST-CERVICAL-01',
    testName: 'Spurling Neck Compression Test (Spurling A)',
    joint: 'Cervical Spine',
    anatomicalStructuresAssessed: ['C5, C6, C7, C8 Cervical Nerve Roots', 'Intervertebral Foramen', 'Uncovertebral Joints'],
    clinicalPurpose: 'Confirmatory test for cervical radiculopathy resulting from cervical disc herniation or foraminal spondylotic stenosis.',
    patientPosition: 'Seated upright in a chair with back supported and head in neutral position.',
    therapistPosition: 'Standing behind the patient with hands resting gently on patient\'s vertex.',
    procedureStepByStep: [
      'Instruct patient to laterally flex their neck toward the symptomatic side.',
      'Apply a gentle, progressive downward axial compressive force (~7 kg / 15 lbs) through the crown of the head.',
      'Stop immediately if concordant radiating symptoms occur into the ipsilateral upper limb.',
    ],
    positiveTestCriteria: 'Reproduction of sharp radicular pain or paresthesias radiating into the ipsilateral shoulder, arm, or hand in a dermatomal distribution.',
    negativeTestCriteria: 'Localized neck pain alone or no symptom reproduction.',
    clinicalInterpretation: 'Axial compression with lateral flexion narrows the neuroforaminal diameter by up to 30%, irritating sensitized cervical nerve roots.',
    diagnosticAccuracy: {
      sensitivity: '50% (Moderate sensitivity)',
      specificity: '93% (High specificity - highly confirmatory when positive)',
      positiveLR: '7.1',
      negativeLR: '0.54',
      reliabilityKappa: '0.75',
    },
    limitations: 'Contraindicated in known cervical instability, acute fracture, rheumatoid atlantoaxial subluxation, or severe cord compression.',
    evidenceReference: 'Wainner RS et al. (2003) Reliability and diagnostic accuracy of the clinical examination for cervical radiculopathy. Spine 28(1):52-62.',
    educationalDemonstrationCue: 'Wainner cluster for cervical radiculopathy: Spurling (+), Distraction (+), Upper Limb Neurodynamic Test 1 (+), Cervical Rotation < 60° = 99% specificity.',
  },

  // 6. ANKLE & FOOT - THOMPSON (SIMMONDS) TEST
  {
    id: 'ST-ANKLE-01',
    testName: 'Thompson (Simmonds) Calf Squeeze Test',
    joint: 'Ankle & Foot',
    anatomicalStructuresAssessed: ['Achilles Tendon (Tendo Achillis)', 'Gastrocnemius-Soleus Muscle Complex'],
    clinicalPurpose: 'Rule in or rule out acute complete rupture of the Achilles tendon.',
    patientPosition: 'Prone with feet hanging freely over the end of the plinth, or kneeling on a chair.',
    therapistPosition: 'Standing at the foot of the plinth.',
    procedureStepByStep: [
      'Observe resting posture of both ankles in prone (ruptured Achilles loses resting ankle plantarflexion tone - Matles test sign).',
      'Squeeze the mid-belly of the gastrocnemius muscle firmly with one or both hands.',
      'Observe for passive ankle plantarflexion.',
      'Repeat on the contralateral normal calf for comparison.',
    ],
    positiveTestCriteria: 'Absence of passive ankle plantarflexion when the calf muscle belly is squeezed.',
    negativeTestCriteria: 'Normal, prompt passive ankle plantarflexion upon calf compression.',
    clinicalInterpretation: 'Discontinuity of the Achilles tendon prevents mechanical transmission of force from the triceps surae to the calcaneus.',
    diagnosticAccuracy: {
      sensitivity: '96% (95% CI: 92–98%)',
      specificity: '98% (95% CI: 95–99%)',
      positiveLR: '48.0',
      negativeLR: '0.04',
      reliabilityKappa: '0.94',
    },
    limitations: 'May be equivocal in chronic partial tears or when plantaris tendon remains intact.',
    evidenceReference: 'Maffulli N. (1998) The clinical diagnosis of subcutaneous tear of the Achilles tendon. Am J Sports Med 26(2):266-270.',
    educationalDemonstrationCue: 'Triad for Achilles rupture: Palpable gap + Positive Thompson test + Angle of declination (Matles sign).',
  },
];
