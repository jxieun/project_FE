// Profile.js
import React from 'react';

const Profile = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로그인 상태 확인

  if (!isLoggedIn) {
    return <p>로그인 후 이용해주세요.</p>;
  }

  // 로그인된 경우 표시할 내 정보 예시 (원하는 정보로 수정 가능)
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  return (
    <div>
      <h2>내 정보</h2>
      <p><strong>이름:</strong> {userData.name || '이름 없음'}</p>
      <p><strong>이메일:</strong> {userData.email || '이메일 없음'}</p>
      {/* 필요 시 추가 정보 표시 */}
    </div>
  );
};

export default Profile;
