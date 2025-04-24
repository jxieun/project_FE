import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Container,
  Header,
  SiteName,
  LoginButton,
  Navbar,
  NavItem,
  ContentWrapper,
} from "../styles";

const Layout = () => {
  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <SiteName>Y.P.T</SiteName>
        <Link to="/login">
          <LoginButton>로그인</LoginButton>
        </Link>
      </Header>

      {/* 메뉴바 */}
      <Navbar>
        <NavItem as={Link} to="/profile">내 정보</NavItem>
        <NavItem as={Link} to="/">홈</NavItem>
        <NavItem as={Link} to="/diary">나의 직관일지</NavItem>
        <NavItem as={Link} to="/excitingzone">익사이팅존</NavItem>
        <NavItem as={Link} to="/guidezone">직관 가이드</NavItem>
      </Navbar>

      {/* 페이지별 콘텐츠 */}
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default Layout;
