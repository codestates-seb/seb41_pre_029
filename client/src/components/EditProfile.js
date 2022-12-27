import styled from "styled-components";
// import Editor from "./Editor";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

import { useEffect, useState } from "react";
import { ReactComponent as SvgTwitter } from "../assets/twitter.svg";
import { ReactComponent as SvgGit } from "../assets/git.svg";
import { ReactComponent as Web } from "../assets/web.svg";
import { useNavigate, useParams } from "react-router-dom";

import StyledButton from "./Button";
import Input from "./Input";
import Editor from "./Editors";
import axios from "axios";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; ;
`;
const Title = styled.div`
  margin: 10px 0px;
  font-size: 1.6rem;
  &.editor {
    font-size: 1rem;
    font-family: inherit;
    font-weight: 600;
    padding: 5px;
  }
  &.mainTitle {
    font-size: 2.1rem;
    font-weight: normal;
    padding-bottom: 25px;
    border-bottom: 1px solid hsl(210, 8%, 75%);
  }

  &.profile {
    font-size: 1rem;
    font-weight: 600;
    vertical-align: baseline;
  }
`;

const Profile = styled.div`
  cursor: pointer;
  img {
    border-radius: 5px;
    width: 164px;
    height: 164px;
    margin: -1px 0px 10px 0px;
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormList = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
  &.btn {
    display: inline-flex;
  }
  &.link {
    display: flex;
    width: 770px;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;
const Btn = styled.div`
  display: flex;
  margin: 30px 0px;
`;
const InputDiv = styled.div`
  position: relative;
  margin: 8px;
  flex-grow: 1;
  height: 60px;

  border-radius: 10px;

  .icon {
    position: absolute;
    bottom: 8px;
    left: 6px;
  }
`;
//svg가 들어간 인풋창
const Svg = styled.input`
  outline: none;
  width: 250px;
  height: 32px;
  padding: 5px 5px 5px 32px;
  background-position: 7px 6px;
  box-sizing: border-box;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
`;
const Label = styled.label`
  padding: 5px;
  display: block;
  font-family: inherit;
  font-weight: 600;
`;

const EditProfile = () => {
  const navigator = useNavigate();
  const [editValue, setEditValue] = useState("");

  const [info, setInfo] = useState({
    nickname: "",
    location: "",
    title: "",
    website: "",
    twitter: "",
    gitHub: "",
    fullName: "",
  });

  /**
   * 회원 정보 수정 기능 로직
   * 1. 로그인 상태인지 확인(미구현)
   * 2. 기존 상태 불러오기(o)
   *  (1) 문제 1 : 이미지 수정 기능?-fe url 바꾸기
   *  (2) 문제 2 : 서버정보에 웹사이트, 트위터 링크, 깃허브 링크, 풀네임 없음 -be(전달)
   * 3. 정보 수정 후 버튼 클릭 시
   *  (1) input 데이터를 서버에 전송(500..)
   *  (2) 리렌더링
   *  (3) submit 후 클리어?
   */

  //서버에서 받은 정보
  const [value, setValue] = useState({});

  const params = useParams();
  const id = params.id;
  // console.log(id);

  useEffect(() => {
    axios
      .get(`http://13.124.69.107/members/${id}`)
      .then((res) => res.data.data)
      .then((res) => {
        setInfo({
          nickname: res.nickname,
          location: res.profile.location,
          title: res.profile.title,
        });
        setEditValue(res.profile.title);
        setValue(res);
      });
  }, []);

  console.log(value);
  const { nickname, location, title, website, twitter, gitHub, fullName } =
    info;

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const clear = () => {
    setInfo({
      nickname: "",
      location: "",
      title: "",
      aboutMe: "",
      website: "",
      twitter: "",
      gitHub: "",
      fullName: "",
      edit: "",
    });
    setEditValue("");
  };

  // console.log(editValue);
  const submitBtn = (e) => {
    console.log("submit!!!");
    e.preventDefault();
    const data = {
      nickname,
      location,
      title,
    };
    axios({
      url: `http://13.124.69.107/members/${id}`, // 통신할 웹문서
      method: "patch", // 통신 방식
      data: data,
    }).then((res) => res);
  };
  return (
    <Wrap>
      <Title className="mainTitle">Edit your profile</Title>
      <Title>Public information </Title>
      <Form>
        <FormList>
          <Profile>
            <div>
              <Title className="profile">Profile image</Title>
              <img alt="profile" src={value?.profile?.image} />
              <input type="file" />
            </div>
          </Profile>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={changeHandler}
            label={"Display name"}
          />
          <Input
            type="text"
            name="location"
            value={location}
            onChange={changeHandler}
            label={"location"}
          />
          <Input
            type="text"
            name="title"
            value={title}
            onChange={changeHandler}
            label={"Title"}
          />
          <Title className="editor">About me</Title>
          <Editor set={setEditValue} get={editValue} />
          {/* <div dangerouslySetInnerHTML={{ __html: editValue }}></div> */}
        </FormList>
        <Title>Links</Title>
        <FormList className="link">
          <InputDiv className="links">
            <Label>Website</Label>
            <Web />
            <Svg
              type="text"
              name="website"
              value={website}
              onChange={changeHandler}
            />
          </InputDiv>
          <InputDiv className="links">
            <Label>Twitter link or username</Label>
            <SvgTwitter />
            <Svg
              type="text"
              name="twitter"
              value={twitter}
              onChange={changeHandler}
            />
          </InputDiv>
          <InputDiv className="links">
            <Label>GitHub link or username</Label>
            <SvgGit />
            <Svg
              type="text"
              name="gitHub"
              value={gitHub}
              onChange={changeHandler}
            />
          </InputDiv>
        </FormList>
        <Title>Private information</Title>
        <FormList>
          <Input
            label={"Full name"}
            type="text"
            name="fullName"
            onChange={changeHandler}
            value={fullName}
          />
        </FormList>
        <Btn>
          <div onClick={submitBtn}>
            <StyledButton
              type="submit"
              buttonName={"Save profile"}
            ></StyledButton>
          </div>
          <StyledButton
            onClick={() => navigator("/")}
            buttonName={"Cancle"}
            background={"#E1ECF4"}
            color={"#39739D"}
          ></StyledButton>
        </Btn>
      </Form>
    </Wrap>
  );
};

export default EditProfile;
