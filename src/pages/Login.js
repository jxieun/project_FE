import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { 
  LoginContainer, 
  LoginTitle, 
  Input, 
  LoginButton, 
  SiteName, 
  SignupText 
} from "../styles"; 

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });

  // 입력값 변경 처리
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 로그인 처리
  const handleLogin = () => {
    // 로컬스토리지에 저장된 회원 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // 입력한 정보와 일치하는 회원 찾기
    const user = users.find((u) => u.id === form.id && u.password === form.password);

    if (user) {
      alert("로그인 성공!");

      // ✅ 로그인 상태 저장 (Navbar에서 사용하기 위함)
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // 홈으로 이동
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <LoginContainer>
      <SiteName onClick={() => navigate("/")}>Y.P.T</SiteName>
      <LoginTitle>로그인</LoginTitle>

      {/* 로그인 이미지 */}
      <img 
        src="/assets/login-image.png" 
        alt="로그인 이미지" 
        style={{ width: "200px", marginBottom: "20px" }} 
      />

      {/* 입력 폼 */}
      <Input
        name="id"
        type="text"
        placeholder="아이디"
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <LoginButton onClick={handleLogin}>로그인</LoginButton>

      <SignupText onClick={() => navigate("/signup")}>회원가입</SignupText>
    </LoginContainer>
  );
};

export default Login;