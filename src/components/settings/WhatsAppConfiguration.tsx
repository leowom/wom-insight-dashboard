
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, CheckCircle, AlertCircle, RotateCcw, Settings } from 'lucide-react';

const WhatsAppConfiguration = () => {
  const [accounts] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      number: `+39 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
      status: Math.random() > 0.8 ? 'inactive' : Math.random() > 0.3 ? 'active' : 'warning',
      messagesDaily: Math.floor(Math.random() * 1000),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }))
  );

  const [rateLimits, setRateLimits] = useState({
    messagesPerMinute: 60,
    messagesPerHour: 1000,
    messagesPerDay: 10000,
    autoRotation: true,
    failureThreshold: 5
  });

  const [webhookSettings, setWebhookSettings] = useState({
    url: 'https://api.womconsulting.com/webhooks/whatsapp',
    secret: '••••••••••••••••',
    enabled: true
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Attivo</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Attenzione</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inattivo</Badge>;
      default:
        return <Badge variant="outline">Sconosciuto</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{accounts.length}</p>
                <p className="text-sm text-gray-600">Account Totali</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{accounts.filter(a => a.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Attivi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{accounts.filter(a => a.status === 'warning').length}</p>
                <p className="text-sm text-gray-600">Attenzione</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{accounts.filter(a => a.status === 'inactive').length}</p>
                <p className="text-sm text-gray-600">Inattivi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rate Limits Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configurazione Limiti</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="messages-per-minute">Messaggi per Minuto</Label>
              <Input
                id="messages-per-minute"
                type="number"
                value={rateLimits.messagesPerMinute}
                onChange={(e) => setRateLimits({...rateLimits, messagesPerMinute: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="messages-per-hour">Messaggi per Ora</Label>
              <Input
                id="messages-per-hour"
                type="number"
                value={rateLimits.messagesPerHour}
                onChange={(e) => setRateLimits({...rateLimits, messagesPerHour: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="messages-per-day">Messaggi per Giorno</Label>
              <Input
                id="messages-per-day"
                type="number"
                value={rateLimits.messagesPerDay}
                onChange={(e) => setRateLimits({...rateLimits, messagesPerDay: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Rotazione Automatica</Label>
                <p className="text-sm text-gray-600">Ruota automaticamente tra gli account disponibili</p>
              </div>
              <Switch
                checked={rateLimits.autoRotation}
                onCheckedChange={(checked) => setRateLimits({...rateLimits, autoRotation: checked})}
              />
            </div>

            <div>
              <Label htmlFor="failure-threshold">Soglia Errori per Disattivazione</Label>
              <Input
                id="failure-threshold"
                type="number"
                value={rateLimits.failureThreshold}
                onChange={(e) => setRateLimits({...rateLimits, failureThreshold: parseInt(e.target.value)})}
                className="max-w-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configurazione Webhook</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">URL Webhook</Label>
            <Input
              id="webhook-url"
              value={webhookSettings.url}
              onChange={(e) => setWebhookSettings({...webhookSettings, url: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="webhook-secret">Secret Token</Label>
            <Input
              id="webhook-secret"
              type="password"
              value={webhookSettings.secret}
              onChange={(e) => setWebhookSettings({...webhookSettings, secret: e.target.value})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Webhook Attivo</Label>
              <p className="text-sm text-gray-600">Ricevi notifiche in tempo reale</p>
            </div>
            <Switch
              checked={webhookSettings.enabled}
              onCheckedChange={(checked) => setWebhookSettings({...webhookSettings, enabled: checked})}
            />
          </div>

          <Button variant="outline">Testa Webhook</Button>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Gestione Account WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {accounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Account #{account.id}</span>
                  {getStatusIcon(account.status)}
                </div>
                
                <div>
                  <p className="text-xs text-gray-600">Numero</p>
                  <p className="text-sm font-mono">{account.number}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600">Messaggi/giorno</p>
                    <p className="text-sm font-medium">{account.messagesDaily}</p>
                  </div>
                  {getStatusBadge(account.status)}
                </div>

                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" className="flex-1">
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Annulla</Button>
        <Button>Salva Configurazione</Button>
      </div>
    </div>
  );
};

export default WhatsAppConfiguration;
