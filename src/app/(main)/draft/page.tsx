import { SectionLayout } from "@/components/layout";
import PlayerPool from "./_components/player-pool";
import TeamsBoard from "./_components/team-board";
import TeamPanel from "./_components/team-panel";

export default function DraftPage() {
  return (
    <SectionLayout>
      <section className="flex h-screen bg-gray-800 text-white">
        <TeamsBoard />

        <div className="w-[240px] border-x border-gray-500">
          <TeamPanel />
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide">
          <PlayerPool />
        </div>
      </section>
    </SectionLayout>
  );
}
