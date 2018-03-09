import React from 'react';
import './header.css';
//import logo from './logo.svg';

const FreeCodeCampIcon = () =>  
<div className="App-logo">
  <i class="fa fa-free-code-camp fa-4x"></i>
</div>
// <img src={logo} className="App-logo" alt="logo" />
const Header = () => 
<header className="App-header">
  <FreeCodeCampIcon />
  <h1 className="App-title">FCC Camper Leaderboard</h1>
</header>

export default Header;