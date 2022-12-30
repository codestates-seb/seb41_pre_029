import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CEditor from "../components/CKEditor";

const AddQuestionPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [token, setIsToken] = useState();

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
    }
  }, []);

  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [submitTags, setSubmitTags] = useState("");
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    setInput({
      ...input,
      submitTags,
      content,
    });
  }, [submitTags, content]);

  useEffect(() => {
    setSubmitTags(`##${tags.map((el) => el.replaceAll(" ", "-")).join("##")}`);
  });

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

  const handleSubmit = () => {
    if (input.title.trim().length < 1) return;
    if (window.confirm("Are you sure you want to submit this Question?")) {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
        data: {
          title: input.title,
          content: input.content,
          tag: input.submitTags,
        },
      }).then((res) => navigate("/"));
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setInput({
      title: "",
      question: "",
      tried: "",
      tags: "",
    });
    setTags([]);
    setContent("");
    setModal(false);
  };

  return (
    <>
      {modal ? (
        <Modal
          title="Discard question"
          content="Are you sure you want discard this question? This cannot be undone."
          buttonName="Discard question"
          setModal={() => setModal(!modal)}
          handleClear={handleClear}
        />
      ) : null}
      <QuestionForm>
        <div className="title">
          <h1>Ask a public question</h1>
        </div>
        <BlueBox>
          <h2>Writing a good question</h2>
          <p>
            You’re ready to
            <span> ask </span>a<span> programming-related question </span>
            and this form will help guide you through the process.
          </p>
          <p>
            Looking to ask a non-programming question?
            <span> See the topics here</span>
            to find a relevant site.
          </p>
          <h3>Steps</h3>
          <ul>
            <li>• Summarize your problem in a one-line title.</li>
            <li>• Describe your problem in more detail.</li>
            <li>• Describe what you tried and what you expected to happen.</li>
            <li>
              • Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>• Review your question and post it to the site.</li>
          </ul>
        </BlueBox>
        <InputBox>
          <div className="title">Title</div>
          <div className="content">
            Be specific and imagine you’re asking a question to another person.
          </div>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          ></input>
        </InputBox>
        <InputBox>
          <div className="title">What are the details of your problem?</div>
          <div className="content">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </div>
          <div className="editor">
            <CEditor onChange={setContent} data={content} />
            {/* <Parser html={content} /> */}
          </div>
        </InputBox>

        <InputBox className="tag_box">
          <div className="title">Tags</div>
          <div className="content">
            Be specific and imagine you’re asking a question to another person.
          </div>
          <TagsInput>
            <ul id="tags">
              {tags.map((tag, index) => (
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
          {/* <Button className="next_button" buttonName={"Next"} /> */}
        </InputBox>
        <SubmitContainer>
          <p onClick={handleSubmit}>
            <Button buttonName={"Review your question"} width="" />
          </p>
          <div onClick={setModal}>Discard draft</div>
        </SubmitContainer>
      </QuestionForm>
      <Footer />
    </>
  );
};

export default AddQuestionPage;

const QuestionForm = styled.div`
  margin-bottom: 48px;
  margin-left: 320.5px;
  padding: 0 25px 24px;

  display: flex;
  flex-direction: column;
  /* align-items: center; */

  > .title {
    height: 130px;
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > h1 {
      height: 35px;
      text-align: left;

      margin: 24px 0 27px;

      font-size: 27px;
      font-weight: bold;
      line-height: 35px;
      color: #232629;
      background-color: f8f9f9;
    }
  }
`;

const BlueBox = styled.div`
  background-color: #edf9ff;
  color: #3b4045;
  padding: 24px;
  padding-bottom: 20px;
  height: 250px;
  width: 60vw;
  max-width: 800px;
  border-radius: 3px;
  border: 1px solid #abc7eb;

  > h2 {
    font-size: 21px;
    font-weight: 400;
    line-height: 27.3px;
    margin-bottom: 6px;
  }

  > p {
    font-size: 15px;
    line-height: 20px;
    > span {
      color: #0074cc;
    }
  }
  > h3 {
    margin: 20px 0 15px;
    font-size: 13px;
    font-weight: bold;
    color: #3b4045;
  }
  > ul {
    > li {
      font-size: 14px;
      line-height: 22px;
      margin-left: 15px;
    }
  }
`;

const InputBox = styled.div`
  width: 60vw;
  /* height: 78px; */
  margin-top: 20px;
  padding: 24px;
  max-width: 800px;
  border-radius: 3px;
  border: 1px solid #e3e6e8;

  > .title {
    font-size: 17px;
    font-weight: 600;
    padding: 0 2px;
    margin-bottom: 3px;
  }
  > .content {
    font-size: 12px;
    margin: 6px 0;
  }
  > input {
    padding: 7.8px 9.2px;
    width: 96%;
    border-radius: 3px;
    border: 1px solid #e3e6e8;

    &:focus {
      box-shadow: 1px 1px 1px 2px #cde9fe, -1px -1px 1px 2px #cde9fe;
      outline: none !important;
      border-color: #39739d;
    }
  }

  > .next_button {
    margin-top: 10px;
    &:hover {
      background-color: #0063bf;
    }
  }
`;

const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
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
  margin-top: 20px;
  > * {
    margin-right: 30px;
    font-size: 13px;
  }

  > div {
    color: #c22e32;
    cursor: pointer;
    padding: 10.4px;
    &:hover {
      color: #ab262a;
      background-color: #fdf2f2;
      border-radius: 3px;
    }
  }
  > p > * {
    :hover {
      background-color: #0063bf;
    }
  }
`;
