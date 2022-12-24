import styled from "styled-components";

import displayedAt from "../util/displayedAt";

const QuestionSummary = ({ props }) => {
  
  return (
    <QuestionSummaryContainer id="question_sumamry_{props.id}">
      <SummaryStats>
        <div className="summary_item">
          <span className="summary_item_number">{props.hits || 0}</span>
          <span className="summary_item_unit">{props.hits === 1? "vote" : "votes"
          }</span>
        </div>
        <div className="summary_item">
          {props.selection ? 
          <span className="selected">
            ✔ {props.recommendCount}
          <span summary_item_unit>
              {props.recommendCount === 1? " answer" : " answers"}
            </span>
          </span>
          : 
          <span className={props.recommendCount>=1? "recommneded" :"summary_item_number"}>
            {props.recommendCount}
            <span  className="summary_item_unit">
              {props.recommendCount === 1? " answer" : " answers"}
            </span>
          </span>
           }
        </div>
        <div className="summary_item">
          <span className="summary_item_number">0</span>
          <span className="summary_item_unit">views</span>
        </div>
      </SummaryStats>
      <div className="summary_title_meta_wrapper">
        <SummaryTitleContents>
          <div className="summary_title">{props.title}</div>
          <div className="summary_contents">{props.content}</div>
        </SummaryTitleContents>
        <SummaryMeta>
          <div className="summary_meta_tags">
            {props.tags.map((tag)=>(
                <div className="summary_meta_tag">{tag}</div>
            ))}
          </div>
          <div className="summary_meta_user">
            <span className="user_avatar">{props.userAvatar}</span>
            <div className="user_info">
              {/* <div className="user_link">{props.member.nickname}</div> */}
              <div className="user_awards">29</div>
              <div className="user_time">
                {/* asked {displayedAt(props.baseTime.createdAt)} */}
              </div>
            </div>
          </div>
        </SummaryMeta>
      </div>
    </QuestionSummaryContainer>
  );
};

export default QuestionSummary;

const QuestionSummaryContainer = styled.div`
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
    margin-bottom: 5px;
    font-size: 13px;
    /* background-color: pink; */

    > span {
      height: 17px;
      margin-right: 5px;
    }

  & .selected {
    width:89px;
    height:23px;
    padding:3px 8px;
    color:white;
    font-weight: 600;
    background-color:#2f6f44;
    border-radius: 3px;
    line-height: 17px;
    margin-bottom: 4px;
  }

  & .recommneded {
    border : 1px solid #4c524e;
    border-radius: 3px;
    color : #2f6f44;
    padding:2px 6px;
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
    font-weight: 600;
    color: #0074cc;
    margin-bottom:5px;
    padding-bottom:5px;

  }

  & .summary_contents {
    overflow: hidden;
    text-align: left;

    margin-top: -2px;
    margin-bottom: 8px;
    padding-bottom: 2px;

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

