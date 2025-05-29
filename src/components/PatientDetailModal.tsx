
import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Calendar, Euro, User, Clock, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface PatientDetailModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  patient,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'new-leads': { color: 'bg-red-100 text-red-800', label: 'New Lead' },
      'nurturing': { color: 'bg-yellow-100 text-yellow-800', label: 'Nurturing' },
      'called': { color: 'bg-blue-100 text-blue-800', label: 'Called' },
      'appointment': { color: 'bg-purple-100 text-purple-800', label: 'Appointment' },
      'completed': { color: 'bg-green-100 text-green-800', label: 'Completed' },
      'paid': { color: 'bg-emerald-100 text-emerald-800', label: 'Paid' },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    );
  };

  const mockTimeline = [
    { date: '2024-01-10', action: 'Lead created from Google Ads', status: 'new-leads' },
    { date: '2024-01-11', action: 'WhatsApp message sent', status: 'nurturing' },
    { date: '2024-01-12', action: 'Called by Dr. Bianchi', status: 'called' },
    { date: '2024-01-13', action: 'Appointment scheduled', status: 'appointment' },
  ];

  const mockWhatsAppHistory = [
    { time: '14:30', sender: 'bot', message: 'Ciao! Grazie per il tuo interesse nei nostri servizi.' },
    { time: '14:35', sender: 'patient', message: 'Vorrei informazioni sui vostri trattamenti' },
    { time: '14:40', sender: 'terapista', message: 'Certo! Che tipo di problema hai?' },
    { time: '14:45', sender: 'patient', message: 'Ho mal di schiena da alcune settimane' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{patient.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{patient.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{patient.terapista}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{patient.daysInStatus} days in status</span>
                </div>
                <div className="pt-2">
                  {getStatusBadge(patient.status)}
                </div>
                {patient.source && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{patient.source}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">85%</div>
                  <div className="text-xs text-gray-600">Engagement</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-600">€120</div>
                  <div className="text-xs text-gray-600">Value</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button className="w-full" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Patient
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send WhatsApp
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Converted
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Patient Journey</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        This patient was acquired through {patient.source || 'organic search'} and has been in the system for {patient.daysInStatus} days.
                      </div>
                      <div className="text-sm text-gray-600">
                        Currently assigned to {patient.terapista} for follow-up.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Patient Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        {mockTimeline.map((event, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <div className="text-sm font-medium">{event.action}</div>
                              <div className="text-xs text-gray-500">{event.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">WhatsApp Conversation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {mockWhatsAppHistory.map((message, index) => (
                          <div key={index} className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs p-2 rounded-lg text-sm ${
                              message.sender === 'patient' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <div>{message.message}</div>
                              <div className={`text-xs mt-1 ${
                                message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {message.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.appointmentDate ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {new Date(patient.appointmentDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">10:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{patient.terapista}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No appointments scheduled</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailModal;
