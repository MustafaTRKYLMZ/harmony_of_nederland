export type Donation = {
  id: number;
  documentId?: string;
  amount: number;
  currency: 'EUR' | 'USD';
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorAddress?: string;
  donorCompany?: string;
  donationType: 'one-time' | 'monthly' | 'annual';
  message?: string;
  project?: string;
  anonymous: boolean;
  taxReceiptRequired: boolean;
  taxReceiptNumber?: string;
  date: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type DonationsResponse = {
  data: Donation[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
