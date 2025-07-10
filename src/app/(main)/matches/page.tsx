import { SectionLayout } from "@/components/layout";
import LottieLoader from "@/components/lottie/lottie-loader";

export default function MatchPage() {
  return (
    <SectionLayout>
      <div className="flex flex-col justify-center items-center w-[1500px] h-screen gap-8 text-gray-300 border border-gray-300 rounded-md">
        <LottieLoader type="colorful" className="w-[400px] h-[150px]" />
        <div className="text-center leading-relaxed space-y-4">
          <p>추후 업데이트 예정입니다.</p>
          <p>
            내전, 스크림, 본 대회까지 다양한 기록을 남길 페이지입니다.
            <br />
            정보를 수동으로 기록중이라... 관련 정보가 있으신 분은 제보 부탁드립니다!
          </p>
        </div>
      </div>
    </SectionLayout>
  );
}
