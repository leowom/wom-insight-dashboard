
import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Calendar, Euro, User, Clock, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
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

  const getWhatsAppBadge = (status: string) => {
    const statusMap = {
      'sent': { color: 'bg-gray-100 text-gray-800', label: 'Sent' },
      'delivered': { color: 'bg-blue-100 text-blue-800', label: 'Delivered' },
      'read': { color: 'bg-green-100 text-green-800', label: 'Read' },
      'responded': { color: 'bg-emerald-100 text-emerald-800', label: 'Responded' },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    );
  };

  const mockTimeline = [
    { 
      date: patient.addedDate, 
      action: `Lead created from ${patient.source || 'unknown source'}`, 
      status: 'new-leads',
      icon: User 
    },
    { 
      date: 'Day 1', 
      action: 'WhatsApp automation started', 
      status: 'nurturing',
      icon: MessageSquare 
    },
    ...(patient.status !== 'new-leads' && patient.status !== 'nurturing' ? [{
      date: 'Day 3', 
      action: `Called by ${patient.terapista}`, 
      status: 'called',
      icon: Phone 
    }] : []),
    ...(patient.appointmentDate ? [{
      date: patient.appointmentDate, 
      action: 'Appointment scheduled', 
      status: 'appointment',
      icon: Calendar 
    }] : []),
    ...(patient.visitDate ? [{
      date: patient.visitDate, 
      action: 'Visit completed', 
      status: 'completed',
      icon: CheckCircle2 
    }] : []),
    ...(patient.paymentAmount ? [{
      date: 'Today', 
      action: `Payment received: €${patient.paymentAmount}`, 
      status: 'paid',
      icon: Euro 
    }] : []),
  ];

  const mockWhatsAppHistory = [
    { time: '09:00', sender: 'bot', message: 'Ciao! Grazie per il tuo interesse nei nostri servizi di fisioterapia.' },
    { time: '09:05', sender: 'patient', message: 'Vorrei informazioni sui vostri trattamenti per il mal di schiena' },
    { time: '09:10', sender: 'bot', message: 'Perfetto! I nostri terapisti specializzati possono aiutarti. Che tipo di dolore provi?' },
    { time: '09:15', sender: 'patient', message: 'È un dolore alla zona lombare che persiste da alcune settimane' },
    { time: '09:20', sender: 'terapista', message: 'Ciao, sono Dr. Bianchi. Ti contatterò oggi per una consulenza gratuita.' },
    { time: '09:25', sender: 'patient', message: 'Perfetto, grazie! Sono disponibile dopo le 15:00' },
  ];

  const calculateEstimatedValue = () => {
    const baseValue = patient.status === 'paid' ? patient.paymentAmount || 0 : 
                     patient.status === 'completed' ? 65 :
                     patient.status === 'appointment' ? 55 :
                     patient.status === 'called' ? 35 :
                     patient.status === 'nurturing' ? 25 : 15;
    return baseValue;
  };

  const commission = patient.paymentAmount ? Math.round(patient.paymentAmount * 0.4) : Math.round(calculateEstimatedValue() * 0.4);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <span>{patient.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(patient.status)}
                  {getWhatsAppBadge(patient.whatsappStatus)}
                </div>
              </div>
            </div>
            <div className="text-right text-sm font-normal">
              <div className="text-gray-500">Estimated Value</div>
              <div className="text-lg font-bold text-green-600">€{calculateEstimatedValue()}</div>
              <div className="text-xs text-gray-400">Commission: €{commission}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(90vh-120px)]">
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
                  <span className="text-sm">{patient.daysInStatus} days in current status</span>
                </div>
                {patient.source && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Source: {patient.source}</span>
                  </div>
                )}
                {patient.nextAction && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{patient.nextAction}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">{patient.daysInStatus}</div>
                  <div className="text-xs text-gray-600">Days in Stage</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-600">€{calculateEstimatedValue()}</div>
                  <div className="text-xs text-gray-600">Est. Value</div>
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
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Converted
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <div className="mt-4 h-[calc(100%-60px)]">
                <TabsContent value="overview" className="space-y-4 h-full">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Patient Journey Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm text-gray-600">
                              <strong>Acquired:</strong> {patient.addedDate} via {patient.source || 'unknown source'}
                            </div>
                            <div className="text-sm text-gray-600">
                              <strong>Current Stage:</strong> {patient.status.replace('-', ' ').toUpperCase()} for {patient.daysInStatus} days
                            </div>
                            <div className="text-sm text-gray-600">
                              <strong>Assigned to:</strong> {patient.terapista}
                            </div>
                            <div className="text-sm text-gray-600">
                              <strong>Last Activity:</strong> {patient.lastActivity}
                            </div>
                            {patient.notes && (
                              <div className="text-sm text-gray-600">
                                <strong>Notes:</strong> {patient.notes}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Current Status Details */}
                      {patient.status === 'nurturing' && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Nurturing Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <strong>WhatsApp Status:</strong> {getWhatsAppBadge(patient.whatsappStatus)}
                              </div>
                              {patient.responseStatus && (
                                <div className="text-sm">
                                  <strong>Response Status:</strong> {patient.responseStatus.replace('-', ' ')}
                                </div>
                              )}
                              <div className="text-sm text-gray-600">
                                Automation sequence: Day {patient.daysInStatus} of nurturing
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {patient.status === 'called' && patient.callStatus && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Call Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <strong>Call Status:</strong> {patient.callStatus.replace('-', ' ')}
                              </div>
                              <div className="text-sm text-gray-600">
                                Called by {patient.terapista}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4 h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-sm">Patient Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-4">
                          {mockTimeline.map((event, index) => {
                            const IconComponent = event.icon;
                            return (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{event.action}</div>
                                  <div className="text-xs text-gray-500">{event.date}</div>
                                </div>
                                {index < mockTimeline.length - 1 && (
                                  <ArrowRight className="w-4 h-4 text-gray-300" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="whatsapp" className="space-y-4 h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-sm">WhatsApp Conversation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-3">
                          {mockWhatsAppHistory.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs p-3 rounded-lg text-sm ${
                                message.sender === 'patient' 
                                  ? 'bg-blue-500 text-white' 
                                  : message.sender === 'terapista'
                                  ? 'bg-green-100 text-green-900'
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <div className="text-xs opacity-75 mb-1">
                                  {message.sender === 'patient' ? 'Patient' : 
                                   message.sender === 'terapista' ? patient.terapista : 'Bot'}
                                </div>
                                <div>{message.message}</div>
                                <div className={`text-xs mt-1 opacity-75`}>
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

                <TabsContent value="appointments" className="space-y-4 h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-sm">Appointment Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {patient.appointmentDate ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span className="font-medium">Scheduled Appointment</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div>Date: {new Date(patient.appointmentDate).toLocaleDateString()}</div>
                              <div>Time: 10:00 AM</div>
                              <div>With: {patient.terapista}</div>
                              <div>Status: Confirmed</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Button className="w-full" size="sm">
                              Send Reminder
                            </Button>
                            <Button variant="outline" className="w-full" size="sm">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <div className="text-sm text-gray-500 mb-4">No appointments scheduled</div>
                          <Button size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Appointment
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4 h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-sm">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {patient.paymentAmount ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Euro className="w-4 h-4 text-green-600" />
                              <span className="font-medium">Payment Received</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div>Amount: €{patient.paymentAmount}</div>
                              <div>Commission (40%): €{Math.round(patient.paymentAmount * 0.4)}</div>
                              <div>Date: {patient.visitDate || 'Recent'}</div>
                              <div>Method: Bank Transfer</div>
                            </div>
                          </div>
                        </div>
                      ) : patient.status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                              <span className="font-medium">Payment Pending</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Visit completed on {patient.visitDate}. Awaiting payment.
                            </div>
                          </div>
                          <Button className="w-full" size="sm">
                            Send Invoice
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Euro className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <div className="text-sm text-gray-500">No payments yet</div>
                          <div className="text-xs text-gray-400 mt-2">
                            Estimated value: €{calculateEstimatedValue()}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailModal;
