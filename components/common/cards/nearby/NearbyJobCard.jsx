import React from "react";
import { View, Text, Touchable, Image, TouchableOpacity } from "react-native";
import { checkImageURL } from "../../../../utils";
import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            url: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : "https://c8.alamy.com/comp/2CCET8N/word-job-written-with-color-sponge-2CCET8N.jpg",
          }}
          resizeMethod='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
