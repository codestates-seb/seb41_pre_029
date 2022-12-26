// import axios from 'axios'
// import styled from 'styled-components'
// import { useEffect, useState } from 'react'

// import data from '../dummydata'
// import Button from './Button'
// import displayedAt from '../util/displayedAt'
// import useStore from '../zustand/store'

// const PageWrapper = styled.div `

// `

// const TitleBar = styled.div `
//   padding: 24px;
//   > .head {
//     height: 38px;
//     margin-bottom: 24px;

//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     > h1 {
//       margin-right: 12px;
//       margin-bottom: 12px;

//       font-size: 27px;
//       line-height: 35px;
//       text-align: left;
//       letter-spacing: normal;
//     }
//     > Button {

//     }
//   }
//   > .infoWrapper {
//     display: flex;
//     border-bottom: 1px solid black;
// }
// `
// const BodyArticle = styled.article `

// `
// const QuestionSection = styled.section `
//   display: flex;

// `
// const AnswerSection = styled.section `

// `
// const QuestionDetail = ({ props }) => {
//   // const [ question, setQuestion ] = useState('')
//   // const { getInitialQuestions } = useStore(state => state);

//   // useEffect(
//   //   getInitialQuestions()
//   //   .then(res => setQuestion(res.data))
//   // )
//   const question = props[0];

//   return (
//     <PageWrapper>
//      <TitleBar>
//        <div className="head">
//          <h1>{question.title}</h1>
//          <Button
//            buttonName="Ask Question"
//            link="/addquestionpage"
//            width="103px"
//           />
//        </div>
//        <div className='infoWrapper'>
//          <div className='createdAt'>asked {displayedAt(question.createdAt)}</div>
//          <div className='viewed'>viewed {question.views}</div>
//        </div>
//     </TitleBar>
//     <BodyArticle>
//       <QuestionSection>
//         <div className='recommand'>추천</div>
//         <div className='post-layout'>
//           <div className='post--body'>{question.content}</div>
//           <div className='post--tags'></div>
//         </div>
//       </QuestionSection>
//       <AnswerSection></AnswerSection>
//     </BodyArticle>
//    </PageWrapper>
//   )
// }

// export default QuestionDetail;