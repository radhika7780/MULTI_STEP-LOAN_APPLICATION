import { useState, useRef } from 'react';
import { Upload, FileText, FileCheck } from 'lucide-react';

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

  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({
    panCard: null,
    aadhaarCard: null,
    incomeProof: null,
    addressProof: null,
  });

  const [fileErrors, setFileErrors] = useState<Record<string, string | null>>({
    panCard: null,
    aadhaarCard: null,
    incomeProof: null,
    addressProof: null,
  });

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (docId: string, file: File | null) => {
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    const isExtensionValid = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const isMimeValid = ALLOWED_TYPES.includes(fileType);

    // Validate File Type
    if (!isExtensionValid && !isMimeValid) {
      setFileErrors((prev) => ({
        ...prev,
        [docId]: 'Only PDF, JPG, JPEG, or PNG files are allowed.',
      }));
      setSelectedFiles((prev) => ({
        ...prev,
        [docId]: null,
      }));
      if (inputRefs.current[docId]) {
        inputRefs.current[docId]!.value = '';
      }
      return;
    }

    // Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      setFileErrors((prev) => ({
        ...prev,
        [docId]: 'File size must not exceed 5 MB.',
      }));
      setSelectedFiles((prev) => ({
        ...prev,
        [docId]: null,
      }));
      if (inputRefs.current[docId]) {
        inputRefs.current[docId]!.value = '';
      }
      return;
    }

    // Valid File
    setFileErrors((prev) => ({
      ...prev,
      [docId]: null,
    }));
    setSelectedFiles((prev) => ({
      ...prev,
      [docId]: file,
    }));
  };

  const handleRemoveFile = (docId: string) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [docId]: null,
    }));
    setFileErrors((prev) => ({
      ...prev,
      [docId]: null,
    }));
    if (inputRefs.current[docId]) {
      inputRefs.current[docId]!.value = '';
    }
  };

  const triggerFileInput = (docId: string) => {
    if (inputRefs.current[docId]) {
      inputRefs.current[docId]!.value = '';
      inputRefs.current[docId]!.click();
    }
  };

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
        {documentTypes.map((doc) => {
          const selectedFile = selectedFiles[doc.id];
          const hasError = !!fileErrors[doc.id];

          return (
            <div
              key={doc.id}
              className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Card Header: Title, Required Indicator & Status */}
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor={`file-input-${doc.id}`}
                    className="font-semibold text-gray-900 text-base flex items-center gap-1 cursor-pointer"
                  >
                    {doc.title}
                    {doc.required && <span className="text-red-500">*</span>}
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      selectedFile
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {selectedFile ? 'Selected' : 'Not Uploaded'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{doc.description}</p>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id={`file-input-${doc.id}`}
                  ref={(el) => (inputRefs.current[doc.id] = el)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleFileSelect(doc.id, file);
                  }}
                />

                {/* Upload Dropzone UI or Selected File View */}
                {selectedFile ? (
                  <div className="border-2 border-solid border-emerald-200 rounded-xl p-4 bg-emerald-50/40 flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-gray-900 truncate" title={selectedFile.name}>
                          {selectedFile.name}
                        </p>
                        <p className="text-[11px] text-gray-500">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(doc.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors shrink-0 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => triggerFileInput(doc.id)}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-blue-50/20 transition-colors cursor-pointer group ${
                      hasError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Drag & drop your file here
                    </p>
                    <span className="text-[11px] text-gray-400 mb-3">or</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput(doc.id);
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                    >
                      Choose File
                    </button>
                    <p className="text-[11px] text-gray-400 mt-2">No file selected</p>
                  </div>
                )}

                {/* Per-document error message */}
                {fileErrors[doc.id] && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {fileErrors[doc.id]}
                  </p>
                )}
              </div>

              {/* Supported Formats & File Info */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>PDF, JPG, or PNG</span>
                <span>Maximum file size: 5 MB</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


