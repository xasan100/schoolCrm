import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { AiOutlineCalculator } from "react-icons/ai";
import { api, apiUrl } from "../../api/Api.jsx";
import { set } from "lodash";
import { LuEdit2 } from "react-icons/lu";
import EmptyBox from "../EmptyBox/EmptyBox.jsx";
import Loader from "../Loader/Loader.jsx";

export default function DebtesCom({ ID }) {
  const [skip, setOpen] = useState(true);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    open: false,
  });
  const [isLoading, setIsLoading] = useState(true)


  const [editedData, setEditedData] = useState(data.map((item) => ({ ...item, isEditing: false })));

  const onClose = () => {
    setOpen(!skip);
  };
  const Open = async () => {
    setOpen(!skip);
    const response = await fetch(`${apiUrl}student_debts/?student=${ID}`);
    const data = await response.json();
    setIsLoading(false);
    setData(data);

    setEditedData(data?.map((item) => ({ ...item, isEditing: false })));
  };

  const toggleEditing = (id) => {
    setEditedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleSaveClick = (id) => {
    const editedItem = editedData.find((item) => item.id === id);
    fetch(`${apiUrl}student_debts/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: editedItem.price,
        balance: editedItem.balance,
      }),
    })
      .then((response) => {

        if (response.status === 200) {
          setEditedData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, isEditing: false } : item
            )
          );
        } else {
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button
        onClick={() => Open()}
        type="button"
        className="inline-flex gap-2 items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400"
      >
        <AiOutlineCalculator />
        Qarzdorlik
      </button>
      {!skip && (
        <Modal closeModal={onClose} actionType="view">
          <div className="w-[90vw] h-[80vh] p-4">
            <div className="flex justify-between gap-x-6 px-2 py-3 items-center">
            </div>
            <ul className="divide-y-reverse overflow-y-scroll h-[68vh] divide-gray-100 border rounded-lg col-span-12">
              {
                isLoading ? (
                  <Loader
                    extraClass="col-span-12 flex justify-center"
                    Color="#62B238" />
                ) :
                  editedData.length > 0 ?
                    editedData.map((val, index) => {
                      const isEditing = val.isEditing;
                      return (
                        <li className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover-bg-gray-200">
                          <div>
                            <p>{index + 1}</p>
                          </div>
                          <div className="min-w-0 flex gap-2">
                            <p className="text-sm font-semibold leading-6 text-gray-900">

                              {val.created_date}

                            </p>
                          </div>

                          <div className="min-w-0 flex gap-2">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {isEditing ? (
                                <input
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  type="text"
                                  value={val.price}
                                  onChange={(e) =>
                                    setEditedData((prevData) =>
                                      prevData.map((item) =>
                                        item.id === val.id
                                          ? { ...item, price: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              ) : (
                                <span> Narx: &nbsp;{val.price}</span>
                              )}
                            </p>
                          </div>

                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            {val.balance >= 0 ? (
                              <p className="text-sm font-semibold leading-6 text-green-500">
                                Tulov Qilingan
                              </p>
                            ) : (
                              <p className="text-sm font-semibold leading-6 text-red-500">
                                Qarzdor
                              </p>
                            )}
                          </div>

                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {isEditing ? (
                              <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                                value={val.balance}
                                onChange={(e) =>
                                  setEditedData((prevData) =>
                                    prevData.map((item) =>
                                      item.id === val.id
                                        ? { ...item, balance: e.target.value }
                                        : item
                                    )
                                  )
                                }
                              />
                            ) : (
                              <span> Qolgan: &nbsp;{val.balance}</span>
                            )}
                          </p>
                          <div>
                            {isEditing ? (
                              <button
                                onClick={() => handleSaveClick(val.id)}
                                type="button"
                                className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleEditing(val.id)}
                                type="button"
                                className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
                              >
                                <LuEdit2 className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Taxrirlash
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })
                    : <EmptyBox />
              }
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

