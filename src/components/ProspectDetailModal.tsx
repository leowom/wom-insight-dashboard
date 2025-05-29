
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  User,
  Calendar,
  Target,
  TrendingUp,
  MessageSquare,
  FileText,
  ExternalLink,
  Edit
} from 'lucide-react';

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

interface ProspectDetailModalProps {
  prospect: Prospect;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (prospect: Prospect) => void;
}

const ProspectDetailModal: React.FC<ProspectDetailModalProps> = ({
  prospect,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const stageTimeline = [
    { stage: 'New Lead', date: prospect.addedDate, completed: true },
    { stage: 'Contacted', date: '2024-01-14', completed: true },
    { stage: 'Appointment Set', date: '', completed: false },
    { stage: 'Show', date: '', completed: false },
    { stage: 'Converted', date: '', completed: false }
  ];

  const contactHistory = [
    {
      id: '1',
      type: 'call',
      date: '2024-01-15 14:30',
      duration: '5 min',
      outcome: 'Interested, wants more info',
      setter: 'Andrea Bianchi'
    },
    {
      id: '2',
      type: 'email',
      date: '2024-01-14 10:15',
      subject: 'Introduzione ai nostri servizi',
      outcome: 'Email opened, no reply yet',
      setter: 'Andrea Bianchi'
    },
    {
      id: '3',
      type: 'call',
      date: '2024-01-13 16:45',
      duration: '3 min',
      outcome: 'Initial contact, very receptive',
      setter: 'Andrea Bianchi'
    }
  ];

  const getConversionColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{prospect.businessName}</DialogTitle>
              <p className="text-gray-600 mt-1">{prospect.terapistaName}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Header Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Business Info */}
              <div>
                <h3 className="font-semibold mb-3">Business Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.city}, {prospect.province}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.phone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.email}
                  </div>
                  <div className="flex items-center mt-3">
                    {renderRatingStars(prospect.googleRating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {prospect.googleRating} ({prospect.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Assignment Info */}
              <div>
                <h3 className="font-semibold mb-3">Assignment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.assignedSetter}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.daysInStage} days in current stage
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-gray-400" />
                    <span className={`font-medium ${getConversionColor(prospect.conversionProbability)}`}>
                      {prospect.conversionProbability}% conversion probability
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Prospect
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="contact-history">Contact History</TabsTrigger>
            <TabsTrigger value="google-info">Google Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Stage:</span>
                      <Badge variant="secondary">{prospect.stage.replace('-', ' ')}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Days in stage:</span>
                      <span className="font-medium">{prospect.daysInStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last contact:</span>
                      <span className="font-medium">{prospect.lastContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next action:</span>
                      <span className="font-medium text-blue-600">{prospect.nextAction}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {prospect.notes.map((note, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        {note}
                      </div>
                    ))}
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prospect Journey Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stageTimeline.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${
                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={`font-medium ${
                            item.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {item.stage}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.date || 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact-history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactHistory.map((contact) => (
                    <div key={contact.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {contact.type === 'call' ? (
                            <Phone className="h-4 w-4 text-green-600" />
                          ) : (
                            <Mail className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="font-medium capitalize">{contact.type}</span>
                          {contact.duration && (
                            <Badge variant="outline" className="text-xs">
                              {contact.duration}
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{contact.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{contact.outcome}</p>
                      <p className="text-xs text-gray-500">by {contact.setter}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="google-info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Google Maps Business Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Business Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-medium">{prospect.businessCategory}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Operating Hours:</span>
                          <span className="font-medium">{prospect.operatingHours}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Google Rating:</span>
                          <div className="flex items-center space-x-1">
                            {renderRatingStars(prospect.googleRating)}
                            <span className="font-medium">{prospect.googleRating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Reviews:</span>
                          <span className="font-medium">{prospect.reviewCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Recent Reviews Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-green-50 rounded">
                          <p className="text-green-800">"Excellent service, very professional"</p>
                          <p className="text-xs text-green-600 mt-1">⭐⭐⭐⭐⭐ 2 days ago</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded">
                          <p className="text-blue-800">"Great experience, highly recommend"</p>
                          <p className="text-xs text-blue-600 mt-1">⭐⭐⭐⭐⭐ 1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Google Maps Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProspectDetailModal;
