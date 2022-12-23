import axios from 'axios'
import styled from 'styled-components'
import { useState } from 'react'

import Nav from '../components/Nav'
import data from '../dummydata'
import AnswerDetail from '../components/AnswerDetail'
import QuestionDetail from '../components/QuestionDetail'

const QuestionPageWrapper = styled.div `
  display: flex;
  margin: 0 320.5px 0 320.5px;
  width: 100%;
`

const QuestionPage = ({ questionId = 415 }) => {
  const questionData = data;
  const [ question, setQuestion ] = useState(questionData.filter(el => el.id === questionId))

  return (
    <QuestionPageWrapper>
      <Nav />
      <QuestionDetail props={question}/>
    </QuestionPageWrapper>
  )
}

export default QuestionPage;