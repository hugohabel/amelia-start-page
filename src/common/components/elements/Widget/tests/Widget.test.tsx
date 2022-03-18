// External Dependencies
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';

// Internal Dependencies
import { AppStateProvider, useAppDispatch } from '../../../../../common/contexts/AppState';
import { Widget } from '../Widget';

// Mocked Functions
jest.mock('../../../../../common/contexts/AppState', () => ({
  ...(jest.requireActual('../../../../../common/contexts/AppState') as object),
  useAppDispatch: jest.fn(),
}));
let mockAppDispatch: ReturnType<typeof useAppDispatch>;

// Mocked Values
const UUID = 'a2c82ff0-a886-4016-a9ac-e3b6d8e49676';

describe('Widget', () => {
  it('matches snapshot', async () => {
    const component = render(
      <Widget style={{backgroundColor: "#FFFFFF"}} uuid={UUID} widgetType="test" editAction={false}>
        <h1>Widget Container - Children</h1>
      </Widget>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  describe('Widget - Handlers', () => {

    beforeEach(() => {
      mockAppDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockAppDispatch);
    });

    it('triggers remove handler when clicking on the remove icon', async () => {
      const component = render(
        <AppStateProvider>
          <Widget style={{backgroundColor: "#FFFFFF"}} uuid={UUID} widgetType="test" editAction={false}>
            <h1>Widget Container - Children</h1>
          </Widget>
        </AppStateProvider>
      );

      const removeButtonElement = await component.findByTestId(UUID);
      expect(removeButtonElement).toBeInTheDocument();

      fireEvent.click(getByTestId(component.container, UUID));

      await waitFor(() => {
        expect(mockAppDispatch).toHaveBeenCalledWith({
          type: 'removeWidgetItem', 
          uuid: 'a2c82ff0-a886-4016-a9ac-e3b6d8e49676',
          widgetType: 'test'
        });
      });
    });
  });
});