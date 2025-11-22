import React, { useState, useRef } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { SummaryForm } from './components/forms/SummaryForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { OtherInfoForm } from './components/forms/OtherInfoForm';
import { ModernTemplate } from './components/templates/ModernTemplate';
import { ClassicTemplate } from './components/templates/ClassicTemplate';
import { MinimalistTemplate } from './components/templates/MinimalistTemplate';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/auth/AuthModal';
import { Button } from './components/ui/Button';
import { FileText, Download, Layout, Save, LogIn, LogOut, Cloud, User, Briefcase, GraduationCap, Wand2, Languages } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from './lib/utils';

const sections = [
  { id: 'pessoais', title: 'Dados Pessoais', icon: User, component: PersonalInfoForm },
  { id: 'resumo', title: 'Resumo', icon: Wand2, component: SummaryForm },
  { id: 'experiencia', title: 'Experiência', icon: Briefcase, component: ExperienceForm },
  { id: 'educacao', title: 'Educação', icon: GraduationCap, component: EducationForm },
  { id: 'habilidades', title: 'Habilidades', icon: Languages, component: SkillsForm },
  { id: 'extras', title: 'Outras Informações', icon: FileText, component: OtherInfoForm },
];

const ResumeBuilder = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate, saveResume, isSaving, lastSaved } = useResume();
  const { user, signOut } = useAuth();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('pessoais');

  const handleDownload = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`);
      setIsPaymentOpen(false);
    }
  };

  const handleSaveClick = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      saveResume();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header Customizado */}
      <header className="custom-header sticky top-0 z-30 shadow-sm">
        <div className="container-custom h-20 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
                <h1 className="custom-title text-xl font-bold m-0 p-0 leading-tight">CV Profissional AI</h1>
                <p className="text-xs text-gray-500 hidden sm:block m-0">Gerador de Currículos Inteligente</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Save Status / Button */}
            <div className="flex items-center gap-2">
              {user && lastSaved && (
                <span className="text-xs text-gray-400 hidden lg:inline">
                  Salvo às {lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              )}
              <button 
                onClick={handleSaveClick}
                className={cn("action-btn btn-save py-2 px-3 text-sm", isSaving && "opacity-50")}
              >
                {isSaving ? <Cloud className="h-4 w-4 animate-pulse" /> : <Save className="h-4 w-4" />}
                <span className="hidden sm:inline">{user ? 'Salvar' : 'Salvar'}</span>
              </button>
            </div>

            {/* Auth Button */}
            {user ? (
              <Button variant="ghost" size="sm" onClick={() => signOut()} title="Sair">
                <LogOut className="h-4 w-4 text-red-500" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsAuthOpen(true)}>
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            )}

            <button 
              className="action-btn btn-download py-2 px-4 text-sm"
              onClick={() => setIsPaymentOpen(true)}
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Baixar (R$ 9,90)</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container-custom w-full pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form (Scrollable) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Navigation / Table of Contents */}
          <nav className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 overflow-x-auto scrollbar-hide sticky top-24 z-20 lg:static mb-4">
            <div className="flex lg:flex-wrap items-center gap-1 min-w-max">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                      activeSection === section.id 
                        ? "bg-blue-100 text-blue-700" 
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {section.title}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Form Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const Component = section.component;
              return (
                <section 
                  key={section.id} 
                  id={section.id} 
                  className="form-section transition-all duration-300"
                  onMouseEnter={() => setActiveSection(section.id)}
                >
                  <h2>{section.title}</h2>
                  <Component />
                </section>
              );
            })}

            {/* Template Selection */}
            <div className="form-section bg-gray-800 text-white border-none">
              <h2 className="text-white border-gray-600">Escolha o Modelo</h2>
              <div className="grid grid-cols-3 gap-3">
                 {['modern', 'classic', 'minimalist'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTemplate(t as any)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-bold capitalize transition-all border-2",
                        selectedTemplate === t 
                          ? "bg-white text-gray-900 border-white" 
                          : "bg-transparent text-gray-300 border-gray-600 hover:border-gray-400"
                      )}
                    >
                      {t}
                    </button>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview (Sticky) */}
        <div className="hidden lg:block lg:col-span-7">
          <div className="sticky top-24 space-y-4">
            <div className="bg-gray-800 text-white p-3 rounded-lg flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Layout className="h-4 w-4" />
                <span>Pré-visualização em Tempo Real</span>
              </div>
            </div>

            <div className="bg-white rounded shadow-2xl overflow-hidden border border-gray-200 aspect-[210/297] w-full transform transition-transform origin-top">
              <div ref={resumeRef} className="w-full h-full">
                {selectedTemplate === 'modern' && <ModernTemplate data={resumeData} />}
                {selectedTemplate === 'classic' && <ClassicTemplate data={resumeData} />}
                {selectedTemplate === 'minimalist' && <MinimalistTemplate data={resumeData} />}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onSuccess={handleDownload}
      />
      
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <ResumeBuilder />
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
