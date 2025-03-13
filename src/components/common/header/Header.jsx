import { Link } from "react-router-dom";
import "./header.css"; // Import du CSS

const Header = () => {
 


  return (
    <>
      {/* Section Head */}
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1>EduCenter</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className="social">
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-youtube icon"></i>
          </div>
        </div>
      </section>

      {/* Section Header */}
      <header>
        <div className="container flexSB">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
       
          {/* Icône du menu burger */}
         
        </div>
      </header>
    </>
  );
};

export default Header;
