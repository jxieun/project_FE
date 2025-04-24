import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stadiumId, stadiumName } = location.state || {};

  const [rating, setRating] = useState(5.0);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleRatingChange = (e) => {
    setRating(parseFloat(e.target.value));
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

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
      image, // 나중에 업로드 처리가 필요함 (서버에)
    };

    console.log('작성된 리뷰:', reviewData);

    // 이곳에서 API 요청으로 등록 처리하면 됩니다.
    // 예: axios.post('/api/reviews', formData);

    alert('리뷰가 등록되었습니다!');
    navigate(-1); // 이전 페이지로 이동 (홈구장 상세 등)
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {stadiumName || stadiumId} 리뷰 작성
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ⭐ 별점 선택 */}
        <div>
          <label className="block font-semibold mb-1">별점 (1.0~5.0)</label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            {[...Array(9)].map((_, i) => {
              const value = (i + 2) * 0.5;
              return (
                <option key={value} value={value}>
                  {value.toFixed(1)}점
                </option>
              );
            })}
          </select>
        </div>

        {/* ✍️ 리뷰 텍스트 */}
        <div>
          <label className="block font-semibold mb-1">리뷰 작성</label>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={5}
            className="w-full border border-gray-300 p-2 rounded resize-none"
            placeholder="경험을 공유해주세요!"
            required
          />
        </div>

        {/* 📷 사진 첨부 */}
        <div>
          <label className="block font-semibold mb-1">사진 첨부 (선택)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <p className="text-sm text-gray-500 mt-1">선택한 파일: {image.name}</p>
          )}
        </div>

        {/* ✅ 등록 버튼 */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            리뷰 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewWrite;
