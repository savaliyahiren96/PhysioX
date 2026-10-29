import React from 'react';
import { User, Activity, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { PatientIntake, SpecialtyId, SpecialtyConfig } from '../types/clinical';
import { SPECIALTIES_CONFIG } from '../data/clinicalKnowledge';
import { AnatomicalLocator } from './AnatomicalLocator';

interface PatientIntakeFormProps {
  patient: PatientIntake;
  specialty: SpecialtyId;
  onChangeSpecialty: (spec: SpecialtyId) => void;
  onChangePatient: (updated: Partial<PatientIntake>) => void;
  onProceed: () => void;
}

export const PatientIntakeForm: React.FC<PatientIntakeFormProps> = ({
  patient,
  specialty,
  onChangeSpecialty,
  onChangePatient,
  onProceed,
}) => {
  // Automatic BMI computation
  const bmi =
    patient.heightCm && patient.weightKg
      ? ((patient.weightKg as number) / Math.pow((patient.heightCm as number) / 100, 2)).toFixed(1)
      : null;

  const complaintCategory: 'Knee Pain' | 'Low Back Pain' | 'Other' =
    patient.chiefComplaint.toLowerCase().includes('knee')
      ? 'Knee Pain'
      : patient.chiefComplaint.toLowerCase().includes('back') || patient.chiefComplaint.toLowerCase().includes('spine')
      ? 'Low Back Pain'
      : 'Knee Pain';

  return (
    <div className="space-y-6">
      {/* Specialty Selector Strip */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Target Clinical Specialty Assessment Module:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SPECIALTIES_CONFIG.map((spec) => {
            const isSelected = specialty === spec.id;

            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => onChangeSpecialty(spec.id)}
                className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                  isSelected
                    ? 'border-teal-700 bg-teal-50/70 text-teal-950 font-bold shadow-xs ring-1 ring-teal-700/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="truncate">{spec.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {spec.mvpReady ? 'MVP Ready' : 'Extensible'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Demographics & Measurements */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
          <User className="w-4 h-4 text-teal-700" />
          <span>Patient Demographics & Body Measurements (Allows Unknown)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Patient Full Name / ID:</label>
            <input
              type="text"
              value={patient.name}
              onChange={(e) => onChangePatient({ name: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-teal-700"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Medical Record Number (MRN):</label>
            <input
              type="text"
              value={patient.mrn}
              onChange={(e) => onChangePatient({ mrn: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Age (Years):</label>
            <input
              type="number"
              value={patient.age}
              placeholder="Unknown"
              onChange={(e) => onChangePatient({ age: e.target.value ? parseInt(e.target.value, 10) : '' })}
              className="w-full p-2 border border-slate-300 rounded bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Clinically Relevant Sex:</label>
            <select
              value={patient.sex}
              onChange={(e) => onChangePatient({ sex: e.target.value as any })}
              className="w-full p-2 border border-slate-300 rounded bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Intersex">Intersex</option>
              <option value="Not Disclosed">Not Disclosed</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Height (cm):</label>
            <input
              type="number"
              placeholder="e.g. 175"
              value={patient.heightCm}
              onChange={(e) => onChangePatient({ heightCm: e.target.value ? parseFloat(e.target.value) : '' })}
              className="w-full p-2 border border-slate-300 rounded bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Weight (kg):</label>
            <input
              type="number"
              placeholder="e.g. 74"
              value={patient.weightKg}
              onChange={(e) => onChangePatient({ weightKg: e.target.value ? parseFloat(e.target.value) : '' })}
              className="w-full p-2 border border-slate-300 rounded bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Calculated BMI:</label>
            <div className="w-full p-2 border border-slate-200 rounded bg-slate-50 font-mono text-slate-800 font-semibold">
              {bmi ? `${bmi} kg/m²` : '— (Pending Height/Weight)'}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Occupation:</label>
            <input
              type="text"
              value={patient.occupation}
              placeholder="e.g. Electrician, Desk worker"
              onChange={(e) => onChangePatient({ occupation: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded bg-white"
            />
          </div>
        </div>
      </div>

      {/* Chief Complaint & Anatomical Symptom Location */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
          <Activity className="w-4 h-4 text-teal-700" />
          <span>Chief Complaint & Anatomical Symptom Localization</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Chief Complaint (Presentation Summary):
            </label>
            <input
              type="text"
              value={patient.chiefComplaint}
              onChange={(e) => onChangePatient({ chiefComplaint: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded bg-white focus:outline-teal-700 font-medium"
              placeholder="e.g. Acute right knee pain with audible pop and hemarthrosis after pivot"
            />
          </div>

          {/* Interactive Anatomical Topography Picker */}
          <AnatomicalLocator
            selectedLocation={patient.anatomicalLocation}
            onSelectLocation={(loc) => onChangePatient({ anatomicalLocation: loc })}
            complaintCategory={complaintCategory}
          />
        </div>
      </div>

      {/* Onset, Severity, Mechanism & Functional Limits */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Timeline, Severity & Biomechanical Mechanism
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Onset Category:</label>
            <select
              value={patient.onset}
              onChange={(e) => onChangePatient({ onset: e.target.value as any })}
              className="w-full p-2 border border-slate-300 rounded bg-white"
            >
              <option value="Acute (< 48 hrs)">Acute (&lt; 48 hrs)</option>
              <option value="Subacute (2 - 6 weeks)">Subacute (2 - 6 weeks)</option>
              <option value="Chronic (> 3 months)">Chronic (&gt; 3 months)</option>
              <option value="Acute on Chronic">Acute on Chronic</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Symptom Duration:</label>
            <input
              type="text"
              value={patient.duration}
              onChange={(e) => onChangePatient({ duration: e.target.value })}
              placeholder="e.g. 24 hours, 6 weeks"
              className="w-full p-2 border border-slate-300 rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Pain Severity NPRS / VAS (0-10): <span className="font-mono text-teal-800 font-bold">{patient.severityNprs}/10</span>
            </label>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={patient.severityNprs}
              onChange={(e) => onChangePatient({ severityNprs: parseInt(e.target.value, 10) })}
              className="w-full mt-2 accent-teal-700"
            />
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Specific Injury Mechanism (or Insidious Triggers):
            </label>
            <textarea
              rows={2}
              value={patient.injuryMechanism}
              onChange={(e) => onChangePatient({ injuryMechanism: e.target.value })}
              placeholder="e.g. Non-contact rapid change of direction with knee in valgus and foot planted..."
              className="w-full p-2 border border-slate-300 rounded bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Functional Limitations:</label>
              <textarea
                rows={2}
                value={patient.functionalLimitations}
                onChange={(e) => onChangePatient({ functionalLimitations: e.target.value })}
                placeholder="e.g. Cannot descend stairs, cannot squat, sitting limited to 20 minutes..."
                className="w-full p-2 border border-slate-300 rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Patient Meaningful Goals:</label>
              <textarea
                rows={2}
                value={patient.patientGoals}
                onChange={(e) => onChangePatient({ patientGoals: e.target.value })}
                placeholder="e.g. Return to playing football within 9 months, sleep through the night pain-free..."
                className="w-full p-2 border border-slate-300 rounded bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical History, Comorbidities, Medications & Allergies */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs text-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Medical History, Medications & Privacy-Conscious Safeguards
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Current Medications:</label>
            <input
              type="text"
              value={patient.medications}
              onChange={(e) => onChangePatient({ medications: e.target.value })}
              placeholder="e.g. Naproxen 500mg, Ramipril 5mg"
              className="w-full p-2 border border-slate-300 rounded bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Allergies:</label>
            <input
              type="text"
              value={patient.allergies}
              onChange={(e) => onChangePatient({ allergies: e.target.value })}
              placeholder="e.g. Penicillin, NSAID-induced asthma, NKDA"
              className="w-full p-2 border border-slate-300 rounded bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Prior Investigations / Treatments:</label>
            <input
              type="text"
              value={patient.priorInvestigations}
              onChange={(e) => onChangePatient({ priorInvestigations: e.target.value })}
              placeholder="e.g. Urgent care X-rays negative for fracture"
              className="w-full p-2 border border-slate-300 rounded bg-white"
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Next step triggers mandatory red-flag safety screening before routine testing.</span>
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
        >
          <span>Continue to Red-Flag Safety Screening</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
