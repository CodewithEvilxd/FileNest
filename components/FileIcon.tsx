"use client";

import { Archive, FileText, FileVideo, Folder, Image, Music } from "lucide-react";

type FileType = {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  userId: string;
  parentId: string | null;
  isFolder: boolean;
  isStarred: boolean;
  isInTrash: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function FileIcon({ file }: { file: FileType }) {
  if (file.isFolder) return <Folder className="h-5 w-5 text-blue-500" />;

  const fileType = file.type.split("/")[0];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const iconClass = "h-5 w-5";

  // Check for specific file extensions first
  switch (fileExtension) {
    case "pdf":
      return <FileText className={`${iconClass} text-red-500`} />;
    case "doc":
    case "docx":
      return <FileText className={`${iconClass} text-blue-600`} />;
    case "xls":
    case "xlsx":
      return <FileText className={`${iconClass} text-green-600`} />;
    case "ppt":
    case "pptx":
      return <FileText className={`${iconClass} text-orange-600`} />;
    case "txt":
      return <FileText className={`${iconClass} text-gray-600`} />;
    case "zip":
    case "rar":
    case "7z":
      return <Archive className={`${iconClass} text-yellow-600`} />;
  }

  // Fallback to MIME type categories
  switch (fileType) {
    case "image":
      return <Image className={`${iconClass} text-emerald-500`} />;
    case "video":
      return <FileVideo className={`${iconClass} text-purple-500`} />;
    case "audio":
      return <Music className={`${iconClass} text-pink-500`} />;
    case "application":
      return <FileText className={`${iconClass} text-indigo-500`} />;
    default:
      return <FileText className={`${iconClass} text-gray-500`} />;
  }
}