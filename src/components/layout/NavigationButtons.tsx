import { useLoanStore } from '../../store/loanStore';
import { Button } from '../common/Button';

interface NavigationButtonsProps {
  canProceed?: boolean;
}

export const NavigationButtons = ({ canProceed = true }: NavigationButtonsProps) => {
  const currentStep = useLoanStore((state) => state.currentStep);
  const totalSteps = useLoanStore((state) => state.totalSteps);
  const previousStep = useLoanStore((state) => state.previousStep);
  const nextStep = useLoanStore((state) => state.nextStep);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center mt-8 pt-4 border-t">
      <Button
        onClick={previousStep}
        disabled={isFirstStep}
        className={isFirstStep ? 'bg-gray-300 opacity-50 cursor-not-allowed' : ''}
      >
        Previous
      </Button>

      {isLastStep ? (
        <Button
          disabled={true}
          className="bg-gray-400 opacity-50 cursor-not-allowed"
        >
          Finish
        </Button>
      ) : (
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className={!canProceed ? 'bg-gray-300 opacity-50 cursor-not-allowed' : ''}
        >
          Next
        </Button>
      )}
    </div>
  );
};
