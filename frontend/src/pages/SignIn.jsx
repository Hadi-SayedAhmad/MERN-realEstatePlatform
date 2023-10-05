import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../slices/userSlice";
export default function SignIn() {
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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure())
        toast.error(data.message);
        return 
      } 
      
      toast.success("Logged in!");
      dispatch(signInSuccess(data))
      navigate("/");
      // console.log(data);
    } catch (err) {
      dispatch(signInFailure());
      toast.error(err?.data?.message || err.error)
    }

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form autoComplete='off' className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading ? "LOADING..." : "Sign In"}</button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Do not have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>

    </div>
  )
}

