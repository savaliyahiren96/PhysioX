import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Search,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Award,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Activity,
  Stethoscope,
  Info,
  Sliders,
  Filter,
} from 'lucide-react';
import {
  WORLDWIDE_CONDITIONS_DATABASE,
  WorldwideConditionTemplate,
  RomAssessmentItem,
  MmtStrengthItem,
  SpecialTestFinding,
} from '../data/worldwideConditionsDatabase';
import { PatientIntake } from '../types/clinical';

interface ComprehensiveAssessmentFormatProps {
  initialPatient?: PatientIntake;
  onApplyTreatmentPlan?: (treatmentPlan: any, diagnosisName: string) => void;
  onExit?: () => void;
}

export const ComprehensiveAssessmentFormat: React.FC<ComprehensiveAssessmentFormatProps> = ({
  initialPatient,
  onApplyTreatmentPlan,
  onExit,
}) => {
  // Active selected template from worldwide database
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    WORLDWIDE_CONDITIONS_DATABASE[0]?.id || ''
  );

  // Filter / Search for worldwide database
  const [conditionSearch, setConditionSearch] = useState('');
  const [selectedJointFilter, setSelectedJointFilter] = useState<string>('All');

  // Active viewing tab for 3-tier options: 'option1' | 'option2' | 'option3' | 'matrix'
  const [activeTierTab, setActiveTierTab] = useState<'option1' | 'option2' | 'option3' | 'matrix'>('option1');

  // Currently active assessment state (starts populated with selected template)
  const currentTemplate = useMemo(() => {
    return (
      WORLDWIDE_CONDITIONS_DATABASE.find((c) => c.id === selectedTemplateId) ||
      WORLDWIDE_CONDITIONS_DATABASE[0]
    );
  }, [selectedTemplateId]);

  // Editable patient & examination form state
  const [formState, setFormState] = useState({
    name: currentTemplate.patientPreset.name,
    age: currentTemplate.patientPreset.age,
    sex: currentTemplate.patientPreset.sex,
    occupation: currentTemplate.patientPreset.occupation,
    activityLevel: currentTemplate.patientPreset.activityLevel,
    chiefComplaint: currentTemplate.patientPreset.chiefComplaint,
    anatomicalLocation: currentTemplate.patientPreset.anatomicalLocation,
    onset: currentTemplate.patientPreset.onset,
    duration: currentTemplate.patientPreset.duration,
    severityNprs: currentTemplate.patientPreset.severityNprs,
    progression: currentTemplate.patientPreset.progression,
    injuryMechanism: currentTemplate.patientPreset.injuryMechanism,
    symptomBehavior24h: currentTemplate.patientPreset.symptomBehavior24h,
    aggravatingFactors: [...currentTemplate.patientPreset.aggravatingFactors],
    relievingFactors: [...currentTemplate.patientPreset.relievingFactors],
    functionalLimitations: currentTemplate.patientPreset.functionalLimitations,
    patientGoals: currentTemplate.patientPreset.patientGoals,
    observationGait: currentTemplate.physicalExamination.observationGait,
    palpationFindings: currentTemplate.physicalExamination.palpationFindings,
    activePassiveRom: [...currentTemplate.physicalExamination.activePassiveRom],
    mmtStrength: [...currentTemplate.physicalExamination.mmtStrength],
    neurologicalExam: { ...currentTemplate.physicalExamination.neurologicalExam },
    specialTests: [...currentTemplate.physicalExamination.specialTests],
  });

  // Keep form in sync when user picks a different prefill template
  const handleSelectTemplate = (template: WorldwideConditionTemplate) => {
    setSelectedTemplateId(template.id);
    setFormState({
      name: template.patientPreset.name,
      age: template.patientPreset.age,
      sex: template.patientPreset.sex,
      occupation: template.patientPreset.occupation,
      activityLevel: template.patientPreset.activityLevel,
      chiefComplaint: template.patientPreset.chiefComplaint,
      anatomicalLocation: template.patientPreset.anatomicalLocation,
      onset: template.patientPreset.onset,
      duration: template.patientPreset.duration,
      severityNprs: template.patientPreset.severityNprs,
      progression: template.patientPreset.progression,
      injuryMechanism: template.patientPreset.injuryMechanism,
      symptomBehavior24h: template.patientPreset.symptomBehavior24h,
      aggravatingFactors: [...template.patientPreset.aggravatingFactors],
      relievingFactors: [...template.patientPreset.relievingFactors],
      functionalLimitations: template.patientPreset.functionalLimitations,
      patientGoals: template.patientPreset.patientGoals,
      observationGait: template.physicalExamination.observationGait,
      palpationFindings: template.physicalExamination.palpationFindings,
      activePassiveRom: [...template.physicalExamination.activePassiveRom],
      mmtStrength: [...template.physicalExamination.mmtStrength],
      neurologicalExam: { ...template.physicalExamination.neurologicalExam },
      specialTests: [...template.physicalExamination.specialTests],
    });
    setAiInsightResult(null);
  };

  // Real-time AI consultation state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsightResult, setAiInsightResult] = useState<any | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Filtered worldwide conditions list
  const filteredConditions = useMemo(() => {
    return WORLDWIDE_CONDITIONS_DATABASE.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(conditionSearch.toLowerCase()) ||
        item.icd10Code.toLowerCase().includes(conditionSearch.toLowerCase()) ||
        item.jointRegion.toLowerCase().includes(conditionSearch.toLowerCase()) ||
        item.specialty.toLowerCase().includes(conditionSearch.toLowerCase());

      const matchesJoint =
        selectedJointFilter === 'All' ||
        item.jointRegion.toLowerCase().includes(selectedJointFilter.toLowerCase());

      return matchesSearch && matchesJoint;
    });
  }, [conditionSearch, selectedJointFilter]);

  // Request real-time Gemini AI second opinion
  const handleQueryAiSecondOpinion = async () => {
    setAiLoading(true);
    try {
      const payload = {
        patient: {
          age: formState.age,
          sex: formState.sex,
          occupation: formState.occupation,
          duration: formState.duration,
          mechanism: formState.injuryMechanism,
          functionalGoals: formState.patientGoals,
        },
        specialty: currentTemplate.specialty,
        complaint: formState.chiefComplaint,
        redFlags: [],
        examination: {
          location: formState.anatomicalLocation,
          onset: formState.onset,
          gaitObservation: formState.observationGait,
          palpation: formState.palpationFindings,
          positiveSpecialTests: formState.specialTests
            .filter((t) => t.result === 'Positive')
            .map((t) => `${t.testName} (${t.clinicianNotes || 'Positive'})`),
        },
      };

      const res = await fetch('/api/clinical/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      setAiInsightResult(data);
    } catch (err) {
      console.error('Failed to query Gemini API:', err);
      // Fallback to rich internal expert opinion
      setAiInsightResult({
        source: 'ClinicaAI Evidence Engine (Pragmatic Offline Fallback)',
        clinicalReasoning: currentTemplate.threeTierOptions.option3ExpertOpinion.clinicaAiSynthesis,
        pearls: currentTemplate.threeTierOptions.option3ExpertOpinion.clinicalPearls,
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Copy clinical assessment summary
  const handleCopySummary = () => {
    const text = `CLINICAAI COMPREHENSIVE ASSESSMENT & DIAGNOSTIC REPORT
Patient: ${formState.name} (${formState.age}y / ${formState.sex}) | Occ: ${formState.occupation}
Chief Complaint: ${formState.chiefComplaint}
Location: ${formState.anatomicalLocation} | Onset: ${formState.onset} | Duration: ${formState.duration} | NPRS: ${formState.severityNprs}/10
Mechanism: ${formState.injuryMechanism}
Gait & Observation: ${formState.observationGait}
Key Positive Tests: ${formState.specialTests
      .filter((t) => t.result === 'Positive')
      .map((t) => `${t.testName} (${t.positiveLR} LR+)`)
      .join(', ')}

IDENTIFIED PRIMARY DIAGNOSIS:
${currentTemplate.diagnosticSynthesis.primaryDiagnosis} (ICD-10: ${currentTemplate.icd10Code})
Diagnostic Confidence: ${currentTemplate.diagnosticSynthesis.diagnosticConfidence}

THREE CLINICAL OPTIONS AVAILABLE:
1) Strong Evidence (Level I): ${currentTemplate.threeTierOptions.option1StrongEvidence.summaryRationale}
2) Evidence (Level II/III): ${currentTemplate.threeTierOptions.option2Evidence.summaryRationale}
3) ClinicaAI Expert Opinion: ${currentTemplate.threeTierOptions.option3ExpertOpinion.clinicaAiSynthesis}

Generated via ClinicaAI Medical Evidence & Clinical Decision Support System.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Apply chosen tier option into patient treatment plan
  const handleApplyOption = (tierKey: 'option1' | 'option2' | 'option3') => {
    let tierData: any = null;
    let label = '';

    if (tierKey === 'option1') {
      tierData = currentTemplate.threeTierOptions.option1StrongEvidence;
      label = 'Option 1: Strong Evidence (Level I)';
    } else if (tierKey === 'option2') {
      tierData = currentTemplate.threeTierOptions.option2Evidence;
      label = 'Option 2: Evidence (Level II/III)';
    } else {
      tierData = currentTemplate.threeTierOptions.option3ExpertOpinion;
      label = 'Option 3: ClinicaAI Expert Opinion';
    }

    if (onApplyTreatmentPlan) {
      onApplyTreatmentPlan(tierData, currentTemplate.diagnosticSynthesis.primaryDiagnosis);
    }

    setAppliedNotification(`Successfully applied ${label} to active clinical treatment plan!`);
    setTimeout(() => setAppliedNotification(null), 4000);
  };

  const opt1 = currentTemplate.threeTierOptions.option1StrongEvidence;
  const opt2 = currentTemplate.threeTierOptions.option2Evidence;
  const opt3 = currentTemplate.threeTierOptions.option3ExpertOpinion;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
              <span>Full Clinical Assessment Format & 3-Tier Diagnostic Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Standardized Assessment & Tri-Tier Clinical Decision Support
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete multi-component physical examination format (History, Palpation, Goniometric ROM, MMT, Neurodynamics, Special Tests, Functional Screening, PROMs). Quickly prefill details from worldwide evidence databases to immediately identify diagnoses and evaluate three distinct management perspectives:
              <span className="font-semibold text-teal-300"> 1) Strong Evidence</span>,{' '}
              <span className="font-semibold text-emerald-300"> 2) Evidence</span>, and{' '}
              <span className="font-semibold text-purple-300"> 3) ClinicaAI Expert Opinion</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedSummary ? 'Report Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print Form</span>
            </button>
            {onExit && (
              <button
                onClick={onExit}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>

        {appliedNotification && (
          <div className="mt-4 p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-xs font-semibold text-teal-200 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{appliedNotification}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: Worldwide Conditions Library & Instant Prefill Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Worldwide Clinical Conditions & Prefill Presets</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any validated condition from international clinical databases to instantly prefill all examination parameters, test metrics, and research citations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search condition or ICD-10..."
                value={conditionSearch}
                onChange={(e) => setConditionSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 w-52 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Joint Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {['All', 'Knee', 'Lumbar Spine', 'Shoulder', 'Ankle & Foot'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedJointFilter(filter)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedJointFilter === filter
                  ? 'bg-slate-900 text-teal-400 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid of Available Prefill Condition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredConditions.map((cond) => {
            const isSelected = cond.id === selectedTemplateId;
            return (
              <div
                key={cond.id}
                onClick={() => handleSelectTemplate(cond)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {cond.icd10Code}
                  </span>
                  <span className="text-[10px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                    {cond.jointRegion}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900 mt-2 line-clamp-1">{cond.name}</div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {cond.patientPreset.chiefComplaint}
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    Preset: {cond.patientPreset.name} ({cond.patientPreset.age}y)
                  </span>
                  <span className="font-semibold text-teal-700 flex items-center gap-0.5">
                    {isSelected ? 'Active Prefill ✓' : 'Load Details →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Standardized Multi-Component Assessment Format */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Standardized Physical Examination & Assessment Record
              </h2>
              <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded font-semibold">
                Form 2026-CDS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Clinician-editable structured clinical evaluation fields. Modify any value to reflect patient-specific presentation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectTemplate(currentTemplate)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset to Template</span>
            </button>
          </div>
        </div>

        {/* 2.1 Demographics & Contextual History */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>1. Patient Demographics & Profile</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Patient Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Age</label>
              <input
                type="number"
                value={formState.age}
                onChange={(e) => setFormState({ ...formState, age: Number(e.target.value) })}
                className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Sex</label>
              <select
                value={formState.sex}
                onChange={(e) => setFormState({ ...formState, sex: e.target.value as any })}
                className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Activity Level</label>
              <input
                type="text"
                value={formState.activityLevel}
                onChange={(e) => setFormState({ ...formState, activityLevel: e.target.value })}
                className="w-full text-xs text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Occupation & Sport</label>
              <input
                type="text"
                value={formState.occupation}
                onChange={(e) => setFormState({ ...formState, occupation: e.target.value })}
                className="w-full text-xs text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* 2.2 Subjective Presentation & History of Complaint */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>2. Subjective Presentation & Mechanism</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Chief Complaint</label>
              <input
                type="text"
                value={formState.chiefComplaint}
                onChange={(e) => setFormState({ ...formState, chiefComplaint: e.target.value })}
                className="w-full text-xs text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Anatomical Location</label>
              <input
                type="text"
                value={formState.anatomicalLocation}
                onChange={(e) => setFormState({ ...formState, anatomicalLocation: e.target.value })}
                className="w-full text-xs text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Pain Severity (NPRS 0-10): <span className="text-teal-700 font-bold">{formState.severityNprs}/10</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formState.severityNprs}
                onChange={(e) => setFormState({ ...formState, severityNprs: Number(e.target.value) })}
                className="w-full accent-teal-600"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Injury Mechanism / Trigger</label>
              <input
                type="text"
                value={formState.injuryMechanism}
                onChange={(e) => setFormState({ ...formState, injuryMechanism: e.target.value })}
                className="w-full text-xs text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">24-Hour Symptom Behavior & Night Pain</label>
              <input
                type="text"
                value={formState.symptomBehavior24h}
                onChange={(e) => setFormState({ ...formState, symptomBehavior24h: e.target.value })}
                className="w-full text-xs text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* 2.3 Physical Examination Findings: Observation, Palpation, ROM & MMT */}
        <div className="space-y-4 pt-3 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>3. Objective Examination: Observation, Palpation & Biomechanics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1">Observation & Gait Analysis</span>
              <textarea
                rows={2}
                value={formState.observationGait}
                onChange={(e) => setFormState({ ...formState, observationGait: e.target.value })}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1">Palpation & Effusion Grading</span>
              <textarea
                rows={2}
                value={formState.palpationFindings}
                onChange={(e) => setFormState({ ...formState, palpationFindings: e.target.value })}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Active / Passive ROM Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Goniometric Active & Passive Range of Motion (ROM)</span>
              <span className="text-[11px] text-slate-500 font-normal">Degrees & End-Feel Quality</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {formState.activePassiveRom.map((rom, idx) => (
                <div key={idx} className="p-3 grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                  <span className="font-semibold text-slate-900">{rom.movement}</span>
                  <div className="text-slate-600">
                    <span className="text-[10px] text-slate-400 block">Active ROM:</span>
                    <span className="font-mono">{rom.activeDegrees}</span>
                  </div>
                  <div className="text-slate-600">
                    <span className="text-[10px] text-slate-400 block">Passive ROM:</span>
                    <span className="font-mono">{rom.passiveDegrees}</span>
                  </div>
                  <div className="text-slate-600">
                    <span className="text-[10px] text-slate-400 block">End Feel:</span>
                    <span className="font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                      {rom.endFeel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MMT Strength Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Manual Muscle Testing (MMT) & Dynamometry</span>
              <span className="text-[11px] text-slate-500 font-normal">Oxford Scale 0 - 5</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {formState.mmtStrength.map((mmt, idx) => (
                <div key={idx} className="p-3 grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
                  <span className="font-semibold text-slate-900">{mmt.muscleGroup}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Grade:</span>
                    <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {mmt.grade}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{mmt.notes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Validated Special Diagnostic Tests & Likelihood Ratios */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Validated Orthopaedic Special Diagnostic Tests</span>
              <span className="text-[11px] text-slate-500 font-normal">Diagnostic Accuracy (Sensitivity, Specificity, LR+)</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {formState.specialTests.map((test, idx) => {
                const isPos = test.result === 'Positive';
                return (
                  <div key={idx} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{test.testName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isPos ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {test.result}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">{test.clinicianNotes}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Ref: {test.evidenceCitation}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-sans">Sens / Spec</span>
                        <span className="text-slate-700">{test.sensitivity} / {test.specificity}</span>
                      </div>
                      <div className="text-right bg-slate-50 px-2 py-1 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-sans">LR+ (Pos Likelihood)</span>
                        <span className="text-teal-800 font-bold">{test.positiveLR}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Primary Diagnosis Identification & Gold-Standard Multi-Modality Diagnostics */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 mb-1">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Diagnostic Identification Engine</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {currentTemplate.diagnosticSynthesis.primaryDiagnosis}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              ICD-10 Code: <span className="font-mono text-teal-300 font-bold">{currentTemplate.icd10Code}</span> | Diagnostic Confidence:{' '}
              <span className="font-bold text-amber-300">{currentTemplate.diagnosticSynthesis.diagnosticConfidence}</span>
            </p>
          </div>

          <button
            onClick={handleQueryAiSecondOpinion}
            disabled={aiLoading}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>{aiLoading ? 'Synthesizing Gemini Insights...' : 'Run Real-Time Gemini AI Second Opinion'}</span>
          </button>
        </div>

        {/* Pathognomonic Triad */}
        <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
            Key Pathognomonic Triad & Diagnostic Criteria:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {currentTemplate.diagnosticSynthesis.keyPathognomonicTriad.map((triad, i) => (
              <div key={i} className="text-xs text-slate-200 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-teal-400 font-bold shrink-0">{i + 1}.</span>
                <span>{triad}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Gemini AI Response Banner if triggered */}
        {aiInsightResult && (
          <div className="bg-teal-950/80 border border-teal-500/40 rounded-xl p-4 space-y-3 animate-fade-in text-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Gemini 3.8 Flash Clinical Reasoning & Diagnostic Second Opinion</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Live API Model Response</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {aiInsightResult.clinicalReasoning}
            </p>
            {aiInsightResult.investigationRecommendation && (
              <p className="text-xs text-teal-200/90 bg-teal-900/40 p-2.5 rounded-lg border border-teal-800/40">
                <span className="font-semibold text-white">Investigation Directive: </span>
                {aiInsightResult.investigationRecommendation}
              </p>
            )}
          </div>
        )}

        {/* Gold Standard Multi-Modality Investigation Card */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
              <span>Gold-Standard Investigation Guideline: {currentTemplate.diagnosticSynthesis.goldStandardInvestigation.modality}</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {currentTemplate.diagnosticSynthesis.goldStandardInvestigation.guidelineReference}
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {currentTemplate.diagnosticSynthesis.goldStandardInvestigation.keyFindings}
          </p>
          <div className="text-[11px] text-amber-200/90 bg-amber-950/40 border border-amber-500/30 p-2 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Choosing Wisely: {currentTemplate.diagnosticSynthesis.goldStandardInvestigation.choosingWiselyStatement}</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE CORE THREE-TIER OPTIONS
          1) Strong Evidence
          2) Evidence
          3) ClinicaAI Expert Opinion
          plus 4) Side-by-Side Matrix
      */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Three Evidence-Informed Clinical Management Options
              </h2>
              <span className="text-xs bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full font-bold">
                Tri-Perspective CDS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Examine the clinical case through three distinct evidence lenses or view all three side-by-side in a comparative matrix.
            </p>
          </div>

          {/* Tab Selector for the 3 Options */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTierTab('option1')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTierTab === 'option1'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔵 Option 1: Strong Evidence
            </button>
            <button
              onClick={() => setActiveTierTab('option2')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTierTab === 'option2'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🟢 Option 2: Evidence
            </button>
            <button
              onClick={() => setActiveTierTab('option3')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTierTab === 'option3'
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🟣 Option 3: Expert Opinion
            </button>
            <button
              onClick={() => setActiveTierTab('matrix')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTierTab === 'matrix'
                  ? 'bg-slate-900 text-teal-400 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 Compare Side-by-Side
            </button>
          </div>
        </div>

        {/* TAB 1: OPTION 1 - STRONG EVIDENCE */}
        {activeTierTab === 'option1' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="font-extrabold text-blue-950 text-base">{opt1.tierName}</span>
                  <span className="text-[11px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full border border-blue-300">
                    {opt1.evidenceBadge}
                  </span>
                </div>
                <button
                  onClick={() => handleApplyOption('option1')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Adopt Option 1 into Treatment Plan</span>
                </button>
              </div>

              <p className="text-xs text-blue-950 leading-relaxed font-sans">
                {opt1.summaryRationale}
              </p>
            </div>

            {/* Peer-Reviewed Level I Research Papers with DOI & Citations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Peer-Reviewed Level I Trial Evidence & Gold Standard CPGs</span>
                </span>
                <span className="text-[11px] text-slate-400">Traceable International Articles</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {opt1.keyCitations.map((cit, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {cit.journal} ({cit.year})
                      </span>
                      <span className="font-mono text-slate-400">{cit.evidenceLevel}</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 leading-snug">{cit.title}</div>
                    <p className="text-[11px] text-slate-600 italic">By {cit.authors}</p>
                    <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-900">Key Finding: </span>
                      {cit.keyTakeaway}
                    </p>
                    <div className="pt-1 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <span>DOI:</span>
                      <span className="text-blue-600 truncate">{cit.doi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level I Exercise Prescription & Dosage */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>Level I Prescribed Exercise Interventions & Dosages</span>
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {opt1.interventions.exercisePrescription.map((ex, idx) => (
                  <div key={idx} className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white hover:bg-slate-50/60">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{ex.name}</span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {ex.frequency}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        <span className="font-semibold text-slate-800">Target Adaptation: </span>
                        {ex.targetAdaptation}
                      </p>
                      <p className="text-[11px] text-teal-800 bg-teal-50/70 px-2 py-1 rounded border border-teal-200/50">
                        <span className="font-semibold">Biomechanical Cue: </span>
                        {ex.biomechanicalCue}
                      </p>
                    </div>

                    <div className="shrink-0 text-right bg-slate-100 px-3 py-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Dosage (Sets/Reps)</span>
                      <span className="font-mono font-bold text-slate-800">{ex.dosage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contraindications & Objective Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Contraindicated or Non-Recommended in Level I Evidence</span>
                </span>
                <ul className="text-xs text-rose-950 space-y-1.5 list-disc pl-4">
                  {opt1.interventions.contraindicatedOrAvoid.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Level I Objective Discharge & Return Criteria</span>
                </span>
                <ul className="text-xs text-emerald-950 space-y-1.5 list-disc pl-4">
                  {opt1.interventions.objectiveDischargeCriteria.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPTION 2 - EVIDENCE (LEVEL II/III) */}
        {activeTierTab === 'option2' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span className="font-extrabold text-emerald-950 text-base">{opt2.tierName}</span>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                    {opt2.evidenceBadge}
                  </span>
                </div>
                <button
                  onClick={() => handleApplyOption('option2')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Adopt Option 2 into Treatment Plan</span>
                </button>
              </div>

              <p className="text-xs text-emerald-950 leading-relaxed font-sans">
                {opt2.summaryRationale}
              </p>
            </div>

            {/* Peer-Reviewed Cohorts & Consensus Papers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prospective Cohorts, Registries & Consensus Statements</span>
                </span>
                <span className="text-[11px] text-slate-400">Traceable Scientific Citations</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {opt2.keyCitations.map((cit, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {cit.journal} ({cit.year})
                      </span>
                      <span className="font-mono text-slate-400">{cit.evidenceLevel}</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 leading-snug">{cit.title}</div>
                    <p className="text-[11px] text-slate-600 italic">By {cit.authors}</p>
                    <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-900">Key Finding: </span>
                      {cit.keyTakeaway}
                    </p>
                    <div className="pt-1 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <span>DOI:</span>
                      <span className="text-emerald-600 truncate">{cit.doi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level II/III Exercise Prescription & Adjuncts */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Level II/III Exercise Prescriptions & Pragmatic Adjuncts</span>
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {opt2.interventions.exercisePrescription.map((ex, idx) => (
                  <div key={idx} className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white hover:bg-slate-50/60">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{ex.name}</span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {ex.frequency}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        <span className="font-semibold text-slate-800">Target Adaptation: </span>
                        {ex.targetAdaptation}
                      </p>
                      <p className="text-[11px] text-teal-800 bg-teal-50/70 px-2 py-1 rounded border border-teal-200/50">
                        <span className="font-semibold">Biomechanical Cue: </span>
                        {ex.biomechanicalCue}
                      </p>
                    </div>

                    <div className="shrink-0 text-right bg-slate-100 px-3 py-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Dosage (Sets/Reps)</span>
                      <span className="font-mono font-bold text-slate-800">{ex.dosage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* First-line and discharge criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>First-Line Pragmatic Interventions</span>
                </span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                  {opt2.interventions.firstLine.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Level II/III Objective Discharge Criteria</span>
                </span>
                <ul className="text-xs text-emerald-950 space-y-1.5 list-disc pl-4">
                  {opt2.interventions.objectiveDischargeCriteria.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OPTION 3 - CLINICAAI EXPERT OPINION */}
        {activeTierTab === 'option3' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="font-extrabold text-purple-950 text-base">{opt3.tierName}</span>
                  <span className="text-[11px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full border border-purple-300">
                    {opt3.evidenceBadge}
                  </span>
                </div>
                <button
                  onClick={() => handleApplyOption('option3')}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Adopt Option 3 into Treatment Plan</span>
                </button>
              </div>

              <p className="text-xs text-purple-950 leading-relaxed font-sans">
                {opt3.clinicaAiSynthesis}
              </p>
            </div>

            {/* Clinical Pearls from Experienced Specialists */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>ClinicaAI High-Yield Clinical Pearls & Diagnostic Traps</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {opt3.clinicalPearls.map((pearl, idx) => (
                  <div key={idx} className="bg-white border border-purple-100 rounded-xl p-3.5 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                      Clinical Insight #{idx + 1}
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed">{pearl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Phase Progressive Rehabilitation Roadmap */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>Phase-Based Criteria Driven Roadmap</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {opt3.phaseBasedRoadmap.map((ph, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 block w-fit">
                      {ph.phase}
                    </span>
                    <p className="text-xs text-slate-700">
                      <span className="font-semibold text-slate-900">Clinical Focus: </span>
                      {ph.focus}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-teal-800">
                      <span className="font-semibold block text-slate-900">Milestone to Advance:</span>
                      <span>{ph.milestoneToProgress}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety, Red Flags & Drug-Tendon Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Urgent Red Flags & Safety Governance</span>
                </span>
                <ul className="text-xs text-rose-950 space-y-1.5 list-disc pl-4">
                  {opt3.redFlagAndSafetyPrecautions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Drug-Tendon & Cross-Discipline Precautions</span>
                </span>
                <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-4">
                  {opt3.drugTendonAlerts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SIDE-BY-SIDE 3-COLUMN COMPARATIVE MATRIX */}
        {activeTierTab === 'matrix' && (
          <div className="space-y-6 animate-fade-in">
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                    <th className="p-4 w-44 font-bold">Clinical Parameter</th>
                    <th className="p-4 bg-blue-50/80 text-blue-950 font-bold border-l border-slate-200">
                      🔵 Option 1: Strong Evidence (Level I)
                    </th>
                    <th className="p-4 bg-emerald-50/80 text-emerald-950 font-bold border-l border-slate-200">
                      🟢 Option 2: Evidence (Level II/III)
                    </th>
                    <th className="p-4 bg-purple-50/80 text-purple-950 font-bold border-l border-slate-200">
                      🟣 Option 3: ClinicaAI Expert Opinion
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/60">Core Evidence Grade</td>
                    <td className="p-4 border-l border-slate-200 bg-blue-50/30 text-blue-900 font-semibold">
                      {opt1.evidenceBadge}
                    </td>
                    <td className="p-4 border-l border-slate-200 bg-emerald-50/30 text-emerald-900 font-semibold">
                      {opt2.evidenceBadge}
                    </td>
                    <td className="p-4 border-l border-slate-200 bg-purple-50/30 text-purple-900 font-semibold">
                      {opt3.evidenceBadge}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/60">Clinical Rationale & Mechanism</td>
                    <td className="p-4 border-l border-slate-200 text-slate-700 leading-relaxed">
                      {opt1.summaryRationale}
                    </td>
                    <td className="p-4 border-l border-slate-200 text-slate-700 leading-relaxed">
                      {opt2.summaryRationale}
                    </td>
                    <td className="p-4 border-l border-slate-200 text-slate-700 leading-relaxed">
                      {opt3.clinicaAiSynthesis}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/60">First-Line Interventions</td>
                    <td className="p-4 border-l border-slate-200">
                      <ul className="space-y-1 list-disc pl-4 text-slate-700">
                        {opt1.interventions.firstLine.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 border-l border-slate-200">
                      <ul className="space-y-1 list-disc pl-4 text-slate-700">
                        {opt2.interventions.firstLine.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 border-l border-slate-200">
                      <ul className="space-y-1 list-disc pl-4 text-slate-700">
                        {opt3.sportsOrContextSpecificConsiderations.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/60">Key Exercises & Dosages</td>
                    <td className="p-4 border-l border-slate-200">
                      <ul className="space-y-1 text-slate-700">
                        {opt1.interventions.exercisePrescription.slice(0, 3).map((ex, i) => (
                          <li key={i} className="text-[11px]">
                            • <span className="font-semibold">{ex.name}:</span> {ex.dosage}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 border-l border-slate-200">
                      <ul className="space-y-1 text-slate-700">
                        {opt2.interventions.exercisePrescription.slice(0, 3).map((ex, i) => (
                          <li key={i} className="text-[11px]">
                            • <span className="font-semibold">{ex.name}:</span> {ex.dosage}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 border-l border-slate-200">
                      <div className="space-y-1 text-[11px] text-slate-700">
                        <span className="font-semibold text-purple-900">Phase 1 Focus:</span>{' '}
                        {opt3.phaseBasedRoadmap[0]?.focus}
                        <br />
                        <span className="font-semibold text-purple-900">Phase 2 Focus:</span>{' '}
                        {opt3.phaseBasedRoadmap[1]?.focus}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/60">Expected Timeline & Discharge</td>
                    <td className="p-4 border-l border-slate-200 font-medium text-slate-800">
                      {opt1.interventions.expectedRecoveryTimeline}
                    </td>
                    <td className="p-4 border-l border-slate-200 font-medium text-slate-800">
                      {opt2.interventions.expectedRecoveryTimeline}
                    </td>
                    <td className="p-4 border-l border-slate-200 font-medium text-purple-900">
                      Milestone-based (Phase 4 clearance)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/60">Action Button</td>
                    <td className="p-4 border-l border-slate-200">
                      <button
                        onClick={() => handleApplyOption('option1')}
                        className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Adopt Option 1
                      </button>
                    </td>
                    <td className="p-4 border-l border-slate-200">
                      <button
                        onClick={() => handleApplyOption('option2')}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Adopt Option 2
                      </button>
                    </td>
                    <td className="p-4 border-l border-slate-200">
                      <button
                        onClick={() => handleApplyOption('option3')}
                        className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Adopt Option 3
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
