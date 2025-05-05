
import React from "react";
import { ResumeData } from "@/lib/store";

interface TemplateProps {
  resumeData: ResumeData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 font-serif">
      {/* Header */}
      <header className="text-center pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{resumeData.fullName}</h1>
        
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
          {resumeData.phone && (
            <div className="mx-2">
              <span className="font-semibold">Phone:</span> {resumeData.phone}
            </div>
          )}
          {resumeData.email && (
            <div className="mx-2">
              <span className="font-semibold">Email:</span> {resumeData.email}
            </div>
          )}
          {resumeData.address && (
            <div className="mx-2">
              <span className="font-semibold">Address:</span> {resumeData.address}
            </div>
          )}
        </div>
        
        <div className="mt-1 flex flex-wrap justify-center gap-3 text-sm">
          {resumeData.linkedin && (
            <div className="mx-2">
              <span className="font-semibold">LinkedIn:</span> {resumeData.linkedin}
            </div>
          )}
          {resumeData.portfolio && (
            <div className="mx-2">
              <span className="font-semibold">Portfolio:</span> {resumeData.portfolio}
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {resumeData.summary && (
        <section className="mt-4">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{resumeData.summary}</p>
        </section>
      )}
      
      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>
          <div className="space-y-3">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <div className="text-sm">{edu.institution}</div>
                  {edu.relevantCourses && (
                    <div className="text-xs">
                      <span className="italic">Relevant Courses:</span> {edu.relevantCourses}
                    </div>
                  )}
                </div>
                <div className="text-sm italic mt-1 sm:mt-0">{edu.graduationYear}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Experience</h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-bold">{exp.jobTitle}</h3>
                    <div className="text-sm">{exp.company}</div>
                  </div>
                  <div className="text-sm italic mt-1 sm:mt-0">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                </div>
                <div className="mt-1 text-sm whitespace-pre-line">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Skills</h2>
          
          {resumeData.skills.some(skill => skill.category === 'technical') && (
            <div className="mb-2">
              <h3 className="font-bold text-sm">Technical Skills</h3>
              <p className="text-sm">
                {resumeData.skills
                  .filter(skill => skill.category === 'technical')
                  .map(skill => skill.name)
                  .join(", ")
                }
              </p>
            </div>
          )}
          
          {resumeData.skills.some(skill => skill.category === 'soft') && (
            <div className="mb-2">
              <h3 className="font-bold text-sm">Soft Skills</h3>
              <p className="text-sm">
                {resumeData.skills
                  .filter(skill => skill.category === 'soft')
                  .map(skill => skill.name)
                  .join(", ")
                }
              </p>
            </div>
          )}
          
          {resumeData.skills.some(skill => skill.category === 'language') && (
            <div className="mb-2">
              <h3 className="font-bold text-sm">Languages</h3>
              <p className="text-sm">
                {resumeData.skills
                  .filter(skill => skill.category === 'language')
                  .map(skill => skill.name)
                  .join(", ")
                }
              </p>
            </div>
          )}
        </section>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Projects</h2>
              <div className="space-y-2">
                {resumeData.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold">{project.title}</h3>
                    <div className="text-sm italic">{project.technologies}</div>
                    <div className="mt-1 text-sm whitespace-pre-line">{project.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Certifications</h2>
              <ul className="list-disc pl-4 text-sm">
                {resumeData.certifications.map((cert) => (
                  <li key={cert.id}>
                    {cert.name} - {cert.issuer} ({cert.year})
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        
        <div>
          {/* Publications */}
          {resumeData.publications.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Publications</h2>
              <div className="space-y-2">
                {resumeData.publications.map((pub) => (
                  <div key={pub.id}>
                    <h3 className="font-bold">{pub.title}</h3>
                    <div className="text-sm italic">{pub.publisher}, {pub.date}</div>
                    {pub.description && <div className="text-sm">{pub.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Awards */}
          {resumeData.awards.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Awards & Achievements</h2>
              <ul className="list-disc pl-4 text-sm">
                {resumeData.awards.map((award) => (
                  <li key={award.id}>
                    <span className="font-bold">{award.title}</span> - {award.issuer} ({award.date})
                    {award.description && <p className="text-sm">{award.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Activities */}
          {resumeData.activities.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Extracurricular Activities</h2>
              <ul className="list-disc pl-4 text-sm">
                {resumeData.activities.map((activity) => (
                  <li key={activity.id}>
                    <span className="font-bold">{activity.title}</span> - {activity.organization} ({activity.date})
                    {activity.description && <p className="text-sm">{activity.description}</p>}
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

export default ClassicTemplate;
