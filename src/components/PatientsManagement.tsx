
import React, { useState } from 'react';
import { Search, Filter, Calendar, Download, MessageSquare, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PatientKanbanBoard from './PatientKanbanBoard';
import PatientDetailModal from './PatientDetailModal';
import Breadcrumb from './Breadcrumb';

interface Patient {
  id: string;
  name: string;
  phone: string;
  terapista: string;
  daysInStatus: number;
  whatsappStatus: 'sent' | 'delivered' | 'read' | 'responded';
  status: 'new-leads' | 'nurturing' | 'called' | 'appointment' | 'completed' | 'paid';
  source?: string;
  appointmentDate?: string;
  paymentAmount?: number;
  addedDate: string;
  lastActivity: string;
  notes?: string;
  visitDate?: string;
  nextAction?: string;
  callStatus?: 'pending' | 'completed' | 'no-answer' | 'callback';
  responseStatus?: 'no-response' | 'interested' | 'not-interested' | 'callback';
}

const PatientsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerapista, setSelectedTerapista] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [quickFilter, setQuickFilter] = useState('all');

  // Generate realistic patient data
  const generatePatients = (): Patient[] => {
    const italianNames = [
      'Marco Rossi', 'Giulia Bianchi', 'Alessandro Conti', 'Francesca Romano', 'Matteo Lombardi',
      'Chiara Ricci', 'Davide Gallo', 'Valentina Bruno', 'Stefano Costa', 'Silvia Fontana',
      'Roberto Esposito', 'Paola Barbieri', 'Andrea Rizzo', 'Laura De Santis', 'Fabio Grassi',
      'Martina Poli', 'Simone Testa', 'Alessia Villa', 'Federico Moretti', 'Giorgia Ferretti',
      'Mario Ferrari', 'Sara Verdi', 'Luca Neri', 'Elena Viola', 'Antonio Gialli',
      'Federica Blu', 'Giuseppe Arancio', 'Monica Rosa', 'Daniele Grigio', 'Cristina Verde',
      'Nicola Marino', 'Serena Leone', 'Emilio Vitale', 'Teresa Orlando', 'Claudio Amato',
      'Roberta Caruso', 'Vincenzo Santoro', 'Emanuela Rinaldi', 'Lorenzo Marchetti', 'Michela Benedetti',
      'Riccardo Messina', 'Beatrice Monti', 'Enrico Gatti', 'Rossana Farina', 'Giuliano Sala',
      'Giovanna Colombo', 'Tommaso Cattaneo', 'Claudia Morelli', 'Filippo Sanna', 'Massimo Longo'
    ];

    const terapisti = ['Dr. Bianchi', 'Dr. Romano', 'Dr. Rossi', 'Dr. Verdi', 'Dr. Neri'];
    const sources = ['Google Ads', 'Facebook', 'Referral', 'Organic', 'Instagram'];
    
    const patients: Patient[] = [];
    let idCounter = 1;

    // New Leads - 150 patients
    for (let i = 0; i < 150; i++) {
      patients.push({
        id: `new-${idCounter++}`,
        name: italianNames[Math.floor(Math.random() * italianNames.length)],
        phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        terapista: terapisti[Math.floor(Math.random() * terapisti.length)],
        daysInStatus: Math.floor(Math.random() * 5) + 1,
        whatsappStatus: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as 'sent' | 'delivered' | 'read',
        status: 'new-leads',
        source: sources[Math.floor(Math.random() * sources.length)],
        addedDate: `${Math.floor(Math.random() * 7) + 1} giorni fa`,
        lastActivity: `${Math.floor(Math.random() * 24) + 1} ore fa`,
        notes: 'Nuovo lead acquisito'
      });
    }

    // Nurturing - 45 patients
    for (let i = 0; i < 45; i++) {
      patients.push({
        id: `nurturing-${idCounter++}`,
        name: italianNames[Math.floor(Math.random() * italianNames.length)],
        phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        terapista: terapisti[Math.floor(Math.random() * terapisti.length)],
        daysInStatus: Math.floor(Math.random() * 10) + 2,
        whatsappStatus: ['delivered', 'read', 'responded'][Math.floor(Math.random() * 3)] as 'delivered' | 'read' | 'responded',
        status: 'nurturing',
        source: sources[Math.floor(Math.random() * sources.length)],
        addedDate: `${Math.floor(Math.random() * 14) + 3} giorni fa`,
        lastActivity: `${Math.floor(Math.random() * 48) + 1} ore fa`,
        responseStatus: ['no-response', 'interested', 'callback'][Math.floor(Math.random() * 3)] as 'no-response' | 'interested' | 'callback',
        notes: 'In fase di nurturing automatico'
      });
    }

    // Called - 30 patients
    for (let i = 0; i < 30; i++) {
      patients.push({
        id: `called-${idCounter++}`,
        name: italianNames[Math.floor(Math.random() * italianNames.length)],
        phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        terapista: terapisti[Math.floor(Math.random() * terapisti.length)],
        daysInStatus: Math.floor(Math.random() * 7) + 1,
        whatsappStatus: 'read',
        status: 'called',
        source: sources[Math.floor(Math.random() * sources.length)],
        addedDate: `${Math.floor(Math.random() * 21) + 5} giorni fa`,
        lastActivity: `${Math.floor(Math.random() * 72) + 1} ore fa`,
        callStatus: ['pending', 'completed', 'no-answer', 'callback'][Math.floor(Math.random() * 4)] as 'pending' | 'completed' | 'no-answer' | 'callback',
        nextAction: 'Follow-up call programmed',
        notes: 'Chiamata effettuata'
      });
    }

    // Appointment Booked - 25 patients
    for (let i = 0; i < 25; i++) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 14) + 1);
      
      patients.push({
        id: `appointment-${idCounter++}`,
        name: italianNames[Math.floor(Math.random() * italianNames.length)],
        phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        terapista: terapisti[Math.floor(Math.random() * terapisti.length)],
        daysInStatus: Math.floor(Math.random() * 5) + 1,
        whatsappStatus: 'responded',
        status: 'appointment',
        source: sources[Math.floor(Math.random() * sources.length)],
        addedDate: `${Math.floor(Math.random() * 28) + 7} giorni fa`,
        lastActivity: `${Math.floor(Math.random() * 96) + 1} ore fa`,
        appointmentDate: futureDate.toISOString().split('T')[0],
        nextAction: 'Reminder 24h prima',
        notes: 'Appuntamento confermato'
      });
    }

    // Completed - 20 patients
    for (let i = 0; i < 20; i++) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 10) - 1);
      
      patients.push({
        id: `completed-${idCounter++}`,
        name: italianNames[Math.floor(Math.random() * italianNames.length)],
        phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        terapista: terapisti[Math.floor(Math.random() * terapisti.length)],
        daysInStatus: Math.floor(Math.random() * 10) + 1,
        whatsappStatus: 'responded',
        status: 'completed',
        source: sources[Math.floor(Math.random() * sources.length)],
        addedDate: `${Math.floor(Math.random() * 35) + 14} giorni fa`,
        lastActivity: `${Math.floor(Math.random() * 240) + 1} ore fa`,
        visitDate: pastDate.toISOString().split('T')[0],
        nextAction: 'Inviare fattura',
        notes: 'Visita completata con successo'
      });
    }

    // Paid - 15 patients
    for (let i = 0; i < 15; i++) {
      const paymentAmount = Math.floor(Math.random() * 30) + 50; // €50-€80
      
      patients.push({
        id: `paid-${idCounter++}`,
        name: italianNames[Math.floor(Math.random() * italianNames.length)],
        phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        terapista: terapisti[Math.floor(Math.random() * terapisti.length)],
        daysInStatus: Math.floor(Math.random() * 15) + 1,
        whatsappStatus: 'responded',
        status: 'paid',
        source: sources[Math.floor(Math.random() * sources.length)],
        addedDate: `${Math.floor(Math.random() * 42) + 21} giorni fa`,
        lastActivity: `${Math.floor(Math.random() * 336) + 1} ore fa`,
        paymentAmount,
        nextAction: 'Follow-up per recensione',
        notes: `Pagamento ricevuto: €${paymentAmount} (Commissione: €${Math.round(paymentAmount * 0.4)})`
      });
    }

    return patients;
  };

  const [patients, setPatients] = useState<Patient[]>(generatePatients());

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesTerapista = selectedTerapista === 'all' || patient.terapista === selectedTerapista;
    
    let matchesDateFilter = true;
    if (dateFilter === 'today') {
      matchesDateFilter = patient.addedDate.includes('oggi') || patient.addedDate.includes('1 giorni fa');
    } else if (dateFilter === 'week') {
      const daysAgo = parseInt(patient.addedDate.split(' ')[0]) || 0;
      matchesDateFilter = daysAgo <= 7;
    }

    let matchesQuickFilter = true;
    if (quickFilter === 'new-today') {
      matchesQuickFilter = patient.status === 'new-leads' && (patient.addedDate.includes('oggi') || patient.addedDate.includes('1 giorni fa'));
    } else if (quickFilter === 'overdue-calls') {
      matchesQuickFilter = patient.status === 'nurturing' && patient.daysInStatus > 5;
    } else if (quickFilter === 'appointments-week') {
      matchesQuickFilter = patient.status === 'appointment';
    }

    return matchesSearch && matchesTerapista && matchesDateFilter && matchesQuickFilter;
  });

  const handlePatientMove = (patientId: string, newStatus: Patient['status']) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { ...patient, status: newStatus, daysInStatus: 0 }
        : patient
    ));
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for patients:`, selectedPatients);
    // Implement bulk actions here
  };

  // Calculate summary stats
  const summaryStats = {
    'new-leads': filteredPatients.filter(p => p.status === 'new-leads').length,
    'nurturing': filteredPatients.filter(p => p.status === 'nurturing').length,
    'called': filteredPatients.filter(p => p.status === 'called').length,
    'appointment': filteredPatients.filter(p => p.status === 'appointment').length,
    'completed': filteredPatients.filter(p => p.status === 'completed').length,
    'paid': filteredPatients.filter(p => p.status === 'paid').length,
  };

  const totalRevenue = filteredPatients
    .filter(p => p.status === 'paid' && p.paymentAmount)
    .reduce((sum, p) => sum + (p.paymentAmount || 0), 0);

  const totalCommission = Math.round(totalRevenue * 0.4);

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Gestione', 'Pazienti']} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestione Pazienti</h1>
          <p className="text-gray-600 mt-1">Pipeline di conversione pazienti</p>
          <div className="flex items-center gap-6 mt-2 text-sm">
            <span className="text-gray-500">Totale: <span className="font-semibold text-gray-900">{patients.length}</span></span>
            <span className="text-gray-500">Revenue: <span className="font-semibold text-green-600">€{totalRevenue}</span></span>
            <span className="text-gray-500">Commissioni: <span className="font-semibold text-blue-600">€{totalCommission}</span></span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <Users className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedTerapista} onValueChange={setSelectedTerapista}>
              <SelectTrigger>
                <SelectValue placeholder="Select Terapista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Terapisti</SelectItem>
                <SelectItem value="Dr. Bianchi">Dr. Bianchi</SelectItem>
                <SelectItem value="Dr. Romano">Dr. Romano</SelectItem>
                <SelectItem value="Dr. Rossi">Dr. Rossi</SelectItem>
                <SelectItem value="Dr. Verdi">Dr. Verdi</SelectItem>
                <SelectItem value="Dr. Neri">Dr. Neri</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={quickFilter} onValueChange={setQuickFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Quick Filters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="new-today">Today's New</SelectItem>
                <SelectItem value="overdue-calls">Overdue Calls</SelectItem>
                <SelectItem value="appointments-week">Week Appointments</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedPatients.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-blue-900">
                  {selectedPatients.length} patients selected:
                </span>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('whatsapp')}>
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Send WhatsApp
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('assign')}>
                  <Users className="w-4 h-4 mr-1" />
                  Reassign
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setSelectedPatients([])}
                  className="text-red-600"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{summaryStats['new-leads']}</div>
            <div className="text-sm text-red-700">New Leads</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{summaryStats['nurturing']}</div>
            <div className="text-sm text-yellow-700">Nurturing</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{summaryStats['called']}</div>
            <div className="text-sm text-blue-700">Called</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{summaryStats['appointment']}</div>
            <div className="text-sm text-purple-700">Appointment</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{summaryStats['completed']}</div>
            <div className="text-sm text-green-700">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{summaryStats['paid']}</div>
            <div className="text-sm text-emerald-700">Paid</div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <PatientKanbanBoard
        patients={filteredPatients}
        onPatientMove={handlePatientMove}
        onPatientClick={handlePatientClick}
        selectedPatients={selectedPatients}
        onPatientSelect={setSelectedPatients}
      />

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientsManagement;
