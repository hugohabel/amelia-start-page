// External Dependencies
import { useEffect } from 'react';

// Internal Dependencies
import Menubar from './modules/menubar/components/Menubar';
import Sidebar from './modules/sidebar/components/Sidebar';
import Widget from './common/components/elements/Widget/Widget';
import CountdownWidget from './modules/countdown/components/CountdownWidget';
import { AppStateProvider } from './common/contexts/AppState';
import { initialAppState } from './common/state/state';
import { useAppState, useAppDispatch } from './common/contexts/AppState';

// Styles
import './App.css';

function Home() {
  const { widgets } = useAppState();

  return (
    <>
      <div className="mainContainer">
        { /* Menu Bar */ }
        <Menubar />
        { /* End Menu Bar */ }

        { /* Side Bar */ }
        <Sidebar />
        { /* End Side Bar */ }

        { /* Main Container */ }
        <div className="container">
          <main className="main">
            {widgets[0].data.events.map((widget) => {
              return (
                <Widget style={{backgroundImage: `url(${widget.background})`, backgroundSize: "cover"}} uuid={widget.id} widgetType="countdown" key={widget.id} editAction={false}>
                  <CountdownWidget eventName={widget.name} eventDate={widget.date} />
                </Widget>
              );
            })}
          </main>
        </div>
        { /* End Main Container */ }
      </div>
    </>
  );
}

function App() {
  const { sidebar } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(function () {
    if (sidebar.isOpen) {
      dispatch({
        type: 'toggleSidebar'
      });
    }
  }, [dispatch, sidebar.isOpen]);

  return (
    <>
      <AppStateProvider initialStateOverride={initialAppState}>
        <Home />
      </AppStateProvider>
    </>
  )
}

export default App;