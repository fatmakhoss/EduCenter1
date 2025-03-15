import "./App.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from "./components/home/ScrollToTop.js";
import Header from "./components/common/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import CourseHome from "./components/allcourses/CourseHome.jsx";
import Contact from "./components/contact/Contact.jsx";
import Footer from "./components/common/footer/Footer.jsx";
import Login from "./components/Dashboard/Login.jsx";
import CourseLevels from "./components/home/CourseLevels.jsx";
import App from "./App"; // App component
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard.jsx";
import StudentDashboard from "./components/Dashboard/StudentDashboard.jsx";

// Layout component pour gérer le Header et Footer
function Layout({ children }) {
  const location = useLocation();
  // Vérifier si l'utilisateur est sur une page Dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');
  const showHeaderFooter = !isDashboard; // Afficher Header et Footer uniquement sur les pages publiques

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

function AppWrapper() {
  const [userType, setUserType] = useState(() => {
    // Récupérer le rôle du localStorage et le convertir en type d'utilisateur
    const role = localStorage.getItem("role");
    if (!role) return null;
    
    // Convertir le rôle en type d'utilisateur
    if (role.toLowerCase() === "admin") return "admin";
    if (role.toLowerCase() === "enseignant") return "teacher";
    return "student";
  });

  // Mettre à jour userType quand le rôle change
  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem("role");
      if (!role) {
        setUserType(null);
        return;
      }
      
      // Convertir le rôle en type d'utilisateur
      if (role.toLowerCase() === "admin") setUserType("admin");
      else if (role.toLowerCase() === "enseignant") setUserType("teacher");
      else setUserType("student");
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserType(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/courses" element={
          <Layout>
            <CourseHome />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/Login" element={
          <Layout>
            <Login onLogin={(userType) => {
              console.log("Login successful, userType received:", userType);
              setUserType(userType);
              // Rediriger vers le tableau de bord après connexion
              window.location.href = '/dashboard';
            }} />
          </Layout>
        } />
        <Route path="/course/:courseName" element={
          <Layout>
            <CourseLevels />
          </Layout>
        } />

        {/* Dashboard - Accessible uniquement après connexion */}
        {userType ? (
          <Route
            path="/dashboard/*"
            element={<App userType={userType} setUserType={setUserType} />}
          />
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/Login" />} />
        )}

        {/* Redirection des pages inconnues */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;