import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { UserData } from "../hooks/useUser";

export async function crearUsuario(datos: UserData): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");

  await setDoc(doc(db, "users", uid), {
    name: datos.name,
    email: datos.email,
    role: datos.role || "citizen",
    createdAt: serverTimestamp(),
  });
}

export async function obtenerUsuario(): Promise<UserData | null> {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserData) : null;
}