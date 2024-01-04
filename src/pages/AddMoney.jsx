import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMoney } from "../services/api";
import { getAllProfiles } from "../services/api";

const AddMoney = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const [formData, setFormData] = useState({
    accountID: "",
    amount: 0,
  }); 

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)
    dispatch(addMoney(formData,token,navigate));
    setFormData({
       accountID:"",
       amount:0
    })
    
    

    window.location.reload();
  }

  useEffect(()=>{
      dispatch(getAllProfiles(token, navigate));
  },[])

  return (
    <div className="relative ">
      <div className="absolute left-[25%] top-[15%] mt-8 border-2 border-gray-200 p-5 rounded bg-white border-2 border-blue-300 p-10 rounded-md shadow-2xl">
        <h1 className="text-2xl font-semibold ">Add Money</h1>
        <div>
          <form onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center gap-2 py-4"
          >
            <div className="flex justify-center items-center gap-1">
              <label className="text-lg font-semibold">Select Member:</label>
              <select
                name="accountID"
                value={formData.accountID}
                onChange={handleSelectChange}
                className="mx-2 border-gray-500 border-2 p-1 rounded-md" 
              >
                <option value="">Select an option</option>
                {users.map((user, index) => (
                  <option value={user.memberAccount._id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center items-center gap-1">
              <label className="text-lg font-semibold">Enter Amount:</label>
              <input
                
                name="amount"
                value={formData.amount}
                onChange={handleSelectChange}
                className="mx-2 border-gray-500 border-2 p-1 rounded-md"
                pattern="{0-9}"
              />
            </div>

            <button type="submit" className="mx-2 text-lg bg-blue-500 text-white border-black border-1 px-2 py-1 rounded-md hover:bg-blue-600 font-semibold">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
