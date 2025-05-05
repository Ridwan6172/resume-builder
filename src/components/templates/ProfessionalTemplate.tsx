
import React from "react";
import { ResumeData } from "@/lib/store";

interface TemplateProps {
  resumeData: ResumeData;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 font-montserrat">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{resumeData.fullName}</h1>
            {resumeData.photo && (
              <div className="md:hidden mt-4">
                <img 
                  src={resumeData.photo} 
                  alt={resumeData.fullName}
                  className="h-24 w-24 object-cover rounded-full border-2 border-gray-300" 
                />
              </div>
            )}
          </div>
          {resumeData.photo && (
            <div className="hidden md:block">
              <img 
                src={resumeData.photo} 
                alt={resumeData.fullName}
                className="h-24 w-24 object-cover rounded-full border-2 border-gray-300" 
              />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex flex-col md:flex-row md:justify-between items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {resumeData.phone && (
              <div>
                <span className="font-bold">Phone:</span> {resumeData.phone}
              </div>
            )}
            {resumeData.email && (
              <div>
                <span className="font-bold">Email:</span> {resumeData.email}
              </div>
            )}
            {resumeData.address && (
              <div>
                <span className="font-bold">Location:</span> {resumeData.address}
              </div>
            )}
            {resumeData.linkedin && (
              <div>
                <span className="font-bold">LinkedIn:</span> {resumeData.linkedin}
              </div>
            )}
            {resumeData.portfolio && (
              <div>
                <span className="font-bold">Portfolio:</span> {resumeData.portfolio}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Divider */}
      <div className="h-1 bg-gray-800 mb-6"></div>
      
      {/* Summary */}
      {resumeData.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700">{resumeData.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <div>
                    <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                    <div className="text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-gray-600 font-medium mt-1 md:mt-0">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <div className="mt-2 text-gray-800 whitespace-pre-line">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Education */}
          {resumeData.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <div>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <div className="text-gray-700">{edu.institution}</div>
                      </div>
                      <div className="text-gray-600 font-medium mt-1 md:mt-0">{edu.graduationYear}</div>
                    </div>
                    {edu.relevantCourses && (
                      <div className="mt-1 text-sm text-gray-600">
                        <span className="font-bold">Relevant Courses:</span> {edu.relevantCourses}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Projects</h2>
              <div className="space-y-5">
                {resumeData.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold">{project.title}</h3>
                    <div className="text-gray-600">{project.technologies}</div>
                    <div className="mt-2 text-gray-800 whitespace-pre-line">{project.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Publications */}
          {resumeData.publications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Publications</h2>
              <div className="space-y-4">
                {resumeData.publications.map((pub) => (
                  <div key={pub.id}>
                    <h3 className="font-bold">{pub.title}</h3>
                    <div className="text-gray-600">{pub.publisher}, {pub.date}</div>
                    {pub.description && <div className="mt-1 text-gray-700">{pub.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div>
          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              
              {resumeData.skills.some(skill => skill.category === 'technical') && (
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800">Technical</h3>
                  <div className="mt-2">
                    <ul className="list-disc pl-5 space-y-1">
                      {resumeData.skills
                        .filter(skill => skill.category === 'technical')
                        .map(skill => (
                          <li key={skill.id}>{skill.name}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )}
              
              {resumeData.skills.some(skill => skill.category === 'soft') && (
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800">Soft Skills</h3>
                  <div className="mt-2">
                    <ul className="list-disc pl-5 space-y-1">
                      {resumeData.skills
                        .filter(skill => skill.category === 'soft')
                        .map(skill => (
                          <li key={skill.id}>{skill.name}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )}
              
              {resumeData.skills.some(skill => skill.category === 'language') && (
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800">Languages</h3>
                  <div className="mt-2">
                    <ul className="list-disc pl-5 space-y-1">
                      {resumeData.skills
                        .filter(skill => skill.category === 'language')
                        .map(skill => (
                          <li key={skill.id}>{skill.name}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )}
            </section>
          )}
          
          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications</h2>
              <ul className="list-disc pl-5 space-y-1">
                {resumeData.certifications.map((cert) => (
                  <li key={cert.id}>
                    <span className="font-medium">{cert.name}</span>
                    <div className="text-sm text-gray-600">{cert.issuer}, {cert.year}</div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Awards */}
          {resumeData.awards.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Awards & Achievements</h2>
              <ul className="list-disc pl-5 space-y-2">
                {resumeData.awards.map((award) => (
                  <li key={award.id}>
                    <span className="font-medium">{award.title}</span>
                    <div className="text-sm text-gray-600">{award.issuer}, {award.date}</div>
                    {award.description && <div className="text-sm">{award.description}</div>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Activities */}
          {resumeData.activities.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Extracurricular</h2>
              <ul className="list-disc pl-5 space-y-2">
                {resumeData.activities.map((activity) => (
                  <li key={activity.id}>
                    <span className="font-medium">{activity.title}</span>
                    <div className="text-sm text-gray-600">
                      {activity.organization}, {activity.date}
                    </div>
                    {activity.description && <div className="text-sm">{activity.description}</div>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
