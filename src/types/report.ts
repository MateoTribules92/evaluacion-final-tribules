export interface Report {
  id?: string;
  userId: string;
  imageUrl: string;
  category: string;
  description: string;
  priority: "Alta" | "Media" | "Baja";
  recommendation: string;
  status: "Pendiente" | "En proceso" | "Resuelto";
  latitude: number;
  longitude: number;
  createdAt: string;
  address: string;
}