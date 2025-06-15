import SummaryCard from '@/mycomponents/cards/SummaryCard'
import DashboardLayout from '@/mycomponents/layouts/DashboardLayout'
import { API_PATHS } from '@/utils/apiPaths'
import axiosInstance from '@/utils/axiosInstance'
import { CARD_BG } from '@/utils/data'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { LuPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
  const naviagte = useNavigate();
  const [sessions, setsessions] = useState([]);
  const fetchAllSessions = async ()=>{
      try
      {
        const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
        setsessions(response.data);
      } 
      catch(err)
      {
        console.error(err);
      }
  };

  const deleteSession = async (sessionData)=>{
    try
    {
      let response = await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      if(response)
      {
        toast.success("Session Deleted Sucessfully");
      }
      fetchAllSessions();
    }
    catch(err)
    {
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchAllSessions();
  },[])

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
            {
              sessions.map((data,index)=>(
                <SummaryCard
                key={data?._id}
                colors={CARD_BG[index%CARD_BG.length]}
                role={data?.role||""}
                topicsToFocus={data?.topicsToFocus||""}
                experience={data?.experience||"-"}
                questions={data?.questions?.length||"-"}
                description={data?.description||""}
                lastUpdated={
                  data.updatedAt?moment(data.updatedAt).format("Do MMM YYYY"):""
                }
                onSelect={()=> naviagte(`/interview-prep/${data?._id}`)}
                onDelete={()=> deleteSession(data)}
                />
              ))
            }
        </div>
        <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
        onClick={()=> {
          naviagte("/createSession");
        }}>
          <LuPlus className='text-2xl text-white'/>
          Add New
        </button>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard;