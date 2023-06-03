import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import './Table.css';

function Table() {
  const { search, newData } = useContext(PlanetsContext);

  return (
    <section className="section-table">
      <table data-testid="results-table" className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {
            newData.filter((planet) => planet.name.toLowerCase().includes(search))
              .map(({
                name,
                rotation_period: rotationPeriod,
                orbital_period: orbitalPeriod,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: surfaceWater,
                population,
              }) => (
                <tr key={ name }>
                  <td>{ name }</td>
                  <td>{ rotationPeriod }</td>
                  <td>{ orbitalPeriod }</td>
                  <td>{ diameter }</td>
                  <td>{ climate }</td>
                  <td>{ gravity }</td>
                  <td>{ terrain }</td>
                  <td>{ surfaceWater }</td>
                  <td>{ population }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Table;
