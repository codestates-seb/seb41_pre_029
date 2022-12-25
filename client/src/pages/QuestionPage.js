import axios from 'axios'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Nav from '../components/Nav'
import data from '../dummydata'
import AnswerDetail from '../components/AnswerDetail'
import QuestionDetail from '../components/QuestionDetail'
import Button from '../components/Button'
import displayedAt from '../util/displayedAt'
import useStore from '../zustand/store'
import YellowBox from '../components/YellowBox'
import GreyBox from '../components/GreyBox'

const QuestionPageWrapper = styled.div `
  display: flex;
  margin: 0 320.5px 0 320.5px;
`
const PageWrapper = styled.div `
  padding: 0 24px 0 24px;
 > .bodyWrapper {
  display: flex;
 }
`

const TitleBar = styled.div `
  padding: 24px 0 24px 0;
  > .head {
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
`
const BodyArticle = styled.article `

`
const QuestionSection = styled.section `
  display: flex;
  > .recommand {
    padding-right: 16px;
  }
  > .post-layout {
    > .post--body {
      word-break: keep-all;
      word-wrap: normal;
    }
  }
`
const AnswerSection = styled.section `

`
const QuestionPage = ({ questionId = 1 }) => {
  const location = useLocation();

  const tihsQuestion = data.filter(el => el.id === questionId);
  const [ question, setQuestion ] = useState(tihsQuestion[0])
 
  // 질문 클릭시 해당 질문 id 가져와서 해당하는 질문만 필터해서 가져오도록 하기
    const { getInitialQuestions } = useStore(state => state);

  // useEffect(
  //   getInitialQuestions('/questions')
  //   .then(res => console.log(res))
  // , [])

  return (
    <QuestionPageWrapper>
      <Nav location={location}/>
      <PageWrapper>
        <TitleBar>
          <div className="head">
            <h1>{question.title}</h1>
            <Button
              buttonName="Ask Question"
              link="/addquestionpage"
              width="103px"
             />
          </div>
          <div className='infoWrapper'>
            <div className='createdAt'>asked {displayedAt(question.createdAt)}</div>
            <div className='viewed'>viewed {question.views}</div>
          </div>
        </TitleBar>
        <div className='bodyWrapper'>
          <BodyArticle>
            <QuestionSection>
              <div className='recommand'>추천</div>
              <div className='post-layout'>
                <div className='post--body'>{question.content}</div>
                <div className='post--tags'></div>
              </div>
            </QuestionSection>
            <AnswerSection></AnswerSection>
          </BodyArticle>
          <div className='sidebar'>
            <GreyBox />
            <YellowBox />
          </div>
        </div>
      </PageWrapper>
      
    </QuestionPageWrapper>
  )
}

export default QuestionPage;