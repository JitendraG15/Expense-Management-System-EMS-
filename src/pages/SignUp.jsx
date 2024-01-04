// import { Button } from "bootstrap";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data:", formData);

    const res = signup(formData, navigate)
      .then((result) => {
        console.log("Result:", result);
      })
      .catch((err) => {
        console.log(err);
        console.error(err);
        process.exit(1);
      });
    console.log("RES:", res);

    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  }
  return (
    <div className="w-[100vw] m-0 bg-gray-100 min-h-[100vh] flex items-center justify-center">
      <div className="bg-white border-2 border-blue-300 p-5 rounded-md shadow-2xl w-[30%]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h1 className="text-center border-b-2 border-blue-300 text-lg font-semibold pb-1">Signup Form</h1>
          <div className="flex flex-col gap-1">
            <label className=" pl-2">Name</label>
            <input
              name="name"
              id="name"
              placeholder="Enter Name"
              type="text"
              value={formData.name}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-300 border-2 p-1 rounded-md "
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className=" pl-2">Email</label>
            <input
              name="email"
              id="email"
              placeholder="Enter Email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-300 border-2 p-1 rounded-md"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className=" pl-2">Mobile Number</label>
            <input
              name="mobile"
              id="mobile"
              placeholder="Enter 10 Digit Mobile No."
              type="tel"
              pattern="[0-9]{10}"
              value={formData.mobile}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-300 border-2 p-1 rounded-md"
            />
          </div>
          
          <div className="flex flex-col gap-1 ">
            <label className=" pl-2">Password</label>
            <input
              name="password"
              id="password"
              placeholder="Enter Your Password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-300 border-2 p-1 rounded-md "
            />
          </div>
        
          <div className="flex flex-col gap-1">
            <label className=" pl-2">Confirm Password</label>
            <input
              name="confirmPassword"
              id="Confirm Password"
              placeholder="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-300 border-2 p-1 rounded-md"
            />
          </div>
         
          <div className="flex flex-col gap-1">
            <label className=" pl-2">Role</label>
            <select value={formData.role} onChange={handleOnChange} name="role" required
            className="mx-2 border-gray-300 border-2 p-1 rounded-md" >
              <option value="" >Select an option</option>

              <option value={"admin"} >Admin</option>
              <option value={"member"}  >Member</option>
            </select>
          </div>
         
          <div>
            <button type="submit"  className="mx-2  bg-blue-500 text-white border-black border-1 px-2 py-1 rounded-md hover:bg-blue-600 ">Signup</button>
            <Link to={"/"} className="text-sm"> Already Registered?<button   className="mx-2  bg-blue-500 text-white border-black border-1 px-2 py-1 rounded-md hover:bg-blue-600 ">Login</button></Link>
           
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default SignUp;
