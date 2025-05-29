
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Download } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, Area, AreaChart } from 'recharts';

const CampaignAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock analytics data
  const performanceComparisonData = [
    { date: '1 Nov', drRossi: 12, drBianchi: 8, drVerdi: 15, drNeri: 6 },
    { date: '5 Nov', drRossi: 18, drBianchi: 12, drVerdi: 22, drNeri: 9 },
    { date: '10 Nov', drRossi: 24, drBianchi: 16, drVerdi: 18, drNeri: 14 },
    { date: '15 Nov', drRossi: 32, drBianchi: 22, drVerdi: 28, drNeri: 18 },
    { date: '20 Nov', drRossi: 28, drBianchi: 19, drVerdi: 25, drNeri: 22 },
    { date: '25 Nov', drRossi: 35, drBianchi: 28, drVerdi: 32, drNeri: 26 },
    { date: '30 Nov', drRossi: 42, drBianchi: 34, drVerdi: 38, drNeri: 30 }
  ];

  const audienceInsightsData = [
    { name: '25-34', value: 35, spend: 1250, leads: 28, color: '#8884d8' },
    { name: '35-44', value: 30, spend: 1100, leads: 24, color: '#82ca9d' },
    { name: '45-54', value: 20, spend: 850, leads: 16, color: '#ffc658' },
    { name: '55-64', value: 15, spend: 620, leads: 12, color: '#ff7300' }
  ];

  const creativePerformanceData = [
    { name: 'Video A', ctr: 2.8, leads: 45, spend: 380 },
    { name: 'Video B', ctr: 2.1, leads: 32, spend: 420 },
    { name: 'Immagine C', ctr: 1.9, leads: 28, spend: 350 },
    { name: 'Video D', ctr: 3.2, leads: 52, spend: 480 },
    { name: 'Immagine E', ctr: 1.6, leads: 22, spend: 290 }
  ];

  const roiBySpecializationData = [
    { specialization: 'Fisioterapia', spend: 2500, revenue: 12500, roi: 4.0, campaigns: 8 },
    { specialization: 'Osteopatia', spend: 1800, revenue: 7200, roi: 3.0, campaigns: 5 },
    { specialization: 'Massoterapia', spend: 1200, revenue: 6000, roi: 4.0, campaigns: 4 },
    { specialization: 'Chiropratica', spend: 900, revenue: 3600, roi: 3.0, campaigns: 3 }
  ];

  const monthlyReportData = [
    { month: 'Ago', spend: 3200, leads: 145, revenue: 14500 },
    { month: 'Set', spend: 3800, leads: 168, revenue: 16800 },
    { month: 'Ott', spend: 4200, leads: 186, revenue: 18600 },
    { month: 'Nov', spend: 4800, leads: 212, revenue: 21200 }
  ];

  const topAudienceSegments = [
    { name: 'Donne 35-44, Milano, Salute', leads: 48, cpa: 8.50, roas: 4.2 },
    { name: 'Uomini 25-34, Roma, Sport', leads: 42, cpa: 9.20, roas: 3.8 },
    { name: 'Donne 45-54, Torino, Benessere', leads: 36, cpa: 7.80, roas: 4.5 },
    { name: 'Uomini 35-44, Napoli, Riabilitazione', leads: 32, cpa: 10.50, roas: 3.2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics Campagne</h2>
          <p className="text-gray-600">Insights e performance dettagliate</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex gap-1">
            {['7d', '30d', '90d'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Esporta Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
          <TabsTrigger value="audience">Audience Insights</TabsTrigger>
          <TabsTrigger value="creative">Creative Performance</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="reports">Monthly Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Campaign Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Confronto Performance Campagne (Lead Generati)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  drRossi: { label: "Dr. Rossi", color: "#8884d8" },
                  drBianchi: { label: "Dr. Bianchi", color: "#82ca9d" },
                  drVerdi: { label: "Dr. Verdi", color: "#ffc658" },
                  drNeri: { label: "Dr. Neri", color: "#ff7300" }
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceComparisonData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="drRossi" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="drBianchi" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="drVerdi" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="drNeri" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Top Performer (Lead)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <img src="/placeholder.svg" alt="Dr. Rossi" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-bold">Dr. Mario Rossi</div>
                    <div className="text-sm text-gray-500">42 lead questo mese</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+25%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Miglior CPA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <img src="/placeholder.svg" alt="Dr. Verdi" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-bold">Dr. Giuseppe Verdi</div>
                    <div className="text-sm text-gray-500">€6.90 CPA medio</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Top</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Miglior ROAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <img src="/placeholder.svg" alt="Dr. Bianchi" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-bold">Dr. Anna Bianchi</div>
                    <div className="text-sm text-gray-500">4.8x ROAS</div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Best</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Performance per Età
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Percentuale", color: "#8884d8" }
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceInsightsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {audienceInsightsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Audience Segments */}
            <Card>
              <CardHeader>
                <CardTitle>Segmenti Top Performing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAudienceSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{segment.name}</div>
                        <div className="text-xs text-gray-500">{segment.leads} lead generati</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">€{segment.cpa}</div>
                        <div className="text-xs text-green-600">{segment.roas}x ROAS</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audience Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Dettagliata per Fascia d'Età</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Fascia d'Età</th>
                      <th className="text-right p-2">Spesa</th>
                      <th className="text-right p-2">Lead</th>
                      <th className="text-right p-2">CPA</th>
                      <th className="text-right p-2">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audienceInsightsData.map((age, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{age.name}</td>
                        <td className="p-2 text-right">€{age.spend}</td>
                        <td className="p-2 text-right">{age.leads}</td>
                        <td className="p-2 text-right">€{(age.spend / age.leads).toFixed(2)}</td>
                        <td className="p-2 text-right">{((age.leads * 100) / age.spend).toFixed(1)}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creative" className="space-y-6">
          {/* Creative Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Creative (CTR vs Lead)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ctr: { label: "CTR %", color: "#8884d8" },
                  leads: { label: "Lead", color: "#82ca9d" }
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={creativePerformanceData}>
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="leads" fill="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#8884d8" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Creative Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights Creative</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800">Video Performance</div>
                  <div className="text-sm text-green-700">
                    I video ottengono in media il 35% di CTR in più rispetto alle immagini statiche
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">Formato Ottimale</div>
                  <div className="text-sm text-blue-700">
                    I video quadrati (1:1) performano meglio del 20% rispetto ai formati 16:9
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-yellow-800">Durata Ideale</div>
                  <div className="text-sm text-yellow-700">
                    Video di 10-15 secondi ottengono il tasso di completamento più alto
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A/B Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Test: CTA Button</div>
                      <Badge className="bg-green-100 text-green-800">Winner</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      "Prenota Ora" vs "Scopri di Più"
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      +28% conversion rate
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Test: Headline</div>
                      <Badge variant="outline">In corso</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      "Fisioterapista Esperto" vs "Risolvi il Dolore"
                    </div>
                    <div className="text-sm text-gray-500">
                      Risultati disponibili tra 3 giorni
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          {/* ROI by Specialization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                ROI per Specializzazione
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roiBySpecializationData.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{spec.specialization}</div>
                      <div className="text-sm text-gray-500">{spec.campaigns} campagne attive</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{spec.roi.toFixed(1)}x ROAS</div>
                      <div className="text-sm text-gray-500">
                        €{spec.spend} → €{spec.revenue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Trend Revenue vs Spesa</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  spend: { label: "Spesa", color: "#8884d8" },
                  revenue: { label: "Revenue", color: "#82ca9d" }
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyReportData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="spend" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="revenue" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Monthly Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Report Performance Mensile</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  leads: { label: "Lead", color: "#8884d8" },
                  spend: { label: "Spesa", color: "#82ca9d" }
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyReportData}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="leads" fill="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="spend" stroke="#82ca9d" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Monthly Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Spesa Totale (Nov)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€4,800</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +14% vs Ottobre
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Lead Generati (Nov)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">212</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +14% vs Ottobre
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">CPA Medio (Nov)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€22.64</div>
                <div className="flex items-center text-sm text-red-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  +€1.20 vs Ottobre
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">ROAS (Nov)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.4x</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.2x vs Ottobre
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignAnalytics;
