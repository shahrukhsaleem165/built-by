
export interface PortfolioItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  link: string;
  categories: string[];
  imageUrl: string;
  year: string;
  client: string;
}

export type Category = 'All' | 'Design' | 'Development' | 'Branding' | '3D' | 'Marketing';
