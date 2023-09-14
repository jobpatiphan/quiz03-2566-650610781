import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Patiphan Klinhom",
    studentId: "650610781",
  });
};
