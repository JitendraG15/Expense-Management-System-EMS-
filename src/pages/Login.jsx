import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { useEffect } from "react";

const Login = () => {
  const { token } = useSelector((state) => state.auth);
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
    // const res = login(formData, navigate).then((result)=>{
    //     console.log("Result:", result)
    // }).catch((err) => {
    //     console.log(err);
    //     console.error(err);
    //     process.exit(1);
    //   });

    const res = dispatch(login(formData, navigate));

    console.log("Res:", res);

    setFormData({
      email: "",
      password: "",
    });

   
  }

  // useEffect(()=>{
  //   if(token){
  //     navigate("/dashboard")
  //   }
      
  // },[])
  return (
    <div className="w-[70%] m-auto">
      <div className="mt-8 bg-gray-300 border-black border-2 p-8 rounded-md">
        
          <form onSubmit={handleOnSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleOnChange}
                required
                className="mx-2 border-gray-500 border-2 p-1 rounded-md"
              />
            </div>
            <br />

            <div>
              <label>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
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
                Login
              </button>

              <Link to={"/signup"}>
                Not a Registered Member?
                <button
                  type="submit"
                  className="mx-2 border-gray-500 border-2 p-1 rounded-md"
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
