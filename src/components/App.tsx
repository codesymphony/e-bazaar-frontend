import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from '../theme/theme.json';

import { GlobalStyle } from '@styles/global';
import Main from '@components/Main';
import store from '@redux/index';

const App = () => {
  const styledTheme: DefaultTheme = theme;

  return (
    <ReduxStoreProvider store={store}>
      <ThemeProvider theme={styledTheme}>
        <GlobalStyle />
        <Router>
          <Main />
        </Router>
      </ThemeProvider>
    </ReduxStoreProvider>
  );
};

export default App;
