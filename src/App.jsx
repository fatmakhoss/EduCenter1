import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar, Bell, FileText, Settings, LogOut, UserPlus } from 'lucide-react';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import TeacherDashboard from './components/Dashboard/TeacherDashboard.jsx';
import StudentDashboard from './components/Dashboard/StudentDashboard.jsx';
import RegistrationsPage from './components/Dashboard/RegistrationsPage.jsx';
import Login from './components/Dashboard/Login';
import Sessions from './components/Dashboard/Sessions.tsx';
import Resources from './components/Dashboard/Resources.tsx';
import UserSettings from './components/Dashboard/UserSettings.tsx';
import Notifications from './components/Dashboard/Notifications.tsx';

function App({ userType, setUserType }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au chargement de la page
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('role');
    
    if (token) {
      // Convertir le rôle en type d'utilisateur
      let type = 'student';
      if (storedUserType === 'admin') type = 'admin';
      else if (storedUserType === 'enseignant') type = 'teacher';
      
      setUserType(type);
      setIsLoggedIn(true);
    }
    
    setIsLoading(false);
  }, [setUserType]);

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const handleSidebarClick = (view) => {
    setActiveView(view);
  };

  console.log('Current userType in App.jsx:', userType);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            EduPlatform
          </h1>
        </div>
        <nav className="mt-8">
          <SidebarLink icon={<Users />} text="Dashboard" active={activeView === 'dashboard'} onClick={() => handleSidebarClick('dashboard')} />
          {userType === 'admin' && (
            <SidebarLink 
              icon={<UserPlus />} 
              text="Inscriptions" 
              active={activeView === 'registrations'} 
              onClick={() => handleSidebarClick('registrations')} 
            />
          )}
          <SidebarLink icon={<Calendar />} text="Sessions" active={activeView === 'sessions'} onClick={() => handleSidebarClick('sessions')} />
          <SidebarLink icon={<FileText />} text="Resources" active={activeView === 'resources'} onClick={() => handleSidebarClick('resources')} />
          <SidebarLink icon={<Bell />} text="Notifications" active={activeView === 'notifications'} onClick={() => handleSidebarClick('notifications')} />
          <SidebarLink icon={<Settings />} text="Settings" active={activeView === 'settings'} onClick={() => handleSidebarClick('settings')} />
          <SidebarLink icon={<LogOut />} text="Logout" onClick={handleLogout} />
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-4">
        {activeView === 'dashboard' && (
          <>
            {userType === 'admin' && <AdminDashboard />}
            {userType === 'teacher' && <TeacherDashboard />}
            {userType === 'student' || userType === 'eleve' ? <StudentDashboard /> : null}
            {!['admin', 'teacher', 'student', 'eleve'].includes(userType) && (
              <div>
                <h1 className="text-2xl font-bold text-red-600">Error: Invalid user type ({userType})</h1>
              </div>
            )}
          </>
        )}
        
        {activeView === 'registrations' && userType === 'admin' && <RegistrationsPage />}
        {activeView === 'sessions' && <Sessions />}
        {activeView === 'resources' && <Resources />}
        {activeView === 'notifications' && <Notifications />}
        {activeView === 'settings' && <UserSettings />}
      </main>
    </div>
  );
}

// Composant pour les liens du menu latéral
function SidebarLink({ icon, text, active, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href="#"
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${active ? 'bg-indigo-50 text-indigo-600' : ''}`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </a>
  );
}
export default App;