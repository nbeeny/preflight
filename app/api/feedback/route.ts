import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "feedback.json");

export async function POST(req: Request) {
  const body = await req.json();

  let existing = [];

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, "utf8");

    existing = JSON.parse(file || "[]");
  }

  existing.push({
    ...body,
    timestamp: new Date().toISOString(),
  });

  fs.writeFileSync(
    filePath,
    JSON.stringify(existing, null, 2)
  );

  return NextResponse.json({
    success: true,
  });
}