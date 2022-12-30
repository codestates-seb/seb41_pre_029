import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import EditAnswer from "../components/EditAnswer.jsx";

const EditAnswerPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const questionId = params.questionid;
  const answerId = params.answerid;

  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);

  const [isToken, setIsToken] = useState();
  const [memberID, setMemberId] = useState();


  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
    }
  }, []);


  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
      setMemberId(cookies.ikuzo.id);
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${memberID}`,
        {
          headers: {
            Authorization: isToken,
            withCredentials: true,
          },
        }
      )
      .then((res) => setOriginData(res.data.data));
  }, []);

  return (
    <div>
      {originData && (
        <EditAnswer
          originData={originData}
          questionId={questionId}
          answerId={answerId}
        />
      )}
    </div>
  );
};

export default EditAnswerPage;
