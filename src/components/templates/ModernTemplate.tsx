
import React from "react";
import { ResumeData } from "@/lib/store";

interface TemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 font-sans">
      {/* Header */}
      <header className="pb-6 border-b-2 border-blue-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-gray-900">{resumeData.fullName}</h1>
            {resumeData.summary && (
              <p className="mt-2 text-gray-600 max-w-2xl">{resumeData.summary}</p>
            )}
          </div>
          
          {resumeData.photo && (
            <div className="mt-4 md:mt-0 md:ml-4">
              <img 
                src={resumeData.photo} 
                alt={resumeData.fullName}
                className="h-20 w-20 object-cover rounded-full border-2 border-blue-500" 
              />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {resumeData.phone && (
            <div className="mr-4">
              <span className="font-semibold">Phone:</span> {resumeData.phone}
            </div>
          )}
          {resumeData.email && (
            <div className="mr-4">
              <span className="font-semibold">Email:</span> {resumeData.email}
            </div>
          )}
          {resumeData.address && (
            <div className="mr-4">
              <span className="font-semibold">Location:</span> {resumeData.address}
            </div>
          )}
          {resumeData.linkedin && (
            <div className="mr-4">
              <span className="font-semibold">LinkedIn:</span> {resumeData.linkedin}
            </div>
          )}
          {resumeData.portfolio && (
            <div>
              <span className="font-semibold">Portfolio:</span> {resumeData.portfolio}
            </div>
          )}
        </div>
      </header>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Work Experience */}
          {resumeData.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Professional Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{exp.jobTitle}</h3>
                      <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="text-gray-700">{exp.company}</div>
                    <div className="mt-1 text-sm whitespace-pre-line">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {resumeData.education.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">{edu.graduationYear}</span>
                    </div>
                    <div className="text-gray-700">{edu.institution}</div>
                    {edu.relevantCourses && (
                      <div className="mt-1 text-sm">
                        <span className="font-medium">Relevant Courses:</span> {edu.relevantCourses}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Projects</h2>
              <div className="space-y-4">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="text-sm text-blue-600">{project.technologies}</div>
                    <div className="mt-1 text-sm whitespace-pre-line">{project.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Publications */}
          {resumeData.publications.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Publications</h2>
              <div className="space-y-3">
                {resumeData.publications.map((pub) => (
                  <div key={pub.id} className="mb-3">
                    <h3 className="font-semibold">{pub.title}</h3>
                    <div className="flex justify-between">
                      <span className="text-gray-700">{pub.publisher}</span>
                      <span className="text-sm text-gray-600">{pub.date}</span>
                    </div>
                    {pub.description && (
                      <div className="mt-1 text-sm">{pub.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Skills</h2>
              <div className="space-y-3">
                {resumeData.skills.some(skill => skill.category === 'technical') && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">Technical</h3>
                    <div className="flex flex-wrap gap-1">
                      {resumeData.skills
                        .filter(skill => skill.category === 'technical')
                        .map(skill => (
                          <span 
                            key={skill.id} 
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {skill.name}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                )}
                
                {resumeData.skills.some(skill => skill.category === 'soft') && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">Soft Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {resumeData.skills
                        .filter(skill => skill.category === 'soft')
                        .map(skill => (
                          <span 
                            key={skill.id} 
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {skill.name}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                )}
                
                {resumeData.skills.some(skill => skill.category === 'language') && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">Languages</h3>
                    <div className="flex flex-wrap gap-1">
                      {resumeData.skills
                        .filter(skill => skill.category === 'language')
                        .map(skill => (
                          <span 
                            key={skill.id} 
                            className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                          >
                            {skill.name}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Certifications</h2>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                {resumeData.certifications.map((cert) => (
                  <li key={cert.id}>
                    <span className="font-medium">{cert.name}</span>
                    {cert.issuer && <> - {cert.issuer}</>}
                    {cert.year && <> ({cert.year})</>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Awards */}
          {resumeData.awards.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Awards & Achievements</h2>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                {resumeData.awards.map((award) => (
                  <li key={award.id}>
                    <span className="font-medium">{award.title}</span>
                    {award.issuer && <> - {award.issuer}</>}
                    {award.date && <> ({award.date})</>}
                    {award.description && <p className="mt-0.5 text-gray-600">{award.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Activities */}
          {resumeData.activities.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Extracurricular Activities</h2>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                {resumeData.activities.map((activity) => (
                  <li key={activity.id}>
                    <span className="font-medium">{activity.title}</span>
                    {activity.organization && <> - {activity.organization}</>}
                    {activity.date && <> ({activity.date})</>}
                    {activity.description && <p className="mt-0.5 text-gray-600">{activity.description}</p>}
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

export default ModernTemplate;
