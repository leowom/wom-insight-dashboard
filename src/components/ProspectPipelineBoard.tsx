
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
  TrendingUp
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
    { id: 'new-leads', name: 'New Leads', color: 'bg-gray-100 border-gray-300', count: 0 },
    { id: 'contacted', name: 'Contacted', color: 'bg-blue-50 border-blue-200', count: 0 },
    { id: 'appointment-set', name: 'Appointment Set', color: 'bg-orange-50 border-orange-200', count: 0 },
    { id: 'show', name: 'Show', color: 'bg-purple-50 border-purple-200', count: 0 },
    { id: 'converted', name: 'Converted', color: 'bg-green-50 border-green-200', count: 0 }
  ];

  // Count prospects in each stage
  stages.forEach(stage => {
    stage.count = prospects.filter(p => p.stage === stage.id).length;
  });

  const handleDragStart = (e: React.DragEvent, prospect: Prospect) => {
    e.dataTransfer.setData('text/plain', prospect.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const prospectId = e.dataTransfer.getData('text/plain');
    console.log(`Moving prospect ${prospectId} to stage ${targetStage}`);
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

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className={`flex-shrink-0 w-80 ${stage.color} rounded-lg border-2 border-dashed`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage.id)}
        >
          {/* Stage Header */}
          <div className="p-4 border-b bg-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{stage.name}</h3>
              <Badge variant="secondary" className="ml-2">
                {stage.count}
              </Badge>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Avg conversion: 65% • 3.2 days avg
            </div>
          </div>

          {/* Prospects in Stage */}
          <div className="p-2 max-h-96 overflow-y-auto space-y-3">
            {prospects
              .filter((prospect) => prospect.stage === stage.id)
              .map((prospect) => (
                <Card
                  key={prospect.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProspects.includes(prospect.id) ? 'ring-2 ring-blue-500' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, prospect)}
                  onClick={() => onProspectClick(prospect)}
                >
                  <CardContent className="p-4">
                    {/* Checkbox for selection */}
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

                    {/* Business Info */}
                    <div className="mb-3">
                      <h4 className="font-bold text-sm mb-1">{prospect.businessName}</h4>
                      <p className="text-sm text-gray-600 mb-1">{prospect.terapistaName}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-2">
                        {renderRatingStars(prospect.googleRating)}
                        <span className="text-xs text-gray-500">
                          {prospect.googleRating} ({prospect.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-1 mb-3 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        {prospect.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        {prospect.city}, {prospect.province}
                      </div>
                    </div>

                    {/* Assignment & Status */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-xs">
                        <User className="h-3 w-3 mr-2" />
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="ml-1 font-medium">{prospect.assignedSetter}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-2" />
                        {prospect.daysInStage} days in stage
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-1 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs py-1 h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Call', prospect.phone);
                        }}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs py-1 h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Email', prospect.email);
                        }}
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
                          console.log('Notes for', prospect.businessName);
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Notes
                      </Button>
                    </div>

                    {/* Next Action */}
                    {prospect.nextAction && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                        <span className="font-medium text-blue-800">Next:</span>
                        <span className="text-blue-700 ml-1">{prospect.nextAction}</span>
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
