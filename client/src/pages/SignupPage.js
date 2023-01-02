import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Img from "../util/Img";
import Button from "../components/Button";
import { ReactComponent as Question } from "../assets/question.svg";
import { ReactComponent as SvgGit } from "../assets/gitHub.svg";
import { ReactComponent as Google } from "../assets/google.svg";
import { ReactComponent as Facebook } from "../assets/facebook.svg";
import { ReactComponent as Screamer } from "../assets/screamer.svg";
import moment from "moment";
//스타일 감싸는 div
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f2f3;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 316px;
`;
//기능단위 감싸는 디브
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0px 0px 24px;

  &.form {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
      0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  }
`;
const Span = styled.span`
  display: inline-block;
  position: relative;
  .icon {
    position: absolute;
    bottom: -4px;
    left: -22px;
  }
  .logo {
    position: absolute;
    bottom: 6px;
    left: 45%;
  }
  .screamer {
    position: absolute;
    bottom: -26px;
    left: 90%;
  }
  .msg {
    color: 0a95ff;
  }
`;
const LoginInput = styled.input`
  padding: 8px 9px;
  margin-bottom: 15px;
  display: block;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
  font-size: 13px;
  font-family: inherit;
  width: auto;
  &.valid {
    border-color: hsl(358, 62%, 52%);
  }
`;
const Community = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 415px;

  margin: 100px 40px 0px 0px;
`;
const CommunitySpan = styled.span`
  display: inline-block;
  position: relative;
  margin: 15px 10px;
  img {
    position: absolute;

    bottom: -22px;
    left: -30px;
  }
`;
const Title = styled.div`
  font-size: 27px;
  line-height: 27px;
  margin: 0px 0px 32px;
`;
const List = styled.div`
  font-size: 15px;
  line-height: 20px;
  margin: 2px 24px;
  letter-spacing: normal;
  &.content {
    font-size: 13px;
    margin: 30px 0px;
  }
`;
const Label = styled.div`
  padding: 5px;
  display: block;
  font-size: 15px;
  font-weight: 600;
`;
const BtnStyle = styled.button`
  flex: 1 auto;
  width: auto;
  margin: 4px;
  padding: 10px;
  cursor: pointer;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  &:hover {
    filter: brightness(0.96);
  }
`;
const FormBtn = styled(Button)`
  height: 38px;
  width: 100%;
  padding: 8px 13px;
  margin: 10px 1px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: inherit;
  margin: 12px;
  span {
    font-size: 12px;
    color: hsl(358, 62%, 52%);
    text-align: left;
  }
`;
const CheckBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  label {
    font-size: 13px;
    line-height: 15px;
  }
`;
const SinUpdiv = styled.div`
  font-size: 12px;
  line-height: 15.5px;
  margin: 32px 0px 0px;
  color: #6a737c;
`;
const LogIndiv = styled.div`
  font-size: 13px;
  line-height: 17px;
  text-align: center;
`;
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isvalid, setIsValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [pwdValid, setPwdValid] = useState("");
  const [msg, setMsg] = useState(false);
  const pathNavigate = useNavigate();

  //정규식 표현 '@' 포함여부와 대문자,소문자를 구분하지않게 표현식끝에 i 사용
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //최소 8자, 하나의 이상의 대소문자 및 하나의 숫자, 하나의 특수문자
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/i;
  //test : 대응되는 문자열이 있는지 검사하는 메소드 true 나 false를 반환
  const emailValueCheck = emailRegex.test(email);
  const passwordValueCheck = passwordRegex.test(pwd);

  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);

  //폼 제출시 서버통신
  const submitHandler = (e) => {
    e.preventDefault();
    if (!emailValueCheck || email.trim() === "") {
      setIsValid("The email is not a valid email address.");
      setEmailValid("valid");
    } else if (!passwordValueCheck || pwd.trim() === "") {
      setIsValid(" The password is not a valid .");
      setEmailValid("");
      setPwdValid("valid");
    } else if (emailValueCheck && passwordValueCheck) {
      axios(
        {
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/members/signup`,
          data: {
            email,
            password: pwd,
            nickname: displayName,
          },
        },
        { withCredentials: true }
      ).then((res) => {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/members/login`,
            {
              email: email,
              password: pwd,
            },
            { withCredentials: true }
          )
          .then((res) => {
            const data = JSON.stringify({
              id: res.data.id,
              token: res.headers.authorization,
            });
            const expires = moment().add("40", "m").toDate();
            setCookie("ikuzo", data, { expires });
            setMsg(true);
            setTimeout(() => {
              setMsg(false);
              pathNavigate("/");
              window.location.reload();
            }, 4000);
          })
          .catch(() => console.log("signup ☠️"));
      });
    }
  };
  return (
    <>
      {msg ? (
        <Img />
      ) : (
        <Flex>
          <Community>
            <Title>Join the Stack Overflow community</Title>
            <List>
              <CommunitySpan>
                <img
                  src="https://github.com/codestates-seb/seb40_pre_014/blob/main/client/src/assets/images/signup1.png?raw=true"
                  alt="signup_image1"
                />
              </CommunitySpan>
              Get unstuck — ask a question
            </List>

            <List>
              <CommunitySpan>
                <img
                  src="https://raw.githubusercontent.com/codestates-seb/seb40_pre_014/d7e59081970952ae87bec1e87646f314ced39747/client/src/assets/images/signup3.png"
                  alt="signup_image2"
                />
              </CommunitySpan>
              Unlock new privileges like voting and commenting
            </List>
            <List>
              <CommunitySpan>
                <img
                  src="https://raw.githubusercontent.com/codestates-seb/seb40_pre_014/d7e59081970952ae87bec1e87646f314ced39747/client/src/assets/images/signup2.png"
                  alt="signup_image3"
                />
              </CommunitySpan>
              Save your favorite tags, filters, and jobs
            </List>
            <List>
              <CommunitySpan>
                <img
                  src="https://raw.githubusercontent.com/codestates-seb/seb40_pre_014/d7e59081970952ae87bec1e87646f314ced39747/client/src/assets/images/signup4.png"
                  alt="signup_image4"
                />
              </CommunitySpan>
              Earn reputation and badges
            </List>
            <List className="content">
              Collaborate and share knowledge with a private group for FREE.
              <a
                href="https://stackoverflow.com/teams?utm_source=so-owned&amp;utm_medium=product&amp;utm_campaign=free-50&amp;utm_content=public-sign-up"
                target="_blank"
                rel="noreferrer"
              >
                Get Stack Overflow for Teams free for up to 50 users
              </a>
            </List>
          </Community>
          <Wrap>
            <Div className="logIn">
              <BtnStyle color={"#232629"} background={"white"}>
                <Span>
                  <Google />
                </Span>
                Log in with Google
              </BtnStyle>
              <BtnStyle color={"#ffffff"} background={"#2f3337"}>
                <Span>
                  <SvgGit />
                </Span>
                Log in with GitHub
              </BtnStyle>
              <BtnStyle color={"#ffffff"} background={"#385499"}>
                <Span>
                  <Facebook />
                </Span>
                Log in with Facebook
              </BtnStyle>
            </Div>
            <Div className="form">
              <Form>
                <Label>Display name</Label>
                <LoginInput
                  type="text"
                  className={displayName}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <Label>Email</Label>
                {emailValid && (
                  <Span>
                    <Screamer />
                  </Span>
                )}
                <LoginInput
                  type="text"
                  className={emailValid}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label>Password</Label>
                {pwdValid && (
                  <Span>
                    <Screamer />
                  </Span>
                )}
                <LoginInput
                  className={pwdValid}
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                <span>{isvalid}</span>
                <CheckBox>
                  <div>
                    <input type="checkbox"></input>
                  </div>
                  <div>
                    <label>
                      Opt-in to receive occasional product updates, user
                      research invitations, company announcements, and digests.
                    </label>
                  </div>
                  <div>
                    <Question />
                  </div>
                </CheckBox>
                <p onClick={submitHandler}>
                  <FormBtn type={"submmit"} buttonName={"Sign Up"}></FormBtn>
                </p>
                <Div>
                  <SinUpdiv>
                    By clicking “Sign up”, you agree to our
                    <Link>terms of service, privacy policy</Link>
                    and
                    <Link>cookie policy</Link>
                  </SinUpdiv>
                </Div>
              </Form>
            </Div>
            <LogIndiv>
              Don’t have an account? <Link to={"/loginpage"}>Log In</Link>
            </LogIndiv>
            <LogIndiv>
              Are you an employer? <Link>Sign up on Talent</Link>
            </LogIndiv>
          </Wrap>
        </Flex>
      )}
    </>
  );
};
export default SignupPage;
