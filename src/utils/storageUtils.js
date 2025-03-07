/**
 * Storage utility functions for managing localStorage
 */

/**
 * Check if localStorage is available in the browser
 * @returns {boolean} True if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Save data to localStorage
 * @param {string} key Key to store data under
 * @param {any} data Data to store (will be JSON stringified)
 * @returns {boolean} True if successful
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param {string} key Key to retrieve data from
 * @param {any} defaultValue Default value if key doesn't exist
 * @returns {any} The parsed data or defaultValue
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
    return defaultValue;
  }
};