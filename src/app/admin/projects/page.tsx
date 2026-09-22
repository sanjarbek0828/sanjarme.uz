'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Check, 
  Upload, 
  Loader2,
  ExternalLink,
  FolderGit2
} from 'lucide-react';
import { 
  getProjects, 
  subscribeProjects, 
  saveProject, 
  deleteProject, 
  uploadImageFile 
} from '@/lib/data-service';
import { Project } from '@/lib/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('Full Stack');
  const [techStackInput, setTechStackInput] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [role, setRole] = useState('');
  const [featured, setFeatured] = useState(false);
  const [challengesInput, setChallengesInput] = useState('');
  const [outcomesInput, setOutcomesInput] = useState('');

  const loadData = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeProjects((data) => {
      setProjects(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setLongDescription('');
    setCategory('Full Stack');
    setTechStackInput('');
    setCoverImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
    setGithubUrl('');
    setLiveUrl('');
    setRole('Lead Full Stack Engineer');
    setFeatured(false);
    setChallengesInput('');
    setOutcomesInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setSlug(proj.slug || '');
    setDescription(proj.description || proj.desc || '');
    setLongDescription(proj.longDescription || '');
    setCategory(proj.category || 'Full Stack');
    setTechStackInput(proj.techStack ? proj.techStack.join(', ') : '');
    setCoverImageUrl(proj.coverImageUrl || proj.image || '');
    setGithubUrl(proj.githubUrl || '');
    setLiveUrl(proj.liveUrl || proj.link || '');
    setRole(proj.role || '');
    setFeatured(Boolean(proj.featured));
    setChallengesInput(proj.challenges ? proj.challenges.join('\n') : '');
    setOutcomesInput(proj.outcomes ? proj.outcomes.join('\n') : '');
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImageFile(file, 'projects');
      setCoverImageUrl(url);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const techStack = techStackInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const challenges = challengesInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const outcomes = outcomesInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        id: editingProject?.id,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        description,
        longDescription,
        category,
        techStack,
        coverImageUrl,
        githubUrl: githubUrl || undefined,
        liveUrl: liveUrl || undefined,
        role: role || undefined,
        featured,
        order: editingProject?.order ?? projects.length + 1,
        challenges,
        outcomes,
      };

      await saveProject(payload);
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      await loadData();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const toggleFeatured = async (proj: Project) => {
    try {
      await saveProject({ ...proj, featured: !proj.featured });
      await loadData();
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    // Update orders
    newProjects.forEach((p, idx) => {
      p.order = idx + 1;
    });

    setProjects(newProjects);

    // Save both
    await Promise.all([
      saveProject(newProjects[index]),
      saveProject(newProjects[targetIndex]),
    ]);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Projects Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-neutral-100 dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400">
              {projects.length} Works
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Curate, edit, order, and showcase your engineering works on the public portfolio.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-apple-primary px-5 py-2.5 text-xs sm:text-sm font-medium inline-flex items-center space-x-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table / Card List */}
      <div className="admin-glass-card overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col justify-center items-center space-y-3">
            <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
            <span className="text-xs font-mono text-neutral-400">Loading works...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-400">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <p className="text-neutral-500 font-mono text-sm">
              No projects in the database yet. Click &quot;Add New Project&quot; to build your showcase.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-700 dark:text-neutral-300">
              <thead className="bg-black/[0.02] dark:bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-black/[0.06] dark:border-white/[0.08]">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Preview</th>
                  <th className="px-6 py-4">Title & Tech Stack</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                {projects.map((proj, index) => (
                  <tr key={proj.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    {/* Order Controls */}
                    <td className="px-6 py-4 font-mono text-xs">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-6 text-center text-neutral-500 font-semibold">{index + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => moveOrder(index, 'up')}
                            disabled={index === 0}
                            className="p-0.5 hover:text-neutral-950 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveOrder(index, 'down')}
                            disabled={index === projects.length - 1}
                            className="p-0.5 hover:text-neutral-950 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Cover Thumbnail */}
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-11 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src={proj.coverImageUrl}
                          alt={proj.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Tech */}
                    <td className="px-6 py-4">
                      <div className="space-y-1 max-w-sm">
                        <span className="font-bold text-neutral-950 dark:text-white font-['Space_Grotesk'] block line-clamp-1">
                          {proj.title}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {proj.techStack.slice(0, 4).map((t) => (
                            <span 
                              key={t} 
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400"
                            >
                              {t}
                            </span>
                          ))}
                          {proj.techStack.length > 4 && (
                            <span className="text-[10px] font-mono text-neutral-400 self-center">
                              +{proj.techStack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-300">
                        {proj.category}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeatured(proj)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          proj.featured
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-xs'
                            : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                        }`}
                        title="Toggle Featured Work"
                      >
                        <Star className={`w-4 h-4 ${proj.featured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                            title="Open Live Preview"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-2 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto admin-glass-card border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 z-10 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] mb-6">
              <div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                  {editingProject ? 'Edit Project Details' : 'Add New Project'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Update engineering details, architecture breakdown, and screenshots.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.1] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. NexusPulse Collaborative Workspace"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="admin-input font-mono"
                    placeholder="nexus-pulse"
                  />
                </div>
              </div>

              {/* Category & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Project['category'])}
                    className="admin-input bg-white dark:bg-neutral-900"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Developer Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Lead Architect & Full Stack Engineer"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Summary (Card Preview)</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="admin-input resize-none"
                  placeholder="Concise 1-2 sentence description for homepage card..."
                />
              </div>

              {/* Detailed Long Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Detailed Architecture Breakdown (Modal)</label>
                <textarea
                  rows={4}
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="admin-input resize-none"
                  placeholder="Comprehensive technical breakdown, backend mechanisms, DB choices, concurrency strategies..."
                />
              </div>

              {/* Tech Stack Comma separated */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Technologies (comma separated)</label>
                <input
                  type="text"
                  required
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  className="admin-input font-mono"
                  placeholder="Next.js 15, TypeScript, Tailwind, PostgreSQL, WebSockets"
                />
              </div>

              {/* Cover Image & Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Cover Image URL</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    className="admin-input flex-1 font-mono text-xs"
                    placeholder="https://..."
                  />
                  <label className="btn-apple-secondary px-3.5 py-2.5 text-xs font-mono cursor-pointer inline-flex items-center space-x-1.5 flex-shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Links: GitHub & Live Demo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="admin-input text-xs"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Live Demo URL</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="admin-input text-xs"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Challenges & Outcomes (Line-by-line) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Key Challenges (1 per line)</label>
                  <textarea
                    rows={3}
                    value={challengesInput}
                    onChange={(e) => setChallengesInput(e.target.value)}
                    className="admin-input text-xs resize-none"
                    placeholder="Engineered CRDT sync algorithm&#10;Reduced cold start latency"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Measurable Outcomes (1 per line)</label>
                  <textarea
                    rows={3}
                    value={outcomesInput}
                    onChange={(e) => setOutcomesInput(e.target.value)}
                    className="admin-input text-xs resize-none"
                    placeholder="10,000 concurrent sockets at < 35ms&#10;100% Lighthouse score"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="pt-2 flex items-center space-x-2.5">
                <input
                  id="featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-black/20 dark:border-white/20 text-black dark:text-white focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featured" className="text-xs font-mono text-neutral-700 dark:text-neutral-300 cursor-pointer">
                  Feature this project prominently on portfolio homepage
                </label>
              </div>

              {/* Save actions */}
              <div className="pt-5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-full text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-apple-primary px-6 py-2.5 text-xs sm:text-sm font-medium flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
