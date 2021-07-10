// External Dependencies
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { AppStateProvider, useAppDispatch } from '../../../common/contexts/AppState';
import Sidebar from '../components/Sidebar';
import { initialAppState } from '../../../common/state/state';

// Mocked Functions
jest.mock('../../../common/contexts/AppState', () => ({
  ...(jest.requireActual('../../../common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

// Mocked Values
const DEFAULTSTATE = {
  ...initialAppState
};

describe('Sidebar', () => {
  it('matches snapshot - with sidebar closed', async () => {
    const component = render(
      <AppStateProvider initialStateOverride={initialAppState}>
        <Sidebar />
      </AppStateProvider>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('matches snapshot - with sidebar opened', async () => {
    initialAppState.sidebar.isOpen = true;

    const component = render(
      <AppStateProvider initialStateOverride={initialAppState}>
        <Sidebar />
      </AppStateProvider>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('matches snapshot - with sidebar opened - WidgetsList', async () => {
    initialAppState.sidebar.isOpen = true;
    initialAppState.sidebar.activeMenu = 'add';
    initialAppState.sidebar.activeView = null;

    const component = render(
      <AppStateProvider initialStateOverride={initialAppState}>
        <Sidebar />
      </AppStateProvider>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('matches snapshot - with sidebar opened - CountdownFormAddView', async () => {
    initialAppState.sidebar.isOpen = true;
    initialAppState.sidebar.activeMenu = 'add';
    initialAppState.sidebar.activeView = 'add_countdown';

    const component = render(
      <AppStateProvider initialStateOverride={initialAppState}>
        <Sidebar />
      </AppStateProvider>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  describe('Sidebar - Handlers', () => {

    beforeEach(() => {
      mockAppDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockAppDispatch);
    });

    it('triggers state updates when clicking on the close icon', async () => {
      DEFAULTSTATE.sidebar.isOpen = true;

      const component = render(
        <AppStateProvider initialStateOverride={DEFAULTSTATE}>
          <Sidebar />
        </AppStateProvider>
      );

      // Get Go Back Element
      const closeElement = await component.findByTestId('close-sidebar');
      expect(closeElement).toBeInTheDocument();

      // Trigger Click
      fireEvent.click(closeElement);

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledTimes(3);
      });
    });
  });
});