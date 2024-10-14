import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AppState = (props) => {
  const url = 'https://mernprojectecommerce-6.onrender.com'
  console.log(url);
  
  const [products, setProducts] = useState([])
  const [token, setToken] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)


  // when ever my browser reload I want to fetch all the data--> for that useEffect help
  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        const api = await axios.get(`${url}/api/product/all`, {
          headers: {
            "Content-Type": "Application/json"
          },
          withCredentials: true
        });
        setProducts(api.data.getDataProduct);
      } catch (error) {
        console.error('Error fetching products:', error); // Better error logging
      }
      
      // console.log(api.data.getDataProduct);
    }
    fetchedProduct();
  }, [url])


  // Register user
  const registerUser = async (name, email, password, role) => {
    try {
      const api = await axios.post(`${url}/user/register`,
        { name, email, password, role },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      //  alert(api.data.message);
      return api.data
      // console.log("User registered:", api);
    } catch (error) {
      console.log(error);
    }
  };



  // Login user

  const loginUser = async (email, password) => {
    try {
      const api = await axios.post(`${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setToken(api.data.token)
      setIsAuthenticated(true)
      localStorage.setItem('token',token)
      //  console.log("User logged in:", api.data);
      return api.data

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <AppContext.Provider value={{ products, registerUser, loginUser, token, setIsAuthenticated, isAuthenticated }}>{props.children}</AppContext.Provider>
  )
}

export default AppState