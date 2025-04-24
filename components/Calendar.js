import React, { useState, useEffect, useMemo } from "react";
import "./Calendar.css"; // 스타일 적용

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [diaryEntries, setDiaryEntries] = useState({});

  // ✅ 일기 데이터를 localStorage에서 불러오기
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
    setDiaryEntries(savedEntries);
  }, []);

  // ✅ 일기 데이터를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  // ✅ 해당 월의 날짜 수 계산
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  // ✅ 해당 월의 첫째 날 요일 (0: 일요일 ~ 6: 토요일)
  const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

  // ✅ 연도 변경 함수
  const handleYearChange = (offset) => setYear((prev) => prev + offset);

  // ✅ 월 변경 함수 (연도와 연동)
  const handleMonthChange = (offset) => {
    setMonth((prev) => {
      let newMonth = prev + offset;
      if (newMonth < 1) {
        setYear((y) => y - 1);
        return 12;
      } else if (newMonth > 12) {
        setYear((y) => y + 1);
        return 1;
      }
      return newMonth;
    });
  };

  // ✅ 특정 날짜 클릭 시 일기 입력
  const handleDateClick = (day) => {
    const dateKey = `${year}-${month}-${day}`;
    const text = prompt("일기 내용을 입력하세요:", diaryEntries[dateKey] || "");
    if (text !== null) {
      setDiaryEntries((prev) => ({
        ...prev,
        [dateKey]: text.trim() ? text : undefined,
      }));
    }
  };

  // ✅ 달력 렌더링 최적화 (useMemo 사용)
  const calendarData = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weeks = [];
    let days = [];

    // ✅ 빈 칸 추가 (첫 날의 요일 맞추기)
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    // ✅ 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month}-${day}`;
      days.push(
        <td
          key={day}
          onClick={() => handleDateClick(day)}
          className={diaryEntries[dateKey] ? "has-entry" : ""}
        >
          {day}
        </td>
      );

      // ✅ 한 주가 7일이 되면 새로운 줄 추가
      if (days.length === 7) {
        weeks.push(<tr key={weeks.length}>{days}</tr>);
        days = [];
      }
    }

    // ✅ 마지막 주의 빈 칸 채우기
    if (days.length > 0) {
      while (days.length < 7) {
        days.push(<td key={`extra-${days.length}`} className="empty"></td>);
      }
      weeks.push(<tr key={weeks.length}>{days}</tr>);
    }

    return weeks;
  }, [year, month, diaryEntries]);

  return (
    <div className="calendar-container">
      <h2>📅 나의 직관일지</h2>
      
      <div className="calendar-controls">
        <button onClick={() => handleYearChange(-1)}>◀</button>
        <span>{year}년</span>
        <button onClick={() => handleYearChange(1)}>▶</button>
      </div>

      <div className="calendar-controls">
        <button onClick={() => handleMonthChange(-1)}>◀</button>
        <span>{month < 10 ? `0${month}` : month}월</span>
        <button onClick={() => handleMonthChange(1)}>▶</button>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            <th className="sunday">일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th className="saturday">토</th>
          </tr>
        </thead>
        <tbody>{calendarData}</tbody>
      </table>
    </div>
  );
};

export default Calendar;