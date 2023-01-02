import axios from "axios";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as RecommandT } from "../assets/recommand-top.svg";
import { ReactComponent as RecommandB } from "../assets/recommand-bottom.svg";
import moment from "moment";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import GreyBox from "../components/GreyBox";
import CEditor from "../components/CKEditor";
import displayedAt from "../util/displayedAt";
import useScrollTop from "../util/useScrollTop";
import YellowBox from "../components/YellowBox";
import AnswerDetail from "../components/AnswerDetail";

const QuestionPage = () => {
  useScrollTop();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const params = useParams();
  const location = useLocation();

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [comment, setComment] = useState("");
  const [isSelected, setIsSelected] = useState(null);

  const [token, setIsToken] = useState();
  const [memberID, setMemberId] = useState();
  const [recommendCount, setRecommendCount] = useState(0);
  const questionId = params.id;

  const [like, setLike] = useState();
  const [disLike, setDisLike] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
        headers: {
          withCredentials: true,
          Authorization: token,
        },
      })
      .then((res) => {
        setQuestion(res.data.data);
        setRecommendCount(res.data.data.articleLikeInfo.totalLike);
        setLike(
          res.data.data.articleLikeInfo.currentState === "like" ? true : false
        );
        setDisLike(
          res.data.data.articleLikeInfo.currentState === "unlike" ? true : false
        );
      });
  }, [like, disLike]);

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
      setMemberId(cookies.ikuzo.id);
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments`,
        {
          headers: {
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        res.data.data?.map((el) => (el.selection ? setIsSelected(true) : null));
        setAnswers(res.data.data);
      });
  }, []);

  const submmitComment = () => {
    if (comment.trim() === "") {
      return;
    } else {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
        data: {
          content: comment,
          memberId: memberID,
        },
      }).then((res) => window.location.reload());
      setComment("");
    }
  };

  const navigateEditpage = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
          headers: {
            Authorization: token,
            withCredentials: true,
          },
        })
        .then((res) => navigate("/"));
    }
  };

  const handleLike = () => {
    if ((!like && !disLike) || (like && !disLike)) {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/likes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      }).then(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
            headers: {
              withCredentials: true,
              Authorization: token,
            },
          })
          .then((res) => {
            setLike(
              res.data.data.articleLikeInfo.currentState === "like"
                ? true
                : false
            );
            setDisLike(
              res.data.data.articleLikeInfo.currentState === "unlike"
                ? true
                : false
            );
          });
      });
    } else if (!like && disLike) {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/unlikes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      })
        .then(() => {
          axios.get(
            `${process.env.REACT_APP_API_URL}/questions/${questionId}`,
            {
              headers: {
                withCredentials: true,
                Authorization: token,
              },
            }
          );
        })
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
              headers: {
                withCredentials: true,
                Authorization: token,
              },
            })

            .then((res) => {
              setLike(
                res.data.data.articleLikeInfo.currentState === "like"
                  ? true
                  : false
              );
              setDisLike(
                res.data.data.articleLikeInfo.currentState === "unlike"
                  ? true
                  : false
              );
            })
            .catch(() => {
              console.log("에러!");
            });
        });
    }
  };

  const handleDisLike = () => {
    if ((!like && !disLike) || (!like && disLike)) {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/unlikes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      }).then(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
            headers: {
              withCredentials: true,
              Authorization: token,
            },
          })
          .then((res) => {
            setLike(
              res.data.data.articleLikeInfo.currentState === "like"
                ? true
                : false
            );
            setDisLike(
              res.data.data.articleLikeInfo.currentState === "unlike"
                ? true
                : false
            );
          });
      });
    } else if (like && !disLike) {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/likes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      }).then((res) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
            headers: {
              withCredentials: true,
              Authorization: token,
            },
          })
          .then((res) => {
            console.log(res);
            setLike(
              res.data.data.articleLikeInfo.currentState === "like"
                ? true
                : false
            );
            setDisLike(
              res.data.data.articleLikeInfo.currentState === "unlike"
                ? true
                : false
            );
          });
      });
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
                asked {moment().format("YYYY-MM-DD HH:mm:ss")}???
              </div>
              <div className="viewed">viewed {question?.hits}</div>
            </div>
          </TitleBar>
          <div className="bodyWrapper">
            <BodyArticle>
              <QuestionSection>
                <div className="recommand">
                  <RecommandT
                    fill="#babfc4"
                    onClick={handleLike}
                    className={like ? "like active" : "like"}
                  />
                  <span>{recommendCount}</span>
                  <RecommandB
                    fill="#babfc4"
                    onClick={handleDisLike}
                    className={disLike ? "disLike active" : "like"}
                  />
                </div>
                <div className="post-layout">
                  <MDEditor.Markdown
                    className="post--body"
                    source={question?.content}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                  {/* <div className="post--body">{question?.content}</div> */}
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
                      {cookies?.ikuzo?.id === undefined ? null : cookies?.ikuzo
                          ?.id === question?.member?.id ? (
                        <span
                          className="button"
                          onClick={() => handleDelete(questionId)}
                        >
                          Delete
                        </span>
                      ) : null}
                    </div>
                    <div className="post--footer-profile">
                      <div className="imgwrapper">
                        <img
                          src={question?.member?.image}
                          alt="questionPage_image1"
                        ></img>
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
                  <AnswerDetail
                    key={idx}
                    answer={el}
                    isSelected={isSelected}
                    memberInfo={question?.member}
                  />
                ))}
                <Editor>
                  <h2>Your Answer</h2>
                  <CEditor onChange={setComment} data={comment} />
                  <p onClick={submmitComment}>
                    <AnswerBtn buttonName={"Post Your Answer"} />
                  </p>
                  <Tag>
                    Not the answer you're looking for? Browse other questions
                    tagged
                    {question?.tags.map((tag, idx) => (
                      <div key={idx} className="summary_meta_tag">
                        {tag}
                      </div>
                    ))}
                    or ask your own question.
                  </Tag>
                </Editor>
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

const QuestionPageWrapper = styled.div`
  display: flex;
  margin: 0 160px 0 160px;
`;

const PageWrapper = styled.div`
  height: auto;
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
const BodyArticle = styled.article`
  height: auto;
`;
const QuestionSection = styled.section`
  display: flex;
  > .recommand {
    width: 62px;
    display: flex;
    flex-direction: column;
    padding-right: 16px;
    align-items: center;
    > svg {
      :hover {
        fill: #8a8a8a;
        cursor: pointer;
      }
      &.active {
        fill: #f48225;
      }
    }
    > span {
      margin: 2px;
      font-size: 21px;
      padding: 4px 0 4px 0;
    }
  }
  > .post-layout {
    width: 750px;
    > .post--body {
      padding-right: 16px;
      width: 100%;
      word-break: keep-all;
      word-wrap: normal;
      line-height: 22.5px;
      background-color: white;
      color: black;
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
      width: 100%;

      > .post--footer-button {
        flex: 1 1 auto;
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
        width: 173px;
        max-width: 173px;
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
  padding-right: 16px;
  height: auto;
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
const Editor = styled.div`
  height: auto;
  width: 100%;
  > h2 {
    padding: 20px;
    font-size: 1.5rem;
  }
`;
const Tag = styled.div`
  font-size: 17px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 0px;
  .summary_meta_tag {
    background: #e1ecf4;
    margin-right: 4px;
    padding: 3px 6px;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    border-color: #e1ecf4;
    font-size: 15px;
    color: #39739d;
  }
`;
const AnswerBtn = styled(Button)`
  margin-top: 50px;
`;
