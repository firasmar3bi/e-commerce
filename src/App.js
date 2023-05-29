import React, { Children, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import About from "./component/About/About";
import Register from "./component/Register/Register";
import PageNotFound from "./component/PageNotFound/PageNotFound";
import Login from "./component/Login/Login";
import Card from "./component/Card/Card";
import jwt from "jwt-decode";
import ProtectedRouting from "./component/ProtectedRouting/ProtectedRouting";

export default function App() {
  
  let [user,setUser] = useState(null)
  function getCurentUser() {
    let token = localStorage.getItem('userToken');
    let decode = jwt(token);
    setUser(decode);
  }
  
  const roter = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser} />,
      children: [
        { index: true, element: <Home /> },
        { path: "/About", element: <About /> },
        { path: "/Register", element: <Register /> },
        { path: "/Login", element: <Login getCurentUser={getCurentUser} /> },
        { path: "/Card", element:<ProtectedRouting><Card /></ProtectedRouting> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  useEffect(()=>{
    if (localStorage.getItem('userToken')){
      getCurentUser()
    }
  },[])
  return <RouterProvider router={roter} />;
}
