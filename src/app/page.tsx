'use client';

import React, { useEffect, useState } from 'react';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';
import { 
  subscribeProjects, 
  subscribeCertificates, 
  subscribeSiteContent,
  seedFirestoreIfEmpty 
} from '@/lib/data-service';
import { initialProjects, initialCertificates, initialSiteContent } from '@/lib/initial-data';
import { Project, Certificate, SiteContent } from '@/lib/types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [siteContent, setSiteContent] = useState<SiteContent>(initialSiteContent);

  useEffect(() => {
    // Attempt automatic background seeding if Firestore is brand new/empty
    seedFirestoreIfEmpty().catch(() => {});

    // Real-time listener for Projects
    const unsubProjects = subscribeProjects((newProjects) => {
      if (newProjects && newProjects.length > 0) {
        setProjects(newProjects);
      }
    });

    // Real-time listener for Certificates
    const unsubCerts = subscribeCertificates((newCerts) => {
      if (newCerts && newCerts.length > 0) {
        setCertificates(newCerts);
      }
    });

    // Real-time listener for Site Content (Hero, About, Skills)
    const unsubContent = subscribeSiteContent((newContent) => {
      if (newContent) {
        setSiteContent(newContent);
      }
    });

    return () => {
      unsubProjects();
      unsubCerts();
      unsubContent();
    };
  }, []);

  return (
    <main suppressHydrationWarning className="relative min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-300">
      {/* Top Reading Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero content={siteContent.hero} />

      {/* About Section */}
      <About content={siteContent.about} />

      {/* Skills / Tech Stack Section */}
      <Skills skills={siteContent.skills} />

      {/* Services & Pricing Section */}
      <Services services={siteContent.services} />

      {/* Projects Section */}
      <Projects projects={projects} />

      {/* Certificates Section */}
      <Certificates certificates={certificates} />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
