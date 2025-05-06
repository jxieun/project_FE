import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: 220px;
  background-color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const StadiumCard = ({ stadium }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stadium/${stadium.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Image src={stadium.image} alt={stadium.name} />
      <div>{stadium.name}</div>
      <div>{stadium.team}</div>
    </Card>
  );
};

export default StadiumCard;
