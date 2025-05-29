
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, MessageSquare, Users, Target } from 'lucide-react';

const WhatsAppAnalytics = () => {
  const hourlyData = [
    { hour: '08:00', messages: 45 },
    { hour: '09:00', messages: 89 },
    { hour: '10:00', messages: 156 },
    { hour: '11:00', messages: 134 },
    { hour: '12:00', messages: 98 },
    { hour: '13:00', messages: 67 },
    { hour: '14:00', messages: 145 },
    { hour: '15:00', messages: 189 },
    { hour: '16:00', messages: 167 },
    { hour: '17:00', messages: 145 },
    { hour: '18:00', messages: 98 },
    { hour: '19:00', messages: 56 }
  ];

  const messageTypeData = [
    { type: 'Promemoria', count: 456, color: '#3b82f6' },
    { type: 'Nurturing', count: 234, color: '#10b981' },
    { type: 'Conferme', count: 189, color: '#f59e0b' },
    { type: 'Pagamenti', count: 98, color: '#ef4444' },
    { type: 'Personalizzati', count: 67, color: '#8b5cf6' }
  ];

  const deliveryRates = [
    { type: 'Promemoria 24h', delivered: 98.5, failed: 1.5 },
    { type: 'Promemoria 2h', delivered: 97.2, failed: 2.8 },
    { type: 'Nurturing G1', delivered: 96.8, failed: 3.2 },
    { type: 'Nurturing G3', delivered: 95.4, failed: 4.6 },
    { type: 'Conferme', delivered: 99.1, failed: 0.9 }
  ];

  const chartConfig = {
    messages: {
      label: "Messaggi",
      color: "#3b82f6",
    },
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messaggi Questa Settimana</p>
                <p className="text-2xl font-bold">18,456</p>
                <p className="text-xs text-green-600">+12.5% vs settimana scorsa</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso di Consegna</p>
                <p className="text-2xl font-bold">97.8%</p>
                <p className="text-xs text-green-600">+0.3% vs settimana scorsa</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso di Risposta</p>
                <p className="text-2xl font-bold">23.4%</p>
                <p className="text-xs text-green-600">+5.2% vs settimana scorsa</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Account Rate Limited</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-red-600">-2 vs ieri</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Oraria Messaggi</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="messages" fill="var(--color-messages)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Message Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione per Tipo Messaggio</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={messageTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                >
                  {messageTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Rates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tassi di Consegna per Tipo Messaggio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveryRates.map((rate, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{rate.type}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{rate.delivered}% Consegnati</p>
                    <p className="text-xs text-red-600">{rate.failed}% Falliti</p>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${rate.delivered}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppAnalytics;
