import React from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

function ProfilePhotoSelector({ image, setImage, preview, setPreview }) {
  const inputRef = React.useRef(null);
  const [previewUrl, setpreviewUrl] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setpreviewUrl(preview);
    }
  };

  const handleRemovePhoto = () => {
    setImage(null);
    setpreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 relative cursor-pointer">
          <LuUser className="text-4xl text-blue-500" />
          <button type="button" onClick={handleClick} className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-blue-500/85 to-blue-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuTrash/>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
