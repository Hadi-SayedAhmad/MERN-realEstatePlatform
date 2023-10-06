import {GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import {toast} from "react-toastify"
import axios from "axios"
import { app } from "../firebase"
import {useDispatch, useSelector} from "react-redux"
import { signInStart, signInSuccess } from "../slices/userSlice"
import { useNavigate } from "react-router-dom"
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => {
        return state.user
      })
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            dispatch(signInStart());
            const result = await signInWithPopup(auth, provider)
            console.log(result);
            const res = await axios.post("/api/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
              });
            
            dispatch(signInSuccess(res.data))
            toast.success(res.data.message);
            navigate("/");
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
 
 
    return (
    
    <button disabled={loading} onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "loading..." : "Continue with Google"}</button>
    
  )
}
