import React, { useState } from 'react';
import { INDIAN_INVESTIGATIONS_ATLAS } from '../data/investigationReferenceData';
import { IndianInvestigationAtlasItem } from '../types/clinical';
import {
  Microscope,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Building2,
  BadgeIndianRupee,
  Layers,
  Eye,
  CheckCircle2,
  Activity,
} from 'lucide-react';

export const IndianInvestigationsModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalityId, setSelectedModalityId] = useState(INDIAN_INVESTIGATIONS_ATLAS[0].id);

  const filteredItems = INDIAN_INVESTIGATIONS_ATLAS.filter(
    (item) =>
      item.modalityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bodyRegionOrSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pathologicalFindingsAndSigns.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeItem: IndianInvestigationAtlasItem =
    INDIAN_INVESTIGATIONS_ATLAS.find((x) => x.id === selectedModalityId) ||
    INDIAN_INVESTIGATIONS_ATLAS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            <Microscope className="w-4 h-4 text-teal-600" />
            <span>Diagnostic Imaging & Clinical Pathology Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Indian Hospital Investigation Reference Atlas
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Comprehensive diagnostic atlas adapted for Indian healthcare infrastructure (Apex Institutes like AIIMS/PGI, State Medical Colleges, and District Hospitals). Real costs in INR, Ayushman Bharat PM-JAY coverage, visual inspection landmarks, and clinical rehabilitation implications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-900 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <BadgeIndianRupee className="w-3.5 h-3.5 text-teal-700" />
            <span>Ayushman Bharat / NABL Aligned</span>
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search investigations (Standing Knee X-ray, 3T MRI, DECT Gout, MSK Ultrasound, Needle EMG, Vitamin D, HLA-B27)..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-xs"
        />
      </div>

      {/* Grid: List (4 cols) + Details (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Investigation Modality List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Diagnostic Modalities ({filteredItems.length})
          </span>

          <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedModalityId(item.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm leading-snug">{item.modalityName}</span>
                    {item.ayushmanBharatCovered && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                          isSelected
                            ? 'bg-teal-400 text-slate-900'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        PM-JAY
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs mt-1 line-clamp-1 ${
                      isSelected ? 'text-teal-300' : 'text-slate-600'
                    }`}
                  >
                    {item.subType}
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-2 pt-1 border-t border-slate-100/30">
                    <span className={isSelected ? 'text-slate-300' : 'text-slate-400'}>
                      {item.bodyRegionOrSpecialty}
                    </span>
                    <span className={`font-mono font-semibold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {item.approximateCostINR.split('(')[0].trim()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dive Atlas Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
          {/* Header */}
          <div className="border-b border-slate-100 pb-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-teal-800">{activeItem.bodyRegionOrSpecialty}</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">{activeItem.modalityName}</h2>
                <div className="text-xs font-medium text-slate-600 mt-0.5">{activeItem.subType}</div>
              </div>

              {activeItem.ayushmanBharatCovered && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Covered under Ayushman Bharat (PM-JAY)</span>
                </div>
              )}
            </div>

            {/* Indian Healthcare Practical Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-medium text-[11px]">Indian Healthcare Cost Range:</span>
                <div className="font-bold text-slate-900 mt-0.5 font-mono">{activeItem.approximateCostINR}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-medium text-[11px]">Diagnostic Accuracy:</span>
                <div className="font-bold text-teal-800 mt-0.5">{activeItem.diagnosticAccuracySensSpec}</div>
              </div>
            </div>
          </div>

          {/* Hospital Tier Availability */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              Indian Hospital Tier Availability
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {activeItem.tierAvailability.map((tier, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                  {tier}
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Indications & Preparation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <strong className="text-slate-900">Clinical Purpose & Indications:</strong>
              <p className="text-slate-600 leading-relaxed">{activeItem.purposeAndIndications}</p>
            </div>
            <div className="space-y-1">
              <strong className="text-slate-900">Patient Preparation & Contraindications:</strong>
              <p className="text-slate-600 leading-relaxed">{activeItem.patientPreparationProtocol} {activeItem.contraindicationsAndSafety}</p>
            </div>
          </div>

          {/* Normal vs Pathological Findings */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1 text-xs">
              <strong className="text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Normal Anatomical Findings & Baseline Metrics:
              </strong>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{activeItem.normalAnatomicalFindings}</p>
            </div>

            <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl space-y-1 text-xs">
              <strong className="text-rose-950 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Characteristic Pathological Signs & Interpretation:
              </strong>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{activeItem.pathologicalFindingsAndSigns}</p>
            </div>
          </div>

          {/* Annotated Visual Diagram & Key Inspection Landmarks */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Eye className="w-4 h-4 text-teal-700" />
                Systematic Visual Reading Landmarks & Inspection Guide
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Expert Methodology</span>
            </div>
            <p className="text-slate-700 italic">"{activeItem.annotatedDiagramOrVisualDetails.visualDescription}"</p>

            <div>
              <span className="font-bold text-slate-800 text-[11px]">Key Anatomical Checkpoints:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1.5">
                {activeItem.annotatedDiagramOrVisualDetails.keyLandmarksToInspect.map((lm, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-700 bg-white p-2 rounded border border-slate-200">
                    <span className="text-teal-700 font-bold">•</span>
                    <span>{lm}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200">
              <strong>Pitfall / Artifact Awareness:</strong> {activeItem.annotatedDiagramOrVisualDetails.typicalPitfallsOrArtifacts}
            </div>
          </div>

          {/* Rehabilitation & Athletic Implications */}
          <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-xl text-xs text-slate-800 space-y-1">
            <strong className="text-teal-950 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-700" />
              Rehabilitation, Athletic Dosing & Return-to-Sport Implications:
            </strong>
            <p className="leading-relaxed">{activeItem.rehabilitationAndAthleticImplications}</p>
          </div>

          {/* Citation */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Reference: {activeItem.evidenceGuidelineCitation}</span>
            {activeItem.doi && (
              <a
                href={`https://doi.org/${activeItem.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:text-teal-900 flex items-center gap-1 font-mono"
              >
                <span>DOI: {activeItem.doi}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
