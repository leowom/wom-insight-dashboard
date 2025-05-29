
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Phone, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Users,
  Target,
  Award,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import SetterDetailPanel from './SetterDetailPanel';
import ProspectAssignment from './ProspectAssignment';
import BonusCalculationWidget from './BonusCalculationWidget';

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

const AppSettersManagement = () => {
  const [selectedSetter, setSelectedSetter] = useState<Setter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Setter>('appointmentsSet');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const setters: Setter[] = [
    {
      id: '1',
      name: 'Marco Bianchi',
      avatar: '/placeholder.svg',
      callsMade: 85,
      dailyAverage: 4.2,
      appointmentsSet: 12,
      appointmentsTrend: 8,
      showRate: 83,
      noShows: 2,
      bonusEarned: 30,
      isActive: true,
      prospects: 45
    },
    {
      id: '2',
      name: 'Giulia Rossi',
      avatar: '/placeholder.svg',
      callsMade: 78,
      dailyAverage: 3.9,
      appointmentsSet: 10,
      appointmentsTrend: -2,
      showRate: 75,
      noShows: 3,
      bonusEarned: 24,
      isActive: true,
      prospects: 38
    },
    {
      id: '3',
      name: 'Luca Ferrari',
      avatar: '/placeholder.svg',
      callsMade: 92,
      dailyAverage: 4.6,
      appointmentsSet: 15,
      appointmentsTrend: 12,
      showRate: 87,
      noShows: 1,
      bonusEarned: 42,
      isActive: true,
      prospects: 52
    },
    {
      id: '4',
      name: 'Sofia Romano',
      avatar: '/placeholder.svg',
      callsMade: 65,
      dailyAverage: 3.2,
      appointmentsSet: 8,
      appointmentsTrend: -5,
      showRate: 62,
      noShows: 4,
      bonusEarned: 18,
      isActive: false,
      prospects: 28
    }
  ];

  const getShowRateColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-100 text-green-800';
    if (rate >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <ArrowDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const handleSort = (field: keyof Setter) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedSetters = [...setters].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return (aVal > bVal ? 1 : -1) * multiplier;
  });

  const filteredSetters = sortedSetters.filter(setter =>
    setter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Performance Overview Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Calls Made</p>
                <p className="text-3xl font-bold">255</p>
              </div>
              <Phone className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Appointments Set</p>
                <p className="text-3xl font-bold">37</p>
              </div>
              <Calendar className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Show Rate</p>
                <p className="text-3xl font-bold">75%</p>
              </div>
              <Target className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Bonus Earned</p>
                <p className="text-3xl font-bold">€84</p>
              </div>
              <Award className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="assignment">Prospect Assignment</TabsTrigger>
          <TabsTrigger value="bonus">Bonus Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search setters..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Setters Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Setters Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 cursor-pointer" onClick={() => handleSort('name')}>
                        Setter
                      </th>
                      <th className="text-left p-3 cursor-pointer" onClick={() => handleSort('callsMade')}>
                        Calls Made
                      </th>
                      <th className="text-left p-3 cursor-pointer" onClick={() => handleSort('appointmentsSet')}>
                        Appointments
                      </th>
                      <th className="text-left p-3 cursor-pointer" onClick={() => handleSort('showRate')}>
                        Show Rate
                      </th>
                      <th className="text-left p-3">No-Shows</th>
                      <th className="text-left p-3 cursor-pointer" onClick={() => handleSort('bonusEarned')}>
                        Bonus Earned
                      </th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSetters.map((setter) => (
                      <tr key={setter.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={setter.avatar} />
                              <AvatarFallback>{setter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{setter.name}</p>
                              <p className="text-sm text-gray-500">{setter.prospects} prospects</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{setter.callsMade}</p>
                            <p className="text-sm text-gray-500">{setter.dailyAverage}/day avg</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{setter.appointmentsSet}</span>
                            {getTrendIcon(setter.appointmentsTrend)}
                            <span className="text-sm text-gray-500">
                              ({setter.appointmentsTrend > 0 ? '+' : ''}{setter.appointmentsTrend})
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getShowRateColor(setter.showRate)}>
                            {setter.showRate}%
                          </Badge>
                        </td>
                        <td className="p-3">{setter.noShows}</td>
                        <td className="p-3">
                          <span className="font-medium text-green-600">€{setter.bonusEarned}</span>
                        </td>
                        <td className="p-3">
                          <Badge variant={setter.isActive ? "default" : "secondary"}>
                            {setter.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedSetter(setter)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Setter Detail Panel */}
          {selectedSetter && (
            <SetterDetailPanel 
              setter={selectedSetter} 
              onClose={() => setSelectedSetter(null)} 
            />
          )}
        </TabsContent>

        <TabsContent value="assignment">
          <ProspectAssignment setters={setters} />
        </TabsContent>

        <TabsContent value="bonus">
          <BonusCalculationWidget setters={setters} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppSettersManagement;
