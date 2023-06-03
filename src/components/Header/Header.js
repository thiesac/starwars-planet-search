import React from 'react';
import './Header.css';
import logo from '../../images/Star_Wars_Logo.png';

function Header() {
  return (
    <header className="header"><img src={ logo } alt="logo" /></header>
  );
}

export default Header;
