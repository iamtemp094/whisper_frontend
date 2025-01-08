import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';
import { verify_token } from './utils/auth';
import { useEffect,useState } from 'react';

import {useDispatch,useSelector} from 'react-redux'
import {setAuthData,removeAuthData} from './store/slices/auth/authSlice'
function App() {
  const dispatch = useDispatch()
  const authData = useSelector(state => state.auth)
  const isLoggedIn = authData.user_id!==null
  verify_token().then(data=>{
    if(data.id){
      dispatch(
        setAuthData({
          user_id: data.id,
          user_name: data.username,
          token: data.token,
        })
      )
  }
  })
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Landing />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/chat" />} />
          <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/chat" />} />
          <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
