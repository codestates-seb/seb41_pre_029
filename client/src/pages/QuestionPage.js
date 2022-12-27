import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import parser from "../components/Parser";
import Nav from "../components/Nav";
import AnswerDetail from "../components/AnswerDetail";
import Button from "../components/Button";
import displayedAt from "../util/displayedAt";
import YellowBox from "../components/YellowBox";
import GreyBox from "../components/GreyBox";
import { ReactComponent as RecommandT } from "../assets/recommand-top.svg";
import { ReactComponent as RecommandB } from "../assets/recommand-bottom.svg";

const QuestionPageWrapper = styled.div`
  display: flex;
  margin: 0 320.5px 0 320.5px;
`;
const PageWrapper = styled.div`
  padding: 0 24px 0 24px;
  > .bodyWrapper {
    display: flex;
    > .sidebar {
      > * {
        margin-bottom: 15px;
      }
    }
  }
`;

const TitleBar = styled.div`
  padding: 24px 0 24px 0;
  > .head {
    height: auto;

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
      overflow-wrap: normal;
      max-width: 930px;
    }
    > Button {
    }
  }
  > .infoWrapper {
    display: flex;
    border-bottom: 1px solid hsl(210deg 8% 90%);
    padding-bottom: 8px;
    margin-bottom: 16px;
    > div {
      white-space: nowrap;
      margin: 0 16px 8px 0;
      font-size: 13px;
      color: #232629;
      line-height: 17px;
    }
  }
`;
const BodyArticle = styled.article``;
const QuestionSection = styled.section`
  display: flex;
  > .recommand {
    display: flex;
    flex-direction: column;
    padding-right: 16px;
    align-items: center;
    > svg {
      :hover {
        fill: #8a8a8a;
        cursor: pointer;
      }
    }
    > span {
      margin: 2px;
      font-size: 21px;
      padding: 4px 0 4px 0;
    }
  }
  > .post-layout {
    > .post--body {
      min-width: 718px;
      max-width: 720px;
      word-break: keep-all;
      word-wrap: normal;
      line-height: 22.5px;
    }
    > .post--tags {
      margin: 24px 0 12px 0;
      > .summary_meta_tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        > .summary_meta_tag {
          background: #e1ecf4;

          margin-right: 4px;
          padding: 3px 6px;

          border-width: 1px;
          border-style: solid;
          border-radius: 3px;
          border-color: #e1ecf4;

          font-size: 12px;
          color: #39739d;
        }
      }
    }
    > .post--footer {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      max-width: 672px;

      > .post--footer-button {
        flex: 5 1 auto;
        > .button {
          margin: 4px;
          color: #838c95;
          font-size: 13px;
          font-weight: 400;
          :hover {
            cursor: pointer;
          }
        }
      }
      > .post--footer-profile {
        flex: 1 1 auto;
        padding-right: 46px;
        display: flex;
        align-items: center;
        justify-content: left;
        background-color: #d9eaf7;
        padding: 8px;
        > .imgwrapper {
          > img {
            width: 32px;
            height: 32px;
          }
        }
        > .profile-wrapper {
          font-size: 12px;
          color: #6a737c;
          font-weight: 500;
          padding-left: 8px;
          > .profile-time {
            margin-bottom: 4px;
          }
          > .profile-user {
            display: flex;
            > .userName {
              color: #0a95ff;
              padding-right: 8px;
            }
            > .user-follower {
              color: #6a737c;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
`;
const AnswerSection = styled.article`
  display: flex;
  flex-direction: column;
  > h2 {
    font-size: 19px;
    color: #232629;
    font-weight: bold;
    padding: 8px 0 8px 0;
    margin-bottom: 12px;
    margin-top: 32px;
  }
`;

const QuestionPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const questionId = Number(params.id);

  const location = useLocation();

  // const tihsQuestion = data.filter((el) => el.id === questionId);
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);

  // 질문 클릭시 해당 질문 id 가져와서 해당하는 질문만 필터해서 가져오도록 하기

  useEffect(() => {
    axios
    .get(`http://13.124.69.107/questions/${questionId}`)
    .then((res) => setQuestion(res.data.data))
  }, [])
  
    useEffect(() => {
      axios
      .get(`http://13.124.69.107/questions/${questionId}/comments`)
      .then((res) => setAnswers(res.data.data))
    }, [])

  const navigateEditpage = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (questionId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://13.124.69.107/questions/${questionId}`)
        .then((res) => navigate("/"));
    }
  };

  return (
    <>
      <QuestionPageWrapper>
        <Nav location={location} />
        <PageWrapper>
          <TitleBar>
            <div className="head">
              <h1>{question?.title}</h1>
              <Button
                buttonName="Ask Question"
                link="/addquestionpage"
                width="103px"
              />
            </div>
            <div className="infoWrapper">
              <div className="createdAt">
                asked {displayedAt(question?.baseTime.createdAt)}
              </div>
              <div className="viewed">viewed {question?.views}</div>
            </div>
          </TitleBar>
          <div className="bodyWrapper">
            <BodyArticle>
              <QuestionSection>
                <div className="recommand">
                  <RecommandT fill="#babfc4" />
                  <span>{question?.recommendCount}</span>
                  <RecommandB fill="#babfc4" />
                </div>
                <div className="post-layout">
                  <div className="post--body">{question?.content}</div>
                  <div className="post--tags">
                    <div className="summary_meta_tags">
                      {question?.tags.map((tag, idx) => (
                        <div key={idx} className="summary_meta_tag">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="post--footer">
                    <div className="post--footer-button">
                      <span className="button">Share</span>
                      <span
                        className="button"
                        onClick={() => navigateEditpage(question?.id)}
                      >
                        Edit
                      </span>
                      <span className="button">Follow</span>
                      <span
                        className="button"
                        onClick={() => handleDelete(questionId)}
                      >
                        Delete
                      </span>
                    </div>
                    <div className="post--footer-profile">
                      <div className="imgwrapper">
                        <img src="https://www.gravatar.com/avatar/580884d16248daa81e53e8a669f60361?s=64&d=identicon&r=PG&f=1"></img>
                      </div>
                      <div className="profile-wrapper">
                        <div className="profile-time">
                          asked {displayedAt(question?.baseTime.createdAt)}
                        </div>
                        <div className="profile-user">
                          <div className="userName">
                            {question?.member.nickname}
                          </div>
                          <div className="user-follower">
                            <span className="follower">1,120</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </QuestionSection>
              <AnswerSection>
                <h2 className="answerAmount">{answers?.length} Answers</h2>
                {answers?.map((el, idx) => (
                  <AnswerDetail key={idx} answers={el} />
                ))}
              </AnswerSection>
            </BodyArticle>
            <div className="sidebar">
              <YellowBox />
              <GreyBox title="Custom Filters"></GreyBox>
              <GreyBox title="Watched Tags Filters"></GreyBox>
              <GreyBox title="Ignored Tags"></GreyBox>
              <GreyBox title="Collectives"></GreyBox>
            </div>
          </div>
        </PageWrapper>
      </QuestionPageWrapper>
      <Footer />
    </>
  );
};

export default QuestionPage;
