import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PenTool, FileCheck, ShieldCheck, FileText, CheckSquare } from 'lucide-react';
import { consentSignatureSchema, ConsentSignatureFormData } from '../schemas/consentSignatureSchema';
import { useLoanStore } from '../store/loanStore';

interface ConsentSignatureProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const ConsentSignature = ({ onValidityChange }: ConsentSignatureProps) => {
  const consentSignature = useLoanStore((state) => state.consentSignature);
  const setConsentSignature = useLoanStore((state) => state.setConsentSignature);

  const [hasSignature, setHasSignature] = useState(!!consentSignature.signatureData);
  const [signatureTouched, setSignatureTouched] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const hasSignatureRef = useRef(!!consentSignature.signatureData);

  const {
    register,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<ConsentSignatureFormData>({
    resolver: zodResolver(consentSignatureSchema),
    mode: 'onChange',
    defaultValues: {
      applicationDeclaration: consentSignature.applicationDeclaration || false,
      termsAccepted: consentSignature.termsAccepted || false,
      privacyConsent: consentSignature.privacyConsent || false,
      signatureName: consentSignature.signatureName || '',
      finalAcknowledgement: consentSignature.finalAcknowledgement || false,
    },
  });

  // Sync form values to Zustand store
  useEffect(() => {
    const subscription = watch((values) => {
      setConsentSignature({
        applicationDeclaration: values.applicationDeclaration ?? false,
        termsAccepted: values.termsAccepted ?? false,
        privacyConsent: values.privacyConsent ?? false,
        signatureName: values.signatureName ?? '',
        finalAcknowledgement: values.finalAcknowledgement ?? false,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setConsentSignature]);

  const isStepValid = isValid && hasSignature;

  // Form validity callback
  useEffect(() => {
    onValidityChange?.(isStepValid);
  }, [isStepValid, onValidityChange]);

  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const storedSignature = useLoanStore.getState().consentSignature.signatureData;
    let dataUrl: string | null = null;

    if (hasSignatureRef.current) {
      if (storedSignature) {
        dataUrl = storedSignature;
      } else {
        try {
          dataUrl = canvas.toDataURL('image/png');
        } catch {
          dataUrl = null;
        }
      }
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;

    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = dataUrl;
    }
  };

  useEffect(() => {
    updateCanvasSize();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updateCanvasSize();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    setSignatureTouched(true);

    const { x, y } = getCoordinates(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(x, y);

    setHasSignature(true);
    hasSignatureRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      setConsentSignature({ signatureData: dataUrl });
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawingRef.current && (!canvasRef.current || !canvasRef.current.hasPointerCapture(e.pointerId))) {
      isDrawingRef.current = false;
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        setConsentSignature({ signatureData: dataUrl });
      }
    }
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
    hasSignatureRef.current = false;
    setConsentSignature({ signatureData: '' });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <PenTool className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Consent & Signature</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please review the declarations and provide your consent to proceed.
        </p>
      </div>

      {/* Grid container for Declarations and Consents */}
      <div className="space-y-6">
        {/* Section 1: Application Declaration */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-gray-900">Application Declaration</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            I confirm that the information provided in this loan application is true and complete to the best of my knowledge.
          </p>
          <div>
            <div className="flex items-start space-x-3 pt-1">
              <input
                type="checkbox"
                id="applicationDeclaration"
                className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                aria-invalid={touchedFields.applicationDeclaration && !!errors.applicationDeclaration}
                aria-describedby={errors.applicationDeclaration ? 'applicationDeclaration-error' : undefined}
                {...register('applicationDeclaration')}
              />
              <label
                htmlFor="applicationDeclaration"
                className="text-sm font-medium text-gray-700 cursor-pointer select-none"
              >
                I agree to the application declaration.
              </label>
            </div>
            {touchedFields.applicationDeclaration && errors.applicationDeclaration && (
              <p id="applicationDeclaration-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.applicationDeclaration.message}
              </p>
            )}
          </div>
        </div>

        {/* 2-column layout on desktop for Terms & Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 2: Terms & Conditions */}
          <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-semibold text-gray-900">Terms & Conditions</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                By proceeding with this application, I acknowledge that the information provided may be used for processing and evaluating my loan application.
              </p>
            </div>
            <div>
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  aria-invalid={touchedFields.termsAccepted && !!errors.termsAccepted}
                  aria-describedby={errors.termsAccepted ? 'termsAccepted-error' : undefined}
                  {...register('termsAccepted')}
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                  I have read and agree to the Terms & Conditions.
                </label>
              </div>
              {touchedFields.termsAccepted && errors.termsAccepted && (
                <p id="termsAccepted-error" role="alert" className="text-xs text-red-500 mt-1">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>
          </div>

          {/* Section 3: Privacy Consent */}
          <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-semibold text-gray-900">Privacy Consent</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                I consent to the processing of my personal information for the purpose of evaluating and processing this loan application.
              </p>
            </div>
            <div>
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  aria-invalid={touchedFields.privacyConsent && !!errors.privacyConsent}
                  aria-describedby={errors.privacyConsent ? 'privacyConsent-error' : undefined}
                  {...register('privacyConsent')}
                />
                <label
                  htmlFor="privacyConsent"
                  className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                  I consent to the processing of my information.
                </label>
              </div>
              {touchedFields.privacyConsent && errors.privacyConsent && (
                <p id="privacyConsent-error" role="alert" className="text-xs text-red-500 mt-1">
                  {errors.privacyConsent.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4 & Section 5: Electronic Signature & Signature Name */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <PenTool className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-gray-900">Electronic Signature</h3>
          </div>

          {/* Section 4: Signature Pad UI */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="signatureCanvas" className="block text-sm font-medium text-gray-700">
                Signature
              </label>
              {hasSignature && (
                <button
                  type="button"
                  onClick={handleClearSignature}
                  className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer transition-colors"
                >
                  Clear Signature
                </button>
              )}
            </div>

            <div
              ref={containerRef}
              className="relative w-full h-[180px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 overflow-hidden select-none transition-colors"
            >
              <canvas
                ref={canvasRef}
                id="signatureCanvas"
                aria-label="Electronic signature pad"
                aria-invalid={signatureTouched && !hasSignature}
                aria-describedby={signatureTouched && !hasSignature ? 'signatureCanvas-error' : undefined}
                className="w-full h-full cursor-crosshair touch-none block"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              />

              {!hasSignature && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="text-gray-400 font-medium text-sm">
                    Sign here
                  </span>
                </div>
              )}
            </div>

            {signatureTouched && !hasSignature ? (
              <p id="signatureCanvas-error" role="alert" className="text-xs text-red-500 mt-1">
                Please provide your electronic signature.
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">
                Please provide your electronic signature.
              </p>
            )}
          </div>

          {/* Section 5: Signature Name */}
          <div>
            <label htmlFor="signatureName" className="block text-sm font-medium text-gray-700 mb-1">
              Signature Name
            </label>
            <input
              type="text"
              id="signatureName"
              placeholder="Enter your full name"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              aria-invalid={touchedFields.signatureName && !!errors.signatureName}
              aria-describedby={errors.signatureName ? 'signatureName-error' : undefined}
              {...register('signatureName')}
            />
            {touchedFields.signatureName && errors.signatureName && (
              <p id="signatureName-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.signatureName.message}
              </p>
            )}
          </div>
        </div>

        {/* Section 6: Final Acknowledgement */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" />
            <h3 className="text-base font-semibold text-gray-900">Final Acknowledgement</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            I understand that submitting this application constitutes my electronic consent and acknowledgement of the information provided.
          </p>
          <div>
            <div className="flex items-start space-x-3 pt-1">
              <input
                type="checkbox"
                id="finalAcknowledgement"
                className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                aria-invalid={touchedFields.finalAcknowledgement && !!errors.finalAcknowledgement}
                aria-describedby={errors.finalAcknowledgement ? 'finalAcknowledgement-error' : undefined}
                {...register('finalAcknowledgement')}
              />
              <label
                htmlFor="finalAcknowledgement"
                className="text-sm font-semibold text-gray-900 cursor-pointer select-none"
              >
                I confirm and acknowledge the above.
              </label>
            </div>
            {touchedFields.finalAcknowledgement && errors.finalAcknowledgement && (
              <p id="finalAcknowledgement-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.finalAcknowledgement.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



