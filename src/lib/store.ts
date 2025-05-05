
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Education = {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  relevantCourses: string;
};

export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  technologies: string;
  description: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  description: string;
};

export type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
};

export type Activity = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
};

export type ResumeData = {
  // Contact Information
  fullName: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  address: string;
  photo: string;
  
  // Summary
  summary: string;
  
  // Education
  education: Education[];
  
  // Work Experience
  experience: Experience[];
  
  // Skills
  skills: Skill[];
  
  // Projects
  projects: Project[];
  
  // Certifications
  certifications: Certification[];
  
  // Publications
  publications: Publication[];
  
  // Awards
  awards: Award[];
  
  // Activities
  activities: Activity[];
};

export type ResumeStore = {
  currentStep: number;
  resumeData: ResumeData;
  selectedTemplate: string;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateResumeData: (data: Partial<ResumeData>) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addPublication: () => void;
  updatePublication: (id: string, data: Partial<Publication>) => void;
  removePublication: (id: string) => void;
  addAward: () => void;
  updateAward: (id: string, data: Partial<Award>) => void;
  removeAward: (id: string) => void;
  addActivity: () => void;
  updateActivity: (id: string, data: Partial<Activity>) => void;
  removeActivity: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setSelectedTemplate: (template: string) => void;
  clearResumeData: () => void;
};

const initialResumeData: ResumeData = {
  fullName: '',
  phone: '',
  email: '',
  linkedin: '',
  portfolio: '',
  address: '',
  photo: '',
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  publications: [],
  awards: [],
  activities: [],
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      resumeData: initialResumeData,
      selectedTemplate: 'modern',
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateResumeData: (data) => 
        set((state) => ({
          resumeData: { ...state.resumeData, ...data }
        })),
      
      addEducation: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              { 
                id: generateId(),
                degree: '',
                institution: '',
                graduationYear: '',
                relevantCourses: ''
              }
            ]
          }
        })),
      
      updateEducation: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) => 
              edu.id === id ? { ...edu, ...data } : edu
            )
          }
        })),
      
      removeEducation: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id)
          }
        })),
      
      addExperience: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              ...state.resumeData.experience,
              { 
                id: generateId(),
                jobTitle: '',
                company: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              }
            ]
          }
        })),
      
      updateExperience: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) => 
              exp.id === id ? { ...exp, ...data } : exp
            )
          }
        })),
      
      removeExperience: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id)
          }
        })),
      
      addProject: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              ...state.resumeData.projects,
              { 
                id: generateId(),
                title: '',
                technologies: '',
                description: ''
              }
            ]
          }
        })),
      
      updateProject: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) => 
              proj.id === id ? { ...proj, ...data } : proj
            )
          }
        })),
      
      removeProject: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id)
          }
        })),

      addCertification: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [
              ...state.resumeData.certifications,
              { 
                id: generateId(),
                name: '',
                issuer: '',
                year: ''
              }
            ]
          }
        })),
      
      updateCertification: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((cert) => 
              cert.id === id ? { ...cert, ...data } : cert
            )
          }
        })),
      
      removeCertification: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id)
          }
        })),
      
      addPublication: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            publications: [
              ...state.resumeData.publications,
              { 
                id: generateId(),
                title: '',
                publisher: '',
                date: '',
                description: ''
              }
            ]
          }
        })),
      
      updatePublication: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            publications: state.resumeData.publications.map((pub) => 
              pub.id === id ? { ...pub, ...data } : pub
            )
          }
        })),
      
      removePublication: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            publications: state.resumeData.publications.filter((pub) => pub.id !== id)
          }
        })),
      
      addAward: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: [
              ...state.resumeData.awards,
              { 
                id: generateId(),
                title: '',
                issuer: '',
                date: '',
                description: ''
              }
            ]
          }
        })),
      
      updateAward: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: state.resumeData.awards.map((award) => 
              award.id === id ? { ...award, ...data } : award
            )
          }
        })),
      
      removeAward: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: state.resumeData.awards.filter((award) => award.id !== id)
          }
        })),
      
      addActivity: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            activities: [
              ...state.resumeData.activities,
              { 
                id: generateId(),
                title: '',
                organization: '',
                date: '',
                description: ''
              }
            ]
          }
        })),
      
      updateActivity: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            activities: state.resumeData.activities.map((activity) => 
              activity.id === id ? { ...activity, ...data } : activity
            )
          }
        })),
      
      removeActivity: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            activities: state.resumeData.activities.filter((activity) => activity.id !== id)
          }
        })),
      
      addSkill: () => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [
              ...state.resumeData.skills,
              { 
                id: generateId(),
                name: '',
                category: 'technical' as const
              }
            ]
          }
        })),
      
      updateSkill: (id, data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((skill) => 
              skill.id === id ? { ...skill, ...data } : skill
            )
          }
        })),
      
      removeSkill: (id) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((skill) => skill.id !== id)
          }
        })),
      
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      
      clearResumeData: () => set({ resumeData: initialResumeData })
    }),
    {
      name: 'resume-store',
    }
  )
);
