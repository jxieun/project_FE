import React from "react";
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

  return (
    <LoginContainer>
      {/* 사이트 이름 (홈으로 이동) */}
      <SiteName onClick={() => navigate("/")}>사이트 이름</SiteName>
      
      <LoginTitle>로그인</LoginTitle>
      
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비밀번호" />
      <LoginButton>로그인</LoginButton>

      {/* 회원가입 버튼 (회원가입 페이지로 이동) */}
      <SignupText onClick={() => navigate("/signup")}>회원가입</SignupText>
    </LoginContainer>
  );
};

export default Login;
