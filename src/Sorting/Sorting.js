import React from 'react';
import './sorting.css';

const Sorting = ({ sortConfig, setSortConfig, myPlan, setMyPlan, originalPlan }) => {

  const sortByDate = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedData = myPlan.slice().sort((a, b) => {
      const dateA = new Date(a[key].split('.').reverse().join('-'));
      const dateB = new Date(b[key].split('.').reverse().join('-'));
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setMyPlan(sortedData);
    setSortConfig({ key, direction });
  };

  const resetSort = () => {
    setMyPlan(originalPlan);
    setSortConfig({ key: null, direction: null });
  };

  const handleHeaderClick = (key) => {
    if (sortConfig.key === key) {
      resetSort();
    } else {
      sortByDate(key);
    }
  };

  return (
    <>
      <th>Объект</th>
      <th>Наименование мероприятия</th>
      <th>Длина трассы, км</th>
      <th>Диаметр трассы, мм</th>
      <th>Общая стоимость работ, тыс.уе</th>
      <th>Процент выполнения плана, %</th>
      <th className="sortable-header" onClick={() => handleHeaderClick('start_work')}>Начало работ</th>
      <th className="sortable-header" onClick={() => handleHeaderClick('finish_work')}>Окончание работ</th>
      <th>Исполнитель работ</th>
      <th>Действия</th>
    </>
  );
}

export default Sorting;
