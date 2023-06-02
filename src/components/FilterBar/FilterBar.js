import { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function FilterBar() {
  const { search, setSearch,
    handleChange, handleClick, filter,
    newState, columnFilters, setNewState, setColumnFilters,
    onClickRemoveOneFilter } = useContext(PlanetsContext);

  return (
    <form>
      <label>
        Planet
        <input
          type="text"
          data-testid="name-filter"
          name="search-planet-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </label>
      <fieldset>
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
        <label>
          Number
          <input
            type="number"
            data-testid="value-filter"
            name="valueFilter"
            value={ filter.valueFilter }
            onChange={ ({ target: { name, value } }) => handleChange(name, value) }
          />
        </label>
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
      </fieldset>
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
