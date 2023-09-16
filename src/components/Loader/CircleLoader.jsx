import React from "react";
import { ClockLoader } from "react-spinners";

export default function CircleLoader({ extraClass, Color }) {
  return <ClockLoader color={Color} className={extraClass} size={18} />;
}
