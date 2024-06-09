import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text
        style={{
          color: "white",
          fontSize: 25,
          marginHorizontal: 15,
          marginBottom: 25,
        }}
      >
        Trending
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  console.log("item.poster_path: ", item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require("../assets/movie1.jpg")}
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
