import React from 'react';
import { RenderResult, cleanup } from '@testing-library/react';

import ConfirmUserForm from './index';

import { render } from '@tests/testUtils';

describe('Main Component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<ConfirmUserForm />);
  });

  afterEach(cleanup);

  it('should render successfully', () => {
    const { getByTestId } = renderResult;
    const containerDiv = getByTestId('container');

    expect(containerDiv).toBeInTheDocument();
  });
});
