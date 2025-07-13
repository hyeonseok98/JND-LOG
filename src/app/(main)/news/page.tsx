import { SectionLayout } from "@/components/layout";
import LottieLoader from "@/components/lottie/lottie-loader";

export default function NewsPage() {
  return (
    <SectionLayout>
      <div className="flex flex-col justify-center items-center w-[1500px] h-screen gap-8 text-gray-300 border border-gray-300 rounded-md">
        <LottieLoader type="colorful" className="w-[400px] h-[150px]" />
        <div className="text-center leading-relaxed space-y-4">
          <p>현재 선수별 정보, 혼자서 하는 모의 경매, 응원모음 등 다양한 업데이트를 구상중입니다.</p>
          <p>
            함께 만들어가는 팬 페이지를 모토로 운영될 예정이니, <br />
            원하시는 기능이 있으시면 메일로 남겨주시면 최대한 반영할 수 있도록 노력하겠습니다!
          </p>
        </div>
      </div>
    </SectionLayout>
  );
}
