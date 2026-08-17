import { useState } from 'react';
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
  CheckCircle2,
  Send,
  Loader2,
} from 'lucide-react';
import { useLoanStore } from '../store/loanStore';

export const ReviewSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<{
    appId: string;
    submissionDate: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loanDetails = useLoanStore((state) => state.loanDetails);
  const personalDetails = useLoanStore((state) => state.personalDetails);
  const kycDetails = useLoanStore((state) => state.kycDetails);
  const employmentDetails = useLoanStore((state) => state.employmentDetails);
  const addressDetails = useLoanStore((state) => state.addressDetails);
  const documents = useLoanStore((state) => state.documents);
  const consentSignature = useLoanStore((state) => state.consentSignature);

  // Validation checks for each section
  const isLoanDetailsValid =
    !!loanDetails.loanType &&
    typeof loanDetails.loanAmount === 'number' &&
    loanDetails.loanAmount > 0 &&
    !!loanDetails.loanPurpose &&
    !!loanDetails.loanTenure;

  const isPersonalDetailsValid =
    !!personalDetails.firstName &&
    personalDetails.firstName.trim().length >= 2 &&
    !!personalDetails.lastName &&
    personalDetails.lastName.trim().length >= 2 &&
    !!personalDetails.dateOfBirth &&
    !!personalDetails.gender &&
    !!personalDetails.mobileNumber &&
    /^\d{10}$/.test(personalDetails.mobileNumber) &&
    !!personalDetails.email &&
    !!personalDetails.maritalStatus;

  const isKYCValid =
    !!kycDetails.panNumber &&
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(kycDetails.panNumber) &&
    !!kycDetails.aadhaarNumber &&
    /^\d{12}$/.test(kycDetails.aadhaarNumber);

  const isEmploymentValid =
    (employmentDetails.employmentType === 'Salaried' ||
      employmentDetails.employmentType === 'Self-Employed') &&
    !!employmentDetails.employerOrBusinessName &&
    employmentDetails.employerOrBusinessName.trim().length >= 2 &&
    typeof employmentDetails.income === 'number' &&
    employmentDetails.income > 0 &&
    !!employmentDetails.workExperience &&
    (employmentDetails.employmentType === 'Salaried'
      ? !!employmentDetails.jobTitle && employmentDetails.jobTitle.trim().length >= 2
      : !!employmentDetails.businessType && employmentDetails.businessType.trim().length >= 2);

  const isCurrentAddressValid =
    !!addressDetails.currentAddressLine1 &&
    !!addressDetails.currentPinCode &&
    /^\d{6}$/.test(addressDetails.currentPinCode) &&
    !!addressDetails.currentState &&
    !!addressDetails.currentCity;

  const isPermanentAddressValid = addressDetails.sameAsCurrentAddress
    ? true
    : !!addressDetails.permanentAddressLine1 &&
      !!addressDetails.permanentPinCode &&
      /^\d{6}$/.test(addressDetails.permanentPinCode) &&
      !!addressDetails.permanentState &&
      !!addressDetails.permanentCity;

  const isAddressValid = isCurrentAddressValid && isPermanentAddressValid;

  const isDocumentsValid =
    !!documents.pan &&
    documents.pan.selected === true &&
    !!documents.aadhaar &&
    documents.aadhaar.selected === true &&
    !!documents.incomeProof &&
    documents.incomeProof.selected === true &&
    !!documents.addressProof &&
    documents.addressProof.selected === true;

  const isConsentValid =
    consentSignature.applicationDeclaration === true &&
    consentSignature.termsAccepted === true &&
    consentSignature.privacyConsent === true &&
    consentSignature.finalAcknowledgement === true &&
    !!consentSignature.signatureName &&
    consentSignature.signatureName.trim().length >= 2 &&
    !!consentSignature.signatureData;

  const incompleteSections: string[] = [];
  if (!isLoanDetailsValid) incompleteSections.push('Loan Details');
  if (!isPersonalDetailsValid) incompleteSections.push('Personal Details');
  if (!isKYCValid) incompleteSections.push('KYC Details');
  if (!isEmploymentValid) incompleteSections.push('Employment Details');
  if (!isAddressValid) incompleteSections.push('Address Details');
  if (!isDocumentsValid) incompleteSections.push('Documents');
  if (!isConsentValid) incompleteSections.push('Consent & Signature');

  const isApplicationComplete = incompleteSections.length === 0;

  const handleSubmit = () => {
    if (!isApplicationComplete || isSubmitting || isSubmitted) return;

    setSubmitError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomStr = '';
        for (let i = 0; i < 6; i++) {
          randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const appId = `LOAN-${dateStr}-${randomStr}`;
        const submissionDate = now.toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });

        setSubmissionData({ appId, submissionDate });
        setIsSubmitting(false);
        setIsSubmitted(true);
      } catch {
        setIsSubmitting(false);
        setSubmitError('Unable to complete submission. Please try again.');
      }
    }, 800);
  };

  if (isSubmitted && submissionData) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto py-4">
        {/* Success Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Application Submitted Successfully
            </h2>
            <p className="text-sm text-gray-600">
              Your loan application has been submitted successfully.
            </p>
          </div>

          {/* Submission Details Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-200 gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application Reference Number
              </span>
              <span className="font-mono font-bold text-blue-600 text-base">
                {submissionData.appId}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-200 gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Date
              </span>
              <span className="font-medium text-gray-900 text-sm">
                {submissionData.submissionDate}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Submitted
              </span>
            </div>
          </div>

          {/* Notice Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 font-medium">
            Please keep your application reference number for future correspondence.
          </div>
        </div>
      </div>
    );
  }

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

      {submitError && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Info / Validation Banner */}
      {isApplicationComplete ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center space-x-3 text-emerald-800 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">Application is ready for submission.</span>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1 text-amber-900 text-sm">
          <div className="flex items-center space-x-2 font-medium">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Please complete all required information before submitting.</span>
          </div>
          {incompleteSections.length > 0 && (
            <p className="text-xs text-amber-700 pl-7">
              Please complete: {incompleteSections.join(', ')}.
            </p>
          )}
        </div>
      )}

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
              <span className="font-medium text-gray-900">{loanDetails.loanType || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Amount</span>
              <span className="font-medium text-gray-900">
                {typeof loanDetails.loanAmount === 'number' && loanDetails.loanAmount > 0
                  ? `₹${loanDetails.loanAmount.toLocaleString('en-IN')}`
                  : '—'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Purpose</span>
              <span className="font-medium text-gray-900">{loanDetails.loanPurpose || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Loan Tenure</span>
              <span className="font-medium text-gray-900">{loanDetails.loanTenure || '—'}</span>
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
              <span className="font-medium text-gray-900">{personalDetails.firstName || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Last Name</span>
              <span className="font-medium text-gray-900">{personalDetails.lastName || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Date of Birth</span>
              <span className="font-medium text-gray-900">{personalDetails.dateOfBirth || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Gender</span>
              <span className="font-medium text-gray-900">{personalDetails.gender || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Mobile Number</span>
              <span className="font-medium text-gray-900">{personalDetails.mobileNumber || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Email Address</span>
              <span className="font-medium text-gray-900">{personalDetails.email || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Marital Status</span>
              <span className="font-medium text-gray-900">{personalDetails.maritalStatus || '—'}</span>
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
              <span className="font-medium text-gray-900">{kycDetails.panNumber || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">PAN Verification Status</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-0.5 ${
                  kycDetails.panVerified
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {kycDetails.panVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Aadhaar Number</span>
              <span className="font-medium text-gray-900">{kycDetails.aadhaarNumber || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Aadhaar Verification Status</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-0.5 ${
                  kycDetails.aadhaarVerified
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {kycDetails.aadhaarVerified ? 'Verified' : 'Not Verified'}
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
              <span className="font-medium text-gray-900">{employmentDetails.employmentType || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Employer / Business Name</span>
              <span className="font-medium text-gray-900">{employmentDetails.employerOrBusinessName || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Job Title / Role</span>
              <span className="font-medium text-gray-900">{employmentDetails.jobTitle || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Business Type</span>
              <span className="font-medium text-gray-900">{employmentDetails.businessType || '—'}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Monthly Income</span>
              <span className="font-medium text-gray-900">
                {typeof employmentDetails.income === 'number' && employmentDetails.income > 0
                  ? `₹${employmentDetails.income.toLocaleString('en-IN')}`
                  : '—'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Work Experience</span>
              <span className="font-medium text-gray-900">{employmentDetails.workExperience || '—'}</span>
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
                  <span className="font-medium text-gray-900">{addressDetails.currentAddressLine1 || '—'}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 2</span>
                  <span className="font-medium text-gray-900">{addressDetails.currentAddressLine2 || '—'}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">City</span>
                  <span className="font-medium text-gray-900">{addressDetails.currentCity || '—'}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">State</span>
                  <span className="font-medium text-gray-900">{addressDetails.currentState || '—'}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">PIN Code</span>
                  <span className="font-medium text-gray-900">{addressDetails.currentPinCode || '—'}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Post Office</span>
                  <span className="font-medium text-gray-900">{addressDetails.currentPostOffice || '—'}</span>
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
                  Same as current address:{' '}
                  <span className="font-medium text-gray-700">
                    {addressDetails.sameAsCurrentAddress ? 'Yes' : 'No'}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 1</span>
                  <span className="font-medium text-gray-900">
                    {addressDetails.sameAsCurrentAddress
                      ? addressDetails.currentAddressLine1 || '—'
                      : addressDetails.permanentAddressLine1 || '—'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Address Line 2</span>
                  <span className="font-medium text-gray-900">
                    {addressDetails.sameAsCurrentAddress
                      ? addressDetails.currentAddressLine2 || '—'
                      : addressDetails.permanentAddressLine2 || '—'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">City</span>
                  <span className="font-medium text-gray-900">
                    {addressDetails.sameAsCurrentAddress
                      ? addressDetails.currentCity || '—'
                      : addressDetails.permanentCity || '—'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">State</span>
                  <span className="font-medium text-gray-900">
                    {addressDetails.sameAsCurrentAddress
                      ? addressDetails.currentState || '—'
                      : addressDetails.permanentState || '—'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">PIN Code</span>
                  <span className="font-medium text-gray-900">
                    {addressDetails.sameAsCurrentAddress
                      ? addressDetails.currentPinCode || '—'
                      : addressDetails.permanentPinCode || '—'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Post Office</span>
                  <span className="font-medium text-gray-900">
                    {addressDetails.sameAsCurrentAddress
                      ? addressDetails.currentPostOffice || '—'
                      : addressDetails.permanentPostOffice || '—'}
                  </span>
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
            {/* PAN Card */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <span className="font-medium text-gray-700 block">PAN Card</span>
                <span className="text-xs text-gray-500">
                  {documents.pan && documents.pan.selected ? documents.pan.name : '—'}
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  documents.pan && documents.pan.selected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {documents.pan && documents.pan.selected ? 'Selected' : 'Not Uploaded'}
              </span>
            </div>

            {/* Aadhaar Card */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <span className="font-medium text-gray-700 block">Aadhaar Card</span>
                <span className="text-xs text-gray-500">
                  {documents.aadhaar && documents.aadhaar.selected ? documents.aadhaar.name : '—'}
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  documents.aadhaar && documents.aadhaar.selected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {documents.aadhaar && documents.aadhaar.selected ? 'Selected' : 'Not Uploaded'}
              </span>
            </div>

            {/* Income Proof */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <span className="font-medium text-gray-700 block">Income Proof</span>
                <span className="text-xs text-gray-500">
                  {documents.incomeProof && documents.incomeProof.selected
                    ? documents.incomeProof.name
                    : '—'}
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  documents.incomeProof && documents.incomeProof.selected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {documents.incomeProof && documents.incomeProof.selected ? 'Selected' : 'Not Uploaded'}
              </span>
            </div>

            {/* Address Proof */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <span className="font-medium text-gray-700 block">Address Proof</span>
                <span className="text-xs text-gray-500">
                  {documents.addressProof && documents.addressProof.selected
                    ? documents.addressProof.name
                    : '—'}
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  documents.addressProof && documents.addressProof.selected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {documents.addressProof && documents.addressProof.selected
                  ? 'Selected'
                  : 'Not Uploaded'}
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
              <span className="font-medium text-gray-900">
                {consentSignature.applicationDeclaration ? 'Accepted' : 'Not Accepted'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Terms & Conditions</span>
              <span className="font-medium text-gray-900">
                {consentSignature.termsAccepted ? 'Accepted' : 'Not Accepted'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Privacy Consent</span>
              <span className="font-medium text-gray-900">
                {consentSignature.privacyConsent ? 'Accepted' : 'Not Accepted'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Final Acknowledgement</span>
              <span className="font-medium text-gray-900">
                {consentSignature.finalAcknowledgement ? 'Accepted' : 'Not Accepted'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Signature Name</span>
              <span className="font-medium text-gray-900">
                {consentSignature.signatureName || '—'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Signature Status</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  consentSignature.signatureData
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {consentSignature.signatureData ? 'Signature captured' : 'Signature not provided'}
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
              onClick={handleSubmit}
              disabled={!isApplicationComplete || isSubmitting}
              className={`inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 font-semibold rounded-lg text-sm transition-colors shadow-sm ${
                isApplicationComplete && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


