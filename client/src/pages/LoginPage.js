import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/subLogo.svg";
import { ReactComponent as SvgGit } from "../assets/gitHub.svg";
import { ReactComponent as Google } from "../assets/google.svg";
import { ReactComponent as Facebook } from "../assets/facebook.svg";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
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
  width: 289px;
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
  width: auto;
  padding: 8px 13px;
  margin: 10px 1px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: inherit;
  margin: 12px;
`;
const SinUpdiv = styled.div`
  font-size: 13px;
  margin-top: 12px;
  text-align: center;
`;
const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  //로그인?

  //정규식 표현 '@' 포함여부와 대문자,소문자를 구분하지않게 표현식끝에 i 사용
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //최소 8자, 하나의 이상의 대소문자 및 하나의 숫자, 하나의 특수문자
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/;
  //test : 대응되는 문자열이 있는지 검사하는 메소드 true 나 false를 반환
  const emailValueCheck = emailRegex.test(email);
  const passwordValueCheck = passwordRegex.test(pwd);
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email.trim === "" ||
      pwd === "" ||
      !emailValueCheck ||
      !passwordValueCheck
    ) {
      alert("구현중...");
    } else {
      axios({
        method: "post",
        url: "요청할 api 주소",
        data: {
          email,
          password: pwd,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Flex>
      <Wrap>
        <Div>
          <Span>
            <Logo />
          </Span>
        </Div>
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
            <Label>Email</Label>
            <LoginInput
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Password</Label>
            <LoginInput
              type="password"
              onChange={(e) => setPwd(e.target.value)}
            />
            <FormBtn onClick={submitHandler} buttonName={"Log in"}></FormBtn>
          </Form>
        </Div>
        <Div>
          <SinUpdiv>
            Don’t have an account? <Link>Sign up</Link>
          </SinUpdiv>

          <SinUpdiv>
            Are you an employer? <Link>Sign up on Talent</Link>
          </SinUpdiv>
        </Div>
      </Wrap>
    </Flex>
  );
};
export default Loginpage;
