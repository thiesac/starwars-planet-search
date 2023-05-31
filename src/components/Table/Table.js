import React from 'react';
import useFetch from '../../context/hooks/useFetch';

function Table() {
  const { data } = useFetch();
  console.log(data);
  return (
    <section>Hello, Table!</section>
  );
}

export default Table;
