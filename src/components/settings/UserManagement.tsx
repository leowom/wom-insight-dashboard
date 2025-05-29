
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UserPlus, Shield, Eye, Settings, Trash2, Edit } from 'lucide-react';

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'Marco Rossi', email: 'marco@womconsulting.com', role: 'Admin', lastLogin: '2025-01-20 14:30', status: 'active', avatar: '' },
    { id: 2, name: 'Laura Bianchi', email: 'laura@womconsulting.com', role: 'Manager', lastLogin: '2025-01-20 12:15', status: 'active', avatar: '' },
    { id: 3, name: 'Andrea Verdi', email: 'andrea@womconsulting.com', role: 'Setter', lastLogin: '2025-01-19 16:45', status: 'active', avatar: '' },
    { id: 4, name: 'Sofia Neri', email: 'sofia@womconsulting.com', role: 'Terapista', lastLogin: '2025-01-18 09:20', status: 'inactive', avatar: '' },
    { id: 5, name: 'Luca Gialli', email: 'luca@womconsulting.com', role: 'View-only', lastLogin: '2025-01-20 11:00', status: 'active', avatar: '' }
  ]);

  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expirationDays: 90,
    preventReuse: 5
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 480,
    maxFailedAttempts: 5,
    lockoutDuration: 30
  });

  const rolePermissions = {
    'Admin': ['Full Access'],
    'Manager': ['View All', 'Edit Campaigns', 'View Reports', 'Manage Setters'],
    'Setter': ['View Assigned', 'Create Campaigns', 'Edit Own'],
    'Terapista': ['View Own Patients', 'View Payments'],
    'View-only': ['View Reports', 'View Dashboards']
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-500';
      case 'Manager': return 'bg-blue-500';
      case 'Setter': return 'bg-green-500';
      case 'Terapista': return 'bg-purple-500';
      case 'View-only': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-500">Attivo</Badge>
      : <Badge variant="outline">Inattivo</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* User Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-600">Utenti Totali</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'Admin').length}</p>
                <p className="text-sm text-gray-600">Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Attivi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'View-only').length}</p>
                <p className="text-sm text-gray-600">Sola Lettura</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New User */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Aggiungi Nuovo Utente</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="new-user-name">Nome Completo</Label>
              <Input id="new-user-name" placeholder="Nome e cognome" />
            </div>
            <div>
              <Label htmlFor="new-user-email">Email</Label>
              <Input id="new-user-email" type="email" placeholder="email@example.com" />
            </div>
            <div>
              <Label htmlFor="new-user-role">Ruolo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona ruolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="setter">Setter</SelectItem>
                  <SelectItem value="terapista">Terapista</SelectItem>
                  <SelectItem value="view-only">View-only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Aggiungi Utente
          </Button>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Utenti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  {getStatusBadge(user.status)}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="text-right">
                    <p>Ultimo accesso</p>
                    <p className="font-medium">{user.lastLogin}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matrice Permessi per Ruolo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge className={getRoleColor(role)}>{role}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((permission, index) => (
                    <Badge key={index} variant="outline">{permission}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Criteri Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-length">Lunghezza Minima</Label>
              <Input
                id="min-length"
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) => setPasswordPolicy({...passwordPolicy, minLength: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="expiration">Scadenza (giorni)</Label>
              <Input
                id="expiration"
                type="number"
                value={passwordPolicy.expirationDays}
                onChange={(e) => setPasswordPolicy({...passwordPolicy, expirationDays: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Richiedi Lettere Maiuscole</Label>
              <Switch
                checked={passwordPolicy.requireUppercase}
                onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireUppercase: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Richiedi Numeri</Label>
              <Switch
                checked={passwordPolicy.requireNumbers}
                onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireNumbers: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Richiedi Caratteri Speciali</Label>
              <Switch
                checked={passwordPolicy.requireSpecialChars}
                onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireSpecialChars: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Impostazioni Sicurezza</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Autenticazione a Due Fattori Obbligatoria</Label>
              <p className="text-sm text-gray-600">Richiedi 2FA per tutti gli utenti</p>
            </div>
            <Switch
              checked={securitySettings.twoFactorRequired}
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorRequired: checked})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="session-timeout">Timeout Sessione (minuti)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="max-attempts">Max Tentativi Falliti</Label>
              <Input
                id="max-attempts"
                type="number"
                value={securitySettings.maxFailedAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, maxFailedAttempts: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="lockout-duration">Durata Blocco (minuti)</Label>
              <Input
                id="lockout-duration"
                type="number"
                value={securitySettings.lockoutDuration}
                onChange={(e) => setSecuritySettings({...securitySettings, lockoutDuration: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Annulla</Button>
        <Button>Salva Impostazioni</Button>
      </div>
    </div>
  );
};

export default UserManagement;
