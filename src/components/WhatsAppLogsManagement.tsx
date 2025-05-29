
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, Search, MessageSquare, Clock, CheckCircle, XCircle, Phone } from 'lucide-react';
import WhatsAppActivityFeed from './WhatsAppActivityFeed';
import WhatsAppAccountsGrid from './WhatsAppAccountsGrid';
import WhatsAppConversationView from './WhatsAppConversationView';
import WhatsAppAnalytics from './WhatsAppAnalytics';
import WhatsAppBulkMessaging from './WhatsAppBulkMessaging';
import WhatsAppTemplates from './WhatsAppTemplates';
import WhatsAppAutomationRules from './WhatsAppAutomationRules';

const WhatsAppLogsManagement = () => {
  const [isLiveFeedActive, setIsLiveFeedActive] = useState(true);
  const [selectedMessageTypes, setSelectedMessageTypes] = useState<string[]>(['all']);
  const [searchTerm, setSearchTerm] = useState('');

  const messageTypes = [
    { id: 'all', label: 'Tutti i Messaggi', count: 2847 },
    { id: 'nurturing-day1', label: 'Nurturing Giorno 1', count: 145 },
    { id: 'nurturing-day3', label: 'Nurturing Giorno 3', count: 98 },
    { id: 'nurturing-day7', label: 'Nurturing Giorno 7', count: 76 },
    { id: 'reminder-24h', label: 'Promemoria 24h', count: 234 },
    { id: 'reminder-2h', label: 'Promemoria 2h', count: 189 },
    { id: 'confirmation', label: 'Conferme Appuntamento', count: 167 },
    { id: 'payment', label: 'Follow-up Pagamenti', count: 89 },
    { id: 'custom', label: 'Messaggi Personalizzati', count: 45 }
  ];

  const overviewStats = [
    { label: 'Messaggi Inviati Oggi', value: '2,847', icon: MessageSquare, color: 'blue' },
    { label: 'Account Attivi', value: '47/50', icon: Phone, color: 'green' },
    { label: 'Tasso di Consegna', value: '98.5%', icon: CheckCircle, color: 'green' },
    { label: 'In Attesa', value: '156', icon: Clock, color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Types Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filtri Tipologia Messaggi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {messageTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedMessageTypes.includes(type.id) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (type.id === 'all') {
                    setSelectedMessageTypes(['all']);
                  } else {
                    const newTypes = selectedMessageTypes.includes(type.id)
                      ? selectedMessageTypes.filter(t => t !== type.id)
                      : [...selectedMessageTypes.filter(t => t !== 'all'), type.id];
                    setSelectedMessageTypes(newTypes.length === 0 ? ['all'] : newTypes);
                  }
                }}
                className="h-8"
              >
                {type.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs Interface */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="activity">Attività Live</TabsTrigger>
          <TabsTrigger value="accounts">Account WhatsApp</TabsTrigger>
          <TabsTrigger value="conversations">Conversazioni</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bulk">Invio Multiplo</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
          <TabsTrigger value="automation">Automazioni</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <WhatsAppActivityFeed 
            isLiveActive={isLiveFeedActive}
            selectedTypes={selectedMessageTypes}
            onToggleLive={() => setIsLiveFeedActive(!isLiveFeedActive)}
          />
        </TabsContent>

        <TabsContent value="accounts">
          <WhatsAppAccountsGrid />
        </TabsContent>

        <TabsContent value="conversations">
          <WhatsAppConversationView />
        </TabsContent>

        <TabsContent value="analytics">
          <WhatsAppAnalytics />
        </TabsContent>

        <TabsContent value="bulk">
          <WhatsAppBulkMessaging />
        </TabsContent>

        <TabsContent value="templates">
          <WhatsAppTemplates />
        </TabsContent>

        <TabsContent value="automation">
          <WhatsAppAutomationRules />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppLogsManagement;
