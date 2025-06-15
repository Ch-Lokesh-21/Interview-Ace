import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/userContext";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    clearUser();
    localStorage.clear();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt="profile"
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="text-md text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            onClick={handleLogOut}
            className="cursor-pointer text-sm text-amber-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
}

export default ProfileInfoCard;
