
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './settings/GeneralSettings';
import WhatsAppConfiguration from './settings/WhatsAppConfiguration';
import PaymentSettings from './settings/PaymentSettings';
import CampaignSettings from './settings/CampaignSettings';
import UserManagement from './settings/UserManagement';
import ApiIntegrations from './settings/ApiIntegrations';
import SystemHealth from './settings/SystemHealth';
import BackupSecurity from './settings/BackupSecurity';
import AuditLogs from './settings/AuditLogs';

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Impostazioni Sistema</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-9 h-auto p-1">
            <TabsTrigger value="general" className="text-xs">Generali</TabsTrigger>
            <TabsTrigger value="whatsapp" className="text-xs">WhatsApp</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs">Pagamenti</TabsTrigger>
            <TabsTrigger value="campaigns" className="text-xs">Campagne</TabsTrigger>
            <TabsTrigger value="users" className="text-xs">Utenti</TabsTrigger>
            <TabsTrigger value="api" className="text-xs">API</TabsTrigger>
            <TabsTrigger value="health" className="text-xs">Sistema</TabsTrigger>
            <TabsTrigger value="backup" className="text-xs">Backup</TabsTrigger>
            <TabsTrigger value="logs" className="text-xs">Log</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsAppConfiguration />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignSettings />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="api">
          <ApiIntegrations />
        </TabsContent>

        <TabsContent value="health">
          <SystemHealth />
        </TabsContent>

        <TabsContent value="backup">
          <BackupSecurity />
        </TabsContent>

        <TabsContent value="logs">
          <AuditLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
