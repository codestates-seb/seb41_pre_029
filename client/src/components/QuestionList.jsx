import styled from "styled-components";
import { useState } from "react";

import data from "./dummydata";
import QuestionSummary from "./QuestionSummary";
import Pagination from "./Pagination"

const QuestionListContainer = styled.div`
  border-top: solid 1px #d6d9dc;
`;

const QuestionList = () => {
  
  const questionData = data;
  const [questions, setQuestions] = useState(questionData);

  //페이지 당 게시물 수
  const [limit, setLimit] = useState(15);

  //현재 페이지
  const [page, setPage] = useState(1);

  //첫 게시물의 위치
  const offset = (page - 1) * limit;

  return (
    <QuestionListContainer>
      {questions.slice(offset, offset + limit).map((question) => (
        <QuestionSummary key={question.id} props={question} />
      ))}
      <Pagination
        total={questions.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <select
        type="number"
        value={limit}
        onChange={({ target: { value } }) => setLimit(Number(value))}
      >
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
    </QuestionListContainer>
  );
};

export default QuestionList;
