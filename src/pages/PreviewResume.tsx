
import React, { useRef } from 'react';
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
import { Download, FileText, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PreviewResume: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resumeData, selectedTemplate } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  
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
      pdf.save(`${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      
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
    }
  };
  
  const handleChooseAnotherTemplate = () => {
    navigate('/templates');
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
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-xl border border-gray-200 mb-8 w-full max-w-5xl mx-auto">
            <div className="w-full" style={{ minHeight: '800px' }} ref={resumeRef}>
              {renderTemplate()}
            </div>
          </div>
          
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
              Try Another Template
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreviewResume;
