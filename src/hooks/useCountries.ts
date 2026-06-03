import { useEffect, useState } from "react";
import { Country } from "../types/api";
import { getCountries, getCountryByCode } from "../services/apiService";

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
        setFiltered(data);
      } catch (error) {
        setError('Error al cargar los países. Intente mas tarde.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(countries);
    } else {
      setFiltered(
        countries.filter(c =>
          c.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, countries]);

  return { countries: filtered, loading, error, search, setSearch };
};

export const useCountryDetail = (code: string) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(code);
        setCountry(data);
      } catch (error) {
        setError('Error al cargar el detalle.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  return { country, loading, error };
};