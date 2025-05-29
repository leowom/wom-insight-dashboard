
import React from 'react';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  Plus,
  FileText,
  MessageSquare,
  CreditCard,
  Clock,
  UserCheck,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Breadcrumb from './Breadcrumb';

const DashboardContent: React.FC = () => {
  // Metrics data
  const metrics = [
    { 
      title: 'Total Terapisti Attivi', 
      value: '50', 
      trend: '+2%', 
      trendUp: true, 
      icon: Users, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trendColor: 'text-green-600'
    },
    { 
      title: 'Pazienti Questo Mese', 
      value: '650', 
      trend: '+15%', 
      trendUp: true, 
      icon: Building2, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trendColor: 'text-blue-600'
    },
    { 
      title: 'Revenue Questo Mese', 
      value: '€16.900', 
      trend: '+22%', 
      trendUp: true, 
      icon: DollarSign, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trendColor: 'text-green-600'
    },
    { 
      title: 'Conversione Media', 
      value: '30%', 
      trend: '+5%', 
      trendUp: true, 
      icon: TrendingUp, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      trendColor: 'text-yellow-600'
    },
  ];

  // Revenue trend data (last 6 months)
  const revenueData = [
    { month: 'Gen', revenue: 12500 },
    { month: 'Feb', revenue: 13200 },
    { month: 'Mar', revenue: 14800 },
    { month: 'Apr', revenue: 15200 },
    { month: 'Mag', revenue: 16100 },
    { month: 'Giu', revenue: 16900 },
  ];

  // Top Terapisti data
  const terapistiData = [
    { name: 'Dr. Rossi', patients: 45 },
    { name: 'Dr. Bianchi', patients: 38 },
    { name: 'Dr. Verdi', patients: 35 },
    { name: 'Dr. Neri', patients: 32 },
    { name: 'Dr. Ferrari', patients: 28 },
  ];

  // Conversion funnel data
  const funnelData = [
    { stage: 'Leads', count: 1000, percentage: 100 },
    { stage: 'Calls', count: 600, percentage: 60 },
    { stage: 'Appointments', count: 400, percentage: 40 },
    { stage: 'Paid', count: 300, percentage: 30 },
  ];

  // Recent activities
  const recentActivities = [
    { 
      id: 1,
      action: 'Dr. Rossi received new patient', 
      time: '2 minuti fa', 
      type: 'patient',
      icon: UserCheck,
      color: 'text-green-600'
    },
    { 
      id: 2,
      action: 'Payment sent to Dr. Bianchi - €450', 
      time: '15 minuti fa', 
      type: 'payment',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    { 
      id: 3,
      action: 'Chiamata completata con prospect', 
      time: '32 minuti fa', 
      type: 'call',
      icon: PhoneCall,
      color: 'text-purple-600'
    },
    { 
      id: 4,
      action: 'New appointment scheduled', 
      time: '1 ora fa', 
      type: 'appointment',
      icon: Calendar,
      color: 'text-orange-600'
    },
    { 
      id: 5,
      action: 'WhatsApp campaign sent to 150 prospects', 
      time: '2 ore fa', 
      type: 'campaign',
      icon: MessageSquare,
      color: 'text-green-600'
    },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    patients: {
      label: "Patients",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-6 font-['Inter',sans-serif]">
      <Breadcrumb items={['Dashboard']} />
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trendUp ? ArrowUp : ArrowDown;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center space-x-1">
                      <TrendIcon className={`h-4 w-4 ${metric.trendColor}`} />
                      <span className={`text-sm font-medium ${metric.trendColor}`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                  <div className={`${metric.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Trend (Ultimi 6 Mesi)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Terapisti Performance */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Terapisti Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={terapistiData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="patients" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                    <span className="text-sm text-gray-500">{stage.count} ({stage.percentage}%)</span>
                  </div>
                  <Progress value={stage.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution Placeholder */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuzione Geografica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
              <div className="text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Mappa Italia con</p>
                <p className="text-sm text-gray-500">posizioni terapisti</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Attività Recenti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <Icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button variant="outline" className="w-full">
                  Visualizza Tutte le Attività
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div>
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Terapista
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Monthly Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Bulk WhatsApp
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Process Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
