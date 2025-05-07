import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// ✅ 퀴즈 데이터
const quizData = [
  { name: "이정후", img: "/images/lee.jpg" },
  { name: "류현진", img: "/images/ryu.jpg" },
  { name: "김하성", img: "/images/kim.jpg" },
];

// ✅ styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #eee;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightPanel = styled.div`
  flex: 1;
  background: #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 8px 16px;
  margin: 5px;
  cursor: pointer;
`;

const ScoreText = styled.h3`
  margin-top: 20px;
`;

const QuizImage = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const TimerText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  color: red;
`;

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const ExcitingZone = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [quizType, setQuizType] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showAnswer, setShowAnswer] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    let timerId;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timerId = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (timeLeft === 0) {
      handleAnswer("time's up");
    }
    return () => clearTimeout(timerId);
  }, [timeLeft, gameStarted, gameOver]);

  const resetGame = () => {
    setGameStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setInput("");
    setQuizType(null);
    setSelectedTopic(null);
    setShowAnswer(null);
    setTimeLeft(null);
  };

  const startGame = () => {
    if (!quizType || !selectedTopic || !timer) {
      alert("퀴즈 주제, 유형, 시간을 모두 선택해주세요!");
      return;
    }
    const shuffled = shuffleArray(quizData);
    setQuizList(shuffled);
    setGameStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setInput("");
    setShowAnswer(null);
    setTimeLeft(timer);
  };

  const handleAnswer = (answer) => {
    const correct = quizList[currentIndex].name;

    if (answer === correct) {
      const next = currentIndex + 1;
      if (next < quizList.length) {
        setCurrentIndex(next);
        setScore(score + 1);
        setInput("");
        setTimeLeft(timer);
      } else {
        setScore(score + 1);
        setGameOver(true);
      }
    } else {
      setShowAnswer(correct);
      setGameOver(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnswer(input.trim());
    }
  };

  const getOptions = () => {
    const correct = quizList[currentIndex].name;
    const other = quizList
      .filter((q) => q.name !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((q) => q.name);
    return [...other, correct].sort(() => 0.5 - Math.random());
  };

  return (
    <Container>
      <LeftPanel>
        {gameStarted && !gameOver ? (
          <QuizImage src={quizList[currentIndex].img} alt="퀴즈" />
        ) : (
          <h2>{gameOver ? "게임 종료!" : "퀴즈를 시작해보세요!"}</h2>
        )}
      </LeftPanel>

      <RightPanel>
        {!gameStarted && (
          <>
            {/* 👇 팬 랭킹 버튼 추가 */}
            <div style={{ marginBottom: "20px" }}>
              <Button onClick={() => navigate("/ranking")}>🏆 팬 랭킹 보기</Button>
            </div>

            <h3>퀴즈 주제 선택</h3>
            <div>
              {["인물", "응원가", "등번호", "용어/룰"].map((topic) => (
                <Button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  style={{
                    backgroundColor: selectedTopic === topic ? "#aaa" : undefined,
                  }}
                >
                  {topic}
                </Button>
              ))}
            </div>

            <h3>퀴즈 유형 선택</h3>
            <div>
              <Button
                onClick={() => setQuizType("subjective")}
                style={{
                  backgroundColor: quizType === "subjective" ? "#aaa" : undefined,
                }}
              >
                주관식
              </Button>
              <Button
                onClick={() => setQuizType("objective")}
                style={{
                  backgroundColor: quizType === "objective" ? "#aaa" : undefined,
                }}
              >
                객관식
              </Button>
            </div>

            <h3>시간 선택 (초)</h3>
            <div>
              {[...Array(10)].map((_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setTimer(i + 1)}
                  style={{
                    backgroundColor: timer === i + 1 ? "#aaa" : undefined,
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </>
        )}

        {gameStarted && !gameOver && (
          <>
            <h2>답변하기</h2>
            <TimerText>남은 시간: {timeLeft}초</TimerText>
            {quizType === "subjective" ? (
              <>
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={gameOver}
                />
                <Button onClick={() => handleAnswer(input)}>제출</Button>
              </>
            ) : (
              getOptions().map((option) => (
                <Button key={option} onClick={() => handleAnswer(option)}>
                  {option}
                </Button>
              ))
            )}
          </>
        )}

        <ScoreText>점수: {score}</ScoreText>

        {!gameStarted && <Button onClick={startGame}>시작</Button>}
        {gameOver && (
          <>
            {showAnswer && (
              <p>
                정답은: <strong>{showAnswer}</strong>
              </p>
            )}
            <Button onClick={startGame}>다시 시작</Button>
            <Button onClick={resetGame}>처음으로</Button>
          </>
        )}
      </RightPanel>
    </Container>
  );
};

export default ExcitingZone;
