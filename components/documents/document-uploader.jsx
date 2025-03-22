// File path: /components/documents/document-uploader.jsx
// Create this new component file

"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle, File, FileText, Upload, X } from "lucide-react";
import React, { useRef, useState } from 'react';

export default function DocumentUploader({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));

      setFiles([...files, ...newFiles]);
    }
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file type based on extension
  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'PDF';
    if (['doc', 'docx'].includes(ext)) return 'DOCX';
    if (['xls', 'xlsx'].includes(ext)) return 'XLSX';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'Image';
    return 'Other';
  };

  // Remove a file from the list
  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  // Clear all files
  const clearFiles = () => {
    setFiles([]);
    setUploadComplete(false);
    setError(null);
    setShowConfirmClear(false);
  };

  // Simulate file upload
  const uploadFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    setError(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);

          // Generate uploaded documents data
          const uploadedDocs = files.map(file => ({
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
            date: new Date(),
            category: getCategoryFromType(file.type),
          }));

          if (onUploadComplete) {
            onUploadComplete(uploadedDocs);
          }

          toast({
            title: "Upload complete",
            description: `Successfully uploaded ${files.length} file${files.length !== 1 ? 's' : ''}.`,
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Get icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType === 'PDF') {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (fileType === 'DOCX') {
      return <File className="h-8 w-8 text-blue-500" />;
    } else if (fileType === 'XLSX') {
      return <File className="h-8 w-8 text-green-500" />;
    } else if (fileType === 'Image') {
      return <File className="h-8 w-8 text-purple-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  // Determine document category from file type
  const getCategoryFromType = (fileType) => {
    if (fileType === 'PDF' || fileType === 'DOCX') return 'Resume';
    if (fileType === 'XLSX') return 'Other';
    if (fileType === 'Image') return 'Portfolio';
    return 'Other';
  };

  return (
    <div className="space-y-4">
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Click to upload or drag and drop</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              PDF, DOCX, XLSX, JPG, PNG up to 10MB
            </p>
            <Input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc,.xlsx,.xls,.jpg,.jpeg,.png"
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.click();
              }}
            >
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Selected Files ({files.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmClear(true)}
                disabled={uploading}
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>

            <div className="space-y-2">
              {files.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      getFileIcon(file.type)
                    )}
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>

            {uploading && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadComplete && (
              <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-md flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>All files uploaded successfully!</span>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <Button variant="outline" disabled={uploading} onClick={() => setShowConfirmClear(true)}>
              Cancel
            </Button>
            <Button
              disabled={uploading || files.length === 0 || uploadComplete}
              onClick={uploadFiles}
            >
              {uploading ? (
                <>
                  <span className="animate-spin mr-2">↻</span>
                  Uploading...
                </>
              ) : (
                <>Upload Files</>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Confirm clear dialog */}
      <AlertDialog open={showConfirmClear} onOpenChange={setShowConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all selected files. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearFiles}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}