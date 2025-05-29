
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, TrendingUp, Upload, MapPin, Users, Target, DollarSign } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Campaign {
  id: string;
  name: string;
  terapista: string;
  avatar: string;
  status: string;
  dailyBudget: number;
  spendToday: number;
  spendMonth: number;
  impressions: number;
  clicks: number;
  ctr: number;
  leads: number;
  cpl: number;
  roas: number;
  trend: string;
  alerts: string[];
}

interface CampaignDetailModalProps {
  campaign: Campaign;
}

const CampaignDetailModal = ({ campaign }: CampaignDetailModalProps) => {
  // Mock performance data
  const performanceData = [
    { date: '1/11', impressions: 1200, clicks: 24, leads: 2, spend: 15.20 },
    { date: '2/11', impressions: 1350, clicks: 28, leads: 3, spend: 18.50 },
    { date: '3/11', impressions: 980, clicks: 19, leads: 1, spend: 12.30 },
    { date: '4/11', impressions: 1450, clicks: 32, leads: 4, spend: 21.80 },
    { date: '5/11', impressions: 1100, clicks: 22, leads: 2, spend: 16.40 },
    { date: '6/11', impressions: 1280, clicks: 26, leads: 3, spend: 19.20 },
    { date: '7/11', impressions: 1400, clicks: 30, leads: 4, spend: 22.50 }
  ];

  const hourlyData = [
    { hour: '00', impressions: 45, clicks: 1, leads: 0 },
    { hour: '06', impressions: 120, clicks: 3, leads: 0 },
    { hour: '09', impressions: 280, clicks: 8, leads: 1 },
    { hour: '12', impressions: 350, clicks: 12, leads: 2 },
    { hour: '15', impressions: 320, clicks: 10, leads: 1 },
    { hour: '18', impressions: 380, clicks: 14, leads: 2 },
    { hour: '21', impressions: 250, clicks: 7, leads: 1 }
  ];

  const creativeData = [
    { name: 'Video A', impressions: 5200, clicks: 124, ctr: 2.38, leads: 8 },
    { name: 'Immagine B', impressions: 4800, clicks: 89, ctr: 1.85, leads: 6 },
    { name: 'Video C', impressions: 3900, clicks: 98, ctr: 2.51, leads: 7 },
    { name: 'Immagine D', impressions: 2100, clicks: 34, ctr: 1.62, leads: 3 }
  ];

  const audienceData = [
    { name: '25-34', value: 35, color: '#8884d8' },
    { name: '35-44', value: 30, color: '#82ca9d' },
    { name: '45-54', value: 20, color: '#ffc658' },
    { name: '55+', value: 15, color: '#ff7300' }
  ];

  const geoData = [
    { city: 'Milano', impressions: 4500, leads: 12, cpl: 8.20 },
    { city: 'Roma', impressions: 3200, leads: 8, cpl: 9.50 },
    { city: 'Torino', impressions: 2100, leads: 5, cpl: 7.80 },
    { city: 'Napoli', impressions: 1800, leads: 4, cpl: 11.20 },
    { city: 'Bologna', impressions: 900, leads: 3, cpl: 6.90 }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img src={campaign.avatar} alt={campaign.terapista} className="h-8 w-8 rounded-full" />
            {campaign.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance Overview</TabsTrigger>
            <TabsTrigger value="creative">Creative Performance</TabsTrigger>
            <TabsTrigger value="audience">Audience & Targeting</TabsTrigger>
            <TabsTrigger value="budget">Budget & Bidding</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Impressioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.impressions.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% vs ieri
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">CTR</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.ctr}%</div>
                  <div className="text-sm text-gray-500">Media settore: 1.8%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.leads}</div>
                  <div className="text-sm text-gray-500">CPA: €{campaign.cpl}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">ROAS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.roas}x</div>
                  <div className="text-sm text-green-600">Sopra obiettivo</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Ultimi 7 Giorni</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    impressions: { label: "Impressioni", color: "#8884d8" },
                    clicks: { label: "Click", color: "#82ca9d" },
                    leads: { label: "Lead", color: "#ffc658" }
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="impressions" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="leads" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hourly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance per Ora</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    impressions: { label: "Impressioni", color: "#8884d8" },
                    leads: { label: "Lead", color: "#ffc658" }
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="impressions" fill="#8884d8" />
                      <Bar dataKey="leads" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creative" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Performance Creative</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Carica Nuovo Creative
              </Button>
            </div>

            <div className="grid gap-4">
              {creativeData.map((creative, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                          {creative.name.includes('Video') ? '📹' : '🖼️'}
                        </div>
                        <div>
                          <h4 className="font-medium">{creative.name}</h4>
                          <p className="text-sm text-gray-500">
                            {creative.impressions.toLocaleString()} impressioni • CTR: {creative.ctr}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold">{creative.clicks}</div>
                          <div className="text-sm text-gray-500">Click</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{creative.leads}</div>
                          <div className="text-sm text-gray-500">Lead</div>
                        </div>
                        <Badge variant={creative.ctr > 2 ? "default" : "secondary"}>
                          {creative.ctr > 2 ? "Top Performer" : "Standard"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Geographic Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Performance Geografica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {geoData.map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{location.city}</div>
                          <div className="text-sm text-gray-500">
                            {location.impressions.toLocaleString()} impressioni
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{location.leads} lead</div>
                          <div className="text-sm text-gray-500">CPA: €{location.cpl}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Age Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Demografia Età
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Percentuale", color: "#8884d8" }
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audienceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {audienceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Categorie di Interesse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Salute e Benessere', 'Sport e Fitness', 'Medicina Alternativa', 'Riabilitazione', 'Dolore Cronico', 'Prevenzione'].map((interest, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm">{interest}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Performance: {Math.floor(Math.random() * 30 + 70)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Impostazioni Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Budget Giornaliero</label>
                    <div className="mt-1 text-2xl font-bold">€{campaign.dailyBudget}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Spesa Mensile</label>
                    <div className="mt-1">
                      <div className="text-lg font-bold">€{campaign.spendMonth}</div>
                      <Progress value={65} className="mt-2" />
                      <div className="text-sm text-gray-500 mt-1">65% del budget mensile utilizzato</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Strategia di Offerta</label>
                    <div className="mt-1">
                      <Badge>Lowest Cost</Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        Ottimizzazione automatica per il costo più basso per conversione
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spend Pacing */}
              <Card>
                <CardHeader>
                  <CardTitle>Ritmo di Spesa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      actual: { label: "Spesa Effettiva", color: "#8884d8" },
                      projected: { label: "Spesa Prevista", color: "#82ca9d" }
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="spend" stroke="#8884d8" strokeWidth={2} name="Spesa Effettiva" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Budget Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Raccomandazioni Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800">Aumenta Budget</div>
                    <div className="text-sm text-green-700">
                      La campagna sta performando bene. Considera di aumentare il budget giornaliero a €35 per massimizzare i risultati.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-800">Ottimizza Orari</div>
                    <div className="text-sm text-blue-700">
                      Le performance sono migliori dalle 12:00 alle 18:00. Concentra il budget in questa fascia oraria.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailModal;
