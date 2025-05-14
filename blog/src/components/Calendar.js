import React, { useState, useEffect, useMemo } from "react";
import "./Calendar.css";
import DiaryForm from "./DiaryForm"; // 기존 DiaryForm 연동

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [diaryEntries, setDiaryEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("diaryEntries")) || {};
    setDiaryEntries(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

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
    setShowForm(true);
  };

  const handleSave = (date, entry) => {
    setDiaryEntries((prev) => ({ ...prev, [date]: entry }));
    setShowForm(false);
  };

  const handleDelete = (date) => {
    const updated = { ...diaryEntries };
    delete updated[date];
    setDiaryEntries(updated);
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
        days.push(<td key={`fill-${days.length}`} className="empty"></td>);
      }
      weeks.push(<tr key="last">{days}</tr>);
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

      <button style={{ marginTop: "20px" }} onClick={() => setShowList(true)}>
        📖 일기 리스트 보기
      </button>

      {showForm && selectedDate && (
        <DiaryForm
          date={selectedDate}
          initial={diaryEntries[selectedDate]}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showList && (
        <div className="diary-list-modal">
          <div className="diary-list-box">
            <h3>📝 작성한 일기 목록</h3>
            {Object.keys(diaryEntries).length === 0 ? (
              <p>작성된 일기가 없습니다.</p>
            ) : (
              <ul>
                {Object.entries(diaryEntries).map(([date, entry]) => (
                  <li key={date}>
                    <strong>{date}</strong> - {entry.title || "제목 없음"}
                    <button
                      onClick={() => handleDelete(date)}
                      style={{
                        marginLeft: "10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "4px 10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowList(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
