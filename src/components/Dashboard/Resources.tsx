import React from 'react';
import { FileText, Upload, Download, Search } from 'lucide-react';

interface ResourceType {
  title: string;
  type: string;
  size: string;
  level: string;
  downloads: number;
}

function Resources() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Ressources pédagogiques</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                className="pl-10 pr-4 py-2 border rounded-md w-64"
              />
            </div>
            <select className="px-4 py-2 border rounded-md">
              <option>Tous les types</option>
              <option>Documents PDF</option>
              <option>Audio</option>
              <option>Vidéo</option>
              <option>Exercices</option>
            </select>
            <select className="px-4 py-2 border rounded-md">
              <option>Tous les niveaux</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Upload className="h-5 w-5" />
            Ajouter une ressource
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Grammaire - Les temps', type: 'PDF', size: '2.3 MB', level: 'B1', downloads: 45 },
            { title: 'Vocabulaire - La ville', type: 'PDF', size: '1.8 MB', level: 'A2', downloads: 32 },
            { title: 'Exercices - Conjugaison', type: 'PDF', size: '3.1 MB', level: 'B2', downloads: 28 },
            { title: 'Culture - La gastronomie', type: 'PDF', size: '4.2 MB', level: 'C1', downloads: 19 },
            { title: 'Phonétique - Les sons', type: 'Audio', size: '15 MB', level: 'A1', downloads: 56 },
            { title: 'Compréhension orale', type: 'Audio', size: '18 MB', level: 'B1', downloads: 41 }
          ].map((resource: ResourceType, index) => (
            <div key={index} className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.type} • {resource.size}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                    Niveau {resource.level}
                  </span>
                  <span className="text-sm text-gray-500">{resource.downloads} téléchargements</span>
                </div>
                <button className="p-2 text-gray-600 hover:text-indigo-600">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;