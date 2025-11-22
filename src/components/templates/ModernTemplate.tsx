import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8" id="resume-preview">
      <header className="border-b-2 border-gray-800 pb-6 mb-6 flex gap-6 items-center">
        {data.personalInfo.photo && (
          <img 
            src={data.personalInfo.photo} 
            alt={data.personalInfo.fullName} 
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">{data.personalInfo.fullName}</h1>
          <p className="text-xl text-blue-600 font-medium mt-1">{data.personalInfo.title}</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6 border-r border-gray-100 pr-4">
          <section>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Contato</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{data.personalInfo.city}, {data.personalInfo.state}</span>
              </div>
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span key={skill.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {data.languages.length > 0 && (
            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Idiomas</h3>
              <div className="space-y-1">
                {data.languages.map(lang => (
                  <div key={lang.id} className="text-sm">
                    <span className="font-medium">{lang.name}</span>: <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Certificações</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {data.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Educação</h3>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="font-bold text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-2 space-y-6">
          {data.summary && (
            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Resumo Profissional</h3>
              <p className="text-sm leading-relaxed text-gray-600">{data.summary}</p>
            </section>
          )}

          <section>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Experiência Profissional</h3>
            <div className="space-y-5">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-800">{exp.role}</h4>
                    <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-medium text-blue-600 mb-2">{exp.company} | {exp.location}</p>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
