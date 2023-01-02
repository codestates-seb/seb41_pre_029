import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import EditQuestion from "../components/EditQuestion";

const EditQuestionPage = () => {
  const [originData, setOriginData] = useState();
  const params = useParams();
  const id = Number(params.id);
  const [cookies, setCookie, removeCookie] = useCookies(["ikuzo"]);

  const [token, setIsToken] = useState();

  useEffect(() => {
    if (cookies.ikuzo) {
      setIsToken(cookies.ikuzo.token);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${id}/edit`, {
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      })
      .then((res) => setOriginData(res.data.data));
  }, []);

  return <div>{originData && <EditQuestion originData={originData} />}</div>;
};

export default EditQuestionPage;
