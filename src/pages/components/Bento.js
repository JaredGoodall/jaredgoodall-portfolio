import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Stack, IconButton, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import goobdoobs from '../images/goobdoobs.png';
import visualiserWhite from '../images/visualiser-white.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.4)', 
  backdropFilter: 'blur(10px)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
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
}));

function Bento() {
  const navigate = useNavigate();

  const margin = '12px'; 
  const skills = [                
    'Python',
    'JavaScript (ReactJs)',
    'Java',
    'C',
    'SQL + NoSQL',
    'HTML',
    'CSS',
    'R',
    'Microsoft Excel Associate Certification',
    'Sandboxing + VMs',
    'Intrustion Detection Systems',
  ]

  const handleGoobExchangeClick = () => {
    window.location.href = 'https://goobdoobs.com';
  };

  const handleLinkedIn = () => {
    window.location.href = 'https://www.linkedin.com/in/jaredgoodall/';
  };

  const handleInstagram = () => {
    window.location.href = 'https://www.instagram.com/jared.goodall/';
  };

  const handleGitHub = () => {
    window.location.href = 'https://github.com/JaredGoodall';
  };

  return (
    <Box sx={{ p: margin, height: '100vh' }}>
      <Box className='App' sx={{ minHeight: '100%', width: '100%' }}>
        <Grid container rowSpacing={4} columnSpacing={2} columns={{ sm: 1, md: 9 }}>
          <Grid item sm={1} md={3} sx={{ minHeight: `calc(100vh - ${margin} - ${margin})` }}>
            <Item sx={{ height: '100%' }} >
              <Stack direction={'column'} textAlign={'center'} alignItems="center" justify="center">
                <h1 style={{ marginBottom: 0 }} >Jared Goodall</h1>
                <Stack 
                  direction="row"
                  spacing={1} 
                  justifyContent="center"
                >
                  <IconButton>
                    <LinkedInIcon onClick={handleLinkedIn} />
                  </IconButton>
                  <IconButton>
                    <InstagramIcon onClick={handleInstagram} />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon onClick={handleGitHub} />
                  </IconButton>
                </Stack>
                <h3 style={{ marginBottom: 5, marginTop: 5 }}>
                  Computer Science & Commerce (Finance) @ UNSW
                </h3>
                <p style={{ marginBottom: 10, marginTop: 5 }}>
                  I am passionate about using technology to drive creative innovation within business and
                  software. I am deeply motivated to launch my career and immerse myself in the world of
                  technology to make tangible impacts.
                </p>
                <h4 style={{ marginBottom: 15, marginTop: 5 }}>
                  Techinal Skills
                </h4>
                <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 400 }}>
                  {skills.map((skill, index) => (
                    <Grid
                      item
                      xs="auto"
                      key={index}
                    >
                      <Chip label={skill} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Item>
          </Grid>

          <Grid item sm={1} md={6} sx={{ height: '100%', width: '100%' }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Item onClick={handleGoobExchangeClick}>
                  <Stack direction="row" sx={{ m: 2 }} gap={2}>
                    <Box>
                      <img
                        src={goobdoobs}
                        className="logo"
                        alt="Logo for the Goob Exchange"
                      />
                    </Box>
                    <Box>
                      <h2>Goob Exchange</h2>
                      <p>
                        A "currency" trading website that allows users to send and trade different pretend currencies.
                      </p>
                    </Box>
                  </Stack>
                </Item>
              </Grid>

              <Grid item>
                <Item onClick={() => navigate('/visualiser')}>
                  <Stack direction="row" sx={{ m: 2 }} gap={2}>
                    <Box>
                      <img
                        src={visualiserWhite}
                        className="logo invert"
                        alt="Logo for DM Visualiser"
                      />
                    </Box>
                    <Box>
                      <h2>IG Visualiser</h2>
                      <p>
                        Takes a messages JSON file from Instagram and displays some metrics about it.
                      </p>
                    </Box>
                  </Stack>
                </Item>
              </Grid>

              <Grid item>
                <Item>
                <Stack direction="row" sx={{ m: 2 }} gap={2}>
                  <Box>
                  </Box>
                  <Box>
                    <h2>Note taking and Todo App</h2>
                    <p><b>Under development: </b>React Native app that consolidates my favourite things - note taking and todo lists</p>
                  </Box>
                  </Stack>
                </Item>
              </Grid>

              <Grid item>
                <Item>
                  <Stack direction="row" sx={{ m: 2 }} gap={2}>
                    <Box>
                    </Box>
                    <Box>
                      <h2>Sets and Reps App</h2>
                      <p><b>Not even started: </b>Mobile App to better understand your gym progress</p>
                    </Box>
                  </Stack>
                </Item>
              </Grid>

              <Grid item>
                <Item>
                  <Stack direction="row" sx={{ m: 2 }} gap={2}>
                    <Box>
                    </Box>
                    <Box>
                      <h2>Dropzone / Pinned</h2>
                      <p><b>No chance: </b>Social media app focused on experiences, not stuff</p>
                    </Box>
                  </Stack>
                </Item>
              </Grid>
              <Grid item display={'flex'} justifyContent={'center'}>
                <Item sx={{ mb: 3 }}>
                  <Typography fontSize={'1em'}>. . .</Typography>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Bento;
