import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import nearbyJobCard from "../../common/cards/nearby/NearbyJobCard.jsx";
import useFetch from "../../../hook/useFetch.js";
import styles from "./nearbyjobs.style.js";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard.jsx";

const NearbyJobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "react developer",
    num_pages: 1,
  });
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text styles={styles.headerTitle}>near by jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>something went wrong</Text>
        ) : (
          data?.map((job) => {
            return (
              <NearbyJobCard
                job={job}
                key={`nearby-job -${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
