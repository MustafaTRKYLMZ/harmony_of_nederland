export type ImageFormat = {
  url: string;
  width: number;
  height: number;
  name: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  path: string | null;
  sizeInBytes: number;
};

export type MediaBase = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Event = {
  id: number;
  documentId?: string;
  title: string;
  description: string;
  content?: string;
  slug: string;
  startDate: string;
  endDate: string;
  location: string;
  eventType: "cultural" | "educational" | "social" | "workshop" | "other";
  status: "draft" | "published" | "cancelled";
  featured: boolean;
  heroImage?: MediaBase | null;
  media?: MediaBase[];
  mediaUrls?: string[];
  registrationLink?: string | null;
  capacity?: number | null;
  requirements?: string | null;
  price?: number | null;
  currency?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type EventsResponse = {
  data: Event[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
