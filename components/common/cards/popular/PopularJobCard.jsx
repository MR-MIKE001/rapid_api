import React from "react";
import { View, Text, Touchable, Image, TouchableOpacity } from "react-native";
import { checkImageURL } from "../../../../utils";
import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}>
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            url: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://c8.alamy.com/comp/2CCET8N/word-job-written-with-color-sponge-2CCET8N.jpg",
          }}
          resizeMethod='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
