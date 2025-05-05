
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store";

const ContactSection: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeStore();
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateResumeData({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="field-group">
        <Label htmlFor="fullName" className="block text-sm font-medium mb-1">
          Full Name *
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={resumeData.fullName}
          onChange={(e) => updateResumeData({ fullName: e.target.value })}
          required
        />
      </div>

      <div className="field-group">
        <Label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={resumeData.email}
          onChange={(e) => updateResumeData({ email: e.target.value })}
          required
        />
      </div>

      <div className="field-group">
        <Label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number *
        </Label>
        <Input
          id="phone"
          placeholder="+1 (555) 123-4567"
          value={resumeData.phone}
          onChange={(e) => updateResumeData({ phone: e.target.value })}
          required
        />
      </div>

      <div className="field-group">
        <Label htmlFor="address" className="block text-sm font-medium mb-1">
          Address (City, State)
        </Label>
        <Input
          id="address"
          placeholder="New York, NY"
          value={resumeData.address}
          onChange={(e) => updateResumeData({ address: e.target.value })}
        />
      </div>

      <div className="field-group">
        <Label htmlFor="linkedin" className="block text-sm font-medium mb-1">
          LinkedIn Profile
        </Label>
        <Input
          id="linkedin"
          placeholder="linkedin.com/in/johndoe"
          value={resumeData.linkedin}
          onChange={(e) => updateResumeData({ linkedin: e.target.value })}
        />
      </div>

      <div className="field-group">
        <Label htmlFor="portfolio" className="block text-sm font-medium mb-1">
          Portfolio or Personal Website
        </Label>
        <Input
          id="portfolio"
          placeholder="johndoe.com"
          value={resumeData.portfolio}
          onChange={(e) => updateResumeData({ portfolio: e.target.value })}
        />
      </div>

      <div className="field-group">
        <Label htmlFor="photo" className="block text-sm font-medium mb-1">
          Photo (Optional)
        </Label>
        <div className="flex items-start gap-4">
          <div>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="max-w-xs"
            />
            <p className="text-xs mt-1 text-gray-500">Recommended: square image, max 1MB</p>
          </div>
          {resumeData.photo && (
            <div className="flex-shrink-0">
              <img 
                src={resumeData.photo} 
                alt="Profile" 
                className="h-20 w-20 object-cover rounded-full border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
