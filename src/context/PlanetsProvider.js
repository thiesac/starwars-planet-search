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
  const [newState, setNewState] = useState([]);
  const initialOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnFilters, setColumnFilters] = useState(initialOptions);

  const handleChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const handleClick = () => {
    if (filter.comparisonFilter === 'maior que') {
      const filteredData = newData
        .filter((planet) => Number(planet[filter
          .columnFilter]) > Number(filter.valueFilter));
      setNewData(filteredData);
      setNewState([...newState, filter]);
    }
    if (filter.comparisonFilter === 'menor que') {
      const filteredData = newData
        .filter((planet) => Number(planet[filter
          .columnFilter]) < Number(filter.valueFilter));
      setNewData(filteredData);
      setNewState([...newState, filter]);
    }
    if (filter.comparisonFilter === 'igual a') {
      const filteredData = newData
        .filter((planet) => Number(planet[filter
          .columnFilter]) === Number(filter.valueFilter));
      setNewData(filteredData);
      setNewState([...newState, filter]);
    }
    const usedOptions = columnFilters.filter((column) => column !== filter.columnFilter);
    setColumnFilters(usedOptions);
    setFilter({ ...filter, columnFilter: usedOptions[0] });
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
    newState,
    columnFilters,
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
