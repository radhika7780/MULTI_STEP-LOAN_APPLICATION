import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, CreditCard, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { kycSchema, KYCFormData } from '../schemas/kycSchema';
import { useLoanStore } from '../store/loanStore';

interface KYCProps {
  onValidityChange?: (isValid: boolean) => void;
}

type VerificationState = 'idle' | 'verifying' | 'verified';

export const KYC = ({ onValidityChange }: KYCProps) => {
  const kycDetails = useLoanStore((state) => state.kycDetails);
  const setKYCDetails = useLoanStore((state) => state.setKYCDetails);

  const [panState, setPanState] = useState<VerificationState>(
    kycDetails.panVerified ? 'verified' : 'idle'
  );
  const [aadhaarState, setAadhaarState] = useState<VerificationState>(
    kycDetails.aadhaarVerified ? 'verified' : 'idle'
  );

  const {
    register,
    watch,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<KYCFormData>({
    resolver: zodResolver(kycSchema),
    mode: 'onChange',
    defaultValues: {
      panNumber: kycDetails.panNumber || '',
      aadhaarNumber: kycDetails.aadhaarNumber || '',
    },
  });

  const watchedPan = watch('panNumber');
  const watchedAadhaar = watch('aadhaarNumber');

  // Watch subscription to sync form input values to Zustand
  useEffect(() => {
    const subscription = watch((value) => {
      setKYCDetails({
        panNumber: value.panNumber || '',
        aadhaarNumber: value.aadhaarNumber || '',
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setKYCDetails]);

  // Reset PAN verification state if input value changes
  const initialPanRef = useRef(kycDetails.panNumber);
  useEffect(() => {
    if (watchedPan !== undefined && watchedPan !== initialPanRef.current) {
      setPanState('idle');
      setKYCDetails({ panVerified: false });
      initialPanRef.current = watchedPan;
    }
  }, [watchedPan, setKYCDetails]);

  // Reset Aadhaar verification state if input value changes
  const initialAadhaarRef = useRef(kycDetails.aadhaarNumber);
  useEffect(() => {
    if (watchedAadhaar !== undefined && watchedAadhaar !== initialAadhaarRef.current) {
      setAadhaarState('idle');
      setKYCDetails({ aadhaarVerified: false });
      initialAadhaarRef.current = watchedAadhaar;
    }
  }, [watchedAadhaar, setKYCDetails]);

  // Compute complete KYC readiness (Form valid AND PAN verified AND Aadhaar verified)
  const isKYCComplete = isValid && panState === 'verified' && aadhaarState === 'verified';

  useEffect(() => {
    onValidityChange?.(isKYCComplete);
  }, [isKYCComplete, onValidityChange]);

  const isPanValid =
    !errors.panNumber &&
    !!watchedPan &&
    watchedPan.length === 10 &&
    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(watchedPan);

  const isAadhaarValid =
    !errors.aadhaarNumber &&
    !!watchedAadhaar &&
    watchedAadhaar.length === 12;

  const handleVerifyPan = async () => {
    const valid = await trigger('panNumber');
    if (!valid || panState === 'verifying') return;
    setPanState('verifying');
    setTimeout(() => {
      setPanState('verified');
      setKYCDetails({ panVerified: true });
    }, 1500);
  };

  const handleVerifyAadhaar = async () => {
    const valid = await trigger('aadhaarNumber');
    if (!valid || aadhaarState === 'verifying') return;
    setAadhaarState('verifying');
    setTimeout(() => {
      setAadhaarState('verified');
      setKYCDetails({ aadhaarVerified: true });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">KYC Verification</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your identity details for verification.
        </p>
      </div>

      {/* Form Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: PAN */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
                  PAN Number <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enter your 10-character PAN number.
                </p>
              </div>
              {panState === 'verified' ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> PAN Verified
                </span>
              ) : panState === 'verifying' ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Verifying...
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Not Verified
                </span>
              )}
            </div>

            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="panNumber"
                placeholder="Enter PAN number"
                maxLength={10}
                className="block w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-mono tracking-wider"
                aria-invalid={touchedFields.panNumber && !!errors.panNumber}
                aria-describedby={errors.panNumber ? 'panNumber-error' : undefined}
                {...register('panNumber', {
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase();
                  },
                })}
              />
            </div>
            {touchedFields.panNumber && errors.panNumber && (
              <p id="panNumber-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.panNumber.message}
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleVerifyPan}
              disabled={!isPanValid || panState !== 'idle'}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center ${
                panState === 'verified'
                  ? 'bg-emerald-100 text-emerald-700 cursor-default'
                  : panState === 'verifying'
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : isPanValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {panState === 'verifying' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Verifying PAN...
                </>
              ) : panState === 'verified' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified
                </>
              ) : (
                'Verify PAN'
              )}
            </button>
          </div>
        </div>

        {/* Section 2: Aadhaar */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enter your 12-digit Aadhaar number.
                </p>
              </div>
              {aadhaarState === 'verified' ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Aadhaar Verified
                </span>
              ) : aadhaarState === 'verifying' ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Verifying...
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Not Verified
                </span>
              )}
            </div>

            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FileText className="w-4 h-4" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                id="aadhaarNumber"
                placeholder="Enter 12-digit Aadhaar number"
                maxLength={12}
                className="block w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-mono tracking-wider"
                aria-invalid={touchedFields.aadhaarNumber && !!errors.aadhaarNumber}
                aria-describedby={errors.aadhaarNumber ? 'aadhaarNumber-error' : undefined}
                {...register('aadhaarNumber', {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                  },
                })}
              />
            </div>
            {touchedFields.aadhaarNumber && errors.aadhaarNumber && (
              <p id="aadhaarNumber-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.aadhaarNumber.message}
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleVerifyAadhaar}
              disabled={!isAadhaarValid || aadhaarState !== 'idle'}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center ${
                aadhaarState === 'verified'
                  ? 'bg-emerald-100 text-emerald-700 cursor-default'
                  : aadhaarState === 'verifying'
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : isAadhaarValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {aadhaarState === 'verifying' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Verifying Aadhaar...
                </>
              ) : aadhaarState === 'verified' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified
                </>
              ) : (
                'Verify Aadhaar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
