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

// Layout component للتحكم في الـ Header و Footer
function Layout({ children }) {
  const location = useLocation();
  // تحقق من ما إذا كان المستخدم في صفحة الـ Dashboard أو لا
  const isDashboard = location.pathname.startsWith('/dashboard');
  const showHeaderFooter = !isDashboard; // عرض الـ Header و Footer فقط في الصفحات العامة

  return (
    <>
      {showHeaderFooter && <Header />} {/* يظهر الـ Header فقط في الصفحات العامة */}
      {children}
      {showHeaderFooter && <Footer />} {/* يظهر الـ Footer فقط في الصفحات العامة */}
    </>
  );
}

function AppWrapper() {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);

  // حفظ الـ userType في localStorage
  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    }
  }, [userType]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    setUserType(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Routes publiques (الصفحات العامة) */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Login" element={<Login onLogin={(userType) => {
            setUserType(userType);
            // توجيه مباشر للـ Dashboard بعد الـ Login
            window.location.href = '/dashboard';
          }} />} />
          <Route path="/course/:courseName" element={<CourseLevels />} />

          {/* Dashboard - Accessible uniquement après connexion */}
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
      </Layout>
    </Router>
  );
}

export default AppWrapper;