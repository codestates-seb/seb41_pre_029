import styled from "styled-components";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Editor from "../components/Editors";

const AddQuestionPage = () => {
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
            <Link> ask </Link>a<Link> programming-related question </Link>
            and this form will help guide you through the process.
          </p>
          <p>
            Looking to ask a non-programming question? See the topics here to
            find a relevant site.
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
        <Editor />
        <Editor />
      </QuestionForm>
      <Footer />
    </>
  );
};

export default AddQuestionPage;

const QuestionForm = styled.div`
  margin-bottom: 48px;
  padding: 0 25px 24px;

  > .title {
    > h1 {
      height: 35px;
      /* width: 260px; */

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
  background-color: #ebf4fb;
  color: #3b4045;
  padding: 24px;
  height: 250px;
  width: 60vw;

  > h2 {
    font-size: 21px;
    font-weight: 500;
    line-height: 27.3px;
    margin-bottom: 8px;
  }

  > p {
    font-size: 15px;
    line-height: 20px;
  }
`;
