import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import "./index.css"
import Home from './pages/Home.jsx'
import SignIn from "./pages/SignIn.jsx"
import SignUp from './pages/SignUp.jsx'
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import { store } from "./store.js"
import { Provider } from 'react-redux'
import PrivateRoute from './pages/PrivateRoute.jsx'
import CreateListing from './pages/CreateListing.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/about' element={<About />} />


      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />}></Route>
      </Route>


    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
