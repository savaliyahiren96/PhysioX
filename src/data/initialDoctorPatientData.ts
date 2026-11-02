import { DoctorProfile, DoctorPatient } from '../types/doctorPatient';

export const INITIAL_DOCTOR: DoctorProfile = {
  id: 'DOC-DARPAN-01',
  username: 'drdarpan',
  fullName: 'Dr. Darpan Vanavi',
  designation: 'Physiotherapist',
  qualification: 'BPT, MPT (Musculoskeletal and Sports)',
  specialisation: 'Musculoskeletal and Sports Physiotherapy',
  registrationNumber: '', // Left blank for doctor to update; no invented credential
  hospitalClinicName: 'Vanavi Physiotherapy Clinic',
  clinicAddress: 'Vadodara, Gujarat',
  contactNumber: '', // Left blank for doctor to update; no invented credential
  email: '', // Left blank for doctor to update; no invented credential
  profilePhotoUrl: '',
  professionalExperience: 'Physiotherapy Practitioner',
  workingLocation: 'Vadodara, Gujarat',
  professionalStatus: 'Physiotherapy Practitioner',
  createdAt: '2026-01-15T09:00:00Z',
  updatedAt: '2026-10-31T00:00:00Z',
};

// No fake or prefilled demo patients. Only authorized clinical records added by clinicians.
export const INITIAL_PATIENTS: DoctorPatient[] = [];
