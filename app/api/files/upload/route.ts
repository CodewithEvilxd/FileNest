import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/database/drizzleClient";
import { files } from "@/database/schema";
import { STORAGE_LIMIT_BYTES, MAX_FILE_SIZE_BYTES, formatBytes, wouldExceedLimit } from "@/lib/storageUtils";
import { and, eq, sum } from "drizzle-orm";
import ImageKit from "imagekit";
// import { v2 as cloudinary } from "cloudinary"; // Uncomment after installing: npm install cloudinary
import { v4 as uuidv4 } from "uuid";

// Configure Cloudinary (uncomment after installing cloudinary package)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
//   api_key: process.env.CLOUDINARY_API_KEY || "",
//   api_secret: process.env.CLOUDINARY_API_SECRET || "",
// });

// Temporary Cloudinary mock for development (replace with real SDK after installation)
const cloudinary = {
  uploader: {
    upload: async (file: string, options: any): Promise<any> => {
      // This is a mock - replace with real Cloudinary upload after installing SDK
      throw new Error("Cloudinary SDK not installed. Run: npm install cloudinary");
    }
  }
};

// Primary ImageKit instance
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

// Secondary ImageKit instance (fallback)
const imagekit2 = new ImageKit({
  publicKey: process.env.IMAGEKIT2_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT2_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT2_URL_ENDPOINT || "",
});

// Tertiary ImageKit instance (third fallback)
const imagekit3 = new ImageKit({
  publicKey: process.env.IMAGEKIT3_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT3_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT3_URL_ENDPOINT || "",
});

// Quaternary ImageKit instance (fourth fallback)
const imagekit4 = new ImageKit({
  publicKey: process.env.IMAGEKIT4_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT4_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT4_URL_ENDPOINT || "",
});

// Quinary ImageKit instance (fifth fallback)
const imagekit5 = new ImageKit({
  publicKey: process.env.IMAGEKIT5_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT5_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT5_URL_ENDPOINT || "",
});

// Senary ImageKit instance (sixth fallback)
const imagekit6 = new ImageKit({
  publicKey: process.env.IMAGEKIT6_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT6_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT6_URL_ENDPOINT || "",
});

async function getUserStorageUsage(userId: string): Promise<number> {
  const result = await db
    .select({ totalSize: sum(files.size) })
    .from(files)
    .where(
      and(
        eq(files.userId, userId),
        eq(files.isInTrash, false),
        eq(files.isFolder, false)
      )
    );
  
  return result[0]?.totalSize ? Number(result[0].totalSize) : 0;
}

// Configure route for larger file uploads
export const maxDuration = 60; // 60 seconds for serverless functions
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const formUserId = formData.get("userId") as string;
    const parentId = (formData.get("parentId") as string) || null;

    if (formUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check individual file size limit
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `File too large. Maximum file size is ${formatBytes(MAX_FILE_SIZE_BYTES)}. Your file is ${formatBytes(file.size)}.`,
          maxFileSize: MAX_FILE_SIZE_BYTES,
          fileSize: file.size
        },
        { status: 413 }
      );
    }

    let currentUsage: number;
    try {
      currentUsage = await getUserStorageUsage(userId);
    } catch (storageError) {
      return NextResponse.json(
        { error: "Failed to check storage usage. Please try again." },
        { status: 500 }
      );
    }

    if (wouldExceedLimit(currentUsage, file.size)) {
      const remainingSpace = STORAGE_LIMIT_BYTES - currentUsage;

      return NextResponse.json(
        {
          error: `Storage limit exceeded. You've used ${formatBytes(currentUsage)} of ${formatBytes(STORAGE_LIMIT_BYTES)}. This file (${formatBytes(file.size)}) would exceed your storage limit.`,
          currentUsage,
          limit: STORAGE_LIMIT_BYTES,
          fileSize: file.size,
          remainingSpace: Math.max(0, remainingSpace)
        },
        { status: 413 } // 413 Payload Too Large
      );
    }

    if (parentId) {
      try {
        const [parentFolder] = await db
          .select()
          .from(files)
          .where(
            and(
              eq(files.id, parentId),
              eq(files.userId, userId),
              eq(files.isFolder, true)
            )
          );

        if (!parentFolder) {
          return NextResponse.json(
            { error: "Parent folder not found" },
            { status: 404 }
          );
        }
      } catch (dbError) {
        return NextResponse.json(
          { error: "Failed to verify parent folder. Please try again." },
          { status: 500 }
        );
      }
    }

    let buffer: ArrayBuffer;
    let fileBuffer: Buffer;
    try {
      buffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(buffer);
    } catch (bufferError) {
      return NextResponse.json(
        { error: "Failed to process the uploaded file. Please try again." },
        { status: 400 }
      );
    }

    const originalFilename = file.name;
    const fileExtension = originalFilename.split(".").pop() || "";
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;

    // Create folder path based on parent folder if exists
    const folderPath = parentId
      ? `/filenest/${userId}/folders/${parentId}`
      : `/filenest/${userId}`;

    let uploadResponse;
    let usedFallback = false;
    let fallbackAccount = 0; // 0 = primary, 1 = secondary, 2 = tertiary, 3 = quaternary, 4 = quinary, 5 = senary

    // Try all six ImageKit accounts, then Cloudinary as final fallback
    const imageKitInstances = [
      { instance: imagekit, name: "Primary ImageKit" },
      { instance: imagekit2, name: "Secondary ImageKit" },
      { instance: imagekit3, name: "Tertiary ImageKit" },
      { instance: imagekit4, name: "Quaternary ImageKit" },
      { instance: imagekit5, name: "Quinary ImageKit" },
      { instance: imagekit6, name: "Senary ImageKit" }
    ];

    // Try ImageKit accounts first
    for (let i = 0; i < imageKitInstances.length; i++) {
      const { instance, name } = imageKitInstances[i];

      try {
        uploadResponse = await instance.upload({
          file: fileBuffer,
          fileName: uniqueFilename,
          folder: folderPath,
          useUniqueFileName: false,
        });

        if (i > 0) {
          usedFallback = true;
          fallbackAccount = i;
        }
        break; // Success, exit the loop
} catch (error: any) {


        // If this is the last ImageKit account, try Cloudinary
        if (i === imageKitInstances.length - 1) {
          try {
            const cloudinaryResponse = await cloudinary.uploader.upload(
              `data:${file.type};base64,${fileBuffer.toString('base64')}`,
              {
                public_id: uniqueFilename,
                folder: folderPath.replace(/^\//, ''), // Remove leading slash for Cloudinary
                resource_type: 'auto'
              }
            );
            // Convert Cloudinary response to match ImageKit format
            uploadResponse = {
              fileId: cloudinaryResponse.public_id,
              url: cloudinaryResponse.secure_url,
              thumbnailUrl: cloudinaryResponse.secure_url, // Cloudinary doesn't have separate thumbnails by default
              filePath: cloudinaryResponse.public_id
            };
            usedFallback = true;
            fallbackAccount = 6; // Cloudinary is account 6 (after 6 ImageKit accounts)
          } catch (cloudinaryError: any) {
            return NextResponse.json(
              { error: "Failed to upload file to all storage services. All ImageKit accounts and Cloudinary are unavailable. Please try again later." },
              { status: 500 }
            );
          }
        }
      }
    }

    const fileData = {
      name: originalFilename,
      path: uploadResponse!.filePath,
      size: file.size,
      type: file.type,
      fileUrl: uploadResponse!.url,
      thumbnailUrl: uploadResponse!.thumbnailUrl || null,
      userId: userId,
      parentId: parentId,
      isFolder: false,
      isStarred: false,
      isInTrash: false,
    };

    let newFile;
    try {
      const result = await db.insert(files).values(fileData).returning();
      newFile = result[0];
    } catch (dbError: any) {
      return NextResponse.json(
        { error: "Failed to save file information. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...newFile,
      usedFallback: usedFallback,
      fallbackAccount: fallbackAccount // 0 = primary, 1 = secondary, 2 = tertiary, 3 = quaternary, 4 = quinary, 5 = senary, 6 = cloudinary
    });
  } catch (error: any) {

    // Handle ImageKit specific errors
    if (error.message?.includes('imagekit') || error.code?.includes('imagekit')) {
      return NextResponse.json(
        { error: "Failed to upload file to storage service. Please try again." },
        { status: 500 }
      );
    }

    // Handle database specific errors
    if (error.message?.includes('database') || error.code?.includes('database') || error.message?.includes('drizzle')) {
      return NextResponse.json(
        { error: "Failed to save file information. Please try again." },
        { status: 500 }
      );
    }

    // Handle file processing errors
    if (error.message?.includes('buffer') || error.message?.includes('arrayBuffer')) {
      return NextResponse.json(
        { error: "Failed to process the uploaded file. Please try again." },
        { status: 400 }
      );
    }

    // Handle storage limit errors (shouldn't reach here but just in case)
    if (error.message?.includes('storage') || error.message?.includes('limit')) {
      return NextResponse.json(
        { error: "Storage limit exceeded" },
        { status: 413 }
      );
    }

    // Generic error for any other issues
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}