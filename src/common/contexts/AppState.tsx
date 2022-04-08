// External Dependencies
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { debounce } from 'lodash';

// Internal Dependencies
import { LOCAL_STORAGE_STATE_KEY } from '../constants';
import { TAppAction, TAppDispatch, IAppState } from '../types/AppState';
import { SafeLocalStorage } from '../utils/localStorage/localStorage';
import { initialAppState, rootReducer } from '../state/state';

// Interfaces + Types
interface IAppStateProviderProps {
  children: ReactNode;
  initialStateOverride?: IAppState;
}

// Utility Functions

/**
 * Retrieves state from local storage or initializes with default state.
 *
 * @param defaultState AppState   Default app state.
 * @returns AppState  State (can be an existing one, or a default one)
 */
function getStateFromLocalStorageOrInitialize(defaultState: IAppState) {
  const stateFromLocalStorage = SafeLocalStorage.getInstance().getItem(LOCAL_STORAGE_STATE_KEY);
  if (stateFromLocalStorage) {
    return JSON.parse(stateFromLocalStorage) as IAppState;
  }
  return defaultState;
}

/**
 * Persists app state in memory or in local storage
 *
 * @param state AppState  State to be persisted.
 */
function persistState(state: IAppState) {
  SafeLocalStorage.getInstance().setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(state));
}

const debouncePersistState = debounce(persistState, 500, {
  leading: false,
  trailing: true,
  maxWait: 1000,
});

function reducerWrapper(state: IAppState, action: TAppAction) {
  const nextState = rootReducer(state, action);
  debouncePersistState(nextState);
  return nextState;
}

// Create Contexts
const AppStateContext = createContext<IAppState>(initialAppState);
const AppDispatchContext = createContext<TAppDispatch>(() =>
  // eslint-disable-next-line no-console
  console.warn('Calling default dispatch is a no-op!')
);

/**
 * App State Provider
 *
 * @param param AppStateProviderProps Props to initialize the app state provider.
 * @returns JSX App Dispatch and App State Contexts.
 */
export function AppStateProvider({ children, initialStateOverride }: IAppStateProviderProps) {
  const hydratedInitialAppState = {
    ...initialAppState,
  };

  const [state, dispatch] = useReducer(
    reducerWrapper,
    initialStateOverride ?? hydratedInitialAppState,
    getStateFromLocalStorageOrInitialize
  );

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}

AppStateProvider.defaultProps = {
  initialStateOverride: undefined,
};

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
