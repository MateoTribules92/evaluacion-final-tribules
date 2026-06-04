export interface Report {
  id: string;
  userId: string;
  imageUrl: string;
  category: string;
  description: string;
  priority: 'Alta' | 'Media' | 'Baja';
  recommendation: string;
  status: 'pendiente' | 'en_proceso' | 'resuelto';
  latitude: number;
  longitude: number;
  address: string;
  createdAt: any;
  updatedAt: any;
}