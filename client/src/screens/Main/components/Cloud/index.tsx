import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as S from "./styles";

import cloud from "../../../../assets/images/clouds.png";

interface Props {
  confirmed: boolean;
  size?: "lg" | "md";
  zIndex?: number;
  delay?: number;
  bottom: number;
  noShadow?: boolean;
}

export default function Cloud({
  size = "md",
  delay = 0,
  bottom,
  zIndex,
  confirmed,
  noShadow,
}: Props) {
  const { width } = useWindowDimensions();

  const sizeValue =
    size === "lg"
      ? { height: 1500, width: 2000 }
      : { height: 1000, width: 800 };

  const offeset = sizeValue.width / 3 + width;

  const translateX = useSharedValue(offeset);

  useEffect(() => {
    if (confirmed) {
      setTimeout(
        () =>
          (translateX.value = withTiming(-offeset, {
            duration: 3000,
            easing: Easing.linear,
          })),
        4000 + delay
      );
    }
  }, [confirmed]);

  const cloudAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    ...sizeValue,
    bottom,
    zIndex,
    shadowOpacity: noShadow ? 0 : 0.08,
  }));

  return (
    <S.Cloud source={cloud} style={cloudAnimatedStyle} resizeMode="contain" />
  );
}
