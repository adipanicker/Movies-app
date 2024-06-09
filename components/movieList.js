import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { styles } from "../theme";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  // source={require("../assets/movie3.jpg")}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
              </View>
              <Text className="text-neutral-300 ml-1">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
