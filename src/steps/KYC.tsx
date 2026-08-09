import { ShieldCheck, CreditCard, FileText } from 'lucide-react';

export const KYC = () => {
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
        <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
                PAN Number <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter your 10-character PAN number.
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              Not Verified
            </span>
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
            />
          </div>
        </div>

        {/* Section 2: Aadhaar */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">
                Aadhaar Number <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter your 12-digit Aadhaar number.
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              Not Verified
            </span>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
