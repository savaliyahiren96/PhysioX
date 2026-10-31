export type SpecialtyId =
  | 'physiotherapy'
  | 'orthopaedics'
  | 'sports_medicine'
  | 'sports_physiotherapy'
  | 'strength_conditioning'
  | 'sports_nutrition'
  | 'neurology'
  | 'neurosurgery'
  | 'cardiopulmonary'
  | 'critical_care'
  | 'oncology'
  | 'pelvic_health'
  | 'pain_management'
  | 'postoperative_rehab'
  | 'general_medicine'
  | 'rheumatology'
  | 'paediatrics'
  | 'geriatrics';

export interface SpecialtyConfig {
  id: SpecialtyId;
  name: string;
  category: string;
  scopeSummary: string;
  mvpReady: boolean;
  supportedComplaints: string[];
}

export type Sex = 'Male' | 'Female' | 'Intersex' | 'Not Disclosed' | 'Unknown';

export interface PatientDemographics {
  id: string;
  mrn: string;
  name: string;
  age: number | '';
  sex: Sex;
  heightCm: number | '';
  weightKg: number | '';
  occupation: string;
  activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Heavy Athletic' | 'Unknown';
}

export interface PatientIntake extends PatientDemographics {
  chiefComplaint: string;
  anatomicalLocation: string; // e.g., 'Right Knee - Anterior / Retropatellar', 'Lumbar Spine - L4/L5 with radiation to right foot'
  onset: 'Acute (< 48 hrs)' | 'Subacute (2 - 6 weeks)' | 'Chronic (> 3 months)' | 'Acute on Chronic' | 'Unknown';
  duration: string;
  severityNprs: number; // 0 to 10
  progression: 'Improving' | 'Static' | 'Worsening' | 'Fluctuating' | 'Unknown';
  injuryMechanism: string; // e.g., 'Non-contact deceleration with pop', 'Lifting heavy load while flexed and rotated', 'Insidious / gradual'
  aggravatingFactors: string[];
  relievingFactors: string[];
  functionalLimitations: string;
  patientGoals: string;
  medicalHistory: string;
  surgicalHistory: string;
  comorbidities: string[];
  medications: string;
  allergies: string;
  priorInvestigations: string;
  priorTreatments: string;
  notes: string;
}

export type RedFlagUrgency = 'EMERGENCY_IMMEDIATE' | 'URGENT_SAME_DAY' | 'PRIORITY_ROUTINE' | 'NEGATIVE_CLEAR';

export interface RedFlagItem {
  id: string;
  specialty: SpecialtyId;
  conditionTarget: string;
  label: string;
  findingPrompt: string;
  urgency: RedFlagUrgency;
  escalationPath: string;
  clinicalRationale: string;
  isPositive: boolean;
  notes?: string;
}

export interface AdaptiveQuestion {
  id: string;
  specialty: SpecialtyId;
  complaintCondition: string; // condition under which question is shown
  question: string;
  explanation: string; // Clinical sensitivity/evidence rationale
  type: 'select' | 'boolean' | 'multiselect' | 'text';
  options?: string[];
  value: any;
  isSkipped: boolean;
  skipReason?: string;
}

export interface SpecialTestItem {
  id: string;
  name: string;
  category: 'Observation & Palpation' | 'ROM & Strength' | 'Neurological' | 'Special Diagnostic Test' | 'Validated Outcome Measure';
  indication: string;
  sensitivity?: string;
  specificity?: string;
  interpretationRules: string;
  evidenceSource: string;
  doi?: string;
  result: 'Positive' | 'Negative' | 'Equivocal' | 'Not Tested' | 'Contraindicated';
  scoreValue?: string;
  clinicianNotes?: string;
}

export interface DifferentialCandidate {
  id: string;
  condition: string;
  tier: 'Primary Consideration' | 'Secondary Consideration' | 'Less Common / Critical Differential';
  clinicalRationale: string;
  supportingFindings: string[];
  conflictingFindings: string[];
  missingInformation: string[];
  importantAlternatives: string[];
  redFlagNotes: string;
  evidenceCitations: {
    source: string;
    year: number;
    doi?: string;
    type: string;
  }[];
}

export type InvestigationModality =
  | 'Plain Radiograph (X-ray)'
  | 'MRI Scan'
  | 'CT Scan'
  | 'Diagnostic Ultrasound (MSK US)'
  | 'Pathology & Lab Diagnostics'
  | 'Arthrocentesis / Synovial Fluid'
  | 'Recent Technological Advance';

export interface ResearchArticleReference {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  studyType: string;
  sampleSize?: string;
  clinicalSummary: string;
  keyTakeaway: string;
}

export interface InvestigationGuidance {
  id: string;
  modality: InvestigationModality;
  modalitySubtype?: string; // e.g. "Standing 3-View Rosenberg / Skyline", "3T T2-Mapping / Cartilage", "Dual-Energy CT (DECT)", "High-Resolution Power Doppler"
  isIndicated: boolean;
  urgencyLevel: 'Emergency' | 'Urgent (< 2 weeks)' | 'Elective / Post-Conservative' | 'Not Indicated' | 'Specialist Consultation Only';
  clinicalIndicationRules: string;
  limitationsAndRisks: string;
  guidelineReference: string;
  choosingWiselyStatement: string;
  diagnosticAccuracy?: {
    sensitivity?: string;
    specificity?: string;
    positiveLikelihoodRatio?: string;
    negativeLikelihoodRatio?: string;
  };
  sampleFindings?: string;
  recentResearchPaper?: ResearchArticleReference;
}

export interface ConditionInvestigationProfile {
  conditionName: string;
  specialty: SpecialtyId;
  summaryGuideline: string;
  investigations: InvestigationGuidance[];
  recentAdvances: {
    technologyName: string;
    clinicalImpact: string;
    readinessLevel: 'Routine Clinical Standard' | 'Emerging Guideline Option' | 'Translational Research';
    keyJournalArticle: ResearchArticleReference;
  }[];
  pathLabProfile?: {
    testName: string;
    normalReference: string;
    pathologicalThreshold: string;
    clinicalSignificance: string;
    evidenceJournal: string;
    doi: string;
  }[];
  newResearchPapers: ResearchArticleReference[];
}

export type JointRegion =
  | 'Knee'
  | 'Lumbar Spine & Pelvis'
  | 'Shoulder'
  | 'Cervical Spine'
  | 'Hip & Groin'
  | 'Elbow'
  | 'Wrist & Hand'
  | 'Ankle & Foot'
  | 'Temporomandibular Joint (TMJ)'
  | 'Thoracic Spine & Ribs';

export interface PhysiotherapyProtocolPhase {
  phaseNumber: number;
  phaseName: string;
  timeline: string;
  clinicalGoals: string[];
  exercisePrescription: {
    category: string;
    exerciseName: string;
    dosage: string;
    clinicalRationale: string;
  }[];
  progressionCriteria: string[];
  precautionsAndContraindications: string[];
}

export interface JointConditionMaster {
  id: string;
  joint: JointRegion;
  specialty?: SpecialtyId;
  name: string;
  category: string;
  isRedFlag: boolean;
  redFlagSeverity?: 'EMERGENCY_IMMEDIATE' | 'URGENT_SAME_DAY';
  clinicalPresentation: string;
  bedsideAssessmentTests: {
    testName: string;
    sensitivity: string;
    specificity: string;
    positiveLikelihoodRatio?: string;
    techniqueAndInterpretation: string;
    evidenceCitation: string;
    doi?: string;
  }[];
  investigationsProfile: {
    modality: InvestigationModality;
    description: string;
    indications: string;
    keyFindings: string;
    accuracyOrYield: string;
    recentAdvanceNote?: string;
    evidencePaper?: ResearchArticleReference;
  }[];
  recentAdvancesAndResearch: {
    advanceTitle: string;
    description: string;
    readinessLevel: 'Routine Clinical Standard' | 'Emerging Guideline Option' | 'Translational Research';
    journalPaper: ResearchArticleReference;
  }[];
  physiotherapyProtocol: {
    summary: string;
    guidelineBasis: string;
    phases: PhysiotherapyProtocolPhase[];
    dischargeAndReturnToActivityCriteria: string[];
    patientEducationSummary: string;
  };
}

export interface SpecialtyConditionMaster {
  id: string;
  specialty: SpecialtyId;
  joint?: JointRegion;
  name: string;
  category: string;
  isRedFlag: boolean;
  redFlagSeverity?: 'EMERGENCY_IMMEDIATE' | 'URGENT_SAME_DAY';
  targetPopulation?: string;
  clinicalPresentation: string;
  bedsideAssessmentTests: {
    testName: string;
    sensitivity: string;
    specificity: string;
    positiveLikelihoodRatio?: string;
    techniqueAndInterpretation: string;
    evidenceCitation: string;
    doi?: string;
  }[];
  investigationsProfile: {
    modality: InvestigationModality;
    description: string;
    indications: string;
    keyFindings: string;
    accuracyOrYield: string;
    recentAdvanceNote?: string;
    evidencePaper?: ResearchArticleReference;
  }[];
  recentAdvancesAndResearch: {
    advanceTitle: string;
    description: string;
    readinessLevel: 'Routine Clinical Standard' | 'Emerging Guideline Option' | 'Translational Research';
    journalPaper: ResearchArticleReference;
  }[];
  physiotherapyProtocol: {
    summary: string;
    guidelineBasis: string;
    phases: PhysiotherapyProtocolPhase[];
    dischargeAndReturnToActivityCriteria: string[];
    patientEducationSummary: string;
  };
}

// ==========================================
// MASTER NAMED PHYSIOTHERAPY PROTOCOLS (MODULE 20B / 20C)
// ==========================================
export type ProtocolCategory =
  | 'Achilles & Foot Tendinopathy / Overload'
  | 'Patellar Tendon & Knee Cartilage / Ligament'
  | 'Hip & Gluteal Tendinopathy / Post-Arthroscopy'
  | 'Shoulder & Rotator Cuff / Instability'
  | 'Elbow, Wrist & Hand Tendon / Nerve / Post-Op'
  | 'ACL & Knee Ligament / Arthroplasty'
  | 'Ankle & Foot Sprain / Rupture / Deformity'
  | 'Spinal, Neck & TMJ Mechanical / Stabilisation'
  | 'Fracture Classification & Post-Op Guidelines'
  | 'Neurological & Neuromuscular Rehabilitation'
  | 'Cardiopulmonary & Critical Care Rehabilitation'
  | 'Paediatric & Developmental Approaches'
  | 'Geriatric, Balance & Frailty Programmes'
  | 'Pelvic Health, Incontinence & Postpartum Care';

export type ProtocolType =
  | 'Active Exercise Protocol'
  | 'Manual Therapy Mobilisation'
  | 'Postoperative Milestone Pathway'
  | 'Injury Prevention Programme'
  | 'Taping & Biomechanical Support'
  | 'Orthopaedic Fracture Classification'
  | 'Clinical Prediction Rule'
  | 'Conservative Consensus Guideline';

export interface NamedProtocolExercise {
  exerciseName: string;
  patientPositioning: string;
  dosageSetsReps: string;
  frequency: string;
  duration: string;
  techniqueDescription: string;
}

export interface NamedProtocolReference {
  authorsYear: string;
  title: string;
  journal: string;
  doi?: string;
}

export interface NamedProtocolMaster {
  id: string;
  protocolName: string;
  associatedMedicalCondition: string;
  relevantSpeciality: SpecialtyId | string;
  anatomicalRegion: string;
  protocolCategory: ProtocolCategory;
  protocolType: ProtocolType;
  clinicalIndication: string;
  treatmentObjectives: string[];
  patientSelectionCriteria: string[];
  exerciseInterventions: NamedProtocolExercise[];
  progressionCriteria: string[];
  precautions: string[];
  contraindications: string[];
  expectedClinicalOutcomes: string;
  reassessmentCriteria: string[];
  supportingReferences: NamedProtocolReference[];
  evidenceLevel:
    | 'Level I (Systematic Review / Meta-Analysis / High-Quality RCTs)'
    | 'Level II (Prospective Cohort Study / Pragmatic Trial)'
    | 'Level III (Case-Control / Retrospective Cohort)'
    | 'Level IV (Case Series / Expert Consensus Guidelines)';
  surgicalVsNonsurgical: 'Nonsurgical / Conservative' | 'Postoperative / Surgical' | 'Both / Perioperative';
  publicationYear: number;
  supersededStatus?: 'Current Gold Standard' | 'Valid Guideline Alternative' | 'Historical / Replaced by Modern Evidence';
  version: string;
  lastUpdatedDate: string;
}

export interface ProtocolComparison {
  protocolA: NamedProtocolMaster;
  protocolB: NamedProtocolMaster;
  comparisonPoints: {
    feature: string;
    protocolAValue: string;
    protocolBValue: string;
    clinicalTakeaway: string;
  }[];
  clinicalDecisionGuidance: string;
}

// ==========================================
// FEATURE AUDIT & SMART INTEGRATION (MODULE 20A)
// ==========================================
export type FeatureAuditStatus =
  | 'Existing & Functional'
  | 'Existing but Incomplete'
  | 'Existing but Needs Correction'
  | 'Not Available – Needs Development'
  | 'Implemented & Tested';

export interface FeatureAuditItem {
  id: string;
  moduleCode: string;
  featureName: string;
  domain: 'Clinical Assessment' | 'Protocol Library' | 'Sports Performance' | 'Diagnostics' | 'System & Governance';
  status: FeatureAuditStatus;
  inspectionSummary: string;
  actionTaken: string;
  verificationEvidence: string;
}

export interface TreatmentRecommendation {
  conservativeRehab: string[];
  patientEducation: string[];
  loadManagement: string;
  precautions: string[];
  contraindications: string[];
  pharmacologyContext: string; // Clearly noting prescribing scope
  specialistConsultThresholds: string[];
  reassessmentTimeline: string;
}

export interface MultidisciplinaryReferral {
  targetSpecialty: string;
  urgency: 'Emergency (Immediate Decompression/Transfer)' | 'Urgent (Within 24-48 Hours)' | 'Semi-Urgent (Within 2 Weeks)' | 'Routine Outpatient';
  consultationQuestion: string;
  summaryOfFacts: string;
  objectivePhysicalFindings: string;
  imagingAndLabsCompleted: string;
  clinicianSignature: string;
  clinicianLicense: string;
  referralDate: string;
}

export interface ClinicalReportState {
  id: string;
  status: 'Draft' | 'Clinician Reviewed' | 'Clinician Signed & Approved';
  createdAt: string;
  updatedAt: string;
  patient: PatientIntake;
  specialty: SpecialtyId;
  redFlagsSummary: {
    screenedCount: number;
    positiveCount: number;
    highestUrgency: RedFlagUrgency;
  };
  keyFindings: string[];
  differentialTopThree: string[];
  investigationPlan: string;
  treatmentPlan: TreatmentRecommendation;
  referralGenerated: boolean;
  clinicianDeclaration: string;
}

export interface LiteratureArticle {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  studyType: string;
  sampleSize: string;
  targetPopulation: string;
  keyFindings: string;
  limitations: string;
  relevanceScore: number;
  lastChecked: string;
}

export interface ResearchWatchlist {
  id: string;
  name: string;
  keywords: string;
  specialty: SpecialtyId;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  lastRun: string;
  unreadCount: number;
  active: boolean;
}

export interface ClinicalRuleGovernance {
  id: string;
  title: string;
  version: string;
  status: 'Active' | 'Under Review' | 'Deprecated' | 'Rolled Back';
  lastReviewed: string;
  reviewedBy: string;
  description: string;
  rollbackAvailable: boolean;
}

// ==========================================
// ATHLETE ASSESSMENT & SPORTS PERFORMANCE
// ==========================================
export type SportType =
  | 'cricket'
  | 'football'
  | 'badminton'
  | 'kabaddi'
  | 'wrestling'
  | 'hockey'
  | 'athletics_track'
  | 'running_marathon'
  | 'swimming'
  | 'tennis'
  | 'volleyball'
  | 'basketball'
  | 'weightlifting'
  | 'combat_sports';

export type AthleteLevel = 'Recreational' | 'District / State' | 'National' | 'International / Elite' | 'Youth Academy' | 'Masters';

export interface SportSpecificPathway {
  sportId: SportType;
  sportName: string;
  primaryIndianGoverningBody: string; // e.g. BCCI, AIFF, BAI, AKFI, WFI, Hockey India, AFI
  internationalFederation: string; // e.g. ICC, FIFA, BWF, IKF, UWW, FIH, World Athletics
  positionalRoles: string[];
  keyPhysicalDemands: string[];
  commonInjuryEpidemiology: string[];
  preParticipationScreening: {
    toolName: string;
    description: string;
    cutoffOrCriteria: string;
  }[];
  movementAndBiomechanicsBattery: {
    testName: string;
    protocol: string;
    targetBenchmark: string;
    relevance: string;
  }[];
  physiologicalTesting: {
    testName: string;
    metric: string;
    eliteBenchmarkMale: string;
    eliteBenchmarkFemale: string;
    equipmentRequired: string;
  }[];
  workloadMonitoringRules: {
    metric: string;
    optimalRange: string;
    dangerThreshold: string;
    clinicalSignificance: string;
  }[];
  returnToSportContinuum: {
    stage: 'Stage 1: Return to Activity' | 'Stage 2: Return to Sport Training' | 'Stage 3: Return to Full Practice' | 'Stage 4: Return to Match Competition' | 'Stage 5: Return to Peak Performance';
    objectiveGateways: string[];
    riskMitigation: string;
  }[];
}

// ==========================================
// STRENGTH AND CONDITIONING (S&C)
// ==========================================
export type PeriodizationModel = 'Linear / Traditional' | 'Daily Undulating (DUP)' | 'Block Periodisation' | 'Conjugate' | 'Phased Post-Injury Return';
export type SCExperienceLevel = 'Beginner (0-1 yr)' | 'Intermediate (1-3 yrs)' | 'Advanced (3+ yrs)' | 'Youth LTAD' | 'Masters / Veteran';

export interface ExercisePrescriptionDetail {
  exerciseName: string;
  category: 'Squat / Knee Dominant' | 'Hinge / Posterior Chain' | 'Upper Push (Horizontal/Vertical)' | 'Upper Pull' | 'Rotational & Core' | 'Plyometrics & RFD' | 'Sprint & Acceleration' | 'Conditioning';
  sets: number;
  repsOrDuration: string;
  intensityRpeOrPercent1RM: string;
  restSeconds: number;
  tempo: string; // e.g. "3-1-X-1"
  coachingCues: string;
  equipmentAdaptation: string; // Equipment alternatives for Indian gym/ground settings
}

export interface TrainingSessionDay {
  dayName: string; // e.g. "Day 1: Lower Body Max Strength & Acceleration"
  warmUpRampProtocol: string[];
  exercises: ExercisePrescriptionDetail[];
  coolDownMobility: string[];
}

export interface MicrocyclePlan {
  weekNumber: number;
  focus: string;
  sessions: TrainingSessionDay[];
  volumeLoadEstimateKg: string;
  deloadWeek: boolean;
}

export interface MesocycleBlock {
  blockName: string; // e.g. "Anatomical Adaptation", "Maximal Strength", "Power Transition"
  durationWeeks: number;
  primaryAdaptation: string;
  model: PeriodizationModel;
  microcycles: MicrocyclePlan[];
}

// ==========================================
// SPORTS NUTRITION & INDIAN DIET PLANNING
// ==========================================
export type DietaryTradition = 'North Indian' | 'South Indian' | 'West Indian / Gujarati / Maharashtrian' | 'East Indian' | 'Pan-Indian';
export type FoodPreference = 'Pure Vegetarian (Lacto)' | 'Eggetarian (Lacto-Ovo)' | 'Non-Vegetarian (Chicken, Fish, Eggs)' | 'Vegan' | 'Jain (Strict Vegetarian without roots)';
export type BudgetLevel = 'Economy / Budget-Friendly (Local Dal, Sattu, Besan, Rice, Curd)' | 'Moderate' | 'High-Performance / Premium';

export interface IndianFoodItem {
  name: string;
  localName?: string;
  category: 'Protein Core' | 'Complex Carbohydrate' | 'Healthy Fats' | 'Fiber & Micro-Dense';
  servingGramsOrUnits: string;
  caloriesKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  costTier: 'Very Low Cost' | 'Moderate' | 'Premium';
  culinaryNotes: string;
}

export interface NutritionMealSlot {
  mealName: 'Early Morning / Pre-Training' | 'Post-Training Recovery Golden Window' | 'Breakfast' | 'Mid-Morning Snack' | 'Lunch' | 'Evening Pre-Workout / Snack' | 'Dinner' | 'Bedtime Casein';
  timing: string;
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  items: {
    foodName: string;
    portionDescription: string;
    nutritionSummary: string;
    budgetAlternative?: string;
  }[];
  clinicalNutrientTimingRationale: string;
}

export interface IndianPersonalizedNutritionPlan {
  id: string;
  athleteGoal: 'Lean Muscle Hypertrophy' | 'Fat Loss with Muscle Retention' | 'Endurance Match Performance' | 'Injury Recovery & Post-Op Anabolism' | 'Weight-Class Sports Cutting & Recovery';
  bmrKcal: number;
  totalDailyEnergyExpenditureKcal: number;
  dailyCalorieTarget: number;
  proteinTargetGrams: number;
  proteinGramsPerKg: number;
  carbsTargetGrams: number;
  carbsGramsPerKg: number;
  fatsTargetGrams: number;
  hydrationSweatLossStrategy: string;
  electrolytesStrategy: string; // Nimbu paani, ORS, coconut water adaptations
  icmrNinGuidelinesAlignment: string; // Alignment with ICMR-NIN 2024 Dietary Guidelines for Indians
  wadaNadaComplianceNote: string; // Safety checks against adulterated supplements
  redSScreeningNote: string; // Screening for Relative Energy Deficiency in Sport
  meals: NutritionMealSlot[];
}

// ==========================================
// INDIAN HOSPITAL INVESTIGATION REFERENCE ATLAS
// ==========================================
export type IndianHospitalTier =
  | 'Tier 1 Apex / Super-Specialty (AIIMS, PGI, Medanta, Apollo, Max)'
  | 'Tier 2 District Hospital / State Medical College / ESI Hospital'
  | 'Tier 3 Sub-District / Community Health Centre (CHC) / Private Clinic';

export interface RadiographicImageFinding {
  id: string;
  label: string;
  x: number; // percentage 0-100% on scan
  y: number; // percentage 0-100% on scan
  description: string;
  significance: 'Critical Pathology' | 'Diagnostic Landmark' | 'Normal Reference';
}

export interface RadiographicViewerData {
  modalityType: 'X-RAY' | 'MRI' | 'CT' | 'ULTRASOUND' | 'EMG_NCS' | 'LAB_REPORT';
  projectionView: string;
  pathologyTitle: string;
  normalPlateDescription: string;
  pathologicalPlateDescription: string;
  svgGraphicType:
    | 'xray-knee-oa'
    | 'mri-knee-acl'
    | 'ct-lumbar-pars'
    | 'mri-lumbar-herniation'
    | 'msk-us-rotator-cuff'
    | 'ct-gout-dect'
    | 'xray-ankle-boehler'
    | 'xray-scoliosis-cobb'
    | 'emg-radiculopathy'
    | 'lab-pathology-panel';
  findingsHotspots: RadiographicImageFinding[];
  diagnosticCriteriaSummary: string[];
}

export interface IndianInvestigationAtlasItem {
  id: string;
  modalityName: string;
  subType: string;
  bodyRegionOrSpecialty: string;
  tierAvailability: IndianHospitalTier[];
  approximateCostINR: string;
  ayushmanBharatCovered: boolean;
  purposeAndIndications: string;
  contraindicationsAndSafety: string;
  patientPreparationProtocol: string;
  normalAnatomicalFindings: string;
  pathologicalFindingsAndSigns: string;
  diagnosticAccuracySensSpec: string;
  rehabilitationAndAthleticImplications: string;
  annotatedDiagramOrVisualDetails: {
    visualDescription: string;
    keyLandmarksToInspect: string[];
    typicalPitfallsOrArtifacts: string;
  };
  evidenceGuidelineCitation: string;
  doi?: string;
  radiographicViewer?: RadiographicViewerData;
}

// ==========================================
// MULTIDISCIPLINARY TEAM (MDT) CASE DISCUSSIONS
// ==========================================
export interface MDTTeamMember {
  role: 'Orthopaedic Surgeon' | 'Neurologist / Neurosurgeon' | 'Consultant Physiotherapist' | 'Sports Medicine Physician' | 'Strength & Conditioning Specialist' | 'Sports Dietitian' | 'Musculoskeletal Radiologist';
  name: string;
  qualifications: string;
  specialtyInputSummary: string;
  recommendedNextActions: string[];
  consensusAgreement: 'Agreed' | 'Agreed with Precaution' | 'Further Testing Required' | 'Divergent Opinion';
}

export interface MDTCaseDiscussionRecord {
  id: string;
  caseTitle: string;
  patientId: string;
  patientDemographicsSummary: string;
  primaryConcernOrPresentation: string;
  chairperson: string;
  meetingDate: string;
  teamInputs: MDTTeamMember[];
  finalConsensusActionPlan: string;
  monitoringMilestones: string[];
}

