
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, Play, Pause, Plus, BarChart3, Clock, Users, MessageSquare } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  condition: string;
  action: string;
  isActive: boolean;
  messagesTriggered: number;
  successRate: number;
  lastTriggered: string;
  createdAt: string;
}

const WhatsAppAutomationRules = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Promemoria Automatico 24h',
      description: 'Invia promemoria 24 ore prima dell\'appuntamento',
      trigger: 'Appuntamento programmato',
      condition: '24 ore prima',
      action: 'Invia template: Promemoria 24h',
      isActive: true,
      messagesTriggered: 1245,
      successRate: 98.5,
      lastTriggered: '2 ore fa',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Nurturing Nuovo Paziente',
      description: 'Serie di messaggi di benvenuto per nuovi pazienti',
      trigger: 'Nuovo paziente registrato',
      condition: 'Primo appuntamento confermato',
      action: 'Invia sequenza nurturing',
      isActive: true,
      messagesTriggered: 567,
      successRate: 96.8,
      lastTriggered: '30 min fa',
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      name: 'Follow-up Mancato Appuntamento',
      description: 'Messaggio automatico per appuntamenti mancati',
      trigger: 'Appuntamento mancato',
      condition: '2 ore dopo orario previsto',
      action: 'Invia template: Riprogrammazione',
      isActive: false,
      messagesTriggered: 89,
      successRate: 45.2,
      lastTriggered: '1 giorno fa',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Conferma Automatica',
      description: 'Conferma automatica dopo prenotazione online',
      trigger: 'Prenotazione online',
      condition: 'Immediata',
      action: 'Invia template: Conferma appuntamento',
      isActive: true,
      messagesTriggered: 334,
      successRate: 99.1,
      lastTriggered: '15 min fa',
      createdAt: '2024-01-07'
    },
    {
      id: '5',
      name: 'Promemoria Pagamento',
      description: 'Promemoria per fatture scadute',
      trigger: 'Fattura scaduta',
      condition: '3 giorni dopo scadenza',
      action: 'Invia template: Follow-up pagamento',
      isActive: true,
      messagesTriggered: 156,
      successRate: 67.3,
      lastTriggered: '4 ore fa',
      createdAt: '2024-01-06'
    }
  ]);

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes('Appuntamento')) return <Calendar className="h-4 w-4" />;
    if (trigger.includes('Paziente')) return <Users className="h-4 w-4" />;
    if (trigger.includes('Fattura')) return <MessageSquare className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const activeRules = rules.filter(r => r.isActive).length;
  const totalTriggered = rules.reduce((sum, r) => sum + r.messagesTriggered, 0);
  const avgSuccessRate = rules.length > 0 
    ? rules.reduce((sum, r) => sum + r.successRate, 0) / rules.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Regole Attive</p>
                <p className="text-2xl font-bold text-green-600">{activeRules}</p>
                <p className="text-xs text-gray-500">di {rules.length} totali</p>
              </div>
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messaggi Attivati</p>
                <p className="text-2xl font-bold">{totalTriggered.toLocaleString()}</p>
                <p className="text-xs text-green-600">Questa settimana</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso Successo Medio</p>
                <p className={`text-2xl font-bold ${getSuccessRateColor(avgSuccessRate)}`}>
                  {avgSuccessRate.toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Risparmiato</p>
                <p className="text-2xl font-bold">47h</p>
                <p className="text-xs text-green-600">Questa settimana</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Regole di Automazione
            </CardTitle>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuova Regola
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTriggerIcon(rule.trigger)}
                    <h3 className="font-semibold text-lg">{rule.name}</h3>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? 'Attiva' : 'Inattiva'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{rule.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">TRIGGER</p>
                      <p className="text-sm">{rule.trigger}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">CONDIZIONE</p>
                      <p className="text-sm">{rule.condition}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">AZIONE</p>
                      <p className="text-sm">{rule.action}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Messaggi Attivati</p>
                      <p className="font-bold">{rule.messagesTriggered.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tasso di Successo</p>
                      <p className={`font-bold ${getSuccessRateColor(rule.successRate)}`}>
                        {rule.successRate.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ultimo Trigger</p>
                      <p className="font-bold">{rule.lastTriggered}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Creata il</p>
                      <p className="font-bold">{new Date(rule.createdAt).toLocaleDateString('it-IT')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 ml-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <span className="text-sm text-gray-500">
                      {rule.isActive ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Calendar icon import fix
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default WhatsAppAutomationRules;
