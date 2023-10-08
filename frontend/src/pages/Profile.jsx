import { useDispatch, useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { app } from "../firebase.js"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import axios from "axios"
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteStart, deleteFailure, deleteSuccess } from "../slices/userSlice.js";
import { toast } from "react-toastify"
export default function Profile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(formData);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleFileUpload = (file) => {
    //create storage instance
    const storage = getStorage(app)
    //set file name to be unique with date so we don't get errors if we upload same file twice
    const fileName = new Date().getTime() + file.name
    //create storage reference (where do we want to save like `avatars/${fileName}`) but here we don't want avatars folder
    const storageRef = ref(storage, fileName)
    //upload to firebase: uploadBytesResumable Uploads data to this object's location. The upload can be paused and resumed, and exposes progress updates.
    const uploadTask = uploadBytesResumable(storageRef, file)

    //snapshot is an object that represents the current state of an ongoing upload operation in Firebase Storage
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log(progress);
      setFilePerc(Math.round(progress));
    },

      (error) => {
        setFileUploadError(true)
      },


      // snapshot.ref It allows you to obtain a reference to the file that was just uploaded, and you can use this reference to perform additional operations on the uploaded file, such as obtaining its download URL
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart())
    try {
      const res = await axios.post(`/api/user/update/${currentUser._id}`, {
        ...formData
      })
      console.log(res.data);
      if (res.success === false) {
        toast.error(res.message);
        dispatch(updateUserFailure())
        return
      } else {
        dispatch(updateUserSuccess(res.data))
        toast.success("Profile Updated!");
      }

    } catch (error) {
      toast.error(error.message);
      dispatch(updateUserFailure())
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteStart());
    try {
      if (window.confirm("Are you sure?")) {
        const res = await axios.delete(`/api/user/delete/${currentUser._id}`)
        // console.log(res.data);
        if (res.success === false) {
          toast.error(res.message);
          dispatch(deleteFailure());
          return
        } else {
          toast.success(res.data);
          dispatch(deleteSuccess());
          navigate("/sign-in")
        }
      }

    } catch (error) {
      toast.error(error.message);
      dispatch(deleteFailure())
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"></input>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile photo" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3 " />
        <p className="self-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">Can't upload image! Make sure your image is less than 2MB.</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Upload complete! Update to apply changes.</span>
          ) : ""}
        </p>
        <input value={formData.username} defaultValue={currentUser.name} type="text" placeholder="Username" className="border p-3 rounded-lg outline-none" id="username" onChange={handleChange} />
        <input value={formData.email} defaultValue={currentUser.email} type="email" placeholder="Email" className="border p-3 rounded-lg outline-none" id="email" onChange={handleChange} />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg outline-none " id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Updating..." : "Update"}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer hover:opacity-95">Delete Account</span>
        <span className="text-red-700 cursor-pointer hover:opacity-95">Sign Out</span>
      </div>
    </div>
  )
}
