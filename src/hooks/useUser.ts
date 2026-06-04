import { useState, useEffect } from "react";
import { crearUsuario, obtenerUsuario } from "../services/userService";

export interface UserData {
  name: string;
  email: string;
  role?: string;
}

export const useUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuario = async () => {
    setLoading(true);
    try {
      const data = await obtenerUsuario();
      setUserData(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const registrarUsuario = async (datos: UserData) => {
    setLoading(true);
    setError(null);
    try {
      await crearUsuario(datos);
      setUserData(datos);
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  return { userData, loading, error, registrarUsuario, fetchUsuario };
};