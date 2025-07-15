import { sheetsClient, SPREADSHEET_ID } from "@/lib/sheets";

export async function fetchSheetAsJson(range: string) {
  const { data } = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range, // ex) "players_stats!A1:Z"
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const [header, ...rows] = data.values ?? [];
  return rows.map((r) =>
    header.reduce<Record<string, unknown>>((o, key, i) => {
      o[key as string] = r[i] ?? null;
      return o;
    }, {}),
  );
}
