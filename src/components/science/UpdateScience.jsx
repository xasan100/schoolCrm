import React from "react";
import InputField from "../../generic/InputField";
import { useState } from "react";
import { useUpdateScienceMutation } from "../../redux/slice/sciences/SciencesSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ButtonLoader from "../Loader/ButtonLoader";

export default function UpdateSciences({ object, setOpen }) {
  const [inputValue, setInputValue] = useState({ title: "", slug: "" });
  const [updateScience, { isLoading, isSuccess }] = useUpdateScienceMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("Fan o'zgartirildi");
      } else if (!isLoading && !isSuccess) {
        toast.error("Fan o'zgartirilmadi");
      }
    }
    setInputValue(object);
  }, [isSuccess, isLoading, hasSubmitted, object]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setHasSubmitted(true);
      await updateScience(
        {
          id: inputValue?.id,
          title: inputValue.slug,
        }
      );
      setInputValue({ title: "", slug: "" });
      setHasSubmitted(false);
      setOpen(false);
    } catch (error) {
      toast.error("Fani o'zgartirishda xatolik", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputField
        value={inputValue.title}
        label="Fan Nomi"
        id="title"
        name="title"
        type="text"
        autoComplete="title"
        handleChange={handleChange}
      />
      <InputField
        value={inputValue.slug}
        label="Qisqartma"
        id="slug"
        name="slug"
        type="text"
        autoComplete="slug"
        handleChange={handleChange}
      />
      <button className="disabled:bg-gray-300 bg-custom-green hover: text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
        {!isLoading ? (
          "O'zgartirish"
        ) : (
          <ButtonLoader Color="white" Size={20} extraClass="h-6" />
        )}
      </button>
      <button
        onClick={() => setOpen(false)}
        className="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      >
        Fan qo'shish
      </button>
    </form>
  );
}
