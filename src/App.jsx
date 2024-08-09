
import {Route, Routes ,useNavigate } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import {  UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'
import { useEffect } from 'react';
import './App.css'
import ResetPassword from './pages/ResetPassword';


const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('verifyToken'); // Or get from cookies
    if (token) {
      // Optionally validate the token with the server
      axios.get('/api/auth/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Token is valid, continue
      })
      .catch(error => {
        // Token is invalid or expired, redirect to login
        navigate('/login');
      });
    } else {
      // No token found, redirect to login
      navigate('/login');
    }
  }, []);
  
  return (
      <UserContextProvider>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/resetpassword" element={<ResetPassword/>}/>
      <Route exact path="/write" element={<CreatePost/>}/>
      <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/>
      </Routes>
    
      </UserContextProvider>
  )
}

export default App