import { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function FilterBar() {
  const { search, setSearch,
    handleChange, handleClick } = useContext(PlanetsContext);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          <input
            type="number"
            data-testid="value-filter"
            name="valueFilter"
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
      </fieldset>
    </form>
  );
}

export default FilterBar;
