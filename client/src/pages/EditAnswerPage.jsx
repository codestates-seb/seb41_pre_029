import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import useStore from "../zustand/store";
import EditAnswer from "../components/EditAnswer.jsx";

const EditAnswerPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const questionId = params.questionid;
  const answerId = params.answerid;

  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);
  const [token, setIsToken] = useState();

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
    }
  }, []);


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}`,
        {
          headers: {
            Authorization: token,
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
