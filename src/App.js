import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import PlanetsProvider from './context/PlanetsProvider';
import FilterBar from './components/FilterBar/FilterBar';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <FilterBar />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default App;
