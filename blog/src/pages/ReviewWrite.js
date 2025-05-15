import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../components/StarRating"; // 별점 컴포넌트 import

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 15px 0 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const FileInput = styled.input`
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  float: right;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileName = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 6px;
`;

const ReviewWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stadiumId, stadiumName } = location.state || {};

  const [rating, setRating] = useState(5.0);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      stadiumId,
      stadiumName,
      rating,
      text,
      image,
    };

    console.log("작성된 리뷰:", reviewData);

    alert("리뷰가 등록되었습니다!");
    navigate(-1);
  };

  return (
    <Container>
      <Title>{stadiumName || stadiumId} 리뷰 작성</Title>
      <form onSubmit={handleSubmit}>
        <Label>⭐ 별점</Label>
        <StarRating rating={rating} onChange={(val) => setRating(val)} />

        <Label>✍️ 리뷰 내용</Label>
        <TextArea
          value={text}
          onChange={handleTextChange}
          placeholder="구장에서의 경험을 자유롭게 작성해주세요!"
          required
        />

        <Label>📷 사진 첨부 (선택)</Label>
        <FileInput type="file" accept="image/*" onChange={handleImageChange} />
        {image && <FileName>선택한 파일: {image.name}</FileName>}

        <Button type="submit">리뷰 등록하기</Button>
      </form>
    </Container>
  );
};

export default ReviewWrite;
