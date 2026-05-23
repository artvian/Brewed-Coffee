export interface Property {
  id: string;
  title: string;
  price: number; // in IDR
  location: string;
  type: 'Villa' | 'Apartment' | 'Mansion' | 'Lodge';
  description: string;
  areaSqft: number; // in m2
  bed: number;
  bath: number;
  image: string;
  tag?: string;
  rating: number;
  features: string[];
  isExclusive?: boolean;
  agent: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
  };
}

export interface PropertyFilter {
  type: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  location: string;
}

export interface Review {
  id: string;
  userName: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  date: string;
  time: string;
  message?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
