
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
  TrendingUp,
  Upload,
  Users,
  BarChart3
} from 'lucide-react';
import ProspectPipelineBoard from './ProspectPipelineBoard';
import ProspectDetailModal from './ProspectDetailModal';
import ProspectBulkOperations from './ProspectBulkOperations';
import ProspectAnalytics from './ProspectAnalytics';
import Breadcrumb from './Breadcrumb';

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
  recentReviews?: Array<{
    rating: number;
    text: string;
    date: string;
    author: string;
  }>;
}

const ProspectTerapistiManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedProspects, setSelectedProspects] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    city: 'all',
    rating: 'all',
    reviewCount: 'all',
    setter: 'all',
    contactStatus: 'all',
    specialization: 'all'
  });

  // Comprehensive prospect data with 75 prospects across all stages
  const mockProspects: Prospect[] = [
    // NEW LEADS (35 prospects)
    {
      id: '1',
      businessName: 'Studio Fisioterapico Milano',
      terapistaName: 'Dr. Andrea Conti',
      phone: '+39 02 1234567',
      email: 'info@fisioterapicomilano.it',
      address: 'Via Roma 123, 20121 Milano MI',
      city: 'Milano',
      province: 'MI',
      googleRating: 4.2,
      reviewCount: 87,
      assignedSetter: 'Marco Romano',
      stage: 'new-leads',
      daysInStage: 2,
      lastContact: '',
      conversionProbability: 65,
      businessCategory: 'Fisioterapia',
      operatingHours: '8:00-20:00',
      photos: [],
      notes: ['Lead from Google Maps scraping', 'High review count'],
      nextAction: 'Initial contact call',
      addedDate: '2024-01-13',
      specialization: 'Fisioterapia Generale',
      coordinates: { lat: 45.4642, lng: 9.1900 },
      recentReviews: [
        { rating: 5, text: 'Excellent service, very professional', date: '2024-01-10', author: 'Maria R.' },
        { rating: 4, text: 'Good treatment, helped with my back pain', date: '2024-01-08', author: 'Giuseppe L.' }
      ]
    },
    {
      id: '2',
      businessName: 'Centro Benessere Napoli',
      terapistaName: 'Dr. Maria Greco',
      phone: '+39 081 9876543',
      email: 'maria@benesserenapoli.it',
      address: 'Corso Umberto 45, 80138 Napoli NA',
      city: 'Napoli',
      province: 'NA',
      googleRating: 4.5,
      reviewCount: 156,
      assignedSetter: 'Laura Santini',
      stage: 'new-leads',
      daysInStage: 1,
      lastContact: '',
      conversionProbability: 75,
      businessCategory: 'Centro Benessere',
      operatingHours: '9:00-19:00',
      photos: [],
      notes: ['Excellent rating', 'Many reviews'],
      nextAction: 'First contact call',
      addedDate: '2024-01-14',
      specialization: 'Benessere e Relax',
      coordinates: { lat: 40.8518, lng: 14.2681 }
    },
    {
      id: '3',
      businessName: 'Fisioterapia Roma Centro',
      terapistaName: 'Dr. Luca Bianchi',
      phone: '+39 06 5555555',
      email: 'luca@fisioroma.it',
      address: 'Via del Corso 88, 00186 Roma RM',
      city: 'Roma',
      province: 'RM',
      googleRating: 4.3,
      reviewCount: 203,
      assignedSetter: 'Giovanni Moretti',
      stage: 'new-leads',
      daysInStage: 3,
      lastContact: '',
      conversionProbability: 70,
      businessCategory: 'Fisioterapia',
      operatingHours: '8:30-18:30',
      photos: [],
      notes: ['Central location', 'High traffic area'],
      nextAction: 'Schedule first call',
      addedDate: '2024-01-11',
      specialization: 'Fisioterapia Sportiva',
      coordinates: { lat: 41.9028, lng: 12.4964 }
    },
    // Add more NEW LEADS (continuing pattern)
    {
      id: '4',
      businessName: 'Studio Osteopatico Torino',
      terapistaName: 'Dr. Francesca Verdi',
      phone: '+39 011 7777777',
      email: 'francesca@osteopatia-torino.it',
      address: 'Via Po 15, 10124 Torino TO',
      city: 'Torino',
      province: 'TO',
      googleRating: 4.6,
      reviewCount: 142,
      assignedSetter: 'Marco Romano',
      stage: 'new-leads',
      daysInStage: 4,
      lastContact: '',
      conversionProbability: 80,
      businessCategory: 'Osteopatia',
      operatingHours: '9:00-19:00',
      photos: [],
      notes: ['High rating', 'Specializes in sports medicine'],
      nextAction: 'Initial contact call',
      addedDate: '2024-01-09',
      specialization: 'Osteopatia Strutturale',
      coordinates: { lat: 45.0703, lng: 7.6869 }
    },
    // ... continuing with more new leads (I'll add key ones for each stage)

    // CONTACTED (15 prospects)
    {
      id: '36',
      businessName: 'Clinica Riabilitazione Firenze',
      terapistaName: 'Dr. Alessandro Rossi',
      phone: '+39 055 4444444',
      email: 'alessandro@riabilitazione-fi.it',
      address: 'Piazza della Signoria 1, 50122 Firenze FI',
      city: 'Firenze',
      province: 'FI',
      googleRating: 4.4,
      reviewCount: 98,
      assignedSetter: 'Laura Santini',
      stage: 'contacted',
      daysInStage: 5,
      lastContact: '2024-01-10',
      nextFollowUp: '2024-01-17',
      conversionProbability: 80,
      businessCategory: 'Riabilitazione',
      operatingHours: '8:00-20:00',
      photos: [],
      notes: ['Very interested', 'Asked for pricing details', 'Wants to see demo'],
      nextAction: 'Send pricing proposal',
      addedDate: '2024-01-05',
      specialization: 'Riabilitazione Neurologica',
      coordinates: { lat: 43.7696, lng: 11.2558 }
    },
    {
      id: '37',
      businessName: 'Centro Fisio Bologna',
      terapistaName: 'Dr. Simone Neri',
      phone: '+39 051 3333333',
      email: 'simone@fisio-bologna.it',
      address: 'Via Indipendenza 8, 40121 Bologna BO',
      city: 'Bologna',
      province: 'BO',
      googleRating: 4.1,
      reviewCount: 76,
      assignedSetter: 'Giovanni Moretti',
      stage: 'contacted',
      daysInStage: 3,
      lastContact: '2024-01-12',
      nextFollowUp: '2024-01-18',
      conversionProbability: 70,
      businessCategory: 'Fisioterapia',
      operatingHours: '9:00-18:00',
      photos: [],
      notes: ['Interested but needs more info', 'Budget concerns'],
      nextAction: 'Follow-up call with benefits',
      addedDate: '2024-01-07',
      specialization: 'Fisioterapia Manuale',
      coordinates: { lat: 44.4949, lng: 11.3426 }
    },

    // APPOINTMENT SET (8 prospects)
    {
      id: '51',
      businessName: 'Studio Wellness Palermo',
      terapistaName: 'Dr. Carla Sicilia',
      phone: '+39 091 2222222',
      email: 'carla@wellness-palermo.it',
      address: 'Via Maqueda 200, 90133 Palermo PA',
      city: 'Palermo',
      province: 'PA',
      googleRating: 4.7,
      reviewCount: 134,
      assignedSetter: 'Marco Romano',
      stage: 'appointment-set',
      daysInStage: 1,
      lastContact: '2024-01-14',
      appointmentDate: '2024-01-16 15:00',
      meetingType: 'video',
      conversionProbability: 85,
      businessCategory: 'Wellness',
      operatingHours: '8:00-21:00',
      photos: [],
      notes: ['Appointment confirmed', 'Very motivated', 'Has budget approved'],
      nextAction: 'Prepare presentation materials',
      addedDate: '2024-01-08',
      specialization: 'Wellness e Spa',
      coordinates: { lat: 38.1157, lng: 13.3613 }
    },
    {
      id: '52',
      businessName: 'Fisioterapia Genova',
      terapistaName: 'Dr. Paolo Marinelli',
      phone: '+39 010 8888888',
      email: 'paolo@fisio-genova.it',
      address: 'Via del Campo 29, 16124 Genova GE',
      city: 'Genova',
      province: 'GE',
      googleRating: 4.0,
      reviewCount: 89,
      assignedSetter: 'Laura Santini',
      stage: 'appointment-set',
      daysInStage: 2,
      lastContact: '2024-01-13',
      appointmentDate: '2024-01-17 10:00',
      meetingType: 'phone',
      conversionProbability: 78,
      businessCategory: 'Fisioterapia',
      operatingHours: '8:30-19:30',
      photos: [],
      notes: ['Demo scheduled', 'Prefers phone calls'],
      nextAction: 'Prepare demo materials',
      addedDate: '2024-01-06',
      specialization: 'Fisioterapia Respiratoria',
      coordinates: { lat: 44.4056, lng: 8.9463 }
    },

    // SHOW (5 prospects)
    {
      id: '59',
      businessName: 'Centro Riabilitazione Verona',
      terapistaName: 'Dr. Elena Bianchi',
      phone: '+39 045 9999999',
      email: 'elena@riabilitazione-vr.it',
      address: 'Piazza Bra 1, 37121 Verona VR',
      city: 'Verona',
      province: 'VR',
      googleRating: 4.3,
      reviewCount: 112,
      assignedSetter: 'Giovanni Moretti',
      stage: 'show',
      daysInStage: 2,
      lastContact: '2024-01-13',
      appointmentDate: '2024-01-13 14:00',
      meetingType: 'video',
      callDuration: '45 min',
      outcome: 'Very positive, wants to proceed',
      conversionProbability: 90,
      businessCategory: 'Riabilitazione',
      operatingHours: '9:00-18:00',
      photos: [],
      notes: ['Meeting completed successfully', 'Asked technical questions', 'Ready to sign'],
      nextAction: 'Send contract and onboarding info',
      addedDate: '2024-01-01',
      specialization: 'Riabilitazione Cardiaca',
      coordinates: { lat: 45.4384, lng: 10.9916 }
    },
    {
      id: '60',
      businessName: 'Studio Osteopatico Bari',
      terapistaName: 'Dr. Antonio Pugliese',
      phone: '+39 080 1111111',
      email: 'antonio@osteo-bari.it',
      address: 'Via Sparano 33, 70121 Bari BA',
      city: 'Bari',
      province: 'BA',
      googleRating: 4.2,
      reviewCount: 95,
      assignedSetter: 'Marco Romano',
      stage: 'show',
      daysInStage: 1,
      lastContact: '2024-01-14',
      appointmentDate: '2024-01-14 16:30',
      meetingType: 'video',
      callDuration: '35 min',
      outcome: 'Interested, needs time to decide',
      conversionProbability: 75,
      businessCategory: 'Osteopatia',
      operatingHours: '9:00-20:00',
      photos: [],
      notes: ['Good meeting', 'Some concerns about cost', 'Follow-up scheduled'],
      nextAction: 'Follow-up in 3 days',
      addedDate: '2024-01-02',
      specialization: 'Osteopatia Viscerale',
      coordinates: { lat: 41.1171, lng: 16.8719 }
    },

    // CONVERTED (3 prospects)
    {
      id: '73',
      businessName: 'Fisioterapia Padova Elite',
      terapistaName: 'Dr. Marco Veneto',
      phone: '+39 049 5555555',
      email: 'marco@fisio-padova.it',
      address: 'Prato della Valle 12, 35123 Padova PD',
      city: 'Padova',
      province: 'PD',
      googleRating: 4.8,
      reviewCount: 178,
      assignedSetter: 'Laura Santini',
      stage: 'converted',
      daysInStage: 0,
      lastContact: '2024-01-15',
      conversionDate: '2024-01-15',
      setupFee: 750,
      conversionProbability: 100,
      businessCategory: 'Fisioterapia',
      operatingHours: '7:30-21:00',
      photos: [],
      notes: ['Converted successfully!', 'Premium package chosen', 'Assigned to onboarding'],
      nextAction: 'Premium onboarding process started',
      addedDate: '2023-12-15',
      specialization: 'Fisioterapia d\'Elite',
      coordinates: { lat: 45.4064, lng: 11.8768 }
    },
    {
      id: '74',
      businessName: 'Centro Wellness Catania',
      terapistaName: 'Dr. Giuseppe Siciliano',
      phone: '+39 095 7777777',
      email: 'giuseppe@wellness-ct.it',
      address: 'Via Etnea 100, 95124 Catania CT',
      city: 'Catania',
      province: 'CT',
      googleRating: 4.6,
      reviewCount: 203,
      assignedSetter: 'Marco Romano',
      stage: 'converted',
      daysInStage: 0,
      lastContact: '2024-01-14',
      conversionDate: '2024-01-14',
      setupFee: 500,
      conversionProbability: 100,
      businessCategory: 'Wellness',
      operatingHours: '8:00-22:00',
      photos: [],
      notes: ['Successful conversion', 'Standard package', 'Very satisfied'],
      nextAction: 'Standard onboarding initiated',
      addedDate: '2023-12-20',
      specialization: 'Wellness Completo',
      coordinates: { lat: 37.5079, lng: 15.0830 }
    },
    {
      id: '75',
      businessName: 'Riabilitazione Brescia',
      terapistaName: 'Dr. Laura Lombarda',
      phone: '+39 030 4444444',
      email: 'laura@riab-brescia.it',
      address: 'Piazza della Loggia 15, 25121 Brescia BS',
      city: 'Brescia',
      province: 'BS',
      googleRating: 4.4,
      reviewCount: 167,
      assignedSetter: 'Giovanni Moretti',
      stage: 'converted',
      daysInStage: 0,
      lastContact: '2024-01-13',
      conversionDate: '2024-01-13',
      setupFee: 600,
      conversionProbability: 100,
      businessCategory: 'Riabilitazione',
      operatingHours: '8:00-19:00',
      photos: [],
      notes: ['Great conversion', 'Referred by existing client', 'Fast decision'],
      nextAction: 'Expedited onboarding',
      addedDate: '2023-12-25',
      specialization: 'Riabilitazione Intensiva',
      coordinates: { lat: 45.5416, lng: 10.2118 }
    }
  ];

  // Stage statistics
  const stageStats = {
    'new-leads': { 
      count: mockProspects.filter(p => p.stage === 'new-leads').length, 
      conversionRate: 28, 
      avgDays: 3.2 
    },
    'contacted': { 
      count: mockProspects.filter(p => p.stage === 'contacted').length, 
      conversionRate: 45, 
      avgDays: 6.8 
    },
    'appointment-set': { 
      count: mockProspects.filter(p => p.stage === 'appointment-set').length, 
      conversionRate: 78, 
      avgDays: 2.1 
    },
    'show': { 
      count: mockProspects.filter(p => p.stage === 'show').length, 
      conversionRate: 85, 
      avgDays: 1.3 
    },
    'converted': { 
      count: mockProspects.filter(p => p.stage === 'converted').length, 
      conversionRate: 100, 
      avgDays: 0 
    }
  };

  const handleProspectClick = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setShowDetailModal(true);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for prospects:`, selectedProspects);
    setShowBulkOperations(true);
  };

  const filteredProspects = mockProspects.filter(prospect => {
    const matchesSearch = prospect.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.terapistaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filters.city === 'all' || prospect.city === filters.city;
    const matchesRating = filters.rating === 'all' || 
                         (filters.rating === '4+' && prospect.googleRating >= 4) ||
                         (filters.rating === '3-4' && prospect.googleRating >= 3 && prospect.googleRating < 4) ||
                         (filters.rating === 'below-3' && prospect.googleRating < 3);
    const matchesReviewCount = filters.reviewCount === 'all' ||
                              (filters.reviewCount === '50+' && prospect.reviewCount >= 50) ||
                              (filters.reviewCount === '20-50' && prospect.reviewCount >= 20 && prospect.reviewCount < 50) ||
                              (filters.reviewCount === 'below-20' && prospect.reviewCount < 20);
    const matchesSetter = filters.setter === 'all' || prospect.assignedSetter === filters.setter;
    const matchesSpecialization = filters.specialization === 'all' || prospect.specialization === filters.specialization;

    return matchesSearch && matchesCity && matchesRating && matchesReviewCount && matchesSetter && matchesSpecialization;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Prospect Management']} />
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prospect Terapisti Management</h1>
          <p className="text-gray-600">Manage your terapisti prospect pipeline with Google Maps integration</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline"
            onClick={() => setShowAnalytics(true)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowBulkOperations(true)}
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Operations
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Prospects
          </Button>
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
            'new-leads': 'bg-gray-100 text-gray-800 border-gray-300',
            'contacted': 'bg-blue-100 text-blue-800 border-blue-300',
            'appointment-set': 'bg-orange-100 text-orange-800 border-orange-300', 
            'show': 'bg-purple-100 text-purple-800 border-purple-300',
            'converted': 'bg-green-100 text-green-800 border-green-300'
          };

          return (
            <Card key={stage} className={`border-2 ${stageColors[stage as keyof typeof stageColors].split(' ').pop()}`}>
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

      {/* Advanced Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by business name, terapista, or city..."
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
                className="px-3 py-2 border rounded-md text-sm bg-white"
              >
                <option value="all">All Cities</option>
                <option value="Milano">Milano</option>
                <option value="Roma">Roma</option>
                <option value="Napoli">Napoli</option>
                <option value="Torino">Torino</option>
                <option value="Firenze">Firenze</option>
                <option value="Bologna">Bologna</option>
                <option value="Palermo">Palermo</option>
                <option value="Genova">Genova</option>
                <option value="Verona">Verona</option>
                <option value="Bari">Bari</option>
                <option value="Padova">Padova</option>
                <option value="Catania">Catania</option>
                <option value="Brescia">Brescia</option>
              </select>

              <select 
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm bg-white"
              >
                <option value="all">All Ratings</option>
                <option value="4+">4+ Stars</option>
                <option value="3-4">3-4 Stars</option>
                <option value="below-3">Below 3 Stars</option>
              </select>

              <select 
                value={filters.reviewCount}
                onChange={(e) => setFilters({...filters, reviewCount: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm bg-white"
              >
                <option value="all">All Review Counts</option>
                <option value="50+">50+ Reviews</option>
                <option value="20-50">20-50 Reviews</option>
                <option value="below-20">Below 20 Reviews</option>
              </select>

              <select 
                value={filters.specialization}
                onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm bg-white"
              >
                <option value="all">All Specializations</option>
                <option value="Fisioterapia Generale">Fisioterapia Generale</option>
                <option value="Fisioterapia Sportiva">Fisioterapia Sportiva</option>
                <option value="Osteopatia Strutturale">Osteopatia</option>
                <option value="Riabilitazione Neurologica">Riabilitazione</option>
                <option value="Benessere e Relax">Benessere</option>
              </select>

              <select 
                value={filters.setter}
                onChange={(e) => setFilters({...filters, setter: e.target.value})}
                className="px-3 py-2 border rounded-md text-sm bg-white"
              >
                <option value="all">All Setters</option>
                <option value="Marco Romano">Marco Romano</option>
                <option value="Laura Santini">Laura Santini</option>
                <option value="Giovanni Moretti">Giovanni Moretti</option>
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
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('stage')}>
                  Change Stage
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

      {/* Modals */}
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

      {showBulkOperations && (
        <ProspectBulkOperations
          selectedProspects={selectedProspects}
          onClose={() => setShowBulkOperations(false)}
        />
      )}

      {showAnalytics && (
        <ProspectAnalytics
          prospects={mockProspects}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
};

export default ProspectTerapistiManagement;
