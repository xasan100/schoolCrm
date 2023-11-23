import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { AiOutlineEye } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { apiUrl } from "../../api/Api.jsx";
import Loader from "../Loader/Loader.jsx";
import EmptyBox from "../EmptyBox/EmptyBox.jsx";


export default function View({ ID }) {

  const [open, setOpen] = useState(false);
  const [object, setData] = useState([])
  const onClose = () => setOpen(!open);
  const [loading, setLoading] = useState(false)



  const Open = async () => {
    setOpen(!open)
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}classes/${ID}/get_informations_of_class_pk/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      });
      const responseData = await response.json();
      if (responseData) {
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <div>
      <button
        onClick={() => Open()}
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <AiOutlineEye className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Ko'rish
      </button>
      {open && (
        <Modal closeModal={onClose} actionType="view">

          {
            loading ? <h1>Loading...</h1> :

              <div className="w-[80vw] p-4">
                <div className="flex w-full h-full md:items-stretch md:flex-row sm:flex-col sm:items-center sx:flex-col">
                  <div className="md:w-1/3 sm:w-full sx:w-full p-2 h-full">
                    {/* Left column for avatar, etc. */}
                    <div className="bg-white rounded-lg shadow-lg border p-4 flex items-center flex-col justify-center">
                      {
                        object?.teacher_object?.user?.image && object?.teacher_object?.user?.image !== "" ? (
                          <img
                            src={object?.teacher_object?.user?.image}
                            alt="avatar"
                            className="mx-auto rounded-full w-40 h-40 object-cover"
                          />
                        ) : (
                          <div className="w-40 h-40 rounded-full border bg-gray-200 flex justify-center items-center">
                            <FaUserTie className="text-7xl text-primary" />
                          </div>
                        )
                      }

                      <h2 className="mt-4 text-center font-bold truncate">
                        {object?.teacher_object?.user?.first_name}
                      </h2>
                      <h2 className="mt-1.5 text-center font-bold truncate">
                        {object?.teacher_object?.user?.last_name}

                      </h2>
                    </div>
                  </div>
                  <div className="d:w-2/3 sm:w-full  sx:w-full p-2 h-full">
                    <div className="bg-white rounded-lg shadow-lg border p-4">
                      <h2 className="text-xl mb-2">Barcha malumotlar</h2>
                      <p>
                        <strong>Sinif raxbarini Ismi:</strong> {object?.teacher_object?.user?.first_name || "O'qtuvchi biriktirilmagan"}
                      </p>
                      <p>
                        <strong>Sinif rahbar telfon raqami:</strong> {object?.teacher_object?.user?.username || "O'qtuvchi biriktirilmagan"}
                      </p>

                      <p>
                        <strong>O'quvchilar soni:</strong> {object?.students.length}
                      </p>
                      <p>
                        <strong>O'quvchilar ro'yxati:</strong>
                      </p>
                      <br />
                      <table className="border-collapse border">
                        <thead>
                          <tr>
                            <th className="border p-2">№</th>
                            <th className="border p-2">Ismi</th>
                            <th className="border p-2">Familiyasi</th>
                            <th className="border p-2">Telfon raqam</th>
                            <th className="border p-2">CHegirma turi</th>
                            <th className="border p-2">Turar joy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {object?.students?.map((val, index) => (
                            <tr key={val?.user?.id}>
                              <td className="border p-2">{index + 1}</td>
                              <td className="border p-2">
                                {val?.user?.first_name}
                              </td>
                              <td className="border p-2">
                                {val?.user?.last_name}
                              </td>
                              <td className="border p-2">
                                {val?.user?.username}
                              </td>
                              <td className="border p-2">
                                {val?.discount_type === 'EMPLOYER_CHILDREN' ? 'Xodim Farzadi' : '' || val?.discount_type === 'GRANT_FULL' ? 'Tuliq chegirma' : '' || val?.discount_type === 'GRANT_MONTH' ? 'Oylik chegirma' : '' || val.discount_type === 'FAMILY_CHILDREN' ? "Oilaviy Chegirma" : ''}
                              </td>
                              <td className="border p-2">
                                {val?.hostel ? 'Bor' : "Yoq"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>


                      <br />
                    </div>
                  </div>
                </div>
              </div>
          }
        </Modal>
      )}
    </div>
  );
}
