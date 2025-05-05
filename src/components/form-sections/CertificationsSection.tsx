
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";

const CertificationsSection: React.FC = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <div className="space-y-6">
      {resumeData.certifications.map((cert) => (
        <Card key={cert.id} className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Certification Entry</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${cert.id}`} className="block text-sm font-medium mb-1">
                  Certification Name
                </Label>
                <Input
                  id={`name-${cert.id}`}
                  placeholder="AWS Certified Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor={`issuer-${cert.id}`} className="block text-sm font-medium mb-1">
                  Issuing Organization
                </Label>
                <Input
                  id={`issuer-${cert.id}`}
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`year-${cert.id}`} className="block text-sm font-medium mb-1">
                Year Obtained
              </Label>
              <Input
                id={`year-${cert.id}`}
                placeholder="2023"
                value={cert.year}
                onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addCertification}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
};

export default CertificationsSection;
