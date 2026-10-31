import React, { useState, useEffect } from 'react';
import {
  User,
  Activity,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Edit3,
  Plus,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Search,
  Building,
  UserCheck,
  Award,
  Sparkles,
  ArrowRight,
  Phone,
  Save,
  X,
  History,
} from 'lucide-react';
import { DoctorProfile, DoctorPatient, DailyProgressNote, FollowUpAppointment, ProbableConditionEntry } from '../types/doctorPatient';
import { INITIAL_DOCTOR, INITIAL_PATIENTS } from '../data/initialDoctorPatientData';
import { useLanguage } from '../context/LanguageContext';
import { AddEditPatientModal } from './AddEditPatientModal';

interface PatientProfileHubProps {
  onOpenAssessmentFormat: (patient: DoctorPatient) => void;
  onOpenAssessmentWizard?: (patient: DoctorPatient) => void;
  onNavigateToDoctorDashboard?: () => void;
}

export const PatientProfileHub: React.FC<PatientProfileHubProps> = ({
  onOpenAssessmentFormat,
  onOpenAssessmentWizard,
  onNavigateToDoctorDashboard,
}) => {
  const { language, t } = useLanguage();
  const [patients, setPatients] = useState<DoctorPatient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(INITIAL_PATIENTS[0]?.id || '');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'assessment' | 'conditions' | 'management' | 'progress' | 'followup' | 'print'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  // Fetch live patients from backend API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`/api/patients?doctorId=${encodeURIComponent(INITIAL_DOCTOR.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.patients && data.patients.length > 0) {
            setPatients(data.patients);
          }
        }
      } catch (err) {
        console.error('Error fetching patients for hub:', err);
      }
    };
    fetchPatients();
  }, []);

  const activePatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0] || INITIAL_PATIENTS[0];

  // Filtered patients for sidebar list
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = locationFilter === 'all' || p.location.toLowerCase() === locationFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesLocation && matchesStatus;
  });

  // Handle adding progress note
  const handleSaveProgressNote = async () => {
    if (!newNoteTreatment && !newNoteSubjective) return;

    const newNote: DailyProgressNote = {
      id: `NOTE-${Date.now().toString().slice(-6)}`,
      sessionNumber: (activePatient.dailyProgressNotes?.length || 0) + 1,
      date: newNoteDate,
      subjectiveNotes: newNoteSubjective || 'Patient reports steady functional progress.',
      objectiveNotes: newNoteObjective || 'Assessed joint ROM and functional movement tolerances.',
      treatmentGiven: newNoteTreatment || 'Therapeutic exercises and manual therapy.',
      responseToTreatment: newNoteResponse || 'Tolerated session well with minimal post-exercise soreness.',
      planForNextSession: newNoteNextPlan || 'Progress load intensity and dynamic balance drills.',
      clinicianName: activePatient.doctorAssigned || INITIAL_DOCTOR.fullName,
    };

    const updatedPatient: DoctorPatient = {
      ...activePatient,
      dailyProgressNotes: [newNote, ...(activePatient.dailyProgressNotes || [])],
    };

    setPatients((prev) => prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)));

    try {
      await fetch(`/api/patients/${activePatient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPatient),
      });
    } catch (e) {
      console.error(e);
    }

    setNewNoteSubjective('');
    setNewNoteObjective('');
    setNewNoteTreatment('');
    setNewNoteResponse('');
    setNewNoteNextPlan('');
    setIsAddingNote(false);
  };

  // Handle scheduling follow-up
  const handleSaveFollowUp = async () => {
    if (!newFollowUpDate) return;

    const newAppt: FollowUpAppointment = {
      id: `FU-${Date.now().toString().slice(-6)}`,
      scheduledDate: newFollowUpDate,
      timeSlot: newFollowUpTime,
      status: 'Scheduled',
      purpose: newFollowUpPurpose || 'Routine rehabilitation milestone reassessment.',
    };

    const updatedPatient: DoctorPatient = {
      ...activePatient,
      followUpHistory: [newAppt, ...(activePatient.followUpHistory || [])],
    };

    setPatients((prev) => prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)));

    try {
      await fetch(`/api/patients/${activePatient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPatient),
      });
    } catch (e) {
      console.error(e);
    }

    setNewFollowUpDate('');
    setNewFollowUpPurpose('');
    setIsAddingFollowUp(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Aspect Banner: Doctor Profile Aspect vs Patient Profile Aspect vs Assessment Aspect */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider">
              {language === 'gu' ? 'દર્દી પ્રોફાઇલ પાસું' : language === 'hi' ? 'मरीज प्रोफाइल पहलू' : 'Patient Profile Aspect'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">
              {language === 'gu'
                ? 'ડો. દર્પણ વણાવી દ્વારા સંચાલિત ૧૧ દર્દીઓ'
                : language === 'hi'
                ? 'डॉ. दर्पण वणावी द्वारा प्रबंधित 11 मरीज'
                : '11 Patients Managed by Dr. Darpan Vanavi'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'gu'
              ? 'દર્દી પ્રોફાઇલ મેનેજમેન્ટ અને ક્લિનિકલ રેકોર્ડ્સ'
              : language === 'hi'
              ? 'मरीज प्रोफाइल प्रबंधन एवं क्लिनिकल रिकॉर्ड'
              : 'Patient Profiles & Clinical Records Hub'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'gu'
              ? 'દરેક દર્દીની વ્યક્તિગત પ્રોફાઇલ, રોગ ઇતિહાસ, પુનર્વસન લક્ષ્યો, દૈનિક નોંધ અને ક્લિનિકલ મૂલ્યાંકન સીધું જોડો'
              : language === 'hi'
              ? 'प्रत्येक मरीज की व्यक्तिगत प्रोफाइल, रोग इतिहास, पुनर्वास लक्ष्य, दैनिक नोट्स और सीधे क्लिनिकल मूल्यांकन से जोड़ें'
              : 'Independent patient profiles, complete medical & surgical history, daily treatment logs, and direct access to 3-Tier Clinical Assessment.'}
          </p>
        </div>

        {/* Quick aspect links */}
        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToDoctorDashboard && (
            <button
              onClick={onNavigateToDoctorDashboard}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>Dr. Darpan Profile</span>
            </button>
          )}

          <button
            onClick={() => setIsAddPatientModalOpen(true)}
            className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register New Patient</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Patient Roster (4 cols) & Right Comprehensive Patient Profile (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Patient Selector Roster (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-teal-600" />
              <span>Patient Directory ({filteredPatients.length})</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Dr. Darpan Cohort</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, location, condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 text-slate-800"
            />
          </div>

          {/* Quick Location Pills */}
          <div className="flex items-center gap-1.5 text-[11px] overflow-x-auto pb-1">
            {['all', 'Pipaliya', 'Khandha'].map((loc) => (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc)}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  locationFilter === loc
                    ? 'bg-teal-700 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc === 'all' ? 'All Locations' : loc}
              </button>
            ))}
          </div>

          {/* Patient Cards List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredPatients.map((p) => {
              const isSelected = p.id === activePatient.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-500 shadow-xs ring-1 ring-teal-400/40'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        {p.name}
                        <span className="text-[10px] font-normal text-slate-400 font-mono">({p.age}{p.gender ? `/${p.gender[0]}` : ''})</span>
                      </div>
                      <div className="text-[11px] text-teal-800 font-semibold truncate max-w-[200px]">
                        {p.primaryDiagnosis}
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        p.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'Under Rehabilitation'
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {p.location}
                    </span>
                    <span className="font-mono text-slate-500">{p.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Patient Comprehensive Profile View (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Patient Profile Master Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Top Identity Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  {activePatient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">{activePatient.name}</h2>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        activePatient.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : activePatient.status === 'Under Rehabilitation'
                          ? 'bg-teal-100 text-teal-800 border border-teal-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {activePatient.status}
                    </span>
                    <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {activePatient.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>
                      Age: <strong className="text-slate-800">{activePatient.age} Years</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Gender: <strong className="text-slate-800">{activePatient.gender}</strong>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      <strong className="text-slate-800">{activePatient.location}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Doctor: <strong className="text-teal-700">{activePatient.doctorAssigned || INITIAL_DOCTOR.fullName}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Crucial Action: Launch Assessment for this patient */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onOpenAssessmentFormat(activePatient)}
                  className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-teal-300" />
                  <span>Launch 3-Tier Clinical Assessment</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  title="Print Patient Profile Card"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Overview & History</span>
              </button>

              <button
                onClick={() => setActiveTab('assessment')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'assessment' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Clinical Exam Data</span>
              </button>

              <button
                onClick={() => setActiveTab('conditions')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'conditions' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Probable Conditions ({activePatient.probableConditions?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('management')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'management' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Physiotherapy Plan</span>
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'progress' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Daily Notes ({activePatient.dailyProgressNotes?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('followup')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'followup' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Follow-ups ({activePatient.followUpHistory?.length || 0})</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Overview & History */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-xs">
                {/* Primary Diagnosis & Presenting Complaints */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                      Primary Medical & Functional Diagnosis
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{activePatient.primaryDiagnosis}</h3>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-700 block mb-1">Presenting Complaints:</span>
                    <p className="text-slate-600 leading-relaxed text-sm bg-white p-3 rounded-xl border border-slate-200">
                      {activePatient.presentingComplaints}
                    </p>
                  </div>
                </div>

                {/* Medical & Surgical History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 text-xs block">Surgical History:</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.surgicalHistory || 'No prior orthopaedic surgery documented.'}</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 text-xs block">Medical History:</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.medicalHistory || 'No major systemic comorbidities reported.'}</p>
                  </div>
                </div>

                {/* Registration & Doctor Metadata */}
                <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-500">Registered On:</span>{' '}
                    <strong className="text-slate-800">{activePatient.registrationDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Treating Clinician:</span>{' '}
                    <strong className="text-teal-900">{activePatient.doctorAssigned || INITIAL_DOCTOR.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Clinic / Hospital:</span>{' '}
                    <strong className="text-slate-800">{INITIAL_DOCTOR.hospitalClinicName}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: Clinical Assessment Data */}
            {activeTab === 'assessment' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900">Range of Motion (ROM):</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.clinicalAssessment?.romFindings || 'Not recorded'}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900">Manual Muscle Testing (MMT):</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.clinicalAssessment?.mmtFindings || 'Not recorded'}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900">Gait Abnormality:</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.clinicalAssessment?.gaitAbnormality || 'Normal gait'}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900">Mobility & Transfers (STS / TUG):</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.clinicalAssessment?.mobilityTransfer || 'Independent'}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900">Balance & Stability:</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.clinicalAssessment?.balanceScore || 'Safe balance'}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900">Special Orthopaedic Tests:</span>
                    <p className="text-slate-600 leading-relaxed">{activePatient.clinicalAssessment?.specialTests || 'Negative'}</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900">Safety & Red Flags Screening:</span>
                  <p className="text-amber-800 leading-relaxed">{activePatient.clinicalAssessment?.redFlagsScreening || 'Negative for systemic red flags.'}</p>
                </div>

                <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-1">
                  <span className="font-bold text-teal-950">Clinical Impression Notes:</span>
                  <p className="text-teal-900 leading-relaxed">{activePatient.clinicalAssessment?.clinicalImpressionNotes || 'Stable progress.'}</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: Probable Conditions */}
            {activeTab === 'conditions' && (
              <div className="space-y-4 text-xs">
                {(activePatient.probableConditions || []).length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl">
                    No probable conditions recorded for this patient yet.
                  </div>
                ) : (
                  (activePatient.probableConditions || []).map((cond, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                          <h4 className="font-bold text-slate-900 text-sm">{cond.conditionName}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                            {cond.confidenceScore}% Confidence
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              cond.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : cond.status === 'Probable'
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {cond.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 leading-relaxed">{cond.clinicalRationale}</p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <span>Evidence Rating: <strong className="text-slate-700">{cond.evidenceLevel}</strong></span>
                        {cond.guidelineReference && (
                          <span className="text-teal-700 truncate max-w-sm" title={cond.guidelineReference}>
                            Ref: {cond.guidelineReference}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB CONTENT 4: Physiotherapy Plan */}
            {activeTab === 'management' && (
              <div className="space-y-4 text-xs">
                {activePatient.physiotherapyManagement ? (
                  <div className="space-y-4">
                    <div className="bg-teal-900 text-white p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-teal-300 uppercase tracking-widest font-mono">Current Rehabilitation Phase</span>
                        <h4 className="text-base font-bold mt-0.5">{activePatient.physiotherapyManagement.currentRehabPhase}</h4>
                      </div>
                      <span className="text-xs bg-teal-800/80 px-3 py-1 rounded-lg border border-teal-700">
                        {activePatient.physiotherapyManagement.frequencyWeekly}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-900">Short-Term Goals:</span>
                        <p className="text-slate-600 leading-relaxed">{activePatient.physiotherapyManagement.shortTermGoals}</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-900">Long-Term Goals:</span>
                        <p className="text-slate-600 leading-relaxed">{activePatient.physiotherapyManagement.longTermGoals}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-900 block">Prescribed Interventions:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        {activePatient.physiotherapyManagement.interventions?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      <div className="text-[11px] text-teal-800 font-semibold pt-2">
                        Dosage: {activePatient.physiotherapyManagement.exerciseDosage}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1">
                        <span className="font-bold text-amber-900">Clinical Precautions:</span>
                        <p className="text-amber-800 leading-relaxed">{activePatient.physiotherapyManagement.precautions}</p>
                      </div>

                      <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-1">
                        <span className="font-bold text-emerald-950">Progression Criteria:</span>
                        <p className="text-emerald-900 leading-relaxed">{activePatient.physiotherapyManagement.progressionCriteria}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl">
                    No specific physiotherapy plan populated yet. Launch assessment to generate evidence plan.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 5: Daily Progress Notes */}
            {activeTab === 'progress' && (
              <div className="space-y-6 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Treatment Sessions Log</h4>
                  <button
                    onClick={() => setIsAddingNote(!isAddingNote)}
                    className="px-3 py-1.5 bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-teal-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Record New Note</span>
                  </button>
                </div>

                {/* Form to add note */}
                {isAddingNote && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-3">
                    <span className="font-bold text-slate-900 block text-sm">Add Daily Session Record</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1">Session Date:</label>
                        <input
                          type="date"
                          value={newNoteDate}
                          onChange={(e) => setNewNoteDate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">Subjective Report:</label>
                        <input
                          type="text"
                          placeholder="e.g. Mild morning stiffness, walked 200m..."
                          value={newNoteSubjective}
                          onChange={(e) => setNewNoteSubjective(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 mb-1">Treatment Given Today:</label>
                      <input
                        type="text"
                        placeholder="e.g. Grade III mobilizations, NMES quad sets, heel drops..."
                        value={newNoteTreatment}
                        onChange={(e) => setNewNoteTreatment(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setIsAddingNote(false)}
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProgressNote}
                        className="px-4 py-1.5 bg-teal-700 text-white rounded-lg font-bold cursor-pointer hover:bg-teal-800"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                {/* Notes List */}
                <div className="space-y-3">
                  {(activePatient.dailyProgressNotes || []).length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl">
                      No treatment notes logged yet.
                    </div>
                  ) : (
                    (activePatient.dailyProgressNotes || []).map((note) => (
                      <div key={note.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-900">
                            Session #{note.sessionNumber} · <span className="font-mono text-slate-500 font-normal">{note.date}</span>
                          </span>
                          <span className="text-[10px] text-teal-800 font-medium">Recorded by {note.clinicianName}</span>
                        </div>
                        <p className="text-slate-700">
                          <strong>Treatment: </strong>{note.treatmentGiven}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          <strong>Response: </strong>{note.responseToTreatment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 6: Follow-up Appointments */}
            {activeTab === 'followup' && (
              <div className="space-y-6 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Follow-up Schedule</h4>
                  <button
                    onClick={() => setIsAddingFollowUp(!isAddingFollowUp)}
                    className="px-3 py-1.5 bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-teal-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Schedule Appointment</span>
                  </button>
                </div>

                {isAddingFollowUp && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-3">
                    <span className="font-bold text-slate-900 block text-sm">Schedule Next Visit</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1">Appointment Date:</label>
                        <input
                          type="date"
                          value={newFollowUpDate}
                          onChange={(e) => setNewFollowUpDate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">Time Slot:</label>
                        <input
                          type="text"
                          value={newFollowUpTime}
                          onChange={(e) => setNewFollowUpTime(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 mb-1">Purpose / Review Goals:</label>
                      <input
                        type="text"
                        placeholder="e.g. Knee extension check, single-leg heel raise progression..."
                        value={newFollowUpPurpose}
                        onChange={(e) => setNewFollowUpPurpose(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setIsAddingFollowUp(false)}
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveFollowUp}
                        className="px-4 py-1.5 bg-teal-700 text-white rounded-lg font-bold cursor-pointer hover:bg-teal-800"
                      >
                        Confirm Schedule
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {(activePatient.followUpHistory || []).length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl">
                      No follow-up visits scheduled yet.
                    </div>
                  ) : (
                    (activePatient.followUpHistory || []).map((fu) => (
                      <div key={fu.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span>{fu.scheduledDate} · {fu.timeSlot || 'Morning'}</span>
                          </div>
                          <p className="text-slate-600 text-xs">{fu.purpose}</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {fu.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Register New Patient Modal */}
      {isAddPatientModalOpen && (
        <AddEditPatientModal
          isOpen={isAddPatientModalOpen}
          onClose={() => setIsAddPatientModalOpen(false)}
          activeDoctor={INITIAL_DOCTOR}
          onPatientCreated={(saved: DoctorPatient) => {
            setPatients((prev) => [saved, ...prev]);
            setSelectedPatientId(saved.id);
            setIsAddPatientModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
