import BannerImgSea from "@/assets/images/banners/banner-sea.jpg";
import { SectionLayout } from "@/components/layout";
import Image from "next/image";

export default function HomePage() {
  return (
    <SectionLayout>
      <section className="relative flex justify-center items-center w-[1400px] h-[400px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-dark/50 z-10" />
        <h2 className="text-[40px] font-spoqahansans-bold text-white z-15">2025 자낳대</h2>
        <Image src={BannerImgSea} alt="메인배너" fill priority className="object-cover" />
      </section>
    </SectionLayout>
  );
}
