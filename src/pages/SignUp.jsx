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
    <div className="z-10 w-[70%] m-auto">
      <div className="mt-8 bg-gray-300 border-black border-2 p-8 rounded-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              name="name"
              id="name"
              placeholder="Name"
              type="text"
              value={formData.name}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
<br/>
          <div>
            <label>Email:</label>
            <input
              name="email"
              id="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
          <br/>
          <div>
            <label>Mobile Number:</label>
            <input
              name="mobile"
              id="mobile"
              placeholder="mobile"
              type="tel"
              pattern="[0-9]{10}"
              value={formData.mobile}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
          <br/>
          <div>
            <label>Password:</label>
            <input
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
          <br/>
          <div>
            <label>Confirm Password:</label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              required
              className="mx-2 border-gray-500 border-2 p-1 rounded-md"
            />
          </div>
          <br/>
          <div>
            <label>Role:</label>
            <select value={formData.role} onChange={handleOnChange} name="role" required
            className="mx-2 border-gray-500 border-2 p-1 rounded-md" >
              <option value="">Select an option</option>

              <option value={"admin"} >Admin</option>
              <option value={"member"}  >Member</option>
            </select>
          </div>
          <br/>
          <div>
            <button type="submit"  className="mx-2 border-gray-500 border-2 p-1 rounded-md">Signup</button>
            <Link to={"/"} > Already Registered?<button   className="mx-2 border-gray-500 border-2 p-1 rounded-md">Login</button></Link>
           
          </div>
          <br/>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
