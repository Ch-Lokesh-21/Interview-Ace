import { UserContext } from "@/context/userContext";
import ProfilePhotoSelector from "@/mycomponents/inputs/ProfilePhotoSelector";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import uploadImage from "@/utils/uploadImage";
import { Eye, EyeOff } from "lucide-react";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, seterror] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      seterror("Full Name is required");
      return;
    }
    if (!email || !password) {
      seterror("Email and Password are required");
      return;
    }
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      seterror("Invalid Email address");
      return;
    }
    let passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      seterror(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    seterror(null);
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.ImageUrl;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        seterror(err.response.data.message);
        console.error("Error from server:", err.response.data.message);
      }
      seterror("Signup failed. Please try again.");
      console.error(err);
    }
    setfullName("");
    setemail("");
    setpassword("");
    setprofilePic(null);
    seterror(null);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create Your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setfullName(e.target.value)}
                value={fullName}
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="fullName"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm/6">{error}</div>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
