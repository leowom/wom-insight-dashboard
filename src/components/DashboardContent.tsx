
import React from 'react';
import { Users, Building2, TrendingUp, DollarSign, Calendar, Phone } from 'lucide-react';
import Breadcrumb from './Breadcrumb';

const DashboardContent: React.FC = () => {
  const stats = [
    { title: 'Terapisti Attivi', value: '50', icon: Users, color: 'bg-blue-500' },
    { title: 'Pazienti Totali', value: '1,247', icon: Building2, color: 'bg-green-500' },
    { title: 'Chiamate Oggi', value: '89', icon: Phone, color: 'bg-purple-500' },
    { title: 'Fatturato Mensile', value: '€45,230', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { action: 'Nuovo paziente registrato', time: '2 minuti fa', type: 'success' },
    { action: 'Chiamata completata con prospect', time: '15 minuti fa', type: 'info' },
    { action: 'Pagamento ricevuto - €350', time: '1 ora fa', type: 'success' },
    { action: 'Appuntamento programmato', time: '2 ore fa', type: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={['Dashboard']} />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attività Recenti</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Nuovo Paziente
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Aggiungi Terapista
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Programma Chiamata
              </button>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prossimi Appuntamenti</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg border border-gray-100">
                <Calendar className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Dr. Bianchi</p>
                  <p className="text-xs text-gray-500">14:30 - Paziente: M. Rossi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg border border-gray-100">
                <Calendar className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Dr. Verdi</p>
                  <p className="text-xs text-gray-500">16:00 - Paziente: L. Neri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
