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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      country: selectedCountry.name,
      phone: `${selectedCountry.code} ${formData.get("phone")}`,
      level: selectedLevel,
      course: courseName
    };

    try {
      const response = await fetch('http://localhost:8000/api/course-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription. Veuillez réessayer.');
      }

      const result = await response.json();
      setSuccess(true);
      setTimeout(() => {
        closeForm();
        setSuccess(false);
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            {success && (
              <div className="success-message">
                Inscription réussie ! Vous recevrez un email de confirmation.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label>Nom complet:</label>
              <input type="text" name="fullName" placeholder="Votre nom" required disabled={isLoading} />

              <label>Email:</label>
              <input type="email" name="email" placeholder="Votre email" required disabled={isLoading} />

              <label>Pays:</label>
              <select onChange={handleCountryChange} value={selectedCountry.name} disabled={isLoading}>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>

              <label>Téléphone:</label>
              <div className="phone-input">
                <span className="country-code">{selectedCountry.code}</span>
                <input type="tel" name="phone" placeholder="Votre numéro" required disabled={isLoading} />
              </div>

              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseLevels;