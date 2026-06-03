import { axiosInstance, countriesInstance } from "../api/axiosInstance"
import { Country, Post } from "../types/api"


const FIELDS = 'name,flags,population,region,capital,languages,currencies,area,cca3';

export const getPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>("/posts");
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await axiosInstance.get<Post>(`/posts/${id}`);
  return response.data;
};

//Paises
export const getCountries = async (): Promise<Country[]> => {
  const response = await countriesInstance.get<Country[]>(
    `/all?fields=${FIELDS}`
  );
  return response.data.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
};

export const getCountryByCode = async (code: string): Promise<Country> => {
  const response = await countriesInstance.get<Country>(
    `/alpha/${code}?fields=${FIELDS}`
  );
  return response.data; 
};