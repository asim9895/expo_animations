import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const BackDropPhoto: React.FC<any> = ({ item, index, scrollX }) => {
  const animated_styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,

        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });
  return (
    <Animated.Image
      source={{ uri: item.src.large }}
      style={[StyleSheet.absoluteFillObject, animated_styles]}
      blurRadius={20}
      key={item?.id}
    />
  );
};

export default BackDropPhoto;

const styles = StyleSheet.create({});
