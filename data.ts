import { Dimensions } from "react-native";

export const screen_width = Dimensions.get("screen").width;
export const screen_height = Dimensions.get("screen").height;

export const photo_width = screen_width * 0.7;
export const photo_height = photo_width * 1.76;
export const spacing = 12;

export const perplexity_spacing = 4;
export const perplexity_item_height = screen_height * 0.72;
