import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Eye, ExternalLink, X, RefreshCw } from 'lucide-react';

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

  const [previewUrls, setPreviewUrls] = useState<Record<string, string | null>>({
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

  const [modalData, setModalData] = useState<{
    title: string;
    fileName: string;
    imageUrl: string;
  } | null>(null);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const previewUrlsRef = useRef<Record<string, string | null>>({
    panCard: null,
    aadhaarCard: null,
    incomeProof: null,
    addressProof: null,
  });

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrlsRef.current).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  // Keyboard close for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalData(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/') || /\.(jpg|jpeg|png)$/i.test(file.name);
  };

  const isPdfFile = (file: File): boolean => {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  };

  const updatePreviewUrl = (docId: string, url: string | null) => {
    if (previewUrlsRef.current[docId]) {
      URL.revokeObjectURL(previewUrlsRef.current[docId]!);
    }
    previewUrlsRef.current[docId] = url;
    setPreviewUrls((prev) => ({ ...prev, [docId]: url }));
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
      updatePreviewUrl(docId, null);
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
      updatePreviewUrl(docId, null);
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

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    updatePreviewUrl(docId, objectUrl);
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
    updatePreviewUrl(docId, null);
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
          const previewUrl = previewUrls[doc.id];
          const hasError = !!fileErrors[doc.id];
          const isImg = selectedFile ? isImageFile(selectedFile) : false;
          const isPdf = selectedFile ? isPdfFile(selectedFile) : false;

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
                {selectedFile && previewUrl ? (
                  <div className="border-2 border-solid border-emerald-200 rounded-xl p-4 bg-emerald-50/30 flex flex-col space-y-3">
                    <div className="flex items-start space-x-3">
                      {/* Image Thumbnail Preview */}
                      {isImg && (
                        <div
                          onClick={() =>
                            setModalData({
                              title: doc.title,
                              fileName: selectedFile.name,
                              imageUrl: previewUrl,
                            })
                          }
                          className="relative group cursor-pointer shrink-0"
                          title="Click to expand preview"
                        >
                          <img
                            src={previewUrl}
                            alt={`${doc.title} preview`}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:opacity-90 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}

                      {/* PDF Placeholder Preview */}
                      {isPdf && (
                        <div className="w-14 h-16 bg-red-50 text-red-600 rounded-lg flex flex-col items-center justify-center shrink-0 border border-red-100">
                          <FileText className="w-6 h-6 text-red-500 mb-0.5" />
                          <span className="text-[9px] font-bold tracking-tighter text-red-600 uppercase">PDF</span>
                        </div>
                      )}

                      {/* File Details */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-xs font-semibold text-gray-900 truncate" title={selectedFile.name}>
                          {selectedFile.name}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {formatFileSize(selectedFile.size)} {isPdf && '• PDF Document'}
                        </p>

                        {/* PDF External Tab Trigger */}
                        {isPdf && (
                          <button
                            type="button"
                            onClick={() => window.open(previewUrl, '_blank')}
                            className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 mt-1.5 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Open PDF
                          </button>
                        )}
                        {/* Image Modal Trigger Button */}
                        {isImg && (
                          <button
                            type="button"
                            onClick={() =>
                              setModalData({
                                title: doc.title,
                                fileName: selectedFile.name,
                                imageUrl: previewUrl,
                              })
                            }
                            className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 mt-1.5 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Image
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Card Actions: Replace & Remove */}
                    <div className="pt-2 border-t border-emerald-100 flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => triggerFileInput(doc.id)}
                        className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center"
                      >
                        <RefreshCw className="w-3 h-3 mr-1 text-gray-500" />
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(doc.id)}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
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

      {/* Image Preview Modal */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-5 space-y-4 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 id="modal-title" className="text-lg font-bold text-gray-900">
                  {modalData.title} Preview
                </h3>
                <p className="text-xs text-gray-500">{modalData.fileName}</p>
              </div>
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex items-center justify-center bg-gray-900/5 rounded-xl p-2 max-h-[70vh] overflow-hidden">
              <img
                src={modalData.imageUrl}
                alt={`${modalData.title} full view`}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



