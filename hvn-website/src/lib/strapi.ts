import { Event, EventsResponse } from "@/types/event";
import { format } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string): Promise<any> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const apiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  console.log(`[fetchAPI] Environment variables:`, {
    apiUrl,
    hasToken: !!apiToken,
  });

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined");
  }

  const requestUrl = `${apiUrl}/api${path}`;
  console.log(`[fetchAPI] Making request to: ${requestUrl}`);

  try {
    const response = await fetch(requestUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
      },
    });

    console.log(`[fetchAPI] Response status:`, response.status);

    if (!response.ok) {
      console.error(`[fetchAPI] HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[fetchAPI] Response data:`, data);
    return data;
  } catch (error) {
    console.error(`[fetchAPI] Error:`, error);
    throw error;
  }
}

/**
 * Get all events from Strapi
 * @param locale Language locale
 * @param page Page number
 * @param pageSize Number of items per page
 * @param isPast Whether to fetch past events
 * @param fromDate Optional date filter
 * @param includeFilter Whether to include date filter
 * @returns Events data and pagination
 */
export async function getAllEvents(
  locale = "en",
  page = 1,
  pageSize = 9,
  isPast = false,
  fromDate?: string,
  includeFilter = true
): Promise<EventsResponse> {
  try {
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    
    let dateFilter = "";
    if (includeFilter) {
      dateFilter = fromDate
        ? `&filters[startDate][$gte]=${fromDate}`
        : isPast
        ? `&filters[startDate][$lt]=${formattedDate}`
        : `&filters[startDate][$gte]=${formattedDate}`;
    }

    const url = `/events?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=startDate:${isPast ? 'desc' : 'asc'}${dateFilter}`;
    console.log(`[getAllEvents] Fetching URL:`, url);

    const data = await fetchAPI(url);
    console.log(`[getAllEvents] Raw response:`, JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error(`[getAllEvents] Error:`, error);
    throw error;
  }
}

/**
 * Get latest events from Strapi
 * @param locale Language locale
 * @param limit Number of events to fetch
 * @returns Events data
 */
export async function getLatestEvents(
  locale = "en",
  limit = 3
): Promise<EventsResponse> {
  try {
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    const data = await fetchAPI(
      `/events?populate=*&locale=${locale}&pagination[limit]=${limit}&sort=startDate:asc&filters[startDate][$gte]=${formattedDate}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get past events from Strapi
 * @param locale Language locale
 * @param page Page number
 * @param pageSize Number of items per page
 * @returns Events data and pagination
 */
export async function getPastEvents(
  locale = "en",
  page = 1,
  pageSize = 9
): Promise<EventsResponse> {
  try {
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    const data = await fetchAPI(
      `/events?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=startDate:desc&filters[startDate][$lt]=${formattedDate}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get event by slug from Strapi
 * @param slug Event slug
 * @param locale Language locale
 * @returns Event data
 */
export async function getEventBySlug(
  slug: string,
  locale = "en"
): Promise<Event | null> {
  try {
    console.log(`[getEventBySlug] Fetching event with slug: ${slug}, locale: ${locale}`);
    
    const url = `/events?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*&locale=${locale}`;
    console.log(`[getEventBySlug] API URL: ${url}`);
    
    const data = await fetchAPI(url);
    console.log(`[getEventBySlug] Raw API response:`, data);

    if (!data?.data?.[0]) {
      console.log(`[getEventBySlug] No event found for slug: ${slug}`);
      return null;
    }

    const eventData = data.data[0];
    console.log(`[getEventBySlug] Event data before transform:`, eventData);

    const transformedEvent = transformEventData(eventData);
    console.log(`[getEventBySlug] Transformed event:`, transformedEvent);

    return transformedEvent;
  } catch (error) {
    console.error(`[getEventBySlug] Error fetching event:`, error);
    throw error;
  }
}

/**
 * Get event by ID from Strapi
 * @param id Event ID
 * @param locale Language locale
 * @returns Event data
 */
export async function getEventById(
  id: number,
  locale = "en"
): Promise<Event | null> {
  try {
    const response = await fetchAPI(
      `/events/${id}?populate=heroImage&locale=${locale}`
    );

    if (!response?.data) {
      return null;
    }

    const event = response.data;
    return transformEventData(event);
  } catch (error) {
    throw error;
  }
}

/**
 * Get event localizations from Strapi
 * @param id Event ID
 * @returns List of event localizations
 */
export async function getEventLocalizations(id: number): Promise<string[]> {
  try {
    const data = await fetchAPI(`/events/${id}/localizations?populate=*`);
    return data.map((localization: any) => localization.locale);
  } catch (error) {
    throw error;
  }
}

function transformEventData(eventData: any): Event {
  console.log(`[transformEventData] Starting transformation for event:`, eventData.id);
  
  // Event verisi doğrudan geliyor, attributes içinde değil
  const transformed = {
    id: eventData.id,
    documentId: eventData.documentId,
    title: eventData.title,
    slug: eventData.slug,
    description: eventData.description,
    content: eventData.content,
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    location: eventData.location,
    capacity: eventData.capacity,
    requirements: eventData.requirements,
    price: eventData.price,
    status: eventData.status,
    featured: eventData.featured,
    eventType: eventData.eventType,
    registrationLink: eventData.registrationLink,
    heroImage: eventData.heroImage || null,
    media: eventData.media || [],
    mediaUrls: eventData.mediaUrls || [],
    sponsors: eventData.sponsors || [],
    partners: eventData.partners || [],
    createdAt: eventData.createdAt,
    updatedAt: eventData.updatedAt,
    publishedAt: eventData.publishedAt,
    locale: eventData.locale,
  };

  console.log(`[transformEventData] Transformed event:`, transformed);
  return transformed;
}
