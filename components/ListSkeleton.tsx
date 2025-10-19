import React from "react";
import { StyleSheet, View } from "react-native";
import { radii, spacing } from "../constants/tokens";

export default function ListSkeleton() {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { width: "90%" }]} />
      <View style={[styles.row, { width: "95%" }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.m, paddingTop: spacing.s },
  row: {
    height: 80,
    borderRadius: radii.card,
    backgroundColor: "#EFEFEF",
    marginVertical: spacing.s,
  },
});
