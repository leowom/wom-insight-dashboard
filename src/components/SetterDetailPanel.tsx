
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  X, 
  Phone, 
  Calendar, 
  Target, 
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Trophy,
  Flame
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Setter {
  id: string;
  name: string;
  avatar: string;
  callsMade: number;
  dailyAverage: number;
  appointmentsSet: number;
  appointmentsTrend: number;
  showRate: number;
  noShows: number;
  shows: number;
  bonusEarned: number;
  isActive: boolean;
  prospects: number;
  bestDay: {
    calls: number;
    date: string;
  };
  monthlyTarget: number;
  badges: string[];
  rank: number;
}

interface SetterDetailPanelProps {
  setter: Setter;
  onClose: () => void;
}

const SetterDetailPanel: React.FC<SetterDetailPanelProps> = ({ setter, onClose }) => {
  // Enhanced daily activity data with more realistic patterns
  const dailyActivityData = [
    { day: 'Nov 1', date: '1', calls: 4, appointments: 1, shows: 1 },
    { day: 'Nov 2', date: '2', calls: 6, appointments: 2, shows: 1 },
    { day: 'Nov 3', date: '3', calls: 3, appointments: 0, shows: 0 },
    { day: 'Nov 4', date: '4', calls: 5, appointments: 1, shows: 1 },
    { day: 'Nov 5', date: '5', calls: setter.bestDay.calls, appointments: 3, shows: 2 },
    { day: 'Nov 6', date: '6', calls: 4, appointments: 1, shows: 1 },
    { day: 'Nov 7', date: '7', calls: 5, appointments: 2, shows: 2 },
    { day: 'Nov 8', date: '8', calls: 3, appointments: 1, shows: 0 },
    { day: 'Nov 9', date: '9', calls: 6, appointments: 2, shows: 2 },
    { day: 'Nov 10', date: '10', calls: 4, appointments: 1, shows: 1 },
    { day: 'Nov 11', date: '11', calls: 5, appointments: 2, shows: 1 },
    { day: 'Nov 12', date: '12', calls: setter.name === 'Laura Santini' ? 9 : 4, appointments: setter.name === 'Laura Santini' ? 3 : 1, shows: setter.name === 'Laura Santini' ? 2 : 1 },
    { day: 'Nov 13', date: '13', calls: 3, appointments: 0, shows: 0 },
    { day: 'Nov 14', date: '14', calls: 5, appointments: 1, shows: 1 },
    { day: 'Nov 15', date: '15', calls: setter.name === 'Marco Romano' ? 8 : 4, appointments: setter.name === 'Marco Romano' ? 2 : 1, shows: setter.name === 'Marco Romano' ? 2 : 1 }
  ];

  // Enhanced prospects with realistic Italian business data
  const prospects = [
    { 
      id: 1, 
      businessName: 'Osteopatia Milano Centro', 
      ownerName: 'Dr. Alessandro Bianchi',
      phone: '+39 02 1234 5678', 
      status: setter.showRate > 80 ? 'Appointment Set' : 'Called', 
      lastContact: '2 hours ago',
      priority: 'high',
      city: 'Milano',
      source: 'Google Maps'
    },
    { 
      id: 2, 
      businessName: 'Fisioterapia Roma Nord', 
      ownerName: 'Dr. Giulia Rossi',
      phone: '+39 06 9876 5432', 
      status: 'Interested', 
      lastContact: '1 day ago',
      priority: 'high',
      city: 'Roma',
      source: 'LinkedIn'
    },
    { 
      id: 3, 
      businessName: 'Centro Benessere Torino', 
      ownerName: 'Marco Verdi',
      phone: '+39 011 555 1234', 
      status: setter.showRate < 75 ? 'No Answer' : 'Callback Scheduled', 
      lastContact: '3 hours ago',
      priority: 'medium',
      city: 'Torino',
      source: 'Facebook'
    },
    { 
      id: 4, 
      businessName: 'Studio Riabilitazione Bologna', 
      ownerName: 'Dr. Chiara Gialli',
      phone: '+39 051 222 3333', 
      status: 'New Lead', 
      lastContact: '4 hours ago',
      priority: 'high',
      city: 'Bologna',
      source: 'Referral'
    },
    { 
      id: 5, 
      businessName: 'Wellness Center Venezia', 
      ownerName: 'Andrea Viola',
      phone: '+39 041 666 7777', 
      status: 'Not Interested', 
      lastContact: '2 days ago',
      priority: 'low',
      city: 'Venezia',
      source: 'Instagram'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Lead': return 'bg-blue-100 text-blue-800';
      case 'Called': return 'bg-purple-100 text-purple-800';
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Appointment Set': return 'bg-emerald-100 text-emerald-800';
      case 'Callback Scheduled': return 'bg-orange-100 text-orange-800';
      case 'No Answer': return 'bg-yellow-100 text-yellow-800';
      case 'Not Interested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flame className="h-3 w-3 text-red-500" />;
      case 'medium': return <Star className="h-3 w-3 text-yellow-500" />;
      default: return null;
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Top Performer': return <Trophy className="h-3 w-3 text-yellow-600" />;
      case 'Most Improved': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'Consistency King': return <Star className="h-3 w-3 text-blue-600" />;
      default: return <Award className="h-3 w-3" />;
    }
  };

  const targetProgress = (setter.appointmentsSet / setter.monthlyTarget) * 100;
  const totalCalls = dailyActivityData.reduce((sum, day) => sum + day.calls, 0);
  const totalAppointments = dailyActivityData.reduce((sum, day) => sum + day.appointments, 0);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">#{setter.rank}</span>
            {setter.rank === 1 && <Trophy className="h-6 w-6 text-yellow-500" />}
          </div>
          <div>
            <span className="text-xl">{setter.name} - Performance Details</span>
            <div className="flex space-x-2 mt-1">
              {setter.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs flex items-center space-x-1">
                  {getBadgeIcon(badge)}
                  <span>{badge}</span>
                </Badge>
              ))}
            </div>
          </div>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Calls This Month</p>
                  <p className="text-2xl font-bold">{setter.callsMade}</p>
                  <p className="text-blue-100 text-xs">Best: {setter.bestDay.calls} ({setter.bestDay.date})</p>
                </div>
                <Phone className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((setter.appointmentsSet / setter.callsMade) * 100)}%
                  </p>
                  <p className="text-green-100 text-xs">{setter.appointmentsSet} of {setter.callsMade} calls</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Show Rate</p>
                  <p className="text-2xl font-bold">{setter.showRate}%</p>
                  <p className="text-purple-100 text-xs">{setter.shows} shows / {setter.noShows} no-shows</p>
                </div>
                <Target className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Bonus Earned</p>
                  <p className="text-2xl font-bold">€{setter.bonusEarned}</p>
                  <p className="text-orange-100 text-xs">{setter.shows} shows × €3</p>
                </div>
                <Award className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Target Progress */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Monthly Target Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Appointments Target</span>
                <span className="text-lg font-bold text-green-600">
                  {setter.appointmentsSet}/{setter.monthlyTarget}
                </span>
              </div>
              <Progress value={targetProgress} className="h-4" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{Math.round(targetProgress)}% Complete</span>
                <span>{setter.monthlyTarget - setter.appointmentsSet} remaining</span>
              </div>
              {targetProgress >= 100 && (
                <div className="flex items-center space-x-2 text-green-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  <span>Target Exceeded! 🎉</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Activity (Last 15 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Calls"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Appointments"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Performance Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { week: 'Week 1', calls: 22, appointments: 3 },
                  { week: 'Week 2', calls: 28, appointments: 5 },
                  { week: 'Week 3', calls: 25, appointments: 4 },
                  { week: 'Week 4', calls: setter.callsMade - 75, appointments: setter.appointmentsSet - 12 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calls" fill="#3b82f6" name="Calls" />
                  <Bar dataKey="appointments" fill="#10b981" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Prospects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Assigned Prospects ({prospects.length})</span>
              <Badge variant="secondary">{setter.prospects} total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prospects.map((prospect) => (
                <div key={prospect.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{prospect.businessName}</p>
                      {getPriorityIcon(prospect.priority)}
                    </div>
                    <p className="text-sm text-gray-600">{prospect.ownerName}</p>
                    <p className="text-sm text-gray-500">{prospect.phone} • {prospect.city}</p>
                    <p className="text-xs text-gray-400">Source: {prospect.source}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(prospect.status)}>
                      {prospect.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{prospect.lastContact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Bonus Breakdown */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-600" />
              <span>Bonus Calculation Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Appointments Set:</span>
                <span className="font-medium">{setter.appointmentsSet}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span>Shows (Successful):</span>
                <span className="font-medium">{setter.shows}</span>
              </div>
              <div className="flex justify-between items-center text-red-600">
                <span>No-Shows:</span>
                <span className="font-medium">-{setter.noShows}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Base Rate per Show:</span>
                <span className="font-medium">€3.00</span>
              </div>
              {setter.showRate >= 80 && (
                <div className="flex justify-between items-center text-blue-600">
                  <span>Performance Bonus (>80% show rate):</span>
                  <span className="font-medium">+€{Math.round(setter.shows * 0.5)}</span>
                </div>
              )}
              <hr className="border-gray-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Bonus Earned:</span>
                <span className="text-green-600">€{setter.bonusEarned}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Calculation: {setter.shows} shows × €3 {setter.showRate >= 80 ? `+ €${Math.round(setter.shows * 0.5)} performance bonus` : ''}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SetterDetailPanel;
