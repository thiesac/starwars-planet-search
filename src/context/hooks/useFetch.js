import { useEffect, useState } from 'react';

function useFetch() {
  const [data, setData] = useState([]);

  const refresh = () => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((receiveData) => console.log(receiveData.results));
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    data,
    setData,
  };
}

export default useFetch;
