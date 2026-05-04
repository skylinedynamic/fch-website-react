import { fetchFromApi } from '@/lib/api/client';

export const locationsService = {
  fetchLocations: async () => {
    const data = await fetchFromApi('/common/locations');
    return data;
  },

  getStateNames: (locationData: any, countrySearch: string): string[] => {
    if (!locationData) return [];
    
    const data = locationData.data || locationData;
    const search = countrySearch.toUpperCase();
    
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
    }) || data[countrySearch] || data[search];

    if (!country) return [];

    const states = country.states;
    if (!states) return [];

    const stateValues = Array.isArray(states) ? states : Object.values(states);
    return stateValues
      .map((s: any) => (typeof s === 'string' ? s : s?.name || s?.label))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }
};
