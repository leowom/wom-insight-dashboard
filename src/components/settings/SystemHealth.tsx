
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Server, Database, Zap, HardDrive, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const SystemHealth = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    serverUptime: 99.8,
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 34,
    databaseConnections: 23,
    activeUsers: 89,
    apiRequestsPerMinute: 1247,
    errorRate: 0.2
  });

  const [performanceData] = useState([
    { time: '00:00', responseTime: 120, requests: 890 },
    { time: '04:00', responseTime: 95, requests: 650 },
    { time: '08:00', responseTime: 180, requests: 1200 },
    { time: '12:00', responseTime: 210, requests: 1450 },
    { time: '16:00', responseTime: 165, requests: 1320 },
    { time: '20:00', responseTime: 140, requests: 1100 },
    { time: '24:00', responseTime: 115, requests: 920 }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Utilizzo memoria sopra il 60%', time: '14:25', severity: 'medium' },
    { id: 2, type: 'info', message: 'Backup automatico completato', time: '02:00', severity: 'low' },
    { id: 3, type: 'error', message: 'Errore temporaneo API WhatsApp', time: '13:45', severity: 'high' },
    { id: 4, type: 'success', message: 'Aggiornamento sicurezza applicato', time: '01:30', severity: 'low' }
  ]);

  const [backupStatus] = useState({
    lastBackup: '2025-01-20 02:00',
    backupSize: '2.4 GB',
    status: 'success',
    nextScheduled: '2025-01-21 02:00',
    retention: '30 giorni'
  });

  const getMetricColor = (percentage: number, inverse = false) => {
    if (inverse) {
      if (percentage < 30) return 'text-green-600';
      if (percentage < 70) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (percentage > 90) return 'text-green-600';
    if (percentage > 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number, inverse = false) => {
    if (inverse) {
      if (percentage < 30) return 'bg-green-500';
      if (percentage < 70) return 'bg-yellow-500';
      return 'bg-red-500';
    }
    if (percentage > 90) return 'bg-green-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Media</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Bassa</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        apiRequestsPerMinute: Math.max(800, Math.min(2000, prev.apiRequestsPerMinute + (Math.random() - 0.5) * 200)),
        activeUsers: Math.max(50, Math.min(150, prev.activeUsers + (Math.random() - 0.5) * 20))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Server className="h-8 w-8 text-blue-600" />
              <div>
                <p className={`text-2xl font-bold ${getMetricColor(systemMetrics.serverUptime)}`}>
                  {systemMetrics.serverUptime}%
                </p>
                <p className="text-sm text-gray-600">Server Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{systemMetrics.databaseConnections}</p>
                <p className="text-sm text-gray-600">DB Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
                <p className="text-sm text-gray-600">Utenti Attivi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-yellow-600" />
              <div>
                <p className={`text-2xl font-bold ${getMetricColor(systemMetrics.errorRate, true)}`}>
                  {systemMetrics.errorRate}%
                </p>
                <p className="text-sm text-gray-600">Error Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilizzo Risorse Server</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">CPU</span>
                <span className={`text-sm font-bold ${getMetricColor(systemMetrics.cpuUsage, true)}`}>
                  {systemMetrics.cpuUsage}%
                </span>
              </div>
              <Progress value={systemMetrics.cpuUsage} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Memoria RAM</span>
                <span className={`text-sm font-bold ${getMetricColor(systemMetrics.memoryUsage, true)}`}>
                  {systemMetrics.memoryUsage}%
                </span>
              </div>
              <Progress value={systemMetrics.memoryUsage} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Spazio Disco</span>
                <span className={`text-sm font-bold ${getMetricColor(systemMetrics.diskUsage, true)}`}>
                  {systemMetrics.diskUsage}%
                </span>
              </div>
              <Progress value={systemMetrics.diskUsage} className="h-3" />
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Richieste API/min</p>
                  <p className="font-bold">{systemMetrics.apiRequestsPerMinute.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Rate Errori</p>
                  <p className={`font-bold ${getMetricColor(systemMetrics.errorRate, true)}`}>
                    {systemMetrics.errorRate}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stato Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Backup Completato</p>
                <p className="text-sm text-gray-600">Ultimo: {backupStatus.lastBackup}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dimensione Backup</span>
                <span className="text-sm font-medium">{backupStatus.backupSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Prossimo Backup</span>
                <span className="text-sm font-medium">{backupStatus.nextScheduled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Retention</span>
                <span className="text-sm font-medium">{backupStatus.retention}</span>
              </div>
            </div>

            <Badge className="bg-green-500">Sistema Sicuro</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance API (Ultime 24 ore)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Tempo Risposta (ms)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Richieste/ora"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Avvisi di Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                </div>
                {getAlertBadge(alert.severity)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5" />
            <span>Utilizzo Storage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Database</p>
              <Progress value={45} className="h-3 mb-1" />
              <p className="text-xs text-gray-500">1.2 GB / 2.7 GB</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">File Upload</p>
              <Progress value={23} className="h-3 mb-1" />
              <p className="text-xs text-gray-500">890 MB / 4 GB</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Log Files</p>
              <Progress value={67} className="h-3 mb-1" />
              <p className="text-xs text-gray-500">340 MB / 500 MB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;
