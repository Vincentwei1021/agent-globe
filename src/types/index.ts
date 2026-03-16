export interface Agent {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  createdAt: number; // timestamp ms
}

export interface GeoInfo {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  ip: string;
}

export interface GlobeStats {
  totalAgents: number;
  totalCities: number;
  totalCountries: number;
}
