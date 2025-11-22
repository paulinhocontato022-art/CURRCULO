import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useResume } from '../../context/ResumeContext';
import { Trash2 } from 'lucide-react';
import { generateId } from '../../lib/utils';

const schema = z.object({
  degree: z.string().min(2, 'Curso/Grau é obrigatório'),
  school: z.string().min(2, 'Instituição é obrigatória'),
  startDate: z.string().min(2, 'Data de início obrigatória'),
  endDate: z.string().optional(),
  current: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export const EducationForm: React.FC = () => {
  const { resumeData, addEducation, removeEducation } = useResume();
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { current: false }
  });

  const isCurrent = watch('current');

  const onSubmit = (data: FormData) => {
    addEducation({
      id: generateId(),
      ...data,
      endDate: data.current ? 'Cursando' : (data.endDate || ''),
    });
    reset();
    setIsAdding(false);
  };

  return (
    <div id="educacao-container">
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="educacao-item relative group">
          <button 
            onClick={() => removeEducation(edu.id)} 
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <h4 className="font-bold text-gray-800">{edu.degree}</h4>
          <p className="text-sm text-gray-600">{edu.school}</p>
          <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
        </div>
      ))}

      {isAdding ? (
        <form onSubmit={handleSubmit(onSubmit)} className="educacao-item border-green-400 bg-green-50">
          <input type="text" className="custom-input" placeholder="Nível de Formação (Ex: Graduação)" {...register('degree')} />
          {errors.degree && <span className="text-xs text-red-500 block mb-2">{errors.degree.message}</span>}

          <input type="text" className="custom-input" placeholder="Instituição" {...register('school')} />
          
          <div className="data-group mb-4">
            <input type="text" className="custom-input" placeholder="Mês/Ano de Início" {...register('startDate')} />
            {!isCurrent && <input type="text" className="custom-input" placeholder="Mês/Ano de Conclusão" {...register('endDate')} />}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="edu-current" {...register('current')} />
            <label htmlFor="edu-current">Cursando atualmente</label>
          </div>
          
          <div className="flex gap-2 justify-end">
            <button type="button" className="text-gray-500 underline text-sm" onClick={() => setIsAdding(false)}>Cancelar</button>
            <button type="submit" className="add-button mt-0 py-2 text-sm bg-green-600 hover:bg-green-700">Salvar Formação</button>
          </div>
        </form>
      ) : (
        <button type="button" className="add-button w-full justify-center bg-green-600 hover:bg-green-700" onClick={() => setIsAdding(true)}>
          + Adicionar Outra Formação
        </button>
      )}
    </div>
  );
};
