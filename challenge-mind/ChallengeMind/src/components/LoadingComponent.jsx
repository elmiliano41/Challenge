import * as React from 'react';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const LoadingComponent = () => {
  const [msg, setMsg] = useState('');

  function timerToRefresh() {
    setTimeout(() => {
      setMsg("If you're not redirected to the dashboard please refresh the page.");
    }, 5000);
  }

  useEffect(() => {
    timerToRefresh();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <br />
      <br />
      <div style={{textShadow:"1px 1px 4px white"}}>{msg}</div>
    </Box>
  );
};
