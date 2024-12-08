import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import {
  perplexity_item_height,
  perplexity_spacing,
  photo_height,
  photo_width,
  screen_width,
} from "@/data";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const SingleCard: React.FC<any> = ({ item, index, scrollY }) => {
  const animated_styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.85, 1, 0.85]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: screen_width / 1.1,
          height: perplexity_item_height,
          // overflow: "hidden",
          borderRadius: 16,
          flex: 1,
          gap: perplexity_spacing,
        },
        animated_styles,
      ]}
    >
      <Image
        source={{ uri: item.src.large }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 16 }]}
      />
    </Animated.View>
  );
};

export default SingleCard;

const styles = StyleSheet.create({});
