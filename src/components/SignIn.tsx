import React from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/compat/app'
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { Button } from '@mui/material'


const SignIn = () => {

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

  return (
    <div className='sign-in'>
      <Button onClick={SignInWithGoogle}>ログイン</Button>
    </div>
  )
}

export default SignIn
