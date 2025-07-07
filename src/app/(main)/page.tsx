import BannerImgSea from "@/assets/images/banners/banner-sea.jpg";
import { SectionLayout } from "@/components/layout";
import Image from "next/image";

export default function HomePage() {
  return (
    <SectionLayout>
      <section className="relative w-[1500px] h-[400px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-dark/20 z-10" />
        <Image src={BannerImgSea} alt="메인배너" fill priority className="object-cover" />
      </section>
    </SectionLayout>
  );
}
