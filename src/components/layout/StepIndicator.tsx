import { useLoanStore } from '../../store/loanStore';

const STEP_LABELS = [
  'Loan Details',
  'Personal Details',
  'KYC',
  'Employment',
  'Address',
  'Documents',
  'Consent & Signature',
  'Review & Submit',
];

export const StepIndicator = () => {
  const currentStep = useLoanStore((state) => state.currentStep);
  const totalSteps = useLoanStore((state) => state.totalSteps);
  const goToStep = useLoanStore((state) => state.goToStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between overflow-x-auto pb-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isClickable = stepNumber <= currentStep;

          let badgeStyle = 'bg-gray-200 text-gray-500 cursor-not-allowed';
          if (isCompleted) {
            badgeStyle = 'bg-green-500 text-white hover:bg-green-600 cursor-pointer';
          } else if (isCurrent) {
            badgeStyle = 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 cursor-pointer';
          }

          return (
            <div key={stepNumber} className="flex flex-col items-center min-w-[90px] mx-1">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && goToStep(stepNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${badgeStyle}`}
              >
                {stepNumber}
              </button>
              <span
                className={`text-xs mt-1 text-center font-medium ${
                  isCurrent ? 'text-blue-600 font-bold' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {STEP_LABELS[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
