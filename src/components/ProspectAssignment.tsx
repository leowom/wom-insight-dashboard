
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Users, 
  UserPlus, 
  Shuffle, 
  BarChart3,
  ArrowRight,
  Phone,
  MapPin
} from 'lucide-react';

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

interface Prospect {
  id: string;
  name: string;
  phone: string;
  city: string;
  source: string;
  assigned: boolean;
  setterName?: string;
}

interface ProspectAssignmentProps {
  setters: Setter[];
}

const ProspectAssignment: React.FC<ProspectAssignmentProps> = ({ setters }) => {
  const [draggedProspect, setDraggedProspect] = useState<Prospect | null>(null);

  const unassignedProspects: Prospect[] = [
    { id: '1', name: 'Mario Rossi', phone: '+39 123 456 789', city: 'Milano', source: 'Facebook', assigned: false },
    { id: '2', name: 'Giulia Bianchi', phone: '+39 987 654 321', city: 'Roma', source: 'Google Ads', assigned: false },
    { id: '3', name: 'Luca Verde', phone: '+39 555 123 456', city: 'Napoli', source: 'Referral', assigned: false },
    { id: '4', name: 'Anna Blu', phone: '+39 777 888 999', city: 'Torino', source: 'Website', assigned: false },
    { id: '5', name: 'Paolo Nero', phone: '+39 333 444 555', city: 'Firenze', source: 'Instagram', assigned: false }
  ];

  const getWorkloadColor = (prospects: number) => {
    if (prospects < 30) return 'bg-green-500';
    if (prospects < 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getWorkloadPercentage = (prospects: number) => {
    return Math.min((prospects / 60) * 100, 100);
  };

  const handleDragStart = (prospect: Prospect) => {
    setDraggedProspect(prospect);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, setter: Setter) => {
    e.preventDefault();
    if (draggedProspect) {
      console.log(`Assigned ${draggedProspect.name} to ${setter.name}`);
      setDraggedProspect(null);
    }
  };

  const handleAutoAssign = () => {
    console.log('Auto-assigning prospects based on workload...');
  };

  const handleBulkAssign = () => {
    console.log('Opening bulk assignment modal...');
  };

  return (
    <div className="space-y-6">
      {/* Assignment Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Prospect Assignment Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleAutoAssign} className="flex items-center space-x-2">
              <Shuffle className="h-4 w-4" />
              <span>Auto-Assign by Workload</span>
            </Button>
            <Button variant="outline" onClick={handleBulkAssign} className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Bulk Assignment</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Load Balancing Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Prospects */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Unassigned Prospects</span>
              <Badge variant="secondary">{unassignedProspects.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {unassignedProspects.map((prospect) => (
                <div
                  key={prospect.id}
                  draggable
                  onDragStart={() => handleDragStart(prospect)}
                  className="p-3 border rounded-lg cursor-move hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{prospect.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <Phone className="h-3 w-3" />
                        <span>{prospect.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{prospect.city}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {prospect.source}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setters with Workload */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Setters Workload Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {setters.filter(setter => setter.isActive).map((setter) => (
                <div
                  key={setter.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, setter)}
                  className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={setter.avatar} />
                      <AvatarFallback>{setter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{setter.name}</p>
                      <p className="text-sm text-gray-500">{setter.prospects} assigned prospects</p>
                    </div>
                  </div>

                  {/* Workload Indicator */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Workload</span>
                      <span className={`font-medium ${
                        setter.prospects < 30 ? 'text-green-600' : 
                        setter.prospects < 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {setter.prospects}/60
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getWorkloadColor(setter.prospects)}`}
                        style={{ width: `${getWorkloadPercentage(setter.prospects)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Performance: {setter.showRate}%</span>
                      <span>Daily avg: {setter.dailyAverage} calls</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="text-xs text-blue-600">Calls</p>
                      <p className="font-bold text-blue-800">{setter.callsMade}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-xs text-green-600">Appts</p>
                      <p className="font-bold text-green-800">{setter.appointmentsSet}</p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <p className="text-xs text-orange-600">Bonus</p>
                      <p className="font-bold text-orange-800">€{setter.bonusEarned}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Instructions */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            <p className="text-blue-800">
              <strong>How to assign:</strong> Drag prospects from the left panel and drop them onto a setter card. 
              Green workload = optimal, Yellow = moderate, Red = overloaded.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectAssignment;
