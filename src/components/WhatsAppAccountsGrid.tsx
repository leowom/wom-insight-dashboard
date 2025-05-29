
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';

interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  status: 'active' | 'rate-limited' | 'error' | 'maintenance';
  messagesToday: number;
  messageLimit: number;
  healthScore: number;
  lastMessage: string;
  assignedTerapista: string;
}

const WhatsAppAccountsGrid = () => {
  const [accounts] = useState<WhatsAppAccount[]>([
    {
      id: '1',
      phoneNumber: '+39 320 111 0001',
      status: 'active',
      messagesToday: 45,
      messageLimit: 250,
      healthScore: 98,
      lastMessage: '2 min fa',
      assignedTerapista: 'Dr. Elena Bianchi'
    },
    {
      id: '2',
      phoneNumber: '+39 320 111 0002',
      status: 'active',
      messagesToday: 67,
      messageLimit: 250,
      healthScore: 95,
      lastMessage: '5 min fa',
      assignedTerapista: 'Dr. Marco Ferrari'
    },
    {
      id: '3',
      phoneNumber: '+39 320 111 0003',
      status: 'rate-limited',
      messagesToday: 248,
      messageLimit: 250,
      healthScore: 75,
      lastMessage: '1 ora fa',
      assignedTerapista: 'Dr. Sofia Greco'
    },
    {
      id: '4',
      phoneNumber: '+39 320 111 0004',
      status: 'error',
      messagesToday: 12,
      messageLimit: 250,
      healthScore: 25,
      lastMessage: '3 ore fa',
      assignedTerapista: 'Dr. Andrea Ricci'
    },
    {
      id: '5',
      phoneNumber: '+39 320 111 0005',
      status: 'active',
      messagesToday: 89,
      messageLimit: 250,
      healthScore: 92,
      lastMessage: '10 min fa',
      assignedTerapista: 'Dr. Laura Conti'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: 'Attivo', variant: 'default' as const, icon: CheckCircle },
      'rate-limited': { label: 'Rate Limited', variant: 'destructive' as const, icon: AlertTriangle },
      error: { label: 'Errore', variant: 'destructive' as const, icon: AlertTriangle },
      maintenance: { label: 'Manutenzione', variant: 'secondary' as const, icon: Settings }
    };

    const { label, variant, icon: Icon } = config[status as keyof typeof config];
    
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(a => a.status === 'active').length;
  const totalMessagesToday = accounts.reduce((sum, a) => sum + a.messagesToday, 0);
  const averageHealth = Math.round(accounts.reduce((sum, a) => sum + a.healthScore, 0) / accounts.length);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Account Totali</p>
                <p className="text-2xl font-bold">{totalAccounts}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Account Attivi</p>
                <p className="text-2xl font-bold text-green-600">{activeAccounts}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messaggi Oggi</p>
                <p className="text-2xl font-bold">{totalMessagesToday.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Health Score Medio</p>
                <p className="text-2xl font-bold">{averageHealth}%</p>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getHealthScoreColor(averageHealth)}`}>
                <span className="text-xs font-bold">{averageHealth}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {accounts.map((account) => {
          const usagePercentage = getUsagePercentage(account.messagesToday, account.messageLimit);
          
          return (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{account.phoneNumber}</CardTitle>
                  {getStatusBadge(account.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Terapista Assignment */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Terapista Assegnato</p>
                  <p className="text-sm font-medium">{account.assignedTerapista}</p>
                </div>

                {/* Message Usage */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Messaggi Inviati</span>
                    <span>{account.messagesToday}/{account.messageLimit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getUsageColor(usagePercentage)}`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{usagePercentage}% utilizzato</p>
                </div>

                {/* Health Score */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Health Score</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthScoreColor(account.healthScore)}`}>
                    {account.healthScore}%
                  </div>
                </div>

                {/* Last Message */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Ultimo Messaggio</span>
                  <span className="text-xs font-medium">{account.lastMessage}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Dettagli
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsAppAccountsGrid;
