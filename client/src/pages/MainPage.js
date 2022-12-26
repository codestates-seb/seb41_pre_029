import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import QuestionList from "../components/QuestionList";
import Button from "../components/Button";
import GreyBox from "../components/GreyBox";
import YellowBox from "../components/YellowBox";

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
        background-color: #f5704a;
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

const MainPage = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
            <div className="question_count">123154 questions</div>
          </div>
          <QuestionList data={data} />
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
