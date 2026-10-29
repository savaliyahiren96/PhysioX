export type SpecialtyId =
  | 'physiotherapy'
  | 'orthopaedics'
  | 'sports_medicine'
  | 'neurology'
  | 'neurosurgery'
  | 'cardiopulmonary'
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
  | 'Ankle & Foot';

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
