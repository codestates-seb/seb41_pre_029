import axios from 'axios'
import styled from 'styled-components'
import { useState } from 'react'

import data from '../dummydata'
import Button from './Button'
import displayedAt from '../util/displayedAt'

const PageWrapper = styled.div `

`

const TitleBar = styled.div `
  padding: 24px;
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
    border-bottom: 1px solid black;
}
`
const QuestionDetail = ({ props }) => {

  return (
    <PageWrapper>
     <TitleBar>
       <div className="head">
         <h1>All Questions</h1>
         <Button
           buttonName="Ask Question"
           link="/addquestionpage"
           width="103px"
           />
       </div>
       <div className='infoWrapper'>
         <div className='createdAt'>asked {displayedAt(props.createdAt)}</div>
         <div className='viewed'>viewed {`${props.views}`}</div>
       </div>
    </TitleBar>
   </PageWrapper>
  )
}

export default QuestionDetail;