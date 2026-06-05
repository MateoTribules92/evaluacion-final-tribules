import { StyleSheet, Platform } from "react-native";

// ── Paleta de colores global ─────────────────────────────────────
const C = {
  bg: "#080C10",
  bgCard: "#0F1318",
  bgInput: "#131920",
  border: "#1E2832",
  borderFocus: "#3FB950",
  green: "#3FB950",
  greenDim: "#1A3A24",
  greenGlow: "rgba(63,185,80,0.15)",
  blue: "#58A6FF",
  yellow: "#D29922",
  red: "#F85149",
  text: "#E6EDF3",
  textMuted: "#8B949E",
  textDim: "#4A5568",
  white: "#FFFFFF",
  purple: "#7C5CFF",
};

// ══════════════════════════════════════════════════════
// AUTH SCREENS
// ══════════════════════════════════════════════════════

export const loginStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: C.bg,
    padding: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: C.greenDim,
    borderWidth: 1,
    borderColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emoji: { fontSize: 36 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: C.text,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: C.textMuted, marginTop: 6 },
  form: {
    backgroundColor: C.bgCard,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: C.border,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 28 },
  footerText: { fontSize: 14, color: C.textMuted },
  link: { fontSize: 14, color: C.green, fontWeight: "700" },
  // Agrega dentro de loginStyles:
hero: { alignItems: "center", marginBottom: 28, marginTop: 16 },
logoBg: {
  width: 88,
  height: 88,
  borderRadius: 26,
  backgroundColor: "#1A3A24",
  borderWidth: 1.5,
  borderColor: "#3FB950",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
  shadowColor: "#3FB950",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
},
appName: {
  fontSize: 32,
  fontWeight: "800",
  color: "#E6EDF3",
  letterSpacing: -0.5,
  marginBottom: 6,
},
appTagline: {
  fontSize: 14,
  color: "#8B949E",
  textAlign: "center",
  lineHeight: 20,
  paddingHorizontal: 20,
},
featuresRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#0F1318",
  borderRadius: 16,
  padding: 16,
  marginBottom: 24,
  borderWidth: 1,
  borderColor: "#1E2832",
},
featureItem: { alignItems: "center", flex: 1 },
featureEmoji: { fontSize: 22, marginBottom: 6 },
featureLabel: {
  fontSize: 10,
  color: "#8B949E",
  textAlign: "center",
  fontWeight: "600",
},
dividerRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
  gap: 12,
},
dividerLine: { flex: 1, height: 1, backgroundColor: "#1E2832" },
dividerText: { color: "#4A5568", fontSize: 12, fontWeight: "600" },
badgeRow: {
  alignItems: "center",
  marginTop: 24,
  marginBottom: 8,
},
badgeText: {
  fontSize: 11,
  color: "#4A5568",
  fontWeight: "500",
},
});

export const registerStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: C.bg,
    padding: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: C.greenDim,
    borderWidth: 1,
    borderColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emoji: { fontSize: 36 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: C.text,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: C.textMuted, marginTop: 6 },
  form: {
    backgroundColor: C.bgCard,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: C.border,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 28 },
  footerText: { fontSize: 14, color: C.textMuted },
  link: { fontSize: 14, color: C.green, fontWeight: "700" },
});

// ══════════════════════════════════════════════════════
// HOME SCREEN
// ══════════════════════════════════════════════════════

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080C10" },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 48,
    paddingBottom: 16,
    backgroundColor: "#0F1318",
    borderBottomWidth: 1,
    borderBottomColor: "#1E2832",
  },
  greeting: { fontSize: 18, fontWeight: "800", color: "#E6EDF3", letterSpacing: -0.3 },
  email: { fontSize: 12, color: "#8B949E", marginTop: 2, maxWidth: 220 },
  logoutBtn: {
    backgroundColor: "rgba(248,81,73,0.1)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(248,81,73,0.3)",
  },
  logoutText: { color: "#F85149", fontWeight: "700", fontSize: 13 },

  // Hero Banner
  heroBanner: {
    margin: 16,
    backgroundColor: "#0F1318",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E2832",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  heroLeft: { flex: 1 },
  heroTag: {
    fontSize: 12,
    color: "#3FB950",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#E6EDF3",
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: 8,
  },
  heroSub: { fontSize: 12, color: "#8B949E", lineHeight: 18 },
  heroEmoji: { fontSize: 52, marginLeft: 12 },

  // Main Buttons
  mainButtons: { paddingHorizontal: 16, gap: 10, marginBottom: 8 },
  btnMain: {
    backgroundColor: "#3FB950",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  btnMainIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  btnMainTitle: { color: "#080C10", fontSize: 16, fontWeight: "800", letterSpacing: -0.3 },
  btnMainDesc: { color: "rgba(0,0,0,0.6)", fontSize: 12, marginTop: 2 },
  btnMainArrow: { color: "#080C10", fontSize: 22, fontWeight: "300" },

  btnSecond: {
    backgroundColor: "#0F1318",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1.5,
    borderColor: "#3FB950",
  },
  btnSecondIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(63,185,80,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondTitle: { color: "#3FB950", fontSize: 16, fontWeight: "800", letterSpacing: -0.3 },
  btnSecondDesc: { color: "#8B949E", fontSize: 12, marginTop: 2 },
  btnSecondArrow: { color: "#3FB950", fontSize: 22, fontWeight: "300" },

  // Section
  section: { paddingHorizontal: 16, marginTop: 16 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A5568",
    letterSpacing: 1.5,
    marginBottom: 14,
  },

  // Steps
  stepsRow: {
    flexDirection: "row",
    backgroundColor: "#0F1318",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E2832",
    position: "relative",
  },
  stepBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(63,185,80,0.1)",
    borderWidth: 1,
    borderColor: "rgba(63,185,80,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  stepTitle: { color: "#E6EDF3", fontSize: 11, fontWeight: "700", textAlign: "center" },
  stepDesc: { color: "#8B949E", fontSize: 9, textAlign: "center", marginTop: 2 },
  stepArrow: {
    position: "absolute",
    right: -8,
    top: 12,
    color: "#3FB950",
    fontSize: 20,
    fontWeight: "700",
  },

  // Categories
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: "#0F1318",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#1E2832",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryLabel: { color: "#8B949E", fontSize: 12, fontWeight: "600" },

  // Footer
  footerBadge: { alignItems: "center", paddingVertical: 24 },
  footerBadgeText: { fontSize: 11, color: "#4A5568" },

  // Legacy (mantener para no romper otras pantallas)
  ecomapaContainer: { margin: 16, backgroundColor: "#0F1318", borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#1E2832" },
  ecomapaHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6, gap: 8 },
  ecomapaTitle: { fontSize: 18, fontWeight: "800", color: "#E6EDF3" },
  ecomapaSubtitle: { fontSize: 13, color: "#8B949E", marginBottom: 20, lineHeight: 18 },
  ecomapaButtons: { flexDirection: "row", gap: 12 },
  ecomapaBtn: { flex: 1, backgroundColor: "#3FB950", borderRadius: 14, paddingVertical: 14, alignItems: "center", gap: 6 },
  ecobtnOutline: { backgroundColor: "rgba(63,185,80,0.1)", borderWidth: 1.5, borderColor: "#3FB950" },
  ecobtnEmoji: { fontSize: 24 },
  ecobtnText: { color: "#080C10", fontWeight: "800", fontSize: 13 },
  ecobtnOutlineText: { color: "#3FB950" },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#E6EDF3", paddingHorizontal: 20, paddingVertical: 12 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorEmoji: { fontSize: 56, marginBottom: 12 },
  errorText: { fontSize: 16, color: "#8B949E", textAlign: "center" },
  countriesBtn: { backgroundColor: "#7C5CFF", borderRadius: 10, padding: 12, alignItems: "center", marginBottom: 16 },
  countriesBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },

  summarySection: {
  paddingHorizontal: 16,
  marginTop: 8,
  marginBottom: 14,
},
summaryGrid: {
  gap: 10,
},
summaryTotalCard: {
  backgroundColor: "#0F1318",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "rgba(88,166,255,0.35)",
  padding: 16,
},
summaryRow: {
  flexDirection: "row",
  gap: 10,
},
summaryCard: {
  flex: 1,
  backgroundColor: "#0F1318",
  borderRadius: 16,
  borderWidth: 1,
  padding: 14,
  minHeight: 78,
  justifyContent: "center",
},
summaryValue: {
  fontSize: 24,
  fontWeight: "800",
},
summaryLabel: {
  color: "#8B949E",
  fontSize: 12,
  marginTop: 4,
},
summaryTotalValue: {
  color: "#58A6FF",
  fontSize: 30,
  fontWeight: "800",
},
summaryTotalLabel: {
  color: "#8B949E",
  fontSize: 13,
  marginTop: 4,
},
});

// ══════════════════════════════════════════════════════
// DETAIL SCREEN
// ══════════════════════════════════════════════════════

export const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  content: { padding: 24 },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "rgba(124,92,255,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(124,92,255,0.3)",
  },
  badgeText: { fontSize: 13, fontWeight: "700", color: C.purple },
  userId: { fontSize: 13, color: C.textMuted },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: C.text,
    lineHeight: 30,
    textTransform: "capitalize",
    letterSpacing: -0.3,
  },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 20 },
  bodyLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: C.textDim,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  body: { fontSize: 15, color: C.textMuted, lineHeight: 26 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  errorEmoji: { fontSize: 56, marginBottom: 12 },
  errorText: { fontSize: 16, color: C.textMuted, textAlign: "center" },
});

// ══════════════════════════════════════════════════════
// LOADING
// ══════════════════════════════════════════════════════

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.bg,
  },
  text: { marginTop: 12, fontSize: 15, color: C.textMuted },
});

// ══════════════════════════════════════════════════════
// BUTTON COMPONENT
// ══════════════════════════════════════════════════════

export const buttonStyles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: C.green,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: C.bg,
    letterSpacing: 0.2,
  },
});

// ══════════════════════════════════════════════════════
// CARD COMPONENT
// ══════════════════════════════════════════════════════

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: C.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "rgba(124,92,255,0.15)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(124,92,255,0.3)",
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: C.purple },
  userId: { fontSize: 12, color: C.textMuted },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: C.text,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  body: { fontSize: 13, color: C.textMuted, lineHeight: 20 },
});

// ══════════════════════════════════════════════════════
// INPUT COMPONENT
// ══════════════════════════════════════════════════════

export const inputStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: C.textMuted, marginBottom: 8, letterSpacing: 0.3 },
  inputWrapper: { position: "relative" },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: C.text,
    backgroundColor: C.bgInput,
  },
  inputError: { borderColor: C.red },
  eyeIcon: { position: "absolute", right: 14, top: 14 },
  eyeText: { fontSize: 20 },
  errorText: { fontSize: 12, color: C.red, marginTop: 6 },
});

// ══════════════════════════════════════════════════════
// COUNTRY CARD
// ══════════════════════════════════════════════════════

export const countryCardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: C.bgCard,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.border,
  },
  flag: {
    width: 72,
    height: 46,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: C.bgInput,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700", color: C.text, marginBottom: 4 },
  sub: { fontSize: 12, color: C.textMuted, marginTop: 2 },
  noResults: { textAlign: "center", marginTop: 40, color: C.textMuted, fontSize: 15 },
});

// ══════════════════════════════════════════════════════
// SEARCH
// ══════════════════════════════════════════════════════

export const searchStyles = StyleSheet.create({
  container: { marginHorizontal: 20, marginBottom: 12 },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: C.text,
    backgroundColor: C.bgInput,
  },
});

// ══════════════════════════════════════════════════════
// NEW REPORT SCREEN
// ══════════════════════════════════════════════════════

export const newReportStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  centered: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  scrollContent: { padding: 20, paddingBottom: 40 },

  // Inicio
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: C.greenDim,
    borderWidth: 1,
    borderColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  iconEmoji: { fontSize: 36 },
  cameraTitle: {
    color: C.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  cameraHint: {
    color: C.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  errorBanner: {
    color: C.red,
    fontSize: 12,
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(248,81,73,0.1)",
    paddingVertical: 8,
    borderRadius: 8,
    width: "100%",
  },

  // Procesando
  previewSmall: {
    width: 220,
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
  },
  processingTitle: {
    color: C.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 24,
    letterSpacing: -0.3,
  },
  processingSteps: {
    color: C.textMuted,
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 26,
  },

  // Resultado
  resultHeader: {
    color: C.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
    textAlign: "center",
  },
  previewFull: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 16,
  },
  card: {
    backgroundColor: C.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 18,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 4,
  },
  cardEmoji: { fontSize: 34, marginTop: 2 },
  cardCategoria: {
    color: C.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: "700" },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  label: {
    color: C.textDim,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  value: { color: C.textMuted, fontSize: 14, lineHeight: 22 },

  // Botones
  btnPrimary: {
    backgroundColor: C.green,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: { color: C.bg, fontWeight: "800", fontSize: 15, letterSpacing: 0.2 },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: C.border,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  btnSecondaryText: { color: C.textMuted, fontSize: 15 },
  errorText: { color: C.red, fontSize: 15, marginBottom: 20, textAlign: "center" },
});

// ══════════════════════════════════════════════════════
// MY REPORTS SCREEN
// ══════════════════════════════════════════════════════


export const myReportsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080C10" },
  centered: {
    flex: 1, backgroundColor: "#080C10",
    alignItems: "center", justifyContent: "center", padding: 24,
  },
  listContent: { padding: 16, paddingBottom: 110 },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingTop: Platform.OS === "ios" ? 8 : 4,
  },
  screenTitle: {
    color: "#E6EDF3", fontSize: 28, fontWeight: "800", letterSpacing: -0.5,
  },
  screenSubtitle: { color: "#8B949E", fontSize: 13, marginTop: 4 },
  headerIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: "rgba(63,185,80,0.1)",
    borderWidth: 1, borderColor: "rgba(63,185,80,0.3)",
    alignItems: "center", justifyContent: "center",
  },

  // Stats
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  statBox: {
    flex: 1, backgroundColor: "#0F1318", borderRadius: 12,
    borderWidth: 1, padding: 12, alignItems: "center",
  },
  statValue: { fontSize: 22, fontWeight: "800" },
  statLabel: { color: "#8B949E", fontSize: 10, marginTop: 3, textAlign: "center" },

  // Card
  card: {
    backgroundColor: "#0F1318",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E2832",
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
  },
  priorityBar: { width: 3, borderRadius: 3 },
  thumbnail: { width: 90, height: 115 },
  thumbnailPlaceholder: {
    backgroundColor: "#131920",
    alignItems: "center", justifyContent: "center",
  },
  cardContent: { flex: 1, padding: 12, justifyContent: "space-between" },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  categoriaText: {
    color: "#E6EDF3", fontSize: 13, fontWeight: "700",
    flex: 1, marginRight: 6,
  },
  estadoBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  estadoText: { fontSize: 10, fontWeight: "700" },
  descripcion: {
    color: "#8B949E", fontSize: 12, lineHeight: 18, marginBottom: 8,
  },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  prioBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  prioridadText: { fontSize: 11, fontWeight: "700" },
  fechaText: { color: "#4A5568", fontSize: 10 },
  coordText: { color: "#4A5568", fontSize: 10, marginTop: 4 },

  // Empty
  emptyContainer: { alignItems: "center", paddingTop: 60, paddingHorizontal: 32 },
  emptyIconBg: {
    width: 88, height: 88, borderRadius: 24,
    backgroundColor: "#0F1318",
    borderWidth: 1, borderColor: "#1E2832",
    alignItems: "center", justifyContent: "center", marginBottom: 20,
  },
  emptyTitle: {
    color: "#E6EDF3", fontSize: 22, fontWeight: "700",
    marginBottom: 8, letterSpacing: -0.3,
  },
  emptySubtitle: {
    color: "#8B949E", fontSize: 14, textAlign: "center",
    lineHeight: 22, marginBottom: 28,
  },
  btnNuevo: {
    backgroundColor: "#3FB950",
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14,
  },
  btnNuevoText: { color: "#080C10", fontWeight: "800", fontSize: 14 },

  // FAB
  fab: {
    position: "absolute", bottom: 28, right: 24,
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: "#3FB950",
    alignItems: "center", justifyContent: "center",
    elevation: 8,
    shadowColor: "#3FB950",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8,
  },
  fabText: { color: "#080C10", fontSize: 28, fontWeight: "300", lineHeight: 32 },

  // Loading / Error
  loadingText: { color: "#8B949E", marginTop: 14, fontSize: 14 },
  errorTitle: { color: "#E6EDF3", fontSize: 18, fontWeight: "700", marginBottom: 8 },
  errorText: { color: "#8B949E", fontSize: 14, textAlign: "center", marginBottom: 24 },
  retryBtn: {
    backgroundColor: "#0F1318",
    borderWidth: 1, borderColor: "#3FB950",
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12,
  },
  retryText: { color: "#3FB950", fontSize: 14, fontWeight: "700" },
});

export const reportDetailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080C10" },

  // Hero
  heroImage: { width: "100%", height: 260, backgroundColor: "#0F1318" },
  heroPlaceholder: {
    width: "100%", height: 200,
    backgroundColor: "#0F1318",
    alignItems: "center", justifyContent: "center",
    borderBottomWidth: 1, borderBottomColor: "#1E2832",
  },

  content: { padding: 20 },

  // Header
  headerSection: { flexDirection: "row", gap: 14, alignItems: "flex-start", marginBottom: 16 },
  emojiBox: {
    width: 60, height: 60, borderRadius: 16,
    backgroundColor: "rgba(63,185,80,0.1)",
    borderWidth: 1, borderColor: "rgba(63,185,80,0.3)",
    alignItems: "center", justifyContent: "center",
  },
  categoria: {
    color: "#E6EDF3", fontSize: 20, fontWeight: "800",
    letterSpacing: -0.3 as any, marginBottom: 8,
  },
  badgesRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "700" },

  divider: { height: 1, backgroundColor: "#1E2832", marginVertical: 16 },

  // Sections
  section: { marginBottom: 20 },
  sectionTitle: {
    color: "#8B949E", fontSize: 11, fontWeight: "700",
    letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12,
  },
  sectionBody: { color: "#E6EDF3", fontSize: 15, lineHeight: 24 },

  // Recomendación
  recomBox: {
    backgroundColor: "rgba(63,185,80,0.06)",
    borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: "rgba(63,185,80,0.2)",
  },
  recomTitle: {
    color: "#3FB950", fontSize: 12, fontWeight: "700",
    letterSpacing: 0.5, marginBottom: 8,
  },
  recomBody: { color: "#E6EDF3", fontSize: 14, lineHeight: 22 },

  // Info card
  infoCard: {
    backgroundColor: "#0F1318", borderRadius: 14,
    borderWidth: 1, borderColor: "#1E2832", overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingHorizontal: 16, paddingVertical: 12,
  },
  infoLabel: { color: "#8B949E", fontSize: 13 },
  infoValue: {
    color: "#E6EDF3", fontSize: 13, fontWeight: "600",
    maxWidth: "60%", textAlign: "right",
  },
  infoDiv: { height: 1, backgroundColor: "#1E2832" },

  // GPS
  gpsCard: {
    backgroundColor: "#0F1318", borderRadius: 14,
    borderWidth: 1, borderColor: "#1E2832", overflow: "hidden",
  },
  gpsCoords: { flexDirection: "row", padding: 16, gap: 20, alignItems: "center" },
  gpsLabel: { color: "#8B949E", fontSize: 11, marginBottom: 4 },
  gpsValue: { color: "#E6EDF3", fontSize: 15, fontWeight: "700" },
  gpsDivider: { width: 1, height: 36, backgroundColor: "#1E2832" },
  gpsBtn: {
    borderTopWidth: 1, borderTopColor: "#1E2832",
    padding: 12, alignItems: "center",
    backgroundColor: "rgba(63,185,80,0.05)",
  },
  gpsBtnText: { color: "#3FB950", fontSize: 13, fontWeight: "700" },

  // ID
  idRow: { alignItems: "center", paddingBottom: 20, marginTop: 4 },
  idText: { color: "#4A5568", fontSize: 10 },
});

export const reportMapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    color: C.textMuted,
    marginTop: 12,
    fontSize: 14,
  },
  topCard: {
    position: "absolute",
    top: Platform.OS === "ios" ? 58 : 36,
    left: 16,
    right: 16,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(8,12,16,0.92)",
    borderWidth: 1,
    borderColor: "rgba(63,185,80,0.25)",
  },
  topTitle: {
    color: C.text,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  topSubtitle: {
    color: C.textMuted,
    marginTop: 4,
    fontSize: 13,
  },
  emptyCard: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 112,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(8,12,16,0.94)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  emptyTitle: {
    color: C.text,
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: C.textMuted,
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
  },
  backButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  backButtonText: {
    color: C.bg,
    fontSize: 22,
    fontWeight: "900",
  },
  callout: {
    width: 220,
    paddingVertical: 4,
  },
  calloutTitle: {
    fontWeight: "800",
    fontSize: 15,
    color: "#111827",
  },
  calloutDescription: {
    marginTop: 4,
    color: "#374151",
    fontSize: 13,
    lineHeight: 18,
  },
  calloutPriority: {
    marginTop: 6,
    fontWeight: "700",
    color: "#111827",
    fontSize: 13,
  },
  calloutLink: {
    marginTop: 6,
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "700",
  },
  mapLoadingBadge: {
  position: "absolute",
  top: Platform.OS === "ios" ? 142 : 118,
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "rgba(8,12,16,0.9)",
  borderRadius: 18,
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: "rgba(63,185,80,0.25)",
},
mapLoadingText: {
  color: C.text,
  fontSize: 12,
  fontWeight: "700",
},
centerButton: {
  position: "absolute",
  bottom: 40,
  left: 20,
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: C.bgCard,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: C.border,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 8,
},
centerButtonText: {
  color: C.green,
  fontSize: 24,
  fontWeight: "900",
},
});