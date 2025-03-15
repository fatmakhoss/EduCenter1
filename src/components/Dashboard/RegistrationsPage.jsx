import React, { useEffect, useState } from 'react';
import { Users, Search, Filter, Check, X } from 'lucide-react';

function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Récupérer les inscriptions depuis l'API
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/admin/registrations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des inscriptions');
        }
        
        const data = await response.json();
        setRegistrations(data.registrations);
        
        // Extraire les cours uniques
        const uniqueCourses = [...new Set(data.registrations.map(reg => reg.course))];
        setCourses(uniqueCourses);
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
      const response = await fetch(`http://localhost:8000/api/admin/registrations/${id}/status`, {
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

  // Filtrer les inscriptions
  const filteredRegistrations = registrations.filter(reg => {
    // Filtre de recherche
    const searchMatch = reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre de statut
    const statusMatch = statusFilter === 'all' || reg.status === statusFilter;
    
    // Filtre de cours
    const courseMatch = courseFilter === 'all' || reg.course === courseFilter;
    
    return searchMatch && statusMatch && courseMatch;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des inscriptions</h1>
      
      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="px-4 py-2 border rounded-lg bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvé</option>
          <option value="rejected">Rejeté</option>
        </select>
        
        <select 
          className="px-4 py-2 border rounded-lg bg-white"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="all">Tous les cours</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>
      
      {/* Tableau des inscriptions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <p>Chargement des inscriptions...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 p-8 text-center">
            {error}
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-gray-500 p-8 text-center">
            Aucune inscription correspondant aux critères
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Étudiant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cours
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{registration.full_name}</div>
                        <div className="text-sm text-gray-500">{registration.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{registration.course}</div>
                    <div className="text-sm text-gray-500">{registration.level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{registration.email}</div>
                    <div className="text-sm text-gray-500">{registration.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(registration.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${registration.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {registration.status === 'approved' ? 'Approuvé' : 
                       registration.status === 'rejected' ? 'Rejeté' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {registration.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(registration.id, 'approved')}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <Check size={16} className="mr-1" /> Approuver
                        </button>
                        <button
                          onClick={() => handleStatusChange(registration.id, 'rejected')}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <X size={16} className="mr-1" /> Rejeter
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RegistrationsPage; 