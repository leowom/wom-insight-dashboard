
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Phone, 
  Mail, 
  FileText, 
  Star, 
  MapPin, 
  Clock, 
  User,
  TrendingUp,
  Calendar,
  ExternalLink
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

interface ProspectPipelineBoardProps {
  prospects: Prospect[];
  onProspectClick: (prospect: Prospect) => void;
  selectedProspects: string[];
  onSelectProspect: (selected: string[]) => void;
}

const ProspectPipelineBoard: React.FC<ProspectPipelineBoardProps> = ({
  prospects,
  onProspectClick,
  selectedProspects,
  onSelectProspect
}) => {
  const stages = [
    { 
      id: 'new-leads', 
      name: 'New Leads', 
      color: 'bg-gray-50 border-gray-200', 
      headerColor: 'bg-gray-100',
      count: 0 
    },
    { 
      id: 'contacted', 
      name: 'Contacted', 
      color: 'bg-blue-50 border-blue-200', 
      headerColor: 'bg-blue-100',
      count: 0 
    },
    { 
      id: 'appointment-set', 
      name: 'Appointment Set', 
      color: 'bg-orange-50 border-orange-200', 
      headerColor: 'bg-orange-100',
      count: 0 
    },
    { 
      id: 'show', 
      name: 'Show', 
      color: 'bg-purple-50 border-purple-200', 
      headerColor: 'bg-purple-100',
      count: 0 
    },
    { 
      id: 'converted', 
      name: 'Converted', 
      color: 'bg-green-50 border-green-200', 
      headerColor: 'bg-green-100',
      count: 0 
    }
  ];

  // Count prospects in each stage
  stages.forEach(stage => {
    stage.count = prospects.filter(p => p.stage === stage.id).length;
  });

  const handleDragStart = (e: React.DragEvent, prospect: Prospect) => {
    e.dataTransfer.setData('text/plain', prospect.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const prospectId = e.dataTransfer.getData('text/plain');
    console.log(`Moving prospect ${prospectId} to stage ${targetStage}`);
    // Here you would update the prospect's stage in your state management
  };

  const toggleProspectSelection = (prospectId: string) => {
    const isSelected = selectedProspects.includes(prospectId);
    if (isSelected) {
      onSelectProspect(selectedProspects.filter(id => id !== prospectId));
    } else {
      onSelectProspect([...selectedProspects, prospectId]);
    }
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getConversionColor = (probability: number) => {
    if (probability >= 80) return 'bg-green-100 text-green-800';
    if (probability >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handlePhoneCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`mailto:${email}`, '_self');
  };

  const handleGoogleMaps = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className={`flex-shrink-0 w-80 ${stage.color} rounded-lg border-2`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage.id)}
        >
          {/* Stage Header */}
          <div className={`p-4 border-b ${stage.headerColor} rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{stage.name}</h3>
              <Badge variant="secondary" className="ml-2">
                {stage.count}
              </Badge>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {stage.id === 'new-leads' && 'Fresh leads from scraping'}
              {stage.id === 'contacted' && 'Initial contact made'}
              {stage.id === 'appointment-set' && 'Demo scheduled'}
              {stage.id === 'show' && 'Meeting completed'}
              {stage.id === 'converted' && 'Paying customers'}
            </div>
          </div>

          {/* Prospects in Stage */}
          <div className="p-2 max-h-[500px] overflow-y-auto space-y-3">
            {prospects
              .filter((prospect) => prospect.stage === stage.id)
              .map((prospect) => (
                <Card
                  key={prospect.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                    selectedProspects.includes(prospect.id) 
                      ? 'ring-2 ring-blue-500 border-l-blue-500' 
                      : 'border-l-gray-300 hover:border-l-blue-400'
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, prospect)}
                  onClick={() => onProspectClick(prospect)}
                >
                  <CardContent className="p-4">
                    {/* Header with selection and probability */}
                    <div className="flex items-start justify-between mb-3">
                      <input
                        type="checkbox"
                        checked={selectedProspects.includes(prospect.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleProspectSelection(prospect.id);
                        }}
                        className="mt-1"
                      />
                      <Badge 
                        className={`text-xs ${getConversionColor(prospect.conversionProbability)}`}
                      >
                        {prospect.conversionProbability}% likely
                      </Badge>
                    </div>

                    {/* Business Info with Google Integration */}
                    <div className="mb-3">
                      <h4 className="font-bold text-sm mb-1 text-blue-900">{prospect.businessName}</h4>
                      <p className="text-sm text-gray-700 font-medium mb-1">{prospect.terapistaName}</p>
                      
                      {/* Google Rating with Stars */}
                      <div className="flex items-center space-x-2 mb-2">
                        {renderRatingStars(prospect.googleRating)}
                        <span className="text-sm font-medium text-gray-700">
                          {prospect.googleRating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({prospect.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Specialization */}
                      <Badge variant="outline" className="text-xs mb-2">
                        {prospect.specialization}
                      </Badge>
                    </div>

                    {/* Contact Info with Click Actions */}
                    <div className="space-y-1 mb-3 text-xs text-gray-600">
                      <div 
                        className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={(e) => handlePhoneCall(prospect.phone, e)}
                      >
                        <Phone className="h-3 w-3 mr-2" />
                        {prospect.phone}
                      </div>
                      <div 
                        className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={(e) => handleEmail(prospect.email, e)}
                      >
                        <Mail className="h-3 w-3 mr-2" />
                        {prospect.email}
                      </div>
                      <div 
                        className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={(e) => handleGoogleMaps(prospect.address, e)}
                      >
                        <MapPin className="h-3 w-3 mr-2" />
                        {prospect.city}, {prospect.province}
                        <ExternalLink className="h-2 w-2 ml-1" />
                      </div>
                    </div>

                    {/* Stage-specific Information */}
                    {prospect.stage === 'contacted' && prospect.nextFollowUp && (
                      <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                          <span className="font-medium text-blue-800">Next follow-up:</span>
                        </div>
                        <span className="text-blue-700 ml-4">{prospect.nextFollowUp}</span>
                      </div>
                    )}

                    {prospect.stage === 'appointment-set' && prospect.appointmentDate && (
                      <div className="mb-3 p-2 bg-orange-50 rounded text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-orange-600" />
                          <span className="font-medium text-orange-800">Appointment:</span>
                        </div>
                        <span className="text-orange-700 ml-4">{prospect.appointmentDate}</span>
                        {prospect.meetingType && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {prospect.meetingType}
                          </Badge>
                        )}
                      </div>
                    )}

                    {prospect.stage === 'show' && prospect.outcome && (
                      <div className="mb-3 p-2 bg-purple-50 rounded text-xs">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-purple-600" />
                          <span className="font-medium text-purple-800">Outcome:</span>
                        </div>
                        <span className="text-purple-700 ml-4">{prospect.outcome}</span>
                        {prospect.callDuration && (
                          <div className="text-purple-600 ml-4">Duration: {prospect.callDuration}</div>
                        )}
                      </div>
                    )}

                    {prospect.stage === 'converted' && prospect.setupFee && (
                      <div className="mb-3 p-2 bg-green-50 rounded text-xs">
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                          <span className="font-medium text-green-800">Setup Fee:</span>
                        </div>
                        <span className="text-green-700 ml-4">€{prospect.setupFee}</span>
                        {prospect.conversionDate && (
                          <div className="text-green-600 ml-4">Converted: {prospect.conversionDate}</div>
                        )}
                      </div>
                    )}

                    {/* Assignment & Status */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-xs">
                        <User className="h-3 w-3 mr-2" />
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="ml-1 font-medium text-blue-700">{prospect.assignedSetter}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-2" />
                        {prospect.daysInStage} days in stage
                        {prospect.lastContact && (
                          <span className="ml-2">• Last contact: {prospect.lastContact}</span>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-1 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs py-1 h-7"
                        onClick={(e) => handlePhoneCall(prospect.phone, e)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs py-1 h-7"
                        onClick={(e) => handleEmail(prospect.email, e)}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs py-1 h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('View notes for', prospect.businessName);
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Notes
                      </Button>
                    </div>

                    {/* Next Action */}
                    {prospect.nextAction && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        <span className="font-medium text-gray-800">Next:</span>
                        <span className="text-gray-700 ml-1">{prospect.nextAction}</span>
                      </div>
                    )}

                    {/* Operating Hours for New Leads */}
                    {prospect.stage === 'new-leads' && prospect.operatingHours && (
                      <div className="mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Hours: {prospect.operatingHours}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProspectPipelineBoard;
