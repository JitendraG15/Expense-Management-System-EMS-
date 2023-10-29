import React from "react";
import { useState } from "react";
import { addTransaction } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AddTransaction = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    itemNames: "",
    membersInvolved: "",
    expense: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log("FormData:", formData);

    dispatch(addTransaction(formData, token, navigate));

    // console.log("Res:", res);

    setFormData({
      itemNames: "",
      membersInvolved: "",
      expense: "",
    });
  }
  return (
    <div className="absolute left-56 top-7 z-10">
      <div className="mt-8 bg-gray-300 border-black border-2 p-8 rounded-md">
        <form onSubmit={handleOnSubmit}>
          <div>
            <label>itemNames:</label>
            <input
              type="text"
              id="itemNames"
              name="itemNames"
              placeholder="Items"
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
          <br />

          <div>
            <label>membersInvolved:</label>
            <input
              type="text"
              id="membersInvolved"
              name="membersInvolved"
              placeholder="membersInvolved"
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>

          <br />

          <div>
            <label>expense:</label>
            <input
              type="text"
              id="expense"
              name="expense"
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
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
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
