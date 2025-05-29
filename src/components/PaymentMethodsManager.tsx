
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smartphone, CreditCard, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const PaymentMethodsManager = () => {
  const revolutAccount = {
    status: 'connected',
    balance: 15420.50,
    currency: 'EUR',
    lastSync: '2025-01-20 14:30',
    transactionsToday: 15,
    monthlyLimit: 50000,
    used: 26015
  };

  const stripeAccount = {
    status: 'connected',
    balance: 8350.25,
    currency: 'EUR',
    lastSync: '2025-01-20 14:28',
    transactionsToday: 8,
    processingFees: 2.9,
    nextPayout: '2025-01-22'
  };

  const recentTransactions = [
    { id: '1', method: 'revolut', amount: 468, recipient: 'Dr. Marco Rossi', status: 'completed', time: '14:25' },
    { id: '2', method: 'stripe', amount: 572, recipient: 'Dr.ssa Laura Bianchi', status: 'processing', time: '13:45' },
    { id: '3', method: 'revolut', amount: 390, recipient: 'Dr. Andrea Verdi', status: 'completed', time: '12:30' },
    { id: '4', method: 'stripe', amount: 650, recipient: 'Dr.ssa Sofia Neri', status: 'failed', time: '11:15' }
  ];

  return (
    <div className="space-y-6">
      {/* Account Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revolut Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Smartphone className="h-6 w-6 text-purple-600" />
              <span>Revolut Business</span>
              <Badge className="bg-green-500">Connesso</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Saldo Disponibile</span>
                <span className="text-2xl font-bold text-green-600">
                  €{revolutAccount.balance.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Limite Mensile</span>
                <span className="text-sm">
                  €{revolutAccount.used.toLocaleString()} / €{revolutAccount.monthlyLimit.toLocaleString()}
                </span>
              </div>
              <Progress value={(revolutAccount.used / revolutAccount.monthlyLimit) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Transazioni Oggi</p>
                <p className="font-medium">{revolutAccount.transactionsToday}</p>
              </div>
              <div>
                <p className="text-gray-600">Ultimo Aggiornamento</p>
                <p className="font-medium">{revolutAccount.lastSync}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Aggiorna
              </Button>
              <Button size="sm" variant="outline">
                Visualizza Transazioni
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stripe Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <span>Stripe Connect</span>
              <Badge className="bg-green-500">Connesso</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Saldo Disponibile</span>
                <span className="text-2xl font-bold text-green-600">
                  €{stripeAccount.balance.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Commissione</p>
                <p className="font-medium">{stripeAccount.processingFees}% + €0.25</p>
              </div>
              <div>
                <p className="text-gray-600">Prossimo Pagamento</p>
                <p className="font-medium">{stripeAccount.nextPayout}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Transazioni Oggi</p>
                <p className="font-medium">{stripeAccount.transactionsToday}</p>
              </div>
              <div>
                <p className="text-gray-600">Ultimo Aggiornamento</p>
                <p className="font-medium">{stripeAccount.lastSync}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Aggiorna
              </Button>
              <Button size="sm" variant="outline">
                Dashboard Stripe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transazioni Recenti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {transaction.method === 'revolut' ? (
                    <Smartphone className="h-5 w-5 text-purple-600" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.recipient}</p>
                    <p className="text-sm text-gray-600">
                      {transaction.method === 'revolut' ? 'Revolut' : 'Stripe'} • {transaction.time}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold">€{transaction.amount}</p>
                  <div className="flex items-center space-x-2">
                    {transaction.status === 'completed' && (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge className="bg-green-500">Completato</Badge>
                      </>
                    )}
                    {transaction.status === 'processing' && (
                      <>
                        <RefreshCw className="h-4 w-4 text-blue-500" />
                        <Badge className="bg-blue-500">In Elaborazione</Badge>
                      </>
                    )}
                    {transaction.status === 'failed' && (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <Badge variant="destructive">Fallito</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Rules & Automation */}
      <Card>
        <CardHeader>
          <CardTitle>Regole di Pagamento Automatiche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Elaborazione Mensile Automatica</p>
                <p className="text-sm text-gray-600">Processa tutti i pagamenti il 25 di ogni mese</p>
              </div>
              <Badge className="bg-green-500">Attivo</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Soglia Minima Pagamento</p>
                <p className="text-sm text-gray-600">Elabora solo pagamenti superiori a €100</p>
              </div>
              <Badge className="bg-green-500">Attivo</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Preferenza Metodo Pagamento</p>
                <p className="text-sm text-gray-600">Revolut per importi maggiori di €500, Stripe per il resto</p>
              </div>
              <Badge className="bg-green-500">Attivo</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Retry Automatico</p>
                <p className="text-sm text-gray-600">Riprova pagamenti falliti dopo 24 ore (max 3 tentativi)</p>
              </div>
              <Badge className="bg-green-500">Attivo</Badge>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6 pt-4 border-t">
            <Button variant="outline">Configura Regole</Button>
            <Button variant="outline">Visualizza Log</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodsManager;
