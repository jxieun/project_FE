import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ReviewView = () => {
  const location = useLocation();
  const { stadiumId, stadiumName } = location.state || {};

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 예시용 더미 데이터 (실제 앱에서는 API에서 불러오게 됨)
    const dummyReviews = [
      {
        id: 1,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 4.5,
        text: '야구장 분위기가 정말 좋았어요!',
        imageUrl: null,
      },
      {
        id: 2,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 5.0,
        text: '화장실도 깔끔하고 접근성도 좋아요!',
        imageUrl: 'https://via.placeholder.com/300',
      },
    ];

    // stadiumId에 맞는 리뷰만 필터링
    const filtered = dummyReviews.filter((r) => r.stadiumId === stadiumId);
    setReviews(filtered);
  }, [stadiumId]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        {stadiumName || stadiumId} 리뷰 목록
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">등록된 리뷰가 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-300 rounded p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold">
                  ⭐ {review.rating.toFixed(1)}점
                </span>
                <span className="text-sm text-gray-400">#{review.id}</span>
              </div>
              <p className="mb-3 whitespace-pre-wrap">{review.text}</p>
              {review.imageUrl && (
                <img
                  src={review.imageUrl}
                  alt="리뷰 이미지"
                  className="max-w-xs rounded shadow"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewView;
