import axios from "axios";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ReactComponent as RecommandT } from "../assets/recommand-top.svg";
import { ReactComponent as RecommandB } from "../assets/recommand-bottom.svg";
import { ReactComponent as Select } from "../assets/select.svg";

import displayedAt from "../util/displayedAt";
import useScrollTop from "../util/useScrollTop";

const AnswerDetail = ({ answer, isSelected }) => {
  useScrollTop();

  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [token, setIsToken] = useState();

  useEffect(() => {
    if (cookies?.ikuzo) {
      setIsToken(cookies?.ikuzo.token);
    }
  }, []);

  const handleDelete = () => {
    console.log("삭제 요청 :" + token, answer.id);
    if (window.confirm("답글을 삭제하시겠습니까?")) {
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answer.id}`,
        method: "delete",
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  const params = useParams();
  const questionId = Number(params.id);

  const answerId = answer.id;
  const navigate = useNavigate();
  const navigateEditpage = (id) => {
    navigate(`/editanswer/${questionId}/${id}`);
  };

  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [selection, setSelection] = useState(answer.selection);

  const handleLike = () => {
    if (!like && disLike) {
      setDisLike(disLike);
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}/unlikes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      }).then((res) => setLike(!like));
    } else {
      setLike(!like);
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}/likes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      }).then((res) => setLike(!like));
    }
  };

  const handleDisLike = () => {
    if (like && !disLike) {
      setLike(!like);
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}/likes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      });
    } else {
      setDisLike(!disLike);
      axios({
        url: `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}/unlikes`, // 통신할 웹문서
        method: "post", // 통신 방식
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      });
    }
  };
  const handleSelection = () => {
    console.log(token)
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}/selections`,
        {
          selection: true,
        },
        {
          headers: {
            Authorization: token,
            withCredentials: true,
          }
        }
      )
      .then((res) => {
        setSelection(!selection);
        window.location.reload();
      });
  };

  return (
    <AnswerSection>
      <div className="recommand">
        <RecommandT
          fill="#babfc4"
          onClick={handleLike}
          className={like ? "like active" : "like"}
        />
        <span>{answer.recommendCount}</span>
        <RecommandB
          fill="#babfc4"
          onClick={handleDisLike}
          className={disLike ? "dislike active" : "dislike"}
        />
        <div className="select-wrapper">
          {isSelected && selection && <Select className={"selected"} />}
          {!isSelected && (
            <Select onClick={handleSelection} className="not_selected" />
          )}
        </div>
      </div>

      <div className="post-layout">
        <MDEditor.Markdown
          className="post--body"
          source={answer.content}
          style={{ whiteSpace: "pre-wrap", backgroundColor: "white" }}
        />
        {/* <div className="post--body">{answer.content}</div> */}
        <div className="post--footer">
          <div className="post--footer-button">
            <span className="button">Share</span>
            <span
              className="button hoverE"
              onClick={() => navigateEditpage(answer.id)}
            >
              Edit
            </span>
            <span className="button">Follow</span>
            <span className="button" onClick={() => handleDelete(questionId)}>
              Delete
            </span>
          </div>
          <div className="post--footer-profile">
            <div className="imgwrapper">
              <img src="https://www.gravatar.com/avatar/580884d16248daa81e53e8a669f60361?s=64&d=identicon&r=PG&f=1"></img>
            </div>
            <div className="profile-wrapper">
              <div className="profile-time">
                asked {displayedAt(answer.createdAt)}
              </div>
              <div className="profile-user">
                <div className="userName">
                  {answer?.memberIdentityDto?.nickname}
                </div>
                <div className="user-follower">
                  <span className="follower">1,120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnswerSection>
  );
};

export default AnswerDetail;

const AnswerSection = styled.section`
  display: flex;
  padding: 16px 0 16px 0;
  border-bottom: 1px solid hsl(210deg 8% 90%);
  max-width: 930px;
  > .recommand {
    width: 62px;
    padding-right: 16px;
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
    > .select-wrapper {
      > .selected {
        fill: #2f800a;
        width: 62px;
        height: 62px;
      }
      > .not_selected {
        :hover {
          fill: #2f800a;
          cursor: pointer;
        }
      }
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
      color: #000;
    }
    > .post--tags {
      margin: 50px 0 12px 0;
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
      width: 100%;
      margin-top: 32px;
      display: flex;
      justify-content: space-between;

      > .post--footer-button {
        flex: 1 1 auto;
        > .button {
          margin: 4px;
          color: #838c95;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;

          &:hover {
            color: #000;
          }
        }
        > .hoverE {
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
