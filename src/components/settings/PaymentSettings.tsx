
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, Euro, FileText, Calendar, Percent } from 'lucide-react';

const PaymentSettings = () => {
  const [commissionSettings, setCommissionSettings] = useState({
    percentage: 40,
    averageVisitAmount: 65,
    minimumPayout: 100,
    currency: 'EUR'
  });

  const [paymentMethods, setPaymentMethods] = useState({
    revolutEnabled: true,
    revolutApiKey: '••••••••••••••••',
    stripeEnabled: true,
    stripeSecretKey: '••••••••••••••••',
    stripePublishableKey: '••••••••••••••••'
  });

  const [scheduleSettings, setScheduleSettings] = useState({
    paymentDay: 25,
    autoProcess: true,
    notifyBeforePayment: true,
    notificationDays: 3
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    autoGenerate: true,
    templateStyle: 'professional',
    includeVAT: true,
    vatRate: 22,
    companyDetails: 'WOM Consulting S.r.l.\nVia Roma 123, Milano\nP.IVA: 12345678901'
  });

  const [taxSettings, setTaxSettings] = useState({
    withholdingTax: false,
    withholdingRate: 20,
    vatExempt: false,
    fiscalRegime: 'ordinario'
  });

  return (
    <div className="space-y-6">
      {/* Commission Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Percent className="h-5 w-5" />
            <span>Impostazioni Commissioni</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="commission-percentage">Percentuale Commissione (%)</Label>
              <Input
                id="commission-percentage"
                type="number"
                value={commissionSettings.percentage}
                onChange={(e) => setCommissionSettings({...commissionSettings, percentage: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="average-visit">Importo Medio Visita (€)</Label>
              <Input
                id="average-visit"
                type="number"
                value={commissionSettings.averageVisitAmount}
                onChange={(e) => setCommissionSettings({...commissionSettings, averageVisitAmount: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="minimum-payout">Pagamento Minimo (€)</Label>
              <Input
                id="minimum-payout"
                type="number"
                value={commissionSettings.minimumPayout}
                onChange={(e) => setCommissionSettings({...commissionSettings, minimumPayout: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label>Valuta</Label>
              <Select value={commissionSettings.currency} onValueChange={(value) => setCommissionSettings({...commissionSettings, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollaro ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Calcolo automatico:</strong> {commissionSettings.percentage}% di €{commissionSettings.averageVisitAmount} = €{(commissionSettings.averageVisitAmount * commissionSettings.percentage / 100).toFixed(2)} per paziente convertito
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Metodi di Pagamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Revolut Business</Label>
                <p className="text-sm text-gray-600">Abilita pagamenti tramite Revolut API</p>
              </div>
              <Switch
                checked={paymentMethods.revolutEnabled}
                onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, revolutEnabled: checked})}
              />
            </div>

            {paymentMethods.revolutEnabled && (
              <div>
                <Label htmlFor="revolut-key">Revolut API Key</Label>
                <Input
                  id="revolut-key"
                  type="password"
                  value={paymentMethods.revolutApiKey}
                  onChange={(e) => setPaymentMethods({...paymentMethods, revolutApiKey: e.target.value})}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Stripe Connect</Label>
                <p className="text-sm text-gray-600">Abilita pagamenti tramite Stripe</p>
              </div>
              <Switch
                checked={paymentMethods.stripeEnabled}
                onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, stripeEnabled: checked})}
              />
            </div>

            {paymentMethods.stripeEnabled && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                  <Input
                    id="stripe-secret"
                    type="password"
                    value={paymentMethods.stripeSecretKey}
                    onChange={(e) => setPaymentMethods({...paymentMethods, stripeSecretKey: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="stripe-publishable">Stripe Publishable Key</Label>
                  <Input
                    id="stripe-publishable"
                    type="password"
                    value={paymentMethods.stripePublishableKey}
                    onChange={(e) => setPaymentMethods({...paymentMethods, stripePublishableKey: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Programmazione Pagamenti</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payment-day">Giorno del Mese per Pagamenti</Label>
              <Select value={scheduleSettings.paymentDay.toString()} onValueChange={(value) => setScheduleSettings({...scheduleSettings, paymentDay: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 28}, (_, i) => i + 1).map(day => (
                    <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notification-days">Giorni Preavviso Notifiche</Label>
              <Input
                id="notification-days"
                type="number"
                value={scheduleSettings.notificationDays}
                onChange={(e) => setScheduleSettings({...scheduleSettings, notificationDays: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Elaborazione Automatica</Label>
                <p className="text-sm text-gray-600">Processa automaticamente i pagamenti nella data programmata</p>
              </div>
              <Switch
                checked={scheduleSettings.autoProcess}
                onCheckedChange={(checked) => setScheduleSettings({...scheduleSettings, autoProcess: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notifiche Pre-Pagamento</Label>
                <p className="text-sm text-gray-600">Invia notifiche ai terapisti prima dell'elaborazione</p>
              </div>
              <Switch
                checked={scheduleSettings.notifyBeforePayment}
                onCheckedChange={(checked) => setScheduleSettings({...scheduleSettings, notifyBeforePayment: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Impostazioni Fatture</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Generazione Automatica Fatture</Label>
              <p className="text-sm text-gray-600">Genera automaticamente fatture per ogni pagamento</p>
            </div>
            <Switch
              checked={invoiceSettings.autoGenerate}
              onCheckedChange={(checked) => setInvoiceSettings({...invoiceSettings, autoGenerate: checked})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Stile Template</Label>
              <Select value={invoiceSettings.templateStyle} onValueChange={(value) => setInvoiceSettings({...invoiceSettings, templateStyle: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professionale</SelectItem>
                  <SelectItem value="modern">Moderno</SelectItem>
                  <SelectItem value="classic">Classico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="vat-rate">Aliquota IVA (%)</Label>
              <Input
                id="vat-rate"
                type="number"
                value={invoiceSettings.vatRate}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, vatRate: parseFloat(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company-details">Dettagli Azienda per Fatture</Label>
            <Textarea
              id="company-details"
              value={invoiceSettings.companyDetails}
              onChange={(e) => setInvoiceSettings({...invoiceSettings, companyDetails: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Includi IVA</Label>
              <p className="text-sm text-gray-600">Aggiungi IVA alle fatture generate</p>
            </div>
            <Switch
              checked={invoiceSettings.includeVAT}
              onCheckedChange={(checked) => setInvoiceSettings({...invoiceSettings, includeVAT: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Impostazioni Fiscali</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Regime Fiscale</Label>
              <Select value={taxSettings.fiscalRegime} onValueChange={(value) => setTaxSettings({...taxSettings, fiscalRegime: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ordinario">Ordinario</SelectItem>
                  <SelectItem value="forfettario">Forfettario</SelectItem>
                  <SelectItem value="semplificato">Semplificato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="withholding-rate">Aliquota Ritenuta (%)</Label>
              <Input
                id="withholding-rate"
                type="number"
                value={taxSettings.withholdingRate}
                onChange={(e) => setTaxSettings({...taxSettings, withholdingRate: parseFloat(e.target.value)})}
                disabled={!taxSettings.withholdingTax}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Ritenuta d'Acconto</Label>
                <p className="text-sm text-gray-600">Applica ritenuta d'acconto sui pagamenti</p>
              </div>
              <Switch
                checked={taxSettings.withholdingTax}
                onCheckedChange={(checked) => setTaxSettings({...taxSettings, withholdingTax: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Esenzione IVA</Label>
                <p className="text-sm text-gray-600">I terapisti sono esenti da IVA</p>
              </div>
              <Switch
                checked={taxSettings.vatExempt}
                onCheckedChange={(checked) => setTaxSettings({...taxSettings, vatExempt: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Annulla</Button>
        <Button>Salva Impostazioni</Button>
      </div>
    </div>
  );
};

export default PaymentSettings;
