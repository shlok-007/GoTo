import React, {useState} from 'react';
import './App.css';
import {useGoogleOneTapLogin, CredentialResponse} from '@react-oauth/google';
import decodeJwtResponse from './utils/decodeJwtResponse';

export default function App() {

  function handleCredentialResponse(response: CredentialResponse) {
    if(!response.credential) return;
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
  }

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      handleCredentialResponse(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  return (
    <>

    </>
  );
}
