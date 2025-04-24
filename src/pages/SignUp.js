import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { 
  SignupContainer, 
  SignupTitle, 
  Input, 
  SubmitButton 
} from "../styles";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    // 사용자 정보 로컬에 저장
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ id: form.id, password: form.password });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  }

  return (
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>
      <Input name="id" type="text" placeholder="아이디" onChange={handleChange} />
      <Input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
      <Input name="confirmPassword" type="password" placeholder="비밀번호 확인" onChange={handleChange} />
      <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
    </SignupContainer>
  );
};

export default SignUp;
