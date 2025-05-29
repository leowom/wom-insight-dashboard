
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Activity, Shield, CreditCard, Download, FileText, AlertTriangle, User, Search } from 'lucide-react';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: '2025-01-20 14:30:25',
      category: 'user_activity',
      action: 'Login',
      user: 'Marco Rossi',
      userEmail: 'marco@womconsulting.com',
      details: 'Accesso effettuato da IP 192.168.1.100',
      severity: 'info',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0'
    },
    {
      id: 2,
      timestamp: '2025-01-20 14:25:18',
      category: 'system_changes',
      action: 'Configurazione Modificata',
      user: 'Sistema',
      userEmail: 'system@womconsulting.com',
      details: 'Impostazioni backup automatico aggiornate',
      severity: 'medium',
      ipAddress: 'localhost',
      userAgent: 'Internal System'
    },
    {
      id: 3,
      timestamp: '2025-01-20 14:20:45',
      category: 'payment_processing',
      action: 'Pagamento Elaborato',
      user: 'Laura Bianchi',
      userEmail: 'laura@womconsulting.com',
      details: 'Pagamento bulk di €2,450 elaborato con successo per 8 terapisti',
      severity: 'info',
      ipAddress: '192.168.1.105',
      userAgent: 'Chrome 120.0.0.0'
    },
    {
      id: 4,
      timestamp: '2025-01-20 14:15:32',
      category: 'data_export',
      action: 'Export Dati',
      user: 'Andrea Verdi',
      userEmail: 'andrea@womconsulting.com',
      details: 'Export report campagne Q4 2024 (formato CSV)',
      severity: 'info',
      ipAddress: '192.168.1.110',
      userAgent: 'Firefox 121.0.0.0'
    },
    {
      id: 5,
      timestamp: '2025-01-20 14:10:15',
      category: 'security_events',
      action: 'Tentativo di Accesso Fallito',
      user: 'Sconosciuto',
      userEmail: 'unknown@attempt.com',
      details: 'Tentativo di login fallito per email inesistente',
      severity: 'high',
      ipAddress: '203.0.113.42',
      userAgent: 'curl/7.68.0'
    },
    {
      id: 6,
      timestamp: '2025-01-20 14:05:22',
      category: 'api_usage',
      action: 'API Rate Limit Superato',
      user: 'Sistema WhatsApp',
      userEmail: 'whatsapp@system.com',
      details: 'Rate limit di 1000 req/min superato per endpoint /send-message',
      severity: 'medium',
      ipAddress: '192.168.1.200',
      userAgent: 'WhatsApp-API-Client/1.0'
    },
    {
      id: 7,
      timestamp: '2025-01-20 14:00:08',
      category: 'user_activity',
      action: 'Password Modificata',
      user: 'Sofia Neri',
      userEmail: 'sofia@womconsulting.com',
      details: 'Password account modificata con successo',
      severity: 'info',
      ipAddress: '192.168.1.115',
      userAgent: 'Safari 17.2.1'
    },
    {
      id: 8,
      timestamp: '2025-01-20 13:55:45',
      category: 'system_changes',
      action: 'Backup Completato',
      user: 'Sistema',
      userEmail: 'system@womconsulting.com',
      details: 'Backup automatico database completato (2.4 GB)',
      severity: 'info',
      ipAddress: 'localhost',
      userAgent: 'Backup Service'
    }
  ]);

  const categories = {
    'all': 'Tutte le Categorie',
    'user_activity': 'Attività Utenti',
    'system_changes': 'Modifiche Sistema',
    'payment_processing': 'Elaborazione Pagamenti',
    'data_export': 'Export Dati',
    'security_events': 'Eventi di Sicurezza',
    'api_usage': 'Utilizzo API'
  };

  const severities = {
    'all': 'Tutte le Severità',
    'info': 'Info',
    'medium': 'Media',
    'high': 'Alta'
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_activity':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'system_changes':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'payment_processing':
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      case 'data_export':
        return <Download className="h-4 w-4 text-indigo-500" />;
      case 'security_events':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'api_usage':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Media</Badge>;
      case 'info':
        return <Badge className="bg-blue-500">Info</Badge>;
      default:
        return <Badge variant="outline">Sconosciuta</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'user_activity': 'bg-blue-500',
      'system_changes': 'bg-green-500',
      'payment_processing': 'bg-purple-500',
      'data_export': 'bg-indigo-500',
      'security_events': 'bg-red-500',
      'api_usage': 'bg-yellow-500'
    };
    
    return (
      <Badge className={colors[category as keyof typeof colors] || 'bg-gray-500'}>
        {categories[category as keyof typeof categories]}
      </Badge>
    );
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{auditLogs.length}</p>
                <p className="text-sm text-gray-600">Log Totali</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.severity === 'high').length}</p>
                <p className="text-sm text-gray-600">Alta Priorità</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{new Set(auditLogs.map(l => l.userEmail)).size}</p>
                <p className="text-sm text-gray-600">Utenti Attivi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.category === 'security_events').length}</p>
                <p className="text-sm text-gray-600">Eventi Sicurezza</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtri di Ricerca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Ricerca</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Cerca nei log..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="severity">Severità</Label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(severities).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Log di Audit ({filteredLogs.length} risultati)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(log.category)}
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-gray-600">{log.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {getCategoryBadge(log.category)}
                    {getSeverityBadge(log.severity)}
                  </div>
                </div>

                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                  {log.details}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium">{log.user}</span>
                      <span className="mx-1">•</span>
                      <span>{log.userEmail}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p>IP: {log.ipAddress}</p>
                    <p className="text-xs">{log.userAgent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Download className="h-6 w-6" />
              <span>Export Completo</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span>Report Sicurezza</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Analisi Anomalie</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Report Compliance</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
