// External Dependencies
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { AppStateProvider, useAppDispatch } from '../../../../common/contexts/AppState';
import CountdownFormAddView from '../CountdownFormAddView';

// Mocked Functions
jest.mock('../../../../common/contexts/AppState', () => ({
  ...(jest.requireActual('../../../../common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

describe('Countdown Form Add View', () => {
  it('matches snapshot', async () => {
    const component = render(
      <CountdownFormAddView />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  describe('Countdown Form - Handlers', () => {

    beforeEach(() => {
      mockAppDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockAppDispatch);
    });

    it('triggers onSubmit when clicking on the submit button', async () => {
      const component = render(
        <AppStateProvider>
          <CountdownFormAddView />
        </AppStateProvider>
      );

      // Get Go Back Element
      const goBackElement = await component.findByTestId('go-back');
      expect(goBackElement).toBeInTheDocument();

      // Trigger Click
      fireEvent.click(goBackElement);

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledWith({
          activeView: null,
          type: 'setActiveView'
        });
      });
    });
  });
});