import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  Activity,
  Trophy,
  Dumbbell,
  Apple,
  Microscope,
  Users,
  CheckCircle2,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { AppView } from './Header';

interface AudienceScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
}

interface PersonaCard {
  id: string;
  role: string;
  specialty: string;
  settings: string[];
  keyWorkflows: string[];
  targetView: AppView;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
}

export const AudienceScopeModal: React.FC<AudienceScopeModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinical' | 'sports' | 'hospital'>(
    'all'
  );

  if (!isOpen) return null;

  const personas: PersonaCard[] = [
    {
      id: 'physio',
      role: 'Musculoskeletal & Sports Physiotherapists',
      specialty: 'Orthopaedics, Spine, Peripheral Joints & Sports Rehab',
      settings: [
        'Outpatient Physiotherapy Clinics',
        'Hospital Rehab Departments',
        'Sports Injury Centres',
      ],
      keyWorkflows: [
        'Structured subjective intake with red-flag exclusion (Cauda Equina, fractures, myelopathy)',
        'Joint-specific objective assessment batteries & special test clusters (Lachman, Pivot Shift, Slump, Hawkins-Kennedy)',
        'Evidence-informed 4-phase criteria-based rehabilitation protocols with validated outcome measures',
      ],
      targetView: 'protocols',
      icon: Activity,
      accentColor: 'text-teal-700',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      id: 'sports-physician',
      role: 'Orthopaedic Surgeons & Sports Medicine Physicians',
      specialty: 'Surgical Triage, Joint Arthroscopy, Trauma & Sports Medicine',
      settings: [
        'Tertiary Apex Hospitals (AIIMS, PGI, Apollo, Fortis)',
        'District Hospitals',
        'Speciality Bone & Joint Centres',
      ],
      keyWorkflows: [
        'Pre-operative and post-operative surgical rehabilitation milestone protocols',
        'Tier-stratified diagnostic imaging guidance (X-ray, MRI STIR, CT 3D, USG) with Ayushman Bharat PM-JAY package rates',
        'Evidence-backed differential diagnosis review and surgical referral threshold scoring',
      ],
      targetView: 'investigations',
      icon: Microscope,
      accentColor: 'text-indigo-700',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      id: 'sc-coach',
      role: 'Strength & Conditioning (S&C) Specialists & Sports Scientists',
      specialty: 'Athletic Performance, Load Management & Periodisation',
      settings: [
        'Sports Authority of India (SAI) High Performance Centres',
        'National Cricket Academy (BCCI/NCA)',
        'Professional Franchises (IPL, PKL, ISL)',
        'Elite State Sports Academies',
      ],
      keyWorkflows: [
        '1RM strength estimation using Epley & Brzycki equations with percentage-based training zone dosing',
        'Periodisation model design (Block, Daily Undulating, Linear, Post-Injury Return) with 4-week mesocycles',
        'Indian facility adaptations (gym equipment substitutions, sand-pit training, bodyweight progressive calisthenics)',
      ],
      targetView: 'sandc',
      icon: Dumbbell,
      accentColor: 'text-blue-700',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'sports-nutritionist',
      role: 'Sports & Clinical Nutritionists / Dietitians',
      specialty: 'Performance Fueling, Body Composition & Clinical Diets',
      settings: [
        'Sports Institutes & Team Dietetics',
        'Metabolic & Rehab Clinics',
        'Fitness & Athletic Academies',
      ],
      keyWorkflows: [
        'Mifflin-St Jeor TDEE energy calculations with sport-specific activity multipliers',
        'ICMR-NIN (2024) aligned Indian meal schedule builder (Sattu, Besan, Paneer, Dahi, Soya chunks, Ragi)',
        'Relative Energy Deficiency in Sport (RED-S) screening & NADA/WADA anti-doping supplement safety',
      ],
      targetView: 'nutrition',
      icon: Apple,
      accentColor: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'high-performance-director',
      role: 'High-Performance Directors & Team Medical Leads',
      specialty: 'Return-to-Sport Decision Support & Injury Surveillance',
      settings: [
        'National Sports Federations (BCCI, AIFF, BAI, AKFI, WFI, Hockey India)',
        'State Olympic Associations',
        'Elite Training Academies',
      ],
      keyWorkflows: [
        'Sport-specific pre-participation screening (Cricket bowling loads, Kabaddi tackle laxity, Badminton lunges)',
        'Acute:Chronic Workload Ratio (ACWR) surveillance and rolling workload alerts',
        '5-Stage Return-to-Sport continuum checklist with formal Medical & Performance Clearance Certificate',
      ],
      targetView: 'athlete',
      icon: Trophy,
      accentColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'neuro-pediatric-geriatric',
      role: 'Speciality Physical Therapists (Neuro, Paediatric, Geriatric, Cardio)',
      specialty: 'Complex Rehabilitation & Multi-System Care',
      settings: [
        'Neuro-Rehab Institutes (NIMHANS, Specialized Neuro Centres)',
        'Paediatric Early Intervention Units',
        'Geriatric Day-Care & Fall Prevention Clinics',
        'Cardiac Rehab & ICU Steps',
      ],
      keyWorkflows: [
        'Standardized neuro batteries: Brunnstrom, Fugl-Meyer, Berg Balance, TUG, GMFCS, Gross Motor Function',
        'Post-stroke motor relearning, cerebral palsy tone management, Parkinsonian cueing, adolescent scoliosis',
        'Cardiopulmonary exercise tolerance (6MWT, METs) and post-CABG sternal precautions',
      ],
      targetView: 'protocols',
      icon: Stethoscope,
      accentColor: 'text-purple-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      id: 'mdt-lead',
      role: 'Hospital MDT Coordinators & Clinical Directors',
      specialty: 'Cross-Disciplinary Consensus & Clinical Governance',
      settings: [
        'NABH-Accredited Multi-Speciality Hospitals',
        'Spine & Joint Replacement Boards',
        'Academic Medical Colleges',
      ],
      keyWorkflows: [
        'Conducting structured multi-disciplinary case conferences across 6 specialist roles',
        'Synthesizing surgical, conservative, physical therapy, strength, and nutritional recommendations',
        'Exporting single-source-of-truth clinical consensus action plans for medical record documentation',
      ],
      targetView: 'mdt',
      icon: Users,
      accentColor: 'text-slate-800',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    },
  ];

  const filteredPersonas =
    activeCategory === 'all'
      ? personas
      : activeCategory === 'clinical'
      ? personas.filter((p) => p.id === 'physio' || p.id === 'sports-physician' || p.id === 'neuro-pediatric-geriatric')
      : activeCategory === 'sports'
      ? personas.filter((p) => p.id === 'sc-coach' || p.id === 'sports-nutritionist' || p.id === 'high-performance-director')
      : personas.filter((p) => p.id === 'mdt-lead' || p.id === 'sports-physician');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-900 text-white shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>ClinicaAI Target Ecosystem & Clinical Scope</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Who Is ClinicaAI Used For?
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              ClinicaAI is a high-precision, evidence-informed Clinical Decision Support System (CDSS)
              and Sports Science platform engineered for licensed healthcare professionals, athletic performance teams,
              and multi-disciplinary hospital services.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 mr-1">Filter Disciplines:</span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Stakeholders ({personas.length})
            </button>
            <button
              onClick={() => setActiveCategory('clinical')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'clinical'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Clinical & Physiotherapy
            </button>
            <button
              onClick={() => setActiveCategory('sports')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'sports'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Sports Science & High Performance
            </button>
            <button
              onClick={() => setActiveCategory('hospital')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'hospital'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Hospital MDT & Surgical
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              ICMR / MoHFW / SAI Aligned
            </span>
          </div>
        </div>

        {/* Personas Grid */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPersonas.map((persona) => {
              const Icon = persona.icon;
              return (
                <div
                  key={persona.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          <Icon className={`w-5 h-5 ${persona.accentColor}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 leading-snug">
                            {persona.role}
                          </h3>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {persona.specialty}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Settings */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        Clinical & Training Settings
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {persona.settings.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Workflows */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Core Daily Workflows in ClinicaAI
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {persona.keyWorkflows.map((kw, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{kw}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Jump Action */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Primary Entrypoint:
                    </span>
                    <button
                      onClick={() => {
                        onNavigate(persona.targetView);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Open Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Institutional Ecosystem Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-600" />
              Institutional Deployment Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">1. Hospital Health Systems</div>
                <div className="text-slate-600 leading-relaxed text-[11px]">
                  Tertiary apex centres (AIIMS, Apollo, Max) and district hospitals for standardized triage,
                  Ayushman Bharat PM-JAY package tiering, and surgical-physiotherapy cross-referral.
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">2. Sports Academies & SAI Centres</div>
                <div className="text-slate-600 leading-relaxed text-[11px]">
                  BCCI/NCA, SAI National Centres of Excellence, and franchise teams for bowling workload surveillance (ACWR),
                  kabaddi knee laxity, badminton lunge mechanics, and NADA-compliant nutrition.
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">3. Teaching & Physiotherapy Colleges</div>
                <div className="text-slate-600 leading-relaxed text-[11px]">
                  BPT/MPT clinical residency training, clinical reasoning OSCE exams, and standardized evidence-based
                  practice teaching aligned with World Physiotherapy (WCPT) and DCPTOT.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            ClinicaAI is strictly a clinical decision-support and athletic science system. It does not replace independent clinical judgment.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
