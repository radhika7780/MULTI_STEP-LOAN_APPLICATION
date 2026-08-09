import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalDetailsSchema, PersonalDetailsFormData } from '../schemas/personalDetailsSchema';
import { useLoanStore } from '../store/loanStore';

interface PersonalDetailsProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const PersonalDetails = ({ onValidityChange }: PersonalDetailsProps) => {
  const personalDetails = useLoanStore((state) => state.personalDetails);
  const setPersonalDetails = useLoanStore((state) => state.setPersonalDetails);

  const {
    register,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: personalDetails.firstName || '',
      lastName: personalDetails.lastName || '',
      dateOfBirth: personalDetails.dateOfBirth || '',
      gender: (personalDetails.gender as 'Male' | 'Female' | 'Other') || undefined,
      mobileNumber: personalDetails.mobileNumber || '',
      email: personalDetails.email || '',
      maritalStatus: (personalDetails.maritalStatus as 'Single' | 'Married' | 'Divorced' | 'Widowed') || undefined,
    },
  });

  // Watch subscription to sync Zustand store
  useEffect(() => {
    const subscription = watch((value) => {
      setPersonalDetails({
        firstName: value.firstName || '',
        lastName: value.lastName || '',
        dateOfBirth: value.dateOfBirth || '',
        gender: value.gender || '',
        mobileNumber: value.mobileNumber || '',
        email: value.email || '',
        maritalStatus: value.maritalStatus || '',
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setPersonalDetails]);

  // Form validity callback
  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please enter your personal details to help us verify your identity.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.firstName && !!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            {...register('firstName')}
          />
          {touchedFields.firstName && errors.firstName && (
            <p id="firstName-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.lastName && !!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            {...register('lastName')}
          />
          {touchedFields.lastName && errors.lastName && (
            <p id="lastName-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            max={todayString}
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.dateOfBirth && !!errors.dateOfBirth}
            aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
            {...register('dateOfBirth')}
          />
          {touchedFields.dateOfBirth && errors.dateOfBirth && (
            <p id="dateOfBirth-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="md:col-span-2">
          <fieldset className="space-y-2">
            <legend className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </legend>
            <div className="flex items-center space-x-6 pt-1">
              <label htmlFor="gender-male" className="inline-flex items-center space-x-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  id="gender-male"
                  value="Male"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  aria-invalid={touchedFields.gender && !!errors.gender}
                  aria-describedby={errors.gender ? 'gender-error' : undefined}
                  {...register('gender')}
                />
                <span>Male</span>
              </label>
              <label htmlFor="gender-female" className="inline-flex items-center space-x-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  id="gender-female"
                  value="Female"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  aria-invalid={touchedFields.gender && !!errors.gender}
                  aria-describedby={errors.gender ? 'gender-error' : undefined}
                  {...register('gender')}
                />
                <span>Female</span>
              </label>
              <label htmlFor="gender-other" className="inline-flex items-center space-x-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  id="gender-other"
                  value="Other"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  aria-invalid={touchedFields.gender && !!errors.gender}
                  aria-describedby={errors.gender ? 'gender-error' : undefined}
                  {...register('gender')}
                />
                <span>Other</span>
              </label>
            </div>
            {touchedFields.gender && errors.gender && (
              <p id="gender-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </fieldset>
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            id="mobileNumber"
            placeholder="10-digit mobile number"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.mobileNumber && !!errors.mobileNumber}
            aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
            {...register('mobileNumber', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              },
            })}
          />
          {touchedFields.mobileNumber && errors.mobileNumber && (
            <p id="mobileNumber-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@domain.com"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.email && !!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {touchedFields.email && errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Marital Status */}
        <div>
          <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
            Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            id="maritalStatus"
            defaultValue=""
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            aria-invalid={touchedFields.maritalStatus && !!errors.maritalStatus}
            aria-describedby={errors.maritalStatus ? 'maritalStatus-error' : undefined}
            {...register('maritalStatus')}
          >
            <option value="" disabled>
              Select marital status
            </option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {touchedFields.maritalStatus && errors.maritalStatus && (
            <p id="maritalStatus-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
