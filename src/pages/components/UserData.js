import { Box, Typography } from '@mui/material';
import React from 'react';

function UserData({participant}) {
    return (
      <Box minWidth={'40vw'} mb={2}>
        <Typography><strong>{participant.name}</strong></Typography>
        <Typography>Total message count: {participant.messageCount}</Typography>
        <Typography>Average message reacts: {participant.messageCount === 0 ? (0) : (Math.round((participant.likedCount / participant.messageCount + Number.EPSILON) * 1000) / 1000)}</Typography>
        <Typography>Post count: {participant.postCount} </Typography>
        <Typography>Average post reacts: {participant.postCount === 0 ? 0 : Math.round((participant.postLikedCount / participant.postCount + Number.EPSILON) * 1000) / 1000}</Typography>
      </Box>
    );
}

export default UserData;