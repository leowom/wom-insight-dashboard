
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Download, Send, Eye, FileText, Mail } from 'lucide-react';

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    {
      id: 'INV-2025-001',
      terapista: 'Dr. Marco Rossi',
      avatar: '/placeholder.svg',
      amount: 468,
      date: '2025-01-20',
      status: 'sent',
      viewCount: 2,
      downloadCount: 1,
      emailSent: true
    },
    {
      id: 'INV-2025-002',
      terapista: 'Dr.ssa Laura Bianchi',
      avatar: '/placeholder.svg',
      amount: 572,
      date: '2025-01-20',
      status: 'viewed',
      viewCount: 1,
      downloadCount: 0,
      emailSent: true
    },
    {
      id: 'INV-2025-003',
      terapista: 'Dr. Andrea Verdi',
      avatar: '/placeholder.svg',
      amount: 390,
      date: '2025-01-18',
      status: 'generated',
      viewCount: 0,
      downloadCount: 0,
      emailSent: false
    },
    {
      id: 'INV-2025-004',
      terapista: 'Dr.ssa Sofia Neri',
      avatar: '/placeholder.svg',
      amount: 650,
      date: '2025-01-22',
      status: 'paid',
      viewCount: 3,
      downloadCount: 2,
      emailSent: true
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      generated: { label: 'Generata', color: 'bg-gray-500' },
      sent: { label: 'Inviata', color: 'bg-blue-500' },
      viewed: { label: 'Vista', color: 'bg-yellow-500' },
      paid: { label: 'Pagata', color: 'bg-green-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.terapista.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Invoice Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">47</p>
            <p className="text-sm text-gray-600">Fatture Generate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Mail className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold">42</p>
            <p className="text-sm text-gray-600">Fatture Inviate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">38</p>
            <p className="text-sm text-gray-600">Fatture Visualizzate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Download className="h-8 w-8 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">25</p>
            <p className="text-sm text-gray-600">Fatture Scaricate</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Management Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestione Fatture - Gennaio 2025</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cerca fattura o terapista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Genera Fatture in Blocco
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numero Fattura</TableHead>
                <TableHead>Terapista</TableHead>
                <TableHead>Importo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Visualizzazioni</TableHead>
                <TableHead>Download</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-mono text-sm">{invoice.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={invoice.avatar} />
                        <AvatarFallback>
                          {invoice.terapista.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{invoice.terapista}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-green-600">
                      €{invoice.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString('it-IT')}
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="font-medium">{invoice.viewCount}</span>
                      {invoice.viewCount > 0 && (
                        <Eye className="h-4 w-4 text-blue-500 inline ml-1" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="font-medium">{invoice.downloadCount}</span>
                      {invoice.downloadCount > 0 && (
                        <Download className="h-4 w-4 text-green-500 inline ml-1" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      {!invoice.emailSent && (
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Template Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Impostazioni Template Fattura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Informazioni Aziendali</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Ragione Sociale</label>
                  <p className="font-medium">Psicologia Online Italia S.r.l.</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Partita IVA</label>
                  <p className="font-medium">IT12345678901</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Codice Fiscale</label>
                  <p className="font-medium">12345678901</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Indirizzo</label>
                  <p className="font-medium">Via Roma 123, 20121 Milano (MI)</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Impostazioni Fattura</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Numerazione</label>
                  <p className="font-medium">Automatica (ANNO-NUMERO)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Valuta</label>
                  <p className="font-medium">Euro (€)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">IVA</label>
                  <p className="font-medium">22% (Applicata automaticamente)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Termini di Pagamento</label>
                  <p className="font-medium">30 giorni data fattura</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-4 border-t">
            <Button variant="outline">Modifica Template</Button>
            <Button variant="outline">Anteprima Fattura</Button>
            <Button variant="outline">Esporta Dati</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceManagement;
