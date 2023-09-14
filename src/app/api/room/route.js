import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: DB.rooms.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  console.log(payload);

  readDB();
  let role = null;
  role = payload.role;

  const body = await request.json();
  const roomNames = body.roomName;
  console.log(roomNames);
  let foundR = DB.rooms.find((std) => roomNames === std.roomName);

  if (foundR) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomNames} already exists`,
      },
      { status: 400 }
    );
  }
  console.log(roomNames);

  const roomId = nanoid();
  DB.rooms.push({ roomId, roomNames });
  writeDB();

  //call writeDB after modifying Database

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${roomNames} has been created`,
  });
};
