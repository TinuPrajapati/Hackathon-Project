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
import CreateSquad from './components/CreateSquad.jsx'
import FindProjects from './Pages/FindProjects.jsx'
import Index from './Pages/Index.jsx'
import AboutPage from './Pages/AboutPage.jsx'
import ContactPage from "./Pages/ContactPage.jsx"
import ScrollToTop from './components/Scroll.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<>
      <ScrollToTop />
      <App />
    </>} >
      <Route path="" element={<Index />} />
      <Route path="home" element={<HomePage />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="user_profile/:id" element={<UserProfile />} />
      <Route path="squads_profile" element={<SquadProfile />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="setting" element={<Setting />} />
      <Route path="findmember" element={<FindMember />} />
      <Route path="mcqtestgenerator" element={<MCQTestGenerator />} />
      <Route path="create_squad" element={<CreateSquad />} />
      <Route path="findprojects" element={<FindProjects />} />
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
