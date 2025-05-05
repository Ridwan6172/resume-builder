
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const SkillsSection: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();

  const technicalSkills = resumeData.skills.filter(skill => skill.category === 'technical');
  const softSkills = resumeData.skills.filter(skill => skill.category === 'soft');
  const languageSkills = resumeData.skills.filter(skill => skill.category === 'language');

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Technical Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {technicalSkills.map(skill => (
            <Badge key={skill.id} className="py-1.5 px-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
              {skill.name}
              <button 
                onClick={() => removeSkill(skill.id)}
                className="ml-2 text-blue-800/70 hover:text-blue-900"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Soft Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {softSkills.map(skill => (
            <Badge key={skill.id} className="py-1.5 px-3 bg-green-100 text-green-800 hover:bg-green-200">
              {skill.name}
              <button 
                onClick={() => removeSkill(skill.id)}
                className="ml-2 text-green-800/70 hover:text-green-900"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Languages</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {languageSkills.map(skill => (
            <Badge key={skill.id} className="py-1.5 px-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
              {skill.name}
              <button 
                onClick={() => removeSkill(skill.id)}
                className="ml-2 text-purple-800/70 hover:text-purple-900"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <h4 className="font-medium">Add a Skill</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="skillName" className="block text-sm font-medium mb-1">
                  Skill Name
                </Label>
                <Input
                  id="skillName"
                  placeholder="JavaScript, Leadership, Spanish, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="skillCategory" className="block text-sm font-medium mb-1">
                  Category
                </Label>
                <Select defaultValue="technical">
                  <SelectTrigger id="skillCategory" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft">Soft</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  onClick={() => {
                    const name = (document.getElementById('skillName') as HTMLInputElement).value;
                    const selectElement = document.getElementById('skillCategory');
                    const category = (selectElement as any)?.value || 'technical';
                    
                    if (name.trim()) {
                      addSkill();
                      const newSkillId = resumeData.skills[resumeData.skills.length - 1]?.id;
                      if (newSkillId) {
                        updateSkill(newSkillId, { 
                          name, 
                          category: category as 'technical' | 'soft' | 'language'
                        });
                        
                        // Reset the input field
                        (document.getElementById('skillName') as HTMLInputElement).value = '';
                      }
                    }
                  }}
                  className="w-full"
                >
                  Add Skill
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsSection;
