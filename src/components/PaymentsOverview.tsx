
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Euro, Users, Calendar, TrendingUp } from 'lucide-react';

const PaymentsOverview = () => {
  const monthlyData = [
    { month: 'Gen', amount: 15600, payments: 60 },
    { month: 'Feb', amount: 18200, payments: 70 },
    { month: 'Mar', amount: 21800, payments: 84 },
    { month: 'Apr', amount: 19500, payments: 75 },
    { month: 'Mag', amount: 23400, payments: 90 },
    { month: 'Giu', amount: 26000, payments: 100 }
  ];

  const currentMonthStats = {
    totalTerapisti: 47,
    totalCommission: 26000,
    totalPayments: 100,
    pending: 12,
    sent: 35,
    completed: 45,
    failed: 8,
    nextPaymentDate: '25 Gen 2025'
  };

  const chartConfig = {
    amount: {
      label: "Importo Commissioni",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terapisti Attivi</p>
                <p className="text-2xl font-bold">{currentMonthStats.totalTerapisti}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commissioni Totali</p>
                <p className="text-2xl font-bold">€{currentMonthStats.totalCommission.toLocaleString()}</p>
              </div>
              <Euro className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pagamenti Totali</p>
                <p className="text-2xl font-bold">{currentMonthStats.totalPayments}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prossimo Pagamento</p>
                <p className="text-2xl font-bold">{currentMonthStats.nextPaymentDate}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Stato Pagamenti - Gennaio 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {currentMonthStats.pending}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">In Attesa</p>
            </div>
            <div className="text-center">
              <Badge className="bg-blue-500 text-lg px-4 py-2">
                {currentMonthStats.sent}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Inviati</p>
            </div>
            <div className="text-center">
              <Badge className="bg-green-500 text-lg px-4 py-2">
                {currentMonthStats.completed}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Completati</p>
            </div>
            <div className="text-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                {currentMonthStats.failed}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Falliti</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Commissioni Mensili</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`€${value.toLocaleString()}`, 'Commissioni']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="var(--color-amount)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-amount)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsOverview;
