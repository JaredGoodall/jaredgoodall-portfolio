import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Stack, IconButton, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jaredWhite from '../images/jared-white.png';
import goobdoobs from '../images/goobdoobs.png';
import visualiserWhite from '../images/visualiser-white.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#bfbfbf',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Bento() {
  const navigate = useNavigate();

  const margin = '12px'; 
  const skills = [                
    'Python',
    'JavaScript (ReactJs)',
    'Java',
    'C',
    'SQL and NoSQL',
    'HTML',
    'CSS',
    'R',
    'Microsoft Excel Associate Certificaiton',
    'Sandboxing + VMs',
    'Intrustion Detection Systems',
  ]

  return (
    <Box sx={{ p: margin, height: '100vh', background: '#fff' }}>
      <Box className='App' sx={{ minHeight: '100%', width: '100%' }}>
        <Grid container spacing={2} columns={{ sm: 1, md: 9 }}>
          <Grid item sm={1} md={3} sx={{ height: `calc(100vh - ${margin} - ${margin})` }}>
            <Item sx={{ height: '100%' }}>
              <img
                src={jaredWhite}
                className="mainLogo invert"
                alt="Logo for Jared Goodall"
              />
              <h1 style={{ marginBottom: 0 }} >Jared Goodall</h1>
              <Stack 
                direction="row"
                spacing={1} 
                justifyContent="center"
              >
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Stack>
              <h3>
                Computer Science & Commerce (Finance) @ UNSW
              </h3>
              <p>
                I am passionate about using technology to drive creative innovation within business and
                software. I am deeply motivated to launch my career and immerse myself in the world of
                technology to make tangible impacts.
              </p>
              <p>
                Currently working within the Cyber Security Industry within the Australian Government
              </p>
              <h4>
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
            </Item>
          </Grid>

          <Grid item sm={1} md={6} sx={{ height: '100%', width: '100%' }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Item>
                  <img
                    src={goobdoobs}
                    className="logo invert"
                    alt="Logo for the Goob Exchange"
                  />
                  <br />
                  <h2>Goob Exchange</h2>
                  <p>
                    A "currency" trading website that allows users to send and trade different pretend currencies.
                  </p>
                </Item>
              </Grid>

              <Grid item>
                <Item onClick={() => navigate('/visualiser')}>
                  <img
                    src={visualiserWhite}
                    className="logo invert"
                    alt="Logo for DM Visualiser"
                  />
                  <br />
                  <h2>IG Visualiser</h2>
                  <p>
                    Takes a messages JSON file from Instagram and displays some metrics about it.
                  </p>
                </Item>
              </Grid>

              <Grid item>
                <Item>
                  <img
                    src={visualiserWhite}
                    className="logo invert"
                    alt="Logo for DM Visualiser"
                  />
                  <br />
                  <h2>Todo</h2>
                  <p>To be done</p>
                </Item>
              </Grid>

              <Grid item>
                <Item>
                  <img
                    src={visualiserWhite}
                    className="logo invert"
                    alt="Logo for DM Visualiser"
                  />
                  <br />
                  <h2>Todo</h2>
                  <p>To be done</p>
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
