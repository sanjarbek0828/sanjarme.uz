'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  User, 
  Cpu, 
  Plus, 
  Trash2, 
  Save, 
  Loader2,
  CheckCircle2,
  Database,
  RefreshCw,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  updateSiteContent, 
  populateFirestore, 
  getFirestoreConnectionStatus,
  subscribeSiteContent
} from '@/lib/data-service';
import { SiteContent, SkillItem } from '@/lib/types';
import { initialSiteContent } from '@/lib/initial-data';

export default function AdminSettingsPage() {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialSiteContent);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'skills' | 'database'>('hero');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [seedingDb, setSeedingDb] = useState<boolean>(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    projectId: string;
    counts: { projects: number; certificates: number; messages: number };
    error?: string;
  }>({
    connected: false,
    projectId: 'portfolio-9d780',
    counts: { projects: 0, certificates: 0, messages: 0 },
  });

  // Hero form state
  const [heroName, setHeroName] = useState('');
  const [heroRole, setHeroRole] = useState('');
  const [heroTagline, setHeroTagline] = useState('');
  const [heroSubtext, setHeroSubtext] = useState('');
  const [heroAvailability, setHeroAvailability] = useState('');
  const [heroPrimaryCta, setHeroPrimaryCta] = useState('');
  const [heroSecondaryCta, setHeroSecondaryCta] = useState('');

  // About form state
  const [aboutHeading, setAboutHeading] = useState('');
  const [bio1, setBio1] = useState('');
  const [bio2, setBio2] = useState('');
  const [bio3, setBio3] = useState('');
  const [yearsExp, setYearsExp] = useState(1);
  const [projCount, setProjCount] = useState(3);
  const [aboutLocation, setAboutLocation] = useState('');
  const [aboutAvailability, setAboutAvailability] = useState('');
  const [languagesInput, setLanguagesInput] = useState('');

  // Skills state
  const [skillsList, setSkillsList] = useState<SkillItem[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillItem['category']>('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem['level']>('Expert');

  const fetchDbStatus = async () => {
    try {
      const status = await getFirestoreConnectionStatus();
      setDbStatus(status);
    } catch (err) {
      console.error('Error checking DB status:', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDbStatus();
    }, 0);

    const unsub = subscribeSiteContent((data) => {
      if (data) {
        setSiteContent(data);
        setHeroName(data.hero?.name || '');
        setHeroRole(data.hero?.role || '');
        setHeroTagline(data.hero?.tagline || '');
        setHeroSubtext(data.hero?.subtext || '');
        setHeroAvailability(data.hero?.availabilityStatus || '');
        setHeroPrimaryCta(data.hero?.primaryCtaText || '');
        setHeroSecondaryCta(data.hero?.secondaryCtaText || '');

        setAboutHeading(data.about?.heading || '');
        setBio1(data.about?.bioParagraphs?.[0] || '');
        setBio2(data.about?.bioParagraphs?.[1] || '');
        setBio3(data.about?.bioParagraphs?.[2] || '');
        setYearsExp(Number(data.about?.yearsExperience) || 1);
        setProjCount(Number(data.about?.projectsCompleted) || 3);
        setAboutLocation(data.about?.location || '');
        setAboutAvailability(data.about?.availability || '');
        setLanguagesInput(data.about?.languages ? data.about.languages.join(', ') : '');

        setSkillsList(data.skills || []);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timer);
      unsub();
    };
  }, []);

  const handleSeedDatabase = async () => {
    setSeedingDb(true);
    setSeedResult(null);
    try {
      const res = await populateFirestore(true);
      setSeedResult(res);
      await fetchDbStatus();
    } catch (err) {
      setSeedResult({
        success: false,
        message: err instanceof Error ? err.message : 'Database sync failed',
      });
    } finally {
      setSeedingDb(false);
      setTimeout(() => setSeedResult(null), 6000);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updatedHero = {
        name: heroName,
        role: heroRole,
        tagline: heroTagline,
        subtext: heroSubtext,
        availabilityStatus: heroAvailability,
        primaryCtaText: heroPrimaryCta,
        secondaryCtaText: heroSecondaryCta,
      };
      await updateSiteContent('hero', updatedHero);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save hero failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const paragraphs = [bio1, bio2, bio3].filter(Boolean);
      const languages = languagesInput.split(',').map(s => s.trim()).filter(Boolean);

      const updatedAbout = {
        ...siteContent.about,
        heading: aboutHeading,
        bioParagraphs: paragraphs,
        yearsExperience: Number(yearsExp),
        projectsCompleted: Number(projCount),
        location: aboutLocation,
        availability: aboutAvailability,
        languages,
      };
      await updateSiteContent('about', updatedAbout);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save about failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: SkillItem = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      iconName: 'Code2',
    };

    const updated = [...skillsList, newSkill];
    setSkillsList(updated);
    setNewSkillName('');

    await updateSiteContent('skills', updated);
  };

  const handleDeleteSkill = async (name: string) => {
    const updated = skillsList.filter(s => s.name !== name);
    setSkillsList(updated);
    await updateSiteContent('skills', updated);
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col justify-center items-center space-y-3">
        <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
        <span className="text-xs font-mono text-neutral-400">Loading site settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Site Content & Database
            </h1>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time content management with immediate propagation across your public portfolio.
          </p>
        </div>

        {/* Success toast badge */}
        {saveSuccess && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Changes published live!</span>
          </div>
        )}
      </div>

      {/* Apple-style Segmented Navigation Tabs */}
      <div className="inline-flex p-1 rounded-full apple-glass-pill">
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
            activeTab === 'hero'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hero Section</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
            activeTab === 'about'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>About Story</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
            activeTab === 'skills'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
            activeTab === 'database'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Database & Cloud</span>
        </button>
      </div>

      {/* Tab 1: Hero Settings Form */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="admin-glass-card p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="text-lg font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
              Hero Section Configuration
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Edit the grand headline, role, tagline, and call-to-action buttons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Headline Name</label>
              <input
                type="text"
                required
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                className="admin-input"
                placeholder="Sanjarbek Otabekov"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Primary Role</label>
              <input
                type="text"
                required
                value={heroRole}
                onChange={(e) => setHeroRole(e.target.value)}
                className="admin-input"
                placeholder="Full Stack Engineer"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Main Tagline</label>
            <input
              type="text"
              required
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="admin-input"
              placeholder="Crafting scalable web systems with meticulous engineering..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Subtext Description</label>
            <textarea
              rows={2}
              value={heroSubtext}
              onChange={(e) => setHeroSubtext(e.target.value)}
              className="admin-input resize-none"
              placeholder="Specializing in Next.js, distributed TypeScript microservices..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Availability Status</label>
              <input
                type="text"
                value={heroAvailability}
                onChange={(e) => setHeroAvailability(e.target.value)}
                className="admin-input"
                placeholder="Available for Q3/Q4 Projects"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Primary CTA Button</label>
              <input
                type="text"
                value={heroPrimaryCta}
                onChange={(e) => setHeroPrimaryCta(e.target.value)}
                className="admin-input"
                placeholder="View Projects"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Secondary CTA Button</label>
              <input
                type="text"
                value={heroSecondaryCta}
                onChange={(e) => setHeroSecondaryCta(e.target.value)}
                className="admin-input"
                placeholder="Contact Me"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-apple-primary px-6 py-2.5 text-xs sm:text-sm font-medium flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Publishing...' : 'Publish Hero Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: About Settings Form */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="admin-glass-card p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="text-lg font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
              About Section & Philosophy
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Configure biography narrative, engineering stats, and location.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Section Heading</label>
            <input
              type="text"
              required
              value={aboutHeading}
              onChange={(e) => setAboutHeading(e.target.value)}
              className="admin-input"
              placeholder="Architecting Reliable Systems from Concept to Production"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Bio Paragraph 1</label>
              <textarea
                rows={2}
                value={bio1}
                onChange={(e) => setBio1(e.target.value)}
                className="admin-input resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Bio Paragraph 2</label>
              <textarea
                rows={2}
                value={bio2}
                onChange={(e) => setBio2(e.target.value)}
                className="admin-input resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Bio Paragraph 3</label>
              <textarea
                rows={2}
                value={bio3}
                onChange={(e) => setBio3(e.target.value)}
                className="admin-input resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Years Experience</label>
              <input
                type="number"
                value={yearsExp}
                onChange={(e) => setYearsExp(Number(e.target.value))}
                className="admin-input font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Projects Completed</label>
              <input
                type="number"
                value={projCount}
                onChange={(e) => setProjCount(Number(e.target.value))}
                className="admin-input font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Location</label>
              <input
                type="text"
                value={aboutLocation}
                onChange={(e) => setAboutLocation(e.target.value)}
                className="admin-input"
                placeholder="Tashkent, Uzbekistan"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Languages (comma separated)</label>
              <input
                type="text"
                value={languagesInput}
                onChange={(e) => setLanguagesInput(e.target.value)}
                className="admin-input font-mono"
                placeholder="Uzbek, English, Russian"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-apple-primary px-6 py-2.5 text-xs sm:text-sm font-medium flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Publishing...' : 'Publish About Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Skills List & Add Form */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Add Skill Card */}
          <form onSubmit={handleAddSkill} className="admin-glass-card p-6 sm:p-8 space-y-5">
            <div className="pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <h2 className="text-lg font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                Add Technical Skill
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Add technologies that display in the interactive skills radar and filters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="admin-input"
                  placeholder="e.g. GraphQL, Kubernetes"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as SkillItem['category'])}
                  className="admin-input bg-white dark:bg-neutral-900"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Mastery Level</label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as SkillItem['level'])}
                  className="admin-input bg-white dark:bg-neutral-900"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn-apple-primary px-5 py-2.5 text-xs font-medium inline-flex items-center space-x-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
          </form>

          {/* Current Skills Grid */}
          <div className="admin-glass-card p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <h2 className="text-lg font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                Active Technical Arsenal ({skillsList.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skillsList.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between group hover:border-black/20 dark:hover:border-white/20 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-neutral-950 dark:text-white font-['Space_Grotesk'] block">
                      {skill.name}
                    </span>
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-500">
                      <span>{skill.category}</span>
                      <span>•</span>
                      <span className="text-sky-600 dark:text-sky-400">{skill.level}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.name)}
                    className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Remove Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Database & Cloud Firestore */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          {/* Cloud Health Card */}
          <div className="admin-glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                    Cloud Firestore Status & Diagnostics
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">
                    Project ID: <strong className="text-neutral-800 dark:text-neutral-200">{dbStatus.projectId}</strong>
                  </p>
                </div>
              </div>

              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono ${
                dbStatus.connected 
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
              }`}>
                <span className={`w-2 h-2 rounded-full ${dbStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{dbStatus.connected ? 'Live Sync Active' : 'Offline / Mock'}</span>
              </span>
            </div>

            {/* Counts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                <span className="text-xs font-mono uppercase text-neutral-400">Total Projects in DB</span>
                <p className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                  {dbStatus.counts.projects}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                <span className="text-xs font-mono uppercase text-neutral-400">Certificates in DB</span>
                <p className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                  {dbStatus.counts.certificates}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                <span className="text-xs font-mono uppercase text-neutral-400">Messages in DB</span>
                <p className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                  {dbStatus.counts.messages}
                </p>
              </div>
            </div>

            {/* Force Seed Action */}
            <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white font-['Space_Grotesk']">
                  Seed Cloud Firestore Database
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl">
                  This action writes the initial set of 5 enterprise projects, official certifications, and default site content directly into Cloud Firestore. Existing entries are safely merged.
                </p>
              </div>

              <button
                onClick={handleSeedDatabase}
                disabled={seedingDb}
                className="btn-apple-primary px-5 py-2.5 text-xs font-medium inline-flex items-center space-x-2 cursor-pointer disabled:opacity-50 flex-shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${seedingDb ? 'animate-spin' : ''}`} />
                <span>{seedingDb ? 'Seeding Database...' : 'Run Seed Action'}</span>
              </button>
            </div>

            {/* Seed Result Toast */}
            {seedResult && (
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                seedResult.success 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="flex items-center space-x-2.5">
                  {seedResult.success ? (
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                  )}
                  <span className="text-xs font-mono">{seedResult.message}</span>
                </div>
                <button 
                  onClick={() => setSeedResult(null)}
                  className="text-xs font-mono opacity-60 hover:opacity-100 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
