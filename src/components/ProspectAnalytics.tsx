
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Clock,
  MapPin,
  Star,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Prospect {
  id: string;
  businessName: string;
  terapistaName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  googleRating: number;
  reviewCount: number;
  assignedSetter: string;
  stage: 'new-leads' | 'contacted' | 'appointment-set' | 'show' | 'converted';
  daysInStage: number;
  lastContact: string;
  nextFollowUp?: string;
  conversionProbability: number;
  businessCategory: string;
  operatingHours: string;
  photos: string[];
  notes: string[];
  nextAction: string;
  addedDate: string;
  meetingType?: 'video' | 'phone' | 'in-person';
  appointmentDate?: string;
  callDuration?: string;
  outcome?: string;
  conversionDate?: string;
  setupFee?: number;
  specialization: string;
  coordinates?: { lat: number; lng: number };
}

interface ProspectAnalyticsProps {
  prospects: Prospect[];
  onClose: () => void;
}

const ProspectAnalytics: React.FC<ProspectAnalyticsProps> = ({
  prospects,
  onClose
}) => {
  // Conversion funnel data
  const funnelData = [
    { stage: 'New Leads', count: prospects.filter(p => p.stage === 'new-leads').length, color: '#6B7280' },
    { stage: 'Contacted', count: prospects.filter(p => p.stage === 'contacted').length, color: '#3B82F6' },
    { stage: 'Appointment Set', count: prospects.filter(p => p.stage === 'appointment-set').length, color: '#F59E0B' },
    { stage: 'Show', count: prospects.filter(p => p.stage === 'show').length, color: '#8B5CF6' },
    { stage: 'Converted', count: prospects.filter(p => p.stage === 'converted').length, color: '#10B981' }
  ];

  // Setter performance data
  const setterPerformance = [
    { 
      setter: 'Marco Romano', 
      prospects: prospects.filter(p => p.assignedSetter === 'Marco Romano').length,
      converted: prospects.filter(p => p.assignedSetter === 'Marco Romano' && p.stage === 'converted').length,
      conversionRate: Math.round((prospects.filter(p => p.assignedSetter === 'Marco Romano' && p.stage === 'converted').length / prospects.filter(p => p.assignedSetter === 'Marco Romano').length) * 100) || 0
    },
    { 
      setter: 'Laura Santini', 
      prospects: prospects.filter(p => p.assignedSetter === 'Laura Santini').length,
      converted: prospects.filter(p => p.assignedSetter === 'Laura Santini' && p.stage === 'converted').length,
      conversionRate: Math.round((prospects.filter(p => p.assignedSetter === 'Laura Santini' && p.stage === 'converted').length / prospects.filter(p => p.assignedSetter === 'Laura Santini').length) * 100) || 0
    },
    { 
      setter: 'Giovanni Moretti', 
      prospects: prospects.filter(p => p.assignedSetter === 'Giovanni Moretti').length,
      converted: prospects.filter(p => p.assignedSetter === 'Giovanni Moretti' && p.stage === 'converted').length,
      conversionRate: Math.round((prospects.filter(p => p.assignedSetter === 'Giovanni Moretti' && p.stage === 'converted').length / prospects.filter(p => p.assignedSetter === 'Giovanni Moretti').length) * 100) || 0
    }
  ];

  // Regional performance
  const regionalData = [
    { city: 'Milano', prospects: prospects.filter(p => p.city === 'Milano').length, avgRating: 4.3 },
    { city: 'Roma', prospects: prospects.filter(p => p.city === 'Roma').length, avgRating: 4.2 },
    { city: 'Napoli', prospects: prospects.filter(p => p.city === 'Napoli').length, avgRating: 4.4 },
    { city: 'Torino', prospects: prospects.filter(p => p.city === 'Torino').length, avgRating: 4.6 },
    { city: 'Firenze', prospects: prospects.filter(p => p.city === 'Firenze').length, avgRating: 4.4 },
  ].filter(item => item.prospects > 0);

  // Business type performance
  const businessTypeData = [
    { type: 'Fisioterapia', count: prospects.filter(p => p.businessCategory === 'Fisioterapia').length },
    { type: 'Osteopatia', count: prospects.filter(p => p.businessCategory === 'Osteopatia').length },
    { type: 'Riabilitazione', count: prospects.filter(p => p.businessCategory === 'Riabilitazione').length },
    { type: 'Wellness', count: prospects.filter(p => p.businessCategory === 'Wellness').length },
    { type: 'Centro Benessere', count: prospects.filter(p => p.businessCategory === 'Centro Benessere').length }
  ].filter(item => item.count > 0);

  // Time to conversion data
  const conversionTimeData = [
    { days: '0-7 days', count: 8 },
    { days: '8-14 days', count: 12 },
    { days: '15-30 days', count: 15 },
    { days: '30+ days', count: 6 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const totalRevenue = prospects.filter(p => p.stage === 'converted').reduce((sum, p) => sum + (p.setupFee || 0), 0);
  const avgDealSize = totalRevenue / prospects.filter(p => p.stage === 'converted').length || 0;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5" />
              Prospect Analytics Dashboard
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Prospects</p>
                    <p className="text-2xl font-bold">{prospects.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">
                      {Math.round((prospects.filter(p => p.stage === 'converted').length / prospects.length) * 100)}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Time to Convert</p>
                    <p className="text-2xl font-bold">18d</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Deal Size</p>
                    <p className="text-2xl font-bold">€{Math.round(avgDealSize)}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={funnelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Setter Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Setter Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={setterPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="setter" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="prospects" fill="#8B5CF6" name="Total Prospects" />
                    <Bar dataKey="converted" fill="#10B981" name="Converted" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="prospects" fill="#F59E0B" name="Prospects" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {regionalData.map((region, index) => (
                    <div key={region.city} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{region.city}</span>
                      <div className="flex items-center space-x-2">
                        <span>{region.prospects} prospects</span>
                        <Badge variant="outline">Avg {region.avgRating}★</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Types */}
            <Card>
              <CardHeader>
                <CardTitle>Best Performing Business Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={businessTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {businessTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {businessTypeData.map((type, index) => (
                    <div key={type.type} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{type.type}</span>
                      </div>
                      <span className="font-medium">{type.count} prospects</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time to Conversion */}
            <Card>
              <CardHeader>
                <CardTitle>Time-to-Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="days" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Insight:</strong> Most conversions happen within 15-30 days. 
                    Focus on nurturing prospects who have been in the pipeline for 2+ weeks.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Setter Performance Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Setter Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {setterPerformance.map((setter, index) => (
                    <div key={setter.setter} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{setter.setter}</span>
                        <Badge 
                          variant={setter.conversionRate >= 15 ? "default" : "secondary"}
                          className={setter.conversionRate >= 15 ? "bg-green-600" : ""}
                        >
                          {setter.conversionRate}% conversion
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <div className="font-medium">{setter.prospects}</div>
                          <div>Total Prospects</div>
                        </div>
                        <div>
                          <div className="font-medium">{setter.converted}</div>
                          <div>Converted</div>
                        </div>
                        <div>
                          <div className="font-medium">€{(setter.converted * avgDealSize).toLocaleString()}</div>
                          <div>Revenue</div>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${setter.conversionRate * 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Pipeline Optimization</h4>
                  <p className="text-sm text-blue-700">
                    Focus on the "Contacted" to "Appointment Set" conversion. 
                    This is where most prospects are lost. Consider more aggressive follow-up strategies.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Regional Focus</h4>
                  <p className="text-sm text-green-700">
                    Torino shows the highest average ratings but lower volume. 
                    Consider increasing prospecting efforts in this high-quality market.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Setter Training</h4>
                  <p className="text-sm text-orange-700">
                    Laura Santini shows the best performance. Consider having her mentor 
                    other setters to improve overall team conversion rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProspectAnalytics;
