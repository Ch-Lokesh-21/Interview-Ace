import { getInitials } from "@/utils/helper";
import React, { useState } from "react";
import { LuTrash } from "react-icons/lu";

function SummaryCard({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering onSelect
    setIsDialogOpen(true); // Open dialog
  };

  const handleDialogSubmit = (e) => {
    e.preventDefault(); // Prevent form submission behavior
    e.stopPropagation(); // Prevent bubbling
    onDelete(); // Call onDelete
    setIsDialogOpen(false); // Close dialog
  };

  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex justify-center items-center mr-4">
            <span className="text-lg font-semibold text-black">{getInitials(role)}</span>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium">{role}</h2>
                <p className="text-xs font-medium text-gray-900">{topicsToFocus}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
          onClick={handleDeleteClick}
        >
          <LuTrash />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4">
          <div className="text-[0.57rem] font-medium text-black px-3 py-1 border-1 border-gray-900 rounded-full flex">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>
          <div className="text-[0.57rem] font-medium text-black px-3 py-1 border-1 border-gray-900 rounded-full flex">
            {questions} && QA
          </div>
          <div className="text-[0.57rem] font-medium text-black px-3 py-1 border-1 border-gray-900 rounded-full flex">
            Last Updated: {lastUpdated}
          </div>
        </div>
        <p className="text-lg text-gray-500 font-medium line-clamp-2 mt-3">{description}</p>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <>
          {/* Dimmed Background */}
          <div
            className="fixed inset-0 bg-transparent bg-opacity-70 z-50"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          ></div>

          {/* Dialog Box */}
          <div
            className="fixed inset-0 z-60 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-lg font-medium mb-4">Delete Confirmation</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete ?</p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click propagation
                    setIsDialogOpen(false); // Close dialog
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-amber-500 text-white rounded-md cursor-pointer"
                  onClick={handleDialogSubmit}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SummaryCard;
