import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  const handleChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const values = { search, setSearch, filter, setFilter, handleChange };

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
