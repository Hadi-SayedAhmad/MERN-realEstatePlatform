import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../slices/userSlice";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const {loading} = useSelector((state) => {
    return state.user
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure())
        toast.error(data.message)
        return 
      } 
      
      toast.success("Logged In!");
      dispatch(signInSuccess(data))
      navigate("/");
      // console.log(data);
    } catch (err) {
      dispatch(signInFailure())
      toast.error(err.message)
    }

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form autoComplete='off' className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={handleChange} />
        <input type='email' placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80' onClick={handleChange} >{loading ? "LOADING..." : "Sign Up"}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>

    </div>
  )
}

