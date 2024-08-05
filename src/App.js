import './App.css';
import { MyPlanesForm } from './MyPlanesForm';
import { MyPlanesInput } from './MyPlanesInput';

import { useState, useEffect } from 'react';
import { getAllPlanes, deletePlan } from './FetchPlan';
import Sorting from './Sorting/Sorting';

function App() {
  const [myPlan, setMyPlan] = useState([]);
  const [originalPlan, setOriginalPlan] = useState([]);
  const [editing, setEditing] = useState(false);
  const [planId, setPlanId] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [object, setObject] = useState("");
  const [name_object, setName_object] = useState("");
  const [length_route, setLength_route] = useState("");
  const [diametr_route, setDiametr_route] = useState("");
  const [amount_work, setAmount_work] = useState("");
  const [percentage, setPercentage] = useState("");
  const [start_work, setStart_work] = useState("");
  const [finish_work, setFinish_work] = useState("");
  const [executor, setExecutor] = useState("");

  useEffect(() => {
    getAllPlanes(data => {
      setMyPlan(data);
      setOriginalPlan(data);
    });
  }, []);

  const updatingInInput = (_id, object, name_object, length_route,
    diametr_route, amount_work, percentage, start_work, finish_work, executor) => {
    setEditing(true);
    setObject(object);
    setName_object(name_object);
    setLength_route(length_route);
    setDiametr_route(diametr_route);
    setAmount_work(amount_work);
    setPercentage(percentage);
    setStart_work(start_work);
    setFinish_work(finish_work);
    setExecutor(executor);
    setPlanId(_id);
  };

  return (
    <div className="App">
      <h1>ПЛАНИРОВАНИЕ ПРОИЗВОДСТВА РАБОТ</h1>
      <MyPlanesInput
        setMyPlan={setMyPlan}
        setEditing={setEditing}
        object={object}
        setObject={setObject}
        name_object={name_object}
        setName_object={setName_object}
        length_route={length_route}
        setLength_route={setLength_route}
        diametr_route={diametr_route}
        setDiametr_route={setDiametr_route}
        amount_work={amount_work}
        setAmount_work={setAmount_work}
        percentage={percentage}
        setPercentage={setPercentage}
        start_work={start_work}
        setStart_work={setStart_work}
        finish_work={finish_work}
        setFinish_work={setFinish_work}
        executor={executor}
        setExecutor={setExecutor}
        editing={editing}
        planId={planId}
        />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <Sorting
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                myPlan={myPlan}
                setMyPlan={setMyPlan}
                originalPlan={originalPlan}
                setOriginalPlan={setOriginalPlan}
              />
            </tr>
          </thead>
          <tbody>
            {myPlan.map((plan) => (
              <MyPlanesForm
                object={plan.object}
                name_object={plan.name_object}
                length_route={plan.length_route}
                diametr_route={plan.diametr_route}
                amount_work={plan.amount_work}
                percentage={plan.percentage}
                start_work={plan.start_work}
                finish_work={plan.finish_work}
                executor={plan.executor}
                _id={plan._id}
                key={plan._id}
                
                updatingInInput={() => updatingInInput(plan._id, plan.object, plan.name_object,
                  plan.length_route, plan.diametr_route, plan.amount_work, plan.percentage,
                  plan.start_work, plan.finish_work, plan.executor)}

                deletePlan={() => deletePlan(plan._id, setMyPlan)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
