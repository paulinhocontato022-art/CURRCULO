import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Wand2 } from 'lucide-react';
import { getAISuggestions } from '../../lib/utils';

export const SummaryForm: React.FC = () => {
  const { resumeData, updateSummary } = useResume();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulação de IA
    setTimeout(() => {
      const newSuggestions = getAISuggestions(resumeData.personalInfo.title, 'summary');
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="resumo_texto" className="text-sm text-gray-600">Descreva brevemente sua experiência.</label>
        <button 
          type="button" 
          onClick={handleGenerate}
          className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1 font-medium"
        >
          <Wand2 className="h-4 w-4" />
          {isGenerating ? 'Gerando...' : 'Sugestão IA'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
          <p className="text-xs font-bold text-purple-800 mb-2 uppercase">Sugestões (Clique para usar):</p>
          {suggestions.map((sug, idx) => (
            <div 
              key={idx} 
              className="p-2 mb-2 bg-white border border-purple-100 rounded cursor-pointer hover:border-purple-400 text-sm text-gray-700"
              onClick={() => { updateSummary(sug); setSuggestions([]); }}
            >
              {sug}
            </div>
          ))}
        </div>
      )}

      <textarea 
        id="resumo_texto"
        className="custom-input"
        rows={5} 
        placeholder="Profissional com X anos de experiência..."
        value={resumeData.summary}
        onChange={(e) => updateSummary(e.target.value)}
      />
    </div>
  );
};
