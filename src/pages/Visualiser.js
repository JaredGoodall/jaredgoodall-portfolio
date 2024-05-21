import React, { useState } from 'react';
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import UserData from './components/UserData';
import BestPost from './components/BestPost';
import Polar from './components/Polar';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Typography } from '@mui/material';

function selectColour(colorNum, colors, lightness = 50) {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return `hsl(${colorNum * (360 / colors) % 360}, 100%, ${lightness}%)`;
}

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  backdropFilter: 'blur(10px)',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: '10px', 
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transform: 'scale(1)',
  transition: 'transform 0.3s, opacity 0.3s, boxShadow 0.3s', 
  '&:hover': {
    transform: 'scale(1.02)', 
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)', 
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

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

  return (
    <div className='content'>
      <Stack direction={'row'} gap={2} alignItems={'center'} mb={2}>
        <img
          src={require("./images/visualiser-white.png")}
          className="logo invert "
          alt="Logo for DM Visualiser"
        />

        <Box>
          <input
            type="file"
            accept=".json"
            id="file-input"
            onChange={handleFileUpload}
            hidden
          />
          <label
            for="file-input"
            className="primary-btn"
          >Upload File</label>
        </Box>

        <Typography variant="h5" mb={1}>{groupName && (<strong>{groupName}</strong>)}</Typography>
      </Stack>

      {!(participants.length > 0 && messageData.length > 0) && (
        <>
          <Typography>Please add a message.json file from Instagram</Typography>
          <Typography> {'(Settings -> Accounts Center -> Your Information and permissions -> Download your information)'}</Typography>
        </>
      )}

      {participants.length > 0 && messageData.length > 0 && (
        <>
          <Box display={'flex'} justifyContent={'center'}>
            <Grid container columns={{ xs: 3, sm: 6 }} maxWidth={'800px'}>
              <Item item xs={3}>
                <Typography variant="h6">Messages by User</Typography>
                {participantCounts.length > 0 ? ( // Add this condition to render PieChart only when data is available
                  <PieChart
                    label=" # of messages"
                    stats={participantCounts.map((participant) => participant.messageCount)}
                    names={participantCounts.map((participant) => participant.name)}
                    colours={participantCounts.map((participant) => participant.colour)}
                    accents={participantCounts.map((participant) => participant.accentColour)}
                  />
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>

              <Item item xs={3}>
                <Typography variant="h6">Top {maxReactionsMessages.length === 1 ? ('Message') : ('Messages')}</Typography>
                {maxReactionsMessages.length > 0 ? ( 
                  <>
                    <Typography>{maxReactionsMessages.length === 1 ? ('This message ') : ('These messages ')}
                      received {maxReactionsCount} reactions</Typography>

                    <Box>
                      {maxReactionsMessages.map((message) => (
                        <BestPost
                          message={message} />
                      ))}
                    </Box>
                  </>
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>


              <Item item xs={3}>
                {/* <Typography>Average Reactions</Typography> */}
                {participantCounts.length > 0 ? (
                  <BarChart
                    label=" Average reactions"
                    stats={participantCounts.map((participant) => participant.messageCount === 0 ? (0) : (Math.round((participant.likedCount / participant.messageCount + Number.EPSILON) * 1000) / 1000))}
                    names={participantCounts.map((participant) => participant.name)}
                    colours={participantCounts.map((participant) => participant.colour)}
                    accents={participantCounts.map((participant) => participant.accentColour)}
                  />
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>

              <Item item xs={3}>
              <Typography variant="h6">Time of day</Typography>

                {participantCounts.length > 0 ? ( // Add this condition to render PieChart only when data is available
                  <Polar
                    stats={messageTimes}
                    names={["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am"]}
                    colours={messageColors}
                    accents={messageAccents}
                  />
                ) : (
                    <Typography>Nothing to show</Typography>
                  )}
              </Item>
            </Grid>
            </Box>
            {participantCounts.map((participant, index) => (
              <UserData
                participant={participant}
                index={index} />
            ))}
        </>
      )}
    </div>
  );
}

export default Visualiser;
