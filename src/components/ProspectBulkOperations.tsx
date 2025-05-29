
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
import { Input } from './ui/input';
import { 
  Users, 
  Mail, 
  Download, 
  Upload,
  UserPlus,
  MessageSquare,
  FileText,
  Target,
  X
} from 'lucide-react';

interface ProspectBulkOperationsProps {
  selectedProspects: string[];
  onClose: () => void;
}

const ProspectBulkOperations: React.FC<ProspectBulkOperationsProps> = ({
  selectedProspects,
  onClose
}) => {
  const [selectedTab, setSelectedTab] = useState('assign');
  const [selectedSetter, setSelectedSetter] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('introduction');

  const setters = [
    { id: 'marco', name: 'Marco Romano', workload: 23, capacity: 30 },
    { id: 'laura', name: 'Laura Santini', workload: 28, capacity: 35 },
    { id: 'giovanni', name: 'Giovanni Moretti', workload: 19, capacity: 25 }
  ];

  const emailTemplates = [
    { 
      id: 'introduction', 
      name: 'Introduction Template',
      subject: 'Migliora la tua presenza online - Servizi di Marketing per Terapisti',
      preview: 'Introducing our specialized marketing services...'
    },
    { 
      id: 'follow-up', 
      name: 'Follow-up Template',
      subject: 'Seguito alla nostra conversazione',
      preview: 'Following up on our previous conversation...'
    },
    { 
      id: 'demo-invitation', 
      name: 'Demo Invitation',
      subject: 'Dimostrazione gratuita dei nostri servizi',
      preview: 'We would like to invite you to a free demo...'
    }
  ];

  const handleBulkAssign = () => {
    console.log(`Assigning ${selectedProspects.length} prospects to ${selectedSetter}`);
    // Implementation for bulk assignment
    onClose();
  };

  const handleBulkEmail = () => {
    console.log(`Sending ${emailTemplate} template to ${selectedProspects.length} prospects`);
    // Implementation for bulk email
    onClose();
  };

  const handleExport = () => {
    console.log(`Exporting ${selectedProspects.length} prospects`);
    // Implementation for export
    onClose();
  };

  const getWorkloadColor = (workload: number, capacity: number) => {
    const percentage = (workload / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              Bulk Operations
              <Badge variant="secondary">{selectedProspects.length} prospects selected</Badge>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assign">Assign Setters</TabsTrigger>
            <TabsTrigger value="email">Bulk Email</TabsTrigger>
            <TabsTrigger value="export">Export Data</TabsTrigger>
            <TabsTrigger value="import">Import Prospects</TabsTrigger>
          </TabsList>

          <TabsContent value="assign" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assign Prospects to Setters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Setter Selection */}
                  <div>
                    <h4 className="font-medium mb-3">Select Setter (with load balancing recommendations)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {setters.map((setter) => (
                        <Card 
                          key={setter.id}
                          className={`cursor-pointer transition-all ${
                            selectedSetter === setter.id ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedSetter(setter.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{setter.name}</span>
                              <input
                                type="radio"
                                checked={selectedSetter === setter.id}
                                onChange={() => setSelectedSetter(setter.id)}
                                className="ml-2"
                              />
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Current Load:</span>
                                <span className={`font-medium ${getWorkloadColor(setter.workload, setter.capacity)}`}>
                                  {setter.workload}/{setter.capacity}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    (setter.workload / setter.capacity) >= 0.9 ? 'bg-red-500' :
                                    (setter.workload / setter.capacity) >= 0.75 ? 'bg-orange-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${(setter.workload / setter.capacity) * 100}%` }}
                                />
                              </div>
                              <div className="text-xs text-gray-500">
                                {setter.capacity - setter.workload} spots available
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Assignment Options */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Assignment Strategy</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="radio" name="strategy" defaultChecked className="mr-2" />
                        <span>Manual assignment to selected setter</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="strategy" className="mr-2" />
                        <span>Auto-distribute based on workload balancing</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="strategy" className="mr-2" />
                        <span>Round-robin assignment</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleBulkAssign}
                      disabled={!selectedSetter}
                      className="flex-1"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign {selectedProspects.length} Prospects
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Email Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Template Selection */}
                  <div>
                    <h4 className="font-medium mb-3">Select Email Template</h4>
                    <div className="space-y-3">
                      {emailTemplates.map((template) => (
                        <Card 
                          key={template.id}
                          className={`cursor-pointer transition-all ${
                            emailTemplate === template.id ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:shadow-sm'
                          }`}
                          onClick={() => setEmailTemplate(template.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="font-medium">{template.name}</span>
                                  <input
                                    type="radio"
                                    checked={emailTemplate === template.id}
                                    onChange={() => setEmailTemplate(template.id)}
                                    className="ml-auto"
                                  />
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                  <strong>Subject:</strong> {template.subject}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {template.preview}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Email Options */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Campaign Options</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Send immediately</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Schedule for optimal time (9:00 AM next business day)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Track email opens and clicks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Personalize with business name and location</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleBulkEmail} className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Send to {selectedProspects.length} Prospects
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Prospect Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Export Options */}
                  <div>
                    <h4 className="font-medium mb-3">Export Format</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:shadow-sm border-2 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">CSV for Calling</div>
                              <div className="text-sm text-gray-600">Optimized for call centers</div>
                            </div>
                            <input type="radio" name="format" defaultChecked />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer hover:shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Full Data Export</div>
                              <div className="text-sm text-gray-600">Complete prospect information</div>
                            </div>
                            <input type="radio" name="format" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Export Fields */}
                  <div>
                    <h4 className="font-medium mb-3">Include Fields</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      {[
                        'Business Name', 'Terapista Name', 'Phone', 'Email', 
                        'Address', 'Google Rating', 'Review Count', 'Specialization',
                        'Assigned Setter', 'Stage', 'Last Contact', 'Notes'
                      ].map((field) => (
                        <label key={field} className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span>{field}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleExport} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export {selectedProspects.length} Prospects
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Import New Prospects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Import Source */}
                  <div>
                    <h4 className="font-medium mb-3">Import Source</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:shadow-sm border-2 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Apify Google Maps Scraping</div>
                              <div className="text-sm text-gray-600">Fresh leads from Google Maps</div>
                            </div>
                            <input type="radio" name="source" defaultChecked />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer hover:shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">CSV Upload</div>
                              <div className="text-sm text-gray-600">Upload your own prospect list</div>
                            </div>
                            <input type="radio" name="source" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Import Settings */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Import Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <label className="block mb-1">Target Cities:</label>
                        <Input placeholder="Milano, Roma, Napoli, Torino..." />
                      </div>
                      <div>
                        <label className="block mb-1">Business Categories:</label>
                        <Input placeholder="Fisioterapia, Osteopatia, Riabilitazione..." />
                      </div>
                      <div>
                        <label className="block mb-1">Minimum Google Rating:</label>
                        <select className="w-full px-3 py-2 border rounded-md">
                          <option value="3.0">3.0+ Stars</option>
                          <option value="3.5">3.5+ Stars</option>
                          <option value="4.0">4.0+ Stars</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Start Import Process
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
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

export default ProspectBulkOperations;
