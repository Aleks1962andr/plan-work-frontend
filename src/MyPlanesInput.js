import React, { useState } from 'react';
import { addPlane, editPlan } from './FetchPlan';
import './style.css';  

export const MyPlanesInput = ({
    setMyPlan, object, setObject, name_object, setName_object,
    length_route, setLength_route, diametr_route, setDiametr_route, amount_work,
    setAmount_work, percentage, setPercentage, start_work, setStart_work,
    finish_work, setFinish_work, executor, setExecutor, editing, setEditing, planId
}) => {
    const [lengthRouteError, setLengthRouteError] = useState("");
    const [diametrError, setDiametrError] = useState("");
    const [amountWorkError, setAmountWorkError] = useState("");
    const [percentageError, setPercentageError] = useState("");
    const [startWorkError, setStartWorkError] = useState("");
    const [finishWorkError, setFinishWorkError] = useState("");

    const handleLengthRouteChange = (e) => {
        const value = e.target.value;
        setLength_route(value);

        if (isNaN(value) || value <= 0) {
            setLengthRouteError("Длина трассы должна быть положительным числом.");
        } else {
            setLengthRouteError("");
        }
    };

    const handleDiametrChange = (e) => {
        const value = e.target.value;
        setDiametr_route(value);

        if (value < 57 || value > 1220) {
            setDiametrError("Диаметр трассы должен быть в диапазоне от 57 до 1220.");
        } else {
            setDiametrError("");
        }
    };

    const formatNumber = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };
    
    const handleAmountWorkChange = (e) => {
    
        const rawValue = e.target.value.replace(/\s+/g, ''); 
        if (!isNaN(rawValue) && rawValue !=='') {
            setAmount_work(formatNumber(rawValue));
        } else {
        setAmount_work(rawValue);
        }
        if (isNaN(rawValue) || rawValue <= 0) {
            setAmountWorkError("Стоимость работ должна быть положительным числом.");
        } else {
            setAmountWorkError("");
        }
    };

    const handlePercentageChange = (e) => {
        const value = e.target.value;
        setPercentage(value);

        if (isNaN(value) || value < 0 || value > 100) {
            setPercentageError("Процент выполнения должен быть в диапазоне от 0 до 100.");
        } else {
            setPercentageError("");
        }
    };

    const handleStartWorkChange = (e) => {
        let value = e.target.value;

        if (value.length === 2 && !value.includes('.')) {
            value += '.';
        }

        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        const [day, month] = value.split('.');
        if (day && (isNaN(day) || day < 1 || day > 31)) {
            setStartWorkError("День должен быть в диапазоне от 01 до 31.");
        } else if (month && (isNaN(month) || month < 1 || month > 12)) {
            setStartWorkError("Месяц должен быть в диапазоне от 01 до 12.");
        } else {
            setStartWorkError("");
        }

        setStart_work(value);
    };

    const handleFinishWorkChange = (e) => {
        let value = e.target.value;

        if (value.length === 2 && !value.includes('.')) {
            value += '.';
        }

        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        const [day, month] = value.split('.');
        if (day && (isNaN(day) || day < 1 || day > 31)) {
            setFinishWorkError("День должен быть в диапазоне от 01 до 31.");
        } else if (month && (isNaN(month) || month < 1 || month > 12)) {
            setFinishWorkError("Месяц должен быть в диапазоне от 01 до 12.");
        } else {
            setFinishWorkError("");
        }

        setFinish_work(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!lengthRouteError && !diametrError && !amountWorkError && !percentageError && !startWorkError && !finishWorkError) {
            if (editing) {
                editPlan(planId, object, setObject, name_object, setName_object, setMyPlan,
                    length_route, setLength_route, diametr_route, setDiametr_route, amount_work,
                    setAmount_work, percentage, setPercentage, start_work, setStart_work,
                    finish_work, setFinish_work, executor, setExecutor, setEditing);
            } else {
                addPlane(object, setObject, name_object, setName_object, setMyPlan,
                    length_route, setLength_route, diametr_route, setDiametr_route, amount_work,
                    setAmount_work, percentage, setPercentage, start_work, setStart_work,
                    finish_work, setFinish_work, executor, setExecutor );
            }
        }
    };

    const isFormValid = object && name_object && length_route && diametr_route && amount_work && percentage &&
        !lengthRouteError && !diametrError && !amountWorkError && !percentageError && !startWorkError &&
        !finishWorkError && start_work && finish_work && executor;

    return (
        <div className="container">
            <form className="form" method="POST" action="/" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Объект</label>
                    <input type="text" placeholder="Объект" className="form-control" value={object} onChange={(e) => setObject(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Наименование мероприятия</label>
                    <input name="name_object" placeholder="Наименование работ" className="form-control" value={name_object} onChange={(e) => setName_object(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Длина трассы, м</label>
                    <input name="length_route" placeholder="Длина трассы" className="form-control" value={length_route} onChange={handleLengthRouteChange} />
                    {lengthRouteError && <p className="error">{lengthRouteError}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Диаметр трассы, мм</label>
                    <input name="diametr_route" placeholder="Диаметр трассы" className="form-control" value={diametr_route} onChange={handleDiametrChange} />
                    {diametrError && <p className="error">{diametrError}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Общая стоимость работ, тыс. уе</label>
                    <input name="amount_work" placeholder="Стоимость работ" className="form-control" value={amount_work} onChange={handleAmountWorkChange} />
                    {amountWorkError && <p className="error">{amountWorkError}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Процент выполнения плана, %</label>
                    <input name="percentage" placeholder="% выполнения" className="form-control" value={percentage} onChange={handlePercentageChange} />
                    {percentageError && <p className="error">{percentageError}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Начало работ</label>
                    <input name="start_work" placeholder="ДД.ММ" className="form-control" value={start_work} onChange={handleStartWorkChange} />
                    {startWorkError && <p className="error">{startWorkError}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Окончание работ</label>
                    <input name="finish_work" placeholder="ДД.ММ" className="form-control" value={finish_work} onChange={handleFinishWorkChange} />
                    {finishWorkError && <p className="error">{finishWorkError}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Исполнитель работ</label>
                    <input name="executor" placeholder="Исполнитель" className="form-control" value={executor} onChange={(e) => setExecutor(e.target.value)} />
                </div>
                <div className="form-group padding1">
                    <button className="btn btn-primary" disabled={!isFormValid} type="submit">{editing ? "EDIT" : "ADD"}</button>
                </div>
            </form>
        </div>
    );
};
