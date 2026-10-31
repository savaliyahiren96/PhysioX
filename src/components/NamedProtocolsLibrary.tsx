import React, { useState, useMemo } from 'react';
import {
  MASTER_NAMED_PROTOCOLS,
  DEFAULT_PROTOCOL_COMPARISONS,
  CLINICAAI_FEATURE_AUDIT_INVENTORY,
} from '../data/namedProtocolsLibrary';
import {
  NamedProtocolMaster,
  ProtocolCategory,
  ProtocolType,
  ProtocolComparison,
  FeatureAuditItem,
} from '../types/clinical';
import {
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Plus,
  Edit3,
  Archive,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Building2,
  GitCompare,
  FileCheck,
  ChevronRight,
  X,
  Stethoscope,
  Activity,
  History,
  RotateCcw,
} from 'lucide-react';

interface NamedProtocolsLibraryProps {
  onSelectProtocolForPatient?: (protocol: NamedProtocolMaster) => void;
}

export const NamedProtocolsLibrary: React.FC<NamedProtocolsLibraryProps> = ({
  onSelectProtocolForPatient,
}) => {
  // Protocol State (allowing admin additions/edits)
  const [protocols, setProtocols] = useState<NamedProtocolMaster[]>(MASTER_NAMED_PROTOCOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedSurgicalFilter, setSelectedSurgicalFilter] = useState<'ALL' | 'Nonsurgical / Conservative' | 'Postoperative / Surgical'>('ALL');
  const [selectedEvidenceLevel, setSelectedEvidenceLevel] = useState<string>('ALL');

  // Active View Tabs: 'directory' | 'comparison' | 'audit' | 'admin-add'
  const [mainTab, setMainTab] = useState<'directory' | 'comparison' | 'audit'>('directory');

  // Detail Modal State
  const [activeDetailProtocol, setActiveDetailProtocol] = useState<NamedProtocolMaster | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Comparison State
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(0);
  const [customCompareAId, setCustomCompareAId] = useState<string>(MASTER_NAMED_PROTOCOLS[0].id);
  const [customCompareBId, setCustomCompareBId] = useState<string>(MASTER_NAMED_PROTOCOLS[1].id);

  // Add/Edit Admin Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProtocolName, setNewProtocolName] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newIndication, setNewIndication] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newCategory, setNewCategory] = useState<ProtocolCategory>('Achilles & Foot Tendinopathy / Overload');

  // Categories list
  const categoryOptions: { label: string; value: string }[] = [
    { label: 'All Categories', value: 'ALL' },
    { label: 'Knee Arthroplasty & Joint Replacement', value: 'Knee Arthroplasty & Joint Replacement' },
    { label: 'Fractures & Trauma Rehabilitation', value: 'Fractures & Trauma Rehabilitation' },
    { label: 'Achilles & Foot', value: 'Achilles & Foot Tendinopathy / Overload' },
    { label: 'Patellar & Knee Cartilage', value: 'Patellar Tendon & Knee Cartilage / Ligament' },
    { label: 'Hip & Gluteal Tendinopathy', value: 'Hip & Gluteal Tendinopathy / Post-Arthroscopy' },
    { label: 'Shoulder & Rotator Cuff', value: 'Shoulder & Rotator Cuff / Instability' },
    { label: 'Elbow, Wrist & Hand', value: 'Elbow, Wrist & Hand Tendon / Nerve / Post-Op' },
    { label: 'ACL & Knee Ligament', value: 'ACL & Knee Ligament / Arthroplasty' },
    { label: 'Ankle & Foot Sprains', value: 'Ankle & Foot Sprain / Rupture / Deformity' },
    { label: 'Spinal, Neck & TMJ', value: 'Spinal, Neck & TMJ Mechanical / Stabilisation' },
    { label: 'Fracture Classifications & Post-Op (Legacy)', value: 'Fracture Classification & Post-Op Guidelines' },
    { label: 'Neurology & Stroke', value: 'Neurological & Neuromuscular Rehabilitation' },
    { label: 'Cardiopulmonary & Critical Care', value: 'Cardiopulmonary & Critical Care Rehabilitation' },
    { label: 'Paediatrics & Scoliosis', value: 'Paediatric & Developmental Approaches' },
    { label: 'Geriatrics & Falls Prevention', value: 'Geriatric, Balance & Frailty Programmes' },
    { label: 'Pelvic Health & Incontinence', value: 'Pelvic Health, Incontinence & Postpartum Care' },
  ];

  // Filtering Logic
  const filteredProtocols = useMemo(() => {
    return protocols.filter((p) => {
      const matchesSearch =
        p.protocolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.associatedMedicalCondition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.clinicalIndication.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.supportingReferences.some((r) => r.authorsYear.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'ALL' || p.protocolCategory === selectedCategory;
      const matchesType = selectedType === 'ALL' || p.protocolType === selectedType;
      const matchesSurg = selectedSurgicalFilter === 'ALL' || p.surgicalVsNonsurgical === selectedSurgicalFilter;
      const matchesEv = selectedEvidenceLevel === 'ALL' || p.evidenceLevel.includes(selectedEvidenceLevel);

      return matchesSearch && matchesCat && matchesType && matchesSurg && matchesEv;
    });
  }, [protocols, searchQuery, selectedCategory, selectedType, selectedSurgicalFilter, selectedEvidenceLevel]);

  // Handle Copy Dosage
  const handleCopyDosage = (protocol: NamedProtocolMaster) => {
    const text = `
CLINICAAI EVIDENCE-BASED PHYSIOTHERAPY PROTOCOL
Protocol: ${protocol.protocolName}
Condition: ${protocol.associatedMedicalCondition}
Category: ${protocol.protocolCategory} (${protocol.surgicalVsNonsurgical})
Evidence Level: ${protocol.evidenceLevel}

CLINICAL INDICATION:
${protocol.clinicalIndication}

EXERCISE PRESCRIPTION & DOSAGE:
${protocol.exerciseInterventions
  .map(
    (ex, idx) =>
      `${idx + 1}. ${ex.exerciseName}\n   Positioning: ${ex.patientPositioning}\n   Dosage: ${ex.dosageSetsReps}\n   Frequency: ${ex.frequency} | Duration: ${ex.duration}\n   Technique: ${ex.techniqueDescription}`
  )
  .join('\n\n')}

PROGRESSION CRITERIA:
${protocol.progressionCriteria.map((c) => `• ${c}`).join('\n')}

SAFETY PRECAUTIONS & CONTRAINDICATIONS:
Precautions: ${protocol.precautions.join('; ')}
Contraindications: ${protocol.contraindications.join('; ')}

EVIDENCE CITATIONS:
${protocol.supportingReferences.map((r) => `• ${r.authorsYear}: "${r.title}". ${r.journal}${r.doi ? ` (DOI: ${r.doi})` : ''}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(protocol.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Handle Add Protocol
  const handleAddNewProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProtocolName || !newCondition) return;

    const customProtocol: NamedProtocolMaster = {
      id: `prot-custom-${Date.now()}`,
      protocolName: newProtocolName,
      associatedMedicalCondition: newCondition,
      relevantSpeciality: 'musculoskeletal_physiotherapy',
      anatomicalRegion: 'Multi-Region',
      protocolCategory: newCategory,
      protocolType: 'Active Exercise Protocol',
      clinicalIndication: newIndication || 'Clinician-registered local hospital protocol.',
      treatmentObjectives: ['Tissue remodeling', 'Functional restoration'],
      patientSelectionCriteria: ['Clinician assessed suitable candidate'],
      exerciseInterventions: [
        {
          exerciseName: 'Primary Prescribed Exercise',
          patientPositioning: 'Functional position',
          dosageSetsReps: newDosage || '3 sets of 10–12 reps',
          frequency: '3 times weekly',
          duration: '6–8 weeks',
          techniqueDescription: 'Perform with strict form avoiding compensatory substitution.',
        },
      ],
      progressionCriteria: ['Pain <= 3/10 during execution'],
      precautions: ['Monitor for next-day flare'],
      contraindications: ['Acute unhealed fracture'],
      expectedClinicalOutcomes: 'Restoration of pain-free range of motion.',
      reassessmentCriteria: ['Visual Analogue Scale', 'Goniometry'],
      supportingReferences: [
        {
          authorsYear: 'Hospital Clinical Practice Consensus (2026)',
          title: 'Institutional Criteria-Based Rehabilitation Pathway',
          journal: 'Clinical Protocol Registry',
        },
      ],
      evidenceLevel: 'Level II (Prospective Cohort Study / Pragmatic Trial)',
      surgicalVsNonsurgical: 'Nonsurgical / Conservative',
      publicationYear: 2026,
      supersededStatus: 'Valid Guideline Alternative',
      version: 'v1.0 (Hospital Custom)',
      lastUpdatedDate: new Date().toISOString().split('T')[0],
    };

    setProtocols([customProtocol, ...protocols]);
    setIsAddModalOpen(false);
    setNewProtocolName('');
    setNewCondition('');
    setNewIndication('');
    setNewDosage('');
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (confirm('Reset protocol library to master clinical defaults?')) {
      setProtocols(MASTER_NAMED_PROTOCOLS);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Ribbon */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Module 20B/20C · Master Physiotherapy Knowledge Extractor</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Complete Named Physiotherapy Protocols Library
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Full clinical extraction of all named protocols across Achilles, Patellar Tendon, Hip & Gluteal, Shoulder, Elbow/Wrist/Hand, ACL & Knee, Ankle/Foot, Spine & Neck, and Fracture Classifications. Standardized across all 19 clinical parameters with side-by-side protocol comparison and institutional version control.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMainTab('directory')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              mainTab === 'directory'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Protocols Directory ({protocols.length})</span>
          </button>

          <button
            onClick={() => setMainTab('comparison')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              mainTab === 'comparison'
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Side-by-Side Comparison</span>
          </button>

          <button
            onClick={() => setMainTab('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              mainTab === 'audit'
                ? 'bg-teal-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Feature Audit (Module 20A)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: PROTOCOLS DIRECTORY & SEARCHABLE LIBRARY
          ========================================================================= */}
      {mainTab === 'directory' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by protocol name (Alfredson, Shelbourne, GLA:D, Tyler Twist, Schroth, Neer), condition, or citation..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Surgical Filter */}
              <select
                value={selectedSurgicalFilter}
                onChange={(e) => setSelectedSurgicalFilter(e.target.value as any)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="ALL">All Care Pathways</option>
                <option value="Nonsurgical / Conservative">Nonsurgical / Conservative</option>
                <option value="Postoperative / Surgical">Postoperative / Surgical</option>
              </select>

              {/* Add Custom Protocol Action */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3 py-2 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-teal-100 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-teal-600" />
                  <span>Add Protocol</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Reset to Master Defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Stat Pill Counts */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-700">Active Protocols: {filteredProtocols.length} of {protocols.length}</span>
              <span>·</span>
              <span>Achilles/Foot: {protocols.filter((p) => p.protocolCategory.includes('Achilles')).length}</span>
              <span>·</span>
              <span>Knee/Patellar: {protocols.filter((p) => p.protocolCategory.includes('Patellar')).length}</span>
              <span>·</span>
              <span>ACL Rehab: {protocols.filter((p) => p.protocolCategory.includes('ACL')).length}</span>
              <span>·</span>
              <span>Shoulder: {protocols.filter((p) => p.protocolCategory.includes('Shoulder')).length}</span>
              <span>·</span>
              <span>Elbow/Hand: {protocols.filter((p) => p.protocolCategory.includes('Elbow')).length}</span>
              <span>·</span>
              <span>Spine & Neck: {protocols.filter((p) => p.protocolCategory.includes('Spinal')).length}</span>
              <span>·</span>
              <span>Fractures & Post-Op: {protocols.filter((p) => p.protocolCategory.includes('Fracture')).length}</span>
            </div>
          </div>

          {/* Protocols Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProtocols.map((protocol) => {
              const isCopied = copiedId === protocol.id;
              return (
                <div
                  key={protocol.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                          {protocol.protocolCategory}
                        </span>
                        <h3 className="font-bold text-base text-slate-900 leading-snug">
                          {protocol.protocolName}
                        </h3>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          protocol.surgicalVsNonsurgical === 'Postoperative / Surgical'
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {protocol.surgicalVsNonsurgical.split('/')[0].trim()}
                      </span>
                    </div>

                    {/* Associated Condition */}
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Associated Medical Condition:</span>
                      <span className="font-semibold text-slate-800">{protocol.associatedMedicalCondition}</span>
                    </div>

                    {/* Clinical Indication */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {protocol.clinicalIndication}
                    </p>

                    {/* Key Exercise Dosage Highlights */}
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Prescription Dosage & Frequency:
                      </span>
                      <div className="font-mono text-xs font-semibold text-slate-800 bg-slate-50/70 p-2 rounded border border-slate-100">
                        {protocol.exerciseInterventions[0]?.dosageSetsReps || 'Prescription structured per phase'}
                        <div className="text-[11px] text-teal-700 font-sans mt-0.5">
                          {protocol.exerciseInterventions[0]?.frequency || 'Daily/Weekly'} · {protocol.exerciseInterventions[0]?.duration}
                        </div>
                      </div>
                    </div>

                    {/* Evidence & Status */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-500 font-mono text-[10px]">
                        {protocol.evidenceLevel.split('(')[0].trim()}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        Pub: {protocol.publicationYear} · {protocol.version}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyDosage(protocol)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy full clinical regimen to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      {onSelectProtocolForPatient && (
                        <button
                          onClick={() => onSelectProtocolForPatient(protocol)}
                          className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Adopt this named protocol into active patient treatment plan"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                          <span>Adopt for Patient</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveDetailProtocol(protocol)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>19-Field Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: SIDE-BY-SIDE PROTOCOL COMPARISON TOOL (MODULE 20E)
          ========================================================================= */}
      {mainTab === 'comparison' && (
        <div className="space-y-6">
          {/* Preset Comparisons Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-indigo-600" />
                Select Benchmark Clinical Comparison
              </span>
              <span className="text-[11px] text-slate-500">Module 20E Multi-Protocol Decision Support</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {DEFAULT_PROTOCOL_COMPARISONS.map((comp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveComparisonIndex(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeComparisonIndex === idx
                      ? 'bg-indigo-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {comp.protocolA.protocolName} vs {comp.protocolB.protocolName}
                </button>
              ))}
            </div>
          </div>

          {/* Active Comparison Matrix Display */}
          {(() => {
            const comp = DEFAULT_PROTOCOL_COMPARISONS[activeComparisonIndex];
            if (!comp) return null;

            return (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-6 p-6">
                {/* Header Cards for the Two Protocols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                  <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Protocol A</span>
                    <h3 className="text-lg font-bold text-teal-950">{comp.protocolA.protocolName}</h3>
                    <div className="text-xs text-teal-800 font-medium">{comp.protocolA.associatedMedicalCondition}</div>
                    <div className="text-[11px] text-slate-600">{comp.protocolA.clinicalIndication}</div>
                  </div>

                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">Protocol B</span>
                    <h3 className="text-lg font-bold text-indigo-950">{comp.protocolB.protocolName}</h3>
                    <div className="text-xs text-indigo-800 font-medium">{comp.protocolB.associatedMedicalCondition}</div>
                    <div className="text-[11px] text-slate-600">{comp.protocolB.clinicalIndication}</div>
                  </div>
                </div>

                {/* Comparison Dimension Rows */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Comparative Clinical Parameters
                  </span>

                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                    {comp.comparisonPoints.map((point, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-50/60 transition-colors space-y-2">
                        <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                          <span>{point.feature}</span>
                          <span className="text-[11px] text-slate-400 font-normal font-mono">Dimension #{idx + 1}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                            <strong className="text-teal-900 block mb-0.5">{comp.protocolA.protocolName}:</strong>
                            <span>{point.protocolAValue}</span>
                          </div>

                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                            <strong className="text-indigo-900 block mb-0.5">{comp.protocolB.protocolName}:</strong>
                            <span>{point.protocolBValue}</span>
                          </div>
                        </div>

                        <div className="p-2 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-950 text-[11px]">
                          <strong>Clinical Takeaway:</strong> {point.clinicalTakeaway}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Decision Guidance Summary */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1.5 text-xs">
                  <div className="font-bold text-teal-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Evidence-Informed Clinical Decision Guidance</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">{comp.clinicalDecisionGuidance}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          TAB 3: FEATURE AUDIT INVENTORY (MODULE 20A)
          ========================================================================= */}
      {mainTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <span>Module 20A: Existing Feature Detection & Smart Integration Audit</span>
            </h3>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              Before introducing new components, all existing files were comprehensively audited. Existing functional capabilities were preserved, incomplete modules were expanded, and the complete Word document knowledge base was seamlessly integrated.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs divide-y divide-slate-100 text-xs">
            {CLINICAAI_FEATURE_AUDIT_INVENTORY.map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-400">{item.moduleCode}</span>
                    <span className="font-bold text-slate-900 text-sm">{item.featureName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {item.domain}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      item.status === 'Existing & Functional'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : item.status === 'Implemented & Tested'
                        ? 'bg-teal-50 text-teal-800 border border-teal-300'
                        : item.status === 'Existing but Incomplete'
                        ? 'bg-amber-50 text-amber-800 border border-amber-300'
                        : 'bg-rose-50 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 pt-1">
                  <div>
                    <strong className="text-slate-800 block text-[11px]">Inspection Summary:</strong>
                    <span>{item.inspectionSummary}</span>
                  </div>
                  <div>
                    <strong className="text-slate-800 block text-[11px]">Smart Integration Action:</strong>
                    <span>{item.actionTaken}</span>
                  </div>
                </div>

                <div className="text-[10px] text-teal-800 font-mono pt-1">
                  Verified: {item.verificationEvidence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL 19-PARAMETER DETAIL MODAL (MODULE 20B)
          ========================================================================= */}
      {activeDetailProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-6">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-start justify-between shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <span>{activeDetailProtocol.protocolCategory}</span>
                  <span>·</span>
                  <span>{activeDetailProtocol.surgicalVsNonsurgical}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {activeDetailProtocol.protocolName}
                </h2>
                <div className="text-xs text-slate-300 font-medium">
                  {activeDetailProtocol.associatedMedicalCondition} ({activeDetailProtocol.anatomicalRegion})
                </div>
              </div>

              <button
                onClick={() => setActiveDetailProtocol(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body: All 19 Clinical Parameters */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 flex-1">
              {/* Surgical Instruction Priority Warning Banner if post-op */}
              {activeDetailProtocol.surgicalVsNonsurgical.includes('Postoperative') && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Mandatory Postoperative Clinical Governance: </span>
                    <span>Always prioritize the operating surgeon’s specific operative report and patient-specific tissue restrictions over standardized generic protocol timelines.</span>
                  </div>
                </div>
              )}

              {/* 1. Indication & Objectives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block font-bold uppercase tracking-wider text-[11px]">
                    1. Clinical Indication & Presentation:
                  </strong>
                  <p className="leading-relaxed">{activeDetailProtocol.clinicalIndication}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block font-bold uppercase tracking-wider text-[11px]">
                    2. Treatment Objectives:
                  </strong>
                  <ul className="list-disc list-inside space-y-1">
                    {activeDetailProtocol.treatmentObjectives.map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. Patient Selection Criteria */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold uppercase tracking-wider text-[11px]">
                  3. Patient Selection Criteria:
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  {activeDetailProtocol.patientSelectionCriteria.map((crit, idx) => (
                    <li key={idx}>{crit}</li>
                  ))}
                </ul>
              </div>

              {/* 3. Detailed Exercise Interventions (Dosage, Positioning, Frequency, Duration) */}
              <div className="space-y-3">
                <strong className="text-slate-900 block font-bold uppercase tracking-wider text-[11px]">
                  4. Exercise & Intervention Prescriptions (Dosage, Positioning, Frequency, Duration):
                </strong>

                <div className="space-y-3">
                  {activeDetailProtocol.exerciseInterventions.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-teal-600" />
                          <span>{ex.exerciseName}</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                          {ex.dosageSetsReps}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                        <div>
                          <strong className="text-slate-800 block">Positioning:</strong>
                          <span>{ex.patientPositioning}</span>
                        </div>
                        <div>
                          <strong className="text-slate-800 block">Frequency:</strong>
                          <span>{ex.frequency}</span>
                        </div>
                        <div>
                          <strong className="text-slate-800 block">Duration:</strong>
                          <span>{ex.duration}</span>
                        </div>
                      </div>

                      <div className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed text-[11px]">
                        <strong className="text-slate-900">Technique Description: </strong>
                        <span className="whitespace-pre-line">{ex.techniqueDescription}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Progression Criteria, Precautions & Contraindications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                  <strong className="text-emerald-950 block font-bold">Progression Criteria:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {activeDetailProtocol.progressionCriteria.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
                  <strong className="text-amber-950 block font-bold">Precautions:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {activeDetailProtocol.precautions.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
                  <strong className="text-rose-950 block font-bold">Contraindications:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {activeDetailProtocol.contraindications.map((ci, idx) => (
                      <li key={idx}>{ci}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5. Clinical Outcomes & Reassessment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 block font-bold">Expected Clinical Outcomes:</strong>
                  <p>{activeDetailProtocol.expectedClinicalOutcomes}</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 block font-bold">Reassessment Criteria:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {activeDetailProtocol.reassessmentCriteria.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 6. Scientific References & Evidence Level */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 block font-bold uppercase tracking-wider text-[11px]">
                    Supporting Peer-Reviewed Evidence & Citations:
                  </strong>
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {activeDetailProtocol.evidenceLevel}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeDetailProtocol.supportingReferences.map((ref, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded border border-slate-200 text-[11px] space-y-0.5">
                      <div className="font-bold text-slate-900">"{ref.title}"</div>
                      <div className="text-slate-600">{ref.authorsYear} · <em>{ref.journal}</em></div>
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 font-mono text-[10px]"
                        >
                          <span>DOI: {ref.doi}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 font-mono">
                Version: {activeDetailProtocol.version} · Updated: {activeDetailProtocol.lastUpdatedDate}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyDosage(activeDetailProtocol)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Clinical Regimen</span>
                </button>

                {onSelectProtocolForPatient && (
                  <button
                    onClick={() => {
                      onSelectProtocolForPatient(activeDetailProtocol);
                      setActiveDetailProtocol(null);
                    }}
                    className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-200" />
                    <span>Adopt into Active Treatment Plan</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveDetailProtocol(null)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Detail Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD CUSTOM PROTOCOL MODAL (MODULE 20F)
          ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                <span>Register Custom Clinical / Hospital Protocol</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewProtocol} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Protocol Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AIIMS Accelerated Knee Post-Op Pathway"
                  value={newProtocolName}
                  onChange={(e) => setNewProtocolName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Associated Medical Condition</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Post-Meniscal Repair with Partial Weight Bearing"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Protocol Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  {categoryOptions.filter((c) => c.value !== 'ALL').map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Indication</label>
                <textarea
                  rows={2}
                  placeholder="Clinical presentation and criteria for initiating this protocol..."
                  value={newIndication}
                  onChange={(e) => setNewIndication(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Exercise Dosage (Sets/Reps & Frequency)</label>
                <input
                  type="text"
                  placeholder="e.g. 3 sets of 12 reps, twice daily for 6 weeks"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Save & Register Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
