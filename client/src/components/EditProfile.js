import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { ReactComponent as SvgTwitter } from "../assets/twitter.svg";
import { ReactComponent as SvgGit } from "../assets/git.svg";
import { ReactComponent as Web } from "../assets/web.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import StyledButton from "./Button";
import Input from "./Input";

const EditProfile = () => {
  const navigator = useNavigate();
  const params = useParams();
  const [info, setInfo] = useState({});

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
    if (memberId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
          headers: {
            Authorization: isToken,
            withCredentials: true,
          },
        })
        .then((res) => res.data.data)
        .then((res) => {
          setInfo(res);
        });
    }
  }, [memberId]);

  const { link, nickname, profile } = info;

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

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/members/${memberId}`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: isToken,
          },
        }
      )
      .then((res) => {
        window.scrollTo(0, 0);
        window.location.reload();
      });
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
              <img alt="profile" src={info?.profile?.image} />
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
          <textarea
            className="aboutMe"
            name="aboutMe"
            value={profile?.aboutMe || ""}
            onChange={changeHandler}
          />
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
