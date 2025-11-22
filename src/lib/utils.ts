import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock AI Suggestions
export const getAISuggestions = (keyword: string, type: 'summary' | 'skills') => {
  if (type === 'summary') {
    return [
      `Profissional altamente motivado com experiência em ${keyword || 'sua área'}, focado em entregar resultados de alta qualidade e impulsionar o crescimento da empresa.`,
      `Especialista em ${keyword || 'gestão'} com histórico comprovado de liderança e inovação. Habilidade em resolver problemas complexos e trabalhar em equipe.`,
      `Desenvolvedor apaixonado por ${keyword || 'tecnologia'} com forte base técnica e desejo constante de aprendizado.`,
    ];
  }
  if (type === 'skills') {
    const techSkills = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'];
    const softSkills = ['Liderança', 'Comunicação', 'Resolução de Problemas', 'Trabalho em Equipe', 'Gestão de Tempo'];
    return [...techSkills, ...softSkills].sort(() => 0.5 - Math.random()).slice(0, 5);
  }
  return [];
};
