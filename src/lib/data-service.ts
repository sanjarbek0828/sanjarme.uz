import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  onSnapshot
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { 
  Project, 
  Certificate, 
  ContactMessage, 
  SkillItem, 
  ServiceItem, 
  UserSettings, 
  SiteContent 
} from './types';
import { 
  initialProjects, 
  initialCertificates, 
  initialSkills, 
  initialServices, 
  initialSettings, 
  initialSiteContent 
} from './initial-data';

const STORAGE_KEYS = {
  PROJECTS: 'sanjarbek_portfolio_projects',
  CERTIFICATES: 'sanjarbek_portfolio_certs',
  SKILLS: 'sanjarbek_portfolio_skills',
  SERVICES: 'sanjarbek_portfolio_services',
  SETTINGS: 'sanjarbek_portfolio_settings',
  MESSAGES: 'sanjarbek_portfolio_messages',
  SITE_CONTENT: 'sanjarbek_portfolio_site_content',
};

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-sample-1',
    name: 'Dilshod Raximov',
    email: 'dilshod@fintech.uz',
    subject: 'Web loyiha bo\'yicha hamkorlik',
    message: 'Assalomu alaykum Sanjarbek! 3D Earth va Aura Habit Tracker loyihalaringizni ko\'rib chiqdik. Bizning yangi startapimiz uchun zamonaviy Next.js veb-ilovasi kerak edi. Qachon bog\'lanishimiz mumkin?',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  }
];

// Helper for localStorage fallback
const getLocalData = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (e) {
    console.error('Error reading localStorage:', e);
    return fallback;
  }
};

const setLocalData = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
};

// =========================================================================
// NORMALIZATION ADAPTERS (Firestore -> Portfolio Models)
// =========================================================================

type FirestoreDocData = Record<string, unknown>;

export const normalizeProject = (id: string, data: FirestoreDocData): Project => {
  const rawImage = (data.image as string) || (data.coverImageUrl as string) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  const rawLink = (data.link as string) || (data.liveUrl as string) || '';
  const rawDesc = (data.desc as string) || (data.description as string) || '';
  const rawTitle = (data.title as string) || 'Loyiha';
  const rawTag = (data.tag as string) || (data.category as string) || 'Web Ilova';
  const rawGithub = (data.githubUrl as string) || '';

  // Smart tech stack detection if empty
  let techStack: string[] = Array.isArray(data.techStack) && data.techStack.length > 0 ? (data.techStack as string[]) : [];
  if (techStack.length === 0) {
    const lower = rawTitle.toLowerCase();
    if (lower.includes('3d') || lower.includes('earth')) {
      techStack = ['Three.js', 'WebGL', 'JavaScript', 'HTML5 Canvas', 'CSS3'];
    } else if (lower.includes('habit') || lower.includes('aura')) {
      techStack = ['PWA', 'JavaScript', 'LocalStorage', 'Service Worker', 'Tailwind CSS'];
    } else if (lower.includes('mebel')) {
      techStack = ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Responsive Design'];
    } else {
      techStack = ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'];
    }
  }

  return {
    id,
    title: rawTitle,
    slug: (data.slug as string) || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: rawDesc,
    desc: rawDesc,
    longDescription: (data.longDescription as string) || rawDesc,
    coverImageUrl: rawImage,
    image: rawImage,
    liveUrl: rawLink,
    link: rawLink,
    githubUrl: rawGithub,
    category: rawTag,
    tag: rawTag,
    color: (data.color as string) || 'bg-[#f5f5f7]',
    downloadUrl: (data.downloadUrl as string) || '',
    featured: data.featured !== undefined ? Boolean(data.featured) : true,
    order: typeof data.order === 'number' ? data.order : 1,
    techStack,
    challenges: Array.isArray(data.challenges) ? (data.challenges as string[]) : [],
    outcomes: Array.isArray(data.outcomes) ? (data.outcomes as string[]) : [],
    role: (data.role as string) || 'Full Stack Dasturchi',
    createdAt: (data.createdAt as string) || new Date().toISOString(),
    updatedAt: data.updatedAt as string | undefined,
  };
};

export const normalizeCertificate = (id: string, data: FirestoreDocData): Certificate => {
  const rawImage = (data.image as string) || (data.imageUrl as string) || '';
  const rawLink = (data.link as string) || (data.credentialUrl as string) || '';
  const rawYear = (data.year as string) || (data.dateIssued as string) || '2025';

  return {
    id,
    title: (data.title as string) || 'Sertifikat',
    issuer: (data.issuer as string) || 'Coursera',
    imageUrl: rawImage,
    image: rawImage,
    dateIssued: rawYear,
    year: rawYear,
    credentialUrl: rawLink,
    link: rawLink,
    credentialId: (data.credentialId as string) || '',
    skills: Array.isArray(data.skills) ? (data.skills as string[]) : [],
    createdAt: (data.createdAt as string) || new Date().toISOString(),
  };
};

export const normalizeSkill = (id: string, data: FirestoreDocData): SkillItem => {
  const name = (data.name as string) || '';
  const lower = name.toLowerCase();
  
  let category: SkillItem['category'] = 'Frontend';
  if (lower.includes('node') || lower.includes('python') || lower.includes('api') || lower.includes('backend')) {
    category = 'Backend';
  } else if (lower.includes('mongo') || lower.includes('sql') || lower.includes('firebase') || lower.includes('database')) {
    category = 'Database';
  } else if (lower.includes('git') || lower.includes('docker') || lower.includes('linux')) {
    category = 'DevOps & Tools';
  } else if (lower.includes('figma') || lower.includes('design')) {
    category = 'Design & Other';
  }

  let level: number | string = (data.level as number | string) ?? 70;
  if (typeof level === 'string' && !isNaN(Number(level))) {
    level = Number(level);
  }

  return {
    id,
    name,
    level,
    category: (data.category as SkillItem['category']) || category,
    iconUrl: (data.iconUrl as string) || '',
    iconName: (data.iconName as string) || '',
    experience: (data.experience as string) || '',
  };
};

export const normalizeService = (id: string, data: FirestoreDocData): ServiceItem => {
  const title = (data.title as string) || 'Xizmat';
  let defaultPrice = '50$ – 500$';
  if (title.toLowerCase().includes('bot')) defaultPrice = '150$ – 1500$';
  if (title.toLowerCase().includes('landing')) defaultPrice = '20$ – 300$';

  return {
    id,
    title,
    desc: (data.desc as string) || '',
    icon: (data.icon as string) || 'Code',
    priceRange: (data.priceRange as string) || defaultPrice,
  };
};

export const normalizeSettings = (data: FirestoreDocData): UserSettings => {
  return {
    github: (data?.github as string) || initialSettings.github,
    telegram: (data?.telegram as string) || initialSettings.telegram,
    linkedin: (data?.linkedin as string) || initialSettings.linkedin,
    email: (data?.email as string) || initialSettings.email,
    resume: (data?.resume as string) || initialSettings.resume,
    aboutTitle: (data?.aboutTitle as string) || initialSettings.aboutTitle,
    aboutShort: (data?.aboutShort as string) || initialSettings.aboutShort,
    aboutFull: (data?.aboutFull as string) || initialSettings.aboutFull,
    expYears: (data?.expYears as string | number) || initialSettings.expYears,
    githubCommits: (data?.githubCommits as string) || initialSettings.githubCommits,
    githubYearText: (data?.githubYearText as string) || initialSettings.githubYearText,
    spotifySong: (data?.spotifySong as string) || initialSettings.spotifySong,
    spotifyArtist: (data?.spotifyArtist as string) || initialSettings.spotifyArtist,
    instagram: (data?.instagram as string) || '',
  };
};

// =========================================================================
// REAL-TIME SUBSCRIPTIONS (Robust, Non-Fragile)
// =========================================================================

/**
 * Real-time subscription to Projects from Firebase Firestore.
 */
export const subscribeProjects = (
  onUpdate: (projects: Project[]) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  const local = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  onUpdate(local);

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'projects'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const projects = snapshot.docs.map(docSnap => 
              normalizeProject(docSnap.id, docSnap.data())
            );
            // Sort by order ascending
            projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
            setLocalData(STORAGE_KEYS.PROJECTS, projects);
            onUpdate(projects);
          }
        },
        (error) => {
          console.warn('subscribeProjects error, maintaining local state:', error);
          if (onError) onError(error);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeProjects setup error:', err);
    }
  }

  return () => {};
};

/**
 * Real-time subscription to Certificates from Firebase Firestore.
 */
export const subscribeCertificates = (
  onUpdate: (certificates: Certificate[]) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  const local = getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  onUpdate(local);

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'certificates'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const certs = snapshot.docs.map(docSnap => 
              normalizeCertificate(docSnap.id, docSnap.data())
            );
            // Sort by year/dateIssued descending
            certs.sort((a, b) => (b.dateIssued || '0').localeCompare(a.dateIssued || '0'));
            setLocalData(STORAGE_KEYS.CERTIFICATES, certs);
            onUpdate(certs);
          }
        },
        (error) => {
          console.warn('subscribeCertificates error:', error);
          if (onError) onError(error);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeCertificates setup error:', err);
    }
  }

  return () => {};
};

/**
 * Real-time subscription to Skills from Firebase Firestore.
 */
export const subscribeSkills = (
  onUpdate: (skills: SkillItem[]) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  const local = getLocalData<SkillItem[]>(STORAGE_KEYS.SKILLS, initialSkills);
  onUpdate(local);

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'skills'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const skills = snapshot.docs.map(docSnap => 
              normalizeSkill(docSnap.id, docSnap.data())
            );
            // Sort by proficiency level descending
            skills.sort((a, b) => {
              const la = typeof a.level === 'number' ? a.level : parseInt(String(a.level)) || 50;
              const lb = typeof b.level === 'number' ? b.level : parseInt(String(b.level)) || 50;
              return lb - la;
            });
            setLocalData(STORAGE_KEYS.SKILLS, skills);
            onUpdate(skills);
          }
        },
        (error) => {
          console.warn('subscribeSkills error:', error);
          if (onError) onError(error);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeSkills setup error:', err);
    }
  }

  return () => {};
};

/**
 * Real-time subscription to Services from Firebase Firestore.
 */
export const subscribeServices = (
  onUpdate: (services: ServiceItem[]) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  const local = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
  onUpdate(local);

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'services'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const services = snapshot.docs.map(docSnap => 
              normalizeService(docSnap.id, docSnap.data())
            );
            setLocalData(STORAGE_KEYS.SERVICES, services);
            onUpdate(services);
          }
        },
        (error) => {
          console.warn('subscribeServices error:', error);
          if (onError) onError(error);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeServices setup error:', err);
    }
  }

  return () => {};
};

/**
 * Real-time subscription to User Settings (general & bio).
 */
export const subscribeSettings = (
  onUpdate: (settings: UserSettings) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  const local = getLocalData<UserSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  onUpdate(local);

  if (isFirebaseConfigured() && db) {
    try {
      const unsubscribe = onSnapshot(
        doc(db, 'settings', 'general'),
        (snap) => {
          if (snap.exists()) {
            const settings = normalizeSettings(snap.data());
            setLocalData(STORAGE_KEYS.SETTINGS, settings);
            onUpdate(settings);
          }
        },
        (error) => {
          console.warn('subscribeSettings error:', error);
          if (onError) onError(error);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeSettings setup error:', err);
    }
  }

  return () => {};
};

/**
 * Real-time subscription to Site Content (combines Settings, Skills, and Services).
 */
export const subscribeSiteContent = (
  onUpdate: (content: SiteContent) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  let currentContent = getLocalData<SiteContent>(STORAGE_KEYS.SITE_CONTENT, initialSiteContent);
  onUpdate(currentContent);

  if (isFirebaseConfigured() && db) {
    try {
      const unsubSettings = subscribeSettings((settings) => {
        currentContent = {
          ...currentContent,
          hero: {
            ...currentContent.hero,
            tagline: settings.aboutShort || currentContent.hero.tagline,
          },
          about: {
            ...currentContent.about,
            heading: settings.aboutTitle || currentContent.about.heading,
            bioParagraphs: [
              settings.aboutShort || currentContent.about.bioParagraphs[0],
              settings.aboutFull || currentContent.about.bioParagraphs[1]
            ],
            yearsExperience: settings.expYears || currentContent.about.yearsExperience,
            githubCommits: settings.githubCommits,
            spotifySong: settings.spotifySong,
            spotifyArtist: settings.spotifyArtist,
          },
          settings,
        };
        setLocalData(STORAGE_KEYS.SITE_CONTENT, currentContent);
        onUpdate({ ...currentContent });
      }, onError);

      const unsubSkills = subscribeSkills((skills) => {
        currentContent = { ...currentContent, skills };
        setLocalData(STORAGE_KEYS.SITE_CONTENT, currentContent);
        onUpdate({ ...currentContent });
      }, onError);

      const unsubServices = subscribeServices((services) => {
        currentContent = { ...currentContent, services };
        setLocalData(STORAGE_KEYS.SITE_CONTENT, currentContent);
        onUpdate({ ...currentContent });
      }, onError);

      return () => {
        unsubSettings();
        unsubSkills();
        unsubServices();
      };
    } catch (err) {
      console.warn('subscribeSiteContent setup error:', err);
    }
  }

  return () => {};
};

/**
 * Real-time subscription to Contact Messages.
 */
export const subscribeContactMessages = (
  onUpdate: (messages: ContactMessage[]) => void,
  onError?: (err: unknown) => void
): (() => void) => {
  const local = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
  onUpdate(local);

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, 'messages'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const msgs = snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data()
            } as ContactMessage));
            // Sort by createdAt descending
            msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setLocalData(STORAGE_KEYS.MESSAGES, msgs);
            onUpdate(msgs);
          } else {
            onUpdate([]);
          }
        },
        (error) => {
          console.warn('subscribeContactMessages error:', error);
          if (onError) onError(error);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('subscribeContactMessages setup error:', err);
    }
  }

  return () => {};
};

// =========================================================================
// CONTACT FORM SUBMISSION
// =========================================================================

export const submitContactMessage = async (messageData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<ContactMessage> => {
  const now = new Date().toISOString();
  const payload = {
    ...messageData,
    read: false,
    createdAt: now,
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = await addDoc(collection(db, 'messages'), payload);
      const savedMsg = { ...payload, id: docRef.id };
      const current = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
      current.unshift(savedMsg);
      setLocalData(STORAGE_KEYS.MESSAGES, current);
      return savedMsg;
    } catch (err) {
      console.warn('Firestore message submission failed, saving locally:', err);
    }
  }

  const savedMsg = { ...payload, id: 'msg-' + Date.now() };
  const current = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
  current.unshift(savedMsg);
  setLocalData(STORAGE_KEYS.MESSAGES, current);
  return savedMsg;
};

// =========================================================================
// FIRESTORE SEEDING & DIAGNOSTICS
// =========================================================================

export const getFirestoreConnectionStatus = async (): Promise<{
  connected: boolean;
  projectId: string;
  isConfigured: boolean;
  counts: { projects: number; certificates: number; messages: number; skills: number; services: number };
  error?: string;
}> => {
  const configured = isFirebaseConfigured();
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'portfolio-9d780';

  if (!configured || !db) {
    return {
      connected: false,
      projectId,
      isConfigured: false,
      counts: {
        projects: getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects).length,
        certificates: getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates).length,
        messages: getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages).length,
        skills: getLocalData<SkillItem[]>(STORAGE_KEYS.SKILLS, initialSkills).length,
        services: getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices).length,
      },
      error: 'Firebase not configured in environment',
    };
  }

  try {
    const [pSnap, cSnap, mSnap, sSnap, srvSnap] = await Promise.all([
      getDocs(collection(db, 'projects')),
      getDocs(collection(db, 'certificates')),
      getDocs(collection(db, 'messages')),
      getDocs(collection(db, 'skills')),
      getDocs(collection(db, 'services')),
    ]);

    return {
      connected: true,
      projectId,
      isConfigured: true,
      counts: {
        projects: pSnap.size,
        certificates: cSnap.size,
        messages: mSnap.size,
        skills: sSnap.size,
        services: srvSnap.size,
      },
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      projectId,
      isConfigured: true,
      counts: {
        projects: getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects).length,
        certificates: getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates).length,
        messages: getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages).length,
        skills: getLocalData<SkillItem[]>(STORAGE_KEYS.SKILLS, initialSkills).length,
        services: getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices).length,
      },
      error: msg,
    };
  }
};

export const populateFirestore = async (
  force: boolean = false
): Promise<{ success: boolean; message: string; counts?: { projects: number; certificates: number } }> => {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, message: 'Firebase is not configured in .env.local' };
  }

  try {
    const projSnap = await getDocs(collection(db, 'projects'));
    let projectsCount = projSnap.size;

    if (projSnap.empty || force) {
      for (const proj of initialProjects) {
        await setDoc(doc(db, 'projects', proj.id), proj, { merge: true });
      }
      projectsCount = initialProjects.length;
    }

    const certSnap = await getDocs(collection(db, 'certificates'));
    let certsCount = certSnap.size;

    if (certSnap.empty || force) {
      for (const cert of initialCertificates) {
        await setDoc(doc(db, 'certificates', cert.id), cert, { merge: true });
      }
      certsCount = initialCertificates.length;
    }

    return {
      success: true,
      message: `Cloud Firestore sinxronlashtirildi: ${projectsCount} loyiha, ${certsCount} sertifikat!`,
      counts: { projects: projectsCount, certificates: certsCount },
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Noma\'lum xatolik';
    return {
      success: false,
      message: `Firestore sinxronizatsiya xatosi: ${errorMsg}`,
    };
  }
};

export const seedFirestoreIfEmpty = async (): Promise<boolean> => {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const projSnap = await getDocs(collection(db, 'projects'));
    if (projSnap.empty) {
      await populateFirestore(false);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// =========================================================================
// CRUD SERVICES
// =========================================================================

export const getProjects = async (): Promise<Project[]> => {
  if (isFirebaseConfigured() && db) {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      if (!snapshot.empty) {
        const projects = snapshot.docs.map(d => normalizeProject(d.id, d.data()));
        projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        setLocalData(STORAGE_KEYS.PROJECTS, projects);
        return projects;
      }
    } catch (err) {
      console.warn('Firestore projects fetch failed:', err);
    }
  }
  return getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug || p.id === slug) || null;
};

export const saveProject = async (projectData: Omit<Project, 'id' | 'createdAt'> & { id?: string }): Promise<Project> => {
  const isUpdate = Boolean(projectData.id);
  const now = new Date().toISOString();

  if (isFirebaseConfigured() && db) {
    try {
      if (isUpdate && projectData.id) {
        const docRef = doc(db, 'projects', projectData.id);
        await updateDoc(docRef, { ...projectData, updatedAt: now });
        const saved = { ...projectData, id: projectData.id, createdAt: now, updatedAt: now } as Project;
        const current = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
        setLocalData(STORAGE_KEYS.PROJECTS, current.map(p => p.id === projectData.id ? saved : p));
        return saved;
      } else {
        const docRef = await addDoc(collection(db, 'projects'), { ...projectData, createdAt: now, updatedAt: now });
        const saved = { ...projectData, id: docRef.id, createdAt: now, updatedAt: now } as Project;
        const current = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
        current.push(saved);
        setLocalData(STORAGE_KEYS.PROJECTS, current);
        return saved;
      }
    } catch (err) {
      console.warn('Firestore save failed:', err);
    }
  }

  const current = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  let saved: Project;
  if (isUpdate && projectData.id) {
    current.forEach((item, idx) => {
      if (item.id === projectData.id) {
        current[idx] = { ...item, ...projectData, updatedAt: now } as Project;
        saved = current[idx];
      }
    });
    saved = saved! || ({ ...projectData, id: projectData.id, createdAt: now } as Project);
  } else {
    saved = { ...projectData, id: 'proj-' + Date.now(), createdAt: now, updatedAt: now } as Project;
    current.push(saved);
  }

  setLocalData(STORAGE_KEYS.PROJECTS, current);
  return saved;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.warn('Firestore delete failed:', err);
    }
  }
  const current = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  setLocalData(STORAGE_KEYS.PROJECTS, current.filter(p => p.id !== id));
  return true;
};

export const getCertificates = async (): Promise<Certificate[]> => {
  if (isFirebaseConfigured() && db) {
    try {
      const snapshot = await getDocs(collection(db, 'certificates'));
      if (!snapshot.empty) {
        const certs = snapshot.docs.map(d => normalizeCertificate(d.id, d.data()));
        certs.sort((a, b) => (b.dateIssued || '0').localeCompare(a.dateIssued || '0'));
        setLocalData(STORAGE_KEYS.CERTIFICATES, certs);
        return certs;
      }
    } catch (err) {
      console.warn('Firestore certs fetch failed:', err);
    }
  }
  return getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
};

export const saveCertificate = async (certData: Omit<Certificate, 'id' | 'createdAt'> & { id?: string }): Promise<Certificate> => {
  const isUpdate = Boolean(certData.id);
  const now = new Date().toISOString();

  if (isFirebaseConfigured() && db) {
    try {
      if (isUpdate && certData.id) {
        await updateDoc(doc(db, 'certificates', certData.id), { ...certData });
        const saved = { ...certData, id: certData.id, createdAt: now } as Certificate;
        const current = getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
        setLocalData(STORAGE_KEYS.CERTIFICATES, current.map(c => c.id === certData.id ? saved : c));
        return saved;
      } else {
        const docRef = await addDoc(collection(db, 'certificates'), { ...certData, createdAt: now });
        const saved = { ...certData, id: docRef.id, createdAt: now } as Certificate;
        const current = getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
        current.unshift(saved);
        setLocalData(STORAGE_KEYS.CERTIFICATES, current);
        return saved;
      }
    } catch (err) {
      console.warn('Firestore cert save failed:', err);
    }
  }

  const current = getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  let saved: Certificate;
  if (isUpdate && certData.id) {
    current.forEach((item, idx) => {
      if (item.id === certData.id) {
        current[idx] = { ...item, ...certData };
        saved = current[idx];
      }
    });
    saved = saved! || ({ ...certData, id: certData.id, createdAt: now } as Certificate);
  } else {
    saved = { ...certData, id: 'cert-' + Date.now(), createdAt: now } as Certificate;
    current.unshift(saved);
  }

  setLocalData(STORAGE_KEYS.CERTIFICATES, current);
  return saved;
};

export const deleteCertificate = async (id: string): Promise<boolean> => {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, 'certificates', id));
    } catch (err) {
      console.warn('Firestore cert delete failed:', err);
    }
  }
  const current = getLocalData<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  setLocalData(STORAGE_KEYS.CERTIFICATES, current.filter(c => c.id !== id));
  return true;
};

export const markMessageRead = async (id: string, readStatus: boolean = true): Promise<boolean> => {
  if (isFirebaseConfigured() && db) {
    try {
      await updateDoc(doc(db, 'messages', id), { read: readStatus });
    } catch (err) {
      console.warn('markMessageRead error:', err);
    }
  }
  const current = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
  setLocalData(STORAGE_KEYS.MESSAGES, current.map(m => m.id === id ? { ...m, read: readStatus } : m));
  return true;
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (err) {
      console.warn('deleteMessage error:', err);
    }
  }
  const current = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
  setLocalData(STORAGE_KEYS.MESSAGES, current.filter(m => m.id !== id));
  return true;
};

export const uploadImageFile = async (file: File, _folder?: string): Promise<string> => {
  void _folder;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

export const updateSiteContent = async (
  sectionOrContent: string | Partial<SiteContent>,
  sectionData?: unknown
): Promise<SiteContent> => {
  let patch: Partial<SiteContent> = {};
  if (typeof sectionOrContent === 'string') {
    patch = { [sectionOrContent]: sectionData };
  } else {
    patch = sectionOrContent;
  }

  if (isFirebaseConfigured() && db) {
    try {
      if (patch.about) {
        await setDoc(doc(db, 'settings', 'general'), {
          aboutTitle: patch.about.heading,
          aboutShort: patch.about.bioParagraphs?.[0],
          aboutFull: patch.about.bioParagraphs?.[1],
          expYears: patch.about.yearsExperience,
          githubCommits: patch.about.githubCommits,
          spotifySong: patch.about.spotifySong,
          spotifyArtist: patch.about.spotifyArtist,
        }, { merge: true });
      }
    } catch (err) {
      console.warn('updateSiteContent error:', err);
    }
  }
  const current = getLocalData<SiteContent>(STORAGE_KEYS.SITE_CONTENT, initialSiteContent);
  const updated = { ...current, ...patch };
  setLocalData(STORAGE_KEYS.SITE_CONTENT, updated);
  return updated;
};

