import { NextResponse } from "next/server";
import { z } from "zod";

import { requireUser } from "@/lib/auth";
import { createSignedUploadUrl } from "@/lib/r2";

const signUploadSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/avif"]),
  extension: z.enum(["jpg", "jpeg", "png", "webp", "avif"]),
  folder: z.enum(["avatars", "covers", "blogs", "attachments", "thumbnails"])
});

export async function POST(request: Request) {
  await requireUser();

  const payload = signUploadSchema.parse(await request.json());
  const data = await createSignedUploadUrl(payload);

  return NextResponse.json(data);
}
