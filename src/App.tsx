import React, { useState } from 'react';
import { Header, AppView } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AssessmentWizard } from './components/AssessmentWizard';
import { EvidenceLibraryView } from './components/EvidenceLibraryView';
import { ResearchWatchlistView } from './components/ResearchWatchlistView';
import { ClinicalGovernanceView } from './components/ClinicalGovernanceView';
import { JointProtocolsEncyclopedia } from './components/JointProtocolsEncyclopedia';
import { AthletePerformanceModule } from './components/AthletePerformanceModule';
import { StrengthConditioningModule } from './components/StrengthConditioningModule';
import { SportsNutritionModule } from './components/SportsNutritionModule';
import { IndianInvestigationsModule } from './components/IndianInvestigationsModule';
import { MultidisciplinaryCaseView } from './components/MultidisciplinaryCaseView';
import { ComprehensiveAssessmentFormat } from './components/ComprehensiveAssessmentFormat';
import { DoctorPatientDashboard } from './components/DoctorPatientDashboard';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PatientIntake } from './types/clinical';
import { DoctorPatient } from './types/doctorPatient';
import { DEMO_PATIENTS } from './data/clinicalKnowledge';

function AppContent() {
  const { t, language } = useLanguage();
  const [activeView, setActiveView] = useState<AppView>('doctor-dashboard');
  const [selectedPatient, setSelectedPatient] = useState<PatientIntake>(DEMO_PATIENTS[0]);

  const handleSelectPatient = (patient: PatientIntake) => {
    setSelectedPatient(patient);
    setActiveView('wizard');
  };

  const handleStartNewAssessment = () => {
    const blankPatient: PatientIntake = {
      id: `pt-${Date.now().toString().slice(-4)}`,
      mrn: `CLIN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'New Patient Intake',
      age: 26,
      sex: 'Male',
      heightCm: 178,
      weightKg: 74,
      occupation: 'State Level Cricket Fast Bowler',
      activityLevel: 'Heavy Athletic',
      chiefComplaint: 'Right lumbar pars stress reaction with bowling pain during delivery stride',
      anatomicalLocation: 'L4/L5 Lumbar Spine - Non-bowling arm side',
      onset: 'Subacute (2 - 6 weeks)',
      duration: '3 weeks',
      severityNprs: 6,
      progression: 'Worsening',
      injuryMechanism: 'Repetitive front-foot landing shock and hyperextension counter-rotation during match spell',
      aggravatingFactors: ['Fast bowling', 'Lumbar extension and rotation', 'Running sprints'],
      relievingFactors: ['Rest', 'Lying supine with knees bent'],
      functionalLimitations: 'Unable to bowl off full run-up; pain on Stork single-leg extension test',
      patientGoals: 'Heal pars stress reaction without complete fracture, resume Ranji Trophy season',
      medicalHistory: 'Vitamin D deficiency noted 6 months ago',
      surgicalHistory: 'None',
      comorbidities: ['None'],
      medications: 'Calcium & Vitamin D3 supplementation',
      allergies: 'No known drug allergies',
      priorInvestigations: 'Lumbar MRI STIR sequence confirmed grade 2 bone marrow edema in left L5 pars',
      priorTreatments: 'Bowling ceased 10 days ago, core stabilization begun',
      notes: 'High-performance sports medicine intake for criteria-based return to sport.',
    };

    setSelectedPatient(blankPatient);
    setActiveView('wizard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Top Bar Navigation */}
      <Header
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onStartNewAssessment={handleStartNewAssessment}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {activeView === 'doctor-dashboard' && (
          <DoctorPatientDashboard
            onOpenAssessmentWizard={(patient: DoctorPatient) => {
              const converted: PatientIntake = {
                id: patient.id,
                mrn: patient.id,
                name: patient.name,
                age: typeof patient.age === 'number' ? patient.age : 50,
                sex: patient.gender === 'Female' ? 'Female' : patient.gender === 'Male' ? 'Male' : 'Unknown',
                heightCm: 165,
                weightKg: 65,
                occupation: `Resident of ${patient.location}`,
                activityLevel: 'Light',
                chiefComplaint: patient.presentingComplaints,
                anatomicalLocation: patient.primaryDiagnosis,
                onset: 'Subacute (2 - 6 weeks)',
                duration: '6 weeks',
                severityNprs: 5,
                progression: 'Fluctuating',
                injuryMechanism: patient.surgicalHistory || 'Post-surgical / chronic strain',
                aggravatingFactors: ['Walking', 'Bending', 'Sit-to-stand'],
                relievingFactors: ['Rest'],
                functionalLimitations: patient.presentingComplaints,
                patientGoals: 'Pain-free ambulation and functional mobility',
                medicalHistory: patient.medicalHistory,
                surgicalHistory: patient.surgicalHistory,
                comorbidities: [],
                medications: 'Prescribed analgesics PRN',
                allergies: 'NKDA',
                priorInvestigations: 'Plain radiographs and post-op films',
                priorTreatments: 'Physical therapy',
                notes: `Assigned to ${patient.doctorAssigned}`,
              };
              setSelectedPatient(converted);
              setActiveView('wizard');
            }}
            onOpenAssessmentFormat={(patient: DoctorPatient) => {
              const converted: PatientIntake = {
                id: patient.id,
                mrn: patient.id,
                name: patient.name,
                age: typeof patient.age === 'number' ? patient.age : 50,
                sex: patient.gender === 'Female' ? 'Female' : patient.gender === 'Male' ? 'Male' : 'Unknown',
                heightCm: 165,
                weightKg: 65,
                occupation: `Resident of ${patient.location}`,
                activityLevel: 'Light',
                chiefComplaint: patient.presentingComplaints,
                anatomicalLocation: patient.primaryDiagnosis,
                onset: 'Subacute (2 - 6 weeks)',
                duration: '6 weeks',
                severityNprs: 5,
                progression: 'Fluctuating',
                injuryMechanism: patient.surgicalHistory || 'Post-surgical / chronic strain',
                aggravatingFactors: ['Walking', 'Bending', 'Sit-to-stand'],
                relievingFactors: ['Rest'],
                functionalLimitations: patient.presentingComplaints,
                patientGoals: 'Pain-free ambulation and functional mobility',
                medicalHistory: patient.medicalHistory,
                surgicalHistory: patient.surgicalHistory,
                comorbidities: [],
                medications: 'Prescribed analgesics PRN',
                allergies: 'NKDA',
                priorInvestigations: 'Plain radiographs and post-op films',
                priorTreatments: 'Physical therapy',
                notes: `Assigned to ${patient.doctorAssigned}`,
              };
              setSelectedPatient(converted);
              setActiveView('assessment-format');
            }}
          />
        )}

        {activeView === 'dashboard' && (
          <DashboardView
            onSelectPatient={handleSelectPatient}
            onNewAssessment={handleStartNewAssessment}
            onNavigate={(view) => setActiveView(view as any)}
          />
        )}

        {activeView === 'assessment-format' && (
          <ComprehensiveAssessmentFormat
            initialPatient={selectedPatient}
            onApplyTreatmentPlan={(plan, diagnosis) => {
              // Populate selected patient with the diagnosis and update plan
              setSelectedPatient((prev) => ({
                ...prev,
                chiefComplaint: `${diagnosis} (${prev.chiefComplaint})`,
              }));
            }}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'wizard' && (
          <AssessmentWizard
            initialPatient={selectedPatient}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'protocols' && <JointProtocolsEncyclopedia />}

        {activeView === 'athlete' && <AthletePerformanceModule />}

        {activeView === 'sandc' && <StrengthConditioningModule />}

        {activeView === 'nutrition' && <SportsNutritionModule />}

        {activeView === 'investigations' && <IndianInvestigationsModule />}

        {activeView === 'mdt' && <MultidisciplinaryCaseView />}

        {activeView === 'evidence' && <EvidenceLibraryView />}

        {activeView === 'watchlists' && <ResearchWatchlistView />}

        {activeView === 'governance' && <ClinicalGovernanceView />}
      </main>

      {/* Quiet Clinical Governance Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-semibold text-slate-700">
              {t('app.title')} — {t('app.tagline')}
            </div>
            <p className="text-[11px] text-slate-400">
              Designed for qualified physiotherapists, sports medicine specialists, orthopaedic surgeons, and S&C coaches. Aligned with ICMR, MoHFW, BCCI/NCA, SAI, NADA, and international guidelines (IOC, NSCA, ACSM).
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
            <span>Rules v2.4.1 (India & Global)</span>
            <span>·</span>
            <span>Ayushman Bharat / NABL Atlas</span>
            <span>·</span>
            <span>© 2026 ClinicaAI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

