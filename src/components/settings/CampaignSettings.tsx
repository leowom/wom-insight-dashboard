
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { BarChart3, Target, AlertTriangle, TestTube, FileCheck } from 'lucide-react';

const CampaignSettings = () => {
  const [budgetSettings, setBudgetSettings] = useState({
    defaultMinBudget: 10,
    defaultMaxBudget: 20,
    dailyBudgetCap: 50,
    monthlyBudgetCap: 1000,
    currency: 'EUR'
  });

  const [alertSettings, setAlertSettings] = useState({
    cpaThreshold: 15,
    enableCpaAlerts: true,
    lowPerformanceThreshold: 0.5,
    enablePerformanceAlerts: true,
    budgetExhaustionAlert: 90
  });

  const [autoRules, setAutoRules] = useState({
    autoPauseHighCPA: true,
    autoPauseLowCTR: false,
    autoIncreaseGoodPerformers: true,
    autoDecreaseLimit: 50,
    autoIncreaseLimit: 150
  });

  const [abTestSettings, setAbTestSettings] = useState({
    enableABTesting: true,
    testDuration: 7,
    minSampleSize: 100,
    significanceLevel: 95,
    autoWinner: true
  });

  const [approvalWorkflow, setApprovalWorkflow] = useState({
    requireApproval: true,
    approvalBudgetThreshold: 30,
    multiLevelApproval: false,
    autoApproveRepeats: true
  });

  return (
    <div className="space-y-6">
      {/* Budget Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Impostazioni Budget</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="min-budget">Budget Minimo Giornaliero (€)</Label>
              <Input
                id="min-budget"
                type="number"
                value={budgetSettings.defaultMinBudget}
                onChange={(e) => setBudgetSettings({...budgetSettings, defaultMinBudget: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="max-budget">Budget Massimo Giornaliero (€)</Label>
              <Input
                id="max-budget"
                type="number"
                value={budgetSettings.defaultMaxBudget}
                onChange={(e) => setBudgetSettings({...budgetSettings, defaultMaxBudget: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="daily-cap">Limite Massimo Giornaliero (€)</Label>
              <Input
                id="daily-cap"
                type="number"
                value={budgetSettings.dailyBudgetCap}
                onChange={(e) => setBudgetSettings({...budgetSettings, dailyBudgetCap: parseFloat(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="monthly-cap">Limite Massimo Mensile (€)</Label>
            <Input
              id="monthly-cap"
              type="number"
              value={budgetSettings.monthlyBudgetCap}
              onChange={(e) => setBudgetSettings({...budgetSettings, monthlyBudgetCap: parseFloat(e.target.value)})}
              className="max-w-xs"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Raccomandazione:</strong> Budget giornaliero tra €{budgetSettings.defaultMinBudget}-{budgetSettings.defaultMaxBudget} per ottimizzare il CPA target di €{alertSettings.cpaThreshold}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alert Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Soglie di Allerta</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Avvisi CPA Elevato</Label>
                <p className="text-sm text-gray-600">Notifica quando il CPA supera la soglia</p>
              </div>
              <Switch
                checked={alertSettings.enableCpaAlerts}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, enableCpaAlerts: checked})}
              />
            </div>

            {alertSettings.enableCpaAlerts && (
              <div>
                <Label htmlFor="cpa-threshold">Soglia CPA (€)</Label>
                <div className="mt-2">
                  <Slider
                    value={[alertSettings.cpaThreshold]}
                    onValueChange={(value) => setAlertSettings({...alertSettings, cpaThreshold: value[0]})}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>€5</span>
                    <span className="font-medium">€{alertSettings.cpaThreshold}</span>
                    <span>€50</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Avvisi Performance Bassa</Label>
                <p className="text-sm text-gray-600">Notifica per campagne sotto-performanti</p>
              </div>
              <Switch
                checked={alertSettings.enablePerformanceAlerts}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, enablePerformanceAlerts: checked})}
              />
            </div>

            {alertSettings.enablePerformanceAlerts && (
              <div>
                <Label>Soglia CTR Minimo (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={alertSettings.lowPerformanceThreshold}
                  onChange={(e) => setAlertSettings({...alertSettings, lowPerformanceThreshold: parseFloat(e.target.value)})}
                  className="max-w-xs"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="budget-exhaustion">Avviso Esaurimento Budget (%)</Label>
            <Input
              id="budget-exhaustion"
              type="number"
              value={alertSettings.budgetExhaustionAlert}
              onChange={(e) => setAlertSettings({...alertSettings, budgetExhaustionAlert: parseInt(e.target.value)})}
              className="max-w-xs"
            />
            <p className="text-sm text-gray-600 mt-1">Notifica quando il budget giornaliero raggiunge questa percentuale</p>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Pause Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Regole Automatiche</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Pausa CPA Elevato</Label>
                <p className="text-sm text-gray-600">Pausa automaticamente campagne con CPA superiore alla soglia</p>
              </div>
              <Switch
                checked={autoRules.autoPauseHighCPA}
                onCheckedChange={(checked) => setAutoRules({...autoRules, autoPauseHighCPA: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Pausa CTR Basso</Label>
                <p className="text-sm text-gray-600">Pausa campagne con CTR sotto la soglia</p>
              </div>
              <Switch
                checked={autoRules.autoPauseLowCTR}
                onCheckedChange={(checked) => setAutoRules({...autoRules, autoPauseLowCTR: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Incremento Performanti</Label>
                <p className="text-sm text-gray-600">Aumenta budget per campagne ad alte prestazioni</p>
              </div>
              <Switch
                checked={autoRules.autoIncreaseGoodPerformers}
                onCheckedChange={(checked) => setAutoRules({...autoRules, autoIncreaseGoodPerformers: checked})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="decrease-limit">Limite Riduzione Budget (%)</Label>
              <Input
                id="decrease-limit"
                type="number"
                value={autoRules.autoDecreaseLimit}
                onChange={(e) => setAutoRules({...autoRules, autoDecreaseLimit: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="increase-limit">Limite Aumento Budget (%)</Label>
              <Input
                id="increase-limit"
                type="number"
                value={autoRules.autoIncreaseLimit}
                onChange={(e) => setAutoRules({...autoRules, autoIncreaseLimit: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>Configurazione A/B Testing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Abilita A/B Testing</Label>
              <p className="text-sm text-gray-600">Crea automaticamente varianti di test per nuove campagne</p>
            </div>
            <Switch
              checked={abTestSettings.enableABTesting}
              onCheckedChange={(checked) => setAbTestSettings({...abTestSettings, enableABTesting: checked})}
            />
          </div>

          {abTestSettings.enableABTesting && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="test-duration">Durata Test (giorni)</Label>
                  <Input
                    id="test-duration"
                    type="number"
                    value={abTestSettings.testDuration}
                    onChange={(e) => setAbTestSettings({...abTestSettings, testDuration: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="sample-size">Dimensione Campione Minima</Label>
                  <Input
                    id="sample-size"
                    type="number"
                    value={abTestSettings.minSampleSize}
                    onChange={(e) => setAbTestSettings({...abTestSettings, minSampleSize: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="significance">Livello Significatività (%)</Label>
                  <Input
                    id="significance"
                    type="number"
                    value={abTestSettings.significanceLevel}
                    onChange={(e) => setAbTestSettings({...abTestSettings, significanceLevel: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Selezione Automatica Vincitore</Label>
                  <p className="text-sm text-gray-600">Seleziona automaticamente la variante migliore al termine del test</p>
                </div>
                <Switch
                  checked={abTestSettings.autoWinner}
                  onCheckedChange={(checked) => setAbTestSettings({...abTestSettings, autoWinner: checked})}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5" />
            <span>Workflow di Approvazione</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Richiedi Approvazione</Label>
              <p className="text-sm text-gray-600">Le nuove campagne richiedono approvazione prima dell'attivazione</p>
            </div>
            <Switch
              checked={approvalWorkflow.requireApproval}
              onCheckedChange={(checked) => setApprovalWorkflow({...approvalWorkflow, requireApproval: checked})}
            />
          </div>

          {approvalWorkflow.requireApproval && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="approval-threshold">Soglia Budget per Approvazione (€)</Label>
                <Input
                  id="approval-threshold"
                  type="number"
                  value={approvalWorkflow.approvalBudgetThreshold}
                  onChange={(e) => setApprovalWorkflow({...approvalWorkflow, approvalBudgetThreshold: parseFloat(e.target.value)})}
                  className="max-w-xs"
                />
                <p className="text-sm text-gray-600 mt-1">Campagne sopra questa soglia richiedono approvazione</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Approvazione Multi-Livello</Label>
                  <p className="text-sm text-gray-600">Budget elevati richiedono approvazioni multiple</p>
                </div>
                <Switch
                  checked={approvalWorkflow.multiLevelApproval}
                  onCheckedChange={(checked) => setApprovalWorkflow({...approvalWorkflow, multiLevelApproval: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Approva Ripetizioni</Label>
                  <p className="text-sm text-gray-600">Approva automaticamente campagne duplicate di quelle già approvate</p>
                </div>
                <Switch
                  checked={approvalWorkflow.autoApproveRepeats}
                  onCheckedChange={(checked) => setApprovalWorkflow({...approvalWorkflow, autoApproveRepeats: checked})}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Annulla</Button>
        <Button>Salva Configurazione</Button>
      </div>
    </div>
  );
};

export default CampaignSettings;
