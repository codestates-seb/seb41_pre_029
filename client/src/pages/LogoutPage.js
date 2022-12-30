import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const LogoutPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);

  const navigate = useNavigate();

  function logoutHandler() {
    removeCookie("ikuzo");
    navigate("/");
    window.location.reload();
  }

  return (
    <Container>
      <LogoutTitle>
        Clicking “Log out” will log you out of the following
        <br /> domains on this device:
      </LogoutTitle>
      <Content>
        <LogoutBox>
          <LinkBox>
            <Li>
              <img
                src="https://cdn.sstatic.net/Sites/askubuntu/Img/apple-touch-icon@2.png?v=c492c9229955"
                alt="askubuntu.com"
              />
              <Link>askubuntu.com</Link>
            </Li>
            <Li>
              <img
                src="https://cdn.sstatic.net/Sites/mathoverflow/Img/apple-touch-icon@2.png?v=f1c9606b77ffe"
                alt="mathoverflow.net"
              />
              <Link>mathoverflow.net</Link>
            </Li>
            <Li>
              <img
                src="https://cdn.sstatic.net/Sites/serverfault/Img/apple-touch-icon@2.png?v=9b1f48ae296b"
                alt="serverfault.com"
              />
              <Link>serverfault.com</Link>
            </Li>
            <Li>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2702/2702949.png"
                alt="stackapps.com"
              />
              <Link>stackapps.com</Link>
            </Li>
            <Li>
              <img
                src="https://www.svgrepo.com/show/349513/stackexchange.svg"
                alt="stackexchange.com"
              />
              <Link>stackexchange.com</Link>
            </Li>
            <Li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1024px-Stack_Overflow_icon.svg.png?20190716190036"
                alt="stackoverflow.com"
              />
              <Link>stackoverflow.com</Link>
            </Li>
            <Li>
              <img
                src="https://cdn.sstatic.net/Sites/superuser/Img/apple-touch-icon@2.png?v=e869e4459439"
                alt="superuser.com"
              />
              <Link>superuser.com</Link>
            </Li>
          </LinkBox>
          <DeviceLogout>
            <input type="checkbox" />
            <span>Log out on all devices</span>
          </DeviceLogout>
          <LoginChoice>
            <LogoutButton onClick={() => logoutHandler()}>Log out</LogoutButton>
            <Link to={"/"}>
              <CancelButton>Cancel</CancelButton>
            </Link>
          </LoginChoice>
          <Explanation>
            If you’re on a shared computer, remember to log out of your Open ID
            provider (Facebook, Google, Stack Exchange, etc.) as well.
          </Explanation>
        </LogoutBox>
      </Content>
    </Container>
  );
};
export default LogoutPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f2f3;
  width: 100%;
  min-height: 800px;
  box-sizing: border-box;
`;

const LogoutTitle = styled.h1`
  padding-top: 100px;
  font-size: 1.3rem;
  line-height: 30px;
  color: #232629;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  width: 18%;
  margin: 40px auto;
`;

const LogoutBox = styled.div`
  background-color: white;
  border: 1px solid #d6d6d6;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 5px;
  width: 100%;
  padding: 20px;
`;

const LinkBox = styled.ul`
  align-items: center;
  border-bottom: 1px solid #d6d6d6;
  padding: 10px 0;
  img {
    width: 30px;
    vertical-align: middle;
  }
  a {
    font-size: 1rem;
    color: #0074cc;
    text-decoration: none;
  }
`;

const DeviceLogout = styled.div`
  margin: 20px 0;
  font-size: 0.8rem;
  color: #0c0d0e;
  position: relative;
  input {
    position: relative;
    top: 3px;
    right: 1px;
  }
`;

const LoginChoice = styled.div`
  display: flex;
  width: 60%;
`;

const LogoutButton = styled.button`
  background-color: #0a95ff;
  border: none;
  width: 100%;
  border-radius: 3px;
  padding: 10px 10px;
  margin: 10px 0;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #0084cc;
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: #0074cc;
  border: none;
  width: 100%;
  border-radius: 3px;
  padding: 10px 20px;
  margin: 10px 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(187, 244, 253, 0.3);
  }
`;
const Li = styled.div`
  display: block;
  line-height: 25px;
  img {
    width: 25px;
    height: 25px;
    padding: 2px;
  }
`;
const Explanation = styled.h2`
  margin: 20px 0;
  color: #6a737c;
  font-size: 0.8rem;
`;
