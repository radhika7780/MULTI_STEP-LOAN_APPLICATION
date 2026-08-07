import { useLoanStore } from '../../store/loanStore';

export const ProgressBar = () => {
  const currentStep = useLoanStore((state) => state.currentStep);
  const totalSteps = useLoanStore((state) => state.totalSteps);

  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden mb-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
