
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Download, Send, CreditCard, FileText, Euro } from 'lucide-react';

interface PaymentDetailModalProps {
  terapista: any;
  onClose: () => void;
}

const PaymentDetailModal = ({ terapista, onClose }: PaymentDetailModalProps) => {
  const monthlyHistory = [
    { month: 'Ago', patients: 15, commission: 390 },
    { month: 'Set', patients: 18, commission: 468 },
    { month: 'Ott', patients: 22, commission: 572 },
    { month: 'Nov', patients: 20, commission: 520 },
    { month: 'Dic', patients: 25, commission: 650 },
    { month: 'Gen', patients: 18, commission: 468 }
  ];

  const currentMonthPatients = [
    { date: '2025-01-03', patient: 'Mario Rossi', amount: 26, status: 'converted' },
    { date: '2025-01-05', patient: 'Laura Bianchi', amount: 26, status: 'converted' },
    { date: '2025-01-08', patient: 'Andrea Verdi', amount: 26, status: 'converted' },
    { date: '2025-01-10', patient: 'Sofia Neri', amount: 26, status: 'converted' },
    { date: '2025-01-12', patient: 'Marco Blu', amount: 26, status: 'converted' },
    { date: '2025-01-15', patient: 'Elena Gialli', amount: 26, status: 'converted' },
    { date: '2025-01-18', patient: 'Giuseppe Verde', amount: 26, status: 'converted' },
    { date: '2025-01-20', patient: 'Francesca Rosa', amount: 26, status: 'converted' }
  ];

  const chartConfig = {
    commission: {
      label: "Commissione",
      color: "#10B981",
    },
    patients: {
      label: "Pazienti",
      color: "#3B82F6",
    },
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={terapista.avatar} />
              <AvatarFallback>{terapista.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{terapista.name}</h2>
              <p className="text-gray-600">{terapista.specialty}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Month Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Euro className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold text-green-600">€{terapista.commission}</p>
                <p className="text-sm text-gray-600">Commissione Gennaio</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{terapista.patientsConverted}</div>
                <p className="text-sm text-gray-600">Pazienti Convertiti</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">40%</div>
                <p className="text-sm text-gray-600">Percentuale Commissione</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">€65</div>
                <p className="text-sm text-gray-600">Ricavo Medio per Paziente</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment History Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Commissioni (Ultimi 6 Mesi)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => {
                        if (name === 'commission') return [`€${value}`, 'Commissione'];
                        if (name === 'patients') return [`${value}`, 'Pazienti'];
                        return [value, name];
                      }}
                    />
                    <Bar dataKey="commission" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Line 
                      type="monotone" 
                      dataKey="commission" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#3B82F6" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Current Month Patients */}
          <Card>
            <CardHeader>
              <CardTitle>Dettaglio Pazienti - Gennaio 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Paziente</TableHead>
                    <TableHead>Commissione</TableHead>
                    <TableHead>Stato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMonthPatients.map((patient, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(patient.date).toLocaleDateString('it-IT')}</TableCell>
                      <TableCell>{patient.patient}</TableCell>
                      <TableCell className="font-medium text-green-600">€{patient.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Convertito</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Payment Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Azioni Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Metodo di Pagamento Preferito</h4>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span className="capitalize">{terapista.paymentMethod}</span>
                    <Badge variant="outline">Attivo</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Stato Fattura</h4>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Fattura #{new Date().getFullYear()}-001-{terapista.id}</span>
                    <Badge className="bg-blue-500">Generata</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6 pt-4 border-t">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Invia Pagamento
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Scarica Fattura
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Invia Fattura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailModal;
