import React from "react";
import AddRoom from "./AddRoom";

export default function ReadRooms() {
  return (
    <div className="grid grid-cols-12 gap-3 col-span-12">
      <AddRoom />
      <div className="col-span-3 py-4 border bg-white rounded-lg shadow-lg flex items-center justify-center">
        <h1 className="font-semibold">Xona 2</h1>
      </div>
    </div>
  );
}
