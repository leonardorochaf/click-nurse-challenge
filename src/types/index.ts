
export interface Shift {
  id: string;
  companyName: string;
  position: string;
  date: string;
  startTime: string;
  endTime: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  salary: number;
  description: string;
  requirements: string[];
  benefits: string[];
  applied: boolean;
  createdAt: string;
}

export interface ShiftListResponse {
  shifts: Shift[];
  page: number;
  hasMore: boolean;
}
