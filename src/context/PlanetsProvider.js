import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from './hooks/useFetch';

function PlanetsProvider({ children }) {
  const [newData, setNewData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  const handleChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const handleClick = () => {
    if (filter.comparisonFilter === 'maior que') {
      const filteredData = newData
        .filter((planet) => planet[filter.columnFilter] > Number(filter.valueFilter));
      setNewData(filteredData);
    }
    if (filter.comparisonFilter === 'menor que') {
      const filteredData = newData
        .filter((planet) => planet[filter.columnFilter] < Number(filter.valueFilter));
      setNewData(filteredData);
    }
    if (filter.comparisonFilter === 'igual a') {
      const filteredData = newData
        .filter((planet) => planet[Number(filter
          .columnFilter)] === Number(filter.valueFilter));
      setNewData(filteredData);
    }
  };

  const { data } = useFetch();
  useEffect(() => {
    setNewData(data);
  }, [data]);
  const values = {
    search,
    setSearch,
    filter,
    setFilter,
    handleChange,
    newData,
    setNewData,
    handleClick,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default PlanetsProvider;
