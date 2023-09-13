import React from "react";
import Tasks from "../components/tasks/Tasks";

export default function Task() {
  return (
    <div className="grid gap-2 p-4 grid-cols-12">
      <h1 className="text-2xl font-bold col-span-12">Vazifalar</h1>
      <Tasks />
    </div>
  );
}
