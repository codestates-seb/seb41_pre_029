import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

import Button from "./Button";

const DeleteProfile = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [isToken, setIsToken] = useState();
  const [memberId, setMemberId] = useState();

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
      setMemberId(cookies.ikuzo.id);
    }
  }, []);
  const handleActive = () => {
    setActive(!active);
  };

  //회원 탈퇴 기능
  const handleDeleteProfile = () => {
    if (active) {
      window.confirm("정말 삭제하시겠습니까?");
      //상태 로그아웃으로 만들기
      axios
        .delete(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
          headers: {
            Authorization: isToken,
            withCredentials: true,
          },
        })
        .then((res) => {
          removeCookie("ikuzo");
          alert("그동안 이용해주셔서 감사합니다.");
          navigate("/");
          window.location.reload();
        })
        .catch((err) => console.log("로그아웃 ☠️"));
    }
  };

  return (
    <DeleteProfileContainer>
      <Heading>Delete Profile</Heading>
      <p>
        Before confirming that you would like your profile deleted, we'd like to
        take a moment to explain the implications of deletion:
      </p>
      <ul>
        <li>
          • Deletion is irreversible, and you will have no way to regain any of
          your original content, should this deletion be carried out and you
          change your mind later on.
        </li>
        <li>
          • Your questions and answers will remain on the site, but will be
          disassociated and anonymized (the author will be listed as
          "user20812562") and will not indicate your authorship even if you
          later return to the site.
        </li>
      </ul>
      <p>
        Confirming deletion will only delete your profile on Stack Overflow - it
        will not affect any of your other profiles on the Stack Exchange
        network. If you want to delete multiple profiles, you'll need to visit
        each site separately and request deletion of those individual profiles.
      </p>
      <FlexItem>
        <div>
          <input type="checkbox" onClick={handleActive}></input>
        </div>
        <div>
          <p>
            I have read the information stated above and understand the
            implications of having my profile deleted. I wish to proceed with
            the deletion of my profile.
          </p>
        </div>
      </FlexItem>
      <div onClick={handleDeleteProfile}>
        <Button
          buttonName={"Delete profile"}
          width="104.03"
          background="#D43A40"
          className={active ? "active" : "normal"}
        ></Button>
      </div>
    </DeleteProfileContainer>
  );
};

export default DeleteProfile;

const DeleteProfileContainer = styled.div`
  height: 544px;
  color: #0c0d0e;
  overflow-wrap: break-word;
  line-height: 20px;

  & > :last-child {
    margin: 5px 10px;
    font-weight: bold;
    font-size: 13px;
  }

  > div > .normal {
    background-color: rgba(212, 104, 107, 0.8);
    border: none;
    border-radius: 3px;
    height: 38px;
  }

  > div > .active {
    border: none;
    border-radius: 3.5px;
    height: 38px;
    border-color: transparent;

    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.4);

    &:hover {
      background-color: #c22e32;
      box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.4);
    }
  }

  > p {
    font-size: 16.5px;
    margin: 0 0 16.5px;
    color: #232629;
  }
  > ul {
    margin: 10px;

    > li {
      font-size: 15px;
      color: #232629;

      margin-top: 15px;
      padding-bottom: 5px;
    }
  }
`;

const Heading = styled.h1`
  font-size: 27px;

  border-bottom: 1px solid #f1f2f3;
  margin: 0 0 24px;
  padding: 0 0 16px;
`;

const FlexItem = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 8px;

  & > div :first-child {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
