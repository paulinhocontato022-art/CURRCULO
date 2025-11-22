import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';
import { generateId } from '../../lib/utils';

const schema = z.object({
  role: z.string().min(2, 'Cargo é obrigatório'),
  company: z.string().min(2, 'Empresa é obrigatória'),
  location: z.string().min(2, 'Localização é obrigatória'),
  startDate: z.string().min(2, 'Data de início obrigatória'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, removeExperience } = useResume();
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { current: false }
  });

  const isCurrent = watch('current');

  const onSubmit = (data: FormData) => {
    addExperience({
      id: generateId(),
      ...data,
      endDate: data.current ? 'Atual' : (data.endDate || ''),
      description: data.description || ''
    });
    reset();
    setIsAdding(false);
  };

  return (
    <div id="experiencias-container">
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="experiencia-item relative group">
          <button 
            onClick={() => removeExperience(exp.id)} 
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            title="Remover"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <h4 className="font-bold text-gray-800">{exp.role}</h4>
          <p className="text-sm text-gray-600">{exp.company} - {exp.location}</p>
          <p className="text-xs text-gray-500">{exp.startDate} até {exp.endDate}</p>
        </div>
      ))}

      {isAdding ? (
        <form onSubmit={handleSubmit(onSubmit)} className="experiencia-item border-blue-400 bg-blue-50">
          <input type="text" className="custom-input" placeholder="Cargo" {...register('role')} />
          {errors.role && <span className="text-xs text-red-500 block mb-2">{errors.role.message}</span>}
          
          <input type="text" className="custom-input" placeholder="Empresa" {...register('company')} />
          <input type="text" className="custom-input" placeholder="Cidade/País" {...register('location')} />
          
          <div className="data-group mb-4">
            <input type="text" className="custom-input" placeholder="Início (MM/AAAA)" {...register('startDate')} />
            {!isCurrent && <input type="text" className="custom-input" placeholder="Fim (MM/AAAA)" {...register('endDate')} />}
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="current" {...register('current')} />
            <label htmlFor="current">Trabalho Atual</label>
          </div>

          <textarea className="custom-input" rows={3} placeholder="Principais responsabilidades e conquistas" {...register('description')}></textarea>
          
          <div className="flex gap-2 justify-end">
            <button type="button" className="text-gray-500 underline text-sm" onClick={() => setIsAdding(false)}>Cancelar</button>
            <button type="submit" className="add-button mt-0 py-2 text-sm">Salvar Experiência</button>
          </div>
        </form>
      ) : (
        <button type="button" className="add-button w-full justify-center" onClick={() => setIsAdding(true)}>
          + Adicionar Outra Experiência
        </button>
      )}
    </div>
  );
};
