// External Dependencies
import { useEffect } from 'react';

// Internal Dependencies
import { Menubar } from './modules/menubar/components/Menubar';
import { Widget } from './common/components/elements/Widget/Widget';

import Sidebar from './modules/sidebar/components/Sidebar';
import { CountdownWidget } from './modules/countdown/components/CountdownWidget';

import { AppStateProvider, useAppState, useAppDispatch } from './common/contexts/AppState';
import { initialAppState } from './common/state/state';
import { IEvent, ILocation } from './common/types/AppState';

// Styles
import './App.css';

/**
 * Home Page
 */
function Home() {
  const { widgets } = useAppState();

  const myWidgets = widgets.map((widget: any) => {
    if (widget.type === 'countdown') {
      return widget.data.events.map((countdownEvent: IEvent) => {
        return (
          <Widget
            uuid={countdownEvent.id}
            widgetType="countdown"
            key={countdownEvent.id}
            editAction={false}>
            <CountdownWidget
              eventName={countdownEvent.name}
              eventDate={countdownEvent.date}
              eventFormat={countdownEvent?.format ?? 'days'}
              eventEmoji={countdownEvent.emoji}
            />
          </Widget>
        );
      });
    }
    if (widget.type === 'weather') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return widget.data.locations.map((weatherLocation: ILocation) => {
        return null;
      });
    }

    return null;
  });

  return (
    <div className="mainContainer">
      {/* Menu Bar - Where the icons live */}
      <Menubar />
      {/* End Menu Bar */}

      {/* Side Bar - Where you can configure the widgets */}
      <Sidebar />
      {/* End Side Bar */}

      {/* Main Container */}
      <div className="container">
        <main className="main">{myWidgets}</main>

        <span className="attribution">
          Hand-crafted & Made with <span>♡</span> in Mexico
        </span>
      </div>
      {/* End Main Container */}
    </div>
  );
}

/**
 *
 */
function App() {
  const { sidebar } = useAppState();
  const dispatch = useAppDispatch();

  // Life-cycle Events
  useEffect(
    function toggleSidebar() {
      // Close the sidebar, in case it's open.
      if (sidebar.isOpen) {
        dispatch({
          type: 'toggleSidebar',
        });
      }
    },
    [dispatch, sidebar.isOpen]
  );

  return (
    <AppStateProvider initialStateOverride={initialAppState}>
      <Home />
    </AppStateProvider>
  );
}

export { App };
