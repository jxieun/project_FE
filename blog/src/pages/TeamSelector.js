import React, { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // 경로 확인!

const teams = [
  {
    id: "kia",
    name: "KIA 타이거즈",
    logo: "/assets/teams/kia.png",
    color: "#c70101",
    info: {
      연고지: "광주광역시",
      창단: "1982년",
      홈구장: "광주기아챔피언스필드",
      대표선수: "김도영, 양현종, 최형우",
      우승: "12회/최다 우승 (1983, 1986, 1987, 1988, 1989, 1991, 1993, 1996, 1997, 2009, 2017, 2024)",
      영구결번: "7(선동열), 18(이종범)"
    }
  },
  {
    id: "lotte",
    name: "롯데 자이언츠",
    logo: "/assets/teams/lotte.png",
    color: "#ff5a00",
    info: {
      연고지: "부산광역시",
      창단: "1982년",
      홈구장: "사직야구장",
      대표선수: "전준우, 윤동희, 나승엽",
      우승: "2회 (1984, 1992)",
      영구결번: "없음"
    }
  },
  {
    id: "doosan",
    name: "두산 베어스",
    logo: "/assets/teams/doosan.png",
    color: "#001a57",
    info: {
      연고지: "서울특별시",
      창단: "1982년",
      홈구장: "서울종합운동장 야구장",
      대표선수: "정수빈",
      우승: "6회 (1982, 1995, 2001, 2015, 2016, 2019)",
      영구결번: "21(박철순), 54(김영신)"
    }
  },
  {
    id: "ssg",
    name: "SSG 랜더스",
    logo: "/assets/teams/ssg.png",
    color: "#e61a29",
    info: {
      연고지: "인천광역시",
      창단: "2000년 (SK), 2021년 SSG",
      홈구장: "인천 SSG 랜더스필드",
      대표선수: "최정, 김광현, 최지훈",
      우승: "5회 (2007, 2008, 2010, 2018, 2022)",
      영구결번: "26(박경완)"
    }
  },
  {
    id: "samsung",
    name: "삼성 라이온즈",
    logo: "/assets/teams/samsung.png",
    color: "#005bac",
    info: {
      연고지: "대구광역시",
      창단: "1982년",
      홈구장: "대구라이온즈파크",
      대표선수: "구자욱, 원태인, 강민호",
      우승: "8회 (1985, 2002, 2005, 2006, 2011, 2012, 2013, 2014)",
      영구결번: "22(이만수), 10(양준혁), 36(이승엽)"
    }
  },
  {
    id: "kt",
    name: "KT 위즈",
    logo: "/assets/teams/kt.png",
    color: "#000000",
    info: {
      연고지: "수원시",
      창단: "2013년",
      홈구장: "수원케이티위즈파크",
      대표선수: "강백호, 고영표",
      우승: "1회 (2021)",
      영구결번: "없음"
    }
  },
  {
    id: "hanwha",
    name: "한화 이글스",
    logo: "/assets/teams/hanwha.png",
    color: "#f47321",
    info: {
      연고지: "대전광역시",
      창단: "1986년 (빙그레)",
      홈구장: "대전 한화생명 볼파크",
      대표선수: "문동주, 노시환",
      우승: "1회 (1999)",
      영구결번: "21(송진우), 23(정민철), 35(장종훈), 52(김태균)"
    }
  },
  {
    id: "lg",
    name: "LG 트윈스",
    logo: "/assets/teams/lg.png",
    color: "#c30452",
    info: {
      연고지: "서울특별시",
      창단: "1982년",
      홈구장: "서울종합운동장 야구장",
      대표선수: "홍창기, 임찬규",
      우승: "3회 (1990, 1994, 2023)",
      영구결번: "9(이병규), 33(박용택), 41(김용수)"
    }
  },
  {
    id: "kiwoom",
    name: "키움 히어로즈",
    logo: "/assets/teams/kiwoom.png",
    color: "#751018",
    info: {
      연고지: "서울특별시",
      창단: "2008년 (우리, 넥센)",
      홈구장: "고척스카이돔",
      대표선수: "송성문, 이주형",
      우승: "없음",
      영구결번: "없음"
    }
  },
  {
    id: "nc",
    name: "NC 다이노스",
    logo: "/assets/teams/nc.png",
    color: "#162955",
    info: {
      연고지: "창원시",
      창단: "2011년",
      홈구장: "창원NC파크",
      대표선수: "박민우, 박건우",
      우승: "1회 (2020)",
      영구결번: "없음"
    }
  }
];

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4); /* 반투명 배경 */
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  position: relative;
  backdrop-filter: blur(10px);
`;

const SlideWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slide = styled.div`
  display: flex;
  gap: 30px;
  transition: transform 0.6s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * (100 / 3)}%)`};
  width: 300%;
`;

const TeamCard = styled.div`
  flex: 0 0 33.33%;
  max-width: 33.33%;
  background-color: ${({ color }) => color || "#eee"};
  border-radius: 16px;
  padding: 25px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transform: scale(${({ active }) => (active ? 1 : 0.9)});
  transition: all 0.3s ease;
`;

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  color: black;
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  font-size: 14px;
  text-align: left;
  width: 100%;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin: 10px 0;
`;

const Arrow = styled.span`
  font-size: 36px;
  cursor: pointer;
  padding: 10px;
  color: #333;
  user-select: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
`;

const LeftArrow = styled(Arrow)`
  left: 10px;
`;

const RightArrow = styled(Arrow)`
  right: 10px;
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CancelButton = styled(ConfirmButton)`
  background-color: #888;
`;

const TeamSelector = ({ visible, onClose, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { setThemeColor } = useContext(ThemeContext); // 🎯 테마색 설정 함수 가져오기

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % teams.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + teams.length) % teams.length);
  };

  const handleConfirm = () => {
    if (!selectedTeam) return alert("팀을 선택해주세요.");
    setThemeColor(selectedTeam.color); // ✅ 팀 색상 적용
    onSelect(selectedTeam); // 기존 myTeam 저장
    onClose();
  };

  const visibleTeams = [
    teams[(currentIndex - 1 + teams.length) % teams.length],
    teams[currentIndex],
    teams[(currentIndex + 1) % teams.length],
  ];


  return (
    <ModalOverlay visible={visible}>
      <ModalContent>
        <h2 style={{ marginBottom: "20px" }}>응원팀 선택</h2>
        <SlideWrapper>
          <LeftArrow onClick={prev}>❮</LeftArrow>
          <RightArrow onClick={next}>❯</RightArrow>
          <Slide index={1}>
            {visibleTeams.map((team, i) => (
              <TeamCard
                key={team.id}
                color={team.color}
                active={i === 1}
                onClick={() => setSelectedTeam(team)}
                style={{
                  border: selectedTeam?.id === team.id ? "4px solid white" : "none",
                  cursor: "pointer"
                }}
              >
                <Logo src={team.logo} alt={team.name} />
                <h3>{team.name}</h3>
                <InfoBox>
                  {Object.entries(team.info).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key}</strong>: {val}
                    </div>
                  ))}
                </InfoBox>
              </TeamCard>
            ))}
          </Slide>
        </SlideWrapper>

        <ButtonGroup>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TeamSelector;
