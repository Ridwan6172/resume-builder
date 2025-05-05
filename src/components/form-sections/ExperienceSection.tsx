
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const ExperienceSection: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.experience.map((exp) => (
        <Card key={exp.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Work Experience Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`jobTitle-${exp.id}`} className="block text-sm font-medium mb-1">
                  Job Title
                </Label>
                <Input
                  id={`jobTitle-${exp.id}`}
                  placeholder="Software Engineer"
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`company-${exp.id}`} className="block text-sm font-medium mb-1">
                  Company/Organization
                </Label>
                <Input
                  id={`company-${exp.id}`}
                  placeholder="Acme Inc."
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium mb-1">
                  Start Date
                </Label>
                <Input
                  id={`startDate-${exp.id}`}
                  placeholder="MM/YYYY"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium mb-1">
                  End Date
                </Label>
                <Input
                  id={`endDate-${exp.id}`}
                  placeholder="MM/YYYY"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  disabled={exp.current}
                />
              </div>
            </div>
            
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox 
                id={`current-${exp.id}`}
                checked={exp.current} 
                onCheckedChange={(checked) => 
                  updateExperience(exp.id, { 
                    current: checked as boolean,
                    endDate: checked ? 'Present' : exp.endDate
                  })
                }
              />
              <Label 
                htmlFor={`current-${exp.id}`}
                className="text-sm font-normal"
              >
                I currently work here
              </Label>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`description-${exp.id}`} className="block text-sm font-medium mb-1">
                Responsibilities & Achievements
              </Label>
              <Textarea
                id={`description-${exp.id}`}
                placeholder="• Developed new features for the company website&#10;• Reduced page load time by 30%&#10;• Collaborated with design team to implement UI improvements"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                className="resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Use bullet points starting with action verbs to highlight your achievements and responsibilities.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addExperience}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
};

export default ExperienceSection;
