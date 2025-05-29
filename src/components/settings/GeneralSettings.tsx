
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Building, Globe, Clock, Euro, Bell } from 'lucide-react';

const GeneralSettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'WOM Consulting',
    email: 'info@womconsulting.com',
    phone: '+39 123 456 789',
    address: 'Via Roma 123, Milano, Italia'
  });

  const [preferences, setPreferences] = useState({
    timezone: 'Europe/Rome',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'EUR',
    language: 'it'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true
  });

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Informazioni Azienda</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Nome Azienda</Label>
              <Input
                id="company-name"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="company-email">Email</Label>
              <Input
                id="company-email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="company-phone">Telefono</Label>
              <Input
                id="company-phone"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="company-address">Indirizzo</Label>
              <Input
                id="company-address"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="company-logo">Logo Azienda</Label>
            <div className="mt-2 flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Building className="h-8 w-8 text-gray-400" />
              </div>
              <Button variant="outline">Carica Logo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Impostazioni Regionali</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Fuso Orario</Label>
              <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Rome">Europa/Roma (GMT+1)</SelectItem>
                  <SelectItem value="Europe/London">Europa/Londra (GMT+0)</SelectItem>
                  <SelectItem value="America/New_York">America/New York (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Formato Data</Label>
              <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({...preferences, dateFormat: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Formato Ora</Label>
              <Select value={preferences.timeFormat} onValueChange={(value) => setPreferences({...preferences, timeFormat: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 ore</SelectItem>
                  <SelectItem value="12h">12 ore (AM/PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Valuta</Label>
              <Select value={preferences.currency} onValueChange={(value) => setPreferences({...preferences, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollaro ($)</SelectItem>
                  <SelectItem value="GBP">Sterlina (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Lingua</Label>
              <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Preferenze Notifiche</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Avvisi Email</Label>
                <p className="text-sm text-gray-600">Ricevi notifiche importanti via email</p>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => setNotifications({...notifications, emailAlerts: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Avvisi SMS</Label>
                <p className="text-sm text-gray-600">Ricevi notifiche urgenti via SMS</p>
              </div>
              <Switch
                checked={notifications.smsAlerts}
                onCheckedChange={(checked) => setNotifications({...notifications, smsAlerts: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notifiche Push</Label>
                <p className="text-sm text-gray-600">Notifiche push nel browser</p>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Report Settimanali</Label>
                <p className="text-sm text-gray-600">Ricevi riassunti settimanali automatici</p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Annulla</Button>
        <Button>Salva Modifiche</Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
