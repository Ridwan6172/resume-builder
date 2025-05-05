
import React from "react";
import { ResumeData } from "@/lib/store";

interface TemplateProps {
  resumeData: ResumeData;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
  return (
    <div className="w-full h-full bg-white font-montserrat">
      {/* Sidebar */}
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-4 bg-blue-600 text-white p-6">
          {/* Photo */}
          {resumeData.photo && (
            <div className="mb-6 flex justify-center">
              <img
                src={resumeData.photo}
                alt={resumeData.fullName}
                className="h-32 w-32 object-cover rounded-full border-4 border-blue-300"
              />
            </div>
          )}

          {/* Name */}
          <h1 className="text-2xl font-bold mb-1 text-center">{resumeData.fullName}</h1>

          {/* Contact Info */}
          <div className="mt-6 space-y-2 text-sm">
            {resumeData.phone && (
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span>{resumeData.phone}</span>
              </div>
            )}
            {resumeData.email && (
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span>{resumeData.email}</span>
              </div>
            )}
            {resumeData.address && (
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{resumeData.address}</span>
              </div>
            )}
            {resumeData.linkedin && (
              <div className="flex items-center">
                <span className="mr-2">🔗</span>
                <span>{resumeData.linkedin}</span>
              </div>
            )}
            {resumeData.portfolio && (
              <div className="flex items-center">
                <span className="mr-2">🌐</span>
                <span>{resumeData.portfolio}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 pb-2 border-b-2 border-blue-300">Skills</h2>

              {resumeData.skills.some(skill => skill.category === 'technical') && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-2">Technical</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills
                      .filter(skill => skill.category === 'technical')
                      .map(skill => (
                        <span 
                          key={skill.id} 
                          className="bg-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}

              {resumeData.skills.some(skill => skill.category === 'soft') && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills
                      .filter(skill => skill.category === 'soft')
                      .map(skill => (
                        <span 
                          key={skill.id} 
                          className="bg-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}

              {resumeData.skills.some(skill => skill.category === 'language') && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills
                      .filter(skill => skill.category === 'language')
                      .map(skill => (
                        <span 
                          key={skill.id} 
                          className="bg-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 pb-2 border-b-2 border-blue-300">Education</h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <div className="text-sm">{edu.institution}</div>
                    <div className="text-sm text-blue-200">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 pb-2 border-b-2 border-blue-300">Certifications</h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-blue-200">{cert.issuer}, {cert.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-8 p-6 overflow-y-auto">
          {/* Summary */}
          {resumeData.summary && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b border-blue-200">About Me</h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b border-blue-200">Experience</h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-blue-800">{exp.jobTitle}</h3>
                      <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">{exp.company}</div>
                    <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b border-blue-200">Projects</h2>
              <div className="space-y-4">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="border-l-4 border-blue-200 pl-4">
                    <h3 className="font-bold text-blue-800">{project.title}</h3>
                    <div className="text-sm italic text-blue-600">{project.technologies}</div>
                    <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">{project.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Publications */}
          {resumeData.publications.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b border-blue-200">Publications</h2>
              <div className="space-y-3">
                {resumeData.publications.map((pub) => (
                  <div key={pub.id}>
                    <h3 className="font-bold">{pub.title}</h3>
                    <div className="text-sm text-gray-600">{pub.publisher}, {pub.date}</div>
                    {pub.description && <div className="mt-1 text-sm text-gray-700">{pub.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {resumeData.awards.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b border-blue-200">Awards & Achievements</h2>
              <div className="space-y-3">
                {resumeData.awards.map((award) => (
                  <div key={award.id}>
                    <h3 className="font-bold">{award.title}</h3>
                    <div className="text-sm text-gray-600">{award.issuer}, {award.date}</div>
                    {award.description && <div className="mt-1 text-sm text-gray-700">{award.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {resumeData.activities.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b border-blue-200">Extracurricular Activities</h2>
              <div className="space-y-3">
                {resumeData.activities.map((activity) => (
                  <div key={activity.id}>
                    <div className="flex justify-between">
                      <h3 className="font-bold">{activity.title}</h3>
                      <span className="text-sm text-gray-600">{activity.date}</span>
                    </div>
                    <div className="text-sm text-gray-600">{activity.organization}</div>
                    {activity.description && <div className="mt-1 text-sm text-gray-700">{activity.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
