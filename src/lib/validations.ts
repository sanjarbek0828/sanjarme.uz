import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }).max(3000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectFormSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  slug: z.string().min(2, { message: 'Slug is required' }),
  description: z.string().min(10, { message: 'Short description is required' }),
  longDescription: z.string().min(20, { message: 'Detailed description is required' }),
  category: z.enum(['Full Stack', 'Frontend', 'Backend', 'Cloud & DevOps']),
  techStack: z.string().min(1, { message: 'At least one technology is required (comma separated)' }),
  coverImageUrl: z.string().min(1, { message: 'Cover image URL is required' }),
  githubUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  liveUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const certificateFormSchema = z.object({
  title: z.string().min(2, { message: 'Certificate title is required' }),
  issuer: z.string().min(2, { message: 'Issuer name is required' }),
  dateIssued: z.string().min(4, { message: 'Date issued is required' }),
  imageUrl: z.string().min(1, { message: 'Image URL is required' }),
  credentialUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  credentialId: z.string().optional(),
  skills: z.string().optional(),
});

export type CertificateFormData = z.infer<typeof certificateFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid admin email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
