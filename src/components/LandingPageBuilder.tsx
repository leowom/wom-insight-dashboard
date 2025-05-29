
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Eye, 
  Smartphone, 
  Monitor, 
  Save, 
  Upload, 
  Plus, 
  Minus, 
  Move, 
  Sparkles,
  Search,
  Settings,
  Palette,
  Image,
  FileText,
  BarChart3,
  Globe,
  Zap,
  TestTube
} from 'lucide-react';

interface FormField {
  id: number;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface PageSection {
  id: string;
  type: 'hero' | 'services' | 'about' | 'testimonials' | 'contact' | 'gallery';
  visible: boolean;
  order: number;
}

const LandingPageBuilder = () => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: 1, name: 'name', label: 'Nome Completo', type: 'text', required: true, placeholder: 'Il tuo nome e cognome' },
    { id: 2, name: 'phone', label: 'Numero di Telefono', type: 'tel', required: true, placeholder: '+39 xxx xxx xxxx' },
    { id: 3, name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'la.tua@email.it' },
    { id: 4, name: 'problem', label: 'Descrivi il Problema', type: 'textarea', required: false, placeholder: 'Racconta brevemente il tuo problema...' }
  ]);

  const [services, setServices] = useState([
    'Trattamento Osteopatico Completo',
    'Terapia Manuale Specifica', 
    'Riabilitazione Posturale',
    'Consulenza Personalizzata'
  ]);

  const [pageSections, setPageSections] = useState<PageSection[]>([
    { id: 'hero', type: 'hero', visible: true, order: 1 },
    { id: 'services', type: 'services', visible: true, order: 2 },
    { id: 'about', type: 'about', visible: true, order: 3 },
    { id: 'testimonials', type: 'testimonials', visible: true, order: 4 },
    { id: 'contact', type: 'contact', visible: true, order: 5 }
  ]);

  const [pageData, setPageData] = useState({
    // Template Selection
    selectedTemplate: '',
    
    // Basic Info
    terapistaName: '',
    specialization: 'Osteopata',
    city: '',
    title: '',
    slug: '',
    metaDescription: '',
    
    // Content
    headline: '',
    subheading: '',
    description: '',
    ctaText: 'Prenota la Tua Consulenza Gratuita',
    ctaSubtext: 'Risposta entro 24 ore - Nessun impegno',
    
    // Images
    heroImage: '',
    therapyImage1: '',
    therapyImage2: '',
    professionalPhoto: '',
    
    // Advanced Settings
    thankYouMessage: 'Grazie per il tuo interesse! Ti contatteremo entro 24 ore per fissare la tua consulenza gratuita.',
    redirectUrl: '',
    whatsappNumber: '',
    whatsappMessage: 'Ciao! Vorrei prenotare una consulenza',
    
    // SEO
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    
    // Analytics
    googleAnalyticsId: '',
    facebookPixelId: '',
    
    // A/B Testing
    enableAbTesting: false,
    abTestVariant: 'A',
    
    // Performance
    enableLazyLoading: true,
    optimizeImages: true,
    enableCaching: true
  });

  const steps = [
    { id: 1, name: 'Template', icon: <Palette className="h-5 w-5" />, description: 'Choose template' },
    { id: 2, name: 'Content', icon: <FileText className="h-5 w-5" />, description: 'Edit content' },
    { id: 3, name: 'Images', icon: <Image className="h-5 w-5" />, description: 'Upload images' },
    { id: 4, name: 'Form', icon: <Settings className="h-5 w-5" />, description: 'Configure form' },
    { id: 5, name: 'SEO', icon: <Globe className="h-5 w-5" />, description: 'SEO settings' },
    { id: 6, name: 'Advanced', icon: <Zap className="h-5 w-5" />, description: 'Advanced options' }
  ];

  const templates = [
    { id: 'professional-osteopath', name: 'Professional Osteopath', specialization: 'Osteopata' },
    { id: 'holistic-wellness', name: 'Holistic Wellness', specialization: 'Osteopata' },
    { id: 'sports-recovery', name: 'Sports Recovery', specialization: 'Fisioterapista' },
    { id: 'rehabilitation-center', name: 'Rehabilitation Center', specialization: 'Fisioterapista' },
    { id: 'spine-specialist', name: 'Spine Specialist', specialization: 'Chiropratico' },
    { id: 'family-chiropractic', name: 'Family Chiropractic', specialization: 'Chiropratico' },
    { id: 'relaxation-spa', name: 'Relaxation Spa', specialization: 'Massoterapista' },
    { id: 'sports-massage', name: 'Sports Massage', specialization: 'Massoterapista' }
  ];

  const addFormField = () => {
    const newField: FormField = {
      id: Date.now(),
      name: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: ''
    };
    setFormFields([...formFields, newField]);
  };

  const removeFormField = (id: number) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const updateFormField = (id: number, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const addService = () => {
    setServices([...services, '']);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
  };

  const handleSave = () => {
    console.log('Saving page...', pageData);
    // Save logic here
  };

  const handlePublish = () => {
    console.log('Publishing page...', pageData);
    // Publish logic here
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Landing Page Builder</h2>
          <p className="text-gray-600">Create high-converting landing pages with our advanced builder</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
            <Eye className="h-4 w-4 mr-2" />
            Publish Live
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center gap-3 cursor-pointer transition-all ${
                    activeStep === step.id 
                      ? 'text-blue-600' 
                      : activeStep > step.id 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className={`p-2 rounded-full ${
                    activeStep === step.id 
                      ? 'bg-blue-100 text-blue-600' 
                      : activeStep > step.id 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="hidden sm:block">
                    <p className="font-medium">{step.name}</p>
                    <p className="text-xs">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-12 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Builder Panel */}
        <div className="space-y-6">
          {/* Step 1: Template Selection */}
          {activeStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Choose Your Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <select 
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={pageData.specialization}
                    onChange={(e) => setPageData({...pageData, specialization: e.target.value})}
                  >
                    <option value="Osteopata">Osteopata</option>
                    <option value="Fisioterapista">Fisioterapista</option>
                    <option value="Chiropratico">Chiropratico</option>
                    <option value="Massoterapista">Massoterapista</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {templates
                    .filter(t => t.specialization === pageData.specialization)
                    .map((template) => (
                    <div 
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-gray-500">{template.specialization}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            className={selectedTemplate === template.id ? 'bg-blue-600' : ''}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Content Editor */}
          {activeStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Page Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="terapista-name">Nome Terapista</Label>
                    <Input
                      id="terapista-name"
                      placeholder="Dr. Mario Rossi"
                      value={pageData.terapistaName}
                      onChange={(e) => setPageData({...pageData, terapistaName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Città</Label>
                    <Input
                      id="city"
                      placeholder="Milano"
                      value={pageData.city}
                      onChange={(e) => setPageData({...pageData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Titolo Pagina</Label>
                  <Input
                    id="title"
                    placeholder="Osteopata a Milano - Dr. Mario Rossi"
                    value={pageData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setPageData({
                        ...pageData, 
                        title,
                        slug: generateSlug(title)
                      });
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL (auto-generato)</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      womconsulting.com/
                    </span>
                    <Input
                      id="slug"
                      value={pageData.slug}
                      onChange={(e) => setPageData({...pageData, slug: e.target.value})}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="headline">Headline Principale</Label>
                  <Input
                    id="headline"
                    placeholder="Risolvi i Tuoi Dolori con l'Osteopatia Professionale"
                    value={pageData.headline}
                    onChange={(e) => setPageData({...pageData, headline: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="subheading">Sottotitolo</Label>
                  <Input
                    id="subheading"
                    placeholder="Trattamenti personalizzati per il tuo benessere a Milano"
                    value={pageData.subheading}
                    onChange={(e) => setPageData({...pageData, subheading: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrivi la tua esperienza, approccio e cosa rende unici i tuoi trattamenti..."
                    rows={4}
                    value={pageData.description}
                    onChange={(e) => setPageData({...pageData, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cta">Testo Call-to-Action</Label>
                    <Input
                      id="cta"
                      placeholder="Prenota la Tua Consulenza Gratuita"
                      value={pageData.ctaText}
                      onChange={(e) => setPageData({...pageData, ctaText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta-subtext">Sottotesto CTA</Label>
                    <Input
                      id="cta-subtext"
                      placeholder="Risposta entro 24 ore"
                      value={pageData.ctaSubtext}
                      onChange={(e) => setPageData({...pageData, ctaSubtext: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Services List */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Lista Servizi</Label>
                    <Button size="sm" onClick={addService}>
                      <Plus className="h-4 w-4 mr-1" />
                      Aggiungi
                    </Button>
                  </div>
                  {services.map((service, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={service}
                        onChange={(e) => updateService(index, e.target.value)}
                        placeholder="Nome servizio"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeService(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Image Management */}
          {activeStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Image Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero Image */}
                <div>
                  <Label>Immagine Hero (principale)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Carica immagine hero della pagina</p>
                    <p className="text-sm text-gray-500 mb-4">Formato consigliato: 1920x1080px</p>
                    <Button variant="outline">
                      Seleziona File
                    </Button>
                  </div>
                </div>

                {/* Therapy Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Foto Terapia 1</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Durante il trattamento</p>
                      <Button variant="outline" size="sm">
                        Carica
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Foto Terapia 2</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Ambiente studio</p>
                      <Button variant="outline" size="sm">
                        Carica
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Professional Photo */}
                <div>
                  <Label>Foto Professionale</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center max-w-sm mx-auto">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Headshot professionale</p>
                    <p className="text-xs text-gray-500 mb-4">Formato quadrato preferibile</p>
                    <Button variant="outline" size="sm">
                      Seleziona File
                    </Button>
                  </div>
                </div>

                {/* AI Enhancement */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">AI Image Enhancement</h3>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox id="ai-enhance" />
                    <Label htmlFor="ai-enhance">Abilita miglioramento automatico delle immagini</Label>
                  </div>
                  <p className="text-sm text-gray-600">Le immagini verranno automaticamente ottimizzate per qualità, luminosità e contrasto.</p>
                </div>

                {/* Stock Photos */}
                <div>
                  <Label>Foto Stock Suggerite</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg relative cursor-pointer hover:bg-gray-200 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-sm text-gray-500">Stock {i}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Search className="h-4 w-4 mr-2" />
                    Cerca Altre Foto
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Form Builder */}
          {activeStep === 4 && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Form Configuration
                  </CardTitle>
                  <Button onClick={addFormField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Move className="h-4 w-4 text-gray-400 cursor-move" />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFormField(field.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Label</Label>
                        <Input 
                          placeholder="Field label" 
                          value={field.label}
                          onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Name</Label>
                        <Input 
                          placeholder="field_name" 
                          value={field.name}
                          onChange={(e) => updateFormField(field.id, { name: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Placeholder</Label>
                      <Input 
                        placeholder="Placeholder text" 
                        value={field.placeholder || ''}
                        onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Type</Label>
                        <select 
                          className="border rounded px-2 py-1 ml-2" 
                          value={field.type}
                          onChange={(e) => updateFormField(field.id, { type: e.target.value as FormField['type'] })}
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                          <option value="textarea">Textarea</option>
                          <option value="select">Select</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`required-${field.id}`} 
                          checked={field.required}
                          onCheckedChange={(checked) => updateFormField(field.id, { required: checked as boolean })}
                        />
                        <Label htmlFor={`required-${field.id}`}>Required</Label>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Form Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="thank-you">Thank You Message</Label>
                      <Textarea
                        id="thank-you"
                        placeholder="Grazie per il tuo interesse! Ti contatteremo presto."
                        value={pageData.thankYouMessage}
                        onChange={(e) => setPageData({...pageData, thankYouMessage: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="redirect">Redirect URL (optional)</Label>
                      <Input
                        id="redirect"
                        placeholder="https://example.com/thank-you"
                        value={pageData.redirectUrl}
                        onChange={(e) => setPageData({...pageData, redirectUrl: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: SEO Settings */}
          {activeStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  SEO Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input
                    id="seo-title"
                    placeholder="Osteopata Milano | Dr. Mario Rossi | Trattamenti Professionali"
                    value={pageData.seoTitle}
                    onChange={(e) => setPageData({...pageData, seoTitle: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">{pageData.seoTitle.length}/60 characters</p>
                </div>

                <div>
                  <Label htmlFor="seo-description">Meta Description</Label>
                  <Textarea
                    id="seo-description"
                    placeholder="Osteopata professionista a Milano. Trattamenti personalizzati per dolori muscolari e articolari. Prenota la tua consulenza gratuita."
                    value={pageData.seoDescription}
                    onChange={(e) => setPageData({...pageData, seoDescription: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">{pageData.seoDescription.length}/160 characters</p>
                </div>

                <div>
                  <Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
                  <Input
                    id="seo-keywords"
                    placeholder="osteopata milano, dolori articolari, terapia manuale"
                    value={pageData.seoKeywords}
                    onChange={(e) => setPageData({...pageData, seoKeywords: e.target.value})}
                  />
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">SEO Score: 85/100</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Title length optimal</li>
                    <li>✓ Meta description present</li>
                    <li>✓ Keywords included</li>
                    <li>⚠ Add more internal links</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 6: Advanced Settings */}
          {activeStep === 6 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* WhatsApp Integration */}
                <div className="space-y-3">
                  <h3 className="font-medium">WhatsApp Integration</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                      <Input
                        id="whatsapp-number"
                        placeholder="+39 123 456 7890"
                        value={pageData.whatsappNumber}
                        onChange={(e) => setPageData({...pageData, whatsappNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp-message">Default Message</Label>
                      <Input
                        id="whatsapp-message"
                        placeholder="Ciao! Vorrei prenotare una consulenza"
                        value={pageData.whatsappMessage}
                        onChange={(e) => setPageData({...pageData, whatsappMessage: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="space-y-3">
                  <h3 className="font-medium">Analytics & Tracking</h3>
                  <div>
                    <Label htmlFor="ga-id">Google Analytics ID</Label>
                    <Input
                      id="ga-id"
                      placeholder="G-XXXXXXXXXX"
                      value={pageData.googleAnalyticsId}
                      onChange={(e) => setPageData({...pageData, googleAnalyticsId: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                    <Input
                      id="fb-pixel"
                      placeholder="123456789012345"
                      value={pageData.facebookPixelId}
                      onChange={(e) => setPageData({...pageData, facebookPixelId: e.target.value})}
                    />
                  </div>
                </div>

                {/* A/B Testing */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <TestTube className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">A/B Testing</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ab-testing" 
                      checked={pageData.enableAbTesting}
                      onCheckedChange={(checked) => setPageData({...pageData, enableAbTesting: checked as boolean})}
                    />
                    <Label htmlFor="ab-testing">Enable A/B Testing</Label>
                  </div>
                  {pageData.enableAbTesting && (
                    <div>
                      <Label>Test Variant</Label>
                      <select 
                        className="w-full border rounded px-3 py-2 mt-1"
                        value={pageData.abTestVariant}
                        onChange={(e) => setPageData({...pageData, abTestVariant: e.target.value})}
                      >
                        <option value="A">Variant A (Original)</option>
                        <option value="B">Variant B (Alternative)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Performance */}
                <div className="space-y-3">
                  <h3 className="font-medium">Performance Optimization</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="lazy-loading" 
                        checked={pageData.enableLazyLoading}
                        onCheckedChange={(checked) => setPageData({...pageData, enableLazyLoading: checked as boolean})}
                      />
                      <Label htmlFor="lazy-loading">Enable lazy loading for images</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="optimize-images" 
                        checked={pageData.optimizeImages}
                        onCheckedChange={(checked) => setPageData({...pageData, optimizeImages: checked as boolean})}
                      />
                      <Label htmlFor="optimize-images">Automatic image optimization</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="enable-caching" 
                        checked={pageData.enableCaching}
                        onCheckedChange={(checked) => setPageData({...pageData, enableCaching: checked as boolean})}
                      />
                      <Label htmlFor="enable-caching">Enable browser caching</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
            >
              Previous
            </Button>
            <Button 
              onClick={() => setActiveStep(Math.min(6, activeStep + 1))}
              disabled={activeStep === 6}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Live Preview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-lg overflow-hidden transition-all ${
                previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
              }`}>
                <div className="bg-white">
                  {/* Preview content will be rendered here based on current settings */}
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold mb-2">
                        {pageData.headline || 'Your Headline Here'}
                      </h1>
                      <p className="text-lg opacity-90">
                        {pageData.subheading || 'Your subheading here'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-3">
                        {pageData.terapistaName || 'Dr. Your Name'}
                      </h2>
                      <p className="text-gray-700">
                        {pageData.description || 'Your description will appear here...'}
                      </p>
                    </div>
                    
                    {services.length > 0 && (
                      <div>
                        <h3 className="font-bold mb-3">I nostri servizi:</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {services.map((service, index) => (
                            <li key={index} className="text-gray-700">
                              {service || `Service ${index + 1}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="font-bold mb-4">Contact Form</h3>
                      <div className="space-y-3">
                        {formFields.map((field) => (
                          <div key={field.id}>
                            <label className="block text-sm font-medium mb-1">
                              {field.label || 'Field Label'}
                              {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea 
                                className="w-full border rounded px-3 py-2 text-sm" 
                                rows={3}
                                placeholder={field.placeholder}
                                disabled
                              />
                            ) : (
                              <input 
                                type={field.type} 
                                className="w-full border rounded px-3 py-2 text-sm"
                                placeholder={field.placeholder}
                                disabled
                              />
                            )}
                          </div>
                        ))}
                        <Button className="w-full mt-4">
                          {pageData.ctaText || 'Submit'}
                        </Button>
                        {pageData.ctaSubtext && (
                          <p className="text-xs text-gray-500 text-center mt-2">
                            {pageData.ctaSubtext}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Performance Score</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-medium text-green-700">98/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SEO:</span>
                    <span className="font-medium text-green-700">85/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile:</span>
                    <span className="font-medium text-green-700">96/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accessibility:</span>
                    <span className="font-medium text-green-700">92/100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPageBuilder;
