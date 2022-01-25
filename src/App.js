import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './components/SidebarComponent/Sidebar';
import Chat from './components/ChatComponent/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice";
import Login from './components/LoginComponent/Login';
import { auth } from './serviceProvider/firebase';
import { login, logout } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      {user ? (
        <>
        <Sidebar />
        <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
