 import axios from 'axios';

 const getAllPlanes = (setMyPlan) => {
     axios.get("https://plan-work.onrender.com")
     .then(({data}) => {console.log(data);
         setMyPlan(data);
        })
 }
 const addPlane = (object, setObject, name_object,setName_object, setMyPlan,
    length_route, setLength_route, diametr_route, setDiametr_route, amount_work,
   setAmount_work, percentage, setPercentage, start_work, setStart_work,
   finish_work, setFinish_work, executor, setExecutor ) => {
    axios.post("https://plan-work.onrender.com/savePlan", 
    {object,name_object,length_route,diametr_route,amount_work,percentage,
     start_work, finish_work, executor })
    .then(({data}) => {console.log(data);
        setObject("");
        setName_object("")
        setLength_route("")
        setDiametr_route("")
        setAmount_work("")
        setPercentage("")
        setStart_work("")
        setFinish_work("")
        setExecutor("")

        getAllPlanes(setMyPlan);
       })
}
const editPlan = (planId, object, setObject, name_object,setName_object, setMyPlan,
    length_route, setLength_route, diametr_route, setDiametr_route, amount_work,
   setAmount_work, percentage, setPercentage, start_work, setStart_work,
   finish_work, setFinish_work, executor, setExecutor, setEditing) => {
    axios.post("https://plan-work.onrender.com/editPlan", {_id:planId, object,
        name_object,length_route,diametr_route,amount_work,percentage,
        start_work, finish_work, executor})
    .then(({data}) => {console.log(data);
        setObject("");
        setName_object("")
        setLength_route("")
        setDiametr_route("")
        setAmount_work("")
        setPercentage("")
        setStart_work("")
        setFinish_work("")
        setExecutor("")

        setEditing(false);
        getAllPlanes(setMyPlan);
       })
}
const deletePlan = (_id, setMyPlan) => {
    axios.post("https://plan-work.onrender.com/deletePlan", { _id })
    .then(({data}) => {console.log(data);
        getAllPlanes(setMyPlan);
       })
}


 export { getAllPlanes, addPlane, editPlan, deletePlan };