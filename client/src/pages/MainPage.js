import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Nav from "../components/Nav";
import styled from "styled-components";
import Footer from "../components/Footer";
import Button from "../components/Button";
import GreyBox from "../components/GreyBox";
import YellowBox from "../components/YellowBox";
import useScrollTop from "../util/useScrollTop";
import QuestionList from "../components/QuestionList";

const MainPage = ({ data, find, eventKey }) => {
  useScrollTop();
  const location = useLocation();
  const [questionAmount, setQuestionAmount] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions`, {
        withCredentials: true,
      })
      .then((res) => {
        setQuestionAmount(res?.data.pageInfo.totalElements);
      });
  }, []);

  return (
    <>
      <MainPageContainer>
        <Nav location={location} />
        <MainBar>
          <div className="head">
            <h1>All Questions</h1>
            <Button
              className="go_add_question"
              buttonName="Ask Question"
              link="/addquestionpage"
              width="103px"
            />
          </div>
          <div className="data_controller">
            <div className="question_count">{`${questionAmount} questions`}</div>
          </div>
          <QuestionList data={data} find={find} eventKey={eventKey} />
        </MainBar>
        <SideBar>
          <YellowBox />
          <GreyBox title="Custom Filters"></GreyBox>
          <GreyBox title="Watched Tags Filters"></GreyBox>
          <GreyBox title="Ignored Tags"></GreyBox>
          <GreyBox title="Collectives"></GreyBox>
        </SideBar>
      </MainPageContainer>
      <Footer />
    </>
  );
};

export default MainPage;

const MainPageContainer = styled.div`
  display: flex;
  margin: 0 320.5px 0 320.5px;
`;

const MainBar = styled.div`
  padding: 24px;
  & .head {
    height: 38px;
    margin-bottom: 24px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > h1 {
      margin-right: 12px;
      margin-bottom: 12px;

      font-size: 27px;
      line-height: 35px;
      text-align: left;
      letter-spacing: normal;
    }
    > .go_add_question {
      :hover {
        background-color: #015366;
      }
    }
  }

  & .data_controller {
    > .question_count {
      height: 47px;
      color: #232629;
      font-size: 17px;
    }
  }
`;

const SideBar = styled.div`
  margin-top: 20.2px;

  > * {
    margin-bottom: 15px;
  }
`;
