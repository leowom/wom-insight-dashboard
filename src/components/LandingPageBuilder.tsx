
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Smartphone, Monitor, Save, Upload, Plus, Minus, Move } from 'lucide-react';

const LandingPageBuilder = () => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [formFields, setFormFields] = useState([
    { id: 1, name: 'name', label: 'Nome', type: 'text', required: true },
    { id: 2, name: 'phone', label: 'Telefono', type: 'tel', required: true },
    { id: 3, name: 'email', label: 'Email', type: 'email', required: true },
    { id: 4, name: 'message', label: 'Messaggio', type: 'textarea', required: false }
  ]);
  
  const [services, setServices] = useState([
    'Massaggio Decontratturante',
    'Massaggio Rilassante',
    'Massaggio Sportivo'
  ]);

  const [pageData, setPageData] = useState({
    terapista: '',
    title: '',
    slug: '',
    metaDescription: '',
    headline: '',
    subheading: '',
    description: '',
    ctaText: 'Prenota ora la tua visita',
    thankYouMessage: 'Grazie! Ti contatteremo presto.',
    redirectUrl: '',
    whatsappIntegration: true,
    analyticsCode: ''
  });

  const addFormField = () => {
    const newField = {
      id: Date.now(),
      name: '',
      label: '',
      type: 'text',
      required: false
    };
    setFormFields([...formFields, newField]);
  };

  const removeFormField = (id: number) => {
    setFormFields(formFields.filter(field => field.id !== id));
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Page Builder</h2>
          <p className="text-gray-600">Crea una nuova landing page personalizzata</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Salva Bozza
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Pubblica
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Builder Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="images">Immagini</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informazioni Base</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="terapista">Terapista</Label>
                    <Input
                      id="terapista"
                      placeholder="Seleziona terapista..."
                      value={pageData.terapista}
                      onChange={(e) => setPageData({...pageData, terapista: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Titolo Pagina</Label>
                    <Input
                      id="title"
                      placeholder="Es. Massaggi professionali a Milano"
                      value={pageData.title}
                      onChange={(e) => setPageData({...pageData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL (auto-generato)</Label>
                    <Input
                      id="slug"
                      placeholder="massaggi-milano-marco-rossi"
                      value={pageData.slug}
                      onChange={(e) => setPageData({...pageData, slug: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta">Meta Descrizione</Label>
                    <Textarea
                      id="meta"
                      placeholder="Descrizione per i motori di ricerca..."
                      value={pageData.metaDescription}
                      onChange={(e) => setPageData({...pageData, metaDescription: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contenuto Pagina</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Headline Principale</Label>
                    <Input
                      id="headline"
                      placeholder="Massaggi Professionali che Fanno la Differenza"
                      value={pageData.headline}
                      onChange={(e) => setPageData({...pageData, headline: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subheading">Sottotitolo</Label>
                    <Input
                      id="subheading"
                      placeholder="Rilassati e ritrova il benessere con i nostri trattamenti"
                      value={pageData.subheading}
                      onChange={(e) => setPageData({...pageData, subheading: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descrizione</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrivi i tuoi servizi e la tua esperienza..."
                      rows={4}
                      value={pageData.description}
                      onChange={(e) => setPageData({...pageData, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta">Testo Call-to-Action</Label>
                    <Input
                      id="cta"
                      placeholder="Prenota ora la tua visita"
                      value={pageData.ctaText}
                      onChange={(e) => setPageData({...pageData, ctaText: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Lista Servizi</Label>
                      <Button size="sm" onClick={addService}>
                        <Plus className="h-4 w-4" />
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
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestione Immagini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Foto Terapia 1</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Carica immagine durante il trattamento</p>
                      <Button variant="outline" className="mt-2">
                        Seleziona File
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Foto Terapia 2</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Carica seconda immagine terapia</p>
                      <Button variant="outline" className="mt-2">
                        Seleziona File
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Foto Professionale</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Carica headshot professionale</p>
                      <Button variant="outline" className="mt-2">
                        Seleziona File
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ai-enhance" />
                    <Label htmlFor="ai-enhance">Abilita miglioramento AI</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="form" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Form Builder</CardTitle>
                    <Button onClick={addFormField}>
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi Campo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formFields.map((field) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Move className="h-4 w-4 text-gray-400 cursor-move" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFormField(field.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Nome campo" defaultValue={field.name} />
                        <Input placeholder="Label" defaultValue={field.label} />
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <select className="border rounded px-2 py-1" defaultValue={field.type}>
                          <option value="text">Testo</option>
                          <option value="email">Email</option>
                          <option value="tel">Telefono</option>
                          <option value="textarea">Textarea</option>
                        </select>
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`required-${field.id}`} defaultChecked={field.required} />
                          <Label htmlFor={`required-${field.id}`}>Obbligatorio</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Impostazioni Avanzate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="thank-you">Messaggio di Ringraziamento</Label>
                    <Textarea
                      id="thank-you"
                      placeholder="Grazie per il tuo interesse! Ti contatteremo presto."
                      value={pageData.thankYouMessage}
                      onChange={(e) => setPageData({...pageData, thankYouMessage: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="redirect">URL di Redirect (opzionale)</Label>
                    <Input
                      id="redirect"
                      placeholder="https://example.com/grazie"
                      value={pageData.redirectUrl}
                      onChange={(e) => setPageData({...pageData, redirectUrl: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={pageData.whatsappIntegration}
                      onCheckedChange={(checked) => setPageData({...pageData, whatsappIntegration: checked as boolean})}
                    />
                    <Label htmlFor="whatsapp">Integrazione WhatsApp</Label>
                  </div>
                  <div>
                    <Label htmlFor="analytics">Codice Analytics</Label>
                    <Textarea
                      id="analytics"
                      placeholder="<!-- Google Analytics o altri script -->"
                      value={pageData.analyticsCode}
                      onChange={(e) => setPageData({...pageData, analyticsCode: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Anteprima</CardTitle>
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
              <div className={`border rounded-lg overflow-hidden ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div className="bg-white p-6 space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">
                      {pageData.headline || 'La tua headline qui'}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {pageData.subheading || 'Il tuo sottotitolo qui'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <p className="text-gray-500">Immagine Hero</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700">
                      {pageData.description || 'La tua descrizione apparirà qui...'}
                    </p>
                  </div>
                  
                  {services.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-2">I nostri servizi:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {services.map((service, index) => (
                          <li key={index}>{service || `Servizio ${index + 1}`}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-4">Richiedi Informazioni</h3>
                    <div className="space-y-3">
                      {formFields.map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium mb-1">
                            {field.label || 'Campo'}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea className="w-full border rounded px-3 py-2" rows={3} />
                          ) : (
                            <input type={field.type} className="w-full border rounded px-3 py-2" />
                          )}
                        </div>
                      ))}
                      <Button className="w-full">
                        {pageData.ctaText || 'Prenota ora'}
                      </Button>
                    </div>
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
