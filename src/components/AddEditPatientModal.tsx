import React, { useState } from 'react';
import {
  X,
  UserPlus,
  Save,
  Activity,
  CheckCircle,
  FileText,
  Sparkles,
  Zap,
} from 'lucide-react';
import { DoctorProfile, DoctorPatient, PatientGender, PatientStatus } from '../types/doctorPatient';
import { PROBABLE_CONDITIONS_LIBRARY } from '../data/probableConditionsData';

interface AddEditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDoctor: DoctorProfile;
  onPatientCreated: (patient: DoctorPatient) => void;
}

export const AddEditPatientModal: React.FC<AddEditPatientModalProps> = ({
  isOpen,
  onClose,
  activeDoctor,
  onPatientCreated,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<PatientGender>('Not Specified');
  const [location, setLocation] = useState('Pipaliya');
  const [contactNumber, setContactNumber] = useState('');
  const [registrationDate, setRegistrationDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('Post-operative TKR');
  const [presentingComplaints, setPresentingComplaints] = useState(
    'Pain during knee bending, limping gait associated with previous antalgic gait and difficulty in sit-to-stand.'
  );
  const [medicalHistory, setMedicalHistory] = useState('None reported');
  const [surgicalHistory, setSurgicalHistory] = useState('None reported');
  const [status, setStatus] = useState<PatientStatus>('Active');

  // Clinical Assessment fields
  const [romFindings, setRomFindings] = useState('');
  const [mmtFindings, setMmtFindings] = useState('');
  const [gaitAbnormality, setGaitAbnormality] = useState('');
  const [mobilityTransfer, setMobilityTransfer] = useState('');
  const [balanceScore, setBalanceScore] = useState('');
  const [specialTests, setSpecialTests] = useState('');
  const [outcomeScore, setOutcomeScore] = useState('');
  const [redFlagsScreening, setRedFlagsScreening] = useState('Negative');
  const [clinicalImpressionNotes, setClinicalImpressionNotes] = useState('');

  // PT Management fields
  const [currentRehabPhase, setCurrentRehabPhase] = useState('Initial Active Rehabilitation');
  const [shortTermGoals, setShortTermGoals] = useState('');
  const [longTermGoals, setLongTermGoals] = useState('');
  const [interventions, setInterventions] = useState('');
  const [exerciseDosage, setExerciseDosage] = useState('3 sets of 10-12 reps, twice daily');
  const [frequencyWeekly, setFrequencyWeekly] = useState('3 sessions/week');
  const [precautions, setPrecautions] = useState('');

  const [saving, setSaving] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState('');

  if (!isOpen) return null;

  // Handle auto-prefill from the 6 library conditions
  const handleApplyPreset = (condId: string) => {
    setSelectedPresetId(condId);
    const cond = PROBABLE_CONDITIONS_LIBRARY.find((c) => c.id === condId);
    if (!cond) return;

    setPrimaryDiagnosis(cond.conditionName);
    setPresentingComplaints(cond.clinicalPresentation);
    setGaitAbnormality(cond.gaitAnalysis.typicalPattern);
    setRomFindings(
      cond.romExpectations.map((r) => `${r.movement}: ${r.expectedRestriction} (Goal: ${r.rehabGoal})`).join('; ')
    );
    setMmtFindings(
      cond.mmtStrengthAssessment.map((m) => `${m.muscleGroup}: ${m.typicalImpairment}`).join('; ')
    );
    setMobilityTransfer(
      cond.functionalMobilityTransfers.map((f) => `${f.testName}: ${f.expectedPatientPerformance}`).join('; ')
    );
    setSpecialTests(
      cond.specialTests.map((t) => `${t.testName} (${t.targetStructure})`).join('; ')
    );
    setOutcomeScore(
      cond.outcomeMeasures.map((o) => `${o.toolName} (Target: ${o.targetScore})`).join('; ')
    );
    setCurrentRehabPhase('Subacute Rehabilitation & Transfer Retraining');
    setShortTermGoals(cond.physiotherapyGoals.subacutePhase.slice(0, 2).join('; '));
    setLongTermGoals(cond.physiotherapyGoals.functionalPhase.slice(0, 2).join('; '));
    setInterventions(
      [
        'Targeted active/active-assisted joint mobilizations',
        'Kinetic chain strengthening exercises',
        'Functional sit-to-stand biomechanical retraining',
        'Auditory-cued gait re-education',
      ].join('\n')
    );
    setPrecautions(cond.rehabilitationConsiderations.precautionFlags.join('; '));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !primaryDiagnosis.trim()) return;

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        age: age ? Number(age) : '',
        gender,
        location: location.trim(),
        contactNumber: contactNumber.trim(),
        doctorId: activeDoctor.id,
        doctorAssigned: activeDoctor.fullName,
        registrationDate,
        primaryDiagnosis: primaryDiagnosis.trim(),
        presentingComplaints: presentingComplaints.trim(),
        medicalHistory: medicalHistory.trim(),
        surgicalHistory: surgicalHistory.trim(),
        status,
        clinicalAssessment: {
          romFindings,
          mmtFindings,
          gaitAbnormality,
          mobilityTransfer,
          balanceScore,
          specialTests,
          outcomeScore,
          redFlagsScreening,
          clinicalImpressionNotes,
        },
        probableConditions: [
          {
            conditionName: primaryDiagnosis.trim(),
            status: 'Confirmed',
            clinicalRationale: 'Primary condition established at intake registration.',
            evidenceLevel: 'Strong Evidence',
          },
        ],
        physiotherapyManagement: {
          currentRehabPhase,
          shortTermGoals,
          longTermGoals,
          interventions: interventions.split('\n').filter((x) => x.trim()),
          exerciseDosage,
          frequencyWeekly,
          precautions,
          contraindications: '',
          progressionCriteria: '',
        },
      };

      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        onPatientCreated(created);
        onClose();
      }
    } catch (e) {
      console.error('Error creating patient:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Register New Patient</h2>
              <p className="text-xs text-teal-200">
                Assigned to: <strong className="text-white">{activeDoctor.fullName}</strong> ({activeDoctor.qualification}) · {activeDoctor.workingLocation}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rapid Condition Preset Banner */}
        <div className="bg-teal-50/70 border-b border-teal-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span className="font-semibold text-teal-950">Quick-Fill from Probable Conditions Library:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {PROBABLE_CONDITIONS_LIBRARY.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleApplyPreset(c.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedPresetId === c.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white border border-teal-300 text-teal-800 hover:bg-teal-100/50'
                }`}
              >
                {c.conditionName}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Section 1: Demographics */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
              1. Patient Demographics & Doctor Assignment
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rameshbhai Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 font-semibold bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  placeholder="e.g. 58"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as PatientGender)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white font-medium"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Not Specified">Not Specified (Keep Editable)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location / Village</label>
                <input
                  type="text"
                  placeholder="e.g. Pipaliya / Khandha"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contact Phone (Optional)</label>
                <input
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Registration Date</label>
                <input
                  type="date"
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assigned Doctor</label>
                <input
                  type="text"
                  value={activeDoctor.fullName}
                  disabled
                  className="w-full border border-slate-200 rounded-lg p-2 bg-slate-100 text-slate-600 font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PatientStatus)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white font-medium text-teal-800"
                >
                  <option value="Active">Active</option>
                  <option value="Under Rehabilitation">Under Rehabilitation</option>
                  <option value="Awaiting Follow-up">Awaiting Follow-up</option>
                  <option value="Discharged">Discharged</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Diagnosis & Complaints */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
              2. Primary Diagnosis & Presenting Complaints
            </h4>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Primary Diagnosis <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Post-operative Total Knee Replacement (TKR)"
                value={primaryDiagnosis}
                onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2 font-bold text-teal-900 text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Presenting Clinical Complaints</label>
              <textarea
                rows={2}
                placeholder="Pain during knee bending, limping gait associated with previous antalgic gait..."
                value={presentingComplaints}
                onChange={(e) => setPresentingComplaints(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Medical History</label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension, Diabetes, or None"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Surgical History</label>
                <input
                  type="text"
                  placeholder="e.g. Left cemented TKR 6 weeks ago"
                  value={surgicalHistory}
                  onChange={(e) => setSurgicalHistory(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Baseline Clinical Assessment */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
              3. Baseline Clinical Physical Assessment
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">ROM Findings</label>
                <textarea
                  rows={2}
                  placeholder="Knee Flexion: 85°; Extension: -8° lag..."
                  value={romFindings}
                  onChange={(e) => setRomFindings(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">MMT Strength Findings</label>
                <textarea
                  rows={2}
                  placeholder="Quadriceps: 3+/5; Gluteus Medius: 3+/5..."
                  value={mmtFindings}
                  onChange={(e) => setMmtFindings(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Gait Biomechanics Abnormality</label>
                <textarea
                  rows={2}
                  placeholder="Antalgic stiff-knee gait with trunk sway..."
                  value={gaitAbnormality}
                  onChange={(e) => setGaitAbnormality(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Functional Mobility & Sit-to-Stand</label>
                <textarea
                  rows={2}
                  placeholder="30s Chair Stand: 5 reps with arm push-off..."
                  value={mobilityTransfer}
                  onChange={(e) => setMobilityTransfer(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Initial Physiotherapy Plan */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
              4. Initial Physiotherapy Management Plan
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rehabilitation Phase</label>
                <input
                  type="text"
                  value={currentRehabPhase}
                  onChange={(e) => setCurrentRehabPhase(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs font-semibold text-teal-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Session Frequency</label>
                <input
                  type="text"
                  value={frequencyWeekly}
                  onChange={(e) => setFrequencyWeekly(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Short-Term Goal (2-4 Weeks)</label>
                <input
                  type="text"
                  placeholder="e.g. Knee flexion >= 105° and 0° extension"
                  value={shortTermGoals}
                  onChange={(e) => setShortTermGoals(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Long-Term Functional Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Independent sit-to-stand without armrest push"
                  value={longTermGoals}
                  onChange={(e) => setLongTermGoals(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Interventions / Exercises (One per line)
                </label>
                <textarea
                  rows={2}
                  value={interventions}
                  onChange={(e) => setInterventions(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Registering Patient...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
