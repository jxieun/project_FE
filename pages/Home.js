import React from "react";
import { MainContent, Sidebar, Rankings, MyTeam, MyPlayer, ScheduleContainer, Match } from "../styles";

const Home = () => {
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
        <MyTeam>MY 팀: 선택한 팀이 없습니다.</MyTeam>
        <MyPlayer>MY 선수: 선택한 선수가 없습니다.</MyPlayer>
      </div>

      {/* 경기 일정 */}
      <ScheduleContainer>
        {[...Array(5)].map((_, i) => (
          <Match key={i}>1 vs 2 (지역)</Match>
        ))}
      </ScheduleContainer>
    </MainContent>
  );
};

export default Home;
