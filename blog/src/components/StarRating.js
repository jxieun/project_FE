import React, { useState } from "react";
import styled from "styled-components";

const StarWrapper = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`;

const StarBox = styled.div`
  position: relative;
  font-size: 36px;
  cursor: pointer;
  width: 36px;
`;

const StarLeft = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
`;

const StarRight = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
`;

const StarIcon = styled.span`
  color: ${({ filled }) => (filled ? "#FFD700" : "#ccc")};
  position: relative;
  z-index: 0;
`;

const StarRating = ({ rating, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    onChange(value);
  };

  const handleHover = (value) => {
    setHoverRating(value);
  };

  const handleLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <StarWrapper onMouseLeave={handleLeave}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarBox key={i}>
          <StarLeft
            onMouseEnter={() => handleHover(i - 0.5)}
            onClick={() => handleClick(i - 0.5)}
          />
          <StarRight
            onMouseEnter={() => handleHover(i)}
            onClick={() => handleClick(i)}
          />
          <StarIcon filled={displayRating >= i}>★</StarIcon>
        </StarBox>
      ))}
    </StarWrapper>
  );
};

export default StarRating;
