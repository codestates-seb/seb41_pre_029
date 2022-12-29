import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useStore from "../zustand/store.js";

import EditAnswer from "../components/EditAnswer.jsx";
import axios from "axios";

const EditAnswerPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const questionId = params.questionid;
  const answerId = params.answerid;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/comments/${answerId}`
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
