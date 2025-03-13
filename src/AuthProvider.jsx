import React, { createContext, useState } from "react";
import Keycloak from "keycloak-js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const keycloak = new Keycloak({
    url: "http://localhost:8080/",  // رابط Keycloak
    realm: "EduCenter",  // اسم Realm متاعك
    clientId: "educenter",  // اسم Client متاعك
  });

  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const login = async (email, password) => {
    try {
      const response = await fetch(`${keycloak.authServerUrl}/realms/educenter/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: keycloak.clientId,
          grant_type: "password",
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      keycloak.token = data.access_token;
      setAuthenticated(true);

      // استخراج الدور
      const decodedToken = JSON.parse(atob(data.access_token.split(".")[1]));
      const role = decodedToken.realm_access.roles[0]; // أول دور موجود
      setUserRole(role);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, userRole, login }}>
      {children}
    </AuthContext.Provider>
  );
};
