import React, {useState} from 'react';

import './App.css';

import {googleLogout, CredentialResponse} from '@react-oauth/google';
import decodeJwtResponse from './utils/decodeJwtResponse';
import addUser from './utils/addUser';

import Navbar from './components/Navbar';
import DestinationSelect from './Pages/DestinationSelect';
import LoginPage from './Pages/LoginPage';
import ShowCompanions from './Pages/ShowCompanions';
import HomePage from './Pages/HomePage';
import InfoCard from './components/InfoCard';
import PrivateRoutes from './utils/PrivateRoutes';

import profile_interface from './types/profile_interface';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';

const App: React.FC = () => {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [profile, setProfile] = useState<profile_interface | undefined>(undefined);
  const [serverDown, setServerDown] = useState<boolean>(false);
  const authToken = localStorage.getItem('authToken');

  if(!!authToken && !isLogged){
    setIsLogged(true);
    setProfile(decodeJwtResponse(authToken));
  }

  const handleLoginSuccess = async (credentialResponse: CredentialResponse)=>{
    if(credentialResponse.credential){
      let temp = decodeJwtResponse(credentialResponse.credential);
      setProfile(temp);
      localStorage.setItem('authToken', credentialResponse.credential);
      addUser(temp.email, temp.name, temp.picture).then((val)=>{if(!val) setServerDown(true);});
    }
    navigate("/selectDestination");
  }

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
      {serverDown && <InfoCard content="Unable to connect to the server :_(" />}

      {!serverDown &&
      <Routes>
        <Route path="/loginPage" element={<LoginPage handleLoginSuccess={handleLoginSuccess}/>}/>
        <Route element={<PrivateRoutes isLogged={isLogged}/>}>
          <Route path="/home" element={<HomePage name={profile?.name || ""}/>}/>
          <Route path="/selectDestination" element={<DestinationSelect profile={profile}/>}/>
          <Route path="/showCompanions/:destination/:date/:time" element={<ShowCompanions email={profile?.email || ""} name={profile?.name || ""} />}/>
          {/* <Route path="/serverOffline" element={<InfoCard content="Unable to connect to the server :_(" />}/> */}
        </Route>
        <Route path="/" element={isLogged ? <Navigate to="/home" /> : <Navigate to="/loginPage" />} />
      </Routes>
      }

    </>
  );
}

export default App;