
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store";

const SummarySection: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeStore();

  return (
    <div>
      <div className="field-group">
        <Label htmlFor="summary" className="block text-sm font-medium mb-1">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          placeholder="A brief summary of your professional background, skills, and career goals (2-4 sentences recommended)."
          value={resumeData.summary}
          onChange={(e) => updateResumeData({ summary: e.target.value })}
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Highlight your key qualifications, areas of expertise, and career aspirations.
        </p>
      </div>
    </div>
  );
};

export default SummarySection;
