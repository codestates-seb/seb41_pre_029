import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as SvgTwitter } from "../assets/twitter.svg";
import { ReactComponent as SvgGit } from "../assets/git.svg";
import { ReactComponent as Web } from "../assets/web.svg";
import { useNavigate, useParams } from "react-router-dom";

import StyledButton from "./Button";
import Input from "./Input";
import Editor from "./Editors";
import axios from "axios";

const EditProfile = () => {
  const navigator = useNavigate();
  const params = useParams();
  const id = params.id;

  const [editValue, setEditValue] = useState("");
  const [info, setInfo] = useState({
    // createAt: "",
    // email: "",
    // lastModifiedAt: "",
    // nickname: "",
    // profile: {
    //   image: "",
    //   title: "",
    //   location: "",
    //   aboutMe: "",
    // },
    // link: {
    //   website: "",
    //   twitter: "",
    //   github: "",
    // },
  });

  useEffect(() => {
    axios
      .get(`http://13.124.69.107/members/${id}`)
      .then((res) => res.data.data)
      .then((res) => {
        setInfo(res);
        setEditValue(res.profile.aboutMe);
      });
  }, []);
  // console.log(info);
  const { createAt, email, lastModifiedAt, link, nickname, profile } = info;

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
      link: { ...info.link, [e.target.name]: e.target.value },
      profile: { ...info.profile, [e.target.name]: e.target.value },
    });
  };

  const submitBtn = (e) => {
    e.preventDefault();
    const data = {
      nickname,
      location: profile.location,
      title: profile.title,
      aboutMe: profile.aboutMe,
      website: link.website,
      github: link.github,
      twitter: link.twitter,
    };
    console.log(data);
    axios({
      url: `http://13.124.69.107/members/${id}`, // 통신할 웹문서
      method: "patch", // 통신 방식
      data,
    }).then((res) => window.location.reload());
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
              <img alt="profile" src={info.profile?.image} />
            </div>
          </Profile>
          <Input
            type="text"
            name="nickname"
            value={nickname || ""}
            onChange={changeHandler}
            label={"Display name"}
          />
          <Input
            type="text"
            name="location"
            value={profile?.location || ""}
            onChange={changeHandler}
            label={"location"}
          />
          <Input
            type="text"
            name="title"
            value={profile?.title || ""}
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
              value={link?.website || ""}
              onChange={changeHandler}
            />
          </InputDiv>
          <InputDiv className="links">
            <Label>Twitter link or username</Label>
            <SvgTwitter />
            <Svg
              type="text"
              name="twitter"
              value={link?.twitter || ""}
              onChange={changeHandler}
            />
          </InputDiv>
          <InputDiv className="links">
            <Label>GitHub link or username</Label>
            <SvgGit />
            <Svg
              type="text"
              name="github"
              value={link?.github || ""}
              onChange={changeHandler}
            />
          </InputDiv>
        </FormList>
        <Title>Private information</Title>
        {/* <FormList>
          <Input
            label={"Full name"}
            type="text"
            name="fullName"
            onChange={changeHandler}
            value={fullName}
          />
        </FormList> */}
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
