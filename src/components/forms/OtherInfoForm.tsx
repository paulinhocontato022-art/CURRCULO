import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, X } from 'lucide-react';
import { generateId } from '../../lib/utils';
import { Language } from '../../types/resume';

export const OtherInfoForm: React.FC = () => {
  const { resumeData, addLanguage, removeLanguage, addCertification, removeCertification } = useResume();
  
  const [newLang, setNewLang] = useState('');
  const [langLevel, setLangLevel] = useState<Language['level']>('Intermediário');
  const [newCert, setNewCert] = useState('');

  const handleAddLanguage = () => {
    if (newLang.trim()) {
      addLanguage({ id: generateId(), name: newLang, level: langLevel });
      setNewLang('');
    }
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      addCertification(newCert);
      setNewCert('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Idiomas */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Idiomas</h3>
        
        <div className="flex gap-2 items-end mb-3">
          <div className="flex-1">
            <input 
              type="text"
              className="custom-input mb-0"
              placeholder="Idioma (Ex: Inglês)" 
              value={newLang} 
              onChange={(e) => setNewLang(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <select 
              className="custom-input mb-0 h-[46px]"
              value={langLevel}
              onChange={(e) => setLangLevel(e.target.value as any)}
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
              <option value="Fluente">Fluente</option>
              <option value="Nativo">Nativo</option>
            </select>
          </div>
          <button 
            onClick={handleAddLanguage} 
            disabled={!newLang.trim()}
            className="add-button mt-0 h-[46px] flex items-center justify-center"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {resumeData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-2 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm border border-gray-200 shadow-sm">
              <span className="font-medium">{lang.name}</span>
              <span className="text-gray-300 text-xs">•</span>
              <span className="text-gray-500">{lang.level}</span>
              <button onClick={() => removeLanguage(lang.id)} className="hover:text-red-500 ml-1">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Certificações */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Certificações</h3>

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <input 
              type="text"
              className="custom-input mb-0"
              placeholder="Nome do curso ou certificação" 
              value={newCert} 
              onChange={(e) => setNewCert(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCert()}
            />
          </div>
          <button 
            onClick={handleAddCert} 
            disabled={!newCert.trim()}
            className="add-button mt-0 h-[46px] flex items-center justify-center"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2">
          {resumeData.certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded border border-gray-200 text-sm shadow-sm">
              <span>{cert}</span>
              <button onClick={() => removeCertification(cert)} className="text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
