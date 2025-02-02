import { MediaBase } from './event';

export type Sponsor = {
  id: number;
  documentId?: string;
  name: string;
  logo?: MediaBase | null;
  website?: string;
  description?: string;
  sponsorshipLevel: 'platinum' | 'gold' | 'silver' | 'bronze';
  featured: boolean;
  startDate?: string;
  endDate?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  events?: { id: number }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type SponsorsResponse = {
  data: Sponsor[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
