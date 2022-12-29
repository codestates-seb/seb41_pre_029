import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useStore from "../zustand/store";
import EditAnswer from "../components/EditAnswer.jsx";
import axios from "axios";

const EditAnswerPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const questionId = params.questionid;
  const answerId = params.answerid;
  const { GetToken } = useStore((state) => state);

  const token = GetToken();
  const navigate = useNavigate();

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
