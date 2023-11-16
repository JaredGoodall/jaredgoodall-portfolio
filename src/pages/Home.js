import React from 'react';
import './App.css';

function Home() {
  return (
    <div className='App'>
      <a href='https://www.linkedin.com/in/jaredgoodall/'>Jared Goodall LinkedIn</a>
      <br /><br /><br />
      <a href='https://www.goobdoobs.com'>Goob Exchange</a>
      <p>A "currency" trading website, allows user to send and trade different pretend currencies</p>
      <br />
      <a href="/visualiser">DM Visualiser {'<-'} Still  working on this one</a>
      <p>Takes a messages JSON file from Instagram and displays some metrics about it</p>
    </div>
  );
}

export default Home;
