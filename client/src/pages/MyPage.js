import axios from "axios";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Nav from "../components/Nav";
import Theme from "../components/Theme";
import Footer from "../components/Footer";
import displayedAt from "../util/displayedAt";
import EditProfile from "../components/EditProfile";
import DeleteProfile from "../components/DeleteProfile";

const PageWrapper = styled.div`
  display: flex;
  margin: 0 320.5px 0 320.5px;
`;
const ContentsWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 24px 24px 24px 24px;
  // 유저 프로필 부분
  > .content-userBar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > img {
      border-radius: 5px;
      width: 128px;
      height: 128px;
      margin: 8px;
    }
    > .content-userBar--flexItems {
      > .username {
        font-family: "system-ui", "Segoe UI Adjusted", "Segoe UI",
          "Liberation Sans", sans-serif;
        font-size: 34px;
        margin-left: 5px;
        margin-bottom: 12px;
      }
      > .icons {
        display: flex;
        color: #6a737c;
        > .icons-wrapper {
          display: flex;
          align-items: center;
          margin: 4px;
          > svg {
            margin: 0 2px 0 2px;
          }
        }
      }
    }
  }

  // nav, 인터페이스 부분
  > .content-body {
    display: flex;
    /* height: 100%; */
    > nav {
      margin-right: 32px;
      > ul {
        top: 64px;
        font-family: "system-ui", "Segoe UI Adjusted", "Segoe UI",
          "Liberation Sans", sans-serif;
        font-size: 13px;
        > .title {
          padding: 6px 48px 6px 12px;
          display: block;
          align-items: center;
          border-radius: 15px;
          color: #232629;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 2px;
          margin-top: 30px;
        }
        > .button {
          cursor: pointer;
          padding: 6px 48px 6px 12px;
          display: block;
          align-items: center;
          border-radius: 15px;
          color: #525960;
          font-weight: 600;
          white-space: nowrap;
          :hover {
            background-color: #e3e6e8;
          }
        }
        > .clicked {
          background-color: #da680b;
          color: #ffffff;
        }
        > .active {
          background-color: #f48225;
          color: #ffffff;
          :hover {
            background-color: #da680b;
          }
        }
      }
    }
    > .content-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      > .content-about {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        > .content-about--title {
          font-size: 21px;
          font-weight: 400;
          text-align: left;
          margin-bottom: 8px;
        }
        > .content-about--body {
          border-radius: 5px;
          background-color: #f8f9f9;
          border: solid 1px hsl(210deg 8% 85%);
          text-align: center;
          padding: 32px;
          color: #6a737c;
          font-weight: 400;
          font-size: 13px;
          > p {
            margin: 0 200px 0 200px;
          }
        }
      }
      > .content-interface {
      }
    }
  }
`;

const MyPage = () => {
  const [activeTheme, setActiveTheme] = useState(true);
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeDel, setActiveDel] = useState(false);
  const [page, setPage] = useState("theme");
  const [userInfo, setUserInfo] = useState({});

  const params = useParams();
  const id = params.id;
  const pathLocation = { pathname: `/mypage/${id}` };
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [isToken, setIsToken] = useState();
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
      setMemberId(cookies.ikuzo.id);
    }
  }, []);

  useEffect(() => {
    if (memberId !== null) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
          headers: { Authorization: isToken },
        })
        .then((res) => setUserInfo(res.data.data));
    }
  }, [memberId]);

  const handleClickEdit = () => {
    if (!activeEdit) {
      setActiveEdit(true);
      setActiveDel(false);
      setActiveTheme(false);
      setPage("edit");
    }
  };
  const handleClickDel = () => {
    if (!activeDel) {
      setActiveDel(true);
      setActiveTheme(false);
      setActiveEdit(false);
      setPage("delete");
    }
  };
  const handleClickTheme = () => {
    if (!activeTheme) {
      setActiveTheme(true);
      setActiveDel(false);
      setActiveEdit(false);
      setPage("theme");
    }
  };

  return (
    <>
      <PageWrapper>
        <Nav location={pathLocation} />
        <ContentsWrapper>
          <div className="content-userBar">
            <img src={userInfo?.profile?.image} alt="profile_image"></img>
            <div className="content-userBar--flexItems">
              <div className="username">{userInfo?.nickname}</div>
              <ul className="icons">
                <li className="icons-wrapper">
                  <svg
                    fill="#6a737c"
                    aria-hidden="true"
                    className="svg-icon iconCake"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 4.5a1.5 1.5 0 0 0 1.28-2.27L9 0 7.72 2.23c-.14.22-.22.48-.22.77 0 .83.68 1.5 1.5 1.5Zm3.45 7.5-.8-.81-.81.8c-.98.98-2.69.98-3.67 0l-.8-.8-.82.8c-.49.49-1.14.76-1.83.76-.55 0-1.3-.17-1.72-.46V15c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-2.7c-.42.28-1.17.45-1.72.45-.69 0-1.34-.27-1.83-.76Zm1.3-5H10V5H8v2H4.25C3 7 2 8 2 9.25v.9c0 .81.91 1.47 1.72 1.47.39 0 .77-.14 1.03-.42l1.61-1.6 1.6 1.6a1.5 1.5 0 0 0 2.08 0l1.6-1.6 1.6 1.6c.28.28.64.43 1.03.43.81 0 1.73-.67 1.73-1.48v-.9C16 8.01 15 7 13.75 7Z" />
                  </svg>
                  <span>
                    Member for {displayedAt(userInfo?.createdAt)} created🎉
                  </span>
                </li>
                <li className="icons-wrapper">
                  <svg
                    fill="#6a737c"
                    aria-hidden="true"
                    className="svg-icon iconClock"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8Zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6ZM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5Z" />
                  </svg>
                  <span>Last seen {"this week"}</span>
                </li>
                <li className="icons-wrapper">
                  <svg
                    fill="#6a737c"
                    aria-hidden="true"
                    className="svg-icon iconCalendar"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14 2h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h1V0h2v2h6V0h2v2ZM3 6v9h12V6H3Zm2 2h2v2H5V8Zm0 3h2v2H5v-2Zm3 0h2v2H8v-2Zm3 0h2v2h-2v-2Zm0-3h2v2h-2V8ZM8 8h2v2H8V8Z" />
                  </svg>
                  <span>Visited {7} days ago</span>
                </li>
                {userInfo?.profile?.location ? (
                  <li className="icons-wrapper">
                    <svg
                      aria-hidden="true"
                      className="mrn2 svg-icon iconLocation"
                      width="15"
                      height="15"
                      viewBox="0 0 17 18"
                      fill="#6a737c"
                    >
                      <path d="M2 6.38C2 9.91 8.1 17.7 8.1 17.7c.22.29.58.29.8 0 0 0 6.1-7.8 6.1-11.32A6.44 6.44 0 0 0 8.5 0 6.44 6.44 0 0 0 2 6.38Zm9.25.12a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0Z"></path>
                    </svg>
                    <span>{userInfo?.profile.location}</span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
          <div className="content-body">
            <nav>
              <ul>
                <li className="title">
                  <span>PERSONAL INFORMATION</span>
                </li>
                <li
                  className={`button ${activeTheme ? "active" : ""}`}
                  onClick={handleClickTheme}
                >
                  <span>Theme</span>
                </li>
                <li
                  className={`button ${activeEdit ? "active" : ""}`}
                  onClick={handleClickEdit}
                >
                  <span>Edit profile</span>
                </li>
                <li
                  className={`button ${activeDel ? "active" : ""}`}
                  onClick={handleClickDel}
                >
                  <span>Delete profile</span>
                </li>
                <li className="title">
                  <span>EMAIL SETTINGS</span>
                </li>
                <li className="button">
                  <span>Edit email settings</span>
                </li>
                <li className="button">
                  <span>Tag watching & ignoring</span>
                </li>
                <li className="button">
                  <span>Community digests</span>
                </li>
                <li className="button">
                  <span>Question subscriptions</span>
                </li>
                <li className="title">
                  <span>SITE SETTINGS</span>
                </li>
                <li className="button">
                  <span>Preferences</span>
                </li>
                <li className="button">
                  <span>Flair</span>
                </li>
                <li className="button">
                  <span>Hide communities</span>
                </li>
                <li className="title">
                  <span>ACCESS</span>
                </li>
                <li className="button">
                  <span>Your Collectives</span>
                </li>
                <li className="button">
                  <span>Your logins</span>
                </li>
                <li className="title">
                  <span>API</span>
                </li>
                <li className="button">
                  <span>Authorized applications</span>
                </li>
              </ul>
            </nav>
            <div className="content-wrapper">
              <div className="content-about">
                <div className="content-about--title">About</div>
                <div className="content-about--body">
                  <p>{userInfo?.profile?.aboutMe}</p>
                </div>
              </div>
              <div className="content-interface">
                {page === "theme" && <Theme />}
                {page === "edit" && <EditProfile />}
                {page === "delete" && <DeleteProfile />}
              </div>
            </div>
          </div>
        </ContentsWrapper>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default MyPage;
