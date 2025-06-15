import DashboardLayout from "@/mycomponents/layouts/DashboardLayout";
import SpinnerLoader from "@/mycomponents/loader/SpinnerLoader";
import { AnimatePresence , motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import { useParams } from "react-router-dom";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import QuestionCard from "@/mycomponents/cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "@/mycomponents/Drawer";
import SkeletonLoader from "@/mycomponents/loader/SkeletonLoader";
function InterviewPrep() {
  const { sessionId } = useParams();
  const [sessionData, setsessionData] = useState(null);
  const [errMesg, seterrMesg] = useState("");
  const [openLearnMoreDrawer, setopenLearnMoreDrawer] = useState(false);
  const [explanation, setexplanation] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isUpdateLoader, setisUpdateLoader] = useState(false);

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setsessionData(response.data.session);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  const generateExplanation = async (question) => {
    try {
      seterrMesg("");
      setisLoading(true);
      setexplanation(null);
      setopenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );
      if (response.data) {
        setexplanation(response.data);
      }
    } catch (err) {
      setexplanation(null);
      seterrMesg("Failed to generate explanation");
      console.error(err);
    } finally {
      setisLoading(false);
    }
  };
  const toggleQuestionPin = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data && response.data.question) {
        toast.success("Question Pinned Successfully");
        fetchDetails();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const uploadMoreQuestions = async () => {
    try
    {
      setisUpdateLoader(true);
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
        role:sessionData?.role,
        experience:sessionData?.experience,
        topicsToFocus:sessionData?.topicsToFocus,
        numberOfQuestions:10,
      });

      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION,{
        sessionId,
        questions:generatedQuestions,
      });

      if(response.data)
      {
        toast.success("Added more Q&A!!");
        fetchDetails();
      }
    } 
    catch(err)
    {
      console.error(err);
    }
    finally{
      setisUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchDetails();
    }
    return () => {};
  }, []);
  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />
      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, idx) => {
                return (
                  <motion.div
                    key={data._id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: idx * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => generateExplanation(data.question)}
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPin(data._id)}
                      />
                      {!isLoading &&
                        sessionData?.questions?.length == idx + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                              onClick={uploadMoreQuestions}
                              disabled={isLoading || isUpdateLoader}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "}
                              Load More
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setopenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errMesg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errMesg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewPrep;
