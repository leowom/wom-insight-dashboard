
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit, Star, Zap, Heart, Activity, Leaf, Users, Trophy, Sparkles } from 'lucide-react';

const LandingPageTemplates = () => {
  const [activeSpecialization, setActiveSpecialization] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    // OSTEOPATA TEMPLATES (2)
    {
      id: 1,
      name: 'Professional Osteopath',
      specialization: 'Osteopata',
      preview: '/placeholder.svg?height=400&width=600&text=Professional+Osteopath',
      description: 'Clean, medical aesthetic perfect for professional osteopaths',
      features: ['Medical color scheme', 'Professional layout', 'Trust indicators', 'Certification showcase'],
      conversionRate: 4.2,
      usageCount: 23,
      icon: <Activity className="h-6 w-6" />,
      colors: ['Medical Blue', 'Clean White', 'Professional Gray'],
      demoUrl: '#'
    },
    {
      id: 2,
      name: 'Holistic Wellness',
      specialization: 'Osteopata',
      preview: '/placeholder.svg?height=400&width=600&text=Holistic+Wellness',
      description: 'Warm, natural colors for holistic wellness approach',
      features: ['Natural color palette', 'Wellness imagery', 'Holistic approach', 'Testimonial focus'],
      conversionRate: 3.8,
      usageCount: 18,
      icon: <Leaf className="h-6 w-6" />,
      colors: ['Nature Green', 'Warm Earth', 'Soft Beige'],
      demoUrl: '#'
    },

    // FISIOTERAPISTA TEMPLATES (2)
    {
      id: 3,
      name: 'Sports Recovery',
      specialization: 'Fisioterapista',
      preview: '/placeholder.svg?height=400&width=600&text=Sports+Recovery',
      description: 'Dynamic, athletic theme for sports rehabilitation',
      features: ['Athletic design', 'Performance focus', 'Before/after showcase', 'Sports testimonials'],
      conversionRate: 4.5,
      usageCount: 31,
      icon: <Trophy className="h-6 w-6" />,
      colors: ['Energy Orange', 'Athletic Blue', 'Performance Red'],
      demoUrl: '#'
    },
    {
      id: 4,
      name: 'Rehabilitation Center',
      specialization: 'Fisioterapista',
      preview: '/placeholder.svg?height=400&width=600&text=Rehabilitation+Center',
      description: 'Clinical, trustworthy design for rehabilitation centers',
      features: ['Clinical layout', 'Trust building', 'Medical credentials', 'Treatment plans'],
      conversionRate: 4.1,
      usageCount: 27,
      icon: <Heart className="h-6 w-6" />,
      colors: ['Medical Teal', 'Trust Blue', 'Clean White'],
      demoUrl: '#'
    },

    // CHIROPRATICO TEMPLATES (2)
    {
      id: 5,
      name: 'Spine Specialist',
      specialization: 'Chiropratico',
      preview: '/placeholder.svg?height=400&width=600&text=Spine+Specialist',
      description: 'Focused, scientific approach for spine specialists',
      features: ['Scientific design', 'Spine visualization', 'Technical expertise', 'Research focus'],
      conversionRate: 4.0,
      usageCount: 19,
      icon: <Zap className="h-6 w-6" />,
      colors: ['Scientific Blue', 'Precision Gray', 'Technical Green'],
      demoUrl: '#'
    },
    {
      id: 6,
      name: 'Family Chiropractic',
      specialization: 'Chiropratico',
      preview: '/placeholder.svg?height=400&width=600&text=Family+Chiropractic',
      description: 'Friendly, welcoming design for family practices',
      features: ['Family-friendly', 'Welcoming atmosphere', 'All ages appeal', 'Community focus'],
      conversionRate: 3.9,
      usageCount: 22,
      icon: <Users className="h-6 w-6" />,
      colors: ['Warm Orange', 'Family Blue', 'Comfort Green'],
      demoUrl: '#'
    },

    // MASSOTERAPISTA TEMPLATES (2)
    {
      id: 7,
      name: 'Relaxation Spa',
      specialization: 'Massoterapista',
      preview: '/placeholder.svg?height=400&width=600&text=Relaxation+Spa',
      description: 'Calm, soothing aesthetics for relaxation massage',
      features: ['Spa atmosphere', 'Relaxation focus', 'Luxury feel', 'Wellness imagery'],
      conversionRate: 4.3,
      usageCount: 29,
      icon: <Sparkles className="h-6 w-6" />,
      colors: ['Spa Purple', 'Zen Blue', 'Calm Lavender'],
      demoUrl: '#'
    },
    {
      id: 8,
      name: 'Sports Massage',
      specialization: 'Massoterapista',
      preview: '/placeholder.svg?height=400&width=600&text=Sports+Massage',
      description: 'Energy, performance-focused for sports massage',
      features: ['Athletic performance', 'Recovery focus', 'Sports imagery', 'Performance metrics'],
      conversionRate: 4.4,
      usageCount: 25,
      icon: <Activity className="h-6 w-6" />,
      colors: ['Power Red', 'Athletic Black', 'Energy Yellow'],
      demoUrl: '#'
    }
  ];

  const specializations = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'Osteopata', name: 'Osteopata', count: templates.filter(t => t.specialization === 'Osteopata').length },
    { id: 'Fisioterapista', name: 'Fisioterapista', count: templates.filter(t => t.specialization === 'Fisioterapista').length },
    { id: 'Chiropratico', name: 'Chiropratico', count: templates.filter(t => t.specialization === 'Chiropratico').length },
    { id: 'Massoterapista', name: 'Massoterapista', count: templates.filter(t => t.specialization === 'Massoterapista').length }
  ];

  const filteredTemplates = activeSpecialization === 'all' 
    ? templates 
    : templates.filter(template => template.specialization === activeSpecialization);

  const handleTemplatePreview = (template: any) => {
    setSelectedTemplate(template.id);
    // Open preview modal or navigate to demo
    window.open(template.demoUrl, '_blank');
  };

  const handleUseTemplate = (template: any) => {
    console.log('Using template:', template.name);
    // Navigate to builder with template pre-selected
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Template Gallery</h2>
          <p className="text-gray-600">Choose from 8 specialized templates designed for Italian terapisti</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Most Popular
          </Button>
          <Button variant="outline">
            <Trophy className="h-4 w-4 mr-2" />
            Best Converting
          </Button>
        </div>
      </div>

      {/* Specialization Tabs */}
      <Tabs value={activeSpecialization} onValueChange={setActiveSpecialization}>
        <TabsList className="grid w-full grid-cols-5">
          {specializations.map((spec) => (
            <TabsTrigger key={spec.id} value={spec.id} className="text-sm">
              {spec.name} ({spec.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeSpecialization} className="mt-6">
          {/* Template Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-700">4.2%</p>
                    <p className="text-sm text-blue-600">Avg Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-700">174</p>
                    <p className="text-sm text-green-600">Active Deployments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 p-2 rounded-full">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-700">4.8/5</p>
                    <p className="text-sm text-purple-600">User Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleTemplatePreview(template)}
                          className="shadow-lg"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Live Demo
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleUseTemplate(template)}
                          className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                    
                    {/* Performance badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-800 font-medium">
                        {template.conversionRate}% CVR
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-blue-600">
                          {template.icon}
                        </div>
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {template.specialization}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{template.usageCount} deployments</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                  
                  {/* Color Palette */}
                  <div>
                    <p className="font-medium text-sm mb-2">Color Palette:</p>
                    <div className="flex gap-2">
                      {template.colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className={`w-4 h-4 rounded-full ${
                            color.includes('Blue') ? 'bg-blue-500' :
                            color.includes('Green') ? 'bg-green-500' :
                            color.includes('Orange') ? 'bg-orange-500' :
                            color.includes('Purple') ? 'bg-purple-500' :
                            color.includes('Red') ? 'bg-red-500' :
                            color.includes('Gray') ? 'bg-gray-500' :
                            color.includes('Yellow') ? 'bg-yellow-500' :
                            color.includes('Teal') ? 'bg-teal-500' :
                            color.includes('Black') ? 'bg-black' :
                            'bg-gray-300'
                          }`} />
                          <span className="text-xs text-gray-500">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div>
                    <p className="font-medium text-sm mb-2">Key Features:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs justify-start">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Performance metrics */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">{template.conversionRate}%</p>
                        <p className="text-xs text-gray-500">Conversion</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600">{template.usageCount}</p>
                        <p className="text-xs text-gray-500">Active</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleTemplatePreview(template)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Use Template
                    </Button>
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
