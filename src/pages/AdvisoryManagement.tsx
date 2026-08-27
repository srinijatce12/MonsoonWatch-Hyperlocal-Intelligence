import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Edit3, Eye, Send, CheckCircle2, CloudRain, AlertTriangle, Sparkles } from 'lucide-react';
import { OfficerSidebar, OfficerMobileNav, OfficerTopbar } from '@/components/OfficerSidebar';
import { StatusBadge } from '@/components/StatusBadge';
import { Modal } from '@/components/Modal';
import { BLOCKS, Advisory, tamilTranslations } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function AdvisoryManagement() {
  const navigate = useNavigate();
  const { issueAdvisory } = useApp();
  const [blockId, setBlockId] = useState('vadipatti');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(() => BLOCKS.find((b) => b.id === 'vadipatti')!.suggestedMessage);
  const [crop, setCrop] = useState('Paddy');
  const [type, setType] = useState<'Advisory' | 'Warning'>('Warning');
  const [language, setLanguage] = useState<'Tamil' | 'English'>('Tamil');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [issued, setIssued] = useState(false);

  const block = BLOCKS.find((b) => b.id === blockId)!;

  const applySuggestion = (id: string) => {
    const b = BLOCKS.find((x) => x.id === id)!;
    setMessage(b.suggestedMessage);
    setType(b.suggestedAction === 'warning' ? 'Warning' : 'Advisory');
    setCrop(b.majorCrops[0]);
  };

  const handleIssue = () => {
    const adv: Advisory = {
      id: `adv-${Date.now()}`,
      blockId: block.id,
      blockName: block.name,
      type,
      title: type === 'Warning' ? 'Possible Dry Spell' : 'Favourable Sowing Window',
      message,
      crop,
      language,
      date: 'Aug 27, 2026',
      issuedBy: 'Agricultural Department',
      read: false,
      issued: true,
      severity: type === 'Warning' ? 'high' : 'info',
    };
    issueAdvisory(adv);
    setIssued(true);
  };

  const reset = () => {
    setIssued(false);
    setEditing(false);
    setPreviewOpen(false);
  };

  const previewMessage = language === 'Tamil' ? (tamilTranslations[message] || message) : message;

  return (
    <div className="min-h-screen bg-leaf-50/40 flex">
      <OfficerSidebar />
      <div className="flex-1 min-w-0 pb-16 lg:pb-0">
        <OfficerTopbar title="Advisory Management" subtitle="Review, edit and issue advisories" />
        <main className="px-5 lg:px-8 py-6 space-y-6 max-w-5xl">
          {/* Block selector */}
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-sm font-medium text-brand-600">Select Block:</label>
            <select
              value={blockId}
              onChange={(e) => {
                setBlockId(e.target.value);
                setIssued(false);
                applySuggestion(e.target.value);
              }}
              className="input w-auto py-2 text-sm font-medium"
            >
              {BLOCKS.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <StatusBadge status={block.status} size="sm" />
          </div>

          {issued ? (
            // Success state
            <div className="card p-8 text-center animate-scaleIn">
              <div className="h-16 w-16 rounded-full bg-leaf-200/60 grid place-items-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-leaf-600" />
              </div>
              <h2 className="font-display font-bold text-brand-800 text-xl">{type} issued successfully</h2>
              <p className="text-sm text-brand-500 mt-2">The {type.toLowerCase()} has been sent to farmers in {block.name}.</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-brand-600 bg-leaf-50 rounded-xl px-4 py-2.5">
                <Sparkles className="h-4 w-4 text-leaf-500" />
                Recipients: Farmers in {block.name} Block
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={reset} className="btn-ghost">Issue another</button>
                <button onClick={() => navigate('/officer')} className="btn-primary">Back to Dashboard</button>
              </div>
            </div>
          ) : (
            <>
              {/* System suggestion */}
              <div className={`card p-5 border-l-4 ${block.suggestedAction === 'warning' ? 'border-l-red-400' : 'border-l-leaf-400'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-brand-500" />
                  <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">System Suggestion</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-leaf-50">
                    <p className="text-xs text-brand-400">Onset Probability</p>
                    <p className="font-display font-bold text-xl text-brand-700">{block.onset}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50">
                    <p className="text-xs text-brand-400">Break Probability</p>
                    <p className="font-display font-bold text-xl text-amber-600">{block.break}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-50">
                    <p className="text-xs text-brand-400">Suggested Action</p>
                    <p className="font-semibold text-brand-700 mt-0.5">{block.suggestedAction === 'warning' ? 'Warning recommended' : 'Advisory recommended'}</p>
                  </div>
                </div>
                <div className="bg-leaf-50/60 rounded-xl p-3">
                  <p className="text-xs text-brand-400 mb-1">Suggested Message</p>
                  <p className="text-sm text-brand-700 leading-relaxed">{block.suggestedMessage}</p>
                </div>
              </div>

              {/* Advisory composer */}
              <div className="card p-5">
                <h3 className="font-display font-semibold text-brand-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-leaf-500" />
                  Compose Advisory
                </h3>

                <div className="space-y-4">
                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-brand-600 mb-1.5 block">Message</label>
                    {editing ? (
                      <textarea
                        className="input min-h-[100px] resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    ) : (
                      <div className="p-3 rounded-xl bg-leaf-50 border border-leaf-200 text-sm text-brand-700 leading-relaxed">
                        {message}
                      </div>
                    )}
                    <button
                      onClick={() => setEditing(!editing)}
                      className="mt-2 text-xs text-brand-500 hover:text-brand-700 flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> {editing ? 'Done editing' : 'Edit message'}
                    </button>
                  </div>

                  {/* Crop + Type + Language */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-brand-600 mb-1.5 block">Crop</label>
                      <select
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="input py-2.5 text-sm"
                      >
                        {block.majorCrops.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-brand-600 mb-1.5 block">Type</label>
                      <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-leaf-200">
                        {(['Advisory', 'Warning'] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setType(t)}
                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                              type === t
                                ? t === 'Warning' ? 'bg-red-500 text-white' : 'bg-brand-700 text-white'
                                : 'text-brand-500'
                            }`}
                          >
                            {t === 'Warning' ? <AlertTriangle className="h-3 w-3" /> : <CloudRain className="h-3 w-3" />}
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-brand-600 mb-1.5 block">Language</label>
                      <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-leaf-200">
                        {(['Tamil', 'English'] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => setLanguage(l)}
                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition ${
                              language === l ? 'bg-brand-700 text-white' : 'text-brand-500'
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button onClick={() => setPreviewOpen(true)} className="btn-ghost">
                      <Eye className="h-4 w-4" /> Preview
                    </button>
                    <button onClick={handleIssue} className={`btn-primary ${type === 'Warning' ? '!bg-red-500 hover:!bg-red-600' : ''}`}>
                      <Send className="h-4 w-4" />
                      Issue {type}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <OfficerMobileNav />

      {/* Preview modal */}
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Farmer Preview" size="sm">
        <div className={`rounded-2xl p-5 border ${type === 'Warning' ? 'border-red-200 bg-red-50/40' : 'border-leaf-200 bg-leaf-50/40'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`h-10 w-10 rounded-xl grid place-items-center ${type === 'Warning' ? 'bg-red-100 text-red-600' : 'bg-leaf-200/60 text-leaf-700'}`}>
              {type === 'Warning' ? <AlertTriangle className="h-5 w-5" /> : <CloudRain className="h-5 w-5" />}
            </div>
            <div>
              <span className={`chip text-[10px] ${type === 'Warning' ? 'bg-red-100 text-red-700' : 'bg-leaf-200/60 text-leaf-700'}`}>{type}</span>
              <p className="font-semibold text-brand-800 text-sm mt-1">{type === 'Warning' ? 'Possible Dry Spell' : 'Favourable Sowing Window'}</p>
            </div>
          </div>
          <p className="text-sm text-brand-700 leading-relaxed">{previewMessage}</p>
          <div className="mt-4 pt-3 border-t border-leaf-200/70 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-400">
            <span>Crop: {crop}</span>
            <span>Block: {block.name}</span>
            <span>Language: {language}</span>
            <span>Issued by: Agricultural Department</span>
          </div>
        </div>
        <p className="text-xs text-brand-400 mt-3 text-center">This is how the farmer will see the message.</p>
      </Modal>
    </div>
  );
}
