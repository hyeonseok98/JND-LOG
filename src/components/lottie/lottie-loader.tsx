"use client";

import CatLoading from "@/assets/lottie/cat-loading.json";
import ColorfulLoading from "@/assets/lottie/colorful-loading.json";
import dynamic from "next/dynamic";

// lottie는 client 전용이기에, ssr에서 실행 방지
const LottiePlayer = dynamic(() => import("@lottiefiles/react-lottie-player").then((m) => m.Player), { ssr: false });

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
    <LottiePlayer
      src={animationData}
      autoplay={autoplay}
      loop={loop}
      className={className}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }} // 부모영역 정중앙에 위치
    />
  );
}
