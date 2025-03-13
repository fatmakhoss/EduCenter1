import React from "react"

import "./footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
          </div>
        </div>
      </section>
      <footer>
  <div className='container padding'>
    <div className='box logo'>
      <h1>EduCenter</h1>
      <span>ONLINE EDUCATION & LEARNING</span>
      <p>eduCenter is a language learning platform offering interactive lessons, practical exercises, and expert instructors to help learners achieve their academic, professional, or personal goals efficiently</p>

      <div></div>
      <i className='fab fa-facebook-f icon'></i>
      <i className='fab fa-youtube icon'></i>
      <i className='fab fa-instagram icon'></i>
      <i className='fab fa-whatsapp icon'></i>
    </div>

    {/* Contact Us section moved up */}
    <div class='box last'>
    <h3>Contact Us</h3>
    <ul>
  <li>
    <i className='fa fa-paper-plane'></i>
    <div>
      <strong>Email:</strong> <br />
      info@yourdomain.com
    </div>
  </li>

  <li>
    <i className='fa fa-phone-alt'></i>
    <div>
      <strong>Phone:</strong> <br />
      +2 392 3929 210
    </div>
  </li>

  <li>
    <i className='fab fa-whatsapp'></i>
    <div>
      <strong>WhatsApp:</strong> <br />
      +2 392 3929 210
    </div>
  </li>
  <li>
  <i className="fa fa-map-marker-alt"></i>

    <div>
      <strong>Adresse:</strong> <br />
      203 Fake St. Mountain View, San Francisco, California, USA
    </div>
  </li>

</ul>

</div>

    {/* Renamed Quick Links to Useful Links */}
    <div className='box link'>
  <h3>Useful Links</h3>
  <ul>
    <li>
    <li>
      <Link to='/' onClick={() => window.scrollTo(0, 0)}>
        <i className='fas fa-home'></i> Home
      </Link>
    </li>
    <li>
      <Link to='/courses' onClick={() => window.scrollTo(0, 0)}>
        <i className='fas fa-book'></i> All Courses
      </Link>
    </li>
      <Link to='/contact' onClick={() => window.scrollTo(0, 0)}>
        <i className='fas fa-envelope'></i> Contact
      </Link>
    </li> 
    <li>
      <Link to='/about' onClick={() => window.scrollTo(0, 0)}>
        <i className='fas fa-info-circle'></i> About
      </Link>
    </li>
  </ul>
</div>

  </div>
</footer>

      <div className='legal'>
        <p>
          Copyright ©2022 All rights reserved
        </p>
      </div>
    </>
  )
}

export default Footer
