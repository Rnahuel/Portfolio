import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { setCentro, setTop, setRight, setBottom, setLeft, setWidth, setHeight } from '../features/tableroSlice';
import { useCalcularTablero } from '../hooks/useCalcularTablero';
import { setTableroCargado } from '../features/juegoSlice';


// Configuración de la tienda de prueba usando redux-mock-store sin middlewares adicionales
const mockStore = configureMockStore([]);

// Componente de prueba para usar el hook dentro del contexto del Provider
const TestComponent = ({ divTableroRef }) => {
  useCalcularTablero(divTableroRef);
  return null;
};

describe('useCalcularTablero', () => {
  it('calcula y despacha propiedades correctamente en modo "jugar"', () => {
    const initialState = {
      tablero: {},
      juego: { modo: 'jugar' },
    };
    const store = mockStore(initialState);
    const divTableroRef = {
      current: {
        getBoundingClientRect: () => ({
          width: 200,
          height: 400,
          top: 10,
          right: 210,
          bottom: 410,
          left: 10,
        }),
      },
    };

    render(
      <Provider store={store}>
        <TestComponent divTableroRef={divTableroRef} />
      </Provider>
    );

    const actions = store.getActions();

    expect(actions).toContainEqual(setCentro({ x: 100, y: 200 }));
    expect(actions).toContainEqual(setTop(10));
    expect(actions).toContainEqual(setRight(210));
    expect(actions).toContainEqual(setBottom(410));
    expect(actions).toContainEqual(setLeft(10));
    expect(actions).toContainEqual(setWidth(200));
    expect(actions).toContainEqual(setHeight(400));
    expect(actions).toContainEqual(setTableroCargado());
  });
});
