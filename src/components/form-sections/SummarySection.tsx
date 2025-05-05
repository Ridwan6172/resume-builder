
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";

const SummarySection: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeStore();
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    setCharCount(resumeData.summary.length);
  }, [resumeData.summary]);

  return (
    <div>
      <div className="field-group">
        <div className="flex justify-between items-center mb-1">
          <Label htmlFor="summary" className="block text-sm font-medium">
            Professional Summary
          </Label>
          <span className="text-xs text-gray-500">{charCount}/400 characters</span>
        </div>
        <Textarea
          id="summary"
          placeholder="A brief summary of your professional background, skills, and career goals (2-4 sentences recommended)."
          value={resumeData.summary}
          onChange={(e) => {
            if (e.target.value.length <= 400) {
              updateResumeData({ summary: e.target.value });
              setCharCount(e.target.value.length);
            }
          }}
          rows={4}
          className="resize-none"
          maxLength={400}
        />
      </div>
      
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="p-5">
          <h3 className="font-medium text-blue-800 mb-2">Tips for an Effective Summary</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
            <li>Keep it brief and focused (3-5 sentences)</li>
            <li>Highlight your most relevant qualifications and expertise</li>
            <li>Tailor it to the type of position you're seeking</li>
            <li>Include quantifiable achievements when possible</li>
            <li>Avoid using first-person pronouns (I, me, my)</li>
            <li>Focus on what you can offer rather than what you want</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Example Summaries:</h3>
        
        <div className="space-y-4 text-sm">
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-1">Entry-Level Professional:</h4>
            <p className="text-gray-600">
              Recent Computer Science graduate with strong foundation in software development and programming principles. Proficient in Java, Python, and web development technologies. Completed multiple projects focused on database design and full-stack applications. Seeking to leverage technical and analytical skills in an entry-level software developer role.
            </p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-1">Mid-Level Professional:</h4>
            <p className="text-gray-600">
              Results-driven marketing professional with 5+ years of experience creating digital campaigns that increased customer engagement by 45%. Expertise in SEO, content marketing, and social media strategy. Proven track record of developing marketing initiatives that align with business objectives and drive measurable growth in competitive markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
