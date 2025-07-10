import { PLAYERS } from "@/constants/players";
import { LolLine, Player } from "@/types/draft";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useMockDraft } from "./mock-draft";

type Bid = { teamId: string; amount: number; ts: number };
type Log = { text: string; hr?: true };

interface AuctionState {
  order: Player[];
  unsoldQueue: Player[];
  current?: Player;
  fromUnsold: boolean;

  bids: Record<string, Bid>;
  log: Log[];
  warn?: string;

  selectedTeamId: string;

  start(): void;
  placeBid(teamId: string, amount: number): void;
  award(): void;
  pass(): void;
  shuffleLeft(): void;
  resetAll(): void;
}

/* ---------- Helpers ---------- */
const shuffle = <T>(a: T[]) => [...a].sort(() => (Math.random() < 0.5 ? -1 : 1));

/* ---------- Store ---------- */
export const useAuction = create<AuctionState>()(
  immer((set, get) => ({
    order: [],
    unsoldQueue: [],
    current: undefined,
    fromUnsold: false,

    bids: {},
    log: [],
    warn: undefined,

    selectedTeamId: useMockDraft.getState().teams[0].id,

    /* ── 1. 경매 시작 ── */
    start() {
      set((s) => {
        s.order = shuffle(PLAYERS.filter((p) => p.line !== "JG"));
        s.unsoldQueue = [];
        s.bids = {};
        s.log = [];
        s.current = s.order.shift();
        s.fromUnsold = false;
        s.warn = undefined;
        s.selectedTeamId = useMockDraft.getState().teams[0].id;

        if (s.current)
          s.log.push({
            text: `${s.current.line} - ${s.current.name} <span style="color:#4ade80">경매 시작</span>`,
          });
      });
    },

    /* ── 2. 입찰 ── */
    placeBid(teamId, amount) {
      set((s) => {
        if (!s.current) return;

        const draft = useMockDraft.getState();
        const team = draft.teams.find((t) => t.id === teamId);
        if (!team) return;

        /* 라인 중복 방지 */
        if (team.slots[s.current.line as LolLine].player) {
          s.warn = `${team.name}에는 이미 ${s.current.line}가 있어요`;
          return;
        }

        const highest = Math.max(0, ...Object.values(s.bids).map((b) => b.amount));
        if (amount % 5) {
          s.warn = "5pt 단위로 입찰";
          return;
        }
        if (amount < 5) {
          s.warn = "5pt 이상 입찰";
          return;
        }
        if (amount <= highest) {
          s.warn = "현재 최고가보다 높아야 함";
          return;
        }
        if (team.budget - team.points < amount) {
          s.warn = "잔여 포인트 부족";
          return;
        }

        s.bids[teamId] = { teamId, amount, ts: Date.now() };
        s.warn = undefined;
        s.log.push({
          text: `${team.name.split(" ")[0]} 팀장 - ${s.current.name} - ${amount}pt`,
        });
      });
    },

    /* ── 3. 낙찰 ── */
    award() {
      set((s) => {
        if (!s.current) return;
        const bidsArr = Object.values(s.bids);
        if (bidsArr.length === 0) {
          s.warn = "입찰 없음";
          return;
        }

        const winner = bidsArr.sort((a, b) => b.amount - a.amount || a.ts - b.ts)[0];
        const draft = useMockDraft.getState();
        draft.addPlayerToTeam(winner.teamId, s.current.id);
        draft.updatePlayerCost(winner.teamId, s.current.line, winner.amount);

        const winnerName = draft.teams.find((t) => t.id === winner.teamId)!.name.split(" ")[0];
        s.log.push({
          text: `${s.current.name} → ${winnerName} (${winner.amount}pt)`,
        });

        s.bids = {};
        moveNext(s);
      });
    },

    /* ── 4. 유찰 ── */
    pass() {
      set((s) => {
        if (s.current) {
          s.unsoldQueue.push(s.current);
          s.log.push({
            text: `${s.current.name} <span style="color:#f87171">유찰</span>`,
          });
        }
        s.bids = {};
        moveNext(s);
      });
    },

    /* ── 남은 순서 섞기 ── */
    shuffleLeft() {
      set((draft) => {
        draft.order = shuffle(draft.order);
      });
    },

    /* ── 전체 리셋 ── */
    resetAll() {
      useMockDraft.getState().resetTeams();
      get().start();
    },
  })),
);

/* ---------- 다음 선수 & 자동배정 ---------- */
function moveNext(state: AuctionState) {
  state.log.push({ hr: true, text: "" });

  const fromUnsoldNow = state.order.length === 0;
  state.current = fromUnsoldNow ? state.unsoldQueue.shift() : state.order.shift();
  state.fromUnsold = fromUnsoldNow;
  state.warn = undefined;

  /* 자동 배정 검사 */
  if (autoAssignIfLast(state)) {
    moveNext(state);
    return;
  }

  if (!state.current) return;

  if (fromUnsoldNow && state.unsoldQueue.length === 0) {
    state.log.push({
      text: "<span style='color:#fbbf24'>유찰 경매 시작</span>",
      hr: true,
    });
  }

  state.log.push({
    text: `${state.current.line} - ${state.current.name} <span style="color:#4ade80">경매 시작</span>`,
  });
}

/* 남은 선수·빈 슬롯이 1:1 인 경우 자동 0pt 배정 */
function autoAssignIfLast(state: AuctionState): boolean {
  const cur = state.current;
  if (!cur) return false;
  if (cur.line === "JG") return false;

  /* 남은 같은 라인 선수 수 */
  const restPlayers = [cur, ...state.order, ...state.unsoldQueue].filter((p) => p.line === cur.line).length;
  if (restPlayers !== 1) return false;

  /* 빈 팀 슬롯 수 */
  const draft = useMockDraft.getState();
  const vacantTeams = draft.teams.filter((t) => !t.slots[cur.line as LolLine].player);
  if (vacantTeams.length !== 1) return false;

  const team = vacantTeams[0];
  draft.addPlayerToTeam(team.id, cur.id);
  draft.updatePlayerCost(team.id, cur.line, 0);

  state.log.push({
    text: `${cur.name} → ${team.name.split(" ")[0]} (0pt, 자동배정)`,
  });

  state.current = undefined;
  return true;
}
