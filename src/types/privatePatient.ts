export type PrivatePatientStatus = 'Active' | 'On Hold' | 'Discharged';

export interface PrivateTreatmentSession {
  sessionId: string;
  sessionNumber: number;
  date: string;
  treatmentGiven: string;
  patientResponse: string;
  therapistNotes?: string;
  clinicianName?: string;
}

export interface PrivatePatientDocument {
  id: string;
  title: string;
  documentType: 'X-Ray / MRI' | 'Lab Report' | 'Physiotherapy Assessment' | 'Surgical Discharge Summary' | 'Other Clinical Note';
  uploadDate: string;
  fileSize?: string;
  fileUrl?: string; // Data URL or preview
  notes?: string;
}

export interface PrivatePhysiotherapyAssessment {
  romFindings?: string;
  mmtFindings?: string;
  postureGaitFindings?: string;
  specialTestsFindings?: string;
  functionalFindings?: string;
  painScoreNprs?: number;
  clinicalImpression?: string;
}

export interface PrivateTreatmentPlan {
  shortTermGoals?: string;
  longTermGoals?: string;
  prescribedExercises?: string;
  dosageSetsReps?: string;
  frequencyAndDuration?: string;
  precautions?: string;
  progressionCriteria?: string;
}

export interface PrivatePatientRecord {
  id: string; // Auto-generated e.g. 'PVT-2026-001'
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contactNumber: string;
  address: string;
  dateOfFirstVisit: string;
  chiefComplaints: string;
  clinicalDiagnosis: string;
  medicalHistory: string;
  physiotherapyAssessment: PrivatePhysiotherapyAssessment;
  treatmentPlan: PrivateTreatmentPlan;
  treatmentSessions: PrivateTreatmentSession[];
  followUpDate: string;
  status: PrivatePatientStatus;
  documents: PrivatePatientDocument[];
  doctorId: string; // e.g. 'DOC-DARPAN-01'
  doctorName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PrivateRegistrySecurityState {
  isUnlocked: boolean;
  unlockedAt?: number;
  defaultPinHint: string;
}
