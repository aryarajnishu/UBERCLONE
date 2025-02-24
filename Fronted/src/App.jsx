import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogout from './pages/UserLogout'
import Start from './pages/Start'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import { UserProtectWrapper } from './pages/UserProtectedWrapper' 
import { CaptainProtectWrapper } from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
// import VehiclePanel from './components/VehilePanel'
import 'remixicon/fonts/remixicon.css'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' 
          element={
          <UserProtectWrapper>
            <Home />  
          </UserProtectWrapper>
          } /> 
          
        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
         } />

        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />


      </Routes>
    </div>
  )
}