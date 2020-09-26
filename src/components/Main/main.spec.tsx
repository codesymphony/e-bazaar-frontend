import React from 'react';
import { RenderResult, cleanup } from '@testing-library/react';

import Main from './index';

import { render } from '@tests/testUtils';

describe('Main Component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Main />);
  });

  afterEach(cleanup);

  it('should render successfully', () => {
    const { getByTestId } = renderResult;
    const containerDiv = getByTestId('container');

    expect(containerDiv).toBeInTheDocument();
  });

  it('should include react toastify container', () => {
    const { container } = renderResult;

    expect(container.querySelector('.Toastify')).toBeTruthy();
  });
});
