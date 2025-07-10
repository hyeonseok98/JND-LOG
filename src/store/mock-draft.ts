import { INITIAL_TEAMS, PLAYERS } from "@/constants/players";
import { LolLine, Team } from "@/types/draft";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface MockDraftStore {
  teams: Team[];
  selectedTeamId?: string;
  selectedLine?: LolLine;

  selectTeam: (id: string) => void;
  selectSlot: (teamId: string, line: LolLine) => void;

  addPlayerToTeam: (teamId: string, playerId: string) => void;
  removePlayerFromTeam: (teamId: string, line: LolLine) => void;
  updatePlayerCost: (teamId: string, line: LolLine, cost: number) => void;

  resetTeams: () => void;
}

export const useMockDraft = create<MockDraftStore>()(
  immer((set) => ({
    teams: JSON.parse(JSON.stringify(INITIAL_TEAMS)),

    /* 선택 */
    selectTeam: (id) =>
      set((s) => {
        s.selectedTeamId = id;
        s.selectedLine = undefined;
      }),

    selectSlot: (teamId, line) =>
      set((s) => {
        s.selectedTeamId = teamId;
        s.selectedLine = s.selectedTeamId === teamId && s.selectedLine === line ? undefined : line;
      }),

    /* 선수 배치 */
    addPlayerToTeam: (teamId, playerId) =>
      set((s) => {
        const team = s.teams.find((t) => t.id === teamId);
        const player = PLAYERS.find((p) => p.id === playerId);
        if (!team || !player) return;

        const dupTeam = s.teams.find((t) => Object.values(t.slots).some((sl) => sl.player?.id === playerId));
        if (dupTeam && dupTeam.id !== teamId) return;

        const slot = team.slots[player.line];
        const prev = slot.player?.cost ?? 0;
        if (team.points - prev + player.cost > team.budget) return;

        slot.player = player;
        team.points = team.points - prev + player.cost;
        s.selectedLine = undefined;
      }),

    /* 선수 제거 */
    removePlayerFromTeam: (teamId, line) =>
      set((s) => {
        const team = s.teams.find((t) => t.id === teamId);
        if (!team) return;
        const slot = team.slots[line];
        if (!slot.player) return;

        team.points -= slot.player.cost;
        slot.player = undefined;
        s.selectedLine = undefined;
      }),

    /* 포인트 조정(라인장 제외) */
    updatePlayerCost: (teamId, line, cost) =>
      set((s) => {
        if (line === "JG") return;

        const team = s.teams.find((t) => t.id === teamId);
        if (!team) return;
        const slot = team.slots[line];
        if (!slot.player) return;

        const delta = cost - slot.player.cost;
        if (team.points + delta > team.budget) return;

        slot.player.cost = cost;
        team.points += delta;
      }),

    resetTeams: () =>
      set((s) => {
        s.teams = JSON.parse(JSON.stringify(INITIAL_TEAMS));
        s.selectedLine = undefined;
        s.selectedTeamId = undefined;
      }),
  })),
);
