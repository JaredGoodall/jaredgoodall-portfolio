import React, { useState } from 'react';
import Bento from './components/Bento';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Home() {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <>
    {showBanner && 
      <Box display={'flex'} justifyContent={'center'} gap={2} alignItems={'center'} p={0.5} backgroundColor={'#f5c02c'} boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'}>
        <Typography>Hi, sorry this looks ugly. Im working on it...</Typography>
        <IconButton variant={'contained'} size={'small'} onClick={() => setShowBanner(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
    }
    <Bento />
    </>
  );
}

export default Home;
