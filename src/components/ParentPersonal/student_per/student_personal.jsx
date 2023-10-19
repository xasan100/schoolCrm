import React from "react";
import { FaUserTie } from "react-icons/fa";
import { useTheme } from "../../context/index.jsx";

export default function StudentProfileCom() {

    const { profile: object } = useTheme();
    console.log(object, 'object');
    return (
        <div>

            <div className="flex  h-full  flex-row sm:flex-col sm:items-center sx:flex-col">
                <div className="  w-full px-2 h-full">
                    <div className="bg-white rounded-lg shadow-lg border p-2 flex items-center flex-col justify-center">
                        {object?.user?.image && object?.user.image !== "" ? (
                            <img
                                src={object?.user.image}
                                alt="avatar"
                                className="mx-auto rounded-full w-40 h-40 object-cover"
                            />
                        ) : (
                            <div className="w-40 h-30 rounded-full border bg-gray-200 flex justify-center items-center">
                                <FaUserTie className="text-7xl text-primary" />
                            </div>
                        )}

                        <span className=" text-center font-bold truncate">
                            {object?.user.first_name}
                        </span>
                        <span className=" text-center font-bold truncate">
                            {object.user.last_name}
                        </span>
                    </div>
                </div>
                <div className="d:w-2/3 sm:w-full sx:w-full p-2 h-full">
                    <div className="bg-white rounded-lg shadow-lg border p-4">
                        <h2 className="text-xl mb-1">Barcha malumotlar</h2>
                        <p>
                            <strong>Foydalanuvchi nomi:</strong> {object.user.username}
                        </p>
                        <p>
                            <strong>Ismi:</strong> {object?.user?.first_name}
                        </p>
                        <p>
                            <strong>Familiyasi:</strong> {object?.user.last_name}
                        </p>
                        <p>
                            <strong>Otasini Ismi:</strong> {object.user.middle_name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
