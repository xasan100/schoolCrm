import React from "react";
import ReadRooms from "../components/rooms/ReadRooms";

export default function Rooms() {
  return (
    <div className="grid gap-3 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">Sinf xonalar</h1>
      <ReadRooms />
    </div>
  );
}
