import React, { useState } from 'react';
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import UserData from './components/UserData';
import BestPost from './components/BestPost';
import Polar from './components/Polar';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Typography } from '@mui/material';
import DialogContainer from './components/DialogContainer';

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
  transition: 'opacity 0.3s, boxShadow 0.3s', 
  '&:hover': {
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
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Undefined");
  const [dialogContent, setDialogContent] = useState([]);

  function decodeUtf8(s) {
    return decodeURIComponent(escape(s));
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleJaredGoodall = () => {
    window.location.href = 'https://jaredgoodall.com';
  };  

  const handleReactions = () => {
    const reactText = []

    sortedReactions.forEach((react) => {
      reactText.push(decodeUtf8(react) + " - " + reactionCount[react] + " uses")
    })

    setDialogTitle('Message reactions')
    setDialogContent(reactText)
    setOpen(true)
  }


  const handleUserList = () => {
    const userContent = []

    participantCounts.forEach((participant) => {
      userContent.push(
          <UserData participant={participant} />
        )
      })

    setDialogTitle('User information')
    setDialogContent(userContent)
    setOpen(true)
  }

  const handleMaxReactions = () => {
    setDialogTitle('Top reacted messages - ' + maxReactionsCount + ' reactions')
    setDialogContent(reactionsList)
    setOpen(true)
  }
  
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
  let reactionCount = {};
  let maxReactionsCount = 0;
  let messageTimes = [];
  let messageDates = {};
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

      message.reactions.forEach((react) => {
        if (reactionCount[react.reaction]) {
          reactionCount[react.reaction]++;
        } else {
          reactionCount[react.reaction] = 1;
        }
      });
    }

    const date = new Date(message.timestamp_ms);

    messageTimes[date.getHours()]++

    if (messageDates[date.toLocaleDateString()]) {
      messageDates[date.toLocaleDateString()]++;
    } else {
      messageDates[date.toLocaleDateString()] = 1;
    }
  });

  const bigDay = Object.entries(messageDates).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
    ["", 0]
  );

  const bigTimeIndex = messageTimes.reduce(
    (maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex,
    0
  );

  const sortedReactions = Object.keys(reactionCount)
    .sort((a, b) => reactionCount[b] - reactionCount[a]);    

  const hearts = ["\u00e2\u009d\u00a4", "\u00e2\u009d\u00a4\u00ef\u00b8\u008f" ]

  const mostUsedNonHeartReaction = sortedReactions.length > 0 ? (
    !hearts.includes(sortedReactions[0]) ? (
      sortedReactions[0]
    ) : (
      (sortedReactions.length > 1 ? (
        !hearts.includes(sortedReactions[1]) ? (
          sortedReactions[1]
        ) : (
          (sortedReactions.length > 2 ? (
            sortedReactions[2]
          ) : (
            null
          ))
        )
      ) : (
        null
      )) 
    )
  ) : null;

  const reactionsList = maxReactionsMessages.map((message) => (
    <BestPost key={message.timestamp_ms} message={message} />
  ))

  return (
    <div className='content'>
      <Stack gap={2} alignItems='center' direction={{ sx: 'column', sm: 'row', }} mb={2}>
          <img
            onClick={handleJaredGoodall}
            src={require("./images/visualiser-white.png")}
            className="logo invert"
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
          <label htmlFor="file-input" className="primary-btn">
            Upload file
          </label>
        </Box>

        <Typography variant="h5">
          {groupName && (<strong>{groupName}</strong>)}
        </Typography>

        {!(participants.length > 0 && messageData.length > 0) && (
          <Typography>Work in progress</Typography>
        )}
      </Stack>

      {participants.length > 0 && messageData.length > 0 && (
        <>
          <Grid container spacing={2} maxWidth="700px">
            <Grid item xs={12} sm={6}>
              <Item>
                <Typography variant="h6">Messages by User</Typography>
                {participantCounts.length > 0 ? (
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <Item onClick={maxReactionsMessages.length > 1 ? handleMaxReactions : null}>
                {maxReactionsMessages.length > 0 ? (
                  <Box textAlign="center">
                    <Typography variant="h6">Top {maxReactionsMessages.length === 1 ? ('Message') : ('Messages')} with {maxReactionsCount} reactions</Typography>
                    <Box>
                      {reactionsList.length === 1 ? (
                        reactionsList
                      ) : (
                        <Typography>View all <strong>{reactionsList.length}</strong> messages</Typography>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>
            </Grid>

            <Grid item xs={8} sm={4}>
              <Item>
                <Typography variant="h6">Time of day</Typography>
                {participantCounts.length > 0 ? (
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

            <Grid item xs={4} sm={2}>
              <Item height={'100%'}>
                <Stack height={'100%'} alignItems={'center'} direction={'column'}>
                  <Typography hy variant="h6">Time</Typography>
                  <Stack alignItems={'center'} direction={'column'} spacing={2}>
                    <Stack alignItems={'center'} direction={'column'}>
                      <Typography>Best Day</Typography>
                      <Typography><strong>{bigDay[0]}</strong></Typography>
                      <Typography variant="body">{bigDay[1]}</Typography>
                      <Typography variant="body">messages</Typography>
                    </Stack>

                    <Stack alignItems={'center'} direction={'column'}>
                      <Typography>Best Time</Typography>
                      <Typography variant="body"><strong>{["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am"][bigTimeIndex]}</strong></Typography>
                      <Typography variant="body">
                        {(messageTimes[bigTimeIndex] / messageTimes.reduce((partialSum, a) => partialSum + a, 0) * 100).toFixed(2)}% of
                      </Typography>
                      <Typography variant="body">messages</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Item>
                <Typography variant="h6">Date</Typography>
                {participantCounts.length > 0 ? (
                  <BarChart
                    names={Object.keys(messageDates).reverse()}
                    stats={Object.values(messageDates).reverse()}
                    label="Average reactions"
                  />
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Item>
                {participantCounts.length > 0 ? (
                  <BarChart
                    label="Average reactions"
                    stats={participantCounts.map((participant) => participant.messageCount === 0 ? (0) : (Math.round((participant.likedCount / participant.messageCount + Number.EPSILON) * 1000) / 1000))}
                    names={participantCounts.map((participant) => participant.name)}
                    colours={participantCounts.map((participant) => participant.colour)}
                    accents={participantCounts.map((participant) => participant.accentColour)}
                  />
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>
            </Grid>

            <Grid item xs={4} sm={2}>
              <Item onClick={handleReactions} sx={{ cursor: 'pointer' }}>
                <Typography variant="h6">Top react</Typography>
                {Object.keys(reactionCount).length > 1 ? (
                  <Box textAlign="center">
                    {mostUsedNonHeartReaction && (
                      <Stack justifyContent={'center'}>
                        <Typography variant="h6" justifyContent={'center'}>
                          {decodeUtf8(mostUsedNonHeartReaction)}
                        </Typography>
                        <Typography variant="body" justifyContent={'center'}>
                          {reactionCount[mostUsedNonHeartReaction]} uses
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>
            </Grid>

            <Grid item xs={4} sm={2}>
              <Item onClick={handleUserList} sx={{ cursor: 'pointer' }}>
                <Typography variant="h6">View all</Typography>
                {Object.keys(reactionCount).length > 1 ? (
                  <Box textAlign="center">
                    {mostUsedNonHeartReaction && (
                      <Stack justifyContent={'center'}>
                        <Typography variant="h6" justifyContent={'center'} backgroundColor='#d9d9d9' borderRadius={100}>
                          {participants.length}
                        </Typography>
                        <Typography variant="body" justifyContent={'center'}>
                          users
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                ) : (
                  <Typography>Nothing to show</Typography>
                )}
              </Item>
            </Grid>

            <Grid item xs={4} sm={2}>
                <Item sx={{ cursor: 'pointer' }} textAlign="center">
                  <Typography>Average daily chats</Typography>
                  {Object.keys(reactionCount).length > 1 ? (
                    <Box textAlign="center">
                      {messageData.length && (
                        <Typography variant="h6" justifyContent={'center'}>
                          {(messageData.length/Object.keys(messageDates).length).toFixed(2)}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Typography>Nothing to show</Typography>
                  )}
                </Item>
              </Grid>
          </Grid>

          <DialogContainer open={open} handleClose={handleClose} title={dialogTitle} content={dialogContent}/>
        </>
      )}
    </div>
  );
}

export default Visualiser;
