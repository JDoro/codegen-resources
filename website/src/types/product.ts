export interface Product {
  id: string;
  name: string;
  description: string;
  website: string;
  hasIDEExtension: boolean;
  supportedIDEs: string[];
  pricing: 'Free' | 'Paid' | 'Freemium';
  language: string[];
  features: string[];
  company: string;
  content?: string;
  slug?: string;
  lastModified?: string;
}
