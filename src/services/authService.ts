import { createUserWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { LoginForm, RegisterForm } from "../types/auth";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

//Inciar sesion
export const loginWithEmail = async(data: LoginForm)=>{
    return await signInWithEmailAndPassword(auth, data.email, data.password);
}

//Crear un usuario
export const registWithEmail = async (data: RegisterForm) : Promise<UserCredential>=> {
    return createUserWithEmailAndPassword(auth, data.email, data.password);
}

//Cerrar sesion
export const logout = async (): Promise<void>=>{
    return await signOut(auth);
}