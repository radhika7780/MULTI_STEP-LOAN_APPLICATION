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

export interface KYCDetailsData {
  panNumber: string;
  aadhaarNumber: string;
  panVerified: boolean;
  aadhaarVerified: boolean;
}

export interface EmploymentDetailsData {
  employmentType: string;
  employerOrBusinessName: string;
  jobTitle: string;
  businessType: string;
  income: number | null;
  workExperience: string;
}

export interface AddressDetailsData {
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentPinCode: string;
  currentState: string;
  currentCity: string;
  currentPostOffice: string;

  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentPinCode: string;
  permanentState: string;
  permanentCity: string;
  permanentPostOffice: string;

  sameAsCurrentAddress: boolean;
}

export interface DocumentItemData {
  name: string;
  size: number;
  type: string;
  selected: boolean;
}

export interface DocumentsData {
  pan: DocumentItemData | null;
  aadhaar: DocumentItemData | null;
  incomeProof: DocumentItemData | null;
  addressProof: DocumentItemData | null;
}

export interface ConsentSignatureData {
  applicationDeclaration: boolean;
  termsAccepted: boolean;
  privacyConsent: boolean;
  signatureName: string;
  finalAcknowledgement: boolean;
  signatureData: string;
}

interface LoanStoreState {
  currentStep: number;
  totalSteps: number;
  loanDetails: LoanDetailsData;
  personalDetails: PersonalDetailsData;
  kycDetails: KYCDetailsData;
  employmentDetails: EmploymentDetailsData;
  addressDetails: AddressDetailsData;
  documents: DocumentsData;
  consentSignature: ConsentSignatureData;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
  setLoanDetails: (data: Partial<LoanDetailsData>) => void;
  clearLoanDetails: () => void;
  setPersonalDetails: (data: Partial<PersonalDetailsData>) => void;
  clearPersonalDetails: () => void;
  setKYCDetails: (data: Partial<KYCDetailsData>) => void;
  clearKYCDetails: () => void;
  setEmploymentDetails: (data: Partial<EmploymentDetailsData>) => void;
  clearEmploymentDetails: () => void;
  setAddressDetails: (data: Partial<AddressDetailsData>) => void;
  clearAddressDetails: () => void;
  setDocuments: (data: Partial<DocumentsData>) => void;
  clearDocuments: () => void;
  setConsentSignature: (data: Partial<ConsentSignatureData>) => void;
  clearConsentSignature: () => void;
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
  kycDetails: {
    panNumber: '',
    aadhaarNumber: '',
    panVerified: false,
    aadhaarVerified: false,
  },
  employmentDetails: {
    employmentType: '',
    employerOrBusinessName: '',
    jobTitle: '',
    businessType: '',
    income: null,
    workExperience: '',
  },
  addressDetails: {
    currentAddressLine1: '',
    currentAddressLine2: '',
    currentPinCode: '',
    currentState: '',
    currentCity: '',
    currentPostOffice: '',
    permanentAddressLine1: '',
    permanentAddressLine2: '',
    permanentPinCode: '',
    permanentState: '',
    permanentCity: '',
    permanentPostOffice: '',
    sameAsCurrentAddress: false,
  },
  documents: {
    pan: null,
    aadhaar: null,
    incomeProof: null,
    addressProof: null,
  },
  consentSignature: {
    applicationDeclaration: false,
    termsAccepted: false,
    privacyConsent: false,
    signatureName: '',
    finalAcknowledgement: false,
    signatureData: '',
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
  setKYCDetails: (data: Partial<KYCDetailsData>) =>
    set((state) => ({
      kycDetails: { ...state.kycDetails, ...data },
    })),
  clearKYCDetails: () =>
    set({
      kycDetails: {
        panNumber: '',
        aadhaarNumber: '',
        panVerified: false,
        aadhaarVerified: false,
      },
    }),
  setEmploymentDetails: (data: Partial<EmploymentDetailsData>) =>
    set((state) => ({
      employmentDetails: { ...state.employmentDetails, ...data },
    })),
  clearEmploymentDetails: () =>
    set({
      employmentDetails: {
        employmentType: '',
        employerOrBusinessName: '',
        jobTitle: '',
        businessType: '',
        income: null,
        workExperience: '',
      },
    }),
  setAddressDetails: (data: Partial<AddressDetailsData>) =>
    set((state) => ({
      addressDetails: { ...state.addressDetails, ...data },
    })),
  clearAddressDetails: () =>
    set({
      addressDetails: {
        currentAddressLine1: '',
        currentAddressLine2: '',
        currentPinCode: '',
        currentState: '',
        currentCity: '',
        currentPostOffice: '',
        permanentAddressLine1: '',
        permanentAddressLine2: '',
        permanentPinCode: '',
        permanentState: '',
        permanentCity: '',
        permanentPostOffice: '',
        sameAsCurrentAddress: false,
      },
    }),
  setDocuments: (data: Partial<DocumentsData>) =>
    set((state) => ({
      documents: { ...state.documents, ...data },
    })),
  clearDocuments: () =>
    set({
      documents: {
        pan: null,
        aadhaar: null,
        incomeProof: null,
        addressProof: null,
      },
    }),
  setConsentSignature: (data: Partial<ConsentSignatureData>) =>
    set((state) => ({
      consentSignature: { ...state.consentSignature, ...data },
    })),
  clearConsentSignature: () =>
    set({
      consentSignature: {
        applicationDeclaration: false,
        termsAccepted: false,
        privacyConsent: false,
        signatureName: '',
        finalAcknowledgement: false,
        signatureData: '',
      },
    }),
}));
