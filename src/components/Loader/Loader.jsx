import React from "react";
import { PacmanLoader } from "react-spinners";

export default function Loader({ extraClass, Class, Color, Size }) {
  return (
    <div className={extraClass}>
      <PacmanLoader className={Class} color={Color} size={Size} />
    </div>
  );
}
