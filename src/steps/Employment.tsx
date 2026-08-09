import { Briefcase, Building2, UserCheck } from 'lucide-react';

export const Employment = () => {
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
          <div className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Salaried</h3>
            <p className="text-xs text-gray-500 mt-1">Employed by an organization</p>
          </div>

          {/* Self-Employed Option */}
          <div className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Self-Employed</h3>
            <p className="text-xs text-gray-500 mt-1">Own or operate a business</p>
          </div>
        </div>
      </div>

      {/* Section 2: Basic Employment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employer / Business Name */}
        <div>
          <label htmlFor="employerName" className="block text-sm font-medium text-gray-700 mb-1">
            Employer / Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="employerName"
            placeholder="Enter company or business name"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        {/* Job Title / Business Type */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title / Business Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="jobTitle"
            placeholder="Enter job title or business type"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        {/* Income */}
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
            Income <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm font-medium">₹</span>
            </div>
            <input
              type="number"
              id="income"
              min="0"
              placeholder="Enter income amount"
              className="block w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
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
        </div>
      </div>
    </div>
  );
};
