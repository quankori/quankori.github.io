// components/Flashcard.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, styled, CardMedia } from '@mui/material';

// Styled component for the flipping effect
const FlippingCard = styled(Box)(({ theme, flipped }) => ({
  perspective: '1000px',
  width: '100%',
  height: '200px',
  cursor: 'pointer',
  '& .inner': {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    boxShadow: theme.shadows[5],
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  },
  '& .front, & .back': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
  },
  '& .back': {
    transform: 'rotateY(180deg)',
    backgroundColor: theme.palette.grey[100],
  },
}));

const Flashcard = ({ question, answer, image }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <FlippingCard
      flipped={flipped}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
    >
      <Box className="inner">
        <Card className="front" variant="outlined">
          {image && (
            <CardMedia
              component="img"
              height="100"
              image={image}
              alt={question}
              sx={{ objectFit: 'cover' }}
            />
          )}
          <CardContent>
            <Typography variant="h6">{question}</Typography>
          </CardContent>
        </Card>
        <Card className="back" variant="outlined">
          <CardContent>
            <Typography variant="h6">{answer}</Typography>
          </CardContent>
        </Card>
      </Box>
    </FlippingCard>
  );
};

export default Flashcard;
