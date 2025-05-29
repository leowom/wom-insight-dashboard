
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Edit, BarChart3, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  sentCount: number;
  deliveryRate: number;
  responseRate: number;
  createdAt: string;
}

const WhatsAppTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates: Template[] = [
    {
      id: '1',
      name: 'Promemoria Appuntamento 24h',
      content: 'Ciao {nome}! Ti ricordiamo che domani alle {ora} hai l\'appuntamento con {terapista} presso il nostro studio. Se non puoi presentarti, ti preghiamo di avvisarci il prima possibile.',
      category: 'reminder',
      status: 'approved',
      sentCount: 1245,
      deliveryRate: 98.5,
      responseRate: 12.3,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Promemoria Appuntamento 2h',
      content: 'Ciao {nome}! Fra 2 ore, alle {ora}, hai l\'appuntamento con {terapista}. Ti aspettiamo! 📍 {indirizzo}',
      category: 'reminder',
      status: 'approved',
      sentCount: 892,
      deliveryRate: 97.2,
      responseRate: 8.7,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Nurturing Giorno 1',
      content: 'Ciao {nome}! Benvenuto/a nel tuo percorso di benessere con {terapista}. Siamo qui per supportarti in ogni step del tuo recupero. 💪',
      category: 'nurturing',
      status: 'approved',
      sentCount: 567,
      deliveryRate: 96.8,
      responseRate: 23.4,
      createdAt: '2024-01-09'
    },
    {
      id: '4',
      name: 'Conferma Appuntamento',
      content: 'Perfetto {nome}! Il tuo appuntamento con {terapista} per {data} alle {ora} è confermato. Ci vediamo presto! ✅',
      category: 'confirmation',
      status: 'approved',
      sentCount: 334,
      deliveryRate: 99.1,
      responseRate: 5.2,
      createdAt: '2024-01-08'
    },
    {
      id: '5',
      name: 'Follow-up Pagamento',
      content: 'Ciao {nome}, ti ricordiamo gentilmente che è possibile saldare la fattura per la seduta del {data}. Puoi pagare tramite bonifico o direttamente in studio.',
      category: 'payment',
      status: 'pending',
      sentCount: 0,
      deliveryRate: 0,
      responseRate: 0,
      createdAt: '2024-01-15'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tutti', count: templates.length },
    { id: 'reminder', label: 'Promemoria', count: templates.filter(t => t.category === 'reminder').length },
    { id: 'nurturing', label: 'Nurturing', count: templates.filter(t => t.category === 'nurturing').length },
    { id: 'confirmation', label: 'Conferme', count: templates.filter(t => t.category === 'confirmation').length },
    { id: 'payment', label: 'Pagamenti', count: templates.filter(t => t.category === 'payment').length }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      approved: { label: 'Approvato', variant: 'default' as const, icon: CheckCircle },
      pending: { label: 'In Attesa', variant: 'secondary' as const, icon: Clock },
      rejected: { label: 'Rifiutato', variant: 'destructive' as const, icon: XCircle }
    };

    const { label, variant, icon: Icon } = config[status as keyof typeof config];
    
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      reminder: 'Promemoria',
      nurturing: 'Nurturing',
      confirmation: 'Conferma',
      payment: 'Pagamento'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalSent = templates.reduce((sum, t) => sum + t.sentCount, 0);
  const avgDeliveryRate = templates.length > 0 
    ? templates.reduce((sum, t) => sum + t.deliveryRate, 0) / templates.length 
    : 0;
  const avgResponseRate = templates.length > 0 
    ? templates.reduce((sum, t) => sum + t.responseRate, 0) / templates.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Template Totali</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messaggi Inviati</p>
                <p className="text-2xl font-bold">{totalSent.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso Consegna Medio</p>
                <p className="text-2xl font-bold">{avgDeliveryRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso Risposta Medio</p>
                <p className="text-2xl font-bold">{avgResponseRate.toFixed(1)}%</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Template WhatsApp Business</CardTitle>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuovo Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              placeholder="Cerca template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  {category.label}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{getCategoryLabel(template.category)}</Badge>
                    {getStatusBadge(template.status)}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Template Content */}
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm">{template.content}</p>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Inviati</p>
                  <p className="font-bold">{template.sentCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Consegna</p>
                  <p className="font-bold text-green-600">{template.deliveryRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Risposta</p>
                  <p className="font-bold text-blue-600">{template.responseRate.toFixed(1)}%</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Usa Template
                </Button>
              </div>

              {/* Meta Info */}
              <div className="text-xs text-gray-500 pt-2 border-t">
                Creato il {new Date(template.createdAt).toLocaleDateString('it-IT')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Nessun template trovato per i criteri selezionati</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WhatsAppTemplates;
