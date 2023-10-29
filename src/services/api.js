import toast from "react-hot-toast";
import axios from "axios";
import { setToken, setUser } from "../slices/AuthSlice";
import { setUsers, setPendingTrans } from "../slices/ProfileSlice";
import {setTransactions, setApprovedTransaction} from "../slices/TransactionSlice";
// import { useState } from "react";

const API_URL = "http://localhost:4000/app/v1";
// const dispatch = useDispatch();
export const demo = async () => {
  try {
    const response = await axios.get(`${API_URL}/demo`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (formData, navigate) => {
  try {
    const { firstName, lastName, email, phoneNumber, universityName, course } =
      formData;
    const response = await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      universityName,
      course,
    });
    if (response) {
      toast.success("Signup Success.");
      navigate("/registrationSuccess");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (formData, navigate) => {
  try {
    const { name, email, mobile, password, confirmPassword, role } = formData;
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      mobile,
      password,
      confirmPassword,
      role,
    });
    if (response) {
      toast.success("Signup Success.");
      navigate("/");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const login = async (formData, navigate) => {
//   try {
//     const { email, password } = formData;
//     const response = await axios.post(`${API_URL}/auth/login`, {
//       email,

//       password,
//     });

//     if (response) {
//       navigate("/signup-success");
//     }

//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export function login(formData, navigate) {
  return async (dispatch) => {
    const { email, password } = formData;
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,

        password,
      });
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response) {
        console.log("Response:", response);
        toast.success("Login Success.");
        navigate("/dashboard");
      }

      return response.data;
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message)
    }
  };
}

export function addTransaction(formData, token, navigate) {
  return async (dispatch) => {
    const { itemNames, membersInvolved, expense } = formData;
    console.log("Token:", token);
    try {
      const response = await axios.post(
        `${API_URL}/transaction/addTransaction`,
        {
          itemNames,
          membersInvolved,
          expense,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log("Response:", response);
        toast.success("New Transaction Added Successfully");
        // navigate("/dashboard");
      }

      return response.data;
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Error occured while adding transaction");
    }
  };
}

export function getAllProfiles(token, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/profile/getAllProfile`, {
        headers: {
          "Content-Type": "application/json",
          Authorisation: `Bearer ${token}`,
        },
      });

      if (response) {
        console.log("Response:", response.data.users);
        dispatch(setUsers(response.data.users));

        toast.success("Members data fetched Successfully");
        // navigate("/dashboard");
      }

      return response.data;
    } catch (err) {
      console.log("Err:", err);
      toast.error("Error occured while Fetching Members");
    }
  };
}

export function fetchPendingTransactions(token, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/getPendingTransactions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log("Response.data.pending:", response.data.pending);
        // dispatch(setUsers(response.data.users));
        dispatch(setPendingTrans(response.data.pending));
        toast.success("Pending Transactions fetched successfully");
        // navigate("/dashboard");
      }

      return response.data.pending;
    } catch (err) {
      console.log("Err:", err);
      toast.error("Error occured while Fetching pending transactions");
    }
  };
}

export function approve(data, token, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/transaction/approve`,
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        toast.success("Approval Success.");
        // navigate("/dashboard");
      }

      return response.data;
    } catch (err) {
      console.log("Err:", err);
      toast.error("Approval Failed");
    }
  };
}

export function reject(data, token, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/transaction/reject`,
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        toast.success("Rejected Successfully.");
      }

      return response.data;
    } catch (err) {
      console.log("Err:", err);
      toast.error("Could Not be rejected.");
    }
  };
}

export function getMyTransactions(token, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/getAllTransaction`,
      
        {
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        toast.success("Transactions Fetched Successfully.");
      }
      console.log("Response.data:",response.data.transactions);
      dispatch(setTransactions(response.data.transactions));
      return response.data.transactions;
    } catch (err) {
      console.log("Err:", err);
      toast.error("Transactions Can't be feched.");
    }
  };
}
 
// getAllApprovedTransaction

export function getAllApprovedTransaction(token, navigate) {
  
  return async (dispatch) => {
    let approvedTransactions;
    try {
      const response = await axios.get(
        `${API_URL}/transaction/getAllTransaction`,
      
        {
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        toast.success("All Approved Transactions Fetched Successfully.");
        dispatch(setApprovedTransaction(response.data.transactions));
      }
     
      return response.data;
    } catch (err) {
      console.log("Err:", err);
      toast.error("approved Transactions Can't be feched.");
    }
  };
}

export function logout(token, navigate) {
  return (dispatch) => {
    if(!token) {
      toast.error("Please Login Fisrt");
      return;
    }
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(setUsers([])); 
    // dispatch(setTransactions([]))
    // dispatch(setPendingTrans([]));
    // dispatch(setApprovedTransaction([]));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem("users");
    // localStorage.removeItem("pendingTrans");
    // localStorage.removeItem("transactions");
    // localStorage.removeItem("approvedTransaction");
    toast.success("Logged Out");
    navigate("/");
  };
}
