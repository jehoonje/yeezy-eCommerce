import { create } from "zustand";

interface DrawerState {
  openDrawer: boolean;
  setOpenDrawer: (isOpen: boolean) => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  openDrawer: false,
  setOpenDrawer: (isOpen) => set({ openDrawer: isOpen }),
}));

export default useDrawerStore;
