import { useState } from "react";
import { subirFoto, crearReporte, obtenerMisReportes } from "../services/reportesService";
import { Report } from "../types/report";

export const useReportes = () => {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guardarReporte = async (
    datos: Omit<Report, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'status'>,
    fotoUri: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await subirFoto(fotoUri);
      const id = await crearReporte({ ...datos, imageUrl });
      return id;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const cargarReportes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerMisReportes();
      setReportes(data as Report[]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { reportes, loading, error, guardarReporte, cargarReportes };
};