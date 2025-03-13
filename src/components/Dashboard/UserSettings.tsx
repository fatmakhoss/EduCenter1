import React from 'react';
import { User, Bell, Lock, Globe, Moon, Mail } from 'lucide-react';

function UserSettings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-6">Profil</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-600" />
                </div>
                <div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Changer la photo
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, GIF ou PNG. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    defaultValue="marie.dubois"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    defaultValue="marie.dubois@eduplatform.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Sécurité</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Mettre à jour le mot de passe
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Préférences</h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span>Notifications par email</span>
                  </div>
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" defaultChecked />
                </label>
              </div>
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5 text-gray-600" />
                    <span>Mode sombre</span>
                  </div>
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                </label>
              </div>
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                    <span>Langue</span>
                  </div>
                  <select className="form-select p-2 border rounded-md">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;