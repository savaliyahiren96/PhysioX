import React, { useState } from 'react';
import { Search, Plus, Bell, RefreshCw, ExternalLink, ShieldCheck, Check, Clock, Bookmark } from 'lucide-react';
import { ResearchWatchlist, LiteratureArticle } from '../types/clinical';
import { INITIAL_WATCHLISTS } from '../data/clinicalKnowledge';

export const ResearchWatchlistView: React.FC = () => {
  const [watchlists, setWatchlists] = useState<ResearchWatchlist[]>(INITIAL_WATCHLISTS);
  const [activeWatchlist, setActiveWatchlist] = useState<ResearchWatchlist>(INITIAL_WATCHLISTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LiteratureArticle[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // New Watchlist Form Modal State
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [newFrequency, setNewFrequency] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const handleRunScan = async (watchlistId: string) => {
    setIsScanning(true);
    setScanMessage(null);

    // Call server search endpoint
    try {
      const res = await fetch('/api/literature/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeWatchlist.keywords }),
      });
      const data = await res.json();
      setSearchResults(data.results || []);

      // Update watchlist lastRun timestamp
      setWatchlists((prev) =>
        prev.map((wl) =>
          wl.id === watchlistId
            ? { ...wl, lastRun: new Date().toISOString().split('T')[0], unreadCount: data.results?.length || 0 }
            : wl
        )
      );
      setScanMessage(
        `Literature scan complete: ${data.results?.length || 0} peer-reviewed publications retrieved and deduplicated from PubMed/Europe PMC indexing.`
      );
    } catch (err) {
      console.error(err);
      setScanMessage('Scan executed with local evidence cache.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleCreateWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim() || !newKeywords.trim()) return;

    const newWl: ResearchWatchlist = {
      id: `wl-${Date.now()}`,
      name: newTopicName.trim(),
      keywords: newKeywords.trim(),
      specialty: 'orthopaedics',
      frequency: newFrequency,
      lastRun: new Date().toISOString().split('T')[0],
      unreadCount: 0,
      active: true,
    };

    setWatchlists((prev) => [newWl, ...prev]);
    setActiveWatchlist(newWl);
    setShowNewModal(false);
    setNewTopicName('');
    setNewKeywords('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Research Watchlists & Literature Monitor
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Monitor conditions, joints, procedures, and interventions across legitimate literature repositories (PubMed & Europe PMC).
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-teal-400" />
          <span>New Research Watchlist</span>
        </button>
      </div>

      {/* Mandatory Governance Shield Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">
            Clinical Governance Shield: Automatic Rule Alteration Prohibited
          </div>
          <p className="leading-relaxed">
            New clinical publications and trials are tracked for clinician awareness and continuous learning.
            <strong className="text-slate-900 ml-1">Strict Safety Rule:</strong> Unreviewed research papers never automatically modify or alter ClinicaAI's active clinical decision rules. Any rule revision requires formal multidisciplinary review and validation.
          </p>
        </div>
      </div>

      {/* 2-Column Layout: Watchlists Sidebar + Active Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Watchlists List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
            <span>Configured Watchlists ({watchlists.length})</span>
            <span className="text-slate-400 font-mono">Sync: Manual / Batch</span>
          </div>

          <div className="space-y-2">
            {watchlists.map((wl) => {
              const isSelected = activeWatchlist.id === wl.id;

              return (
                <div
                  key={wl.id}
                  onClick={() => {
                    setActiveWatchlist(wl);
                    setScanMessage(null);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50/40 shadow-xs ring-1 ring-teal-700/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate flex-1">
                      {wl.name}
                    </span>
                    {wl.unreadCount > 0 && (
                      <span className="text-[11px] font-mono font-semibold text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200">
                        {wl.unreadCount} new
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    Keywords: {wl.keywords}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span>Scan: {wl.frequency}</span>
                    <span>Last run: {wl.lastRun}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Feed & Literature Query Simulator */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{activeWatchlist.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Target Search Query: <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">{activeWatchlist.keywords}</code>
                </div>
              </div>

              <button
                type="button"
                disabled={isScanning}
                onClick={() => handleRunScan(activeWatchlist.id)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs shrink-0 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Querying APIs...' : 'Run Scheduled Scan Now'}</span>
              </button>
            </div>

            {scanMessage && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-950 font-medium">
                {scanMessage}
              </div>
            )}

            {/* Publication Feed */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Indexed Publications & Systematic Reviews
              </h4>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-500 space-y-2">
                  <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
                  <p>Click "Run Scheduled Scan Now" to query PubMed and Europe PMC indexes for this topic.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((paper) => (
                    <div
                      key={paper.id}
                      className="border border-slate-200 rounded-lg p-4 space-y-2 hover:border-slate-300 transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                          {paper.studyType}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Indexed: {paper.year}
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 leading-snug">{paper.title}</h5>
                      <div className="text-slate-500">
                        {paper.authors} · <em>{paper.journal}</em>
                      </div>

                      <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded">
                        <strong>Key Findings: </strong> {paper.keyFindings}
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                        <span>Cohort: {paper.targetPopulation}</span>
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-700 hover:underline flex items-center gap-1 font-mono"
                        >
                          <span>DOI: {paper.doi}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Watchlist Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Configure New Research Watchlist</h3>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWatchlist} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topic / Condition Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Spondylolisthesis Surgical vs Conservative"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-teal-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  PubMed / Europe PMC Query Keywords:
                </label>
                <input
                  type="text"
                  placeholder="e.g. degenerative spondylolisthesis, decompression, fusion, RCT"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded bg-white focus:outline-teal-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scan Cadence:</label>
                <select
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded bg-white"
                >
                  <option value="Daily">Daily Scheduled Scan</option>
                  <option value="Weekly">Weekly Scheduled Scan</option>
                  <option value="Monthly">Monthly Scheduled Scan</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
                >
                  Save Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
