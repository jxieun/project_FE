import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
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

const Navbar = () => {
  return (
    <NavContainer>
      <NavItem to="/">홈</NavItem>
      <NavItem to="/diary">나의 직관일지</NavItem>
      <NavItem to="/login">로그인</NavItem>
      <NavItem to="/excitingzone">익사이팅존</NavItem>
    </NavContainer>
  );
};

export default Navbar;
