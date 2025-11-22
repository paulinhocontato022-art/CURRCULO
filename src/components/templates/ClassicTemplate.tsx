import React from 'react';
import { ResumeData } from '../../types/resume';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-gray-900 p-10 font-serif" id="resume-preview">
      <header className="text-center border-b-2 border-black pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-sm flex justify-center gap-3 flex-wrap text-gray-700">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.city}, {data.personalInfo.state}</span>
        </div>
      </header>

      <div className="space-y-6">
        {data.summary && (
          <section>
            <h3 className="font-bold text-lg border-b border-gray-300 mb-2">Resumo</h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}

        <section>
          <h3 className="font-bold text-lg border-b border-gray-300 mb-3">Experiência</h3>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.role}, {exp.company}</span>
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-xs italic mb-1">{exp.location}</p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-bold text-lg border-b border-gray-300 mb-3">Educação</h3>
          <div className="space-y-2">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between text-sm">
                <div>
                  <span className="font-bold">{edu.school}</span> - {edu.degree}
                </div>
                <span className="italic">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6">
          <section>
            <h3 className="font-bold text-lg border-b border-gray-300 mb-3">Habilidades</h3>
            <p className="text-sm">{data.skills.map(s => s.name).join(', ')}</p>
          </section>

          {(data.languages.length > 0 || data.certifications.length > 0) && (
             <section>
               <h3 className="font-bold text-lg border-b border-gray-300 mb-3">Outras Informações</h3>
               {data.languages.length > 0 && (
                 <div className="mb-2">
                   <span className="font-bold text-sm">Idiomas: </span>
                   <span className="text-sm">{data.languages.map(l => `${l.name} (${l.level})`).join(', ')}</span>
                 </div>
               )}
               {data.certifications.length > 0 && (
                 <div>
                   <span className="font-bold text-sm">Certificações: </span>
                   <span className="text-sm">{data.certifications.join(', ')}</span>
                 </div>
               )}
             </section>
          )}
        </div>
      </div>
    </div>
  );
};
