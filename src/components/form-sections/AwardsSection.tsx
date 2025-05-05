
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const AwardsSection: React.FC = () => {
  const { resumeData, addAward, updateAward, removeAward } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.awards.map((award) => (
        <Card key={award.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Award/Achievement Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeAward(award.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`title-${award.id}`} className="block text-sm font-medium mb-1">
                Award Title
              </Label>
              <Input
                id={`title-${award.id}`}
                placeholder="Dean's List, Scholarship Name, etc."
                value={award.title}
                onChange={(e) => updateAward(award.id, { title: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor={`issuer-${award.id}`} className="block text-sm font-medium mb-1">
                  Issuing Organization
                </Label>
                <Input
                  id={`issuer-${award.id}`}
                  placeholder="University, Company, etc."
                  value={award.issuer}
                  onChange={(e) => updateAward(award.id, { issuer: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`date-${award.id}`} className="block text-sm font-medium mb-1">
                  Date Received
                </Label>
                <Input
                  id={`date-${award.id}`}
                  placeholder="MM/YYYY"
                  value={award.date}
                  onChange={(e) => updateAward(award.id, { date: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`description-${award.id}`} className="block text-sm font-medium mb-1">
                Description (Optional)
              </Label>
              <Textarea
                id={`description-${award.id}`}
                placeholder="Brief description of the award or achievement."
                value={award.description}
                onChange={(e) => updateAward(award.id, { description: e.target.value })}
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
        onClick={addAward}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Award/Achievement
      </Button>
    </div>
  );
};

export default AwardsSection;
