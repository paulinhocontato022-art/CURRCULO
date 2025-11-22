import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ResumeData, ResumeContextType, TemplateType, PersonalInfo, Experience, Education, Skill, Language } from '../types/resume';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
};

// Estendendo a interface para incluir métodos de persistência
interface ExtendedResumeContextType extends ResumeContextType {
  saveResume: () => Promise<void>;
  isSaving: boolean;
  lastSaved: Date | null;
}

const ResumeContext = createContext<ExtendedResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [currentStep, setCurrentStep] = useState(0);
  
  // Persistence States
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);

  // Carregar dados ao logar
  useEffect(() => {
    if (user) {
      loadUserResume();
    }
  }, [user]);

  const loadUserResume = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (data && !error) {
      setResumeData(data.content as ResumeData);
      setResumeId(data.id);
      setLastSaved(new Date(data.updated_at));
    }
  };

  const saveResume = async () => {
    if (!user) return;
    setIsSaving(true);

    const payload = {
      user_id: user.id,
      content: resumeData,
      title: resumeData.personalInfo.fullName || 'Meu Currículo',
      updated_at: new Date().toISOString(),
    };

    let error;
    
    if (resumeId) {
      // Update
      const { error: updateError } = await supabase
        .from('resumes')
        .update(payload)
        .eq('id', resumeId);
      error = updateError;
    } else {
      // Insert
      const { data, error: insertError } = await supabase
        .from('resumes')
        .insert([payload])
        .select()
        .single();
        
      if (data) setResumeId(data.id);
      error = insertError;
    }

    setIsSaving(false);
    if (!error) {
      setLastSaved(new Date());
    } else {
      console.error('Error saving resume:', error);
    }
  };

  // Helper functions (mantidas do original)
  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const addExperience = (exp: Experience) => {
    setResumeData((prev) => ({ ...prev, experience: [...prev.experience, exp] }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const addEducation = (edu: Education) => {
    setResumeData((prev) => ({ ...prev, education: [...prev.education, edu] }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const addSkill = (skill: Skill) => {
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };
  
  const addLanguage = (lang: Language) => {
    setResumeData((prev) => ({ ...prev, languages: [...prev.languages, lang] }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  };

  const addCertification = (cert: string) => {
    setResumeData((prev) => ({ ...prev, certifications: [...prev.certifications, cert] }));
  };

  const removeCertification = (cert: string) => {
    setResumeData((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c !== cert) }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
        updatePersonalInfo,
        addExperience,
        removeExperience,
        addEducation,
        removeEducation,
        updateSummary,
        addSkill,
        removeSkill,
        addLanguage,
        removeLanguage,
        addCertification,
        removeCertification,
        saveResume,
        isSaving,
        lastSaved
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
