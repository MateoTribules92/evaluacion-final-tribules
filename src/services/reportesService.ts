import {
  collection, addDoc, getDocs,
  query, where, orderBy, serverTimestamp, doc, updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../config/firebase"; // ← tu ruta existente

export interface ReporteInput {
  imageUrl: string;      
  category: string;
  description: string;
  priority: string;
  recommendation: string;
  latitude: number;
  longitude: number;
  address?: string;
}

export async function subirFoto(localUri: string): Promise<string> {
  const response = await fetch(localUri);
  const blob = await response.blob();
  const uid = auth.currentUser?.uid || "anonimo";
  const filename = `reports/${uid}/${Date.now()}.jpg`;  
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}

export async function crearReporte(datos: ReporteInput): Promise<string> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");

  const docRef = await addDoc(collection(db, "reportes"), {
    uidUsuario: uid,
    ...datos,
    estado: "pendiente",
    fechaCreacion: serverTimestamp(),
  });
  return docRef.id;
}

export async function obtenerMisReportes() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");

  const q = query(
    collection(db, "reportes"),
    where("uidUsuario", "==", uid),
    //orderBy("fechaCreacion", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function actualizarEstado(reporteId: string, nuevoEstado: string) {
  await updateDoc(doc(db, "reportes", reporteId), { estado: nuevoEstado });
}