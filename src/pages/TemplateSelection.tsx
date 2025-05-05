
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useResumeStore } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import { Search, Eye, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedTemplate, resumeData, selectedTemplate } = useResumeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState("");
  
  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with a touch of color', category: 'professional' },
    { id: 'professional', name: 'Professional', description: 'Traditional layout ideal for corporate applications', category: 'professional' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design with focus on content', category: 'simple' },
    { id: 'creative', name: 'Creative', description: 'Bold and eye-catching design for creative fields', category: 'creative' },
    { id: 'classic', name: 'Classic', description: 'Timeless design with traditional formatting', category: 'professional' },
    { id: 'executive', name: 'Executive', description: 'Sophisticated design for senior-level positions', category: 'professional' },
    { id: 'technical', name: 'Technical', description: 'Specialized layout for technical roles and developers', category: 'technical' },
    { id: 'academic', name: 'Academic', description: 'Formal layout for academic and research positions', category: 'academic' },
    { id: 'compact', name: 'Compact', description: 'Space-efficient design that fits more content on a page', category: 'simple' },
    { id: 'elegant', name: 'Elegant', description: 'Refined design with subtle styling and clean typography', category: 'creative' },
    { id: 'contemporary', name: 'Contemporary', description: 'Modern design with a fresh, current aesthetic', category: 'creative' },
    { id: 'professional-plus', name: 'Professional Plus', description: 'Enhanced professional template with additional visual elements', category: 'professional' }
  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    toast({
      title: "Template Selected",
      description: `You've selected the ${templates.find(t => t.id === templateId)?.name} template.`,
    });
    
    navigate('/preview');
  };

  const renderTemplatePreview = (templateId: string) => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      // For templates that don't have specific components yet, fallback to existing ones
      case 'executive':
      case 'technical':
      case 'contemporary':
      case 'professional-plus':
        return <ProfessionalTemplate resumeData={resumeData} />;
      case 'academic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'compact':
      case 'elegant':
        return <MinimalTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-gray-900">Choose a Resume Template</h1>
            <p className="mt-2 text-gray-600">Select the design that best fits your professional style.</p>
          </div>
          
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search templates by name, style, or category..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`overflow-hidden border transition-all hover:shadow-lg ${
                  selectedTemplate === template.id 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200'
                }`}
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center border-b relative group">
                  <div className={`h-full w-full bg-gradient-to-br ${
                    template.id === 'modern' ? 'from-blue-100 to-blue-50' :
                    template.id === 'professional' ? 'from-gray-100 to-gray-50' :
                    template.id === 'minimal' ? 'from-white to-gray-50' :
                    template.id === 'creative' ? 'from-blue-500 to-blue-400' :
                    template.id === 'executive' ? 'from-slate-200 to-slate-100' :
                    template.id === 'technical' ? 'from-cyan-100 to-cyan-50' :
                    template.id === 'academic' ? 'from-amber-50 to-amber-100' :
                    template.id === 'compact' ? 'from-gray-50 to-white' :
                    template.id === 'elegant' ? 'from-purple-50 to-pink-50' :
                    template.id === 'contemporary' ? 'from-indigo-100 to-blue-100' :
                    template.id === 'professional-plus' ? 'from-blue-200 to-blue-100' :
                    'from-gray-200 to-gray-100'
                  } flex flex-col`}>
                    <div className={`${
                      template.id === 'creative' ? 'h-full flex' :
                      'p-4'
                    }`}>
                      {template.id === 'creative' ? (
                        <>
                          <div className="w-1/3 bg-blue-600 p-3">
                            <div className="h-12 w-12 bg-blue-300 rounded-full mx-auto"></div>
                            <div className="mt-3 h-3 bg-blue-300 w-20 mx-auto rounded"></div>
                            <div className="mt-8">
                              <div className="h-2 bg-blue-300 w-full rounded mb-2"></div>
                              <div className="h-2 bg-blue-300 w-3/4 rounded mb-2"></div>
                              <div className="h-2 bg-blue-300 w-5/6 rounded"></div>
                            </div>
                          </div>
                          <div className="w-2/3 p-3">
                            <div className="h-4 bg-gray-300 w-2/3 rounded mb-4"></div>
                            <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                            <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                            <div className="h-2 bg-gray-300 w-5/6 rounded mb-6"></div>
                            
                            <div className="h-4 bg-gray-300 w-1/2 rounded mb-4"></div>
                            <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                            <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                            <div className="h-2 bg-gray-300 w-3/4 rounded"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-6 bg-gray-300 w-1/3 rounded mb-4"></div>
                          <div className="flex justify-between mb-6">
                            <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
                            <div className="h-3 bg-gray-300 w-1/4 rounded"></div>
                          </div>
                          <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                          <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                          <div className="h-2 bg-gray-300 w-5/6 rounded mb-6"></div>
                          
                          <div className="h-4 bg-gray-300 w-1/4 rounded mb-4"></div>
                          <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                          <div className="h-2 bg-gray-300 w-full rounded mb-2"></div>
                          <div className="h-2 bg-gray-300 w-3/4 rounded"></div>
                        </>
                      )}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        onClick={() => setSelectedPreviewTemplate(template.id)}
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <span className="bg-white rounded-full p-3 shadow-lg">
                          <Eye className="h-5 w-5 text-gray-700" />
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
                      <div className="p-4 bg-white shadow rounded">
                        <h2 className="text-xl font-bold mb-4">{template.name} Template Preview</h2>
                        <div className="border border-gray-200 min-h-[60vh] overflow-y-auto p-4 bg-white">
                          {selectedPreviewTemplate && renderTemplatePreview(selectedPreviewTemplate)}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-montserrat font-semibold">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Selected
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </span>
                  </div>
                  <Button 
                    className="w-full"
                    variant={selectedTemplate === template.id ? "secondary" : "default"}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    {selectedTemplate === template.id ? "Currently Selected" : "Select Template"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No templates found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
          
          <div className="mt-12 flex justify-between">
            <Button variant="outline" onClick={() => navigate('/builder')}>
              Back to Editor
            </Button>
            
            {selectedTemplate && (
              <Button onClick={() => navigate('/preview')}>
                Continue to Preview
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TemplateSelection;
