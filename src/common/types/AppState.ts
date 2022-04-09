import { CountdownFormat } from './amelia';

// App State
export interface IAppState {
  widgets: any[];
  sidebar: ISidebar;
}

// Sidebar
export interface ISidebar {
  isOpen: boolean;
  activeMenu: TActiveMenu;
  activeView: TActiveView;
}

// Countdown Widget
export interface ICountdownWidget {
  type: 'countdown';
  enabled: boolean;
  data: {
    events: IEvent[];
  };
}

export interface IEvent {
  id: string;
  name: string;
  date: string;
  format: CountdownFormat;
}
// End Countdown Widget

// Weather Widget
export interface IWeatherWidget {
  type: 'weather';
  enabled: boolean;
  data: {
    locations: Location[];
  };
}

export interface ILocation {
  id: string;
  lat: string;
  lng: string;
}
// End Weather Widget

// Auxiliary Types
export type TActiveMenu = 'add' | 'about' | 'config' | null;
export type TActiveView = 'add_countdown' | 'add_weather' | null;

// App State Actions
type TAction =
  | { type: 'addNewWidget'; widget: ICountdownWidget | IWeatherWidget }
  | { type: 'toggleSidebar' }
  | { type: 'setActiveMenu'; activeMenu: TActiveMenu }
  | { type: 'setActiveView'; activeView: TActiveView }
  | { type: 'addNewCountdownEvent'; event: IEvent }
  | { type: 'addNewWeatherLocation'; location: Location }
  | { type: 'removeWidgetItem'; uuid: string; widgetType: string };

export type TAppAction = TAction;
export type TAppDispatch = (action: TAppAction) => void;
