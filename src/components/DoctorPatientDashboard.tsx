import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Search,
  Filter,
  Activity,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  Printer,
  ChevronRight,
  BookOpen,
  Stethoscope,
  RefreshCw,
  AlertCircle,
  FileText,
  Building,
  Plus,
} from 'lucide-react';
import { DoctorProfile, DoctorPatient, DashboardMetrics } from '../types/doctorPatient';
import { INITIAL_DOCTOR, INITIAL_PATIENTS } from '../data/initialDoctorPatientData';
import { DoctorProfileModal } from './DoctorProfileModal';
import { PatientDetailRecordModal } from './PatientDetailRecordModal';
import { AddEditPatientModal } from './AddEditPatientModal';
import { ProbableConditionsModal } from './ProbableConditionsModal';

interface DoctorPatientDashboardProps {
  onOpenAssessmentWizard?: (patient: DoctorPatient) => void;
  onOpenAssessmentFormat?: (patient: DoctorPatient) => void;
}

export const DoctorPatientDashboard: React.FC<DoctorPatientDashboardProps> = ({
  onOpenAssessmentWizard,
  onOpenAssessmentFormat,
}) => {
  const [currentDoctor, setCurrentDoctor] = useState<DoctorProfile>(INITIAL_DOCTOR);
  const [patients, setPatients] = useState<DoctorPatient[]>(INITIAL_PATIENTS);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');

  // Modals
  const [doctorProfileModalOpen, setDoctorProfileModalOpen] = useState(false);
  const [addPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const [selectedPatientForDetail, setSelectedPatientForDetail] = useState<DoctorPatient | null>(null);
  const [conditionsModalOpen, setConditionsModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData(currentDoctor.id);
  }, [currentDoctor.id]);

  const fetchDashboardData = async (doctorId: string) => {
    setLoading(true);
    try {
      // Fetch patients for this doctor
      const resPatients = await fetch(`/api/patients?doctorId=${encodeURIComponent(doctorId)}`);
      if (resPatients.ok) {
        const pData = await resPatients.json();
        if (pData.patients) {
          setPatients(pData.patients);
        }
      }

      // Fetch metrics
      const resMetrics = await fetch(`/api/dashboard-metrics?doctorId=${encodeURIComponent(doctorId)}`);
      if (resMetrics.ok) {
        const mData = await resMetrics.json();
        setMetrics(mData);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientUpdated = (updated: DoctorPatient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedPatientForDetail?.id === updated.id) {
      setSelectedPatientForDetail(updated);
    }
    fetchDashboardData(currentDoctor.id);
  };

  const handlePatientCreated = (created: DoctorPatient) => {
    setPatients((prev) => [created, ...prev]);
    fetchDashboardData(currentDoctor.id);
  };

  // Filtered patient list
  const filteredPatients = patients.filter((p) => {
    // Search query: name, age, condition, location
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.primaryDiagnosis.toLowerCase().includes(q) ||
        p.presentingComplaints.toLowerCase().includes(q) ||
        String(p.age).includes(q);
      if (!match) return false;
    }

    // Status filter
    if (selectedStatus !== 'all' && p.status !== selectedStatus) {
      return false;
    }

    // Location filter
    if (selectedLocation !== 'all' && p.location.toLowerCase() !== selectedLocation.toLowerCase()) {
      return false;
    }

    // Condition filter
    if (selectedCondition !== 'all' && !p.primaryDiagnosis.toLowerCase().includes(selectedCondition.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Calculate unique locations from patient list
  const availableLocations = Array.from(new Set(patients.map((p) => p.location))).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. TOP DOCTOR IDENTITY BAR */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg border border-teal-800/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Doctor Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400/50 flex items-center justify-center shrink-0">
              <UserCheck className="w-9 h-9 text-teal-300" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">{currentDoctor.fullName}</h1>
                <span className="bg-teal-500/30 text-teal-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-teal-400/30">
                  {currentDoctor.designation}
                </span>
                <span className="bg-white/10 text-slate-300 text-xs px-2 py-0.5 rounded font-mono">
                  {currentDoctor.id}
                </span>
              </div>

              <p className="text-sm text-teal-200 mt-1 font-medium">
                {currentDoctor.qualification} · Specialisation: {currentDoctor.specialisation}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {currentDoctor.workingLocation}
                </span>
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-teal-400" />
                  {currentDoctor.hospitalClinicName || 'Vanavi Physiotherapy Clinic'}
                </span>
                <span>
                  Status: <strong className="text-white">{currentDoctor.professionalStatus}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setDoctorProfileModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-teal-400/30 text-teal-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-teal-300" />
              Doctor Profile & Switch
            </button>

            <button
              onClick={() => setConditionsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-teal-400/30 text-teal-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-300" />
              Probable Conditions (6)
            </button>

            <button
              onClick={() => setAddPatientModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              + Register New Patient
            </button>
          </div>
        </div>
      </div>

      {/* 2. DOCTOR-WISE DASHBOARD METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Patients</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{patients.length}</div>
          <div className="text-[10px] text-teal-700 font-medium mt-0.5">Assigned to Dr. Darpan</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Active Cohort</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            {patients.filter((p) => p.status === 'Active').length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Under routine care</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Under Rehab</div>
          <div className="text-2xl font-bold text-teal-800 mt-1">
            {patients.filter((p) => p.status === 'Under Rehabilitation').length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Post-op / Intensive</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Awaiting Follow-up</div>
          <div className="text-2xl font-bold text-blue-800 mt-1">
            {patients.filter((p) => p.status === 'Awaiting Follow-up' || p.followUpHistory?.length > 0).length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Scheduled reviews</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Pipaliya Cohort</div>
          <div className="text-2xl font-bold text-indigo-900 mt-1">
            {patients.filter((p) => p.location.toLowerCase().includes('pipaliya')).length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">TKR, Tibia, Femur</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Khandha Cohort</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">
            {patients.filter((p) => p.location.toLowerCase().includes('khandha')).length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">ACLR, UKR, Elbow, TKR</div>
        </div>
      </div>

      {/* 3. SEARCH & ADVANCED FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search patients by name, age, condition, or location (e.g. 'Pipaliya', 'TKR', 'Pratikbhai')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            {/* Location selector */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="all">All Locations</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Condition selector */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="all">All Conditions</option>
              <option value="TKR">Post-operative TKR</option>
              <option value="Tibial">Tibial Shaft Fracture</option>
              <option value="Femur">Femur Fracture</option>
              <option value="ACL">Post ACL Reconstruction</option>
              <option value="Unicondylar">Unicondylar Knee (UKR)</option>
              <option value="Elbow">Elbow Fracture</option>
            </select>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedLocation('all');
                setSelectedCondition('all');
              }}
              className="text-slate-500 hover:text-slate-800 text-xs px-2 py-1 underline cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Status Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-500 mr-1 text-[11px]">Filter Status:</span>
          {['all', 'Active', 'Under Rehabilitation', 'Awaiting Follow-up', 'Discharged', 'On Hold'].map(
            (statusKey) => {
              const count =
                statusKey === 'all'
                  ? patients.length
                  : patients.filter((p) => p.status === statusKey).length;
              return (
                <button
                  key={statusKey}
                  onClick={() => setSelectedStatus(statusKey)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedStatus === statusKey
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {statusKey === 'all' ? 'All Patients' : statusKey} ({count})
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* 4. DOCTOR'S PATIENT LIST TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Patient Registry — {currentDoctor.fullName}
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredPatients.length} of {patients.length} registered patient records
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Patient Register
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3.5 text-center w-12">SR No.</th>
                <th className="py-3 px-4">Patient Name & ID</th>
                <th className="py-3 px-3">Age</th>
                <th className="py-3 px-3">Gender</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Primary Diagnosis & Complaints</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No patient records matched the specified filters.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, index) => {
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatientForDetail(patient)}
                      className="hover:bg-teal-50/40 cursor-pointer transition-colors group"
                    >
                      {/* SR No. */}
                      <td className="py-3.5 px-3.5 text-center font-bold text-slate-500 font-mono">
                        {index + 1}
                      </td>

                      {/* Name & ID */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-teal-900">
                          {patient.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {patient.id} · Reg: {patient.registrationDate}
                        </div>
                      </td>

                      {/* Age */}
                      <td className="py-3.5 px-3 font-semibold text-slate-700">
                        {patient.age ? `${patient.age} y` : 'N/A'}
                      </td>

                      {/* Gender */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded ${
                            patient.gender === 'Male'
                              ? 'bg-blue-50 text-blue-800'
                              : patient.gender === 'Female'
                              ? 'bg-rose-50 text-rose-800'
                              : 'bg-amber-50 text-amber-800 font-semibold'
                          }`}
                        >
                          {patient.gender}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal-600" />
                          {patient.location}
                        </span>
                      </td>

                      {/* Diagnosis & Complaints */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-teal-950 truncate">
                          {patient.primaryDiagnosis}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {patient.presentingComplaints}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            patient.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : patient.status === 'Under Rehabilitation'
                              ? 'bg-teal-100 text-teal-800'
                              : patient.status === 'Awaiting Follow-up'
                              ? 'bg-blue-100 text-blue-800'
                              : patient.status === 'Discharged'
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedPatientForDetail(patient)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-teal-700 hover:text-white text-slate-700 font-semibold rounded-lg text-[11px] transition-colors cursor-pointer"
                          >
                            Open File
                          </button>

                          {onOpenAssessmentFormat && (
                            <button
                              onClick={() => onOpenAssessmentFormat(patient)}
                              title="Open in 3-Tier Clinical Assessment Format"
                              className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-teal-700" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DIALOGS */}
      {/* 1. Doctor Profile Modal */}
      <DoctorProfileModal
        isOpen={doctorProfileModalOpen}
        onClose={() => setDoctorProfileModalOpen(false)}
        currentDoctor={currentDoctor}
        onDoctorUpdated={(updated) => {
          setCurrentDoctor(updated);
          fetchDashboardData(updated.id);
        }}
        onDoctorSwitched={(doc) => {
          setCurrentDoctor(doc);
          fetchDashboardData(doc.id);
        }}
      />

      {/* 2. Patient Detail Record Modal */}
      {selectedPatientForDetail && (
        <PatientDetailRecordModal
          isOpen={!!selectedPatientForDetail}
          onClose={() => setSelectedPatientForDetail(null)}
          patient={selectedPatientForDetail}
          onPatientUpdated={handlePatientUpdated}
          onOpenInAssessmentWizard={onOpenAssessmentWizard}
        />
      )}

      {/* 3. Add New Patient Modal */}
      <AddEditPatientModal
        isOpen={addPatientModalOpen}
        onClose={() => setAddPatientModalOpen(false)}
        activeDoctor={currentDoctor}
        onPatientCreated={handlePatientCreated}
      />

      {/* 4. Probable Conditions Modal */}
      <ProbableConditionsModal
        isOpen={conditionsModalOpen}
        onClose={() => setConditionsModalOpen(false)}
        onSelectConditionForIntake={(cond) => {
          setConditionsModalOpen(false);
          setAddPatientModalOpen(true);
        }}
      />
    </div>
  );
};
