
import React, { useState } from 'react';
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
  Calendar
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

const TerapistiManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data for terapisti
  const terapisti = [
    {
      id: '1',
      name: 'Dr. Marco Rossi',
      avatar: '',
      specialization: 'Osteopata',
      city: 'Milano',
      province: 'MI',
      patientsThisMonth: 45,
      patientsTrend: 'up',
      patientsChange: '+12%',
      revenueThisMonth: 4500,
      landingPageStatus: 'Live',
      campaignStatus: 'Active',
      cpa: '€35',
      lastActivity: '2 ore fa',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Dr.ssa Elena Bianchi',
      avatar: '',
      specialization: 'Fisioterapista',
      city: 'Roma',
      province: 'RM',
      patientsThisMonth: 38,
      patientsTrend: 'up',
      patientsChange: '+8%',
      revenueThisMonth: 3800,
      landingPageStatus: 'Live',
      campaignStatus: 'Active',
      cpa: '€42',
      lastActivity: '5 ore fa',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Dr. Giuseppe Verdi',
      avatar: '',
      specialization: 'Chiropratico',
      city: 'Torino',
      province: 'TO',
      patientsThisMonth: 35,
      patientsTrend: 'down',
      patientsChange: '-5%',
      revenueThisMonth: 3200,
      landingPageStatus: 'Draft',
      campaignStatus: 'Paused',
      cpa: '€38',
      lastActivity: '1 giorno fa',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Dr.ssa Anna Neri',
      avatar: '',
      specialization: 'Massoterapista',
      city: 'Napoli',
      province: 'NA',
      patientsThisMonth: 42,
      patientsTrend: 'up',
      patientsChange: '+15%',
      revenueThisMonth: 4200,
      landingPageStatus: 'Live',
      campaignStatus: 'Active',
      cpa: '€28',
      lastActivity: '3 ore fa',
      status: 'Active'
    },
    {
      id: '5',
      name: 'Dr. Luca Ferrari',
      avatar: '',
      specialization: 'Osteopata',
      city: 'Firenze',
      province: 'FI',
      patientsThisMonth: 28,
      patientsTrend: 'up',
      patientsChange: '+3%',
      revenueThisMonth: 2800,
      landingPageStatus: 'Paused',
      campaignStatus: 'Paused',
      cpa: '€45',
      lastActivity: '12 ore fa',
      status: 'Paused'
    }
  ];

  const cities = ['Milano', 'Roma', 'Torino', 'Napoli', 'Firenze'];
  const specializations = ['Osteopata', 'Fisioterapista', 'Chiropratico', 'Massoterapista'];

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialization('all');
    setSelectedCity('all');
    setSelectedStatus('all');
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(terapisti.map(t => t.id));
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

  const TerapistaDetailModal = ({ terapista }: { terapista: any }) => (
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
          </div>
        </DialogTitle>
      </DialogHeader>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{terapista.patientsThisMonth}</div>
            <div className="text-sm text-gray-600">Pazienti</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">30%</div>
            <div className="text-sm text-gray-600">Conversione</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">€{terapista.revenueThisMonth.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.2x</div>
            <div className="text-sm text-gray-600">ROI</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Pazienti</TabsTrigger>
          <TabsTrigger value="landing">Landing Page</TabsTrigger>
          <TabsTrigger value="campaigns">Campagne</TabsTrigger>
          <TabsTrigger value="payments">Pagamenti</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Informazioni Generali</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Email:</span> {terapista.name.toLowerCase().replace(' ', '.')}@email.com</div>
              <div><span className="font-medium">Telefono:</span> +39 333 123 4567</div>
              <div><span className="font-medium">Indirizzo:</span> Via Roma 123, {terapista.city}</div>
              <div><span className="font-medium">Data Iscrizione:</span> 15 Gen 2024</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="patients" className="mt-4">
          <p>Lista pazienti di {terapista.name}</p>
        </TabsContent>
        <TabsContent value="landing" className="mt-4">
          <p>Configurazione landing page</p>
        </TabsContent>
        <TabsContent value="campaigns" className="mt-4">
          <p>Gestione campagne pubblicitarie</p>
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <p>Storico pagamenti</p>
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
              <span className="text-sm text-gray-600">Total: <span className="font-semibold">50</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Active: <span className="font-semibold">48</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Paused: <span className="font-semibold">2</span></span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
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
                  <SelectItem key={spec} value={spec.toLowerCase()}>{spec}</SelectItem>
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
                  <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>
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
                    checked={selectedRows.length === terapisti.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Landing Page</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terapisti.map((terapista) => (
                <TableRow key={terapista.id} className="hover:bg-gray-50">
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
                    <span className="font-medium">€{terapista.revenueThisMonth.toLocaleString()}</span>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <TerapistaDetailModal terapista={terapista} />
                        </Dialog>
                        <DropdownMenuItem>
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
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TerapistiManagement;
