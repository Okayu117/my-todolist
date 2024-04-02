import React from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/compat/app'


const SignIn = () => {

  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div className='sign-in'>
      <button onClick={SignInWithGoogle}>ログイン</button>
    </div>
  )
}

export default SignIn
