import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import EditQuestion from "../components/EditQuestion";

const EditQuestionPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${id}/edit`)
      .then((res) => setOriginData(res.data.data));
  }, []);

  return <div>{originData && <EditQuestion originData={originData} />}</div>;
};

export default EditQuestionPage;
