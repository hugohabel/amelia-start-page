// External Dependencies
import React from 'react';
import { render } from '@testing-library/react';

// Internal Dependencies
import { CountdownWidget } from '../CountdownWidget';

describe('Countdown Widget', () => {
  // Setup and Teardown

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 5, 13));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('matches snapshot', async () => {
    const component = render(
      <CountdownWidget
        eventName="Christmas"
        eventDate="2021-12-25T05:00:00.000Z"
        eventFormat="days+hours"
        eventEmoji="💡"
      />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
