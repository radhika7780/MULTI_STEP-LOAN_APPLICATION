import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Home, Building } from 'lucide-react';
import { addressSchema, AddressFormData } from '../schemas/addressSchema';
import { useLoanStore } from '../store/loanStore';

interface AddressProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const Address = ({ onValidityChange }: AddressProps) => {
  const addressDetails = useLoanStore((state) => state.addressDetails);
  const setAddressDetails = useLoanStore((state) => state.setAddressDetails);

  const {
    register,
    setValue,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues: {
      currentAddressLine1: addressDetails.currentAddressLine1 || '',
      currentAddressLine2: addressDetails.currentAddressLine2 || '',
      currentPinCode: addressDetails.currentPinCode || '',
      currentState: addressDetails.currentState || '',
      currentCity: addressDetails.currentCity || '',
      currentPostOffice: addressDetails.currentPostOffice || '',
      permanentAddressLine1: addressDetails.permanentAddressLine1 || '',
      permanentAddressLine2: addressDetails.permanentAddressLine2 || '',
      permanentPinCode: addressDetails.permanentPinCode || '',
      permanentState: addressDetails.permanentState || '',
      permanentCity: addressDetails.permanentCity || '',
      permanentPostOffice: addressDetails.permanentPostOffice || '',
      sameAsCurrentAddress: addressDetails.sameAsCurrentAddress || false,
    },
  });

  const sameAsCurrentAddress = watch('sameAsCurrentAddress');
  const currentAddressLine1 = watch('currentAddressLine1');
  const currentAddressLine2 = watch('currentAddressLine2');
  const currentPinCode = watch('currentPinCode') || '';
  const currentState = watch('currentState');
  const currentCity = watch('currentCity');
  const currentPostOffice = watch('currentPostOffice');
  const permanentPinCode = watch('permanentPinCode') || '';
  const permanentState = watch('permanentState');
  const permanentCity = watch('permanentCity');
  const permanentPostOffice = watch('permanentPostOffice');

  // Sync form values to Zustand store
  useEffect(() => {
    const subscription = watch((values) => {
      setAddressDetails({
        currentAddressLine1: values.currentAddressLine1 || '',
        currentAddressLine2: values.currentAddressLine2 || '',
        currentPinCode: values.currentPinCode || '',
        currentState: values.currentState || '',
        currentCity: values.currentCity || '',
        currentPostOffice: values.currentPostOffice || '',
        permanentAddressLine1: values.permanentAddressLine1 || '',
        permanentAddressLine2: values.permanentAddressLine2 || '',
        permanentPinCode: values.permanentPinCode || '',
        permanentState: values.permanentState || '',
        permanentCity: values.permanentCity || '',
        permanentPostOffice: values.permanentPostOffice || '',
        sameAsCurrentAddress: values.sameAsCurrentAddress || false,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setAddressDetails]);

  // Select dropdown options state
  const [currentStateOptions, setCurrentStateOptions] = useState<string[]>([
    'Telangana',
    'Andhra Pradesh',
    'Karnataka',
    'Maharashtra',
  ]);
  const [currentCityOptions, setCurrentCityOptions] = useState<string[]>([
    'Hyderabad',
    'Secunderabad',
    'Bengaluru',
    'Mumbai',
    'Visakhapatnam',
  ]);
  const [currentPostOfficeOptions, setCurrentPostOfficeOptions] = useState<string[]>([
    'GPO',
    'Banjara Hills',
    'Kukatpally',
    'Madhapur',
    'Begumpet',
  ]);

  const [permanentStateOptions, setPermanentStateOptions] = useState<string[]>([
    'Telangana',
    'Andhra Pradesh',
    'Karnataka',
    'Maharashtra',
  ]);
  const [permanentCityOptions, setPermanentCityOptions] = useState<string[]>([
    'Hyderabad',
    'Secunderabad',
    'Bengaluru',
    'Mumbai',
    'Visakhapatnam',
  ]);
  const [permanentPostOfficeOptions, setPermanentPostOfficeOptions] = useState<string[]>([
    'GPO',
    'Banjara Hills',
    'Kukatpally',
    'Madhapur',
    'Begumpet',
  ]);

  // Restored values option synchronization
  useEffect(() => {
    if (addressDetails.currentState) {
      setCurrentStateOptions((prev) => Array.from(new Set([...prev, addressDetails.currentState])));
    }
    if (addressDetails.currentCity) {
      setCurrentCityOptions((prev) => Array.from(new Set([...prev, addressDetails.currentCity])));
    }
    if (addressDetails.currentPostOffice) {
      setCurrentPostOfficeOptions((prev) => Array.from(new Set([...prev, addressDetails.currentPostOffice])));
    }
    if (addressDetails.permanentState) {
      setPermanentStateOptions((prev) => Array.from(new Set([...prev, addressDetails.permanentState])));
    }
    if (addressDetails.permanentCity) {
      setPermanentCityOptions((prev) => Array.from(new Set([...prev, addressDetails.permanentCity])));
    }
    if (addressDetails.permanentPostOffice) {
      setPermanentPostOfficeOptions((prev) => Array.from(new Set([...prev, addressDetails.permanentPostOffice])));
    }
  }, [
    addressDetails.currentState,
    addressDetails.currentCity,
    addressDetails.currentPostOffice,
    addressDetails.permanentState,
    addressDetails.permanentCity,
    addressDetails.permanentPostOffice,
  ]);

  // Lookup state: Current Address
  const [currentLoading, setCurrentLoading] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [currentSuccess, setCurrentSuccess] = useState<boolean>(false);
  const lastLookedUpCurrentPin = useRef<string>(
    addressDetails.currentPinCode && addressDetails.currentPinCode.length === 6 && addressDetails.currentState ? addressDetails.currentPinCode : ''
  );

  // Lookup state: Permanent Address
  const [permanentLoading, setPermanentLoading] = useState<boolean>(false);
  const [permanentError, setPermanentError] = useState<string | null>(null);
  const [permanentSuccess, setPermanentSuccess] = useState<boolean>(false);
  const lastLookedUpPermanentPin = useRef<string>(
    addressDetails.permanentPinCode && addressDetails.permanentPinCode.length === 6 && addressDetails.permanentState ? addressDetails.permanentPinCode : ''
  );

  // Current Address PIN Lookup handler
  const handleCurrentLookup = async (pinOverride?: string) => {
    const pin = pinOverride || currentPinCode;
    if (!pin || pin.length !== 6 || !/^[0-9]{6}$/.test(pin)) return;

    setCurrentLoading(true);
    setCurrentError(null);
    setCurrentSuccess(false);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!response.ok) {
        throw new Error('Network response failed');
      }
      const data = await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0 &&
        data[0].Status === 'Success' &&
        Array.isArray(data[0].PostOffice) &&
        data[0].PostOffice.length > 0
      ) {
        const poList = data[0].PostOffice;
        const firstPo = poList[0];

        if (firstPo.State) {
          setCurrentStateOptions((prev) => Array.from(new Set([...prev, firstPo.State])));
          setValue('currentState', firstPo.State, { shouldValidate: true, shouldTouch: true });
        }

        if (firstPo.District) {
          setCurrentCityOptions((prev) => Array.from(new Set([...prev, firstPo.District])));
          setValue('currentCity', firstPo.District, { shouldValidate: true, shouldTouch: true });
        }

        const poNames = poList.map((po: { Name: string }) => po.Name).filter(Boolean);
        if (poNames.length > 0) {
          setCurrentPostOfficeOptions((prev) => Array.from(new Set([...prev, ...poNames])));
          setValue('currentPostOffice', poNames[0], { shouldValidate: true, shouldTouch: true });
        }

        setCurrentSuccess(true);
        lastLookedUpCurrentPin.current = pin;
      } else {
        setCurrentError('Unable to find address details for this PIN code.');
      }
    } catch {
      setCurrentError('Unable to lookup PIN code. Please try again.');
    } finally {
      setCurrentLoading(false);
    }
  };

  // Permanent Address PIN Lookup handler
  const handlePermanentLookup = async (pinOverride?: string) => {
    if (sameAsCurrentAddress) return;
    const pin = pinOverride || permanentPinCode;
    if (!pin || pin.length !== 6 || !/^[0-9]{6}$/.test(pin)) return;

    setPermanentLoading(true);
    setPermanentError(null);
    setPermanentSuccess(false);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!response.ok) {
        throw new Error('Network response failed');
      }
      const data = await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0 &&
        data[0].Status === 'Success' &&
        Array.isArray(data[0].PostOffice) &&
        data[0].PostOffice.length > 0
      ) {
        const poList = data[0].PostOffice;
        const firstPo = poList[0];

        if (firstPo.State) {
          setPermanentStateOptions((prev) => Array.from(new Set([...prev, firstPo.State])));
          setValue('permanentState', firstPo.State, { shouldValidate: true, shouldTouch: true });
        }

        if (firstPo.District) {
          setPermanentCityOptions((prev) => Array.from(new Set([...prev, firstPo.District])));
          setValue('permanentCity', firstPo.District, { shouldValidate: true, shouldTouch: true });
        }

        const poNames = poList.map((po: { Name: string }) => po.Name).filter(Boolean);
        if (poNames.length > 0) {
          setPermanentPostOfficeOptions((prev) => Array.from(new Set([...prev, ...poNames])));
          setValue('permanentPostOffice', poNames[0], { shouldValidate: true, shouldTouch: true });
        }

        setPermanentSuccess(true);
        lastLookedUpPermanentPin.current = pin;
      } else {
        setPermanentError('Unable to find address details for this PIN code.');
      }
    } catch {
      setPermanentError('Unable to lookup PIN code. Please try again.');
    } finally {
      setPermanentLoading(false);
    }
  };

  // Current PIN change handler & PIN stale data clear
  const handleCurrentPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = val;
    setValue('currentPinCode', val, { shouldValidate: true, shouldTouch: true });

    // Clear stale location data if PIN changes away from previous looked up PIN
    if (lastLookedUpCurrentPin.current && val !== lastLookedUpCurrentPin.current) {
      setValue('currentState', '', { shouldValidate: true, shouldTouch: true });
      setValue('currentCity', '', { shouldValidate: true, shouldTouch: true });
      setValue('currentPostOffice', '', { shouldValidate: true, shouldTouch: true });
      setCurrentError(null);
      setCurrentSuccess(false);
      lastLookedUpCurrentPin.current = '';
    }

    // Auto trigger lookup when valid 6 digits entered
    if (val.length === 6 && /^[0-9]{6}$/.test(val) && val !== lastLookedUpCurrentPin.current) {
      handleCurrentLookup(val);
    }
  };

  // Permanent PIN change handler & PIN stale data clear
  const handlePermanentPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sameAsCurrentAddress) return;
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = val;
    setValue('permanentPinCode', val, { shouldValidate: true, shouldTouch: true });

    // Clear stale location data if PIN changes away from previous looked up PIN
    if (lastLookedUpPermanentPin.current && val !== lastLookedUpPermanentPin.current) {
      setValue('permanentState', '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentCity', '', { shouldValidate: true, shouldTouch: true });
      setValue('permanentPostOffice', '', { shouldValidate: true, shouldTouch: true });
      setPermanentError(null);
      setPermanentSuccess(false);
      lastLookedUpPermanentPin.current = '';
    }

    // Auto trigger lookup when valid 6 digits entered
    if (val.length === 6 && /^[0-9]{6}$/.test(val) && val !== lastLookedUpPermanentPin.current) {
      handlePermanentLookup(val);
    }
  };

  // Handle same-as-current address copy & synchronization
  useEffect(() => {
    if (sameAsCurrentAddress) {
      setPermanentError(null);
      setPermanentSuccess(false);
      setPermanentStateOptions((prev) => Array.from(new Set([...prev, ...currentStateOptions])));
      setPermanentCityOptions((prev) => Array.from(new Set([...prev, ...currentCityOptions])));
      setPermanentPostOfficeOptions((prev) => Array.from(new Set([...prev, ...currentPostOfficeOptions])));

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
    currentStateOptions,
    currentCityOptions,
    currentPostOfficeOptions,
    setValue,
  ]);

  // Form validity callback
  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

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
            <div className="flex gap-2">
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
              <button
                type="button"
                onClick={() => handleCurrentLookup()}
                disabled={currentPinCode.length !== 6 || !/^[0-9]{6}$/.test(currentPinCode) || currentLoading}
                className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg whitespace-nowrap transition-colors"
              >
                {currentLoading ? 'Looking up...' : 'Lookup PIN'}
              </button>
            </div>

            {currentLoading && (
              <p className="text-xs text-blue-600 mt-1">Looking up PIN code...</p>
            )}
            {currentError && !currentLoading && (
              <p role="alert" className="text-xs text-red-500 mt-1">{currentError}</p>
            )}
            {currentSuccess && !currentError && !currentLoading && (
              <p className="text-xs text-green-600 mt-1">PIN code details found.</p>
            )}
            {touchedFields.currentPinCode && errors.currentPinCode && !currentLoading && !currentError && !currentSuccess && (
              <p id="currentPinCode-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.currentPinCode.message}
              </p>
            )}
            {!currentLoading && !currentError && !currentSuccess && (!touchedFields.currentPinCode || !errors.currentPinCode) && (
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
              value={currentState || ''}
              {...register('currentState')}
            >
              <option value="" disabled>
                Select state
              </option>
              {currentStateOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
              value={currentCity || ''}
              {...register('currentCity')}
            >
              <option value="" disabled>
                Select city
              </option>
              {currentCityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
              value={currentPostOffice || ''}
              {...register('currentPostOffice')}
            >
              <option value="" disabled>
                Select post office
              </option>
              {currentPostOfficeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
              disabled={sameAsCurrentAddress}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              disabled={sameAsCurrentAddress}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                id="permanentPinCode"
                placeholder="Enter 6-digit PIN code"
                disabled={sameAsCurrentAddress}
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-mono disabled:bg-gray-100 disabled:cursor-not-allowed"
                aria-invalid={touchedFields.permanentPinCode && !!errors.permanentPinCode}
                aria-describedby={errors.permanentPinCode ? 'permanentPinCode-error' : undefined}
                {...register('permanentPinCode', {
                  onChange: handlePermanentPinChange,
                })}
              />
              <button
                type="button"
                onClick={() => handlePermanentLookup()}
                disabled={sameAsCurrentAddress || permanentPinCode.length !== 6 || !/^[0-9]{6}$/.test(permanentPinCode) || permanentLoading}
                className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg whitespace-nowrap transition-colors"
              >
                {permanentLoading ? 'Looking up...' : 'Lookup PIN'}
              </button>
            </div>

            {!sameAsCurrentAddress && permanentLoading && (
              <p className="text-xs text-blue-600 mt-1">Looking up PIN code...</p>
            )}
            {!sameAsCurrentAddress && permanentError && !permanentLoading && (
              <p role="alert" className="text-xs text-red-500 mt-1">{permanentError}</p>
            )}
            {!sameAsCurrentAddress && permanentSuccess && !permanentError && !permanentLoading && (
              <p className="text-xs text-green-600 mt-1">PIN code details found.</p>
            )}
            {!sameAsCurrentAddress && touchedFields.permanentPinCode && errors.permanentPinCode && !permanentLoading && !permanentError && !permanentSuccess && (
              <p id="permanentPinCode-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.permanentPinCode.message}
              </p>
            )}
            {!sameAsCurrentAddress && !permanentLoading && !permanentError && !permanentSuccess && (!touchedFields.permanentPinCode || !errors.permanentPinCode) && (
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
              disabled={sameAsCurrentAddress}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-invalid={touchedFields.permanentState && !!errors.permanentState}
              aria-describedby={errors.permanentState ? 'permanentState-error' : undefined}
              value={permanentState || ''}
              {...register('permanentState')}
            >
              <option value="" disabled>
                Select state
              </option>
              {permanentStateOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
              disabled={sameAsCurrentAddress}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-invalid={touchedFields.permanentCity && !!errors.permanentCity}
              aria-describedby={errors.permanentCity ? 'permanentCity-error' : undefined}
              value={permanentCity || ''}
              {...register('permanentCity')}
            >
              <option value="" disabled>
                Select city
              </option>
              {permanentCityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
              disabled={sameAsCurrentAddress}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-invalid={touchedFields.permanentPostOffice && !!errors.permanentPostOffice}
              aria-describedby={errors.permanentPostOffice ? 'permanentPostOffice-error' : undefined}
              value={permanentPostOffice || ''}
              {...register('permanentPostOffice')}
            >
              <option value="" disabled>
                Select post office
              </option>
              {permanentPostOfficeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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

