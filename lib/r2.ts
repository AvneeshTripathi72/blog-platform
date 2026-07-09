import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getServerEnv } from "@/lib/env";

const allowedContentTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function createSignedUploadUrl({
  contentType,
  folder,
  extension
}: {
  contentType: string;
  folder: "avatars" | "covers" | "blogs" | "attachments" | "thumbnails";
  extension: string;
}) {
  if (!allowedContentTypes.has(contentType)) {
    throw new Error("Unsupported content type.");
  }

  const env = getServerEnv();
  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY
    }
  });

  const key = `${folder}/${randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60
  });

  return {
    key,
    signedUrl,
    publicUrl: `${env.R2_PUBLIC_URL}/${key}`
  };
}
