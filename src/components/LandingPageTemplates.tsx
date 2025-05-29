
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit } from 'lucide-react';

const LandingPageTemplates = () => {
  const [activeSpecialization, setActiveSpecialization] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Fisioterapia Moderna',
      specialization: 'Fisioterapia',
      preview: '/placeholder.svg',
      description: 'Template moderno per fisioterapisti con focus sui risultati',
      features: ['Responsive', 'Form integrato', 'Sezione testimonianze']
    },
    {
      id: 2,
      name: 'Osteopatia Professionale',
      specialization: 'Osteopatia',
      preview: '/placeholder.svg',
      description: 'Design elegante per osteopati con sezioni dedicate ai trattamenti',
      features: ['Gallery trattamenti', 'Booking integrato', 'Certificazioni']
    },
    {
      id: 3,
      name: 'Massoterapia Wellness',
      specialization: 'Massoterapia',
      preview: '/placeholder.svg',
      description: 'Template rilassante per massoterapisti con atmosfera spa',
      features: ['Video background', 'Listino prezzi', 'Mappa studio']
    },
    {
      id: 4,
      name: 'Riabilitazione Sport',
      specialization: 'Fisioterapia',
      preview: '/placeholder.svg',
      description: 'Dedicato alla riabilitazione sportiva con case studies',
      features: ['Atleti testimonial', 'Prima/dopo', 'Blog integrato']
    },
    {
      id: 5,
      name: 'Chiropratica Premium',
      specialization: 'Chiropratica',
      preview: '/placeholder.svg',
      description: 'Template premium per chiropratici con sezioni tecniche',
      features: ['3D spine viewer', 'Diagnosi online', 'Teleconsulto']
    },
    {
      id: 6,
      name: 'Terapia Minimale',
      specialization: 'Generale',
      preview: '/placeholder.svg',
      description: 'Design minimale adatto a qualsiasi specializzazione',
      features: ['Clean design', 'Fast loading', 'SEO optimized']
    }
  ];

  const specializations = [
    { id: 'all', name: 'Tutti', count: templates.length },
    { id: 'Fisioterapia', name: 'Fisioterapia', count: templates.filter(t => t.specialization === 'Fisioterapia').length },
    { id: 'Osteopatia', name: 'Osteopatia', count: templates.filter(t => t.specialization === 'Osteopatia').length },
    { id: 'Massoterapia', name: 'Massoterapia', count: templates.filter(t => t.specialization === 'Massoterapia').length },
    { id: 'Chiropratica', name: 'Chiropratica', count: templates.filter(t => t.specialization === 'Chiropratica').length },
    { id: 'Generale', name: 'Generale', count: templates.filter(t => t.specialization === 'Generale').length }
  ];

  const filteredTemplates = activeSpecialization === 'all' 
    ? templates 
    : templates.filter(template => template.specialization === activeSpecialization);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gallery Template</h2>
        <p className="text-gray-600">Scegli un template pre-costruito per iniziare velocemente</p>
      </div>

      {/* Specialization Tabs */}
      <Tabs value={activeSpecialization} onValueChange={setActiveSpecialization}>
        <TabsList className="grid w-full grid-cols-6">
          {specializations.map((spec) => (
            <TabsTrigger key={spec.id} value={spec.id}>
              {spec.name} ({spec.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeSpecialization} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4 mr-1" />
                        Anteprima
                      </Button>
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Usa Template
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.specialization}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Caratteristiche:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPageTemplates;
