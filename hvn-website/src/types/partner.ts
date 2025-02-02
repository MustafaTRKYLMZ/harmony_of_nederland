import { MediaBase } from './event';

export type Partner = {
  id: number;
  documentId?: string;
  name: string;
  logo?: MediaBase | null;
  website?: string;
  description?: string;
  partnerType: 'cultural' | 'educational' | 'governmental' | 'nonprofit' | 'commercial';
  featured: boolean;
  startDate?: string;
  endDate?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialMedia?: {
    [platform: string]: string;
  };
  collaborationAreas?: string[];
  events?: { id: number }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type PartnersResponse = {
  data: Partner[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
