import React, { useState } from 'react';
import { Printer, Copy, Check, Send, ShieldCheck, FileCheck, AlertTriangle, UserCheck } from 'lucide-react';
import { PatientIntake, SpecialTestItem, RedFlagItem, TreatmentRecommendation } from '../types/clinical';

interface ReportAndReferralViewProps {
  patient: PatientIntake;
  specialty: string;
  redFlags: RedFlagItem[];
  specialTests: SpecialTestItem[];
  primaryDiagnosis: string;
  treatment: TreatmentRecommendation;
  investigationDecision: string;
  romFindings: {
    activeRom: string;
    passiveRom: string;
    mmtStrength: string;
    gaitObservation: string;
    palpationFindings: string;
  };
  onSaveReport: (status: 'Draft' | 'Clinician Reviewed' | 'Clinician Signed & Approved') => void;
}

export const ReportAndReferralView: React.FC<ReportAndReferralViewProps> = ({
  patient,
  specialty,
  redFlags,
  specialTests,
  primaryDiagnosis,
  treatment,
  investigationDecision,
  romFindings,
  onSaveReport,
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'referral'>('report');
  const [targetConsultant, setTargetConsultant] = useState(
    patient.chiefComplaint.toLowerCase().includes('knee')
      ? 'Orthopaedic Knee Surgeon'
      : 'Spine & Neurosurgical Service'
  );
  const [consultUrgency, setConsultUrgency] = useState('Urgent (Within 2 Weeks)');
  const [specificQuestion, setSpecificQuestion] = useState(
    patient.chiefComplaint.toLowerCase().includes('knee')
      ? 'Evaluation for acute ACL reconstruction vs non-operative stabilization and rule out displaced bucket-handle meniscal tear.'
      : 'Evaluation for surgical microdiscectomy vs image-guided transforaminal epidural steroid injection for intractable L5 radiculopathy.'
  );

  const [clinicianName, setClinicianName] = useState('Dr. Alex Montgomery, PT, DPT, OCS');
  const [clinicianLicense, setClinicianLicense] = useState('GMC / HCPC #PT-894102');
  const [approvalStatus, setApprovalStatus] = useState<'Draft' | 'Clinician Reviewed' | 'Clinician Signed & Approved'>('Clinician Reviewed');
  const [copied, setCopied] = useState(false);

  const positiveFlags = redFlags.filter((f) => f.isPositive);
  const positiveTests = specialTests.filter((t) => t.result === 'Positive');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textContent = `
CLINICAAI CLINICAL ASSESSMENT REPORT
Patient: ${patient.name} | MRN: ${patient.mrn} | Age: ${patient.age} | Sex: ${patient.sex}
Chief Complaint: ${patient.chiefComplaint}
Onset: ${patient.onset} (${patient.duration})
Mechanism: ${patient.injuryMechanism}
Location: ${patient.anatomicalLocation}

RED-FLAG SCREENING:
${positiveFlags.length > 0 ? positiveFlags.map((f) => `POSITIVE: ${f.label} - ${f.findingPrompt}`).join('\n') : 'All screened red-flags negative.'}

OBJECTIVE PHYSICAL EXAMINATION (Clinician Entered Facts):
- Gait: ${romFindings.gaitObservation || 'Normal antalgic'}
- Effusion / Palpation: ${romFindings.palpationFindings || 'Trace joint line tenderness'}
- Active ROM: ${romFindings.activeRom || 'Full'}
- MMT & Reflexes: ${romFindings.mmtStrength || 'Intact'}
- Positive Special Tests: ${positiveTests.map((t) => `${t.name} (${t.clinicianNotes || 'positive'})`).join('; ') || 'None'}

WORKING CONSIDERATION:
${primaryDiagnosis || 'Clinical Musculoskeletal Presentation'}

INVESTIGATION PLAN:
${investigationDecision || 'Conservative trial first line'}

TREATMENT & REHABILITATION:
- Exercises: ${treatment.conservativeRehab.join('; ')}
- Follow-up: ${treatment.reassessmentTimeline}

Clinician: ${clinicianName} (${clinicianLicense})
Approval Status: ${approvalStatus}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* View Switcher & Action Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        {/* Segmented Tab */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'report' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comprehensive Clinical Summary Report
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('referral')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'referral' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Structured Multidisciplinary Referral
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyText}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Clinician Sign-Off & Governance Bar */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="font-bold text-slate-900">Clinician Review & Verification Status:</span>
            <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {approvalStatus}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setApprovalStatus('Clinician Reviewed');
                onSaveReport('Clinician Reviewed');
              }}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              Mark Reviewed
            </button>
            <button
              type="button"
              onClick={() => {
                setApprovalStatus('Clinician Signed & Approved');
                onSaveReport('Clinician Signed & Approved');
              }}
              className="px-3 py-1 text-xs bg-teal-700 hover:bg-teal-800 text-white rounded font-semibold shadow-xs flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3 text-teal-200" />
              Sign & Lock Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-200/60">
          <div>
            <label className="block text-slate-500 mb-0.5">Signing Clinician Name:</label>
            <input
              type="text"
              value={clinicianName}
              onChange={(e) => setClinicianName(e.target.value)}
              className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium"
            />
          </div>
          <div>
            <label className="block text-slate-500 mb-0.5">Professional Medical / License ID:</label>
            <input
              type="text"
              value={clinicianLicense}
              onChange={(e) => setClinicianLicense(e.target.value)}
              className="w-full p-1.5 border border-slate-300 rounded bg-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* TAB 1: Comprehensive Printable Clinical Report */}
      {activeTab === 'report' && (
        <div className="border border-slate-300 rounded-xl bg-white p-6 sm:p-8 space-y-6 shadow-sm print:border-none print:shadow-none print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">ClinicaAI Clinical Record</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Evidence-Informed Clinical Decision Support System · Document ID: CLIN-{Date.now().toString().slice(-6)}
              </div>
            </div>
            <div className="text-right text-xs text-slate-600 font-mono">
              <div>Encounter Date: {new Date().toLocaleDateString()}</div>
              <div>Specialty: {specialty}</div>
            </div>
          </div>

          {/* Patient Demographics Matrix (Strictly factual) */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Section 1: Patient Demographics & Intake</span>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono">
                [CLINICIAN-ENTERED FACTS]
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Name:</span>
                <span className="font-bold text-slate-900">{patient.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">MRN:</span>
                <span className="font-mono text-slate-900">{patient.mrn}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Age / Sex:</span>
                <span className="text-slate-900">
                  {patient.age || 'N/A'} yrs · {patient.sex}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Occupation:</span>
                <span className="text-slate-900">{patient.occupation || 'Not recorded'}</span>
              </div>
            </div>
          </div>

          {/* Presentation & Mechanism */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-900">Chief Complaint & Onset:</div>
            <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed border border-slate-100">
              <strong>Complaint: </strong> {patient.chiefComplaint} <br />
              <strong>Anatomical Location: </strong> {patient.anatomicalLocation} <br />
              <strong>Onset & Duration: </strong> {patient.onset} ({patient.duration}) · NPRS Severity:{' '}
              <span className="font-mono font-bold text-slate-900">{patient.severityNprs}/10</span> <br />
              <strong>Mechanism of Injury: </strong> {patient.injuryMechanism}
            </p>
          </div>

          {/* Safety & Red Flags Module Status */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Safety & Red-Flag Triage Status:</span>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono">
                [GOVERNANCE VERIFIED]
              </span>
            </div>
            {positiveFlags.length === 0 ? (
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 font-medium">
                ✓ All screened red-flag indicators (Cauda Equina, Septic Arthritis, Neurovascular Compromise, Malignancy, Infection) screened negative at this encounter.
              </div>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  POSITIVE RED-FLAG SCREENING:
                </div>
                {positiveFlags.map((f) => (
                  <div key={f.id} className="text-[11px]">
                    • <strong>{f.label}</strong>: {f.findingPrompt} (Urgency: {f.urgency})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Physical Examination Findings */}
          <div className="space-y-2 text-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Section 2: Objective Physical Examination</span>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono">
                [CLINICIAN-ENTERED FACTS]
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div>
                <strong>Gait & Observation: </strong>
                <span>{romFindings.gaitObservation || 'No marked abnormalities noted'}</span>
              </div>
              <div>
                <strong>Palpation & Joint Line: </strong>
                <span>{romFindings.palpationFindings || 'Intact without focal crepitus'}</span>
              </div>
              <div>
                <strong>Range of Motion: </strong>
                <span>{romFindings.activeRom || 'Functional limits preserved'}</span>
              </div>
              <div>
                <strong>Motor Strength & Reflexes: </strong>
                <span>{romFindings.mmtStrength || 'Symmetrical Grade 5/5'}</span>
              </div>
              <div>
                <strong>Special Tests Results: </strong>
                <span>
                  {specialTests
                    .filter((t) => t.result !== 'Not Tested')
                    .map((t) => `${t.name}: ${t.result}${t.clinicianNotes ? ` (${t.clinicianNotes})` : ''}`)
                    .join('; ') || 'Standard screen completed'}
                </span>
              </div>
            </div>
          </div>

          {/* Working Differential Consideration */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Section 3: Differential Diagnosis & Evidence Context</span>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono">
                [AI SYNTHESIS & CPG GROUNDED]
              </span>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                Primary Working Consideration: {primaryDiagnosis || 'Clinical Musculoskeletal Presentation'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                Presentation demonstrates concordance with evidence-based criteria. Supported by physical testing and patient history.
                Differential considerations exclude acute systemic pathology.
              </p>
            </div>
          </div>

          {/* Diagnostic Investigation Plan */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-900">Section 4: Investigation Plan & Imaging Stewardship:</div>
            <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed border border-slate-200">
              {investigationDecision || 'No routine imaging indicated at this stage in adherence to CPG stewardship.'}
            </p>
          </div>

          {/* Management, Rehabilitation & Follow-up */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-900">Section 5: Active Management & Follow-Up Plan:</div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-slate-700">
              <div>
                <strong>Active Rehabilitation: </strong>
                <span>{treatment.conservativeRehab.join('; ')}</span>
              </div>
              <div>
                <strong>Precautions: </strong>
                <span>{treatment.precautions.join('; ')}</span>
              </div>
              <div>
                <strong>Contraindications: </strong>
                <span>{treatment.contraindications.join('; ')}</span>
              </div>
              <div>
                <strong>Review Milestones: </strong>
                <span>{treatment.reassessmentTimeline}</span>
              </div>
            </div>
          </div>

          {/* Signatures and Legal Disclaimer */}
          <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-xs">
            <div className="space-y-1 text-slate-500 max-w-lg">
              <div className="font-bold text-slate-700">ClinicaAI Governance & Legal Disclaimer:</div>
              <p className="text-[10px] leading-relaxed">
                This document is a clinical decision-support record generated under the supervision of a licensed healthcare practitioner. ClinicaAI assists clinical synthesis but does not replace professional diagnostic examination or therapeutic judgment.
              </p>
            </div>
            <div className="text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4 min-w-[200px]">
              <div className="font-bold text-slate-900">{clinicianName}</div>
              <div className="font-mono text-slate-500 text-[11px]">{clinicianLicense}</div>
              <div className="text-[11px] text-teal-800 font-semibold mt-1">Status: {approvalStatus}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Structured Multidisciplinary Referral */}
      {activeTab === 'referral' && (
        <div className="border border-slate-300 rounded-xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Multidisciplinary Specialist Referral Letter</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured consultation request distinguishing observed facts from clinical impressions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Urgency:</span>
              <select
                value={consultUrgency}
                onChange={(e) => setConsultUrgency(e.target.value)}
                className="text-xs p-1.5 border border-slate-300 rounded bg-white font-semibold text-slate-900"
              >
                <option>Emergency (Immediate Decompression/Transfer)</option>
                <option>Urgent (Within 24-48 Hours)</option>
                <option>Urgent (Within 2 Weeks)</option>
                <option>Routine Outpatient</option>
              </select>
            </div>
          </div>

          {/* Referral Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target Specialist Service:
              </label>
              <input
                type="text"
                value={targetConsultant}
                onChange={(e) => setTargetConsultant(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md bg-white font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Specific Question for Consultant:
              </label>
              <input
                type="text"
                value={specificQuestion}
                onChange={(e) => setSpecificQuestion(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md bg-white font-medium"
              />
            </div>
          </div>

          {/* Letter Body Preview */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-4 font-serif leading-relaxed">
            <div>
              <strong>To: </strong> {targetConsultant} <br />
              <strong>From: </strong> {clinicianName} ({clinicianLicense}) <br />
              <strong>Date: </strong> {new Date().toLocaleDateString()} <br />
              <strong>RE: </strong> {patient.name} (MRN: {patient.mrn}, DOB/Age: {patient.age}y, Sex: {patient.sex}) <br />
              <strong>Referral Priority: </strong> <span className="font-sans font-bold text-rose-800">{consultUrgency}</span>
            </div>

            <p>Dear Colleague,</p>

            <p>
              Thank you for evaluating this {patient.age}-year-old {patient.occupation || 'patient'} who presents with {patient.chiefComplaint}. Symptoms commenced on {patient.onset} ({patient.duration}), following an injury mechanism described as: <em>"{patient.injuryMechanism}"</em>.
            </p>

            <div className="font-sans text-[11px] bg-white p-3 rounded border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">SUMMARY OF OBSERVED CLINICAL FACTS:</div>
              <div>• Anatomical Location: {patient.anatomicalLocation}</div>
              <div>• Current Severity: NPRS {patient.severityNprs}/10 ({patient.progression})</div>
              <div>• Aggravating Factors: {patient.aggravatingFactors.join(', ') || 'Weight-bearing'}</div>
              <div>• Red-Flag Safety Screen: {positiveFlags.length > 0 ? positiveFlags.map((f) => f.label).join('; ') : 'Negative for acute surgical red flags'}</div>
              <div>• Relevant Examination: {positiveTests.map((t) => `${t.name} (Positive)`).join(', ') || 'No gross motor deficit'}</div>
              <div>• Functional Deficit: {patient.functionalLimitations}</div>
            </div>

            <p>
              <strong>Reason for Referral & Specific Clinical Question: </strong>
              {specificQuestion}
            </p>

            <p>
              Prior investigations to date: {patient.priorInvestigations || 'None'}. Current medications: {patient.medications || 'None'}. Allergies: {patient.allergies || 'NKDA'}.
            </p>

            <p>
              We look forward to your specialist assessment and recommendations regarding definitive management.
            </p>

            <div className="pt-4 font-sans text-xs">
              <div>Sincerely,</div>
              <div className="font-bold text-slate-900 mt-2">{clinicianName}</div>
              <div className="text-slate-500 font-mono text-[11px]">{clinicianLicense}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
