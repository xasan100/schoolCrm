import React from "react";
import InputField from "../../generic/InputField";
import { useState } from "react";
import { useCreateScienceMutation } from "../../redux/slice/sciences/SciencesSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ButtonLoader from "../Loader/ButtonLoader";

export default function AddSciences() {
  const [title, setTitle] = useState("");
  const [createScience, { isLoading, isSuccess }] = useCreateScienceMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("Fan qo'shildi");
      } else if (!isLoading && !isSuccess) {
        toast.error("Fan qo'shilmadi");
      }
    }
  }, [isSuccess, isLoading, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setHasSubmitted(true);
      await createScience({ title });
      setTitle("");
      setHasSubmitted(false);
    } catch (error) {
      toast.error("Fan qo'shishda xatolik", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputField
        value={title}
        label="Fan Nomi"
        id="title"
        name="title"
        type="text"
        autoComplete="title"
        handleChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      >
        {!isLoading ? (
          "Saqlash"
        ) : (
          <ButtonLoader Color="white" Size={20} extraClass="h-6" />
        )}
      </button>
    </form>
  );
}
