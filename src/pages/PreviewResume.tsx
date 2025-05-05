
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useResumeStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import { Download, FileText, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PreviewResume: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'professional', name: 'Professional' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'creative', name: 'Creative' },
    { id: 'classic', name: 'Classic' },
    { id: 'executive', name: 'Executive' },
    { id: 'technical', name: 'Technical' },
    { id: 'academic', name: 'Academic' },
    { id: 'compact', name: 'Compact' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'contemporary', name: 'Contemporary' },
    { id: 'professional-plus', name: 'Professional Plus' }
  ];
  
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate resumeData={resumeData} />;
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
  
  const handlePrint = () => {
    window.print();
    toast({
      title: 'Print Dialog Opened',
      description: 'Your resume is ready to print!',
    });
  };
  
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGeneratingPDF(true);
    toast({
      title: 'Preparing PDF',
      description: 'Your resume is being generated, please wait...',
    });
    
    try {
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Convert canvas dimensions to PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasRatio = canvas.height / canvas.width;
      const pdfRatio = pdfHeight / pdfWidth;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth * canvasRatio;
      
      if (canvasRatio > pdfRatio) {
        finalWidth = pdfHeight / canvasRatio;
        finalHeight = pdfHeight;
      }
      
      // Calculate margins to center the content
      const marginX = (pdfWidth - finalWidth) / 2;
      const marginY = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', marginX, marginY, finalWidth, finalHeight);
      
      const fileName = resumeData.fullName
        ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      
      pdf.save(fileName);
      
      toast({
        title: 'PDF Downloaded',
        description: 'Your resume has been successfully downloaded!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
      console.error('PDF generation error:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  const handleChooseAnotherTemplate = () => {
    navigate('/templates');
  };
  
  const handleChangeTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    toast({
      title: 'Template Changed',
      description: `Now viewing the ${templates.find(t => t.id === templateId)?.name} template.`,
    });
  };

  const currentTemplateIndex = templates.findIndex(t => t.id === selectedTemplate);
  
  const handleNextTemplate = () => {
    const nextIndex = (currentTemplateIndex + 1) % templates.length;
    handleChangeTemplate(templates[nextIndex].id);
  };
  
  const handlePrevTemplate = () => {
    const prevIndex = (currentTemplateIndex - 1 + templates.length) % templates.length;
    handleChangeTemplate(templates[prevIndex].id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-3xl font-montserrat font-bold text-gray-900">Resume Preview</h1>
                <p className="mt-2 text-gray-600">Previewing with {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} template</p>
              </div>
              
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <Card className="bg-white p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handlePrevTemplate}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                
                <div className="text-center">
                  <span className="text-sm font-medium">
                    Template: <span className="text-blue-600 font-semibold">{templates[currentTemplateIndex]?.name || 'Default'}</span>
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {currentTemplateIndex + 1} of {templates.length}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNextTemplate}
                  className="flex items-center gap-1"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
          
          <Tabs defaultValue="preview" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="preview">Resume Preview</TabsTrigger>
              <TabsTrigger value="templates">Quick Template Switch</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="bg-white shadow-xl border border-gray-200 mb-8 w-full max-w-5xl mx-auto">
                <div className="w-full" style={{ minHeight: '800px' }} ref={resumeRef}>
                  {renderTemplate()}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="templates">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleChangeTemplate(template.id)}
                    className={`p-3 text-center rounded border transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className={`h-20 w-full mb-2 rounded flex items-center justify-center bg-gradient-to-br ${
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
                    }`}>
                    </div>
                    <div className="text-xs font-medium">{template.name}</div>
                    {selectedTemplate === template.id && (
                      <div className="text-xs text-blue-600 mt-1">Current</div>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mb-12">
            <Button 
              variant="outline" 
              onClick={() => navigate('/builder')}
            >
              Edit Content
            </Button>
            <Button 
              variant="secondary"
              onClick={handleChooseAnotherTemplate}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              View All Templates
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreviewResume;
