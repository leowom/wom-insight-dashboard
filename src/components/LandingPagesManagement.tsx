
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Eye, Edit, BarChart3, Play, Pause, Plus, Search, Filter } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import LandingPageBuilder from './LandingPageBuilder';
import LandingPageTemplates from './LandingPageTemplates';
import LandingPageAnalytics from './LandingPageAnalytics';

const LandingPagesManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerapista, setSelectedTerapista] = useState('');

  const landingPages = [
    {
      id: 1,
      terapistaName: 'Dr. Marco Rossi',
      terapistaPhoto: '/placeholder.svg',
      url: 'massaggi-milano.com/marco-rossi',
      status: 'Live',
      visits: 1247,
      submissions: 89,
      conversionRate: 7.1,
      specialization: 'Fisioterapia'
    },
    {
      id: 2,
      terapistaName: 'Dr.ssa Anna Bianchi',
      terapistaPhoto: '/placeholder.svg',
      url: 'massaggi-milano.com/anna-bianchi',
      status: 'Draft',
      visits: 0,
      submissions: 0,
      conversionRate: 0,
      specialization: 'Osteopatia'
    },
    {
      id: 3,
      terapistaName: 'Dr. Giuseppe Verde',
      terapistaPhoto: '/placeholder.svg',
      url: 'massaggi-milano.com/giuseppe-verde',
      status: 'Paused',
      visits: 892,
      submissions: 45,
      conversionRate: 5.0,
      specialization: 'Massoterapia'
    },
    {
      id: 4,
      terapistaName: 'Dr.ssa Laura Neri',
      terapistaPhoto: '/placeholder.svg',
      url: 'massaggi-milano.com/laura-neri',
      status: 'Live',
      visits: 2156,
      submissions: 178,
      conversionRate: 8.3,
      specialization: 'Fisioterapia'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPages = landingPages.filter(page =>
    page.terapistaName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTerapista === '' || page.terapistaName === selectedTerapista)
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Landing Pages']} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestione Landing Pages</h1>
          <p className="text-gray-600 mt-1">Crea e gestisci le landing pages per i terapisti</p>
        </div>
        <Button onClick={() => setActiveTab('builder')} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuova Landing Page
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
          <TabsTrigger value="builder">Page Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cerca terapista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtri
            </Button>
          </div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Landing Pages Attive</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visite Totali</p>
                    <p className="text-2xl font-bold">4,295</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Form Inviati</p>
                    <p className="text-2xl font-bold">312</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Edit className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tasso Conversione</p>
                    <p className="text-2xl font-bold">7.3%</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Landing Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={page.terapistaPhoto}
                      alt={page.terapistaName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{page.terapistaName}</CardTitle>
                      <p className="text-sm text-gray-600">{page.specialization}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(page.status)}>
                    {page.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <p className="text-blue-600 hover:underline cursor-pointer">
                      {page.url}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold">{page.visits.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Visite</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{page.submissions}</p>
                      <p className="text-xs text-gray-600">Form</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{page.conversionRate}%</p>
                      <p className="text-xs text-gray-600">Conversione</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifica
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Anteprima
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      {page.status === 'Live' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <LandingPageTemplates />
        </TabsContent>

        <TabsContent value="builder">
          <LandingPageBuilder />
        </TabsContent>

        <TabsContent value="analytics">
          <LandingPageAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPagesManagement;
