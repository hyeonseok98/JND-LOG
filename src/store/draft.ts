import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { INITIAL_TEAMS, PLAYERS } from "@/constants/players";
import { LolLine, Team } from "@/types/draft";

interface DraftStore {
  teams: Team[];

  // 선택 상태
  selectedTeamId?: string;
  selectedLine?: LolLine;

  // 선택 액션
  selectTeam: (id: string) => void;
  selectSlot: (teamId: string, line: LolLine) => void;

  // 선수 배치 및 제거
  addPlayerToTeam: (teamId: string, playerId: string) => void;
  removePlayerFromTeam: (teamId: string, line: LolLine) => void;
}

export const useDraft = create<DraftStore>()(
  immer((set) => ({
    /* 상태 */
    teams: INITIAL_TEAMS,
    selectedTeamId: undefined,
    selectedLine: undefined,

    /* 선택 */
    selectTeam: (id) =>
      set((s) => {
        s.selectedTeamId = id;
        s.selectedLine = undefined; // 팀을 바꾸면 라인 초기화
      }),

    selectSlot: (teamId, line) =>
      set((s) => {
        s.selectedTeamId = teamId;
        s.selectedLine =
          s.selectedTeamId === teamId && s.selectedLine === line
            ? undefined // 같은 슬롯 다시 누르면 해제
            : line;
      }),

    /* ───────── 배치 ───────── */
    addPlayerToTeam: (teamId, playerId) =>
      set((s) => {
        const team = s.teams.find((t) => t.id === teamId);
        const player = PLAYERS.find((p) => p.id === playerId);
        if (!team || !player) return;

        const slot = team.slots[player.line];
        if (slot.player) return;
        if (team.points + player.cost > team.budget) return;

        slot.player = player;
        team.points += player.cost;
        s.selectedLine = undefined; // 한 명 넣고 나면 라인 선택 해제
      }),

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
  })),
);
