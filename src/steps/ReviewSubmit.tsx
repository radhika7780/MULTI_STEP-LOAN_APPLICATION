import {
  ClipboardCheck,
  Banknote,
  User,
  ShieldCheck,
  Briefcase,
  MapPin,
  FileText,
  PenTool,
  Edit3,
  AlertCircle,
  Send,
} from 'lucide-react';

export const ReviewSubmit = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <ClipboardCheck className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please review your application details carefully before submitting.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center space-x-3 text-blue-800 text-sm">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
        <span>
          Make sure all information is accurate before submitting your application.
        </span>
      </div>

      <div className="space-y-6">
        {/* Section 1: Loan Details */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Banknote className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">Loan Details</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Type</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Amount</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Purpose</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Tenure</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Estimated EMI</span>
              <span className="font-medium text-gray-400 italic">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Details */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">Personal Details</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="block text-xs font-medium text-gray-500">First Name</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Last Name</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Date of Birth</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Gender</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Mobile Number</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Email Address</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Marital Status</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
          </div>
        </div>

        {/* Section 3: KYC Details */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">KYC Details</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="block text-xs font-medium text-gray-500">PAN Number</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">PAN Verification Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mt-0.5">
                Not Verified
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Aadhaar Number</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Aadhaar Verification Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mt-0.5">
                Not Verified
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Employment Details */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">Employment Details</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="block text-xs font-medium text-gray-500">Employment Type</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Employer / Business Name</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Job Title / Role</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Business Type</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Monthly Income</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Work Experience</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
          </div>
        </div>

        {/* Section 5: Address Details */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">Address Details</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="space-y-4 text-sm">
            {/* Current Address */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Current Address
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 1</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 2</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">City</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">State</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">PIN Code</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Post Office</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
              </div>
            </div>

            {/* Permanent Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Permanent Address
                </h4>
                <span className="text-xs text-gray-500">
                  Same as current address: <span className="font-medium text-gray-700">—</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 1</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 2</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">City</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">State</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">PIN Code</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Post Office</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Documents */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">Documents</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-700">PAN Card</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                Not Uploaded
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-700">Aadhaar Card</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                Not Uploaded
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-700">Income Proof</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                Not Uploaded
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-700">Address Proof</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                Not Uploaded
              </span>
            </div>
          </div>
        </div>

        {/* Section 7: Consent & Signature */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <PenTool className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">Consent & Signature</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="block text-xs font-medium text-gray-500">Application Declaration</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Terms & Conditions</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Privacy Consent</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Final Acknowledgement</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Signature Name</span>
              <span className="font-medium text-gray-900">—</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Signature Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Signature captured
              </span>
            </div>
          </div>
        </div>

        {/* Final Submission Area */}
        <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4 shadow-md">
          <div>
            <h3 className="text-lg font-bold text-white">Ready to Submit?</h3>
            <p className="text-sm text-slate-300 mt-1">
              Please ensure that all the information provided in your application is correct and complete.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit Application</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

