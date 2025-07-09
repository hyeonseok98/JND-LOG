import { SectionLayout } from "@/components/layout";
import PlayerPool from "./_components/player-pool";
import TeamsBoard from "./_components/team-board";

export default function DraftPage() {
  return (
    <SectionLayout>
      <section className="flex h-screen bg-zinc-950 text-white">
        <TeamsBoard />

        <div className="flex flex-col items-center justify-center w-[240px] border-x border-zinc-800">
          <p className="text-sm text-zinc-500 text-center px-4">
            슬롯을 먼저 선택한 뒤<br />
            오른쪽에서 선수를 고르세요
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <PlayerPool />
        </div>
      </section>
    </SectionLayout>
  );
}
