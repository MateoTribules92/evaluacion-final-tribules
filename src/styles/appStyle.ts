import { StyleSheet, Platform } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7FAFC",
    padding: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "800", color: "#1A202C" },
  subtitle: { fontSize: 16, color: "#718096", marginTop: 4 },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 15, color: "#718096" },
  link: { fontSize: 15, color: "#4F46E5", fontWeight: "700" },
});

export const registerStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7FAFC",
    padding: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "800", color: "#1A202C" },
  subtitle: { fontSize: 16, color: "#718096", marginTop: 4 },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 15, color: "#718096" },
  link: { fontSize: 15, color: "#4F46E5", fontWeight: "700" },
});

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop:73,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  greeting: { fontSize: 20, fontWeight: "800", color: "#1A202C" },
  email: { fontSize: 13, color: "#718096", maxWidth: 220 },
  logoutBtn: {
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  logoutText: { color: "#E53E3E", fontWeight: "700", fontSize: 14 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorEmoji: { fontSize: 56, marginBottom: 12 },
  errorText: { fontSize: 16, color: "#718096", textAlign: "center" },
  countriesBtn: {
  backgroundColor: '#4F46E5',
  borderRadius: 10,
  padding: 12,
  alignItems: 'center',
  marginBottom: 16,
},
countriesBtnText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 15,
},
// Agrega dentro de homeStyles:
ecomapaContainer: {
  marginHorizontal: 20,
  marginBottom: 4,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
},
ecomapaTitle: {
  fontSize: 15,
  fontWeight: '700',
  color: '#1A202C',
  marginBottom: 12,
},
ecomapaButtons: {
  flexDirection: 'row',
  gap: 10,
},
ecomapaBtn: {
  flex: 1,
  backgroundColor: '#3FB950',
  borderRadius: 12,
  paddingVertical: 12,
  alignItems: 'center',
  gap: 4,
},
ecobtnOutline: {
  backgroundColor: '#F0FFF4',
  borderWidth: 1.5,
  borderColor: '#3FB950',
},
ecobtnEmoji: {
  fontSize: 22,
},
ecobtnText: {
  color: '#0D1117',
  fontWeight: '700',
  fontSize: 13,
},
ecobtnOutlineText: {
  color: '#3FB950',
},
ecomapaSubtitle: {
  fontSize: 13,
  color: '#718096',
  marginBottom: 16,
  marginTop: -4,
},
});

export const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  content: { padding: 24 },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { fontSize: 13, fontWeight: "700", color: "#4F46E5" },
  userId: { fontSize: 13, color: "#718096" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A202C",
    lineHeight: 30,
    textTransform: "capitalize",
  },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 20 },
  bodyLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A0AEC0",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  body: { fontSize: 16, color: "#4A5568", lineHeight: 26 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorEmoji: { fontSize: 56, marginBottom: 12 },
  errorText: { fontSize: 16, color: "#718096", textAlign: "center" },
});

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  text: { marginTop: 12, fontSize: 16, color: "#718096" },
});

export const buttonStyles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: "#4F46E5" },
  userId: { fontSize: 12, color: "#718096" },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A202C",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  body: { fontSize: 13, color: "#718096", lineHeight: 20 },
});

export const inputStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#2D3748", marginBottom: 6 },
  inputWrapper: { position: "relative" },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#2D3748",
    backgroundColor: "#F7FAFC",
  },
  inputError: { borderColor: "#E53E3E" },
  eyeIcon: { position: "absolute", right: 14, top: 12 },
  eyeText: { fontSize: 20 },
  errorText: { fontSize: 12, color: "#E53E3E", marginTop: 4 },
});
export const countryCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  flag: {
    width: 72,
    height: 46,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#EEF2FF',
  },
  info: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    color: '#718096',
    fontSize: 16,
  },
});

export const searchStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
  },
});

// Al final de tu archivo de estilos existente

export const newReportStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1117" },
  centered: { flex: 1, backgroundColor: "#0D1117", alignItems: "center", justifyContent: "center", padding: 24 },
  scrollContent: { padding: 20, paddingBottom: 40 },

  // Cámara
  camera: { flex: 1 },
  overlayTop: { padding: 20, paddingTop: Platform.OS === "ios" ? 60 : 40, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center" },
  cameraTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  cameraHint: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4, textAlign: "center" },
  frameguide: { flex: 1, margin: 40, borderWidth: 2, borderColor: "rgba(63,185,80,0.6)", borderRadius: 12 },
  overlayBottom: { alignItems: "center", paddingBottom: 40, backgroundColor: "rgba(0,0,0,0.5)", paddingTop: 16 },
  captureBtn: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, borderColor: "#fff", alignItems: "center", justifyContent: "center" },
  captureBtnInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#3FB950" },
  errorBanner: { color: "#F85149", fontSize: 12, marginBottom: 12, textAlign: "center", paddingHorizontal: 20 },

  // Procesando
  previewSmall: { width: 200, height: 150, borderRadius: 12, borderWidth: 1, borderColor: "#30363D" },
  processingTitle: { color: "#E6EDF3", fontSize: 18, fontWeight: "700", marginTop: 16 },
  processingSteps: { color: "#8B949E", fontSize: 14, marginTop: 12, textAlign: "center", lineHeight: 24 },

  // Resultado
  resultHeader: { color: "#3FB950", fontSize: 13, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, textAlign: "center" },
  previewFull: { width: "100%", height: 220, borderRadius: 12, borderWidth: 1, borderColor: "#30363D", marginBottom: 16 },
  card: { backgroundColor: "#161B22", borderRadius: 12, borderWidth: 1, borderColor: "#30363D", padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 4 },
  cardEmoji: { fontSize: 32, marginTop: 2 },
  cardCategoria: { color: "#E6EDF3", fontSize: 18, fontWeight: "700", marginBottom: 6 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#30363D", marginVertical: 12 },
  label: { color: "#8B949E", fontSize: 12, fontWeight: "600", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 },
  value: { color: "#E6EDF3", fontSize: 14, lineHeight: 20 },

  // Botones
  btnPrimary: { backgroundColor: "#3FB950", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  btnText: { color: "#0D1117", fontWeight: "700", fontSize: 15 },
  btnSecondary: { borderWidth: 1, borderColor: "#30363D", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  btnSecondaryText: { color: "#8B949E", fontSize: 15 },
  errorText: { color: "#F85149", fontSize: 16, marginBottom: 20, textAlign: "center" },
});

export const myReportsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1117" },
  centered: { flex: 1, backgroundColor: "#0D1117", alignItems: "center", justifyContent: "center", padding: 24 },
  listContent: { padding: 16, paddingBottom: 100 },
  screenTitle: { color: "#E6EDF3", fontSize: 24, fontWeight: "800", marginBottom: 16 },

  // Stats
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: "#161B22", borderRadius: 10, borderWidth: 1, padding: 10, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "800" },
  statLabel: { color: "#8B949E", fontSize: 10, marginTop: 2, textAlign: "center" },

  // Card reporte
  card: { backgroundColor: "#161B22", borderRadius: 12, borderWidth: 1, borderColor: "#30363D", marginBottom: 12, flexDirection: "row", overflow: "hidden" },
  thumbnail: { width: 90, height: 110 },
  thumbnailPlaceholder: { backgroundColor: "#1C2128", alignItems: "center", justifyContent: "center" },
  cardContent: { flex: 1, padding: 12, justifyContent: "space-between" },
  cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  categoriaText: { color: "#E6EDF3", fontSize: 13, fontWeight: "700", flex: 1, marginRight: 6 },
  estadoBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  estadoText: { fontSize: 10, fontWeight: "600" },
  descripcion: { color: "#8B949E", fontSize: 12, lineHeight: 17, marginBottom: 6 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  prioridadText: { fontSize: 11, fontWeight: "600" },
  fechaText: { color: "#8B949E", fontSize: 10 },
  coordText: { color: "#8B949E", fontSize: 10, marginTop: 3 },

  // Empty state
  emptyContainer: { alignItems: "center", paddingTop: 60, paddingHorizontal: 32 },
  emptyTitle: { color: "#E6EDF3", fontSize: 20, fontWeight: "700", marginBottom: 8 },
  emptySubtitle: { color: "#8B949E", fontSize: 14, textAlign: "center", lineHeight: 20, marginBottom: 24 },
  btnNuevo: { backgroundColor: "#3FB950", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  btnNuevoText: { color: "#0D1117", fontWeight: "700" },

  // FAB
  fab: { position: "absolute", bottom: 28, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: "#3FB950", alignItems: "center", justifyContent: "center", elevation: 8 },
  fabText: { color: "#0D1117", fontSize: 28, fontWeight: "300", lineHeight: 32 },

  // Loading / Error
  loadingText: { color: "#8B949E", marginTop: 12, fontSize: 14 },
  errorText: { color: "#F85149", fontSize: 14, textAlign: "center", marginBottom: 20 },
  retryBtn: { borderWidth: 1, borderColor: "#30363D", paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: "#E6EDF3", fontSize: 14 },
});