import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
    window.location.reload(); // 👉 상태를 강제로 재확인 (필요 시)
  };
  

  return (
    <NavContainer>
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