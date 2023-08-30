import React from "react";
import { ScaleLoader } from "react-spinners";

export default function ButtonLoader({ extraClass, Class, Color, Size }) {
  return (
    <div className={extraClass}>
      <ScaleLoader className={Class} color={Color} size={Size} />
    </div>
  );
}
