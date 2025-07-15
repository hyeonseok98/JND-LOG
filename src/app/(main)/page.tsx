export const revalidate = 60;

import BannerImgSea from "@/assets/images/banners/banner-sea.jpg";
import { SectionLayout } from "@/components/layout";
import { TARGET_TIME } from "@/constants/countdown";
import { getDDay } from "@/util/countdown";
import Image from "next/image";
import Countdown from "./_components/countdown";
import Timeline from "./_components/time-line";

export default function HomePage() {
  const ddayText = getDDay(TARGET_TIME);

  return (
    <SectionLayout>
      <div className="relative flex justify-center items-center w-[1500px] h-screen rounded-md overflow-hidden">
        <Image src={BannerImgSea} alt="메인 배경" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <Timeline />
        </div>

        <div className="mb-16 text-white text-[90px] font-bold text-center z-10">
          <h2 className="text-[90px]">
            조별 리그 <br />
          </h2>
          <span className="wave-text" data-text={ddayText}>
            {ddayText}
          </span>
        </div>

        <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2">
          <Countdown />
        </div>
        <footer className="text-xs text-gray-300 ">
          <p className="absolute bottom-[10px] left-4 text-left">제작자 메일: jnd.fan00@gmail.com</p>
          <p className="absolute bottom-[10px] right-4 text-right">
            잘못된 정보, 오타, 정보 제공은 메일로 부탁드립니다.
            <br />본 페이지는 팬 페이지를 목적으로 제작되었으며 치지직, 인챈트 엔터테인먼트와 무관합니다.
          </p>
        </footer>
      </div>
    </SectionLayout>
  );
}
