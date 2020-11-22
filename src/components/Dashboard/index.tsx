/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import { Sidenav, Nav, Icon } from 'rsuite';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';

import CreateEditProduct from '@components/Product/CreateEditProduct';

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: papayawhip;
`;

const Dashboard = () => {
  const [navExpanded, setNavExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState('1');
  const match = useRouteMatch();

  const toggleSidenav = React.useCallback(() => {
    setNavExpanded(prev => !prev)
  }, []);

  const handleSelect = React.useCallback((eventKey: string) => {
    setActiveKey(eventKey);
  }, [])

  return (
    <DashboardContainer>
      <Sidenav
        style={{ maxWidth: '25rem' }}
        defaultOpenKeys={['3', '4']}
        appearance="inverse"
        expanded={navExpanded}
        activeKey={activeKey}
        onSelect={handleSelect}
      >
        <Sidenav.Header style={{ padding: '2rem 0' }}>
          <Hamburger
            toggled={navExpanded}
            toggle={toggleSidenav}
            duration={0.8}
            size={35}
            direction="right"
            color="#FFFFFF"
            rounded
          />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" active icon={<Icon icon="cubes" />}>
              Products
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
              Users
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <Switch>
        <Route path={`${match.path}/product/create`}>
          <CreateEditProduct />
        </Route>
        <Redirect from={match.path} to={`${match.path}/product/create`} />
      </Switch>
    </DashboardContainer>
  );
};

export default Dashboard;
