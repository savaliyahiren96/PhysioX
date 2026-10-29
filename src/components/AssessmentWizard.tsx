import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  HelpCircle,
  Stethoscope,
  BookOpen,
  FileSearch,
  CheckSquare,
  FileText,
  ChevronRight,
  ArrowLeft,
  User,
  AlertTriangle,
} from 'lucide-react';
import {
  PatientIntake,
  SpecialtyId,
  RedFlagItem,
  AdaptiveQuestion,
  SpecialTestItem,
  DifferentialCandidate,
  InvestigationGuidance,
  TreatmentRecommendation,
} from '../types/clinical';
import {
  RED_FLAGS_CATALOG,
  ADAPTIVE_QUESTIONS_CATALOG,
  SPECIAL_TESTS_CATALOG,
  DIFFERENTIALS_CATALOG,
  INVESTIGATIONS_CATALOG,
  TREATMENT_TEMPLATES,
} from '../data/clinicalKnowledge';

import { PatientIntakeForm } from './PatientIntakeForm';
import { RedFlagModule } from './RedFlagModule';
import { AdaptiveHistory } from './AdaptiveHistory';
import { AssessmentEngine } from './AssessmentEngine';
import { DifferentialReview } from './DifferentialReview';
import { InvestigationSupport } from './InvestigationSupport';
import { TreatmentPlanView } from './TreatmentPlanView';
import { ReportAndReferralView } from './ReportAndReferralView';

interface AssessmentWizardProps {
  initialPatient: PatientIntake;
  onExit: () => void;
}

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ initialPatient, onExit }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [specialty, setSpecialty] = useState<SpecialtyId>('physiotherapy');
  const [patient, setPatient] = useState<PatientIntake>(initialPatient);

  // Red Flags State
  const [redFlags, setRedFlags] = useState<RedFlagItem[]>([]);

  // Adaptive Questions State
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>([]);

  // Special Tests State
  const [specialTests, setSpecialTests] = useState<SpecialTestItem[]>([]);

  // ROM & Palpation State
  const [romFindings, setRomFindings] = useState({
    activeRom: '',
    passiveRom: '',
    mmtStrength: '',
    gaitObservation: '',
    palpationFindings: '',
  });

  // Differentials & Investigation State
  const [differentials, setDifferentials] = useState<DifferentialCandidate[]>([]);
  const [selectedPrimaryDiagnosis, setSelectedPrimaryDiagnosis] = useState('');
  const [investigations, setInvestigations] = useState<InvestigationGuidance[]>([]);
  const [investigationDecision, setInvestigationDecision] = useState('');

  // Treatment State
  const [treatment, setTreatment] = useState<TreatmentRecommendation>(TREATMENT_TEMPLATES['Knee Pain']);

  // Initialize or recompute module sets based on patient chief complaint
  useEffect(() => {
    const isKnee = patient.chiefComplaint.toLowerCase().includes('knee');
    const complaintKey = isKnee ? 'Knee Pain' : 'Low Back Pain';

    // Filter relevant red flags
    const relevantFlags = RED_FLAGS_CATALOG.filter((f) => f.conditionTarget === complaintKey);
    // If demo patient had known positive flags (e.g. Sarah Jenkins CES case), initialize them
    if (patient.notes.includes('SIMULATION') && !isKnee) {
      setRedFlags(
        relevantFlags.map((f) =>
          f.id === 'rf-spine-ces' ? { ...f, isPositive: true, notes: 'New urinary retention & saddle paresthesia noted.' } : f
        )
      );
    } else {
      setRedFlags(relevantFlags);
    }

    // Filter adaptive questions
    const relevantQuestions = ADAPTIVE_QUESTIONS_CATALOG.filter(
      (q) => q.complaintCondition === complaintKey
    );
    setQuestions(relevantQuestions);

    // Filter special tests
    const relevantTests = SPECIAL_TESTS_CATALOG.filter((t) =>
      isKnee ? t.id.includes('knee') : t.id.includes('spine')
    );
    // Pre-populate some baseline positive results for demonstration patients
    if (patient.id === 'pt-001') {
      // Marcus Vance - ACL
      setSpecialTests(
        relevantTests.map((t) =>
          t.id === 'test-knee-lachman'
            ? { ...t, result: 'Positive', clinicianNotes: '6mm anterior translation, soft end feel' }
            : t
        )
      );
      setRomFindings({
        activeRom: 'Flexion 90°, Extension -5° due to effusion and hamstring guarding',
        passiveRom: 'Full extension blocked by hemarthrosis',
        mmtStrength: 'Quadriceps 4/5 (inhibited by joint effusion), Hamstrings 5/5',
        gaitObservation: 'Severe antalgic limp, walks on toes with crutches',
        palpationFindings: 'Grade 2 tense effusion, tenderness at lateral joint margin and lateral femoral condyle',
      });
    } else if (patient.id === 'pt-002') {
      // David Chen - Lumbar Radiculopathy
      setSpecialTests(
        relevantTests.map((t) =>
          t.id === 'test-spine-slr'
            ? { ...t, result: 'Positive', clinicianNotes: 'Reproduction of right calf/toe shoot at 40°' }
            : t.id === 'test-spine-slump'
            ? { ...t, result: 'Positive', clinicianNotes: 'Pain reduced with neck extension' }
            : t
        )
      );
      setRomFindings({
        activeRom: 'Lumbar flexion 40% with deviation to left, extension 15° painful',
        passiveRom: 'Not assessed in lumbar spine',
        mmtStrength: 'EHL 4/5 on right side, normal plantarflexion',
        gaitObservation: 'Antalgic list to left to decompress right neural foramen',
        palpationFindings: 'Right paraspinal muscle spasm at L4-L5, tender over right sciatic notch',
      });
    } else {
      setSpecialTests(relevantTests);
    }

    // Differentials & Investigations
    const diffs = DIFFERENTIALS_CATALOG[complaintKey] || DIFFERENTIALS_CATALOG['Knee Pain'];
    setDifferentials(diffs);
    setSelectedPrimaryDiagnosis(diffs[0]?.condition || '');

    const invs = INVESTIGATIONS_CATALOG[complaintKey] || INVESTIGATIONS_CATALOG['Knee Pain'];
    setInvestigations(invs);

    const tmpl = TREATMENT_TEMPLATES[complaintKey] || TREATMENT_TEMPLATES['Knee Pain'];
    setTreatment(tmpl);
  }, [patient.chiefComplaint, patient.id]);

  const steps = [
    { number: 1, label: 'Intake & Specialty', icon: User },
    { number: 2, label: 'Safety & Red Flags', icon: ShieldAlert },
    { number: 3, label: 'Adaptive History', icon: HelpCircle },
    { number: 4, label: 'Assessment Engine', icon: Stethoscope },
    { number: 5, label: 'Differential Review', icon: BookOpen },
    { number: 6, label: 'Investigation & Prognosis', icon: FileSearch },
    { number: 7, label: 'Management Plan', icon: CheckSquare },
    { number: 8, label: 'Referral & Report', icon: FileText },
  ];

  const handleToggleRedFlag = (id: string, isPositive: boolean, notes?: string) => {
    setRedFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isPositive, notes: notes !== undefined ? notes : f.notes } : f))
    );
  };

  const handleAnswerQuestion = (id: string, value: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, value, isSkipped: false, skipReason: undefined } : q))
    );
  };

  const handleSkipQuestion = (id: string, reason: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isSkipped: true, skipReason: reason } : q))
    );
  };

  const handleUpdateTestResult = (
    id: string,
    result: SpecialTestItem['result'],
    notes?: string,
    score?: string
  ) => {
    setSpecialTests((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              result,
              clinicianNotes: notes !== undefined ? notes : t.clinicianNotes,
              scoreValue: score !== undefined ? score : t.scoreValue,
            }
          : t
      )
    );
  };

  const handleUpdateRomFindings = (key: string, val: string) => {
    setRomFindings((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Exit Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={onExit}
            className="hover:text-slate-900 transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Patient Registry</span>
          </button>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{patient.name || 'New Patient Encounter'}</span>
          <span>/</span>
          <span className="text-teal-700 font-medium">{steps[currentStep - 1]?.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            Step {currentStep} of {steps.length}
          </span>
        </div>
      </div>

      {/* Stepper Navigation Ribbon */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center min-w-max gap-1 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          {steps.map((st) => {
            const isCurrent = currentStep === st.number;
            const isCompleted = currentStep > st.number;
            const Icon = st.icon;

            return (
              <button
                key={st.number}
                type="button"
                onClick={() => setCurrentStep(st.number)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                    : isCompleted
                    ? 'text-teal-800 hover:text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono ${
                    isCurrent
                      ? 'bg-slate-900 text-teal-400 font-bold'
                      : isCompleted
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓' : st.number}
                </div>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wizard Step Content */}
      <div className="transition-all">
        {currentStep === 1 && (
          <PatientIntakeForm
            patient={patient}
            specialty={specialty}
            onChangeSpecialty={setSpecialty}
            onChangePatient={(updated) => setPatient((prev) => ({ ...prev, ...updated }))}
            onProceed={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <RedFlagModule
            redFlags={redFlags}
            onToggleRedFlag={handleToggleRedFlag}
            onProceedToAssessment={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <AdaptiveHistory
            questions={questions}
            onAnswerQuestion={handleAnswerQuestion}
            onSkipQuestion={handleSkipQuestion}
            onProceed={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <AssessmentEngine
            specialTests={specialTests}
            onUpdateTestResult={handleUpdateTestResult}
            onProceed={() => setCurrentStep(5)}
            romFindings={romFindings}
            onUpdateRomFindings={handleUpdateRomFindings}
          />
        )}

        {currentStep === 5 && (
          <DifferentialReview
            candidates={differentials}
            patient={patient}
            specialty={specialty}
            specialTests={specialTests}
            redFlags={redFlags}
            onProceed={() => setCurrentStep(6)}
            onSelectPrimaryDiagnosis={setSelectedPrimaryDiagnosis}
            selectedPrimary={selectedPrimaryDiagnosis}
          />
        )}

        {currentStep === 6 && (
          <InvestigationSupport
            investigations={investigations}
            patient={patient}
            onProceed={() => setCurrentStep(7)}
            clinicianInvestigationDecision={investigationDecision}
            onChangeInvestigationDecision={setInvestigationDecision}
          />
        )}

        {currentStep === 7 && (
          <TreatmentPlanView
            treatment={treatment}
            patient={patient}
            primaryDiagnosis={selectedPrimaryDiagnosis}
            onUpdateTreatment={setTreatment}
            onProceed={() => setCurrentStep(8)}
          />
        )}

        {currentStep === 8 && (
          <ReportAndReferralView
            patient={patient}
            specialty={specialty}
            redFlags={redFlags}
            specialTests={specialTests}
            primaryDiagnosis={selectedPrimaryDiagnosis}
            treatment={treatment}
            investigationDecision={investigationDecision}
            romFindings={romFindings}
            onSaveReport={(status) => {
              // Confirmation feedback
            }}
          />
        )}
      </div>
    </div>
  );
};
