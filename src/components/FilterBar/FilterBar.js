import { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function FilterBar() {
  const { search, setSearch } = useContext(PlanetsContext);

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        name="search-planet-input"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />
    </form>
  );
}

export default FilterBar;
