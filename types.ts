
export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface Project {
  title: string;
  link?: string;
  description: string;
  technologies: string[];
  impact?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Language {
  name: string;
  level: string;
  rating: number; // out of 5
}

export interface Skills {
  [category: string]: string[];
}

export interface CVData {
  name: string;
  title: string;
  photoUrl: string;
  contact: ContactInfo;
  profile: string;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}
