import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// ⭐ 스타일 구성
const Container = styled.div`
  max-width: 640px;
  margin: 40px auto;
  padding: 0 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

const ReviewCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  padding: 16px 20px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Rating = styled.div`
  color: #ffc107;
  font-size: 16px;
  font-weight: bold;
`;

const DateText = styled.div`
  font-size: 12px;
  color: #888;
`;

const Content = styled.p`
  font-size: 15px;
  color: #333;
  margin-bottom: 12px;
  white-space: pre-wrap;
`;

const ReviewImage = styled.img`
  width: 100%;
  max-width: 320px;
  border-radius: 8px;
  margin-top: 10px;
`;

const EmptyText = styled.p`
  text-align: center;
  color: #888;
  margin-top: 40px;
`;

const ReviewView = () => {
  const location = useLocation();
  const { stadiumId, stadiumName } = location.state || {};
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 더미 데이터
    const dummyReviews = [
      {
        id: 1,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 4.5,
        text: '야구장 분위기가 정말 좋았어요!',
        imageUrl: null,
        date: '2025-05-10',
      },
      {
        id: 2,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 5.0,
        text: '화장실도 깔끔하고 접근성도 좋아요!',
        imageUrl: 'https://via.placeholder.com/300',
        date: '2025-05-15',
      },
    ];

    const filtered = dummyReviews.filter((r) => r.stadiumId === stadiumId);
    setReviews(filtered);
  }, [stadiumId]);

  return (
    <Container>
      <Title>{stadiumName || stadiumId} 리뷰 목록</Title>

      {reviews.length === 0 ? (
        <EmptyText>등록된 리뷰가 없습니다.</EmptyText>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id}>
            <Header>
              <Rating>⭐ {review.rating.toFixed(1)}</Rating>
              <DateText>{review.date}</DateText>
            </Header>
            <Content>{review.text}</Content>
            {review.imageUrl && (
              <ReviewImage src={review.imageUrl} alt="리뷰 이미지" />
            )}
          </ReviewCard>
        ))
      )}
    </Container>
  );
};

export default ReviewView;
