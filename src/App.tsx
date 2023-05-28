import React, {useState} from 'react';
import './App.css';
import {useGoogleOneTapLogin, googleLogout} from '@react-oauth/google';
import decodeJwtResponse from './utils/decodeJwtResponse';
import Navbar from './components/Navbar';
import Profile_interface from './types/profile_interface';

const dummyProfile: Profile_interface = {
  name: "",
  email: "",
  picture: "",
  given_name: "",
  family_name: "",
  sub: ""
}

const App: React.FC = () => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [credential, setCredential] = useState<string>("");
  const [profile, setProfile] = useState<Profile_interface>(dummyProfile);

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
    cancel_on_tap_outside: false
  });

  const handleLogout = () => {
    setIsLogged(false);
    setCredential("");
    setProfile(dummyProfile);
    googleLogout();
  };
  return (
    <>
      <Navbar isLogged={isLogged} profile={profile} siteName="GoTogether" onLogout={handleLogout}/>
    </>
  );
}

export default App;