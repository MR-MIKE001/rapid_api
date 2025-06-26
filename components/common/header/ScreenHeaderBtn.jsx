import React from "react";
import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";
import {} from "react-native-web";
import { icons } from "../../../constants";

const ScreenHeaderBtn = ({ iconsUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconsUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
