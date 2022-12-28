import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import displayedAt from "../util/displayedAt";
import useScrollTop from "../util/useScrollTop";
import { ReactComponent as RecommandT } from "../assets/recommand-top.svg";
import { ReactComponent as RecommandB } from "../assets/recommand-bottom.svg";

const AnswerSection = styled.section`
  display: flex;
  padding: 16px 0 16px 0;
  border-bottom: 1px solid hsl(210deg 8% 90%);
  max-width: 930px;
  > .recommand {
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

const AnswerDetail = (answer) => {

  useScrollTop();
  // console.log(answer.memberIdentityDto.nickname);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(
          `http://13.124.69.107/questions/${questionId}/comments/${answer.id}`
        )
        .then((res) => window.location.reload());
    }
  };

  const params = useParams();
  const questionId = Number(params.id);
  answer = answer.answers
  const navigate = useNavigate();

  const navigateEditpage = (id) => {
    navigate(`/editanswer/${questionId}/${id}`);
  };

  return (
    <AnswerSection>
      <div className="recommand">
        <RecommandT fill="#babfc4" />
        <span>{answer.recommendCount}</span>
        <RecommandB fill="#babfc4" />
      </div>

      <div className="post-layout">
        <div className="post--body">{answer.content}</div>
        <div className="post--footer">
          <div className="post--footer-button">
            <span className="button">Share</span>
            <span className='button hoverE' onClick={() => navigateEditpage(answer.id)}>Edit</span>
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
                  {answer.memberIdentityDto.nickname}
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
