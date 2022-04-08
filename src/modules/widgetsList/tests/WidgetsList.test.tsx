// External Dependencies
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { AppStateProvider, useAppDispatch } from '../../../common/contexts/AppState';
import { WidgetsList } from '../components/WidgetsList';

// Mocked Functions
jest.mock('../../../common/contexts/AppState', () => ({
  ...(jest.requireActual('../../../common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

describe('Widgets List', () => {
  it('matches snapshot', async () => {
    const component = render(<WidgetsList />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  describe('Widgets List - Handlers', () => {
    beforeEach(() => {
      mockAppDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockAppDispatch);
    });

    it('triggers state updates when clicking on the widgets list item', async () => {
      const component = render(
        <AppStateProvider>
          <WidgetsList />
        </AppStateProvider>
      );

      // Get Go Back Element
      const countdownItemElement = await component.findByTestId('countdown');
      expect(countdownItemElement).toBeInTheDocument();

      // Trigger Click
      fireEvent.click(countdownItemElement);

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledWith({
          type: 'setActiveView',
          activeView: 'add_countdown',
        });
      });
    });
  });
});
