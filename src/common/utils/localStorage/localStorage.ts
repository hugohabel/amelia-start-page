// Internal Dependencies
import { LOCAL_STORAGE_VERIFICATION_KEY, LOCAL_STORAGE_VERIFICATION_VALUE } from '../../constants';
import { log } from '../logs/logs';

/**
 * Validates if window.localStorage is available.
 *
 * @returns Boolean True if window.localStorage is available, false otherwise.
 */
function isLocalStorageAvailable(): boolean {
  /* istanbul ignore else */
  if (typeof window !== 'undefined') {
    /* istanbul ignore next */
    if (window.localStorage) {
      try {
        window.localStorage.setItem(
          LOCAL_STORAGE_VERIFICATION_KEY,
          LOCAL_STORAGE_VERIFICATION_VALUE
        );
        const result = window.localStorage.getItem(LOCAL_STORAGE_VERIFICATION_KEY);

        if (result === LOCAL_STORAGE_VERIFICATION_VALUE) {
          return true;
        }
      } catch (e) {
        log({
          level: 'error',
          message: 'Could not write and read from local storage',
          file: 'localStorage.ts',
          location: 'isLocalStorageAvailable',
        });
        return false;
      }
    }
    log({
      level: 'error',
      message: 'Property localStorage is not available in window object',
      file: 'localStorage.ts',
      location: 'isLocalStorageAvailable',
    });
  }
  log({
    level: 'error',
    message: 'window object is undefined',
    file: 'localStorage.ts',
    location: 'isLocalStorageAvailable',
  });
  return false;
}

/**
 * Provides an easy way to access CRUD operations for Local Storage.
 */
export class SafeLocalStorage implements Storage {
  private static instance: SafeLocalStorage;

  isLocalStorageAvailable: boolean;

  internalStorage: { [key: string]: string };

  length: number;

  private constructor() {
    this.isLocalStorageAvailable = isLocalStorageAvailable();
    this.internalStorage = {};
    this.length = Object.keys(this.internalStorage).length;
  }

  public static getInstance(): SafeLocalStorage {
    /* istanbul ignore next */
    if (typeof window === 'undefined') {
      return new SafeLocalStorage();
    }

    if (!SafeLocalStorage.instance) {
      SafeLocalStorage.instance = new SafeLocalStorage();
    }

    return SafeLocalStorage.instance;
  }

  clear(): void {
    /* istanbul ignore if */
    if (this.isLocalStorageAvailable) {
      /* istanbul ignore next */
      localStorage.clear();
    } else {
      this.internalStorage = {};
    }
    this.length = 0;
  }

  getItem(key: string): string | null {
    /* istanbul ignore if */
    if (this.isLocalStorageAvailable) {
      /* istanbul ignore next */
      return localStorage.getItem(key);
    }

    if (Object.prototype.hasOwnProperty.call(this.internalStorage, key)) {
      return this.internalStorage[key];
    }

    return null;
  }

  key(index: number): string | null {
    /* istanbul ignore if */
    if (this.isLocalStorageAvailable) {
      /* istanbul ignore next */
      return localStorage.key(index);
    }

    const keys = Object.keys(this.internalStorage);
    if (keys.length > 0 && index < keys.length) {
      keys.sort();
      return keys[index];
    }

    return null;
  }

  removeItem(key: string): void {
    /* istanbul ignore if */
    if (this.isLocalStorageAvailable) {
      /* istanbul ignore next */
      localStorage.removeItem(key);
      /* istanbul ignore next */
      this.length = localStorage.length;
    } else {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(this.internalStorage, key)) {
        delete this.internalStorage[key];
      }
      this.length = Object.keys(this.internalStorage).length;
    }
  }

  setItem(key: string, value: string): void {
    /* istanbul ignore if */
    if (this.isLocalStorageAvailable) {
      /* istanbul ignore next */
      localStorage.setItem(key, value);
      /* istanbul ignore next */
      this.length = localStorage.length;
    } else {
      this.internalStorage[key] = value;
      this.length = Object.keys(this.internalStorage).length;
    }
  }
}
