import { User, Home, Briefcase } from 'lucide-react';

export const LoanDetails = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your loan requirements to continue.
        </p>
      </div>

      {/* Main Layout: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Loan Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Personal Loan (Demonstration Selected State) */}
              <div className="border-2 border-blue-600 bg-blue-50/40 rounded-xl p-4 cursor-pointer hover:border-blue-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Personal Loan</h3>
                <p className="text-xs text-gray-500 mt-1">For personal expenses</p>
              </div>

              {/* Home Loan */}
              <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-3">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Home Loan</h3>
                <p className="text-xs text-gray-500 mt-1">
                  For buying or constructing a house
                </p>
              </div>

              {/* Business Loan */}
              <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Business Loan</h3>
                <p className="text-xs text-gray-500 mt-1">
                  For business expansion or working capital
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Loan Amount */}
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm font-medium">₹</span>
              </div>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                className="block w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                placeholder="Enter required loan amount"
              />
            </div>
          </div>

          {/* Section 3: Loan Purpose */}
          <div>
            <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700 mb-1">
              Loan Purpose
            </label>
            <select
              id="loanPurpose"
              name="loanPurpose"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select loan purpose
              </option>
              <option value="Education">Education</option>
              <option value="Medical">Medical</option>
              <option value="Home Renovation">Home Renovation</option>
              <option value="Business Expansion">Business Expansion</option>
              <option value="Vehicle Purchase">Vehicle Purchase</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Section 4: Loan Tenure */}
          <div>
            <label htmlFor="loanTenure" className="block text-sm font-medium text-gray-700 mb-1">
              Loan Tenure
            </label>
            <select
              id="loanTenure"
              name="loanTenure"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select tenure
              </option>
              <option value="12">12 Months</option>
              <option value="24">24 Months</option>
              <option value="36">36 Months</option>
              <option value="48">48 Months</option>
              <option value="60">60 Months</option>
              <option value="84">84 Months</option>
              <option value="120">120 Months</option>
              <option value="240">240 Months</option>
              <option value="360">360 Months</option>
            </select>
          </div>
        </div>

        {/* Right Column: Loan Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-200">
              Loan Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Loan Type</span>
                <span className="font-medium text-gray-900">—</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Loan Amount</span>
                <span className="font-medium text-gray-900">—</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Purpose</span>
                <span className="font-medium text-gray-900">—</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Tenure</span>
                <span className="font-medium text-gray-900">—</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Estimated EMI</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
