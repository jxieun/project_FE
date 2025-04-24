import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import stadiums from "../assets/stadiums";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 40px;
`;

const Left = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const Right = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;

const StadiumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const stadium = stadiums.find((s) => s.id === id);

  const goToReviewWrite = () => {
    navigate("/review/write", {
      state: {
        stadiumId: stadium.id,
        stadiumName: stadium.name,
      },
    });
  };

  const goToReviewView = () => {
    navigate("/review/view", {
      state: {
        stadiumId: stadium.id,
        stadiumName: stadium.name,
      },
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{stadium.name}</h2>
      <h3 style={{ textAlign: "center" }}>{stadium.team}</h3>
      <Container>
        <Left>
          <img src={`/assets/stadiums/${stadium.id}_seat.png`} alt="구장 사진" />
        </Left>
        <Right>
          <img src={`/assets/stadiums/${stadium.id}_price.png`} alt="가격표" />
        </Right>
      </Container>
      <Buttons>
        <Button onClick={goToReviewWrite}>리뷰 작성</Button>
        <Button onClick={goToReviewView}>리뷰 보기</Button>
      </Buttons>
    </div>
  );
};

export default StadiumDetail;
