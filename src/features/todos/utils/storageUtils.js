/**
 * Storage utilities specifically for the todos feature
 */

// Check if local storage is available
export function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Save data to local storage
export function saveToStorage(key, data) {
  if (!isStorageAvailable()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving to storage:', e);
    return false;
  }
}

// Load data from local storage
export function loadFromStorage(key, defaultValue = null) {
  if (!isStorageAvailable()) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error loading from storage:', e);
    return defaultValue;
  }
}
