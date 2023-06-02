import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { defaultPlanetsApi } from './mocks/defaultPlanetsApi';

const mockResponse = defaultPlanetsApi;

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse)
  });
});

afterEach(jest.restoreAllMocks);

describe('Testa se os elementos estão presentes na tela', () => {
  test('Título da página', () => {
    render(<App />);
    const h1Element = screen.getByRole('heading', { name: /star wars/i });
    expect(h1Element).toBeInTheDocument();
  });

  test('Input de busca dos planetas', () => {
    render(<App />);
    const inputPlanetsSearch = screen.getByRole('textbox', { name: /planet/i });
    expect(inputPlanetsSearch).toBeInTheDocument();
  });

  test('Fieldset com campos de filtros', () => {
    render(<App />);
    const inputsGroup = screen.getByRole('group');
    expect(inputsGroup).toBeInTheDocument();
  });

  test('Select para filtro de coluna', () => {
    render(<App />);
    const selectColumn = screen.getByTestId('column-filter');
    expect(selectColumn).toBeInTheDocument();
  });

  test('Verifica se o select para filtro de coluna possui os options corretos', () => {
    render(<App />);
    const options = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const selectColumn = screen.getByTestId('column-filter');
    expect(selectColumn).toHaveLength(options.length);
  });

  test('Input de número para filtrar', () => {
    render(<App />);
    const inputNumber = screen.getByRole('spinbutton', { name: /number/i });
    expect(inputNumber).toBeInTheDocument();
  });
})

describe('Testa se campo de busca por planeta funciona corretamente', () => {
  test('Testa se ao digitar oo, a lista retorna apenas 2 planetas', () => {
    render(<App />);
    // const planetsTable = screen.getByTestId('results-table')
    // expect(planetsTable).toBeInTheDocument();
    // const typeText = 'oo'
    // const inputPlanetsSearch = screen.getByRole('textbox', { name: /planet/i });
    // userEvent.type(inputPlanetsSearch, typeText)
    // expect(planetsTable).toHaveLength(2)
  });
})

describe('Testa a chamada da API', () => {
  test('Verifica se a API é chamada com o endpoint correto', async () => {
    render(<App />);
    // await waitFor(() => {
    //   expect(global.fetch).toHaveBeenCalledTimes(1);
    //   expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    // })
  });
    
  test('Testa se o planeta Tatooine aparece na tela', async () => {
    render(<App />);
    // const planetText = await screen.findByText(/Tatooine/i);
    // expect(planetText).toBeInTheDocument();
  });
})

// describe('Testa se os elementos estão presentes na tela', () => {
//   test('Título da página', () => {
//     render(<App />);
//     const h1Element = screen.getByRole('heading', { name: /star wars/i });
//     expect(h1Element).toBeInTheDocument();
//   });
// })