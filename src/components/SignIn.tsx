import React from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/compat/app'
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth'


const SignIn = () => {

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <div className='sign-in'>
      <button onClick={SignInWithGoogle}>ログイン</button>
    </div>
  )
}

export default SignIn
