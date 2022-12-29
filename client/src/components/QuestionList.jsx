import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import  {useLocation} from 'react-router-dom'

import NoSearch from "./noSearch";
import QuestionSummary from "./QuestionSummary";
import Pagination from "./Pagination";

const QuestionList = ({ data, find }) => {
  const [questions, setQuestions] = useState([]);

  const [totalQuestions,setTotalQuestions] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/questions`).then((res) => {
      setQuestions(res?.data.data);
    });
  }, []);


  const [isActive, setIsActive] = useState("15");

  //페이지 당 게시물 수
  const [limit, setLimit] = useState(15);

  //현재 페이지
  const [page, setPage] = useState(1);

  //첫 게시물의 위치
  const offset = (page - 1) * limit;
  const location = useLocation();

  console.log(offset)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/questions${location.search}`).then((res) => {
      console.log(res.data.data)
      setQuestions(res.data.data)
      setTotalQuestions(res.data?.pageInfo.totalElements)
    })
  }, [location]);

  const handleActive = (e) => {
    setIsActive(() => {
      return e.target.value;
    });
    setLimit(Number(e.target.value));
  };
  console.log(data);
  return (
    <>
      {find && data.length === 0 && <NoSearch></NoSearch>}
      <QuestionListContainer>
        {data
          ? data
              .map((question) => (
                <QuestionSummary key={question.id} props={question} />
              ))
          : questions
              .map((question) => (
                <QuestionSummary key={question.id} props={question} />
              ))}
        <PageContainer>
          <Pagination
            total={questions.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <div className="select_buttons">
            <button
              value="15"
              className={
                isActive === "15" ? "active select_button" : "select_button"
              }
              onClick={handleActive}
            >
              15
            </button>
            <button
              value="30"
              className={
                isActive === "30" ? "active select_button" : "select_button"
              }
              onClick={handleActive}
            >
              30
            </button>
            <button
              value="50"
              className={
                isActive === "50" ? "active select_button" : "select_button"
              }
              onClick={handleActive}
            >
              50
            </button>
            <div className="per_page">per page</div>
          </div>
        </PageContainer>
      </QuestionListContainer>
    </>
  );
};

export default QuestionList;


const QuestionListContainer = styled.div`
  border-top: solid 1px #d6d9dc;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  & .select_buttons {
    width: 184px;
    height: 27px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 20px 0;
    font-size: 13px;
  }

  & .select_button {
    width: 32px;
    height: 27px;
    background: white;
    border-radius: 3px;
    border: 1px solid rgba(103, 112, 121, 0.7);
    cursor: pointer;
    font-size: 13px;
    padding: 0 8px;
    color: #3b4045;

    &:hover {
      background: rgba(103, 112, 121, 0.2);
      cursor: pointer;
    }
  }

  & .active {
    background: #f48225;
    color: white;
    border: 1px solid transparent;
    cursor: revert;
    transform: revert;

    &:hover {
      background: #f48225;
    }
  }
`;