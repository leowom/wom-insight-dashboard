
import React from 'react';
import { MessageSquare, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface PatientKanbanBoardProps {
  patients: Patient[];
  onPatientMove: (patientId: string, newStatus: Patient['status']) => void;
  onPatientClick: (patient: Patient) => void;
  selectedPatients: string[];
  onPatientSelect: (patientIds: string[]) => void;
}

const PatientKanbanBoard: React.FC<PatientKanbanBoardProps> = ({
  patients,
  onPatientMove,
  onPatientClick,
  selectedPatients,
  onPatientSelect
}) => {
  const columns = [
    { id: 'new-leads', title: 'New Leads', color: 'bg-red-50 border-red-200', headerColor: 'bg-red-500' },
    { id: 'nurturing', title: 'Nurturing', color: 'bg-yellow-50 border-yellow-200', headerColor: 'bg-yellow-500' },
    { id: 'called', title: 'Called by Terapista', color: 'bg-blue-50 border-blue-200', headerColor: 'bg-blue-500' },
    { id: 'appointment', title: 'Appointment Booked', color: 'bg-purple-50 border-purple-200', headerColor: 'bg-purple-500' },
    { id: 'completed', title: 'Completed Visit', color: 'bg-green-50 border-green-200', headerColor: 'bg-green-500' },
    { id: 'paid', title: 'Paid', color: 'bg-emerald-50 border-emerald-200', headerColor: 'bg-emerald-500' },
  ];

  const getPatientsByStatus = (status: string) => {
    return patients.filter(patient => patient.status === status);
  };

  const getWhatsAppIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <MessageSquare className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'read':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const handleDragStart = (e: React.DragEvent, patient: Patient) => {
    e.dataTransfer.setData('text/plain', patient.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const patientId = e.dataTransfer.getData('text/plain');
    onPatientMove(patientId, status as Patient['status']);
  };

  const togglePatientSelection = (patientId: string) => {
    if (selectedPatients.includes(patientId)) {
      onPatientSelect(selectedPatients.filter(id => id !== patientId));
    } else {
      onPatientSelect([...selectedPatients, patientId]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {columns.map((column) => {
        const columnPatients = getPatientsByStatus(column.id);
        
        return (
          <div
            key={column.id}
            className="flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <Card className={`${column.color} border-2 h-full`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-gray-700">
                    {column.title}
                  </CardTitle>
                  <Badge variant="secondary" className={`${column.headerColor} text-white`}>
                    {columnPatients.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {columnPatients.map((patient) => (
                      <Card
                        key={patient.id}
                        className="cursor-pointer hover:shadow-md transition-shadow bg-white border"
                        draggable
                        onDragStart={(e) => handleDragStart(e, patient)}
                        onClick={() => onPatientClick(patient)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <input
                              type="checkbox"
                              checked={selectedPatients.includes(patient.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                togglePatientSelection(patient.id);
                              }}
                              className="mt-1"
                            />
                            <div className="flex items-center gap-1">
                              {getWhatsAppIcon(patient.whatsappStatus)}
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{patient.daysInStatus}d</span>
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {patient.name}
                          </h4>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Phone className="w-3 h-3" />
                              {patient.phone}
                            </div>
                            
                            <div className="text-xs text-gray-500">
                              Terapista: {patient.terapista}
                            </div>
                            
                            {patient.source && (
                              <Badge variant="outline" className="text-xs">
                                {patient.source}
                              </Badge>
                            )}
                            
                            {patient.appointmentDate && (
                              <div className="text-xs text-blue-600">
                                App: {new Date(patient.appointmentDate).toLocaleDateString()}
                              </div>
                            )}
                            
                            {patient.paymentAmount && (
                              <div className="text-xs text-green-600 font-semibold">
                                €{patient.paymentAmount}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default PatientKanbanBoard;
