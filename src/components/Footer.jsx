import React from 'react';
import '../styles/Footer.css';
import OurLocation from '../images/OurLocation.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo-section">
        <h3>Logo</h3>
        <p>Наша компания сделает ваш отдых незабываемым</p>
      </div>
      <div className="footer-section community">
        <h4>Сообщество</h4>
        <ul>
          <li>События</li>
          <li>Канал в тт</li>
          <li>Рассказать друзьям</li>
        </ul>
      </div>
      <div className="footer-section about">
        <h4>О нас</h4>
        <ul>
          <li>Наши сотрудники</li>
        </ul>
      </div>
      <div className="footer-section map">
        <img src={OurLocation} alt="Our Location" />
      </div>
      <div className="footer-bottom">
        <p>©2022 Canada-tours</p>
        <div className="footer-links">
          <a href="#">Privacy & Policy</a>
          <a href="#">Terms & Condition</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
