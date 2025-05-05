
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const PublicationsSection: React.FC = () => {
  const { resumeData, addPublication, updatePublication, removePublication } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.publications.map((pub) => (
        <Card key={pub.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Publication Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removePublication(pub.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`title-${pub.id}`} className="block text-sm font-medium mb-1">
                Publication Title
              </Label>
              <Input
                id={`title-${pub.id}`}
                placeholder="Machine Learning Applications in Healthcare"
                value={pub.title}
                onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor={`publisher-${pub.id}`} className="block text-sm font-medium mb-1">
                  Publisher/Journal/Conference
                </Label>
                <Input
                  id={`publisher-${pub.id}`}
                  placeholder="Journal of Medical Research"
                  value={pub.publisher}
                  onChange={(e) => updatePublication(pub.id, { publisher: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`date-${pub.id}`} className="block text-sm font-medium mb-1">
                  Publication Date
                </Label>
                <Input
                  id={`date-${pub.id}`}
                  placeholder="MM/YYYY"
                  value={pub.date}
                  onChange={(e) => updatePublication(pub.id, { date: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`description-${pub.id}`} className="block text-sm font-medium mb-1">
                Your Contribution
              </Label>
              <Textarea
                id={`description-${pub.id}`}
                placeholder="Brief description of research and your role in it."
                value={pub.description}
                onChange={(e) => updatePublication(pub.id, { description: e.target.value })}
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
        onClick={addPublication}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Publication
      </Button>
    </div>
  );
};

export default PublicationsSection;
