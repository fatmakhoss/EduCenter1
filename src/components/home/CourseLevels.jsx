import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { online } from "../../dummydata";
import countries from "../../data/countries"; // Importer la liste des pays
import "./courses.css";

const CourseLevels = () => {
  const { courseName } = useParams();
  const course = online.find((c) => c.courseName === courseName);

  const [showForm, setShowForm] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Par défaut le premier pays

  const openForm = (level) => {
    console.log("Niveau sélectionné :", level); // Vérifiez que le niveau est correct
    setSelectedLevel(level);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(country);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      country: selectedCountry.name,
      phone: `${selectedCountry.code} ${formData.get("phone")}`,
      level: selectedLevel, // Ajoutez le niveau sélectionné ici
    };
    console.log("Données du formulaire :", data); // Vérifiez les données dans la console
    closeForm();
  };

  if (!course || !course.levels) {
    return <h2 className="no-data">Aucun niveau disponible pour ce cours.</h2>;
  }

  console.log("Données du cours :", course); // Vérifiez les données du cours

  return (
    <section className="course-levels">
      <div className="container">
        <h1 className="title">{courseName}</h1>
        <div className="grid">
          {course.levels.map((level, index) => (
            <div key={index} className="card">
              <img src={level.cover} alt={level.title} className="card-img" />
              <div className="card-content">
                <h2 className="level-title">{level.title}</h2>
                <p className="duration">⏳ {level.duration}</p>
                <button className="btn" onClick={() => openForm(level.title)}>
                  s'inscrire
                </button>
                <ul className="features">
                  <li>📜 Formation certifiante</li>
                  <li>💻 En ligne</li>
                  <li>🌙 Cours de soir</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire en popup */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={closeForm}>&times;</span>
            <h2>Inscription - {selectedLevel}</h2>
            <form onSubmit={handleSubmit}>
              <label>Nom complet:</label>
              <input type="text" name="fullName" placeholder="Votre nom" required />

              <label>Email:</label>
              <input type="email" name="email" placeholder="Votre email" required />

              <label>Pays:</label>
              <select onChange={handleCountryChange} value={selectedCountry.name}>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>

              <label>Téléphone:</label>
              <div className="phone-input">
                <span className="country-code">{selectedCountry.code}</span>
                <input type="tel" name="phone" placeholder="Votre numéro" required />
              </div>

              <button type="submit" className="btn">Envoyer</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseLevels;