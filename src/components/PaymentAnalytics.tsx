
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Target, Users } from 'lucide-react';

const PaymentAnalytics = () => {
  const completionRateData = [
    { month: 'Lug', rate: 92 },
    { month: 'Ago', rate: 89 },
    { month: 'Set', rate: 95 },
    { month: 'Ott', rate: 88 },
    { month: 'Nov', rate: 93 },
    { month: 'Dic', rate: 96 }
  ];

  const paymentMethodData = [
    { method: 'Revolut', count: 28, percentage: 60 },
    { method: 'Stripe', count: 19, percentage: 40 }
  ];

  const terapistaPerformance = [
    { name: 'Dr. Rossi', commission: 2340, patients: 90 },
    { name: 'Dr.ssa Bianchi', commission: 2080, patients: 80 },
    { name: 'Dr. Verdi', commission: 1950, patients: 75 },
    { name: 'Dr.ssa Neri', commission: 1820, patients: 70 }
  ];

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const chartConfig = {
    rate: { label: "Tasso Completamento", color: "hsl(var(--chart-1))" },
    commission: { label: "Commissione", color: "hsl(var(--chart-2))" }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso Completamento</p>
                <p className="text-2xl font-bold text-green-600">94.5%</p>
                <p className="text-xs text-green-600">+2.1% vs mese scorso</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Medio Pagamento</p>
                <p className="text-2xl font-bold">2.3 giorni</p>
                <p className="text-xs text-green-600">-0.5 giorni vs mese scorso</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commissione Media</p>
                <p className="text-2xl font-bold">€553</p>
                <p className="text-xs text-green-600">+€23 vs mese scorso</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terapisti Attivi</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-gray-600">su 50 totali</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Completion Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Tasso di Completamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionRateData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value}%`, 'Tasso Completamento']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="var(--color-rate)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-rate)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Metodi di Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ method, percentage }) => `${method} ${percentage}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value} pagamenti`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers - Commissioni Annuali</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={terapistaPerformance} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`€${value}`, 'Commissione Annuale']}
                />
                <Bar dataKey="commission" fill="var(--color-commission)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Riepilogo Mensile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Pagamenti Gennaio 2025</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Totale elaborati:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span>Completati con successo:</span>
                  <span className="font-medium text-green-600">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Falliti/In elaborazione:</span>
                  <span className="font-medium text-red-600">2</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Importi</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Totale commissioni:</span>
                  <span className="font-medium">€26,015</span>
                </div>
                <div className="flex justify-between">
                  <span>Commissione media:</span>
                  <span className="font-medium">€553</span>
                </div>
                <div className="flex justify-between">
                  <span>Commissione più alta:</span>
                  <span className="font-medium text-green-600">€832</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Tempi</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Tempo medio elaborazione:</span>
                  <span className="font-medium">2.3 giorni</span>
                </div>
                <div className="flex justify-between">
                  <span>Pagamento più veloce:</span>
                  <span className="font-medium text-green-600">1 giorno</span>
                </div>
                <div className="flex justify-between">
                  <span>Pagamento più lento:</span>
                  <span className="font-medium text-red-600">5 giorni</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentAnalytics;
