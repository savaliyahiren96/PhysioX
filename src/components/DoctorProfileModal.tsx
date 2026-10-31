import React, { useState, useEffect } from 'react';
import {
  X,
  UserCheck,
  Building,
  MapPin,
  Phone,
  Mail,
  Award,
  Calendar,
  Save,
  Plus,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { DoctorProfile } from '../types/doctorPatient';

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDoctor: DoctorProfile;
  onDoctorUpdated: (updated: DoctorProfile) => void;
  onDoctorSwitched: (doctor: DoctorProfile) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  isOpen,
  onClose,
  currentDoctor,
  onDoctorUpdated,
  onDoctorSwitched,
}) => {
  const [allDoctors, setAllDoctors] = useState<DoctorProfile[]>([currentDoctor]);
  const [formData, setFormData] = useState<DoctorProfile>(currentDoctor);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New doctor blank form
  const [newDoctorForm, setNewDoctorForm] = useState({
    fullName: '',
    designation: 'Physiotherapist',
    qualification: 'BPT',
    specialisation: 'Musculoskeletal & Sports',
    registrationNumber: '',
    hospitalClinicName: '',
    clinicAddress: '',
    contactNumber: '',
    email: '',
    professionalExperience: 'Physiotherapy Practitioner',
    workingLocation: 'Gujarat, India',
    professionalStatus: 'Physiotherapy Practitioner',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(currentDoctor);
      fetchDoctors();
    }
  }, [isOpen, currentDoctor]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const data = await res.json();
        if (data.doctors && data.doctors.length > 0) {
          setAllDoctors(data.doctors);
        }
      }
    } catch (e) {
      console.error('Error fetching doctors:', e);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/doctors/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        onDoctorUpdated(updated);
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
        fetchDoctors();
      }
    } catch (e) {
      console.error('Error updating doctor profile:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNewDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctorForm.fullName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoctorForm),
      });
      if (res.ok) {
        const created: DoctorProfile = await res.json();
        setAllDoctors((prev) => [...prev, created]);
        onDoctorSwitched(created);
        setIsAddingNew(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    } catch (e) {
      console.error('Error creating doctor:', e);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Doctor Profile Management</h2>
              <p className="text-xs text-teal-200">
                Individual Practitioner Credentials, Clinic Details & Multi-Doctor Access Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Switcher Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Active Doctor Account:</span>
            <select
              value={currentDoctor.id}
              onChange={(e) => {
                const target = allDoctors.find((d) => d.id === e.target.value);
                if (target) {
                  onDoctorSwitched(target);
                  setFormData(target);
                }
              }}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-teal-800 shadow-sm focus:ring-1 focus:ring-teal-500"
            >
              {allDoctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.fullName} ({doc.qualification}) - {doc.workingLocation}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {!isAddingNew ? (
              <button
                onClick={() => {
                  setIsAddingNew(true);
                  setIsEditing(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold rounded-lg text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Register New Doctor
              </button>
            ) : (
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Cancel New Doctor
              </button>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {saveSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Doctor profile saved and updated in persistent database.
            </div>
          )}

          {/* VIEW / EDIT CURRENT DOCTOR */}
          {!isAddingNew ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    Doctor ID: {formData.id}
                  </span>
                  <span className="text-xs text-slate-500">
                    Status: <strong className="text-slate-700">{formData.professionalStatus}</strong>
                  </span>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 border border-teal-300 bg-teal-50/50 hover:bg-teal-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    Edit Doctor Information
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setFormData(currentDoctor);
                      setIsEditing(false);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Professional Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Specialisation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.specialisation}
                        onChange={(e) => setFormData({ ...formData, specialisation: e.target.value })}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Registration Number (GSCPT / IAP / State Council)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. GSCPT/MPT/2020/XXXX (Optional / Editable)"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                      <span className="text-[10px] text-slate-400">
                        Leave blank if pending or enter your official state registration number.
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Hospital / Clinic Name
                      </label>
                      <input
                        type="text"
                        value={formData.hospitalClinicName}
                        onChange={(e) => setFormData({ ...formData, hospitalClinicName: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Clinic Address
                      </label>
                      <input
                        type="text"
                        value={formData.clinicAddress}
                        onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Contact Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter doctor contact number"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="doctor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Working Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.workingLocation}
                        onChange={(e) => setFormData({ ...formData, workingLocation: e.target.value })}
                        required
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Professional Experience
                      </label>
                      <input
                        type="text"
                        value={formData.professionalExperience}
                        onChange={(e) => setFormData({ ...formData, professionalExperience: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      {saving ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          Save Profile Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* READONLY PROFILE CARD */
                <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-xl border border-slate-200 p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{formData.fullName}</h3>
                      <p className="text-sm font-semibold text-teal-800">
                        {formData.designation} — {formData.qualification}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Specialisation: <span className="font-medium text-slate-900">{formData.specialisation}</span>
                      </p>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-xl border border-teal-200 shadow-sm text-right shrink-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Practitioner Status</div>
                      <div className="text-sm font-bold text-slate-800">{formData.professionalStatus}</div>
                    </div>
                  </div>

                  {/* Grid of Profile Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <Building className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-500">Hospital / Clinic</div>
                        <div className="font-bold text-slate-800 text-sm mt-0.5">{formData.hospitalClinicName || 'Not Set'}</div>
                        <div className="text-slate-500 mt-0.5">{formData.clinicAddress || 'Vadodara, Gujarat'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-500">Working Location</div>
                        <div className="font-bold text-slate-800 text-sm mt-0.5">{formData.workingLocation}</div>
                        <div className="text-slate-500 mt-0.5">Practice Region: Gujarat</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <Award className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-500">Registration Number</div>
                        <div className="font-bold text-slate-800 text-sm mt-0.5">
                          {formData.registrationNumber || (
                            <span className="text-slate-400 font-normal italic">
                              Not Provided (Click 'Edit' to enter)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <Calendar className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-500">Experience & Track Record</div>
                        <div className="font-bold text-slate-800 text-sm mt-0.5">{formData.professionalExperience}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-500">Contact Number</div>
                        <div className="font-bold text-slate-800 text-sm mt-0.5">
                          {formData.contactNumber || (
                            <span className="text-slate-400 font-normal italic">
                              Not Provided (Editable)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-500">Email Address</div>
                        <div className="font-bold text-slate-800 text-sm mt-0.5">
                          {formData.email || (
                            <span className="text-slate-400 font-normal italic">
                              Not Provided (Editable)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CREATE NEW DOCTOR FORM */
            <form onSubmit={handleCreateNewDoctor} className="space-y-4 text-xs">
              <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl text-teal-900">
                <h4 className="font-bold text-sm">Register a New Physiotherapist / Doctor</h4>
                <p className="text-[11px] text-teal-700 mt-1">
                  Each doctor maintains an isolated patient database. Data is strictly separated between practitioners.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Doctor Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={newDoctorForm.fullName}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, fullName: e.target.value })}
                    required
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Professional Designation
                  </label>
                  <input
                    type="text"
                    value={newDoctorForm.designation}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, designation: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BPT, MPT (Neuro)"
                    value={newDoctorForm.qualification}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, qualification: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Specialisation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Orthopaedic / Sports / Neuro"
                    value={newDoctorForm.specialisation}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, specialisation: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Working Location
                  </label>
                  <input
                    type="text"
                    value={newDoctorForm.workingLocation}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, workingLocation: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Hospital / Clinic Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shanti Physiotherapy Centre"
                    value={newDoctorForm.hospitalClinicName}
                    onChange={(e) => setNewDoctorForm({ ...newDoctorForm, hospitalClinicName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !newDoctorForm.fullName.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {saving ? 'Creating Profile...' : 'Create & Switch to Doctor'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <div>
            ClinicaAI Multi-Doctor Data Isolation Engine · Gujarat Clinical Healthcare Network
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
