import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AssessmentWizard } from './components/AssessmentWizard';
import { EvidenceLibraryView } from './components/EvidenceLibraryView';
import { ResearchWatchlistView } from './components/ResearchWatchlistView';
import { ClinicalGovernanceView } from './components/ClinicalGovernanceView';
import { JointProtocolsEncyclopedia } from './components/JointProtocolsEncyclopedia';
import { PatientIntake } from './types/clinical';
import { DEMO_PATIENTS } from './data/clinicalKnowledge';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'wizard' | 'evidence' | 'watchlists' | 'governance' | 'protocols'>('dashboard');
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
      age: 45,
      sex: 'Male',
      heightCm: 175,
      weightKg: 75,
      occupation: '',
      activityLevel: 'Moderate',
      chiefComplaint: 'Acute Knee Pain and Joint Line Tenderness',
      anatomicalLocation: 'Right Knee - Anterior / Retropatellar',
      onset: 'Acute (< 48 hrs)',
      duration: '24 hours',
      severityNprs: 6,
      progression: 'Static',
      injuryMechanism: 'Twisting during recreational activity',
      aggravatingFactors: ['Weight-bearing', 'Bending knee'],
      relievingFactors: ['Rest', 'Elevation'],
      functionalLimitations: 'Difficulty descending stairs',
      patientGoals: 'Resume unrestricted physical activities',
      medicalHistory: 'None reported',
      surgicalHistory: 'None',
      comorbidities: ['None'],
      medications: '',
      allergies: 'No known drug allergies',
      priorInvestigations: 'None',
      priorTreatments: 'Ice pack applied',
      notes: 'Initial clinical presentation intake.',
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
        {activeView === 'dashboard' && (
          <DashboardView
            onSelectPatient={handleSelectPatient}
            onNewAssessment={handleStartNewAssessment}
            onNavigate={(view) => setActiveView(view)}
          />
        )}

        {activeView === 'wizard' && (
          <AssessmentWizard
            initialPatient={selectedPatient}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'protocols' && <JointProtocolsEncyclopedia />}

        {activeView === 'evidence' && <EvidenceLibraryView />}

        {activeView === 'watchlists' && <ResearchWatchlistView />}

        {activeView === 'governance' && <ClinicalGovernanceView />}
      </main>

      {/* Quiet Clinical Governance Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-semibold text-slate-700">
              ClinicaAI — From Patient Presentation to Evidence-Informed Clinical Decisions
            </div>
            <p className="text-[11px] text-slate-400">
              Clinical decision-support tool designed for qualified healthcare professionals. Does not replace clinical examination, professional judgment, or emergency medical services.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
            <span>Clinical Rules v2.4.1</span>
            <span>·</span>
            <span>CE/MDR Triage Conformance</span>
            <span>·</span>
            <span>© 2026 ClinicaAI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
