import React, { useState } from 'react';
import { MDTCaseDiscussionRecord } from '../types/clinical';
import {
  Users,
  MessageSquare,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';

const DEMO_MDT_CASES: MDTCaseDiscussionRecord[] = [
  {
    id: 'mdt-case-01',
    caseTitle: 'Complex L5 Pars Stress Fracture with Bowling Spikes in 22M Elite Cricket Pacer',
    patientId: 'PT-CRIC-2201',
    patientDemographicsSummary: '22-year-old Male, Right-Arm Fast Bowler (142 km/h), National/IPL Academy Squad',
    primaryConcernOrPresentation: 'Right lower back aching during delivery stride non-bowling side extension. T2-STIR MRI shows high bone marrow signal intensity in left L5 pars interarticularis (impending complete fracture).',
    chairperson: 'Dr. Vikram Malhotra, MS (Ortho), Head of Sports Medicine & Spine',
    meetingDate: '29 October 2026',
    teamInputs: [
      {
        role: 'Orthopaedic Surgeon',
        name: 'Dr. Vikram Malhotra, MS (Ortho), MCh',
        qualifications: 'Senior Consultant Spine Surgeon',
        specialtyInputSummary: 'CT confirms stress reaction with incomplete hairline cortical breach. Completely stable mechanically. Absolute indication for non-operative management with complete bowling cessation for 10–12 weeks. Surgical fixation not indicated.',
        recommendedNextActions: ['Rigid cessation of bowling and high-speed running', 'Repeat low-dose CT/MRI at 10 weeks before bowling clearance'],
        consensusAgreement: 'Agreed',
      },
      {
        role: 'Consultant Physiotherapist',
        name: 'Priya Sharma, MPT (Sports), CMP',
        qualifications: 'Lead Musculoskeletal Physiotherapist',
        specialtyInputSummary: 'Identified severe thoracic rotation stiffness (left rotation 28° vs right 42°) and Glenohumeral Internal Rotation Deficit (GIRD) of 22°. The lumbar spine is excessively rotating to compensate for stiff thoracic cage and shoulder.',
        recommendedNextActions: ['Daily thoracic spine open-book and foam roller extensions', 'Sleeper stretch and posterior capsule release', 'McGill Big 3 core endurance in neutral lordosis'],
        consensusAgreement: 'Agreed',
      },
      {
        role: 'Musculoskeletal Radiologist',
        name: 'Dr. Anand Deshmukh, MD (Radiology)',
        qualifications: 'Consultant MSK Radiologist',
        specialtyInputSummary: 'MRI STIR sequence shows grade 2 bone marrow edema. No facet joint effusion, no disc extrusion or nerve root impingement. Good healing prognosis.',
        recommendedNextActions: ['Follow-up MRI with STIR sequences to track resolution of bone edema'],
        consensusAgreement: 'Agreed',
      },
      {
        role: 'Strength & Conditioning Specialist',
        name: 'Coach Rajesh Nair, CSCS, ASCA Level 3',
        qualifications: 'Head of Physical Preparation',
        specialtyInputSummary: 'Acute:Chronic Workload Ratio spiked to 1.82 two weeks ago due to consecutive tournament matches (bowling 62 overs in 8 days). Delivery stride video shows mixed action with 32° counter-rotation.',
        recommendedNextActions: ['Rebuild hip-dominant hinging and unilateral single-leg landing stiffness', 'Biomechanical action modification to front-on bowling to eliminate counter-rotation'],
        consensusAgreement: 'Agreed',
      },
      {
        role: 'Sports Dietitian',
        name: 'Ananya Sen, MSc (Sports Nutrition), RD',
        qualifications: 'Performance Nutritionist',
        specialtyInputSummary: 'Baseline serum 25-OH Vitamin D is severely deficient at 12.4 ng/mL. Inadequate calcium intake (< 600 mg/day). Low energy availability during double-match weeks.',
        recommendedNextActions: ['Therapeutic cholecalciferol (Vitamin D3) 60,000 IU weekly for 8 weeks', 'Add 200g fortified curd and ragi mudde to achieve 1,200 mg daily elemental calcium', 'Ensure +300 kcal energy surplus to support bone matrix anabolism'],
        consensusAgreement: 'Agreed',
      },
    ],
    finalConsensusActionPlan: 'Consensus reached for strict 10-week non-bowling rehabilitation. Immediate Vitamin D3 repletion, intensive thoracic and hip mobility, core neutral-spine endurance, and high-protein bone healing nutrition plan. Clearance for Stage 2 bowling walk-throughs conditioned on STIR MRI resolution.',
    monitoringMilestones: [
      'Week 4: Zero resting pain and normal daily mobility',
      'Week 8: Symmetrical thoracic rotation >= 40° bilateral and pain-free Stork test',
      'Week 10: Repeat MRI confirmation of pars bone edema resolution',
      'Week 12: Controlled shadow bowling off 3-step approach',
    ],
  },
];

export const MultidisciplinaryCaseView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(DEMO_MDT_CASES[0].id);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const activeCase = DEMO_MDT_CASES.find((c) => c.id === selectedCaseId) || DEMO_MDT_CASES[0];

  const handleCopySummary = () => {
    const text = `
CLINICAAI MULTIDISCIPLINARY CASE CONFERENCE SUMMARY
Case: ${activeCase.caseTitle}
Chairperson: ${activeCase.chairperson} | Date: ${activeCase.meetingDate}
Patient: ${activeCase.patientDemographicsSummary}
Primary Concern: ${activeCase.primaryConcernOrPresentation}

SPECIALIST TEAM INPUTS:
${activeCase.teamInputs
  .map(
    (t) => `
[${t.role.toUpperCase()}] - ${t.name} (${t.qualifications})
Input: ${t.specialtyInputSummary}
Actions: ${t.recommendedNextActions.join('; ')}
Consensus: ${t.consensusAgreement}
`
  )
  .join('\n')}

FINAL CONSENSUS ACTION PLAN:
${activeCase.finalConsensusActionPlan}

MONITORING MILESTONES:
${activeCase.monitoringMilestones.map((m) => ` - ${m}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Multidisciplinary Team (MDT) Clinical Case Discussions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Specialist Case Conference & Collaborative Consensus
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Structured case discussions between Orthopaedic Surgeons, Physiotherapists, Sports Physicians, S&C Coaches, Sports Dietitians, and Radiologists. Synthesizes clinical observations, investigation reviews, and consensus action plans.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
        >
          {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
          <span>{copiedSummary ? 'Summary Copied' : 'Copy MDT Consensus'}</span>
        </button>
      </div>

      {/* Case Details Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono font-bold text-indigo-700">CASE ID: {activeCase.patientId}</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{activeCase.caseTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{activeCase.patientDemographicsSummary}</p>
          </div>
          <div className="text-xs text-slate-500 text-right">
            <div><strong>Chair:</strong> {activeCase.chairperson}</div>
            <div className="font-mono text-slate-400">{activeCase.meetingDate}</div>
          </div>
        </div>

        {/* Primary Presentation */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
          <strong className="text-slate-900">Clinical Presentation & Problem Statement:</strong>
          <p className="mt-1 leading-relaxed">{activeCase.primaryConcernOrPresentation}</p>
        </div>

        {/* Specialist Inputs Grid */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Specialist Contributions & Multidisciplinary Inputs:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCase.teamInputs.map((input, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                      {input.role}
                    </span>
                    <div className="font-bold text-xs text-slate-900">{input.name}</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {input.consensusAgreement}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {input.specialtyInputSummary}
                </p>

                <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-700">
                  <strong className="text-slate-900">Recommended Actions:</strong>
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-600">
                    {input.recommendedNextActions.map((act, aIdx) => (
                      <li key={aIdx}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Consensus Action Plan */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>MDT Unified Consensus & Strategic Action Plan</span>
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {activeCase.finalConsensusActionPlan}
          </p>

          <div className="pt-2 border-t border-emerald-200/60">
            <span className="font-bold text-emerald-900 text-[11px]">Clearance Milestones:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
              {activeCase.monitoringMilestones.map((ms, mIdx) => (
                <div key={mIdx} className="flex items-center gap-1.5 bg-white p-2 rounded border border-emerald-100 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{ms}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
