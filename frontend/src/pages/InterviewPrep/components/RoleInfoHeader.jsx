import React from "react";
function RoleInfoHeader({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) {
  return <div className="bg-white relative">
    <div className="container mx-auto px-10 md:px-0">
        <div className="h-[12.5rem] flex flex-col justify-center relative z-10">
            <div className="flex items-start">
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-medium">
                                {role}
                            </h2>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                                {topicsToFocus}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
                <div className="text-[0.625rem] font-semibold text-white bg-black px-3 py-1 rounded-full">
                    Experience: {experience} {experience==1?"Year":"Years"}
                </div>
                <div className="text-[0.625rem] font-semibold text-white bg-black px-3 py-1 rounded-full">
                    {questions} Q&A
                </div>
                <div className="text-[0.625rem] font-semibold text-white bg-black px-3 py-1 rounded-full">
                    Last Updated: {lastUpdated}
                </div>
            </div>
        </div>
        <div className="w-[40vw] md:w-[30vw] h-[12.5rem] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
            <div className="w-16 h-16 bg-lime-400 blur-[4.063rem]"></div>
            <div className="w-16 h-16 bg-teal-400 blur-[4.063rem]"></div>
            <div className="w-16 h-16 bg-cyan-300 blur-[2.813rem]"></div>
            <div className="w-16 h-16 bg-fuchsia-200 blur-[2.813rem]"></div>
        </div>
    </div>
  </div>;
}

export default RoleInfoHeader;
