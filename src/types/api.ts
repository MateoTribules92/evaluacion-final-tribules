export interface Post {
    userId: number,
    id: number,
    tittle: string,
    body: string
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Country {
  name: { common: string; official: string };
  flags: { png: string; svg: string; alt: string };
  population: number;
  region: string;
  capital: string[];
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  area: number;
  cca3: string;
}