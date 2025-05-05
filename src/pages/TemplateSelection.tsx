
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useResumeStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate, resumeData } = useResumeStore();
  
  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with a touch of color' },
    { id: 'professional', name: 'Professional', description: 'Traditional layout ideal for corporate applications' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design with focus on content' },
    { id: 'creative', name: 'Creative', description: 'Bold and eye-catching design for creative fields' },
    { id: 'classic', name: 'Classic', description: 'Timeless design with traditional formatting' },
    // Add more templates as needed
  ];
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    navigate('/preview');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-gray-900">Choose a Resume Template</h1>
            <p className="mt-2 text-gray-600">Select the design that best fits your professional style.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
                <div className="h-64 bg-gray-100 flex items-center justify-center border-b">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className={`h-full w-full bg-gradient-to-br ${
                      template.id === 'modern' ? 'from-blue-100 to-blue-50' :
                      template.id === 'professional' ? 'from-gray-100 to-gray-50' :
                      template.id === 'minimal' ? 'from-white to-gray-50' :
                      template.id === 'creative' ? 'from-blue-500 to-blue-400' :
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
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <Button 
                    className="w-full"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    Select Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 flex justify-between">
            <Button variant="outline" onClick={() => navigate('/builder')}>
              Back to Editor
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TemplateSelection;
