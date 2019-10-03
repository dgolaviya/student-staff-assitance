import React from 'react';
import logo from '../../assets/logo.jpg';
import './styles.scss';

const Header = () => {
  return (
    <div className="z-depth-2 blue darken-4">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default Header;