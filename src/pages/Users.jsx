import React from "react";
import UserTableCom from "../components/user/userTable.jsx"
export const User = () => {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">Foydalanuvchilar</h1>
      <UserTableCom />
    </div>
  );
};
export default User