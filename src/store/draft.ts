import { INITIAL_TEAMS, PLAYERS } from "@/constants/players";
import { LolLine, Team } from "@/types/draft";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DraftStore {
  /* ─── 상태 ─── */
  teams: Team[];
  selectedTeamId?: string;
  selectedLine?: LolLine;

  /* ─── 선택 동작 ─── */
  selectTeam: (id: string) => void;
  selectSlot: (teamId: string, line: LolLine) => void;

  /* ─── 편집 동작 ─── */
  addPlayerToTeam: (teamId: string, playerId: string) => void;
  removePlayerFromTeam: (teamId: string, line: LolLine) => void;
  updatePlayerCost: (teamId: string, line: LolLine, cost: number) => void;
}

export const useDraft = create<DraftStore>()(
  immer((set) => ({
    teams: INITIAL_TEAMS,

    /* ─── 팀 선택 ─── */
    selectTeam: (id) =>
      set((s) => {
        s.selectedTeamId = id;
        s.selectedLine = undefined; // 기존 라인 선택 해제
      }),

    /* ─── 슬롯(라인) 선택 ─── */
    selectSlot: (teamId, line) =>
      set((s) => {
        s.selectedTeamId = teamId;
        /* 같은 슬롯을 다시 누르면 해제 */
        s.selectedLine = s.selectedTeamId === teamId && s.selectedLine === line ? undefined : line;
      }),

    /* ─── 선수 배치 ─── */
    addPlayerToTeam: (teamId, playerId) =>
      set((s) => {
        const team = s.teams.find((t) => t.id === teamId);
        const player = PLAYERS.find((p) => p.id === playerId);
        if (!team || !player) return;

        /* 다른 팀에 이미 존재하면 배치 금지 */
        const dupTeam = s.teams.find((t) => Object.values(t.slots).some((sl) => sl.player?.id === playerId));
        if (dupTeam && dupTeam.id !== teamId) return;

        const slot = team.slots[player.line];

        /* 예산 초과 검사 */
        const prevCost = slot.player?.cost ?? 0;
        const projected = team.points - prevCost + player.cost;
        if (projected > team.budget) return;

        slot.player = player;
        team.points = projected;
        s.selectedLine = undefined;
      }),

    /* ─── 선수 제거 ─── */
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

    /* ─── 선수 포인트 수정 ─── */
    updatePlayerCost: (teamId, line, cost) =>
      set((s) => {
        /* 정글(팀장)은 수정 불가 */
        if (line === "JG") return;

        const team = s.teams.find((t) => t.id === teamId);
        if (!team) return;
        const slot = team.slots[line];
        if (!slot.player) return;

        const delta = cost - slot.player.cost;
        const projected = team.points + delta;
        if (projected < 0) return; // 총합이 음수가 되지 않도록

        slot.player.cost = cost;
        team.points = projected;
      }),
  })),
);
