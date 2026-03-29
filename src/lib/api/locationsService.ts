export interface LocationState {
  name: string;
  cities: string[];
}

export interface LocationCountry {
  name: string;
  code: string;
  currency: string;
  phone_code: string;
  flag: string;
  states: Record<string, LocationState> | string[];
}

export type LocationData = Record<string, LocationCountry>;

export const fetchLocations = async (): Promise<LocationData> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/common/locations`;
  console.log('[LocationsService] Fetching from:', url);
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    const json = await response.json();
    console.log('[LocationsService] SUCCESS! Data received:', json);
    return json;
  } catch (err) {
    console.error('[LocationsService] FETCH FAILED:', err);
    throw err;
  }
};

/**
 * Robustly find matching country code in API response.
 */
export const countryCodeToKey: Record<string, string> = {
  '+1': 'USA',
  '+1-CA': 'CAN',
};

/**
 * Robustly extract state names.
 */
export const getStateNames = (locationData: any, countrySearch: string): string[] => {
  if (!locationData) return [];
  
  // Unwrap common "data" wrapper
  const data = locationData.data || locationData;
  const search = countrySearch.toUpperCase();
  
  // Find country in list of countries
  const countries = Object.values(data) as any[];
  const country = countries.find((c: any) => {
    const code = c?.code?.toUpperCase();
    const name = c?.name?.toUpperCase();
    return (
      code === search ||
      name === search ||
      (search === 'USA' && (name === 'UNITED STATES' || name === 'UNITED STATE')) ||
      (search === 'CAN' && (name === 'CANADA' || code === 'CA'))
    );
  }) || data[countrySearch] || data[search]; // Try direct key access

  if (!country) {
    console.warn(`[LocationsService] NO COUNTRY FOUND mapping to: ${countrySearch}`);
    return [];
  }

  const states = country.states;
  if (!states) {
    console.warn(`[LocationsService] Country "${country.name}" has no .states property`);
    return [];
  }

  // Handle states as array of strings, array of objects, or associative object
  const stateValues = Array.isArray(states) ? states : Object.values(states);
  const result = stateValues
    .map((s: any) => (typeof s === 'string' ? s : s?.name || s?.label))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  console.log(`[LocationsService] Successfully derived ${result.length} names for country:`, country.name);
  return result;
};
