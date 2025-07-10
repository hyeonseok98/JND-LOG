import { SectionLayout } from "@/components/layout";
import AuctionLog from "./_components/auction-log";
import AuctionOrder from "./_components/auction-order";
import ControlPanel from "./_components/control-panel";
import CurrentAuction from "./_components/current-auction";
import StartAuction from "./_components/start-auction"; // 클라이언트 효과
import TeamsBoard from "./_components/team-board-mock";
import UnsoldList from "./_components/unsold-list";

export default function MockDraftPage() {
  return (
    <SectionLayout>
      <StartAuction />

      <div className="flex h-screen overflow-hidden bg-gray-800 text-white">
        <TeamsBoard />

        {/* 중앙 */}
        <div className="w-[540px] border-x border-gray-500 flex flex-col">
          <CurrentAuction className="min-h-[200px]" />
          <AuctionLog className="flex-1 overflow-y-auto border-t border-gray-500" />
          <ControlPanel />
        </div>

        {/* 우측 */}
        <div className="w-[280px] flex flex-col border-l border-gray-500">
          <AuctionOrder className="flex-1 overflow-y-auto" />
          <UnsoldList className="h-[220px] overflow-y-auto border-t border-gray-500" />
        </div>
      </div>
    </SectionLayout>
  );
}
