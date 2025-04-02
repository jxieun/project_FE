import React from "react";
import styled from "styled-components";

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 300px;
  margin: 0 auto;
`;

const Day = styled.div`
  padding: 10px;
  text-align: center;
  background-color: #e9ecef;
  border-radius: 5px;
`;

const Calendar = ({ month }) => {
  const daysInMonth = new Date(2025, month, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <CalendarGrid>
      {daysArray.map((day) => (
        <Day key={day}>{day}</Day>
      ))}
    </CalendarGrid>
  );
};

export default Calendar;
