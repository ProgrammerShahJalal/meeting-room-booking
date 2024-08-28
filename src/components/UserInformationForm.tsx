import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const UserInformationForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg">
        <p className="mb-2">
          <strong>Name:</strong> {user?.name || ""}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user?.email || ""}
        </p>
      </div>
    </div>
  );
};

export default UserInformationForm;
