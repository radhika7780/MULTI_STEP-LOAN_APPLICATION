import { MapPin, Home, Building } from 'lucide-react';

export const Address = () => {
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
            />
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
            />
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
            />
            <p className="text-xs text-gray-400 mt-1">
              PIN code lookup will be available here.
            </p>
          </div>

          {/* State */}
          <div>
            <label htmlFor="currentState" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="currentState"
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="" disabled>
                Select state
              </option>
            </select>
          </div>

          {/* City */}
          <div>
            <label htmlFor="currentCity" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="currentCity"
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="" disabled>
                Select city
              </option>
            </select>
          </div>

          {/* Post Office */}
          <div>
            <label htmlFor="currentPostOffice" className="block text-sm font-medium text-gray-700 mb-1">
              Post Office <span className="text-red-500">*</span>
            </label>
            <select
              id="currentPostOffice"
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="" disabled>
                Select post office
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Same as Current Address Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsCurrentAddress"
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
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
            />
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
            />
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
            />
            <p className="text-xs text-gray-400 mt-1">
              PIN code lookup will be available here.
            </p>
          </div>

          {/* State */}
          <div>
            <label htmlFor="permanentState" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="permanentState"
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="" disabled>
                Select state
              </option>
            </select>
          </div>

          {/* City */}
          <div>
            <label htmlFor="permanentCity" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="permanentCity"
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="" disabled>
                Select city
              </option>
            </select>
          </div>

          {/* Post Office */}
          <div>
            <label htmlFor="permanentPostOffice" className="block text-sm font-medium text-gray-700 mb-1">
              Post Office <span className="text-red-500">*</span>
            </label>
            <select
              id="permanentPostOffice"
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="" disabled>
                Select post office
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
