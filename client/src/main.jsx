import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserProfile from './components/UserProfile.jsx'
import HomePage from './Pages/HomePage.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import SquadProfile from './components/SquadProfile.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Setting from "./Pages/Setting.jsx"
import FindMember from "./Pages/FindMember.jsx"
import MCQTestGenerator from './components/MCQTestGenerator.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<HomePage />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="user_profile/:id" element={<UserProfile />} />
      <Route path="squads_profile" element={<SquadProfile />} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<SignUp/>} />
      <Route path="setting" element={<Setting/>}/>
      <Route path="findmember" element={<FindMember/>}/>
      <Route path="mcqtestgenerator" element={<MCQTestGenerator/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
