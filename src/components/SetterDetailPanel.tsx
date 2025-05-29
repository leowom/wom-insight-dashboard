
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
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  bonusEarned: number;
  isActive: boolean;
  prospects: number;
}

interface SetterDetailPanelProps {
  setter: Setter;
  onClose: () => void;
}

const SetterDetailPanel: React.FC<SetterDetailPanelProps> = ({ setter, onClose }) => {
  // Sample daily activity data
  const dailyActivityData = [
    { day: 'Mon', calls: 8, appointments: 2 },
    { day: 'Tue', calls: 12, appointments: 3 },
    { day: 'Wed', calls: 6, appointments: 1 },
    { day: 'Thu', calls: 10, appointments: 2 },
    { day: 'Fri', calls: 15, appointments: 4 },
    { day: 'Sat', calls: 8, appointments: 1 },
    { day: 'Sun', calls: 5, appointments: 1 }
  ];

  const prospects = [
    { id: 1, name: 'Mario Verdi', phone: '+39 123 456 789', status: 'New Lead', lastContact: '2 hours ago' },
    { id: 2, name: 'Anna Blu', phone: '+39 987 654 321', status: 'Called', lastContact: '1 day ago' },
    { id: 3, name: 'Paolo Nero', phone: '+39 555 123 456', status: 'Appointment Set', lastContact: '3 hours ago' },
    { id: 4, name: 'Laura Giallo', phone: '+39 777 888 999', status: 'No Show', lastContact: '2 days ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Lead': return 'bg-blue-100 text-blue-800';
      case 'Called': return 'bg-yellow-100 text-yellow-800';
      case 'Appointment Set': return 'bg-green-100 text-green-800';
      case 'No Show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const monthlyTarget = 20;
  const targetProgress = (setter.appointmentsSet / monthlyTarget) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-3">
          <span>{setter.name} - Performance Details</span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Calls This Month</p>
                  <p className="text-2xl font-bold text-blue-800">{setter.callsMade}</p>
                </div>
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-800">
                    {Math.round((setter.appointmentsSet / setter.callsMade) * 100)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Show Rate</p>
                  <p className="text-2xl font-bold text-purple-800">{setter.showRate}%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Bonus Earned</p>
                  <p className="text-2xl font-bold text-orange-800">€{setter.bonusEarned}</p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Target Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Target Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Appointments Set: {setter.appointmentsSet}/{monthlyTarget}</span>
                <span>{Math.round(targetProgress)}%</span>
              </div>
              <Progress value={targetProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Daily Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
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

        {/* Assigned Prospects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assigned Prospects ({prospects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prospects.map((prospect) => (
                <div key={prospect.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{prospect.name}</p>
                    <p className="text-sm text-gray-500">{prospect.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
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

        {/* Bonus Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bonus Calculation Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Appointments Set:</span>
                <span>{setter.appointmentsSet}</span>
              </div>
              <div className="flex justify-between">
                <span>Shows:</span>
                <span>{setter.appointmentsSet - setter.noShows}</span>
              </div>
              <div className="flex justify-between">
                <span>No-Shows:</span>
                <span className="text-red-600">-{setter.noShows}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate per Show:</span>
                <span>€3</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>Total Bonus:</span>
                <span className="text-green-600">€{setter.bonusEarned}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SetterDetailPanel;
