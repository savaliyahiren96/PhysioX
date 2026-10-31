import React, { useState } from 'react';
import {
  X,
  User,
  Activity,
  FileText,
  Calendar,
  Clock,
  Printer,
  Save,
  Plus,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import {
  DoctorPatient,
  PatientStatus,
  PatientGender,
  DailyProgressNote,
  FollowUpAppointment,
  ProbableConditionEntry,
} from '../types/doctorPatient';

interface PatientDetailRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: DoctorPatient;
  onPatientUpdated: (updated: DoctorPatient) => void;
  onOpenInAssessmentWizard?: (patient: DoctorPatient) => void;
}

export const PatientDetailRecordModal: React.FC<PatientDetailRecordModalProps> = ({
  isOpen,
  onClose,
  patient,
  onPatientUpdated,
  onOpenInAssessmentWizard,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'assessment' | 'conditions' | 'management' | 'progress' | 'followup' | 'audit' | 'print'
  >('overview');

  const [formData, setFormData] = useState<DoctorPatient>(patient);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Daily Progress Note Form State
  const [newNoteDate, setNewNoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNoteSubjective, setNewNoteSubjective] = useState('');
  const [newNoteObjective, setNewNoteObjective] = useState('');
  const [newNoteTreatment, setNewNoteTreatment] = useState('');
  const [newNoteResponse, setNewNoteResponse] = useState('');
  const [newNoteNextPlan, setNewNoteNextPlan] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Follow-up Appointment Form State
  const [newFollowUpDate, setNewFollowUpDate] = useState('');
  const [newFollowUpTime, setNewFollowUpTime] = useState('10:00 AM');
  const [newFollowUpPurpose, setNewFollowUpPurpose] = useState('');
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);

  // AI Matching State
  const [aiMatchingLoading, setAiMatchingLoading] = useState(false);
  const [aiMatchResult, setAiMatchResult] = useState<any>(null);

  // New Probable Condition Entry Form State
  const [newCondName, setNewCondName] = useState('');
  const [newCondStatus, setNewCondStatus] = useState<'Confirmed' | 'Suspected' | 'Probable' | 'Differential'>('Probable');
  const [newCondRationale, setNewCondRationale] = useState('');
  const [newCondEvidence, setNewCondEvidence] = useState<'Strong Evidence' | 'Evidence' | 'Expert Opinion'>('Strong Evidence');

  if (!isOpen) return null;

  const handleSavePatientUpdates = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/patients/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          auditAction: 'PATIENT_RECORD_UPDATED',
          auditDetails: 'Clinical details, assessment or management updated by clinician.',
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setFormData(updated);
        onPatientUpdated(updated);
        setIsEditingProfile(false);
        setSaveSuccessMsg('Patient record updated successfully');
        setTimeout(() => setSaveSuccessMsg(''), 2500);
      }
    } catch (e) {
      console.error('Error saving patient updates:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProgressNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteSubjective && !newNoteTreatment) return;

    try {
      const res = await fetch(`/api/patients/${formData.id}/progress-notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newNoteDate,
          subjectiveNotes: newNoteSubjective,
          objectiveNotes: newNoteObjective,
          treatmentGiven: newNoteTreatment,
          responseToTreatment: newNoteResponse,
          planForNextSession: newNoteNextPlan,
          clinicianName: formData.doctorAssigned,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(data.patient);
        onPatientUpdated(data.patient);
        setIsAddingNote(false);
        setNewNoteSubjective('');
        setNewNoteObjective('');
        setNewNoteTreatment('');
        setNewNoteResponse('');
        setNewNoteNextPlan('');
        setSaveSuccessMsg('Daily progress note recorded');
        setTimeout(() => setSaveSuccessMsg(''), 2500);
      }
    } catch (e) {
      console.error('Error recording progress note:', e);
    }
  };

  const handleAddFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowUpDate) return;

    try {
      const res = await fetch(`/api/patients/${formData.id}/follow-ups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduledDate: newFollowUpDate,
          timeSlot: newFollowUpTime,
          purpose: newFollowUpPurpose || 'Rehabilitation progress reassessment',
          status: 'Scheduled',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(data.patient);
        onPatientUpdated(data.patient);
        setIsAddingFollowUp(false);
        setNewFollowUpDate('');
        setNewFollowUpPurpose('');
        setSaveSuccessMsg('Follow-up scheduled');
        setTimeout(() => setSaveSuccessMsg(''), 2500);
      }
    } catch (e) {
      console.error('Error scheduling follow-up:', e);
    }
  };

  const handleRunAiMatching = async () => {
    setAiMatchingLoading(true);
    try {
      const res = await fetch('/api/clinical-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complaint: formData.presentingComplaints,
          primaryDiagnosis: formData.primaryDiagnosis,
          age: formData.age,
          gender: formData.gender,
          location: formData.location,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        setAiMatchResult(result);
      }
    } catch (e) {
      console.error('Error matching condition:', e);
    } finally {
      setAiMatchingLoading(false);
    }
  };

  const handleAddConditionEntry = () => {
    if (!newCondName.trim()) return;
    const newEntry: ProbableConditionEntry = {
      conditionName: newCondName.trim(),
      status: newCondStatus,
      clinicalRationale: newCondRationale.trim() || 'Clinical assessment consideration',
      evidenceLevel: newCondEvidence,
    };
    const updatedConditions = [...(formData.probableConditions || []), newEntry];
    setFormData({ ...formData, probableConditions: updatedConditions });
    setNewCondName('');
    setNewCondRationale('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden flex flex-col h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{formData.name}</span>
                <span className="bg-white/10 text-teal-200 text-xs px-2 py-0.5 rounded font-mono">
                  {formData.id}
                </span>
                <span className="bg-teal-500/30 text-teal-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-teal-400/30">
                  {formData.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Age: {formData.age || 'N/A'} yrs · Gender: {formData.gender} · Location: {formData.location} · Assigned: {formData.doctorAssigned}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('print')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Report
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center gap-4 text-xs font-semibold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Profile & Complaints
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'assessment'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Clinical Assessment (ROM/MMT/Gait)
          </button>
          <button
            onClick={() => {
              setActiveTab('conditions');
              if (!aiMatchResult) handleRunAiMatching();
            }}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'conditions'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>3. Probable Conditions & AI Match</span>
          </button>
          <button
            onClick={() => setActiveTab('management')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'management'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            4. PT Management Plan
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeTab === 'progress'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>5. Daily Progress Notes</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {formData.dailyProgressNotes?.length || 0}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('followup')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeTab === 'followup'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>6. Follow-up Schedule</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {formData.followUpHistory?.length || 0}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'audit'
                ? 'border-teal-700 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            7. Audit Trail ({formData.auditLogs?.length || 0})
          </button>
        </div>

        {/* Status Toast */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {saveSuccessMsg}
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs space-y-6">
          {/* TAB 1: OVERVIEW & PROFILE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Status & Action Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Patient Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1 font-semibold text-teal-800 text-xs shadow-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Rehabilitation">Under Rehabilitation</option>
                    <option value="Awaiting Follow-up">Awaiting Follow-up</option>
                    <option value="Discharged">Discharged</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditingProfile ? (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="px-3 py-1.5 bg-white border border-teal-600 text-teal-700 hover:bg-teal-50 rounded-lg font-semibold transition-colors"
                    >
                      Edit Patient Information
                    </button>
                  ) : (
                    <button
                      onClick={handleSavePatientUpdates}
                      disabled={isSaving}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {isSaving ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                  )}

                  {onOpenInAssessmentWizard && (
                    <button
                      onClick={() => onOpenInAssessmentWizard(formData)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-teal-300" />
                      Open in 3-Tier Assessment
                    </button>
                  )}
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Demographics */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2">
                    Patient Demographics
                  </h4>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Full Name:</span>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-slate-300 rounded p-1 font-semibold"
                        />
                      ) : (
                        <span className="font-bold text-slate-900">{formData.name}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">Age:</span>
                      {isEditingProfile ? (
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) || '' })}
                          className="w-full border border-slate-300 rounded p-1 font-semibold"
                        />
                      ) : (
                        <span className="font-bold text-slate-900">{formData.age} years</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">Gender:</span>
                      {isEditingProfile ? (
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value as PatientGender })}
                          className="w-full border border-slate-300 rounded p-1 font-semibold"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Not Specified">Not Specified (Editable)</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <span className="font-bold text-slate-900">
                          {formData.gender === 'Not Specified' ? (
                            <span className="text-amber-700 italic">Not Specified (Editable)</span>
                          ) : (
                            formData.gender
                          )}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">Location:</span>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full border border-slate-300 rounded p-1 font-semibold"
                        />
                      ) : (
                        <span className="font-bold text-slate-900">{formData.location}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">Contact Phone (Optional):</span>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={formData.contactNumber || ''}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full border border-slate-300 rounded p-1"
                        />
                      ) : (
                        <span className="text-slate-800">{formData.contactNumber || 'Not provided'}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">Registration Date:</span>
                      <span className="font-mono text-slate-800">{formData.registrationDate}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Diagnosis & Doctor */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2">
                    Primary Diagnosis & Clinical Lead
                  </h4>

                  <div className="space-y-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Primary Diagnosis:</span>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={formData.primaryDiagnosis}
                          onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                          className="w-full border border-slate-300 rounded p-1 font-bold text-teal-900"
                        />
                      ) : (
                        <span className="font-bold text-teal-900 text-sm block mt-0.5">
                          {formData.primaryDiagnosis}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">Assigned Doctor:</span>
                      <span className="font-semibold text-slate-800">{formData.doctorAssigned}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Doctor ID:</span>
                      <span className="font-mono text-slate-600">{formData.doctorId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presenting Complaints & History */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <h4 className="font-bold text-slate-900 text-xs">Presenting Complaints & History</h4>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Presenting Complaints</label>
                  {isEditingProfile ? (
                    <textarea
                      rows={3}
                      value={formData.presentingComplaints}
                      onChange={(e) => setFormData({ ...formData, presentingComplaints: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  ) : (
                    <div className="bg-amber-50/50 border border-amber-200/80 p-3 rounded-lg text-slate-800 leading-relaxed">
                      {formData.presentingComplaints}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Medical History</label>
                    {isEditingProfile ? (
                      <textarea
                        rows={2}
                        value={formData.medicalHistory}
                        onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                      />
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-700">
                        {formData.medicalHistory || 'None reported'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Surgical History</label>
                    {isEditingProfile ? (
                      <textarea
                        rows={2}
                        value={formData.surgicalHistory}
                        onChange={(e) => setFormData({ ...formData, surgicalHistory: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                      />
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-700">
                        {formData.surgicalHistory || 'None reported'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLINICAL ASSESSMENT */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Objective Clinical Examination & Physical Assessment
                  </h4>
                  <p className="text-slate-500 text-xs">
                    Range of motion, manual muscle testing, gait biomechanics, transfers, and balance scores
                  </p>
                </div>
                <button
                  onClick={handleSavePatientUpdates}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? 'Saving...' : 'Save Assessment Changes'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Range of Motion (ROM) Findings</label>
                  <textarea
                    rows={3}
                    value={formData.clinicalAssessment?.romFindings || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          romFindings: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Muscle Strength (MMT Findings)</label>
                  <textarea
                    rows={3}
                    value={formData.clinicalAssessment?.mmtFindings || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          mmtFindings: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Gait Analysis & Biomechanical Abnormalities</label>
                  <textarea
                    rows={3}
                    value={formData.clinicalAssessment?.gaitAbnormality || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          gaitAbnormality: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Functional Mobility & Transfer Testing (Sit-to-Stand / TUG)</label>
                  <textarea
                    rows={3}
                    value={formData.clinicalAssessment?.mobilityTransfer || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          mobilityTransfer: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Balance Testing & Fall Risk Score</label>
                  <textarea
                    rows={2}
                    value={formData.clinicalAssessment?.balanceScore || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          balanceScore: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Special Diagnostic Tests</label>
                  <textarea
                    rows={2}
                    value={formData.clinicalAssessment?.specialTests || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          specialTests: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Validated Outcome Measure Scores (KOOS / OKS / LEFS / DASH)</label>
                  <textarea
                    rows={2}
                    value={formData.clinicalAssessment?.outcomeScore || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          outcomeScore: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <label className="font-bold text-slate-800 block">Red Flags & Safety Screening</label>
                  <textarea
                    rows={2}
                    value={formData.clinicalAssessment?.redFlagsScreening || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clinicalAssessment: {
                          ...formData.clinicalAssessment,
                          redFlagsScreening: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                <label className="font-bold text-slate-800 block">Clinical Impression & Diagnostic Rationale</label>
                <textarea
                  rows={3}
                  value={formData.clinicalAssessment?.clinicalImpressionNotes || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clinicalAssessment: {
                        ...formData.clinicalAssessment,
                        clinicalImpressionNotes: e.target.value,
                      },
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PROBABLE CONDITIONS & AI MATCH */}
          {activeTab === 'conditions' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-teal-50 border border-teal-200 p-4 rounded-xl">
                <div>
                  <h4 className="font-bold text-teal-950 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-700" />
                    Probable Conditions & AI Cross-Reference Matching
                  </h4>
                  <p className="text-[11px] text-teal-800 mt-0.5">
                    Cross-references complaints with standard clinical criteria and existing reference patients.
                  </p>
                </div>

                <button
                  onClick={handleRunAiMatching}
                  disabled={aiMatchingLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs transition-colors shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {aiMatchingLoading ? 'Analyzing...' : 'Re-run Clinical Match'}
                </button>
              </div>

              {/* Current Recorded Conditions */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h5 className="font-bold text-slate-900 text-xs">Currently Recorded Probable Conditions</h5>

                <div className="space-y-2.5">
                  {(formData.probableConditions || []).map((cond, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 p-3 rounded-lg bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{cond.conditionName}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              cond.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : cond.status === 'Suspected'
                                ? 'bg-amber-100 text-amber-800'
                                : cond.status === 'Probable'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-200 text-slate-800'
                            }`}
                          >
                            {cond.status}
                          </span>
                          <span className="text-[10px] text-teal-700 font-semibold bg-white border border-teal-200 px-1.5 py-0.2 rounded">
                            {cond.evidenceLevel}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">{cond.clinicalRationale}</div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = (formData.probableConditions || []).filter((_, idx) => idx !== i);
                          setFormData({ ...formData, probableConditions: updated });
                        }}
                        className="text-red-500 hover:text-red-700 text-xs shrink-0 self-end sm:self-center"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Probable Condition form */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <span className="font-semibold text-slate-700 block text-xs">
                    + Add New Condition Consideration
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Condition name..."
                        value={newCondName}
                        onChange={(e) => setNewCondName(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <select
                        value={newCondStatus}
                        onChange={(e) => setNewCondStatus(e.target.value as any)}
                        className="w-full border border-slate-300 rounded p-1.5 text-xs font-semibold"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Suspected">Suspected</option>
                        <option value="Probable">Probable</option>
                        <option value="Differential">Differential</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={newCondEvidence}
                        onChange={(e) => setNewCondEvidence(e.target.value as any)}
                        className="w-full border border-slate-300 rounded p-1.5 text-xs"
                      >
                        <option value="Strong Evidence">Strong Evidence</option>
                        <option value="Evidence">Evidence</option>
                        <option value="Expert Opinion">Expert Opinion</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Clinical rationale / notes..."
                      value={newCondRationale}
                      onChange={(e) => setNewCondRationale(e.target.value)}
                      className="flex-1 border border-slate-300 rounded p-1.5 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddConditionEntry}
                      className="px-3 py-1.5 bg-teal-700 text-white font-semibold rounded text-xs hover:bg-teal-800 transition-colors"
                    >
                      Add Entry
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Cross-Reference & Reference Cohort Matching Results */}
              {aiMatchResult && (
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                  <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    AI Clinical Decision Support & Guideline Matches
                  </h5>

                  {/* Matches */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiMatchResult.conditionMatches?.map((match: any, i: number) => (
                      <div key={i} className="border border-teal-200/80 rounded-xl p-3.5 bg-teal-50/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{match.condition}</span>
                          <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                            {match.certainty} ({match.confidence}%)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">{match.rationale}</p>

                        <div className="text-[10px] space-y-1 pt-1 border-t border-slate-100">
                          <div>
                            <span className="font-semibold text-teal-800">Recommended Battery: </span>
                            <span className="text-slate-600">{match.recommendedAssessments?.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-teal-800">Outcome Tools: </span>
                            <span className="text-slate-600">{match.outcomeMeasures?.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Similar Reference Cohort in Doctor's Practice */}
                  {aiMatchResult.matchingCohortPatients?.length > 0 && (
                    <div className="pt-3 border-t border-slate-100">
                      <span className="font-semibold text-slate-700 block text-xs mb-2">
                        Similar Cohort Patients Under Dr. Darpan Vanavi (Pipaliya / Khandha):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {aiMatchResult.matchingCohortPatients.map((cohort: any) => (
                          <div key={cohort.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px]">
                            <div className="font-bold text-slate-900">
                              {cohort.name} ({cohort.age}y, {cohort.location})
                            </div>
                            <div className="text-teal-800 font-semibold">{cohort.primaryDiagnosis}</div>
                            <div className="text-slate-500 line-clamp-1">{cohort.complaints}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 italic">
                    {aiMatchResult.clinicalGuidanceDisclaimer}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PT MANAGEMENT PLAN */}
          {activeTab === 'management' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Physiotherapy Management & Treatment Plan</h4>
                  <p className="text-slate-500 text-xs">
                    Rehabilitation phase, clinical goals, exercise dosages, and precaution protocols
                  </p>
                </div>
                <button
                  onClick={handleSavePatientUpdates}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? 'Saving...' : 'Save Treatment Plan'}
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Current Rehabilitation Phase</label>
                    <input
                      type="text"
                      value={formData.physiotherapyManagement?.currentRehabPhase || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            currentRehabPhase: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg p-2 font-semibold text-teal-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Clinical Session Frequency</label>
                    <input
                      type="text"
                      value={formData.physiotherapyManagement?.frequencyWeekly || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            frequencyWeekly: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Short-Term Goals (2-4 Weeks)</label>
                    <textarea
                      rows={3}
                      value={formData.physiotherapyManagement?.shortTermGoals || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            shortTermGoals: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Long-Term Functional Goals</label>
                    <textarea
                      rows={3}
                      value={formData.physiotherapyManagement?.longTermGoals || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            longTermGoals: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Prescribed Interventions & Exercises (Comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={(formData.physiotherapyManagement?.interventions || []).join('\n')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physiotherapyManagement: {
                          ...formData.physiotherapyManagement,
                          interventions: e.target.value.split('\n').filter((x) => x.trim()),
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Exercise Dosage & Rest Parameters</label>
                    <input
                      type="text"
                      value={formData.physiotherapyManagement?.exerciseDosage || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            exerciseDosage: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Progression Criteria</label>
                    <input
                      type="text"
                      value={formData.physiotherapyManagement?.progressionCriteria || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            progressionCriteria: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <label className="font-bold text-amber-900 block mb-1">Clinical Precautions</label>
                    <textarea
                      rows={2}
                      value={formData.physiotherapyManagement?.precautions || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            precautions: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-amber-300 rounded p-1.5 text-xs bg-white"
                    />
                  </div>

                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <label className="font-bold text-red-900 block mb-1">Absolute Contraindications</label>
                    <textarea
                      rows={2}
                      value={formData.physiotherapyManagement?.contraindications || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physiotherapyManagement: {
                            ...formData.physiotherapyManagement,
                            contraindications: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-red-300 rounded p-1.5 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DAILY PROGRESS NOTES (SOAP) */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Daily Treatment Progress Notes (SOAP Format)
                  </h4>
                  <p className="text-slate-500 text-xs">
                    Continuous clinical recording of subjective response, objective findings, treatment delivered, and session plans.
                  </p>
                </div>

                {!isAddingNote ? (
                  <button
                    onClick={() => setIsAddingNote(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Record Today's Session
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAddingNote(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Cancel New Note
                  </button>
                )}
              </div>

              {/* Add Progress Note Form */}
              {isAddingNote && (
                <form
                  onSubmit={handleAddProgressNote}
                  className="border border-teal-300 bg-teal-50/30 rounded-xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                    <span className="font-bold text-teal-950 text-xs">
                      Session #{(formData.dailyProgressNotes?.length || 0) + 1} SOAP Clinical Note
                    </span>
                    <input
                      type="date"
                      value={newNoteDate}
                      onChange={(e) => setNewNoteDate(e.target.value)}
                      className="border border-slate-300 rounded px-2 py-0.5 text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        S - Subjective (Patient Report & Pain NPRS) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Patient reports less morning stiffness; NPRS 3/10 during walking..."
                        value={newNoteSubjective}
                        onChange={(e) => setNewNoteSubjective(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        O - Objective (Goniometry, MMT, Swelling)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Active knee flexion 100°, extension 0° without lag; trace effusion..."
                        value={newNoteObjective}
                        onChange={(e) => setNewNoteObjective(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        A / T - Treatment Given Today <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Patellar mobilizations, stationary cycling 15 min, sit-to-stand drills..."
                        value={newNoteTreatment}
                        onChange={(e) => setNewNoteTreatment(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Response to Treatment
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tolerated well without acute pain flare-up; achieved easier transfer..."
                        value={newNoteResponse}
                        onChange={(e) => setNewNoteResponse(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">
                        P - Plan for Next Session
                      </label>
                      <input
                        type="text"
                        placeholder="Progress to 10 cm step-downs and evaluate cane weaning..."
                        value={newNoteNextPlan}
                        onChange={(e) => setNewNoteNextPlan(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-teal-200">
                    <button
                      type="button"
                      onClick={() => setIsAddingNote(false)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg shadow-xs"
                    >
                      Save Progress Note
                    </button>
                  </div>
                </form>
              )}

              {/* List of Previous Notes */}
              <div className="space-y-4">
                {(formData.dailyProgressNotes || []).length === 0 ? (
                  <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No daily progress notes recorded yet. Click 'Record Today's Session' to add one.
                  </div>
                ) : (
                  formData.dailyProgressNotes.map((note) => (
                    <div
                      key={note.id}
                      className="border border-slate-200 rounded-xl p-4 bg-white space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-teal-900 text-xs">
                            Session #{note.sessionNumber}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="font-mono text-slate-600 text-[11px]">{note.date}</span>
                        </div>
                        <span className="text-slate-500 text-[11px]">
                          Recorded by: <strong className="text-slate-800">{note.clinicianName}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <strong className="text-slate-700 block">S (Subjective):</strong>
                          <p className="text-slate-600 mt-0.5">{note.subjectiveNotes || 'N/A'}</p>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">O (Objective):</strong>
                          <p className="text-slate-600 mt-0.5">{note.objectiveNotes || 'N/A'}</p>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">Treatment Given:</strong>
                          <p className="text-slate-600 mt-0.5">{note.treatmentGiven || 'N/A'}</p>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">Patient Response:</strong>
                          <p className="text-slate-600 mt-0.5">{note.responseToTreatment || 'N/A'}</p>
                        </div>
                      </div>

                      {note.planForNextSession && (
                        <div className="pt-2 border-t border-slate-100 text-[11px]">
                          <strong className="text-teal-800">Plan for Next Session: </strong>
                          <span className="text-slate-700">{note.planForNextSession}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: FOLLOW-UP APPOINTMENTS */}
          {activeTab === 'followup' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Follow-up Appointment Scheduler</h4>
                  <p className="text-slate-500 text-xs">
                    Track upcoming reassessment dates, milestone reviews, and clinical consultations
                  </p>
                </div>

                {!isAddingFollowUp ? (
                  <button
                    onClick={() => setIsAddingFollowUp(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Schedule Follow-up
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAddingFollowUp(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Schedule form */}
              {isAddingFollowUp && (
                <form
                  onSubmit={handleAddFollowUp}
                  className="border border-teal-300 bg-teal-50/40 rounded-xl p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Follow-up Date</label>
                      <input
                        type="date"
                        value={newFollowUpDate}
                        onChange={(e) => setNewFollowUpDate(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded p-1.5 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                      <input
                        type="text"
                        value={newFollowUpTime}
                        onChange={(e) => setNewFollowUpTime(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Purpose / Clinical Focus</label>
                      <input
                        type="text"
                        placeholder="e.g. Knee flexion ROM check & BBS"
                        value={newFollowUpPurpose}
                        onChange={(e) => setNewFollowUpPurpose(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingFollowUp(false)}
                      className="px-3 py-1 border border-slate-300 rounded text-slate-700 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded text-xs font-semibold"
                    >
                      Save Appointment
                    </button>
                  </div>
                </form>
              )}

              {/* Follow-up List */}
              <div className="space-y-3">
                {(formData.followUpHistory || []).length === 0 ? (
                  <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No follow-up appointments scheduled yet.
                  </div>
                ) : (
                  formData.followUpHistory.map((fu) => (
                    <div
                      key={fu.id}
                      className="border border-slate-200 rounded-xl p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{fu.purpose}</div>
                          <div className="text-slate-500 text-[11px] flex items-center gap-2 mt-0.5">
                            <span className="font-mono">{fu.scheduledDate}</span>
                            <span>·</span>
                            <span>{fu.timeSlot}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            fu.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : fu.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {fu.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 7: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Security & Clinical Audit Trail</h4>
                <p className="text-slate-500 text-xs">
                  Immutable record of patient data modifications, clinician entries, and timestamps
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Timestamp</th>
                      <th className="p-2.5">Doctor / Clinician</th>
                      <th className="p-2.5">Action</th>
                      <th className="p-2.5">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(formData.auditLogs || []).map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono text-[11px] text-slate-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-2.5 font-semibold text-slate-800">{log.doctorName}</td>
                        <td className="p-2.5">
                          <span className="bg-slate-100 border border-slate-300 text-slate-700 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: PRINTABLE CLINICAL REPORT */}
          {activeTab === 'print' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between no-print">
                <span className="text-slate-600 text-xs">
                  Print-ready Clinical Physiotherapy Summary & Discharge / Progress Documentation
                </span>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save as PDF
                </button>
              </div>

              {/* Formal Paper Report Container */}
              <div className="bg-white border-2 border-slate-300 p-8 rounded-xl shadow-md text-slate-900 space-y-6 print:border-none print:shadow-none print:p-0">
                {/* Letterhead */}
                <div className="border-b-2 border-teal-800 pb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-teal-950 uppercase">
                      Vanavi Physiotherapy Clinic
                    </h2>
                    <p className="text-xs text-slate-600 font-medium">
                      Musculoskeletal & Sports Rehabilitation Centre · Vadodara, Gujarat
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Practitioner: <strong>{formData.doctorAssigned}</strong> (BPT, MPT Musculoskeletal and Sports)
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <div>Date of Report: <strong>{new Date().toLocaleDateString('en-GB')}</strong></div>
                    <div>Patient MRN: <strong className="font-mono">{formData.id}</strong></div>
                    <div>Status: <strong className="text-teal-900">{formData.status}</strong></div>
                  </div>
                </div>

                {/* Patient Summary Bar */}
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Patient Name:</span>
                    <strong className="text-slate-900">{formData.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Age / Sex:</span>
                    <strong>{formData.age} yrs / {formData.gender}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Location:</span>
                    <strong>{formData.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Primary Diagnosis:</span>
                    <strong className="text-teal-900">{formData.primaryDiagnosis}</strong>
                  </div>
                </div>

                {/* Presenting Complaints & History */}
                <div className="space-y-1.5 text-xs">
                  <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
                    Presenting Clinical Complaints & History
                  </h5>
                  <p className="text-slate-700 leading-relaxed">{formData.presentingComplaints}</p>
                  <div className="text-[11px] text-slate-600 flex gap-4 mt-1">
                    <span>Medical Hx: {formData.medicalHistory || 'None'}</span>
                    <span>·</span>
                    <span>Surgical Hx: {formData.surgicalHistory || 'None'}</span>
                  </div>
                </div>

                {/* Clinical Assessment Summary */}
                <div className="space-y-2 text-xs">
                  <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
                    Physical Examination Findings
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="border border-slate-100 p-2 bg-slate-50/50 rounded">
                      <strong>ROM Findings:</strong>
                      <p className="text-slate-700 mt-0.5">{formData.clinicalAssessment?.romFindings || 'N/A'}</p>
                    </div>
                    <div className="border border-slate-100 p-2 bg-slate-50/50 rounded">
                      <strong>MMT Strength:</strong>
                      <p className="text-slate-700 mt-0.5">{formData.clinicalAssessment?.mmtFindings || 'N/A'}</p>
                    </div>
                    <div className="border border-slate-100 p-2 bg-slate-50/50 rounded">
                      <strong>Gait Biomechanics:</strong>
                      <p className="text-slate-700 mt-0.5">{formData.clinicalAssessment?.gaitAbnormality || 'N/A'}</p>
                    </div>
                    <div className="border border-slate-100 p-2 bg-slate-50/50 rounded">
                      <strong>Mobility & Transfers:</strong>
                      <p className="text-slate-700 mt-0.5">{formData.clinicalAssessment?.mobilityTransfer || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Physiotherapy Management */}
                <div className="space-y-1.5 text-xs">
                  <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
                    Physiotherapy Management & Goals
                  </h5>
                  <div className="text-[11px] space-y-1">
                    <div><strong>Phase: </strong>{formData.physiotherapyManagement?.currentRehabPhase}</div>
                    <div><strong>Short-term Goal: </strong>{formData.physiotherapyManagement?.shortTermGoals}</div>
                    <div><strong>Long-term Goal: </strong>{formData.physiotherapyManagement?.longTermGoals}</div>
                    <div>
                      <strong>Interventions: </strong>
                      {(formData.physiotherapyManagement?.interventions || []).join('; ')}
                    </div>
                    <div><strong>Dosage: </strong>{formData.physiotherapyManagement?.exerciseDosage}</div>
                  </div>
                </div>

                {/* Sign-off */}
                <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">Computerized Clinical Document</div>
                    <div className="text-[10px] text-slate-400">ClinicaAI v2.4 · Validated Guidelines</div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900">{formData.doctorAssigned}</div>
                    <div className="text-slate-500 text-[11px]">BPT, MPT (Musculoskeletal and Sports)</div>
                    <div className="text-slate-400 text-[10px]">Authorized Treating Physiotherapist</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div>
            Patient: <strong className="text-slate-800">{formData.name}</strong> · ID: <strong className="font-mono text-slate-700">{formData.id}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};
