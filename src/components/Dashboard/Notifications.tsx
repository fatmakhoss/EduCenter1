import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Calendar } from 'lucide-react';

interface NotificationType {
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
  read: boolean;
}

function Notifications() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Toutes
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Non lues
            </button>
          </div>
          <button className="text-gray-600 hover:text-indigo-600">
            Tout marquer comme lu
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              type: 'info',
              title: 'Nouvelle session programmée',
              message: 'Une nouvelle session de Français B2 a été ajoutée pour demain à 14h00.',
              time: 'Il y a 5 minutes',
              icon: <Calendar className="h-6 w-6 text-blue-500" />,
              read: false
            },
            {
              type: 'success',
              title: 'Devoir évalué',
              message: 'Le devoir "Exercices de grammaire" a été corrigé. Consultez vos résultats.',
              time: 'Il y a 2 heures',
              icon: <CheckCircle className="h-6 w-6 text-green-500" />,
              read: false
            },
            {
              type: 'warning',
              title: 'Rappel de session',
              message: 'Votre session de Français A1 commence dans 30 minutes.',
              time: 'Il y a 3 heures',
              icon: <AlertCircle className="h-6 w-6 text-orange-500" />,
              read: true
            },
            {
              type: 'info',
              title: 'Nouvelle ressource disponible',
              message: 'Un nouveau document sur la conjugaison des verbes irréguliers a été ajouté.',
              time: 'Hier',
              icon: <Info className="h-6 w-6 text-blue-500" />,
              read: true
            }
          ].map((notification: NotificationType, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 p-4 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-indigo-50'
              }`}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white">
                {notification.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-600">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;