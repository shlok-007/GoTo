import React, {useState} from 'react';
import { useQuery } from 'react-query';

// import './App.css';

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
import Cookies from 'universal-cookie';

import profile_interface from './types/profile_interface';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
// import Footer from './components/Footer';

// const dummyProfile: profile_interface = {
//   sub: "1234567890",
//   name: "John Doe",
//   given_name: "John",
//   family_name: "Doe",
//   email: "21cs02008@iitbbs.ac.in",
//   picture: "https://lh3.googleusercontent.com/a/ACg8ocILCoSKIjk_01JAqfNFoliZkCmaNBgNC8LE-J-4QDUQRGEc=s96-c"
// }

const fetchServerStatus = async () => {
  try{
    const response = await fetch(process.env.REACT_APP_SERVER_URL || '');
    if (!response.ok) {
      console.log("Server is offline");
      return true;
    }
    console.log("Server is online");
    return false;
  } catch (error) {
    console.log("Server is offline");
    return true;
  }
};

const App: React.FC = () => {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [profile, setProfile] = useState<profile_interface | undefined>(undefined);
  // const [serverDown, setServerDown] = useState<boolean>(false);

  const { data: serverDown } = useQuery('serverStatus', fetchServerStatus);

  // for testing

  // const [isLogged, setIsLogged] = useState<boolean>(true);
  // const [profile, setProfile] = useState<profile_interface | undefined>(dummyProfile);

  //

  const profileCache = localStorage.getItem('profile');
  const cookies = new Cookies();

  if(!!profileCache && !isLogged && cookies.get('jwt_auth_token')) {
    setIsLogged(true);
    setProfile(JSON.parse(profileCache));
  }

  const handleLoginSuccess = async (credentialResponse: CredentialResponse)=>{
    if(credentialResponse.credential){
      let temp = decodeJwtResponse(credentialResponse.credential);
      setProfile(temp);
      localStorage.setItem('profile', JSON.stringify(temp));
      
      setIsLogged(true);
      
      await addUser(temp.email, temp.name, temp.picture);
      console.log(cookies.get('jwt_auth_token'));
    }
    navigate("/selectDestination");
  }

  const handleLogout = () => {
    setIsLogged(false);
    setProfile(undefined);
    googleLogout();
    localStorage.removeItem('profile');
    cookies.remove('jwt_auth_token');
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
          <Route path="/showCompanions/:destination/:date/:time/:dir" element={<ShowCompanions email={profile?.email || ""} name={profile?.name || ""} />}/>
          {/* <Route path="/serverOffline" element={<InfoCard content="Unable to connect to the server :_(" />}/> */}
        </Route>
        <Route path="/" element={isLogged ? <Navigate to="/home" /> : <Navigate to="/loginPage" />} />
      </Routes>
      }
      {/* <Footer/> */}
    </>
  );
}

export default App;