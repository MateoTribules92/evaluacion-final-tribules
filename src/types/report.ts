export interface Reporte {
  id: string;
  uidUsuario: string;
  fotoUrl: string;
  categoria: string;
  descripcionIA: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  recomendacion: string;
  latitud: number;
  longitud: number;
  estado: 'pendiente' | 'en_proceso' | 'resuelto';
  fechaCreacion: any;
}