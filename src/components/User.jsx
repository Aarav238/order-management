/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const User = ({user}) => {

    const navigate = useNavigate()
  
    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    useEffect(() =>{
        const user = localStorage.getItem("userInfo");
        if(user === null) {
            navigate("/")
        }
    } , []
    )

    const createOrder = () =>{
        navigate("/create")
    }



  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
    <h1 className="text-2xl font-bold text-indigo-600">Account Details</h1>
    <p className="text-sm text-gray-600">Name: {user.displayName}</p>
    <p className="text-sm text-gray-600">Email: {user.email}</p>
    <div className="flex  gap-4">
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4">
      Logout
    </button>
    <button onClick={createOrder} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mt-4">Create Order </button>
    </div>
    
  </div>
  

  )
}

export default User