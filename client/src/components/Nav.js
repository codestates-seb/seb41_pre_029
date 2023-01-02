import styled from "styled-components";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Nav = ({ location }) => {
  const [active, setActive] = useState(location.pathname);
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [memberId, setMemberId] = useState();
  const [myPageLink, setMyPageLink] = useState("/loginpage");

  useEffect(() => {
    if (cookies.ikuzo) {
      setMemberId(cookies.ikuzo.id);
      setMyPageLink(`/mypage/${memberId}`);
    }
  }, [memberId]);

  const handleClick = (link) => {
    setActive(link);
  };
  const navigate = useNavigate();
  const menu = [
    { name: "Questions", link: "/" },
    { name: "Tags", link: "/tags" },
    { name: "Users", link: `${myPageLink}` },
    { name: "Companies", link: "/companies" },
  ];

  return (
    <NavContainer>
      <Link to="/">
        <GoHome>
          <div>Home</div>
          <div />
        </GoHome>
      </Link>
      <NavList className="first_list">PUBLIC </NavList>
      {menu.map((el, index) => (
        <NavLink
          key={index}
          to={el.link}
          className={`${el.link === active ? "active" : null} ${
            location.pathname.includes("/questionpage") && index === 0
              ? "active"
              : null
          }`}
          onClick={() => {
            handleClick(el.link);
            navigate("/");
          }}
        >
          <div>
            {index === 0 ? (
              <div className="icon">
                <svg
                  aria-hidden="true"
                  className="svg-icon iconGlobe"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"></path>
                </svg>
              </div>
            ) : null}
            {el.name}
          </div>
        </NavLink>
      ))}

      <NavList className="second_list">COLLECTIVES </NavList>
      <NavLink_Icon>
        <div className="icon">
          <svg
            aria-hidden="true"
            className="mt-auto fc-orange-400 svg-icon iconStarVerified"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="#ff7f00"
          >
            <path d="M9.86.89a1.14 1.14 0 0 0-1.72 0l-.5.58c-.3.35-.79.48-1.23.33l-.72-.25a1.14 1.14 0 0 0-1.49.85l-.14.76c-.1.45-.45.8-.9.9l-.76.14c-.67.14-1.08.83-.85 1.49l.25.72c.15.44.02.92-.33 1.23l-.58.5a1.14 1.14 0 0 0 0 1.72l.58.5c.35.3.48.79.33 1.23l-.25.72c-.23.66.18 1.35.85 1.49l.76.14c.45.1.8.45.9.9l.14.76c.14.67.83 1.08 1.49.85l.72-.25c.44-.15.92-.02 1.23.33l.5.58c.46.52 1.26.52 1.72 0l.5-.58c.3-.35.79-.48 1.23-.33l.72.25c.66.23 1.35-.18 1.49-.85l.14-.76c.1-.45.45-.8.9-.9l.76-.14c.67-.14 1.08-.83.85-1.49l-.25-.72c-.15-.44-.02-.92.33-1.23l.58-.5c.52-.46.52-1.26 0-1.72l-.58-.5c-.35-.3-.48-.79-.33-1.23l.25-.72a1.14 1.14 0 0 0-.85-1.49l-.76-.14c-.45-.1-.8-.45-.9-.9l-.14-.76a1.14 1.14 0 0 0-1.49-.85l-.72.25c-.44.15-.92.02-1.23-.33l-.5-.58Zm-.49 2.67L10.6 6.6c.05.15.19.24.34.25l3.26.22c.36.03.5.48.23.71l-2.5 2.1a.4.4 0 0 0-.14.4l.8 3.16a.4.4 0 0 1-.6.44L9.2 12.13a.4.4 0 0 0-.42 0l-2.77 1.74a.4.4 0 0 1-.6-.44l.8-3.16a.4.4 0 0 0-.13-.4l-2.5-2.1a.4.4 0 0 1 .22-.7l3.26-.23a.4.4 0 0 0 .34-.25l1.22-3.03a.4.4 0 0 1 .74 0Z"></path>
          </svg>
          Explore Collectives
        </div>
      </NavLink_Icon>
      <NavList className="third_list">TEAMS</NavList>
      <NavLink_Icon>
        <div className="icon">
          <div className="brief_case_wrapper">
            <div className="brief_case">
              <svg
                aria-hidden="true"
                className="svg-icon iconBriefcaseSm"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="white"
              >
                <path d="M4 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h.5c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 0 1 2 10.5v-5C2 4.67 2.67 4 3.5 4H4V3Zm5 1V3H5v1h4Z"></path>
              </svg>
            </div>
            <svg
              aria-hidden="true"
              className="native s-avatar--badge svg-icon iconShieldXSm"
              width="9"
              height="10"
              viewBox="0 0 9 10"
            >
              <path
                d="M0 1.84 4.5 0 9 1.84v3.17C9 7.53 6.3 10 4.5 10 2.7 10 0 7.53 0 5.01V1.84Z"
                fill="white"
              ></path>
              <path
                d="M1 2.5 4.5 1 8 2.5v2.51C8 7.34 5.34 9 4.5 9 3.65 9 1 7.34 1 5.01V2.5Zm2.98 3.02L3.2 7h2.6l-.78-1.48a.4.4 0 0 1 .15-.38c.34-.24.73-.7.73-1.14 0-.71-.5-1.23-1.41-1.23-.92 0-1.39.52-1.39 1.23 0 .44.4.9.73 1.14.12.08.18.23.15.38Z"
                fill="grey"
              ></path>
            </svg>
          </div>
          <div className="team_icon_text">Create free Team</div>
        </div>
      </NavLink_Icon>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.ol`
  margin-top: 0.2px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  width: 165px;
  height: 100vh;

  z-index: 1;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;

  font-size: 13px;

  > a {
    text-decoration: none;
  }

  & .active {
    font-weight: bold;
    background: #f1f2f3;
    color: var(--black-900);
    border-right: 3px solid #ff7f00;
  }
`;
const GoHome = styled.button`
  width: 164px;
  height: 34px;

  margin-top: 20px;

  padding: 4px 4px 4px 8px;
  color: #525960;

  border: none;
  cursor: pointer;

  background-color: #fff;

  > div:first-child {
    width: 36px;
    height: 26px;
    line-height: 26px;
  }

  &:hover {
    color: #ff7f00;
  }
`;

const NavList = styled.li`
  width: 150px;
  height: 17px;
  line-height: 17px;
  color: #525960;

  font-size: 11px;
  &.first_list {
    padding: 16px 0px 4px 8px;
  }

  &.second_list {
    padding: 16px 0px 0px 8px;
  }

  &.third_list {
    padding: 24px 0px 4px 8px;
  }
`;

const NavLink_Icon = styled.div`
  width: 150px;
  height: 17px;
  line-height: 17px;

  padding: 8px 6px 8px 8px;
  color: #525960;
  cursor: pointer;

  &.isActive {
    font-weight: bold;
    background: #f1f2f3;
    color: var(--black-900);
    border-right: 3px solid #f48225;
  }

  &:hover {
    color: #ff7f00;
  }

  > .icon {
    display: flex;
    flex-direction: row;

    > svg {
      width: 17px;
      height: 17px;

      margin: -1px 4px 0 0;
    }

    & > .brief_case_wrapper {
      width: 16px;
      height: 16px;
      border-radius: 5px;
      background-color: #f48225;

      position: relative;

      & > .brief_case {
        padding-top: 1px;
        display: flex;
        justify-content: space-around;
        position: relative;
      }

      & > svg:last-child {
        position: absolute;
        top: 65%;
        left: 55%;
      }
    }
  }

  & > div .team_icon_text {
    padding-left: 6px;
  }
`;

const NavLink = styled(Link)`
  width: 130px;
  height: 26px;
  line-height: 26px;

  padding: 4px 4px 4px 30px;
  color: #525960;

  cursor: pointer;

  &:hover {
    color: #ff7f00;
  }

  & .active {
    font-weight: bold;
    background: #f1f2f3;
    color: var(--black-900);
    border-right: 3px solid #ff7f00;
  }

  > div {
    display: flex;
    flex-direction: row;
  }
  .icon {
    > svg {
      width: 17px;
      height: 17px;

      margin: 5px 2px 0 -20px;
    }
  }
`;
