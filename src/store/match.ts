import { create } from "zustand";

interface MatchFilterState {
  type: "전체" | "내전" | "공식스크림" | "비공식스크림";
  setType: (t: MatchFilterState["type"]) => void;
}

export const useMatchStore = create<MatchFilterState>((set) => ({
  type: "전체",
  setType: (type) => set({ type }),
}));
