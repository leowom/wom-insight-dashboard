import React from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, MessageSquare, Calendar, Euro, Clock, ChevronRight } from 'lucide-react';
import { Patient } from './PatientsManagement';

interface PatientKanbanBoardProps {
  patients: Patient[];
  onPatientMove: (patientId: string, newStatus: Patient['status']) => void;
  onPatientClick: (patient: Patient) => void;
  selectedPatients: string[];
  onPatientSelect: (selectedIds: string[]) => void;
}

const PatientKanbanBoard = ({
  patients,
  onPatientMove,
  onPatientClick,
  selectedPatients,
  onPatientSelect
}: PatientKanbanBoardProps) => {
  const kanbanColumns = [
    { id: 'new-leads', title: 'New Leads' },
    { id: 'nurturing', title: 'Nurturing' },
    { id: 'called', title: 'Called' },
    { id: 'appointment', title: 'Appointment' },
    { id: 'completed', title: 'Completed' },
    { id: 'paid', title: 'Paid' },
  ];

  const getPatientsForColumn = (columnId: string) => {
    return patients.filter(patient => patient.status === columnId);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as Patient['status'];

    onPatientMove(draggableId, newStatus);
  };

  const isPatientSelected = (patientId: string) => {
    return selectedPatients.includes(patientId);
  };

  const handlePatientCheckbox = (patientId: string) => {
    if (isPatientSelected(patientId)) {
      onPatientSelect(selectedPatients.filter(id => id !== patientId));
    } else {
      onPatientSelect([...selectedPatients, patientId]);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-6 gap-4">
        {kanbanColumns.map(column => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-4 rounded-md ${snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-gray-50'}`}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">{column.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    {getPatientsForColumn(column.id).map((patient, index) => (
                      <Draggable key={patient.id} draggableId={patient.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 p-3 rounded-md shadow-sm bg-white hover:shadow-md transition-shadow duration-200 ease-in-out ${snapshot.isDragging ? 'ring-2 ring-blue-500' : ''}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center">
                                <Checkbox
                                  id={`patient-${patient.id}`}
                                  checked={isPatientSelected(patient.id)}
                                  onCheckedChange={() => handlePatientCheckbox(patient.id)}
                                  className="mr-2"
                                />
                                <label htmlFor={`patient-${patient.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></label>
                                <div className="flex flex-col">
                                  <div className="font-semibold text-sm hover:underline cursor-pointer" onClick={() => onPatientClick(patient)}>{patient.name}</div>
                                  <div className="text-xs text-gray-500">{patient.phone}</div>
                                  <div className="flex items-center gap-1 text-xs mt-1">
                                    <Clock className="w-3 h-3" />
                                    {patient.lastActivity}
                                  </div>
                                </div>
                              </div>
                              {patient.whatsappStatus && (
                                <Badge variant="secondary" className="uppercase">
                                  {patient.whatsappStatus}
                                </Badge>
                              )}
                            </div>

                            <div className="mt-2 flex items-center space-x-2 text-xs">
                              <Button variant="ghost" size="icon" onClick={() => onPatientClick(patient)}>
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => onPatientClick(patient)}>
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => onPatientClick(patient)}>
                                <Calendar className="h-4 w-4" />
                              </Button>
                              {patient.paymentAmount && (
                                <div className="flex items-center">
                                  <Euro className="h-4 w-4 mr-1" />
                                  {patient.paymentAmount}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </CardContent>
                </Card>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default PatientKanbanBoard;
