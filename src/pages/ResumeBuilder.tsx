
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useResumeStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormStepper from '@/components/FormStepper';
import ContactSection from '@/components/form-sections/ContactSection';
import SummarySection from '@/components/form-sections/SummarySection';
import EducationSection from '@/components/form-sections/EducationSection';
import ExperienceSection from '@/components/form-sections/ExperienceSection';
import SkillsSection from '@/components/form-sections/SkillsSection';
import ProjectsSection from '@/components/form-sections/ProjectsSection';
import CertificationsSection from '@/components/form-sections/CertificationsSection';
import PublicationsSection from '@/components/form-sections/PublicationsSection';
import AwardsSection from '@/components/form-sections/AwardsSection';
import ActivitiesSection from '@/components/form-sections/ActivitiesSection';

const formSteps = [
  { id: 1, title: 'Contact Info', isRequired: true },
  { id: 2, title: 'Summary', isRequired: false },
  { id: 3, title: 'Education', isRequired: true },
  { id: 4, title: 'Experience', isRequired: false },
  { id: 5, title: 'Skills', isRequired: true },
  { id: 6, title: 'Projects', isRequired: false },
  { id: 7, title: 'Certifications', isRequired: false },
  { id: 8, title: 'Publications', isRequired: false },
  { id: 9, title: 'Awards', isRequired: false },
  { id: 10, title: 'Activities', isRequired: false },
];

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, resumeData } = useResumeStore();
  
  const handleNext = () => {
    if (currentStep === 0 && !validateContactInfo()) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2 && resumeData.education.length === 0) {
      toast({
        title: "Education Information Missing",
        description: "Please add at least one education entry.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 4 && resumeData.skills.length === 0) {
      toast({
        title: "Skills Information Missing",
        description: "Please add at least one skill.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/templates');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const validateContactInfo = () => {
    return (
      resumeData.fullName.trim() !== '' &&
      resumeData.email.trim() !== '' &&
      resumeData.phone.trim() !== ''
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ContactSection />;
      case 1:
        return <SummarySection />;
      case 2:
        return <EducationSection />;
      case 3:
        return <ExperienceSection />;
      case 4:
        return <SkillsSection />;
      case 5:
        return <ProjectsSection />;
      case 6:
        return <CertificationsSection />;
      case 7:
        return <PublicationsSection />;
      case 8:
        return <AwardsSection />;
      case 9:
        return <ActivitiesSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-gray-900">Build Your Resume</h1>
            <p className="mt-2 text-gray-600">Fill out the form to create your professional resume.</p>
          </div>
          
          <FormStepper 
            steps={formSteps} 
            currentStepIndex={currentStep} 
            onStepClick={setCurrentStep} 
          />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-montserrat font-semibold mb-4">
              {formSteps[currentStep].title}
              {formSteps[currentStep].isRequired && <span className="text-red-500 ml-1">*</span>}
            </h2>
            
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              <Button
                type="button"
                onClick={handleNext}
              >
                {currentStep === formSteps.length - 1 ? 'Choose Template' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
