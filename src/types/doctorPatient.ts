export type PatientGender = 'Male' | 'Female' | 'Not Specified' | 'Other';

export type PatientStatus =
  | 'Active'
  | 'Under Rehabilitation'
  | 'Awaiting Follow-up'
  | 'Discharged'
  | 'On Hold';

export type ConditionCertainty = 'Confirmed' | 'Suspected' | 'Probable' | 'Differential';

export interface DoctorProfile {
  id: string; // Auto-generated e.g. 'DOC-DARPAN-01'
  username: string;
  fullName: string;
  designation: string;
  qualification: string;
  specialisation: string;
  registrationNumber: string; // Not invented, user editable
  hospitalClinicName: string;
  clinicAddress: string;
  contactNumber: string; // Not invented, user editable
  email: string; // Not invented, user editable
  profilePhotoUrl?: string;
  professionalExperience: string; // e.g. '10+ Years Musculoskeletal & Sports Rehab'
  workingLocation: string; // 'Vadodara, Gujarat'
  professionalStatus: string; // 'Physiotherapy Practitioner'
  createdAt: string;
  updatedAt: string;
}

export interface ClinicalAssessmentData {
  romFindings: string;
  mmtFindings: string;
  gaitAbnormality: string;
  mobilityTransfer: string;
  balanceScore: string;
  specialTests: string;
  outcomeScore: string;
  redFlagsScreening: string;
  clinicalImpressionNotes: string;
}

export interface ProbableConditionEntry {
  conditionName: string;
  status: ConditionCertainty;
  confidenceScore?: number; // e.g. 85%
  clinicalRationale: string;
  evidenceLevel: 'Strong Evidence' | 'Evidence' | 'Expert Opinion';
  guidelineReference?: string;
}

export interface PhysiotherapyManagementPlan {
  currentRehabPhase: string;
  shortTermGoals: string;
  longTermGoals: string;
  interventions: string[];
  exerciseDosage: string;
  frequencyWeekly: string;
  precautions: string;
  contraindications: string;
  progressionCriteria: string;
}

export interface DailyProgressNote {
  id: string;
  sessionNumber: number;
  date: string;
  subjectiveNotes: string;
  objectiveNotes: string;
  treatmentGiven: string;
  responseToTreatment: string;
  planForNextSession: string;
  clinicianName: string;
}

export interface FollowUpAppointment {
  id: string;
  scheduledDate: string;
  timeSlot?: string;
  status: 'Scheduled' | 'Completed' | 'Missed' | 'Rescheduled';
  purpose: string;
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  doctorName: string;
  action: string;
  details: string;
}

export interface DoctorPatient {
  id: string; // e.g. 'PT-2026-001'
  doctorId: string; // assigned doctor ID e.g. 'DOC-DARPAN-01'
  doctorAssigned: string; // 'Dr. Darpan Vanavi'
  name: string;
  age: number | string;
  gender: PatientGender;
  location: string; // e.g. 'Pipaliya', 'Khandha'
  contactNumber?: string;
  registrationDate: string;
  primaryDiagnosis: string;
  presentingComplaints: string;
  medicalHistory: string;
  surgicalHistory: string;
  clinicalAssessment: ClinicalAssessmentData;
  probableConditions: ProbableConditionEntry[];
  physiotherapyManagement: PhysiotherapyManagementPlan;
  dailyProgressNotes: DailyProgressNote[];
  followUpHistory: FollowUpAppointment[];
  status: PatientStatus;
  auditLogs: AuditLogEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ProbableConditionDetail {
  id: string;
  conditionName: string;
  synonyms: string[];
  anatomicalRegion: string;
  relevantSpecialty: string;
  clinicalPresentation: string;
  subjectiveAssessment: string[];
  objectiveAssessment: string[];
  romExpectations: {
    movement: string;
    normal: string;
    expectedRestriction: string;
    rehabGoal: string;
  }[];
  mmtStrengthAssessment: {
    muscleGroup: string;
    nerveRoot: string;
    typicalImpairment: string;
    targetMilestone: string;
  }[];
  flexibilityAndMobility: string[];
  functionalMobilityTransfers: {
    testName: string;
    clinicalNorm: string;
    expectedPatientPerformance: string;
    progressionBenchmark: string;
  }[];
  gaitAnalysis: {
    typicalPattern: string;
    compensatoryMechanisms: string[];
    gaitTrainingFocus: string;
  };
  balanceTesting: {
    testName: string;
    cutOffRisk: string;
    balanceProtocol: string;
  }[];
  specialTests: {
    testName: string;
    targetStructure: string;
    diagnosticAccuracy: string;
    procedure: string;
  }[];
  outcomeMeasures: {
    toolName: string;
    mcid: string;
    targetScore: string;
    description: string;
  }[];
  physiotherapyGoals: {
    acutePhase: string[];
    subacutePhase: string[];
    functionalPhase: string[];
    returnToActivityPhase: string[];
  };
  rehabilitationConsiderations: {
    weightBearingProtocol: string;
    romMilestones: string;
    quadricepsActivationProtocol: string;
    patellarMobilityProtocol?: string;
    precautionFlags: string[];
    contraindications: string[];
  };
  evidenceRating: {
    level: 'Strong Evidence' | 'Evidence' | 'Expert Opinion';
    sources: string[];
  };
}

export interface DashboardMetrics {
  totalPatients: number;
  activePatients: number;
  underRehab: number;
  awaitingFollowUp: number;
  dischargedPatients: number;
  onHoldPatients: number;
  locationDistribution: Record<string, number>;
  conditionDistribution: Record<string, number>;
  recentPatients: DoctorPatient[];
}
