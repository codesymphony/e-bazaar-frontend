/* eslint-disable prettier/prettier */
import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import CreateEditProduct from '@components/Product/CreateEditProduct';

const Dashboard = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/product/create`}>
          <CreateEditProduct />
        </Route>
        <Redirect from={match.path} to={`${match.path}/product/create`} />
      </Switch>
    </>
  );
};

export default Dashboard;
