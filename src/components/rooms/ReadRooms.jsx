import React from "react";
import AddRoom from "./AddRoom";
import { useGetRoomsQuery } from "../../redux/slice/rooms/RoomsCrud";
import Loader from "../Loader/Loader";
import UpdateRoom from "./UpdateRoom";
import DeleteRoom from "./DeleteRoom";

export default function ReadRooms() {
  const { data, isLoading } = useGetRoomsQuery();
  return (
    <div className="grid grid-cols-12 gap-3 col-span-12 h-[78vh] overflow-y-scroll items-start">
      <AddRoom />
      {isLoading ? (
        <Loader extraClass="col-span-12 flex justify-center" Color="#62B238" />
      ) : (
        data?.map((room) => (
          <div
            key={room.id}
            className="col-span-3 py-6 border bg-white rounded-lg shadow-lg flex items-center justify-center relative group"
          >
            <div className="absolute top-2 right-2 flex items-center gap-2 invisible group-hover:visible duration-150">
              <UpdateRoom object={room} />
              <DeleteRoom ID={room.id} />
            </div>
            <h1 className="font-semibold">{room?.name}</h1>
          </div>
        ))
      )}
    </div>
  );
}
