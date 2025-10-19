import { Stack } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

export default function StackLayout() {
  const colorScheme = "light";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        headerTintColor: Colors[colorScheme].text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Due Payments",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
