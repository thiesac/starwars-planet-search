import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../PlanetsContext';

function useFetch() {
  const [data, setData] = useState([]);

  const refresh = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const receivedData = await response.json();
    const filteredResult = receivedData.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setData(filteredResult);
  };

  useEffect(() => {
    refresh();
  }, []);

  const { filter } = useContext(PlanetsContext);
  const handleClick = () => {
    // if (filter.comparisonFilter === 'maior que') {
    //   data.filter(filter.columnFilter > filter.valueFilter);
    // }
    console.log(filter.columnFilter)
  };

  return {
    data,
    handleClick,
  };
}

export default useFetch;
