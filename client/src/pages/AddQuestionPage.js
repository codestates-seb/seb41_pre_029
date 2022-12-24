import styled from "styled-components";
import { useState } from "react";

import Footer from "../components/Footer";
import Editor from "../components/Editors";

const AddQuestionPage = () => {
  const [title, setTitle] = useState("");
  return (
    <>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          ></input>
        </InputBox>
        <InputBox>
          <div className="title">What are the details of your problem?</div>
          <div className="content">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </div>
          <Editor />
        </InputBox>
        <InputBox>
          <div className="title">
            What did you try and what were you expecting?
          </div>
          <div className="content">
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 20 characters.
          </div>
          <Editor />
        </InputBox>
        <InputBox>
          <div className="title">Title</div>
          <div className="content">
            Be specific and imagine you’re asking a question to another person.
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          ></input>
        </InputBox>
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
  }
`;
