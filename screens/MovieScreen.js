import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles } from "../theme";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image185,
  image342,
} from "../api/moviedb";
import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const [loading, setLoading] = useState(false);
  const { params: item } = useRoute();
  let movieName = "Captain Marvel (2019)";
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // console.log("itemid: ", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("got movie details:", data);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("got credits:", data);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    //console.log("got similar:", data);
    if (data && data.results) setSimilarMovies(data.results);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/*back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? "#eab308" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/movie1.jpg")}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details*/}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {/* status release date, runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} | {movie?.release_date?.split("-")[0]} |{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "|" : null}
              </Text>
            );
          })}
          {/* <Text className="text-neutral-400 font-semibold text-base text-center">
            Action *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thriller *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text> */}
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking wide">
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
