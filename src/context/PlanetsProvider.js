import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from './hooks/useFetch';

function PlanetsProvider({ children }) {
  const [newData, setNewData] = useState([]); // transforma retorno da API em global
  const [search, setSearch] = useState(''); // input de pesquisa
  const [newState, setNewState] = useState([]); // filtros utilizados
  const [fixedState, setFixedState] = useState([]); // estado dos planetas utilizado nos filtros (no useEffect)
  // filtros
  const [filter, setFilter] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  const initialOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnFilters, setColumnFilters] = useState(initialOptions); // somente options da columnFilter

  // input de pesquisa
  const handleChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    let newPlanets = fixedState;
    newState.forEach(({ comparisonFilter, valueFilter, columnFilter }) => {
      if (comparisonFilter === 'maior que') {
        newPlanets = newPlanets
          .filter((planet) => Number(planet[columnFilter]) > Number(valueFilter));
      }
      if (comparisonFilter === 'menor que') {
        newPlanets = newPlanets
          .filter((planet) => Number(planet[columnFilter]) < Number(valueFilter));
      }
      if (comparisonFilter === 'igual a') {
        newPlanets = newPlanets
          .filter((planet) => Number(planet[columnFilter]) === Number(valueFilter));
      }
    });
    setNewData(newPlanets);
  }, [newState]);

  // botão de filtrar
  const handleClick = () => {
    setNewState([...newState, filter]);
    const usedOptions = columnFilters.filter((column) => column !== filter.columnFilter);
    setColumnFilters(usedOptions);
    setFilter({ ...filter, columnFilter: usedOptions[0] });
  };

  // excluir filtro individualmente
  const onClickRemoveOneFilter = (columnFilter) => {
    const filtersLeft = newState
      .filter((removeFilter) => columnFilter !== removeFilter.columnFilter);
    setNewState([...filtersLeft]);
    setColumnFilters([...columnFilters, columnFilter]);
  };

  const { data } = useFetch();
  useEffect(() => {
    setNewData(data);
    setFixedState(data);
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
    setNewState,
    setColumnFilters,
    onClickRemoveOneFilter,
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
