import React, { useState } from "react";
import { AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload";
import CustomInput from "react-phone-number-input/input";
import { useCreateStudentMutation } from "../../redux/slice/students/students.js";
import { toast } from "react-toastify";

export function AddStudentClas() {
  const [open, setOpen] = useState(false); // Fixed the typo here
  const [createStudent, { isLoading, isSuccess }] = useCreateStudentMutation();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
    idCard: "",
    date: "",
    class_of_school: "",
    id_card_parents: "",
    picture_3x4: "",
    school_tab: "",
    img: "",
    deleteId: "",
  });

  const addData = async () => {
    const formData = new FormData();
    formData.append('user.username', inputValue.username);
    formData.append('user.password', inputValue.password);
    formData.append('first_name', inputValue.firstName);
    formData.append('last_name', inputValue.lastName);
    formData.append('middle_name', inputValue.middleName);
    formData.append('id_card', inputValue.idCard);
    formData.append('date_of_admission', inputValue.date);
    formData.append('class_of_school', inputValue.class_of_school);
    formData.append('image', inputValue.img);
    formData.append('id_card_parents', inputValue.id_card_parents);
    formData.append('school_tab', inputValue.school_tab);
    formData.append('picture_3x4', inputValue.picture_3x4);

    try {
      await createStudent(formData).unwrap();
      toast.success(`O'quvchi ${inputValue.firstName} qo'shildi`);

      setOpen(false);
    } catch (error) {
      toast.error("O'qituvchi qo'shilmadi");
      console.error('Failed to add student:', error);
    }
  }
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="col-span-4">
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <AiOutlineUserAdd
          className="-ml-0.5 mr-1.5 text-xl"
          aria-hidden="true"
        />
        Sinf Qo'shish
      </button>
      {open && (
        <Modal
          loader={isLoading}
          closeModal={onClose} addFunc={addData}
          title={<h1>Sinf Qo'shish</h1>}>

          <div className=" grid col-span-2">
            <div className="flex flex-col gap-3">
              <input
                id="middle-name"
                name="middle_name"
                type="text"
                autoComplete="middle-name"
                required
                // onChange={(e) =>
                //   setInputValue({ ...inputValue, date: e.target.value })
                // }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              // onChange={(e) =>
              //   setInputValue({
              //     ...inputValue,
              //     class_of_school: e.target.value,
              //   }
              //   )
              // }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
            {/* table */}
            <div>
              <li className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200">
                <div className="flex min-w-0 gap-x-4">
                  {/* <h1>{index + 1}.</h1> */}
                  {/* {teacher?.image && teacher.image !== "" ? (
                    <img
                      src={teacher.image}
                      alt="Teacher"
                      className="h-12 w-12 flex-none rounded-full border object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border bg-gray-200 flex justify-center items-center">
                      <FaUserTie className="text-3xl text-primary" />
                    </div>
                  )} */}
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {/* {teacher?.first_name} */}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {/* {teacher?.last_name} */}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {/* <View object={teacher} /> */}
                  {/* <UpdateStudentClas object={teacher} /> */}
                  {/* <DeleteStudentClas ID={teacher.id} /> */}
                </div>
              </li> 
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AddStudentClas