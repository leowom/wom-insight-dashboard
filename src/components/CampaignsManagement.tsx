
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Bell, Play, Pause, Edit, Copy, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import CampaignDetailModal from './CampaignDetailModal';
import CampaignCreationWizard from './CampaignCreationWizard';
import CampaignAnalytics from './CampaignAnalytics';

const CampaignsManagement = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Mock campaign data
  const campaigns = [
    {
      id: '1',
      name: 'Dr. Mario Rossi - Fisioterapia',
      terapista: 'Dr. Mario Rossi',
      avatar: '/placeholder.svg',
      status: 'Active',
      dailyBudget: 25,
      spendToday: 18.50,
      spendMonth: 520,
      impressions: 12500,
      clicks: 245,
      ctr: 1.96,
      leads: 12,
      cpl: 8.50,
      roas: 4.2,
      trend: 'up',
      alerts: []
    },
    {
      id: '2',
      name: 'Dr. Anna Bianchi - Osteopatia',
      terapista: 'Dr. Anna Bianchi',
      avatar: '/placeholder.svg',
      status: 'Active',
      dailyBudget: 30,
      spendToday: 32.80,
      spendMonth: 890,
      impressions: 8900,
      clicks: 89,
      ctr: 1.0,
      leads: 5,
      cpl: 17.80,
      roas: 2.1,
      trend: 'down',
      alerts: ['high_cpl', 'low_ctr']
    },
    {
      id: '3',
      name: 'Dr. Giuseppe Verdi - Massoterapia',
      terapista: 'Dr. Giuseppe Verdi',
      avatar: '/placeholder.svg',
      status: 'Paused',
      dailyBudget: 20,
      spendToday: 0,
      spendMonth: 340,
      impressions: 5600,
      clicks: 156,
      ctr: 2.79,
      leads: 18,
      roas: 5.8,
      trend: 'up',
      alerts: []
    }
  ];

  const getAlertCount = () => {
    return campaigns.reduce((total, campaign) => total + campaign.alerts.length, 0);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Active': 'default',
      'Paused': 'secondary',
      'Draft': 'outline'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const getAlertBadges = (alerts: string[]) => {
    return alerts.map((alert, index) => {
      const alertConfig: { [key: string]: { color: string, text: string } } = {
        'high_cpl': { color: 'bg-red-100 text-red-800', text: 'High CPA' },
        'low_ctr': { color: 'bg-yellow-100 text-yellow-800', text: 'Low CTR' },
        'high_performance': { color: 'bg-green-100 text-green-800', text: 'High Performance' }
      };
      
      const config = alertConfig[alert] || { color: 'bg-gray-100 text-gray-800', text: alert };
      
      return (
        <span key={index} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color} mr-1`}>
          <AlertCircle className="h-3 w-3 mr-1" />
          {config.text}
        </span>
      );
    });
  };

  const toggleCampaignSelection = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestione Campagne Meta</h2>
          <p className="text-gray-600">Monitora e gestisci le campagne pubblicitarie</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowAnalytics(true)}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          
          <Button variant="outline" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
            {getAlertCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getAlertCount()}
              </span>
            )}
          </Button>
          
          <Button onClick={() => setShowCreateWizard(true)}>
            Nuova Campagna
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Campagne Attive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'Active').length}</div>
            <p className="text-xs text-gray-500">di {campaigns.length} totali</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Spesa Totale Oggi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{campaigns.reduce((sum, c) => sum + c.spendToday, 0).toFixed(2)}</div>
            <p className="text-xs text-gray-500">Budget giornaliero: €{campaigns.reduce((sum, c) => sum + c.dailyBudget, 0)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lead Generati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.leads, 0)}</div>
            <p className="text-xs text-green-600">+15% vs ieri</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">CPA Medio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{(campaigns.reduce((sum, c) => sum + c.cpl, 0) / campaigns.length).toFixed(2)}</div>
            <p className="text-xs text-red-600">+€2.30 vs obiettivo</p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedCampaigns.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedCampaigns.length} campagne selezionate
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pause className="h-4 w-4 mr-1" />
                  Pausa
                </Button>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-1" />
                  Attiva
                </Button>
                <Button size="sm" variant="outline">
                  Modifica Budget
                </Button>
                <Button size="sm" variant="outline">
                  Esporta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campagne Attive</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCampaigns(campaigns.map(c => c.id));
                      } else {
                        setSelectedCampaigns([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Campagna</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spesa</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>CPA</TableHead>
                <TableHead>ROAS</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => toggleCampaignSelection(campaign.id)}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={campaign.avatar} 
                        alt={campaign.terapista}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.terapista}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      {getStatusBadge(campaign.status)}
                      {campaign.alerts.length > 0 && (
                        <div>{getAlertBadges(campaign.alerts)}</div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">€{campaign.dailyBudget}/giorno</div>
                      <div className="text-sm text-gray-500">€{campaign.spendMonth}/mese</div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">€{campaign.spendToday.toFixed(2)}</div>
                      <Progress 
                        value={(campaign.spendToday / campaign.dailyBudget) * 100} 
                        className="h-2 mt-1"
                      />
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="text-sm">{campaign.impressions.toLocaleString()} impressioni</div>
                      <div className="text-sm">{campaign.clicks} click</div>
                      <div className="text-sm font-medium">CTR: {campaign.ctr}%</div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-bold">{campaign.leads}</div>
                      <div className="text-xs text-gray-500">questo mese</div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className={`font-medium ${campaign.cpl > 15 ? 'text-red-600' : campaign.cpl < 10 ? 'text-green-600' : 'text-yellow-600'}`}>
                      €{campaign.cpl.toFixed(2)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className={`font-medium ${campaign.roas > 4 ? 'text-green-600' : campaign.roas > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {campaign.roas.toFixed(1)}x
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center">
                      {campaign.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex gap-1">
                      <CampaignDetailModal campaign={campaign} />
                      
                      <Button size="sm" variant="ghost">
                        {campaign.status === 'Active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Creation Wizard */}
      <Dialog open={showCreateWizard} onOpenChange={setShowCreateWizard}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crea Nuova Campagna</DialogTitle>
          </DialogHeader>
          <CampaignCreationWizard onClose={() => setShowCreateWizard(false)} />
        </DialogContent>
      </Dialog>

      {/* Analytics Dashboard */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Analytics Campagne</DialogTitle>
          </DialogHeader>
          <CampaignAnalytics />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsManagement;
