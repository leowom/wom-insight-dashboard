
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Play, Pause, MessageSquare, Check, CheckCheck, X, Clock } from 'lucide-react';

interface ActivityFeedProps {
  isLiveActive: boolean;
  selectedTypes: string[];
  onToggleLive: () => void;
}

interface Message {
  id: string;
  timestamp: string;
  patientName: string;
  patientPhone: string;
  terapista: string;
  messageType: string;
  content: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  account: string;
}

const WhatsAppActivityFeed: React.FC<ActivityFeedProps> = ({
  isLiveActive,
  selectedTypes,
  onToggleLive
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock real-time messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        timestamp: '2024-01-15 14:32:15',
        patientName: 'Maria Rossi',
        patientPhone: '+39 335 123 4567',
        terapista: 'Dr. Elena Bianchi',
        messageType: 'reminder-24h',
        content: 'Ciao Maria! Ti ricordiamo che domani alle 15:00 hai l\'appuntamento con Dr. Elena Bianchi per la tua seduta di fisioterapia.',
        status: 'read',
        account: '+39 320 111 0001'
      },
      {
        id: '2',
        timestamp: '2024-01-15 14:31:45',
        patientName: 'Giuseppe Verdi',
        patientPhone: '+39 340 987 6543',
        terapista: 'Dr. Marco Ferrari',
        messageType: 'nurturing-day3',
        content: 'Ciao Giuseppe! Come va il tuo percorso di riabilitazione? Ricorda che siamo sempre qui per supportarti.',
        status: 'delivered',
        account: '+39 320 111 0002'
      },
      {
        id: '3',
        timestamp: '2024-01-15 14:30:22',
        patientName: 'Anna Lombardi',
        patientPhone: '+39 347 555 1234',
        terapista: 'Dr. Sofia Greco',
        messageType: 'confirmation',
        content: 'Perfetto Anna! Il tuo appuntamento di domani alle 10:30 è confermato. Ci vediamo in studio!',
        status: 'sent',
        account: '+39 320 111 0003'
      },
      {
        id: '4',
        timestamp: '2024-01-15 14:29:10',
        patientName: 'Francesco Romano',
        patientPhone: '+39 333 777 8888',
        terapista: 'Dr. Andrea Ricci',
        messageType: 'payment',
        content: 'Ciao Francesco, ti ricordiamo che è possibile saldare la fattura per la seduta di ieri.',
        status: 'failed',
        account: '+39 320 111 0004'
      }
    ];

    setMessages(mockMessages);

    if (isLiveActive) {
      const interval = setInterval(() => {
        const newMessage: Message = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString('it-IT'),
          patientName: ['Lucia Costa', 'Roberto Neri', 'Valentina Bruno'][Math.floor(Math.random() * 3)],
          patientPhone: `+39 3${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
          terapista: ['Dr. Elena Bianchi', 'Dr. Marco Ferrari', 'Dr. Sofia Greco'][Math.floor(Math.random() * 3)],
          messageType: ['reminder-2h', 'nurturing-day1', 'confirmation'][Math.floor(Math.random() * 3)],
          content: 'Nuovo messaggio automatico inviato...',
          status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as 'sent' | 'delivered' | 'read',
          account: `+39 320 111 000${Math.floor(Math.random() * 5) + 1}`
        };

        setMessages(prev => [newMessage, ...prev.slice(0, 49)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLiveActive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-gray-500" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: 'default',
      delivered: 'secondary',
      read: 'default',
      failed: 'destructive'
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any} className="text-xs">
        {status === 'sent' ? 'Inviato' : 
         status === 'delivered' ? 'Consegnato' : 
         status === 'read' ? 'Letto' : 'Fallito'}
      </Badge>
    );
  };

  const getMessageTypeLabel = (type: string) => {
    const labels = {
      'reminder-24h': 'Promemoria 24h',
      'reminder-2h': 'Promemoria 2h',
      'nurturing-day1': 'Nurturing G1',
      'nurturing-day3': 'Nurturing G3',
      'nurturing-day7': 'Nurturing G7',
      'confirmation': 'Conferma',
      'payment': 'Pagamento',
      'custom': 'Personalizzato'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const filteredMessages = messages.filter(message => 
    selectedTypes.includes('all') || selectedTypes.includes(message.messageType)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Feed Attività WhatsApp
            {isLiveActive && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-normal text-green-600">LIVE</span>
              </div>
            )}
          </CardTitle>
          <Button
            variant={isLiveActive ? "destructive" : "default"}
            size="sm"
            onClick={onToggleLive}
            className="gap-2"
          >
            {isLiveActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isLiveActive ? 'Pausa' : 'Avvia'} Live
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div key={message.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {message.patientName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{message.patientName}</span>
                  <span className="text-xs text-gray-500">{message.patientPhone}</span>
                  <Badge variant="outline" className="text-xs">
                    {getMessageTypeLabel(message.messageType)}
                  </Badge>
                  {getStatusBadge(message.status)}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span>Terapista: {message.terapista}</span>
                  <span>•</span>
                  <span>Account: {message.account}</span>
                  <span>•</span>
                  <span>{message.timestamp}</span>
                </div>
                
                <p className="text-sm text-gray-700 line-clamp-2">{message.content}</p>
              </div>
              
              <div className="flex items-center gap-1">
                {getStatusIcon(message.status)}
              </div>
            </div>
          ))}
        </div>
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nessun messaggio trovato per i filtri selezionati</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsAppActivityFeed;
