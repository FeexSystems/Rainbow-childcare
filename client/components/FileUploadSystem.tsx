import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Image,
  FileText,
  Video,
  Music,
  File,
  CheckCircle,
  AlertCircle,
  Camera,
  Folder,
  Download,
  Trash2,
  Eye,
  Share2,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  category: "photo" | "document" | "video" | "other";
  tags?: string[];
  description?: string;
}

interface FileUploadProps {
  onFileUploaded?: (file: UploadedFile) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
  category?: "daily-photos" | "documents" | "certificates" | "general";
}

export function FileUploadSystem({
  onFileUploaded,
  acceptedTypes = ["image/*", "application/pdf", "video/*"],
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  category = "general",
}: FileUploadProps) {
  const { profile } = useAuth();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.startsWith("video/")) return Video;
    if (type.startsWith("audio/")) return Music;
    if (type.includes("pdf") || type.includes("document")) return FileText;
    return File;
  };

  const getFileCategory = (type: string): UploadedFile["category"] => {
    if (type.startsWith("image/")) return "photo";
    if (type.startsWith("video/")) return "video";
    if (type.includes("pdf") || type.includes("document")) return "document";
    return "other";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const simulateUpload = async (file: File): Promise<UploadedFile> => {
    const fileId = Date.now().toString();

    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Create mock URL (in real implementation, this would be from cloud storage)
          const mockUrl = URL.createObjectURL(file);

          const uploadedFile: UploadedFile = {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            url: mockUrl,
            uploadedAt: new Date(),
            category: getFileCategory(file.type),
            tags: [category],
            description: `Uploaded by ${profile?.full_name || "User"}`,
          };

          resolve(uploadedFile);
        }
        setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
      }, 100);
    });
  };

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const validFiles = Array.from(fileList).filter((file) => {
        if (file.size > maxSize) {
          alert(
            `File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}`,
          );
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      setUploading(true);

      try {
        const uploadPromises = validFiles.map(async (file) => {
          const uploadedFile = await simulateUpload(file);
          setFiles((prev) => [uploadedFile, ...prev]);
          onFileUploaded?.(uploadedFile);
          return uploadedFile;
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
        setUploadProgress({});
      }
    },
    [maxSize, onFileUploaded, profile?.full_name],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const openFileSelector = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>File Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
          >
            <input
              ref={inputRef}
              type="file"
              multiple={multiple}
              accept={acceptedTypes.join(",")}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              <motion.div
                animate={{ y: dragActive ? -5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
              </motion.div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {dragActive ? "Drop files here" : "Upload files"}
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop files here, or{" "}
                  <button
                    onClick={openFileSelector}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    browse
                  </button>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {acceptedTypes.map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            </div>
          </motion.div>

          {/* Upload Progress */}
          <AnimatePresence>
            {Object.keys(uploadProgress).length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* File Gallery */}
      {files.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Uploaded Files ({files.length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {files.map((file) => {
                  const IconComponent = getFileIcon(file.type);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="glass-card p-4 interactive-card"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {file.category === "photo" ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-gray-600" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {file.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {formatFileSize(file.size)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.uploadedAt.toLocaleDateString()}
                          </p>

                          {file.tags && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {file.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(file.url, "_blank")}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => removeFile(file.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card interactive-card">
          <CardContent className="p-6 text-center">
            <Camera className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold mb-2">Take Photo</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use camera to capture moments
            </p>
            <Button size="sm" className="w-full">
              Open Camera
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card interactive-card">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold mb-2">Scan Document</h3>
            <p className="text-sm text-gray-600 mb-3">
              Scan certificates and forms
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Scan Now
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card interactive-card">
          <CardContent className="p-6 text-center">
            <Video className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold mb-2">Record Video</h3>
            <p className="text-sm text-gray-600 mb-3">
              Capture special moments
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Record
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
