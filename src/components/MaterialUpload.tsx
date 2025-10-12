import React, { useState } from 'react';
import { Upload, Video, FileText, X, Link as LinkIcon } from 'lucide-react';

interface MaterialUploadProps {
  onUpload: (data: { fileUrl: string; fileType: 'video' | 'pdf' }) => void;
  onCancel: () => void;
}

export const MaterialUpload: React.FC<MaterialUploadProps> = ({ onUpload, onCancel }) => {
  const [fileType, setFileType] = useState<'video' | 'pdf'>('video');
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = () => {
    if (!fileUrl.trim()) return;

    onUpload({
      fileUrl: fileUrl.trim(),
      fileType
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold flex items-center space-x-2">
          <Upload className="w-5 h-5 text-amber-500" />
          <span>Add Media File</span>
        </h4>
        <button
          onClick={onCancel}
          className="p-1 text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">File Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFileType('video')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition ${
                fileType === 'video'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                  : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
              }`}
            >
              <Video className="w-5 h-5" />
              <span className="font-medium">Video</span>
            </button>
            <button
              onClick={() => setFileType('pdf')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition ${
                fileType === 'pdf'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                  : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">PDF</span>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="fileUrl" className="block text-sm font-medium text-slate-300 mb-2">
            {fileType === 'video' ? 'Video URL' : 'PDF URL'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="w-4 h-4 text-slate-500" />
            </div>
            <input
              id="fileUrl"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder={`https://example.com/${fileType === 'video' ? 'video.mp4' : 'document.pdf'}`}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            {fileType === 'video'
              ? 'Supports: YouTube, Vimeo, or direct video URLs (.mp4, .webm)'
              : 'Enter a direct link to a PDF file'
            }
          </p>
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!fileUrl.trim()}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
          >
            Add {fileType === 'video' ? 'Video' : 'PDF'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
