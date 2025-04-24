import React from "react";
import StadiumCard from "../components/StadiumCard";
import styled from "styled-components";
import stadiums from "../assets/stadiums"; // stadium 정보 배열 (JSON)

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GuideZone = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>가이드존</h2>
      <Grid>
        {stadiums.map((s) => (
          <StadiumCard key={s.id} stadium={s} />
        ))}
      </Grid>
    </div>
  );
};

export default GuideZone;
