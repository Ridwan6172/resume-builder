
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const ActivitiesSection: React.FC = () => {
  const { resumeData, addActivity, updateActivity, removeActivity } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.activities.map((activity) => (
        <Card key={activity.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Activity Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeActivity(activity.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`title-${activity.id}`} className="block text-sm font-medium mb-1">
                Role/Activity Title
              </Label>
              <Input
                id={`title-${activity.id}`}
                placeholder="Volunteer, Club President, etc."
                value={activity.title}
                onChange={(e) => updateActivity(activity.id, { title: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor={`organization-${activity.id}`} className="block text-sm font-medium mb-1">
                  Organization
                </Label>
                <Input
                  id={`organization-${activity.id}`}
                  placeholder="Red Cross, Student Club, etc."
                  value={activity.organization}
                  onChange={(e) => updateActivity(activity.id, { organization: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`date-${activity.id}`} className="block text-sm font-medium mb-1">
                  Date/Duration
                </Label>
                <Input
                  id={`date-${activity.id}`}
                  placeholder="MM/YYYY - MM/YYYY or 2022-Present"
                  value={activity.date}
                  onChange={(e) => updateActivity(activity.id, { date: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`description-${activity.id}`} className="block text-sm font-medium mb-1">
                Description
              </Label>
              <Textarea
                id={`description-${activity.id}`}
                placeholder="Brief description of your involvement and achievements."
                value={activity.description}
                onChange={(e) => updateActivity(activity.id, { description: e.target.value })}
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
        onClick={addActivity}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Activity
      </Button>
    </div>
  );
};

export default ActivitiesSection;
