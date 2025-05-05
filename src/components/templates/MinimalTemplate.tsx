
import React from "react";
import { ResumeData } from "@/lib/store";

interface TemplateProps {
  resumeData: ResumeData;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 font-sans">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-montserrat font-bold text-gray-900 uppercase tracking-wider">{resumeData.fullName}</h1>
        
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {resumeData.phone && <div>{resumeData.phone}</div>}
          {resumeData.email && <div>{resumeData.email}</div>}
          {resumeData.address && <div>{resumeData.address}</div>}
          {resumeData.linkedin && <div>{resumeData.linkedin}</div>}
          {resumeData.portfolio && <div>{resumeData.portfolio}</div>}
        </div>
      </header>
      
      <div className="h-px bg-gray-300 my-3"></div>
      
      {/* Summary */}
      {resumeData.summary && (
        <section className="mt-4">
          <p className="text-sm">{resumeData.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Experience</h2>
          <div className="space-y-5">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <div className="text-sm text-gray-600">{exp.company}</div>
                <div className="mt-1 text-sm whitespace-pre-line">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Education</h2>
          <div className="space-y-3">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.graduationYear}</span>
                </div>
                <div className="text-sm text-gray-600">{edu.institution}</div>
                {edu.relevantCourses && (
                  <div className="text-xs text-gray-500 mt-1">
                    {edu.relevantCourses}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Skills</h2>
          
          {resumeData.skills.some(skill => skill.category === 'technical') && (
            <div className="mb-2">
              <h3 className="text-sm font-medium">Technical Skills</h3>
              <p className="text-sm">
                {resumeData.skills
                  .filter(skill => skill.category === 'technical')
                  .map(skill => skill.name)
                  .join(" • ")
                }
              </p>
            </div>
          )}
          
          {resumeData.skills.some(skill => skill.category === 'soft') && (
            <div className="mb-2">
              <h3 className="text-sm font-medium">Soft Skills</h3>
              <p className="text-sm">
                {resumeData.skills
                  .filter(skill => skill.category === 'soft')
                  .map(skill => skill.name)
                  .join(" • ")
                }
              </p>
            </div>
          )}
          
          {resumeData.skills.some(skill => skill.category === 'language') && (
            <div className="mb-2">
              <h3 className="text-sm font-medium">Languages</h3>
              <p className="text-sm">
                {resumeData.skills
                  .filter(skill => skill.category === 'language')
                  .map(skill => skill.name)
                  .join(" • ")
                }
              </p>
            </div>
          )}
        </section>
      )}
      
      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Projects</h2>
          <div className="space-y-3">
            {resumeData.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.title}</h3>
                </div>
                <div className="text-sm text-gray-600">{project.technologies}</div>
                <div className="mt-1 text-sm whitespace-pre-line">{project.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Additional Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <section className="md:col-span-1">
            <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Certifications</h2>
            <ul className="space-y-1 text-sm">
              {resumeData.certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-medium">{cert.name}</span>
                  <div className="text-xs text-gray-600">{cert.issuer}, {cert.year}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Publications */}
        {resumeData.publications.length > 0 && (
          <section className="md:col-span-1">
            <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Publications</h2>
            <ul className="space-y-1 text-sm">
              {resumeData.publications.map((pub) => (
                <li key={pub.id}>
                  <span className="font-medium">{pub.title}</span>
                  <div className="text-xs text-gray-600">{pub.publisher}, {pub.date}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Awards */}
        {resumeData.awards.length > 0 && (
          <section className="md:col-span-1">
            <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Awards</h2>
            <ul className="space-y-1 text-sm">
              {resumeData.awards.map((award) => (
                <li key={award.id}>
                  <span className="font-medium">{award.title}</span>
                  <div className="text-xs text-gray-600">{award.issuer}, {award.date}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      
      {/* Activities */}
      {resumeData.activities.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg uppercase tracking-wider font-montserrat mb-2 text-gray-900">Extracurricular Activities</h2>
          <div className="space-y-1 text-sm">
            {resumeData.activities.map((activity) => (
              <div key={activity.id} className="flex justify-between">
                <span className="font-medium">{activity.title}, {activity.organization}</span>
                <span className="text-gray-600">{activity.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
