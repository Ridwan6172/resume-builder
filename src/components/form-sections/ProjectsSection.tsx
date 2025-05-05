
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const ProjectsSection: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.projects.map((project) => (
        <Card key={project.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Project Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`title-${project.id}`} className="block text-sm font-medium mb-1">
                Project Title
              </Label>
              <Input
                id={`title-${project.id}`}
                placeholder="E-commerce Website, Mobile App, etc."
                value={project.title}
                onChange={(e) => updateProject(project.id, { title: e.target.value })}
              />
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`technologies-${project.id}`} className="block text-sm font-medium mb-1">
                Technologies Used
              </Label>
              <Input
                id={`technologies-${project.id}`}
                placeholder="React, Node.js, MongoDB, etc."
                value={project.technologies}
                onChange={(e) => updateProject(project.id, { technologies: e.target.value })}
              />
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`description-${project.id}`} className="block text-sm font-medium mb-1">
                Project Description
              </Label>
              <Textarea
                id={`description-${project.id}`}
                placeholder="• Developed a full-stack e-commerce platform&#10;• Implemented secure payment system&#10;• Designed responsive UI for mobile and desktop"
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                className="resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Briefly describe what you built and your role in the project.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addProject}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsSection;
