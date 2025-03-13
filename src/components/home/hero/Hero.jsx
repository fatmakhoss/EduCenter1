import { useNavigate } from "react-router-dom";
import React from 'react';
import Heading from "../../common/heading/Heading";
import "./Hero.css";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
          <section className="hero">
        <div className="content">
          <div className="container">
            <Heading subtitle="WELCOME TO EDUCENTER" title="Best Online Education Expertise" />
            <p>
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            </p>
            <div className="button">
              <button className="primary-btn" onClick={() => navigate("/Dashboard")}>
                Sign in <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
