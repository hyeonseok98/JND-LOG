import PlayersTable from "./_components/players-table";

export const dynamic = "force-static"; // 기본 SSR, 필요하면 변경

export default function PlayersPage() {
  return <PlayersTable />;
}
