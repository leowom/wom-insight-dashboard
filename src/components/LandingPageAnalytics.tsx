
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Users, MousePointer, Calendar } from 'lucide-react';

const LandingPageAnalytics = () => {
  const [selectedPage, setSelectedPage] = useState('marco-rossi');
  const [timeRange, setTimeRange] = useState('30d');

  const trafficData = [
    { date: '1 Gen', visits: 45, submissions: 3 },
    { date: '2 Gen', visits: 52, submissions: 4 },
    { date: '3 Gen', visits: 38, submissions: 2 },
    { date: '4 Gen', visits: 65, submissions: 6 },
    { date: '5 Gen', visits: 71, submissions: 5 },
    { date: '6 Gen', visits: 58, submissions: 4 },
    { date: '7 Gen', visits: 82, submissions: 8 }
  ];

  const sourceData = [
    { name: 'Google Ads', value: 45, color: '#4285F4' },
    { name: 'Facebook Ads', value: 30, color: '#1877F2' },
    { name: 'Organico', value: 15, color: '#34A853' },
    { name: 'Diretto', value: 10, color: '#EA4335' }
  ];

  const conversionFunnel = [
    { stage: 'Visite', count: 1247, percentage: 100 },
    { stage: 'Scroll 50%', count: 936, percentage: 75 },
    { stage: 'Form View', count: 374, percentage: 30 },
    { stage: 'Form Start', count: 149, percentage: 12 },
    { stage: 'Submission', count: 89, percentage: 7.1 }
  ];

  const pages = [
    { id: 'marco-rossi', name: 'Dr. Marco Rossi - Fisioterapia' },
    { id: 'anna-bianchi', name: 'Dr.ssa Anna Bianchi - Osteopatia' },
    { id: 'giuseppe-verde', name: 'Dr. Giuseppe Verde - Massoterapia' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitora le performance delle tue landing pages</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="border rounded px-3 py-2"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            {pages.map(page => (
              <option key={page.id} value={page.id}>{page.name}</option>
            ))}
          </select>
          <select 
            className="border rounded px-3 py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Ultimi 7 giorni</option>
            <option value="30d">Ultimi 30 giorni</option>
            <option value="90d">Ultimi 90 giorni</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visite Totali</p>
                <p className="text-2xl font-bold">1,247</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12%
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Form Inviati</p>
                <p className="text-2xl font-bold">89</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8%
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasso Conversione</p>
                <p className="text-2xl font-bold">7.1%</p>
                <div className="flex items-center text-red-600 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -2%
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <MousePointer className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Medio</p>
                <p className="text-2xl font-bold">2:34</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15s
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList>
          <TabsTrigger value="traffic">Traffico</TabsTrigger>
          <TabsTrigger value="conversions">Conversioni</TabsTrigger>
          <TabsTrigger value="sources">Sorgenti</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Traffico</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funnel di Conversione</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium">{stage.stage}</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-6 relative">
                        <div 
                          className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${stage.percentage}%` }}
                        >
                          <span className="text-white text-xs font-medium">
                            {stage.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm font-medium">
                      {stage.count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sorgenti di Traffico</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance per Sorgente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourceData.map((source) => (
                    <div key={source.name} className="flex justify-between items-center p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{source.value}%</div>
                        <div className="text-sm text-gray-600">traffico</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Heatmap Interazioni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-4">Heatmap della pagina landing</p>
                <div className="bg-white border-2 border-dashed border-gray-300 h-96 flex items-center justify-center">
                  <p className="text-gray-500">Visualizzazione heatmap qui</p>
                </div>
                <div className="mt-4 flex justify-center gap-4">
                  <Button variant="outline">Clicks</Button>
                  <Button variant="outline">Scroll</Button>
                  <Button variant="outline">Move</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPageAnalytics;
