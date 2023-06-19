import React, {useState} from 'react';

import './App.css';

import {useGoogleOneTapLogin, googleLogout} from '@react-oauth/google';
import decodeJwtResponse from './utils/decodeJwtResponse';

import Navbar from './components/Navbar';
import DestinationSelect from './Pages/DestinationSelect';
import LoginPage from './Pages/LoginPage';
import ShowCompanions from './Pages/ShowCompanions';
import HomePage from './Pages/HomePage';
import PrivateRoutes from './utils/PrivateRoutes';

import profile_interface from './types/profile_interface';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';

const App: React.FC = () => {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [profile, setProfile] = useState<profile_interface | undefined>(undefined);
  const authToken = localStorage.getItem('authToken');
  if(!!authToken && !isLogged){
    setIsLogged(true);
    setProfile(decodeJwtResponse(authToken));
  }

  const CallLogin = ()=>{
    useGoogleOneTapLogin({
      onSuccess: credentialResponse => {
        setIsLogged(true);
        if(credentialResponse.credential){ 
          setProfile(decodeJwtResponse(credentialResponse.credential));
          localStorage.setItem('authToken', credentialResponse.credential);
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
    localStorage.removeItem('authToken');
    navigate("/loginPage");
  };

  return (
    <>

      <Navbar isLogged={isLogged} profile={profile} siteName="GoTogether" onLogout={handleLogout}/>

      <Routes>
        <Route path="/loginPage" element={<LoginPage loginPromptFunction={CallLogin}/>}/>
        <Route element={<PrivateRoutes isLogged={isLogged}/>}>
          <Route path="/home" element={<HomePage name={profile?.name || ""}/>}/>
          <Route path="/selectDestination" element={<DestinationSelect profile={profile}/>}/>
          <Route path="/showCompanions/:destination/:date" element={<ShowCompanions email={profile?.email || ""}/>}/>
        </Route>
        <Route path="/" element={isLogged ? <Navigate to="/home" /> : <Navigate to="/loginPage" />} />
      </Routes>
    </>
  );
}

export default App;