import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  perplexity_item_height,
  perplexity_spacing,
  photo_width,
  screen_height,
  screen_width,
  spacing,
} from "@/data";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { pexel_wallpaper_api } from "@/actions/wallpaper_api";
import BackgroundPhoto from "./BackgroundPhoto";
import SingleCard from "./SingleCard";

const PerplexityScroll = () => {
  const [data, setdata]: any = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / perplexity_item_height;
  });

  const fetch_data = async () => {
    setisLoading(true);
    const request = await pexel_wallpaper_api();
    if (request?.status === 200) {
      setdata(request?.data);
      setisLoading(false);
    } else {
      setdata(null);
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos?.map((item: any, index: any) => {
          return (
            <BackgroundPhoto item={item} index={index} scrollY={scrollY} />
          );
        })}
      </View>
      <Animated.FlatList
        data={data?.photos}
        showsVerticalScrollIndicator={false}
        snapToInterval={perplexity_item_height + perplexity_spacing * 2}
        decelerationRate={"fast"}
        contentContainerStyle={{
          gap: perplexity_spacing * 2,
          padding: perplexity_spacing * 3,
          paddingVertical: (screen_height - perplexity_item_height) / 2,
        }}
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => String(item.id)}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return <SingleCard item={item} index={index} scrollY={scrollY} />;
        }}
      />
    </View>
  );
};

export default PerplexityScroll;
