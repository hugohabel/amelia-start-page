// External Dependencies
import produce, { enableES5 } from 'immer';

// Internal Dependencies
import { AppAction, AppState } from '../types/AppState';

if (typeof Proxy === 'undefined') {
  enableES5(); // Shouldn't be necessary if the app runs just on Chrome.
}

export const initialAppState: AppState = {
  widgets: [{
    type: 'countdown',
    enabled: true,
    data: {
      events: [{
        id: 'ba4d-13dbf795d755',
        name: 'Christmas',
        date: '2021-12-25T05:00:00.000Z',
        background: 'christmas-bg.jpg',
      }]
    }
  }],
  sidebar: {
    isOpen: false,
    activeMenu: null,
    activeView: null
  }
};

// @TO-DO - Extract the logic here to an external utils function and add tests to it.
export const rootReducer = produce((draft: AppState, action: AppAction) => {
  switch (action.type) {
    case 'addNewWidget':
      draft.widgets.push(action.widget);
      break;
    case 'toggleSidebar':
      draft.sidebar.isOpen = !draft.sidebar.isOpen;
      break;
    case 'setActiveMenu':
      draft.sidebar.activeMenu = action.activeMenu;
      break;
    case 'setActiveView':
      draft.sidebar.activeView = action.activeView;
      break;
    case 'addNewCountdownEvent':
      const countdownWidget = draft.widgets.find((widget) => {
        return widget.type === 'countdown';
      });

      if (countdownWidget) {
        countdownWidget.data.events.push(action.event);
      }

      break;
    case 'removeWidgetItem':
      const widgetsList = draft.widgets.find((widget) => {
        return widget.type === action.widgetType;
      });

      if (action.widgetType === 'countdown') {
        const countdownWidgetEventToRemove = widgetsList?.data.events.findIndex((event) => {
          return event.id === action.uuid;
        });

        if (countdownWidgetEventToRemove) {
          widgetsList?.data.events.splice(countdownWidgetEventToRemove, 1);
        }
      }

      break;
    default:
      break;
  }

  return draft;
});