
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentsOverview from './PaymentsOverview';
import TerapistiPaymentsTable from './TerapistiPaymentsTable';
import BulkPaymentProcessor from './BulkPaymentProcessor';
import PaymentDetailModal from './PaymentDetailModal';
import PaymentAnalytics from './PaymentAnalytics';
import PaymentMethodsManager from './PaymentMethodsManager';
import InvoiceManagement from './InvoiceManagement';

const PaymentsManagement = () => {
  const [selectedTerapista, setSelectedTerapista] = useState<any>(null);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [showBulkProcessor, setShowBulkProcessor] = useState(false);

  return (
    <div className="space-y-6">
      <PaymentsOverview />

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="payments">Pagamenti</TabsTrigger>
          <TabsTrigger value="bulk">Elaborazione Bulk</TabsTrigger>
          <TabsTrigger value="invoices">Fatture</TabsTrigger>
          <TabsTrigger value="methods">Metodi Pagamento</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <TerapistiPaymentsTable 
            onTerapistaSelect={setSelectedTerapista}
            selectedPayments={selectedPayments}
            onPaymentSelect={setSelectedPayments}
            onBulkProcess={() => setShowBulkProcessor(true)}
          />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkPaymentProcessor 
            selectedPayments={selectedPayments}
            onComplete={() => setShowBulkProcessor(false)}
          />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoiceManagement />
        </TabsContent>

        <TabsContent value="methods">
          <PaymentMethodsManager />
        </TabsContent>

        <TabsContent value="analytics">
          <PaymentAnalytics />
        </TabsContent>
      </Tabs>

      {selectedTerapista && (
        <PaymentDetailModal 
          terapista={selectedTerapista}
          onClose={() => setSelectedTerapista(null)}
        />
      )}
    </div>
  );
};

export default PaymentsManagement;
