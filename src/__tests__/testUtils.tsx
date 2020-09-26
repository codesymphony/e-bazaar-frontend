import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { RootState } from 'typesafe-actions';

import theme from '../theme/theme.json';

import { GlobalStyle } from '@styles/global';
import rootReducer from '@redux/reducers';

type RenderOptionsWithoutQueries = Omit<RenderOptions, 'queries'>;

type ProvidersProps = {
  initialState?: Partial<RootState>;
};

type ExtendedRenderOptions = RenderOptionsWithoutQueries & ProvidersProps;

// type Providers = {
//   store: Store<RootState, RootAction>;
// };

const customRender = (
  ui: React.ReactElement,
  options: ExtendedRenderOptions = {},
): RenderResult => {
  const { initialState = {}, ...renderOptions } = options;

  const store = createStore(rootReducer, { ...initialState });

  const AllTheProviders: React.FC = ({ children }) => {
    const styledTheme: DefaultTheme = theme;

    return (
      <ReduxStoreProvider store={store}>
        <ThemeProvider theme={styledTheme}>
          <GlobalStyle />
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </ReduxStoreProvider>
    );
  };

  const renderResult = render(ui, {
    wrapper: AllTheProviders,
    ...renderOptions,
  });

  return renderResult;
};

export { customRender as render };
