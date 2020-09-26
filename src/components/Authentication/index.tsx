/* eslint-disable prettier/prettier */
import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import { Background, Content, Section, Image, Tagline } from './authentication.styles';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ConfirmUserScreen from './ConfirmUserScreen';

const Authentication = () => {
  const match = useRouteMatch();

  return (
    <Background>
      <Content>
        <Section>
          <Switch>
            <Route path={`${match.path}/registration`}>
              <RegistrationForm />
            </Route>
            <Route path={`${match.path}/confirm-user`}>
              <ConfirmUserScreen />
            </Route>
            <Route path={`${match.path}/login`}>
              <LoginForm />
            </Route>
            <Route path={match.path}>
              <Redirect to={`${match.path}/registration`} />
            </Route>
          </Switch>
        </Section>
        <Section>
          <Image>
            <Tagline>Straight from sources.</Tagline>
            <Tagline>To your Door.</Tagline>
          </Image>
        </Section>
      </Content>
    </Background>
  );
};

export default Authentication;
