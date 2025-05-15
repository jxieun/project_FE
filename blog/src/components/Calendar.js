import React, { useState, useEffect, useMemo } from "react";
import DiaryForm from "./DiaryForm";
import ViewDiaryForm from "./ViewDiary";
import "./Calendar.css";

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [diaryEntries, setDiaryEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewingDate, setViewingDate] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
    setDiaryEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m - 1, 1).getDay();

  const handleYearChange = (offset) => setYear((prev) => prev + offset);

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

  const handleDateClick = (day) => {
    const dateKey = `${year}-${month}-${day}`;
    setSelectedDate(dateKey);
  };

  const handleSave = (date, data) => {
    setDiaryEntries((prev) => ({
      ...prev,
      [date]: data,
    }));
    setSelectedDate(null);
  };

  const handleDelete = (date) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updated = { ...diaryEntries };
      delete updated[date];
      setDiaryEntries(updated);
    }
  };

  const calendarData = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weeks = [];
    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="empty"></td>);
    }

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

      if (days.length === 7) {
        weeks.push(<tr key={weeks.length}>{days}</tr>);
        days = [];
      }
    }

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

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => setShowList((prev) => !prev)}>
          {showList ? "일기 리스트 닫기" : "일기 리스트 보기"}
        </button>
      </div>

      {showList && (
        <div className="diary-list">
          <h3>📝 작성한 직관일지 목록</h3>
          {Object.keys(diaryEntries).length > 0 ? (
            Object.entries(diaryEntries).map(([date, entry]) => (
              <div key={date} className="diary-entry">
                <strong>{date}</strong>
                <button
                  style={{ backgroundColor: "#4CAF50", color: "white", marginLeft: "10px" }}
                  onClick={() => setViewingDate(date)}
                >
                  보기
                </button>
                <button
                  style={{ backgroundColor: "#f44336", color: "white", marginLeft: "5px" }}
                  onClick={() => handleDelete(date)}
                >
                  삭제
                </button>
              </div>
            ))
          ) : (
            <p>작성된 직관일지가 없습니다.</p>
          )}
        </div>
      )}

      {selectedDate && (
        <DiaryForm
          date={selectedDate}
          initial={diaryEntries[selectedDate]}
          onSave={handleSave}
          onCancel={() => setSelectedDate(null)}
        />
      )}

      {viewingDate && (
        <ViewDiaryForm
          date={viewingDate}
          data={diaryEntries[viewingDate]}
          onClose={() => setViewingDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
