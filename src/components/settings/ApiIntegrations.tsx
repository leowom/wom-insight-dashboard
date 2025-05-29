
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, AlertCircle, XCircle, TestTube, RefreshCw, ExternalLink } from 'lucide-react';

const ApiIntegrations = () => {
  const [integrations] = useState([
    {
      name: 'WhatsApp Business API',
      status: 'connected',
      lastChecked: '2025-01-20 14:30',
      responseTime: '120ms',
      uptime: '99.9%',
      apiKey: '••••••••••••••••',
      endpoint: 'https://graph.facebook.com/v18.0'
    },
    {
      name: 'Meta Marketing API',
      status: 'connected',
      lastChecked: '2025-01-20 14:28',
      responseTime: '95ms',
      uptime: '99.8%',
      apiKey: '••••••••••••••••',
      endpoint: 'https://graph.facebook.com/v18.0'
    },
    {
      name: 'TLDV Integration',
      status: 'warning',
      lastChecked: '2025-01-20 14:15',
      responseTime: '350ms',
      uptime: '98.2%',
      apiKey: '••••••••••••••••',
      endpoint: 'https://api.tldv.io/v1'
    },
    {
      name: 'Revolut Business API',
      status: 'connected',
      lastChecked: '2025-01-20 14:32',
      responseTime: '180ms',
      uptime: '99.7%',
      apiKey: '••••••••••••••••',
      endpoint: 'https://b2b.revolut.com/api/1.0'
    },
    {
      name: 'Stripe API',
      status: 'disconnected',
      lastChecked: '2025-01-20 13:45',
      responseTime: 'N/A',
      uptime: 'N/A',
      apiKey: '',
      endpoint: 'https://api.stripe.com/v1'
    },
    {
      name: 'Google Maps API (Apify)',
      status: 'connected',
      lastChecked: '2025-01-20 14:20',
      responseTime: '250ms',
      uptime: '99.5%',
      apiKey: '••••••••••••••••',
      endpoint: 'https://maps.googleapis.com/maps/api/v1'
    }
  ]);

  const [testResults, setTestResults] = useState<{[key: string]: string}>({});

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500">Connesso</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Attenzione</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">Disconnesso</Badge>;
      default:
        return <Badge variant="outline">Sconosciuto</Badge>;
    }
  };

  const testConnection = (name: string) => {
    setTestResults({...testResults, [name]: 'testing'});
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.2;
      setTestResults({...testResults, [name]: success ? 'success' : 'failed'});
    }, 2000);
  };

  const getTestResultIcon = (result: string) => {
    switch (result) {
      case 'testing':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'connected').length}</p>
                <p className="text-sm text-gray-600">Connesse</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'warning').length}</p>
                <p className="text-sm text-gray-600">Attenzione</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'disconnected').length}</p>
                <p className="text-sm text-gray-600">Disconnesse</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(integrations.filter(i => i.uptime !== 'N/A').reduce((acc, i) => acc + parseFloat(i.uptime.replace('%', '')), 0) / integrations.filter(i => i.uptime !== 'N/A').length * 100) / 100}%
                </p>
                <p className="text-sm text-gray-600">Uptime Medio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations List */}
      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(integration.status)}
                  <span>{integration.name}</span>
                  {getStatusBadge(integration.status)}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => testConnection(integration.name)}>
                    {getTestResultIcon(testResults[integration.name]) || <TestTube className="h-4 w-4" />}
                    Testa
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Ultimo Controllo</p>
                  <p className="font-medium">{integration.lastChecked}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tempo di Risposta</p>
                  <p className="font-medium">{integration.responseTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Uptime</p>
                  <p className="font-medium">{integration.uptime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Endpoint</p>
                  <p className="font-medium text-xs">{integration.endpoint}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor={`api-key-${index}`}>API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id={`api-key-${index}`}
                      type="password"
                      value={integration.apiKey}
                      className="flex-1"
                      readOnly={integration.status === 'connected'}
                    />
                    {integration.status === 'connected' && (
                      <Button size="sm" variant="outline">Modifica</Button>
                    )}
                  </div>
                </div>

                {testResults[integration.name] && (
                  <div className={`p-3 rounded-lg ${
                    testResults[integration.name] === 'success' ? 'bg-green-50 text-green-800' :
                    testResults[integration.name] === 'failed' ? 'bg-red-50 text-red-800' :
                    'bg-blue-50 text-blue-800'
                  }`}>
                    {testResults[integration.name] === 'testing' && 'Test in corso...'}
                    {testResults[integration.name] === 'success' && 'Connessione testata con successo!'}
                    {testResults[integration.name] === 'failed' && 'Test di connessione fallito. Verifica le credenziali.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <RefreshCw className="h-6 w-6" />
              <span>Testa Tutte le Connessioni</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span>Verifica Stato Servizi</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <ExternalLink className="h-6 w-6" />
              <span>Documentazione API</span>
            </Button>
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

export default ApiIntegrations;
