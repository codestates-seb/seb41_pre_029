import axios from "axios";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Button from "./Button";

const Header = ({ search, find }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [isToken, setIsToken] = useState();
  const [memberID, setMemberId] = useState(cookies?.ikuzo.id);
  const [isLogin, setIsLogin] = useState((isToken && true) || false);
  console.log(isLogin);

  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
      setMemberId(cookies.ikuzo.id);
      setIsLogin(true)
    }
  }, [cookies]);

  const changeValue = (e) => {
    setData(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      axios.get(`${process.env.REACT_APP_API_URL}/questions/searchVaue=${data}`).then((res) => {
        search(res?.data.data);
        find("find");
        navigate("/");
        setData("");
      });
    }
    find("");
  };

  const [profile, setProfile] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/${memberID}`, {
        headers: { Authorization: isToken },
      })

      .then((res) => {
        setProfile(res?.data.data.profile);
      })
  }, []);

  return (
    <HeaderSearch>
      <Container>
        <Flex>
          <SvgDiv width={"40px"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 -5 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </SvgDiv>
          <Link to={"/"}>
            <SvgDiv>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="30"
                viewBox="0 0 622 110"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#1E1B1D"
                    fillRule="nonzero"
                    d="M142.7,76.742 L135.526,76.107 C129.895,75.654 127.716,73.383 127.716,69.568 C127.716,65.028 131.167,62.211 137.706,62.211 C142.338,62.211 146.424,63.302 149.606,65.754 L153.875,61.485 C149.875,58.216 144.156,56.673 137.8,56.673 C128.264,56.673 121.361,61.573 121.361,69.75 C121.361,77.106 125.994,81.011 134.712,81.738 L142.068,82.373 C147.244,82.828 149.515,85.007 149.515,88.912 C149.515,94.18 144.974,96.812 137.615,96.812 C132.074,96.812 127.261,95.359 123.715,91.635 L119.355,95.995 C124.26,100.717 130.163,102.443 137.701,102.443 C148.508,102.443 155.865,97.443 155.865,88.821 C155.865,80.463 150.506,77.468 142.695,76.74 L142.7,76.742 Z M198.613,56.671 C191.444,56.671 186.928,58.084 182.971,63.094 C182.917,63.163 187.261,67.386 187.261,67.386 C189.894,63.663 192.8,62.302 198.521,62.302 C206.695,62.302 209.965,65.571 209.965,72.109 L209.965,76.377 L196.527,76.377 C186.537,76.377 181.089,81.464 181.089,89.277 C180.984058,92.6262953 182.189462,95.884474 184.449,98.359 C187.265,101.266 190.897,102.446 197.072,102.446 C203.066,102.446 206.336,101.266 209.972,97.632 L209.972,101.9 L216.511,101.9 L216.511,71.565 C216.511,61.848 210.611,56.673 198.62,56.673 L198.613,56.671 Z M209.969,86.1 C209.969,89.825 209.242,92.368 207.698,93.82 C204.883,96.545 201.523,96.82 197.709,96.82 C190.625,96.82 187.445,94.367 187.445,89.19 C187.445,84.013 190.715,81.29 197.437,81.29 L209.969,81.29 L209.969,86.1 Z M242.118,62.489 C246.386,62.489 249.018,63.76 252.38,67.483 C252.38,67.483 256.758,63.228 256.722,63.19 C252.137,58.285 248.245,56.677 242.122,56.677 C230.86,56.677 222.322,64.305 222.322,79.562 C222.322,94.819 230.858,102.449 242.122,102.449 C248.297,102.449 252.202,100.813 256.834,95.819 L252.384,91.55 C249.024,95.274 246.39,96.636 242.122,96.636 C238.033212,96.7993765 234.138626,94.8861276 231.769,91.55 C229.68,88.644 228.863,85.193 228.863,79.562 C228.863,73.931 229.68,70.48 231.769,67.574 C234.138117,64.2373869 238.033165,62.3242873 242.122,62.489 L242.118,62.489 Z M298.122,57.155 L289.97,57.155 L269.71,76.875 L269.741,37.236 L263.2,37.236 L263.2,101.9 L269.74,101.9 L269.709,85.591 L277.64,77.632 L292.628,101.9 L300.71,101.9 L282.17,73.1 L298.122,57.155 Z M328.335,56.055 C321.635,56.055 317.108,58.666 314.322,61.625 C310.231,65.89 309.187,71.025 309.187,79.207 C309.187,87.475 310.231,92.607 314.322,96.876 C317.108,99.835 321.633,102.447 328.335,102.447 C335.037,102.447 339.651,99.835 342.435,96.876 C346.526,92.611 347.571,87.476 347.571,79.207 C347.571,71.026 346.526,65.89 342.435,61.625 C339.651,58.666 335.035,56.055 328.335,56.055 Z M333.645,90.261 C332.226419,91.6312106 330.305034,92.3548961 328.335,92.261 C326.391065,92.355011 324.496795,91.6295149 323.113,90.261 C320.762,87.911 320.502,83.908 320.502,79.207 C320.502,74.506 320.762,70.591 323.113,68.241 C324.49659,66.8721679 326.391005,66.1466163 328.335,66.241 C330.30511,66.1466229 332.226679,66.8703779 333.645,68.241 C335.994,70.591 336.256,74.507 336.256,79.207 C336.256,83.907 335.994,87.907 333.645,90.261 Z M377.7,56.575 L368.562,84.6 L359.336,56.573 L347.41,56.573 L364.123,101.92 L373,101.92 L389.623,56.573 L377.7,56.575 Z M408.873,56.053 C397.124,56.053 389.116,64.408 389.116,79.205 C389.116,97.571 399.387,102.445 410.092,102.445 C418.274,102.445 422.714,99.92 427.326,95.306 L420.451,88.606 C417.578,91.479 415.14,92.871 410.179,92.871 C403.825,92.871 400.257,88.606 400.257,82.771 L428.631,82.771 L428.631,77.726 C428.631,65.279 421.494,56.053 408.873,56.053 Z M400.257,75.027 C400.273614,73.3485451 400.629053,71.6907352 401.302,70.153 C402.728026,67.2748247 405.662422,65.4538855 408.8745,65.4538855 C412.086578,65.4538855 415.020974,67.2748247 416.447,70.153 C417.117747,71.6914042 417.472764,73.3488292 417.491,75.027 L400.257,75.027 Z M445.322,60.927 L445.322,56.575 L434.267,56.575 L434.267,101.922 L445.582,101.922 L445.582,74.593 C445.582,68.848 449.412,66.236 452.894,66.236 C455.1886,66.1567159 457.391459,67.1404382 458.864,68.902 L467.43,60.318 C464.296,57.184 461.163,56.053 456.724,56.053 C452.407599,56.0018792 448.269295,57.7711856 445.324,60.927 L445.322,60.927 Z M470.941,51.848 L470.941,101.876 L482.255,101.876 L482.255,66.122 L490.611,66.122 L490.611,57.506 L482.255,57.506 L482.255,52.545 C482.255,49.934 483.562,48.454 486.255,48.454 L490.607,48.454 L490.607,38.881 L484.167,38.881 C474.939,38.881 470.937,45.408 470.937,51.848 L470.941,51.848 Z M537.191,56.048 C530.491,56.048 525.963,58.659 523.178,61.618 C519.088,65.883 518.043,71.018 518.043,79.2 C518.043,87.468 519.088,92.6 523.178,96.869 C525.963,99.828 530.489,102.44 537.191,102.44 C543.893,102.44 548.507,99.828 551.291,96.869 C555.381,92.604 556.426,87.469 556.426,79.2 C556.426,71.019 555.381,65.883 551.291,61.618 C548.506,58.659 543.891,56.048 537.191,56.048 Z M542.501,90.254 C541.082419,91.6242106 539.161034,92.3478961 537.191,92.254 C535.247065,92.348011 533.352795,91.6225149 531.969,90.254 C529.619,87.904 529.358,83.901 529.358,79.2 C529.358,74.499 529.619,70.584 531.969,68.234 C533.35259,66.8651679 535.247005,66.1396163 537.191,66.234 C539.16111,66.1396229 541.082679,66.8633779 542.501,68.234 C544.85,70.584 545.112,74.5 545.112,79.2 C545.112,83.9 544.85,87.9 542.501,90.254 Z M609.883,56.57 L602.573,84.6 L593.26,56.575 L584.993,56.575 L575.765,84.6 L568.455,56.573 L556.444,56.573 L570.37,101.92 L579.683,101.92 L589.17,73.46 L598.657,101.92 L607.97,101.92 L621.809,56.573 L609.883,56.57 Z M507.3,88.257 L507.3,38.881 L495.989,38.881 L495.989,88.953 C495.989,95.394 499.907,101.922 509.219,101.922 L515.659,101.922 L515.659,92.347 L511.308,92.347 C508.436,92.347 507.308,90.955 507.308,88.257 L507.3,88.257 Z M174,64.246 L180.046,58.2 L167.666,58.2 L167.666,43.5 L161.127,43.5 L161.127,89.912 C161.127,96.541 164.941,101.9 172.57,101.9 L177.2,101.9 L177.2,96.269 L173.75,96.269 C169.573,96.269 167.666,93.816 167.666,89.73 L167.666,64.246 L174,64.246 Z"
                  />
                  <polygon
                    fill="#BBBBBB"
                    points="88 80 99 80 99 124 0 124 0 80 11 80 11 113 88 113"
                  />
                  <path
                    fill="#F58025"
                    fillRule="nonzero"
                    d="M22.9878906,76.73 L77.0128906,88.085 L79.2838906,77.285 L25.2588906,65.925 L22.9878906,76.73 Z M30.1368906,50.861 L80.1828906,74.169 L84.8448906,64.16 L34.7978906,40.852 L30.1368906,50.861 Z M43.9848906,26.308 L86.4128906,61.639 L93.4788906,53.154 L51.0508906,17.824 L43.9848906,26.308 Z M71.3718906,0.192 L62.5118906,6.782 L95.4598906,51.082 L104.319891,44.493 L71.3718906,0.192 Z M22,102 L77,102 L77,91 L22,91 L22,102 Z"
                  />
                </g>
              </svg>
            </SvgDiv>
          </Link>
          <Ul>
            <Li>About</Li>
            <Li>Products</Li>
            <Li>For Teams</Li>
          </Ul>
          <InputDiv>
            <Input
              placeholder="Search…"
              onChange={changeValue}
              onKeyPress={handleKeyPress}
              value={data}
            />
          </InputDiv>
          {isLogin ? (
            <>
              <IconUl>
                <IconLi
                  onClick={() =>
                    navigate(
                      `/mypage/${memberID}`
                    )
                  }
                >
                  <img alt="profile" src={`${profile?.image}`}></img>
                </IconLi>

                <IconLi>
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconInbox"
                    width="20"
                    height="24"
                    viewBox="0 0 20 18"
                  >
                    <path d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z"></path>
                  </svg>
                </IconLi>
                <IconLi>
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconAchievements"
                    width="18"
                    height="24"
                    viewBox="0 0 18 18"
                  >
                    <path d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3ZM3 7c-.5 0-1-.5-1-1V4h1v3Zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1ZM16 6c0 .5-.5 1-1 1V4h1v2Z"></path>
                  </svg>
                </IconLi>
                <IconLi>
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconHelp"
                    width="18"
                    height="24"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8Zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23ZM11.77 8c-.59.66-1.78 1.09-2.05 1.97a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.06-1.35.66-2.2 1.83-2.88.39-.29.7-.75.7-1.24.01-1.24-1.64-1.82-2.35-.72-.21.33-.18.73-.18 1.1H5.75c0-1.97 1.03-3.26 3.03-3.26 1.75 0 3.47.87 3.47 2.83 0 .57-.2 1.05-.48 1.44Z"></path>
                  </svg>
                </IconLi>
              </IconUl>

              <Button link={"/logoutpage"} buttonName={"Log Out"} />
            </>
          ) : (
            <Div>
              <Button
                link={"/loginpage"}
                buttonName={"Log In"}
                background={"#E1ECF4"}
                color={"#39739D"}
              />

              <Button link={"/signuppage"} buttonName={"Sign Up"} />
            </Div>
          )}
        </Flex>
      </Container>
    </HeaderSearch>
  );
};

export default Header;

const HeaderSearch = styled.header`
  height: 50px;
  box-sizing: border-box;
  border-top: 3px solid orange;
  background-color: #f8f9f9;
  box-shadow: 0 4px 4px -4px rgb(178, 178, 178);

  z-index: 1;
`;
const Container = styled.div`
  max-width: 1950px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px 10px;
`;

//플랙스를 주기 위한 div
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
//플랙스 주기위한 디브
const SvgDiv = styled.div`
  width: ${(props) => props.width};
  text-align: center;
  justify-content: center;
  margin: 0px 1px; //
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    :hover {
      background-color: #e0f4f5;
    }
  }
  > :last-child {
    :hover {
      background-color: #015366;
    }
  }
`;
//검색창 구현
const Input = styled.input`
  outline: none;
  width: 100%;
  height: 32px;
  padding: 5px 5px 0px 32px;
  background-position: 7px 0px;
  box-sizing: border-box;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" class="s-input-icon s-input-icon__search svg-icon iconSearch" cx="15" cy="15" viewBox="0 -6 30 30" fill="rgb(150, 150, 150)"%3E%3Cpath d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"%3E%3C/path%3E%3C/svg%3E');
  background-repeat: no-repeat;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;

  svg {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
const InputDiv = styled.div`
  position: relative;
  flex-grow: 1;
`;
const Ul = styled.ul`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 2px 0px;
  margin: 4px;
`;
const Li = styled.li`
  box-sizing: border-box;
  padding: 6px 12px;
  margin: 6px 0px 0px 0px;
  cursor: pointer;

  font-size: 13px;
  &:hover {
    border-radius: 1000px;
    background-color: rgb(255, 219, 137, 0.3);
    user-select: auto;
  }
`;
const IconUl = styled.ul`
  display: flex;
`;
const IconLi = styled.li`
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  padding: 0px 4px;
  width: 24px;
  height: 24px;
  img {
    width: 24px;
    height: 24px;
  }
`;
