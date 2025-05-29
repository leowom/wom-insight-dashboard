
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
  Edit,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

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
    { 
      stage: 'New Lead', 
      date: prospect.addedDate, 
      completed: true,
      description: 'Prospect added to system'
    },
    { 
      stage: 'First Contact', 
      date: prospect.stage !== 'new-leads' ? prospect.lastContact : '', 
      completed: prospect.stage !== 'new-leads',
      description: 'Initial outreach completed'
    },
    { 
      stage: 'Appointment Set', 
      date: prospect.appointmentDate || '', 
      completed: ['appointment-set', 'show', 'converted'].includes(prospect.stage),
      description: 'Demo/meeting scheduled'
    },
    { 
      stage: 'Meeting Completed', 
      date: prospect.stage === 'show' || prospect.stage === 'converted' ? prospect.lastContact : '', 
      completed: ['show', 'converted'].includes(prospect.stage),
      description: 'Demo/meeting held'
    },
    { 
      stage: 'Converted', 
      date: prospect.conversionDate || '', 
      completed: prospect.stage === 'converted',
      description: 'Customer onboarded'
    }
  ];

  const contactHistory = [
    {
      id: '1',
      type: 'call',
      date: '2024-01-15 14:30',
      duration: '8 min',
      outcome: 'Very interested, wants detailed pricing info',
      setter: prospect.assignedSetter,
      notes: 'Asked about integrations with existing booking system'
    },
    {
      id: '2',
      type: 'email',
      date: '2024-01-14 10:15',
      subject: 'Introduzione ai nostri servizi di marketing',
      outcome: 'Email opened 3 times, clicked pricing link',
      setter: prospect.assignedSetter,
      notes: 'High engagement with email content'
    },
    {
      id: '3',
      type: 'call',
      date: '2024-01-13 16:45',
      duration: '5 min',
      outcome: 'Initial contact, very receptive and interested',
      setter: prospect.assignedSetter,
      notes: 'Expressed frustration with current marketing efforts'
    }
  ];

  const getConversionColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handlePhoneCall = () => {
    window.open(`tel:${prospect.phone}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${prospect.email}`, '_self');
  };

  const handleGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(prospect.address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const handleGoogleBusiness = () => {
    const searchQuery = encodeURIComponent(`${prospect.businessName} ${prospect.city}`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-3">
                {prospect.businessName}
                <Badge 
                  variant={prospect.stage === 'converted' ? 'default' : 'secondary'}
                  className={prospect.stage === 'converted' ? 'bg-green-600' : ''}
                >
                  {prospect.stage.replace('-', ' ').toUpperCase()}
                </Badge>
              </DialogTitle>
              <p className="text-gray-600 mt-1 text-lg">{prospect.terapistaName}</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-1">
                  {renderRatingStars(prospect.googleRating)}
                  <span className="font-medium">{prospect.googleRating}</span>
                  <span className="text-gray-500">({prospect.reviewCount} reviews)</span>
                </div>
                <Badge variant="outline">{prospect.specialization}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" onClick={handlePhoneCall}>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Header Info Card */}
        <Card className="border-2 border-blue-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Business Info */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Business Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium">{prospect.address}</div>
                      <div className="text-gray-600">{prospect.city}, {prospect.province}</div>
                    </div>
                  </div>
                  <div 
                    className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handlePhoneCall}
                  >
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.phone}
                  </div>
                  <div 
                    className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handleEmail}
                  >
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.email}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {prospect.operatingHours}
                  </div>
                </div>
              </div>

              {/* Assignment Info */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Assignment & Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium text-blue-700">{prospect.assignedSetter}</span>
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
                  {prospect.lastContact && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Last contact: {prospect.lastContact}
                    </div>
                  )}
                </div>
              </div>

              {/* Google Business Metrics */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Google Business Metrics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Rating:</span>
                    <div className="flex items-center space-x-1">
                      {renderRatingStars(prospect.googleRating)}
                      <span className="font-medium">{prospect.googleRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reviews:</span>
                    <span className="font-medium">{prospect.reviewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{prospect.businessCategory}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={handleGoogleBusiness}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Google
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Quick Actions</h3>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start" onClick={handlePhoneCall}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Prospect
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start" onClick={handleEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start" onClick={handleGoogleMaps}>
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Maps
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="contact-history">Contact History</TabsTrigger>
            <TabsTrigger value="google-reviews">Google Reviews</TabsTrigger>
            <TabsTrigger value="competitor-analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Status & Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Stage:</span>
                      <Badge variant="secondary" className="font-medium">
                        {prospect.stage.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Days in stage:</span>
                      <span className="font-medium">{prospect.daysInStage}</span>
                    </div>
                    {prospect.nextFollowUp && (
                      <div className="flex justify-between">
                        <span>Next follow-up:</span>
                        <span className="font-medium text-orange-600">{prospect.nextFollowUp}</span>
                      </div>
                    )}
                    {prospect.appointmentDate && (
                      <div className="flex justify-between">
                        <span>Appointment:</span>
                        <span className="font-medium text-blue-600">{prospect.appointmentDate}</span>
                      </div>
                    )}
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Target className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="font-medium text-blue-800">Next Action:</span>
                      </div>
                      <span className="text-blue-700">{prospect.nextAction}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes & Communication */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes & Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prospect.notes.map((note, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <div className="flex items-start">
                          <FileText className="h-3 w-3 mr-2 mt-0.5 text-gray-400" />
                          <span>{note}</span>
                        </div>
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

            {/* Conversion Probability Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversion Probability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getConversionColor(prospect.conversionProbability)}`}>
                      {prospect.conversionProbability}%
                    </div>
                    <div className="text-sm text-gray-600">Conversion Probability</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Positive Factors:</div>
                    <div className="space-y-1 text-xs">
                      {prospect.googleRating >= 4.0 && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          High Google rating ({prospect.googleRating})
                        </div>
                      )}
                      {prospect.reviewCount >= 50 && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Many reviews ({prospect.reviewCount})
                        </div>
                      )}
                      {prospect.daysInStage <= 3 && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Quick stage progression
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Risk Factors:</div>
                    <div className="space-y-1 text-xs">
                      {prospect.daysInStage > 7 && (
                        <div className="flex items-center text-orange-600">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Long time in stage ({prospect.daysInStage} days)
                        </div>
                      )}
                      {prospect.googleRating < 4.0 && (
                        <div className="flex items-center text-orange-600">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Lower rating ({prospect.googleRating})
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prospect Journey Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stageTimeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            item.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {item.stage}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.date || 'Pending'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
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
                    <div key={contact.id} className="border-l-4 border-blue-200 pl-4 py-3 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
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
                          {contact.subject && (
                            <span className="text-sm text-gray-600">"{contact.subject}"</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{contact.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 font-medium">{contact.outcome}</p>
                      <p className="text-xs text-gray-600 mb-2">{contact.notes}</p>
                      <p className="text-xs text-gray-500">by {contact.setter}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="google-reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Google Reviews Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Rating Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Rating Distribution</h4>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-3">
                            <span className="w-4">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-400" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : 5}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {rating === 5 ? '60%' : rating === 4 ? '25%' : rating === 3 ? '10%' : '5%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Key Metrics</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Average Rating:</span>
                          <span className="font-medium">{prospect.googleRating}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Reviews:</span>
                          <span className="font-medium">{prospect.reviewCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recent Activity:</span>
                          <span className="font-medium text-green-600">3 reviews this month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Reviews */}
                  <div>
                    <h4 className="font-medium mb-3">Recent Reviews</h4>
                    <div className="space-y-4">
                      {prospect.recentReviews?.map((review, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {renderRatingStars(review.rating)}
                              <span className="font-medium">{review.author}</span>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">"{review.text}"</p>
                        </div>
                      )) || (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg bg-green-50">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {renderRatingStars(5)}
                                <span className="font-medium">Maria R.</span>
                              </div>
                              <span className="text-sm text-gray-500">2024-01-10</span>
                            </div>
                            <p className="text-sm text-gray-700">"Excellent service, very professional staff. Highly recommend for anyone needing physiotherapy."</p>
                          </div>
                          <div className="p-4 border rounded-lg bg-blue-50">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {renderRatingStars(4)}
                                <span className="font-medium">Giuseppe L.</span>
                              </div>
                              <span className="text-sm text-gray-500">2024-01-08</span>
                            </div>
                            <p className="text-sm text-gray-700">"Good treatment, helped with my back pain. Clean facility and friendly staff."</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitor-analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Competitive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Market Position */}
                  <div>
                    <h4 className="font-medium mb-3">Market Position in {prospect.city}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-800">Rating Rank</div>
                        <div className="text-blue-600">Top 25% in area</div>
                        <div className="text-xs text-blue-600 mt-1">Above average for {prospect.businessCategory}</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Review Volume</div>
                        <div className="text-green-600">High engagement</div>
                        <div className="text-xs text-green-600 mt-1">{prospect.reviewCount} reviews vs 45 avg</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-medium text-orange-800">Growth Potential</div>
                        <div className="text-orange-600">High opportunity</div>
                        <div className="text-xs text-orange-600 mt-1">Limited digital presence</div>
                      </div>
                    </div>
                  </div>

                  {/* Nearby Competitors */}
                  <div>
                    <h4 className="font-medium mb-3">Nearby Competitors</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Centro Fisio Elite</div>
                          <div className="text-sm text-gray-600">0.8 km away • Fisioterapia</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {renderRatingStars(4.3)}
                            <span className="text-sm">4.3 (89 reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Studio Riabilitazione Plus</div>
                          <div className="text-sm text-gray-600">1.2 km away • Riabilitazione</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {renderRatingStars(3.9)}
                            <span className="text-sm">3.9 (156 reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Sales Strategy Recommendation</h4>
                    <p className="text-sm text-blue-700">
                      This prospect shows strong potential with above-average ratings and good review volume. 
                      Focus on digital marketing solutions to compete with nearby competitors who may have 
                      stronger online presence. Emphasize our proven track record with similar {prospect.businessCategory.toLowerCase()} practices.
                    </p>
                  </div>
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
