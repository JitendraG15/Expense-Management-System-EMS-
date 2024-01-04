import React, { useEffect } from "react";
import { useState } from "react";
import { addTransaction } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllProfiles } from "../services/api";

const AddTransaction = () => {
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.profile);
  // const [members, setMembers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    itemNames: "",
    membersInvolved: [],
    expense: "",
    purchagedBy: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // const arr = formData.itemNames[0].split(" ");

    // setFormData({
    //   ...formData,
    //   itemNa  :arr
    // })
  }

  function handleCheckboxChange(event) {
    const itemId = event.target.value;
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });

    console.log("s", selectedItems);
  }

 

  function handleOnSubmit(e) {
    e.preventDefault();

    const updatedFormData = { ...formData, membersInvolved: selectedItems };
    console.log("Updated Data:",updatedFormData);
   
    dispatch(addTransaction(updatedFormData, token, navigate));

    
    // window.location.reload();
    setSelectedItems([]);
    setFormData({
      itemNames: "",
      membersInvolved: [],
      expense: "",
      purchagedBy: "",
    });
  }

  useEffect(()=>{
       dispatch(getAllProfiles(token,navigate));
  },[])
  return (
    <div className="absolute left-[35%] top-[10%] z-10">
      <div className="mt-8  border-2 p-4 rounded-md">
        <h1 className="text-2xl  font-semibold pb-5">Add New Transaction</h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label className="text-lg font-semibold">Items Purchased:</label>
            <input
              type="text"
              id="itemNames"
              name="itemNames"
              placeholder="Items"
              onChange={handleOnChange}
              value={formData.itemNames}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
          <br />

          <div>
            <label className="text-lg font-semibold">Purchaged By:</label>
            <select
              name="purchagedBy"
              value={formData.purchagedBy}
              onChange={handleOnChange}
            >
              <option value="">Select an option</option>
              {users.map((user, index) => (
                <option value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          <br />

          <div>
            <label className="text-lg font-semibold">Members:</label>
            {users
              ? users.map((item) => (
                  <div key={item._id}>
                    <input
                      type="checkbox"
                      id={item.id}
                      name="membersInvolved"
                      value={item.name}
                      checked={selectedItems.includes(item.name)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={item.id}>{item.name}</label>
                  </div>
                ))
              : null}
          </div>

          <br />

          <div>
            <label className="text-lg font-semibold">Expense:</label>
            <input
              type="text"
              id="expense"
              name="expense"
              value={formData.expense}
              placeholder="expense"
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>

          <br />

          <div>
            <button
              type="submit"
              className="mx-2 border-gray-500 border-2 p-1 rounded-md hover:bg-blue-500 hover:text-white hover:font-semibold"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
