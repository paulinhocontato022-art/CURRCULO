import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, X, Wand2 } from 'lucide-react';
import { generateId, getAISuggestions } from '../../lib/utils';

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill({ id: generateId(), name: newSkill });
      setNewSkill('');
    }
  };

  const loadSuggestions = () => {
    const sugs = getAISuggestions(resumeData.personalInfo.title, 'skills');
    setSuggestions(sugs);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            placeholder="Adicionar habilidade (Ex: Photoshop, Liderança)" 
            value={newSkill} 
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
        </div>
        <Button onClick={handleAdd} disabled={!newSkill.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {resumeData.skills.length === 0 && (
            <p className="text-sm text-gray-400 italic py-2">Nenhuma habilidade adicionada ainda.</p>
        )}
        {resumeData.skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm border border-gray-200 animate-in zoom-in duration-200">
            {skill.name}
            <button onClick={() => removeSkill(skill.id)} className="hover:text-red-500 ml-1 p-0.5 rounded-full hover:bg-gray-200 transition-colors">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sugestões da IA</h4>
          <Button variant="ghost" size="sm" onClick={loadSuggestions} className="text-purple-600 hover:bg-purple-50 h-8">
            <Wand2 className="h-3 w-3 mr-2" /> Carregar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((sug, idx) => (
            <button 
              key={idx}
              onClick={() => addSkill({ id: generateId(), name: sug })}
              className="px-3 py-1 rounded-full border border-purple-200 text-purple-700 text-sm hover:bg-purple-50 transition-colors"
            >
              + {sug}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
