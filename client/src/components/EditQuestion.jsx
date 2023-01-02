import axios from "axios";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Button from "./Button";
import Footer from "./Footer";
import CEditor from "./CKEditor";

const EditQuestion = ({ originData }) => {
  const location = { pathname: "/" };
  const [content, setContent] = useState(originData.content);
  const [title, setTitle] = useState(originData.title);
  const [tags, setTags] = useState(
    originData.tag
      .map((el) => el.replaceAll("#", "").replaceAll("-", " "))
      .filter((el) => el !== "")
  );
  const [submitTags, setSubmitTags] = useState("");
  const [summary, setSummary] = useState(originData.summary || "");

  const [input, setInput] = useState({
    title: originData.title,
    tags: originData.tags,
    content: originData.content,
    summary,
  });

  const [viewTags, setViewTags] = useState(
    tags
      .map((el) => el.replaceAll("#", "").replaceAll("-", " "))
      .filter((el) => el !== "")
  );

   const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [token, setIsToken] = useState();
  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);

    }
  }, []);

  useEffect(() => {
    setInput({
      title,
      submitTags,
      content,
    });
  }, [submitTags, content, title]);

  /* 태그 제출 형식으로 변경 */
  useEffect(() => {
    setSubmitTags(`##${tags.map((el) => el.replaceAll(" ", "-")).join("##")}`);
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  /* 태그 추가, 삭제 */
  const addTags = (event) => {
    let inputValue = event.target.value;
    if (inputValue.length !== 0 && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      event.target.value = "";
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(
      tags.filter((__, idx) => {
        return idx !== indexToRemove;
      })
    );
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const params = useParams();
  const id = Number(params.id);

  const navigate = useNavigate();

  const cancleEdit = () => {
    navigate(`/questionpage/${id}`);
  };

  const handleClickEdit = () => {
         axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${id}`, // 통신할 웹문서
        method: "patch", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
        data: {
          title: input.title,
          content: input.content,
          tag: input.submitTags,
        }})
      .then(() => navigate(`/questionpage/${id}`))
  };


  useEffect(() => {
    setViewTags(
      tags
        .map((el) => el.replaceAll("#", "").replaceAll("-", " "))
        .filter((el) => el !== "")
    );
  }, [tags]);

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
            <div className="title">Title</div>
            <input
              className="input"
              value={title}
              name="title"
              onChange={(e) => handleChangeTitle(e)}
            ></input>
          </InputBox>
          <InputBox>
            <div className="title">Body</div>
            <CEditor onChange={setContent} data={content} />
          </InputBox>
          <InputBox className="tag_box">
            <div className="title">Tags</div>
            <TagsInput>
              <ul id="tags">
                {viewTags.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag_title">{tag}</span>
                    <span
                      className="tag_close_icon"
                      onClick={() => removeTags(index)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
              </ul>
              <input
                className="tag_input"
                type="text"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    addTags(e);
                  }
                }}
                placeholder="Press enter to add tags"
              />
            </TagsInput>
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
export default EditQuestion;

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
const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  padding: 0 8px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 10px 0 0 0;

    > .tag {
      width: auto;
      height: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      /* justify-content: center; */
      color: #39739d;
      padding: 1px 4px;
      font-size: 12px;
      list-style: none;
      border-radius: 3px;
      margin: 2px;
      background: #e1ecf4;
      line-height: 22px;
      > .tag_close_icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 13px;
        height: 13px;
        font-size: 20px;
        font-weight: 700;
        margin-top: -2px;
        margin-left: 4px;
        color: #39739d;
        border-radius: 3px;
        background: #e1ecf4;
        cursor: pointer;
        padding: 1px;
        &:hover {
          color: #e1ecf4;
          background: #39739d;
          padding-bottom: 3px;
          margin-top: 3px;
        }
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    margin-left: 7px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    border: 1px solid #39739d;
    box-shadow: 1px 1px 1px 2px #cde9fe, -1px -1px 1px 2px #cde9fe;
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
