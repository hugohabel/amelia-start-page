// Local Storage
export const LOCAL_STORAGE_VERIFICATION_KEY = 'isLocalStorageVerified';
export const LOCAL_STORAGE_VERIFICATION_VALUE = 'true';
export const LOCAL_STORAGE_STATE_KEY = 'amelia-state';

// String Templates - Time Diff
export const DAYS_DIFF_TEMPLATE = '%daysToken% days';
export const DAYS_HOURS_DIFF_TEMPLATE = '%daysToken% days %hoursToken% hours';

// Menu Bar - Options
export const MENUBAR_OPTIONS = [
  {
    title: 'Add',
    key: 'add'
  },
  {
    title: 'About',
    key: 'about'
  },
  {
    title: 'Config',
    key: 'config'
  }
];

// Error Messages
export const ERROR_MESSAGE_0001 = 'formatTimeDiff - format string has invalid value - %value%';

// Widgets List
export const WIDGETS_LIST = [
  {
    name: 'countdown',
    title: 'Countdown',
    status: 1,
  },
  {
    name: 'weather',
    title: 'Weather',
    status: 0,
  },
  {
    name: 'timezone',
    title: 'Timezone Converter',
    status: -1
  }
];

// Menu Bar and Widgets View Handler

type Option = {
  [key: string]: number
};

export const MENUBAR: Option = {
  ADD: 1
};
export const ACTIONS: Option = {
  ADD_COUNTDOWN: 10,
  ADD_WEATHER: 20,
};
