import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getStrapi<T>(
  endpoint: string,
  query?: Record<string, any>
): Promise<StrapiResponse<T>> {
  const queryString = query ? `?${qs.stringify(query)}` : '';
  const response = await fetch(`${STRAPI_URL}/api${endpoint}${queryString}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  return response.json();
}
