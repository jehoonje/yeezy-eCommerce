// useGridStore.ts
import { create } from "zustand";

type GridState = "grid9" | "grid3" | "grid1";

interface GridStore {
  gridState: GridState;
  setGridState: (state: GridState) => void;
  // 이전 상태로 되돌리는 함수도 추가할 수 있음
  backGridState: () => void;
}

const useGridStore = create<GridStore>((set, get) => ({
  gridState: "grid9",
  setGridState: (state) => set({ gridState: state }),
  backGridState: () => {
    const { gridState } = get();
    if (gridState === "grid1") {
      set({ gridState: "grid3" });
    } else if (gridState === "grid3") {
      set({ gridState: "grid9" });
    }
  },
}));

export default useGridStore;
