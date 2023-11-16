import React from 'react';
import './images/goobdoobs.png'
import './images/visualiser-white.png'
import './images/jared-black.png'
import './App.css';

function Home() {
  return (
    <div className='App'>
      <br />
      <img
        src={require("./images/jared-black.png")}
        href="https://www.linkedin.com/in/jaredgoodall/"
        className="mainLogo invert "
        alt="Logo for Jared Goodall"
      />
      <br />
      <a href='https://www.linkedin.com/in/jaredgoodall/'>Jared Goodall LinkedIn</a>
      <br /><br /><br />
      <img
        src={require("./images/goobdoobs.png")}
        href='https://www.goobdoobs.com'
        className="logo invert "
        alt="Logo for the Goob Exchange"
      />
      <br />
      <a href='https://www.goobdoobs.com'>Goob Exchange</a>
      <p>A "currency" trading website, allows user to send and trade different pretend currencies</p>
      <br />
      <img
        src={require("./images/visualiser-white.png")}
        href="/visualiser"
        className="logo invert "
        alt="Logo for DM Visualiser"
      />
      <br />
      <a href="/visualiser">IG Visualiser {'<-'} Still  working on this one</a>
      <p>Takes a messages JSON file from Instagram and displays some metrics about it</p>
    </div>
  );
}

export default Home;
