import { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import PlanetsContext from '../../context/PlanetsContext';
import './FilterBar.css';

function FilterBar() {
  const { search, setSearch,
    handleChange, handleClick, filter,
    newState, columnFilters, setNewState, setColumnFilters,
    onClickRemoveOneFilter } = useContext(PlanetsContext);

  return (
    <form className="filter-bar">
      <div className="planet-search">
        <FaSearch className="fasearch" />
        <input
          type="text"
          data-testid="name-filter"
          name="search-planet-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </div>
      <div className="filterbar-filters">
        <select
          data-testid="column-filter"
          name="columnFilter"
          onChange={ ({ target: { name, value } }) => handleChange(name, value) }
        >
          {
            columnFilters.map((column) => (
              <option value={ column } key={ column }>{ column }</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          onChange={ ({ target: { name, value } }) => handleChange(name, value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          placeholder="0"
          data-testid="value-filter"
          name="valueFilter"
          value={ filter.valueFilter }
          onChange={ ({ target: { name, value } }) => handleChange(name, value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => handleClick() }
        >
          Filter
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            setNewState([]);
            setColumnFilters(['population', 'orbital_period',
              'diameter', 'rotation_period', 'surface_water']);
          } }
        >
          Remove all filters
        </button>
      </div>
      {
        newState.length > 0 ? (newState
          .map((state, index) => (
            <span key={ index } data-testid="filter">
              { `${state.columnFilter} ${state.comparisonFilter} ${state.valueFilter}` }
              { ' ' }
              <button
                type="button"
                onClick={ () => onClickRemoveOneFilter(state.columnFilter) }
              >
                X
              </button>
            </span>
          ))) : null
      }
    </form>
  );
}

export default FilterBar;
