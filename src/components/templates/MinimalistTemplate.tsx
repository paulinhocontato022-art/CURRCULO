import React from 'react';
import { ResumeData } from '../../types/resume';

export const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 font-sans" id="resume-preview">
      <div className="flex gap-8 h-full">
        <div className="w-1/3 bg-slate-50 p-6 -my-8 -ml-8 h-[calc(100%+4rem)]">
           <div className="mb-8">
             {data.personalInfo.photo && (
               <img src={data.personalInfo.photo} className="w-32 h-32 rounded-full object-cover mx-auto mb-4" alt="Profile" />
             )}
             <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Contato</h2>
             <div className="text-sm space-y-2 text-slate-600">
               <p>{data.personalInfo.email}</p>
               <p>{data.personalInfo.phone}</p>
               <p>{data.personalInfo.city}, {data.personalInfo.state}</p>
               {data.personalInfo.linkedin && <p className="break-all">{data.personalInfo.linkedin}</p>}
             </div>
           </div>

           <div className="mb-8">
             <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Skills</h2>
             <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4">
               {data.skills.map(skill => (
                 <li key={skill.id}>{skill.name}</li>
               ))}
             </ul>
           </div>

           {data.languages.length > 0 && (
             <div className="mb-8">
               <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Idiomas</h2>
               <ul className="text-sm space-y-2 text-slate-600">
                 {data.languages.map(lang => (
                   <li key={lang.id} className="flex justify-between">
                     <span>{lang.name}</span>
                     <span className="text-slate-400 text-xs">{lang.level}</span>
                   </li>
                 ))}
               </ul>
             </div>
           )}

           <div className="mt-8">
             <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Educação</h2>
             <div className="space-y-4">
               {data.education.map(edu => (
                 <div key={edu.id} className="text-sm">
                   <p className="font-bold text-slate-800">{edu.degree}</p>
                   <p className="text-slate-600">{edu.school}</p>
                   <p className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</p>
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="flex-1 py-4">
          <header className="mb-8">
            <h1 className="text-4xl font-light text-slate-900 mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-xl text-slate-500 tracking-wide">{data.personalInfo.title}</p>
          </header>

          {data.summary && (
            <section className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Perfil</h3>
              <p className="text-slate-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          <section className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Experiência Profissional</h3>
            <div className="space-y-8 border-l-2 border-slate-100 pl-6 ml-2">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                  <h4 className="font-bold text-slate-800 text-lg">{exp.role}</h4>
                  <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>{exp.company}</span>
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {data.certifications.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Certificações</h3>
              <div className="flex flex-wrap gap-2">
                {data.certifications.map((cert, idx) => (
                   <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                     {cert}
                   </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
