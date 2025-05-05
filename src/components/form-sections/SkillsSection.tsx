import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const [newSkill, setNewSkill] = useState("");
  const [skillCategory, setSkillCategory] = useState<'technical' | 'soft' | 'language'>('technical');

  const technicalSkills = resumeData.skills.filter(skill => skill.category === 'technical');
  const softSkills = resumeData.skills.filter(skill => skill.category === 'soft');
  const languageSkills = resumeData.skills.filter(skill => skill.category === 'language');

  const handleAddSkill = () => {
    if (newSkill.trim() === "") {
      toast({
        title: "Skill name required",
        description: "Please enter a skill name before adding",
        variant: "destructive",
      });
      return;
    }

    // Create a new skill with proper values before adding to store
    const skillName = newSkill.trim();
    const skillId = Math.random().toString(36).substr(2, 9);
    
    // Add directly with correct values instead of adding empty and then updating
    addSkill();
    const newSkillId = resumeData.skills.length > 0 ? 
      resumeData.skills[resumeData.skills.length - 1]?.id : skillId;
      
    if (newSkillId) {
      updateSkill(newSkillId, { 
        name: skillName, 
        category: skillCategory
      });
      
      setNewSkill("");
      
      toast({
        title: "Skill added",
        description: `${skillName} has been added to your ${skillCategory} skills.`,
      });
    }
  };

  const getSkillBadgeClass = (category: string) => {
    switch(category) {
      case 'technical':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'soft':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'language':
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Technical Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {technicalSkills.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No technical skills added yet</p>
          ) : (
            technicalSkills.map(skill => (
              <Badge key={skill.id} className={`py-1.5 px-3 ${getSkillBadgeClass('technical')}`}>
                {skill.name}
                <button 
                  onClick={() => {
                    removeSkill(skill.id);
                    toast({
                      title: "Skill removed",
                      description: `${skill.name} has been removed from your skills.`,
                    });
                  }}
                  className="ml-2 text-blue-800/70 hover:text-blue-900"
                  aria-label={`Remove ${skill.name} skill`}
                >
                  ×
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Soft Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {softSkills.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No soft skills added yet</p>
          ) : (
            softSkills.map(skill => (
              <Badge key={skill.id} className={`py-1.5 px-3 ${getSkillBadgeClass('soft')}`}>
                {skill.name}
                <button 
                  onClick={() => {
                    removeSkill(skill.id);
                    toast({
                      title: "Skill removed",
                      description: `${skill.name} has been removed from your skills.`,
                    });
                  }}
                  className="ml-2 text-green-800/70 hover:text-green-900"
                  aria-label={`Remove ${skill.name} skill`}
                >
                  ×
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Languages</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {languageSkills.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No languages added yet</p>
          ) : (
            languageSkills.map(skill => (
              <Badge key={skill.id} className={`py-1.5 px-3 ${getSkillBadgeClass('language')}`}>
                {skill.name}
                <button 
                  onClick={() => {
                    removeSkill(skill.id);
                    toast({
                      title: "Skill removed",
                      description: `${skill.name} has been removed from your skills.`,
                    });
                  }}
                  className="ml-2 text-purple-800/70 hover:text-purple-900"
                  aria-label={`Remove ${skill.name} skill`}
                >
                  ×
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>
      
      <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <h4 className="font-medium text-gray-900">Add a New Skill</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="skillName" className="block text-sm font-medium mb-1">
                  Skill Name
                </Label>
                <Input
                  id="skillName"
                  placeholder="JavaScript, Leadership, Spanish, etc."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newSkill.trim() !== '') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="skillCategory" className="block text-sm font-medium mb-1">
                  Category
                </Label>
                <Select 
                  value={skillCategory} 
                  onValueChange={(value) => setSkillCategory(value as 'technical' | 'soft' | 'language')}
                >
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
                  onClick={handleAddSkill}
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
