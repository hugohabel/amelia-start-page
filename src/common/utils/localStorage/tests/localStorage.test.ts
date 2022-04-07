// Internal Dependencies
import { SafeLocalStorage } from '../localStorage';

// Variables
let savedLocalStorage: Storage;

// Test Suite
describe('Local Storage - In Memory', () => {
  // Setup and Teardown
  beforeAll(() => {
    savedLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', { value: undefined });
  });

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', { value: savedLocalStorage });
  });

  // Test Cases
  it('creates a working SafeLocalStorage when localStorage is unavailable', () => {
    const safeLocalStorage = SafeLocalStorage.getInstance();
    expect(safeLocalStorage.length).toEqual(0);

    safeLocalStorage.setItem('Key', 'Value');
    expect(safeLocalStorage.length).toEqual(1);

    let result = safeLocalStorage.getItem('Key');
    expect(result).toEqual('Value');

    safeLocalStorage.setItem('Key', 'NewValue');
    expect(safeLocalStorage.length).toEqual(1);

    result = safeLocalStorage.getItem('Key');
    expect(result).toEqual('NewValue');

    safeLocalStorage.setItem('SecondKey', 'SecondValue');
    expect(safeLocalStorage.length).toEqual(2);

    result = safeLocalStorage.getItem('SecondKey');
    expect(result).toEqual('SecondValue');

    result = safeLocalStorage.key(1);
    expect(result).toEqual('SecondKey');

    result = safeLocalStorage.key(10);
    expect(result).toBeNull();

    safeLocalStorage.removeItem('SecondKey');
    expect(safeLocalStorage.length).toEqual(1);

    result = safeLocalStorage.getItem('SecondKey');
    expect(result).toEqual(null);

    safeLocalStorage.clear();
    expect(safeLocalStorage.length).toEqual(0);
  });
});
