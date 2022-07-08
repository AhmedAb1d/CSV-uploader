import './Banner.css';
import logo from './logo.png';
import React from 'react';

function Banner()
{
  return (
        <div className="jh-banner">
            <img src={logo} alt='Zen logo' className="jh-logo" />
            <h1>Prediction Model</h1>
        </div>
        )
}


export default Banner;