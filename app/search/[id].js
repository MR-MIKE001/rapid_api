import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native-web";
import axios from "axios";
import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search.js";

const JobSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);
    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "x-rapidapi-key":
            "c82bf3e400msh96e5b0b08eaf294p167292jsn56d002b5499c",
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };
      const response = await axios.request(options);

      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };
  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => {
            <ScreenHeaderBtn
              iconsUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />;
          },
          headerTitle: "",
        }}
      />
      <FlatList
        data={searchResult}
        renderItem={({ item }) => {
          return (
            <NearbyJobCard
              job={item}
              handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
            />
          );
        }}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => {
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : (
                searchError && <Text>oops something went wrong</Text>
              )}
            </View>
          </>;
        }}
        ListFooterComponent={() => {
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}>
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}>
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>;
        }}
      />
    </SafeAreaView>
  );
};
export default JobSearch;
