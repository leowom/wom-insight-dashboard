
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Check, CheckCheck, Clock, Phone, MessageSquare } from 'lucide-react';

interface Conversation {
  id: string;
  patientName: string;
  patientPhone: string;
  terapista: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'completed' | 'pending';
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  type: 'sent' | 'received';
  status: 'sent' | 'delivered' | 'read';
  isAutomatic: boolean;
  messageType?: string;
}

const WhatsAppConversationView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      patientName: 'Maria Rossi',
      patientPhone: '+39 335 123 4567',
      terapista: 'Dr. Elena Bianchi',
      lastMessage: 'Grazie, ci vediamo domani!',
      lastMessageTime: '14:32',
      unreadCount: 0,
      status: 'active'
    },
    {
      id: '2',
      patientName: 'Giuseppe Verdi',
      patientPhone: '+39 340 987 6543',
      terapista: 'Dr. Marco Ferrari',
      lastMessage: 'Va bene, grazie per il supporto',
      lastMessageTime: '13:45',
      unreadCount: 1,
      status: 'active'
    },
    {
      id: '3',
      patientName: 'Anna Lombardi',
      patientPhone: '+39 347 555 1234',
      terapista: 'Dr. Sofia Greco',
      lastMessage: 'Perfetto, confermo l\'appuntamento',
      lastMessageTime: '12:30',
      unreadCount: 0,
      status: 'completed'
    }
  ];

  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        content: 'Ciao Maria! Ti ricordiamo che domani alle 15:00 hai l\'appuntamento con Dr. Elena Bianchi.',
        timestamp: '14:30',
        type: 'sent',
        status: 'read',
        isAutomatic: true,
        messageType: 'reminder-24h'
      },
      {
        id: '2',
        content: 'Perfetto, sarò puntuale. Grazie per il promemoria!',
        timestamp: '14:31',
        type: 'received',
        status: 'read',
        isAutomatic: false
      },
      {
        id: '3',
        content: 'Ottimo! Se hai qualche domanda, non esitare a scriverci.',
        timestamp: '14:31',
        type: 'sent',
        status: 'read',
        isAutomatic: false
      },
      {
        id: '4',
        content: 'Grazie, ci vediamo domani!',
        timestamp: '14:32',
        type: 'received',
        status: 'read',
        isAutomatic: false
      }
    ],
    '2': [
      {
        id: '5',
        content: 'Ciao Giuseppe! Come va il tuo percorso di riabilitazione?',
        timestamp: '13:40',
        type: 'sent',
        status: 'read',
        isAutomatic: true,
        messageType: 'nurturing-day3'
      },
      {
        id: '6',
        content: 'Va bene, grazie per il supporto',
        timestamp: '13:45',
        type: 'received',
        status: 'read',
        isAutomatic: false
      }
    ]
  };

  const quickReplies = [
    'Perfetto, ci sentiamo presto!',
    'Grazie per la conferma',
    'Ti ricordiamo di portare...',
    'Se hai domande, contattaci',
    'Appuntamento confermato'
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.patientPhone.includes(searchTerm)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-blue-500" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-green-500" />;
      default:
        return <Clock className="h-3 w-3 text-yellow-500" />;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Here you would implement the actual message sending logic
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversazioni
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cerca per nome o telefono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {conversation.patientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{conversation.patientName}</h4>
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-1">{conversation.patientPhone}</p>
                    <p className="text-xs text-gray-500 mb-2">Terapista: {conversation.terapista}</p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 truncate flex-1">{conversation.lastMessage}</p>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {conversations.find(c => c.id === selectedConversation)?.patientName.split(' ').map(n => n[0]).join('') || ''}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === selectedConversation)?.patientName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === selectedConversation)?.patientPhone}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto gap-2">
                  <Phone className="h-4 w-4" />
                  Chiama
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col h-96">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[selectedConversation]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'sent'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      {message.isAutomatic && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          Automatico
                        </Badge>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.type === 'sent' && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              <div className="border-t pt-3 mb-3">
                <p className="text-xs text-gray-500 mb-2">Risposte Rapide:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setNewMessage(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Scrivi un messaggio..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Seleziona una conversazione per iniziare</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default WhatsAppConversationView;
