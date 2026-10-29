import { SportSpecificPathway, SportType } from '../types/clinical';

export const ALL_SPORT_PATHWAYS: SportSpecificPathway[] = [
  // ==========================================
  // 1. CRICKET
  // ==========================================
  {
    sportId: 'cricket',
    sportName: 'Cricket (Fast Bowling, Spin, Batting & Fielding)',
    primaryIndianGoverningBody: 'Board of Control for Cricket in India (BCCI) Medical & Sports Science Team / National Cricket Academy (NCA Bengaluru)',
    internationalFederation: 'International Cricket Council (ICC)',
    positionalRoles: ['Fast Bowler (Pace/Seam)', 'Spin Bowler (Finger/Wrist)', 'Top-Order Batsman', 'Wicketkeeper', 'Athletic Outfielder'],
    keyPhysicalDemands: [
      'High ground reaction force (6–9x body weight) at front-foot delivery stride landing',
      'Asymmetric lumbar hyperextension, lateral flexion, and explosive counter-rotation',
      'Glenohumeral internal impingement and posterior capsule tightness from repetitive overhead throwing',
      'High anaerobic-aerobic intermittent running (repeated 22-yard sprints between wickets)',
    ],
    commonInjuryEpidemiology: [
      'Lumbar Spine: Pars interarticularis stress fractures (L4/L5, non-bowling arm side)',
      'Side Strain: Internal oblique / transversus abdominis tear at lower rib attachments',
      'Posterior Ankle Impingement (Front foot in delivery stride)',
      'Thrower’s Shoulder: SLAP tears and rotator cuff tendinopathy',
      'Hamstring & Adductor strains during boundary sprint slides',
    ],
    preParticipationScreening: [
      {
        toolName: 'BCCI/NCA Fast Bowling Lumbar Screen',
        description: 'Single-leg hyperextension and lateral flexion quadrant test (Stork test) + MRI T2 STIR screening for bone stress oedema.',
        cutoffOrCriteria: 'Any focal lumbar tenderness on non-bowling side extension warrants immediate bowling cessation and MRI.',
      },
      {
        toolName: 'Glenohumeral Total Motion Arc (TMA)',
        description: 'Bilateral assessment of dominant shoulder external rotation + internal rotation at 90° abduction.',
        cutoffOrCriteria: 'Glenohumeral Internal Rotation Deficit (GIRD) > 18° with TMA loss > 5° increases rotator cuff injury hazard by 2.8x.',
      },
    ],
    movementAndBiomechanicsBattery: [
      {
        testName: 'Bowling Action High-Speed Video Analysis (Front-on vs Side-on vs Mixed Action)',
        protocol: '240 fps dual-camera recording of delivery stride. Quantifies shoulder-hip alignment angle at back-foot impact.',
        targetBenchmark: 'Shoulder-hip counter-rotation angle < 20° (Angles > 30° indicate a "Mixed Action" with 4.5x higher pars stress fracture risk).',
        relevance: 'Mandated by ICC/BCCI biomechanics guidelines to prevent spinal stress fractures.',
      },
      {
        testName: 'Y-Balance Test (Lower Quarter)',
        protocol: 'Posteromedial, posterolateral, and anterior reach while balancing on single leg.',
        targetBenchmark: 'Composite score >= 95% with inter-limb asymmetry < 4 cm.',
        relevance: 'Predicts lower-extremity landing breakdown in fast bowlers.',
      },
    ],
    physiologicalTesting: [
      {
        testName: 'Yo-Yo Intermittent Recovery Test Level 1 (Yo-Yo IR1)',
        metric: 'Distance (meters) / Estimated VO2max',
        eliteBenchmarkMale: '>= 2,040 meters (Level 18.8 - BCCI standard benchmark for Indian Men’s National/IPL squad)',
        eliteBenchmarkFemale: '>= 1,600 meters (Level 16.5 - Indian Women’s National Team benchmark)',
        equipmentRequired: 'Cones, 20m calibrated track, audio pacing device.',
      },
      {
        testName: '20-Meter Acceleration & 40-Meter Sprint',
        metric: 'Time in seconds via dual-beam electronic timing gates',
        eliteBenchmarkMale: '20m: < 2.95s; 40m: < 4.95s (Outfield boundary chasing capability)',
        eliteBenchmarkFemale: '20m: < 3.25s; 40m: < 5.35s',
        equipmentRequired: 'Dual-beam laser timing gates.',
      },
    ],
    workloadMonitoringRules: [
      {
        metric: 'Fast Bowling Match & Practice Overs (BCCI/NCA Guidelines)',
        optimalRange: '30–45 overs/week for Senior Pacers; 20–30 overs/week for Under-19 Pacers.',
        dangerThreshold: '> 50 overs/week, or acute spike > 1.5 ratio vs rolling 4-week average (ACWR).',
        clinicalSignificance: 'Spikes in weekly overs with ACWR > 1.5 carry 3.2x increased risk of lumbar bone stress injuries.',
      },
    ],
    returnToSportContinuum: [
      {
        stage: 'Stage 1: Return to Activity',
        objectiveGateways: ['Zero pain on lumbar hyperextension quadrant', 'Full active pain-free thoracic rotation', 'Pain-free 10km/h treadmill jog'],
        riskMitigation: 'Lumbar core endurance (McGill side bridge > 45s, Biering-Sorensen > 90s).',
      },
      {
        stage: 'Stage 2: Return to Sport Training',
        objectiveGateways: ['Standing walk-through bowling action (no ball release)', 'Throwing velocity 50% with normal scapular kinematics'],
        riskMitigation: 'Restricted to flat ground non-impact shadow bowling.',
      },
      {
        stage: 'Stage 3: Return to Full Practice',
        objectiveGateways: ['Off-stump target bowling off short run-up (50% intensity, 12 balls)', 'Yo-Yo IR1 test score >= 1,800m'],
        riskMitigation: 'Gradual run-up lengthening over 3 weeks.',
      },
      {
        stage: 'Stage 4: Return to Match Competition',
        objectiveGateways: ['Full run-up bowling at 100% effort in center-wicket practice (4 consecutive overs without next-day soreness)', 'Limb Symmetry Index >= 90% on triple hop'],
        riskMitigation: 'Strict match over restrictions (max 4 overs in T20 or 10 overs in One-Day match).',
      },
      {
        stage: 'Stage 5: Return to Peak Performance',
        objectiveGateways: ['Multi-day match clearance (bowling 15+ overs in 4-day Ranji Trophy / Test cricket without flare-up)', 'Radar gun ball speed within 2 km/h of pre-injury peak'],
        riskMitigation: 'Permanent workload logging in NCA Athlete Management System (AMS).',
      },
    ],
  },

  // ==========================================
  // 2. KABADDI
  // ==========================================
  {
    sportId: 'kabaddi',
    sportName: 'Kabaddi (Raiders & Defenders - Pro Kabaddi League standard)',
    primaryIndianGoverningBody: 'Amateur Kabaddi Federation of India (AKFI) / Sports Authority of India (SAI)',
    internationalFederation: 'International Kabaddi Federation (IKF)',
    positionalRoles: ['Right Corner Defender', 'Left Corner Defender', 'Cover Defender (Right/Left)', 'Lead Raider (Toe Touch/Dubki)', 'Support Raider'],
    keyPhysicalDemands: [
      'Violent collision impacts during chain tackles, ankle holds, and thigh holds',
      'Explosive 30-second continuous canting breath-hold anaerobic burst per raid',
      'Rapid lateral change of direction and low-squatting center of mass',
      'Upper-extremity traction forces during tackle escapes (ankle pull / waist grapple)',
    ],
    commonInjuryEpidemiology: [
      'Knee: ACL and PCL multi-ligamentous ruptures from tackle twisting forces',
      'Ankle: Inversion and high syndesmosis ankle sprains on foam/mud mat friction',
      'Shoulder: Anterior shoulder dislocation / Bankart lesion from diving tackles',
      'Cervical & Head: Concussion and cervical muscle strain during heavy collisions',
      'Acromioclavicular (AC) joint separations from hard landings on the mat',
    ],
    preParticipationScreening: [
      {
        toolName: 'AKFI Mat Landing & Joint Laxity Screening',
        description: 'Beighton Hypermobility Score + Landing Error Scoring System (LESS) + Lachman/Pivot-shift stability screen.',
        cutoffOrCriteria: 'LESS score >= 5 requires corrective jump-landing neuromuscular training before full-contact scrimmages.',
      },
      {
        toolName: 'Cervical Isometric Strength & Shoulder Girdle Screen',
        description: 'Handheld dynamometry of neck flexion, extension, and lateral flexion (Kabaddi tackle resistance).',
        cutoffOrCriteria: 'Neck extension strength < 25 kg in elite male raiders increases concussion risk on impact.',
      },
    ],
    movementAndBiomechanicsBattery: [
      {
        testName: 'Dubki Squat-and-Slide Low Center of Mass Test',
        protocol: 'Full deep squat evasion with rapid bilateral hip adduction and forward propulsion under a 80cm barrier.',
        targetBenchmark: 'Complete transit time < 0.85 seconds with symmetrical knee valgus-free alignment.',
        relevance: 'Essential raider evasive maneuver testing ankle dorsiflexion and eccentric quad control.',
      },
      {
        testName: 'Pro Agility 5-10-5 Shuttle on Kabaddi Mat',
        protocol: 'Rapid 5-yard sprint to touch line with hand, 10 yards to opposite line, 5 yards through center.',
        targetBenchmark: 'Elite male defenders < 4.25 seconds; elite female defenders < 4.65 seconds.',
        relevance: 'Simulates rapid corner-to-cover chain tackle repositioning.',
      },
    ],
    physiologicalTesting: [
      {
        testName: 'Anaerobic Wingate 30-Second Peak & Mean Power Test',
        metric: 'Peak Power (Watts/kg) and Fatigue Index (%)',
        eliteBenchmarkMale: 'Peak Power >= 14.5 W/kg; Fatigue Index < 38% (Simulates intense 30-second raid duration)',
        eliteBenchmarkFemale: 'Peak Power >= 12.0 W/kg; Fatigue Index < 42%',
        equipmentRequired: 'Monark cycle ergometer with computerized optical sensor.',
      },
    ],
    workloadMonitoringRules: [
      {
        metric: 'Contact Tackles & Raids Session Exposure',
        optimalRange: '40–60 full-contact collisions/week during competition phase.',
        dangerThreshold: '> 80 full-contact collisions/week, or return to contact within 14 days of concussion.',
        clinicalSignificance: 'Excessive contact volume without adequate recovery doubles musculoskeletal joint failure rates.',
      },
    ],
    returnToSportContinuum: [
      {
        stage: 'Stage 1: Return to Activity',
        objectiveGateways: ['Full painless knee active ROM (0°–135°)', 'Single-leg balance on mat > 45 seconds'],
        riskMitigation: 'No contact, no diving.',
      },
      {
        stage: 'Stage 2: Return to Sport Training',
        objectiveGateways: ['Agility footwork ladders without pain', 'Controlled 1-on-1 dummy hand-touch drills without tackling'],
        riskMitigation: 'Wearing rigid prophylactic ankle braces.',
      },
      {
        stage: 'Stage 3: Return to Full Practice',
        objectiveGateways: ['Full-speed raiding without contact', 'Controlled chain movement with partners (no live tackling)'],
        riskMitigation: 'Gradual reintroduction to mat friction.',
      },
      {
        stage: 'Stage 4: Return to Match Competition',
        objectiveGateways: ['Passes 3 consecutive full-contact practice sessions without joint effusion or apprehension', 'Isokinetic quad/hamstring strength Limb Symmetry Index >= 90%'],
        riskMitigation: 'Substituted in during low-risk match situations.',
      },
      {
        stage: 'Stage 5: Return to Peak Performance',
        objectiveGateways: ['Unrestricted starting 7 role in Pro Kabaddi League / National Championship', 'Normal raid success rate without protective avoidance'],
        riskMitigation: 'Weekly workload surveillance with medical team.',
      },
    ],
  },

  // ==========================================
  // 3. BADMINTON
  // ==========================================
  {
    sportId: 'badminton',
    sportName: 'Badminton (Singles & Doubles - BAI / BWF standard)',
    primaryIndianGoverningBody: 'Badminton Association of India (BAI) / National Centre of Excellence (Guwahati / Hyderabad)',
    internationalFederation: 'Badminton World Federation (BWF)',
    positionalRoles: ['Men’s Singles', 'Women’s Singles', 'Men’s Doubles (Rear-court smasher / Front-court net specialist)', 'Mixed Doubles'],
    keyPhysicalDemands: [
      'Repetitive explosive single-leg scissor jumps and rear-court smashes (shuttlecock speeds > 400 km/h)',
      'Severe eccentric deceleration loading on dominant lead knee during deep front-court lunges',
      'Rapid multidirectional change of direction with high ankle inversion torque on synthetic court mats',
      'Extreme glenohumeral rotation velocity and end-range scapular retraction during overhead jump smashes',
    ],
    commonInjuryEpidemiology: [
      'Ankle: Lateral ligament sprains (ATFL/CFL) and Achilles tendinopathy / acute rupture',
      'Knee: Patellar tendinopathy (Jumper’s knee) and patellofemoral pain syndrome',
      'Shoulder: Rotator cuff impingement, biceps tendinitis, and subscapularis strains',
      'Wrist & Forearm: Extensor carpi ulnaris (ECU) subluxation and lateral epicondylalgia',
      'Lumbar: Muscular facet syndrome from repetitive hyperextension during rear-court overhead clears',
    ],
    preParticipationScreening: [
      {
        toolName: 'BAI Front-Court Lunge Knee Biomechanics Screen',
        description: '2D video analysis of lead-knee alignment during maximal reach front-court net lunge.',
        cutoffOrCriteria: 'Dynamic knee valgus > 10° or tibial tuberosity extending > 8 cm past toes with heel lift indicates quad over-dominance and knee injury risk.',
      },
      {
        toolName: 'Weight-Bearing Lunge Test (WBLT) for Ankle Dorsiflexion',
        description: 'Knee-to-wall distance measured with heel firmly planted on floor.',
        cutoffOrCriteria: '< 10 cm or > 2 cm bilateral asymmetry indicates high risk for patellar tendinopathy and Achilles tendon overload.',
      },
    ],
    movementAndBiomechanicsBattery: [
      {
        testName: 'Badminton Hexagon Agility Test',
        protocol: 'Jumping in and out of a 66cm-sided hexagon with double-leg hops clockwise and counter-clockwise.',
        targetBenchmark: 'Elite national players < 11.2 seconds total time.',
        relevance: 'Validates footwork cadence and rapid court boundary perimeter retrieval.',
      },
      {
        testName: 'Single-Leg Countermovement Jump (SL-CMJ) with Force Plate',
        protocol: 'Unilateral CMJ measuring jump height, peak landing force, and reactive strength index.',
        targetBenchmark: 'Asymmetry between dominant lunging leg and non-dominant push-off leg < 10%.',
        relevance: 'Identifies chronic single-leg asymmetry from repetitive badminton lunging.',
      },
    ],
    physiologicalTesting: [
      {
        testName: 'Badminton-Specific On-Court Repeat Shuttle Sprint Test',
        metric: 'Total time across 6-corner shadow sprints and sprint decrement score (%)',
        eliteBenchmarkMale: 'Mean sprint time < 14.8 seconds; Fatigue decrement < 6.5%',
        eliteBenchmarkFemale: 'Mean sprint time < 16.2 seconds; Fatigue decrement < 7.0%',
        equipmentRequired: 'Badminton court, electronic timing gates at corners, audio signal.',
      },
    ],
    workloadMonitoringRules: [
      {
        metric: 'Weekly Court Hours & Overhead Jump Smash Repetitions',
        optimalRange: '18–24 hours/week on-court training; smash counts < 250 per session.',
        dangerThreshold: '> 28 hours/week, or spike in jump smash repetitions > 350 in a single training day.',
        clinicalSignificance: 'Triggers acute patellar tendon strain and rotator cuff overload.',
      },
    ],
    returnToSportContinuum: [
      {
        stage: 'Stage 1: Return to Activity',
        objectiveGateways: ['Weight-bearing lunge test > 10 cm pain-free', 'Pain-free single-leg calf raises 3 sets of 20 reps'],
        riskMitigation: 'No on-court impact or explosive jumps.',
      },
      {
        stage: 'Stage 2: Return to Sport Training',
        objectiveGateways: ['Stationary feeding drills (standing shadow strokes)', 'Half-court footwork drills at 50% velocity'],
        riskMitigation: 'Restricted to flat ground, zero jump smashes.',
      },
      {
        stage: 'Stage 3: Return to Full Practice',
        objectiveGateways: ['Full-court shadow footwork at 100% tempo for 10 minutes without knee/achilles ache', 'Single-leg hop test symmetry >= 90%'],
        riskMitigation: 'Doubles play first before singles match play.',
      },
      {
        stage: 'Stage 4: Return to Match Competition',
        objectiveGateways: ['Full competitive singles practice match (3 games of 21 points) with normal next-day recovery', 'Subjective recovery score > 90% on Badminton Functional Index'],
        riskMitigation: 'Playing lower-tier domestic tournament initially.',
      },
      {
        stage: 'Stage 5: Return to Peak Performance',
        objectiveGateways: ['Full participation on BWF World Tour circuit', 'Smash velocity restored to international tournament baseline'],
        riskMitigation: 'Ongoing load management with strength & conditioning coach.',
      },
    ],
  },

  // ==========================================
  // 4. FOOTBALL (SOCCER)
  // ==========================================
  {
    sportId: 'football',
    sportName: 'Football / Soccer (AIFF / ISL / I-League standard)',
    primaryIndianGoverningBody: 'All India Football Federation (AIFF) Sports Medicine Department',
    internationalFederation: 'Fédération Internationale de Football Association (FIFA)',
    positionalRoles: ['Central Defender (Center-Back)', 'Full-Back / Wing-Back', 'Central Midfielder', 'Winger', 'Striker / Forward', 'Goalkeeper'],
    keyPhysicalDemands: [
      'High-speed sprint running (1,000–1,400 meters of sprinting per 90-minute match)',
      'Total distance of 9.5–12.0 km covered per match with high aerobic-anaerobic variability',
      'Violent eccentric hamstring deceleration during maximal velocity sprints',
      'Rapid cutting maneuvers, tackling, jumping for aerial headers, and direct impact collisions',
    ],
    commonInjuryEpidemiology: [
      'Hamstring: Biceps femoris long head strain during late swing phase of high-speed sprinting',
      'Groin / Hip: Adductor longus strain and athletic pubalgia / sports hernia',
      'Knee: Non-contact ACL rupture (especially on uneven turf / monsoon grounds)',
      'Ankle: Lateral ligament sprains and anterior impingement syndrome',
      'Calf / Soleus: Deep soleus muscle strains from dense fixture schedules',
    ],
    preParticipationScreening: [
      {
        toolName: 'FIFA 11+ Comprehensive Warm-Up Screening',
        description: 'Assessment of core stability, eccentric hamstring control (Nordic Hamstring), and dynamic knee alignment.',
        cutoffOrCriteria: 'Completing FIFA 11+ minimum 2x/week reduces overall injuries by 39% and severe knee injuries by 45%.',
      },
      {
        toolName: 'NordBord Eccentric Hamstring Strength Testing',
        description: 'Bilateral measurement of eccentric knee flexion force during Nordic hamstring exercise.',
        cutoffOrCriteria: 'Relative force < 4.0 N/kg bodyweight or bilateral asymmetry > 15% carries 4.1x higher hamstring strain recurrence hazard.',
      },
    ],
    movementAndBiomechanicsBattery: [
      {
        testName: 'Cutting Angle Deceleration Biomechanics (45° & 90° Cut)',
        protocol: 'High-speed capture of trunk lean, knee flexion angle (> 30° desired), and knee valgus collapse during rapid cut.',
        targetBenchmark: 'Knee valgus angle < 5°; absence of hip internal rotation collapse.',
        relevance: 'Primary non-contact ACL injury prevention screen.',
      },
    ],
    physiologicalTesting: [
      {
        testName: 'Yo-Yo Intermittent Recovery Test Level 2 (Yo-Yo IR2)',
        metric: 'Distance in meters / High-intensity aerobic endurance',
        eliteBenchmarkMale: '>= 1,080 meters (Indian Super League midfield benchmark)',
        eliteBenchmarkFemale: '>= 840 meters (Indian Women’s League benchmark)',
        equipmentRequired: 'Calibrated football pitch track, audio pacer.',
      },
    ],
    workloadMonitoringRules: [
      {
        metric: 'High-Speed Running Distance (> 19.8 km/h) & Acute:Chronic Workload Ratio',
        optimalRange: 'ACWR between 0.8 and 1.3; High-speed running 400–700 meters per training week.',
        dangerThreshold: 'ACWR > 1.5, or sudden spike in weekly sprint distance > 150% of prior 3-week average.',
        clinicalSignificance: 'Exponential increase in acute hamstring and groin muscle tear risk.',
      },
    ],
    returnToSportContinuum: [
      {
        stage: 'Stage 1: Return to Activity',
        objectiveGateways: ['Painless normal walking gait', 'Isometric hamstring bridge at 90° and 30° knee flexion with pain <= 1/10'],
        riskMitigation: 'No running or ball kicking.',
      },
      {
        stage: 'Stage 2: Return to Sport Training',
        objectiveGateways: ['Linear jogging on pitch up to 70% max speed', 'Short passing on ground with inside of foot (no long lofted balls)'],
        riskMitigation: 'Avoiding rapid change of direction.',
      },
      {
        stage: 'Stage 3: Return to Full Practice',
        objectiveGateways: ['Maximal high-speed sprint >= 95% baseline speed', 'Unrestricted participation in non-contact tactical team training'],
        riskMitigation: 'Wearing distinctive colored bib to signify no tackling.',
      },
      {
        stage: 'Stage 4: Return to Match Competition',
        objectiveGateways: ['Completed 2 full-contact 11v11 practice matches without residual pain or swelling', 'NordBord eccentric hamstring strength >= 350 N and asymmetry < 10%'],
        riskMitigation: 'Introduced as substitute player for 20–30 minutes initial match exposure.',
      },
      {
        stage: 'Stage 5: Return to Peak Performance',
        objectiveGateways: ['Full 90-minute competitive match completion at starting tempo', 'High-speed running distance and sprint volume matches pre-injury GPS benchmarks'],
        riskMitigation: 'Mandatory ongoing weekly Nordic hamstring maintenance (3 sets of 6 reps, 2x/week).',
      },
    ],
  },

  // ==========================================
  // 5. FIELD HOCKEY
  // ==========================================
  {
    sportId: 'hockey',
    sportName: 'Field Hockey (Hockey India / FIH Astroturf standard)',
    primaryIndianGoverningBody: 'Hockey India / Sports Authority of India (National Centre of Excellence, SAI Bengaluru)',
    internationalFederation: 'International Hockey Federation (FIH)',
    positionalRoles: ['Forward (Striker)', 'Midfielder (Playmaker)', 'Full-Back (Defender / Drag-Flick Specialist)', 'Goalkeeper'],
    keyPhysicalDemands: [
      'Sustained semi-crouched forward trunk flexion (45°–70°) while dribbling at high velocity',
      'Explosive drag-flick rotational power (whipping hip-spine kinetic chain with speeds > 120 km/h)',
      'Rapid lateral deceleration and stick-tackling on high-friction water-based synthetic Astroturf',
      'High intermittent sprint volume (1.2–1.8 km of high-speed running per 60-minute match)',
    ],
    commonInjuryEpidemiology: [
      'Lumbar Spine: Thoracolumbar myofascial strain and L5/S1 facet arthropathy from crouched posture',
      'Hamstring & Adductors: Acute tears during low-dribble directional changes and split-step defense',
      'Ankle & Knee: Inversion sprains and meniscus tears on wet Astroturf turf catch',
      'Hand & Fingers: Fractures and lacerations from stick impacts and hard ball deflections',
      'Groin / Athletic Pubalgia: Repetitive rotational drag-flicking pelvic shear',
    ],
    preParticipationScreening: [
      {
        toolName: 'Hockey India Lumbar-Pelvic Posture & Drag-Flick Mobility Screen',
        description: 'Bilateral hip internal/external rotation, Thomas test for iliopsoas length, and thoracic spine rotation.',
        cutoffOrCriteria: 'Thoracic rotation asymmetry > 10° or hip internal rotation < 25° increases lumbar facet stress during drag-flick by 3.4x.',
      },
    ],
    movementAndBiomechanicsBattery: [
      {
        testName: 'Crouched Dribbling Trunk Kinematics Screen',
        protocol: '2D video analysis of lumbar lordosis preservation during 30m high-speed dribble.',
        targetBenchmark: 'Maintaining neutral lordotic spine with hip hinge rather than excessive lumbar kyphosis.',
        relevance: 'Prevents chronic lower back disability in elite hockey players.',
      },
    ],
    physiologicalTesting: [
      {
        testName: 'Yo-Yo Intermittent Recovery Test Level 1 (Yo-Yo IR1)',
        metric: 'Distance in meters',
        eliteBenchmarkMale: '>= 2,200 meters (Hockey India National Senior Team standard)',
        eliteBenchmarkFemale: '>= 1,760 meters (Hockey India Women’s National Team standard)',
        equipmentRequired: 'Astroturf surface, audio test protocol, cones.',
      },
    ],
    workloadMonitoringRules: [
      {
        metric: 'Drag-Flick Repetitions & Astroturf Exposure Hours',
        optimalRange: 'Drag-flick specialists: max 40 full-speed drag-flicks per training session.',
        dangerThreshold: '> 60 full-speed drag-flicks/day, or > 18 hours/week total turf exposure.',
        clinicalSignificance: 'Severe risk of pubic symphysis osteitis and lumbar annular tears.',
      },
    ],
    returnToSportContinuum: [
      {
        stage: 'Stage 1: Return to Activity',
        objectiveGateways: ['Painless standing upright trunk rotation', 'Hamstring flexibility (Straight leg raise > 80°)'],
        riskMitigation: 'Zero crouched dribbling or drag-flicking.',
      },
      {
        stage: 'Stage 2: Return to Sport Training',
        objectiveGateways: ['Upright passing drills without bending', 'Short interval jogging on grass'],
        riskMitigation: 'No Astroturf turf friction.',
      },
      {
        stage: 'Stage 3: Return to Full Practice',
        objectiveGateways: ['Full crouched dribbling at 80% speed on Astroturf without lumbar ache', 'Limb Symmetry Index >= 90% on agility tests'],
        riskMitigation: 'Limited to 50% match duration in practice games.',
      },
      {
        stage: 'Stage 4: Return to Match Competition',
        objectiveGateways: ['Completed full 60-minute simulated test match without substitution limitations', 'Drag-flick power and speed match pre-injury baseline without pelvic pain'],
        riskMitigation: 'Post-match recovery hydrotherapy and lumbar decompression routines.',
      },
      {
        stage: 'Stage 5: Return to Peak Performance',
        objectiveGateways: ['Unrestricted starting selection for FIH Pro League / Asian Games / Olympics', 'Zero recurrence of groin or back symptoms over 90 days'],
        riskMitigation: 'Permanent hip-rotator and core rotational power maintenance protocol.',
      },
    ],
  },

  // ==========================================
  // 6. WRESTLING (KUSHTI & FREESTYLE)
  // ==========================================
  {
    sportId: 'wrestling',
    sportName: 'Wrestling (Freestyle, Greco-Roman & Kushti / Dangal)',
    primaryIndianGoverningBody: 'Wrestling Federation of India (WFI) / Sports Authority of India (SAI)',
    internationalFederation: 'United World Wrestling (UWW)',
    positionalRoles: ['Lightweight (57-65 kg)', 'Middleweight (74-86 kg)', 'Heavyweight (97-125 kg)', 'Akhada / Mud Traditional Wrestler'],
    keyPhysicalDemands: [
      'Enormous isometric grappling strength and multi-axial cervical spine bridging power',
      'Explosive leg attacks (single-leg & double-leg takedowns) with rapid level change',
      'High-impact mat throws (Suplex, Gut-wrench) absorbing body weight of opponent',
      'Acute rapid weight-cutting and rehydration demands prior to official tournament weigh-in',
    ],
    commonInjuryEpidemiology: [
      'Cervical Spine: Whiplash, burner/stinger syndrome, and cervical disc herniation from bridging',
      'Knee: Medial collateral ligament (MCL) sprain and meniscal tears during leg defense',
      'Shoulder: Anterior glenohumeral dislocation, labral tears, and AC joint sprains from throws',
      'Ear / Head: Cauliflower ear (auricular hematoma) and concussions',
      'Skin / Infection: Ringworm (Tinea corporis gladiatorum) and impetigo from close skin contact',
    ],
    preParticipationScreening: [
      {
        toolName: 'WFI Cervical Bridge Strength & Spine Safety Screen',
        description: 'Isometric cervical neck strength (extension, flexion, rotation) via multi-axis dynamometry.',
        cutoffOrCriteria: 'Cervical extension strength must exceed 35 kg in senior male wrestlers to permit full-bridge defensive maneuvers.',
      },
      {
        toolName: 'Hydration & Safe Weight Management Protocol',
        description: 'Urine specific gravity (USG) testing during pre-competition weight-cut period.',
        cutoffOrCriteria: 'USG > 1.025 indicates severe hypohydration requiring medical intervention before weigh-in clearance.',
      },
    ],
    movementAndBiomechanicsBattery: [
      {
        testName: 'Takedown Level-Change Depth & Explosive Sprawl Test',
        protocol: 'Time taken to execute 5 consecutive sprawl recoveries against simulated leg dive.',
        targetBenchmark: 'Complete cycle time < 4.8 seconds with symmetrical hip drop.',
        relevance: 'Tests defensive reaction and hip extension power.',
      },
    ],
    physiologicalTesting: [
      {
        testName: 'Grappler-Specific Upper-Body Ergometer Wingate Anaerobic Power',
        metric: 'Arm-Cranking Peak & Mean Power (Watts)',
        eliteBenchmarkMale: 'Peak Arm Power >= 9.8 W/kg; Mean Power >= 7.2 W/kg',
        eliteBenchmarkFemale: 'Peak Arm Power >= 7.5 W/kg; Mean Power >= 5.5 W/kg',
        equipmentRequired: 'Monark upper-body arm ergometer.',
      },
    ],
    workloadMonitoringRules: [
      {
        metric: 'Live Sparring Rounds & Rapid Weight Loss Percentage',
        optimalRange: 'Max 12–15 competitive live rounds/week; weight loss < 5% of bodyweight over 72 hours.',
        dangerThreshold: 'Acute weight cut > 7% of bodyweight, or consecutive live sparring without neck rest.',
        clinicalSignificance: 'Severe dehydration increases catastrophic spinal cord and cardiac arrhythmia risk.',
      },
    ],
    returnToSportContinuum: [
      {
        stage: 'Stage 1: Return to Activity',
        objectiveGateways: ['Full cervical pain-free active ROM without radiculopathy (negative Spurling test)', 'Upper extremity isometric strength >= 85% of unaffected side'],
        riskMitigation: 'Zero grappling or neck bridging.',
      },
      {
        stage: 'Stage 2: Return to Sport Training',
        objectiveGateways: ['Takedown shadow drills with dummy', 'Isometric neck harness training without contact'],
        riskMitigation: 'Strictly non-contact dummy work.',
      },
      {
        stage: 'Stage 3: Return to Full Practice',
        objectiveGateways: ['Controlled light flow-wrestling (50% resistance) with trusted partner', 'Zero cervical or shoulder apprehension during sprawls'],
        riskMitigation: 'No live throws or high-amplitude slams.',
      },
      {
        stage: 'Stage 4: Return to Match Competition',
        objectiveGateways: ['Completed 6 full-intensity 3-minute live sparring rounds without symptom flare-up', 'Normal hydration status (USG < 1.020) confirmed'],
        riskMitigation: 'Approved protective headgear/ear guards.',
      },
      {
        stage: 'Stage 5: Return to Peak Performance',
        objectiveGateways: ['Cleared for National Games / Commonwealth / Olympic qualification tournament', 'Peak upper-body power matches national team baseline'],
        riskMitigation: 'Ongoing cervical isometric and rotator cuff prehabilitation routines.',
      },
    ],
  },
];
