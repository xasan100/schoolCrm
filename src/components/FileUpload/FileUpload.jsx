import React, { useState } from "react";

export default function FileUpload({
  title,
  iconName,
  LabelFor,
  setInputValue,
  inputValue,
}) {
  const [file, setFile] = useState(null);

  const acceptedFormats = [
    ".doc",
    ".docx",
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
  ];

  const updateNestedValue = (obj, keys, value) => {
    const newObj = { ...obj };
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (LabelFor === "user.image") {
      const keys = LabelFor.split(".");
      setInputValue((prevValue) =>
        updateNestedValue(prevValue, keys, selectedFile)
      );
    } else {
      setInputValue({ ...inputValue, [LabelFor]: selectedFile });
    }

    if (selectedFile) {
      const fileExtension =
        "." + selectedFile.name.split(".").pop().toLowerCase();

      if (acceptedFormats.includes(fileExtension)) {
        setFile(selectedFile);
      } else {
        alert("Siz boshqa turdagi faylni yuklay olmaysiz!");
        setFile(null);
      }
    }
  };

  return (
    <div className="col-span-1">
      <label
        htmlFor={LabelFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-1.5">
        {file ? (
          <label htmlFor={LabelFor}>
            <p>{file?.name}</p>
            <input
              id={LabelFor}
              name={LabelFor}
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <label
            htmlFor={LabelFor}
            className="text-center flex flex-col items-center cursor-pointer"
          >
            {iconName}
            <div className="flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={LabelFor}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600"
              >
                <input
                  id={LabelFor}
                  name={LabelFor}
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}
