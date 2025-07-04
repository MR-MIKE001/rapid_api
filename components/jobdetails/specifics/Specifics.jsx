import React from "react";
import { View, Text } from "react-native";

import styles from "./specifics.style";

const Specifics = ({ title, points }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.pointsContainer}>
        {points.map((item, index) => {
          return (
            <View key={index} style={styles.pointWrapper}>
              <View style={styles.pointDot}></View>
              <Text style={styles.pointText}>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Specifics;
