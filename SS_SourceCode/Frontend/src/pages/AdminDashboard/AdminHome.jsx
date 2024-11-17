import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const AdminHome = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(50); // Faster typing speed
  const phrases = ['Patients','Doctors', 'Hospitals', 'Humanity'];
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let ticker;

    if (isPaused) {
      // Wait for 3 seconds when text is complete before starting deletion
      ticker = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000); // 3 seconds pause after full text
    } else {
      ticker = setTimeout(() => {
        tick();
      }, delta); // Typing speed controlled by `delta`
    }

    return () => clearTimeout(ticker);
  }, [text, isDeleting, isPaused]);

  const tick = () => {
    let i = loopNum % phrases.length;
    let fullText = phrases[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      // After text is fully typed, pause for 3 seconds
      setIsPaused(true);
    } else if (isDeleting && updatedText === '') {
      // Once text is deleted, move to next phrase
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(50); // Fast typing speed
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#05cdec', // Set background to #38b6ff
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Title */}
      <Typography variant="h2" sx={{
        fontWeight: 'bold',
        color: 'white',
        mb: 4,
        letterSpacing: 3,
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
      }}>
        Swasthya Sarathi
      </Typography>

      {/* Typewriter Text */}
      <Box sx={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 500,
          color: 'white',
          display: 'inline-block',
          lineHeight: 1, // Ensures cursor aligns properly with text
        }}>
          <span style={{ fontWeight: 'bold' }}>For </span>
          {text} {/* Typewriter text here */}
          {/* Cursor that continues blinking */}
          <span
            className="animate-pulse"
            style={{
              animation: 'pulse 1s infinite',
              display: 'inline-block',
              marginLeft: '5px',
            }}
          >
            |
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHome;
