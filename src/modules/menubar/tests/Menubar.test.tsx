// External Dependencies
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { initialAppState } from '../../../common/state/state';
import { AppStateProvider, useAppDispatch } from '../../../common/contexts/AppState';
import { Menubar } from '../components/Menubar';

// Mocked Functions
jest.mock('../../../common/contexts/AppState', () => ({
  ...(jest.requireActual('../../../common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

// Mockes Values
const DEFAULTSTATE = {
  ...initialAppState
};

describe('Menubar', () => {
  it('matches snapshot', async () => {
    const component = render(
      <Menubar />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('matches snapshot - with menubar item selected', async () => {
    DEFAULTSTATE.sidebar.isOpen = true;
    DEFAULTSTATE.sidebar.activeMenu = 'add';

    const component = render(
      <AppStateProvider initialStateOverride={DEFAULTSTATE}>
        <Menubar />
      </AppStateProvider>
    );

    expect(component.asFragment()).toMatchSnapshot();

    DEFAULTSTATE.sidebar.isOpen = false;
    DEFAULTSTATE.sidebar.activeMenu = null;
  });

  describe('Menubar - Handlers', () => {

    beforeEach(() => {
      mockAppDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockAppDispatch);
    });

    it('triggers state updates to open the sidebar when clicking on the add menubar item', async () => {
      const component = render(
        <AppStateProvider>
          <Menubar />
        </AppStateProvider>
      );

      // Get Add Element
      const addElement = await component.findByTestId('add');
      expect(addElement).toBeInTheDocument();

      // Trigger Click
      fireEvent.click(addElement);

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledTimes(2);
      });
    });
  });
});