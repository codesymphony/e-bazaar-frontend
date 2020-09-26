/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/dist/simplebar.min.css';

import Authentication from '@components/Authentication';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main: React.FC = () => {
  return (
    <Container data-testid="container">
      <Switch>
        <Route path="/auth">
          <Authentication />
        </Route>
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
      <ToastContainer data-testid="toast-container" style={{ fontSize: '1.5rem' }} />
    </Container>
  );
};

export default Main;
