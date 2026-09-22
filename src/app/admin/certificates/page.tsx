'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  X, 
  Upload, 
  Loader2,
  Award,
  Calendar
} from 'lucide-react';
import { 
  getCertificates, 
  subscribeCertificates, 
  saveCertificate, 
  deleteCertificate, 
  uploadImageFile 
} from '@/lib/data-service';
import { Certificate } from '@/lib/types';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [dateIssued, setDateIssued] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const loadData = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error('Error loading certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeCertificates((data) => {
      setCertificates(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const openCreateModal = () => {
    setEditingCert(null);
    setTitle('');
    setIssuer('');
    setImageUrl('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80');
    setDateIssued(new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }));
    setCredentialUrl('');
    setCredentialId('');
    setSkillsInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditingCert(cert);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setImageUrl(cert.imageUrl);
    setDateIssued(cert.dateIssued);
    setCredentialUrl(cert.credentialUrl || '');
    setCredentialId(cert.credentialId || '');
    setSkillsInput(cert.skills ? cert.skills.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImageFile(file, 'certificates');
      setImageUrl(url);
    } catch (err) {
      console.error('Cert image upload error:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const skills = skillsInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        id: editingCert?.id,
        title,
        issuer,
        imageUrl,
        dateIssued,
        credentialUrl: credentialUrl || undefined,
        credentialId: credentialId || undefined,
        skills,
      };

      await saveCertificate(payload);
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      console.error('Error saving certificate:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await deleteCertificate(id);
      await loadData();
    } catch (err) {
      console.error('Error deleting cert:', err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Certificates & Credentials
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-neutral-100 dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400">
              {certificates.length} Verified
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your verified credentials displayed in the portfolio accreditation gallery.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-apple-primary px-5 py-2.5 text-xs sm:text-sm font-medium inline-flex items-center space-x-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Grid of Certs */}
      {loading ? (
        <div className="py-24 flex flex-col justify-center items-center space-y-3">
          <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
          <span className="text-xs font-mono text-neutral-400">Loading credentials...</span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="admin-glass-card p-16 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-400">
            <Award className="w-6 h-6" />
          </div>
          <p className="text-neutral-500 font-mono text-sm">
            No certificates added yet. Click &quot;Add Certificate&quot; to showcase your accreditations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="admin-glass-card overflow-hidden flex flex-col justify-between group hover:border-black/20 dark:hover:border-white/20 transition-all"
            >
              {/* Image thumbnail */}
              <div className="relative w-full h-44 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/85 dark:bg-black/75 border border-black/10 dark:border-white/10 text-[10px] font-mono text-neutral-800 dark:text-neutral-200 backdrop-blur-md shadow-xs">
                    {cert.issuer}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.dateIssued}</span>
                    {cert.credentialId && (
                      <span>• ID: {cert.credentialId}</span>
                    )}
                  </div>
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((s) => (
                      <span 
                        key={s} 
                        className="px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-[10px] font-mono text-neutral-600 dark:text-neutral-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center space-x-1"
                    >
                      <span>Verification link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-neutral-400">No link</span>
                  )}

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(cert)}
                      className="p-1.5 rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 transition-colors"
                      title="Edit Certificate"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="p-1.5 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-colors"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto admin-glass-card border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 z-10 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] mb-6">
              <div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                  {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Update credential details, issuer, and proof image.
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
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="admin-input"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Issuer</label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Issue Date</label>
                  <input
                    type="text"
                    required
                    value={dateIssued}
                    onChange={(e) => setDateIssued(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. November 2024"
                  />
                </div>
              </div>

              {/* Image URL & Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Certificate Image URL</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="admin-input flex-1 font-mono text-xs"
                    placeholder="https://..."
                  />
                  <label className="btn-apple-secondary px-3.5 py-2.5 text-xs font-mono cursor-pointer inline-flex items-center space-x-1.5 flex-shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Credential ID</label>
                  <input
                    type="text"
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    className="admin-input font-mono text-xs"
                    placeholder="e.g. AWS-CCP-773194"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Verification URL</label>
                  <input
                    type="url"
                    value={credentialUrl}
                    onChange={(e) => setCredentialUrl(e.target.value)}
                    className="admin-input text-xs"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Covered Skills (comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="admin-input font-mono text-xs"
                  placeholder="CloudWatch, IAM, S3, Docker"
                />
              </div>

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
                  className="btn-apple-primary px-6 py-2.5 text-xs sm:text-sm font-medium flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {saving ? <span>Saving...</span> : <span>Save Certificate</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
