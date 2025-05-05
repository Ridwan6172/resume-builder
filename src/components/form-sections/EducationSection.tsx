
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const EducationSection: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.education.map((edu) => (
        <Card key={edu.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Education Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium mb-1">
                  Degree/Program
                </Label>
                <Input
                  id={`degree-${edu.id}`}
                  placeholder="B.Sc. in Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`institution-${edu.id}`} className="block text-sm font-medium mb-1">
                  Institution
                </Label>
                <Input
                  id={`institution-${edu.id}`}
                  placeholder="University of Example"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`graduationYear-${edu.id}`} className="block text-sm font-medium mb-1">
                Graduation Year (or expected)
              </Label>
              <Input
                id={`graduationYear-${edu.id}`}
                placeholder="2023"
                value={edu.graduationYear}
                onChange={(e) => updateEducation(edu.id, { graduationYear: e.target.value })}
              />
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`relevantCourses-${edu.id}`} className="block text-sm font-medium mb-1">
                Relevant Courses or Honors (Optional)
              </Label>
              <Textarea
                id={`relevantCourses-${edu.id}`}
                placeholder="Machine Learning, Database Systems, Software Engineering"
                value={edu.relevantCourses}
                onChange={(e) => updateEducation(edu.id, { relevantCourses: e.target.value })}
                className="resize-none"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addEducation}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationSection;
