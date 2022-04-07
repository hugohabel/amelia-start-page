// External Dependencies
import React from 'react';
import { render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { useAppDispatch } from './common/contexts/AppState';
import { initialAppState } from './common/state/state';
import { App } from './App';

// Mocked Functions
jest.mock('./common/contexts/AppState', () => ({
  ...(jest.requireActual('./common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

// Mocked Values
const DEFAULTSTATE = {
  ...initialAppState,
};

describe('App', () => {
  describe('App - Handlers', () => {
    beforeEach(() => {
      mockAppDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockAppDispatch);
    });

    it('triggers sidebar close when loading the app and the state is sidebar open', async () => {
      DEFAULTSTATE.sidebar.isOpen = true;

      render(<App />);

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledWith({
          type: 'toggleSidebar',
        });
      });
    });
  });
});
