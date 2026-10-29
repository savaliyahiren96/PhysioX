import {
  IndianInvestigationAtlasItem,
  IndianHospitalTier,
} from '../types/clinical';

export const INDIAN_INVESTIGATIONS_ATLAS: IndianInvestigationAtlasItem[] = [
  // ==========================================
  // 1. PLAIN RADIOGRAPH (X-RAY)
  // ==========================================
  {
    id: 'inv-xray-knee-weightbearing',
    modalityName: 'Plain Radiograph (X-Ray)',
    subType: 'Bilateral Weight-Bearing Standing Knee (AP, Lateral & 45° Flexion Rosenberg View)',
    bodyRegionOrSpecialty: 'Orthopaedics & Musculoskeletal',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
      'Tier 3 Sub-District / Community Health Centre (CHC) / Private Clinic',
    ],
    approximateCostINR: '₹400 – ₹900 (Govt/Ayushman: Free to ₹100; Private Diagnostic: ₹600–900)',
    ayushmanBharatCovered: true,
    purposeAndIndications: 'Essential baseline screening for knee osteoarthritis (Kellgren-Lawrence grading), joint space narrowing, subchondral sclerosis, osteophytes, and occult fracture (Ottawa Knee Rules).',
    contraindicationsAndSafety: 'Pregnancy (lead pelvic shielding mandatory). Extremely low radiation dose (~0.005 mSv, equivalent to 2 days of natural background radiation).',
    patientPreparationProtocol: 'Patient must stand fully upright with equal weight on both feet. Rosenberg view requires 45° knee flexion with anterior patellae against detector.',
    normalAnatomicalFindings: 'Symmetrical medial and lateral joint space (> 4mm in young adults), smooth rounded femoral condyles and tibial plateaus, no osteophytes, normal patellar height (Insall-Salvati ratio 0.8–1.2).',
    pathologicalFindingsAndSigns: 'Asymmetric medial joint space narrowing (< 2mm), subchondral bone sclerosis, marginal osteophyte spurring, subchondral pseudocysts (Kellgren-Lawrence Grade III/IV). In acute trauma: Segond avulsion fracture (pathognomonic for ACL tear).',
    diagnosticAccuracySensSpec: 'Sensitivity 84%, Specificity 92% for moderate-to-severe gonarthrosis. Insensitive for early pre-radiographic cartilage loss.',
    rehabilitationAndAthleticImplications: 'Guards against premature high-impact running if Kellgren-Lawrence Grade IV joint obliteration is present. Guides knee unloading braces and quad-dominant strengthening.',
    annotatedDiagramOrVisualDetails: {
      visualDescription: 'Bilateral standing PA view demonstrates the joint space under full axial bodyweight loading.',
      keyLandmarksToInspect: [
        'Medial and lateral joint space width (mm)',
        'Tibial spine sharpness and intercondylar eminence',
        'Fibular head and lateral tibial plateau margin (Segond check)',
        'Patellar alignment relative to trochlear groove on Skyline/Merchant view',
      ],
      typicalPitfallsOrArtifacts: 'Supine non-weight-bearing X-rays frequently falsely overestimate joint space by 30–50%, leading to missed degenerative collapse.',
    },
    evidenceGuidelineCitation: 'American College of Radiology (ACR) Appropriateness Criteria; Indian Orthopaedic Association (IOA) Knee Guidelines.',
    doi: '10.1016/j.jacr.2018.09.020',
  },

  // ==========================================
  // 2. HIGH-FIELD MAGNETIC RESONANCE IMAGING (MRI)
  // ==========================================
  {
    id: 'inv-mri-knee-3t',
    modalityName: 'Magnetic Resonance Imaging (MRI)',
    subType: 'High-Field 3.0T / 1.5T Dedicated Knee MRI (Proton Density Fat-Suppressed + T1 + T2 STIR)',
    bodyRegionOrSpecialty: 'Sports Medicine, Orthopaedics & Physiotherapy',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
    ],
    approximateCostINR: '₹3,500 – ₹7,500 (Govt/Medical College: ₹1,500–2,500; Private Diagnostic Centers: ₹4,000–6,500)',
    ayushmanBharatCovered: true,
    purposeAndIndications: 'Definitive evaluation of internal derangement: ACL, PCL, MCL, LCL tears, meniscal bucket-handle or root tears, osteochondral lesions, and bone marrow edema.',
    contraindicationsAndSafety: 'Non-MRI-compatible cardiac pacemakers, ferromagnetic cerebral aneurysm clips, metallic intraocular foreign bodies, severe claustrophobia (requires open-bore or sedation). Zero ionizing radiation.',
    patientPreparationProtocol: 'Remove all metallic jewellery, hairpins, watches, and magnetic strip cards. Earplugs provided for acoustic gradient noise (100 dB). Duration: 15–20 minutes.',
    normalAnatomicalFindings: 'ACL visualized as continuous low-signal (black) taut band running from posteromedial lateral femoral condyle to anterior tibial spine. Menisci appear as homogeneous low-signal dark triangles (bow-tie sign on sagittal).',
    pathologicalFindingsAndSigns: 'ACL discontinuity or horizontal high-signal fluid fiber gap on T2/PD; secondary signs: pivot-shift bone bruise pattern (lateral femoral condyle + posterolateral tibial plateau), anterior tibial translation > 7mm. Meniscus: hyperintense intrameniscal signal traversing articular surface.',
    diagnosticAccuracySensSpec: 'ACL tear: Sensitivity 95%, Specificity 97%; Meniscal tear: Sensitivity 92%, Specificity 90%.',
    rehabilitationAndAthleticImplications: 'Directs surgical reconstruction timeline vs conservative non-operative rehabilitation. Identifies meniscal repairability to mandate restricted knee flexion post-op.',
    annotatedDiagramOrVisualDetails: {
      visualDescription: 'Sagittal PD-FS sequence tracking the full trajectory of the cruciate ligaments and meniscal horns.',
      keyLandmarksToInspect: [
        'Blumensaat’s line angle relative to ACL fibers',
        'Anterior and posterior horns of medial and lateral menisci',
        'Subchondral bone marrow signal for kissing contusions',
        'Patellar cartilage thickness and retropatellar facet facets',
      ],
      typicalPitfallsOrArtifacts: 'Magic angle effect at 55° to magnetic field creating false hyperintensity in curved patellar tendon or collateral ligaments.',
    },
    evidenceGuidelineCitation: 'AAOS Clinical Practice Guideline on Anterior Cruciate Ligament Injuries (2022); ESSKA Consensus.',
    doi: '10.2519/jospt.2018.0301',
  },

  // ==========================================
  // 3. COMPUTED TOMOGRAPHY (CT SCAN)
  // ==========================================
  {
    id: 'inv-ct-dect-gout-bone',
    modalityName: 'Computed Tomography (CT Scan)',
    subType: 'Dual-Energy CT (DECT) / 128-Slice High-Resolution Bone Window CT',
    bodyRegionOrSpecialty: 'Rheumatology & Complex Orthopaedic Trauma',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
    ],
    approximateCostINR: '₹4,000 – ₹8,500 (Apex Institutes / Private Multi-Slice Imaging: ₹4,500–8,000)',
    ayushmanBharatCovered: true,
    purposeAndIndications: 'Detection of monosodium urate crystal deposition in suspected gouty arthritis; complex tibial plateau fracture depression mapping; spinal spondylolysis pars interarticularis defect.',
    contraindicationsAndSafety: 'Pregnancy. Requires contrast screening if IV contrast requested (check eGFR > 45 mL/min). Radiation dose ~ 2–4 mSv.',
    patientPreparationProtocol: 'Fasting 3 hours if IV contrast is co-administered; well-hydrated.',
    normalAnatomicalFindings: 'Crisp cortical cortical boundaries, normal trabecular bone architecture, completely green-free tissue on DECT material decomposition.',
    pathologicalFindingsAndSigns: 'DECT color-codes monosodium urate crystal tophi as vivid green deposits along joint capsules, cartilage, and tendons, distinguishing gout from pseudogout/CPPD. Fracture: 3D multiplanar reconstruction shows millimeter-scale articular surface depression.',
    diagnosticAccuracySensSpec: 'DECT for Gout: Sensitivity 88%, Specificity 90%. Bone defect detection: Sensitivity > 98%.',
    rehabilitationAndAthleticImplications: 'Accurately distinguishes crystal arthropathy from infectious arthritis. Differentiates true bone healing of pars stress fracture in young fast bowlers and gymnasts.',
    annotatedDiagramOrVisualDetails: {
      visualDescription: 'Material decomposition algorithms display green urate pixels overlaid on greyscale bone anatomy.',
      keyLandmarksToInspect: [
        '1st metatarsophalangeal, ankle, and knee joint recesses',
        'Pars interarticularis cortical continuity on oblique sagittal reconstructions',
        'Articular step-off on coronal tibial plateau reconstructions',
      ],
      typicalPitfallsOrArtifacts: 'Callus formation or metallic implants can generate beam-hardening streak artifacts.',
    },
    evidenceGuidelineCitation: 'American College of Rheumatology (ACR) / EULAR Classification Criteria for Gout; Indian Rheumatology Association (IRA).',
    doi: '10.1002/art.39254',
  },

  // ==========================================
  // 4. DIAGNOSTIC ULTRASOUND (MSK US)
  // ==========================================
  {
    id: 'inv-msk-ultrasound-shoulder',
    modalityName: 'High-Resolution Musculoskeletal Ultrasound (MSK US)',
    subType: 'Dynamic 12–18 MHz Linear Probe Ultrasound with Power Doppler',
    bodyRegionOrSpecialty: 'Sports Medicine, Rheumatology & Physiotherapy',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
      'Tier 3 Sub-District / Community Health Centre (CHC) / Private Clinic',
    ],
    approximateCostINR: '₹1,200 – ₹2,800 (Very accessible and cost-effective across Indian private diagnostic clinics)',
    ayushmanBharatCovered: true,
    purposeAndIndications: 'Evaluation of superficial soft tissue structures: rotator cuff tears (supraspinatus/subscapularis), biceps tendon instability, Achilles tendinopathy, plantaris tendon impingement, joint effusion, and dynamic impingement testing in real time.',
    contraindicationsAndSafety: 'None. Completely non-invasive, zero radiation, safe in pregnancy and patients with cardiac pacemakers.',
    patientPreparationProtocol: 'Wear comfortable loose clothing providing easy shoulder/joint exposure. Skin cleaned; aqueous acoustic gel applied.',
    normalAnatomicalFindings: 'Supraspinatus tendon presents as smooth hyperechoic convex fibrillar pattern capping humeral head. Subacromial-subdeltoid bursa thickness < 1.5mm. Power Doppler shows zero hypervascular flow.',
    pathologicalFindingsAndSigns: 'Full-thickness rotator cuff tear: focal hypoechoic or anechoic defect with cortical bone irregularity (geyser sign) and non-visualization of tendon. Active tendinopathy: tendon thickening with marked intratendinous Power Doppler hyperemia signals (neovascularization).',
    diagnosticAccuracySensSpec: 'Full-thickness rotator cuff tear: Sensitivity 95%, Specificity 96% (equivalent to 1.5T MRI). Partial thickness: Sensitivity 72%, Specificity 93%.',
    rehabilitationAndAthleticImplications: 'Enables immediate bedside dynamic clinical assessment. Directs progressive isometric tendon loading vs immediate orthopaedic surgical consultation for full retracted tears.',
    annotatedDiagramOrVisualDetails: {
      visualDescription: 'Modified Crass position (arm behind back) brings supraspinatus tendon anteriorly out from beneath the acromion.',
      keyLandmarksToInspect: [
        'Greater tuberosity humeral bony footprint',
        'Supraspinatus-infraspinatus junction',
        'Subdeltoid bursa sliding dynamic during active abduction',
        'Power Doppler neovessel density',
      ],
      typicalPitfallsOrArtifacts: 'Anisotropy artifact: transducer angle tilting off 90° makes normal hyperechoic fibers appear falsely black (pseudo-tear).',
    },
    evidenceGuidelineCitation: 'European Society of Musculoskeletal Radiology (ESSR) Ultrasound Technical Guidelines; Indian Radiological and Imaging Association (IRIA).',
    doi: '10.1007/s00330-010-1869-2',
  },

  // ==========================================
  // 5. NERVE CONDUCTION STUDIES & EMG
  // ==========================================
  {
    id: 'inv-emg-ncs-radiculopathy',
    modalityName: 'Electrodiagnostic Studies (NCS / Needle EMG)',
    subType: 'Motor & Sensory Nerve Conduction Studies + Concentric Needle Electromyography',
    bodyRegionOrSpecialty: 'Neurology, Neurosurgery & Neuro-Physiotherapy',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
    ],
    approximateCostINR: '₹2,500 – ₹5,500 (Government: ₹800–1,500; Private: ₹3,000–5,000)',
    ayushmanBharatCovered: true,
    purposeAndIndications: 'Distinguishing compressive lumbar/cervical radiculopathy from peripheral entrapment neuropathy (e.g. peroneal nerve palsy, carpal tunnel syndrome, tarsal tunnel) or generalized polyneuropathy. Identifies active axonal denervation.',
    contraindicationsAndSafety: 'Severe coagulopathy or therapeutic anticoagulation (INR > 3.0) relative contraindication for deep needle EMG. External cardiac defibrillators require clearance.',
    patientPreparationProtocol: 'Skin must be clean and free of oils or lotions. Extremity limb temperature maintained >= 32°C (cold limbs cause falsely slow conduction velocities).',
    normalAnatomicalFindings: 'Normal distal motor latencies, compound muscle action potential (CMAP) amplitudes, and sensory nerve action potential (SNAP) velocities. Needle EMG: electrical silence at rest, biphasic/triphasic voluntary motor unit action potentials (MUAP).',
    pathologicalFindingsAndSigns: 'Radiculopathy: Normal sensory SNAPs (lesion is proximal to dorsal root ganglion) combined with abnormal spontaneous rest activity on needle EMG (fibrillation potentials, positive sharp waves, and reduced recruitment) in paraspinal muscles and myotomal limb muscles.',
    diagnosticAccuracySensSpec: 'Sensitivity 60–85% for motor radiculopathy with axonal involvement; Specificity 90% in distinguishing root compression from distal nerve entrapment.',
    rehabilitationAndAthleticImplications: 'Confirms true physiological motor denervation. Guides urgent surgical decompression in athletes with progressive foot drop or triceps weakness.',
    annotatedDiagramOrVisualDetails: {
      visualDescription: 'Electrical wave display captures spontaneous fibrillations and voluntary motor unit recruitment.',
      keyLandmarksToInspect: [
        'Paraspinal muscle insertion activity (proves root level pathology)',
        'F-wave latency and H-reflex (S1 radiculopathy confirmation)',
        'Distal motor latency comparison to contralateral side',
      ],
      typicalPitfallsOrArtifacts: 'Cold limb temperature mimicking demyelination; performing EMG too early (< 21 days post-injury) before wallerian degeneration occurs.',
    },
    evidenceGuidelineCitation: 'American Association of Neuromuscular & Electrodiagnostic Medicine (AANEM) Guidelines; Neurological Society of India (NSI).',
    doi: '10.1002/mus.20658',
  },

  // ==========================================
  // 6. CLINICAL LABORATORY PANELS (INDIAN REFERENCE RANGES)
  // ==========================================
  {
    id: 'inv-path-rheum-panel-india',
    modalityName: 'Clinical Pathology & Laboratory Diagnostics',
    subType: 'Comprehensive Musculoskeletal, Inflammatory & Metabolic Blood Panel',
    bodyRegionOrSpecialty: 'Internal Medicine, Rheumatology & Sports Medicine',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
      'Tier 3 Sub-District / Community Health Centre (CHC) / Private Clinic',
    ],
    approximateCostINR: '₹1,500 – ₹3,800 for comprehensive panel (Available across all NABL-accredited diagnostic labs in India)',
    ayushmanBharatCovered: true,
    purposeAndIndications: 'Screening for autoimmune arthritis, systemic inflammation, metabolic bone deficiencies, muscle breakdown in athletes, and gout.',
    contraindicationsAndSafety: 'Standard venipuncture. Minimal hematoma risk.',
    patientPreparationProtocol: 'Overnight 10–12 hour fasting recommended for metabolic and lipid profiles. Uric acid can be transiently suppressed during acute gout flares.',
    normalAnatomicalFindings: 'Key Indian Laboratory Reference Intervals:\n• hs-CRP: < 1.0 mg/L (Normal), 1.0–3.0 (Moderate), > 3.0 (High)\n• ESR (Westergren): Men: < 15 mm/hr, Women: < 20 mm/hr\n• Serum 25-OH Vitamin D: 30–100 ng/mL (Deficient: < 20 ng/mL; extremely prevalent in 70%+ of Indian population)\n• Serum Uric Acid: Men: 3.5–7.2 mg/dL, Women: 2.6–6.0 mg/dL\n• Creatine Kinase (CPK): 30–200 U/L (Athlete post-exercise: up to 500–800 U/L normal; > 5,000 U/L indicates rhabdomyolysis)\n• HLA-B27: Negative\n• Rheumatoid Factor (RF) & Anti-CCP: Negative (< 15 IU/mL)',
    pathologicalFindingsAndSigns: 'Markedly elevated hs-CRP (> 10 mg/L) with ESR > 40 mm/hr indicates systemic inflammatory flare (AS, RA) or occult infection. Low 25(OH)D (< 15 ng/mL) directly correlates with recurrent bone stress fractures in young Indian fast bowlers and female runners.',
    diagnosticAccuracySensSpec: 'HLA-B27: 90% sensitivity for Ankylosing Spondylitis; Anti-CCP: 96% specificity for Rheumatoid Arthritis.',
    rehabilitationAndAthleticImplications: 'Directs medical referral to rheumatologist. Correcting endemic vitamin D deficiency accelerates bone stress injury healing from 16 weeks to 10 weeks.',
    annotatedDiagramOrVisualDetails: {
      visualDescription: 'Automated chemiluminescence immunoassay and flow cytometry printout with clear abnormal flags.',
      keyLandmarksToInspect: [
        'Hemoglobin (ruling out anemia of chronic disease or sports pseudo-anemia)',
        'Vitamin D & Calcium (mandatory baseline in all stress injuries)',
        'Creatine Kinase (monitoring overtraining and muscle breakdown)',
      ],
      typicalPitfallsOrArtifacts: 'Heavy physical training 24 hours prior falsely elevates CPK, AST, and ESR.',
    },
    evidenceGuidelineCitation: 'ICMR Guidelines on Laboratory Diagnostics; Indian Council of Medical Research Reference Intervals (2024).',
    doi: '10.4103/ijmr.IJMR_1289_20',
  },
];
