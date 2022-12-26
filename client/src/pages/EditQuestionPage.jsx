import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import useStore from "../zustand/store.js";

import EditQuestion from "../components/EditQuestion";

const EditQuestionPage = () =>{
    const [originData, setOriginData] = useState();
    const {id} = useParams();

    const navigate = useNavigate();
    const {questionData} =  useStore((state) => state)

    useEffect(()=>{
        if(questionData.length>= 1) {
            const targetQuestion =questionData.find((it)=>parseInt(it.id) === parseInt(id))
         console.log(targetQuestion)
        if(targetQuestion) {
            setOriginData(targetQuestion)
        } else {
            navigate('/',{replace:true})
        }
    }
    },[id,questionData]);
    return <div>
      {originData && <EditQuestion originData={originData}/>}

    </div>
}

export default EditQuestionPage;