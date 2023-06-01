import { useEffect, useState } from 'react';
// import PlanetsContext from '../PlanetsContext';

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

  return {
    data,
    setData,
    // handleClick,
  };
}

export default useFetch;
