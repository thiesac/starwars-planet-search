import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import defaultPlanetsApi from './mocks/defaultPlanetsApi';
import { act } from 'react-dom/test-utils';

const mockResponse = defaultPlanetsApi;

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse)
  });
});

afterEach(jest.restoreAllMocks);


describe('Testa se os elementos estão presentes na tela', () => {
  // test('Título da página', () => {
  //   render(<App />);
  //   const h1Element = screen.getByRole('heading', { name: /star wars/i });
  //   expect(h1Element).toBeInTheDocument();
  // });

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
  test('Testa se ao digitar oo, a lista retorna apenas 2 planetas', async () => {
    render(<App />);
    const planetsTable = screen.getByTestId('results-table')
    const typeText = 'oo'
    const inputPlanetsSearch = screen.getByRole('textbox', { name: /planet/i });
    expect(planetsTable).toBeInTheDocument();
    const removedPlanet = await screen.findByText(/alderaan/i);
    act(() => userEvent.type(inputPlanetsSearch, typeText));
    expect(removedPlanet).not.toBeInTheDocument();
  });
})

describe('Testa a chamada da API', () => {
  test('Verifica se a API é chamada com o endpoint correto', async () => {
    render(<App />);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });
    
  test('Testa se o planeta Tatooine aparece na tela', async () => {
    render(<App />);
    const planetText = await screen.findByText(/Tatooine/i);
    expect(planetText).toBeInTheDocument();
  });
})

describe('Testa filtros de pesquisa', () => {
  test('Insere um filtro e verifica se planetas foram removidos', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByRole('spinbutton', { name: /number/i });
    const filterBtn = screen.getByTestId('button-filter');
    const removedPlanet = await screen.findByText(/Yavin IV/i);
    act(() => {
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '1000');
      userEvent.click(filterBtn);
    });
    await waitFor(() => expect(removedPlanet).not.toBeInTheDocument())
  });

  test('Insere dois filtros e verifica se planetas foram removidos', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByRole('spinbutton', { name: /number/i });
    const filterBtn = screen.getByTestId('button-filter');
    const removedPlanet1 = await screen.findByText(/Hoth/i);
    const removedPlanet2 = await screen.findByText(/Bespin/i);
    const remainedPlanet = await screen.findByText(/Yavin IV/i)
    act(() => {
      userEvent.selectOptions(columnFilter, 'surface_water');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(valueFilter, '8');
      userEvent.click(filterBtn);
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(valueFilter, '30000000');
      userEvent.click(filterBtn);
    });
    expect(removedPlanet1).not.toBeInTheDocument();
    expect(removedPlanet2).not.toBeInTheDocument();
    expect(remainedPlanet).toBeInTheDocument();
  });

  test('Remove todos os filtros e verifica se tabela volta com todos os planetas', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByRole('spinbutton', { name: /number/i });
    const filterBtn = screen.getByTestId('button-filter');
    const removeFilterBtn = screen.getByTestId('button-remove-filters');
    const removedPlanet = await screen.findByText(/Yavin IV/i);
    act(() => {
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '1000');
      userEvent.click(filterBtn);
    });
    await waitFor(() => expect(removedPlanet).not.toBeInTheDocument())
    act(() => userEvent.click(removeFilterBtn))
    await waitFor(() => expect(removedPlanet).toBeInTheDocument);
  });
})