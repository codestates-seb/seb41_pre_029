import styled from "styled-components";
// import Editor from "./Editor";
import Input from "./Input";
import StyledButton from "./Button";
import { useState } from "react";
import { ReactComponent as SvgTwitter } from "../assets/twitter.svg";
import { ReactComponent as SvgGit } from "../assets/git.svg";
import { ReactComponent as Web } from "../assets/web.svg";
import { useNavigate } from "react-router-dom";
import Editor from "./Editors";
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const [info, setInfo] = useState({
    displayName: "",
    location: "",
    title: "",
    website: "",
    twitter: "",
    gitHub: "",
    fullName: "",
  });

  const { displayName, location, title, website, twitter, gitHub, fullName } =
    info;

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const [editValue, setEditValue] = useState("");

  const navigator = useNavigate();
  const clear = () => {
    setInfo({
      displayName: "",
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
  console.log(editValue);
  const submitBtn = (e) => {
    e.preventDefault();
    const data = {
      displayName,
      location,
      title,
      website,
      twitter,
      gitHub,
      fullName,
    };
    console.log(data);
    clear();
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
              <img
                alt="profile"
                src="https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_1280.jpg"
              />
            </div>
          </Profile>
          <Input
            type="text"
            name="displayName"
            value={displayName}
            onChange={changeHandler}
            label={"Display name"}
          />
          <Input
            label={"location"}
            type="text"
            name="location"
            onChange={changeHandler}
            value={location}
          />
          <Input
            label={"Title"}
            type="text"
            name="title"
            value={title}
            onChange={changeHandler}
          />
          <Title className="editor">About me</Title>
          <Editor set={setEditValue} get={editValue} />
          {editValue}
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
          <StyledButton
            type="submit"
            onClick={submitBtn}
            buttonName={"Save profile"}
          ></StyledButton>
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
