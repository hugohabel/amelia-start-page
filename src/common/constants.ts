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

// Date Input Constants
export const MONTHS_INPUT = [
  {
    value: '01',
    text: 'January'
  },
  {
    value: '02',
    text: 'February'
  },
  {
    value: '03',
    text: 'March'
  },
  {
    value: '04',
    text: 'April'
  },
  {
    value: '05',
    text: 'May'
  },
  {
    value: '06',
    text: 'June'
  },
  {
    value: '07',
    text: 'July'
  },
  {
    value: '08',
    text: 'August'
  },
  {
    value: '09',
    text: 'September'
  },
  {
    value: '10',
    text: 'October'
  },
  {
    value: '11',
    text: 'November'
  },
  {
    value: '12',
    text: 'December'
  }
];
export const DAYS_INPUT = [
  {
    value: '1',
    text: '01'
  },
  {
    value: '2',
    text: '02'
  },
  {
    value: '3',
    text: '03'
  },
  {
    value: '4',
    text: '04'
  },
  {
    value: '5',
    text: '05'
  },
  {
    value: '6',
    text: '06'
  },
  {
    value: '7',
    text: '07'
  },
  {
    value: '8',
    text: '08'
  },
  {
    value: '9',
    text: '09'
  },
  {
    value: '10',
    text: '10'
  },
  {
    value: '11',
    text: '11'
  },
  {
    value: '12',
    text: '12'
  },
  {
    value: '13',
    text: '13'
  },
  {
    value: '14',
    text: '14'
  },
  {
    value: '15',
    text: '15'
  },
  {
    value: '16',
    text: '16'
  },
  {
    value: '17',
    text: '17'
  },
  {
    value: '18',
    text: '18'
  },
  {
    value: '19',
    text: '19'
  },
  {
    value: '20',
    text: '20'
  },
  {
    value: '21',
    text: '21'
  },
  {
    value: '22',
    text: '22'
  },
  {
    value: '23',
    text: '23'
  },
  {
    value: '24',
    text: '24'
  },
  {
    value: '25',
    text: '25'
  },
  {
    value: '26',
    text: '26'
  },
  {
    value: '27',
    text: '27'
  },
  {
    value: '28',
    text: '28'
  },
  {
    value: '29',
    text: '29'
  },
  {
    value: '30',
    text: '30'
  },
  {
    value: '31',
    text: '31'
  },
];
export const YEARS_INPUT = [
  {
    value: '2021',
    text: '2021'
  },
  {
    value: '2022',
    text: '2022'
  },
  {
    value: '2023',
    text: '2023'
  },
  {
    value: '2024',
    text: '2024'
  },
  {
    value: '2025',
    text: '2025'
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
  ADD_COUNTDOWN: 10
};
