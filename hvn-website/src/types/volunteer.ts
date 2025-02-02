import { MediaBase } from './event';

export type EmergencyContact = {
  id: number;
  name: string;
  phone: string;
  relationship?: string;
};

export type Volunteer = {
  id: number;
  documentId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  skills?: string;
  interests?: string;
  languages?: string[];
  status: 'active' | 'inactive' | 'pending';
  volunteerType: 'regular' | 'occasional' | 'student' | 'professional';
  availability?: {
    [key: string]: string[];
  };
  preferredTasks?: string[];
  certifications?: {
    name: string;
    issueDate: string;
    expiryDate?: string;
  }[];
  emergencyContact: EmergencyContact;
  events?: { id: number }[];
  photo?: MediaBase | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type VolunteersResponse = {
  data: Volunteer[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
