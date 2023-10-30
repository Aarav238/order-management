import { useEffect } from "react";
import { auth , googleProvider } from "../firebase"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const navigate = useNavigate();

    function signInWithGoogle() {
        try {
          signInWithPopup(auth, googleProvider).then((data) => {
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            console.log(data.user);
            navigate("/orders")
          });
        } catch (error) {
          console.log(`Error while logging In: ${error}`);
        }
      }

      useEffect(() => {
        const user = localStorage.getItem("userInfo");
        if(user){
            navigate("/orders")
        }
      }, [])
  return (
    <div>
        <button onClick={signInWithGoogle}>login</button>
    </div>
  )
}

export default Login