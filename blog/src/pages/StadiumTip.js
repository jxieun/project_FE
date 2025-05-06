import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const Label = styled.h3`
  margin-bottom: 10px;
`;

const Content = styled.p`
  line-height: 1.6;
`;

const StadiumTip = () => {
  const location = useLocation();
  const { stadiumId, stadiumName } = location.state || {};

  if (!stadiumId || !stadiumName) {
    return <Container>잘못된 접근입니다. 구장을 선택해주세요.</Container>;
  }

  // ✅ 샘플 데이터 (실제 서비스 시에는 API 호출 또는 별도 JSON에서 가져오기)
  const tipData = {
    kia: {
      예매: "티켓링크 또는 현장 발권 가능 (모바일 권장)",
      교통: "광주송정역 → 시내버스 1187 / 택시 15분",
      먹거리: "구장 내 갈비버거, 외곽에 김밥천국, 맥도날드",
      팁: "3루 측 햇빛 없음, 파울존 적음, 김도영 타석에 집중!"
    },
    doosan: {
      예매: "인터파크를 통해 사전 예매 (빠른 매진 주의)",
      교통: "종합운동장역 5분 거리, 2호선/9호선 모두 가능",
      먹거리: "치킨집, 떡볶이, 랍스터롤, 외부 음식 반입 자유",
      팁: "1루 측 햇빛 주의, 외야는 야경 굿, 구장 내 화장실은 협소"
    },
    // ... 다른 구장도 추가 가능
  };

  const tip = tipData[stadiumId];

  return (
    <Container>
      <Title>🏟️ {stadiumName} 구장 팁</Title>

      {tip ? (
        <>
          <Section>
            <Label>🎟 예매</Label>
            <Content>{tip.예매}</Content>
          </Section>

          <Section>
            <Label>🚌 교통</Label>
            <Content>{tip.교통}</Content>
          </Section>

          <Section>
            <Label>🍗 먹거리</Label>
            <Content>{tip.먹거리}</Content>
          </Section>

          <Section>
            <Label>💡 직관 꿀팁</Label>
            <Content>{tip.팁}</Content>
          </Section>
        </>
      ) : (
        <p>해당 구장에 대한 팁 정보가 아직 없습니다.</p>
      )}
    </Container>
  );
};

export default StadiumTip;
