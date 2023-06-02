import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import PlanetsProvider from './context/PlanetsProvider';
import FilterBar from './components/FilterBar/FilterBar';
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <Header />
        <FilterBar />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default App;
