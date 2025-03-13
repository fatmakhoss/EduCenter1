import React from 'react';
import { Calendar, Video, Users, Clock } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

interface SessionType {
  title: string;
  time: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

function Sessions() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Sessions de cours</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Video className="h-6 w-6 text-blue-600" />}
          title="Sessions aujourd'hui"
          value="4"
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-green-600" />}
          title="Participants"
          value="32"
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-purple-600" />}
          title="Heures de cours"
          value="6h"
        />
        <StatCard
          icon={<Calendar className="h-6 w-6 text-orange-600" />}
          title="Sessions cette semaine"
          value="15"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Planning des sessions</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Nouvelle session
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              title: 'Français A1 - Grammaire',
              time: '09:00 - 10:30',
              participants: 8,
              status: 'upcoming'
            },
            {
              title: 'Français B2 - Conversation',
              time: '11:00 - 12:30',
              participants: 6,
              status: 'upcoming'
            },
            {
              title: 'Français C1 - Littérature',
              time: '14:00 - 15:30',
              participants: 4,
              status: 'upcoming'
            }
          ].map((session: SessionType, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Video className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">{session.title}</h3>
                  <p className="text-sm text-gray-500">
                    {session.time} • {session.participants} participants
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
                  Détails
                </button>
                <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Rejoindre
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Sessions;