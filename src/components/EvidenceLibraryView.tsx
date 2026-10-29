import React, { useState } from 'react';
import { Search, ExternalLink, BookOpen, Filter, Calendar, Users, AlertCircle, FileText } from 'lucide-react';
import { LiteratureArticle } from '../types/clinical';
import { EVIDENCE_LIBRARY } from '../data/clinicalKnowledge';

export const EvidenceLibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [activeArticle, setActiveArticle] = useState<LiteratureArticle | null>(null);

  const studyTypes = ['All', 'Clinical Practice Guideline', 'Systematic Review / Meta-Analysis', 'Diagnostic Review'];

  const filteredArticles = EVIDENCE_LIBRARY.filter((art) => {
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keyFindings.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.targetPopulation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypeFilter === 'All' ||
      (selectedTypeFilter === 'Clinical Practice Guideline' && art.studyType.includes('Guideline')) ||
      (selectedTypeFilter === 'Systematic Review / Meta-Analysis' && (art.studyType.includes('Systematic') || art.studyType.includes('Meta'))) ||
      (selectedTypeFilter === 'Diagnostic Review' && art.studyType.includes('Review'));

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Medical Evidence & Clinical Practice Guidelines Library
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Peer-reviewed clinical practice guidelines (AAOS, NICE, JOSPT, ACR, NASS) with verified DOIs, sample populations, diagnostic accuracy metrics, and critical limitations.
        </p>
      </div>

      {/* Governance Search Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <BookOpen className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Evidence Provenance & Verification Standard
          </div>
          <p className="leading-relaxed">
            Every recommendation in ClinicaAI links to verified peer-reviewed literature. No references are hallucinated or fabricated. If evidence is conflicting, low quality, or insufficient, that status is transparently displayed.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guidelines, conditions, authors, or DOIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-teal-700 shadow-xs"
          />
        </div>

        {/* Study Type Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-fit">
          {studyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedTypeFilter(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedTypeFilter === type
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                  {art.studyType}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Reviewed: {art.lastChecked}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {art.title}
              </h3>

              <div className="text-xs text-slate-500 font-medium">
                {art.authors} · <em>{art.journal}</em> ({art.year})
              </div>

              <div className="text-xs text-slate-700 leading-relaxed pt-1">
                <strong className="text-slate-900">Key Clinical Findings: </strong>
                {art.keyFindings}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={`https://doi.org/${art.doi}`}
                target="_blank"
                rel="noreferrer"
                className="text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <span>DOI: {art.doi}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={() => setActiveArticle(art)}
                className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 rounded-md font-medium text-xs transition-colors"
              >
                View Full Appraisal →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Appraisal Modal */}
      {activeArticle && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  {activeArticle.studyType}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {activeArticle.title}
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  {activeArticle.authors} · {activeArticle.journal} ({activeArticle.year})
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">Target Patient Population:</span>
                <p>{activeArticle.targetPopulation}</p>
                <div className="text-[11px] text-slate-500 mt-1">Sample / Scope: {activeArticle.sampleSize}</div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Summary of Validated Findings:</span>
                <p className="leading-relaxed">{activeArticle.keyFindings}</p>
              </div>

              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1 text-amber-950">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Documented Limitations & Methodological Cautions:</span>
                </div>
                <p className="leading-relaxed">{activeArticle.limitations}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Last verification check: {activeArticle.lastChecked}</span>
                <a
                  href={`https://doi.org/${activeArticle.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Open Official DOI Publication</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Appraisal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
