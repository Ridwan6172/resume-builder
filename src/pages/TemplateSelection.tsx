
import React, { useState, useEffect } from 'react';
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
import { Search, Eye, Check, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedTemplate, resumeData, selectedTemplate } = useResumeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filter, setFilter] = useState("all");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  const templates = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and contemporary design with a touch of color', 
      category: 'professional',
      featured: true,
      previewImage: '/templates/modern-template.png'
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Traditional layout ideal for corporate applications', 
      category: 'professional',
      featured: true,
      previewImage: '/templates/professional-template.png'
    },
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Simple and elegant design with focus on content', 
      category: 'simple',
      featured: false,
      previewImage: '/templates/minimal-template.png'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Bold and eye-catching design for creative fields', 
      category: 'creative',
      featured: true,
      previewImage: '/templates/creative-template.png'
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Timeless design with traditional formatting', 
      category: 'professional',
      featured: false,
      previewImage: '/templates/classic-template.png'
    },
    { 
      id: 'executive', 
      name: 'Executive', 
      description: 'Sophisticated design for senior-level positions', 
      category: 'professional',
      featured: false,
      previewImage: '/templates/executive-template.png'
    },
    { 
      id: 'technical', 
      name: 'Technical', 
      description: 'Specialized layout for technical roles and developers', 
      category: 'technical',
      featured: true,
      previewImage: '/templates/technical-template.png'
    },
    { 
      id: 'academic', 
      name: 'Academic', 
      description: 'Formal layout for academic and research positions', 
      category: 'academic',
      featured: false,
      previewImage: '/templates/academic-template.png'
    },
    { 
      id: 'compact', 
      name: 'Compact', 
      description: 'Space-efficient design that fits more content on a page', 
      category: 'simple',
      featured: false,
      previewImage: '/templates/compact-template.png'
    },
    { 
      id: 'elegant', 
      name: 'Elegant', 
      description: 'Refined design with subtle styling and clean typography', 
      category: 'creative',
      featured: false,
      previewImage: '/templates/elegant-template.png'
    },
    { 
      id: 'contemporary', 
      name: 'Contemporary', 
      description: 'Modern design with a fresh, current aesthetic', 
      category: 'creative',
      featured: true,
      previewImage: '/templates/contemporary-template.png'
    },
    { 
      id: 'professional-plus', 
      name: 'Professional Plus', 
      description: 'Enhanced professional template with additional visual elements', 
      category: 'professional',
      featured: false,
      previewImage: '/templates/professional-plus-template.png'
    }
  ];

  // Pre-load template images
  useEffect(() => {
    templates.forEach(template => {
      const img = new Image();
      img.src = template.previewImage;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [template.id]: true
        }));
      };
      img.onerror = () => {
        setLoadedImages(prev => ({
          ...prev,
          [template.id]: false
        }));
      };
    });
  }, []);

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

  // Filter templates based on search, category filter, and sort order
  const getFilteredAndSortedTemplates = () => {
    let result = templates;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(template => template.category === filter);
    }
    
    // Apply sorting
    if (sortBy === 'featured') {
      result = [...result].sort((a, b) => {
        if (a.featured === b.featured) return a.name.localeCompare(b.name);
        return a.featured ? -1 : 1;
      });
    } else if (sortBy === 'aToZ') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'zToA') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return result;
  };

  const filteredTemplates = getFilteredAndSortedTemplates();
  
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-purple-100 text-purple-800';
      case 'simple': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-cyan-100 text-cyan-800';
      case 'academic': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          
          <Tabs defaultValue="grid" className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <TabsList className="mb-0">
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                  List View
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-grow sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search templates..."
                    className="pl-10 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="flex items-center" aria-label="Filter templates">
                      <Filter size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                      <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="professional">Professional</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="creative">Creative</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="simple">Simple</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="technical">Technical</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="academic">Academic</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="flex items-center" aria-label="Sort templates">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sort-asc"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/></svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                      <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="aToZ">Name: A-Z</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="zToA">Name: Z-A</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="grid" className="mt-0">
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
                      {/* Image preview with fallback */}
                      <div className="h-full w-full overflow-hidden">
                        <img 
                          src={template.previewImage} 
                          alt={`${template.name} template preview`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.classList.add('bg-gradient-to-br');
                            e.currentTarget.parentElement!.classList.add(
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
                            );
                          }}
                        />
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
                        <div className="flex items-center">
                          <h3 className="text-xl font-montserrat font-semibold">{template.name}</h3>
                          {template.featured && (
                            <Badge variant="outline" className="ml-2 flex items-center gap-1 border-amber-300 bg-amber-50 text-amber-700">
                              <Star className="h-3 w-3" /> Featured
                            </Badge>
                          )}
                        </div>
                        {selectedTemplate === template.id && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <Check className="h-3 w-3 mr-1" /> Selected
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="mb-4">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${getCategoryColorClass(template.category)}`}>
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
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`overflow-hidden border transition-all hover:shadow-md ${
                      selectedTemplate === template.id 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="h-40 sm:h-auto sm:w-48 md:w-64 bg-gray-100 flex items-center justify-center relative">
                        <img 
                          src={template.previewImage} 
                          alt={`${template.name} template preview`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.classList.add('bg-gradient-to-br');
                            e.currentTarget.parentElement!.classList.add(
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
                            );
                          }}
                        />
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <h3 className="text-lg font-montserrat font-semibold">{template.name}</h3>
                              {template.featured && (
                                <Badge variant="outline" className="ml-2 flex items-center gap-1 border-amber-300 bg-amber-50 text-amber-700">
                                  <Star className="h-3 w-3" /> Featured
                                </Badge>
                              )}
                            </div>
                            {selectedTemplate === template.id && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <Check className="h-3 w-3 mr-1" /> Selected
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{template.description}</p>
                          <span className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${getCategoryColorClass(template.category)}`}>
                            {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedPreviewTemplate(template.id)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" /> Preview
                              </Button>
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
                          <Button 
                            variant={selectedTemplate === template.id ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleSelectTemplate(template.id)}
                          >
                            {selectedTemplate === template.id ? "Currently Selected" : "Select Template"}
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No templates found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
              >
                Clear Filters
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
