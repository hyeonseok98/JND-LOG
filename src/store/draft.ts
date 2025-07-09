import { INITIAL_TEAMS, PLAYERS } from "@/constants/players";
import { LolLine, Team } from "@/types/draft";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DraftStore {
  teams: Team[];
  selectedTeamId?: string;
  selectedLine?: LolLine;

  // 선택
  selectTeam: (id: string) => void;
  selectSlot: (teamId: string, line: LolLine) => void;

  // 동작
  addPlayerToTeam: (teamId: string, playerId: string) => void;
  removePlayerFromTeam: (teamId: string, line: LolLine) => void;
  updatePlayerCost: (teamId: string, line: LolLine, cost: number) => void;
}

export const useDraft = create<DraftStore>()(
  immer((set) => ({
    teams: INITIAL_TEAMS,

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

    // 선수 배치
    addPlayerToTeam: (teamId, playerId) =>
      set((s) => {
        const team = s.teams.find((t) => t.id === teamId);
        const player = PLAYERS.find((p) => p.id === playerId);
        if (!team || !player) return;

        // 다른 팀에 이미 있으면 배치 금지
        const dupTeam = s.teams.find((t) => Object.values(t.slots).some((sl) => sl.player?.id === playerId));
        if (dupTeam && dupTeam.id !== teamId) return;

        const slot = team.slots[player.line];

        const prevCost = slot.player?.cost ?? 0;
        const projected = team.points - prevCost + player.cost;
        if (projected > team.budget) return; // 예산 초과 시 무시(경고 문구만 나오게)

        slot.player = player;
        team.points = projected;
        s.selectedLine = undefined;
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

    // 선수 경매 포인트 수정
    updatePlayerCost: (teamId, line, cost) =>
      set((s) => {
        const team = s.teams.find((t) => t.id === teamId);
        if (!team) return;
        const slot = team.slots[line];
        if (!slot.player) return;

        const delta = cost - slot.player.cost;
        const projected = team.points + delta;
        if (projected < 0) return; // 음수 방지

        slot.player.cost = cost;
        team.points = projected;
      }),
  })),
);
