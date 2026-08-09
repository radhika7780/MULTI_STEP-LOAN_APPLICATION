import { create } from 'zustand';

export interface LoanDetailsData {
  loanType: string;
  loanAmount: number | null;
  loanPurpose: string;
  loanTenure: string;
}

export interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  maritalStatus: string;
}

interface LoanStoreState {
  currentStep: number;
  totalSteps: number;
  loanDetails: LoanDetailsData;
  personalDetails: PersonalDetailsData;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
  setLoanDetails: (data: Partial<LoanDetailsData>) => void;
  clearLoanDetails: () => void;
  setPersonalDetails: (data: Partial<PersonalDetailsData>) => void;
  clearPersonalDetails: () => void;
}

export const useLoanStore = create<LoanStoreState>((set) => ({
  currentStep: 1,
  totalSteps: 8,
  loanDetails: {
    loanType: '',
    loanAmount: null,
    loanPurpose: '',
    loanTenure: '',
  },
  personalDetails: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    email: '',
    maritalStatus: '',
  },
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
  setLoanDetails: (data: Partial<LoanDetailsData>) =>
    set((state) => ({
      loanDetails: { ...state.loanDetails, ...data },
    })),
  clearLoanDetails: () =>
    set({
      loanDetails: {
        loanType: '',
        loanAmount: null,
        loanPurpose: '',
        loanTenure: '',
      },
    }),
  setPersonalDetails: (data: Partial<PersonalDetailsData>) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, ...data },
    })),
  clearPersonalDetails: () =>
    set({
      personalDetails: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        mobileNumber: '',
        email: '',
        maritalStatus: '',
      },
    }),
}));
