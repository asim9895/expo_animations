import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { photo_height, photo_width } from "@/data";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Photo: React.FC<any> = ({ item, index, scrollX }) => {
  const animated_styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,

            [index - 1, index, index + 1],
            [2, 1, 2]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,

            [index - 1, index, index + 1],
            [10, 0, 10]
          )}deg`,
        },
      ],
    };
  });
  return (
    <View
      style={{
        width: photo_width,
        height: photo_height,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <Animated.Image
        source={{ uri: item.src.large }}
        style={[{ flex: 1 }, animated_styles]}
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({});
