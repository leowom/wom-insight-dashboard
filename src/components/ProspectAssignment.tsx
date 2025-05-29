
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
  MapPin,
  Clock,
  Flame,
  Star
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
  businessName: string;
  ownerName: string;
  phone: string;
  city: string;
  source: string;
  priority: 'high' | 'medium' | 'low';
  lastContact: string;
  status: 'new' | 'contacted' | 'interested' | 'callback' | 'not-interested';
  assigned: boolean;
  setterName?: string;
}

interface ProspectAssignmentProps {
  setters: Setter[];
}

const ProspectAssignment: React.FC<ProspectAssignmentProps> = ({ setters }) => {
  const [draggedProspect, setDraggedProspect] = useState<Prospect | null>(null);

  // Realistic Italian business prospects from Apify scraping
  const unassignedProspects: Prospect[] = [
    { id: '1', businessName: 'Osteopatia Milano Centro', ownerName: 'Dr. Alessandro Bianchi', phone: '+39 02 1234 5678', city: 'Milano', source: 'Google Maps', priority: 'high', lastContact: '2 hours ago', status: 'new', assigned: false },
    { id: '2', businessName: 'Fisioterapia Roma Nord', ownerName: 'Dr. Giulia Rossi', phone: '+39 06 9876 5432', city: 'Roma', source: 'LinkedIn', priority: 'high', lastContact: '1 hour ago', status: 'new', assigned: false },
    { id: '3', businessName: 'Centro Benessere Torino', ownerName: 'Marco Verdi', phone: '+39 011 555 1234', city: 'Torino', source: 'Facebook', priority: 'medium', lastContact: '3 hours ago', status: 'new', assigned: false },
    { id: '4', businessName: 'Clinica Osteopatica Napoli', ownerName: 'Dr. Sofia Neri', phone: '+39 081 777 8888', city: 'Napoli', source: 'Google Maps', priority: 'high', lastContact: '30 minutes ago', status: 'new', assigned: false },
    { id: '5', businessName: 'Fisio&Salute Firenze', ownerName: 'Lorenzo Blu', phone: '+39 055 333 4444', city: 'Firenze', source: 'Website', priority: 'medium', lastContact: '4 hours ago', status: 'new', assigned: false },
    { id: '6', businessName: 'Studio Riabilitazione Bologna', ownerName: 'Dr. Chiara Gialli', phone: '+39 051 222 3333', city: 'Bologna', source: 'Referral', priority: 'high', lastContact: '1 hour ago', status: 'new', assigned: false },
    { id: '7', businessName: 'Wellness Center Venezia', ownerName: 'Andrea Viola', phone: '+39 041 666 7777', city: 'Venezia', source: 'Instagram', priority: 'low', lastContact: '6 hours ago', status: 'new', assigned: false },
    { id: '8', businessName: 'Osteopatia Genova Mare', ownerName: 'Dr. Francesca Rosa', phone: '+39 010 888 9999', city: 'Genova', source: 'Google Ads', priority: 'medium', lastContact: '2 hours ago', status: 'new', assigned: false },
    { id: '9', businessName: 'Centro Fisio Palermo', ownerName: 'Giuseppe Grigio', phone: '+39 091 111 2222', city: 'Palermo', source: 'LinkedIn', priority: 'high', lastContact: '45 minutes ago', status: 'new', assigned: false },
    { id: '10', businessName: 'Riabilitazione Bari', ownerName: 'Dr. Maria Arancio', phone: '+39 080 444 5555', city: 'Bari', source: 'Google Maps', priority: 'medium', lastContact: '3 hours ago', status: 'new', assigned: false },
    { id: '11', businessName: 'Osteopatia Catania', ownerName: 'Salvatore Verde', phone: '+39 095 777 8888', city: 'Catania', source: 'Facebook', priority: 'low', lastContact: '8 hours ago', status: 'new', assigned: false },
    { id: '12', businessName: 'Fisioterapia Verona', ownerName: 'Dr. Elena Marrone', phone: '+39 045 999 0000', city: 'Verona', source: 'Website', priority: 'high', lastContact: '1 hour ago', status: 'new', assigned: false }
  ];

  const assignedProspects: Prospect[] = [
    // Laura Santini's prospects
    { id: '101', businessName: 'Studio Salute Milano', ownerName: 'Dr. Roberto Conti', phone: '+39 02 555 6666', city: 'Milano', source: 'Google Maps', priority: 'high', lastContact: 'Yesterday', status: 'interested', assigned: true, setterName: 'Laura Santini' },
    { id: '102', businessName: 'Benessere Roma Centro', ownerName: 'Anna Lombardi', phone: '+39 06 777 8888', city: 'Roma', source: 'LinkedIn', priority: 'medium', lastContact: '2 days ago', status: 'callback', assigned: true, setterName: 'Laura Santini' },
    { id: '103', businessName: 'Fisio Express Torino', ownerName: 'Dr. Matteo Ricci', phone: '+39 011 333 4444', city: 'Torino', source: 'Referral', priority: 'high', lastContact: 'Today', status: 'contacted', assigned: true, setterName: 'Laura Santini' },
    
    // Marco Romano's prospects  
    { id: '201', businessName: 'Clinica Movimento Napoli', ownerName: 'Dr. Valentina Bruno', phone: '+39 081 222 3333', city: 'Napoli', source: 'Google Ads', priority: 'medium', lastContact: 'Yesterday', status: 'interested', assigned: true, setterName: 'Marco Romano' },
    { id: '202', businessName: 'Osteopatia Firenze Sud', ownerName: 'Davide Costa', phone: '+39 055 888 9999', city: 'Firenze', source: 'Facebook', priority: 'high', lastContact: '3 days ago', status: 'callback', assigned: true, setterName: 'Marco Romano' },
    
    // Giovanni Moretti's prospects
    { id: '301', businessName: 'Riabilitazione Bologna Est', ownerName: 'Dr. Silvia Fontana', phone: '+39 051 666 7777', city: 'Bologna', source: 'Instagram', priority: 'low', lastContact: '4 days ago', status: 'not-interested', assigned: true, setterName: 'Giovanni Moretti' },
    { id: '302', businessName: 'Centro Fisio Venezia', ownerName: 'Roberto Esposito', phone: '+39 041 444 5555', city: 'Venezia', source: 'Website', priority: 'medium', lastContact: '2 days ago', status: 'contacted', assigned: true, setterName: 'Giovanni Moretti' }
  ];

  const getWorkloadColor = (prospects: number) => {
    if (prospects < 15) return 'bg-green-500';
    if (prospects < 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getWorkloadPercentage = (prospects: number) => {
    return Math.min((prospects / 25) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'callback': return 'bg-orange-100 text-orange-800';
      case 'not-interested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
      console.log(`Assigned ${draggedProspect.businessName} to ${setter.name}`);
      setDraggedProspect(null);
    }
  };

  const handleAutoAssign = () => {
    console.log('Auto-assigning prospects based on workload...');
  };

  const handleBulkAssign = () => {
    console.log('Opening bulk assignment modal...');
  };

  const getProspectsForSetter = (setterName: string) => {
    return assignedProspects.filter(p => p.setterName === setterName);
  };

  return (
    <div className="space-y-6">
      {/* Assignment Controls */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Users className="h-5 w-5" />
            <span>Prospect Assignment Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleAutoAssign} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
              <Shuffle className="h-4 w-4" />
              <span>Auto-Assign by Performance</span>
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
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{unassignedProspects.length}</div>
              <div className="text-sm text-gray-600">Unassigned Prospects</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{assignedProspects.length}</div>
              <div className="text-sm text-gray-600">Assigned Prospects</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">{unassignedProspects.filter(p => p.priority === 'high').length}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Prospects */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Available Prospects</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">{unassignedProspects.length}</Badge>
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
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-sm">{prospect.businessName}</p>
                        {prospect.priority === 'high' && <Flame className="h-3 w-3 text-red-500" />}
                        {prospect.priority === 'medium' && <Star className="h-3 w-3 text-yellow-500" />}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{prospect.ownerName}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{prospect.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{prospect.city}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{prospect.lastContact}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Badge className={getPriorityColor(prospect.priority)} variant="outline">
                        {prospect.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {prospect.source}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setters with Assigned Prospects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Setters Workload & Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {setters.filter(setter => setter.isActive).map((setter) => {
                const setterProspects = getProspectsForSetter(setter.name);
                const totalProspects = setter.prospects;
                
                return (
                  <div
                    key={setter.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, setter)}
                    className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors bg-white"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src={setter.avatar} />
                        <AvatarFallback>{setter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{setter.name}</p>
                        <p className="text-sm text-gray-500">{totalProspects} total prospects assigned</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getWorkloadColor(totalProspects)} text-white`}>
                          {totalProspects < 15 ? 'Light' : totalProspects < 20 ? 'Moderate' : 'Heavy'}
                        </Badge>
                      </div>
                    </div>

                    {/* Workload Indicator */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Workload Capacity</span>
                        <span className={`font-medium ${
                          totalProspects < 15 ? 'text-green-600' : 
                          totalProspects < 20 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {totalProspects}/25
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getWorkloadColor(totalProspects)}`}
                          style={{ width: `${getWorkloadPercentage(totalProspects)}%` }}
                        />
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs text-blue-600">Show Rate</p>
                        <p className="font-bold text-blue-800">{setter.showRate}%</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-xs text-green-600">Appointments</p>
                        <p className="font-bold text-green-800">{setter.appointmentsSet}</p>
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <p className="text-xs text-orange-600">Calls/Day</p>
                        <p className="font-bold text-orange-800">{setter.dailyAverage}</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-xs text-purple-600">Bonus</p>
                        <p className="font-bold text-purple-800">€{setter.bonusEarned}</p>
                      </div>
                    </div>

                    {/* Assigned Prospects Sample */}
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Recent Assignments:</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {setterProspects.slice(0, 3).map((prospect) => (
                          <div key={prospect.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                            <div>
                              <p className="font-medium">{prospect.businessName}</p>
                              <p className="text-gray-500">{prospect.city}</p>
                            </div>
                            <Badge className={getStatusColor(prospect.status)}>
                              {prospect.status}
                            </Badge>
                          </div>
                        ))}
                        {setterProspects.length > 3 && (
                          <p className="text-xs text-gray-500 text-center">
                            +{setterProspects.length - 3} more prospects
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Instructions */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <ArrowRight className="h-5 w-5 text-green-600 mt-1" />
            <div>
              <p className="text-green-800 font-medium mb-1">Assignment Instructions:</p>
              <div className="text-green-700 text-sm space-y-1">
                <p>• Drag prospects from the left panel and drop them onto setter cards</p>
                <p>• Green workload = optimal performance, Yellow = moderate load, Red = overloaded</p>
                <p>• High priority prospects (🔥) should go to top performers</p>
                <p>• Use auto-assign for optimal distribution based on setter performance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectAssignment;
