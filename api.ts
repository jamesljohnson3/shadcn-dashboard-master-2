import type { AirtableApiResponse, VehicleRecord } from '@/types/api';

const apiBaseUrl = process.env.AIRTABLE_API_BASE_URL || 'https://api.airtable.com/v0/appWP7hhHaQEEsFgt/table%201';
const apiKey = process.env.AIRTABLE_API_KEY || 'keyFAD4ggDcgVbvQ9';

const api = {
  list: async (): Promise<VehicleRecord[]> => {
    const response = await fetch(`${apiBaseUrl}?api_key=${apiKey}`);
    const data: AirtableApiResponse = await response.json();
    return data.records;
  },
  fetch: async (id: string): Promise<VehicleRecord | undefined> => {
    const response = await fetch(`${apiBaseUrl}/${id}?api_key=${apiKey}`);
    const data: { fields: VehicleRecord['fields'] } = await response.json();
    return { id, createdTime: '', fields: data.fields };
  },
  cache: {
    get: async (id: string): Promise<VehicleRecord | null> => {
      // Implement caching logic using the API if needed
      return null;
    },
    set: async (products: VehicleRecord[]): Promise<void> => {
      // Implement caching logic using the API if needed
    },
  },
};

export default api;
