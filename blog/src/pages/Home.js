import React, { useState, useEffect } from "react";
import {
  MainContent,
  Sidebar,
  Rankings,
  MyTeam,
  MyPlayer,
  ScheduleContainer,
  Match
} from "../styles";

import TeamSelector from "./TeamSelector";
import PlayerSelector from "./PlayerSelector"; // 새로 만든 선수 선택 컴포넌트 import

const Home = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [isPlayerSelectorVisible, setPlayerSelectorVisible] = useState(false);
  const [myTeam, setMyTeam] = useState(null);
  const [myPlayer, setMyPlayer] = useState(null);

  // localStorage에서 초기 데이터 로드
  useEffect(() => {
    const savedTeam = localStorage.getItem("myTeam");
    const savedPlayer = localStorage.getItem("myPlayer");
    if (savedTeam) setMyTeam(JSON.parse(savedTeam));
    if (savedPlayer) setMyPlayer(savedPlayer);
  }, []);

  // 팀 선택 핸들러
  const handleTeamSelect = (team) => {
    setMyTeam(team);
    localStorage.setItem("myTeam", JSON.stringify(team));

    // 팀이 변경되면 MY 선수 초기화
    setMyPlayer(null);
    localStorage.removeItem("myPlayer");
  };

  // 선수 선택 핸들러
  const handlePlayerSelect = (playerName) => {
    setMyPlayer(playerName);
    localStorage.setItem("myPlayer", playerName);
  };

  return (
    <MainContent>
      {/* 순위표 */}
      <Sidebar>
        <Rankings>
          <h3>순위표</h3>
          <ul>
            {[...Array(10)].map((_, i) => (
              <li key={i}>{i + 1}위 팀</li>
            ))}
          </ul>
        </Rankings>
      </Sidebar>

      {/* MY 팀 & MY 선수 */}
      <div>
      <MyTeam onClick={() => setSelectorVisible(true)} style={{ cursor: "pointer" }}>
  <div>
    MY 팀: {myTeam ? myTeam.name : "선택한 팀이 없습니다."}
  </div>
  {myTeam && (
    <div style={{ marginTop: "10px" }}>
      <img
        src={myTeam.logo}
        alt={myTeam.name}
        style={{ width: "100px" }}
      />
    </div>
  )}
</MyTeam>
<MyPlayer onClick={() => setPlayerSelectorVisible(true)} style={{ cursor: "pointer" }}>
  <div>
    MY 선수: {myPlayer ? myPlayer : "선택한 선수가 없습니다."}
  </div>
  {myPlayer && (
    <div style={{ marginTop: "10px" }}>
      <img
        src={`/assets/players/${myPlayer}.png`}
        alt={myPlayer}
        style={{ width: "100px" }}
      />
    </div>
  )}
</MyPlayer>
      </div>

      {/* 경기 일정 */}
      <ScheduleContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <Match key={i}>1 vs 2 (지역) - {i + 1}</Match>
          ))}
        </div>
      </ScheduleContainer>

      {/* 응원팀 선택 모달 */}
      <TeamSelector
        visible={isSelectorVisible}
        onClose={() => setSelectorVisible(false)}
        onSelect={handleTeamSelect}
      />

      {/* MY 선수 선택 모달 */}
      <PlayerSelector
        visible={isPlayerSelectorVisible}
        onClose={() => setPlayerSelectorVisible(false)}
        teamId={myTeam?.id}
        onSelect={handlePlayerSelect}
      />
    </MainContent>
  );
};

export default Home;
