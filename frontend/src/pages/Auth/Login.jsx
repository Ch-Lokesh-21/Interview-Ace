import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      seterror("Email and Password are required");
      return;
    }
    seterror(null);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      } else {
        seterror("Invalid Credentials");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        seterror(err.response.data.message);
        console.error("Error from server:", err.response.data.message);
      }
      seterror("Login failed. Please try again.");
      console.error(err);
    }
    setemail("");
    setpassword("");
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
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

                  <EyeOff className="h-5 w-5"/>
                ) : (
                  <Eye className="h-5 w-5"/>
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
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;