
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Download, Send, Eye, MoreHorizontal } from 'lucide-react';

interface TerapistiPaymentsTableProps {
  onTerapistaSelect: (terapista: any) => void;
  selectedPayments: string[];
  onPaymentSelect: (payments: string[]) => void;
  onBulkProcess: () => void;
}

const TerapistiPaymentsTable = ({ 
  onTerapistaSelect, 
  selectedPayments, 
  onPaymentSelect, 
  onBulkProcess 
}: TerapistiPaymentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const payments = [
    {
      id: '1',
      name: 'Dr. Marco Rossi',
      avatar: '/placeholder.svg',
      specialty: 'Psicologia Clinica',
      patientsConverted: 18,
      commission: 468, // 18 × 26
      status: 'pending',
      paymentMethod: 'revolut',
      paymentDate: '2025-01-25',
      invoiceStatus: 'generated'
    },
    {
      id: '2',
      name: 'Dr.ssa Laura Bianchi',
      avatar: '/placeholder.svg',
      specialty: 'Terapia Cognitiva',
      patientsConverted: 22,
      commission: 572, // 22 × 26
      status: 'sent',
      paymentMethod: 'stripe',
      paymentDate: '2025-01-20',
      invoiceStatus: 'sent'
    },
    {
      id: '3',
      name: 'Dr. Andrea Verdi',
      avatar: '/placeholder.svg',
      specialty: 'Psicoterapia',
      patientsConverted: 15,
      commission: 390, // 15 × 26
      status: 'completed',
      paymentMethod: 'revolut',
      paymentDate: '2025-01-18',
      invoiceStatus: 'viewed'
    },
    {
      id: '4',
      name: 'Dr.ssa Sofia Neri',
      avatar: '/placeholder.svg',
      specialty: 'Terapia Familiare',
      patientsConverted: 25,
      commission: 650, // 25 × 26
      status: 'failed',
      paymentMethod: 'stripe',
      paymentDate: '2025-01-22',
      invoiceStatus: 'generated'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'In Attesa', variant: 'secondary' as const },
      sent: { label: 'Inviato', variant: 'default' as const },
      completed: { label: 'Completato', variant: 'default' as const },
      failed: { label: 'Fallito', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={
        status === 'completed' ? 'bg-green-500' :
        status === 'sent' ? 'bg-blue-500' : ''
      }>
        {config.label}
      </Badge>
    );
  };

  const getInvoiceStatusBadge = (status: string) => {
    const statusConfig = {
      generated: { label: 'Generata', color: 'bg-gray-500' },
      sent: { label: 'Inviata', color: 'bg-blue-500' },
      viewed: { label: 'Vista', color: 'bg-green-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredPayments = payments.filter(payment =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onPaymentSelect(filteredPayments.map(p => p.id));
    } else {
      onPaymentSelect([]);
    }
  };

  const handleSelectPayment = (paymentId: string, checked: boolean) => {
    if (checked) {
      onPaymentSelect([...selectedPayments, paymentId]);
    } else {
      onPaymentSelect(selectedPayments.filter(id => id !== paymentId));
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pagamenti Terapisti - Gennaio 2025</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cerca terapista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            {selectedPayments.length > 0 && (
              <Button onClick={onBulkProcess} className="bg-green-600 hover:bg-green-700">
                Elabora {selectedPayments.length} Pagamenti
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedPayments.length === filteredPayments.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Terapista</TableHead>
              <TableHead>Pazienti Convertiti</TableHead>
              <TableHead>Commissione</TableHead>
              <TableHead>Stato Pagamento</TableHead>
              <TableHead>Metodo</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Fattura</TableHead>
              <TableHead>Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedPayments.includes(payment.id)}
                    onCheckedChange={(checked) => handleSelectPayment(payment.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={payment.avatar} />
                      <AvatarFallback>{payment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-sm text-gray-500">{payment.specialty}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <span className="font-bold text-lg">{payment.patientsConverted}</span>
                    <p className="text-xs text-gray-500">pazienti</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-green-600">
                    €{payment.commission.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {payment.patientsConverted} × €26
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {payment.paymentMethod}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(payment.paymentDate).toLocaleDateString('it-IT')}</TableCell>
                <TableCell>{getInvoiceStatusBadge(payment.invoiceStatus)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onTerapistaSelect(payment)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TerapistiPaymentsTable;
