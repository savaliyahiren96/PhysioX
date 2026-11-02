export type UserRole = 'doctor' | 'physiotherapist' | 'student' | 'admin';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  qualification: string;
  institutionOrClinic: string;
  location: string;
  avatarUrl?: string;
  permissions: {
    canAccessRealPatientRecords: boolean;
    canAccessPrivateRegistry: boolean;
    canEditPatientData: boolean;
    canPrescribeTreatment: boolean;
    canManageUsers: boolean;
    canViewAuditLogs: boolean;
    canExportReports: boolean;
  };
  createdAt: string;
  lastLogin: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  patientId?: string;
  ipAddress?: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface SystemHealthStatus {
  databaseStatus: 'HEALTHY' | 'DEGRADED' | 'DISCONNECTED';
  totalDoctors: number;
  totalPublicPatients: number;
  totalPrivatePatients: number;
  totalAuditLogs: number;
  totalMasterConditions: number;
  totalSpecialTests: number;
  aiServiceStatus: 'ACTIVE' | 'STANDBY';
  dpdpComplianceStatus: 'COMPLIANT' | 'NEEDS_REVIEW';
  lastBackupTimestamp: string;
}
