// App State
export interface AppState {
  widgets: any[];
  sidebar: Sidebar;
}

// Sidebar
export interface Sidebar {
  isOpen: boolean;
  activeMenu: ActiveMenu;
  activeView: ActiveView;
}

// Countdown Widget
export interface CountdownWidget {
  type: "countdown";
  enabled: boolean;
  data: {
    events: Event[]
  }
}

export interface Event {
  id: string;
  name: string;
  date: string;
  background: string;
}
// End Countdown Widget

// Weather Widget
export interface WeatherWidget {
  type: "weather";
  enabled: boolean;
  data: {
    locations: Location[];
  }
}

export interface Location {
  id: string;
  lat: string;
  lng: string;
}
// End Weather Widget

// Auxiliary Types
export type ActiveMenu = 'add' | 'about' | 'config' | null;
export type ActiveView = 'add_countdown' | 'add_weather' | null;

// App State Actions
type Action =
  | { type: 'addNewWidget'; widget: CountdownWidget | WeatherWidget }
  | { type: 'toggleSidebar'; }
  | { type: 'setActiveMenu'; activeMenu: ActiveMenu }
  | { type: 'setActiveView'; activeView: ActiveView }
  | { type: 'addNewCountdownEvent'; event: Event }
  | { type: 'addNewWeatherLocation'; location: Location }
  | { type: 'removeWidgetItem'; uuid: string; widgetType: string };

export type AppAction = Action;
export type AppDispatch = (action: AppAction) => void;
