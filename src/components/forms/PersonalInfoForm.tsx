import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useResume } from '../../context/ResumeContext';
import { Upload, User } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(2, 'Nome é obrigatório'),
  title: z.string().min(2, 'Título profissional é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Telefone inválido'),
  linkedin: z.string().optional(),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  
  const { register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: resumeData.personalInfo,
    mode: 'onChange'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <div className="form-group-grid">
        <div>
          <input 
            type="text" 
            id="nome"
            className="custom-input"
            placeholder="Nome Completo" 
            {...register('fullName')} 
            onChange={(e) => { register('fullName').onChange(e); handleChange(e); }}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-[-10px] mb-2">{errors.fullName.message}</p>}
        </div>

        <div>
          <input 
            type="text" 
            id="titulo"
            className="custom-input"
            placeholder="Título Profissional (Ex: Dev Júnior)" 
            {...register('title')} 
            onChange={(e) => { register('title').onChange(e); handleChange(e); }}
          />
          {errors.title && <p className="text-xs text-red-500 mt-[-10px] mb-2">{errors.title.message}</p>}
        </div>

        <div>
          <input 
            type="email" 
            id="email"
            className="custom-input"
            placeholder="E-mail" 
            {...register('email')} 
            onChange={(e) => { register('email').onChange(e); handleChange(e); }}
          />
          {errors.email && <p className="text-xs text-red-500 mt-[-10px] mb-2">{errors.email.message}</p>}
        </div>

        <div>
          <input 
            type="tel" 
            id="telefone"
            className="custom-input"
            placeholder="Telefone (WhatsApp)" 
            {...register('phone')} 
            onChange={(e) => { register('phone').onChange(e); handleChange(e); }}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-[-10px] mb-2">{errors.phone.message}</p>}
        </div>

        <div>
          <input 
            type="url" 
            id="linkedin"
            className="custom-input"
            placeholder="URL do LinkedIn" 
            {...register('linkedin')} 
            onChange={(e) => { register('linkedin').onChange(e); handleChange(e); }}
          />
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            id="endereco"
            className="custom-input"
            placeholder="Cidade" 
            {...register('city')} 
            onChange={(e) => { register('city').onChange(e); handleChange(e); }}
          />
          <input 
            type="text" 
            className="custom-input w-20"
            placeholder="UF" 
            {...register('state')} 
            onChange={(e) => { register('state').onChange(e); handleChange(e); }}
          />
        </div>
      </div>
      
      <div className="file-upload-group flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
            {resumeData.personalInfo.photo ? (
                <img src={resumeData.personalInfo.photo} alt="Preview" className="h-full w-full object-cover" />
            ) : (
                <User className="h-8 w-8 text-gray-400" />
            )}
        </div>
        <div className="flex-1">
            <label htmlFor="foto">Adicionar Foto (Opcional):</label>
            <input 
                type="file" 
                id="foto" 
                accept="image/*"
                onChange={handlePhotoUpload}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
      </div>
    </form>
  );
};
