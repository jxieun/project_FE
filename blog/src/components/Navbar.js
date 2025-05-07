import React, { useState, useEffect, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext"; // 경로 맞게 조정

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  background-color: ${({ bg }) => bg || "#f0f0f0"};
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const NavItem = styled(Link)`
  margin: 0 20px;
  text-decoration: none;
  font-size: 18px;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`;

const Button = styled.button`
  margin: 0 20px;
  font-size: 16px;
  background: none;
  border: none;
  color: #333;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { gradient } = useContext(ThemeContext); // ✅ 내부로 옮김

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
    window.location.reload(); // 강제 리렌더링
  };

  return (
    <NavContainer bg={gradient}>
      <NavItem to="/profile">내 정보</NavItem>
      <NavItem to="/">홈</NavItem>
      <NavItem to="/diary">나의 직관일지</NavItem>
      <NavItem to="/excitingzone">익사이팅존</NavItem>

      {loggedInUser ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : (
        <NavItem to="/login">로그인</NavItem>
      )}
    </NavContainer>
  );
};

export default Navbar;
