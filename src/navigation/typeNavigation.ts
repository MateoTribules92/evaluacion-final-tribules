export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  CountryDetail: { code: string };
  NewReport: undefined;    // ← agregar
  MyReports: undefined; 
};

