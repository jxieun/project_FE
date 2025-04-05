import React from "react";
import styled from "styled-components";
import Calendar from "../components/Calendar";

const DiaryContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Diary = () => {
  return (
    <DiaryContainer>
      <Calendar />
    </DiaryContainer>
  );
};

export default Diary;
