import { SectionLayout } from "@/components/layout";
import Image from "next/image";

export default function NewsPage() {
  return (
    <SectionLayout>
      <div className="flex flex-col justify-center items-center py-10 md:py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-8">자낳대 팀 구성</h2>
        <div className="w-[1500px] h-[620px] flex gap-6 border border-gray-400 rounded-md">
          <div className="relative flex-1 h-full rounded-lg overflow-hidden shadow-lg">
            <Image src="/news/team-result.png" alt="팀 구성 요약" fill className="object-contain" priority />
          </div>

          <div className="relative w-[400px] h-full rounded-lg overflow-hidden shadow-lg">
            <Image src="/news/team-result-detail.png" alt="팀 구성 상세" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
