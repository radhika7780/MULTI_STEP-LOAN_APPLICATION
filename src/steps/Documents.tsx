import { Upload, FileText } from 'lucide-react';

export const Documents = () => {
  const documentTypes = [
    {
      id: 'panCard',
      title: 'PAN Card',
      description: 'Upload a clear copy of your PAN card.',
      required: true,
    },
    {
      id: 'aadhaarCard',
      title: 'Aadhaar Card',
      description: 'Upload a clear copy of your Aadhaar card.',
      required: true,
    },
    {
      id: 'incomeProof',
      title: 'Income Proof',
      description: 'Upload a recent income proof document.',
      required: true,
    },
    {
      id: 'addressProof',
      title: 'Address Proof',
      description: 'Upload a valid address proof document.',
      required: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please upload the required documents to continue.
        </p>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Title, Required Indicator & Status */}
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-base flex items-center gap-1">
                  {doc.title}
                  {doc.required && <span className="text-red-500">*</span>}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                  Not Uploaded
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">{doc.description}</p>

              {/* Upload Dropzone UI */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-blue-50/20 hover:border-blue-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-gray-700 mb-1">
                  Drag & drop your file here
                </p>
                <span className="text-[11px] text-gray-400 mb-3">or</span>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                >
                  Choose File
                </button>
                <p className="text-[11px] text-gray-400 mt-2">No file selected</p>
              </div>
            </div>

            {/* Supported Formats & File Info */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>PDF, JPG, or PNG</span>
              <span>Maximum file size: 5 MB</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

