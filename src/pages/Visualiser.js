import React, { useState } from 'react';
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import UserData from './components/UserData';
import BestPost from './components/BestPost';
import Polar from './components/Polar';

function selectColour(colorNum, colors, lightness = 50) {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return `hsl(${colorNum * (360 / colors) % 360}, 100%, ${lightness}%)`;
}

function Visualiser() {
  const [participants, setParticipants] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [groupName, setGroupName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          if (Array.isArray(parsedData.participants)) {
            setParticipants(parsedData.participants);
          } else {
            alert('No participants array found in the JSON file');
          }
          if (Array.isArray(parsedData.messages)) {
            setMessageData(parsedData.messages);
          } else {
            alert('No messages array found in the JSON file');
          }

          if (parsedData.title) {
            setGroupName(parsedData.title);
          } 
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Calculate the count of posts for each participant
  const participantCounts = participants.map((participant, index) => ({
    name: participant.name,
    messageCount: messageData.filter((message) => message.sender_name === participant.name).length,
    likedCount: messageData
      .filter((message) => message.sender_name === participant.name)
      .reduce((totalLikes, message) => totalLikes + (message.reactions ? message.reactions.length : 0), 0),
    postCount: messageData
      .filter((message) => message.sender_name === participant.name && message.share).length,
    postLikedCount: messageData
      .filter((message) => message.sender_name === participant.name && message.share)
      .reduce((totalLikes, message) => totalLikes + (message.reactions ? message.reactions.length : 0), 0),
    colour: selectColour(index, participants.length, 60),
    accentColour: selectColour(index, participants.length, 80),
  }));

  let maxReactionsMessages = [];
  let maxReactionsCount = 0;
  let messageTimes = [];
  let messageColors = []
  let messageAccents = []
  for (let i = 0; i < 24; i++) {
    messageTimes.push(0);
    messageColors[i] = selectColour(i, 24, 60);
    messageAccents[i] = selectColour(i, 24, 80);
  }
  
  messageData.forEach((message) => {
    if (message.reactions) {
      if (message.reactions.length > maxReactionsCount) {
        maxReactionsCount = message.reactions.length;
        maxReactionsMessages = [message];
      } else if (message.reactions.length === maxReactionsCount) {
        maxReactionsMessages.push(message);
      }
    }
  
    const time = new Date(message.timestamp_ms).getHours();
  
    messageTimes[time]++;
  });
  
  console.log(messageTimes);

  return (
    <div className='content'>
      <img
        src={require("./images/visualiser-white.png")}
        className="logo invert "
        alt="Logo for DM Visualiser"
      />
      <br /><br />
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
      />
      {!(participants.length > 0 && messageData.length > 0) && (
        <>
        <h3>Please add a message.json file from Instagram</h3>
        <p> {'(Settings -> Accounts Center -> Your Information and permissions -> Download your information)'}</p>
        </>
      )}

      {participants.length > 0 && messageData.length > 0 && (
        <div className='center-cards'>
          
          <h2>{groupName ? `${groupName} stats:` : "Group stats:"}</h2>
          {participantCounts.length > 0 && ( // Add this condition to render PieChart only when data is available
            <BarChart 
              label = " Average reactions"
              stats = {participantCounts.map((participant) => participant.messageCount === 0 ? (0) : (Math.round((participant.likedCount / participant.messageCount + Number.EPSILON) * 1000) / 1000))}
              names = {participantCounts.map((participant) => participant.name)}
              colours = {participantCounts.map((participant) => participant.colour)}
              accents = {participantCounts.map((participant) => participant.accentColour)}
            />
          )}

          {participantCounts.length > 0 && ( // Add this condition to render PieChart only when data is available
            <PieChart 
              label = " # of messages"
              stats = {participantCounts.map((participant) => participant.messageCount)}
              names = {participantCounts.map((participant) => participant.name)}
              colours = {participantCounts.map((participant) => participant.colour)}
              accents = {participantCounts.map((participant) => participant.accentColour)}
            />
          )}

          {participantCounts.length > 0 && ( // Add this condition to render PieChart only when data is available
            <Polar 
              stats = {messageTimes}
              names = {["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am"]}
              colours = {messageColors}
              accents = {messageAccents}
            />
          )}

          <h2>Best {maxReactionsMessages.length === 1 ? ('Post') : ('Posts')}</h2>
          <h3>{maxReactionsMessages.length === 1 ? ('This Post ') : ('These Posts ')} 
            received {maxReactionsCount} reactions</h3>

          {maxReactionsMessages.map((message) => (
            <BestPost
            message = {message} />
          ))}

          <br />

          {participantCounts.map((participant, index) => (
            <UserData 
            participant = {participant}
            index = {index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Visualiser;
