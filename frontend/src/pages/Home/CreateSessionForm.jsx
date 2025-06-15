import SpinnerLoader from "@/mycomponents/loader/SpinnerLoader";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateSessionForm() {
  const [formData, setformData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setformData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      seterror("Please fill all the fields");
      return;
    }
    seterror("");
    setloading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: "10",
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        seterror(err.response.data.message);
      } else {
        seterror("Some thing went wrong");
      }
      console.error(err);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex items-center justify-start max-w-screen h-screen flex-col gap-5 mt-20">
      <div>
        <h3 className="text-blue-500 text-2xl font-bold text-center mb-4">
          Start a new Interview Journey
        </h3>
        <p className="text-gray-500">
          Fill out a few quick details and start your learning journey
        </p>
      </div>
      <form
        className="w-md mx-auto flex flex-col gap-5"
        onSubmit={handleCreateSession}
      >
        <div classname="mb-5">
          <label htmlFor="role">Target Role</label>
          <input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            type="text"
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
            required
          />
        </div>
        <div classname="mb-5">
          <label htmlFor="exp">Years of Experience</label>
          <input
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            type="number"
            id="exp"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            placeholder="(e.g., 1 year, 2 Years, etc.)"
            required
          />
        </div>
        <div classname="mb-5">
          <label htmlFor="topics">Topics to Focus On</label>
          <input
            value={formData.topicsToFocus}
            onChange={({ target }) =>
              handleChange("topicsToFocus", target.value)
            }
            type="text"
            id="topics"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            placeholder="(Comma - Seperated, e.g., React, Node.js, MongoDB etc.)"
            required
          />
        </div>
        <div classname="mb-5">
          <label htmlFor="descp">Description</label>
          <input
            value={formData.description}
            onChange={({ target }) => handleChange("description", target.value)}
            type="text"
            id="descp"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            placeholder="(Any specific goals or notes for this session)"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex justify-center items-center">
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer flex gap-1 items-center justify-center"
          >
            {loading && <SpinnerLoader />}
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSessionForm;
