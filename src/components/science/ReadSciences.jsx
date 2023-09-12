import React from "react";
import { useGetSciencesQuery } from "../../redux/slice/sciences/SciencesSlice";
import Loader from "../Loader/Loader";
import AddSciences from "./AddSciences";
import DeleteScince from "./DeleteScience";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import UpdateSciences from "./UpdateScience";
import { LuEdit2 } from "react-icons/lu";

export default function ReadSciences() {
  const { data, isLoading } = useGetSciencesQuery();
  const [open, setOpen] = useState(false);
  const [science, setScience] = useState({});
  const handleChange = (item) => {
    setScience(item);
    setOpen(true);
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="md:col-span-1 sm:col-span-2 sx:col-span-2 shadow-lg p-4 sx:p-2 rounded-md">
        {open ? (
          <UpdateSciences object={science} setOpen={setOpen} />
        ) : (
          <AddSciences />
        )}
      </div>
      <div className="md:col-span-1 sm:col-span-2 sx:col-span-2 shadow-lg rounded-md p-4 sx:p-2">
        {isLoading ? (
          <Loader
            Color="#62B238"
            extraClass="col-span-12 flex justify-center items-center h-full"
          />
        ) : (
          <div className="flex justify-start gap-2 h-[75vh] sx:h-[52vh] flex-col w-full  overflow-y-scroll">
            {data.map((e, i) => (
              <div
                key={e.id}
                className="p-2 rounded-md border hover:bg-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <p className="text-lg">{i + 1}</p>
                  <p className="text-lg">{e.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <DeleteScince ID={e.id} />
                  <button
                    onClick={() => handleChange(e)}
                    type="button"
                    className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
                  >
                    <LuEdit2
                      className="-ml-0.5 mr-1.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="sm:block sx:hidden">Taxrirlash</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
