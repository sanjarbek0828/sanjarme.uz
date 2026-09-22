export interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  desc?: string;
  longDescription?: string;
  techStack: string[];
  coverImageUrl: string;
  image?: string;
  galleryUrls?: string[];
  githubUrl?: string;
  liveUrl?: string;
  link?: string;
  category: string;
  tag?: string;
  color?: string;
  downloadUrl?: string;
  featured?: boolean;
  order?: number;
  challenges?: string[];
  outcomes?: string[];
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  image?: string;
  dateIssued: string;
  year?: string;
  credentialUrl?: string;
  link?: string;
  credentialId?: string;
  skills?: string[];
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  category?: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Tools' | 'Design & Other';
  level: number | string; // e.g. 95 (percentage) or 'Expert'
  iconUrl?: string;
  iconName?: string;
  experience?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  priceRange?: string;
}

export interface UserSettings {
  github: string;
  telegram: string;
  linkedin: string;
  email: string;
  resume: string;
  aboutTitle: string;
  aboutShort: string;
  aboutFull: string;
  expYears: string | number;
  githubCommits: string;
  githubYearText: string;
  spotifySong: string;
  spotifyArtist: string;
  instagram?: string;
}

export interface SiteContent {
  hero: {
    name: string;
    role: string;
    tagline: string;
    subtext: string;
    availabilityStatus: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    avatarUrl?: string;
  };
  about: {
    heading: string;
    bioParagraphs: string[];
    yearsExperience: number | string;
    projectsCompleted: number;
    happyClients: number;
    codeQualityRate: string;
    location: string;
    availability: string;
    languages: string[];
    githubCommits?: string;
    spotifySong?: string;
    spotifyArtist?: string;
  };
  skills: SkillItem[];
  services?: ServiceItem[];
  settings?: UserSettings;
}
