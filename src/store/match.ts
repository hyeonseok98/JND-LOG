import { MATCH_TYPE } from "@/types/lol/matches";
import { create } from "zustand";

interface MatchFilterState {
  type: "전체" | MATCH_TYPE;
  setType: (t: "전체" | MATCH_TYPE) => void;
}

export const useMatchStore = create<MatchFilterState>((set) => ({
  type: "전체",
  setType: (type) => set({ type }),
}));
