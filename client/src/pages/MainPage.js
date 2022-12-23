import Nav from "../components/Nav";
import Footer from "../components/Footer";
import QuestionList from "../components/QuestionList";
import Button from "../components/Button";

import styled from "styled-components";

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
  }

  & .data_controller {
    > .question_count {
      height: 47px;
      color: #232629;
      font-size: 17px;
    }
  }
`;

const SideBar = styled.div``;

const MainPage = () => {
  return (
    <>
      <MainPageContainer>
        <Nav />
        <MainBar>
          <div className="head">
            <h1>All Questions</h1>
            <Button
              buttonName="Ask Question"
              link="/addquestionpage"
              width="103px"
            />
          </div>
          <div className="data_controller">
            <div className="question_count">123154 questions</div>
          </div>
          <QuestionList />
        </MainBar>
        <SideBar>
          <div>widget</div>
        </SideBar>
      </MainPageContainer>
      <Footer />
    </>
  );
};

export default MainPage;
