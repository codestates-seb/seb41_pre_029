import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useStore from "../zustand/store.js";

import EditQuestion from "../components/EditQuestion";
import axios from "axios";

const EditQuestionPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const id = Number(params.id);

  const navigate = useNavigate();

  // const {questionData} =  useStore((state) => state)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${id}/edit`)
      .then((res) => setOriginData(res.data.data));
  }, []);

  return <div>{originData && <EditQuestion originData={originData} />}</div>;
};

export default EditQuestionPage;
