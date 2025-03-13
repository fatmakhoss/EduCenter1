import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",  // Remplace par ton URL Keycloak
  realm: "EduCenter",            // Remplace par ton realm
  clientId: "educenter",        // Remplace par ton clientId
});

export default keycloak;
