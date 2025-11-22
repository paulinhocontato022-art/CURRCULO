export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  linkedin?: string;
  city: string;
  state: string;
  photo?: string; // URL da foto
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente' | 'Nativo';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: string[];
}

export type TemplateType = 'modern' | 'classic' | 'minimalist';

export interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  removeEducation: (id: string) => void;
  updateSummary: (summary: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  addLanguage: (lang: Language) => void;
  removeLanguage: (id: string) => void;
  addCertification: (cert: string) => void;
  removeCertification: (cert: string) => void;
}
