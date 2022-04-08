// External Dependencies
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { AppStateProvider, useAppDispatch } from '../../../../common/contexts/AppState';
import { CountdownForm } from '../CountdownForm';

// Mocked Functions
jest.mock('../../../../common/contexts/AppState', () => ({
  ...(jest.requireActual('../../../../common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

// Mocked Values
const EVENTNAMEVALUE = 'Christmas';
const EVENTDATEVALUE = '2021-12-12';

describe('Countdown Form', () => {
  it('matches snapshot', async () => {
    const component = render(<CountdownForm />);

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
          <CountdownForm />
        </AppStateProvider>
      );

      // Get Submit Button
      const submitButtonElement = await component.findByRole('button', { name: 'Submit' });
      expect(submitButtonElement).toBeInTheDocument();

      // Get Event Name Input
      const eventNameInputElement = await component.findByPlaceholderText('Event name');
      expect(eventNameInputElement).toBeInTheDocument();

      // Get Event Date Input
      const eventDateInputElement = await component.findByPlaceholderText('Event date');
      expect(eventDateInputElement).toBeInTheDocument();

      // Set Form Values
      fireEvent.change(eventNameInputElement, { target: { value: EVENTNAMEVALUE } });
      fireEvent.change(eventDateInputElement, { target: { value: EVENTDATEVALUE } });

      // Trigger Click
      fireEvent.click(submitButtonElement);

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledTimes(2);
      });
    });

    it('displays validation error when clicking on the submit button with empty event name', async () => {
      const component = render(
        <AppStateProvider>
          <CountdownForm />
        </AppStateProvider>
      );

      // Get Submit Button
      const submitButtonElement = await component.findByRole('button', { name: 'Submit' });
      expect(submitButtonElement).toBeInTheDocument();

      // Trigger Click
      fireEvent.click(submitButtonElement);

      // Get Event Name Error
      const eventNameErrorElement = await component.findByText('Event name is required');
      expect(eventNameErrorElement).toBeInTheDocument();
    });

    it('displays validation error when clicking on the submit button with empty event date', async () => {
      const component = render(
        <AppStateProvider>
          <CountdownForm />
        </AppStateProvider>
      );

      // Get Submit Button
      const submitButtonElement = await component.findByRole('button', { name: 'Submit' });
      expect(submitButtonElement).toBeInTheDocument();

      // Trigger Click
      fireEvent.click(submitButtonElement);

      // Get Event Name Error
      const eventNameErrorElement = await component.findByText('Event date is required');
      expect(eventNameErrorElement).toBeInTheDocument();
    });
  });
});
