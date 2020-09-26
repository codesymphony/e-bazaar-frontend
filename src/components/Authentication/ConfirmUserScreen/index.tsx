import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Message } from './styles';

import {
  SwitchViewText,
  SwitchViewLink,
} from '@components/Authentication/form.styles';

const ConfirmUserForm: React.FC = () => {
  return (
    <Container data-testid="container">
      <Message>
        A verifcation email has been has to your registered email.
      </Message>
      <Message>
        Please click on the link in the email to confirm before you can sign in.
      </Message>
      <SwitchViewText data-testid="redirect-link">
        Confirmed already?
        <SwitchViewLink>
          <Link to="/auth/login">SignIn</Link>
        </SwitchViewLink>
      </SwitchViewText>
    </Container>
  );
};

export default ConfirmUserForm;
