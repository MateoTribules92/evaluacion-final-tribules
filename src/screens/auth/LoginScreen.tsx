import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/typeNavigation";
import { LoginForm } from "../../types/auth";
import { isValidEmail, isValidPassword } from "../../utils/validators";
import { loginStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { FirebaseError } from "firebase/app";
import { loginWithEmail } from "../../services/authService";

type LoginScreenNavigationProp = StackScreenProps<AuthStackParamList, "Login">;

const FEATURES = [
  { emoji: "📷", label: "Captura incidentes" },
  { emoji: "🤖", label: "IA analiza la imagen" },
  { emoji: "📍", label: "Geolocalización GPS" },
  { emoji: "☁️", label: "Guardado en la nube" },
];

export const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" });

  const handleInputChange = (key: string, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    if (!isValidEmail(loginForm.email)) {
      setEmailError("Ingresa un email válido");
      valid = false;
    }
    if (!isValidPassword(loginForm.password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await loginWithEmail({ email: loginForm.email, password: loginForm.password });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const msg =
          error.code === "auth/invalid-credential"
            ? "Email o contraseña incorrectos."
            : "Error al iniciar. Intenta más tarde.";
        Alert.alert("Error", msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#080C10" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#080C10" />
      <ScrollView
        contentContainerStyle={loginStyles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={loginStyles.hero}>
          <View style={loginStyles.logoBg}>
            <Text style={{ fontSize: 42 }}>🌱</Text>
          </View>
          <Text style={loginStyles.appName}>EcoMapa IA</Text>
          <Text style={loginStyles.appTagline}>
            Reportes urbanos con inteligencia artificial
          </Text>
        </View>

        {/* ── Features strip ── */}
        <View style={loginStyles.featuresRow}>
          {FEATURES.map((f) => (
            <View key={f.label} style={loginStyles.featureItem}>
              <Text style={loginStyles.featureEmoji}>{f.emoji}</Text>
              <Text style={loginStyles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Divider ── */}
        <View style={loginStyles.dividerRow}>
          <View style={loginStyles.dividerLine} />
          <Text style={loginStyles.dividerText}>Inicia sesión</Text>
          <View style={loginStyles.dividerLine} />
        </View>

        {/* ── Form ── */}
        <View style={loginStyles.form}>
          <Input
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={loginForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />
          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={loginForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />
          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
            style={loginStyles.button}
          />
        </View>

        {/* ── Footer ── */}
        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>¿No tienes cuenta? </Text>
          <Text style={loginStyles.link} onPress={() => navigation.navigate("Register")}>
            Regístrate
          </Text>
        </View>

        {/* ── Badge ── */}
        <View style={loginStyles.badgeRow}>
          <Text style={loginStyles.badgeText}>🔒 Powered by Firebase + Gemini AI</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};