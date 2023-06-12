import React, {useEffect, useState} from 'react';

import './App.css';

import {useGoogleOneTapLogin, googleLogout} from '@react-oauth/google';
import decodeJwtResponse from './utils/decodeJwtResponse';

import Navbar from './components/Navbar';
import DestinationSelect from './Pages/DestinationSelect';
import LoginPage from './Pages/LoginPage';

import profile_interface from './types/profile_interface';
import {Route, Routes, useNavigate} from 'react-router-dom';

const App: React.FC = () => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [profile, setProfile] = useState<profile_interface | undefined>(undefined);
  const navigate = useNavigate();

  const CallLogin = ()=>{
    useGoogleOneTapLogin({
      onSuccess: credentialResponse => {
        setIsLogged(true);
        if(credentialResponse.credential){ 
          setProfile(decodeJwtResponse(credentialResponse.credential));
        }
        navigate("/selectDestination");
      },
      onError: () => {
        console.log('Login Failed');
      },
      cancel_on_tap_outside: false,
      prompt_parent_id: 'google-one-tap-button',
    });
  };

  const handleLogout = () => {
    setIsLogged(false);
    setProfile(undefined);
    googleLogout();
    navigate("/");
  };

  return (
    <>

      <Navbar isLogged={isLogged} profile={profile} siteName="GoTogether" onLogout={handleLogout}/>

      <Routes>
        <Route path="/" element={<LoginPage loginPromptFunction={CallLogin}/>}/>
        <Route path="/selectDestination" element={<DestinationSelect profile={profile}/>}/>
      </Routes>
    </>
  );
}

export default App;