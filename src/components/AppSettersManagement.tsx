
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
  ArrowDown,
  Trophy,
  Star,
  Crown,
  Zap
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

const AppSettersManagement = () => {
  const [selectedSetter, setSelectedSetter] = useState<Setter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Setter>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const setters: Setter[] = [
    {
      id: '1',
      name: 'Laura Santini',
      avatar: '/placeholder.svg',
      callsMade: 95,
      dailyAverage: 4.5,
      appointmentsSet: 16,
      appointmentsTrend: 12,
      showRate: 81,
      shows: 13,
      noShows: 3,
      bonusEarned: 39,
      isActive: true,
      prospects: 18,
      bestDay: { calls: 9, date: 'Nov 12' },
      monthlyTarget: 15,
      badges: ['Top Performer', 'Consistency King'],
      rank: 1
    },
    {
      id: '2',
      name: 'Marco Romano',
      avatar: '/placeholder.svg',
      callsMade: 87,
      dailyAverage: 4.2,
      appointmentsSet: 14,
      appointmentsTrend: 8,
      showRate: 78,
      shows: 11,
      noShows: 3,
      bonusEarned: 33,
      isActive: true,
      prospects: 16,
      bestDay: { calls: 8, date: 'Nov 15' },
      monthlyTarget: 15,
      badges: ['Most Improved'],
      rank: 2
    },
    {
      id: '3',
      name: 'Giovanni Moretti',
      avatar: '/placeholder.svg',
      callsMade: 73,
      dailyAverage: 3.5,
      appointmentsSet: 11,
      appointmentsTrend: -2,
      showRate: 73,
      shows: 8,
      noShows: 3,
      bonusEarned: 24,
      isActive: true,
      prospects: 15,
      bestDay: { calls: 7, date: 'Nov 18' },
      monthlyTarget: 15,
      badges: [],
      rank: 3
    }
  ];

  const getShowRateColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (rate >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <ArrowDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return null;
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Top Performer': return <Star className="h-3 w-3" />;
      case 'Most Improved': return <TrendingUp className="h-3 w-3" />;
      case 'Consistency King': return <Zap className="h-3 w-3" />;
      default: return <Award className="h-3 w-3" />;
    }
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

  const totalStats = {
    calls: setters.reduce((sum, s) => sum + s.callsMade, 0),
    appointments: setters.reduce((sum, s) => sum + s.appointmentsSet, 0),
    shows: setters.reduce((sum, s) => sum + s.shows, 0),
    bonus: setters.reduce((sum, s) => sum + s.bonusEarned, 0)
  };

  return (
    <div className="space-y-6">
      {/* Motivational Header with Leaderboard */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Setters Performance Dashboard</h1>
            <p className="text-blue-100">Driving excellence through performance tracking</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">€{totalStats.bonus}</div>
            <div className="text-blue-100 text-sm">Total Bonus This Month</div>
          </div>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Calls Made</p>
                <p className="text-3xl font-bold">{totalStats.calls}</p>
                <p className="text-blue-100 text-xs mt-1">This month</p>
              </div>
              <Phone className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Appointments Set</p>
                <p className="text-3xl font-bold">{totalStats.appointments}</p>
                <p className="text-green-100 text-xs mt-1">Success rate: {Math.round((totalStats.appointments / totalStats.calls) * 100)}%</p>
              </div>
              <Calendar className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Show Rate</p>
                <p className="text-3xl font-bold">{Math.round((totalStats.shows / totalStats.appointments) * 100)}%</p>
                <p className="text-purple-100 text-xs mt-1">{totalStats.shows} shows / {totalStats.appointments} appts</p>
              </div>
              <Target className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Bonus</p>
                <p className="text-3xl font-bold">€{totalStats.bonus}</p>
                <p className="text-orange-100 text-xs mt-1">€3 per show</p>
              </div>
              <Award className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance & Leaderboard</TabsTrigger>
          <TabsTrigger value="assignment">Prospect Assignment</TabsTrigger>
          <TabsTrigger value="bonus">Bonus Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Monthly Leaderboard */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Monthly Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {setters.sort((a, b) => a.rank - b.rank).map((setter, index) => (
                  <div key={setter.id} className={`p-4 rounded-lg border-2 ${
                    index === 0 ? 'bg-yellow-50 border-yellow-300' :
                    index === 1 ? 'bg-gray-50 border-gray-300' :
                    'bg-orange-50 border-orange-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      {getRankIcon(setter.rank)}
                      <div className="flex-1">
                        <p className="font-semibold">{setter.name}</p>
                        <p className="text-sm text-gray-600">{setter.appointmentsSet} appointments</p>
                        <p className="text-sm font-medium text-green-600">€{setter.bonusEarned} earned</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {setter.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs flex items-center space-x-1">
                          {getBadgeIcon(badge)}
                          <span>{badge}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
              <CardTitle>Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Rank</th>
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
                      <th className="text-left p-3">Best Day</th>
                      <th className="text-left p-3 cursor-pointer" onClick={() => handleSort('bonusEarned')}>
                        Bonus
                      </th>
                      <th className="text-left p-3">Target Progress</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSetters.map((setter) => (
                      <tr key={setter.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(setter.rank)}
                            <span className="font-bold text-lg">#{setter.rank}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={setter.avatar} />
                              <AvatarFallback>{setter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{setter.name}</p>
                              <p className="text-sm text-gray-500">{setter.prospects} prospects</p>
                              <div className="flex space-x-1 mt-1">
                                {setter.badges.slice(0, 2).map((badge) => (
                                  <Badge key={badge} variant="secondary" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
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
                          <div>
                            <Badge className={getShowRateColor(setter.showRate)}>
                              {setter.showRate}%
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              {setter.shows} shows, {setter.noShows} no-shows
                            </p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{setter.bestDay.calls} calls</p>
                            <p className="text-sm text-gray-500">{setter.bestDay.date}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-green-600">€{setter.bonusEarned}</span>
                          <p className="text-xs text-gray-500">{setter.shows} × €3</p>
                        </td>
                        <td className="p-3">
                          <div className="w-24">
                            <Progress 
                              value={(setter.appointmentsSet / setter.monthlyTarget) * 100} 
                              className="h-2" 
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {setter.appointmentsSet}/{setter.monthlyTarget}
                            </p>
                          </div>
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
