import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Brain,
  Stethoscope,
  Activity,
  Compass,
} from 'lucide-react';
import {
  ANONYMIZED_CASE_STUDIES,
  CLINICAL_TERMINOLOGY_GLOSSARY,
  ACADEMIC_VIVA_QUIZ,
  AnonymizedCaseStudy,
  AcademicVivaQuizItem,
} from '../data/studentAcademicData';
import { MASTER_SPECIAL_TESTS_LIBRARY, MasterSpecialTest } from '../data/specialTestLibraryData';
import { MASTER_CONDITIONS_DATABASE } from '../data/masterAnatomicalDatabase';
import { useLanguage } from '../context/LanguageContext';

export const StudentAcademicHub: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'cases' | 'specialTests' | 'conditions' | 'terminology' | 'quiz'>('cases');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected case
  const [selectedCase, setSelectedCase] = useState<AnonymizedCaseStudy | null>(ANONYMIZED_CASE_STUDIES[0]);
  const [userCaseAnswers, setUserCaseAnswers] = useState<Record<number, number>>({});
  const [revealedCaseAnswers, setRevealedCaseAnswers] = useState<Record<number, boolean>>({});

  // Selected Special Test
  const [selectedSpecialTest, setSelectedSpecialTest] = useState<MasterSpecialTest | null>(MASTER_SPECIAL_TESTS_LIBRARY[0]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Filtered Special Tests
  const filteredSpecialTests = MASTER_SPECIAL_TESTS_LIBRARY.filter(
    (st) =>
      st.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.joint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.anatomicalStructuresAssessed.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filtered Terminology
  const filteredTerminology = CLINICAL_TERMINOLOGY_GLOSSARY.filter(
    (term) =>
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.clinicalDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.anatomicalContext.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateQuizScore = () => {
    let score = 0;
    ACADEMIC_VIVA_QUIZ.forEach((q) => {
      if (quizAnswers[q.id] === q.correctOptionIndex) score += 1;
    });
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-200 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-teal-300" />
              <span>BPT & MPT Academic & Clinical Training Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Clinical Assessment, Biomechanics & Case Studies
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Curriculum-aligned master library for physiotherapy scholars and interns. Explore anonymized real-world clinical presentations, special tests with diagnostic accuracy metrics, viva flashcards, and board exam practice.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-4 rounded-xl shrink-0 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-teal-300 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Student Privacy Safe Zone</span>
            </div>
            <p className="text-[11px] text-slate-300 max-w-xs">
              All real patient PII is strictly isolated. All cases presented here are pedagogically structured and de-identified per international healthcare privacy standards.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'cases' ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Interactive Case Studies ({ANONYMIZED_CASE_STUDIES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('specialTests')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'specialTests' ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Special Test Library ({MASTER_SPECIAL_TESTS_LIBRARY.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conditions')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'conditions' ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Master Condition Database</span>
          </button>

          <button
            onClick={() => setActiveTab('terminology')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'terminology' ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Clinical Terminology Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Academic Viva Quizzes</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE CASE STUDIES */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Case study selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Anonymized Educational Cases
            </h3>
            <div className="space-y-2">
              {ANONYMIZED_CASE_STUDIES.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCase(c);
                    setUserCaseAnswers({});
                    setRevealedCaseAnswers({});
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    selectedCase?.id === c.id
                      ? 'bg-teal-50 border-teal-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                      {c.targetJoint}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">{c.academicLevel}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{c.caseTitle}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{c.patientProfileSummary.chiefComplaint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Selected Case Details & Questions */}
          {selectedCase && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-900">
                      {selectedCase.academicLevel}
                    </span>
                    <span className="text-xs font-bold text-slate-400">·</span>
                    <span className="text-xs font-bold text-teal-800">{selectedCase.targetJoint}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedCase.caseTitle}</h2>
                </div>

                {/* Patient Profile Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <span>Clinical Intake & History</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                    <div>
                      <span className="font-bold text-slate-700 block">Patient Profile:</span>
                      <span>{selectedCase.patientProfileSummary.demographics}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">Onset:</span>
                      <span>{selectedCase.patientProfileSummary.onsetTimeCourse}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-slate-700 block">Chief Complaint:</span>
                      <span className="text-slate-900 font-medium">{selectedCase.patientProfileSummary.chiefComplaint}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-slate-700 block">Mechanism of Injury:</span>
                      <span>{selectedCase.patientProfileSummary.mechanism}</span>
                    </div>
                  </div>
                </div>

                {/* Objective Findings */}
                <div className="p-4 bg-teal-50/50 border border-teal-200/80 rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-teal-950 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-teal-700" />
                    <span>Objective Physical Examination</span>
                  </h4>
                  <div className="space-y-2 text-slate-700">
                    <div>
                      <span className="font-bold block">Observation & Palpation:</span>
                      <span>{selectedCase.clinicalFindings.observation}</span>
                    </div>
                    <div>
                      <span className="font-bold block">Active ROM:</span>
                      <span>{selectedCase.clinicalFindings.activeRom}</span>
                    </div>
                    <div>
                      <span className="font-bold block">Special Orthopaedic Tests:</span>
                      <ul className="list-disc pl-4 space-y-0.5 mt-1 font-mono text-[11px] text-teal-900">
                        {selectedCase.clinicalFindings.specialTests.map((st, i) => (
                          <li key={i}>{st}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold block">Diagnostic Imaging:</span>
                      <span className="italic">{selectedCase.clinicalFindings.imagingResults}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Student Case Questions */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>Clinical Reasoning & Board Viva Questions</span>
                  </h3>

                  {selectedCase.studentQuestions.map((q, qIndex) => {
                    const selectedOpt = userCaseAnswers[qIndex];
                    const isRevealed = revealedCaseAnswers[qIndex];

                    return (
                      <div key={qIndex} className="p-4 border border-slate-200 rounded-xl bg-white space-y-3 text-xs">
                        <p className="font-bold text-slate-900 text-sm">
                          Q{qIndex + 1}. {q.questionText}
                        </p>

                        <div className="space-y-1.5">
                          {q.options.map((opt, optIndex) => {
                            const isChosen = selectedOpt === optIndex;
                            const isCorrect = optIndex === q.correctIndex;

                            let optStyle = 'border-slate-200 hover:border-slate-300 bg-white';
                            if (isRevealed) {
                              if (isCorrect) optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                              else if (isChosen && !isCorrect) optStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                            } else if (isChosen) {
                              optStyle = 'border-teal-600 bg-teal-50 text-teal-900 font-bold';
                            }

                            return (
                              <button
                                key={optIndex}
                                type="button"
                                onClick={() => {
                                  setUserCaseAnswers({ ...userCaseAnswers, [qIndex]: optIndex });
                                }}
                                className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optStyle}`}
                              >
                                <span className="font-bold text-slate-400">{String.fromCharCode(65 + optIndex)}.</span>
                                <span className="flex-1">{opt}</span>
                                {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                                {isRevealed && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            disabled={selectedOpt === undefined}
                            onClick={() => setRevealedCaseAnswers({ ...revealedCaseAnswers, [qIndex]: true })}
                            className="px-3.5 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white font-bold rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                          >
                            Verify Diagnostic Reasoning
                          </button>

                          {isRevealed && (
                            <span className="text-[11px] font-semibold text-slate-500 italic">
                              Reference: {q.referenceGuideline}
                            </span>
                          )}
                        </div>

                        {isRevealed && (
                          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1 mt-2">
                            <span className="font-bold block">Clinical Rationale & Evidence:</span>
                            <p className="leading-relaxed">{q.clinicalExplanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Master Clinician Pearls */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900">
                  <span className="font-bold flex items-center gap-1.5 text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-700" />
                    <span>Master Clinician Synthesis:</span>
                  </span>
                  <p className="leading-relaxed">{selectedCase.masterClinicianDiscussion}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SPECIAL TEST MASTER LIBRARY */}
      {activeTab === 'specialTests' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tests by name, joint (e.g. Lachman, Spurling, Achilles)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900"
              />
            </div>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredSpecialTests.length} of {MASTER_SPECIAL_TESTS_LIBRARY.length} validated tests
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="space-y-2.5">
              {filteredSpecialTests.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedSpecialTest(st)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    selectedSpecialTest?.id === st.id
                      ? 'bg-teal-50 border-teal-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{st.testName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {st.joint}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{st.clinicalPurpose}</p>
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-teal-800 pt-0.5">
                    <span>SN: {st.diagnosticAccuracy.sensitivity.split(' ')[0]}</span>
                    <span>·</span>
                    <span>SP: {st.diagnosticAccuracy.specificity.split(' ')[0]}</span>
                    {st.diagnosticAccuracy.positiveLR && (
                      <>
                        <span>·</span>
                        <span>+LR: {st.diagnosticAccuracy.positiveLR}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep-Dive Test Details */}
            {selectedSpecialTest && (
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900">
                      {selectedSpecialTest.joint}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">·</span>
                    <span className="text-xs text-slate-500 font-mono">{selectedSpecialTest.id}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedSpecialTest.testName}</h2>
                  <p className="text-xs text-slate-600 mt-1">{selectedSpecialTest.clinicalPurpose}</p>
                </div>

                {/* Diagnostic Accuracy Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sensitivity</span>
                    <span className="text-sm font-extrabold text-teal-900">{selectedSpecialTest.diagnosticAccuracy.sensitivity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specificity</span>
                    <span className="text-sm font-extrabold text-teal-900">{selectedSpecialTest.diagnosticAccuracy.specificity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">+ Likelihood Ratio</span>
                    <span className="text-sm font-extrabold text-emerald-800">{selectedSpecialTest.diagnosticAccuracy.positiveLR || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">- Likelihood Ratio</span>
                    <span className="text-sm font-extrabold text-slate-700">{selectedSpecialTest.diagnosticAccuracy.negativeLR || '—'}</span>
                  </div>
                </div>

                {/* Patient & Therapist Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 block">Patient Position:</span>
                    <p className="text-slate-600">{selectedSpecialTest.patientPosition}</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 block">Therapist Position:</span>
                    <p className="text-slate-600">{selectedSpecialTest.therapistPosition}</p>
                  </div>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Step-by-Step Clinical Procedure:</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                    {selectedSpecialTest.procedureStepByStep.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Positive vs Negative Criteria */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Positive Test Criteria:</span>
                    </span>
                    <p className="text-emerald-900 leading-relaxed">{selectedSpecialTest.positiveTestCriteria}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Negative Test Criteria:</span>
                    </span>
                    <p className="text-slate-600 leading-relaxed">{selectedSpecialTest.negativeTestCriteria}</p>
                  </div>
                </div>

                {/* Educational Demonstration Cue */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-amber-950">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                    <span>Clinical Pearls & Demonstration Cue:</span>
                  </span>
                  <p>{selectedSpecialTest.educationalDemonstrationCue}</p>
                </div>

                {/* Evidence Citation */}
                <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                  <strong>Validated Literature Source:</strong> {selectedSpecialTest.evidenceReference}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MASTER CONDITION DATABASE BROWSER */}
      {activeTab === 'conditions' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Hierarchical Clinical Condition Master Engine
              </h2>
              <p className="text-xs text-slate-500">
                Full 32-section clinical taxonomy: Body Region → Joint → Category → Condition → Subtype → Assessment → 5-Phase Protocol
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MASTER_CONDITIONS_DATABASE.map((mc) => (
                <div
                  key={mc.id}
                  className="p-5 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-xs transition-all bg-white flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                        {mc.region} · {mc.joint}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{mc.id}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm">{mc.conditionName}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3">{mc.clinicalContent.definition}</p>

                    <div className="space-y-1 text-[11px] text-slate-500 pt-1">
                      <div>
                        <strong>Structures:</strong> {mc.clinicalContent.anatomicalStructuresInvolved.slice(0, 2).join(', ')}...
                      </div>
                      <div>
                        <strong>Protocol:</strong> {mc.clinicalContent.rehabilitationProtocolPhases.length} Criteria-Based Phases
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-800">
                      {mc.clinicalContent.outcomeMeasures.length} Validated Outcome Tools
                    </span>
                    <button
                      onClick={() => alert(`Full 32-Section Clinical Protocol opened for ${mc.conditionName}`)}
                      className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View 32 Sections</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLINICAL TERMINOLOGY FLASHCARDS */}
      {activeTab === 'terminology' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search medical terminology (e.g. AMI, force couple, pathognomonic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900"
              />
            </div>
            <span className="text-xs font-bold text-slate-500">
              {filteredTerminology.length} Clinical Flashcards Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerminology.map((term, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{term.term}</h3>
                    <span className="font-mono text-[11px] text-slate-400">{term.phoneticPronunciation}</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block mt-0.5">
                    Context: {term.anatomicalContext}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {term.clinicalDefinition}
                </p>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">Clinical Significance: </span>
                    <span className="text-slate-600">{term.clinicalSignificance}</span>
                  </div>
                  <div>
                    <span className="font-bold text-amber-900">Common Pitfall: </span>
                    <span className="text-amber-800">{term.commonPitfallOrMisconception}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ACADEMIC VIVA QUIZZES */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Physiotherapy Clinical Examination & Viva Practice
              </h2>
              <p className="text-xs text-slate-500">
                Board exam & University MPT/BPT level multiple-choice questions with detailed evidence-based rationales
              </p>
            </div>

            {submittedQuiz && (
              <div className="px-4 py-2 bg-teal-50 border border-teal-300 rounded-xl text-xs font-bold text-teal-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                <span>
                  Score: {calculateQuizScore()} / {ACADEMIC_VIVA_QUIZ.length} (
                  {Math.round((calculateQuizScore() / ACADEMIC_VIVA_QUIZ.length) * 100)}%)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {ACADEMIC_VIVA_QUIZ.map((quiz, qIdx) => {
              const selectedOpt = quizAnswers[quiz.id];
              const isCorrect = selectedOpt === quiz.correctOptionIndex;

              return (
                <div key={quiz.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-teal-800">{quiz.topic}</span>
                    <span className="font-bold text-slate-400">Question {qIdx + 1} of {ACADEMIC_VIVA_QUIZ.length}</span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm">{quiz.question}</p>

                  <div className="space-y-2">
                    {quiz.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      let btnClass = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                      if (submittedQuiz) {
                        if (optIdx === quiz.correctOptionIndex) {
                          btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnClass = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                        }
                      } else if (isChosen) {
                        btnClass = 'bg-teal-50 border-teal-600 text-teal-950 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => {
                            if (!submittedQuiz) {
                              setQuizAnswers({ ...quizAnswers, [quiz.id]: optIdx });
                            }
                          }}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnClass}`}
                        >
                          <span className="font-bold text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          <span className="flex-1">{opt}</span>
                          {submittedQuiz && optIdx === quiz.correctOptionIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {submittedQuiz && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 text-xs">
                      <span className="font-bold text-slate-900 block">Detailed Examiner Rationale:</span>
                      <p className="text-slate-700 leading-relaxed">{quiz.detailedRationale}</p>
                      <span className="text-[11px] text-slate-400 block pt-1">
                        Source: {quiz.evidenceSource}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setQuizAnswers({});
                setSubmittedQuiz(false);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              Reset Quiz
            </button>

            <button
              type="button"
              disabled={Object.keys(quizAnswers).length === 0}
              onClick={() => setSubmittedQuiz(true)}
              className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-40"
            >
              Submit Quiz & View Explanations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
