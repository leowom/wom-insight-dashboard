
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Database, Download, Calendar, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

const BackupSecurity = () => {
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: 'daily',
    retentionPeriod: 30,
    backupTime: '02:00',
    compression: true,
    encryption: true
  });

  const [dataRetention, setDataRetention] = useState({
    userLogs: 365,
    systemLogs: 90,
    paymentRecords: 2555, // 7 years
    campaignData: 1095, // 3 years
    autoCleanup: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    sslEnabled: true,
    sslExpiry: '2025-12-15',
    forceHttps: true,
    ipWhitelist: '',
    rateLimit: 1000,
    ddosProtection: true
  });

  const [gdprSettings, setGdprSettings] = useState({
    dataProcessingConsent: true,
    rightToErasure: true,
    dataPortability: true,
    cookieConsent: true,
    privacyPolicy: 'https://womconsulting.com/privacy'
  });

  const [backupHistory] = useState([
    { date: '2025-01-20', time: '02:00', size: '2.4 GB', status: 'success', type: 'auto' },
    { date: '2025-01-19', time: '02:00', size: '2.3 GB', status: 'success', type: 'auto' },
    { date: '2025-01-18', time: '02:00', size: '2.3 GB', status: 'success', type: 'auto' },
    { date: '2025-01-17', time: '14:30', size: '2.2 GB', status: 'success', type: 'manual' },
    { date: '2025-01-16', time: '02:00', size: '2.2 GB', status: 'failed', type: 'auto' }
  ]);

  const getStatusBadge = (status: string) => {
    return status === 'success' 
      ? <Badge className="bg-green-500">Successo</Badge>
      : <Badge variant="destructive">Fallito</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return type === 'auto' 
      ? <Badge variant="outline">Auto</Badge>
      : <Badge className="bg-blue-500">Manuale</Badge>;
  };

  const calculateStorageUsage = () => {
    const totalBackups = backupHistory.filter(b => b.status === 'success').length;
    const avgSize = 2.3; // GB
    const usedStorage = totalBackups * avgSize;
    const totalStorage = 50; // GB
    return (usedStorage / totalStorage) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Backup Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{backupHistory.filter(b => b.status === 'success').length}</p>
                <p className="text-sm text-gray-600">Backup Successo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-gray-600">Affidabilità</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">2.4 GB</p>
                <p className="text-sm text-gray-600">Ultimo Backup</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{backupSettings.retentionPeriod}</p>
                <p className="text-sm text-gray-600">Giorni Retention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Configurazione Backup</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Backup Automatico</Label>
              <p className="text-sm text-gray-600">Esegui backup automatici del database</p>
            </div>
            <Switch
              checked={backupSettings.autoBackup}
              onCheckedChange={(checked) => setBackupSettings({...backupSettings, autoBackup: checked})}
            />
          </div>

          {backupSettings.autoBackup && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Frequenza</Label>
                <Select 
                  value={backupSettings.frequency} 
                  onValueChange={(value) => setBackupSettings({...backupSettings, frequency: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Ogni Ora</SelectItem>
                    <SelectItem value="daily">Giornaliero</SelectItem>
                    <SelectItem value="weekly">Settimanale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="backup-time">Orario Backup</Label>
                <Input
                  id="backup-time"
                  type="time"
                  value={backupSettings.backupTime}
                  onChange={(e) => setBackupSettings({...backupSettings, backupTime: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="retention">Retention (giorni)</Label>
                <Input
                  id="retention"
                  type="number"
                  value={backupSettings.retentionPeriod}
                  onChange={(e) => setBackupSettings({...backupSettings, retentionPeriod: parseInt(e.target.value)})}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Compressione</Label>
              <Switch
                checked={backupSettings.compression}
                onCheckedChange={(checked) => setBackupSettings({...backupSettings, compression: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Crittografia</Label>
              <Switch
                checked={backupSettings.encryption}
                onCheckedChange={(checked) => setBackupSettings({...backupSettings, encryption: checked})}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button>Backup Manuale</Button>
            <Button variant="outline">Testa Configurazione</Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Politiche di Conservazione Dati</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="user-logs">Log Utenti (giorni)</Label>
              <Input
                id="user-logs"
                type="number"
                value={dataRetention.userLogs}
                onChange={(e) => setDataRetention({...dataRetention, userLogs: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="system-logs">Log Sistema (giorni)</Label>
              <Input
                id="system-logs"
                type="number"
                value={dataRetention.systemLogs}
                onChange={(e) => setDataRetention({...dataRetention, systemLogs: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="payment-records">Record Pagamenti (giorni)</Label>
              <Input
                id="payment-records"
                type="number"
                value={dataRetention.paymentRecords}
                onChange={(e) => setDataRetention({...dataRetention, paymentRecords: parseInt(e.target.value)})}
              />
              <p className="text-xs text-gray-500 mt-1">Richiesto per legge: 7 anni</p>
            </div>
            <div>
              <Label htmlFor="campaign-data">Dati Campagne (giorni)</Label>
              <Input
                id="campaign-data"
                type="number"
                value={dataRetention.campaignData}
                onChange={(e) => setDataRetention({...dataRetention, campaignData: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Pulizia Automatica</Label>
              <p className="text-sm text-gray-600">Elimina automaticamente i dati scaduti</p>
            </div>
            <Switch
              checked={dataRetention.autoCleanup}
              onCheckedChange={(checked) => setDataRetention({...dataRetention, autoCleanup: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Impostazioni Sicurezza</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Label>SSL/TLS Abilitato</Label>
                </div>
                <Switch checked={securitySettings.sslEnabled} disabled />
              </div>

              <div>
                <Label>Scadenza Certificato SSL</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input value={securitySettings.sslExpiry} readOnly />
                  <Badge className="bg-green-500">Valido</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Forza HTTPS</Label>
                <Switch
                  checked={securitySettings.forceHttps}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, forceHttps: checked})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="rate-limit">Rate Limit (richieste/minuto)</Label>
                <Input
                  id="rate-limit"
                  type="number"
                  value={securitySettings.rateLimit}
                  onChange={(e) => setSecuritySettings({...securitySettings, rateLimit: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <Label htmlFor="ip-whitelist">IP Whitelist (opzionale)</Label>
                <Input
                  id="ip-whitelist"
                  placeholder="192.168.1.1, 10.0.0.1"
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Protezione DDoS</Label>
                <Switch
                  checked={securitySettings.ddosProtection}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ddosProtection: checked})}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GDPR Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Conformità GDPR</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Consenso Trattamento Dati</Label>
                <p className="text-sm text-gray-600">Richiedi consenso esplicito per il trattamento</p>
              </div>
              <Switch
                checked={gdprSettings.dataProcessingConsent}
                onCheckedChange={(checked) => setGdprSettings({...gdprSettings, dataProcessingConsent: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Diritto alla Cancellazione</Label>
                <p className="text-sm text-gray-600">Permetti agli utenti di richiedere la cancellazione dei dati</p>
              </div>
              <Switch
                checked={gdprSettings.rightToErasure}
                onCheckedChange={(checked) => setGdprSettings({...gdprSettings, rightToErasure: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Portabilità dei Dati</Label>
                <p className="text-sm text-gray-600">Export dati in formato machine-readable</p>
              </div>
              <Switch
                checked={gdprSettings.dataPortability}
                onCheckedChange={(checked) => setGdprSettings({...gdprSettings, dataPortability: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Cookie Consent</Label>
                <p className="text-sm text-gray-600">Banner di consenso cookie</p>
              </div>
              <Switch
                checked={gdprSettings.cookieConsent}
                onCheckedChange={(checked) => setGdprSettings({...gdprSettings, cookieConsent: checked})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="privacy-policy">URL Privacy Policy</Label>
            <Input
              id="privacy-policy"
              value={gdprSettings.privacyPolicy}
              onChange={(e) => setGdprSettings({...gdprSettings, privacyPolicy: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Utilizzo Storage Backup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Storage Utilizzato</span>
                <span className="font-bold">{calculateStorageUsage().toFixed(1)}% (11.5 GB / 50 GB)</span>
              </div>
              <Progress value={calculateStorageUsage()} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Backup Attivi</p>
                <p className="font-bold">{backupHistory.filter(b => b.status === 'success').length}</p>
              </div>
              <div>
                <p className="text-gray-600">Dimensione Media</p>
                <p className="font-bold">2.3 GB</p>
              </div>
              <div>
                <p className="text-gray-600">Retention</p>
                <p className="font-bold">{backupSettings.retentionPeriod} giorni</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Cronologia Backup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupHistory.map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{backup.date} alle {backup.time}</p>
                    <p className="text-sm text-gray-600">Dimensione: {backup.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getTypeBadge(backup.type)}
                  {getStatusBadge(backup.status)}
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
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

export default BackupSecurity;
