import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const INITIAL_STATE = { };

function PlanetsProvider({ children }) {
  const [state] = useState(INITIAL_STATE);

  return (
    <PlanetsContext.Provider value={ state }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default PlanetsProvider;
