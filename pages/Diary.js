import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "../components/Calendar";

const DiaryContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const MonthSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`;

const Diary = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const prevMonth = () => {
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
  };

  const nextMonth = () => {
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
  };

  return (
    <DiaryContainer>
      <h2>나의 직관일지</h2>
      <MonthSelector>
        <ArrowButton onClick={prevMonth}>⬅️</ArrowButton>
        <h3>{month}월</h3>
        <ArrowButton onClick={nextMonth}>➡️</ArrowButton>
      </MonthSelector>
      <Calendar month={month} />
    </DiaryContainer>
  );
};

export default Diary;
