
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Phone,
  Mail,
  FileText,
  Star,
  MapPin,
  Clock,
  User,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';
import ProspectPipelineBoard from './ProspectPipelineBoard';
import ProspectDetailModal from './ProspectDetailModal';
import Breadcrumb from './Breadcrumb';

interface Prospect {
  id: string;
  businessName: string;
  terapistaName: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  googleRating: number;
  reviewCount: number;
  assignedSetter: string;
  stage: 'new-leads' | 'contacted' | 'appointment-set' | 'show' | 'converted';
  daysInStage: number;
  lastContact: string;
  conversionProbability: number;
  businessCategory: string;
  operatingHours: string;
  photos: string[];
  notes: string[];
  nextAction: string;
  addedDate: string;
}

const ProspectTerapistiManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProspects, setSelectedProspects] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    city: 'all',
    rating: 'all',
    setter: 'all',
    contactStatus: 'all'
  });

  const mockProspects: Prospect[] = [
    {
      id: '1',
      businessName: 'Centro Fisioterapia Milano',
      terapistaName: 'Dr. Marco Rossi',
      phone: '+39 02 1234567',
      email: 'info@centrofisio.it',
      city: 'Milano',
      province: 'MI',
      googleRating: 4.8,
      reviewCount: 127,
      assignedSetter: 'Andrea Bianchi',
      stage: 'new-leads',
      daysInStage: 2,
      lastContact: '2024-01-15',
      conversionProbability: 75,
      businessCategory: 'Fisioterapia',
      operatingHours: '8:00-20:00',
      photos: [],
      notes: ['Prima chiamata effettuata', 'Interessato ai nostri servizi'],
      nextAction: 'Follow-up call scheduled',
      addedDate: '2024-01-13'
    },
    {
      id: '2',
      businessName: 'Studio Osteopatico Roma',
      terapistaName: 'Dr.ssa Elena Verdi',
      phone: '+39 06 9876543',
      email: 'elena@osteoroma.it',
      city: 'Roma',
      province: 'RM',
      googleRating: 4.5,
      reviewCount: 89,
      assignedSetter: 'Giulia Neri',
      stage: 'contacted',
      daysInStage: 5,
      lastContact: '2024-01-10',
      conversionProbability: 60,
      businessCategory: 'Osteopatia',
      operatingHours: '9:00-19:00',
      photos: [],
      notes: ['Molto interessata', 'Vuole maggiori dettagli sui costi'],
      nextAction: 'Send pricing proposal',
      addedDate: '2024-01-05'
    },
    {
      id: '3',
      businessName: 'Clinica Riabilitazione Napoli',
      terapistaName: 'Dr. Luigi Blu',
      phone: '+39 081 5555555',
      email: 'info@riabnapoli.it',
      city: 'Napoli',
      province: 'NA',
      googleRating: 4.2,
      reviewCount: 203,
      assignedSetter: 'Marco Rossi',
      stage: 'appointment-set',
      daysInStage: 1,
      lastContact: '2024-01-14',
      conversionProbability: 85,
      businessCategory: 'Riabilitazione',
      operatingHours: '8:30-18:30',
      photos: [],
      notes: ['Appuntamento fissato per domani', 'Molto motivato'],
      nextAction: 'Prepare presentation materials',
      addedDate: '2024-01-08'
    }
  ];

  const stageStats = {
    'new-leads': { count: 45, conversionRate: 25, avgDays: 3 },
    'contacted': { count: 20, conversionRate: 40, avgDays: 7 },
    'appointment-set': { count: 8, conversionRate: 75, avgDays: 2 },
    'show': { count: 5, conversionRate: 80, avgDays: 1 },
    'converted': { count: 3, conversionRate: 100, avgDays: 0 }
  };

  const handleProspectClick = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setShowDetailModal(true);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for prospects:`, selectedProspects);
  };

  const filteredProspects = mockProspects.filter(prospect => {
    const matchesSearch = prospect.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.terapistaName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filters.city === 'all' || prospect.city === filters.city;
    const matchesRating = filters.rating === 'all' || 
                         (filters.rating === '4+' && prospect.googleRating >= 4) ||
                         (filters.rating === '3-4' && prospect.googleRating >= 3 && prospect.googleRating < 4);
    const matchesSetter = filters.setter === 'all' || prospect.assignedSetter === filters.setter;

    return matchesSearch && matchesCity && matchesRating && matchesSetter;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Prospect Management']} />
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prospect Terapisti Management</h1>
          <p className="text-gray-600">Manage your terapisti prospect pipeline</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Prospect
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Pipeline Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(stageStats).map(([stage, stats]) => {
          const stageNames = {
            'new-leads': 'New Leads',
            'contacted': 'Contacted', 
            'appointment-set': 'Appointment Set',
            'show': 'Show',
            'converted': 'Converted'
          };
          
          const stageColors = {
            'new-leads': 'bg-gray-100 text-gray-800',
            'contacted': 'bg-blue-100 text-blue-800',
            'appointment-set': 'bg-orange-100 text-orange-800', 
            'show': 'bg-purple-100 text-purple-800',
            'converted': 'bg-green-100 text-green-800'
          };

          return (
            <Card key={stage}>
              <CardContent className="p-4">
                <div className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${stageColors[stage as keyof typeof stageColors]}`}>
                  {stageNames[stage as keyof typeof stageNames]}
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{stats.count}</div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stats.conversionRate}% conversion
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {stats.avgDays} days avg
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by business name or terapista name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select 
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Cities</option>
                <option value="Milano">Milano</option>
                <option value="Roma">Roma</option>
                <option value="Napoli">Napoli</option>
                <option value="Torino">Torino</option>
              </select>

              <select 
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="4+">4+ Stars</option>
                <option value="3-4">3-4 Stars</option>
                <option value="below-3">Below 3 Stars</option>
              </select>

              <select 
                value={filters.setter}
                onChange={(e) => setFilters({...filters, setter: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Setters</option>
                <option value="Andrea Bianchi">Andrea Bianchi</option>
                <option value="Giulia Neri">Giulia Neri</option>
                <option value="Marco Rossi">Marco Rossi</option>
              </select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProspects.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedProspects.length} prospects selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('assign')}>
                  Assign Setter
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                  Bulk Email
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                  Export
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pipeline Board */}
      <ProspectPipelineBoard 
        prospects={filteredProspects}
        onProspectClick={handleProspectClick}
        selectedProspects={selectedProspects}
        onSelectProspect={setSelectedProspects}
      />

      {/* Prospect Detail Modal */}
      {selectedProspect && (
        <ProspectDetailModal
          prospect={selectedProspect}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onUpdate={(updatedProspect) => {
            console.log('Updated prospect:', updatedProspect);
            setShowDetailModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProspectTerapistiManagement;
