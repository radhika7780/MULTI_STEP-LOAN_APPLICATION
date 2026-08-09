import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Briefcase, Building2, UserCheck } from 'lucide-react';
import { employmentSchema, EmploymentFormData } from '../schemas/employmentSchema';
import { useLoanStore } from '../store/loanStore';

interface EmploymentProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const Employment = ({ onValidityChange }: EmploymentProps) => {
  const employmentDetails = useLoanStore((state) => state.employmentDetails);
  const setEmploymentDetails = useLoanStore((state) => state.setEmploymentDetails);

  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors, touchedFields, isValid },
  } = useForm<EmploymentFormData>({
    resolver: zodResolver(employmentSchema),
    mode: 'onChange',
    defaultValues: {
      employmentType: (employmentDetails.employmentType as 'Salaried' | 'Self-Employed') || undefined,
      employerOrBusinessName: employmentDetails.employerOrBusinessName || '',
      jobTitle: employmentDetails.jobTitle || '',
      businessType: employmentDetails.businessType || '',
      income: employmentDetails.income ?? undefined,
      workExperience: employmentDetails.workExperience || '',
    },
  });

  const selectedEmploymentType = watch('employmentType');

  // Sync form values to Zustand store
  useEffect(() => {
    const subscription = watch((value) => {
      setEmploymentDetails({
        employmentType: value.employmentType || '',
        employerOrBusinessName: value.employerOrBusinessName || '',
        jobTitle: value.jobTitle || '',
        businessType: value.businessType || '',
        income:
          value.income !== undefined && value.income !== null && value.income !== ''
            ? Number(value.income)
            : null,
        workExperience: value.workExperience || '',
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setEmploymentDetails]);

  // Form validity callback
  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleSelectEmploymentType = (type: 'Salaried' | 'Self-Employed') => {
    setValue('employmentType', type, { shouldValidate: true, shouldTouch: true });
    if (type === 'Salaried') {
      setValue('businessType', '', { shouldValidate: true });
      clearErrors('businessType');
    } else {
      setValue('jobTitle', '', { shouldValidate: true });
      clearErrors('jobTitle');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Employment Details</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your employment and income details.
        </p>
      </div>

      {/* Section 1: Employment Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Employment Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Salaried Option */}
          <div
            onClick={() => handleSelectEmploymentType('Salaried')}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
              selectedEmploymentType === 'Salaried'
                ? 'border-blue-600 bg-blue-50/40'
                : 'border-gray-200 hover:border-blue-400'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                selectedEmploymentType === 'Salaried'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Salaried</h3>
            <p className="text-xs text-gray-500 mt-1">Employed by an organization</p>
          </div>

          {/* Self-Employed Option */}
          <div
            onClick={() => handleSelectEmploymentType('Self-Employed')}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
              selectedEmploymentType === 'Self-Employed'
                ? 'border-blue-600 bg-blue-50/40'
                : 'border-gray-200 hover:border-blue-400'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                selectedEmploymentType === 'Self-Employed'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Self-Employed</h3>
            <p className="text-xs text-gray-500 mt-1">Own or operate a business</p>
          </div>
        </div>
        {touchedFields.employmentType && errors.employmentType && (
          <p id="employmentType-error" role="alert" className="text-xs text-red-500 mt-1">
            {errors.employmentType.message}
          </p>
        )}
      </div>

      {/* Section 2: Basic Employment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employer / Business Name */}
        <div>
          <label htmlFor="employerOrBusinessName" className="block text-sm font-medium text-gray-700 mb-1">
            {selectedEmploymentType === 'Salaried'
              ? 'Employer / Organization Name'
              : selectedEmploymentType === 'Self-Employed'
              ? 'Business / Organization Name'
              : 'Employer / Business Name'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="employerOrBusinessName"
            placeholder={
              selectedEmploymentType === 'Salaried'
                ? 'Enter employer name'
                : selectedEmploymentType === 'Self-Employed'
                ? 'Enter business name'
                : 'Enter company or business name'
            }
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.employerOrBusinessName && !!errors.employerOrBusinessName}
            aria-describedby={errors.employerOrBusinessName ? 'employerOrBusinessName-error' : undefined}
            {...register('employerOrBusinessName')}
          />
          {touchedFields.employerOrBusinessName && errors.employerOrBusinessName && (
            <p id="employerOrBusinessName-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.employerOrBusinessName.message}
            </p>
          )}
        </div>

        {/* Conditional Field: Job Title (Salaried) or Business Type (Self-Employed) */}
        {selectedEmploymentType === 'Self-Employed' ? (
          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
              Business Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="businessType"
              placeholder="Enter business type (e.g. Retail, IT Services)"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.businessType && !!errors.businessType}
              aria-describedby={errors.businessType ? 'businessType-error' : undefined}
              {...register('businessType')}
            />
            {touchedFields.businessType && errors.businessType && (
              <p id="businessType-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.businessType.message}
              </p>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              placeholder="Enter job title (e.g. Software Engineer)"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.jobTitle && !!errors.jobTitle}
              aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
              {...register('jobTitle')}
            />
            {touchedFields.jobTitle && errors.jobTitle && (
              <p id="jobTitle-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>
        )}

        {/* Income */}
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
            {selectedEmploymentType === 'Salaried'
              ? 'Monthly Income'
              : selectedEmploymentType === 'Self-Employed'
              ? 'Annual Income'
              : 'Income'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm font-medium">₹</span>
            </div>
            <input
              type="number"
              id="income"
              min="1"
              placeholder="Enter income amount"
              className="block w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.income && !!errors.income}
              aria-describedby={errors.income ? 'income-error' : undefined}
              {...register('income')}
            />
          </div>
          {touchedFields.income && errors.income && (
            <p id="income-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.income.message}
            </p>
          )}
        </div>

        {/* Work Experience */}
        <div>
          <label htmlFor="workExperience" className="block text-sm font-medium text-gray-700 mb-1">
            Work Experience <span className="text-red-500">*</span>
          </label>
          <select
            id="workExperience"
            defaultValue=""
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.workExperience && !!errors.workExperience}
            aria-describedby={errors.workExperience ? 'workExperience-error' : undefined}
            {...register('workExperience')}
          >
            <option value="" disabled>
              Select work experience
            </option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1–3 years">1–3 years</option>
            <option value="3–5 years">3–5 years</option>
            <option value="5–10 years">5–10 years</option>
            <option value="More than 10 years">More than 10 years</option>
          </select>
          {touchedFields.workExperience && errors.workExperience && (
            <p id="workExperience-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.workExperience.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
