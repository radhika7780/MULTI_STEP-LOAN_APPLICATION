import { PenTool, FileCheck, ShieldCheck, FileText, CheckSquare } from 'lucide-react';

export const ConsentSignature = () => {
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
          <div className="flex items-start space-x-3 pt-1">
            <input
              type="checkbox"
              id="applicationDeclaration"
              className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="applicationDeclaration"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              I agree to the application declaration.
            </label>
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
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="termsAndConditions"
                className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="termsAndConditions"
                className="text-sm font-medium text-gray-700 cursor-pointer select-none"
              >
                I have read and agree to the Terms & Conditions.
              </label>
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
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="privacyConsent"
                className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="privacyConsent"
                className="text-sm font-medium text-gray-700 cursor-pointer select-none"
              >
                I consent to the processing of my information.
              </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signature
            </label>
            <div className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center select-none transition-colors">
              <span className="text-gray-400 font-medium text-sm">
                Sign here
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Please provide your electronic signature.
            </p>
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
            />
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
          <div className="flex items-start space-x-3 pt-1">
            <input
              type="checkbox"
              id="finalAcknowledgement"
              className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="finalAcknowledgement"
              className="text-sm font-semibold text-gray-900 cursor-pointer select-none"
            >
              I confirm and acknowledge the above.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

