import React from 'react';
import { useEffect } from 'react';
import MainSideBar from '../components/common/MainSideBar';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import {getAllProfiles} from "../services/api";
import {useNavigate } from "react-router-dom";
import Profile from '../components/core/Profile';


const MemberProfiles = () => {
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);
  const {users} = useSelector((state)=>state.profile);
  
  
  useEffect(() => {
    dispatch(getAllProfiles(token,navigate));
    console.log("Users:",users);
    
  }, []);

  
  return (
    <div className='relative '>
      <MainSideBar />
      <div className='z-0 absolute left-[20%]  w-[75%] mt-4  text-center border-2 border-red-100 p-4 bg-gray-200'>
       <h1 className='text-3xl mb-4'>Member Profiles</h1> 
        {
          users.map((user, id)=>{
            return <div>
            
            <Profile user={user}/>
           
              
              <br/>
            </div>
          })
        }
        
      </div>
    </div>
  );
};

export default MemberProfiles;
