import React from 'react';
import Table from './components/Table/Table';
import PlanetsProvider from './context/PlanetsProvider';
import FilterBar from './components/FilterBar/FilterBar';
import Header from './components/Header/Header';
import Stars from './components/Stars/Stars';

function App() {
  return (
    <div className="app">
      <PlanetsProvider>
        <Header />
        <FilterBar />
        <Table />
        <Stars />
      </PlanetsProvider>
    </div>
  );
}

export default App;
