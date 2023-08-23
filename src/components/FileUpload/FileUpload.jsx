import React, { useState } from "react";

export default function FileUpload({ title, iconName, LabelFor }) {
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
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
              accept="image/*"
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
                  accept="image/*"
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
