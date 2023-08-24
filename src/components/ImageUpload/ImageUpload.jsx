import React, { useState } from "react";

export default function ImageUpload({
  title,
  fileType,
  iconName,
  iconTitle,
  LabelFor,
  setInputValue,
  inputValue,

}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputValue({ ...inputValue, [LabelFor]: file })
    const fileURL = URL.createObjectURL(file);
    setImage(fileURL);
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Fayl hajmi 5MBdan katta bo'lmasligi kerak.");
      } else {
        setErrorMessage(null);
      }
    }
  };
  return (
    <div className="col-span-1 row-span-3">
      <label
        htmlFor={LabelFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        {image ? (
          <label htmlFor={LabelFor}>
            <img src={image} alt="rasm" className="h-24 object-contain" />
            <input
              id={LabelFor}
              name={LabelFor}
              accept="image/*"
              type="file"
              className="sr-only"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <label
            htmlFor={LabelFor}
            className="text-center flex flex-col items-center cursor-pointer"
          >
            {iconName}
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={LabelFor}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600"
              >
                <span>{iconTitle}</span>
                <input
                  id={LabelFor}
                  name={LabelFor}
                  accept="image/*"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              {errorMessage || fileType}
            </p>
          </label>
        )}
      </div>
    </div>
  );
}
