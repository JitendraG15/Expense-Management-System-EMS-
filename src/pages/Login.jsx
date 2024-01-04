import React from "react";
import { useState } from "react";
import { login } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const Login = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
   

    const res = dispatch(login(formData, navigate));

    console.log("Res:", res); 

    setFormData({
      email: "",
      password: "",
    });
  }


  return (
    <div className="w-[100vw] m-0 bg-gray-100 h-[100vh] flex items-center justify-center">
      <div className="bg-white border-2 border-blue-300 p-10 rounded-md shadow-2xl">
      <h1 className="text-lg font-semibold pb-1 border-blue-300 border-b-2 ">Login Form</h1>
        <form onSubmit={handleOnSubmit} className="mt-5" >
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col ">
              <label className="pl-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleOnChange}
                required
                className="mx-2 border-gray-300 border-2 p-1 rounded-md"
              />
            </div>
            

            <div className="flex flex-col">
              <label className="pl-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleOnChange}
                required
                className="mx-2 border-gray-300 border-2 p-1 rounded-md"
              />
            </div>
          </div>

       
          
          <div>
            <button
              type="submit"
              className="m-2 bg-blue-500 text-white border-black border-1 px-2 py-1 rounded-md hover:bg-blue-600"
            >
              Login
            </button>

           


            <Link to={"/signup"} className="ml-3 text-sm">
              Not a Registered Member?
              <button
                type="submit"
                className="m-2 bg-blue-500 text-white border-black border-1 px-2 py-1 rounded-md hover:bg-blue-600"
              >
                SignUp
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
