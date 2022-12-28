import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import useStore from "../zustand/store.js";

import EditQuestion from "../components/EditQuestion";
import axios from "axios";

const EditQuestionPage = () =>{
    const [originData, setOriginData] = useState();
    const params = useParams();
    const id = Number(params.id);

    const navigate = useNavigate();

    // const {questionData} =  useStore((state) => state)

    useEffect(()=>{
        axios
        .get(`http://13.124.69.107/questions/${id}/edit`)
        .then((res) => setOriginData(res.data.data))
      }, [])

    return <div>
      {originData && <EditQuestion originData={originData}/>}

    </div>
}

export default EditQuestionPage;