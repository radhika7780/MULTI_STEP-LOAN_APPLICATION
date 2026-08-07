import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoanStore } from '../../store/loanStore';
import { ProgressBar } from './ProgressBar';
import { StepIndicator } from './StepIndicator';
import { NavigationButtons } from './NavigationButtons';

import { LoanDetails } from '../../steps/LoanDetails';
import { PersonalDetails } from '../../steps/PersonalDetails';
import { KYC } from '../../steps/KYC';
import { Employment } from '../../steps/Employment';
import { Address } from '../../steps/Address';
import { Documents } from '../../steps/Documents';
import { ConsentSignature } from '../../steps/ConsentSignature';
import { ReviewSubmit } from '../../steps/ReviewSubmit';

const STEPS = [
  LoanDetails,
  PersonalDetails,
  KYC,
  Employment,
  Address,
  Documents,
  ConsentSignature,
  ReviewSubmit,
];

export const Wizard = () => {
  const currentStep = useLoanStore((state) => state.currentStep);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState<boolean>(false);

  const CurrentStepComponent = STEPS[currentStep - 1];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ProgressBar />
      <StepIndicator />
      <div className="min-h-[250px] my-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {currentStep === 1 ? (
              <LoanDetails onValidityChange={setIsCurrentStepValid} />
            ) : (
              CurrentStepComponent && <CurrentStepComponent />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <NavigationButtons canProceed={currentStep === 1 ? isCurrentStepValid : true} />
    </div>
  );
};
