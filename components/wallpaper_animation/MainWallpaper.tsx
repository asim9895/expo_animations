import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { photo_width, screen_width, spacing } from "@/data";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import BackDropPhoto from "./BackDropPhoto";
import Photo from "./Photo";
import { pexel_wallpaper_api } from "@/actions/wallpaper_api";

const MainWallpaper = () => {
  const [data, setdata]: any = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (photo_width + spacing);
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
          return <BackDropPhoto item={item} index={index} scrollX={scrollX} />;
        })}
      </View>
      <Animated.FlatList
        data={data?.photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={photo_width + spacing}
        decelerationRate={"fast"}
        contentContainerStyle={{
          gap: spacing,
          paddingHorizontal: (screen_width - photo_width) / 2,
        }}
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => String(item.id)}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        renderItem={({ item, index }) => {
          return <Photo item={item} index={index} scrollX={scrollX} />;
        }}
      />
    </View>
  );
};

export default MainWallpaper;
