
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Plus, 
  Download, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Play,
  Pause,
  MapPin,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  FileDown,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import Breadcrumb from './Breadcrumb';

interface Terapista {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  city: string;
  province: string;
  patientsThisMonth: number;
  patientsTrend: 'up' | 'down';
  patientsChange: string;
  revenueThisMonth: number;
  landingPageStatus: string;
  campaignStatus: string;
  cpa: string;
  lastActivity: string;
  status: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  conversionRate: number;
  roi: number;
  recentPatients: Array<{name: string; date: string; service: string}>;
}

const TerapistiManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTerapista, setSelectedTerapista] = useState<Terapista | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const itemsPerPage = 20;

  // Generate 50 realistic terapisti
  const terapisti: Terapista[] = [
    {
      id: '1', name: 'Dr. Marco Rossi', avatar: '', specialization: 'Osteopata', city: 'Milano', province: 'MI',
      patientsThisMonth: 18, patientsTrend: 'up', patientsChange: '+12%', revenueThisMonth: 468,
      landingPageStatus: 'Live', campaignStatus: 'Active', cpa: '€26', lastActivity: '2 ore fa', status: 'Active',
      phone: '+39 02 1234567', email: 'marco.rossi@email.com', address: 'Via Roma 123, Milano',
      joinDate: '15 Gen 2024', conversionRate: 32, roi: 4.2,
      recentPatients: [{name: 'Mario Bianchi', date: '12 Gen', service: 'Trattamento osteopatico'}]
    },
    {
      id: '2', name: 'Dr.ssa Giulia Bianchi', avatar: '', specialization: 'Fisioterapista', city: 'Roma', province: 'RM',
      patientsThisMonth: 15, patientsTrend: 'up', patientsChange: '+8%', revenueThisMonth: 390,
      landingPageStatus: 'Live', campaignStatus: 'Active', cpa: '€26', lastActivity: '5 ore fa', status: 'Active',
      phone: '+39 06 2345678', email: 'giulia.bianchi@email.com', address: 'Via del Corso 45, Roma',
      joinDate: '20 Gen 2024', conversionRate: 28, roi: 3.8,
      recentPatients: [{name: 'Anna Verdi', date: '11 Gen', service: 'Fisioterapia'}]
    },
    {
      id: '3', name: 'Dr. Antonio Verdi', avatar: '', specialization: 'Chiropratico', city: 'Napoli', province: 'NA',
      patientsThisMonth: 12, patientsTrend: 'down', patientsChange: '-5%', revenueThisMonth: 312,
      landingPageStatus: 'Draft', campaignStatus: 'Paused', cpa: '€32', lastActivity: '1 giorno fa', status: 'Active',
      phone: '+39 081 3456789', email: 'antonio.verdi@email.com', address: 'Via Chiaia 67, Napoli',
      joinDate: '25 Gen 2024', conversionRate: 24, roi: 3.2,
      recentPatients: [{name: 'Luigi Rossi', date: '10 Gen', service: 'Aggiustamento chiropratico'}]
    },
    // Continue with more realistic entries...
    {
      id: '4', name: 'Dr.ssa Elena Neri', avatar: '', specialization: 'Massoterapista', city: 'Torino', province: 'TO',
      patientsThisMonth: 22, patientsTrend: 'up', patientsChange: '+15%', revenueThisMonth: 572,
      landingPageStatus: 'Live', campaignStatus: 'Active', cpa: '€24', lastActivity: '3 ore fa', status: 'Active',
      phone: '+39 011 4567890', email: 'elena.neri@email.com', address: 'Via Po 89, Torino',
      joinDate: '10 Feb 2024', conversionRate: 35, roi: 4.8,
      recentPatients: [{name: 'Marco Ferrari', date: '12 Gen', service: 'Massaggio terapeutico'}]
    },
    {
      id: '5', name: 'Dr. Luca Ferrari', avatar: '', specialization: 'Osteopata', city: 'Firenze', province: 'FI',
      patientsThisMonth: 16, patientsTrend: 'up', patientsChange: '+3%', revenueThisMonth: 416,
      landingPageStatus: 'Live', campaignStatus: 'Active', cpa: '€28', lastActivity: '12 ore fa', status: 'Active',
      phone: '+39 055 5678901', email: 'luca.ferrari@email.com', address: 'Via Tornabuoni 12, Firenze',
      joinDate: '05 Feb 2024', conversionRate: 30, roi: 4.1,
      recentPatients: [{name: 'Sara Galli', date: '11 Gen', service: 'Trattamento osteopatico'}]
    }
    // ... I'll add more entries programmatically below
  ];

  // Generate additional 45 terapisti programmatically
  const additionalTerapisti: Terapista[] = Array.from({ length: 45 }, (_, i) => {
    const names = [
      'Dr. Alessandro Conti', 'Dr.ssa Francesca Romano', 'Dr. Giuseppe Marino', 'Dr.ssa Valentina Greco',
      'Dr. Matteo Lombardi', 'Dr.ssa Chiara Ricci', 'Dr. Stefano Gallo', 'Dr.ssa Monica Bruno',
      'Dr. Andrea Costa', 'Dr.ssa Silvia Fontana', 'Dr. Roberto Esposito', 'Dr.ssa Paola Barbieri',
      'Dr. Davide Rizzo', 'Dr.ssa Laura De Santis', 'Dr. Fabio Grassi', 'Dr.ssa Martina Poli',
      'Dr. Simone Testa', 'Dr.ssa Alessia Villa', 'Dr. Federico Moretti', 'Dr.ssa Giorgia Ferretti',
      'Dr. Daniele Mancini', 'Dr.ssa Serena Leone', 'Dr. Nicola Pellegrini', 'Dr.ssa Elisa Marini',
      'Dr. Vincenzo Santoro', 'Dr.ssa Roberta Caruso', 'Dr. Emilio Vitale', 'Dr.ssa Teresa Orlando',
      'Dr. Claudio Amato', 'Dr.ssa Cristina Palmieri', 'Dr. Riccardo Messina', 'Dr.ssa Emanuela Rinaldi',
      'Dr. Lorenzo Marchetti', 'Dr.ssa Federica Fabbri', 'Dr. Salvatore D\'Angelo', 'Dr.ssa Michela Benedetti',
      'Dr. Enrico Gatti', 'Dr.ssa Beatrice Monti', 'Dr. Giuliano Sala', 'Dr.ssa Rossana Farina',
      'Dr. Tommaso Cattaneo', 'Dr.ssa Giovanna Colombo', 'Dr. Filippo Sanna', 'Dr.ssa Claudia Morelli',
      'Dr. Massimo Longo'
    ];
    
    const specializations = ['Osteopata', 'Fisioterapista', 'Chiropratico', 'Massoterapista'];
    const cities = ['Milano', 'Roma', 'Napoli', 'Torino', 'Firenze', 'Bologna', 'Venezia', 'Genova', 'Palermo', 'Bari'];
    const provinces = {'Milano': 'MI', 'Roma': 'RM', 'Napoli': 'NA', 'Torino': 'TO', 'Firenze': 'FI', 'Bologna': 'BO', 'Venezia': 'VE', 'Genova': 'GE', 'Palermo': 'PA', 'Bari': 'BA'};
    
    const name = names[i % names.length];
    const specialization = specializations[i % specializations.length];
    const city = cities[i % cities.length];
    const patients = Math.floor(Math.random() * 30) + 5;
    const revenue = patients * (20 + Math.random() * 15);
    const trend = Math.random() > 0.3 ? 'up' : 'down';
    const changePercent = trend === 'up' ? `+${Math.floor(Math.random() * 20) + 1}%` : `-${Math.floor(Math.random() * 10) + 1}%`;
    
    return {
      id: (i + 6).toString(),
      name,
      avatar: '',
      specialization,
      city,
      province: provinces[city as keyof typeof provinces],
      patientsThisMonth: patients,
      patientsTrend: trend,
      patientsChange: changePercent,
      revenueThisMonth: Math.floor(revenue),
      landingPageStatus: Math.random() > 0.2 ? 'Live' : Math.random() > 0.5 ? 'Draft' : 'Paused',
      campaignStatus: Math.random() > 0.1 ? 'Active' : 'Paused',
      cpa: `€${Math.floor(Math.random() * 20) + 20}`,
      lastActivity: `${Math.floor(Math.random() * 24) + 1} ore fa`,
      status: Math.random() > 0.05 ? 'Active' : 'Paused',
      phone: `+39 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000000) + 1000000}`,
      email: `${name.toLowerCase().replace(/dr\.ssa?\s/g, '').replace(/\s/g, '.')}@email.com`,
      address: `Via ${['Roma', 'Milano', 'Venezia', 'Firenze'][Math.floor(Math.random() * 4)]} ${Math.floor(Math.random() * 200) + 1}, ${city}`,
      joinDate: `${Math.floor(Math.random() * 28) + 1} ${['Gen', 'Feb', 'Mar'][Math.floor(Math.random() * 3)]} 2024`,
      conversionRate: Math.floor(Math.random() * 20) + 20,
      roi: Math.round((Math.random() * 3 + 2) * 10) / 10,
      recentPatients: [{name: 'Paziente Test', date: '10 Gen', service: 'Trattamento'}]
    };
  });

  const allTerapisti = [...terapisti, ...additionalTerapisti];

  const cities = [...new Set(allTerapisti.map(t => t.city))].sort();
  const specializations = [...new Set(allTerapisti.map(t => t.specialization))].sort();

  // Filtering and sorting logic
  const filteredAndSortedTerapisti = useMemo(() => {
    let filtered = allTerapisti.filter(terapista => {
      const matchesSearch = terapista.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           terapista.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization = selectedSpecialization === 'all' || terapista.specialization === selectedSpecialization;
      const matchesCity = selectedCity === 'all' || terapista.city === selectedCity;
      const matchesStatus = selectedStatus === 'all' || terapista.status === selectedStatus;
      return matchesSearch && matchesSpecialization && matchesCity && matchesStatus;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortColumn as keyof Terapista];
      let bValue: any = b[sortColumn as keyof Terapista];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [allTerapisti, searchQuery, selectedSpecialization, selectedCity, selectedStatus, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTerapisti.length / itemsPerPage);
  const paginatedTerapisti = filteredAndSortedTerapisti.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSpecializationColor = (spec: string) => {
    const colors = {
      'Osteopata': 'bg-blue-100 text-blue-800',
      'Fisioterapista': 'bg-green-100 text-green-800',
      'Chiropratico': 'bg-purple-100 text-purple-800',
      'Massoterapista': 'bg-orange-100 text-orange-800'
    };
    return colors[spec as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Live': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Paused': 'bg-red-100 text-red-800',
      'Active': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialization('all');
    setSelectedCity('all');
    setSelectedStatus('all');
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedTerapisti.map(t => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for terapisti:`, selectedRows);
    // Implement bulk actions here
  };

  const TerapistaDetailModal = ({ terapista }: { terapista: Terapista }) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {terapista.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{terapista.name}</h3>
            <p className="text-gray-600">{terapista.specialization} • {terapista.city}</p>
            <p className="text-sm text-gray-500">{terapista.phone} • {terapista.email}</p>
          </div>
        </DialogTitle>
      </DialogHeader>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{terapista.patientsThisMonth}</div>
            <div className="text-sm text-gray-600">Pazienti</div>
            <div className={`text-xs flex items-center mt-1 ${terapista.patientsTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {terapista.patientsTrend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {terapista.patientsChange}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{terapista.conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversione</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">€{terapista.revenueThisMonth}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{terapista.roi}x</div>
            <div className="text-sm text-gray-600">ROI</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Pazienti Recenti</TabsTrigger>
          <TabsTrigger value="landing">Landing Page</TabsTrigger>
          <TabsTrigger value="campaigns">Campagne</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Informazioni Generali</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Email:</span> {terapista.email}</div>
              <div><span className="font-medium">Telefono:</span> {terapista.phone}</div>
              <div><span className="font-medium">Indirizzo:</span> {terapista.address}</div>
              <div><span className="font-medium">Data Iscrizione:</span> {terapista.joinDate}</div>
              <div><span className="font-medium">Landing Page:</span> <Badge className={getStatusColor(terapista.landingPageStatus)}>{terapista.landingPageStatus}</Badge></div>
              <div><span className="font-medium">Campagna:</span> <Badge className={getStatusColor(terapista.campaignStatus)}>{terapista.campaignStatus}</Badge></div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="patients" className="mt-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Ultimi 10 Pazienti</h4>
            <div className="border rounded-lg p-4">
              {terapista.recentPatients.map((patient, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-600">{patient.service}</div>
                  </div>
                  <div className="text-sm text-gray-500">{patient.date}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="landing" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Performance Landing Page</h4>
            <div className="grid grid-cols-3 gap-4">
              <Card><CardContent className="p-4"><div className="text-xl font-bold">1,247</div><div className="text-sm text-gray-600">Visite</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xl font-bold">89</div><div className="text-sm text-gray-600">Form Inviati</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xl font-bold">7.1%</div><div className="text-sm text-gray-600">Conversione</div></CardContent></Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="campaigns" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Performance Campagne</h4>
            <div className="grid grid-cols-4 gap-4">
              <Card><CardContent className="p-4"><div className="text-xl font-bold">€345</div><div className="text-sm text-gray-600">Spesa</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xl font-bold">45</div><div className="text-sm text-gray-600">Click</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xl font-bold">{terapista.cpa}</div><div className="text-sm text-gray-600">CPA</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xl font-bold">{terapista.roi}x</div><div className="text-sm text-gray-600">ROAS</div></CardContent></Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );

  return (
    <div className="space-y-6 font-['Inter',sans-serif]">
      <Breadcrumb items={['Gestione', 'Terapisti']} />
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Terapisti Management</h1>
          <div className="flex items-center space-x-6 mt-2">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Total: <span className="font-semibold">{allTerapisti.length}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Active: <span className="font-semibold">{allTerapisti.filter(t => t.status === 'Active').length}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Paused: <span className="font-semibold">{allTerapisti.filter(t => t.status === 'Paused').length}</span></span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => handleBulkAction('export')}>
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4" />
            <span>Add New Terapista</span>
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec} ({allTerapisti.filter(t => t.specialization === spec).length})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city} ({allTerapisti.filter(t => t.city === city).length})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active ({allTerapisti.filter(t => t.status === 'Active').length})</SelectItem>
                <SelectItem value="Paused">Paused ({allTerapisti.filter(t => t.status === 'Paused').length})</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-blue-900">
                  {selectedRows.length} terapisti selected:
                </span>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('whatsapp')}>
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Send WhatsApp
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                  <FileDown className="w-4 h-4 mr-1" />
                  Export CSV
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('status')}>
                  <UserCheck className="w-4 h-4 mr-1" />
                  Change Status
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setSelectedRows([])}
                  className="text-red-600"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terapisti Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === paginatedTerapisti.length && paginatedTerapisti.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50" 
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50" 
                  onClick={() => handleSort('city')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Location</span>
                    {getSortIcon('city')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50" 
                  onClick={() => handleSort('patientsThisMonth')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Patients</span>
                    {getSortIcon('patientsThisMonth')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50" 
                  onClick={() => handleSort('revenueThisMonth')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Revenue</span>
                    {getSortIcon('revenueThisMonth')}
                  </div>
                </TableHead>
                <TableHead>Landing Page</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTerapisti.map((terapista) => (
                <TableRow key={terapista.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(terapista.id)}
                      onCheckedChange={(checked) => handleSelectRow(terapista.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {terapista.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{terapista.name}</div>
                        <div className="text-sm text-gray-500">{terapista.status}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSpecializationColor(terapista.specialization)}>
                      {terapista.specialization}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{terapista.city}, {terapista.province}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{terapista.patientsThisMonth}</span>
                      <div className={`flex items-center space-x-1 ${terapista.patientsTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {terapista.patientsTrend === 'up' ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span className="text-xs">{terapista.patientsChange}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">€{terapista.revenueThisMonth}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(terapista.landingPageStatus)}>
                      {terapista.landingPageStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(terapista.campaignStatus)}>
                        {terapista.campaignStatus}
                      </Badge>
                      <div className="text-xs text-gray-500">CPA: {terapista.cpa}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{terapista.lastActivity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onSelect={(e) => {
                          e.preventDefault();
                          setSelectedTerapista(terapista);
                          setShowDetailModal(true);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => {
                          e.preventDefault();
                          setSelectedTerapista(terapista);
                          setShowEditModal(true);
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {terapista.status === 'Active' ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Resume
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Modals */}
      {selectedTerapista && showDetailModal && (
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <TerapistaDetailModal terapista={selectedTerapista} />
        </Dialog>
      )}
    </div>
  );
};

export default TerapistiManagement;
