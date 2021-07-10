// App State
export interface AppState {
  widgets: Widget[];
  sidebar: Sidebar;
}

// Sidebar
export interface Sidebar {
  isOpen: boolean;
  activeMenu: ActiveMenu;
  activeView: ActiveView;
}

// Widget
interface Widget {
  type: WidgetType;
  enabled: boolean;
  data: CountdownWidget;
}

// Countdown Widget
interface CountdownWidget {
  events: Event[];
}

interface Event {
  id: string;
  name: string;
  date: string;
  background: string;
}
// End Countdown Widget

// Auxiliary Types
type WidgetType = 'countdown';
export type ActiveMenu = 'add' | 'about' | 'config' | null;
export type ActiveView = 'add_countdown' | null;

// App State Actions
type Action =
  | { type: 'addNewWidget'; widget: Widget }
  | { type: 'toggleSidebar'; }
  | { type: 'setActiveMenu'; activeMenu: ActiveMenu }
  | { type: 'setActiveView'; activeView: ActiveView }
  | { type: 'addNewCountdownEvent'; event: Event }
  | { type: 'removeWidgetItem'; uuid: string; widgetType: string };

export type AppAction = Action;
export type AppDispatch = (action: AppAction) => void;
