import React from "react";
import styled from "styled-components";

// 더미 데이터
const totalRankings = [
  { id: "fan001", score: 98 },
  { id: "baseballKing", score: 85 },
  { id: "quizMaster", score: 80 },
  { id: "lgFan", score: 72 },
  { id: "ssgMania", score: 66 },
];

const monthlyRankings = [
  { id: "fan001", score: 45 },
  { id: "quizMaster", score: 43 },
  { id: "baseballKing", score: 39 },
  { id: "kiaTiger", score: 35 },
  { id: "ncFighter", score: 28 },
];

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  gap: 50px;
`;

const RankingBox = styled.div`
  flex: 1;
  background: #f9f9f9;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: center;
  padding: 12px;
  background: #333;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  text-align: center;
  padding: 10px;
  font-size: 16px;
`;

const Ranking = () => {
  return (
    <Container>
      <RankingBox>
        <Title>🏆 전체 팬 랭킹</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>순위</TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>점수</TableHeader>
            </tr>
          </thead>
          <tbody>
            {totalRankings.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.score}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </RankingBox>

      <RankingBox>
        <Title>📅 이달의 팬</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>순위</TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>점수</TableHeader>
            </tr>
          </thead>
          <tbody>
            {monthlyRankings.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.score}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </RankingBox>
    </Container>
  );
};

export default Ranking;
