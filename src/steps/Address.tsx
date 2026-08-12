import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Home, Building } from 'lucide-react';
import { addressSchema, AddressFormData } from '../schemas/addressSchema';

interface AddressProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const Address = ({ onValidityChange }: AddressProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues: {
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
  });

  const sameAsCurrentAddress = watch('sameAsCurrentAddress');
  const currentAddressLine1 = watch('currentAddressLine1');
  const currentAddressLine2 = watch('currentAddressLine2');
  const currentPinCode = watch('currentPinCode');
  const currentState = watch('currentState');
  const currentCity = watch('currentCity');
  const currentPostOffice = watch('currentPostOffice');

  // Handle same-as-current address copy & synchronization
  useEffect(() => {
    if (sameAsCurrentAddress) {
      setValue('permanentAddressLine1', currentAddressLine1 || '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentAddressLine2', currentAddressLine2 || '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentPinCode', currentPinCode || '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentState', currentState || '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentCity', currentCity || '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentPostOffice', currentPostOffice || '', { shouldValidate: true, shouldTouch: true });
    }
  }, [
    sameAsCurrentAddress,
    currentAddressLine1,
    currentAddressLine2,
    currentPinCode,
    currentState,
    currentCity,
    currentPostOffice,
    setValue,
  ]);

  // Form validity callback
  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleCurrentPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = val;
    setValue('currentPinCode', val, { shouldValidate: true, shouldTouch: true });
  };

  const handlePermanentPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = val;
    setValue('permanentPinCode', val, { shouldValidate: true, shouldTouch: true });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Address Information</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your current and permanent address details.
        </p>
      </div>

      {/* Section 1: Current Address */}
      <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
          <Home className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-semibold text-gray-900">Current Address</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address Line 1 */}
          <div className="md:col-span-2">
            <label htmlFor="currentAddressLine1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currentAddressLine1"
              placeholder="Enter address line 1"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.currentAddressLine1 && !!errors.currentAddressLine1}
              aria-describedby={errors.currentAddressLine1 ? 'currentAddressLine1-error' : undefined}
              {...register('currentAddressLine1')}
            />
            {touchedFields.currentAddressLine1 && errors.currentAddressLine1 && (
              <p id="currentAddressLine1-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentAddressLine1.message}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="md:col-span-2">
            <label htmlFor="currentAddressLine2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              id="currentAddressLine2"
              placeholder="Enter address line 2"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.currentAddressLine2 && !!errors.currentAddressLine2}
              aria-describedby={errors.currentAddressLine2 ? 'currentAddressLine2-error' : undefined}
              {...register('currentAddressLine2')}
            />
            {touchedFields.currentAddressLine2 && errors.currentAddressLine2 && (
              <p id="currentAddressLine2-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentAddressLine2.message}
              </p>
            )}
          </div>

          {/* PIN Code */}
          <div>
            <label htmlFor="currentPinCode" className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              id="currentPinCode"
              placeholder="Enter 6-digit PIN code"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-mono"
              aria-invalid={touchedFields.currentPinCode && !!errors.currentPinCode}
              aria-describedby={errors.currentPinCode ? 'currentPinCode-error' : undefined}
              {...register('currentPinCode', {
                onChange: handleCurrentPinChange,
              })}
            />
            {touchedFields.currentPinCode && errors.currentPinCode ? (
              <p id="currentPinCode-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentPinCode.message}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">
                PIN code lookup will be available here.
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="currentState" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="currentState"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.currentState && !!errors.currentState}
              aria-describedby={errors.currentState ? 'currentState-error' : undefined}
              {...register('currentState')}
            >
              <option value="" disabled>
                Select state
              </option>
              <option value="Telangana">Telangana</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
            {touchedFields.currentState && errors.currentState && (
              <p id="currentState-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentState.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="currentCity" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="currentCity"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.currentCity && !!errors.currentCity}
              aria-describedby={errors.currentCity ? 'currentCity-error' : undefined}
              {...register('currentCity')}
            >
              <option value="" disabled>
                Select city
              </option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Secunderabad">Secunderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
            </select>
            {touchedFields.currentCity && errors.currentCity && (
              <p id="currentCity-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentCity.message}
              </p>
            )}
          </div>

          {/* Post Office */}
          <div>
            <label htmlFor="currentPostOffice" className="block text-sm font-medium text-gray-700 mb-1">
              Post Office <span className="text-red-500">*</span>
            </label>
            <select
              id="currentPostOffice"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.currentPostOffice && !!errors.currentPostOffice}
              aria-describedby={errors.currentPostOffice ? 'currentPostOffice-error' : undefined}
              {...register('currentPostOffice')}
            >
              <option value="" disabled>
                Select post office
              </option>
              <option value="GPO">GPO</option>
              <option value="Banjara Hills">Banjara Hills</option>
              <option value="Kukatpally">Kukatpally</option>
              <option value="Madhapur">Madhapur</option>
              <option value="Begumpet">Begumpet</option>
            </select>
            {touchedFields.currentPostOffice && errors.currentPostOffice && (
              <p id="currentPostOffice-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentPostOffice.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Same as Current Address Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsCurrentAddress"
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          {...register('sameAsCurrentAddress')}
        />
        <label htmlFor="sameAsCurrentAddress" className="text-sm font-medium text-gray-700 cursor-pointer">
          Permanent address is same as current address
        </label>
      </div>

      {/* Section 2: Permanent Address */}
      <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
          <Building className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-semibold text-gray-900">Permanent Address</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address Line 1 */}
          <div className="md:col-span-2">
            <label htmlFor="permanentAddressLine1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="permanentAddressLine1"
              placeholder="Enter address line 1"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.permanentAddressLine1 && !!errors.permanentAddressLine1}
              aria-describedby={errors.permanentAddressLine1 ? 'permanentAddressLine1-error' : undefined}
              {...register('permanentAddressLine1')}
            />
            {touchedFields.permanentAddressLine1 && errors.permanentAddressLine1 && (
              <p id="permanentAddressLine1-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentAddressLine1.message}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="md:col-span-2">
            <label htmlFor="permanentAddressLine2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              id="permanentAddressLine2"
              placeholder="Enter address line 2"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.permanentAddressLine2 && !!errors.permanentAddressLine2}
              aria-describedby={errors.permanentAddressLine2 ? 'permanentAddressLine2-error' : undefined}
              {...register('permanentAddressLine2')}
            />
            {touchedFields.permanentAddressLine2 && errors.permanentAddressLine2 && (
              <p id="permanentAddressLine2-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentAddressLine2.message}
              </p>
            )}
          </div>

          {/* PIN Code */}
          <div>
            <label htmlFor="permanentPinCode" className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              id="permanentPinCode"
              placeholder="Enter 6-digit PIN code"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-mono"
              aria-invalid={touchedFields.permanentPinCode && !!errors.permanentPinCode}
              aria-describedby={errors.permanentPinCode ? 'permanentPinCode-error' : undefined}
              {...register('permanentPinCode', {
                onChange: handlePermanentPinChange,
              })}
            />
            {touchedFields.permanentPinCode && errors.permanentPinCode ? (
              <p id="permanentPinCode-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentPinCode.message}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">
                PIN code lookup will be available here.
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="permanentState" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="permanentState"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.permanentState && !!errors.permanentState}
              aria-describedby={errors.permanentState ? 'permanentState-error' : undefined}
              {...register('permanentState')}
            >
              <option value="" disabled>
                Select state
              </option>
              <option value="Telangana">Telangana</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
            {touchedFields.permanentState && errors.permanentState && (
              <p id="permanentState-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentState.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="permanentCity" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="permanentCity"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.permanentCity && !!errors.permanentCity}
              aria-describedby={errors.permanentCity ? 'permanentCity-error' : undefined}
              {...register('permanentCity')}
            >
              <option value="" disabled>
                Select city
              </option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Secunderabad">Secunderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
            </select>
            {touchedFields.permanentCity && errors.permanentCity && (
              <p id="permanentCity-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentCity.message}
              </p>
            )}
          </div>

          {/* Post Office */}
          <div>
            <label htmlFor="permanentPostOffice" className="block text-sm font-medium text-gray-700 mb-1">
              Post Office <span className="text-red-500">*</span>
            </label>
            <select
              id="permanentPostOffice"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.permanentPostOffice && !!errors.permanentPostOffice}
              aria-describedby={errors.permanentPostOffice ? 'permanentPostOffice-error' : undefined}
              {...register('permanentPostOffice')}
            >
              <option value="" disabled>
                Select post office
              </option>
              <option value="GPO">GPO</option>
              <option value="Banjara Hills">Banjara Hills</option>
              <option value="Kukatpally">Kukatpally</option>
              <option value="Madhapur">Madhapur</option>
              <option value="Begumpet">Begumpet</option>
            </select>
            {touchedFields.permanentPostOffice && errors.permanentPostOffice && (
              <p id="permanentPostOffice-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentPostOffice.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
