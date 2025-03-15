import React, { useEffect, useState } from 'react';
import { Users, BookOpen, Video, BarChart, UserPlus, DollarSign, Book, ChevronRight } from 'lucide-react';

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les inscriptions depuis l'API
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8001/api/admin/registrations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des inscriptions');
        }
        
        const data = await response.json();
        console.log("Données reçues:", data);
        
        // Vérifier si data est un tableau ou un objet avec une propriété registrations
        if (Array.isArray(data)) {
          setRegistrations(data);
        } else if (data && typeof data === 'object') {
          // Si c'est un objet, essayer de récupérer la propriété registrations ou toute autre propriété qui peut être un tableau
          if (data.registrations && Array.isArray(data.registrations)) {
            setRegistrations(data.registrations);
          } else {
            // Convertir l'objet en tableau si possible
            const entriesArray = Object.values(data);
            if (entriesArray.length > 0 && Array.isArray(entriesArray[0])) {
              setRegistrations(entriesArray[0]);
            } else {
              // Fallback: créer un tableau vide pour éviter les erreurs
              console.warn('Format de données inattendu:', data);
              setRegistrations([]);
            }
          }
        } else {
          // Fallback: créer un tableau vide
          setRegistrations([]);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger les inscriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8001/api/admin/registrations/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut');
      }

      // Mettre à jour l'état local après succès
      setRegistrations(registrations.map(reg => 
        reg.id === id ? { ...reg, status } : reg
      ));
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          title="Total Users"
          value="1,234"
          change="+12%"
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-green-600" />}
          title="Active Courses"
          value="45"
          change="+5%"
        />
        <StatCard
          icon={<Video className="h-6 w-6 text-purple-600" />}
          title="Live Sessions"
          value="8"
          change="Today"
        />
        <StatCard
          icon={<BarChart className="h-6 w-6 text-orange-600" />}
          title="Completion Rate"
          value="87%"
          change="+3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Registrations</h2>
            <a href="#" onClick={() => {
              const appComponent = document.querySelector('#root').__reactFiber$;
              let fiber = appComponent;
              
              // Traverse the fiber tree to find the App component instance
              while (fiber) {
                if (fiber.stateNode && typeof fiber.stateNode.handleSidebarClick === 'function') {
                  fiber.stateNode.handleSidebarClick('registrations');
                  break;
                }
                fiber = fiber.return;
              }
            }} className="text-sm text-indigo-600 hover:underline flex items-center">
              View all <ChevronRight size={16} />
            </a>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-4">
              <p>Chargement des inscriptions...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 text-center">
              {error}
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-gray-500 p-4 text-center">
              Aucune inscription à afficher
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.slice(0, 5).map((registration) => (
                <div key={registration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">{registration.full_name}</p>
                      <p className="text-sm text-gray-500">{registration.course} - {registration.level}</p>
                      <p className="text-xs text-gray-400">{new Date(registration.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {registration.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStatusChange(registration.id, 'approved')}
                        className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md">
                        Approuver
                      </button>
                      <button 
                        onClick={() => handleStatusChange(registration.id, 'rejected')}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                        Rejeter
                      </button>
                    </div>
                  ) : (
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      registration.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {registration.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Video className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">English Advanced - Group {i}</p>
                    <p className="text-sm text-gray-500">Today at {i + 1}:00 PM</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className="text-sm text-green-600">{change}</span>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default AdminDashboard;