import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import axios from "axios";
import Button from "./Button";
import Footer from "./Footer";
import CEditor from "./CKEditor";

const EditAnswer = ({ originData, questionId, answerId }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);

  const [isToken, setIsToken] = useState();

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
    }
  }, []);

  const location = { pathname: "/" };
  const [content, setContent] = useState(originData.content);

  const [input, setInput] = useState({
    content: originData.content,
  });

  useEffect(() => {
    setInput({
      content,
    });
  }, [content]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const cancleEdit = () => {
    navigate(`/questionpage/${questionId}`);
  };

  const handleClickEdit = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}`, // 통신할 웹문서
      method: "patch", // 통신 방식
      headers: {
        Authorization: isToken,
        withCredentials: true,
      },
      data: {
        content: input.content,
      },
    }).then(() => navigate(`/questionpage/${questionId}`));
  };
  return (
    <>
      <EditContainer>
        <Nav location={location} />
        <Main>
          <YellowBoxContainer className="main_box" padding="10px">
            Your edit will be placed in a queue until it is peer reviewed.
            <br />
            <br />
            We welcome edits that make the post easier to understand and more
            valuable for readers. Because community members review edits, please
            try to make the post substantially better than how you found it, for
            example, by fixing grammar or adding additional resources and
            hyperlinks.
          </YellowBoxContainer>
          <InputBox>
            <div className="title">Answer</div>
            <CEditor onChange={setContent} data={content} />
          </InputBox>
          <InputBox>
            <div className="title">Edit Summary</div>
            <input
              className="input"
              placeholder="brieflt explain your changes"
              name="summary"
              onChange={handleChange}
            ></input>
          </InputBox>
          <SubmitContainer>
            <p onClick={handleClickEdit}>
              <Button buttonName={"Save edits"} />
            </p>
            <div onClick={cancleEdit}>Cancle</div>
          </SubmitContainer>
        </Main>
        <RightBar>
          <YellowBoxContainer width="300px">
            <Title>How to Edit</Title>
            <Content>
              • Correct minor typos or mistakes <br />
              • Clarify meaning without changing it
              <br />
              • Add related resources or links
              <br />
              • Always respect the author’s intent
              <br />• Don’t use edits to reply to the author
            </Content>
          </YellowBoxContainer>
        </RightBar>
      </EditContainer>
      <Footer />
    </>
  );
};
export default EditAnswer;

const EditContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  margin-left: 320.5px;
  margin-right: 320.5px;
`;
const YellowBoxContainer = styled.div`
  width: ${(props) => props.width || "Auto"};
  background-color: #fdf7e2;
  padding: ${(props) => props.padding || 0};
  margin: 20px 0;
  margin-right: 10px;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-left: 1px solid #fdebaa;
  border-right: 1px solid #fdebaa;
  border-radius: 3px;
  font-size: 12px;
  line-height: 16px;
  color: #525960;
  &.main_box {
    border: 1px solid #fdebaa;
  }
`;

const Title = styled.div`
  width: 270px;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  color: #525960;
  background-color: #fbf3d5;
  border-top: 1px solid #fdebaa;
  border-bottom: 1px solid #fdebaa;
`;
const Content = styled.ol`
  margin-top: 12px;
  margin-bottom: 15px;
  padding: 0 16px;
  padding-bottom: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  width: 800px;
  margin: 20px;

  > div {
    > .title {
      font-size: 17px;
      font-weight: 600;
      padding: 0 2px;
      margin: 15px 0;
    }

    > .input {
      padding: 7.8px 9.2px;
      width: 97.1%;
      border-radius: 3px;
      border: 1px solid #e3e6e8;

      &:focus {
        box-shadow: 1px 1px 1px 2px #cde9fe, -1px -1px 1px 2px #cde9fe;
        outline: none !important;
        border-color: #8cb3d0;
      }
    }
  }
`;
const InputBox = styled.div`
  & > :focus {
    box-shadow: 1px 1px 1px 2px #cde9fe, -1px -1px 1px 2px #cde9fe;
    outline: none !important;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  > * {
    margin-right: 30px;
    font-size: 13px;
  }
  > :first-child > {
    :hover {
      background-color: #0063bf;
    }
  }
  > div {
    color: #c22e32;
    cursor: pointer;
    padding: 10.4px;
    &:hover {
      color: #ab262a;
      background-color: #fdf2f2;
    }
  }
`;
const RightBar = styled.div``;
