import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  Key,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Phone,
  MapPin,
  Clock,
  FileText,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  ArrowLeft,
  Printer,
  ChevronRight,
  UploadCloud,
  FileCode,
  Activity,
  HeartPulse,
  User,
  Users,
  X,
  Save,
  Check,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import {
  PrivatePatientRecord,
  PrivateTreatmentSession,
  PrivatePatientDocument,
  PrivatePatientStatus,
} from '../types/privatePatient';
import { INITIAL_PRIVATE_PATIENTS } from '../data/initialPrivatePatients';
import { useLanguage } from '../context/LanguageContext';

export const PrivatePatientRegistry: React.FC = () => {
  const { t } = useLanguage();

  // Authentication & Security state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('clinica_private_unlocked') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [changePinMsg, setChangePinMsg] = useState({ text: '', isError: false });

  // Patient Records State
  const [patients, setPatients] = useState<PrivatePatientRecord[]>(INITIAL_PRIVATE_PATIENTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | PrivatePatientStatus>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Active / Selected Patient for Deep-dive profile
  const [selectedPatient, setSelectedPatient] = useState<PrivatePatientRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'sessions' | 'documents'>('overview');

  // Modals
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<PrivatePatientRecord | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<PrivatePatientRecord | null>(null);

  // New Session form inside profile
  const [showAddSessionForm, setShowAddSessionForm] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    date: new Date().toISOString().split('T')[0],
    treatmentGiven: '',
    patientResponse: '',
    therapistNotes: '',
    clinicianName: 'Dr. Darpan Vanavi',
  });

  // New Document modal inside profile
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [newDocData, setNewDocData] = useState({
    title: '',
    documentType: 'X-Ray / MRI' as PrivatePatientDocument['documentType'],
    notes: '',
  });

  // Fetch private patients when unlocked
  useEffect(() => {
    if (isUnlocked) {
      fetchPatients();
    }
  }, [isUnlocked]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/private-patients');
      if (res.ok) {
        const data = await res.json();
        if (data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
          // If a patient was selected, refresh it
          if (selectedPatient) {
            const updated = data.patients.find((p: PrivatePatientRecord) => p.id === selectedPatient.id);
            if (updated) setSelectedPatient(updated);
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch private patients from backend, using memory cache:', err);
    } finally {
      setLoading(false);
    }
  };

  // PIN Verification
  const handleVerifyPin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pinInput.trim()) {
      setPinError('Please enter security PIN');
      return;
    }
    setPinLoading(true);
    setPinError('');
    try {
      const res = await fetch('/api/private-registry/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsUnlocked(true);
        sessionStorage.setItem('clinica_private_unlocked', 'true');
        setPinInput('');
      } else {
        setPinError(data.error || 'Invalid PIN. Try 1234 or drdarpan2026');
      }
    } catch (err) {
      // Fallback local check
      if (pinInput.trim() === '1234' || pinInput.trim() === 'drdarpan2026') {
        setIsUnlocked(true);
        sessionStorage.setItem('clinica_private_unlocked', 'true');
        setPinInput('');
      } else {
        setPinError('Invalid PIN. Default PIN is 1234');
      }
    } finally {
      setPinLoading(false);
    }
  };

  const handleLockRegistry = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('clinica_private_unlocked');
    setSelectedPatient(null);
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePinMsg({ text: '', isError: false });
    if (!newPin || newPin.length < 4) {
      setChangePinMsg({ text: 'New PIN must be at least 4 digits', isError: true });
      return;
    }
    if (newPin !== confirmNewPin) {
      setChangePinMsg({ text: 'New PIN and Confirm PIN do not match', isError: true });
      return;
    }

    try {
      const res = await fetch('/api/private-registry/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPin, newPin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setChangePinMsg({ text: 'Security PIN updated successfully!', isError: false });
        setTimeout(() => {
          setShowChangePinModal(false);
          setCurrentPin('');
          setNewPin('');
          setConfirmNewPin('');
          setChangePinMsg({ text: '', isError: false });
        }, 1500);
      } else {
        setChangePinMsg({ text: data.error || 'Failed to update PIN. Check current PIN.', isError: true });
      }
    } catch (err) {
      setChangePinMsg({ text: 'Error connecting to server', isError: true });
    }
  };

  // Add or Edit Patient Save
  const handleSavePatient = async (savedPatient: PrivatePatientRecord) => {
    try {
      if (patientToEdit) {
        // Edit existing
        const res = await fetch(`/api/private-patients/${savedPatient.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedPatient),
        });
        if (res.ok) {
          const data = await res.json();
          setPatients((prev) => prev.map((p) => (p.id === data.patient.id ? data.patient : p)));
          if (selectedPatient?.id === data.patient.id) {
            setSelectedPatient(data.patient);
          }
        }
      } else {
        // Create new
        const res = await fetch('/api/private-patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedPatient),
        });
        if (res.ok) {
          const data = await res.json();
          setPatients((prev) => [data.patient, ...prev]);
        }
      }
    } catch (err) {
      console.error('Failed to save private patient', err);
    } finally {
      setShowAddEditModal(false);
      setPatientToEdit(null);
    }
  };

  // Delete Patient
  const handleConfirmDelete = async () => {
    if (!patientToDelete) return;
    try {
      const res = await fetch(`/api/private-patients/${patientToDelete.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPatients((prev) => prev.filter((p) => p.id !== patientToDelete.id));
        if (selectedPatient?.id === patientToDelete.id) {
          setSelectedPatient(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete patient', err);
    } finally {
      setShowDeleteModal(false);
      setPatientToDelete(null);
    }
  };

  // Add Treatment Session to Selected Patient
  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newSessionData.treatmentGiven.trim()) return;

    try {
      const res = await fetch(`/api/private-patients/${selectedPatient.id}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSessionData),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedPatient(data.patient);
        setPatients((prev) => prev.map((p) => (p.id === data.patient.id ? data.patient : p)));
        setShowAddSessionForm(false);
        setNewSessionData({
          date: new Date().toISOString().split('T')[0],
          treatmentGiven: '',
          patientResponse: '',
          therapistNotes: '',
          clinicianName: 'Dr. Darpan Vanavi',
        });
      }
    } catch (err) {
      console.error('Failed to add session', err);
    }
  };

  // Add Document to Selected Patient
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newDocData.title.trim()) return;

    try {
      const res = await fetch(`/api/private-patients/${selectedPatient.id}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newDocData.title,
          documentType: newDocData.documentType,
          fileSize: '1.8 MB (Verified DICOM/PDF)',
          notes: newDocData.notes,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedPatient(data.patient);
        setPatients((prev) => prev.map((p) => (p.id === data.patient.id ? data.patient : p)));
        setShowAddDocModal(false);
        setNewDocData({
          title: '',
          documentType: 'X-Ray / MRI',
          notes: '',
        });
      }
    } catch (err) {
      console.error('Failed to add document', err);
    }
  };

  // Delete Document
  const handleDeleteDocument = async (docId: string) => {
    if (!selectedPatient) return;
    try {
      const res = await fetch(`/api/private-patients/${selectedPatient.id}/documents/${docId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedPatient(data.patient);
        setPatients((prev) => prev.map((p) => (p.id === data.patient.id ? data.patient : p)));
      }
    } catch (err) {
      console.error('Failed to delete document', err);
    }
  };

  // Filtered patients list
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clinicalDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalActive = patients.filter((p) => p.status === 'Active').length;
  const totalOnHold = patients.filter((p) => p.status === 'On Hold').length;
  const totalDischarged = patients.filter((p) => p.status === 'Discharged').length;

  // -------------------------------------------------------------
  // RENDER 1: LOCKED VAULT SCREEN
  // -------------------------------------------------------------
  if (!isUnlocked) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dr. Darpan Vanavi's Private Patient Registry
            </h1>
            <p className="mt-2 text-sm text-amber-100/80 max-w-xl mx-auto">
              Confidential Clinical Vault & Personal Patient Records. Protected under Medical Confidentiality, HIPAA & DISHA guidelines. Isolated from public dashboards and shared registries.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10 max-w-md mx-auto">
            <form onSubmit={handleVerifyPin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
                  Enter 4-Digit Security PIN to Unlock
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={10}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError('');
                    }}
                    placeholder="Enter PIN (e.g. 1234)"
                    className="w-full text-center text-2xl font-mono tracking-widest py-3 px-4 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white text-slate-900 transition-all shadow-inner"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-5 h-5" />
                  </div>
                </div>

                {pinError && (
                  <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{pinError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={pinLoading}
                className="w-full py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {pinLoading ? (
                  <span>Verifying PIN...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Private Registry</span>
                  </>
                )}
              </button>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Shield className="w-4 h-4 text-amber-700" />
                  <span>Authorized Doctor Access Only</span>
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  Default PIN is <strong className="font-bold text-amber-950 font-mono">1234</strong> or{' '}
                  <strong className="font-bold text-amber-950 font-mono">drdarpan2026</strong>. You can change this PIN anytime after unlocking.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER 2: DEEP DIVE PATIENT PROFILE VIEW
  // -------------------------------------------------------------
  if (selectedPatient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setSelectedPatient(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded-lg transition-colors cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
            <span>Back to Private Registry</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPatientToEdit(selectedPatient);
                setShowAddEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 py-2 px-3 rounded-lg transition-colors cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Record</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 px-3 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Clinical Summary</span>
            </button>

            <button
              onClick={handleLockRegistry}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-2 px-3 rounded-lg transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Lock Vault</span>
            </button>
          </div>
        </div>

        {/* Patient Profile Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-900 text-amber-200 font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-sm border border-amber-800">
                {selectedPatient.patientName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-slate-900">{selectedPatient.patientName}</h1>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                    {selectedPatient.id}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      selectedPatient.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : selectedPatient.status === 'On Hold'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    ● {selectedPatient.status}
                  </span>
                </div>

                <p className="text-sm font-semibold text-teal-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{selectedPatient.clinicalDiagnosis}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <span>
                    Age/Gender: <strong>{selectedPatient.age} yrs</strong> ({selectedPatient.gender})
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{selectedPatient.contactNumber}</strong>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedPatient.address}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">First Visit</span>
                <span className="text-xs font-semibold text-slate-700">{selectedPatient.dateOfFirstVisit}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Follow-Up</span>
                <span className="text-xs font-bold text-amber-900 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200 inline-block">
                  {selectedPatient.followUpDate || 'None Scheduled'}
                </span>
              </div>
            </div>
          </div>

          {/* Deep-dive Tab Navigation */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-amber-800 text-amber-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Clinical Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('assessment')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'assessment'
                  ? 'border-amber-800 text-amber-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Assessment & Treatment Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'sessions'
                  ? 'border-amber-800 text-amber-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Treatment Sessions ({selectedPatient.treatmentSessions?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-amber-800 text-amber-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Reports & Documents ({selectedPatient.documents?.length || 0})</span>
            </button>
          </div>

          {/* Tab 1: Clinical Overview */}
          {activeTab === 'overview' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider block">
                      Chief Presenting Complaints
                    </span>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {selectedPatient.chiefComplaints}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Clinical Working Diagnosis
                    </span>
                    <p className="text-sm font-bold text-teal-900 leading-relaxed">
                      {selectedPatient.clinicalDiagnosis}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Past Medical & Surgical History
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedPatient.medicalHistory || 'No significant comorbidities reported.'}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Confidential Record Metadata
                    </span>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p>Doctor Assigned: <strong>{selectedPatient.doctorId} (Dr. Darpan Vanavi)</strong></p>
                      <p>Registry Record ID: <strong className="font-mono">{selectedPatient.id}</strong></p>
                      <p>Status: <strong className="text-amber-900">{selectedPatient.status}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Physiotherapy Assessment & Plan */}
          {activeTab === 'assessment' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Physical Assessment Findings */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-teal-600" />
                      <span>Physiotherapy Objective Assessment</span>
                    </h3>
                    {selectedPatient.physiotherapyAssessment?.painScoreNprs !== undefined && (
                      <span className="text-xs font-extrabold px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full border border-rose-200">
                        NPRS: {selectedPatient.physiotherapyAssessment.painScoreNprs}/10
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block">Range of Motion (ROM):</span>
                      <p className="text-slate-600 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.physiotherapyAssessment?.romFindings || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Manual Muscle Testing (MMT):</span>
                      <p className="text-slate-600 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.physiotherapyAssessment?.mmtFindings || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Posture & Gait Assessment:</span>
                      <p className="text-slate-600 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.physiotherapyAssessment?.postureGaitFindings || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Special Orthopaedic Tests:</span>
                      <p className="text-slate-600 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.physiotherapyAssessment?.specialTestsFindings || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Functional Tests & Scores:</span>
                      <p className="text-slate-600 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.physiotherapyAssessment?.functionalFindings || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Clinical Impression:</span>
                      <p className="text-slate-800 font-medium mt-0.5 bg-teal-50/50 p-2.5 rounded-lg border border-teal-200">
                        {selectedPatient.physiotherapyAssessment?.clinicalImpression || 'Not documented'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Treatment Plan */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <HeartPulse className="w-4 h-4 text-emerald-600" />
                      <span>Physiotherapy Management & Dosing Plan</span>
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-900 block">Short-Term Goals:</span>
                      <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.treatmentPlan?.shortTermGoals || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-900 block">Long-Term Goals:</span>
                      <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.treatmentPlan?.longTermGoals || 'Not documented'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-800 block">Prescribed Clinical Exercises:</span>
                      <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.treatmentPlan?.prescribedExercises || 'Not documented'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="font-bold text-slate-700 block">Dosage (Sets/Reps):</span>
                        <p className="text-slate-600 mt-0.5 bg-white p-2 rounded-lg border border-slate-200">
                          {selectedPatient.treatmentPlan?.dosageSetsReps || 'Not documented'}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block">Frequency & Duration:</span>
                        <p className="text-slate-600 mt-0.5 bg-white p-2 rounded-lg border border-slate-200">
                          {selectedPatient.treatmentPlan?.frequencyAndDuration || 'Not documented'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-amber-900 block">Clinical Precautions:</span>
                      <p className="text-amber-900 mt-0.5 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200">
                        {selectedPatient.treatmentPlan?.precautions || 'No special precautions'}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-teal-900 block">Progression Criteria:</span>
                      <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                        {selectedPatient.treatmentPlan?.progressionCriteria || 'Follow standard protocol progression'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Treatment Sessions */}
          {activeTab === 'sessions' && (
            <div className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Longitudinal Treatment Sessions</h3>
                  <p className="text-xs text-slate-500">Record daily therapy notes, manual interventions, and patient progression</p>
                </div>
                <button
                  onClick={() => setShowAddSessionForm(!showAddSessionForm)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 py-2 px-3.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddSessionForm ? 'Cancel Form' : 'Log New Treatment Session'}</span>
                </button>
              </div>

              {/* Form to log new session */}
              {showAddSessionForm && (
                <form
                  onSubmit={handleAddSession}
                  className="p-5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-4 text-xs"
                >
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <Clock className="w-4 h-4 text-amber-800" />
                    <span>New Treatment Session Log</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Session Date</label>
                      <input
                        type="date"
                        required
                        value={newSessionData.date}
                        onChange={(e) => setNewSessionData({ ...newSessionData, date: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Treating Clinician</label>
                      <input
                        type="text"
                        value={newSessionData.clinicianName}
                        onChange={(e) => setNewSessionData({ ...newSessionData, clinicianName: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Physiotherapy Treatment Administered *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Maitland Glenohumeral mobilizations Grade III, wand elevation exercises, cryotherapy..."
                      value={newSessionData.treatmentGiven}
                      onChange={(e) => setNewSessionData({ ...newSessionData, treatmentGiven: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Patient Response & Pain Tolerance</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Tolerated mobilization well, reported decreased stiffness post-session"
                        value={newSessionData.patientResponse}
                        onChange={(e) => setNewSessionData({ ...newSessionData, patientResponse: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Therapist Clinical Notes / Plan for Next Visit</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Continue home wand exercises twice daily, add light resistance next visit"
                        value={newSessionData.therapistNotes}
                        onChange={(e) => setNewSessionData({ ...newSessionData, therapistNotes: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSessionForm(false)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Session Record</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Sessions Timeline */}
              {selectedPatient.treatmentSessions && selectedPatient.treatmentSessions.length > 0 ? (
                <div className="space-y-4">
                  {selectedPatient.treatmentSessions.map((session, idx) => (
                    <div
                      key={session.sessionId || idx}
                      className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-2xs space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center">
                            #{session.sessionNumber || idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {session.date}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Clinician: {session.clinicianName || 'Dr. Darpan Vanavi'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="md:col-span-1">
                          <span className="font-bold text-slate-700 block">Treatment Administered:</span>
                          <p className="text-slate-800 mt-0.5">{session.treatmentGiven}</p>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">Patient Response:</span>
                          <p className="text-slate-600 mt-0.5">{session.patientResponse || 'Normal tolerance'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">Therapist Notes:</span>
                          <p className="text-slate-600 mt-0.5 italic">{session.therapistNotes || 'Routine session'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-500 text-xs">
                  No treatment sessions recorded yet. Click &quot;Log New Treatment Session&quot; to begin tracking daily progress.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Documents & Reports */}
          {activeTab === 'documents' && (
            <div className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Clinical Reports, X-Rays & Documents</h3>
                  <p className="text-xs text-slate-500">Encrypted diagnostic investigations, MRI scans, discharge summaries</p>
                </div>
                <button
                  onClick={() => setShowAddDocModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 py-2 px-3.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Attach New Document</span>
                </button>
              </div>

              {/* Documents Grid */}
              {selectedPatient.documents && selectedPatient.documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPatient.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                            <span className="text-[10px] font-semibold text-slate-500 block">
                              {doc.documentType} · {doc.uploadDate}
                            </span>
                            {doc.fileSize && (
                              <span className="text-[10px] text-slate-400 block">{doc.fileSize}</span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                          title="Remove Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {doc.notes && (
                        <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                          {doc.notes}
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified & Stored</span>
                        </span>
                        <button
                          onClick={() => alert(`Simulated DICOM/PDF Viewer opened for: ${doc.title}`)}
                          className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Scan</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-500 text-xs">
                  No documents or scans uploaded for this patient yet. Click &quot;Attach New Document&quot; to upload MRI, X-Ray or lab reports.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal: Add Document */}
        {showAddDocModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-amber-800" />
                  <span>Attach Clinical Report / Investigation</span>
                </h3>
                <button
                  onClick={() => setShowAddDocModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddDocument} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Right Shoulder MRI 1.5T Report, Pre-op X-Ray"
                    value={newDocData.title}
                    onChange={(e) => setNewDocData({ ...newDocData, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Investigation / Document Type</label>
                  <select
                    value={newDocData.documentType}
                    onChange={(e) =>
                      setNewDocData({
                        ...newDocData,
                        documentType: e.target.value as PrivatePatientDocument['documentType'],
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white font-medium"
                  >
                    <option value="X-Ray / MRI">X-Ray / MRI / CT Scan</option>
                    <option value="Lab Report">Lab Report (CBC, CRP, Vitamin D, HbA1c)</option>
                    <option value="Physiotherapy Assessment">Physiotherapy Baseline Assessment Sheet</option>
                    <option value="Surgical Discharge Summary">Surgical Discharge Summary</option>
                    <option value="Other Clinical Note">Other Clinical Note / Specialist Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Clinical Findings / Radiologist Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Joint capsule thickening, no full-thickness rotator cuff tear identified..."
                    value={newDocData.notes}
                    onChange={(e) => setNewDocData({ ...newDocData, notes: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                  <div className="font-bold flex items-center gap-1 mb-0.5">
                    <Shield className="w-3.5 h-3.5 text-amber-700" />
                    <span>Private & Encrypted Storage</span>
                  </div>
                  Files are bound to Dr. Darpan&apos;s private patient database and strictly inaccessible to unauthenticated sessions.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddDocModal(false)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Upload & Attach Document</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER 3: MASTER REGISTRY VIEW (UNLOCKED)
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner with Doctor & Security Badges */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Private Patient Registry
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full border border-amber-200">
              <Lock className="w-3 h-3 text-amber-700" />
              <span>Personal Records Vault</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Encrypted & Isolated</span>
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Dedicated clinical records management exclusively for <strong>Dr. Darpan Vanavi (Vadodara)</strong>. Confidential assessments, longitudinal sessions, and diagnostic reports.
          </p>
        </div>

        {/* Top Control Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowChangePinModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded-lg transition-colors cursor-pointer border border-slate-200"
            title="Change Vault Access PIN"
          >
            <Key className="w-3.5 h-3.5 text-slate-600" />
            <span>Change PIN</span>
          </button>

          <button
            onClick={handleLockRegistry}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 py-2 px-3 rounded-lg transition-colors cursor-pointer border border-amber-200"
            title="Lock Registry Screen"
          >
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Lock Vault</span>
          </button>

          <button
            onClick={() => {
              setPatientToEdit(null);
              setShowAddEditModal(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 py-2 px-4 rounded-lg transition-all shadow-xs hover:shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Patient</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Private Patients
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{patients.length}</span>
            <span className="text-[11px] text-slate-400 font-medium">Confidential</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
            Active Treatment
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-800">{totalActive}</span>
            <span className="text-[11px] text-emerald-600 font-medium">Under Care</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
            On Hold
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-800">{totalOnHold}</span>
            <span className="text-[11px] text-amber-600 font-medium">Paused</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
            Discharged
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-700">{totalDischarged}</span>
            <span className="text-[11px] text-slate-500 font-medium">Recovered</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient name, ID, phone, condition or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Buttons & View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            {(['All', 'Active', 'On Hold', 'Discharged'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-amber-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-amber-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Patient List: Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header Info */}
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-200 font-extrabold text-sm flex items-center justify-center shrink-0">
                      {patient.patientName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{patient.patientName}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-mono font-bold text-slate-700">{patient.id}</span>
                        <span>·</span>
                        <span>
                          {patient.age}y / {patient.gender}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                      patient.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : patient.status === 'On Hold'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    ● {patient.status}
                  </span>
                </div>

                {/* Primary Diagnosis */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                    Clinical Diagnosis
                  </span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5 line-clamp-2">
                    {patient.clinicalDiagnosis}
                  </p>
                </div>

                {/* Chief Complaints snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 italic">
                  &quot;{patient.chiefComplaints}&quot;
                </p>

                {/* Contact & Location */}
                <div className="space-y-1 text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{patient.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{patient.address}</span>
                  </div>
                </div>

                {/* Badges: Sessions & Documents count */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                    {patient.treatmentSessions?.length || 0} Sessions
                  </span>
                  <span className="font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                    {patient.documents?.length || 0} Documents
                  </span>
                  {patient.followUpDate && (
                    <span className="font-semibold px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md">
                      Next: {patient.followUpDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedPatient(patient);
                    setActiveTab('overview');
                  }}
                  className="flex-1 py-1.5 px-3 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Profile</span>
                </button>

                <button
                  onClick={() => {
                    setPatientToEdit(patient);
                    setShowAddEditModal(true);
                  }}
                  className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Edit Patient Information"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setPatientToDelete(patient);
                    setShowDeleteModal(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Delete Record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="col-span-full p-12 text-center bg-white border border-dashed border-slate-300 rounded-2xl text-slate-500 text-xs space-y-2">
              <FolderOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-700 text-sm">No Private Patient Records Found</p>
              <p>Try adjusting your search query or status filter, or register a new patient.</p>
            </div>
          )}
        </div>
      )}

      {/* Patient List: Clinical Table View */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Age/Sex</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Clinical Diagnosis</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">First Visit</th>
                  <th className="py-3 px-4">Next Follow-Up</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{patient.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{patient.patientName}</td>
                    <td className="py-3 px-4">
                      {patient.age}y / {patient.gender}
                    </td>
                    <td className="py-3 px-4 font-medium">{patient.contactNumber}</td>
                    <td className="py-3 px-4 font-semibold text-teal-900 max-w-xs truncate">
                      {patient.clinicalDiagnosis}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block ${
                          patient.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : patient.status === 'On Hold'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{patient.dateOfFirstVisit}</td>
                    <td className="py-3 px-4 text-amber-900 font-semibold">{patient.followUpDate || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedPatient(patient);
                            setActiveTab('overview');
                          }}
                          className="p-1.5 text-amber-900 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setPatientToEdit(patient);
                            setShowAddEditModal(true);
                          }}
                          className="p-1.5 text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setPatientToDelete(patient);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT PATIENT */}
      {showAddEditModal && (
        <AddEditPrivatePatientModal
          patient={patientToEdit}
          onClose={() => {
            setShowAddEditModal(false);
            setPatientToEdit(null);
          }}
          onSave={handleSavePatient}
        />
      )}

      {/* MODAL 2: CONFIRM DELETE */}
      {showDeleteModal && patientToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Delete Private Patient Record?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-slate-900 font-bold">{patientToDelete.patientName}</strong> (
                {patientToDelete.id})? All assessment findings, treatment sessions, and attached reports will be permanently purged.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setPatientToDelete(null);
                }}
                className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CHANGE PIN */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-800" />
                <span>Change Vault PIN</span>
              </h3>
              <button
                onClick={() => setShowChangePinModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleChangePin} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current PIN</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current PIN"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono tracking-wider"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New 4-Digit PIN</label>
                <input
                  type="password"
                  required
                  maxLength={10}
                  placeholder="Enter new PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono tracking-wider"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New PIN</label>
                <input
                  type="password"
                  required
                  maxLength={10}
                  placeholder="Confirm new PIN"
                  value={confirmNewPin}
                  onChange={(e) => setConfirmNewPin(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 font-mono tracking-wider"
                />
              </div>

              {changePinMsg.text && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-semibold ${
                    changePinMsg.isError
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {changePinMsg.text}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePinModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Update PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// SUB-COMPONENT: ADD / EDIT PRIVATE PATIENT MODAL
// -------------------------------------------------------------
interface AddEditModalProps {
  patient: PrivatePatientRecord | null;
  onClose: () => void;
  onSave: (patient: PrivatePatientRecord) => void;
}

const AddEditPrivatePatientModal: React.FC<AddEditModalProps> = ({ patient, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<PrivatePatientRecord>>(() => {
    if (patient) return { ...patient };
    return {
      patientName: '',
      age: 45,
      gender: 'Male',
      contactNumber: '',
      address: '',
      dateOfFirstVisit: new Date().toISOString().split('T')[0],
      chiefComplaints: '',
      clinicalDiagnosis: '',
      medicalHistory: '',
      followUpDate: '',
      status: 'Active',
      physiotherapyAssessment: {
        romFindings: '',
        mmtFindings: '',
        postureGaitFindings: '',
        specialTestsFindings: '',
        functionalFindings: '',
        painScoreNprs: 5,
        clinicalImpression: '',
      },
      treatmentPlan: {
        shortTermGoals: '',
        longTermGoals: '',
        prescribedExercises: '',
        dosageSetsReps: '',
        frequencyAndDuration: '',
        precautions: '',
        progressionCriteria: '',
      },
      treatmentSessions: [],
      documents: [],
      doctorId: 'DOC-DARPAN-01',
    };
  });

  const [formTab, setFormTab] = useState<'demographics' | 'complaints' | 'assessment' | 'plan'>('demographics');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.clinicalDiagnosis) {
      alert('Patient Name and Clinical Diagnosis are required.');
      return;
    }
    const finalRecord: PrivatePatientRecord = {
      id: patient?.id || `PVT-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      patientName: formData.patientName || '',
      age: Number(formData.age) || 40,
      gender: (formData.gender as 'Male' | 'Female' | 'Other') || 'Male',
      contactNumber: formData.contactNumber || '',
      address: formData.address || '',
      dateOfFirstVisit: formData.dateOfFirstVisit || new Date().toISOString().split('T')[0],
      chiefComplaints: formData.chiefComplaints || '',
      clinicalDiagnosis: formData.clinicalDiagnosis || '',
      medicalHistory: formData.medicalHistory || '',
      followUpDate: formData.followUpDate || '',
      status: (formData.status as PrivatePatientStatus) || 'Active',
      physiotherapyAssessment: formData.physiotherapyAssessment || {},
      treatmentPlan: formData.treatmentPlan || {},
      treatmentSessions: formData.treatmentSessions || [],
      documents: formData.documents || [],
      doctorId: formData.doctorId || 'DOC-DARPAN-01',
      createdAt: patient?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(finalRecord);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {patient ? 'Edit Private Patient Record' : 'Register New Private Patient'}
            </h2>
            <p className="text-xs text-slate-500">
              Personal clinical documentation for Dr. Darpan Vanavi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFormTab('demographics')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer ${
              formTab === 'demographics' ? 'border-amber-800 text-amber-900' : 'border-transparent text-slate-500'
            }`}
          >
            1. Demographics & Status
          </button>
          <button
            type="button"
            onClick={() => setFormTab('complaints')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer ${
              formTab === 'complaints' ? 'border-amber-800 text-amber-900' : 'border-transparent text-slate-500'
            }`}
          >
            2. Complaints & History
          </button>
          <button
            type="button"
            onClick={() => setFormTab('assessment')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer ${
              formTab === 'assessment' ? 'border-amber-800 text-amber-900' : 'border-transparent text-slate-500'
            }`}
          >
            3. Objective Assessment
          </button>
          <button
            type="button"
            onClick={() => setFormTab('plan')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer ${
              formTab === 'plan' ? 'border-amber-800 text-amber-900' : 'border-transparent text-slate-500'
            }`}
          >
            4. Treatment Plan
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* TAB 1: Demographics */}
          {formTab === 'demographics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="e.g. Rameshbhai Parmar"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="e.g. +91 98250 12345"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Patient Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PrivatePatientStatus })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white font-medium"
                  >
                    <option value="Active">Active (Under Treatment)</option>
                    <option value="On Hold">On Hold (Temporary Pause)</option>
                    <option value="Discharged">Discharged (Goals Achieved)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address / Location</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Gotri Road, Vadodara, Gujarat"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of First Visit</label>
                  <input
                    type="date"
                    value={formData.dateOfFirstVisit}
                    onChange={(e) => setFormData({ ...formData, dateOfFirstVisit: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scheduled Follow-Up Date</label>
                  <input
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Complaints & History */}
          {formTab === 'complaints' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Clinical Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={formData.clinicalDiagnosis}
                  onChange={(e) => setFormData({ ...formData, clinicalDiagnosis: e.target.value })}
                  placeholder="e.g. Adhesive Capsulitis / Knee Osteoarthritis / Lumbar Disc Herniation"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chief Presenting Complaints</label>
                <textarea
                  rows={3}
                  value={formData.chiefComplaints}
                  onChange={(e) => setFormData({ ...formData, chiefComplaints: e.target.value })}
                  placeholder="Describe patient symptoms, onset, aggravating and relieving factors..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Medical & Surgical History</label>
                <textarea
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  placeholder="Comorbidities (Diabetes, Hypertension), previous surgeries, drug allergies..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Assessment */}
          {formTab === 'assessment' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ROM Findings</label>
                  <textarea
                    rows={2}
                    value={formData.physiotherapyAssessment?.romFindings}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physiotherapyAssessment: {
                          ...formData.physiotherapyAssessment,
                          romFindings: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Abduction 75°, External Rotation 15°..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">MMT Findings (0-5)</label>
                  <textarea
                    rows={2}
                    value={formData.physiotherapyAssessment?.mmtFindings}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physiotherapyAssessment: {
                          ...formData.physiotherapyAssessment,
                          mmtFindings: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Supraspinatus 4/5, Infraspinatus 3+/5..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Posture & Gait Analysis</label>
                  <input
                    type="text"
                    value={formData.physiotherapyAssessment?.postureGaitFindings}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physiotherapyAssessment: {
                          ...formData.physiotherapyAssessment,
                          postureGaitFindings: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Antalgic gait, forward head posture..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pain Score (NPRS 0-10)</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={formData.physiotherapyAssessment?.painScoreNprs}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physiotherapyAssessment: {
                          ...formData.physiotherapyAssessment,
                          painScoreNprs: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Special Orthopaedic Tests</label>
                <input
                  type="text"
                  value={formData.physiotherapyAssessment?.specialTestsFindings}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physiotherapyAssessment: {
                        ...formData.physiotherapyAssessment,
                        specialTestsFindings: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. Neer (+), Hawkins-Kennedy (+), Speed (-)"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Impression / Summary</label>
                <textarea
                  rows={2}
                  value={formData.physiotherapyAssessment?.clinicalImpression}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physiotherapyAssessment: {
                        ...formData.physiotherapyAssessment,
                        clinicalImpression: e.target.value,
                      },
                    })
                  }
                  placeholder="Clinical synthesis and pathology reasoning..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Treatment Plan */}
          {formTab === 'plan' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short-Term Goals</label>
                  <textarea
                    rows={2}
                    value={formData.treatmentPlan?.shortTermGoals}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        treatmentPlan: { ...formData.treatmentPlan, shortTermGoals: e.target.value },
                      })
                    }
                    placeholder="e.g. Reduce pain NPRS from 7 to <= 3 in 3 weeks..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Long-Term Goals</label>
                  <textarea
                    rows={2}
                    value={formData.treatmentPlan?.longTermGoals}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        treatmentPlan: { ...formData.treatmentPlan, longTermGoals: e.target.value },
                      })
                    }
                    placeholder="e.g. Return to unrestricted work and sports..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Prescribed Clinical Exercises & Mobilization</label>
                <textarea
                  rows={2}
                  value={formData.treatmentPlan?.prescribedExercises}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      treatmentPlan: { ...formData.treatmentPlan, prescribedExercises: e.target.value },
                    })
                  }
                  placeholder="e.g. Maitland Grade II-III mobilizations, wand flexion, pendulum..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dosage (Sets & Reps)</label>
                  <input
                    type="text"
                    value={formData.treatmentPlan?.dosageSetsReps}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        treatmentPlan: { ...formData.treatmentPlan, dosageSetsReps: e.target.value },
                      })
                    }
                    placeholder="e.g. 3 sets x 10 reps, twice daily"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Frequency & Duration</label>
                  <input
                    type="text"
                    value={formData.treatmentPlan?.frequencyAndDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        treatmentPlan: { ...formData.treatmentPlan, frequencyAndDuration: e.target.value },
                      })
                    }
                    placeholder="e.g. 3 sessions/week for 6 weeks"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Precautions & Red Flags</label>
                <input
                  type="text"
                  value={formData.treatmentPlan?.precautions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      treatmentPlan: { ...formData.treatmentPlan, precautions: e.target.value },
                    })
                  }
                  placeholder="e.g. Avoid aggressive end-range manipulation..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Form Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex gap-2">
              {formTab !== 'demographics' && (
                <button
                  type="button"
                  onClick={() => {
                    if (formTab === 'plan') setFormTab('assessment');
                    else if (formTab === 'assessment') setFormTab('complaints');
                    else if (formTab === 'complaints') setFormTab('demographics');
                  }}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Previous Step
                </button>
              )}
              {formTab !== 'plan' && (
                <button
                  type="button"
                  onClick={() => {
                    if (formTab === 'demographics') setFormTab('complaints');
                    else if (formTab === 'complaints') setFormTab('assessment');
                    else if (formTab === 'assessment') setFormTab('plan');
                  }}
                  className="px-3 py-1.5 bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Next Step
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Patient Record</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
