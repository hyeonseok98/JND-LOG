export const dynamic = "force-dynamic";

import ClientMatches from "./_components/client-matches";
import { fetchMatchesByDate } from "./_services/matches";

export default async function MatchesPage() {
  const matchesByDate = await fetchMatchesByDate();

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <ClientMatches initialData={matchesByDate} />
    </div>
  );
}
