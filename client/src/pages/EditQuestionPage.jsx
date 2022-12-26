import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import useStore from "../zustand/store.js";

import EditQuestion from "../components/EditQuestion";

const EditQuestionPage = () =>{
    const [originData, setOriginData] = useState();
    const {id} = useParams();

    const navigate = useNavigate();
    const {data} =  useStore((state) => state)


    useEffect (()=>{
      setOriginData(data)
    },[])
    // console.log(data)

    // useEffect(()=>{
    //     if(data.length>= 1) {
    //         const targetQuestion =data.find((it)=>parseInt(it.id) === parseInt(id))
        
    //     if(targetQuestion) {
    //         setOriginData(targetQuestion)
    //     } else {
    //         navigate('/',{replace:true})
    //     }
    // }
    // },[id,data]);
    return <div>
      {originData && <EditQuestion originData={originData}/>}

    </div>
}

export default EditQuestionPage;