import React, { useState } from 'react';
import { Users, FileText, Video, Clock, BookOpen, Upload, Calendar, User, Search } from 'lucide-react';

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <TeacherProfile />;
      case 'materials':
        return <TeachingMaterials />;
      case 'students':
        return <StudentGroups />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="p-8">
      {/* Top Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-8">
          <NavButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={<Users />}
            text="Tableau de bord"
          />
          <NavButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            icon={<User />}
            text="Profil"
          />
          <NavButton
            active={activeTab === 'materials'}
            onClick={() => setActiveTab('materials')}
            icon={<FileText />}
            text="Matériel pédagogique"
          />
          <NavButton
            active={activeTab === 'students'}
            onClick={() => setActiveTab('students')}
            icon={<Users />}
            text="Groupes d'élèves"
          />
        </nav>
      </div>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

function DashboardOverview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tableau de bord de l'enseignant</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          title="Élèves actifs"
          value="48"
        />
        <StatCard
          icon={<FileText className="h-6 w-6 text-green-600" />}
          title="Ressources"
          value="24"
        />
        <StatCard
          icon={<Video className="h-6 w-6 text-purple-600" />}
          title="Sessions prévues"
          value="8"
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-orange-600" />}
          title="Heures enseignées"
          value="124h"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sessions d'aujourd'hui</h2>
          <div className="space-y-4">
            {[
              { time: '09:00', group: 'Français A1', students: 12 },
              { time: '11:00', group: 'Français B2', students: 8 },
              { time: '14:00', group: 'Français C1', students: 6 },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Video className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">{session.group}</p>
                    <p className="text-sm text-gray-500">{session.time} • {session.students} élèves</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                  Démarrer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[
              { action: 'Document ajouté', detail: 'Grammaire - Leçon 5', time: 'Il y a 2h' },
              { action: 'Session terminée', detail: 'Français A2 - Groupe 3', time: 'Il y a 3h' },
              { action: 'Devoir noté', detail: '15 devoirs corrigés', time: 'Il y a 5h' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.detail}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherProfile() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Profil de l'enseignant</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Marie Dubois</h3>
            <p className="text-gray-600">Professeur de français • 5 ans d'expérience</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                defaultValue="Marie Dubois"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                defaultValue="marie.dubois@eduplatform.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                defaultValue="+33 6 12 34 56 78"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Langue enseignée</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                defaultValue="Français"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              defaultValue="Professeur passionnée avec 5 ans d'expérience dans l'enseignement du français comme langue étrangère. Spécialisée dans les méthodes d'apprentissage interactives."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveaux enseignés</label>
            <div className="flex gap-2 flex-wrap">
              {['A1', 'A2', 'B1', 'B2', 'C1'].map((level) => (
                <span key={level} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {level}
                </span>
              ))}
            </div>
          </div>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Sauvegarder les modifications
          </button>
        </form>
      </div>
    </div>
  );
}

function TeachingMaterials() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Matériel pédagogique</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Upload className="h-5 w-5" />
          Ajouter un document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Grammaire - Les temps', type: 'PDF', size: '2.3 MB', level: 'B1' },
          { title: 'Vocabulaire - La ville', type: 'PDF', size: '1.8 MB', level: 'A2' },
          { title: 'Exercices - Conjugaison', type: 'PDF', size: '3.1 MB', level: 'B2' },
          { title: 'Culture - La gastronomie', type: 'PDF', size: '4.2 MB', level: 'C1' },
          { title: 'Phonétique - Les sons', type: 'Audio', size: '15 MB', level: 'A1' },
          { title: 'Compréhension orale', type: 'Audio', size: '18 MB', level: 'B1' },
        ].map((material, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">{material.title}</h3>
                <p className="text-sm text-gray-500">{material.type} • {material.size}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                Niveau {material.level}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-indigo-600">
                  <FileText className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600">
                  <Upload className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentGroups() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Groupes d'élèves</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un élève..."
              className="pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
          <select className="px-4 py-2 border rounded-md">
            <option>Tous les niveaux</option>
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[
          { name: 'Français A1 - Débutants', students: 12, schedule: 'Lundi et Mercredi, 9h-11h' },
          { name: 'Français B1 - Intermédiaire', students: 8, schedule: 'Mardi et Jeudi, 14h-16h' },
          { name: 'Français C1 - Avancé', students: 6, schedule: 'Vendredi, 10h-13h' },
        ].map((group, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{group.name}</h3>
                  <p className="text-gray-500">{group.students} élèves • {group.schedule}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md">
                Voir les détails
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, j) => (
                <div key={j} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Élève {j + 1}</p>
                    <p className="text-gray-500">Niveau {group.name.split(' ')[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-4 border-b-2 ${
        active
          ? 'border-indigo-600 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

function StatCard({ icon, title, value }) {
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

export default TeacherDashboard;