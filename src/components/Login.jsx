import { useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  function signInWithGoogle() {
    try {
      signInWithPopup(auth, googleProvider).then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        console.log(data.user);
        navigate("/orders");
      });
    } catch (error) {
      console.log(`Error while logging In: ${error}`);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate("/orders");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-sm text-gray-600">
          Efficiently manage your orders with our system.
        </p>
      </div>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
