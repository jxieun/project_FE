import React, { useState } from "react";
import styled from "styled-components";

// ✅ 팀별 선수 데이터
const playersByTeam = {
  kia: ["김도영", "최형우", "나성범", "양현종", "김선빈"],
  samsung: ["김지찬", "원태인", "김영웅", "구자욱", "이재현"],
  lg: ["홍창기", "임찬규", "문보경", "김현수", "박동원"],
  doosan: ["정수빈", "김재환", "양의지", "김택연", "곽빈"],
  kt: ["소형준", "강백호", "박영현", "고영표", "배정대"],
  ssg: ["최정", "김광현", "최지훈", "조병현", "박성한"],
  lotte: ["전준우", "나승엽", "고승민", "황성빈", "박세웅"],
  hanwha: ["노시환", "문동주", "김서현", "정우주", "황영묵"],
  nc: ["김주원", "박건우", "김영규", "권희동", "김형준"],
  kiwoom: ["송성문", "이주형", "김윤하", "최주환", "이강준"]
};

// ✅ styled-components 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  text-align: center;
`;

const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin: 20px 0;
`;

const PlayerCard = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? "3px solid #007bff" : "1px solid #ccc")};
  background: ${({ selected }) => (selected ? "#e6f0ff" : "#f8f8f8")};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background: black;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CancelButton = styled(ConfirmButton)`
  background: #888;
`;

const PlayerSelector = ({ visible, onClose, teamId, onSelect }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const players = teamId ? playersByTeam[teamId] || [] : [];

  const handleConfirm = () => {
    if (!selectedPlayer) {
      alert("선수를 선택해주세요.");
      return;
    }
    onSelect(selectedPlayer);
    onClose();
  };

  return (
    <ModalOverlay visible={visible}>
      <ModalContent>
        <h2>MY 선수 선택</h2>
        {players.length === 0 ? (
          <p>선택한 팀의 선수가 없습니다.</p>
        ) : (
          <>
            <PlayerGrid>
              {players.map((name) => (
                <PlayerCard
                  key={name}
                  selected={selectedPlayer === name}
                  onClick={() => setSelectedPlayer(name)}
                >
                  <img
                    src={`/assets/players/${name}.png`}
                    alt={name}
                    style={{ width: "80px", height: "80px", borderRadius: "6px" }}
                  />
                  <div>{name}</div>
                </PlayerCard>
              ))}
            </PlayerGrid>

            <ButtonGroup>
              <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
              <CancelButton onClick={onClose}>취소</CancelButton>
            </ButtonGroup>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default PlayerSelector;
