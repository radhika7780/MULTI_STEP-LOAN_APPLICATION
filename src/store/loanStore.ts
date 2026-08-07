import { create } from 'zustand';

interface LoanStoreState {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
}

export const useLoanStore = create<LoanStoreState>((set) => ({
  currentStep: 1,
  totalSteps: 8,
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  goToStep: (step: number) =>
    set((state) => {
      if (step >= 1 && step <= state.totalSteps && step <= state.currentStep) {
        return { currentStep: step };
      }
      return state;
    }),
  resetWizard: () => set({ currentStep: 1 }),
}));
