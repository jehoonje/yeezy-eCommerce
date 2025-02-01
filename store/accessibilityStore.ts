import create from 'zustand';

interface AccessibilityStore {
  accessibilityMode: boolean;
  toggleAccessibility: () => void;
}

const useAccessibilityStore = create<AccessibilityStore>((set) => ({
  accessibilityMode: false,
  toggleAccessibility: () =>
    set((state) => ({ accessibilityMode: !state.accessibilityMode })),
}));

export default useAccessibilityStore;
