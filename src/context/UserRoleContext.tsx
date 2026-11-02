import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, UserAccount, AuditLogEntry } from '../types/userRole';
import { INITIAL_DOCTOR } from '../data/initialDoctorPatientData';

export interface UserRoleContextType {
  currentRole: UserRole;
  currentUser: UserAccount;
  setRole: (role: UserRole) => void;
  canAccessRealPatients: boolean;
  canAccessPrivateRegistry: boolean;
  canEditPatientData: boolean;
  canManageSystem: boolean;
  logAuditAction: (action: string, module: string, details: string, patientId?: string, severity?: 'INFO' | 'WARNING' | 'CRITICAL') => Promise<void>;
}

const DEFAULT_USERS: Record<UserRole, UserAccount> = {
  doctor: {
    id: INITIAL_DOCTOR.id,
    name: INITIAL_DOCTOR.fullName,
    email: 'drdarpan.vanavi@clinicaai.internal',
    role: 'doctor',
    designation: INITIAL_DOCTOR.designation,
    qualification: INITIAL_DOCTOR.qualification,
    institutionOrClinic: INITIAL_DOCTOR.hospitalClinicName || 'Vanavi Physiotherapy Clinic',
    location: INITIAL_DOCTOR.workingLocation,
    permissions: {
      canAccessRealPatientRecords: true,
      canAccessPrivateRegistry: true,
      canEditPatientData: true,
      canPrescribeTreatment: true,
      canManageUsers: false,
      canViewAuditLogs: true,
      canExportReports: true,
    },
    createdAt: '2026-01-15T09:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  physiotherapist: {
    id: 'PT-CLIN-01',
    name: 'Dr. Darpan Vanavi (Consultant PT)',
    email: 'consultant.pt@clinicaai.internal',
    role: 'physiotherapist',
    designation: 'Senior Musculoskeletal & Sports Physiotherapist',
    qualification: 'BPT, MPT (Musculoskeletal & Sports PT)',
    institutionOrClinic: 'ClinicaAI Advanced Biomechanics & Sports Rehab Centre',
    location: 'Vadodara, Gujarat',
    permissions: {
      canAccessRealPatientRecords: true,
      canAccessPrivateRegistry: false,
      canEditPatientData: true,
      canPrescribeTreatment: true,
      canManageUsers: false,
      canViewAuditLogs: false,
      canExportReports: true,
    },
    createdAt: '2026-02-01T10:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  student: {
    id: 'STU-BPT-2026',
    name: 'Ananya Sharma (BPT / MPT Intern)',
    email: 'student.academic@clinicaai.edu',
    role: 'student',
    designation: 'Clinical Physiotherapy Scholar & Intern',
    qualification: 'BPT Final Year / MPT Candidate',
    institutionOrClinic: 'Faculty of Physiotherapy, Gujarat Medical University',
    location: 'Vadodara, Gujarat',
    permissions: {
      canAccessRealPatientRecords: false, // MANDATORY: Anonymized educational cases only!
      canAccessPrivateRegistry: false,
      canEditPatientData: false,
      canPrescribeTreatment: false,
      canManageUsers: false,
      canViewAuditLogs: false,
      canExportReports: false,
    },
    createdAt: '2026-08-01T08:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  admin: {
    id: 'ADM-SYS-01',
    name: 'System Governance Officer',
    email: 'compliance@clinicaai.org',
    role: 'admin',
    designation: 'Chief Clinical & Data Privacy Administrator',
    qualification: 'Healthcare Informatics & Regulatory Compliance',
    institutionOrClinic: 'ClinicaAI Health Governance Board',
    location: 'Vadodara / National Data Centre',
    permissions: {
      canAccessRealPatientRecords: true,
      canAccessPrivateRegistry: true,
      canEditPatientData: true,
      canPrescribeTreatment: true,
      canManageUsers: true,
      canViewAuditLogs: true,
      canExportReports: true,
    },
    createdAt: '2026-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('clinica_active_user_role') as UserRole;
    if (saved && (saved === 'doctor' || saved === 'physiotherapist' || saved === 'student' || saved === 'admin')) {
      return saved;
    }
    return 'doctor';
  });

  const currentUser = DEFAULT_USERS[currentRole];

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('clinica_active_user_role', role);
    logAuditAction('SWITCH_ROLE', 'AUTH', `Switched active clinical role to: ${role.toUpperCase()}`, undefined, 'INFO');
  };

  const logAuditAction = async (
    action: string,
    module: string,
    details: string,
    patientId?: string,
    severity: 'INFO' | 'WARNING' | 'CRITICAL' = 'INFO'
  ) => {
    try {
      const entry: Omit<AuditLogEntry, 'id'> = {
        timestamp: new Date().toISOString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentRole,
        action,
        module,
        patientId,
        details,
        severity,
      };

      await fetch('/api/audit-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      // Non-blocking
      console.warn('Audit log write error:', err);
    }
  };

  const value: UserRoleContextType = {
    currentRole,
    currentUser,
    setRole,
    canAccessRealPatients: currentUser.permissions.canAccessRealPatientRecords,
    canAccessPrivateRegistry: currentUser.permissions.canAccessPrivateRegistry,
    canEditPatientData: currentUser.permissions.canEditPatientData,
    canManageSystem: currentUser.permissions.canManageUsers,
    logAuditAction,
  };

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
};

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
