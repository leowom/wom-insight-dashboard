
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Send, Calendar, MessageSquare, Filter } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  terapista: string;
  status: string;
  lastAppointment: string;
}

const WhatsAppBulkMessaging = () => {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Maria Rossi',
      phone: '+39 335 123 4567',
      terapista: 'Dr. Elena Bianchi',
      status: 'active',
      lastAppointment: '2024-01-10'
    },
    {
      id: '2',
      name: 'Giuseppe Verdi',
      phone: '+39 340 987 6543',
      terapista: 'Dr. Marco Ferrari',
      status: 'nurturing',
      lastAppointment: '2024-01-08'
    },
    {
      id: '3',
      name: 'Anna Lombardi',
      phone: '+39 347 555 1234',
      terapista: 'Dr. Sofia Greco',
      status: 'completed',
      lastAppointment: '2024-01-12'
    }
  ];

  const templates = [
    {
      id: 'reminder-general',
      name: 'Promemoria Generale',
      content: 'Ciao {nome}! Ti ricordiamo il tuo appuntamento con {terapista} per {data}.',
      category: 'reminder'
    },
    {
      id: 'nurturing-wellness',
      name: 'Nurturing Benessere',
      content: 'Ciao {nome}! Come va il tuo percorso di benessere? Siamo qui per supportarti.',
      category: 'nurturing'
    },
    {
      id: 'feedback-request',
      name: 'Richiesta Feedback',
      content: 'Ciao {nome}! Ci faresti piacere se condividessi un feedback sulla tua esperienza con {terapista}.',
      category: 'feedback'
    }
  ];

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatients(prev =>
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    const filteredPatients = patients.filter(p => 
      filterStatus === 'all' || p.status === filterStatus
    );
    
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map(p => p.id));
    }
  };

  const filteredPatients = patients.filter(p => 
    filterStatus === 'all' || p.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: 'Attivo', variant: 'default' as const },
      nurturing: { label: 'Nurturing', variant: 'secondary' as const },
      completed: { label: 'Completato', variant: 'outline' as const }
    };
    
    const { label, variant } = config[status as keyof typeof config] || { label: status, variant: 'outline' as const };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const previewMessage = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return '';

    const samplePatient = filteredPatients[0];
    if (!samplePatient) return '';

    return template.content
      .replace('{nome}', samplePatient.name)
      .replace('{terapista}', samplePatient.terapista)
      .replace('{data}', 'domani alle 15:00');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Invio Messaggi in Blocco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Pazienti Selezionati</p>
                <p className="font-bold">{selectedPatients.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Template Selezionato</p>
                <p className="font-bold">{selectedTemplate ? 'Sì' : 'No'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Programmazione</p>
                <p className="font-bold">{scheduleTime ? 'Programmato' : 'Immediato'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Costo Stimato</p>
                <p className="font-bold">€{(selectedPatients.length * 0.05).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Selezione Pazienti</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="all">Tutti</option>
                  <option value="active">Attivi</option>
                  <option value="nurturing">Nurturing</option>
                  <option value="completed">Completati</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <label className="text-sm">Seleziona tutti ({filteredPatients.length})</label>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50">
                  <Checkbox
                    checked={selectedPatients.includes(patient.id)}
                    onCheckedChange={() => handlePatientSelect(patient.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{patient.name}</span>
                      {getStatusBadge(patient.status)}
                    </div>
                    <p className="text-xs text-gray-500">{patient.phone}</p>
                    <p className="text-xs text-gray-500">Terapista: {patient.terapista}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Template & Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Template e Anteprima</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Seleziona Template</label>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{template.name}</span>
                      <Badge variant="outline" className="text-xs">{template.category}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{template.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="text-sm font-medium mb-2 block">Programmazione (Opzionale)</label>
              <Input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            {/* Preview */}
            {selectedTemplate && (
              <div>
                <label className="text-sm font-medium mb-2 block">Anteprima Messaggio</label>
                <div className="p-3 bg-gray-50 border rounded">
                  <p className="text-sm">{previewMessage()}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Send Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Riepilogo Invio</p>
              <p className="text-sm text-gray-600">
                {selectedPatients.length} pazienti selezionati • 
                {selectedTemplate ? ` Template: ${templates.find(t => t.id === selectedTemplate)?.name}` : ' Nessun template'} •
                {scheduleTime ? ` Programmato per: ${new Date(scheduleTime).toLocaleString('it-IT')}` : ' Invio immediato'}
              </p>
            </div>
            <Button
              size="lg"
              disabled={selectedPatients.length === 0 || !selectedTemplate}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {scheduleTime ? 'Programma Invio' : 'Invia Ora'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppBulkMessaging;
