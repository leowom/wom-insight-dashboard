
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Award, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Target,
  Clock,
  Trophy,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface BonusCalculationWidgetProps {
  setters: Setter[];
}

const BonusCalculationWidget: React.FC<BonusCalculationWidgetProps> = ({ setters }) => {
  const bonusData = setters.map(setter => ({
    name: setter.name.split(' ')[0],
    bonus: setter.bonusEarned,
    target: 60, // Monthly target bonus
    shows: setter.appointmentsSet - setter.noShows
  }));

  const totalBonusPool = setters.reduce((sum, setter) => sum + setter.bonusEarned, 0);
  const averageBonus = totalBonusPool / setters.length;
  const topPerformer = setters.reduce((top, setter) => 
    setter.bonusEarned > top.bonusEarned ? setter : top
  );

  const bonusRules = [
    { rule: 'Base Show Bonus', amount: '€3 per show' },
    { rule: 'Monthly Bonus (>15 shows)', amount: '€50' },
    { rule: 'Top Performer Bonus', amount: '€100' },
    { rule: 'Consistency Bonus (30 days)', amount: '€75' }
  ];

  const payoutSchedule = [
    { date: '15th of month', description: 'Mid-month payment (50%)', status: 'Completed' },
    { date: '1st of next month', description: 'Final payment (50%)', status: 'Pending' },
    { date: '5th of next month', description: 'Bonus adjustments', status: 'Scheduled' }
  ];

  const achievements = [
    { 
      name: 'Show Stopper', 
      description: '20+ shows in a month', 
      achieved: setters.filter(s => (s.appointmentsSet - s.noShows) >= 20).length,
      total: setters.length 
    },
    { 
      name: 'Consistent Performer', 
      description: '80%+ show rate', 
      achieved: setters.filter(s => s.showRate >= 80).length,
      total: setters.length 
    },
    { 
      name: 'High Volume', 
      description: '80+ calls per month', 
      achieved: setters.filter(s => s.callsMade >= 80).length,
      total: setters.length 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Bonus Pool</p>
                <p className="text-3xl font-bold">€{totalBonusPool}</p>
              </div>
              <Award className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Average Bonus</p>
                <p className="text-3xl font-bold">€{Math.round(averageBonus)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Top Performer</p>
                <p className="text-xl font-bold">{topPerformer.name.split(' ')[0]}</p>
                <p className="text-purple-200">€{topPerformer.bonusEarned}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Next Payout</p>
                <p className="text-xl font-bold">15th Jan</p>
                <p className="text-orange-200">€{Math.round(totalBonusPool * 0.5)}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bonus Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Bonus Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bonusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'bonus' ? `€${value}` : value,
                    name === 'bonus' ? 'Bonus Earned' : 'Target'
                  ]}
                />
                <Bar dataKey="bonus" fill="#10b981" name="bonus" />
                <Bar dataKey="target" fill="#e5e7eb" name="target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bonus Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Bonus Structure</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bonusRules.map((rule, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{rule.rule}</span>
                  <Badge variant="secondary">{rule.amount}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Team Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                    <Badge variant={achievement.achieved > 0 ? "default" : "secondary"}>
                      {achievement.achieved}/{achievement.total}
                    </Badge>
                  </div>
                  <Progress 
                    value={(achievement.achieved / achievement.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payout Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Payout Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payoutSchedule.map((payout, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{payout.date}</p>
                    <p className="text-sm text-gray-500">{payout.description}</p>
                  </div>
                  <Badge 
                    variant={
                      payout.status === 'Completed' ? 'default' : 
                      payout.status === 'Pending' ? 'secondary' : 'outline'
                    }
                  >
                    {payout.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Setter Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setters.filter(setter => setter.isActive).map((setter) => {
              const monthlyTarget = 20;
              const targetProgress = (setter.appointmentsSet / monthlyTarget) * 100;
              const shows = setter.appointmentsSet - setter.noShows;
              
              return (
                <div key={setter.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{setter.name}</h4>
                    <Badge variant="outline">€{setter.bonusEarned}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monthly Target</span>
                        <span>{setter.appointmentsSet}/{monthlyTarget}</span>
                      </div>
                      <Progress value={targetProgress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <p className="text-gray-500">Shows</p>
                        <p className="font-bold text-green-600">{shows}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rate</p>
                        <p className="font-bold">{setter.showRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bonus</p>
                        <p className="font-bold text-blue-600">€{setter.bonusEarned}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BonusCalculationWidget;
