/**
 * MR. NEXORA PORTFOLIO | DATA LOADER
 * Centralized, cached JSON fetcher with error boundaries & fallbacks
 */

const dataCache = new Map();

/**
 * Loads a JSON data file from the /data directory with memory caching.
 * @param {string} fileName - Name of the file, e.g. "projects.json" or "projects"
 * @returns {Promise<any>} Parsed JSON content or null on error
 */
export async function loadData(fileName) {
  const normalizedName = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
  
  if (dataCache.has(normalizedName)) {
    return dataCache.get(normalizedName);
  }

  // Determine correct relative path for both local and GitHub Pages subdirectory
  const basePath = './data/';
  const fullUrl = `${basePath}${normalizedName}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to load ${fullUrl}`);
    }

    const data = await response.json();
    dataCache.set(normalizedName, data);
    return data;
  } catch (error) {
    console.error(`[DataLoader] Error loading ${normalizedName}:`, error);
    return null;
  }
}

/**
 * Pre-fetches common essential JSON files for snappy navigation.
 */
export async function preloadCommonData() {
  const coreFiles = ['site.json', 'personal.json', 'navigation.json', 'social.json'];
  return Promise.all(coreFiles.map(file => loadData(file)));
}
