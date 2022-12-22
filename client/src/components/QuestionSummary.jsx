import styled from "styled-components";

import displayedAt from "../util/displayedAt";

const QuestionSummaryContainer = styled.div`
  width: 100%;
  padding: 16px;

  display: flex;
  flex-direction: row;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const SummaryStats = styled.div`
  width: 108px;
  margin-right: 16px;
  margin-bottom: 4px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & .summary_item {
    height: 19px;
    margin-bottom: 4px;

    font-size: 13px;

    > span {
      height: 17px;
      margin-right: 5px;
    }
  }
`;

const SummaryTitleContents = styled.div`
  width: 595px;

  padding-right: 24px;
  margin-top: -1.95px;
  margin-bottom: 5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & .summary_title {
    font-size: 17px;
    font-weight: 400;
    color: #0074cc;
  }

  & .summary_contents {
    overflow: hidden;
    text-align: left;

    margin-top: -2px;
    margin-bottom: 8px;

    font-size: 13px;
    color: #3b4045;
  }
`;

const SummaryMeta = styled.div`
  width: 595px;
  display: flex;
  flex-direction: column;
  height: 40px;

  font-size: 13px;

  & .summary_meta_tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & .summary_meta_tag {
      background: #e1ecf4;

      margin-right: 2px;
      margin-bottom: 2px;
      padding: 3px 5px;

      border-width: 1px;
      border-style: solid;
      border-radius: 3px;
      border-color: #e1ecf4;

      font-size: 12px;
      color: #39739d;
    }
  }

  & .summary_meta_user {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    & .user_avatar {
      width: 16px;
      height: 16px;
    }

    & .user_info {
      display: flex;
      flex-direction: row;
      > * {
        padding-left: 3px;
        padding-right: 3px;
      }

      & .user_link {
        color: #0074cc;
        cursor: pointer;
      }

      & .user_awards {
        font-weight: 700;
      }

      & .user_time {
        color: #6a737c;
      }
    }
  }
`;

const QuestionSummary = ({ props }) => {
  return (
    <QuestionSummaryContainer id="question_sumamry_{props.id}">
      <SummaryStats>
        <div className="summary_item">
          <span className="summary_item_number">0</span>
          <span className="summary_item_unit">votes</span>
        </div>
        <div className="summary_item">
          <span className="summary_item_number">0</span>
          <span className="summary_item_unit">answers</span>
        </div>
        <div className="summary_item">
          <span className="summary_item_number">0</span>
          <span className="summary_item_unit">views</span>
        </div>
      </SummaryStats>
      <div className="summary_title_meta_wrapper">
        <SummaryTitleContents>
          <div className="summary_title">{props.title}</div>
          <div className="summary_contents">{props.contents}</div>
        </SummaryTitleContents>
        <SummaryMeta>
          <div className="summary_meta_tags">
            <div className="summary_meta_tag">tag</div>
            <div className="summary_meta_tag">tag</div>
          </div>
          <div className="summary_meta_user">
            <span className="user_avatar">{props.userAvatar}</span>
            <div className="user_info">
              <div className="user_link">{props.userId}</div>
              <div className="user_awards">29</div>
              <div className="user_time">
                asked {displayedAt(props.createdAt)}
              </div>
            </div>
          </div>
        </SummaryMeta>
      </div>
    </QuestionSummaryContainer>
  );
};

export default QuestionSummary;
