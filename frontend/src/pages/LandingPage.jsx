import { UserContext } from "@/context/userContext";
import ProfileInfoCard from "@/mycomponents/cards/ProfileInfoCard";
import { APP_FEATURES } from "@/utils/data"; // import { React, useContext } from "react";
import { useContext } from "react";
import { LuSparkles } from "react-icons/lu";
import { Link } from "react-router-dom";
function LandingPage() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="w-full min-h-full flex flex-col gap-5">
        <div className="flex items-center justify-between border border-b border-gray-400/50 px-4 py-2">
          <h1 className="text-2xl text-primary font-bold">Interview Ace</h1>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <Link
              className="rounded-lg cursor-pointer text-secondary font-bold bg-amber-500 hover:bg-amber-400 px-4 py-2"
              to="/login"
            >
              Login / SignUp
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center flex-col gap-4">
          <span className="px-4 py-2 outline rounded-4xl text-amber-700 bg-amber-100 border-amber-100 cursor-pointer flex items-center">
            {" "}
            <LuSparkles /> AI Powered
          </span>
          <h1 className="text-5xl text-primary text-center">
            Ace Interviews with{" "}
            <span className="text-amber-600">AI-Powered</span> Learning
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-primary text-xl w-1/2 text-center">
            Get role-specific questions, expand answers when you need them, dive
            deeper into concepts, and organize everything in your way. From
            preparation to mastery -- your ultimate interview toolkit is here
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Link
            className="text-lg cursor-pointer px-4 py-2 bg-amber-500 rounded-lg"
            to="/login"
          >
            Get Started
          </Link>
        </div>
        <div className="h-screen flex items-center justify-center">
          <img src="./hero.png" alt="image" className="w-[80vw] rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl text-primary text-center mb-8">
            Features of Interview Ace
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APP_FEATURES.map((card) => (
              <div
                key={card.id}
                className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition duration-200"
              >
                <h2 className="text-xl/8 font-semibold mb-2 text-center">
                  {card.title}
                </h2>
                <p className="text-center text-sm/6">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="text-center p-3 mt-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <Link className="text-dark" to="/">
            Interview Ace
          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
