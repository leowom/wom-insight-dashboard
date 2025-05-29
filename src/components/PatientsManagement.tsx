
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
  whatsappStatus: 'sent' | 'delivered' | 'read';
  status: 'new-leads' | 'nurturing' | 'called' | 'appointment' | 'completed' | 'paid';
  source?: string;
  appointmentDate?: string;
  paymentAmount?: number;
}

const PatientsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerapista, setSelectedTerapista] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  // Mock data for patients
  const mockPatients: Patient[] = [
    { id: '1', name: 'Marco Rossi', phone: '+39 345 123 4567', terapista: 'Dr. Bianchi', daysInStatus: 2, whatsappStatus: 'read', status: 'new-leads', source: 'Google Ads' },
    { id: '2', name: 'Giulia Verdi', phone: '+39 347 234 5678', terapista: 'Dr. Romano', daysInStatus: 5, whatsappStatus: 'delivered', status: 'nurturing' },
    { id: '3', name: 'Alessandro Neri', phone: '+39 349 345 6789', terapista: 'Dr. Bianchi', daysInStatus: 1, whatsappStatus: 'sent', status: 'called', appointmentDate: '2024-01-15' },
    { id: '4', name: 'Francesca Blu', phone: '+39 351 456 7890', terapista: 'Dr. Romano', daysInStatus: 3, whatsappStatus: 'read', status: 'appointment', appointmentDate: '2024-01-12' },
    { id: '5', name: 'Roberto Gialli', phone: '+39 353 567 8901', terapista: 'Dr. Bianchi', daysInStatus: 7, whatsappStatus: 'delivered', status: 'completed' },
    { id: '6', name: 'Elena Viola', phone: '+39 355 678 9012', terapista: 'Dr. Romano', daysInStatus: 10, whatsappStatus: 'read', status: 'paid', paymentAmount: 120 },
    // Add more mock patients for each column
    ...Array.from({ length: 144 }, (_, i) => ({
      id: `mock-${i + 7}`,
      name: `Patient ${i + 7}`,
      phone: `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
      terapista: ['Dr. Bianchi', 'Dr. Romano', 'Dr. Rossi'][Math.floor(Math.random() * 3)],
      daysInStatus: Math.floor(Math.random() * 30) + 1,
      whatsappStatus: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as 'sent' | 'delivered' | 'read',
      status: ['new-leads', 'nurturing', 'called', 'appointment', 'completed', 'paid'][Math.floor(Math.random() * 6)] as Patient['status'],
      source: ['Google Ads', 'Facebook', 'Referral', 'Organic'][Math.floor(Math.random() * 4)],
    }))
  ];

  const [patients, setPatients] = useState<Patient[]>(mockPatients);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesTerapista = selectedTerapista === 'all' || patient.terapista === selectedTerapista;
    return matchesSearch && matchesTerapista;
  });

  const handlePatientMove = (patientId: string, newStatus: Patient['status']) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { ...patient, status: newStatus, daysInStatus: 0 }
        : patient
    ));
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for patients:`, selectedPatients);
    // Implement bulk actions here
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Gestione', 'Pazienti']} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestione Pazienti</h1>
          <p className="text-gray-600 mt-1">Pipeline di conversione pazienti</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Quick Filters
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

      {/* Kanban Board */}
      <PatientKanbanBoard
        patients={filteredPatients}
        onPatientMove={handlePatientMove}
        onPatientClick={setSelectedPatient}
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
