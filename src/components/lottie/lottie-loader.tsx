"use client";

import CatLoading from "@/assets/lottie/cat-loading.json";
import ColorfulLoading from "@/assets/lottie/colorful-loading.json";
import { Player } from "@lottiefiles/react-lottie-player";

type LottieType = "cat" | "colorful";

interface LottieLoaderProps {
  type: LottieType;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export default function LottieLoader({
  type,
  className = "w-[100px] h-[100px]",
  autoplay = true,
  loop = true,
}: LottieLoaderProps) {
  const animationData = type === "cat" ? CatLoading : ColorfulLoading;

  return (
    <Player
      src={animationData}
      autoplay={autoplay}
      loop={loop}
      className={className}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }} // 부모영역 정중앙에 위치
    />
  );
}
