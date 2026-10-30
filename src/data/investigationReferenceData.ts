import {
  IndianInvestigationAtlasItem,
  IndianHospitalTier,
} from '../types/clinical';

export const INDIAN_INVESTIGATIONS_ATLAS: IndianInvestigationAtlasItem[] = [
  // ==========================================
  // 1. PLAIN RADIOGRAPH (X-RAY) - KNEE OSTEOARTHRITIS
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
    purposeAndIndications:
      'Essential baseline screening for knee osteoarthritis (Kellgren-Lawrence grading), joint space narrowing, subchondral sclerosis, osteophytes, and occult fracture (Ottawa Knee Rules).',
    contraindicationsAndSafety:
      'Pregnancy (lead pelvic shielding mandatory). Extremely low radiation dose (~0.005 mSv, equivalent to 2 days of natural background radiation).',
    patientPreparationProtocol:
      'Patient must stand fully upright with equal weight on both feet. Rosenberg view requires 45° knee flexion with anterior patellae against detector.',
    normalAnatomicalFindings:
      'Symmetrical medial and lateral joint space (> 4mm in young adults), smooth rounded femoral condyles and tibial plateaus, no osteophytes, normal patellar height (Insall-Salvati ratio 0.8–1.2).',
    pathologicalFindingsAndSigns:
      'Asymmetric medial joint space narrowing (< 2mm), subchondral bone sclerosis, marginal osteophyte spurring, subchondral pseudocysts (Kellgren-Lawrence Grade III/IV). In acute trauma: Segond avulsion fracture (pathognomonic for ACL tear).',
    diagnosticAccuracySensSpec:
      'Sensitivity 84%, Specificity 92% for moderate-to-severe gonarthrosis. Insensitive for early pre-radiographic cartilage loss.',
    rehabilitationAndAthleticImplications:
      'Guards against premature high-impact running if Kellgren-Lawrence Grade IV joint obliteration is present. Guides knee unloading braces and quad-dominant strengthening.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Bilateral standing PA view demonstrates the joint space under full axial bodyweight loading.',
      keyLandmarksToInspect: [
        'Medial and lateral joint space width (mm)',
        'Tibial spine sharpness and intercondylar eminence',
        'Fibular head and lateral tibial plateau margin (Segond check)',
        'Patellar alignment relative to trochlear groove on Skyline/Merchant view',
      ],
      typicalPitfallsOrArtifacts:
        'Supine non-weight-bearing X-rays frequently falsely overestimate joint space by 30–50%, leading to missed degenerative collapse.',
    },
    evidenceGuidelineCitation:
      'American College of Radiology (ACR) Appropriateness Criteria; Indian Orthopaedic Association (IOA) Knee Guidelines.',
    doi: '10.1016/j.jacr.2018.09.020',
    radiographicViewer: {
      modalityType: 'X-RAY',
      projectionView: 'Bilateral Standing Weight-Bearing Rosenberg PA View',
      pathologyTitle: 'Kellgren-Lawrence Grade III Medial Knee Osteoarthritis with Joint Obliteration',
      normalPlateDescription:
        'Uniform 5.2mm medial and lateral tibiofemoral joint spaces with smooth articular subchondral plate contours and zero marginal spurring.',
      pathologicalPlateDescription:
        'Severe asymmetrical medial joint space collapse (< 1.2mm), prominent medial tibial and femoral marginal osteophytes, dense subchondral sclerotic ivory bone plate, and sharpened tibial spines.',
      svgGraphicType: 'xray-knee-oa',
      findingsHotspots: [
        {
          id: 'oa-1',
          label: 'Medial Joint Space Obliteration',
          x: 41,
          y: 52,
          description:
            'Critical joint space narrowing (< 1.2mm vs 5.4mm lateral). Indicates complete full-thickness articular hyaline cartilage loss down to eburnated subchondral bone.',
          significance: 'Critical Pathology',
        },
        {
          id: 'oa-2',
          label: 'Dense Subchondral Bone Sclerosis',
          x: 38,
          y: 59,
          description:
            'Radiopaque eburnated white band beneath medial tibial plateau. Represents adaptive bone remodeling and microtrabecular compression under chronic focal load.',
          significance: 'Critical Pathology',
        },
        {
          id: 'oa-3',
          label: 'Marginal Tibial Osteophyte Spur',
          x: 27,
          y: 55,
          description:
            'Pointed traction osteophyte measuring 4.5mm protruding from medial tibial articular margin, characteristic of K-L Grade III progression.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'oa-4',
          label: 'Preserved Lateral Joint Compartment',
          x: 64,
          y: 51,
          description:
            'Maintained 5.1mm lateral joint space height with intact meniscal space and normal lateral tibial plateau contour.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Kellgren-Lawrence Grade III criteria: Definite multiple osteophytes, definite joint space narrowing, some subchondral sclerosis.',
        'Medial-to-lateral joint space ratio < 0.35 confirms isolated unicompartmental disease.',
        'Absence of loose bodies in intercondylar notch or popliteal fossa.',
      ],
    },
  },

  // ==========================================
  // 2. HIGH-FIELD MAGNETIC RESONANCE IMAGING (MRI) - ACL & MENISCUS TEAR
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
    approximateCostINR:
      '₹3,500 – ₹7,500 (Govt/Medical College: ₹1,500–2,500; Private Diagnostic Centers: ₹4,000–6,500)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Definitive evaluation of internal derangement: ACL, PCL, MCL, LCL tears, meniscal bucket-handle or root tears, osteochondral lesions, and bone marrow edema.',
    contraindicationsAndSafety:
      'Non-MRI-compatible cardiac pacemakers, ferromagnetic cerebral aneurysm clips, metallic intraocular foreign bodies, severe claustrophobia (requires open-bore or sedation). Zero ionizing radiation.',
    patientPreparationProtocol:
      'Remove all metallic jewellery, hairpins, watches, and magnetic strip cards. Earplugs provided for acoustic gradient noise (100 dB). Duration: 15–20 minutes.',
    normalAnatomicalFindings:
      'ACL visualized as continuous low-signal (black) taut band running from posteromedial lateral femoral condyle to anterior tibial spine. Menisci appear as homogeneous low-signal dark triangles (bow-tie sign on sagittal).',
    pathologicalFindingsAndSigns:
      'ACL discontinuity or horizontal high-signal fluid fiber gap on T2/PD; secondary signs: pivot-shift bone bruise pattern (lateral femoral condyle + posterolateral tibial plateau), anterior tibial translation > 7mm. Meniscus: hyperintense intrameniscal signal traversing articular surface.',
    diagnosticAccuracySensSpec:
      'ACL tear: Sensitivity 95%, Specificity 97%; Meniscal tear: Sensitivity 92%, Specificity 90%.',
    rehabilitationAndAthleticImplications:
      'Directs surgical reconstruction timeline vs conservative non-operative rehabilitation. Identifies meniscal repairability to mandate restricted knee flexion post-op.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Sagittal PD-FS sequence tracking the full trajectory of the cruciate ligaments and meniscal horns.',
      keyLandmarksToInspect: [
        'Blumensaat’s line angle relative to ACL fibers',
        'Anterior and posterior horns of medial and lateral menisci',
        'Subchondral bone marrow signal for kissing contusions',
        'Patellar cartilage thickness and retropatellar facet facets',
      ],
      typicalPitfallsOrArtifacts:
        'Magic angle effect at 55° to magnetic field creating false hyperintensity in curved patellar tendon or collateral ligaments.',
    },
    evidenceGuidelineCitation:
      'AAOS Clinical Practice Guideline on Anterior Cruciate Ligament Injuries (2022); ESSKA Consensus.',
    doi: '10.2519/jospt.2018.0301',
    radiographicViewer: {
      modalityType: 'MRI',
      projectionView: 'Sagittal Proton Density Fat-Suppressed (PD-FS) 3.0T High-Resolution',
      pathologyTitle: 'Complete Mid-Substance ACL Tear with Pivot-Shift Kissing Bone Bruise Pattern',
      normalPlateDescription:
        'Continuous taut hypointense black ligamentous fibers anchored from posterolateral intercondylar notch down to anterior tibial spine, parallel to Blumensaat line.',
      pathologicalPlateDescription:
        'Complete disruption and non-visualization of normal low-signal ACL fibers with amorphous hyperintense fluid/hemarthrosis in notch, accompanied by bright STIR bone marrow edema on lateral femoral condyle and posterior tibial plateau.',
      svgGraphicType: 'mri-knee-acl',
      findingsHotspots: [
        {
          id: 'acl-1',
          label: 'Complete ACL Mid-Substance Disruption',
          x: 48,
          y: 44,
          description:
            'T2/PD hyperintense fluid cleft replacing the normal continuous low-signal ligament fibers. Empty notch sign with retracted stump fibers.',
          significance: 'Critical Pathology',
        },
        {
          id: 'acl-2',
          label: 'Femoral Kissing Bone Bruise (Bone Marrow Edema)',
          x: 62,
          y: 32,
          description:
            'Intense bright hyperintensity on PD fat-suppressed sequence in the lateral femoral condyle terminal sulcus, diagnostic of impaction during pivot-shift subluxation.',
          significance: 'Critical Pathology',
        },
        {
          id: 'acl-3',
          label: 'Posterolateral Tibial Plateau Bone Contusion',
          x: 65,
          y: 62,
          description:
            'Corresponding microtrabecular microfracture edema where the posterolateral tibial plateau collided with the anterior femoral condyle during non-contact valgus collapse.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'acl-4',
          label: 'Blumensaat’s Line Intercondylar Roof Reference',
          x: 35,
          y: 28,
          description:
            'Roof of the intercondylar notch. Normal ACL fibers should maintain an angle steeper than this line; here, only empty fluid signal is observed.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Primary sign: Complete disruption of ligament fiber continuity on sagittal and coronal views.',
        'Secondary sign: Deep lateral femoral sulcus sign (> 1.5mm) and anterior tibial translation > 7mm relative to femur.',
        'Associated lesion: Lateral meniscal posterior root signal screening recommended in 68% of acute ACL ruptures.',
      ],
    },
  },

  // ==========================================
  // 3. COMPUTED TOMOGRAPHY (CT SCAN) - LUMBAR PARS SPONDYLOLYSIS
  // ==========================================
  {
    id: 'inv-ct-lumbar-pars',
    modalityName: 'Computed Tomography (CT Scan)',
    subType: '0.625mm High-Resolution Bone Window Lumbar CT (3D Multiplanar Reconstruction)',
    bodyRegionOrSpecialty: 'Sports Medicine, Spine & Neurosurgery',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
    ],
    approximateCostINR:
      '₹2,800 – ₹5,500 (Apex/Private 128-Slice Scanner: ₹3,200–5,000; Govt: ₹1,000–1,800)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Definitive gold standard for confirming lumbar spondylolysis (pars interarticularis stress fracture in cricket fast bowlers, javelin throwers, gymnasts), distinguishing acute stress reaction from chronic non-union pseudarthrosis, and pre-op surgical planning.',
    contraindicationsAndSafety:
      'Pregnancy. Low-dose iterative reconstruction algorithms reduce radiation to ~1.2–2.0 mSv.',
    patientPreparationProtocol:
      'Supine with knee cushion to flatten lumbar lordosis. No oral or IV contrast required for bone window evaluation. Scan time < 2 minutes.',
    normalAnatomicalFindings:
      'Continuous intact cortical margins of the pars interarticularis on sagittal and oblique sagittal reformations. "Scotty dog" neck intact without lucency.',
    pathologicalFindingsAndSigns:
      'Lucent cortical fracture line traversing the pars interarticularis of L5 (or L4). Acute: irregular jagged edges with surrounding sclerotic bone callus. Chronic: wide smooth corticated defect (collar sign) indicating established pseudarthrosis non-union.',
    diagnosticAccuracySensSpec:
      'Sensitivity 98%, Specificity 99% for pars defect detection (vastly superior to plain oblique radiographs which miss 30–40% of early fractures).',
    rehabilitationAndAthleticImplications:
      'Dictates strict cessation of hyperextension bowling delivery stride. Determines whether bone has union potential (active remodeling) or requires chronic non-union stabilization protocol.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Thin-cut sagittal and 3D oblique bone window reformats displaying the pars interarticularis between superior and inferior articular facets.',
      keyLandmarksToInspect: [
        'L5 pars interarticularis cortical continuity',
        'Scotty Dog neck integrity on 45° oblique view',
        'Anterior vertebral translation (Meyerding Spondylolisthesis grade 0 to IV)',
        'Facet joint hypertrophy and spinal canal dimensions',
      ],
      typicalPitfallsOrArtifacts:
        'Standard axial cuts parallel to disc space may slice directly through the pars defect, causing missed diagnosis without thin sagittal reconstructions.',
    },
    evidenceGuidelineCitation:
      'BCCI/NCA Fast Bowling Stress Fracture Guidelines; North American Spine Society (NASS) Clinical Guidelines.',
    doi: '10.1016/j.spinee.2014.05.016',
    radiographicViewer: {
      modalityType: 'CT',
      projectionView: 'Oblique Sagittal 0.625mm High-Resolution Bone Window CT Reconstruction',
      pathologyTitle: 'Active L5 Pars Interarticularis Spondylolysis Stress Fracture in Young Athlete',
      normalPlateDescription:
        'Homogeneous, smooth corticated bone bridge connecting the L5 superior articular process and pedicle to the inferior articular facet with zero lucency.',
      pathologicalPlateDescription:
        'Sharp radiolucent cortical fracture cleft completely transecting the pars interarticularis ("broken collar on Scotty dog") with sclerotic hypertrophic reactive bone margins along fracture edges.',
      svgGraphicType: 'ct-lumbar-pars',
      findingsHotspots: [
        {
          id: 'pars-1',
          label: 'Pars Interarticularis Fracture Lucency',
          x: 52,
          y: 50,
          description:
            'Linear hypodense cortical defect measuring 2.8mm traversing the isthmus between superior and inferior articular facets of L5.',
          significance: 'Critical Pathology',
        },
        {
          id: 'pars-2',
          label: 'Reactive Sclerotic Bone Callus',
          x: 48,
          y: 44,
          description:
            'Hyperdense sclerotic bone remodeling lining the fracture margin, confirming an active subacute healing attempt under cyclic mechanical shear load.',
          significance: 'Critical Pathology',
        },
        {
          id: 'pars-3',
          label: 'Intact L4 Pars Reference',
          x: 51,
          y: 28,
          description:
            'Normal adjacent L4 pars interarticularis demonstrating continuous intact cortical contour without microtrabecular lucency.',
          significance: 'Normal Reference',
        },
        {
          id: 'pars-4',
          label: 'Vertebral Alignment / Spondylolisthesis Check',
          x: 34,
          y: 54,
          description:
            'Grade 0 slip: Posterior vertebral body line of L5 aligns within 1.5mm of S1 superior endplate (no progressive anterolisthesis).',
          significance: 'Diagnostic Landmark',
        },
      ],
      diagnosticCriteriaSummary: [
        'Confirmed complete spondylolysis with cortical discontinuity on both sagittal and coronal oblique multiplanar cuts.',
        'Meyerding Grade 0 alignment indicates ideal candidate for conservative rigid bracing and 12-week bone healing protocol.',
        'Follow-up CT or MRI STIR recommended at 12–16 weeks prior to bowling run-up clearance.',
      ],
    },
  },

  // ==========================================
  // 4. HIGH-FIELD SPINE MRI - LUMBAR DISC HERNIATION & RADICULOPATHY
  // ==========================================
  {
    id: 'inv-mri-lumbar-herniation',
    modalityName: 'Magnetic Resonance Imaging (MRI)',
    subType: 'High-Resolution 3.0T Lumbar Spine MRI (Axial & Sagittal T1 + T2 Fast Spin Echo)',
    bodyRegionOrSpecialty: 'Spine, Neurology, Neurosurgery & Physiotherapy',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
    ],
    approximateCostINR:
      '₹3,200 – ₹6,800 (Govt/Medical College: ₹1,500–2,500; Private Diagnostic Centers: ₹3,800–6,000)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Evaluation of severe or progressive radiating leg pain (sciatica/radiculopathy), suspected disc herniation, spinal canal stenosis, lateral recess entrapment, and exclusion of cauda equina compression.',
    contraindicationsAndSafety:
      'Cardiac pacemakers, metallic implants, severe claustrophobia. Zero radiation.',
    patientPreparationProtocol:
      'Supine scan for 20 minutes with knees slightly elevated to reduce pain during scanning.',
    normalAnatomicalFindings:
      'Intact high-signal T2 disc hydration, smooth posterior disc contour concave to the spinal canal, wide cerebrospinal fluid space surrounding theca, normal exiting and traversing nerve roots.',
    pathologicalFindingsAndSigns:
      'Focal posterior/paracentral disc extrusion extending beyond disc space height, bright high-signal zone (HIZ) representing full-thickness annular fissure tear, direct obliteration of the lateral recess with impingement and displacement of the traversing L5 nerve root.',
    diagnosticAccuracySensSpec:
      'Sensitivity 96%, Specificity 94% for disc extrusion and nerve root compromise.',
    rehabilitationAndAthleticImplications:
      'Correlates radiological nerve impingement with neurological deficits (L5 myotome weakness/EHL drop). Determines eligibility for directional preference MDT exercise vs transforaminal epidural injection.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Sagittal and axial T2 images demonstrate disc morphology and direct thecal sac relationship.',
      keyLandmarksToInspect: [
        'L4-L5 and L5-S1 disc hydration (T2 hyperintensity)',
        'Posterior longitudinal ligament continuity',
        'Subarticular lateral recess diameter (< 3mm indicates stenosis)',
        'Exiting and traversing nerve root sleeve emergence',
      ],
      typicalPitfallsOrArtifacts:
        'Asymptomatic disc bulges are present in 35–40% of pain-free individuals; imaging MUST correlate with clinical dermato-myotomal findings.',
    },
    evidenceGuidelineCitation:
      'NICE Clinical Guideline [NG59] Low Back Pain and Sciatica; North American Spine Society (NASS).',
    doi: '10.1016/j.spinee.2019.06.012',
    radiographicViewer: {
      modalityType: 'MRI',
      projectionView: 'Sagittal & Axial T2 High-Resolution Fast Spin Echo (FSE) 3.0T',
      pathologyTitle: 'L4-L5 Right Paracentral Disc Extrusion with Severe Traversing L5 Root Compression',
      normalPlateDescription:
        'Well-hydrated hyperintense T2 nucleus pulposus bounded by intact hypointense annulus fibrosus, spacious CSF thecal sac, and patent bilateral neural foramina.',
      pathologicalPlateDescription:
        'Severe focal disc extrusion herniating 7.2mm posteriorly into right lateral recess, directly compressing and flattening the traversing right L5 nerve root sleeve against the posterior facet.',
      svgGraphicType: 'mri-lumbar-herniation',
      findingsHotspots: [
        {
          id: 'disc-1',
          label: 'Focal Paracentral Disc Extrusion',
          x: 58,
          y: 48,
          description:
            'Low T2-signal extruded nuclear material measuring 7.2mm extending into the spinal canal through a disrupted posterior longitudinal ligament.',
          significance: 'Critical Pathology',
        },
        {
          id: 'disc-2',
          label: 'Traversing L5 Nerve Root Impingement',
          x: 64,
          y: 53,
          description:
            'Complete effacement of epidural fat and flattening of the right L5 nerve root in the subarticular gutter, directly accounting for patient’s severe right calf and great toe radicular pain.',
          significance: 'Critical Pathology',
        },
        {
          id: 'disc-3',
          label: 'High-Intensity Zone (HIZ) Annular Tear',
          x: 53,
          y: 42,
          description:
            'Focal bright hyperintense T2 dot within the posterior annulus representing vascularized granulation tissue along a radial annular fissure.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'disc-4',
          label: 'Normal Hydrated L3-L4 Disc Reference',
          x: 46,
          y: 26,
          description:
            'Normal high T2 signal disc with intact annular margins and spacious anterior/posterior epidural spaces.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Extrusion definition: The greatest distance between the edges of the disc material presenting beyond the disc space is greater than the distance between the edges of the base.',
        'Spinal canal cross-sectional area reduced from 145 mm² to 68 mm² at L4-L5 level.',
        'No cauda equina compression: Conus medullaris ends normally at L1 level with patent distal thecal sac.',
      ],
    },
  },

  // ==========================================
  // 5. HIGH-RESOLUTION MUSCULOSKELETAL ULTRASOUND - ROTATOR CUFF TEAR
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
    approximateCostINR:
      '₹1,200 – ₹2,800 (Very accessible and cost-effective across Indian private diagnostic clinics)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Evaluation of superficial soft tissue structures: rotator cuff tears (supraspinatus/subscapularis), biceps tendon instability, Achilles tendinopathy, joint effusion, and dynamic impingement testing in real time.',
    contraindicationsAndSafety:
      'None. Completely non-invasive, zero radiation, safe in pregnancy and patients with cardiac pacemakers.',
    patientPreparationProtocol:
      'Wear comfortable loose clothing providing easy shoulder/joint exposure. Skin cleaned; aqueous acoustic gel applied.',
    normalAnatomicalFindings:
      'Supraspinatus tendon presents as smooth hyperechoic convex fibrillar pattern capping humeral head. Subacromial-subdeltoid bursa thickness < 1.5mm. Power Doppler shows zero hypervascular flow.',
    pathologicalFindingsAndSigns:
      'Full-thickness rotator cuff tear: focal hypoechoic or anechoic defect with cortical bone irregularity (geyser sign) and non-visualization of tendon. Active tendinopathy: tendon thickening with marked intratendinous Power Doppler hyperemia signals (neovascularization).',
    diagnosticAccuracySensSpec:
      'Full-thickness rotator cuff tear: Sensitivity 95%, Specificity 96% (equivalent to 1.5T MRI). Partial thickness: Sensitivity 72%, Specificity 93%.',
    rehabilitationAndAthleticImplications:
      'Enables immediate bedside dynamic clinical assessment. Directs progressive isometric tendon loading vs immediate orthopaedic surgical consultation for full retracted tears.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Modified Crass position (arm behind back) brings supraspinatus tendon anteriorly out from beneath the acromion.',
      keyLandmarksToInspect: [
        'Greater tuberosity humeral bony footprint',
        'Supraspinatus-infraspinatus junction',
        'Subdeltoid bursa sliding dynamic during active abduction',
        'Power Doppler neovessel density',
      ],
      typicalPitfallsOrArtifacts:
        'Anisotropy artifact: transducer angle tilting off 90° makes normal hyperechoic fibers appear falsely black (pseudo-tear).',
    },
    evidenceGuidelineCitation:
      'European Society of Musculoskeletal Radiology (ESSR) Ultrasound Technical Guidelines; Indian Radiological and Imaging Association (IRIA).',
    doi: '10.1007/s00330-010-1869-2',
    radiographicViewer: {
      modalityType: 'ULTRASOUND',
      projectionView: '15 MHz Linear Transducer Longitudinal Long-Axis View (Modified Crass Position)',
      pathologyTitle: 'Full-Thickness Supraspinatus Tendon Tear with 14mm Retraction & Footprint Pitting',
      normalPlateDescription:
        'Homogeneous hyperechoic bird-beak fibrillar tendon capping the smooth convex hyperechoic humeral cortical line with thin overlying subdeltoid bursa.',
      pathologicalPlateDescription:
        'Complete absence of tendon fibers at the greater tuberosity footprint replaced by an anechoic fluid gap with sagging of the peribursal fat and cortical bone pitting ("naked tuberosity sign").',
      svgGraphicType: 'msk-us-rotator-cuff',
      findingsHotspots: [
        {
          id: 'us-1',
          label: 'Anechoic Full-Thickness Tendon Defect',
          x: 44,
          y: 42,
          description:
            'Black fluid-filled gap measuring 14mm anteroposteriorly, extending completely from articular surface to bursal margin (full-thickness tear).',
          significance: 'Critical Pathology',
        },
        {
          id: 'us-2',
          label: 'Naked Greater Tuberosity Footprint',
          x: 54,
          y: 62,
          description:
            'Direct contact of the overlying deltoid muscle and subacromial bursa with the denuded humeral head cortex.',
          significance: 'Critical Pathology',
        },
        {
          id: 'us-3',
          label: 'Cortical Bone Irregularity & Pitting',
          x: 58,
          y: 68,
          description:
            'Micro-pitting and surface roughness along the anatomical insertion footprint of the greater tuberosity, pathognomonic of chronic tendon avulsion.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'us-4',
          label: 'Intact Deltoid Muscle Fibrillar Pattern',
          x: 46,
          y: 20,
          description:
            'Normal superficial pennate hypoechoic muscle fascicles interspersed with hyperechoic perimysial septa.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Complete non-visualization of supraspinatus tendon over the greater tuberosity confirms full-thickness rupture.',
        'Dynamic real-time abduction demonstrates failure of tendon to glide beneath the acromion.',
        'Power Doppler reveals absent flow in the avascular chronic tendon gap.',
      ],
    },
  },

  // ==========================================
  // 6. DUAL-ENERGY CT (DECT) - GOUT & CRYSTAL ARTHROPATHY
  // ==========================================
  {
    id: 'inv-ct-dect-gout-bone',
    modalityName: 'Computed Tomography (CT Scan)',
    subType: 'Dual-Energy CT (DECT) / 128-Slice High-Resolution Material Decomposition CT',
    bodyRegionOrSpecialty: 'Rheumatology & Complex Orthopaedic Trauma',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
    ],
    approximateCostINR:
      '₹4,000 – ₹8,500 (Apex Institutes / Private Multi-Slice Imaging: ₹4,500–8,000)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Detection and volumetric quantification of monosodium urate (MSU) crystal deposition in suspected gouty arthritis; complex tibial plateau fracture depression mapping; distinguishing gout from pseudogout/CPPD.',
    contraindicationsAndSafety:
      'Pregnancy. Zero IV contrast needed for crystal material decomposition. Radiation dose ~ 1.5–2.5 mSv.',
    patientPreparationProtocol:
      'No fasting required; limbs positioned centrally in scanner gantry.',
    normalAnatomicalFindings:
      'Crisp cortical boundaries, normal trabecular bone architecture, completely green-free tissue on DECT 80/140 kV dual-energy material decomposition.',
    pathologicalFindingsAndSigns:
      'DECT color-codes monosodium urate crystal tophi as vivid green deposits along joint capsules, cartilage, and tendons. Punched-out subchondral bone erosions with sclerotic "overhanging edge" sign.',
    diagnosticAccuracySensSpec:
      'Sensitivity 88%, Specificity 90% for monosodium urate crystal identification.',
    rehabilitationAndAthleticImplications:
      'Provides unequivocal diagnosis preventing unnecessary invasive arthroscopy. Guides long-term uric acid-lowering therapy and flare rehabilitation.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Dual-energy material decomposition algorithms display green urate pixels overlaid on greyscale bone anatomy.',
      keyLandmarksToInspect: [
        '1st metatarsophalangeal, ankle, and knee joint recesses',
        'Extensor and flexor tendon sheath crystal tracking',
        'Subchondral bone erosions with overhanging sclerotic margins',
      ],
      typicalPitfallsOrArtifacts:
        'Callus formation or metallic implants can generate beam-hardening streak artifacts.',
    },
    evidenceGuidelineCitation:
      'American College of Rheumatology (ACR) / EULAR Classification Criteria for Gout; Indian Rheumatology Association (IRA).',
    doi: '10.1002/art.39254',
    radiographicViewer: {
      modalityType: 'CT',
      projectionView: '3D Volume-Rendered Dual-Energy CT (DECT) Material Decomposition Overlay',
      pathologyTitle: 'Severe Monosodium Urate Crystal Deposition (Gouty Tophi) Over 1st MTP & Tarsus',
      normalPlateDescription:
        'Complete absence of green urate voxels; sharp white-grey cortical margins and homogeneous trabecular bone mineralization.',
      pathologicalPlateDescription:
        'Extensive vivid neon green color-coded monosodium urate crystal aggregates encasing the 1st metatarsophalangeal joint capsule with deep periarticular bone erosion.',
      svgGraphicType: 'ct-gout-dect',
      findingsHotspots: [
        {
          id: 'gout-1',
          label: 'Neon Green Monosodium Urate Crystal Tophi',
          x: 48,
          y: 45,
          description:
            'DECT 80/140 kV X-ray attenuation algorithm specifically separates calcium from urate, mapping crystalline MSU deposits as bright green voxels.',
          significance: 'Critical Pathology',
        },
        {
          id: 'gout-2',
          label: 'Punched-Out Bone Erosion ("Martel Sign")',
          x: 40,
          y: 42,
          description:
            'Well-circumscribed subchondral cortical bone defect with overhanging sclerotic bone margin surrounding the intra-articular tophus.',
          significance: 'Critical Pathology',
        },
        {
          id: 'gout-3',
          label: 'Intact Proximal Phalanx Cortex',
          x: 58,
          y: 40,
          description:
            'Normal distal bone mineral density preserved without diffuse osteopenia (characteristic feature distinguishing gout from rheumatoid arthritis).',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'gout-4',
          label: 'Tarsal Joint Capsule Reference',
          x: 32,
          y: 60,
          description:
            'Normal non-involved midtarsal joint capsule free of urate crystal precipitation.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Meets ACR/EULAR 2015 diagnostic criteria for gout with positive imaging score (+4 points).',
        'Total urate volume quantified at 1.84 cm³, establishing baseline for tracking pegloticase or allopurinol dissolution.',
        'Normal adjacent joint space width confirms absence of secondary septic arthrosis.',
      ],
    },
  },

  // ==========================================
  // 7. PLAIN RADIOGRAPH (X-RAY) - CALCANEAL FRACTURE & BOEHLER'S ANGLE
  // ==========================================
  {
    id: 'inv-xray-ankle-boehler',
    modalityName: 'Plain Radiograph (X-Ray)',
    subType: 'Lateral Hindfoot & Calcaneus Radiograph with Boehler & Gissane Angle Assessment',
    bodyRegionOrSpecialty: 'Orthopaedic Trauma, Foot & Ankle, Sports Rehabilitation',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
      'Tier 3 Sub-District / Community Health Centre (CHC) / Private Clinic',
    ],
    approximateCostINR:
      '₹350 – ₹750 (Govt/Ayushman: Free to ₹80; Private: ₹500–750)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Acute high-energy axial loading injuries (fall from height, road traffic accident, sports landing impact). Evaluates intra-articular calcaneal fracture depression, subtalar joint congruency, and surgical restoration targets.',
    contraindicationsAndSafety:
      'Pregnancy (lead shield). Extremely low radiation (~0.003 mSv).',
    patientPreparationProtocol:
      'True lateral hindfoot view with beam centered 2.5cm inferior to medial malleolus.',
    normalAnatomicalFindings:
      'Normal Boehler’s angle between 28° and 40° formed by intersection of line from highest point of anterior process to highest point of posterior articular facet and line from posterior facet to superior tuberosity. Crucial angle of Gissane: 120°–145°.',
    pathologicalFindingsAndSigns:
      'Depressed intra-articular fracture: Boehler’s angle flattened or reversed (< 20°, often negative in severe impaction), disruption of posterior subtalar facet, comminuted calcaneal body with heel shortening and widening.',
    diagnosticAccuracySensSpec:
      'Sensitivity 92% for displaced calcaneal fracture; Boehler’s angle reduction strongly correlates with post-traumatic subtalar arthritis.',
    rehabilitationAndAthleticImplications:
      'Loss of Boehler’s angle (< 20°) indicates high risk of chronic subtalar stiffness and sural nerve entrapment. Mandates non-weight-bearing protection for 8–10 weeks.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Lateral hindfoot radiograph illustrating the classic geometric intersecting lines of Boehler’s angle.',
      keyLandmarksToInspect: [
        'Anterior superior calcaneal process',
        'Posterior articular facet apex',
        'Superior border of calcaneal tuberosity',
        'Angle of Gissane beneath the lateral talar process',
      ],
      typicalPitfallsOrArtifacts:
        'Oblique rotational projection can falsely distort angle measurements by 8°–10°.',
    },
    evidenceGuidelineCitation:
      'American Orthopaedic Foot & Ankle Society (AOFAS) Guidelines; Indian Orthopaedic Association Trauma Committee.',
    doi: '10.1177/1071100718794658',
    radiographicViewer: {
      modalityType: 'X-RAY',
      projectionView: 'True Lateral Standing Hindfoot & Calcaneus Radiograph',
      pathologyTitle: 'Comminuted Intra-Articular Calcaneal Fracture with Flattened Boehler’s Angle (11°)',
      normalPlateDescription:
        'Crisp calcaneal cortical arch with normal Boehler angle measuring 32° (range 28°–40°) and intact subtalar joint congruency.',
      pathologicalPlateDescription:
        'Severe impaction fracture of the posterior articular facet causing vertical collapse of the calcaneus, widening of the heel, and flattening of Boehler’s angle down to 11° (severe impaction).',
      svgGraphicType: 'xray-ankle-boehler',
      findingsHotspots: [
        {
          id: 'boehler-1',
          label: 'Flattened Boehler’s Angle (11° vs Normal 28°–40°)',
          x: 48,
          y: 48,
          description:
            'Critical flattening of Boehler’s angle (11°) indicating severe loss of posterior facet height and calcaneal arch collapse.',
          significance: 'Critical Pathology',
        },
        {
          id: 'boehler-2',
          label: 'Subtalar Joint Articular Step-Off (4.2mm)',
          x: 52,
          y: 40,
          description:
            'Direct cortical step-off in the posterior talocalcaneal joint facet leading to high risk of debilitating post-traumatic subtalar arthritis.',
          significance: 'Critical Pathology',
        },
        {
          id: 'boehler-3',
          label: 'Primary Fracture Line & Heel Widening',
          x: 36,
          y: 62,
          description:
            'Comminution extending to the plantar tuberosity with lateral cortical wall blowout impinging on peroneal tendons.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'boehler-4',
          label: 'Intact Talar Dome & Ankle Joint Mortise',
          x: 48,
          y: 26,
          description:
            'Maintained tibiotalar joint space height and smooth rounded talar dome contours without acute talar fracture.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Sanders classification: CT scan recommended to evaluate number of posterior facet articular fragments.',
        'Boehler’s angle < 15° is a validated prognostic predictor of poor functional recovery without anatomical surgical restoration.',
        'Strict non-weight-bearing with foot elevation to minimize skin blistering prior to ORIF or conservative cast care.',
      ],
    },
  },

  // ==========================================
  // 8. EOS / FULL-SPINE RADIOGRAPH - SCOLIOSIS & COBB ANGLE
  // ==========================================
  {
    id: 'inv-xray-scoliosis-cobb',
    modalityName: 'Plain Radiograph (X-Ray)',
    subType: 'Standing Long-Cassette Full-Spine Radiograph (EOS / Digital 36-Inch View)',
    bodyRegionOrSpecialty: 'Paediatric Orthopaedics, Spine & Posture Rehabilitation',
    tierAvailability: [
      'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)',
      'Tier 2 District Hospital / State Medical College / ESI Hospital',
    ],
    approximateCostINR:
      '₹1,200 – ₹2,500 (Apex/EOS Low-Dose System: ₹1,800–2,800; Standard Digital: ₹1,200)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Quantitative evaluation of Adolescent Idiopathic Scoliosis (AIS), postural trunk asymmetry, Cobb angle measurement, skeletal maturity determination (Risser sign and Sanders score), and bracing vs surgery decision support.',
    contraindicationsAndSafety:
      'Pregnancy. Low-dose EOS digital slot-scanning reduces radiation by 85% compared to conventional radiography (vital for growing adolescents receiving repeated surveillance scans).',
    patientPreparationProtocol:
      'Patient stands upright with bare feet, knees fully extended, fingertips resting lightly on clavicles so arms do not obscure spine.',
    normalAnatomicalFindings:
      'Straight vertical coronal spine alignment with Cobb angle < 10°. Level shoulders, symmetrical iliac crest heights, central plumb line passing from C7 to S1.',
    pathologicalFindingsAndSigns:
      'Structural scoliosis: Lateral spinal curvature with Cobb angle >= 10° accompanied by vertebral axial rotation (pedicle asymmetry / Nash-Moe grading). Most common: Right thoracic curve (T5–T12) with compensatory left lumbar curve.',
    diagnosticAccuracySensSpec:
      'Inter-observer Cobb angle measurement variability is ±3°–5°. Gold standard worldwide for spinal deformity.',
    rehabilitationAndAthleticImplications:
      'Guides Physiotherapeutic Scoliosis-Specific Exercises (PSSE / Schroth Method). Curves 25°–40° in growing adolescents mandate rigid custom thoracolumbosacral orthosis (TLSO / Boston brace). Curves > 45° warrant surgical spinal fusion consultation.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Full-length coronal spine radiograph demonstrating tangent lines drawn along upper endplate of uppermost tilted vertebra and lower endplate of lowermost tilted vertebra.',
      keyLandmarksToInspect: [
        'Upper and lower end vertebrae of the structural curve',
        'Apical vertebra and pedicle rotation symmetry',
        'Iliac apophysis ossification excursion (Risser sign 0 to 5)',
        'Coronal trunk shift / balance relative to central sacral line',
      ],
      typicalPitfallsOrArtifacts:
        'Supine radiographs falsely reduce scoliotic curves by 7°–12° due to absence of axial gravitational load.',
    },
    evidenceGuidelineCitation:
      'Scoliosis Research Society (SRS) Guidelines; SOSORT Consensus on Conservative Scoliosis Treatment.',
    doi: '10.1186/s13013-017-0145-8',
    radiographicViewer: {
      modalityType: 'X-RAY',
      projectionView: 'Standing 36-Inch Long-Cassette Full-Spine Coronal PA Radiograph',
      pathologyTitle: 'Adolescent Idiopathic Scoliosis with 36° Right Thoracic Curve (Cobb Angle)',
      normalPlateDescription:
        'Straight vertical coronal spine column with Cobb angle < 5°, symmetric ribs and iliac crests, and central C7 plumb line falling directly over the mid-sacrum.',
      pathologicalPlateDescription:
        'Prominent structural right-sided thoracic curvature centered from T5 down to T12 with Cobb angle of 36°, axial vertebral rotation, and early Risser Stage 2 iliac apophysis ossification.',
      svgGraphicType: 'xray-scoliosis-cobb',
      findingsHotspots: [
        {
          id: 'cobb-1',
          label: 'Cobb Angle 36° Intersecting Tangents',
          x: 48,
          y: 42,
          description:
            'Measured Cobb angle of 36° formed by perpendicular lines to upper endplate of T5 and lower endplate of T12, classifying as moderate structural scoliosis.',
          significance: 'Critical Pathology',
        },
        {
          id: 'cobb-2',
          label: 'Apical Vertebral Axial Rotation (T8/T9)',
          x: 56,
          y: 44,
          description:
            'Rightward rotation of the spinous process and asymmetrical pedicle projection (Nash-Moe Grade 2), producing clinical thoracic rib hump on Adams forward bend test.',
          significance: 'Critical Pathology',
        },
        {
          id: 'cobb-3',
          label: 'Risser Sign Stage 2 (Iliac Crest Apophysis)',
          x: 62,
          y: 78,
          description:
            'Ossification has traversed 25%–50% of the iliac apophysis. Confirms significant remaining adolescent skeletal growth potential with high risk of curve progression.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'cobb-4',
          label: 'Coronal Central Sacral Vertical Line (CSVL)',
          x: 46,
          y: 84,
          description:
            'Vertical reference line from S1; trunk balance is maintained within 14mm of coronal midline.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Cobb angle of 36° in a Risser Stage 2 adolescent requires immediate TLSO rigid bracing (18–20 hours/day) + Schroth Method physical therapy.',
        'Indicated for 6-month surveillance radiographs until Risser Stage 4 (skeletal maturity) is reached.',
        'MRI spine screening indicated if curve exhibits atypical left thoracic orientation or rapid progression.',
      ],
    },
  },

  // ==========================================
  // 9. ELECTRODIAGNOSTIC STUDIES - NEEDLE EMG & NERVE CONDUCTION WAVEFORMS
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
    approximateCostINR:
      '₹2,500 – ₹5,500 (Government: ₹800–1,500; Private: ₹3,000–5,000)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Distinguishing compressive lumbar/cervical radiculopathy from peripheral entrapment neuropathy (e.g. peroneal nerve palsy, carpal tunnel syndrome, tarsal tunnel) or generalized polyneuropathy. Identifies active axonal denervation.',
    contraindicationsAndSafety:
      'Severe coagulopathy or therapeutic anticoagulation (INR > 3.0) relative contraindication for deep needle EMG. External cardiac defibrillators require clearance.',
    patientPreparationProtocol:
      'Skin must be clean and free of oils or lotions. Extremity limb temperature maintained >= 32°C (cold limbs cause falsely slow conduction velocities).',
    normalAnatomicalFindings:
      'Normal distal motor latencies, compound muscle action potential (CMAP) amplitudes, and sensory nerve action potential (SNAP) velocities. Needle EMG: electrical silence at rest, biphasic/triphasic voluntary motor unit action potentials (MUAP).',
    pathologicalFindingsAndSigns:
      'Radiculopathy: Normal sensory SNAPs (lesion is proximal to dorsal root ganglion) combined with abnormal spontaneous rest activity on needle EMG (fibrillation potentials, positive sharp waves, and reduced recruitment) in paraspinal muscles and myotomal limb muscles.',
    diagnosticAccuracySensSpec:
      'Sensitivity 60–85% for motor radiculopathy with axonal involvement; Specificity 90% in distinguishing root compression from distal nerve entrapment.',
    rehabilitationAndAthleticImplications:
      'Confirms true physiological motor denervation. Guides urgent surgical decompression in athletes with progressive foot drop or triceps weakness.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Electrical wave display captures spontaneous fibrillations and voluntary motor unit recruitment.',
      keyLandmarksToInspect: [
        'Paraspinal muscle insertion activity (proves root level pathology)',
        'F-wave latency and H-reflex (S1 radiculopathy confirmation)',
        'Distal motor latency comparison to contralateral side',
      ],
      typicalPitfallsOrArtifacts:
        'Cold limb temperature mimicking demyelination; performing EMG too early (< 21 days post-injury) before wallerian degeneration occurs.',
    },
    evidenceGuidelineCitation:
      'American Association of Neuromuscular & Electrodiagnostic Medicine (AANEM) Guidelines; Neurological Society of India (NSI).',
    doi: '10.1002/mus.20658',
    radiographicViewer: {
      modalityType: 'EMG_NCS',
      projectionView: 'Concentric Needle Electromyography & Peroneal Motor Conduction Waveform Screen',
      pathologyTitle: 'Active L5 Axonal Radiculopathy with Spontaneous Fibrillation Potentials & Reduced Recruitment',
      normalPlateDescription:
        'Complete baseline electrical silence at rest (zero fibrillations) with normal biphasic/triphasic motor unit action potential (MUAP) full interference pattern on voluntary contraction.',
      pathologicalPlateDescription:
        'High-density 3+ spontaneous fibrillation potentials and positive sharp waves (PSWs) at rest in tibialis anterior and extensor hallucis longus, with prolonged H-reflex latency.',
      svgGraphicType: 'emg-radiculopathy',
      findingsHotspots: [
        {
          id: 'emg-1',
          label: 'Spontaneous Rest Fibrillation Spikes (Denervation)',
          x: 42,
          y: 35,
          description:
            'Brief biphasic spikes (1–5 ms duration, 50–200 μV amplitude) occurring spontaneously at rest, proving active membrane instability from axonal motor denervation.',
          significance: 'Critical Pathology',
        },
        {
          id: 'emg-2',
          label: 'Positive Sharp Wave (PSW) Deflection',
          x: 58,
          y: 40,
          description:
            'Initial sharp downward positive deflection followed by prolonged low-amplitude negative phase, characteristic of muscle fiber denervation.',
          significance: 'Critical Pathology',
        },
        {
          id: 'emg-3',
          label: 'Reduced Motor Unit Recruitment Pattern',
          x: 68,
          y: 62,
          description:
            'Single rapidly firing motor unit (> 25 Hz) with incomplete baseline interference pattern on maximum voluntary effort, confirming loss of functional motor axons.',
          significance: 'Diagnostic Landmark',
        },
        {
          id: 'emg-4',
          label: 'Superficial Peroneal Sensory SNAP (Normal)',
          x: 32,
          y: 72,
          description:
            'Intact sensory nerve action potential amplitude (18 μV), confirming the compressive lesion is PRE-GANGLIONIC at the nerve root level.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Positive fibrillations and PSWs in >= 2 muscles innervated by L5 (Tibialis Anterior, EHL) plus L5 lumbar paraspinal musculature confirms true L5 radiculopathy.',
        'Excludes distal common peroneal nerve compression at fibular neck due to paraspinal muscle involvement.',
        'Urgent surgical spine consultation indicated if foot drop motor weakness progresses to MMT < 3/5.',
      ],
    },
  },

  // ==========================================
  // 10. CLINICAL PATHOLOGY LAB PANEL - NABL REFERENCE REPORT
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
    approximateCostINR:
      '₹1,500 – ₹3,800 for comprehensive panel (Available across all NABL-accredited diagnostic labs in India)',
    ayushmanBharatCovered: true,
    purposeAndIndications:
      'Screening for autoimmune arthritis, systemic inflammation, metabolic bone deficiencies, muscle breakdown in athletes, and gout.',
    contraindicationsAndSafety: 'Standard venipuncture. Minimal hematoma risk.',
    patientPreparationProtocol:
      'Overnight 10–12 hour fasting recommended for metabolic and lipid profiles. Uric acid can be transiently suppressed during acute gout flares.',
    normalAnatomicalFindings:
      'Key Indian Laboratory Reference Intervals:\n• hs-CRP: < 1.0 mg/L (Normal), 1.0–3.0 (Moderate), > 3.0 (High)\n• ESR (Westergren): Men: < 15 mm/hr, Women: < 20 mm/hr\n• Serum 25-OH Vitamin D: 30–100 ng/mL (Deficient: < 20 ng/mL; extremely prevalent in 70%+ of Indian population)\n• Serum Uric Acid: Men: 3.5–7.2 mg/dL, Women: 2.6–6.0 mg/dL\n• Creatine Kinase (CPK): 30–200 U/L (Athlete post-exercise: up to 500–800 U/L normal; > 5,000 U/L indicates rhabdomyolysis)\n• HLA-B27: Negative\n• Rheumatoid Factor (RF) & Anti-CCP: Negative (< 15 IU/mL)',
    pathologicalFindingsAndSigns:
      'Markedly elevated hs-CRP (> 10 mg/L) with ESR > 40 mm/hr indicates systemic inflammatory flare (AS, RA) or occult infection. Low 25(OH)D (< 15 ng/mL) directly correlates with recurrent bone stress fractures in young Indian fast bowlers and female runners.',
    diagnosticAccuracySensSpec:
      'HLA-B27: 90% sensitivity for Ankylosing Spondylitis; Anti-CCP: 96% specificity for Rheumatoid Arthritis.',
    rehabilitationAndAthleticImplications:
      'Directs medical referral to rheumatologist. Correcting endemic vitamin D deficiency accelerates bone stress injury healing from 16 weeks to 10 weeks.',
    annotatedDiagramOrVisualDetails: {
      visualDescription:
        'Automated chemiluminescence immunoassay and flow cytometry printout with clear abnormal flags.',
      keyLandmarksToInspect: [
        'Hemoglobin (ruling out anemia of chronic disease or sports pseudo-anemia)',
        'Vitamin D & Calcium (mandatory baseline in all stress injuries)',
        'Creatine Kinase (monitoring overtraining and muscle breakdown)',
      ],
      typicalPitfallsOrArtifacts:
        'Heavy physical training 24 hours prior falsely elevates CPK, AST, and ESR.',
    },
    evidenceGuidelineCitation:
      'ICMR Guidelines on Laboratory Diagnostics; Indian Council of Medical Research Reference Intervals (2024).',
    doi: '10.4103/ijmr.IJMR_1289_20',
    radiographicViewer: {
      modalityType: 'LAB_REPORT',
      projectionView: 'Automated Immunoassay & Hematology Laboratory Report (NABL Certified)',
      pathologyTitle: 'Active Inflammatory & Metabolic Arthropathy Profile (High hs-CRP, Severe Vitamin D Deficiency, HLA-B27 Positive)',
      normalPlateDescription:
        'All laboratory parameters within normal physiological reference intervals with zero inflammatory markers and negative autoimmune serology.',
      pathologicalPlateDescription:
        'High-sensitivity CRP elevated at 14.8 mg/L (Critical High), Serum 25(OH)D severely deficient at 10.4 ng/mL, Serum Uric Acid elevated at 8.6 mg/dL, and HLA-B27 PCR Positive.',
      svgGraphicType: 'lab-pathology-panel',
      findingsHotspots: [
        {
          id: 'lab-1',
          label: 'hs-CRP: 14.8 mg/L [CRITICAL HIGH]',
          x: 48,
          y: 28,
          description:
            'Markedly elevated systemic inflammation (> 14x normal baseline < 1.0 mg/L), indicating active spondyloarthritis flare or inflammatory synovial cascade.',
          significance: 'Critical Pathology',
        },
        {
          id: 'lab-2',
          label: 'Serum 25-OH Vitamin D: 10.4 ng/mL [SEVERE DEFICIENT]',
          x: 48,
          y: 42,
          description:
            'Critical metabolic deficiency (< 20 ng/mL cutoff). Directly impairs osteoblast bone mineralization and doubles stress fracture recurrence risk in athletes.',
          significance: 'Critical Pathology',
        },
        {
          id: 'lab-3',
          label: 'HLA-B27 Allele by PCR: POSITIVE',
          x: 48,
          y: 56,
          description:
            'Strong genetic marker associated with Axial Spondyloarthritis, Ankylosing Spondylitis, and reactive inflammatory arthritis.',
          significance: 'Critical Pathology',
        },
        {
          id: 'lab-4',
          label: 'Normal Liver & Renal Clearance (eGFR > 90)',
          x: 48,
          y: 74,
          description:
            'Intact renal function with serum creatinine 0.82 mg/dL, confirming safety for NSAID medication therapy under clinical supervision.',
          significance: 'Normal Reference',
        },
      ],
      diagnosticCriteriaSummary: [
        'Meets ASAS criteria for axial spondyloarthritis in young patient with inflammatory back pain + HLA-B27 positivity.',
        'Mandates immediate Cholecalciferol supplementation (60,000 IU weekly for 8 weeks) per ICMR endocrinology protocols.',
        'Recommend baseline sacroiliac joint MRI STIR to confirm active sacroiliitis bone marrow edema.',
      ],
    },
  },
];
