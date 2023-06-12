import React, {useState} from 'react';
import './App.css';
import {useGoogleOneTapLogin, googleLogout} from '@react-oauth/google';
import decodeJwtResponse from './utils/decodeJwtResponse';
import Navbar from './components/Navbar';
import LoggedInPage from './Pages/LoggedInPage';
import profile_interface from './types/profile_interface';
import {Route, Routes} from 'react-router-dom';

const App: React.FC = () => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [credential, setCredential] = useState<string>("");
  const [profile, setProfile] = useState<profile_interface | undefined>(undefined);

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      setIsLogged(true);
      if(credentialResponse.credential){ 
        setCredential(credentialResponse.credential);
        setProfile(decodeJwtResponse(credentialResponse.credential));
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
    cancel_on_tap_outside: false,
    // prompt_parent_id: 'google-one-tap-button',
  });

  const handleLogout = () => {
    setIsLogged(false);
    setCredential("");
    setProfile(undefined);
    googleLogout();
  };


  // const gotoDB = client.db("GoTo");
  // const gotoCollection = gotoDB.collection("GoToUsers");
  // const guser = gotoCollection.findOne();
  // console.log(guser);

  return (
    <>

      <Navbar isLogged={isLogged} profile={profile} siteName="GoTogether" onLogout={handleLogout}/>


      {/* for testing */}

      <LoggedInPage profile={profile}/>

    </>
  );
}

export default App;