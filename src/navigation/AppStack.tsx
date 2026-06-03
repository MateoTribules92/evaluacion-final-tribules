import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "./typeNavigation";
import { HomeScreen } from "../screens/app/HomeScreen";
import { NewReportScreen } from "../screens/app/MyReportsScreen";
import { MyReportsScreen } from "../screens/app/NewReportScreen";


const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#4F46E5",
        headerTitleStyle: {
          fontWeight: "700" as const,
          color: "#1A202C",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewReport"
        component={NewReportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyReports"
        component={MyReportsScreen}
        options={{
          title: "Mis Reportes",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
