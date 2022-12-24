import styled from "styled-components";

import displayedAt from "../util/displayedAt";

const AnswerSection = styled.section `
  display: flex;
  > .recommand {
    padding-right: 16px;
  }
  > .post-layout {
    display: flex;
    justify-content: space-between;
    > .post--body {
      word-break: keep-all;
      word-wrap: normal;
      line-height: 22.5px;
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
`

const AnswerDetail = (answer) => {
  answer = answer.answers
  return (
    <AnswerSection>
              <div className='recommand'>추천</div>
              <div className='post-layout'>
                <div className='post--body'>{answer.content}</div>
                <div className='post--footer'>
                  <div className='post--footer-button'>
                      <span className='button'>Share</span>
                      <span className='button'>Edit</span>
                      <span className='button'>Follow</span>
                  </div>
                  <div className='post--footer-profile'>
                    <div className='imgwrapper'>
                      <img src='https://www.gravatar.com/avatar/580884d16248daa81e53e8a669f60361?s=64&d=identicon&r=PG&f=1'></img>
                    </div>
                    <div className='profile-wrapper'>
                      <div className='profile-time'>asked {displayedAt(answer.createdAt)}</div>
                        <div className='profile-user'>
                          <div className='userName'>{answer.member.nickName}</div>
                          <div className='user-follower'>
                            <span className='follower'>1,120</span>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnswerSection>
  )
}

export default AnswerDetail;